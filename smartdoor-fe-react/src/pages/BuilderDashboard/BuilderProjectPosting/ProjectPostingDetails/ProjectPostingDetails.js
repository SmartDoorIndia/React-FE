/** @format */
// Line 90 has the API integration

import React, { useEffect, memo } from "react";

import { Col, Row, Button, Container, Form, Image } from "react-bootstrap";
import { BsPencil } from "react-icons/bs";
import "./ProjectPostingDetails.scss";
import pencilIcon from "../../../../assets/svg/edit-01.svg";
/** @format */
// @ts-ignore
import SearchInput from "../../../../shared/Inputs/SearchInput/SearchInput";
import Pagination from "../../../../shared/DataTable/Pagination";
import { compose } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Card, Modal } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import addIcon from "../../../../assets/svg/add.svg";
import { BiSortAlt2 } from "react-icons/bi";
import { IoFilterOutline } from "react-icons/io5";

import {
   handleStatusElement,
   formateDate,
   getLocalStorage,
   showErrorToast,
   showSuccessToast,
   ToolTip,
} from "../../../../common/helpers/Utils";
import {
   getBrokerListing,
   getBrokerDetails,
   giftCoinsToConsumer,
   getBuilderProjectSubPosts,
   getBuilderProjectById
} from "../../../../common/redux/actions";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { DateRangePicker } from "rsuite";
import CONSTANTS_STATUS from "../../../../common/helpers/ConstantsStatus";
import moment from "moment";
import { TableLoader } from "../../../../common/helpers/Loader";
import Text from "../../../../shared/Text/Text";
import * as Actions from "../../../../common/redux/types";
import Buttons from "../../../../shared/Buttons/Buttons";
import { TextField } from "@mui/material";

