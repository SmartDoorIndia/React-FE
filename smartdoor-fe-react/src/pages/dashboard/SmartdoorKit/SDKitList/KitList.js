/** @format */

import React, { useEffect, useRef, useState } from "react";
import { formateDate, handleStatusElement, ToolTip } from "../../../../common/helpers/Utils";
import Text from "../../../../shared/Text/Text";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Image from "../../../../shared/Image/Image";
import contentIcon from "../../../../assets/images/content-ico.png";
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import { TableLoader } from "../../../../common/helpers/Loader";
import Pagination from "../../../../shared/DataTable/Pagination";
import Input from "../../../../shared/Inputs/Input/Input";
import "./KitList.scss";
import { connect, useSelector } from "react-redux";
import { compose } from "redux";
import { fetchKitList, getKitMis } from "../../../../common/redux/actions";
import { Card, Form } from "react-bootstrap";
import CONSTANTS_STATUS from "../../../../common/helpers/ConstantsStatus";
import Buttons from "../../../../shared/Buttons/Buttons";

const KitList = (props) => {
   const { allKitList, fetchKitList } = props;
   const [kitId, setKitId] = useState(null);
   const [status, setStatus] = useState("");
   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
   const statusArr = CONSTANTS_STATUS.kitStatus;
   const data = useSelector((state) => state.allKitList.data);
   const [kitStatusList, setKitStatusList] = useState([]);
   const [kitInventoryList, setKitInventoryList] = useState([]);
   const tableRef = useRef();

   const kitListColumns = [
      {
         name: "Id",
         selector: (row) => row.kitId,
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ kitId }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={kitId}>
               <Text size="Small" color="secondryColor elipsis-text" text={kitId} />
            </ToolTip>
         ),
         id: 1,
      },
      {
         name: "Created Date",
         selector: (row) => row.createdDate,
         sortable: true,
         center: true,
         minWidth: "150px",
         cell: ({ createdDate }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={createdDate}>
               <Text
                  size="Small"
                  color="secondryColor elipsis-text"
                  text={formateDate(createdDate)}
               />
            </ToolTip>
         ),
         id: 2,
      },
      {
         name: "Last Modified Date",
         selector: (row) => row.lastModifiedDate,
         sortable: true,
         center: true,
         minWidth: "150px",
         cell: ({ lastModifiedDate }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={lastModifiedDate}>
               <Text
                  size="Small"
                  color="secondryColor elipsis-text"
                  text={formateDate(lastModifiedDate)}
               />
            </ToolTip>
         ),
         id: 3,
      },
      {
         name: "Corporate",
         selector: (row) => row.corporateName,
         sortable: false,
         center: false,
         minWidth: "150px",
         cell: ({ corporateName }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={corporateName}>
               <Text size="Small" color="secondryColor elipsis-text" text={corporateName} />
            </ToolTip>
         ),
         id: 4,
      },
      {
         name: "Status",
         selector: (row) => row.kitStatus,
         sortable: false,
         center: true,
         minWidth: "150px",
         cell: ({ kitStatus }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={kitStatus}>
               <Text
                  size="Small"
                  color="secondryColor elipsis-text"
                  text={handleStatusElement(kitStatus)}
               />
            </ToolTip>
         ),
         id: 5,
      },
      {
         name: "Action",
         sortable: false,
         center: false,
         maxWidth: "150px",
         cell: ({ kitId, corporateId, kitStatus }) => (
            <div className="action">
               <ToolTip
                  position="left"
                  name={kitStatus !== "DELETED" ? "View Details" : "No data to show"}
               >
                  <span>
                     <Link
                        to={{
                           pathname: "/admin/all-kit-list/kit-details",
                           state: { kitId: kitId, corporateId: corporateId },
                        }}
                     >
                        <Image
                           name="editIcon"
                           src={contentIcon}
                           style={{ cursor: kitStatus === "DELETED" ? "cross" : "pointer" }}
                        />
                     </Link>
                  </span>
               </ToolTip>
            </div>
         ),
         id: 6,
      },
   ];

   const ProgressComponent = <TableLoader />;
   const [currentPage, setCurrentPage] = useState(1);
   const [rowsPerPage, setRowsPerPage] = useState(8);
   const recordSize = allKitList?.data?.records || 0;
   console.log(recordSize);
   let recordsPerPage = 0;
   recordsPerPage = allKitList?.data?.rowsPerPage;

   const handlePageChange = (newPage) => {
      setCurrentPage(Number(newPage));
      getAllKits(newPage, rowsPerPage);
   };

   const handleRowsPerPageChange = async (newRowsPerPage) => {
      recordsPerPage = Number(newRowsPerPage);
      setRowsPerPage(Number(newRowsPerPage));
      getAllKits(currentPage, newRowsPerPage);
   };

   const PaginationActionButton = () => (
      <div className="d-flex justify-content-center tableBottom"></div>
   );

   let PaginationComponent = ({ onChangePage, onChangeRowsPerPage, ...props }) => (
      <Pagination
         {...props}
         rowCount={recordSize}
         rowsPerPage={recordsPerPage}
         onChangeRowsPerPage={handleRowsPerPageChange}
         currentPage={currentPage}
         onChangePage={handlePageChange}
         paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
         PaginationActionButton={PaginationActionButton}
      />
   );

   const getAllKits = (pageNo, pageSize) => {
      if (pageNo !== 1) {
         fetchKitList({
            kitId: kitId,
            status: status,
            pageNumber: pageNo,
            pageSize: pageSize,
            records: allKitList?.data?.records,
         });
      } else {
         fetchKitList({
            kitId: kitId,
            status: status,
            pageNumber: pageNo,
            pageSize: pageSize,
         });
      }
   };

   const kitIdBox = React.useMemo(() => {
      const handleClear = () => {
         if (kitId) {
            setResetPaginationToggle(!resetPaginationToggle);
            setKitId(null);
         }
      };

      return (
         <Input
            id={"kitId"}
            placeholder={"Search by Kit id"}
            type={"number"}
            value={kitId}
            onInput={(e) => {
               setKitId(e.target.value);
               console.log(e);
            }}
            onClear={() => {
               handleClear();
            }}
            filterText={kitId}
            showSearch={true}
            margin={70}
         />
      );
   }, [kitId, resetPaginationToggle]);

   useEffect(() => {
      getKitMis({ corporateId: 0 }).then((response) => {
         if (response?.status === 200) {
            let kitStatusList = [...response?.data?.resourceData?.kitStatus];

            // Define all possible statuses
            const allStatuses = ["INSTALLED", "READY_TO_INSTALL", "DELETED", "ON_HOLD"];

            // Add missing statuses with count 0
            const completeList = allStatuses.map((status) => {
               const found = kitStatusList.find((item) => item.status === status);
               return found ? found : { status, statusCount: 0 };
            });

            // Set the final list
            setKitStatusList(completeList);

            let inventoryList = [...response?.data?.resourceData?.kitInventory];
            const allInventories = ["SD", "CORPORATE"];

            const inventoryCompleteList = allInventories.map((inventoryType) => {
               const found = inventoryList.find((item) => item.inventoryType === inventoryType);
               return found ? found : { inventoryType, inventoryCount: 0 };
            });

            setKitInventoryList(inventoryCompleteList);
         }
      });

      if (data?.length === 0 || data?.autoRefresh === true) {
         getAllKits(currentPage, rowsPerPage);
      }
   }, []);

   // StatCard component
   const StatCard = ({ value, label, color = "#BE1452" }) => (
      <Card className="stat-card" style={{ width: "150px", minHeight: "120px" }}>
         <Card.Body className="d-flex flex-column justify-content-center align-items-center p-3">
            <div className="stat-value mb-2" style={{ color, fontSize: "32px", fontWeight: "700" }}>
               {value || 0}
            </div>
            <div
               className="stat-label"
               style={{
                  color: "#6c757d",
                  fontSize: "14px",
                  fontWeight: "600",
                  textAlign: "center",
               }}
            >
               {label}
            </div>
         </Card.Body>
      </Card>
   );
   return (
      <>
         <div className="device-section">
            <div className="d-flex flex-wrap gap-3 p-3">
               {kitStatusList.map((kitStatus, index) => (
                  <>
                     <StatCard
                        key={`status-${index}`}
                        value={kitStatus?.statusCount}
                        label={
                           kitStatus?.status === "INSTALLED"
                              ? "Installed"
                              : kitStatus?.status === "READY_TO_INSTALL"
                              ? "Ready to Install"
                              : kitStatus?.status === "DELETED"
                              ? "Deleted"
                              : kitStatus?.status === "ON_HOLD"
                              ? "On Hold"
                              : ""
                        }
                        color="#BE1452"
                     />{" "}
                     &nbsp;&nbsp;
                  </>
               ))}

               {kitInventoryList.map((kitInventory, index) => (
                  <>
                     <StatCard
                        key={`inventory-${index}`}
                        value={kitInventory?.inventoryCount}
                        label={
                           kitInventory?.inventoryType === "SD"
                              ? "SmartDoor"
                              : kitInventory?.inventoryType === "CORPORATE"
                              ? "Corporate"
                              : ""
                        }
                        color="#BE1452"
                     />{" "}
                     &nbsp;&nbsp;
                  </>
               ))}
            </div>
         </div>

         <div className="tableBox">
            <div className="align-items-center tableHeading">
               <div className="d-flex justify-content-between">
                  <div>
                     <Text
                        size="regular"
                        fontWeight="mediumbold"
                        color="secondryColor"
                        text="Kits"
                     />
                  </div>
                  <div className="locationSelect d-flex">
                     {kitIdBox}
                     <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                           as="select"
                           value={status}
                           onChange={(e) => {
                              setStatus(e.target.value);
                           }}
                        >
                           <option value="">Select Status</option>
                           {statusArr.length
                              ? statusArr.map((_value, index) => (
                                   <option key={index} value={_value}>
                                      {_value}
                                   </option>
                                ))
                              : null}
                        </Form.Control>
                     </Form.Group>
                     &nbsp;&nbsp;
                     <Buttons
                        name="Search"
                        varient="primary"
                        size="Small"
                        color="white"
                        style={{ height: "40px !important" }}
                        onClick={async () => {
                           fetchKitList({
                              kitId: kitId,
                              status: status,
                              pageNumber: 1,
                              pageSize: 8,
                              records: allKitList?.data?.records,
                           });
                        }}
                     />
                     &nbsp;&nbsp;
                     <Buttons
                        name="Refresh"
                        varient="primary"
                        size="Small"
                        color="white"
                        style={{ height: "40px !important" }}
                        onClick={async () => {
                           fetchKitList({
                              kitId: null,
                              status: "",
                              pageNumber: 1,
                              pageSize: 8,
                           });
                        }}
                     />
                  </div>
               </div>
            </div>
            <div className="kitListTableWrapper">
               <DataTableComponent
                  ref={tableRef}
                  data={allKitList?.data?.list || []}
                  columns={kitListColumns}
                  progressPending={allKitList?.isLoading}
                  progressComponent={ProgressComponent}
                  paginationComponent={PaginationComponent}
                  paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                  paginationPerPage={recordsPerPage}
                  currentPage={currentPage}
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handleRowsPerPageChange}
                  perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                  paginationServer={true}
                  persistTableHead
               />
            </div>
         </div>
      </>
   );
};

const mapStateToProps = ({ allKitList }) => ({
   allKitList,
});

const actions = {
   fetchKitList,
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect)(KitList);
