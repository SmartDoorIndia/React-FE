/** @format */

import React, { useEffect, useState } from "react";
import Image from "../../../shared/Image";
import { showErrorToast, ToolTip } from "../../../common/helpers/Utils";
import Text from "../../../shared/Text/Text";
import contentIco from "../../../assets/images/content-ico.png";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import "./ContactLeads.scss";
import { fetchContactLeadList } from "../../../common/redux/actions";
import { Form } from "react-bootstrap";
import CONSTANTS_STATUS from "../../../common/helpers/ConstantsStatus";
import Buttons from "../../../shared/Buttons/Buttons";

const ContactLeadList = () => {
   const [leadList, setLeadList] = useState([]);
   const [status, setStatus] = useState("");
   const [leadType, setLeadType] = useState("");
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");

   const leadColumn = [
      {
         name: "Sr.No.",
         selector: (row) => row.srNo,
         sortable: false,
         center: false,
         maxWidth: "150px",
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
         maxWidth: "150px",
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
         center: false,
         maxWidth: "150px",
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
         center: false,
         maxWidth: "150px",
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
         center: false,
         maxWidth: "150px",
         cell: ({ status }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={status}>
               <Text size="Small" color="secondryColor elipsis-text" text={status} />
            </ToolTip>
         ),
         id: 5,
      },
      {
         name: "Action",
         selector: (row) => row.action,
         sortable: false,
         center: false,
         maxWidth: "150px",
         cell: ({ row, srNo }) => (
            <div className="action">
               <ToolTip position="left" name="View Details">
                  <span>
                     <Image name="editIcon" src={contentIco} />
                  </span>
               </ToolTip>
            </div>
         ),
         id: 6,
      },
   ];

   const getLeadList = () => {
      const response = fetchContactLeadList({
         status: "",
         leadType: "",
         startDate: "",
         endDate: "",
      });
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
                     </Form.Group> &nbsp;&nbsp;&nbsp;&nbsp;
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
               columns={leadColumn}
               data={leadList}
               persistTableHead={true}
               paginationServer={false}
               pagination={"off"}
            />
         </div>
      </>
   );
};

export default ContactLeadList;
