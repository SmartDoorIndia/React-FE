/** @format */

import { MenuItem, Table, TableBody, TableCell, TableRow, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import Text from "../../../../shared/Text/Text";
import Buttons from "../../../../shared/Buttons/Buttons";
import cameraIcon from "../../../../assets/images/camra-icon.svg";
import CONSTANTS_STATUS from "../../../../common/helpers/ConstantsStatus";
import addIcon from '../../../../assets/svg/add.svg';
import searchIcon from '../../../../assets/svg/Search.svg';
import { validateCorpUser } from "../../../../common/validations";

const AddNewCorporate = () => {
   const [error, setError] = useState({});
   const [userErr, setUserErr] = useState({})
   const fileInputRef = useRef(null);
   const permissionList = CONSTANTS_STATUS.permissionList;
   const [logoImg, setLogoImg] = useState('');
   const [newUser, setNewUser] = useState({
      name: '',
      mobile: '',
      permission: ''
   });
   const [userList, setUserList] = useState([]);

   const addNewUser = async () => {
      const valid = await validateCorpUser(newUser);
      setUserErr(valid.errors)
      if (valid.isValid) {
         let userlist = [...userList];
         userlist.push(newUser);
         let newUserObj = {
            name: '',
            mobile: '',
            permission: ''
         }
         setNewUser({...newUserObj})
         setUserList([...userlist]);
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
            <div className="ml-3">
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
                        }}
                        onClick={() => {
                           fileInputRef.current?.click();
                        }}
                     >
                        <Image src={cameraIcon}></Image>
                        <Text className='mb-1 mt-1' text={'Upload logo'} style={{ color: '#949494', fontSize: '16px' }} ></Text>
                     </Button>
                     <input
                        hidden
                        type="file"
                        ref={fileInputRef}
                        accept=".png, .jpg, .jpeg"
                        multiple={false}
                     />
                  </Col>
                  <Col lg='4'>
                     <TextField
                        className="w-100 ml-0 mt-4  "
                        type="text"
                        label="Company Name"
                     // onInput={(e) => { setAgencyDetails({ ...agencyDetails, agencyName: e.target.value }) }}
                     // defaultValue={agencyDetails.agencyName}
                     />
                  </Col>
                  <Col lg='6'>
                     <TextField
                        className="w-90 ml-0 mt-4  "
                        type="text"
                        label="Address"
                     // onInput={(e) => { setAgencyDetails({ ...agencyDetails, agencyName: e.target.value }) }}
                     // defaultValue={agencyDetails.agencyName}
                     />
                  </Col>
               </Row>
            </div>

            <hr></hr>
            <Text
               text={"User Details"}
               fontWeight="bold"
               style={{ fontSize: "16px", marginLeft: "17px" }}
            />
            {userList.map(elememt => (
               <>
                  <Row className="ml-1 mr-1">
                     <Col lg="4" style={{ marginTop: "0%" }}>
                        <TextField
                           className="w-100 mt-4"
                           type="text"
                           contentEditable={false}
                           error={userErr.name}
                           label="Admin Name"
                           // onInput={(e) => { setNewUser({ ...newUser, name: e.target.value }) }}
                           defaultValue={elememt.name}
                        />
                        <Text color="dangerText" size="xSmall" className="pt-2" text={""} />
                     </Col>
                     <Col lg="4" style={{ marginTop: "0%" }}>
                        <TextField
                           className="w-100 mt-4"
                           type="number"
                           contentEditable={false}
                           label="Mobile Number"
                           error={userErr.mobile}
                           InputProps={{
                              startAdornment:
                                 <>
                                    <Text className='ml-2 mr-2' text={'+91'} style={{ fontSize: '16px' }} fontWeight={'500'} />
                                 </>
                           }}
                           // onInput={(e) => { setNewUser({ ...newUser, mobile: e.target.value }) }}
                           defaultValue={elememt.mobile}
                        />
                        <Text color="dangerText" size="xSmall" className="pt-2" text={""} />
                     </Col>
                     <Col lg='4'>
                        <TextField
                           className="w-100 mt-4"
                           select
                           contentEditable={false}
                           label="Posting Permission"
                           error={userErr.permission}
                           // onChange={(e) => { setNewUser({ ...newUser, permission: e.target.value }) }}
                           defaultValue={elememt.permission} >
                           {permissionList.map(elememt => (
                              <MenuItem key={elememt} value={elememt}>{elememt}</MenuItem>
                           ))}
                        </TextField>
                     </Col>
                  </Row>
               </>
            ))}
            <Row className="ml-1 mr-1">
               <Col lg="4" style={{ marginTop: "0%" }}>
                  <TextField
                     className="w-100 mt-4"
                     type="text"
                     error={userErr.name}
                     label="Admin Name"
                     onInput={(e) => { setNewUser({ ...newUser, name: e.target.value }) }}
                     defaultValue={newUser.name}
                  />
                  <Text color="dangerText" size="xSmall" className="pt-2" text={""} />
               </Col>
               <Col lg="4" style={{ marginTop: "0%" }}>
                  <TextField
                     className="w-100 mt-4"
                     type="number"
                     label="Mobile Number"
                     error={userErr.mobile}
                     InputProps={{
                        startAdornment:
                           <>
                              <Text className='ml-2 mr-2' text={'+91'} style={{ fontSize: '16px' }} fontWeight={'500'} />
                           </>
                     }}
                     onInput={(e) => { setNewUser({ ...newUser, mobile: e.target.value }) }}
                     defaultValue={newUser.mobile}
                  />
                  <Text color="dangerText" size="xSmall" className="pt-2" text={""} />
               </Col>
               <Col lg='4'>
                  <TextField
                     className="w-100 mt-4"
                     select
                     label="Posting Permission"
                     error={userErr.permission}
                     onChange={(e) => { setNewUser({ ...newUser, permission: e.target.value }) }}
                     defaultValue={newUser.permission} >
                     {permissionList.map(elememt => (
                        <MenuItem key={elememt} value={elememt}>{elememt}</MenuItem>
                     ))}
                  </TextField>
               </Col>
            </Row>
            <hr />
            <Button className="d-flex py-1 ml-3 mb-2" style={{ color: '#BE1452', backgroundColor: '#F8F3F5', borderColor: '#DED6D9' }}
               onClick={() => { addNewUser(); }}>
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
               <Buttons name='Cancel' varient='secondary' className='col-2 py-2' ></Buttons> &nbsp; &nbsp;
               <Buttons name='Submit' varient='primary' className='col-2 py-2' ></Buttons>
            </div>
         </div>
      </>
   );
};

export default AddNewCorporate;
