/** @format */

import { Table, TableBody, TableCell, TableRow, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import Text from "../../../../shared/Text/Text";
import Buttons from "../../../../shared/Buttons/Buttons";
import cameraIcon from "../../../../assets/images/camra-icon.svg";

const AddNewCorporate = () => {
   const [error, setError] = useState({});
   const fileInputRef = useRef(null);

   return (
      <>
         <div className="bg-white border">
            <Text
               text={"Corporate Details"}
               fontWeight="bold"
               style={{ fontSize: "16px", marginLeft: "17px", marginTop: "10px" }}
            />
            <div className="ml-3">
               <Table>
                  <TableBody>
                     <TableRow style={{ borderStyle: 'hidden' }}>
                        <TableCell rowSpan={2} style={{ paddingInline: '0%' }}>
                           <Button
                              className="w-100 h-auto py-5 mt-2"
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
                        </TableCell>
                        <TableCell style={{ paddingTop: '0%' }}>
                           <TextField
                              className="w-90 mt-4 ml-0"
                              type="text"
                              label="Corporate Name"
                           // onInput={(e) => { setAgencyDetails({ ...agencyDetails, agencyName: e.target.value }) }}
                           // defaultValue={agencyDetails.agencyName}
                           />
                        </TableCell>
                        <TableCell style={{ paddingTop: '0%' }}>
                           <TextField
                              className="w-90 mt-4 "
                              type="text"
                              label="Branch"
                           // onInput={(e) => { setAgencyDetails({ ...agencyDetails, agencyName: e.target.value }) }}
                           // defaultValue={agencyDetails.agencyName}
                           />
                        </TableCell>
                     </TableRow>
                     <TableRow style={{ borderStyle: 'hidden' }}>
                        <TableCell colSpan={2} style={{ paddingTop: '0%' }} >
                           <TextField
                              style={{ width: '95%' }}
                              type="text"
                              label="Address"
                           // onInput={(e) => { setAgencyDetails({ ...agencyDetails, agencyName: e.target.value }) }}
                           // defaultValue={agencyDetails.agencyName}
                           />
                        </TableCell>
                     </TableRow>
                  </TableBody>
               </Table>
            </div>

            <hr></hr>
            <Text
               text={"Admin Details"}
               fontWeight="bold"
               style={{ fontSize: "16px", marginLeft: "17px" }}
            />
            <Row className="ml-1">
               <Col lg="4" style={{ marginTop: "0%" }}>
                  <TextField
                     className="w-100 mt-4"
                     type="text"
                     label="Admin Name"
                  // onInput={(e) => { setAgencyDetails({ ...agencyDetails, agencyName: e.target.value }) }}
                  // defaultValue={agencyDetails.agencyName}
                  />
                  <Text color="dangerText" size="xSmall" className="pt-2" text={""} />
               </Col>
               <Col lg="4" style={{ marginTop: "0%" }}>
                  <TextField className="w-100 mt-4" type="text" label="Mobile Number" />
                  <Text color="dangerText" size="xSmall" className="pt-2" text={""} />
               </Col>
            </Row>
            <hr></hr>
            <Text
               text={"Plans"}
               fontWeight="bold"
               style={{ fontSize: "16px", marginLeft: "17px" }}
            />
            <Row className="ml-1 mb-4">
               <Col lg='4'>
                  <TextField
                     className=" mt-4"
                     type="text"
                     label="Outstanding Budget Cap"
                     InputProps={{
                        startAdornment: (
                           <>
                              <Text text={'₹'} style={{ fontSize: '16px' }} ></Text>
                           </>
                        )
                     }} />
               </Col>
            </Row>

            {/* <div className="bg-white border">
               <div className=" d-flex align-content-lg-between" >
                  <Text
                     text={"Users"}
                     fontWeight="bold"
                     style={{ fontSize: "16px", marginLeft: "17px" }}
                  />
                  <Buttons
                     name="Add new User"
                     varient="primary"
                     size="xSmall"
                     color="white"
                     style={{ marginLeft: "auto", marginRight: "15px" }}
                  ></Buttons>
               </div>
               <hr></hr>
               <div
                  style={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     height: "24vh",
                     flexDirection: "column",
                  }}
               >
                  <Text
                     text={"You don’t have any user. You can add now or later."}
                     fontWeight="bold"
                     style={{ fontSize: "16px", textAlign: "center" }}
                  />
               </div>
            </div> */}
            <div className="d-flex ml-3">
               <Buttons name='Cancel' varient='secondary' className='col-2 py-2' ></Buttons> &nbsp; &nbsp;
               <Buttons name='Submit' varient='primary' className='col-2 py-2' ></Buttons>
            </div>
         </div>
      </>
   );
};

export default AddNewCorporate;
