/** @format */

import React from "react";
import { compose } from "redux";
import { Col, Row } from "react-bootstrap";
import Image from "../../../shared/Image/Image";
import userImage from "../../../assets/svg/avatar_sml.svg";
import Text from "../../../shared/Text/Text";
import Buttons from "../../../shared/Buttons/Buttons";
import "./Broker.scss";

const BrokerApprovedDetial = () => {
   return (
      <>
         <div className="dashboard container-fluid12">
            <Row>
               <Col lg={12}>
                  <div className="authorContact mt-4">
                     <div className="d-flex">
                        <div className="author">
                           <Image name="author" className="object-cover" src={userImage} />
                        </div>
                        <div className="ml-3 mt-2">
                           <Text
                              className="boldness"
                              size="large"
                              fontWeight="mediumbold"
                              text="Mohit Suryavanshi(4 Yrs)"
                           />
                           <Text size="xSmall" fontWeight="smbold" text="Joined on: Aug 20, 2017" />
                        </div>
                     </div>
                  </div>
               </Col>
            </Row>
            <div className="hjkfh mt-5 ">
               <Text
                  size="large"
                  fontWeight="mediumbold"
                  color="secondryColor"
                  text="Profession Details"
               />
               <Row className="mt-2">
                  <Col>
                     <Text
                        size="xSmall"
                        fontWeight="semibold"
                        color="TaupeGrey"
                        text="Location Assigned"
                     />
                     <Text size="Small" fontWeight="mediumbold" color="secondryColor" text="dfd" />
                  </Col>
                  <Col>
                     <Text
                        size="xSmall"
                        fontWeight="semibold"
                        color="TaupeGrey"
                        text="Specialized In"
                     />
                     <Text size="Small" fontWeight="mediumbold" color="secondryColor" text="dfd" />
                  </Col>
                  <Col>
                     <Text
                        size="xSmall"
                        fontWeight="semibold"
                        color="TaupeGrey"
                        text="Services Offered"
                     />
                     <Text size="Small" fontWeight="mediumbold" color="secondryColor" text="dfd" />
                  </Col>
                  <Col>
                     <Text
                        size="xSmall"
                        fontWeight="semibold"
                        color="TaupeGrey"
                        text="Languages Preferences"
                     />
                     <Text size="Small" fontWeight="mediumbold" color="secondryColor" text="dfd" />
                  </Col>
               </Row>
            </div>

            <div className=" mt-4 ">
               <Text
                  size="large"
                  fontWeight="mediumbold"
                  color="secondryColor"
                  text="Personal Details"
               />
               <Row className="mt-2">
                  <Col>
                     <Text
                        size="xSmall"
                        fontWeight="semibold"
                        color="TaupeGrey"
                        text="Phone Number"
                     />
                     <Text size="Small" fontWeight="mediumbold" color="secondryColor" text="dfd" />
                  </Col>
                  <Col>
                     <Text
                        size="xSmall"
                        fontWeight="semibold"
                        color="TaupeGrey"
                        text="Date of Birth"
                     />
                     <Text size="Small" fontWeight="mediumbold" color="secondryColor" text="dfd" />
                  </Col>
                  <Col>
                     <Text size="xSmall" fontWeight="semibold" color="TaupeGrey" text="Email" />
                     <Text
                        size="Small"
                        fontWeight="mediumbold"
                        color="secondryColor"
                        text="manish.tiwari@gmail.com"
                     />
                  </Col>
                  <Col>
                     <Text
                        size="xSmall"
                        fontWeight="semibold"
                        color="TaupeGrey"
                        text="Office Address"
                     />
                     <Text
                        size="Small"
                        fontWeight="mediumbold"
                        color="secondryColor"
                        text="6391 Elgin St. Celina, Delaware 10299"
                     />
                  </Col>
               </Row>
            </div>
            <div className=" mt-4  d-flex ">
               <div className="mr-2">
                  <Buttons
                     name="Decline"
                     varient=""
                     size="Small"
                     color="black"
                     style={{ height: "40px !important" }}
                  >
                     Decline
                  </Buttons>
               </div>
               <div className="mr-2">
                  <Buttons class="btn Small white  primary" name="Search">
                     Approve
                  </Buttons>
               </div>
            </div>
         </div>
      </>
   );
};

export default compose()(BrokerApprovedDetial);
