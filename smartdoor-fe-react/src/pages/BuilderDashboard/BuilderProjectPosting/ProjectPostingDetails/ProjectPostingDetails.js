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
import { getBuilderProjectSubPosts, getBuilderProjectById } from "../../../../common/redux/actions";
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

   const [builderProjectSubPosts, setBuilderProjectSubPosts] = useState(null);
   const [projectSubPostsFilter, setprojectSubPostsFilter] = useState({
      builderProjectId: 11,
      searchString: "4",
      userId: 398,
      records: 10,
      pageNumber: 1,
   });

   const [builderProjectId, setBuilderProjectId] = useState(13);
   const [userId, setUserId] = useState(398);
   const [builderProjectDetails, setBuilderProjectDetails] = useState(null);

   useEffect(() => {
      getBuilderProjectSubPosts(projectSubPostsFilter).then((response) => {
         setBuilderProjectSubPosts(response.data.resourceData);
         console.log(response.data.resourceData);
      });

      getBuilderProjectById({ builderProjectId: builderProjectId, userId: userId }).then(
         (response) => {
            setBuilderProjectDetails(response.data.resourceData);
            console.log(response.data.resourceData);
         }
      );
   }, [projectSubPostsFilter]);
   const handleRowExpand = (rowId) => {
      setExpandedRow(expandedRow === rowId ? null : rowId); // Toggle expanded row
   };

   //    useEffect(() => {
   //       console.log(data);
   //       dispatch({ type: Actions.BROKERS_PROPERTY_SUCCESS, data: [] });
   //       if (data === undefined) {
   //          getBrokerListing({
   //             userId: userData.userid,
   //             currentLat: null,
   //             currentLong: null,
   //             pageNo: currentPage,
   //             records: rowsPerPage,
   //             adminLogin: true,
   //             searchString: "",
   //          });
   //       }
   //    }, [getBrokerListing]);

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
               builderProjectSubPostId: 35,
               numberOfRooms: 2,
               propertyId: 3367,
               propertyRoomCompositionType: "BHK",
               propertySubType: "Apartments",
               totalProjectUnits: 107,
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
               builderProjectSubPostId: 35,
               numberOfRooms: 2,
               propertyId: 3367,
               propertyRoomCompositionType: "BHK",
               propertySubType: "Apartments",
               totalProjectUnits: 107,
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

            setprojectSubPostsFilter((prev) => ({
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

               setprojectSubPostsFilter((prev) => ({
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

   const columns = [
      {
         name: "Towers / Plotted",
         selector: (row) => row.builderProjectSubPostName,
         center: true,
         minWidth: "200px",
         maxWidth: "200px",
      },
      {
         name: "Unit Types ",
         selector: (row) =>
            row.builderProjectSubPostPropertyResponseList
               .map(
                  (subPost) => `${subPost.propertyRoomCompositionType} ${subPost.propertySubType}`
               )
               .join(", "),
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

      //   {
      //      name: "Action",
      //      selector: (row) => row.action,
      //      sortable: false,
      //      center: false,
      //      minWidth: "150px",
      //      maxWidth: "150px",
      //      cell: (row) => (
      //         <div className="action">
      //            <ToolTip name="View">
      //               <span>
      //                  {row.status === "Expired" ? (
      //                     <span>View </span>
      //                  ) : (
      //                     <Link
      //                        to={{
      //                           pathname: `/builder/Project-Posting-Details`,
      //                           state: { loginMobile: row.loginMobile },
      //                        }}
      //                        className="action-link"
      //                     >
      //                        Download Leads
      //                     </Link>
      //                  )}
      //               </span>
      //            </ToolTip>
      //         </div>
      //      ),
      //   },
   ];

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
                           {builderProjectDetails?.builderProjectGeneralAmenities.join(", ")}
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
                              {" "}
                              {builderProjectDetails?.builderProjectImages.length} Image(s)
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
                              {builderProjectDetails?.builderProjectVideos.length} Video(s)
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
                  <a
                     href="/builder/Posting-Property"
                     style={{
                        color: "#000",
                        fontWeight: "bold",
                        textDecoration: "none",
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
                           <img src={pencilIcon} style={{ marginRight: "5px" }} alt="Edit" />
                        </Button>
                     </div>
                  </a>
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
                  progressPending={ProjectPostingDetails.isLoading}
                  progressComponent={ProgressComponent}
                  pagination
                  paginationServer
                  paginationTotalRows={totalRecords}
                  paginationPerPage={rowsPerPage}
                  paginationRowsPerPageOptions={[8, 16, 24, 32]}
                  onChangePage={handlePageChange}
                  expandableRows // Enable expandable rows
                  expandableRowComponent={({ data }) => (
                     <div style={{ padding: "10px" }}>
                        <p>Additional Details:</p>
                        <p>
                           <strong>Details:</strong> {data.additionalDetails}
                        </p>
                        {/* You can add more fields here from your data */}
                     </div>
                  )}
                  onRowExpand={handleRowExpand} // Handle row expand
                  onRowExpanded={expandedRow}
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
