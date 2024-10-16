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
import { Link } from "react-router-dom/cjs/react-router-dom";
import "./ProjectsPostings.scss";
import { TableLoader } from "../../../../common/helpers/Loader";
import Text from "../../../../shared/Text/Text";

const ProjectsPostings = (props) => {
   const { ProjectsPostings } = props;
   const data = useSelector((state) => state.builderReducer?.data); // Safely access builderReducer data
   console.log("data", data);
   const [filterText, setFilterText] = useState(
      ProjectsPostings?.data?.searchString || "" // Use empty string if searchString is undefined
   );
   // Other states
   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
   const [currentPage, setCurrentPage] = useState(
      data !== undefined ? ProjectsPostings?.data?.currentPage : 1
   ); // Default to 1
   const [rowsPerPage, setRowsPerPage] = useState(
      data !== undefined ? ProjectsPostings?.data?.rowsPerPage : 8
   ); // Default to 8
   const [totalRecords, setTotalRecords] = useState(0); // Track total records count
   const auth = getLocalStorage("authData");

   const [projectPostingFilter, setProjectPostingFilter] = useState({
      builderId: auth.builderId,
      searchString: "",
      userId: auth.userid,
      records: rowsPerPage,
      pageNumber: currentPage,
   });
   const [builderProjects, setBuilderProjects] = useState(null);
   const [builderProjectStats, setBuilderProjectStats] = useState(null);

   //    getBuilderProjects(updatedFilter).then((response) => {
   //       setBuilderProjects(response.data.resourceData);
   //       const resourceData = response.data.resourceData;
   //       console.log(response.data.resourceData);
   //       resourceData.forEach((project) => {
   //          localStorage.setItem("builderProjectId", project.builderProjectId);
   //       });
   //    });

   //    getBuilderProjectStats(updatedFilter).then((response) => {
   //       setBuilderProjectStats(response.data.resourceData);
   //       console.log(response.data.resourceData);
   //    });
   // }, [projectPostingFilter, rowsPerPage, currentPage]); // Runs the effect when these dependencies change

   useEffect(() => {
      const updatedFilter = {
         ...projectPostingFilter,
         records: rowsPerPage,
         pageNumber: currentPage,
      };

      const handleGetBuilderProjects = async () => {
         // try {
         //    const response = await getBuilderProjects(updatedFilter);
         //    console.log("API Response:", response); // Log the entire response
         //    const resourceData = response && response.data && response.data.resourceData;

         //    // Check if resourceData is defined and is an array
         //    if (resourceData && Array.isArray(resourceData)) {
         //       setBuilderProjects(resourceData);
         //       resourceData.forEach((project) => {
         //          localStorage.setItem("builderProjectId", project.builderProjectId);
         //       });
         //    } else {
         //       console.error("resourceData is not an array or is undefined:", resourceData);
         //       setBuilderProjects([]); // Set to an empty array or handle as needed
         //    }
         // } catch (error) {
         //    console.error("Error fetching builder projects:", error);
         // }
         try {
            const response = await getBuilderProjects(updatedFilter);
            setBuilderProjects(response.data.resourceData);
            console.log("getBuilderProjectSubPosts", response.data.resourceData);
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
            console.log(response.data.resourceData);
         } catch (error) {
            console.error(error);
         }
      };

      handleGetBuilderProjects();
      handleGetBuilderProjectStats();
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
         searchString: filterText,
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
         pageNumber: currentPage,
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
   // Function to handle the click event on the "View" button
   const handleClickViewAndRedirect = async (row) => {
      const builderProjectId = row.builderProjectId; // Access the builderProjectId from the row
      console.log("builderProjectId", builderProjectId);

      if (!builderProjectId) {
         console.error("No builderProjectId found in the row data.");
         return;
      }

      localStorage.setItem("builderProjectId", builderProjectId); // Set the builderProjectId in local storage
      window.location.href = `/builder/Project-Posting-Details/${builderProjectId}`; // Navigate to the next page
   };

   const columns = [
      {
         name: "",
         // selector: (row) => row.builderProjectName,
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
                        zIndex: 2, // Ensures button stays on top
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
                  paginationTotalRows={totalRecords}
                  paginationPerPage={rowsPerPage}
                  paginationRowsPerPageOptions={[8, 16, 24, 32]}
                  onChangePage={handlePageChange}
                  paginationServer={true}
                  onChangeRowsPerPage={handleRowsPerPageChange}
                  subHeaderComponent={subHeaderComponentMemo}
                  persistTableHead={true} // Note the change from "string" to boolean
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
