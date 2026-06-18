/** @format */

import React, { useEffect, useRef, useState } from "react";
import CONSTANTS_STATUS from "../../../common/helpers/ConstantsStatus";
import { showErrorToast, showSuccessToast, ToolTip } from "../../../common/helpers/Utils";
import Text from "../../../shared/Text/Text";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { TableLoader } from "../../../common/helpers/Loader";
import Pagination from "../../../shared/DataTable/Pagination";
import {
   fetchSmartlockTypeList,
   getAllCityWithId,
   getCorporateById,
   getSmartlockDashboardList,
   restoreOrDeleteDevice,
   updateSmartlockStatus,
} from "../../../common/redux/actions";
import { Card, Col, Form, Modal, Row } from "react-bootstrap";
import { Checkbox, ListItemText, MenuItem, TextField } from "@mui/material";
import { connect } from "react-redux";
import { compose } from "redux";
import Buttons from "../../../shared/Buttons/Buttons";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import "./SmartlockDashboard.scss";
import SearchInput from "../../../shared/Inputs/SearchInput/SearchInput";
import { provideAuth } from "../../../common/helpers/Auth";

const SmartlockDashboard = (props) => {
   const { allCitiesWithId, getAllCityWithId, smartlockList, getSmartlockDashboardList } = props;
   const smartlockStatus = CONSTANTS_STATUS.smartlockStatus;
   const [deviceStatus, setDeviceStatus] = useState(smartlockList?.data?.deviceStatus || []);
   const [propertyIdText, setPropertyIdText] = useState(smartlockList?.data?.propertyId || "");
   const [smartlockIdText, setSmartlockIdText] = useState(smartlockList?.data?.smartlockId || "");
   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
   const [corporateList, setCorporateList] = useState([]);
   const [selectedCorporate, setSelectedCorporate] = useState(
      smartlockList?.data?.corporateId || []
   );
   const [smartlockStats, setSmartlockStats] = useState({});
   const [smartlockTypeList, setSmartlockTypeList] = useState([] || CONSTANTS_STATUS.smartlockType);
   const [smartlockType, setSmartlockType] = useState(smartlockList?.data?.smartlockType || "");
   const [cityIdList, setCityIdList] = useState(smartlockList?.data?.cityIdList || []);
   const [orderByParam, setOrderByParam] = useState(smartlockList?.data?.orderByParam || "BATTERY_VALUE");
   const [orderBy, setOrderBy] = useState(smartlockList?.data?.orderBy || "INCREASING");
   const [smartlockListReqDto, setSmartlockListReqDto] = useState({
      deviceStatus: deviceStatus, // preconfig , install ,sold //
      corporateId: selectedCorporate, //
      cityIdList: null, //
      smartlockType: smartlockType,
      propertyId: propertyIdText,
      smartlockId: smartlockIdText,
      pageNumber: 1,
      pageSize: 8,
   });
   const [confirmDeleteModalFlag, setConfirmDeleteModalFlag] = useState(false);
   const [selectedDevice, setSelectedDevice] = useState({
      deviceType: "",
      deviceId: null,
      actionType: "Delete",
   })
   const tableRef = useRef();
   const history = useHistory();

   const smartlockColumns = [
      {
         name: "Id",
         selector: (row) => row.id,
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ id }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={id}>
               <Text size="Small" color="secondryColor elipsis-text" text={id} />
            </ToolTip>
         ),
         id: 1,
      },
      {
         name: "Type",
         selector: (row) => row.smartlockType,
         sortable: true,
         center: true,
         minWidth: "250px",
         cell: ({ smartlockType }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={smartlockType}>
               <Text size="Small" color="secondryColor elipsis-text" text={smartlockType || "-"} />
            </ToolTip>
         ),
         id: 2,
      },
      {
         name: "Battery",
         selector: (row) => row.batteryPercentage,
         sortable: true,
         center: true,
         maxWidth: "80px",
         cell: ({ batteryPercentage }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={batteryPercentage}>
               <Text
                  size="Small"
                  color="secondryColor elipsis-text"
                  text={batteryPercentage !== null ? batteryPercentage + "%" : "-"}
               />
            </ToolTip>
         ),
         id: 3,
      },
      {
         name: "Inventory",
         selector: (row) => row.inventoryType,
         sortable: true,
         center: true,
         minWidth: "200px",
         cell: ({ inventoryType }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={inventoryType}>
               <Text size="Small" color="secondryColor elipsis-text" text={inventoryType || "-"} />
            </ToolTip>
         ),
         id: 4,
      },
      {
         name: "City",
         selector: (row) => row.city,
         sortable: false,
         center: true,
         minWidth: "200px",
         cell: ({ city }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={city}>
               <Text size="Small" color="secondryColor elipsis-text" text={city || "-"} />
            </ToolTip>
         ),
         id: 5,
      },
      {
         name: "Status",
         selector: (row) => row.status,
         sortable: true,
         center: true,
         minWidth: "200px",
         cell: ({ status }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={status}>
               <Text size="Small" color="secondryColor elipsis-text" text={status} />
            </ToolTip>
         ),
         id: 6,
      },
      {
         name: "PropertyId",
         selector: (row) => row.propertyId,
         sortable: true,
         center: true,
         minWidth: "200px",
         cell: ({ propertyId }) => (
            <div className="d-flex justify-content-space-between" style={{ justifyContent: 'space-between' }}>
               <Text size="Small" color="secondryColor elipsis-text" text={propertyId || "-"} />
               &nbsp;&nbsp;
               {propertyId !== null && propertyId !== 0 ?
                  <>
                     <Buttons name="View" size="small" onClick={() => { history.push("/admin/smartlock-dashboard/viewProperty", { propertyId: propertyId, userId: provideAuth().userData.userid }) }} />
                  </> : null}
            </div>

         ),
         id: 7,
      },
      {
         name: "Installer Executive",
         selector: (row) => row.preconfiguredById,
         sortable: false,
         center: true,
         minWidth: "200px",
         cell: ({ preconfiguredById }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={preconfiguredById}>
               <Text size="Small" color="secondryColor elipsis-text" text={preconfiguredById || "-"} />
            </ToolTip>
         ),
         id: 8,
      },
      {
         name: "Action",
         sortable: false,
         center: true,
         minWidth: "340px",
         cell: ({ id, status, propertyId, kitId }) => (
            <div className="action">
               <div className="locationSelect">
                  <>
                     <style>
                        {`
                           .mark-status-select {
                              background: #f0f0f0;
                              border: 1px solid #ccc;
                              font-weight: 600;
                              font-size: 12px;
                              border-radius: 4px;
                              height: 30px;
                              box-shadow: none;
                              padding-top: 4px;
                           }
                        `}
                     </style>

                     <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                           as="select"
                           className="mark-status-select"
                           onChange={async (e) => {
                              if (propertyId !== null && propertyId !== 0) {
                                 showErrorToast(
                                    "You cannot change status as Smartlock is installed on property."
                                 );
                                 e.target.value = "";
                                 return null;
                              } else {
                                 const selectedStatus = e.target.value;
                                 await updateSmartlockStatus({
                                    lockId: id,
                                    status: e.target.value,
                                 }).then((response) => {
                                    if (response?.status === 200) {
                                       let successToast = `Smartlock marked as ${selectedStatus} successfully...`;
                                       showSuccessToast(successToast);
                                       getSmartlockDashboardList({
                                          deviceStatus: deviceStatus, // preconfig , install ,sold //
                                          corporateId: selectedCorporate, //
                                          cityIdList: cityIdList, //
                                          smartlockType: smartlockType, //
                                          propertyId: propertyIdText,
                                          smartlockId: smartlockIdText,
                                          pageNumber: currentPage,
                                          pageSize: rowsPerPage,
                                          orderByParam: orderByParam,
                                          orderBy: orderBy
                                       });
                                    } else {
                                       showErrorToast(response?.data?.message);
                                    }
                                 });
                              }
                           }}
                        >
                           <option value="">Mark as</option>
                           {smartlockStatus
                              ?.filter((s) => status !== s && s !== 'INSTALLED')
                              ?.map((status) => (
                                 <option key={status} value={status}>
                                    {status}
                                 </option>
                              ))}
                        </Form.Control>
                     </Form.Group>
                  </>
                  &nbsp;&nbsp;
                  {status === "PRECONFIGURED_DEVICE" && kitId === null ? (
                     <>
                        <Buttons name="Delete" variant="outline-danger" size="xSmall" onClick={() => {
                           setSelectedDevice({ deviceType: 'SmartLock', deviceId: id, actionType: 'Delete' });
                           setConfirmDeleteModalFlag(true)
                        }} />{" "}
                        &nbsp;&nbsp;
                     </>
                  ) : null}
               </div>
            </div>
         ),
      },
   ];

   const ALL_STATUSES = [
      { status: "TOTAL", count: 0 },
      { status: "PRECONFIGURED_DEVICE", count: 0 },
      { status: "INSTALLED", count: 0 },
      { status: "SOLD", count: 0 },
      { status: "DEFECTIVE", count: 0 },
   ];

   const statusCounts = Array.isArray(smartlockList?.data?.statusCounts)
      ? smartlockList.data.statusCounts
      : [];

   const mergedStatusCounts = ALL_STATUSES.map((defaultStatus) => {
      const found = statusCounts.find((item) => item.status === defaultStatus.status);

      return found ?? defaultStatus;
   });

   const ProgressComponent = <TableLoader />;
   const [currentPage, setCurrentPage] = useState(
      smartlockList?.data?.length !== 0 ? smartlockList?.data?.currentPage : 1
   );
   const [rowsPerPage, setRowsPerPage] = useState(
      smartlockList?.data?.length !== 0 ? smartlockList?.data?.rowsPerPage : 8
   );
   const recordSize =
      smartlockList?.data?.statusCounts !== undefined
         ? smartlockList?.data?.statusCounts[0]?.count
         : 0;
   let recordsPerPage = 0;
   recordsPerPage = smartlockList?.data?.rowsPerPage;

   const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
      getSmartlockDashboardList({
         deviceStatus: deviceStatus, // preconfig , install ,sold //
         corporateId: selectedCorporate, //
         cityIdList: cityIdList, //
         smartlockType: smartlockType, //
         propertyId: propertyIdText,
         smartlockId: smartlockIdText,
         pageNumber: newPage,
         pageSize: rowsPerPage,
         orderByParam: orderByParam,
         orderBy: orderBy
      });
   };

   const handleRowsPerPageChange = async (newRowsPerPage) => {
      setRowsPerPage(newRowsPerPage);
      getSmartlockDashboardList({
         deviceStatus: deviceStatus, // preconfig , install ,sold //
         corporateId: selectedCorporate, //
         cityIdList: cityIdList, //
         smartlockType: smartlockType, //
         propertyId: propertyIdText,
         smartlockId: smartlockIdText,
         pageNumber: currentPage,
         pageSize: newRowsPerPage,
         orderByParam: orderByParam,
         orderBy: orderBy
      });
   };

   let PaginationComponent = ({ onChangePage, onChangeRowsPerPage, ...props }) => (
      <Pagination
         {...props}
         rowCount={recordSize}
         rowsPerPage={recordsPerPage}
         onChangeRowsPerPage={handleRowsPerPageChange}
         currentPage={currentPage}
         onChangePage={handlePageChange}
         paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
      />
   );

   const getSmartlockTypeList = async () => {
      const response = await fetchSmartlockTypeList({});
      if (response?.status === 200) {
         const values =
            JSON.parse(response?.data?.resourceData?.[0]?.value || "{}")?.values || [];

         setSmartlockTypeList(values);
      }
   };

   const getCorprateList = async () => {
      try {
         const response = await getCorporateById({
            corporateId: 0,
            pageNo: 1,
            pageSize: 8,
         });
         if (response?.status === 200) {
            const trimmedData = response?.data?.resourceData?.map(
               ({ corporateId, companyName }) => ({
                  corporateId,
                  companyName,
               })
            );

            setCorporateList(trimmedData);
         }
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      getAllCityWithId({ smartdoorServiceStatus: true, stateId: null });
      getCorprateList();
      getSmartlockTypeList();
      getSmartlockDashboardList({
         deviceStatus: deviceStatus, // preconfig , install ,sold //
         corporateId: selectedCorporate, //
         cityIdList: cityIdList, //
         smartlockType: smartlockType, //
         propertyId: propertyIdText,
         smartlockId: smartlockIdText,
         pageNumber: currentPage,
         pageSize: rowsPerPage,
         orderByParam: orderByParam,
         orderBy: orderBy
      });
   }, []);

   const propertyIdBox = React.useMemo(() => {
      const handleClear = () => {
         if (propertyIdText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setPropertyIdText(null);
         }
      };

      return (
         <SearchInput
            id={"propertyId"}
            placeholder={"Search Property id"}
            textType={"number"}
            value={propertyIdText}
            // onInput={(e) => {
            //    setPropertyIdText(e.target.value);
            //    console.log(e);
            // }}
            onFilter={(e) => setPropertyIdText(e.target.value)}
            onClear={() => {
               handleClear();
            }}
            filterText={propertyIdText}
         // showSearch={false}
         // margin={50}
         />
      );
   }, [propertyIdText, resetPaginationToggle]);

   const smartlockIdBox = React.useMemo(() => {
      const handleClear = () => {
         if (smartlockIdText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setSmartlockIdText(null);
         }
      };

      return (
         <SearchInput
            id={"smartlockId"}
            placeholder={"Search Smartlock id"}
            textType={"number"}
            value={smartlockIdText}
            // onInput={(e) => {
            //    setSmartlockIdText(e.target.value);
            //    console.log(e);
            // }}
            onFilter={(e) => setSmartlockIdText(e.target.value)}
            onClear={() => {
               handleClear();
            }}
            filterText={smartlockIdText}
         // showSearch={false}
         // margin={70}
         />
      );
   }, [smartlockIdText, resetPaginationToggle]);

   const StatCard = ({ value, label, color = "#BE1452" }) => (
      <Card className="stat-card h-100">
         <Card.Body className="text-center p-3">
            <Text
               text={value || 0}
               className="stat-value"
               style={{ color, fontSize: "28px", fontWeight: "700" }}
            />
            <Text
               text={label}
               className="stat-label"
               style={{ color: "#6c757d", fontSize: "14px", fontWeight: "500" }}
            />
         </Card.Body>
      </Card>
   );

   const handleSortedData = (newSortedData, sortDirection) => {
      let selectorVal = newSortedData?.selector?.toString().split('.');
      console.log(selectorVal)
      setOrderBy(sortDirection === "asc" ? "INCREASING" : "DECREASING")
      selectorVal = selectorVal?.length > 1 ? selectorVal[1] : selectorVal[0]
      if (selectorVal === 'batteryPercentage') {
         getSmartlockDashboardList({
            deviceStatus: deviceStatus, // preconfig , install ,sold //
            corporateId: selectedCorporate, //
            cityIdList: cityIdList, //
            smartlockType: smartlockType, //
            propertyId: propertyIdText,
            smartlockId: smartlockIdText,
            pageNumber: 1,
            pageSize: rowsPerPage,
            orderByParam: orderByParam,
            orderBy: orderBy,
            orderBy: sortDirection === "asc" ? "INCREASING" : "DECREASING"
         });
      }
   }

   const handleDelete = () => {
      restoreOrDeleteDevice({
         deviceType: selectedDevice.deviceType,
         deviceId: selectedDevice.deviceId,
         actionType: selectedDevice.actionType,
      }).then((response) => {
         if (response?.status === 200) {
            showSuccessToast(selectedDevice.deviceType + " deleted successfully");
            setConfirmDeleteModalFlag(false)
            getSmartlockDashboardList({
               deviceStatus: deviceStatus, // preconfig , install ,sold //
               corporateId: selectedCorporate, //
               cityIdList: cityIdList, //
               smartlockType: smartlockType, //
               propertyId: propertyIdText,
               smartlockId: smartlockIdText,
               pageNumber: currentPage,
               pageSize: rowsPerPage,
               orderByParam: orderByParam,
               orderBy: orderBy
            });
         }
      });
   };

   return (
      <>
         <div className="tableBox " style={{ overflowX: "hidden" }}>
            <div className="align-items-center tableHeading">
               <div className="justify-content-between">
                  <div className="locationSelect justify-content-end mb-2">
                     {propertyIdBox}
                     {smartlockIdBox}
                     <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                           as="select"
                           value={orderBy}
                           onChange={(e) => {
                              setOrderBy(e.target.value);
                           }}
                           placeholder="Sort By"
                        >
                           {/* <option value="">Sort By</option> */}
                           <option key={"INCREASING"} value={"INCREASING"}>
                              {"Battery " + "(INCREASING)"}
                           </option>
                           <option key={"DECREASING"} value={"DECREASING"}>
                              {"Battery " + "(DECREASING)"}
                           </option>
                        </Form.Control>
                     </Form.Group>&nbsp;&nbsp;
                     <TextField
                        hiddenLabel
                        size="small"
                        className="form-control1"
                        select
                        placeholder="Select Status(s)"
                        SelectProps={{
                           multiple: true,
                           displayEmpty: true,
                           renderValue: (selected) => {
                              const text = selected.length
                                 ? smartlockStatus
                                    .filter((s) => selected.includes(s))
                                    .map((s) => s)
                                    .join(", ")
                                 : "Select Status(s)";

                              return React.createElement(
                                 "span",
                                 { className: "select-ellipsis" },
                                 text
                              );
                           },
                        }}
                        value={deviceStatus}
                        onChange={(e) => setDeviceStatus(e.target.value)}
                        variant="outlined"
                        sx={{
                           width: "30%",

                           "&.MuiFormControl-root": {
                              margin: 0,
                              height: "fit-content",
                           },

                           "& .MuiFormHelperText-root": {
                              display: "none",
                           },
                           "& .MuiOutlinedInput-root": {
                              height: "30px",
                              padding: "0 8px",
                              borderRadius: "4px",
                              backgroundColor: "#F8F3F5",
                              fontSize: "12px",
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                              fontFamily: "inherit",
                              color: "#495057",
                              boxSizing: "border-box",
                              "& fieldset": {
                                 border: "1px solid #ced4da",
                              },
                           },
                           "& .MuiOutlinedInput-notchedOutline": {
                              border: "1px solid #ced4da",
                           },
                           "& .MuiSelect-select": {
                              padding: "0 !important",
                              height: "30px",
                              display: "flex",
                              alignItems: "center",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                           },

                           "& .MuiSelect-icon": {
                              top: "50%",
                              transform: "translateY(-50%)",
                           },
                           "& .select-ellipsis": {
                              display: "block",
                              maxWidth: "calc(100% - 24px)", // 👈 icon width
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                           },
                        }}
                     >
                        {smartlockStatus.map((status, index) => (
                           <MenuItem key={index} value={status} sx={{ height: 32 }}>
                              <Checkbox size="small" checked={deviceStatus.includes(status)} />
                              <ListItemText
                                 primary={status}
                                 primaryTypographyProps={{ fontSize: "12px" }}
                              />
                           </MenuItem>
                        ))}
                     </TextField>
                  </div>
                  <div className="locationSelect d-flex">
                     <TextField
                        hiddenLabel
                        size="small"
                        className="form-control1"
                        select
                        placeholder="Select Corporate(s)"
                        SelectProps={{
                           multiple: true,
                           displayEmpty: true,
                           renderValue: (selected) => {
                              const text = selected.length
                                 ? corporateList
                                    .filter((c) => selected.includes(c.corporateId))
                                    .map((c) => c.companyName)
                                    .join(", ")
                                 : "Select Corporate(s)";

                              return React.createElement(
                                 "span",
                                 { className: "select-ellipsis" },
                                 text
                              );
                           },
                        }}
                        value={selectedCorporate}
                        onChange={(e) => setSelectedCorporate(e.target.value)}
                        variant="outlined"
                        sx={{
                           width: "30%",

                           "&.MuiFormControl-root": {
                              margin: 0,
                              height: "fit-content",
                           },

                           "& .MuiFormHelperText-root": {
                              display: "none",
                           },
                           "& .MuiOutlinedInput-root": {
                              height: "30px",
                              padding: "0 8px",
                              borderRadius: "4px",
                              backgroundColor: "#F8F3F5",
                              fontSize: "12px",
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                              fontFamily: "inherit",
                              color: "#495057",
                              boxSizing: "border-box",
                              "& fieldset": {
                                 border: "1px solid #ced4da",
                              },
                           },
                           "& .MuiOutlinedInput-notchedOutline": {
                              border: "1px solid #ced4da",
                           },
                           "& .MuiSelect-select": {
                              padding: "0 !important",
                              height: "30px",
                              display: "flex",
                              alignItems: "center",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                           },

                           "& .MuiSelect-icon": {
                              top: "50%",
                              transform: "translateY(-50%)",
                           },

                           "& .select-ellipsis": {
                              display: "block",
                              maxWidth: "calc(100% - 24px)", // 👈 icon width
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                           },
                        }}
                     >
                        {corporateList.map((corporate, index) => (
                           <MenuItem key={index} value={corporate.corporateId} sx={{ height: 32 }}>
                              <Checkbox
                                 size="small"
                                 checked={selectedCorporate.includes(corporate.corporateId)}
                              />
                              <ListItemText
                                 primary={corporate.companyName}
                                 primaryTypographyProps={{ fontSize: "12px" }}
                              />
                           </MenuItem>
                        ))}
                     </TextField>{" "}
                     &nbsp;&nbsp;
                     <TextField
                        hiddenLabel
                        size="small"
                        className="form-control1"
                        select
                        placeholder="Select city(s)"
                        SelectProps={{
                           multiple: true,
                           displayEmpty: true,
                           renderValue: (selected) => {
                              const text = selected.length
                                 ? allCitiesWithId?.data
                                    .filter((c) => selected.includes(c.cityId))
                                    .map((c) => c.cityName)
                                    .join(", ")
                                 : "Select City(s)";
                              return React.createElement(
                                 "span",
                                 { className: "select-ellipsis" },
                                 text
                              );
                           },
                        }}
                        value={cityIdList}
                        onChange={(e) => setCityIdList(e.target.value)}
                        variant="outlined"
                        sx={{
                           width: "30%",

                           "&.MuiFormControl-root": {
                              margin: 0,
                              height: "fit-content",
                           },

                           "& .MuiFormHelperText-root": {
                              display: "none",
                           },
                           "& .MuiOutlinedInput-root": {
                              height: "30px",
                              padding: "0 8px",
                              borderRadius: "4px",
                              backgroundColor: "#F8F3F5",
                              fontSize: "12px",
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                              fontFamily: "inherit",
                              color: "#495057",
                              boxSizing: "border-box",
                              "& fieldset": {
                                 border: "1px solid #ced4da",
                              },
                           },
                           "& .MuiOutlinedInput-notchedOutline": {
                              border: "1px solid #ced4da",
                           },
                           "& .MuiSelect-select": {
                              padding: "0 !important",
                              height: "30px",
                              display: "flex",
                              alignItems: "center",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                           },

                           "& .MuiSelect-icon": {
                              top: "50%",
                              transform: "translateY(-50%)",
                           },

                           "& .select-ellipsis": {
                              display: "block",
                              maxWidth: "calc(100% - 24px)", // 👈 icon width
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                           },
                        }}
                     >
                        {allCitiesWithId?.data?.map((city, index) => (
                           <MenuItem key={index} value={city.cityId} sx={{ height: 32 }}>
                              <Checkbox size="small" checked={cityIdList.includes(city.cityId)} />
                              <ListItemText
                                 primary={city.cityName}
                                 primaryTypographyProps={{ fontSize: "12px" }}
                              />
                           </MenuItem>
                        ))}
                     </TextField>
                     <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                           as="select"
                           value={smartlockType}
                           onChange={(e) => {
                              setSmartlockType(e.target.value);
                           }}
                        >
                           <option value="">Select Type</option>
                           {smartlockTypeList?.length
                              ? smartlockTypeList.map((type) => (
                                 <option key={type} value={type}>
                                    {type}
                                 </option>
                              ))
                              : null}
                        </Form.Control>
                     </Form.Group>
                     <div className="ml-3">
                        <Buttons
                           name="Search"
                           varient="primary"
                           size="Small"
                           color="white"
                           style={{ height: "40px !important" }}
                           onClick={async () => {
                              getSmartlockDashboardList({
                                 deviceStatus: deviceStatus, // preconfig , install ,sold //
                                 corporateId: selectedCorporate, //
                                 cityIdList: cityIdList, //
                                 smartlockType: smartlockType, //
                                 propertyId: propertyIdText,
                                 smartlockId: smartlockIdText,
                                 pageNumber: 1,
                                 pageSize: rowsPerPage,
                                 orderByParam: orderByParam,
                                 orderBy: orderBy
                              });
                           }}
                        />
                     </div>
                  </div>
               </div>
               <Row className="g-3 mt-3">
                  <hr />
                  {mergedStatusCounts?.length > 0 ? (
                     <>
                        {mergedStatusCounts?.slice(1)?.map((item, index) => (
                           <Col md={3} key={item.status}>
                              <StatCard value={item.count} label={item.status} />
                           </Col>
                        ))}
                     </>
                  ) : null}
               </Row>
            </div>
            <div className="smartlockTableWrapper">
               <DataTableComponent
                  ref={tableRef}
                  data={smartlockList?.data?.list}
                  columns={smartlockColumns}
                  progressPending={smartlockList?.isLoading}
                  persistTableHead
                  paginationServer={true}
                  paginationComponent={PaginationComponent}
                  paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                  paginationPerPage={recordsPerPage}
                  currentPage={currentPage}
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handleRowsPerPageChange}
                  perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                  onSort={handleSortedData}
               ></DataTableComponent>
            </div>
         </div>
         <Modal
            show={confirmDeleteModalFlag}
            onHide={() => {
               setConfirmDeleteModalFlag(false);
            }}
            centered
         >
            <Modal.Body>
               <Buttons
                  style={{ float: "right" }}
                  name="X"
                  size="small"
                  varient="secondary"
                  onClick={() => {
                     setConfirmDeleteModalFlag(false);
                  }}
               ></Buttons>
               <Text
                  size="regular"
                  fontWeight="bold"
                  color="secondryColor"
                  className="text-center mt-3"
                  text={"Are you sure you want to delete this device?"}
               />

               <div className="d-flex justify-content-center mt-5 mb-3">
                  <Buttons
                     name="Cancel"
                     varient="disable"
                     type="button"
                     // size="xSmall"
                     color="black"
                     className="mr-3"
                     onClick={() => {
                        setConfirmDeleteModalFlag(false);
                     }}
                  />

                  <Buttons
                     name="Confirm"
                     varient="primary"
                     type="button"
                     // size="xSmall"
                     color="black"
                     className="mr-3"
                     onClick={() => {
                        handleDelete();
                     }}
                  />
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
};

const mapStateToProps = ({ allCitiesWithId, smartlockList }) => ({
   allCitiesWithId,
   smartlockList,
});

const actions = {
   getAllCityWithId,
   getSmartlockDashboardList,
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect)(SmartlockDashboard);
