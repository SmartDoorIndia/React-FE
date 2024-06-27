/** @format */

import React, { useState, useEffect, memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import Text from "../../../shared/Text/Text";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Image from "../../../shared/Image/Image";
import Buttons from "../../../shared/Buttons/Buttons";
import ModalModule from "../../../shared/Modal/ModalModule";
import "./Transaction.scss";
import {
   getAllCity,
   getLocationByCity,
   getAllTransactionTeams,
   getTransactionDashboardCount,
   getAllTransactionMeetingRequest,
   getAllTransactionLead,
   getAllTransactionTeamsCity,
   getAllPendingDealApproval,
   changeUserAssignee,
} from "../../../common/redux/actions";

import { Link, Route } from "react-router-dom";
import { TableLoader } from "../../../common/helpers/Loader";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import Pagination from "../../../shared/DataTable/Pagination";
import contentIcon from "../../../assets/images/content-ico.svg";
import {
   handleStatusElement,
   ToolTip,
   formateDate,
} from "../../../common/helpers/Utils";

const MeetingRequestColumns = [
   {
      name: "Id",
      selector: "id",
      center: true,
      sortable: true,
      maxWidth: "50px !important",
   },
   {
      name: "Date",
      selector: "meetingDate",
      center: true,
      sortable: true,
      cell: ({ meetingDate }) => <span>{`${formateDate(meetingDate)}`}</span>,
   },
   {
      name: "Owner",
      selector: "ownerName",
      center: true,
      maxWidth: "120px",
      style: { "max-width": "120px" },
      cell: ({ ownerName, ownerMobileNumber }) => (
         <ToolTip
            position="top"
            name={
               <div>
                  {" "}
                  <span>{ownerName || "-"} </span>
                  <span> {`(${ownerMobileNumber})`} </span>
               </div>
            }
         >
            <span className="cursor-pointer elipsis-text"> {ownerName || "-"} </span>
         </ToolTip>
      ),
   },
   {
      name: "Buyer",
      selector: "buyerName",
      center: true,
      maxWidth: "120px",
      style: { "max-width": "120px" },
      cell: ({ buyerName, buyerMobileNumber }) => (
         <ToolTip
            position="top"
            name={
               <div>
                  {" "}
                  <span>{buyerName || "-"} </span>
                  <span> {`(${buyerMobileNumber})`} </span>
               </div>
            }
         >
            <span className="cursor-pointer elipsis-text"> {buyerName || "-"} </span>
         </ToolTip>
      ),
   },
   {
      name: "Location",
      selector: "location",
      sortable: false,
      center: true,
      wrap: true,
      style: { padding: "0 !important" },
      cell: ({ location }) => (
         <ToolTip position="top" style={{ width: "100%" }} name={location || ""}>
            <span className="cursor-pointer elipsis-text">
               {" "}
               {location.substring(
                  0,
                  location.indexOf(",") !== -1 ? location.indexOf(",") : location.length
               )}
            </span>
         </ToolTip>
      ),
   },
   {
      name: "Assigned To",
      selector: "assignedTo",
      center: true,
      minWidth: '120px',
      cell: (
         { assignedTo }
      ) =>
         // status === 'PENDING' ?
         !assignedTo ? (
            <div className="w-100">
               <div className="assignTo">
                  <Form.Group controlId="exampleForm.SelectCustom" className="w-100 display-flex">
                     <Form.Control
                        as="select"
                        className="w-100"
                     //  onChange={ (e)=>handleUserAssignmet(leadId, e.target.value) }
                     >
                        <option>Assign</option>
                        {/* {
                                   userList.map((data, index)=>
                                     <option key={ index } value={ data.id }>{data.name}</option>,
                                   )
                                 } */}
                     </Form.Control>
                  </Form.Group>
               </div>
            </div>
         ) : (
            <Text
               size="Small"
               // fontWeight="smbold"
               color="secondryColor"
               className="text-center"
               text={assignedTo ? assignedTo.capitalizeWord() : "-"}
            />
         ),
      // : <Text size="Small" fontWeight="smbold" color="secondryColor" className="text-center" text={ assignTo ? assignTo.capitalizeWord() : '-' } />
   },
   {
      name: "For",
      selector: "propertyCategory",
      center: true,
      cell: ({ propertyCategory }) => (
         <span className="text-align-center">
            {propertyCategory === "Lease" ? "Rent" : propertyCategory || "-"}
         </span>
      ),
   },
   {
      name: "Status",
      selector: "status",
      center: true,
      maxWidth: "120px",
      style: { "white-space": "nowrap", padding: "0 !important", "max-width": "120px" },
      cell: ({ status }) => handleStatusElement(status),
   },
   {
      name: "Action",
      center: true,
      maxWidth: "50px",
      cell: (row) => (
         <div className="action">
            <ToolTip position="left" name="View Details">
               <span>
                  <Link
                     to={{
                        pathname: `/admin/transaction/meeting-details/${row.id}`,
                        state: {
                           module: "MEETING_REQUEST",
                        },
                     }}
                  >
                     <Image name="useraddIcon" src={contentIcon} />
                  </Link>
               </span>
            </ToolTip>
         </div>
      ),
   },
];

const dealApprovalColumns = [
   {
      name: "Id",
      selector: "id",
      center: true,
      sortable: true,
   },
   {
      name: "Event Date",
      selector: "date",
      sortable: true,
      center: true,
      cell: ({ date }) => <span>{`${formateDate(date)} `}</span>,
   },

   {
      name: "Owner Name",
      selector: "ownerName",
      center: true,
      cell: ({ ownerName }) => <span>{ownerName}</span>,
   },
   {
      name: "Location",
      selector: "location",
      center: true,
      cell: ({ location }) => (
         <ToolTip position="top" style={{ width: "100%" }} name={location || ""}>
            <span className="cursor-pointer elipsis-text">
               {" "}
               {location.substring(
                  0,
                  location.indexOf(",") !== -1 ? location.indexOf(",") : location.length
               )}
            </span>
         </ToolTip>
      ),
   },
   {
      name: "Assigned To",
      selector: "assignedTo",
      center: true,
      cell: (
         { assignedTo } //userList
      ) =>
         // status === 'PENDING' ?
         !assignedTo ? (
            <div className="w-100">
               <div className="assignTo">
                  <Form.Group controlId="exampleForm.SelectCustom" className="w-100 display-flex">
                     <Form.Control
                        as="select"
                        className="w-100"
                     //  onChange={ (e)=>handleUserAssignmet(leadId, e.target.value) }
                     >
                        <option>Assign</option>
                        {/* {
                               userList.map((data, index)=>
                                 <option key={ index } value={ data.id }>{data.name}</option>,
                               )
                             } */}
                     </Form.Control>
                  </Form.Group>
               </div>
            </div>
         ) : (
            <Text
               size="Small"
               color="secondryColor"
               className="text-center"
               text={assignedTo ? assignedTo.capitalizeWord() : "-"}
            />
         ),
      // : <Text size="Small" fontWeight="smbold" color="secondryColor" className="text-center" text={ assignTo ? assignTo.capitalizeWord() : '-' } />
   },
   {
      name: "Status",
      selector: "status",
      center: true,
      maxWidth: "120px",
      style: { "white-space": "nowrap", padding: "0 !important", "max-width": "120px" },
      cell: ({ status }) => handleStatusElement(status),
   },
   {
      name: "Action",
      center: true,
      style: { "max-width": "60px" },
      maxWidth: "100px",
      cell: (row) => (
         <div className="action">
            <ToolTip position="left" name="View Details">
               <span>
                  <Link
                     to={{
                        pathname: `/admin/transaction/getApprovalDetail/${row.id}`,
                        state: { dealApprovalData: row, module: "TRANSACTION" },
                     }}
                  >
                     <Image name="useraddIcon" src={contentIcon} />
                  </Link>
               </span>
            </ToolTip>
         </div>
      ),
   },
   
];

const transactionTeamsColumns = [
   {
      name: "Id",
      selector: "id",
      center: true,
      sortable: true,
   },

   {
      name: "Name",
      selector: "name",
      center: true,
      cell: ({ name, imageUrl }) => (
         <ToolTip position="top" style={{ width: '100%' }} name={name || ''}>
            <Text size="Small" color="secondryColor elipsis-text" text={name ? name.capitalizeWord() : "-"} />
         </ToolTip>
         //  <div className="userName">
         //          <Text
         //             size="Small"
         //             color="secondryColor"
         //             text={name ? name.capitalizeWord() : "-"}
         //          />
         //       </div>
      ),
   },
   {
      name: "Role",
      selector: "position",
      center: true,
      maxWidth: "250px",
      style: { "white-space": "nowrap", padding: "0 !important" },
      cell: ({ position }) => (
         <ToolTip position="top" style={{ width: '100%' }} name={position || ''}>
            <Text size="Small" color="secondryColor elipsis-text" text={position ? position.capitalizeWord() : "-"} />
         </ToolTip>
      ),
   },
   {
      name: 'City',
      selector: 'city',
      center: true,
      maxWidth: "150px",
      style: { 'white-space': 'nowrap', "padding": "0 !important", "max-width": "150px" },
   },
   {
      name: "Tasks",
      selector: "userTask",
      sortable: true,
      center: true,
      maxWidth: "250px",
      style: { "white-space": "nowrap", padding: "0 !important" },
   },
   {
      name: "Action",
      center: true,
      style: { "max-width": "60px" },
      maxWidth: "100px",
      cell: (row) => (
         <div className="action">
            <ToolTip position="left" name="View Details">
               <span>
                  <Link
                     to={{
                        pathname: "/admin/transaction/user-detail",
                        state: { userData: row, module: "TRANSACTION" },
                     }}
                  >
                     <Image name="useraddIcon" src={contentIcon} />
                  </Link>
               </span>
            </ToolTip>
         </div>
      ),
   },
];

const TeamTablePaginationActionButton = () => (
   <div className="d-flex justify-content-center table-bottom">
      <Link to={{
         pathname: "/admin/user-management",
         state: { moduleName: 'Transaction' }
      }}>
         <Buttons name="Manage Team" varient="primary" type="submit" size="Small" color="white" />
      </Link>
   </div>
);

const TeamTablePaginationComponent = (props) => (
   <Pagination {...props} PaginationActionButton={TeamTablePaginationActionButton} />
);

const ProgressComponent = <TableLoader />;

const Transaction = (props) => {
   console.log(props);
   const {
      getLocationByCity,
      getAllTransactionMeetingRequest,
      getAllTransactionLead,
      getAllTransactionTeams,
      getAllTransactionTeamsCity,
      getTransactionDashboardCount,
      getAllPendingDealApproval,
      getAllCity,
      transactionLeadsData,
      transactionTeamsData,
      transactionMeetingRequestData,
      transactionDashboardCount,
      transactionTeamsCityData,
      // allTransactionCities,
      allCities,
      dealApprovalData,
   } = props;

   useEffect(() => {
      getAllCity();
      getAllTransactionTeams({ city: "", records: "5", pageNumber: "1" });
      getTransactionDashboardCount();
      getAllTransactionMeetingRequest({
         city: "",
         location: "",
         pageNumber: null,
         records: null,
         zipcode: 0,
      });
      getAllTransactionLead({
         city: "",
         location: "",
         pageNumber: "",
         records: "",
         zipcode: 0,
      });
      getAllTransactionTeamsCity();
      getAllPendingDealApproval({
         city: "",
         location: "",
         pageNumber: "",
         records: "",
         zipcode: 0,
      });
   }, [
      getTransactionDashboardCount,
      getAllTransactionMeetingRequest,
      getAllTransactionLead,
      getAllTransactionTeamsCity,
      getAllCity,
      getAllPendingDealApproval,
   ]);

   const [transactionLeadCity, setTransactionLeadCity] = useState("");
   const [transactionLeadLocation, setTransactionLeadLocation] = useState("");
   const [meetingReqCity, setMeetingReqCity] = useState("");
   const [meetingReqLocation, setMeetingReqLocation] = useState("")
   const [locationsData, setLocationsData] = useState([]);
   const [dealCity, setDealCity] = useState("");
   const [dealLocation, setDealLocation] = useState("")
   const [locationsMeetingReqData, setLocationsMeetingReqData] = useState([]);
   const [locationsDealData, setLocationsDealData] = useState([]);
   // const [selectedCity, setSelectedCity] = useState("");

   // let locationsByCity = [];

   const _filterTransactionLeads = (city, locationData) => {
      console.log(locationData,"location data in location filter");
      let zipcode= ''
      let data = locationData
      const regex = /([^,]+),\s*(\d{6})/;
      const matches = data.match(regex);

      if (matches) {
        const location = matches[1].trim();
        const zipcode = matches[2];
        console.log(city,location,zipcode,"data for filter");
        getAllTransactionLead({
         city,
         location: location,
         pageNumber: "",
         records: "",
         zipcode: Number(zipcode),
      });

      }
      if(locationData===''){
         setTransactionLeadCity(city);
      console.log("zipcode:", zipcode);
      getAllTransactionLead({
         city,
         location: "",
         pageNumber: "",
         records: "",
         zipcode: Number(zipcode),
      });
      }
      
   };

   const _filterMeetingRequestCity = (city, zipcode) => {
      setMeetingReqCity(city);
      getAllTransactionMeetingRequest({
         city,
         location: "",
         pageNumber: "",
         records: "",
         zipcode: Number(zipcode),
      });
   };

   const _filterDealRequests = (city, zipcode) => {
      setDealCity(city);
      getAllPendingDealApproval({
         city,
         location: "",
         pageNumber: "",
         records: "",
         zipcode: Number(zipcode),
      });
   };

   const _filterTransactionTeamCity = (value) => {
      getAllTransactionTeams({ city: value, records: "5", pageNumber: "1" });
   };

   function onChangePage(e) { }

   const handleUserAssignmet = (lead_Id, assigned_To, lead_For) => {
      const data = {
         leadId: Number(lead_Id),
         assignedTo: Number(assigned_To),
         leadFor: "TRANSACTION_LEAD",
      };
      changeUserAssignee(data)
         .then((res) => {
            if(res.data.status === 200) {
               getAllTransactionLead({
                  city: "",
                  location: "",
                  pageNumber: "",
                  records: "",
                  zipcode: 0,
               });
            }
         })
         .catch((err) =>
            console.log('err:', err)
         )
      };
   
   const TransactionLeadsColumns = [
      {
         name: "Id",
         selector: "id",
         sortable: true,
         center: true,
      },
   
      {
         name: "Visit Date",
         selector: "meetingDate",
         sortable: true,
         center: true,
         cell: ({ meetingDate }) => <span>{`${formateDate(meetingDate)} `}</span>,
      },
      {
         name: "Buyer",
         selector: "buyerName",
         center: true,
         maxWidth: "120px",
         style: { "max-width": "120px" },
         cell: ({ buyerName, buyerMobileNumber }) => (
            <ToolTip
               position="top"
               name={
                  <div>
                     {" "}
                     <span>{buyerName || "-"} </span>
                     <span> {`(${buyerMobileNumber})`} </span>
                  </div>
               }
            >
               <span className="cursor-pointer elipsis-text"> {buyerName || "-"} </span>
            </ToolTip>
         ),
      },
      {
         name: "Location",
         selector: "location",
         center: true,
         sortable: false,
         wrap: true,
         style: { padding: "0 !important" },
         cell: ({ location }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={location || ""}>
               <span className="cursor-pointer elipsis-text">
                  {" "}
                  {location.substring(
                     0,
                     location.indexOf(",") !== -1 ? location.indexOf(",") : location.length
                  )}
               </span>
            </ToolTip>
         ),
      },
      {
         name: "Assigned To",
         selector: "assignedTo",
         center: true,
         cell: (
            { id, assignedTo, userList } //userList
         ) =>
            // status === 'PENDING' ?
            !assignedTo ? (
               <div className="w-100">
                  <div className="assignTo">
                     <Form.Group controlId="exampleForm.SelectCustom" className="w-100 display-flex">
                        <Form.Control
                           as="select"
                           className="w-100"
                           onChange={(e) => handleUserAssignmet(id, e.target.value)}
                        >
                           <option>Assign</option>
                           {userList?.length ? userList?.map((data, index) => (
                              <option key={index} value={data.id}>
                                 {data.name}
                              </option>
                           )):""}
                        </Form.Control>
                     </Form.Group>
                  </div>
               </div>
            ) : (
               <Text
                  size="Small"
                  // fontWeight="smbold"
                  color="secondryColor"
                  className="text-center"
                  text={assignedTo ? assignedTo.capitalizeWord() : "-"}
               />
            ),
         // : <Text size="Small" fontWeight="smbold" color="secondryColor" className="text-center" text={ assignTo ? assignTo.capitalizeWord() : '-' } />
      },
      {
         name: "For",
         selector: "propertyCategory",
         center: true,
         cell: ({ propertyCategory }) => (
            <span className="text-align-center">
               {propertyCategory === "Lease" ? "Rent" : propertyCategory || "-"}
            </span>
         ),
      },
      {
         name: "Status",
         selector: "status",
         center: true,
         maxWidth: "120px",
         style: { "white-space": "nowrap", padding: "0 !important", "max-width": "120px" },
         cell: ({ status }) => handleStatusElement(status),
      },
      {
         name: "Action",
         center: true,
         maxWidth: "50px",
         cell: ({ id }) => (
            <div className="action">
               <ToolTip position="left" name="View Details">
                  <span>
                     <Link
                        to={{
                           pathname: `/admin/transaction/lead-details/${id}`,
                           state: {
                              module: "LEAD_DETAILS",
                           },
                        }}
                     >
                        <Image name="useraddIcon" src={contentIcon} />
                     </Link>
                  </span>
               </ToolTip>
            </div>
         ),
      },
   ];



   return (
      <>
         <Route
            path="/admin/transaction/user-detail"
            excat
            component={(props) => {
               return <ModalModule
                  {...props}
                  module={"TRANSACTION"}
                  tabName={["Visit Leads", "Deal Meetings", "Total Transactions"]}
               />
            }}
         />
         <div>

         <div className="cardBox cardTractions">
            <Card className="cardWidth">
               <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                     <Text
                        size="medium"
                        fontWeight="mediumbold"
                        color="primaryColor"
                        text={transactionDashboardCount.data.dealMeetingCount}
                     />
                     <Text
                        size="Small"
                        fontWeight="smbold"
                        color={
                           transactionDashboardCount.data.currentWeekDealMeetingCount
                              .toString()
                              .includes("-")
                              ? "dangerColor"
                              : "successColor"
                        }
                        text={
                           transactionDashboardCount.data.currentWeekDealMeetingCount
                              .toString()
                              .includes("-")
                              ? transactionDashboardCount.data.currentWeekDealMeetingCount
                              : "+" + transactionDashboardCount.data.currentWeekDealMeetingCount
                        }
                     />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                     <Text
                        size="xSmall"
                        fontWeight="smbold"
                        color="TaupeGrey"
                        text="Deal Meetings"
                     />
                     <Text
                        size="xSmall"
                        fontWeight="smbold"
                        color="secondryColor"
                        text="Change This Week"
                     />
                  </div>
               </Card.Body>
            </Card>

            <Card className="cardWidth">
               <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                     <Text
                        size="medium"
                        fontWeight="mediumbold"
                        color="primaryColor"
                        text={transactionDashboardCount.data.dealCompletedCount}
                     />
                     <Text
                        size="Small"
                        fontWeight="smbold"
                        color={
                           transactionDashboardCount.data.currentWeekDealCompletedCount
                              .toString()
                              .includes("-")
                              ? "dangerColor"
                              : "successColor"
                        }
                        text={
                           transactionDashboardCount.data.currentWeekDealCompletedCount
                              .toString()
                              .includes("-")
                              ? transactionDashboardCount.data.currentWeekDealCompletedCount
                              : "+" + transactionDashboardCount.data.currentWeekDealCompletedCount
                        }
                     />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                     <Text
                        size="xSmall"
                        fontWeight="smbold"
                        color="TaupeGrey"
                        text="Deals Completed"
                     />
                     <Text
                        size="xSmall"
                        fontWeight="smbold"
                        color="secondryColor"
                        text="Change This Week"
                     />
                  </div>
               </Card.Body>
            </Card>

            <Card className="cardWidth">
               <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                     <Text
                        size="medium"
                        fontWeight="mediumbold"
                        color="primaryColor"
                        text={transactionDashboardCount.data.totalTransactionCount}
                     />
                     <Text
                        size="Small"
                        fontWeight="smbold"
                        color={
                           transactionDashboardCount.data.currentWeekTotalTransactionCount
                              .toString()
                              .includes("-")
                              ? "dangerColor"
                              : "successColor"
                        }
                        text={
                           transactionDashboardCount.data.currentWeekTotalTransactionCount
                              .toString()
                              .includes("-")
                              ? transactionDashboardCount.data.currentWeekTotalTransactionCount
                              : "+" +
                              transactionDashboardCount.data.currentWeekTotalTransactionCount
                        }
                     />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                     <Text
                        size="xSmall"
                        fontWeight="smbold"
                        color="TaupeGrey"
                        text="Total Transactions"
                     />
                     <Text
                        size="xSmall"
                        fontWeight="smbold"
                        color="secondryColor"
                        text="Change This Week"
                     />
                  </div>
               </Card.Body>
            </Card>
         </div>

         <div className="tableBox bg-white">
            <div className="d-flex justify-content-between align-items-center tableHeading">
               <div>
                  <Text
                     size="regular"
                     fontWeight="mediumbold"
                     color="secondryColor"
                     text="Transaction Leads"
                  />
               </div>
               <div className="locationSelect">
                  <Form.Group controlId="exampleForm.SelectCustom" >
                     {/* <Form.Label>City:</Form.Label> */}
                     <Form.Control
                        as="select"
                        onChange={(e) => {
                           setLocationsData([]);
                           setTransactionLeadCity(e.target.value);
                           setTransactionLeadLocation('');
                           _filterTransactionLeads(e.target.value, '');
                           if (e.target.value.length) {
                              // let locationsByCity = [];
                              getLocationByCity({ city: e.target.value })
                                 .then((res) => {
                                    if (res.data && res.data.status === 200) {
                                       const locationsByCity = res.data.resourceData.locations.map(
                                          (loc) => {
                                             return {
                                                ...loc,
                                                location: `${loc.location} ,${loc.pinCode}`,
                                             };
                                          });
                                       setLocationsData(locationsByCity);
                                    }

                                 })
                                 .catch((err) => console.log("err:", err));
                           } else {
                              setLocationsData([]);
                           }
                        }}
                     >
                        <option value="">Select City</option>
                        {allCities?.data?.cities &&
                           allCities?.data?.cities?.length
                           ? allCities?.data?.cities.map((_value, index) => (
                              <option key={index} value={_value}>
                                 {_value}
                              </option>
                           ))
                           : null}
                     </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.SelectCustom" >
                     {/* <Form.Label>Location:</Form.Label> */}
                     <Form.Control
                        as="select"
                        value={transactionLeadLocation}
                        className="locationWidth"
                        onChange={(e) => {
                           setTransactionLeadLocation(e.target.value)
                           _filterTransactionLeads(transactionLeadCity, e.target.value)
                        }}
                     >
                        <option value="">Select Location</option>
                        {locationsData && locationsData.length
                           ? locationsData.map((_value, index) => (
                              <option key={_value.pinCode} value={_value.location}>
                                 {_value.location}
                              </option>
                           ))
                           : null}
                     </Form.Control>
                  </Form.Group>
               </div>
            </div>
            <div className="transactionTransactionleadsTableWrapper">
               <DataTableComponent
                  onChangePage={onChangePage}
                  data={transactionLeadsData.data.length ? transactionLeadsData.data.slice(0, 5) : []}
                  columns={TransactionLeadsColumns}
                  progressPending={transactionLeadsData.isLoading}
                  progressComponent={ProgressComponent}
                  pagination={false}
               />
            </div>
            <div className="table-bottom ml-auto">
               <Link
                  to={{
                     pathname: "/admin/transaction/transaction-leads",
                     state: { module: "Transaction Leads" },
                  }}
                  className="viewAll-btn"
               >
                  {transactionLeadsData.data.length ?
                     <Text
                        size="Small"
                        fontWeight="mediumbold"
                        color="primaryColor"
                        text="View All"
                        className="ml-2 d-flex"
                     />
                     : null}
               </Link>
            </div>
         </div>

         <div className="tableBox mb-5">
            <div className="d-flex justify-content-between align-items-center tableHeading">
               <div>
                  <Text
                     size="regular"
                     fontWeight="mediumbold"
                     color="secondryColor"
                     text="Meeting Requests"
                  />
               </div>
               <div className="locationSelect">
                  <Form.Group controlId="exampleForm.SelectCustom">
                     <Form.Control
                        as="select"
                        onChange={(e) => {
                           setLocationsMeetingReqData([])
                           setMeetingReqCity(e.target.value);
                           setMeetingReqLocation('');
                           _filterMeetingRequestCity(e.target.value, 0);
                           if (e.target.value.length) {
                              getLocationByCity({ city: e.target.value })
                                 .then((res) => {
                                    if (res.data && res.data.status === 200) {
                                       const locationsByCity = res.data.resourceData.locations.map(
                                          (loc) => {
                                             return {
                                                ...loc,
                                                location: `${loc.location} ,${loc.pinCode}`,
                                             };
                                          }
                                       );
                                       setLocationsMeetingReqData(locationsByCity);
                                    }
                                 })
                                 .catch((err) => console.log("err:", err));
                           } else {
                              setLocationsMeetingReqData([]);
                           }
                        }}
                     >
                        <option value="">Select City</option>
                        {allCities?.data?.cities &&
                           allCities?.data?.cities?.length
                           ? allCities?.data?.cities.map((_value, index) => (
                              <option key={index} value={_value}>
                                 {_value}
                              </option>
                           ))
                           : null}
                     </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.SelectCustom">
                     {/* <Form.Label>Location:</Form.Label> */}
                     <Form.Control
                        as="select"
                        value={meetingReqLocation}
                        onChange={(e) => {
                           _filterMeetingRequestCity(meetingReqCity, e.target.value)
                           setMeetingReqLocation(e.target.value)
                        }}
                        className="locationWidth"
                     >
                        <option value="">Select Location</option>
                        {locationsMeetingReqData && locationsMeetingReqData.length
                           ? locationsMeetingReqData.map((_value, index) => (
                              <option key={_value.pinCode} value={_value.pinCode}>
                                 {_value.location}
                              </option>
                           ))
                           : null}
                     </Form.Control>
                  </Form.Group>
               </div>
            </div>

            <div className="transactionMeetingrequestsTableWrapper">
               <DataTableComponent
                  onChangePage={onChangePage}
                  data={
                     transactionMeetingRequestData.data.length
                        ? transactionMeetingRequestData.data.slice(0, 5)
                        : []
                  }
                  columns={MeetingRequestColumns}
                  progressPending={transactionMeetingRequestData.isLoading}
                  // paginationComponent={PaginationComponent}
                  // paginationRowsPerPageOptions={[4,10,20,50]}
                  // paginationPerPage={4}
                  progressComponent={ProgressComponent}
                  pagination={false}
               // sortIcon={<Image name="sort_icon" src={sortIocn} /> }
               />
            </div>

            <div className="table-bottom ml-auto">
               <Link
                  to={{
                     pathname: "/admin/transaction/meeting-requests",
                     state: { module: "Meeting Requests" },
                  }}
                  className="viewAll-btn"
               >
                  {transactionMeetingRequestData?.data?.length ?
                     <Text
                        size="Small"
                        fontWeight="mediumbold"
                        color="primaryColor"
                        text="View All"
                        className="ml-2 d-flex"
                     />
                     : null}
               </Link>
            </div>
         </div>

         <div className="tableBox mb-5">
            <div className="d-flex justify-content-between align-items-center tableHeading">
               <div>
                  <Text
                     size="regular"
                     fontWeight="mediumbold"
                     color="secondryColor"
                     text="Deal Approvals"
                  />
               </div>
               <div className="locationSelect">
                  <Form.Group controlId="exampleForm.SelectCustom">
                     {/* <Form.Label>City:</Form.Label> */}
                     <Form.Control
                        as="select"
                        onChange={(e) => {
                           setLocationsDealData([]);
                           setDealCity(e.target.value);
                           setDealLocation('');
                           _filterDealRequests(e.target.value, 0);
                           if (e.target.value.length) {
                              getLocationByCity({ city: e.target.value })
                                 .then((res) => {
                                    if (res.data && res.data.status === 200) {
                                       const locationsByCity = res.data.resourceData.locations.map(
                                          (loc) => {
                                             return {
                                                ...loc,
                                                location: `${loc.location} ,${loc.pinCode}`,
                                             };
                                          }
                                       );
                                       setLocationsDealData(locationsByCity);
                                       // this.setState({
                                       //    // allLocationsByCity: res.data.resourceData.locations,
                                       //    allLocationsByCity: locationsByCity,
                                       // });
                                    }
                                 })
                                 .catch((err) => console.log("err:", err));
                           } else {
                              setLocationsDealData([]);
                           }
                        }}
                     >
                        <option value="">Select City</option>
                        {allCities?.data?.cities &&
                           allCities?.data?.cities?.length
                           ? allCities?.data?.cities.map((_value, index) => (
                              <option key={index} value={_value}>
                                 {_value}
                              </option>
                           ))
                           : null}
                     </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.SelectCustom">
                     {/* <Form.Label>Location:</Form.Label> */}
                     <Form.Control
                        as="select"
                        value={dealLocation}
                        onChange={(e) => {
                           setDealLocation(e.target.value)
                           _filterDealRequests(dealCity, e.target.value)
                        }}
                        className="locationWidth"
                     >
                        <option value="">Select Location</option>
                        {locationsDealData.length
                           ? locationsDealData.map((_value, index) => (
                              <option key={_value.pinCode} value={_value.pinCode}>
                                 {_value.location}
                              </option>
                           ))
                           : null}
                     </Form.Control>
                  </Form.Group>
               </div>
            </div>
            <div className="dealApprovalTableWrapper">
               <DataTableComponent
                  onChangePage={onChangePage}
                  data={dealApprovalData.data.length ? dealApprovalData.data.slice(0, 5) : []}
                  columns={dealApprovalColumns}
                  progressPending={transactionMeetingRequestData.isLoading}
                  //  paginationComponent={PaginationComponent}
                  //  paginationRowsPerPageOptions={[4, 10, 20, 50]}
                  //  paginationPerPage={4}
                  pagination={false}
                  progressComponent={ProgressComponent}
               // sortIcon={<Image name="sort_icon" src={sortIocn} /> }
               />
            </div>
            <div className="table-bottom ml-auto">
               <Link
                  to={{
                     pathname: "/admin/transaction/deal-approvals",
                     state: { module: "Deal Approvals" },
                  }}
                  className="viewAll-btn"
               >
                  {dealApprovalData?.data?.length ?
                     <Text
                        size="Small"
                        fontWeight="mediumbold"
                        color="primaryColor"
                        text="View All"
                        className="ml-2 d-flex"
                     />
                     : null}
               </Link>
            </div>
         </div>

         <div className="tableBox mb-5">
            <div className="d-flex justify-content-between align-items-center tableHeading">
               <div>
                  <Text
                     size="regular"
                     fontWeight="mediumbold"
                     color="secondryColor"
                     text="Transaction Team"
                  />
               </div>
               <div className="locationSelect">
                  <Form.Group controlId="exampleForm.SelectCustom">
                     {/* <Form.Label>City:</Form.Label> */}
                     <Form.Control
                        as="select"
                        onChange={(e) => _filterTransactionTeamCity(e.target.value)}
                     >
                        <option value="">Select City</option>
                        {transactionTeamsCityData?.data?.length
                           ? transactionTeamsCityData?.data?.map((_value, index) => (
                              <option key={index} value={_value}>
                                 {_value}
                              </option>
                           ))
                           : null}
                     </Form.Control>
                  </Form.Group>
               </div>
            </div>
            <div className='transactionteamTableWrapper'>
               <DataTableComponent
                  onChangePage={onChangePage}
                  data={transactionTeamsData.data.length ? transactionTeamsData.data : []}
                  columns={transactionTeamsColumns}
                  progressPending={transactionTeamsData.isLoading}
                  paginationComponent={TeamTablePaginationComponent}
                  paginationRowsPerPageOptions={[4, 8, 12, 16, 20, 24, 28, 32, 36, 40]}
                  paginationPerPage={5}
                  progressComponent={ProgressComponent}
               // sortIcon={<Image name="sort_icon" src={sortIocn} /> }
               />
            </div>

            {transactionTeamsData.data.length ? null : (
               <div className="d-flex justify-content-center">
                  <TeamTablePaginationActionButton />
               </div>
            )}
         </div>
         </div>
      </>
   );
};

const mapStateToProps = ({
   allTransactionCities,
   allCities,
   allLocationsByCity,
   transactionTeamsData,
   transactionDashboardCount,
   transactionMeetingRequestData,
   transactionLeadsData,
   transactionTeamsCityData,
   dealApprovalData,
}) => ({
   transactionTeamsData,
   allTransactionCities,
   allCities,
   allLocationsByCity,
   transactionDashboardCount,
   transactionMeetingRequestData,
   transactionLeadsData,
   transactionTeamsCityData,
   dealApprovalData,
});

const actions = {
   getAllCity,
   getLocationByCity,
   getAllTransactionTeams,
   getTransactionDashboardCount,
   getAllTransactionMeetingRequest,
   getAllTransactionLead,
   getAllTransactionTeamsCity,
   getAllPendingDealApproval,
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(Transaction);


// UNUSED VARS
   // const TableTitle = () => {
   //    return (
   //       <div className="d-flex justify-content-between align-items-center tableHeading">
   //          <div>
   //             <Text
   //                size="regular"
   //                fontWeight="mediumbold"
   //                color="secondryColor"
   //                text="Societies on Smartdoor"
   //             />
   //          </div>
   //          <div className="locationSelect">
   //             <Form.Group controlId="exampleForm.SelectCustom">
   //                <Form.Label>Location:</Form.Label>
   //                <Form.Control as="select">
   //                   <option>Select</option>
   //                   <option>Under development</option>
   //                </Form.Control>
   //             </Form.Group>
   //          </div>
   //       </div>
   //    );
   // };

   // const ServiceReqPaginationActionButton = () => (
   //    <>
   //       <div className="d-flex justify-content-between table-bottom ml-auto">
   //          <ToolTip position="top" name="Under development">
   //             <span>
   //                <Buttons
   //                   name="Add New Entry"
   //                   varient="success"
   //                   type="submit"
   //                   size="Small"
   //                   color="white"
   //                   className="mr-2"
   //                />
   //             </span>
   //          </ToolTip>
   //       </div>
   //       <div className="table-bottom ml-auto">
   //          <Link to="/admin/execution/serviceRequest" className="viewAll-btn">
   //             <Text
   //                size="Small"
   //                fontWeight="mediumbold"
   //                color="primaryColor"
   //                text="View All"
   //                className="ml-2 d-flex txt"
   //             />
   //          </Link>
   //       </div>
   //    </>
   // );