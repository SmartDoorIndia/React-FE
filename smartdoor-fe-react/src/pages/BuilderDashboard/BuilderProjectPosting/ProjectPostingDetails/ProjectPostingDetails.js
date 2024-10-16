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
import { getBuilderProjectSubPosts, getBuilderProjectById } from "../../../../common/redux/actions";
import { TableLoader } from "../../../../common/helpers/Loader";
import Text from "../../../../shared/Text/Text";
import { MdOutlineKeyboardDoubleArrowUp, MdOutlineKeyboardDoubleArrowDown } from "react-icons/md"; // Import the icons"; // Import the expanded row component

const ProjectPostingDetails = (props) => {
   const { ProjectPostingDetails } = props;
   const data = useSelector((state) => state.ProjectPostingDetails.data);
   const [filterText, setFilterText] = useState(
      data !== undefined ? ProjectPostingDetails?.data?.searchString : ""
   );
   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
   const [currentPage, setCurrentPage] = useState(1); // Default to 1
   const [rowsPerPage, setRowsPerPage] = useState(8); // Default to 8
   const [totalRecords, setTotalRecords] = useState(0); // To track total records count
   const [expandedRow, setExpandedRow] = useState(null); // State to track expanded row
   const [selectedType, setSelectedType] = useState(""); // Initial state for selectedType
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
      records: 10,
      pageNumber: 1,
   });

   useEffect(() => {
      localStorage.removeItem("builderProjectId");

      // Set the new builderProjectId in local storage
      localStorage.setItem("builderProjectId", builderProjectId);
      const StorebuilderProjectId = localStorage.getItem("builderProjectId");
      //    getBuilderProjectSubPosts(projectSubPostsFilter).then((response) => {
      //       setBuilderProjectSubPosts(response.data.resourceData);
      //       console.log("getBuilderProjectSubPosts", response.data.resourceData);
      //    });

      //    getBuilderProjectById({
      //       builderProjectId: StorebuilderProjectId, // Use the state value for builderProjectId
      //       userId: userId,
      //    }).then((response) => {
      //       setBuilderProjectDetails(response.data.resourceData);
      //       console.log("Builder Project Details:", response.data.resourceData);
      //    });
      // }, [builderProjectId, userId, projectSubPostsFilter]);
      const handleGetBuilderProjectSubPosts = async () => {
         try {
            const response = await getBuilderProjectSubPosts(projectSubPostsFilter);

            // Check if the response contains the resource data
            if (response?.data?.resourceData) {
               const resourceData = response.data.resourceData;

               // Map through the sub-posts and ensure selectedPropertyType is set
               const updatedSubPosts = resourceData.map((subPost) => ({
                  ...subPost,
                  builderProjectSubPostProperties: subPost.builderProjectSubPostProperties
                     ? subPost.builderProjectSubPostProperties.map((property) => ({
                          ...property,
                          selectedPropertyType: property.selectedPropertyType || "", // Ensure selectedPropertyType is returned or defaulted to ""
                       }))
                     : [], // If builderProjectSubPostProperties is undefined, default to an empty array
               }));

               console.log("Updated SubPosts:", updatedSubPosts);

               // Set the updated posts in the state
               setBuilderProjectSubPosts(updatedSubPosts);
               return updatedSubPosts;
            } else {
               console.log("No resource data found in the response.");
               return [];
            }
         } catch (error) {
            console.error("Error fetching builder project sub-posts:", error);
         }
      };

      const handleGetBuilderProjectById = async () => {
         try {
            localStorage.removeItem("builderProjectId");

            // Set the new ID
            const newBuilderProjectId = StorebuilderProjectId; // Replace with the actual new ID
            localStorage.setItem("builderProjectId", newBuilderProjectId);

            const response = await getBuilderProjectById({
               builderProjectId: newBuilderProjectId, // Use the state value for builderProjectId
               userId: userId,
            });
            setBuilderProjectDetails(response.data.resourceData);
            console.log("Builder Project Details:", response.data.resourceData);
         } catch (error) {
            console.error(error);
         }
      };

      handleGetBuilderProjectSubPosts();
      handleGetBuilderProjectById();
   }, [builderProjectId, userId, projectSubPostsFilter]);
   const handleRowExpand = (rowId) => {
      setExpandedRow(expandedRow === rowId ? null : rowId); // Toggle expanded row
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
      getBuilderProjectSubPosts({
         builderProjectSubPostId: "",
         builderProjectSubPostName: "",
         builderProjectSubPostPropertyResponseList: [
            {
               builderProjectSubPostId: null,
               numberOfRooms: null,
               propertyId: null,
               propertyRoomCompositionType: "",
               propertySubType: "",
               totalProjectUnits: null,
               unitType: "",
               selectedPropertyType: "",
            },
         ],
      });
   };

   const handleRowsPerPageChange = (newRowsPerPage) => {
      setRowsPerPage(newRowsPerPage);
      getBuilderProjectSubPosts({
         builderProjectSubPostId: "",
         builderProjectSubPostName: "",
         builderProjectSubPostPropertyResponseList: [
            {
               builderProjectSubPostId: null,
               numberOfRooms: null,
               propertyId: null,
               propertyRoomCompositionType: "",
               propertySubType: "",
               totalProjectUnits: null,
               unitType: "",
               selectedPropertyType: "",
            },
         ],
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
      console.log("storebuilderProjectSubPostId", storebuilderProjectSubPostId);

      if (!storebuilderProjectSubPostId) {
         console.error("No project ID found in the row data.");
         return;
      }

      const requestData = {
         builderProjectSubPostId: storebuilderProjectSubPostId,
         builderProjectId: StorebuilderProjectId,
         userId: auth.userid,
      };
      console.log("Request Data:", requestData);

      getBuilderProjectSubPosts(requestData)
         .then((response) => {
            if (response.data && response.data.resourceData) {
               console.log(response.data.resourceData);
               const resourceData = response.data.resourceData;

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
      // {
      //    name: "Expand",
      //    cell: (row) => (
      //       <button
      //          className="expand-button"
      //          onClick={() => handleRowExpand(row.id)}
      //          style={{ background: "none", border: "none", cursor: "pointer" }}
      //       >
      //          {expandedRow === row.id ? (
      //             <MdOutlineKeyboardDoubleArrowUp />
      //          ) : (
      //             <MdOutlineKeyboardDoubleArrowDown />
      //          )}
      //       </button>
      //    ),
      //    center: true,
      //    minWidth: "50px",
      //    maxWidth: "50px",
      // },
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
            // Check if the array exists and loop through all units
            const units = row.builderProjectSubPostPropertyResponseList || [];

            // Map through the array and format each unit's details
            return (
               units
                  .map((unit) => `${unit.numberOfRooms} ${unit.propertyRoomCompositionType}`)
                  .join(", ") || "N/A"
            ); // Join the details with a comma separator, fallback to 'N/A' if empty
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
                        <td></td>
                        <td style={{ width: "5%" }}></td>
                        <td style={{ width: "17%" }}>
                           {property.numberOfRooms}&nbsp;
                           {property.propertyRoomCompositionType}&nbsp; {property.propertySubType}
                        </td>
                        <td style={{ width: "10%" }}>{property.totalProjectUnits}</td>
                        <td>{property.status}</td>
                        <td>{property.action}</td>
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
   console.log("builderProjectId", builderProjectId);

   const handleClick = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const builderProjectId =
         urlParams.get("builderProjectId") || localStorage.getItem("builderProjectId");
      if (builderProjectId) {
         getBuilderProjectById({
            builderProjectId: builderProjectId,
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
                  paginationServer
                  paginationTotalRows={totalRecords}
                  paginationPerPage={rowsPerPage}
                  paginationRowsPerPageOptions={[8, 16, 24, 32]}
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
