/** @format */

import React, { useEffect, useRef, useState } from "react";
import CONSTANTS_STATUS from "../../../common/helpers/ConstantsStatus";
import { showErrorToast, showSuccessToast, ToolTip } from "../../../common/helpers/Utils";
import Text from "../../../shared/Text/Text";
import Image from "../../../shared/Image";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { TableLoader } from "../../../common/helpers/Loader";
import Pagination from "../../../shared/DataTable/Pagination";
import {
   getAllCityWithId,
   getCorporateById,
   getSmartlockDashboardList,
   updateCameraStatus,
   updateSmartlockStatus,
} from "../../../common/redux/actions";
import Input from "../../../shared/Inputs/Input/Input";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Checkbox, ListItemText, MenuItem, TextField } from "@mui/material";
import { connect } from "react-redux";
import { compose } from "redux";
import Buttons from "../../../shared/Buttons/Buttons";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import contentIcon from "../../../assets/images/content-ico.png";
import "./SmartlockDashboard.scss";
import SearchInput from "../../../shared/Inputs/SearchInput/SearchInput";

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
   const smartlockTypeList = CONSTANTS_STATUS.smartlockType;
   const [smartlockType, setSmartlockType] = useState(smartlockList?.data?.smartlockType || "");
   const [cityIdList, setCityIdList] = useState(smartlockList?.data?.cityIdList || []);
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
   const tableRef = useRef();

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
                  text={batteryPercentage ? batteryPercentage + "%" : "-"}
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
         maxWidth: "120px",
         cell: ({ propertyId }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={propertyId}>
               <Text size="Small" color="secondryColor elipsis-text" text={propertyId} />
            </ToolTip>
         ),
         id: 7,
      },
      {
         name: "Action",
         sortable: false,
         center: true,
         minWidth: "340px",
         cell: ({ id, status }) => (
            <div className="action">
               {/* <ToolTip position="left" name="View Details">
                  <span>
                     <Link
                        to={{
                           pathname: "/admin/",
                           state: {},
                        }}
                     >
                        <Image name="editIcon" src={contentIcon} />
                     </Link>
                  </span>
               </ToolTip>
               &nbsp;&nbsp; */}
               {status !== "DEFECTIVE" && status !== "SOLD" ? (
                  <>
                     <Buttons
                        name="Mark as Defective"
                        variant="outline-danger"
                        size="xSmall"
                        onClick={async () => {
                           await updateSmartlockStatus({
                              lockId: id,
                              status: "DEFECTIVE",
                           }).then((response) => {
                              if (response?.status === 200) {
                                 showSuccessToast("Smartlock marked as defective successfully...");
                                 getSmartlockDashboardList({
                                    deviceStatus: deviceStatus, // preconfig , install ,sold //
                                    corporateId: selectedCorporate, //
                                    cityIdList: cityIdList, //
                                    smartlockType: smartlockType, //
                                    propertyId: propertyIdText,
                                    smartlockId: smartlockIdText,
                                    pageNumber: currentPage,
                                    pageSize: rowsPerPage,
                                 });
                              } else {
                                 showErrorToast(response?.data?.message);
                              }
                           });
                        }}
                     />
                     &nbsp;&nbsp;
                     <Buttons
                        name="Mark as Sold"
                        variant="outline-danger"
                        size="xSmall"
                        onClick={async () => {
                           await updateSmartlockStatus({
                              lockId: id,
                              status: "SOLD",
                           }).then((response) => {
                              if (response?.status === 200) {
                                 showSuccessToast("Smartlock marked as sold successfully...");
                                 getSmartlockDashboardList({
                                    deviceStatus: deviceStatus, // preconfig , install ,sold //
                                    corporateId: selectedCorporate, //
                                    cityIdList: cityIdList, //
                                    smartlockType: smartlockType, //
                                    propertyId: propertyIdText,
                                    smartlockId: smartlockIdText,
                                    pageNumber: currentPage,
                                    pageSize: rowsPerPage,
                                 });
                              } else {
                                 showErrorToast(response?.data?.message);
                              }
                           });
                        }}
                     />
                  </>
               ) : null}
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
      getSmartlockDashboardList({
         deviceStatus: deviceStatus, // preconfig , install ,sold //
         corporateId: selectedCorporate, //
         cityIdList: cityIdList, //
         smartlockType: smartlockType, //
         propertyId: propertyIdText,
         smartlockId: smartlockIdText,
         pageNumber: currentPage,
         pageSize: rowsPerPage,
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

   return (
      <>
         <div className="tableBox " style={{ overflowX: "hidden" }}>
            <div className="align-items-center tableHeading">
               <div className="justify-content-between">
                  <div className="locationSelect justify-content-end mb-2">
                     {propertyIdBox}
                     {smartlockIdBox}
                     {/* <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                           as="select"
                           value={deviceStatus}
                           onChange={(e) => {
                              setDeviceStatus(e.target.value);
                           }}
                        >
                           <option value="">Select Status</option>
                           {smartlockStatus?.length
                              ? smartlockStatus.map((status) => (
                                   <option key={status} value={status}>
                                      {status}
                                   </option>
                                ))
                              : null}
                        </Form.Control>
                     </Form.Group> */}
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
               ></DataTableComponent>
            </div>
         </div>
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
