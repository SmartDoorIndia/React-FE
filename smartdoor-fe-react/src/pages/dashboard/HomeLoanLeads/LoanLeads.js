/** @format */

import React, { useEffect, useState } from "react";
import DataTableComponent from "../../../../src/shared/DataTable/DataTable";
import { changeLoanLeadStatus, fetchLoanLeadList } from "../../../common/redux/actions";
import { Col, Form, Modal } from "react-bootstrap";
import Buttons from "../../../shared/Buttons/Buttons";
import {
   formateDateTime,
   handleStatusElement,
   showErrorToast,
   showSuccessToast,
   ToolTip,
} from "../../../common/helpers/Utils";
import contentIco from "../../../assets/images/content-ico.svg";
import Image from "../../../shared/Image";
import Text from "../../../shared/Text/Text";
import { TextField } from "@mui/material";
import { saveAs } from "file-saver";
import "./LoanLeads.scss";

const LoanLeads = () => {
   const [loanLeadList, setLoanLeadList] = useState([]);
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
   const [loading, setLoading] = useState(false);
   const [showStatusModal, setShowStatusModal] = useState(false);
   const [selectedLead, setSelectedLead] = useState({});
   const [showDateRangeModal, setShowDateRangeModal] = useState(false);
   const [fromDate, setFromDate] = useState("");
   const [toDate, setToDate] = useState("");

   const loanLeadColumn = [
      {
         name: "Sr.No.",
         selector: (row) => row.loanEnquiryNumber,
         sortable: false,
         center: false,
         minWidth: "80px",
         cell: ({ loanEnquiryNumber }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={loanEnquiryNumber}>
               <Text size="Small" color="secondryColor elipsis-text" text={loanEnquiryNumber} />
            </ToolTip>
         ),
         id: 1,
      },
      {
         name: "Name",
         selector: (row) => row.fullName,
         sortable: false,
         center: false,
         maxWidth: "180px",
         cell: ({ fullName }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={fullName}>
               <Text size="Small" color="secondryColor elipsis-text" text={fullName} />
            </ToolTip>
         ),
         id: 2,
      },
      {
         name: "Mobile",
         selector: (row) => row.contactNo,
         sortable: false,
         center: true,
         maxWidth: "180px",
         cell: ({ contactNo }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={contactNo}>
               <Text size="Small" color="secondryColor elipsis-text" text={contactNo} />
            </ToolTip>
         ),
         id: 3,
      },
      {
         name: "Loan Amt",
         selector: (row) => row.loanAmount,
         sortable: false,
         center: true,
         maxWidth: "180px",
         cell: ({ loanAmount }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={loanAmount}>
               <Text size="Small" color="secondryColor elipsis-text" text={loanAmount} />
            </ToolTip>
         ),
         id: 4,
      },
      {
         name: "Status",
         selector: (row) => row.status,
         sortable: false,
         center: true,
         maxWidth: "180px",
         cell: ({ status }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={status}>
               {handleStatusElement(status)}
            </ToolTip>
         ),
         id: 5,
      },
      {
         name: "Action",
         selector: "lead",
         sortable: false,
         center: true,
         maxWidth: "150px",
         cell: (lead) => (
            <div className="action">
               <ToolTip position="left" name="View Details">
                  <span
                     className=""
                     onClick={() => {
                        setShowStatusModal(true);
                        console.log(lead);
                        setSelectedLead(lead);
                     }}
                  >
                     <Image name="pencilIcon" src={contentIco} />
                  </span>
               </ToolTip>
            </div>
         ),
         id: 6,
      },
   ];

   const fetchLoanList = async () => {
      setLoading(true);
      const response = await fetchLoanLeadList({
         startDate: startDate ? startDate + " 00:00:00" : startDate,
         endDate: endDate ? endDate + " 23:59:59" : endDate,
         // pageNo: 1,
         // pageSize: 8,
      });
      setLoading(false);
      if (response?.status === 200) {
         setLoanLeadList([...response?.data?.resourceData]);
      }
   };

   const validateDates = () => {
      if ((startDate === null && endDate === null) || (startDate === "" && endDate === "")) {
         return true;
      } else if (startDate !== null && endDate !== null && startDate !== "" && endDate !== "") {
         if (new Date(startDate) > new Date(endDate)) {
            showErrorToast("Start date should be less than end date");
            return false;
         } else {
            return true;
         }
      } else {
         showErrorToast("Please enter start date and end date or set both empty");
         return false;
      }
   };

   useEffect(() => {
      fetchLoanList();
   }, []);

   const changeLeadStatus = async (leadStatus) => {
      const response = await changeLoanLeadStatus({
         srNo: selectedLead?.loanEnquiryNumber,
         status: leadStatus,
      });
      if (response?.status === 200) {
         showSuccessToast("Lead status updated successfully...");
         setShowStatusModal(false);
         fetchLoanList();
      } else {
         showErrorToast("Please try again...");
      }
   };

   const downloadLead = async () => {
      const response = await fetchLoanLeadList({
         startDate: fromDate ? fromDate + " 00:00:00" : fromDate,
         endDate: toDate ? toDate + " 24:00:00" : toDate,
      });
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

   return (
      <>
         <div className="mt-3 tableBox">
            <div className="align-items-center tableHeading">
               <div className="d-flex justify-content-between">
                  <div className="locationSelect d-flex">
                     <Form.Group controlId="exampleForm.SelectCustom">
                        {/* <Form.Label>From Date</Form.Label> */}
                        <Form.Control
                           type="date"
                           max={new Date().toISOString().split("T")[0]}
                           placeholder="Start Date"
                           value={startDate}
                           onChange={(e) => {
                              console.log(e.target.value);
                              setStartDate(e.target.value);
                           }}
                        />
                     </Form.Group>
                     &nbsp;&nbsp;
                     {" - "}
                     &nbsp;&nbsp;
                     <Form.Group controlId="exampleForm.SelectCustom">
                        {/* <Form.Label>To Date</Form.Label> */}
                        <Form.Control
                           type="date"
                           max={new Date().toISOString().split("T")[0]}
                           placeholder="End Date"
                           value={endDate}
                           onChange={(e) => {
                              console.log(e.target.value);
                              setEndDate(e.target.value);
                           }}
                        />
                     </Form.Group>{" "}
                     &nbsp;&nbsp;&nbsp;&nbsp;
                     <Buttons
                        name="Search"
                        varient="primary"
                        size="Small"
                        color="white"
                        style={{ height: "40px !important" }}
                        onClick={async () => {
                           if (!validateDates()) {
                              return null;
                           }
                           await fetchLoanList();
                        }}
                     />
                     &nbsp;&nbsp;&nbsp;&nbsp;
                     <Buttons
                        name="Download Leads"
                        varient="primary"
                        size="Small"
                        color="white"
                        style={{ height: "40px !important" }}
                        onClick={async () => {
                           setShowDateRangeModal(true);
                        }}
                     />
                  </div>
               </div>
            </div>
            <DataTableComponent
               className="contactLeadsTableWrapper"
               progressPending={loading}
               data={loanLeadList}
               columns={loanLeadColumn}
               persistTableHead={true}
               paginationServer={false}
               pagination={"off"}
            />
         </div>
         <Modal
            size="md"
            show={showStatusModal}
            onHide={() => {
               setShowStatusModal(false);
            }}
            centered
         >
            <Modal.Header className="text-center">
               <Text text="Lead Details" style={{ fontSize: "16px", fontWeight: "600" }} />
               <Buttons
                  style={{ float: "right" }}
                  name="X"
                  size="small"
                  varient="secondary"
                  onClick={() => {
                     setShowStatusModal(false);
                  }}
               ></Buttons>
            </Modal.Header>
            <Modal.Body>
               <div className="d-flex">
                  <Col lg="4">
                     <Text
                        size="regular"
                        fontWeight=""
                        color="secondryColor"
                        className="text-start"
                        text="Name :"
                        style={{ fontSize: "14px", fontWeight: "600" }}
                     />
                  </Col>
                  <Col lg="8">
                     <Text
                        size="regular"
                        fontWeight=""
                        color="secondryColor"
                        className="text-start"
                        text={selectedLead?.fullName === null ? "-" : selectedLead?.fullName}
                        style={{
                           fontSize: "14px",
                           fontWeight: "500",
                           whiteSpace: "pre-wrap", // allows line breaks
                           wordWrap: "break-word", // breaks long words
                           overflowWrap: "break-word",
                        }}
                     />
                  </Col>
               </div>
               <div className="d-flex">
                  <Col lg="4">
                     <Text
                        size="regular"
                        fontWeight=""
                        color="secondryColor"
                        className="text-start"
                        text="Mobile :"
                        style={{ fontSize: "14px", fontWeight: "600" }}
                     />
                  </Col>
                  <Col lg="8">
                     <Text
                        size="regular"
                        fontWeight=""
                        color="secondryColor"
                        className="text-start"
                        text={selectedLead?.contactNo === null ? "-" : selectedLead?.contactNo}
                        style={{
                           fontSize: "14px",
                           fontWeight: "500",
                           whiteSpace: "pre-wrap", // allows line breaks
                           wordWrap: "break-word", // breaks long words
                           overflowWrap: "break-word",
                        }}
                     />
                  </Col>
               </div>
               <div className="d-flex">
                  <Col lg="4">
                     <Text
                        size="regular"
                        fontWeight=""
                        color="secondryColor"
                        className="text-start"
                        text="Email :"
                        style={{ fontSize: "14px", fontWeight: "600" }}
                     />
                  </Col>
                  <Col lg="8">
                     <Text
                        size="regular"
                        fontWeight=""
                        color="secondryColor"
                        className="text-start"
                        text={selectedLead?.emailId === null ? "-" : selectedLead?.emailId}
                        style={{
                           fontSize: "14px",
                           fontWeight: "500",
                           whiteSpace: "pre-wrap", // allows line breaks
                           wordWrap: "break-word", // breaks long words
                           overflowWrap: "break-word",
                        }}
                     />
                  </Col>
               </div>
               <div className="d-flex">
                  <Col lg="4">
                     <Text
                        size="regular"
                        fontWeight=""
                        color="secondryColor"
                        className="text-start"
                        text="City :"
                        style={{ fontSize: "14px", fontWeight: "600" }}
                     />
                  </Col>
                  <Col lg="8">
                     <Text
                        size="regular"
                        fontWeight=""
                        color="secondryColor"
                        className="text-start"
                        text={
                           selectedLead?.propertyAddress === null
                              ? "-"
                              : selectedLead?.propertyAddress
                        }
                        style={{
                           fontSize: "14px",
                           fontWeight: "500",
                           whiteSpace: "pre-wrap", // allows line breaks
                           wordWrap: "break-word", // breaks long words
                           overflowWrap: "break-word",
                        }}
                     />
                  </Col>
               </div>
               <div className="d-flex">
                  <Col lg="4">
                     <Text
                        size="regular"
                        fontWeight=""
                        color="secondryColor"
                        className="text-start"
                        text="Generated Date:"
                        style={{ fontSize: "14px", fontWeight: "600" }}
                     />
                  </Col>
                  <Col lg="8">
                     <Text
                        size="regular"
                        fontWeight=""
                        color="secondryColor"
                        className="text-start"
                        text={
                           selectedLead?.generatedDate === null
                              ? "-"
                              : formateDateTime(
                                   selectedLead?.generatedDate,
                                   "DD-MM-YYYY hh:mm:ss a"
                                )
                        }
                        style={{
                           fontSize: "14px",
                           fontWeight: "500",
                           whiteSpace: "pre-wrap", // allows line breaks
                           wordWrap: "break-word", // breaks long words
                           overflowWrap: "break-word",
                        }}
                     />
                  </Col>
               </div>
               <div className="d-flex">
                  <Col lg="4">
                     <Text
                        size="regular"
                        fontWeight=""
                        color="secondryColor"
                        className="text-start"
                        text="Loan Amount :"
                        style={{ fontSize: "14px", fontWeight: "600" }}
                     />
                  </Col>
                  <Col lg="8">
                     <Text
                        size="regular"
                        fontWeight=""
                        color="secondryColor"
                        className="text-start"
                        text={selectedLead?.loanAmount === null ? "-" : selectedLead?.loanAmount}
                        style={{
                           fontSize: "14px",
                           fontWeight: "500",
                           whiteSpace: "pre-wrap", // allows line breaks
                           wordWrap: "break-word", // breaks long words
                           overflowWrap: "break-word",
                        }}
                     />
                  </Col>
               </div>
               {selectedLead?.status === "INITIATED" ? (
                  <>
                     <hr />
                     <div className="d-flex mt-2">
                        <Buttons
                           className="p-0 px-2"
                           size="medium"
                           name="Mark as Complete"
                           onClick={() => {
                              changeLeadStatus("COMPLETED");
                           }}
                        />{" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Buttons
                           className="p-0 px-2"
                           size="medium"
                           name="Delete"
                           onClick={() => {
                              changeLeadStatus("DELETED");
                           }}
                        />{" "}
                     </div>
                  </>
               ) : null}
            </Modal.Body>
         </Modal>

         <Modal
            show={showDateRangeModal}
            onHide={() => {
               setShowDateRangeModal(false);
            }}
            centered
         >
            <Modal.Header className="text-center">
               <Text text="Select Date Range" style={{ fontSize: "16px", fontWeight: "600" }} />
               <Buttons
                  style={{ float: "right" }}
                  name="X"
                  size="small"
                  varient="secondary"
                  onClick={() => {
                     setShowDateRangeModal(false);
                  }}
               ></Buttons>
            </Modal.Header>
            <Modal.Body>
               <div className="locationSelect d-flex">
                  <TextField
                     type="date"
                     className="w-100"
                     max={new Date().toISOString().split("T")[0]}
                     placeholder="Start Date"
                     value={fromDate}
                     onChange={(e) => {
                        console.log(e.target.value);
                        setFromDate(e.target.value);
                     }}
                  />
                  &nbsp;&nbsp; &nbsp;&nbsp;
                  <TextField
                     type="date"
                     className="w-100"
                     max={new Date().toISOString().split("T")[0]}
                     placeholder="End Date"
                     value={toDate}
                     onChange={(e) => {
                        console.log(e.target.value);
                        setToDate(e.target.value);
                     }}
                  />
               </div>
               <div className="text-center">
                  <Buttons
                     className="mt-2"
                     name="Download"
                     varient="primary"
                     size="Small"
                     color="white"
                     style={{ height: "40px !important" }}
                     onClick={async () => {
                        downloadLead();
                        setShowDateRangeModal(true);
                     }}
                  />
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
};

export default LoanLeads;
