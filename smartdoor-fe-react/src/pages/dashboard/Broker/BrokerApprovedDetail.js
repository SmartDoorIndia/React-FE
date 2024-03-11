/** @format */

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { compose } from "redux";
import { Col, Row } from "react-bootstrap";
import Image from "../../../shared/Image/Image";
import userImage from "../../../assets/svg/avatar_sml.svg";
import Text from "../../../shared/Text/Text";
import Buttons from "../../../shared/Buttons/Buttons";
import "./Broker.scss";
import { handleStatusElement, formateDate } from "../../../common/helpers/Utils";
import { getBrokerDetailsForApprove, getBrokerStatusDetail,getBrokerDeclineStatusDetail } from "../../../common/redux/actions";
import { useParams, useHistory } from "react-router-dom";

const BrokerApprovedDetail = (props) => {
   const { brokerdetailId } = useParams();
   const [loading, setLoading] = useState(true);
   const [brokerApprovedData, setBrokerApprovedData] = useState([]);
   console.log(brokerApprovedData,"approved")
   const history = useHistory();
   const reverse = useHistory();

   const HandleSubmit = () => {
      getBrokerStatusDetail({
         brokerId: brokerdetailId,
         status: "Approved",
      });
      setTimeout(()=>{
         history.push('/admin/broker');
       window.location.reload();
      },1000)

   }

   const HandleRejected = () => {
      getBrokerDeclineStatusDetail({
         brokerId: brokerdetailId,
         status: "Rejected",
      });
      setTimeout(()=>{
         reverse.push('/admin/broker');
       window.location.reload();
      },1000)
      
   };

   const _getBrokerDetails = useCallback(() => {
      getBrokerDetailsForApprove({ brokerId: brokerdetailId })
         .then((response) => {
            setLoading(false);
            if (response.data) {
               if (response.data) setBrokerApprovedData(response.data);
            }
         })
         .catch((error) => {
            setLoading(true);
         });
   }, [getBrokerDetailsForApprove, brokerdetailId]);
   useEffect(() => {
      _getBrokerDetails();
   }, [_getBrokerDetails]);
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
                           <p className="boldness" size="large" fontWeight="mediumbold">
                              {brokerApprovedData.resourceData?.name}
                           </p>
                           <p size="xSmall" fontWeight="smbold">
                              {formateDate(brokerApprovedData.resourceData?.joinedDate) ?? ""}
                           </p>
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
                     <p size="Small" fontWeight="mediumbold" color="secondryColor">
                        {brokerApprovedData.resourceData?.brokerlocation?.locationName}
                     </p>
                  </Col>
                  <Col>
                     <Text
                        size="xSmall"
                        fontWeight="semibold"
                        color="TaupeGrey"
                        text="Specialized In"
                     />
                     <p size="Small" fontWeight="mediumbold" color="secondryColor">
                        {brokerApprovedData?.resourceData?.specializedIn &&
                           brokerApprovedData.resourceData.specializedIn.map(
                              (data, index) =>
                                 index ===
                                    brokerApprovedData.resourceData.specializedIn.length - 1 && (
                                    <p key={index} className="details">
                                       {data.specializedIn}
                                    </p>
                                 )
                           )}
                     </p>
                   
                  </Col>
                  <Col>
                     <Text
                        size="xSmall"
                        fontWeight="semibold"
                        color="TaupeGrey"
                        text="Services Offered"
                     />
                       <div className="brokerapproved-servicedoffered">
                        <p className="details">
                           {brokerApprovedData?.resourceData?.rent == true ? "Rent" : "NA"}
                        </p>
                        <p className="details">
                           {brokerApprovedData?.resourceData?.sale == true ? "Sell" : "NA"}
                        </p>
                     </div>
                  </Col>
                  <Col>
                     <Text
                        size="xSmall"
                        fontWeight="semibold"
                        color="TaupeGrey"
                        text="Languages Preferences"
                     />
                     <p size="Small" fontWeight="mediumbold" color="secondryColor">
                        {brokerApprovedData?.resourceData?.languagePreference &&
                           brokerApprovedData.resourceData.languagePreference.map((data, index) => (
                              <p key={index} className="details d-flex">
                                 {data.languagePreference}
                              </p>
                           ))}
                     </p>
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
                     <p size="Small" fontWeight="mediumbold" color="secondryColor">
                        {brokerApprovedData?.resourceData?.mobileNoForCustomer}
                     </p>
                  </Col>
                  <Col>
                     <Text
                        size="xSmall"
                        fontWeight="semibold"
                        color="TaupeGrey"
                        text="Date of Birth"
                     />
                     <p size="Small" fontWeight="mediumbold" color="secondryColor">
                        {brokerApprovedData?.resourceData?.dob}
                     </p>
                  </Col>
                  <Col>
                     <Text size="xSmall" fontWeight="semibold" color="TaupeGrey" text="Email" />
                     <p size="Small" fontWeight="mediumbold" color="secondryColor">
                        {brokerApprovedData?.resourceData?.email}
                     </p>
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
                     varient="lightBtn"
                     size="Small"
                     color="secondryColor"
                     style={{ height: "40px !important" }}
                     onClick={HandleRejected}
                  >
                     Decline
                  </Buttons>
               </div>
               <div className="mr-2">
                  <Buttons class="btn Small white  primary" name="Approve" onClick={HandleSubmit}>
                     Approve
                  </Buttons>
               </div>
            </div>
         </div>
      </>
   );
};

export default compose()(BrokerApprovedDetail);
