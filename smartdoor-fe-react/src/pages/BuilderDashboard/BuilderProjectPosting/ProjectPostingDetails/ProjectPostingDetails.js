/** @format */
// Line 90 has the API integration
import React, { useEffect, memo } from "react";
import { Col, Row, Button, Container, Form, Image } from "react-bootstrap";
import "./ProjectPostingDetails.scss";
import pencilIcon from "../../../../assets/svg/edit-01.svg";
import SearchInput from "../../../../shared/Inputs/SearchInput/SearchInput";
import Pagination from "../../../../shared/DataTable/Pagination";
import { compose } from "redux";
import { connect, useSelector } from "react-redux";
import { useState } from "react";
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import addIcon from "../../../../assets/svg/add.svg";
import { getLocalStorage, ToolTip } from "../../../../common/helpers/Utils";
import {
   getBuilderProjectSubPosts,
   getBuilderProjectById,
   getBuilderProjectSubPostsStats,
} from "../../../../common/redux/actions";
import { TableLoader } from "../../../../common/helpers/Loader";
import Text from "../../../../shared/Text/Text";

const ProjectPostingDetails = (props) => {
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
   const [totalRecords, setTotalRecords] = useState(0); // To track total records count
   const recordSize = ProjectPostingDetails?.data?.records || 0;
   const [builderProjectSubPosts, setBuilderProjectSubPosts] = useState(null);
   const auth = getLocalStorage("authData");
   const StorebuilderProjectId = localStorage.getItem("builderProjectId");
   const storebuilderProjectSubPostId = localStorage.getItem("builderProjectSubPostId");
   const [builderProjectId, setBuilderProjectId] = useState(StorebuilderProjectId);
   const [userId, setUserId] = useState(auth?.userid || null); // Initialize userId from auth
   const [builderProjectDetails, setBuilderProjectDetails] = useState(null); // Start with null
   const [projectSubPostsFilter, setProjectSubPostsFilter] = useState({
      builderProjectId: StorebuilderProjectId, // Set from localStorage
      searchString: "",
      userId: auth?.userid || null,
      records: rowsPerPage,
      pageNumber: currentPage,
   });

   useEffect(() => {
      localStorage.removeItem("builderProjectId");
      localStorage.setItem("builderProjectId", builderProjectId);
      const StorebuilderProjectId = localStorage.getItem("builderProjectId");
      const handleGetBuilderProjectSubPosts = async () => {
         try {
            const response = await getBuilderProjectSubPosts(projectSubPostsFilter);
            if (response?.data?.resourceData) {
               const resourceData = response.data.resourceData;
               setBuilderProjectSubPosts(resourceData);
               setTotalRecords(response.data.totalRecords); // Update total records from the response
            } else {
               console.log("No resource data found in the response.");
               return [];
            }
         } catch (error) {
            console.error("Error fetching builder project sub-posts:", error);
         }
      };

      const handleGetBuilderProjectSubPostsStats = async () => {
         try {
            const response = await getBuilderProjectSubPostsStats(projectSubPostsFilter);
            if (response?.data?.resourceData) {
               const resourceData = response.data.resourceData;
               setBuilderProjectSubPostStats(resourceData);
               // BuilderProjectSubPostStats.builderProjectSubPostCount
               // setBuilderProjectSubPosts(resourceData);
               // setTotalRecords(response.data.totalRecords); // Update total records from the response
            } else {
               console.log("No resource data found in the response.");
               return [];
            }
         } catch (error) {
            console.error("Error fetching builder project sub-posts:", error);
         }
      };

      const handleGetBuilderProjectById = async () => {
         localStorage.removeItem("builderProjectId");
         const newBuilderProjectId = StorebuilderProjectId; // Replace with the actual new ID
         localStorage.setItem("builderProjectId", newBuilderProjectId);

         try {
            const response = await getBuilderProjectById({
               builderProjectId: newBuilderProjectId, // Use the state value for builderProjectId
               userId: userId,
            });

            const builderProjectDetails = response.data.resourceData;
            if (!builderProjectDetails) {
               console.error("No builder project details found in the response.");
               return;
            }

            const builderProjectImages = Array.isArray(builderProjectDetails.builderProjectImages)
               ? builderProjectDetails.builderProjectImages
               : [];

            const imagesWithBase64 = await Promise.all(
               builderProjectImages.map(async (img) => {
                  if (img.docURL) {
                     const base64Image = await fetchImageAsBase64(img.docURL);
                     return { ...img, builderProjectImageAsBase64: base64Image };
                  } else {
                     return img;
                  }
               })
            );

            setBuilderProjectDetails({
               ...builderProjectDetails,
               builderProjectImages: imagesWithBase64, // Set images with base64 data
            });
            console.log("Builder Project Details:", builderProjectDetails);
         } catch (error) {
            console.error("Error fetching builder project:", error);
         }
         return () => {
            localStorage.removeItem("builderProjectId");
         };
      };

      handleGetBuilderProjectSubPosts();
      handleGetBuilderProjectSubPostsStats();
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
         name: "Towers / Plotted",
         selector: (row) => row.builderProjectSubPostName,
         center: true,
         sortable: true,
         minWidth: "200px",
         maxWidth: "200px",
      },
      {
         name: "Unit Types",
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
         name: "Total Units",
         selector: (row) => row.totalProjectUnits,
         sortable: false,
         center: true,
         maxWidth: "160px",
      },
      {
         name: "Contact Person",
         selector: (row) => row.contactPersonName,
         center: true,
         minWidth: "150px",
         maxWidth: "150px",
      },
      {
         name: "Mobile",
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

   const handleClick = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const storebuilderProjectId =
         urlParams.get("builderProjectId") || localStorage.getItem("builderProjectId");
      if (builderProjectId) {
         getBuilderProjectById({
            builderProjectId: storebuilderProjectId,
            userId: auth.userid,
         })
            .then((response) => {
               if (response.data && response.data.resourceData) {
                  const resourceData = response.data.resourceData;
                  const formattedPossessionFrom = formatDate(resourceData.possessionFrom);
                  const formattedPossessionTo = formatDate(resourceData.possessionTo);
                  setBuilderProjectDetails({
                     ...resourceData,
                     possessionFrom: formattedPossessionFrom,
                     possessionTo: formattedPossessionTo,
                  });
                  console.log(response.data.resourceData); // Log the project details for debugging
                  window.location.href = `/builder/Posting-Property/${builderProjectId}`;
               } else {
                  console.error("Invalid project data received:", response.data);
               }
            })
            .catch((error) => {
               window.location.href = `/builder/Posting-Property/`; // Navigate to the page with a blank ID field
            });
      } else {
         console.error("No project ID found in local storage."); // Log if no project ID is found
      }
   };
   localStorage.setItem("projectName", builderProjectDetails?.builderProjectName);

   return (
      <>
         <Container
            className="main-details-section bg-white"
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
                        <p className="mb-1">
                           Location: {builderProjectDetails?.locality},{" "}
                           {builderProjectDetails?.city}
                        </p>
                     </Col>
                     <Col xs={4}>
                        <p className="mb-1">
                           Land Area: {builderProjectDetails?.landArea}{" "}
                           {builderProjectDetails?.landAreaMeasurementUnitEnteredByUser}
                        </p>
                     </Col>
                     <Col xs={4}>
                        <p className="mb-1">
                           Possession from: {builderProjectDetails?.possessionFrom} -{" "}
                           {builderProjectDetails?.possessionTo}
                        </p>
                     </Col>
                  </Row>
                  <Row className="mb-2">
                     <Col xs={4}>
                        <p className="mb-1">
                           General Amenities:{" "}
                           {builderProjectDetails?.builderProjectGeneralAmenities
                              ? Array.isArray(builderProjectDetails.builderProjectGeneralAmenities)
                                 ? builderProjectDetails.builderProjectGeneralAmenities.join(", ")
                                 : "Not an array"
                              : builderProjectDetails
                              ? "No amenities available"
                              : "Loading..."}
                        </p>
                     </Col>
                     <Col xs={4}>
                        <p className="mb-1">
                           Total Area to Develop: {builderProjectDetails?.areaToDevelop}{" "}
                           {builderProjectDetails?.areaToDevelopMeasurementUnitEnteredByUser}
                        </p>
                     </Col>
                  </Row>
                  <Row className="mb-2">
                     <Col xs={4}>
                        <p className="mb-1">
                           Total Towers Planned: {builderProjectDetails?.totalTowersPlanned}
                        </p>
                     </Col>
                     <Col xs={4}>
                        <p className="mb-1">Open Area: {builderProjectDetails?.openAreaPercent}%</p>
                     </Col>
                  </Row>
                  <Row className="mb-2">
                     <Col xs={12}>
                        <p className="mb-1">
                           Project Description: {builderProjectDetails?.projectDescription}
                        </p>
                     </Col>
                  </Row>
                  <Row className="mb-2">
                     <Col xs={4}>
                        <p>
                           Project Images:{" "}
                           <span
                              style={{
                                 color: "#000",
                                 fontWeight: "bold",
                                 textDecoration: "none",
                              }}
                           >
                              {builderProjectDetails?.builderProjectImages
                                 ? Array.isArray(builderProjectDetails.builderProjectImages)
                                    ? builderProjectDetails.builderProjectImages.length +
                                      " Image(s)"
                                    : "Not an array"
                                 : builderProjectDetails
                                 ? "No images available"
                                 : "Loading..."}
                           </span>
                        </p>
                     </Col>
                     <Col xs={4}>
                        <p>
                           Plan Layout:{" "}
                           <span
                              style={{
                                 color: "#000",
                                 fontWeight: "bold",
                                 textDecoration: "none",
                              }}
                           >
                              {builderProjectDetails?.builderProjectVideos?.length > 0
                                 ? builderProjectDetails.builderProjectVideos.length + " Video(s)"
                                 : builderProjectDetails
                                 ? "No videos available"
                                 : "Loading..."}
                           </span>
                        </p>
                     </Col>
                     <Col xs={4}>
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
                        onClick={handleClick}
                        variant="light"
                        className="mb-3"
                        style={{
                           color: "#BE1452",
                           backgroundColor: "#F8F3F5",
                           borderRadius: "20px",
                        }}
                     >
                        <img src={pencilIcon} style={{ marginRight: "5px" }} alt="Edit" />
                     </Button>
                  </div>
               </Col>
            </Row>
         </Container>

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
                        onClick={() => {
                           localStorage.removeItem("builderProjectSubPostId");
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
                  </a>
               </div>
            </div>

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

export default compose(withConnect, memo)(ProjectPostingDetails);
