/** @format */
// Line 84 has the API integration
import React, { useState, useEffect, memo } from "react";
import SearchInput from "../../../../shared/Inputs/SearchInput/SearchInput";
import Pagination from "../../../../shared/DataTable/Pagination";
import { connect, useSelector } from "react-redux";
import { compose } from "redux";
import { Button, Image } from "react-bootstrap";
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import { handleStatusElement, getLocalStorage } from "../../../../common/helpers/Utils";
import { ToolTip } from "../../../../common/helpers/Utils";
import { getBuilderProjects, getBuilderProjectStats } from "../../../../common/redux/actions";
import addIcon from "../../../../assets/svg/add.svg";
import "./ProjectsPostings.scss";
import { TableLoader } from "../../../../common/helpers/Loader";
import Text from "../../../../shared/Text/Text";

const ProjectsPostings = (props) => {
   const { getBuilderProjects, ProjectsPostings } = props; // Destructure actions from props
   const data = useSelector((state) => state.builderReducer?.data || {});
   const [filterText, setFilterText] = useState(ProjectsPostings?.data?.searchString || "");
   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
   const [currentPage, setCurrentPage] = useState(
      data !== undefined ? ProjectsPostings?.data?.currentPage : 1
   );
   const [rowsPerPage, setRowsPerPage] = useState(
      data !== undefined ? ProjectsPostings?.data?.rowsPerPage : 8
   ); // Default to 8
   const auth = getLocalStorage("authData");
   const [projectPostingFilter, setProjectPostingFilter] = useState({
      builderId: auth.builderId,
      searchString: "",
      userId: auth.userid,
      records: rowsPerPage,
      pageNumber: currentPage,
   });
   const [builderProjects, setBuilderProjects] = useState([]);
   const [builderProjectStats, setBuilderProjectStats] = useState(null);

   useEffect(() => {
      const updatedFilter = {
         ...projectPostingFilter,
         records: rowsPerPage,
         pageNumber: currentPage,
      };

      const handleGetBuilderProjects = async () => {
         try {
            const response = await getBuilderProjects(updatedFilter);
            setBuilderProjects(response.data.resourceData);
         } catch (error) {
            console.error(error);
         }
      };
      const handleGetBuilderProjectStats = async () => {
         try {
            const statsFilter = {
               ...projectPostingFilter,
               records: rowsPerPage,
               pageNumber: currentPage,
            };
            const response = await getBuilderProjectStats(statsFilter);
            setBuilderProjectStats(response.data.resourceData);
            console.log("Project Stats:", response.data.resourceData);
         } catch (error) {
            console.error("Error fetching builder project stats:", error);
         }
      };

      handleGetBuilderProjects();
      handleGetBuilderProjectStats();
   }, [projectPostingFilter, rowsPerPage, currentPage]);
   const showValue = () => {
      return Array.isArray(builderProjects) && builderProjects.length > 0 ? builderProjects : [];
   };

   const handlePageChange = (newPage) => {
      setCurrentPage(Number(newPage));
      setProjectPostingFilter((prev) => ({
         ...prev,
         pageNumber: newPage,
      }));
   };

   const handleRowsPerPageChange = (newRowsPerPage) => {
      setRowsPerPage(newRowsPerPage);
      setCurrentPage(1); // Reset to first page when changing rows per page
      setProjectPostingFilter((prev) => ({
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
            rowCount={builderProjectStats?.BuilderProjectCount || 0} // Use totalRecords for pagination
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

            setProjectPostingFilter((prev) => ({
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
               setProjectPostingFilter((prev) => ({
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
      const builderProjectId = row.builderProjectId;
      console.log("builderProjectId", builderProjectId);

      if (!builderProjectId) {
         console.error("No builderProjectId found in the row data.");
         return;
      }

      localStorage.setItem("builderProjectId", builderProjectId);
      window.location.href = `/builder/Project-Posting-Details/${builderProjectId}`;
   };

   const columns = [
      {
         name: "",
         center: true,
         minWidth: "150px",
         maxWidth: "160px",
      },
      {
         name: "Project Name",
         selector: (row) => row.builderProjectName,
         center: true,
         minWidth: "150px",
         maxWidth: "160px",
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
                  {row.status === "Expired" ? (
                     <span>View</span>
                  ) : (
                     <button
                        style={{
                           color: "#BE1452",
                           fontSize: "14px",
                           fontWeight: 700,
                           lineHeight: "18px",
                           textAlign: "left",
                        }}
                        onClick={() => handleClickViewAndRedirect(row)}
                        className="action-link btn"
                     >
                        View
                     </button>
                  )}
               </ToolTip>
            </div>
         ),
      },
   ];

   return (
      <>
         <div className="d-flex align-items-center mb-4">
            <div>
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

                  <Button
                     className="d-flex py-1 ml-3"
                     style={{
                        color: "#BE1452",
                        backgroundColor: "#F8F3F5",
                        borderColor: "#DED6D9",
                        zIndex: 2,
                     }}
                     onClick={() => {
                        localStorage.removeItem("builderProjectId");
                        window.location.href = "/builder/Posting-Property";
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

            <div className="ProjectPostingTableWrapper" style={{ zIndex: 1 }}>
               <DataTableComponent
                  data={showValue()}
                  columns={columns}
                  progressPending={ProjectsPostings.isLoading}
                  progressComponent={ProgressComponent}
                  pagination
                  paginationComponent={PaginationComponent}
                  paginationServer
                  paginationRowsPerPageOptions={[7, 14, 21, 28]} // Rows per page options
                  paginationPerPage={7} // Default rows per page
                  perPageOptions={[7, 14, 21, 28]} // Per-page options
                  onChangePage={handlePageChange}
                  subHeaderComponent={subHeaderComponentMemo}
                  persistTableHead={true}
                  filterComponent={subHeaderComponentMemo}
                  keyField="id"
                  className="data-table" // Add a custom class if needed for further styling
               />
            </div>
         </div>
      </>
   );
};
const mapStateToProps = ({ ProjectsPostings }) => ({ ProjectsPostings });
const actions = { getBuilderProjects, getBuilderProjectStats };
const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(ProjectsPostings);
