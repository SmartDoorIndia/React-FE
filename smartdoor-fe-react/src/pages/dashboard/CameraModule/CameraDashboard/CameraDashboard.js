/** @format */

import React, { useCallback, useEffect, useRef, useState } from "react";
import CONSTANTS_STATUS from "../../../../common/helpers/ConstantsStatus";
import { showErrorToast, showSuccessToast, ToolTip } from "../../../../common/helpers/Utils";
import Text from "../../../../shared/Text/Text";
import "./CameraDashboard.scss";
import { Card, Col, Form, Row } from "react-bootstrap";
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Image from "../../../../shared/Image";
import contentIcon from "../../../../assets/images/content-ico.png";
import Buttons from "../../../../shared/Buttons/Buttons";
import {
   getAllCityWithId,
   getCameraDashboardList,
   getCameraTypes,
   getCorporateById,
   updateCameraStatus,
} from "../../../../common/redux/actions";
import Input from "../../../../shared/Inputs/Input/Input";
import { Checkbox, ListItemText, MenuItem, TextField } from "@mui/material";
import Pagination from "../../../../shared/DataTable/Pagination";
import { TableLoader } from "../../../../common/helpers/Loader";
import { compose } from "redux";
import { connect } from "react-redux";

const CameraDashboard = (props) => {
   const { allCitiesWithId, getAllCityWithId, cameraList, getCameraDashboardList } = props;
   const cameraStatus = CONSTANTS_STATUS.cameraStatus;
   const [deviceStatus, setDeviceStatus] = useState(cameraList?.data?.deviceStatus || []);
   const [propertyIdText, setPropertyIdText] = useState(cameraList?.data?.propertyId || "");
   const [cameraIdText, setCameraIdText] = useState(cameraList?.data?.cameraId || "");
   const [uuIdText, setUUIdText] = useState(cameraList?.data?.uuId || "");
   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
   const [corporateList, setCorporateList] = useState([]);
   const [selectedCorporate, setSelectedCorporate] = useState(cameraList?.data?.corporateId || []);
   const [cameraStats, setCameraStats] = useState(cameraList?.data?.statusCounts || []);
   const [cameraTypeList, setCameraTypeList] = useState([]);
   const [cameraType, setCameraType] = useState(cameraList?.data?.cameraType || "");
   const [cameraSubTypeList, setCameraSubTypeList] = useState([]);
   const [cameraSubType, setCameraSubType] = useState(cameraList?.data?.cameraSubType || "");
   const [cityIdList, setCityIdList] = useState(cameraList?.data?.cityIdList || []);
   const [cameraListReqDto, setCameraListReqDto] = useState({
      deviceStatus: deviceStatus, // preconfig , install ,sold //
      corporateId: selectedCorporate, //
      cityIdList: null, //
      cameraType: cameraType, //
      cameraSubType: cameraSubType,
      propertyId: propertyIdText,
      cameraId: cameraIdText,
      uuId: uuIdText,
      pageNumber: 1,
      pageSize: 8,
   });
   const tableRef = useRef();

   const cameraColumns = [
      {
         name: "Id",
         selector: (row) => row.cameraDeviceId,
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ cameraDeviceId }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={cameraDeviceId}>
               <Text size="Small" color="secondryColor elipsis-text" text={cameraDeviceId} />
            </ToolTip>
         ),
         id: 1,
      },
      {
         name: "UUId",
         selector: (row) => row.uuId,
         sortable: true,
         center: true,
         minWidth: "150px",
         cell: ({ uuId }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={uuId}>
               <Text size="Small" color="secondryColor elipsis-text" text={uuId} />
            </ToolTip>
         ),
         id: 2,
      },
      {
         name: "Type",
         selector: (row) => row.cameraType,
         sortable: true,
         center: true,
         minWidth: "150px",
         cell: ({ cameraType }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={cameraType}>
               <Text size="Small" color="secondryColor elipsis-text" text={cameraType} />
            </ToolTip>
         ),
         id: 3,
      },
      {
         name: "SubType",
         selector: (row) => row.cameraSubType,
         sortable: true,
         center: true,
         minWidth: "150px",
         cell: ({ cameraSubType }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={cameraSubType}>
               <Text size="Small" color="secondryColor elipsis-text" text={cameraSubType} />
            </ToolTip>
         ),
         id: 4,
      },
      {
         name: "Battery",
         selector: (row) => row.battery,
         sortable: true,
         center: true,
         maxWidth: "80px",
         cell: ({ battery }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={battery}>
               <Text
                  size="Small"
                  color="secondryColor elipsis-text"
                  text={battery ? battery + "%" : "-"}
               />
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
         id: 7,
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
         id: 8,
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
                           await updateCameraStatus({
                              cameraDeviceId: id,
                              status: "DEFECTIVE",
                           }).then((response) => {
                              if (response?.status === 200) {
                                 showSuccessToast("Camera marked as defective successfully...");
                                 getCameraDashboardList({
                                    deviceStatus: deviceStatus, // preconfig , install ,sold //
                                    corporateId: selectedCorporate, //
                                    cityIdList: cityIdList, //
                                    cameraType: cameraType, //
                                    cameraSubType: cameraSubType,
                                    propertyId: propertyIdText,
                                    cameraId: cameraIdText,
                                    uuId: uuIdText,
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
                           await updateCameraStatus({
                              cameraDeviceId: id,
                              status: "SOLD",
                           }).then((response) => {
                              if (response?.status === 200) {
                                 showSuccessToast("Camera marked as sold successfully...");
                                 getCameraDashboardList({
                                    deviceStatus: deviceStatus, // preconfig , install ,sold //
                                    corporateId: selectedCorporate, //
                                    cityIdList: cityIdList, //
                                    cameraType: cameraType, //
                                    cameraSubType: cameraSubType,
                                    propertyId: propertyIdText,
                                    cameraId: cameraIdText,
                                    uuId: uuIdText,
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

   const statusCounts = cameraList?.data?.statusCounts || [];

   const mergedStatusCounts = ALL_STATUSES.map((defaultStatus) => {
      const found = statusCounts.find((item) => item.status === defaultStatus.status);

      return found ? found : defaultStatus;
   });

   const ProgressComponent = <TableLoader />;
   const [currentPage, setCurrentPage] = useState(
      cameraList?.data?.length !== 0 ? cameraList?.data?.currentPage : 1
   );
   const [rowsPerPage, setRowsPerPage] = useState(
      cameraList?.data?.length !== 0 ? cameraList?.data?.rowsPerPage : 8
   );
   const recordSize =
      cameraList?.data?.statusCounts !== undefined ? cameraList?.data?.statusCounts[0]?.count : 0;
   console.log(cameraList?.data?.statusCounts);
   console.log(cameraList?.data);
   let recordsPerPage = 0;
   recordsPerPage = cameraList?.data?.rowsPerPage;

   const handlePageChange = (newPage) => {
      getCameraDashboardList({
         deviceStatus: deviceStatus, // preconfig , install ,sold //
         corporateId: selectedCorporate, //
         cityIdList: cityIdList, //
         cameraType: cameraType, //
         cameraSubType: cameraSubType,
         propertyId: propertyIdText,
         cameraId: cameraIdText,
         uuId: uuIdText,
         pageNumber: newPage,
         pageSize: rowsPerPage,
      });
   };

   const handleRowsPerPageChange = async (newRowsPerPage) => {
      getCameraDashboardList({
         deviceStatus: deviceStatus, // preconfig , install ,sold //
         corporateId: selectedCorporate, //
         cityIdList: cityIdList, //
         cameraType: cameraType, //
         cameraSubType: cameraSubType,
         propertyId: propertyIdText,
         cameraId: cameraIdText,
         uuId: uuIdText,
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
      getCameraTypes({})
         .then((response) => {
            setCameraTypeList(response.data.resourceData?.cameraTypes);
            setCameraSubTypeList(response.data.resourceData?.cameraSubTypes);
         })
         .catch((error) => {
            console.log(error);
         });
      getAllCityWithId({ smartdoorServiceStatus: true, stateId: null });
      getCorprateList();
      getCameraDashboardList({
         deviceStatus: deviceStatus, // preconfig , install ,sold //
         corporateId: selectedCorporate, //
         cityIdList: cityIdList, //
         cameraType: cameraType, //
         cameraSubType: cameraSubType,
         propertyId: propertyIdText,
         cameraId: cameraIdText,
         uuId: uuIdText,
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
         <Input
            id={"propertyId"}
            placeholder={"Property id"}
            type={"number"}
            value={propertyIdText}
            onInput={(e) => {
               setPropertyIdText(e.target.value);
               console.log(e);
            }}
            onClear={() => {
               handleClear();
            }}
            filterText={propertyIdText}
            showSearch={true}
            margin={50}
         />
      );
   }, [propertyIdText, resetPaginationToggle]);

   const cameraIdBox = React.useMemo(() => {
      const handleClear = () => {
         if (cameraIdText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setCameraIdText(null);
         }
      };

      return (
         <Input
            id={"cameraId"}
            placeholder={"Camera id"}
            type={"number"}
            value={cameraIdText}
            onInput={(e) => {
               setCameraIdText(e.target.value);
               console.log(e);
            }}
            onClear={() => {
               handleClear();
            }}
            filterText={cameraIdText}
            showSearch={true}
            margin={70}
         />
      );
   }, [cameraIdText, resetPaginationToggle]);

   const uuIdBox = React.useMemo(() => {
      const handleClear = () => {
         if (uuIdText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setCameraIdText(null);
         }
      };

      return (
         <Input
            id={"uuIdText"}
            placeholder={"UUID"}
            type={"text"}
            value={uuIdText}
            onInput={(e) => {
               setUUIdText(e.target.value);
               console.log(e);
            }}
            onClear={() => {
               handleClear();
            }}
            filterText={uuIdText}
            showSearch={true}
            margin={70}
         />
      );
   }, [uuIdText, resetPaginationToggle]);

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
         <div className="tableBox " style={{overflowX: 'hidden'}}>
            <div className="align-items-center tableHeading">
               <div className="justify-content-between">
                  <div className="locationSelect justify-content-end mb-2">
                     {propertyIdBox}
                     {cameraIdBox}
                     {uuIdBox}
                     {/* <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                           as="select"
                           value={deviceStatus}
                           onChange={(e) => {
                              setDeviceStatus(e.target.value);
                           }}
                        >
                           <option value="">Select Status</option>
                           {cameraStatus?.length
                              ? cameraStatus.map((status) => (
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
                           renderValue: (selected) =>
                              selected.length
                                 ? cameraStatus
                                      .filter((c) => selected.includes(c))
                                      .map((c) => c)
                                      .join(", ")
                                 : "Select Status(s)",
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
                        }}
                     >
                        {cameraStatus.map((status, index) => (
                           <MenuItem key={index} value={status} sx={{ height: 32 }}>
                              <Checkbox
                                 size="small"
                                 checked={deviceStatus.includes(status)}
                              />
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
                           renderValue: (selected) =>
                              selected.length
                                 ? corporateList
                                      .filter((c) => selected.includes(c.corporateId))
                                      .map((c) => c.companyName)
                                      .join(", ")
                                 : "Select Corporate(s)",
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
                           renderValue: (selected) =>
                              selected.length
                                 ? allCitiesWithId?.data
                                      .filter((c) => selected.includes(c.cityId))
                                      .map((c) => c.cityName)
                                      .join(", ")
                                 : "Select City(s)",
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
                           value={cameraType}
                           onChange={(e) => {
                              setCameraType(e.target.value);
                           }}
                        >
                           <option value="">Select Type</option>
                           {cameraTypeList?.length
                              ? cameraTypeList.map((type) => (
                                   <option key={type} value={type}>
                                      {type}
                                   </option>
                                ))
                              : null}
                        </Form.Control>
                     </Form.Group>
                     <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                           as="select"
                           value={cameraSubType}
                           onChange={(e) => {
                              setCameraSubType(e.target.value);
                           }}
                        >
                           <option value="">Select SubType</option>
                           {cameraSubTypeList[cameraType]?.length
                              ? cameraSubTypeList[cameraType]?.map((subType) => (
                                   <option key={subType} value={subType}>
                                      {subType}
                                   </option>
                                ))
                              : null}
                        </Form.Control>
                     </Form.Group>{" "}
                     <div className="ml-3">
                        <Buttons
                           name="Search"
                           varient="primary"
                           size="Small"
                           color="white"
                           style={{ height: "40px !important" }}
                           onClick={async () => {
                              getCameraDashboardList({
                                 deviceStatus: deviceStatus, // preconfig , install ,sold //
                                 corporateId: selectedCorporate, //
                                 cityIdList: cityIdList, //
                                 cameraType: cameraType, //
                                 cameraSubType: cameraSubType,
                                 propertyId: propertyIdText,
                                 cameraId: cameraIdText,
                                 uuId: uuIdText,
                                 pageNumber: currentPage,
                                 pageSize: rowsPerPage,
                              });
                           }}
                        />
                     </div>
                  </div>
               </div>
               <Row className="g-3 mt-3">
                  <hr/>
                  {cameraList?.data?.statusCounts?.length > 0 ? (
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
            <div className="cameraTableWrapper">
               <DataTableComponent
                  ref={tableRef}
                  data={cameraList?.data?.list}
                  columns={cameraColumns}
                  progressPending={cameraList?.isLoading}
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

const mapStateToProps = ({ allCitiesWithId, cameraList }) => ({ allCitiesWithId, cameraList });

const actions = {
   getAllCityWithId,
   getCameraDashboardList,
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect)(CameraDashboard);
