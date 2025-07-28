/** @format */
// Line 90 has the API integration
import React, { useEffect, memo } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import "./BuilderProjectList.scss";
import SearchInput from "../../../../../shared/Inputs/SearchInput/SearchInput";
import Pagination from "../../../../../shared/DataTable/Pagination";
import { compose } from "redux";
import addIcon from "../../../../../assets/svg/add.svg";
import { connect } from "react-redux";
import { useState } from "react";
import DataTableComponent from "../../../../../shared/DataTable/DataTable";
import {
   getLocalStorage,
   handleStatusElement,
   ToolTip,
} from "../../../../../common/helpers/Utils";
import {
   fetchProjectIdList,
   fetchBuilderProjectList,
   fetchBuilderProjectById,
   getBuilderById,
} from "../../../../../common/redux/actions";
import { TableLoader } from "../../../../../common/helpers/Loader";
import Text from "../../../../../shared/Text/Text";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Tooltip } from "@mui/material";
import doubleDown from "../../../../../assets/images/double-down.png";
import doubleUp from "../../../../../assets/images/double-up.png";
import Buttons from "../../../../../shared/Buttons/Buttons";

const BuilderProjectList = (props) => {
   const { fetchBuilderProjectList } = props;
   const [filterText, setFilterText] = useState("");
   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [rowsPerPage, setRowsPerPage] = useState(7);
   const [expandedProjectId, setExpandedProjectId] = useState(null);
   const [builderProjectDetails, setBuilderProjectDetails] = useState({});
   const [builderProjectList, setBuilderProjectList] = useState([]);
   const [loading, setLoading] = useState(false);
   const [expandLoading, setExpandLoading] = useState(false);
   const history = useHistory();
   const builderData = getLocalStorage("builderData");
   const [builderStatus, setBuilderStatus] = useState(props?.builderDetails?.status || builderData?.status || null);
   const [guideFlag, setGuideFlag] = useState(false);

   useEffect(async () => {
      console.log(builderData);
      setLoading(true);
      if(props?.builderDetails !== null && props?.builderDetails !== undefined) {
         getBuilderById({ builderId: props.builderId, userId: props?.userId }).then((response) => {
            console.log(response)
            setBuilderStatus(response?.data?.resourceData?.status);
         });
      }
      const currentUrl = window.location.href;
      if((builderData === null || builderData === undefined) && currentUrl?.endsWith("/admin/builder-projects")) {
         setGuideFlag(true);
      }
      // setGuideFlag(true);
      const response = await fetchProjectIdList({
         builderId: props?.builderId || builderData?.builderId,
      });
      setLoading(false);
      if (response.status === 200) {
         if (response?.data?.resourceData?.length > 0) {
            setBuilderProjectList(response?.data?.resourceData);
         }
      }
   }, [fetchProjectIdList]);

   const handlePageChange = (newPage) => {
      setCurrentPage(Number(newPage));
   };

   const handleRowsPerPageChange = (newRowsPerPage) => {
      setRowsPerPage(newRowsPerPage);
      setCurrentPage(1); // Reset to first page when changing rows per page
   };

   const ProgressComponent = <TableLoader />;
   const PaginationComponent = ({ onChangePage, onChangeRowsPerPage, ...props }) => (
      <Pagination
         {...props}
         PaginationActionButton={PaginationActionButton}
         currentPage={currentPage}
         rowsPerPage={rowsPerPage}
         rowCount={builderProjectList?.length}
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
               const searchValue = e.target.value; // Get the search value
               setFilterText(searchValue); // Update the filter text
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
         selector: (row) => row?.projectName || "N/A",
         center: true,
         sortable: true,
         minWidth: "200px",
         maxWidth: "200px",
      },
      {
         name: "Address",
         selector: (row) => row?.projectAddress || "N/A",
         center: true,
         wrap: true,
         minWidth: "120px",
      },
      // {
      //    name: "# of Towers / Plotted",
      //    selector: (row) => 'N/A',
      //    sortable: false,
      //    center: true,
      //    maxWidth: "160px",
      // },
      // {
      //    name: "# of Units",
      //    selector: (row) => 'N/A',
      //    center: true,
      //    minWidth: "150px",
      //    maxWidth: "150px",
      // },
      // {
      //    name: "Pending Approval",
      //    selector: (row) => row.contactPersonNumber,
      //    //  sortable: true,
      //    center: true,
      //    minWidth: "145px",
      //    maxWidth: "150px",
      // },
      {
         name: "Status",
         selector: (row) => row?.status || 'N/A',
         //  sortable: true,
         center: true,
         minWidth: "145px",
         maxWidth: "150px",
         cell: ({ status }) => handleStatusElement(status),
      },

      {
         name: "Action",
         selector: (row) => row.action,
         sortable: false,
         center: true, // Center the content of the cell
         minWidth: "150px",
         maxWidth: "150px",
         cell: (row, projectId) => (
            <div className="">
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
                        onClick={async () => {
                           // const response = await fetchBuilderProjectById({
                           //    projectId: row?.projectId,
                           //    builderId: props?.builderId
                           // });

                           // setBuilderProjectDetails(
                           //    response?.data?.resourceData
                           // );
                           console.log(row);
                           history.push("/admin/builders/builder-details/project-details", {
                              projectId: row?.projectId,
                              builderId: props?.builderId || builderData?.builderId,
                           });
                        }}
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

   const subColumns = [];
   const ExpandedRowComponent = ({ data }) => {
      return (
         <div>
            {expandLoading ? (
               <>
                  <TableLoader className="justify-content-center" />
               </>
            ) : null}
            {builderProjectDetails?.subProjectList?.map((subProject) => (
               <>
                  <div style={{ backgroundColor: "#F3ECEC" }}>
                     <Text
                        className="ml-3"
                        text={subProject?.projectName}
                        style={{ fontSize: "16px", fontWeight: "700" }}
                     />

                     <table
                        className="table ml-5"
                        style={{
                           tableLayout: "fixed",
                           width: "90%",
                           alignContent: "center",
                           backgroundColor: "#F3ECEC",
                        }}
                     >
                        <thead>
                           <tr style={{ borderBottom: "1px solid #DED6D9" }}>
                              <th
                                 className="text-start"
                                 style={{ width: "15%", textAlign: "left" }}
                              >
                                 Rera Number
                              </th>
                              <th
                                 className="text-start"
                                 style={{ width: "15%", textAlign: "left" }}
                              >
                                 Total Area To Develop
                              </th>
                              <th
                                 className="text-start"
                                 style={{ width: "10%", textAlign: "left" }}
                              >
                                 Total Floors
                              </th>
                              <th
                                 className="text-start"
                                 style={{ width: "15%", textAlign: "left" }}
                              >
                                 Contact Person Mobile Number
                              </th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td>{subProject.reraNumber}</td>
                              <td>{subProject?.totalAreaToDevelop || "0"}</td>
                              <td>{subProject?.totalFloors || "0"}</td>
                              <td>{subProject?.contactNumber || "0"}</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  {/* <Text className="ml-3" text={"Units Available"} style={{ fontSize: '14px', fontWeight: '700' }} />
                  <table className="table ml-5" style={{ tableLayout: "fixed", width: "90%" }}>
                     <tbody>
                        {(() => {
                           const filteredProperties = subProject?.properties?.filter(property => property?.propertyId !== null) || [];

                           return filteredProperties.length > 0 ? (
                              filteredProperties.map((property, index) => (
                                 <tr key={index} style={{ borderBottom: "1px solid #DED6D9" }}>
                                    <td>{property.compositionType || property?.propertySubType}</td>
                                    <td>{formatDate(property.possessionFrom, "MMM YYYY")} - {formatDate(property.possessionTo, "MMM YYYY")}</td>
                                    <td>{property.reraNumber}</td>
                                    <td>{(property.totalFloors || '0') + " Total Floors"}</td>
                                    <td>{(property.totalUnits || '0') + " Total Units"}</td>
                                    <td>{(property.unitsPerFloor || '0') + " Units Per Floor"}</td>
                                 </tr>
                              ))
                           ) : (
                              <tr>
                                 <td colSpan="6" style={{ textAlign: "center", padding: "10px" }}>
                                    No Units available
                                 </td>
                              </tr>
                           );
                        })()}

                     </tbody>
                  </table> */}
               </>
            ))}
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

   const handleExpandRow = async (expanded, project) => {
      if (expanded) {
         try {
            setExpandLoading(true);
            const response = await fetchBuilderProjectById({
               projectId: project?.projectId,
               builderId: props?.builderId || builderData?.builderId,
            });
            setExpandLoading(false);

            setBuilderProjectDetails(response?.data?.resourceData);

            // Set only the current project as expanded (collapse others)
            setExpandedProjectId(project.projectId);
         } catch (error) {
            console.error("Error fetching project details:", error);
         }
      } else {
         setExpandedProjectId(null); // Collapse all rows when clicking again
      }
   };

   return (
      <>
         <div className="builderProperties">
            <div className="tableBox">
               <div className="d-flex flex-md-column flex-xl-row justify-content-xl-end align-items-center tableHeading">
                  <div className="locationSelect d-flex justify-content-end align-items-center w-100">
                     {/* {subHeaderComponentMemo} */}
                     <Tooltip
                        placement="top-start"
                        style={{ width: "100%" }}
                        title={
                           builderStatus !== "APPROVED" && builderStatus !== "UNDER_REVIEW"
                              ? "Builder Profile is not approved"
                              : "Add new Project"
                        }
                     >
                        <a style={{ textDecoration: "none" }}>
                           <Button
                              className="d-flex py-1 ml-3"
                              disabled={builderStatus !== "APPROVED" && builderStatus !== "UNDER_REVIEW" ? true : false}
                              style={{
                                 color: "#BE1452",
                                 backgroundColor: "#F8F3F5",
                                 borderColor: "#DED6D9",
                              }}
                              onClick={() => {
                                 history.push("/admin/builders/builder-details/add-new-project", {
                                    builderId: props?.builderId || builderData?.builderId,
                                    editProject: false,
                                 });
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
                                 {" "}
                                 <Image src={addIcon} style={{ width: "10px" }} />
                              </div>
                              <Text
                                 text={"Add New Project"}
                                 fontWeight="bold"
                                 style={{ fontSize: "12px", color: "#BE1452" }}
                              />
                           </Button>
                        </a>
                     </Tooltip>
                  </div>
               </div>{" "}
               <div className="ProjectPostingTableWrapper">
                  <DataTableComponent
                     data={builderProjectList}
                     columns={columns}
                     progressPending={loading}
                     progressComponent={ProgressComponent}
                     // pagination
                     // paginationComponent={PaginationComponent}
                     // paginationServer
                     // paginationRowsPerPageOptions={[8, 16, 24, 32]} // Rows per page options
                     // paginationPerPage={8} // Default rows per page
                     // perPageOptions={[8, 16, 24, 32]} // Per-page options
                     // onChangePage={handlePageChange}
                     // onChangeRowsPerPage={handleRowsPerPageChange}
                     expandableRows
                     expandableRowsComponent={({ data }) => (
                        <ExpandedRowComponent
                           projectDetails={builderProjectDetails[data.projectId] || {}}
                        />
                     )}
                     expandableRowExpanded={(row) => row.projectId === expandedProjectId}
                     onRowExpandToggled={handleExpandRow}
                     pagination={false}
                     subHeaderComponent={subHeaderComponentMemo}
                     persistTableHead="true"
                     filterComponent={subHeaderComponentMemo}
                     keyField="id"
                     // expandableIcon={doubleUp}
                  ></DataTableComponent>
               </div>
            </div>
         </div>
         <Modal show={guideFlag} onHide={() => setGuideFlag(false)} centered backdrop="static" >
            <Modal.Header style={{justifyContent:"end"}}>
               <Buttons varient="secondary" name="X" onClick={() => {setGuideFlag(false)}} />
            </Modal.Header>
            <Modal.Body className="text-center">
               <Text text="Please complete builder profile details from Builder Profile section to add new Project" style={{fontSize: '16px', fontWeight: '500'}} />
               <Buttons name="Complete your Builder Profile" onClick={() => {history.push("/admin/builder-profile")}} />
            </Modal.Body>
         </Modal>
      </>
   );
};
const mapStateToProps = ({}) => ({});
const actions = {
   fetchProjectIdList,
   fetchBuilderProjectList,
};
const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(BuilderProjectList);
