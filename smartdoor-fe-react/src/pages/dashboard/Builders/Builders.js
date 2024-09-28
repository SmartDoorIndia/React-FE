/** @format */

import React, { useEffect, memo } from "react";
import SearchInput from "../../../shared/Inputs/SearchInput/SearchInput";
import Pagination from "../../../shared/DataTable/Pagination";
import { compose } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Card, Modal, Button, Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import { IoFilterOutline } from "react-icons/io5";
import {
   handleStatusElement,
   formateDate,
   getLocalStorage,
   showErrorToast,
   showSuccessToast,
} from "../../../common/helpers/Utils";
import { ToolTip } from "../../../common/helpers/Utils";
import {
   getBrokerListing,
   getBrokerDetails,
   giftCoinsToConsumer,
} from "../../../common/redux/actions";
import addIcon from "../../../assets/svg/add.svg";
import { Link } from "react-router-dom/cjs/react-router-dom";
import "./Builders.scss";
import { DateRangePicker } from "rsuite";
import CONSTANTS_STATUS from "../../../common/helpers/ConstantsStatus";
import moment from "moment";
import { TableLoader } from "../../../common/helpers/Loader";
import Text from "../../../shared/Text/Text";
import * as Actions from "../../../common/redux/types";
import Buttons from "../../../shared/Buttons/Buttons";
import { TextField } from "@mui/material";
import { BiSortAlt2 } from "react-icons/bi";

const getModalActionData = (row) => {
   return { userData: row };
};
const Builders = (props) => {
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
         : [];

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
         name: "Builders",
         selector: (row) => row.name,
         sortable: true,
         center: true,
         minWidth: "150px",
         maxWidth: "150px",
      },
      {
         name: "Contact Person",
         selector: (row) => row.name,
         center: true,
         minWidth: "150px",
         maxWidth: "150px",
      },
      {
         name: "Mobile Number",
         selector: (row) => row.mobileforCustomer,
         sortable: true,
         center: true,
         minWidth: "145px",
         maxWidth: "150px",
      },

      {
         name: "Projects",
         selector: (row) => row.postingcount,
         sortable: true,
         center: true,
         maxWidth: "160px",
      },
      {
         name: "Last updated on",
         selector: (row) => row.joinDate,
         sortable: false,
         center: true,
         maxWidth: "160px",
      },
      {
         name: "Plan",
         sortable: true,
         center: true,
         maxWidth: "160px",
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
         name: "Projects to Review ",
         // selector: (row) => row.joinDate,
         sortable: false,
         center: true,
         maxWidth: "160px",
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
                              pathname: ``,
                              state: { loginMobile: row.loginMobile },
                           }}
                           className="action-link"
                        >
                           View&nbsp;
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
         <div className="tableBox">
            <div className="d-flex flex-md-column flex-xl-row justify-content-xl-end align-items-center tableHeading">
               <div className="locationSelect d-flex justify-content-end align-items-center w-100">
                  {subHeaderComponentMemo}
                  {statusArr.length ? (
                     <div className="d-flex align-items-center justify-content-between ProjectFilterButton">
                        <Form.Group
                           controlId="sortControl"
                           className="d-flex align-items-center"
                           style={{ marginRight: "4px" }}
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
                     </div>
                  ) : (
                     ""
                  )}
                  <Form.Group controlId="example" className="w-40 userGrp ml-0"></Form.Group>

                  <Button
                     className="d-flex py-1"
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
                        text={"Add New Posting"}
                        fontWeight="bold"
                        style={{ fontSize: "12px", color: "#BE1452" }}
                     />
                  </Button>
               </div>
            </div>

            <div className="builderTableWrapper">
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
                  paginationServer={true}
                  onChangeRowsPerPage={handleRowsPerPageChange}
                  subHeaderComponent={subHeaderComponentMemo}
                  persistTableHead="true"
                  filterComponent={subHeaderComponentMemo}
                  keyField="id"
               ></DataTableComponent>
            </div>
         </div>
         {/* <Modal
            show={showModal}
            onHide={() => {
               setShowModal(false);
            }}
            centered
            style={{ backgroundImage: "unset" }}
         >
            <Modal.Header className="justify-content-center">
               <Text
                  size="medium"
                  fontWeight="mediumbold"
                  color="primaryColor"
                  text={"Add coins to " + ""}
               />
            </Modal.Header>
            <Modal.Body className="text-align-center">
               <TextField
                  label={"Enter SD coins"}
                  type="number"
                  inputProps={{ min: 0 }}
                  value={newCoinValue}
                  onChange={(e) => {
                     setNewCoinValue(e.target.value);
                  }}
               />
               <div className="mt-3">
                  <Buttons
                     name="Gift Coins"
                     varient="primary"
                     type="submit"
                     size="Small"
                     color="white"
                     onClick={() => {
                        addCoins();
                     }}
                  />{" "}
                  &nbsp;&nbsp;
                  <Buttons
                     name="Cancel"
                     varient="primary"
                     size="Small"
                     color="white"
                     onClick={() => {
                        setShowModal(false);
                     }}
                  />
               </div>
            </Modal.Body>
         </Modal> */}
      </>
   );
};
const mapStateToProps = ({ allPlanDataBroker }) => ({
   allPlanDataBroker,
});
const actions = {
   getBrokerListing,
   getBrokerDetails,
};
const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(Builders);
