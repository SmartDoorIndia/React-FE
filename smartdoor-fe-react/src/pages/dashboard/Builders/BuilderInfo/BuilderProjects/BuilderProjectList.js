/** @format */
// Line 90 has the API integration
import React, { useEffect, memo } from "react";
import { Button, Image } from "react-bootstrap";
import "./BuilderProjectList.scss";
import SearchInput from "../../../../../shared/Inputs/SearchInput/SearchInput";
import Pagination from "../../../../../shared/DataTable/Pagination";
import { compose } from "redux";
import addIcon from "../../../../../assets/svg/add.svg";
import { connect } from "react-redux";
import { useState } from "react";
import DataTableComponent from "../../../../../shared/DataTable/DataTable";
import { formateDate, ToolTip } from "../../../../../common/helpers/Utils";
import {
   fetchProjectIdList,
   fetchBuilderProjectList,
   fetchBuilderProjectById,
} from "../../../../../common/redux/actions";
import { FallBackLoader, TableLoader } from "../../../../../common/helpers/Loader";
import Text from "../../../../../shared/Text/Text";
import { provideAuth } from "../../../../../common/helpers/Auth";
import { da } from "date-fns/locale";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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

   useEffect(async () => {
      const response = await fetchProjectIdList({ builderId: props?.builderId });
      console.log(provideAuth().userData);
      if (response.status === 200) {
         setLoading(true)
         if (response?.data?.resourceData?.length > 0) {
            setLoading(false);
            setBuilderProjectList(response?.data?.resourceData)
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
         selector: (row) => row?.projectName || 'N/A',
         center: true,
         sortable: true,
         minWidth: "200px",
         maxWidth: "200px",
      },
      {
         name: "Address",
         selector: (row) => row?.projectAddress || 'N/A',
         center: true,
         minWidth: "120px",
      },
      {
         name: "# of Towers / Plotted",
         selector: (row) => 'N/A',
         sortable: false,
         center: true,
         maxWidth: "160px",
      },
      {
         name: "# of Units",
         selector: (row) => 'N/A',
         center: true,
         minWidth: "150px",
         maxWidth: "150px",
      },
      // {
      //    name: "Pending Approval",
      //    selector: (row) => row.contactPersonNumber,
      //    //  sortable: true,
      //    center: true,
      //    minWidth: "145px",
      //    maxWidth: "150px",
      // },
      // {
      //    name: "Status",
      //    selector: (row) => row.contactPersonNumber,
      //    //  sortable: true,
      //    center: true,
      //    minWidth: "145px",
      //    maxWidth: "150px",
      // },

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
                           history.push("/admin/builders/builder-details/project-details", { projectId: row?.projectId, builderId: props?.builderId })
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

   const subColumns = [

   ]
   const ExpandedRowComponent = ({ data }) => {
      return (
         <div>
            {expandLoading ?
            <>
               <TableLoader className="justify-content-center" />
            </>
            : null}
            {builderProjectDetails?.subProjectList?.map((subProject) => (
               <>
                  <div style={{ backgroundColor: '#F3ECEC' }}>

                     <Text className="ml-3" text={subProject?.projectName} style={{ fontSize: '16px', fontWeight: '700' }} />

                     <table className="table ml-5" style={{ tableLayout: "fixed", width: "90%", alignContent: 'center', backgroundColor: '#F3ECEC' }}>
                        <thead>
                           <tr style={{ borderBottom: "1px solid #DED6D9" }}>
                              <th className="text-start" style={{ width: "15%", textAlign: 'left', }}>Rera Number</th>
                              <th className="text-start" style={{ width: "15%", textAlign: 'left', }}>Total Area To Develop</th>
                              <th className="text-start" style={{ width: "10%", textAlign: 'left', }}>Total Floors</th>
                              <th className="text-start" style={{ width: "15%", textAlign: 'left', }}>Contact Person Mobile Number</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td>{subProject.reraNumber}</td>
                              <td>{subProject?.totalAreaToDevelop}</td>
                              <td>{subProject?.totalFloors}</td>
                              <td>{subProject?.contactNumber}</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  <Text className="ml-3" text={"Units Available"} style={{ fontSize: '14px', fontWeight: '700' }} />
                  <table className="table ml-5" style={{ tableLayout: "fixed", width: "90%" }}>
                     <tbody>
                        {(() => {
                           const filteredProperties = subProject?.properties?.filter(property => property?.propertyId !== null) || [];

                           return filteredProperties.length > 0 ? (
                              filteredProperties.map((property, index) => (
                                 <tr key={index} style={{ borderBottom: "1px solid #DED6D9" }}>
                                    <td>{property.compositionType}</td>
                                    <td>{formatDate(property.possessionFrom, "MMM YYYY")} - {formatDate(property.possessionTo, "MMM YYYY")}</td>
                                    <td>{property.reraNumber}</td>
                                    <td>{property.totalFloors + " Total Floors"}</td>
                                    <td>{property.totalUnits + " Total Units"}</td>
                                    <td>{property.unitsPerFloor + " Units Per Floor"}</td>
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
                  </table>
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
               builderId: props?.builderId
            });
            setExpandLoading(false);

            setBuilderProjectDetails(
               response?.data?.resourceData
            );

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
                     {subHeaderComponentMemo}
                     <a style={{ textDecoration: "none" }}>
                        <Button
                           className="d-flex py-1 ml-3"
                           style={{
                              color: "#BE1452",
                              backgroundColor: "#F8F3F5",
                              borderColor: "#DED6D9",
                           }}
                           onClick={() => { history.push("/admin/builders/builder-details/add-new-project", { builderId: props?.builderId, editProject: false }) }}
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
                     data={builderProjectList}
                     columns={columns}
                     progressPending={loading}
                     progressComponent={ProgressComponent}
                     pagination
                     paginationComponent={PaginationComponent}
                     paginationServer
                     paginationRowsPerPageOptions={[8, 16, 24, 32]} // Rows per page options
                     paginationPerPage={8} // Default rows per page
                     perPageOptions={[8, 16, 24, 32]} // Per-page options
                     onChangePage={handlePageChange}
                     expandableRows
                     expandableRowsComponent={({ data }) => (
                        <ExpandedRowComponent projectDetails={builderProjectDetails[data.projectId] || {}} />
                     )}
                     expandableRowExpanded={(row) => row.projectId === expandedProjectId}
                     onRowExpandToggled={handleExpandRow}
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
const mapStateToProps = ({ }) => ({

});
const actions = {
   fetchProjectIdList,
   fetchBuilderProjectList,
};
const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(BuilderProjectList);
