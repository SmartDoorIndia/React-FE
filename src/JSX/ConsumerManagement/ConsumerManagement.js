/** @format */

import React from "react";
import Image from "../../shared/Image/Image";
import Button from "../../shared/Buttons/Buttons";
import Text from "../../shared/Text/Text";
import { Col, Row } from "react-bootstrap";
import editIcon from "../../assets/images/edit-icon.svg";
import dismissIcon from "../../assets/images/dismiss-icon.svg";
import mailIcon from "../../assets/images/mail-icon.svg";
import consumerIcon from "../../assets/images/consumerIcon.png";
import adhar from "../../assets/images/adhar.png";

import "./ConsumerManagement.scss";

const ConsumerManagement = (props) => {
   return (
      <div className="whiteBg">
         <Row>
              <Col lg="6">
               <div className="d-flex">
                  <Image name="consumerIcon" src={ consumerIcon } className="mr-4" />
                      <div>
                          <Text size="regular" fontWeight="smbold" color="secondryColor" text="Amit Singh" className="mt-1" />
                          <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Consumer" className="mt-1" />
                          <Text size="xSmall" fontWeight="smbold" color="secondryColor" text="Joined on: Jan 23, 2020" className="mt-2" />
                  </div>
               </div>
               <div className="d-flex align-items-center  justify-content-between pt-2 personalDetail">
                      <Text size="Small" fontWeight="smbold" color="secondryColor" text="Location" className="mt-1" />
                      <Text size="Small" fontWeight="mediumbold" color="secondryColor" text="Pune" className="mt-1" />
               </div>
               <div className="d-flex align-items-center  justify-content-between pt-2 personalDetail">
                      <Text size="Small" fontWeight="smbold" color="secondryColor" text="Date of Birth" className="mt-1" />
                      <Text size="Small" fontWeight="mediumbold" color="secondryColor" text="Sep 16, 1989" className="mt-1" />
                    </div>
               <div className="d-flex align-items-center  justify-content-between pt-2 personalDetail">
                      <Text size="Small" fontWeight="smbold" color="secondryColor" text="Phone Number" className="mt-1" />
                      <Text size="Small" fontWeight="mediumbold" color="secondryColor" text="(406) 555-0120" className="mt-1" />
                    </div>
               <div className="d-flex align-items-center  justify-content-between pt-2 personalDetail">
                      <Text size="Small" fontWeight="smbold" color="secondryColor" text="Email" className="mt-1" />
                      <Text size="Small" fontWeight="mediumbold" color="secondryColor" text="cody.fisher@smartdoor.com" className="mt-1" />
               </div>
            </Col>
              <Col lg="6">
               <div className="text-right">
                      <Button name="Edit" varient="lightBtn" type="submit" size="Small" color="secondryColor" iconSrc={ editIcon } className="mr-3" />
                      <Button name="Block" varient="lightBtn" type="submit" size="Small" color="secondryColor" iconSrc={ dismissIcon } className="mr-3" />
                      <Button name="Contact" varient="primary" type="submit" size="Small" color="white" iconSrc={ mailIcon } />

                  <div className="mt-5">
                     <div className="d-flex justify-content-end align-items-center">
                              <div className="mr-4">
                                  <Text size="Small" fontWeight="smbold" color="secondryColor" text="Aadhar Number: AA23456-5678" className="mt-1" />
                                  <Button name="Verify KYC" varient="primary" type="submit" size="Small" color="white" className="mt-3" />
                                 <Image name="consumerIcon" src={ adhar } />
                              </div>
                     </div>
                     <Text size="Small" fontWeight="mediumbold" color="primaryColor" text="On visit: 102 Windsor Park, Pune" className="mt-1" />
                  </div>
               </div>
            </Col>
         </Row>
      </div>
   );
};

export default ConsumerManagement;
