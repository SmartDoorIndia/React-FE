/** @format */

import React, { useCallback, useEffect, memo } from "react";
import SearchInput from "../../../../shared/Inputs/SearchInput/SearchInput";
import Pagination from "../../../../shared/DataTable/Pagination";
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";
import { useState } from "react";
import { Button, Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import { handleStatusElement, getLocalStorage } from "../../../../common/helpers/Utils";
import { ToolTip } from "../../../../common/helpers/Utils";
import addIcon from "../../../../assets/svg/add.svg";
import { Link } from "react-router-dom/cjs/react-router-dom";
import "./Builders.scss";
import CONSTANTS_STATUS from "../../../../common/helpers/ConstantsStatus";
import { TableLoader } from "../../../../common/helpers/Loader";
import Text from "../../../../shared/Text/Text";
import { BiSortAlt2 } from "react-icons/bi";
import {
   getBuilderList,
   getBuilderStats,
   approveBuilderProfile,
} from "../../../../common/redux/actions"; // Ensure correct imports

const BuilderListing = (props) => {
   const { BuilderListing } = props;
   const statusArr = CONSTANTS_STATUS.brokerStatus;
   const [data, setData] = useState([]);
   const [filterText, setFilterText] = useState(
      data !== undefined ? BuilderListing?.data?.searchString : ""
   );
   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [rowsPerPage, setRowsPerPage] = useState(7);
   const auth = getLocalStorage("authData");
   const storedUserId = auth.userid;
   const storebuilderName = localStorage.getItem("companyName");
   const [builderFilter, setBuilderFilter] = useState({
      userId: storedUserId,
      builderName: "",
      records: rowsPerPage,
      pageNumber: currentPage,
   });
   const [builderStats, setBuilderStats] = useState({
      builderCount: null,
      builderProjectCount: null,
   });

   useEffect(() => {
      const handleGetBuilderList = async () => {
         try {
            const response = await getBuilderList(builderFilter);
            setData(response.data.resourceData);
         } catch (error) {
            console.error(error);
         }
      };
      const handleGetBuilderStats = async () => {
         try {
            const response = await getBuilderStats(builderFilter);
            setBuilderStats(response.data.resourceData);
         } catch (error) {
            console.error("Error fetching builder project stats:", error);
         }
      };

      handleGetBuilderList();
      handleGetBuilderStats();
   }, [builderFilter, rowsPerPage, currentPage]);
   const showValue = () => {
      return Array.isArray(data) && data.length > 0 ? data : [];
   };

   const handlePageChange = (newPage) => {
      setCurrentPage(Number(newPage));
      setBuilderFilter((prev) => ({
         ...prev,
         pageNumber: newPage,
      }));
   };

   const handleRowsPerPageChange = (newRowsPerPage) => {
      setRowsPerPage(newRowsPerPage);
      setCurrentPage(1); // Reset to first page when changing rows per page
      setBuilderFilter((prev) => ({
         ...prev,
         records: newRowsPerPage,
         pageNumber: 1,
      }));
   };

   const ProgressComponent = <TableLoader />;
   const PaginationComponent = ({ onChangePage, onChangeRowsPerPage, ...props }) => {
      return (
         <Pagination
            {...props}
            PaginationActionButton={PaginationActionButton}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            rowCount={builderStats?.builderCount || 0} // Use totalRecords for pagination
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
         />
      );
   };
   const PaginationActionButton = () => (
      <div className="d-flex justify-content-center tableBottom"></div>
   );

   const subHeaderComponentMemo = React.useMemo(() => {
      const handleClear = () => {
         if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");

            setBuilderFilter((prev) => ({
               ...prev,
               searchString: "",
               pageNumber: 1,
            }));
         }
      };

      return (
         <SearchInput
            onFilter={(e) => {
               const searchValue = e.target.value;
               setFilterText(searchValue);
               setBuilderFilter((prev) => ({
                  ...prev,
                  searchString: searchValue,
                  pageNumber: 1,
               }));
            }}
            onClear={handleClear}
            filterText={filterText}
            placeholder="Search"
         />
      );
   }, [filterText, resetPaginationToggle]);
   const handleClickViewAndRedirect = async (row) => {
      const builderId = row.builderId;
      console.log("builderId", builderId);

      if (!builderId) {
         console.error("No builderId found in the row data.");
         return;
      }

      // Set the builderId in local storage
      localStorage.setItem("builderId", builderId);

      // Check if the builder is approved and set the approval flag
      if (row.builderProfileApproved) {
         localStorage.setItem("builderProfileApproved", "true");
      } else {
         localStorage.setItem("builderProfileApproved", "false"); // Set to false if not approved
      }

      // Redirect to the detail page regardless of approval status
      window.location.href = `/builder/detail/${builderId}`;
   };
   const handleClickProjectAndRedirect = async (row) => {
      const builderId = row.builderId;

      if (!builderId) {
         console.error("No builderProjectId found in the row data.");
         return;
      }
      // Set the builderId in local storage
      localStorage.setItem("builderId", builderId);

      // Check if the builder is approved and set the approval flag
      if (row.builderProfileApproved) {
         localStorage.setItem("builderProfileApproved", "true");
      } else {
         localStorage.removeItem("builderProfileApproved"); // Remove if not approved
      }
      window.location.href = `/builder/project/Posting/${builderId}`;
   };

   const columns = [
      {
         name: "Builders",
         selector: (row) => row.builderName,
         sortable: true,
         center: true,
         minWidth: "150px",
         maxWidth: "150px",
      },
      {
         name: "Contact Person",
         selector: (row) => row.contactPersonName,
         center: true,
         minWidth: "150px",
         maxWidth: "150px",
      },
      {
         name: "Mobile Number",
         selector: (row) => row.mobile,
         center: true,
         minWidth: "145px",
         maxWidth: "150px",
      },

      {
         name: "Projects",
         selector: (row) => row.numberOfProjects,
         sortable: true,
         center: true,
         maxWidth: "160px",
      },
      {
         name: "Last updated on",
         selector: (row) => {
            const date = new Date(row.lastModifiedDate);
            return date.toLocaleDateString("en-US", {
               year: "numeric",
               month: "short",
               day: "numeric",
            });
         },
         sortable: false,
         center: true,
         maxWidth: "160px",
      },

      // {
      //    name: "Plan",
      //    sortable: true,
      //    center: true,
      //    maxWidth: "160px",
      // },
      {
         name: "Status",
         selector: (row) => row.builderProfileApproved,
         sortable: false,
         minWidth: "120px",
         cell: ({ builderProfileApproved }) => (
            <span>{handleStatusElement(builderProfileApproved ? "APPROVED" : "UNDER REVIEW")}</span>
         ),
      },
      {
         name: "Projects to Review ",
         selector: (row) => row.projectsToApprove,
         sortable: false,
         center: true,
         maxWidth: "160px",
      },
      {
         name: "Action",
         selector: (row) => row.action,
         sortable: false,
         center: false,
         minWidth: "145px",
         maxWidth: "150px",
         cell: (row) => (
            <div className="action">
               <ToolTip name="View">
                  {row.status === "Expired" ? (
                     <span>View</span>
                  ) : (
                     <>
                        <button
                           onClick={() => handleClickViewAndRedirect(row)}
                           className="action-link btn"
                        >
                           View
                        </button>
                        {" | "}
                        <button
                           onClick={() => handleClickProjectAndRedirect(row)}
                           className="action-link btn"
                        >
                           Projects
                        </button>
                     </>
                  )}
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
                              className="FilterControl"
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
                     onClick={() => {
                        localStorage.removeItem("builderId");
                        window.location.href = "/builder/detail";
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
                        text={"Add New Builder"}
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

export default compose(withConnect, memo)(BuilderListing);
