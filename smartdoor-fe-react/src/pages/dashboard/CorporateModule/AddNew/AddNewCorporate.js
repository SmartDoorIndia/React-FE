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
import deleteIcon from '../../../../assets/images/delete-icon.svg';
import { compose } from "redux";
import { actionGetOtp, addEditCorporate, addEditCorporateUser, getAllCorporateUser, getCorporateById, getPlansForCorporate } from "../../../../common/redux/actions";
import { showErrorToast, showSuccessToast } from "../../../../common/helpers/Utils";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddNewCorporate = (props) => {
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
   const [logoImg, setLogoImg] = useState('');
   const [newUser, setNewUser] = useState({
      name: '',
      mobile: '',
      sdPosting: ''
   });
   const [userList, setUserList] = useState([]);
   const [smartDoorPlanList, setSmartDoorPlanList] = useState([]);
   const [nonSmartDoorPlanList, setNonSmartDoorPlanList] = useState([]);
   const [addNewUserFlag, setAddNewUserFlag] = useState(false);
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

   const getCorporateUser = async () => {
      try {
         const response = await getAllCorporateUser({ corporateId: corporateId });
         if (response?.status === 200) {
            let userlist = response.data.resourceData.map(user => ({
               ...user,
               sdPosting: user.sdPosting ? 'Smart Door Posting' : 'Non Smart Door Posting'
            }));
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
            corporateId: corporateId
         }
         const response = await addEditCorporateUser(userObj)
         if (response.status === 200) {
            userlist.push(newUser);
            setUserList([...userlist]);
            setNewUser(prevUser => ({ ...prevUser, name: '', mobile: '', sdPosting: '' }));
            setAddNewUserFlag(false);
         } else {
            showErrorToast(response.data.message);
            return null;
         }
      }
   }

   const deleteUser = (index) => {
      let userlist = [...userList];
      userlist.splice(index, 1);
      setUserList([...userlist]);
   }

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
                     <Button
                        className="w-100 h-auto py-4"
                        style={{
                           color: "#949494",
                           borderStyle: 'dashed',
                           borderColor: '#E5E5E5',
                           borderWidth: '2px',
                           backgroundColor: "#FBFBFB",
                           marginTop: '7%'
                        }}
                        onClick={() => {
                           fileInputRef.current?.click();
                        }}
                     >
                        {corporateDetails.logo ? (
                           <img src={corporateDetails.logo} alt="Uploaded Logo" style={{ maxWidth: '100%', height: 'auto' }} />
                        ) : (
                           <>
                              <img src={cameraIcon} alt="Camera Icon" />
                              <Text className="mb-1 mt-1" text="Upload logo" style={{ color: '#949494', fontSize: '16px' }} />
                           </>
                        )}
                     </Button>
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
               <Buttons className='mr-5 mt-2' name={corporateId !== null ? 'Save' : 'Add Coprorate'} style={{ float: 'right' }} onClick={() => { createNewCorporate() }} />
            </div>

            <hr></hr>
            <Text
               text={"User Details"}
               fontWeight="bold"
               style={{ fontSize: "16px", marginLeft: "17px" }}
            />
            {userList.map((elememt, index) => (
               <>
                  <Row className="ml-1 mr-1" id={index}>
                     <Col lg="4" style={{ marginTop: "0%" }}>
                        <TextField
                           className="w-100 mt-4"
                           type="text"
                           id={index}
                           contentEditable={false}
                           label="Admin Name"
                           onInput={(e) => {
                              setUserList((prevUserList) => {
                                 let newList = [...prevUserList];
                                 newList[index] = { ...newList[index], name: e.target.value };
                                 return [...newList]
                              })
                           }}
                           defaultValue={elememt.name}
                        />
                        <Text color="dangerText" size="xSmall" className="pt-2" text={""} />
                     </Col>
                     <Col lg="4" style={{ marginTop: "0%" }}>
                        <TextField
                           className="w-100 mt-4"
                           type="number"
                           id={index}
                           contentEditable={false}
                           label="Mobile Number"
                           InputProps={{
                              startAdornment:
                                 <>
                                    <Text className='ml-2 mr-2' text={'+91'} style={{ fontSize: '16px' }} fontWeight={'500'} />
                                 </>
                           }}
                           onInput={(e) => {
                              setUserList((prevUserList) => {
                                 let newList = [...prevUserList];
                                 newList[index] = { ...newList[index], mobile: e.target.value };
                                 return [...newList]
                              })
                           }}
                           defaultValue={elememt.mobile}
                        />
                        <Text color="dangerText" size="xSmall" className="pt-2" text={""} />
                     </Col>
                     <Col lg='4' style={{ paddingInlineEnd: '0%' }}>
                        <TextField
                           className="w-100 mt-4"
                           select
                           id={index}
                           contentEditable={false}
                           label="Posting Permission"
                           onChange={(e) => {
                              setUserList((prevUserList) => {
                                 let newList = [...prevUserList];
                                 newList[index] = { ...newList[index], sdPosting: e.target.value };
                                 return [...newList]
                              })
                           }}
                           value={elememt.sdPosting} >
                           <MenuItem value='' disabled>select</MenuItem>
                           {permissionList.map(elememt => (
                              <MenuItem key={elememt} value={elememt}>{elememt}</MenuItem>
                           ))}
                        </TextField>
                     </Col>
                     {/* {index !== 0 ?
                        <Col lg='1'>
                           <img src={deleteIcon} alt="" style={{ cursor: 'pointer', marginTop: '70%', height: '25px', width: '25px' }} onClick={() => { deleteUser(index) }}></img>
                        </Col>
                        : null} */}
                  </Row>
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
                     {/* {index !== 0 ?
                              <Col lg='1'>
                                 <img src={deleteIcon} alt="" style={{ cursor: 'pointer', marginTop: '70%', height: '25px', width: '25px' }} onClick={() => { deleteUser(index) }}></img>
                              </Col>
                              : null} */}
                  </Row>
                  <Button className="mr-1" style={{float:'right', backgroundColor:'#BE1452', color: 'white'}}
                     onClick={() => {addNewUser();}}>Submit</Button> 
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
                  onClick={() => {history.goBack();}} ></Buttons>
            </div>
         </div>
      </>
   );
};

const mapStateToProps = ({ }) => ({});
const actions = {
   getAllCorporateUser
}

export default compose(connect(mapStateToProps, actions))(AddNewCorporate);
