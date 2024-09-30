/** @format */
// Line 84 has the API integration
import React, { useEffect, memo } from "react";
import SearchInput from "../../../../shared/Inputs/SearchInput/SearchInput";
import Pagination from "../../../../shared/DataTable/Pagination";
import { compose } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Button, Image } from "react-bootstrap";
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import { handleStatusElement, getLocalStorage } from "../../../../common/helpers/Utils";
import { ToolTip } from "../../../../common/helpers/Utils";
import { getBuilderProjects, getBuilderProjectStats } from "../../../../common/redux/actions";
import addIcon from "../../../../assets/svg/add.svg";
import { Link } from "react-router-dom/cjs/react-router-dom";
import "./ProjectsPostings.scss";
import CONSTANTS_STATUS from "../../../../common/helpers/ConstantsStatus";
import { TableLoader } from "../../../../common/helpers/Loader";
import Text from "../../../../shared/Text/Text";

const ProjectsPostings = (props) => {
   const { builderReducer } = props;
   const data = useSelector((state) => state.builderReducer.data);
   const [filterText, setFilterText] = useState(
      data !== undefined ? builderReducer?.data?.searchString : ""
   );
   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
   const [currentPage, setCurrentPage] = useState(1); // Default to 1
   const [rowsPerPage, setRowsPerPage] = useState(8); // Default to 8
   const [totalRecords, setTotalRecords] = useState(0); // To track total records count
   const [projectPostingFilter, setProjectPostingFilter] = useState({
      builderId: 6,
      searchString: "",
      userId: 398,
      records: rowsPerPage,
      pageNumber: currentPage,
   });
   const [builderProjects, setBuilderProjects] = useState(null);
   const [builderProjectStats, setBuilderProjectStats] = useState(null);

   useEffect(() => {
      getBuilderProjects(projectPostingFilter).then((response) => {
         setBuilderProjects(response.data.resourceData);
         console.log(response.data.resourceData);
      });

      getBuilderProjectStats(projectPostingFilter).then((response) => {
         setBuilderProjectStats(response.data.resourceData);
         console.log(response.data.resourceData);
      });
   }, [projectPostingFilter, rowsPerPage, currentPage]);

   const showValue = () => {
      let filteredItems =
         Array.isArray(builderProjects) && builderProjects.length > 0 ? builderProjects : [];

      return filteredItems;
   };

   const handlePageChange = (newPage) => {
      setCurrentPage(Number(newPage));
      getBuilderProjects({
         address: "",
         builderId: "",
         builderName: "",
         builderProjectId: "",
         builderProjectName: "",
         builderProjectPostingStatus: "",
         numberOfTowers: "",
         totalProjectUnits: "",
         pageNumber: newPage,
      });
   };

   const handleRowsPerPageChange = (newRowsPerPage) => {
      setRowsPerPage(newRowsPerPage);
      getBuilderProjects({
         address: "",
         builderId: "",
         builderName: "",
         builderProjectId: "",
         builderProjectName: "",
         builderProjectPostingStatus: "",
         numberOfTowers: "",
         totalProjectUnits: "",
         records: newRowsPerPage,
         pageNumber: 1,
      });
   };

   const ProgressComponent = <TableLoader />;
   const PaginationComponent = ({ onChangePage, onChangeRowsPerPage, ...props }) => (
      <Pagination
         {...props}
         PaginationActionButton={PaginationActionButton}
         currentPage={currentPage}
         rowsPerPage={rowsPerPage}
         rowCount={totalRecords}
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

            setProjectPostingFilter((prev) => ({
               ...prev,
               searchString: "",
               pageNumber: 1,
            }));

            // // Fetch all builder projects when search is cleared
            // getBuilderProjects({
            //    address: "", // Optional, if you have a default or initial address
            //    builderId: 6, // Your desired builder ID
            //    builderName: "Rohit Builder Company", // Your desired builder name
            //    builderProjectId: 11, // Your desired project ID
            //    builderProjectName: "Rohit Builder Project", // Your desired project name
            //    builderProjectPostingStatus: "INACTIVE", // Desired status
            //    numberOfTowers: 3, // Desired number of towers
            //    totalProjectUnits: 1008, // Desired total units
            // });
         }
      };

      return (
         <SearchInput
            onFilter={(e) => {
               const searchValue = e.target.value; // Get the search value
               setFilterText(searchValue); // Update the filter text

               // Update projectPostingFilter's searchString
               setProjectPostingFilter((prev) => ({
                  ...prev,
                  searchString: searchValue, // Update searchString
                  pageNumber: 1, // Reset page number for new search
               }));

               // getBuilderProjects({
               //    // Include your additional fields here
               //    address: "Baner, Pimpri-Chinchwad, Maharashtra", // Example address
               //    builderId: 6, // Your desired builder ID
               //    builderName: "Rohit Builder Company", // Your desired builder name
               //    builderProjectId: 11, // Your desired project ID
               //    builderProjectName: "Rohit Builder Project", // Your desired project name
               //    builderProjectPostingStatus: "INACTIVE", // Desired status
               //    numberOfTowers: 3, // Desired number of towers
               //    totalProjectUnits: 1008, // Desired total units
               // });
            }}
            onClear={handleClear} // Handle clear button click
            filterText={filterText} // Bind the filter text
            placeholder="Search" // Placeholder for search input
         />
      );
   }, [filterText, resetPaginationToggle]);

   const columns = [
      {
         name: "Project Name",
         selector: (row) => row.builderProjectName,
         center: true,
         minWidth: "150px",
         maxWidth: "150px",
      },
      {
         name: "Address",
         selector: (row) => row.address,
         sortable: false,
         center: true,
         minWidth: "120px",
      },

      {
         name: "# of Towers",
         selector: (row) => row.numberOfTowers,
         sortable: false,
         center: true,
         maxWidth: "160px",
      },
      {
         name: "# of units",
         selector: (row) => row.totalProjectUnits,
         sortable: false,
         center: true,
         maxWidth: "160px",
      },

      {
         name: "Status",
         selector: (row) => row.builderProjectPostingStatus,
         sortable: false,
         minWidth: "120px",
         cell: ({ builderProjectPostingStatus }) => (
            <span>{handleStatusElement(builderProjectPostingStatus)}</span>
         ),
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
                           View&nbsp;
                        </Link>
                     )}
                     {" | "}
                     {row.status === "Expired" ? (
                        <span>Update</span>
                     ) : (
                        <Link
                           to={{
                              pathname: "",
                              state: { loginMobile: row.loginMobile },
                           }}
                           className="action-link"
                        >
                           &nbsp;Update
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
         <div className="d-flex  align-items-center mb-4">
            <div className="">
               <Text
                  text={`Total Projects: ${builderProjectStats?.BuilderProjectCount || 0}`}
                  fontSize="16px"
                  fontWeight="bold"
               />
            </div>
            <div className="ml-4">
               <Text
                  text={`Total Property: ${
                     builderProjectStats?.BuilderPropertyByProjectCount || 0
                  }`}
                  fontSize="16px"
                  fontWeight="bold"
               />
            </div>
         </div>

         <div className="tableBox">
            <div className="d-flex flex-md-column flex-xl-row justify-content-xl-end align-items-center tableHeading">
               <div className="locationSelect d-flex justify-content-end align-items-center w-100">
                  {subHeaderComponentMemo}
                  {/* {statusArr.length ? (
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
                  <Form.Group controlId="example" className="w-40 userGrp ml-0"></Form.Group> */}

                  <a href="/builder/Posting-Property" style={{ textDecoration: "none" }}>
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
                           text={"Add New Posting"}
                           fontWeight="bold"
                           style={{ fontSize: "12px", color: "#BE1452" }}
                        />
                     </Button>
                  </a>
               </div>
            </div>

            <div className="ProjectPostingTableWrapper">
               <DataTableComponent
                  data={showValue()}
                  columns={columns}
                  progressPending={builderReducer.isLoading}
                  progressComponent={ProgressComponent}
                  pagination
                  paginationServer
                  paginationTotalRows={totalRecords}
                  paginationPerPage={rowsPerPage}
                  paginationRowsPerPageOptions={[8, 16, 24, 32]}
                  onChangePage={handlePageChange}
                  // paginationServer={true}
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
const mapStateToProps = ({ builderReducer }) => ({
   builderReducer,
});
const actions = {
   getBuilderProjects,
   getBuilderProjectStats,
};
const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(ProjectsPostings);
