/** @format */

import React, { useEffect, useState } from "react";
import { Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Checkbox, ListItemText, MenuItem, TextField } from "@mui/material";
import CONSTANTS_STATUS from "../../../common/helpers/ConstantsStatus";
import {
   formateDateTime,
   showErrorToast,
   showSuccessToast,
   showWarningToast,
   ToolTip,
} from "../../../common/helpers/Utils";
import { provideAuth } from "../../../common/helpers/Auth";
import Loader from "../../../common/helpers/Loader";
import { getSimList } from "../../../common/redux/actions";
import Text from "../../../shared/Text/Text";
import Buttons from "../../../shared/Buttons/Buttons";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import Pagination from "../../../shared/DataTable/Pagination";
import ConfirmationModal from "../../../shared/Modal/ConfirmationModal/ConfirmationModal";
import SearchIcon from "../../../assets/svg/Search.svg";
import SimUploadModal from "./SimUploadModal";
import SimUploadLogModal from "./SimUploadLogModal";
import "./SimDashboard.scss";

// smartlockservice rejects pageSize above 100
const SIM_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

const SIM_STATUS_LABELS = { READY_TO_USE: "Ready to use", IN_USE: "In use" };

const EMPTY_FILTERS = { searchText: "", simStatus: "", providers: [], providerStatuses: [] };

// default order of /sim/list when nothing is sorted
const DEFAULT_SORT = { orderByParam: "LAST_MODIFIED_DATE", orderBy: "DESC" };

const hasFilters = (values) =>
   Boolean(
      values.searchText.trim() || values.simStatus || values.providers.length || values.providerStatuses.length
   );

// every filter control is this tall so the bar lines up (matches .simFilters in the scss)
const multiSelectSx = {
   width: "200px",
   "&.MuiFormControl-root": { margin: 0, height: "fit-content" },
   "& .MuiFormHelperText-root": { display: "none" },
   "& .MuiOutlinedInput-root": {
      height: "32px",
      padding: "0 8px",
      borderRadius: "4px",
      backgroundColor: "#F8F3F5",
      fontSize: "12px",
      fontWeight: 600,
      fontFamily: "inherit",
      color: "#495057",
      "& fieldset": { border: "1px solid #ced4da" },
   },
   "& .MuiSelect-select": {
      padding: "0 !important",
      height: "32px",
      display: "flex",
      alignItems: "center",
   },
   "& .select-ellipsis": {
      display: "block",
      maxWidth: "calc(100% - 24px)",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
   },
};

