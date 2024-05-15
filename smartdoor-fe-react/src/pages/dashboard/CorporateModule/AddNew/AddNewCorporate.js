/** @format */

import { TextField } from "@mui/material";
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
         <div className="bg-white border h-75">
            <Text
               text={"Corporate Details"}
               fontWeight="bold"
               style={{ fontSize: "16px", marginLeft: "17px", marginTop: "10px" }}
            />
            <div className="w-100" style={{ overflowX: "hidden", marginLeft: "12px"}}>
               <Row>
                  <Col lg="4" style={{ marginTop: "0%" , paddingRight: "5px" }}>
                     <Button
                        className="w-20 h-[80%] mt-4"
                        style={{
                           color: "#949494",
                           borderStyle: "dotted",
                           borderColor: "GrayText",
                           borderWidth: "2px",
                           backgroundColor: "unset",
                        }}
                        onClick={() => {
                           fileInputRef.current?.click();
                        }}
                     >
                        <div className="d-flex justify-content-center mt-1 mb-0  ">
                           <Image src={cameraIcon}></Image>Upload logo
                        </div>
                     </Button>
                     <input
                        hidden
                        type="file"
                        ref={fileInputRef}
                        accept=".png, .jpg, .jpeg"
                        multiple={true}
                     />
                  </Col>
                  <Col lg="4" style={{ marginTop: "0%" }}>
                     <TextField
                        className="w-100 mt-4 ml-0"
                        type="text"
                        label="Corporate Name"
                        // onInput={(e) => { setAgencyDetails({ ...agencyDetails, agencyName: e.target.value }) }}
                        // defaultValue={agencyDetails.agencyName}
                     />
                     <Text color="dangerText" size="xSmall" className="pt-2" text={""} />
                  </Col>
                  <Col lg="4" style={{ marginTop: "0%"}}>
                     <TextField
                        className="w-100 mt-4 "
                        type="text"
                        label="Branch"
                        // onInput={(e) => { setAgencyDetails({ ...agencyDetails, agencyName: e.target.value }) }}
                        // defaultValue={agencyDetails.agencyName}
                     />
                     <Text color="dangerText" size="xSmall" className="pt-2" text={""} />
                  </Col>
               </Row>
               <Row>
                  <Col lg="4" style={{ marginTop: "0%" }}>
                     <TextField
                        className="w-100 mt-4"
                        type="text"
                        label="Address"
                        // onInput={(e) => { setAgencyDetails({ ...agencyDetails, agencyName: e.target.value }) }}
                        // defaultValue={agencyDetails.agencyName}
                     />
                     <Text color="dangerText" size="xSmall" className="pt-2" text={""} />
                  </Col>
               </Row>
            </div>

            <hr></hr>
            <Text
               text={"Admin Details"}
               fontWeight="bold"
               style={{ fontSize: "16px", marginLeft: "17px" }}
            />
            <div className="w-100" style={{ overflowX: "hidden", marginLeft: "12px" }}>
               <Row>
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
            </div>

            <hr></hr>
            <div className="bg-white border" style={{ padding: "10px" }}>
               <div
                  className=" d-flex align-content-lg-between"
                  // style={{ padding: "10px", display: "flex", alignItems: "center" }}
               >
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
            </div>
         </div>
      </>
   );
};

export default AddNewCorporate;
