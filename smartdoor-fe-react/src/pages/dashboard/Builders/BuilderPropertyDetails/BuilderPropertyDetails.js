/** @format */

import React from "react";
import { Button, Row, Col, Container, Card, Image } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import pencilIcon from "../../../../assets/svg/edit-circle.svg";
import facebook from "../../../../assets/svg/socialmedia/facebook.svg";
import insta from "../../../../assets/svg/socialmedia/insta.svg";
import whatsapp from "../../../../assets/svg/socialmedia/whatsapp.svg";

import "./BuilderPropertyDetails.scss";
import Text from "../../../../shared/Text/Text";
const BuilderPropertyDetails = () => {
   return (
      <Container className="mt-5 builderpropertydetail-container">
         <Row className="justify-content-between p-4">
            <div>
               <ul className="list-container">
                  <li className="list-item inactive-item">Properties</li>
                  <li className="list-item active-item">Details</li>
               </ul>
            </div>
            <div>
               <Button
                  className="d-flex px-2 ml-3"
                  style={{
                     color: "#949494",
                     backgroundColor: "#FFF",
                     borderColor: "#DED6D9",
                  }}
               >
                  <Text
                     text={"In-Active"}
                     fontWeight="bold"
                     style={{ fontSize: "12px", color: "#949494" }}
                  />
               </Button>
            </div>
         </Row>
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
                     //  onClick={() => {
                     //     localStorage.removeItem("builderProjectSubPostId");
                     //  }}
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
                     src="https://via.placeholder.com/150"
                     alt="Company Logo"
                     className="img-fluid rounded"
                  />
               </Col>

               <Col xs={12} md={9}>
                  <Row className="flex-row mb-3">
                     <div>
                        <strong>Brand Name</strong>
                        <p>Kolte Patil</p>
                     </div>
                     <div>
                        <strong>Company Name</strong>
                        <p>Kolte Patil Pvt. Ltd.</p>
                     </div>
                     <div>
                        <strong>Company Email</strong>
                        <p> tanuj.patil@kolte.com</p>
                     </div>
                     <div>
                        <strong>Company GST</strong>
                        <p>22AAAAA000A1Z5</p>
                     </div>
                  </Row>
                  <Row className="mb-3">
                     <div>
                        <strong>Address</strong>{" "}
                        <p>
                           Office No. 002, 28, Zenith Complex, KB Joshi Path, Sahakarnagar No - 2,
                           Narveer Tanaji Wadi, Shivajinagar, Pune, Maharashtra 411005
                        </p>
                     </div>
                  </Row>
                  <Row style={{ gap: "10px" }}>
                     <a href="#">
                        <Image src={facebook} />
                     </a>
                     <a href="#">
                        <Image src={insta} />
                     </a>
                     <a href="#">
                        <Image src={whatsapp} />
                     </a>
                  </Row>
               </Col>
            </Row>

            <hr />

            <Row className="px-4 py-2 builderpropertydetail2">
               <Col md={3}>
                  <p>
                     <strong>Director Name 1</strong>
                  </p>
                  <p>Sanjay Upadhyay</p>
               </Col>
               <Col md={3}>
                  <p>
                     <strong>Director Name 2</strong>
                  </p>
                  <p>Suresh Gupta</p>
               </Col>
               <Col md={3}>
                  <p>
                     <strong>Director Name 3</strong>
                  </p>
                  <p>--</p>
               </Col>
               <Col md={3}>
                  <p>
                     <strong>Director Name 4</strong>
                  </p>
                  <p>--</p>
               </Col>
            </Row>

            <hr />

            <Row className="px-4 py-2 builderpropertydetail3">
               <Col md={3}>
                  <p>
                     <strong>Contact Person Name</strong>
                  </p>
                  <p>Tanuj Patil</p>
               </Col>
               <Col md={3}>
                  <p>
                     <strong>Mobile Number</strong>
                  </p>
                  <p>+91 989 898 9898</p>
               </Col>
            </Row>
         </Card>
      </Container>
   );
};

export default BuilderPropertyDetails;