const MultiSelect = ({ placeholder, options, value, onChange, getLabel = (option) => option }) => (
   <TextField
      hiddenLabel
      size="small"
      select
      variant="outlined"
      SelectProps={{
         multiple: true,
         displayEmpty: true,
         renderValue: (selected) => (
            <span className="select-ellipsis">{selected.length ? selected.join(", ") : placeholder}</span>
         ),
      }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={multiSelectSx}
   >
      {options.map((option) => (
         <MenuItem key={option} value={option} sx={{ height: 32 }}>
            <Checkbox size="small" checked={value.includes(option)} />
            <ListItemText primary={getLabel(option)} primaryTypographyProps={{ fontSize: "12px" }} />
         </MenuItem>
      ))}
   </TextField>
);

const StatCard = ({ value, label, color = "#BE1452", loading }) => (
   <Card className="stat-card h-100">
      <Card.Body className="text-center p-3">
         <div className="statValue" style={{ color }}>
            {loading ? <Spinner animation="border" size="sm" /> : value || 0}
         </div>
         <Text text={label} style={{ color: "#6c757d", fontSize: "14px", fontWeight: "500" }} />
      </Card.Body>
   </Card>
);

const cellText = (value) => (
   <ToolTip position="top" name={value ?? "-"}>
      <Text size="Small" color="secondryColor elipsis-text" text={value ?? "-"} />
   </ToolTip>
);

const SimDashboard = () => {
   const history = useHistory();
   // filters being edited; they reach the list only when Search is pressed
   const [filters, setFilters] = useState(EMPTY_FILTERS);
   const [query, setQuery] = useState({ ...EMPTY_FILTERS, ...DEFAULT_SORT, pageNumber: 1, pageSize: 10 });
   const [simList, setSimList] = useState([]);
   const [counts, setCounts] = useState({});
   const [records, setRecords] = useState(0);
   const [loading, setLoading] = useState(false);
   const [showUploadModal, setShowUploadModal] = useState(false);
   const [showUploadLog, setShowUploadLog] = useState(false);
   const [showResetConfirm, setShowResetConfirm] = useState(false);
   // the table keeps its own sort arrow, so it is remounted when the sort is reset
   const [tableKey, setTableKey] = useState(0);

   useEffect(() => {
      let ignore = false;
      setLoading(true);
      getSimList({
         ...query,
         searchText: query.searchText.trim() || null,
         simStatus: query.simStatus || null,
      }).then((response) => {
         // a slower response for an older query must not replace the current page
         if (ignore) return;
         setLoading(false);
         if (response?.status === 200) {
            setSimList(response.data?.resourceData?.sims || []);
            setCounts(response.data?.resourceData?.counts || {});
            setRecords(response.data?.records || 0);
         } else {
            showErrorToast(response?.data?.message || "Could not load SIMs, please try again.");
         }
      });
      return () => {
         ignore = true;
      };
   }, [query]);

   const applyFilters = (e) => {
      e.preventDefault();
      setQuery((current) => ({ ...current, ...filters, pageNumber: 1 }));
   };

   const handleResetClick = () => {
      const isSorted =
         query.orderByParam !== DEFAULT_SORT.orderByParam || query.orderBy !== DEFAULT_SORT.orderBy;
      // typed-but-not-searched filters count too, since Reset clears them as well
      if (!hasFilters(filters) && !hasFilters(query) && !isSorted) {
         showWarningToast("Nothing to reset - no search, filter or sorting is applied.");
         return;
      }
      setShowResetConfirm(true);
   };

   const resetFilters = () => {
      setShowResetConfirm(false);
      setFilters(EMPTY_FILTERS);
      setQuery((current) => ({ ...current, ...EMPTY_FILTERS, ...DEFAULT_SORT, pageNumber: 1 }));
      setTableKey((key) => key + 1);
      showSuccessToast("Search, filters and sorting cleared.");
   };

   const handleSort = (column, sortDirection) => {
      setQuery((current) => ({
         ...current,
         orderByParam: column.sortField,
         orderBy: sortDirection === "asc" ? "ASC" : "DESC",
         pageNumber: 1,
      }));
   };

   const handlePageChange = (pageNumber) => {
      if (pageNumber < 1 || pageNumber > Math.ceil(records / query.pageSize)) return;
      setQuery((current) => ({ ...current, pageNumber }));
   };

   const handleRowsPerPageChange = (pageSize) => {
      setQuery((current) => ({ ...current, pageSize, pageNumber: 1 }));
   };

   const PaginationComponent = (props) => (
      <Pagination
         {...props}
         rowCount={records}
         rowsPerPage={query.pageSize}
         currentPage={query.pageNumber}
         onChangePage={handlePageChange}
         onChangeRowsPerPage={handleRowsPerPageChange}
         paginationRowsPerPageOptions={SIM_PAGE_SIZE_OPTIONS}
      />
   );

   // counts arrive with every page, so the cards only spin until the first response
   const countsLoading = loading && counts.total === undefined;
   const byProvider = counts.byProvider || {};
   const byProviderStatus = counts.byProviderStatus || {};
   // statuses come from the vendor files, so the options are whatever the uploads contained
   const providerStatusOptions = [
      ...new Set([...Object.keys(byProviderStatus), ...filters.providerStatuses]),
   ];

   const simColumns = [
      {
         name: "Id",
         center: true,
         selector: (row) => row.simCardId,
         maxWidth: "65px",
         cell: ({ simCardId }) => cellText(simCardId),
      },
      {
         name: "ICCID",
         center: true,
         selector: (row) => row.iccid,
         sortable: true,
         sortField: "ICCID",
         minWidth: "200px",
         cell: ({ iccid }) => cellText(iccid),
      },
      {
         name: "Provider",
         center: true,
         selector: (row) => row.provider,
         sortable: true,
         sortField: "PROVIDER",
         minWidth: "110px",
         cell: ({ provider }) => cellText(provider),
      },
      {
         name: "Status",
         center: true,
         selector: (row) => row.providerStatus,
         sortable: true,
         sortField: "PROVIDER_STATUS",
         minWidth: "130px",
         cell: ({ providerStatus }) => cellText(providerStatus),
      },
      {
         name: "SIM Status",
         center: true,
         selector: (row) => row.simStatus,
         sortable: true,
         sortField: "SIM_STATUS",
         minWidth: "140px",
         cell: ({ simStatus }) => (
            <Text
               size="xSmall"
               fontWeight="mediumbold"
               color="white"
               text={SIM_STATUS_LABELS[simStatus] || simStatus}
               className={`defaultTag ${simStatus === "IN_USE" ? "tagInfo" : "tagSuccess"}`}
            />
         ),
      },
      {
         name: "Camera Id",
         center: true,
         selector: (row) => row.cameraDeviceId,
         sortable: true,
         sortField: "CAMERA_ID",
         minWidth: "130px",
         cell: ({ cameraDeviceId, cameraDeleted }) => (
            <div className="d-flex align-items-center">
               {cellText(cameraDeviceId)}
               {cameraDeleted ? (
                  <ToolTip position="top" name="This camera is deleted but still holds the SIM">
                     <Text size="xSmall" color="white" text="Deleted" className="tagDangerous simTag ml-2" />
                  </ToolTip>
               ) : null}
            </div>
         ),
      },
      {
         name: "Camera UUID",
         center: true,
         selector: (row) => row.cameraUuId,
         minWidth: "160px",
         cell: ({ cameraUuId }) => cellText(cameraUuId),
      },
      {
         name: "Camera Type",
         center: true,
         selector: (row) => row.cameraType,
         minWidth: "130px",
         cell: ({ cameraType }) => cellText(cameraType),
      },
      {
         name: "Property Id",
         center: true,
         selector: (row) => row.propertyId,
         minWidth: "160px",
         cell: ({ propertyId }) => (
            <div className="d-flex align-items-center">
               <Text size="Small" color="secondryColor" text={propertyId || "-"} />
               {propertyId ? (
                  <Buttons
                     name="View"
                     size="small"
                     className="ml-2"
                     onClick={() =>
                        history.push("/admin/sim-dashboard/viewProperty", {
                           propertyId,
                           userId: provideAuth().userData.userid,
                        })
                     }
                  />
               ) : null}
            </div>
         ),
      },
      {
         name: "Last Synced",
         center: true,
         selector: (row) => row.lastSyncedDate,
         sortable: true,
         sortField: "LAST_SYNCED_DATE",
         minWidth: "180px",
         cell: ({ lastSyncedDate }) => cellText(lastSyncedDate ? formateDateTime(lastSyncedDate) : null),
      },
   ];

   return (
      <>
         <div className="tableBox simDashboard">
            <div className="tableHeading">
               <div className="d-flex justify-content-end mb-2">
                  {/* <Buttons
                     name="Upload Log"
                     varient="secondary"
                     size="Small"
                     color="black"
                     type="button"
                     className="mr-2"
                     onClick={() => setShowUploadLog(true)}
                  /> */}
                  <Buttons
                     name="Upload SIM File"
                     varient="primary"
                     size="Small"
                     color="white"
                     type="button"
                     onClick={() => setShowUploadModal(true)}
                  />
               </div>

               {/* a form so Enter in the search box applies the filters */}
               <form className="simFilters" onSubmit={applyFilters}>
                  <div className="simSearch">
                     <img src={SearchIcon} alt="" />
                     <Form.Control
                        type="text"
                        placeholder="ICCID / Camera id / Camera UUID"
                        value={filters.searchText}
                        onChange={(e) => setFilters({ ...filters, searchText: e.target.value })}
                     />
                  </div>
                  <Form.Control
                     as="select"
                     className="simSelect"
                     value={filters.simStatus}
                     onChange={(e) => setFilters({ ...filters, simStatus: e.target.value })}
                  >
                     <option value="">All SIM Status</option>
                     {CONSTANTS_STATUS.simStatus.map((status) => (
                        <option key={status} value={status}>
                           {SIM_STATUS_LABELS[status]}
                        </option>
                     ))}
                  </Form.Control>
                  <MultiSelect
                     placeholder="Select Provider(s)"
                     options={CONSTANTS_STATUS.simProvider}
                     value={filters.providers}
                     onChange={(providers) => setFilters({ ...filters, providers })}
                  />
                  <MultiSelect
                     placeholder="Select Status(s)"
                     options={providerStatusOptions}
                     value={filters.providerStatuses}
                     onChange={(providerStatuses) => setFilters({ ...filters, providerStatuses })}
                     getLabel={(status) => `${status} (${byProviderStatus[status] || 0})`}
                  />
                  <Buttons
                     name={
                        loading ? (
                           <>
                              <Spinner animation="border" size="sm" className="mr-2" />
                              Search
                           </>
                        ) : (
                           "Search"
                        )
                     }
                     varient="primary"
                     size="Small"
                     color="white"
                     type="submit"
                     disabled={loading}
                  />
                  <Buttons
                     name="Reset"
                     varient="secondary"
                     size="Small"
                     color="black"
                     type="button"
                     disabled={loading}
                     onClick={handleResetClick}
                  />
               </form>

               {/* counts cover all SIMs, not just the filtered ones */}
               <Row className="g-3 mt-3">
                  <Col md={2}>
                     <StatCard value={counts.total} label="Total SIMs" loading={countsLoading} />
                  </Col>
                  <Col md={2}>
                     <StatCard
                        value={counts.inUse}
                        label={SIM_STATUS_LABELS.IN_USE}
                        color="#1AC8FF"
                        loading={countsLoading}
                     />
                  </Col>
                  <Col md={2}>
                     <StatCard
                        value={counts.readyToUse}
                        label={SIM_STATUS_LABELS.READY_TO_USE}
                        color="#40C52B"
                        loading={countsLoading}
                     />
                  </Col>
                  {CONSTANTS_STATUS.simProvider.map((provider) => (
                     <Col md={2} key={provider}>
                        <StatCard
                           value={byProvider[provider]}
                           label={provider}
                           color="#252525"
                           loading={countsLoading}
                        />
                     </Col>
                  ))}
               </Row>
            </div>
            <div className="simTableWrapper">
               {/* rows stay visible under the spinner so the table doesn't jump on sort / page clicks,
                   and the overlay blocks further clicks until the response arrives */}
               {loading ? (
                  <div className="simTableOverlay">
                     <Loader />
                  </div>
               ) : null}
               <DataTableComponent
                  key={tableKey}
                  data={simList}
                  columns={simColumns}
                  noDataComponent={
                     <div className="simTableNoData">{loading ? "" : "There are no records to display"}</div>
                  }
                  persistTableHead
                  paginationServer
                  paginationComponent={PaginationComponent}
                  paginationRowsPerPageOptions={SIM_PAGE_SIZE_OPTIONS}
                  paginationPerPage={query.pageSize}
                  sortServer
                  onSort={handleSort}
               />
            </div>
         </div>

         <SimUploadModal
            show={showUploadModal}
            onHide={() => setShowUploadModal(false)}
            onUploaded={() => setQuery((current) => ({ ...current }))}
         />
         <SimUploadLogModal show={showUploadLog} onHide={() => setShowUploadLog(false)} />
         <ConfirmationModal
            show={showResetConfirm}
            title="Clear the search, all filters and sorting?"
            cancelButtonName="Cancel"
            primaryButtonName="Reset"
            handleClose={() => setShowResetConfirm(false)}
            handlePerformAction={resetFilters}
         />
      </>
   );
};

export default SimDashboard;
