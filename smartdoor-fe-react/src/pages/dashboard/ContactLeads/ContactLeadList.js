/** @format */

import React, { useEffect, useState } from "react";
import Image from "../../../shared/Image";
import {
   handleStatusElement,
   showErrorToast,
   showSuccessToast,
   ToolTip,
} from "../../../common/helpers/Utils";
import Text from "../../../shared/Text/Text";
import contentIco from "../../../assets/images/content-ico.png";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import "./ContactLeads.scss";
import { changeContactLeadStatus, fetchContactLeadList } from "../../../common/redux/actions";
import { Col, Form, FormControl, Modal } from "react-bootstrap";
import CONSTANTS_STATUS from "../../../common/helpers/ConstantsStatus";
import Buttons from "../../../shared/Buttons/Buttons";
import pencilIcon from "../../../assets/svg/pencilIcon.svg";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const ContactLeadList = () => {
   const [leadList, setLeadList] = useState([]);
   const [status, setStatus] = useState("");
   const [leadType, setLeadType] = useState("");
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
   const [loading, setLoading] = useState(false);
   const [showStatusModal, setShowStatusModal] = useState(false);
   const [selectedLead, setSelectedLead] = useState({});

   const leadColumn = [
      {
         name: "Sr.No.",
         selector: (row) => row.srNo,
         sortable: false,
         center: false,
         minWidth: "80px",
         cell: ({ srNo }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={srNo}>
               <Text size="Small" color="secondryColor elipsis-text" text={srNo} />
            </ToolTip>
         ),
         id: 1,
      },
      {
         name: "Name",
         selector: (row) => row.name,
         sortable: false,
         center: false,
         maxWidth: "180px",
         cell: ({ name }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={name}>
               <Text size="Small" color="secondryColor elipsis-text" text={name} />
            </ToolTip>
         ),
         id: 2,
      },
      {
         name: "Mobile",
         selector: (row) => row.mobile,
         sortable: false,
         center: true,
         maxWidth: "180px",
         cell: ({ mobile }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={mobile}>
               <Text size="Small" color="secondryColor elipsis-text" text={mobile} />
            </ToolTip>
         ),
         id: 3,
      },
      {
         name: "City",
         selector: (row) => row.city,
         sortable: false,
         center: true,
         maxWidth: "180px",
         cell: ({ city }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={city}>
               <Text size="Small" color="secondryColor elipsis-text" text={city} />
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
      // {
      //    name: "Action",
      //    selector: (row) => row.action,
      //    sortable: false,
      //    center: false,
      //    maxWidth: "150px",
      //    cell: ({ row, srNo }) => (
      //       <div className="action">
      //          <ToolTip position="left" name="View Details">
      //             <span>
      //                <Image name="editIcon" src={contentIco} />
      //             </span>
      //          </ToolTip>
      //       </div>
      //    ),
      //    id: 7,
      // },
   ];

   const getLeadList = async () => {
      setLoading(true);
      const response = await fetchContactLeadList({
         status: status,
         leadType: "",
         startDate: startDate + startDate ? " 00:00:00" : "",
         endDate: endDate + endDate ? " 24:00:00" : "",
      });
      setLoading(false);
      if (response?.status === 200) {
         setLeadList(response?.data?.resourceData);
      }
   };

   useEffect(() => {
      getLeadList();
   }, []);

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

   const changeLeadStatus = async (leadStatus) => {
      const response = await changeContactLeadStatus({
         srNo: selectedLead?.srNo,
         status: leadStatus,
      });
      if (response?.status === 200) {
         showSuccessToast("Lead status updated successfully...");
         setShowStatusModal(false);
         getLeadList();
      } else {
         showErrorToast("Please try again...");
      }
   };

   return (
      <>
         <div className="mt-3 tableBox">
            <div className="align-items-center tableHeading">
               <div className="d-flex justify-content-between">
                  <div className="locationSelect d-flex">
                     <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                           as="select"
                           onChange={(e) => {
                              setStatus(e.target.value);
                           }}
                           value={status}
                        >
                           <option value="">Select Status</option>
                           {CONSTANTS_STATUS.leadStatusList.length > 0
                              ? CONSTANTS_STATUS.leadStatusList?.map((status) => (
                                   <option key={status} value={status}>
                                      {status}
                                   </option>
                                ))
                              : null}
                        </Form.Control>
                     </Form.Group>
                     &nbsp;&nbsp;&nbsp;&nbsp;
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
                           await getLeadList();
                        }}
                     />
                  </div>
               </div>
            </div>
            <DataTableComponent
               className="contactLeadsTableWrapper"
               progressPending={loading}
               columns={leadColumn}
               data={leadList}
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
                  size='small'
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
                        text={selectedLead?.name === null ? "-" : selectedLead?.name}
                        style={{ fontSize: "14px", fontWeight: "500" }}
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
                  <Col lg="4">
                     <Text
                        size="regular"
                        fontWeight=""
                        color="secondryColor"
                        className="text-start"
                        text={selectedLead?.mobile === null ? "-" : selectedLead?.mobile}
                        style={{ fontSize: "14px", fontWeight: "500" }}
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
                  <Col lg="4">
                     <Text
                        size="regular"
                        fontWeight=""
                        color="secondryColor"
                        className="text-start"
                        text={selectedLead?.email === null ? "-" : selectedLead?.email}
                        style={{ fontSize: "14px", fontWeight: "500" }}
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
                        text={selectedLead?.city === null ? "-" : selectedLead?.city}
                        style={{ fontSize: "14px", fontWeight: "500" }}
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
                        text="Date:"
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
                           selectedLead?.generatedDate === null ? "-" : selectedLead?.generatedDate
                        }
                        style={{ fontSize: "14px", fontWeight: "500" }}
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
                        text="Message :"
                        style={{ fontSize: "14px", fontWeight: "600" }}
                     />
                  </Col>
                  <Col lg="8">
                     <Text
                        size="regular"
                        fontWeight=""
                        color="secondryColor"
                        className="text-start"
                        text={selectedLead?.message === null ? "-" : selectedLead?.message}
                        style={{ fontSize: "14px", fontWeight: "500" }}
                     />
                  </Col>
               </div>
               {selectedLead?.status === "INITIATED" ? (
                  <>
                     <div>
                        {/* <Text
                           size="regular"
                           fontWeight=""
                           color="secondryColor"
                           className="text-start"
                           text="Change Lead Status :"
                        /> */}
                     </div>
                     <div className="d-flex mt-2">
                        <Buttons
                           className='p-0 px-2'
                           size="medium"
                           name="Mark as Complete"
                           onClick={() => {
                              changeLeadStatus("COMPLETED");
                           }}
                        />{" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Buttons
                           className='p-0 px-2'
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
      </>
   );
};

export default ContactLeadList;
