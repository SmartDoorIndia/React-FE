/** @format */

import React, { useEffect, useState } from "react";
import { Button, Row, Col, Container, Card, Image, Modal } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import pencilIcon from "../../../../../assets/svg/edit-circle.svg";
import facebook from "../../../../../assets/svg/socialmedia/facebook.svg";
import insta from "../../../../../assets/svg/socialmedia/insta.svg";
import whatsapp from "../../../../../assets/svg/socialmedia/whatsapp.svg";
import "./BuilderDetails.scss";
import Text from "../../../../../shared/Text/Text";
import {
   getBuilderById,
   getLeadForBuilder,
   setBuilderStatus,
} from "../../../../../common/redux/actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NoImage from "../../../../../assets/images/sd-faded.png";
import { TextField, Tooltip } from "@mui/material";
import Buttons from "../../../../../shared/Buttons/Buttons";
import { saveAs } from "file-saver";
import {
   getLocalStorage,
   showErrorToast,
   showSuccessToast,
} from "../../../../../common/helpers/Utils";
import { FallBackLoader } from "../../../../../common/helpers/Loader";

const BuilderDetails = (props) => {
   const history = useHistory();
   const [builderDetails, setBuilderDetails] = useState({});
   const [fromDate, setFromDate] = useState(new Date().toISOString().split("T")[0]);
   const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
   const [rejectModal, setRejectModal] = useState(false);
   const [rejectionComment, setRejectComment] = useState("");
   const userData = getLocalStorage("authData");
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      console.log(props);
      setLoading(true);
      getBuilderById({ builderId: props.builderId, userId: props?.userId }).then((response) => {
         // console.log(response)
         setLoading(false);
         setBuilderDetails(response?.data?.resourceData);
      });
   }, []);

   const downloadCSV = async () => {
      setLoading(true);
      const response = await getLeadForBuilder({
         builderId: props?.builderId,
         fromDate: fromDate,
         toDate: toDate,
      });
      console.log(response);
      setLoading(false);
      let data = response?.data?.resourceData;
      if (!data || data.length === 0) {
         console.warn("No data available to download");
         showErrorToast("No data available to download");
         return;
      }

      // Extract headers from the first object
      const headers = Object.keys(data[0]).join(",") + "\n";

      // Convert each object to a CSV row
      const rows = data
         .map((row) =>
            Object.values(row)
               .map((value) => `"${value}"`)
               .join(",")
         )
         .join("\n");

      // Combine headers and rows
      const csvContent = headers + rows;

      // Create a Blob with CSV content
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      // Trigger file download
      saveAs(blob, "LeadGeneration.csv");
   };

   const changeBuilderStatus = async (status, comment) => {
      setLoading(true);
      if(status === 'REJECTED') {
         if(comment?.trim()?.length === 0 || comment === null) {
            showErrorToast("Please enter rejection comment");
            setLoading(false);
            return null;
         }
      }
      const response = await setBuilderStatus({
         builderId: props?.builderId,
         userId: props?.userId,
         status: status,
         rejectionComment: comment,
         adminId: userData?.userid,
      });
      setLoading(false);
      if (response?.status === 200) {
         if (status === "ON_HOLD") {
            showSuccessToast("Builder profile set on hold");
         } else if (status === "RESTORE") {
            showSuccessToast("Builder profile restored successfully");
         } else if (status === "APPROVED") {
            showSuccessToast("Builder profile approved successfully");
         } else if (status === "REJECTED") {
            showSuccessToast("Builder profile rejected successfully");
         }
         setRejectModal(false);
         getBuilderById({ builderId: props.builderId, userId: props?.userId }).then((response) => {
            // console.log(response)
            setBuilderDetails(response?.data?.resourceData);
         });
      }
      console.log(response);
   };

   return (
      <>
         {loading ? (
            <>
               <FallBackLoader />
            </>
         ) : null}
         <Container className="builderpropertydetail-container">
            <div style={{ justifySelf: "end" }}>
               {builderDetails?.status === "UNDER_REVIEW" ? (
                  <>
                     <Buttons
                        className="mb-3 align-self-end"
                        name="APPROVE"
                        onClick={() => {
                           changeBuilderStatus("APPROVED", "");
                        }}
                     ></Buttons>{" "}
                     &nbsp;&nbsp;
                     <Buttons
                        className="mb-3 align-self-end"
                        name="REJECT"
                        onClick={() => {
                           setRejectModal(true);
                        }}
                     ></Buttons>
                  </>
               ) : null}
               {builderDetails?.status === "APPROVED" ? (
                  <>
                     <Buttons
                        className="mb-3 align-self-end"
                        name="ON HOLD"
                        onClick={() => {
                           changeBuilderStatus("ON_HOLD", "");
                        }}
                     ></Buttons>
                  </>
               ) : null}
               {builderDetails?.status === "ON_HOLD" ? (
                  <>
                     <Buttons
                        className="mb-3 align-self-end"
                        name="RESTORE"
                        onClick={() => {
                           changeBuilderStatus("RESTORE", "");
                        }}
                     ></Buttons>
                  </>
               ) : null}
            </div>
            <Card className="shadow-sm">
               <Row className="justify-content-between pt-4 pb-2 px-5">
                  <div className="mb-3">
                     <h4>Builder profile info in SmartDoor Services</h4>
                     <p className="text-muted">
                        Some info may be visible to other people using SmartDoor
                     </p>
                  </div>
                  <div className="text-end">
                     <Tooltip
                        placement="top-start"
                        style={{ width: "100%" }}
                        title={
                           (builderDetails?.status !== "APPROVED")
                              ? "Builder Profile cannot be edited"
                              : "Edit Profile"
                        }
                     >
                        <Button
                           className="d-flex px-2 ml-3"
                           style={{
                              color: "#BE1452",
                              backgroundColor: "#F8F3F5",
                              borderColor: "#DED6D9",
                           }}
                           disabled={
                              builderDetails?.status !== "APPROVED"
                                 ? true
                                 : false
                           }
                           onClick={() => {
                              history.push("/admin/builders/builder-profile", {
                                 builderDetails: builderDetails,
                              });
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
                     </Tooltip>
                  </div>
               </Row>

               <Row className="align-items-center builderpropertydetail px-3 py-2">
                  <Col xs={12} md={3} className="text-center mb-3 mb-md-0">
                     <img
                        src={builderDetails?.companyLogoImageUrl || NoImage}
                        alt="Company Logo"
                        className="img-fluid rounded"
                        style={{ width: "150px", height: "150px" }}
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
                           <strong>Address</strong> <p>{builderDetails?.companyAddress}</p>
                        </div>
                     </Row>
                     <Row style={{ gap: "10px" }}>
                        <Image
                           src={facebook}
                           alt="Facebook"
                           style={{ cursor: "pointer" }}
                           onClick={(e) => {
                              e.stopPropagation(); // prevents parent routing triggers
                              window.open(builderDetails?.facebookUrl, "_blank");
                           }}
                        />
                        <Image
                           src={insta}
                           alt="Instagram"
                           style={{ cursor: "pointer" }}
                           onClick={(e) => {
                              e.stopPropagation(); // prevents parent routing triggers
                              window.open(builderDetails?.instaUrl, "_blank");
                           }}
                        />
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
            <div className="bg-white mt-3 mb-3">
               <Row className="bg-white py-3">
                  <Col lg={4}>
                     <TextField
                        className="w-100"
                        type="date"
                        label="From Date"
                        name="fromDate"
                        value={fromDate}
                        onChange={(e) => {
                           setFromDate(e.target.value);
                        }}
                     />
                  </Col>
                  <Col lg={4}>
                     <TextField
                        className="w-100"
                        type="date"
                        label="To Date"
                        name="toDate"
                        value={toDate}
                        onChange={(e) => {
                           setToDate(e.target.value);
                        }}
                     />
                  </Col>
                  <Col lg={3}>
                     <Buttons
                        className="mt-2"
                        name="Generate lead"
                        onClick={() => {
                           if (fromDate <= toDate) {
                              downloadCSV();
                           } else {
                              showErrorToast("Enter valid date range...");
                              return null;
                           }
                        }}
                     />
                  </Col>
               </Row>
            </div>
         </Container>
         <Modal
            show={rejectModal}
            onHide={() => {
               setRejectModal(false);
            }}
            centered
         >
            <Modal.Body>
               <TextField
                  type="text"
                  label="Rejection Comment"
                  className="textFieldInput w-100"
                  value={rejectionComment}
                  onInput={(e) => {
                     setRejectComment(e.target.value);
                  }}
               />
            </Modal.Body>
            <Modal.Footer>
               <Buttons
                  varient="primary"
                  name="Submit"
                  onClick={() => {
                     changeBuilderStatus("REJECTED", rejectionComment);
                  }}
               />
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default BuilderDetails;
