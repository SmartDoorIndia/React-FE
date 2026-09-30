/** @format */

import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import DataTableComponent from "../../../../shared/DataTable/DataTable";
import Text from "../../../../shared/Text/Text";
import SearchInput from "../../../../shared/Inputs/SearchInput/SearchInput";
import { ToolTip } from "../../../../common/helpers/Utils";
import { getCameraMediaStats } from "../../../../common/redux/actions";
import "./CameraMediaDashboard.scss";

const StatCard = ({ value, label, color = "#BE1452" }) => (
   <Card className="stat-card h-100">
      <Card.Body className="text-center p-3">
         <Text
            text={value ?? 0}
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

const CameraMediaDashboard = (props) => {
   const { cameraMediaStats, getCameraMediaStats } = props;
   const [cameraIdText, setCameraIdText] = useState("");
   const [propertyIdText, setPropertyIdText] = useState("");
   const history = useHistory();

   const fetchStats = (filters = {}) => {
      getCameraMediaStats({
         cameraId: filters.cameraId || undefined,
         propertyId: filters.propertyId || undefined,
      });
   };

   useEffect(() => {
      fetchStats();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const stats = cameraMediaStats?.data || {};
   const cameras = stats?.cameras || [];

   const columns = [
      {
         name: "Camera Id",
         selector: (row) => row.cameraDeviceId,
         sortable: true,
         center: true,
         id: 1,
      },
      {
         name: "UUID",
         selector: (row) => row.uuId,
         sortable: true,
         center: true,
         cell: ({ uuId }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={uuId}>
               <Text size="Small" color="secondryColor elipsis-text" text={uuId} />
            </ToolTip>
         ),
         id: 2,
      },
      {
         name: "Property",
         selector: (row) => row.propertyAddress,
         sortable: false,
         center: true,
         cell: ({ propertyAddress, propertyId }) => (
            <Text size="Small" color="secondryColor" text={propertyAddress || propertyId || "-"} />
         ),
         id: 3,
      },
      {
         name: "Total Captured",
         selector: (row) => row.totalCount,
         sortable: true,
         center: true,
         id: 4,
      },
      {
         name: "Segregated",
         selector: (row) => row.segregatedCount,
         sortable: true,
         center: true,
         id: 5,
      },
      {
         name: "Pending Queue",
         selector: (row) => row.pendingCount,
         sortable: true,
         center: true,
         cell: ({ pendingCount }) => (
            <Text
               size="Small"
               text={pendingCount}
               style={pendingCount > 0 ? { color: "#BE1452", fontWeight: "700" } : {}}
            />
         ),
         id: 6,
      },
   ];

   return (
      <div className="dashboard">
         <div className="tableBox cameraMediaTableWrapper" style={{ overflowX: "hidden" }}>
            <div className="align-items-center tableHeading">
               <div className="locationSelect justify-content-end mb-2">
                  <SearchInput
                     id={"cameraIdText"}
                     placeholder={"Search Camera Id"}
                     textType={"text"}
                     value={cameraIdText}
                     onFilter={(e) => setCameraIdText(e.target.value)}
                     onClear={() => setCameraIdText("")}
                     filterText={cameraIdText}
                  />
                  <SearchInput
                     id={"propertyIdText"}
                     placeholder={"Search Property Id"}
                     textType={"text"}
                     value={propertyIdText}
                     onFilter={(e) => setPropertyIdText(e.target.value)}
                     onClear={() => setPropertyIdText("")}
                     filterText={propertyIdText}
                  />
                  <div
                     className="ml-3"
                     style={{ cursor: "pointer", color: "#BE1452", fontWeight: 600, alignSelf: "center" }}
                     onClick={() => fetchStats({ cameraId: cameraIdText, propertyId: propertyIdText })}
                  >
                     Search
                  </div>
               </div>
            </div>

            <Row className="g-3 mt-1 mb-3 px-3">
               <Col md={2}>
                  <StatCard value={stats.totalImagesCaptured} label="Total Captured" />
               </Col>
               <Col md={2}>
                  <StatCard value={stats.totalSegregated} label="Segregated" color="#2E7D32" />
               </Col>
               <Col md={2}>
                  <StatCard value={stats.totalPendingQueue} label="Pending Queue" color="#BE1452" />
               </Col>
               <Col md={3}>
                  <StatCard value={stats.camerasWithQueuedData} label="Cameras With Queue" color="#BE1452" />
               </Col>
               <Col md={3}>
                  <StatCard value={stats.camerasWithoutQueuedData} label="Cameras Without Queue" color="#2E7D32" />
               </Col>
            </Row>

            <div className="cameraMediaDashboardTableWrapper">
               <DataTableComponent
                  data={cameras}
                  columns={columns}
                  progressPending={cameraMediaStats?.isLoading}
                  pagination
                  paginationPerPage={10}
                  paginationRowsPerPageOptions={[10, 20, 30, 50]}
                  onRowClicked={(row) => history.push("/admin/camera-media-dashboard/" + row.cameraDeviceId)}
                  pointerOnHover
                  highlightOnHover
               />
            </div>
         </div>
      </div>
   );
};

const mapStateToProps = ({ cameraMediaStats }) => ({ cameraMediaStats });
const actions = { getCameraMediaStats };
const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect)(CameraMediaDashboard);