const getModalActionData = (row) => {
   return { userData: row };
};
const ProjectPostingDetails = (props) => {
   const { getBrokerListing, allPlanDataBroker } = props;
   const statusArr = CONSTANTS_STATUS.brokerStatus;
   const data = useSelector((state) => state.allPlanDataBroker.data);
   const [filterText, setFilterText] = useState(
      data !== undefined ? allPlanDataBroker?.data?.searchString : ""
   );
   const [statusSelected, setStatusSelected] = useState(
      data !== undefined ? allPlanDataBroker?.data?.status : ""
   );
   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
   const [startDate, setStartDate] = useState(
      data !== undefined ? allPlanDataBroker?.data?.fromDate : null
   );
   const [endDate, setEndDate] = useState(
      data !== undefined ? allPlanDataBroker?.data?.toDate : null
   );
   const [currentPage, setCurrentPage] = useState(
      data !== undefined ? allPlanDataBroker?.data?.currentPage : 1
   );
   const [rowsPerPage, setRowsPerPage] = useState(
      data !== undefined ? allPlanDataBroker?.data?.rowsPerPage : 8
   );
   const recordSize = allPlanDataBroker?.data?.records || 0;
   const userData = getLocalStorage("authData");
   const dispatch = useDispatch();

   const [showModal, setShowModal] = useState(false);
   const [newCoinValue, setNewCoinValue] = useState(null);
   const [currentBrokerId, setCurrentBrokerId] = useState(null);
   const [builderProjectSubPosts, setBuilderProjectSubPosts] = useState(null);
   const [projectSubPostsFilter, setprojectSubPostsFilter] = useState({
      builderProjectId: 11,
      searchString: "4",
      userId: 398,
      records: 10,
      pageNumber: 1
   });

   const [builderProjectId, setBuilderProjectId] = useState(11);
   const [userId, setUserId] = useState(398);
   const [builderProjectDetails, setBuilderProjectDetails] = useState(null);

   useEffect(() => {
      getBuilderProjectSubPosts(projectSubPostsFilter)
      .then((response)=>{
         setBuilderProjectSubPosts(response.data.resourceData)
         console.log(response.data.resourceData);
      })

      getBuilderProjectById({builderProjectId: builderProjectId, userId: userId})
      .then((response)=>{
         setBuilderProjectDetails(response.data.resourceData)
         console.log(response.data.resourceData);
      })
   }, [projectSubPostsFilter])

   useEffect(() => {
      console.log(data);
      dispatch({ type: Actions.BROKERS_PROPERTY_SUCCESS, data: [] });
      if (data === undefined) {
         getBrokerListing({
            userId: userData.userid,
            currentLat: null,
            currentLong: null,
            pageNo: currentPage,
            records: rowsPerPage,
            adminLogin: true,
            searchString: "",
         });
      }
   }, [getBrokerListing]);

   const showValue = (status_value, startDate_, endDate_) => {
      let status = status_value || statusSelected;
      let filteredItems = [];
      startDate_ = startDate_ || startDate;
      endDate_ = endDate_ || endDate;
      filteredItems = allPlanDataBroker.data?.brokerList?.length
         ? allPlanDataBroker?.data?.brokerList
         : // ?.filter((item) => {
           //    return (
           //       item?.id == filterText ||
           //       item?.mobile?.includes(filterText) ||
           //       item?.name?.toLowerCase().includes(filterText.toLowerCase())
           //    );
           // })
           [];

      return filteredItems;
   };

   const handlePageChange = (newPage) => {
      setCurrentPage(Number(newPage));
      getBrokerListing({
         userId: userData.userid,
         currentLat: null,
         currentLong: null,
         pageNo: newPage,
         records: rowsPerPage,
         adminLogin: true,
         status: statusSelected?.toUpperCase(),
         searchString: filterText,
         fromDate: startDate,
         toDate: endDate,
      });
   };

   const handleRowsPerPageChange = (newRowsPerPage) => {
      setRowsPerPage(newRowsPerPage);
      getBrokerListing({
         userId: userData.userid,
         currentLat: null,
         currentLong: null,
         pageNo: currentPage,
         records: newRowsPerPage,
         adminLogin: true,
         status: statusSelected?.toUpperCase(),
         searchString: filterText,
         fromDate: startDate,
         toDate: endDate,
      });
   };

   const ProgressComponent = <TableLoader />;
   const PaginationComponent = ({ onChangePage, onChangeRowsPerPage, ...props }) => (
      <Pagination
         {...props}
         PaginationActionButton={PaginationActionButton}
         currentPage={currentPage}
         rowsPerPage={rowsPerPage}
         rowCount={recordSize}
         onChangePage={handlePageChange}
         onChangeRowsPerPage={handleRowsPerPageChange}
      />
   );
   const PaginationActionButton = () => (
      <div className="d-flex justify-content-center tableBottom"></div>
   );

   const handleDateRangeChange = (date) => {
      if (date && date[0] && date[1]) {
         const startDt = date[0];
         const endDt = date[1];
         setStartDate(startDt);
         setEndDate(endDt);
         // showValue(statusSelected, startDate, endDate);
         // setDatata(filteredItems);
         getBrokerListing({
            userId: userData.userid,
            currentLat: null,
            currentLong: null,
            pageNo: 1,
            records: rowsPerPage,
            adminLogin: true,
            status: statusSelected?.toUpperCase(),
            searchString: filterText,
            fromDate: startDt,
            toDate: endDt,
         });
      }
      if (date.length === 0) {
         getBrokerListing({
            userId: userData.userid,
            currentLat: null,
            currentLong: null,
            pageNo: 1,
            records: rowsPerPage,
            adminLogin: true,
            status: statusSelected?.toUpperCase(),
            searchString: filterText,
            fromDate: "",
            toDate: "",
         });
      }
   };

   const subHeaderComponentMemo = React.useMemo(() => {
      const handleClear = () => {
         if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");
         }
      };

      return (
         <SearchInput
            onFilter={(e) => {
               setFilterText(e.target.value);
               getBrokerListing({
                  userId: userData.userid,
                  currentLat: null,
                  currentLong: null,
                  pageNo: 1,
                  records: rowsPerPage,
                  adminLogin: true,
                  status: statusSelected?.toUpperCase(),
                  searchString: e.target.value,
                  fromDate: startDate,
                  toDate: endDate,
               });
            }}
            onClear={handleClear}
            filterText={filterText}
            placeholder="Search"
         />
      );
   }, [filterText, resetPaginationToggle]);

   const _filterStatus = (status_value) => {
      setStatusSelected(status_value);
      getBrokerListing({
         userId: userData.userid,
         currentLat: null,
         currentLong: null,
         pageNo: 1,
         records: rowsPerPage,
         adminLogin: true,
         status: status_value?.toUpperCase(),
         searchString: filterText,
         fromDate: startDate,
         toDate: endDate,
      });
      // showValue(status_value);
   };

   const columns = [
      {
         name: "Towers / Plotted",
         selector: (row) => row.name,
         center: true,
         minWidth: "200px",
         maxWidth: "200px",
      },
      {
         name: "Unit Types ",
         selector: (row) => row.locationName,
         sortable: false,
         center: true,
         minWidth: "120px",
      },

      {
         name: "Total Units",
         selector: (row) => row.postingcount,
         sortable: false,
         center: true,
         maxWidth: "160px",
      },
      {
         name: "Contact Person",
         selector: (row) => row.name,
         center: true,
         minWidth: "150px",
         maxWidth: "150px",
      },
      {
         name: "Mobile",
         selector: (row) => row.mobileforCustomer,
         //  sortable: true,
         center: true,
         minWidth: "145px",
         maxWidth: "150px",
      },

      {
         name: "Status",
         selector: (row) => row.status,
         sortable: false,
         center: true,
         minWidth: "120px",
         cell: ({ status }) => handleStatusElement(status),
      },
      {
         name: "Action",
         selector: (row) => row.action,
         sortable: false,
         center: false,
         minWidth: "150px",
         maxWidth: "150px",
         cell: (row) => (
            <div className="action">
               <ToolTip name="View">
                  <span>
                     {row.status === "Expired" ? (
                        <span>View </span>
                     ) : (
                        <Link
                           to={{
                              pathname: `/builder/Project-Posting-Details`,
                              state: { loginMobile: row.loginMobile },
                           }}
                           className="action-link"
                        >
                           Download Leads
                        </Link>
                     )}
                  </span>
               </ToolTip>
            </div>
         ),
      },
   ];

   const addCoins = () => {
      if (newCoinValue < 0) {
         showErrorToast("Enter positive value...");
         setNewCoinValue(0);
      } else if (!newCoinValue) {
         showErrorToast("Enter SD coins...");
      } else {
         setShowModal(false);
         giftCoinsToConsumer({ consumerId: currentBrokerId, coins: newCoinValue })
            .then((response) => {
               if (response.status === 200) {
                  showSuccessToast(newCoinValue + " Coins gifted successfully");
                  setNewCoinValue(null);
               }
            })
            .catch((error) => {
               console.log(error);
               showErrorToast("Please try again...");
            });
      }
   };
   return (
      <>
         <Container
            className=" main-details-section bg-white "
            style={{
               backgroundColor: "#F8F3F5",
               borderRadius: "5px",
               border: "1px solid rgb(189 186 206)",
            }}
         >
            <Row>
               {/* Left Section */}
               <Col md={11} className="p-3">
                  <Row className="mb-2">
                     <Col xs={4}>
                        <p className="mb-1">Location: DP Road, Vishal Nagar, Pune</p>
                     </Col>
                     <Col xs={4}>
                        <p className="mb-1">Land Area: 25 Acres</p>
                     </Col>
                     <Col xs={4}>
                        <p className="mb-1">Possession from: Jan 2025 - Mar 2026</p>
                     </Col>
                  </Row>
                  <Row className="mb-2">
                     <Col xs={4}>
                        <p className="mb-1">General Amenities: Gym, Swimming Pool</p>
                     </Col>
                     <Col xs={4}>
                        <p className="mb-1">Total Area to Develop: 50,000 Sq. Ft</p>
                     </Col>
                  </Row>
                  <Row className="mb-2">
                     <Col xs={4}>
                        <p className="mb-1">Total Towers Planned: 20</p>
                     </Col>
                     <Col xs={4}>
                        <p className="mb-1">Open Area: 15%</p>
                     </Col>
                  </Row>
                  <Row className="mb-2">
                     <Col xs={12}>
                        <p className="mb-1">
                           Project Description: Lorem ipsum dolor sit amet consectetur. Nam
                           imperdiet fermentum commodo viverra orci. Sed turpis cras suspendisse
                           cras natoque viverra cras.
                        </p>
                     </Col>
                  </Row>
                  <Row className="mb-2">
                     <Col xs={4}>
                        <p>
                           Project Images:{" "}
                           <a
                              href="#"
                              style={{
                                 color: "#BE1452",
                                 fontWeight: "bold",
                                 textDecoration: "underline",
                              }}
                           >
                              {" "}
                              2 Image(s)
                           </a>
                        </p>
                     </Col>
                     <Col xs={4}>
                        <p>
                           Plan Layout:{" "}
                           <a
                              href="#"
                              style={{
                                 color: "#BE1452",
                                 fontWeight: "bold",
                                 textDecoration: "underline",
                              }}
                           >
                              1 Image(s)
                           </a>
                        </p>
                     </Col>
                     <Col xs="4">
                        <Button
                           variant="link"
                           style={{
                              color: "#BE1452",
                              fontWeight: "bold",
                              fontSize: "14px",
                              textDecoration: "none",
                           }}
                        >
                           Download Leads
                        </Button>
                     </Col>
                  </Row>
               </Col>

               {/* Right Section */}
               <Col
                  md={1}
                  className="p-0 d-flex justify-content-end align-items-center"
                  style={{
                     minHeight: "30vh",
                     backgroundColor: "#F8F3F5",
                     borderLeft: "1px solid rgb(189 186 206)",
                  }}
               >
                  <div className="d-flex flex-column align-items-center">
                     <Button
                        variant="light"
                        className="mb-3"
                        style={{
                           color: "#BE1452",
                           backgroundColor: "#F8F3F5",
                           borderRadius: "20px",
                        }}
                     >
                        <img src={pencilIcon} style={{ marginRight: "5px" }} />
                     </Button>
                  </div>
               </Col>
            </Row>
         </Container>

         <div className="tableBox">
            <div className="d-flex flex-md-column flex-xl-row justify-content-xl-end align-items-center tableHeading">
               <div className="locationSelect d-flex justify-content-end align-items-center w-100">
                  {subHeaderComponentMemo}
                  {statusArr.length ? (
                     <div className="d-flex align-items-center justify-content-between ProjectFilterButton">
                        <Form.Group
                           controlId="sortControl"
                           className="d-flex align-items-center"
                           style={{ marginRight: "15px" }}
                        >
                           <Form.Control
                              as="text"
                              value={statusSelected}
                              className="FilterControl"
                              onChange={(e) => {
                                 _filterStatus(e.target.value);
                              }}
                              style={{ display: "flex", alignItems: "center" }} // Ensure icon and label align properly
                           >
                              <BiSortAlt2
                                 className="filter-icon"
                                 style={{ marginRight: "10px", fontSize: "1rem" }}
                              />
                              <span
                                 className="filter-label"
                                 style={{ marginRight: "8px", fontSize: "12px", color: "#000" }}
                              >
                                 Sort
                              </span>
                           </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="filterControl" className="d-flex align-items-center">
                           <Form.Control
                              as="text"
                              value={statusSelected}
                              className="FilterControl"
                              onChange={(e) => {
                                 _filterStatus(e.target.value);
                              }}
                              style={{ display: "flex", alignItems: "center" }} // Ensure icon and label align properly
                           >
                              <IoFilterOutline
                                 className="filter-icon"
                                 style={{ marginRight: "10px", fontSize: "1rem" }}
                              />
                              <span
                                 className="filter-label"
                                 style={{ marginRight: "8px", fontSize: "12px", color: "#000" }}
                              >
                                 Filter
                              </span>
                           </Form.Control>
                        </Form.Group>
                     </div>
                  ) : (
                     ""
                  )}
                  <Form.Group controlId="example" className="w-40 userGrp ml-0"></Form.Group>

                  <Button
                     className="d-flex py-1 ml-3"
                     style={{
                        color: "#BE1452",
                        backgroundColor: "#F8F3F5",
                        borderColor: "#DED6D9",
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
                        <Image src={addIcon} style={{ width: "10px" }} />
                     </div>
                     <Text
                        text={"Add New Tower"}
                        fontWeight="bold"
                        style={{ fontSize: "12px", color: "#BE1452" }}
                     />
                  </Button>
               </div>
            </div>

            <div className="ProjectPostingTableWrapper">
               <DataTableComponent
                  data={showValue()}
                  columns={columns}
                  progressPending={allPlanDataBroker.isLoading}
                  progressComponent={ProgressComponent}
                  paginationComponent={PaginationComponent}
                  paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                  paginationPerPage={8}
                  perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                  filterText={filterText}
                  currentPage={currentPage}
                  rowsPerPage={rowsPerPage}
                  onChangePage={handlePageChange}
                  expanded
                  paginationServer={true}
                  onChangeRowsPerPage={handleRowsPerPageChange}
                  subHeaderComponent={subHeaderComponentMemo}
                  persistTableHead="true"
                  filterComponent={subHeaderComponentMemo}
                  keyField="id"
               ></DataTableComponent>
            </div>
         </div>
      </>
   );
};
const mapStateToProps = ({ allPlanDataBroker }) => ({
   allPlanDataBroker,
});
const actions = {
   getBrokerListing,
   getBrokerDetails,
   getBuilderProjectSubPosts,
   getBuilderProjectById
};
const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(ProjectPostingDetails);
