/** @format */

import React, { useCallback, useEffect, memo } from "react";
import SearchInput from "../../../shared/Inputs/SearchInput/SearchInput";
import Pagination from "../../../shared/DataTable/Pagination";
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";
import { useState } from "react";
import { Button, Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import { handleStatusElement, getLocalStorage } from "../../../common/helpers/Utils";
import { ToolTip } from "../../../common/helpers/Utils";
import addIcon from "../../../assets/svg/add.svg";
import { Link } from "react-router-dom/cjs/react-router-dom";
import "./Builders.scss";
import CONSTANTS_STATUS from "../../../common/helpers/ConstantsStatus";
import { TableLoader } from "../../../common/helpers/Loader";
import Text from "../../../shared/Text/Text";
import { BiSortAlt2 } from "react-icons/bi";
import { getBuilderList, getBuilderStats } from "../../../common/redux/actions"; // Ensure correct imports

const Builders = (props) => {
   const { BuilderListing } = props;
   const statusArr = CONSTANTS_STATUS.brokerStatus;
   const auth = getLocalStorage("authData");
   const storedUserId = auth.userid;
   const [builderFilter, setBuilderFilter] = useState({
      userId: storedUserId,
      builderName: "",
      records: 10,
      pageNumber: 1,
   });
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);

   const [builderStats, setBuilderStats] = useState({
      builderCount: 0,
      builderProjectCount: 0,
   });
   const [filterText, setFilterText] = useState(
      data !== undefined ? BuilderListing?.data?.searchString : ""
   );
   const [statusSelected, setStatusSelected] = useState(
      data !== undefined ? BuilderListing?.data?.status : ""
   );
   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

   const [currentPage, setCurrentPage] = useState(
      data !== undefined ? BuilderListing?.data?.currentPage : 1
   );
   const [rowsPerPage, setRowsPerPage] = useState(
      data !== undefined ? BuilderListing?.data?.rowsPerPage : 8
   );
   const recordSize = BuilderListing?.data?.records || 0;
   const userData = getLocalStorage("authData");
   const dispatch = useDispatch();

   const [error, setError] = useState(null);
   // Fetch builder data if editing an existing profile
   const _getBuilderListAndStats = useCallback(() => {
      getBuilderList(builderFilter)
         .then((response) => {
            if (response?.data) {
               const { resourceData, error: responseError } = response.data;
               if (resourceData) {
                  // Ensure no null values in resourceData
                  const sanitizedData = Object.fromEntries(
                     Object.entries(resourceData).map(([key, value]) => [key, value ?? ""])
                  );
                  setData(sanitizedData);
                  console.log("sanitizedData:- ", sanitizedData);
               }
               if (responseError) setError(responseError);
            }
            setLoading(false);
         })
         .catch((error) => {
            setLoading(false);
            setError(error);
            console.log("Error fetching builder data:", error);
         });

      getBuilderStats(builderFilter)
         .then((response) => {
            if (response?.data) {
               const { resourceData, error: responseError } = response.data;
               if (resourceData) {
                  // Ensure no null values in resourceData
                  const sanitizedData = Object.fromEntries(
                     Object.entries(resourceData).map(([key, value]) => [key, value ?? ""])
                  );
                  setBuilderStats(sanitizedData);
                  console.log("sanitizedData:- ", sanitizedData);
               }
               if (responseError) setError(responseError);
            }
            setLoading(false);
         })
         .catch((error) => {
            setLoading(false);
            setError(error);
            console.log("Error fetching builder data:", error);
         });
   }, []);

   // Fetch builder profile on component mount or when builderId changes
   useEffect(() => {
      _getBuilderListAndStats();
   }, []);

   const showValue = (status_value, startDate_, endDate_) => {
      let status = status_value || statusSelected;
      let filteredItems = [];

      filteredItems = BuilderListing.data?.brokerList?.length
         ? BuilderListing?.data?.brokerList
         : [];

      return filteredItems;
   };

   const handlePageChange = (newPage) => {
      setCurrentPage(Number(newPage));
      getBuilderList({
         userId: userData.userid,
         currentLat: null,
         currentLong: null,
         pageNo: newPage,
         records: rowsPerPage,
         adminLogin: true,
         status: statusSelected?.toUpperCase(),
         searchString: filterText,
      });
   };

   const handleRowsPerPageChange = (newRowsPerPage) => {
      setRowsPerPage(newRowsPerPage);
      getBuilderList({
         userId: userData.userid,
         currentLat: null,
         currentLong: null,
         pageNo: currentPage,
         records: newRowsPerPage,
         adminLogin: true,
         status: statusSelected?.toUpperCase(),
         searchString: filterText,
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
               getBuilderList({
                  userId: userData.userid,
                  currentLat: null,
                  currentLong: null,
                  pageNo: 1,
                  records: rowsPerPage,
                  adminLogin: true,
                  status: statusSelected?.toUpperCase(),
                  searchString: e.target.value,
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
      getBuilderList({
         userId: userData.userid,
         currentLat: null,
         currentLong: null,
         pageNo: 1,
         records: rowsPerPage,
         adminLogin: true,
         status: status_value?.toUpperCase(),
         searchString: filterText,
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
                     // onClick={() => {
                     //    localStorage.removeItem("builderProjectId");
                     //    window.location.href = "/builder/detail";
                     // }}
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
                  progressPending={BuilderListing.isLoading}
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
const mapStateToProps = ({ BuilderListing }) => ({
   BuilderListing,
});
const actions = {
   getBuilderList,
   getBuilderStats,
};
const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(Builders);
