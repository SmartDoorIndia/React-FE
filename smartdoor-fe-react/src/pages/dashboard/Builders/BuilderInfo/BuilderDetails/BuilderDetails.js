/** @format */

import React, { useEffect, useState } from "react";
import { Button, Row, Col, Container, Card, Image } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import pencilIcon from "../../../../../assets/svg/edit-circle.svg";
import facebook from "../../../../../assets/svg/socialmedia/facebook.svg";
import insta from "../../../../../assets/svg/socialmedia/insta.svg";
import whatsapp from "../../../../../assets/svg/socialmedia/whatsapp.svg";
import "./BuilderDetails.scss";
import Text from "../../../../../shared/Text/Text";
import { getBuilderById } from "../../../../../common/redux/actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NoImage from "../../../../../assets/images/sd-faded.png";

const BuilderDetails = (props) => {

   const history = useHistory();
   const [builderDetails, setBuilderDetails] = useState({});

   useEffect(() => {
      console.log(props)
      getBuilderById({ builderId: props.builderId })
         .then((response) => {
            // console.log(response)
            setBuilderDetails(response?.data?.resourceData);
         });

   }, []);

   return (
      <Container className="builderpropertydetail-container">
         <Card className="shadow-sm">
            <Row className="justify-content-between pt-4 pb-2 px-5">
               <div className="mb-3">
                  <h4>Builder profile info in SmartDoor Services</h4>
                  <p className="text-muted">
                     Some info may be visible to other people using SmartDoor
                  </p>
               </div>
               <div className="text-end">
                  {/* <a href="/builder/Project-details" style={{ textDecoration: "none" }}> */}
                  <Button
                     className="d-flex px-2 ml-3"
                     style={{
                        color: "#BE1452",
                        backgroundColor: "#F8F3F5",
                        borderColor: "#DED6D9",
                     }}
                     onClick={() => {
                        history.push("/admin/builders/builder-profile", {builderDetails: builderDetails})
                     }}
                  >
                     <div
                        style={{
                           width: "20px",
                           height: "20px",
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                        }}
                     >
                        <Image src={pencilIcon} />
                     </div>
                     <Text
                        text={"Edit Profile"}
                        fontWeight="bold"
                        style={{ fontSize: "12px", color: "#BE1452" }}
                     />
                  </Button>
                  {/* </a> */}
               </div>
            </Row>

            <Row className="align-items-center builderpropertydetail px-3 py-2">
               <Col xs={12} md={3} className="text-center mb-3 mb-md-0">
                  <img
                     src={builderDetails?.companyLogoImageUrl || NoImage}
                     alt="Company Logo"
                     className="img-fluid rounded"
                  />
               </Col>

               <Col xs={12} md={9}>
                  <Row className="flex-row mb-3">
                     <div>
                        <strong>Brand Name</strong>
                        <p>{builderDetails?.brandName}</p>
                     </div>
                     <div>
                        <strong>Company Name</strong>
                        <p>{builderDetails?.companyName}</p>
                     </div>
                     <div>
                        <strong>Company Email</strong>
                        <p>{builderDetails?.companyEmail}</p>
                     </div>
                     <div>
                        <strong>Company GST</strong>
                        <p>{builderDetails?.companyGST}</p>
                     </div>
                  </Row>
                  <Row className="mb-3">
                     <div>
                        <strong>Address</strong>{" "}
                        <p>
                           {builderDetails?.companyAddress}
                        </p>
                     </div>
                  </Row>
                  <Row style={{ gap: "10px" }}>
                     <a href="#">
                        <Image src={facebook} onClick={() => {window.open(builderDetails?.facebookUrl, '_blank')}} />
                     </a>
                     <a href="#">
                        <Image src={insta} onClick={() => {window.open(builderDetails?.instaUrl, '_blank')}} />
                     </a>
                     <a href="#">
                        <Image src={whatsapp} />
                     </a>
                  </Row>
               </Col>
            </Row>

            <hr />
            
            {builderDetails?.directors?.length > 0 && (
               <Row className="px-4 py-2 builderpropertydetail2">
                  {builderDetails?.directors?.map((director, index) => (
                     <>
                        <Col md={3}>
                           <p>
                              <strong>Director Name {index + 1}</strong>
                           </p>
                           <p>{director?.directorName}</p>
                        </Col>
                     </>
                  ))}
               <hr />
               </Row>
            )}


            <Row className="px-4 mb-2 builderpropertydetail3">
               <Col md={3}>
                  <p>
                     <strong>Contact Person Name</strong>
                  </p>
                  <p>{builderDetails?.contactName}</p>
               </Col>
               <Col md={3}>
                  <p>
                     <strong>Mobile Number</strong>
                  </p>
                  <p>{builderDetails?.contactNumber}</p>
               </Col>
            </Row>
         </Card>
      </Container>
   );
};

export default BuilderDetails;
