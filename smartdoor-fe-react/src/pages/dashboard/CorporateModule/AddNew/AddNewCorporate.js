/** @format */

import { MenuItem, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import Text from "../../../../shared/Text/Text";
import Buttons from "../../../../shared/Buttons/Buttons";
import cameraIcon from "../../../../assets/images/camra-icon.svg";
import CONSTANTS_STATUS from "../../../../common/helpers/ConstantsStatus";
import addIcon from '../../../../assets/svg/add.svg';
import { validateCorpUser, validateCorporate } from "../../../../common/validations";
import pencilIcon from '../../../../assets/svg/icon-edit.svg';
import { compose } from "redux";
import { addEditCorporate, addEditCorporateUser, getAllCorporateUser, getCorporateById, getCorporateUserHubList, getHubList, getPlansForCorporate } from "../../../../common/redux/actions";
import { showErrorToast, showSuccessToast } from "../../../../common/helpers/Utils";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddNewCorporate = (props) => {
   const { getHubList, allHubList } = props;
   const [error, setError] = useState({});
   const [corporateId, setCorporateId] = useState(props?.location?.state?.corporateId !== undefined ? props?.location?.state?.corporateId : null);
   const [userErr, setUserErr] = useState({})
   const fileInputRef = useRef(null);
   const permissionList = CONSTANTS_STATUS.permissionList;
   const [corporateDetails, setCorporateDetails] = useState({
      logo: '',
      companyName: '',
      companyAddress: '',
      smartDoorPlanId: '',
      nonSmartDoorPlanId: ''
   });
   const [newUser, setNewUser] = useState({
      name: '',
      mobile: '',
      sdPosting: '',
      hubIdList: []
   });
   const [userList, setUserList] = useState([]);
   const [smartDoorPlanList, setSmartDoorPlanList] = useState([]);
   const [nonSmartDoorPlanList, setNonSmartDoorPlanList] = useState([]);
   const [addNewUserFlag, setAddNewUserFlag] = useState(false);
   const [addNewCorpFlag, setAddNewCorpFlag] = useState(true);
   const [editUserIndex, setEditUserIndex] = useState(null);

   const history = useHistory();

   const getPlans = async () => {
      await getPlansForCorporate({ planType: 'CORPORATE_PLAN', smartdoorPlan: false })
         .then(response => {
            if (response.status === 200) {
               setNonSmartDoorPlanList([...response?.data?.resourceData])
            }
         });
      await getPlansForCorporate({ planType: 'CORPORATE_PLAN', smartdoorPlan: true })
         .then(response => {
            if (response.status === 200) {
               setSmartDoorPlanList([...response?.data?.resourceData])
            }
         });
   }
   const getCorprateDetails = async () => {
      await getCorporateById({
         corporateId: corporateId,
         pageNo: 1,
         pageSize: 8
      }).then(response => {
         console.log(response)
         setCorporateDetails(response?.data?.resourceData[0])
      });
   }

   const fetchHubIdList = async (user) => {
      try {
         const response = await getCorporateUserHubList({ corporateUserId: user.userId });
         if (response?.data?.resourceData?.length === 0) {
            return [];
         } else {
            // Extracting hubId from each element and returning as an array
            return response?.data?.resourceData?.map(element => element.hubId);
         }
      } catch (error) {
         console.error('Error fetching hub ID list:', error);
         return []; // Return empty array in case of error
      }
   };


   const getCorporateUser = async () => {
      try {
         const response = await getAllCorporateUser({ corporateId: corporateId });
         if (response?.status === 200) {
            let userlist = await Promise.all(
               response.data.resourceData.map(async (user) => ({
                  ...user,
                  sdPosting: user.sdPosting ? 'Smart Door Posting' : 'Non Smart Door Posting',
                  hubIdList: await fetchHubIdList(user), // Await the fetchHubIdList promise
               }))
            );
            setUserList(userlist);
         }
      } catch (error) {
         console.error('Error fetching corporate users:', error);
      }
   }

   useEffect(() => {
      if (corporateId !== null) {
         getCorprateDetails();
         getCorporateUser();
      }
      getPlans();
      getHubList();
      console.log(props)
   }, []);

   const addNewUser = async () => {
      const valid = await validateCorpUser(newUser);
      setUserErr(valid.errors)
      if (valid.isValid) {
         let userlist = [...userList];
         const userObj = {
            name: newUser.name,
            mobile: newUser.mobile,
            sdPosting: newUser.sdPosting === 'Smart Door Posting' ? true : false,
            corporateId: corporateId,
            hubIdList: newUser.hubIdList
         }
         const response = await addEditCorporateUser(userObj)
         if (response.status === 200) {
            userlist.push(newUser);
            setUserList([...userlist]);
            setNewUser(prevUser => ({ ...prevUser, name: '', mobile: '', sdPosting: '' }));
            setAddNewUserFlag(false);
            showSuccessToast("User added successfully");
         } else {
            showErrorToast(response.data.message);
            return null;
         }
      }
   }

   const editUser = async () => {
      const valid = await validateCorpUser(userList[editUserIndex]);
      setUserErr(valid.errors)
      if (valid.isValid) {
         let userlist = [...userList];
         const userObj = {
            userId: userList[editUserIndex].userId,
            name: userList[editUserIndex].name,
            mobile: userList[editUserIndex].mobile,
            sdPosting: userList[editUserIndex].sdPosting === 'Smart Door Posting' ? true : false,
            corporateId: corporateId,
            hubIdList: userList[editUserIndex].hubIdList
         }
         const response = await addEditCorporateUser(userObj)
         if (response.status === 200) {
            setNewUser(prevUser => ({ ...prevUser, name: '', mobile: '', sdPosting: '' }));
            setAddNewUserFlag(false);
            setEditUserIndex(null)
            showSuccessToast("User edited successfully");
         } else {
            showErrorToast(response.data.message);
            return null;
         }
      }
   }

   // const deleteUser = (index) => {
   //    let userlist = [...userList];
   //    userlist.splice(index, 1);
   //    setUserList([...userlist]);
   // }

   const imageUpload = (e) => {
      const file = (e.target.files[0])
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setCorporateDetails(prevCorporate => ({ ...prevCorporate, logo: reader.result }));
         };
         reader.readAsDataURL(file);
      }

   }

   const createNewCorporate = async () => {
      console.log(corporateDetails)
      const valid = await validateCorporate(corporateDetails);
      setError(valid.errors);
      if (valid.isValid) {
         const response = await addEditCorporate(corporateDetails);
         if (response.status === 200) {
            setCorporateId(response?.data?.resourceData)
            showSuccessToast('Corporate added successfully');
            setAddNewCorpFlag(false);
         }
      }
   }

   return (
      <>
         <div className="bg-white border">
            <Text
               text={"Corporate Details"}
               fontWeight="bold"
               style={{ fontSize: "16px", marginLeft: "17px", marginTop: "10px" }}
            />
            <div className="ml-3 mb-5">
               <Row className="mt-2">
                  <Col lg='2'>
                     {corporateDetails.logo ?
                        <>
                           <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                              <img
                                 src={corporateDetails.logo}
                                 alt="Uploaded Logo"
                                 style={{ width: '100%', height: '80%' }}
                              />
                              <img
                                 src={pencilIcon}
                                 alt="Edit Icon"
                                 style={{
                                    position: 'absolute',
                                    top: '0px', // Adjust as necessary
                                    right: '0px', // Adjust as necessary
                                    width: '25px', // Adjust as necessary
                                    height: '25px', // Adjust as necessary
                                    cursor: 'pointer',
                                    backgroundColor: '#BE1452',
                                    borderRadius: '50%'
                                 }}
                                 onClick={(e) => {
                                    fileInputRef.current?.click();
                                 }}
                              />
                           </div>
                        </>
                        :
                        <Button
                           className="w-100 h-auto py-4"
                           style={{
                              color: "#949494",
                              borderStyle: 'dashed',
                              borderColor: error?.logo ? 'red' : '#E5E5E5',
                              borderWidth: '2px',
                              backgroundColor: "#FBFBFB",
                              marginTop: '7%'
                           }}
                           onClick={() => {
                              fileInputRef.current?.click();
                           }}
                        >

                           <img src={cameraIcon} alt="Camera Icon" />
                           <Text className="mb-1 mt-1" text="Upload logo" style={{ color: '#949494', fontSize: '16px' }} />

                        </Button>
                     }
                     <input
                        hidden
                        type="file"
                        ref={fileInputRef}
                        accept=".png, .jpg, .jpeg"
                        multiple={false}
                        onChange={(e) => imageUpload(e)}
                     />
                  </Col>
                  <Col lg='4'>
                     <TextField
                        className="w-100 ml-0 "
                        type="text"
                        error={error.companyName}
                        label="Company Name"
                        onChange={(e) => { setCorporateDetails({ ...corporateDetails, companyName: e.target.value }) }}
                        value={corporateDetails.companyName}
                     />

                     <TextField
                        className="w-100 ml-0 mt-3 "
                        select
                        multiple={false}
                        error={error.smartDoorPlanId}
                        label="SmartDoor Plan"
                        onChange={(e) => { setCorporateDetails({ ...corporateDetails, smartDoorPlanId: Number(e.target.value) }) }}
                        value={corporateDetails.smartDoorPlanId}
                     >
                        {smartDoorPlanList.map(element => (
                           <MenuItem key={element.id} value={element.id}>{element.planName}</MenuItem>
                        ))}
                     </TextField>
                  </Col>
                  <Col lg='6'>
                     <TextField
                        className="w-90 ml-0 "
                        type="text"
                        error={error.companyAddress}
                        label="Address"
                        onChange={(e) => { setCorporateDetails({ ...corporateDetails, companyAddress: e.target.value }) }}
                        value={corporateDetails.companyAddress}
                     />
                     <TextField
                        className="ml-0 mt-3 "
                        style={{ width: '65%' }}
                        select
                        error={error.nonSmartDoorPlanId}
                        multiple={false}
                        label="Non SmartDoor Plan"
                        onChange={(e) => { setCorporateDetails({ ...corporateDetails, nonSmartDoorPlanId: Number(e.target.value) }) }}
                        value={corporateDetails.nonSmartDoorPlanId}
                     >
                        {nonSmartDoorPlanList.map(element => (
                           <MenuItem key={element.id} value={element.id}>{element.planName}</MenuItem>
                        ))}
                     </TextField>
                  </Col>
               </Row>
               {addNewCorpFlag ?
                  <Buttons className='mr-5 mt-2' name={corporateId !== null ? 'Save' : 'Add Coprorate'} style={{ float: 'right' }} onClick={() => { createNewCorporate() }} />
                  : null}
            </div>

            <hr></hr>
            <Text
               text={"User Details"}
               fontWeight="bold"
               style={{ fontSize: "16px", marginLeft: "17px", marginBottom: '1%' }}
            />
            {userList.map((elememt, index) => (
               <>
                  <Row className="ml-1 mr-1" id={index}>
                     <Col lg="4" style={{ marginTop: "0%" }}>
                        <TextField
                           className="w-100 mt-2"
                           type="text"
                           id={index}
                           disabled={editUserIndex === index ? false : true}
                           label="Admin Name"
                           // onInput={(e) => {
                           //    setUserList((prevUserList) => {
                           //       let newList = [...prevUserList];
                           //       newList[index] = { ...newList[index], name: e.target.value };
                           //       return [...newList]
                           //    })
                           // }}
                           defaultValue={elememt.name}
                        />
                        <Text color="dangerText" size="xSmall" className="pt-2" text={""} />
                     </Col>
                     <Col lg="4" style={{ marginTop: "0%" }}>
                        <TextField
                           className="w-100 mt-2"
                           type="number"
                           id={index}
                           disabled={editUserIndex === index ? false : true}
                           label="Mobile Number"
                           InputProps={{
                              startAdornment:
                                 <>
                                    <Text className='ml-2 mr-2' text={'+91'} style={{ fontSize: '16px' }} fontWeight={'500'} />
                                 </>
                           }}
                           // onInput={(e) => {
                           //    setUserList((prevUserList) => {
                           //       let newList = [...prevUserList];
                           //       newList[index] = { ...newList[index], mobile: e.target.value };
                           //       return [...newList]
                           //    })
                           // }}
                           defaultValue={elememt.mobile}
                        />
                        <Text color="dangerText" size="xSmall" className="pt-2" text={""} />
                     </Col>
                     <Col lg='4' style={{ paddingInlineEnd: '0%' }}>
                        <TextField
                           className="w-100 mt-2"
                           select
                           id={index}
                           disabled={editUserIndex === index ? false : true}
                           label="Posting Permission"
                           // onChange={(e) => {
                           //    setUserList((prevUserList) => {
                           //       let newList = [...prevUserList];
                           //       newList[index] = { ...newList[index], sdPosting: e.target.value };
                           //       return [...newList]
                           //    })
                           // }}
                           value={elememt.sdPosting} >
                           <MenuItem value='' disabled>select</MenuItem>
                           {permissionList.map(elememt => (
                              <MenuItem key={elememt} value={elememt}>{elememt}</MenuItem>
                           ))}
                        </TextField>
                     </Col>
                     <Col lg='4' style={{ paddingInlineEnd: '0%' }}>
                        <TextField
                           className="w-100 mt-2"
                           select
                           multiple={true}
                           SelectProps={{
                              multiple: true
                           }}
                           id={index}
                           disabled={editUserIndex === index ? false : true}
                           label="Assign Hub"
                           value={elememt.hubIdList || []}  // Ensure the value is an array
                           onChange={(e) => {
                              const { value } = e.target;
                              console.log(e)
                              setUserList((prevUserList) => {
                                 let newList = [...prevUserList];
                                 newList[index] = {
                                    ...newList[index],
                                    hubIdList: typeof value === 'string' ? value.split(',') : value
                                 };
                                 return newList;
                              });
                           }}
                        >
                           <MenuItem value='' disabled>select</MenuItem>
                           {allHubList?.data?.hubList?.map(elememt => (
                              <MenuItem key={elememt.hubId} value={elememt.hubId}>
                                 {elememt.hubName}
                              </MenuItem>
                           ))}
                        </TextField>

                     </Col>
                     <Col lg='1'>
                        {editUserIndex !== index ?
                           <img id={index}
                              src={pencilIcon}
                              alt="Edit Icon"
                              style={{
                                 marginTop: '40%',
                                 width: '30px', // Adjust as necessary
                                 height: '30px', // Adjust as necessary
                                 cursor: 'pointer',
                                 backgroundColor: '#BE1452',
                                 borderRadius: '50%'
                              }}
                              onClick={() => { setEditUserIndex(index) }}
                           />
                           :
                           <Buttons id={index} disabled={false} name='Done' varient='primary' style={{ marginTop: '70%' }}
                              onClick={() => { editUser(); }} ></Buttons>
                        }
                     </Col>
                  </Row>

                  <hr />
               </>
            ))}
            {addNewUserFlag ?
               <>
                  <Row className="ml-1 mr-1" id={'newUser'}>
                     <Col lg="4" style={{ marginTop: "0%" }}>
                        <TextField
                           id="newUserName"
                           className="w-100 mt-4"
                           type="text"
                           error={userErr?.name}
                           label="Admin Name"
                           onInput={(e) => {
                              setNewUser(prevUser => ({ ...prevUser, name: e.target.value }))
                           }}
                           value={newUser.name}
                        />
                        <Text color="dangerText" size="xSmall" className="pt-2" text={""} />
                     </Col>
                     <Col lg="4" style={{ marginTop: "0%" }}>
                        <TextField
                           id="newUserMobile"
                           className="w-100 mt-4"
                           type="number"
                           label="Mobile Number"
                           error={userErr?.mobile}
                           InputProps={{
                              startAdornment:
                                 <>
                                    <Text className='ml-2 mr-2' text={'+91'} style={{ fontSize: '16px' }} fontWeight={'500'} />
                                 </>
                           }}
                           onInput={(e) => {
                              setNewUser(prevUser => ({ ...prevUser, mobile: e.target.value }));
                           }}
                           value={newUser.mobile}
                        />
                        <Text color="dangerText" size="xSmall" className="pt-2" text={""} />
                     </Col>
                     <Col lg='4' style={{ paddingInlineEnd: '0%' }}>
                        <TextField
                           id="newUserSDPosting"
                           className="w-100 mt-4"
                           select
                           label="Posting Permission"
                           error={userErr?.sdPosting}
                           onChange={(e) => {
                              setNewUser(prevUser => ({ ...prevUser, sdPosting: e.target.value }))
                           }}
                           value={newUser.sdPosting} >
                           <MenuItem value='' disabled>select</MenuItem>
                           {permissionList.map(elememt => (
                              <MenuItem key={elememt} value={elememt}>{elememt}</MenuItem>
                           ))}
                        </TextField>
                     </Col>
                     <Col lg='4' style={{ paddingInlineEnd: '0%' }}>
                        <TextField
                           className="w-100 mt-4"
                           select
                           multiple={true}
                           SelectProps={{
                              multiple: true
                           }}
                           error={userErr?.hubIdList}
                           label="Assign Hub"
                           value={newUser.hubIdList || []}  // Ensure the value is an array
                           onChange={(e) => {
                              console.log(e)
                              setNewUser(prevUser => ({ ...prevUser, hubIdList: e.target.value }))
                           }}
                        >
                           <MenuItem value='' disabled>select</MenuItem>
                           {allHubList?.data?.hubList?.map(elememt => (
                              <MenuItem key={elememt.hubId} value={elememt.hubId}>
                                 {elememt.hubName}
                              </MenuItem>
                           ))}
                        </TextField>
                     </Col>
                     {/* {index !== 0 ?
                              <Col lg='1'>
                                 <img src={deleteIcon} alt="" style={{ cursor: 'pointer', marginTop: '70%', height: '25px', width: '25px' }} onClick={() => { deleteUser(index) }}></img>
                              </Col>
                              : null} */}
                  </Row>
                  <Button className="mr-1" style={{ float: 'right', backgroundColor: '#BE1452', color: 'white' }}
                     onClick={() => { addNewUser(); }}>Submit</Button>
               </>
               : null}
            <hr className="mt-5" />
            <Button className="d-flex py-1 ml-3 mb-2" style={{ color: '#BE1452', backgroundColor: '#F8F3F5', borderColor: '#DED6D9' }}
               onClick={() => { setAddNewUserFlag(true) }} disabled={!addNewUserFlag && corporateId !== null ? false : true} >
               <div style={{
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
               }}>
                  <Image src={addIcon} style={{ width: '20px' }} />
               </div>
               <Text text={'Add More User'} fontWeight='bold' style={{ fontSize: '12px', color: '#BE1452' }} />
            </Button>
            <div className="d-flex ml-3 mb-2">
               <Buttons disabled={!addNewUserFlag && corporateId !== null ? false : true} name='Done' varient='primary' className='col-2 py-2'
                  onClick={() => { history.goBack(); }} ></Buttons>
            </div>
         </div>
      </>
   );
};

const mapStateToProps = ({ allHubList }) => ({ allHubList });
const actions = {
   getAllCorporateUser,
   getHubList
}

export default compose(connect(mapStateToProps, actions))(AddNewCorporate);
