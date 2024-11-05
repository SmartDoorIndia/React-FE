/** @format */
// Line 90 has the API integration
import React, { useEffect, memo } from "react";
import { Col, Row, Button, Container, Form, Image } from "react-bootstrap";
import "./BuilderProperties.scss";
import SearchInput from "../../../../shared/Inputs/SearchInput/SearchInput";
import Pagination from "../../../../shared/DataTable/Pagination";
import { compose } from "redux";
import addIcon from "../../../../assets/svg/add.svg";
import { connect, useSelector } from "react-redux";
import { useState } from "react";
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import { getLocalStorage, ToolTip } from "../../../../common/helpers/Utils";
import {
   getBuilderProjectSubPosts,
   getBuilderProjectById,
   getBuilderProjectSubPostsStats,
} from "../../../../common/redux/actions";
import { TableLoader } from "../../../../common/helpers/Loader";
import Text from "../../../../shared/Text/Text";

const BuilderProperties = (props) => {
   const { ProjectPostingDetails } = props;
   const data = useSelector((state) => state.ProjectPostingDetails.data);
   const [filterText, setFilterText] = useState(
      data !== undefined ? ProjectPostingDetails?.data?.searchString : ""
   );
   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
   const [currentPage, setCurrentPage] = useState(
      data !== undefined ? ProjectPostingDetails?.data?.currentPage : 1
   );
   const [builderProjectSubPostStats, setBuilderProjectSubPostStats] = useState({});
   const [rowsPerPage, setRowsPerPage] = useState(7);
   const [builderProjectSubPosts, setBuilderProjectSubPosts] = useState(null);
   const auth = getLocalStorage("authData");
   const StorebuilderProjectId = localStorage.getItem("builderProjectId");
   const [userId, setUserId] = useState(auth?.userid || null); // Initialize userId from auth
   const [builderProjectDetails, setBuilderProjectDetails] = useState(null); // Start with null
   const [builderProjects, setBuilderProjects] = useState([]);
   const [projectSubPostsFilter, setProjectSubPostsFilter] = useState({
      builderProjectId: StorebuilderProjectId, // Set from localStorage
      userId: auth?.userid || null,
      records: rowsPerPage,
      pageNumber: currentPage,
   });

   useEffect(() => {
      const handleGetBuilderProjectById = async () => {
         try {
            const response = await getBuilderProjectById(projectSubPostsFilter);
            setBuilderProjects(response.data.resourceData);
         } catch (error) {
            console.error(error);
         }
      };
      handleGetBuilderProjectById();
   }, [StorebuilderProjectId, userId, projectSubPostsFilter]);
   const fetchImageAsBase64 = async (imageURL) => {
      try {
         const response = await fetch(imageURL);
         const blob = await response.blob();
         return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
         });
      } catch (error) {
         console.error("Error fetching image as base64:", error);
         return null; // Return null if there is an error
      }
   };
   const showValue = () => {
      let filteredItems =
         Array.isArray(builderProjectSubPosts) && builderProjectSubPosts.length > 0
            ? builderProjectSubPosts
            : [];

      return filteredItems;
   };

   const handlePageChange = (newPage) => {
      setCurrentPage(Number(newPage));
      setProjectSubPostsFilter((prev) => ({
         ...prev,
         pageNumber: newPage, // Update the page number
      }));
   };

   const handleRowsPerPageChange = (newRowsPerPage) => {
      setRowsPerPage(newRowsPerPage);
      setCurrentPage(1); // Reset to first page when changing rows per page
      setProjectSubPostsFilter((prev) => ({
         ...prev,
         records: newRowsPerPage,
         pageNumber: 1,
      }));
   };

   const ProgressComponent = <TableLoader />;
   const PaginationComponent = ({ onChangePage, onChangeRowsPerPage, ...props }) => (
      <Pagination
         {...props}
         PaginationActionButton={PaginationActionButton}
         currentPage={currentPage}
         rowsPerPage={rowsPerPage}
         rowCount={builderProjectSubPostStats.builderProjectSubPostCount}
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

            setProjectSubPostsFilter((prev) => ({
               ...prev,
               searchString: "",
               pageNumber: 1,
            }));
         }
      };

      return (
         <SearchInput
            onFilter={(e) => {
               const searchValue = e.target.value; // Get the search value
               setFilterText(searchValue); // Update the filter text

               setProjectSubPostsFilter((prev) => ({
                  ...prev,
                  searchString: searchValue, // Update searchString
                  pageNumber: 1, // Reset page number for new search
               }));
            }}
            onClear={handleClear} // Handle clear button click
            filterText={filterText} // Bind the filter text
            placeholder="Search" // Placeholder for search input
         />
      );
   }, [filterText, resetPaginationToggle]);

   const handleClickview = (row) => {
      const storebuilderProjectSubPostId = row.builderProjectSubPostId; // Access the builderProjectSubPostId from the row
      if (!storebuilderProjectSubPostId) {
         console.error("No project ID found in the row data.");
         return;
      }

      const requestData = {
         builderProjectSubPostId: storebuilderProjectSubPostId,
         builderProjectId: StorebuilderProjectId,
         userId: auth.userid,
      };
      console.log("Request Data:", requestData.userId);

      getBuilderProjectSubPosts(requestData)
         .then((response) => {
            if (response.data && response.data.resourceData) {
               console.log(response.data.resourceData);
               const resourceData = response.data.resourceData;
               console.log("resourceData====>", resourceData);
               // Format possession dates safely
               const formattedPossessionFrom = formatDate(resourceData.possessionFrom);
               const formattedPossessionTo = formatDate(resourceData.possessionTo);

               setBuilderProjectDetails({
                  ...resourceData,
                  possessionFrom: formattedPossessionFrom,
                  possessionTo: formattedPossessionTo,
               });

               const builderProjectSubPostId = requestData.builderProjectSubPostId;
               console.log("builderProjectSubPostId--", builderProjectSubPostId);
               localStorage.setItem("builderProjectSubPostId", builderProjectSubPostId);
               window.location.href = `/builder/Project-details/${builderProjectSubPostId}`;
            } else {
               console.error("Invalid project data received:", response.data);
            }
         })
         .catch((error) => {
            console.error("Error fetching project details:", error);
         });
   };

   const columns = [
      {
         name: "Project Name",
         selector: (row) => row.builderProjectSubPostName,
         center: true,
         sortable: true,
         minWidth: "200px",
         maxWidth: "200px",
      },
      {
         name: "Address",
         selector: (row) => {
            const units = row.builderProjectSubPostPropertyResponseList || [];
            return (
               units
                  .map((unit) => `${unit.numberOfRooms} ${unit.propertyRoomCompositionType}`)
                  .join(", ") || "N/A"
            );
         },
         center: true,
         minWidth: "120px",
      },
      {
         name: "# of Towers / Plotted",
         selector: (row) => row.totalProjectUnits,
         sortable: false,
         center: true,
         maxWidth: "160px",
      },
      {
         name: "# of Units",
         selector: (row) => row.contactPersonName,
         center: true,
         minWidth: "150px",
         maxWidth: "150px",
      },
      {
         name: "Pending Approval",
         selector: (row) => row.contactPersonNumber,
         //  sortable: true,
         center: true,
         minWidth: "145px",
         maxWidth: "150px",
      },
      {
         name: "Status",
         selector: (row) => row.contactPersonNumber,
         //  sortable: true,
         center: true,
         minWidth: "145px",
         maxWidth: "150px",
      },

      {
         name: "Action",
         selector: (row) => row.action,
         sortable: false,
         center: true, // Center the content of the cell
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
                        onClick={() => handleClickview(row)}
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
   const ExpandedRowComponent = ({ data }) => {
      return (
         <div>
            <table className="table">
               <tbody>
                  {data.builderProjectSubPostPropertyResponseList.map((property, index) => (
                     <tr key={index} style={{ borderBottom: "1px solid #DED6D9" }}>
                        <td style={{ width: "17%" }}></td>
                        <td style={{ width: "7%" }}>
                           {property.numberOfRooms}&nbsp;
                           {property.propertyRoomCompositionType}&nbsp;
                        </td>

                        <td style={{ width: "19%" }}>{property.totalProjectUnits}</td>
                        <td style={{ width: "10%" }}></td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      );
   };
   const formatDate = (dateString) => {
      if (!dateString) return "";
      const [month, year] = dateString.split("-");
      const monthName = new Date(0, parseInt(month) - 1).toLocaleString("default", {
         month: "long",
      });
      return `${monthName} ${year}`;
   };
   console.log("builderProjectId", StorebuilderProjectId);

   localStorage.setItem("projectName", builderProjectDetails?.builderProjectName);

   return (
      <>
         <div className="builderProperties">
            <Row className="justify-content-between p-4 ">
               <div>
                  <ul className="list-container">
                     <li className="list-item inactive-item">Properties</li>
                     <li className="list-item active-item">Details</li>
                  </ul>
               </div>
               <div>
                  <Button
                     className="d-flex px-2 ml-3"
                     style={{
                        color: "#949494",
                        backgroundColor: "#FFF",
                        borderColor: "#DED6D9",
                     }}
                  >
                     <Text
                        text={"In-Active"}
                        fontWeight="bold"
                        style={{ fontSize: "12px", color: "#949494" }}
                     />
                  </Button>
               </div>
            </Row>
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
                     <a href="/builder/Project-details" style={{ textDecoration: "none" }}>
                        <Button
                           className="d-flex py-1 ml-3"
                           style={{
                              color: "#BE1452",
                              backgroundColor: "#F8F3F5",
                              borderColor: "#DED6D9",
                           }}
                           // onClick={() => {
                           //    localStorage.removeItem("builderProjectSubPostId");
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
                              {" "}
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
               </div>{" "}
               <div className="ProjectPostingTableWrapper">
                  <DataTableComponent
                     data={showValue()}
                     columns={columns}
                     progressPending={ProjectPostingDetails.isLoading}
                     progressComponent={ProgressComponent}
                     pagination
                     paginationComponent={PaginationComponent}
                     paginationServer
                     paginationRowsPerPageOptions={[7, 14, 21, 28]} // Rows per page options
                     paginationPerPage={7} // Default rows per page
                     perPageOptions={[7, 14, 21, 28]} // Per-page options
                     onChangePage={handlePageChange}
                     expandableRows
                     expandableRowsComponent={ExpandedRowComponent}
                     onChangeRowsPerPage={handleRowsPerPageChange}
                     subHeaderComponent={subHeaderComponentMemo}
                     persistTableHead="true"
                     filterComponent={subHeaderComponentMemo}
                     keyField="id"
                  ></DataTableComponent>
               </div>
            </div>
         </div>
      </>
   );
};
const mapStateToProps = ({ ProjectPostingDetails }) => ({
   ProjectPostingDetails,
});
const actions = {
   getBuilderProjectSubPosts,
   getBuilderProjectById,
};
const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(BuilderProperties);
