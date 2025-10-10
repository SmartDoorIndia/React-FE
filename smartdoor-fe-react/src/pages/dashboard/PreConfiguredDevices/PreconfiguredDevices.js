/** @format */

import React, { useEffect, useState } from "react";
import {
   fetchCameraStats,
   fetchSmartLockStats,
   getDeviceIdList,
   restoreOrDeleteDevice,
} from "../../../common/redux/actions";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import { showSuccessToast, ToolTip } from "../../../common/helpers/Utils";
import Text from "../../../shared/Text/Text";
import "./PreconfigDevices.scss";
import Buttons from "../../../shared/Buttons/Buttons";
import { Card, Row, Col } from "react-bootstrap";

const PreconfiguredDevices = () => {
   const [cameraList, setCameraList] = useState([]);
   const [smartlockList, setSmartlockList] = useState([]);
   const [smartlockStats, setSmartlockStats] = useState({});
   const [cameraStats, setCameraStats] = useState({});
   const [loading, setLoading] = useState(false);

   const cameraColumns = [
      {
         name: "DEVICE ID",
         selector: (row) => row.uuId,
         sortable: true,
         center: false,
         width: "120px", // Increased width
         minWidth: "120px",
         maxWidth: "120px",
         cell: ({ cameraDeviceId }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={cameraDeviceId}>
               <Text className="elipsis-text" text={cameraDeviceId} />
            </ToolTip>
         ),
         id: 1,
      },
      {
         name: "ID",
         selector: (row) => row.uuId,
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ uuId }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={uuId}>
               <Text className="elipsis-text" text={uuId} />
            </ToolTip>
         ),
         id: 2,
      },
      {
         name: "CAMERA TYPE",
         selector: (row) => row.type,
         sortable: false,
         center: true,
         width: "150px",
         cell: ({ type }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={type}>
               <Text className="elipsis-text" text={type} />
            </ToolTip>
         ),
         id: 3,
      },
      {
         name: "ACTIONS",
         sortable: false,
         center: true,
         width: "120px",
         cell: ({ cameraDeviceId, type }) => (
            <Buttons
               name="Delete"
               variant="outline-danger"
               onClick={() => {
                  if (window.confirm(`Are you sure you want to delete ${type} camera?`)) {
                     restoreOrDeleteDevice({
                        deviceType: "Camera",
                        deviceId: cameraDeviceId,
                        actionType: "Delete",
                     }).then((response) => {
                        if (response?.status === 200) {
                           showSuccessToast("Camera deleted successfully");
                           fetchDeviceIdList();
                        }
                     });
                  }
               }}
            />
         ),
         id: 4,
      },
   ];

   const smartlockColumns = [
      {
         name: "ID",
         selector: (row) => row.id,
         sortable: true,
         center: true,
         width: "120px",
         cell: ({ id }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={id}>
               <Text className="elipsis-text" text={id} />
            </ToolTip>
         ),
         id: 1,
      },
      {
         name: "LOCK ID",
         selector: (row) => row.lockId,
         sortable: false,
         center: true,
         width: "150px",
         cell: ({ lockId }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={lockId}>
               <Text className="elipsis-text" text={lockId} />
            </ToolTip>
         ),
         id: 2,
      },
      {
         name: "ADMIN PASSCODE",
         selector: (row) => row.smartlockAdminPasscode,
         sortable: false,
         center: true,
         width: "160px",
         cell: ({ smartlockAdminPasscode }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={smartlockAdminPasscode}>
               <Text className="elipsis-text" text={smartlockAdminPasscode} />
            </ToolTip>
         ),
         id: 3,
      },
      {
         name: "LOCK MAC",
         selector: (row) => row.lockmac,
         sortable: false,
         center: true,
         width: "200px",
         cell: ({ lockmac }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={lockmac}>
               <Text className="elipsis-text" text={lockmac} />
            </ToolTip>
         ),
         id: 4,
      },
      {
         name: "ACTIONS",
         sortable: false,
         center: true,
         width: "120px",
         cell: ({ id, lockId }) => (
            <Buttons
               name="Delete"
               variant="outline-danger"
               onClick={() => {
                  if (window.confirm(`Are you sure you want to delete smartlock ${lockId}?`)) {
                     restoreOrDeleteDevice({
                        deviceType: "Smartlock",
                        deviceId: id,
                        actionType: "Delete",
                     }).then((response) => {
                        if (response?.status === 200) {
                           showSuccessToast("Smartlock deleted successfully");
                           fetchDeviceIdList();
                        }
                     });
                  }
               }}
            />
         ),
         id: 5,
      },
   ];

   const fetchDeviceIdList = () => {
      setLoading(true);
      getDeviceIdList({ kitId: 0 }).then((response) => {
         if (response?.status === 200) {
            setSmartlockList([...response.data.resourceData?.smartlockList]);
            setCameraList([...response.data.resourceData.cameraList]);
         }
         setLoading(false);
      });
   };

   const getSmartlockStats = () => {
      fetchSmartLockStats().then((response) => {
         if (response?.status === 200) {
            setSmartlockStats(response?.data?.resourceData);
         }
      });
   };

   const getCameraStats = () => {
      fetchCameraStats().then((response) => {
         if (response?.status === 200) {
            setCameraStats(response?.data?.resourceData);
         }
      });
   };

   useEffect(() => {
      fetchDeviceIdList();
      getSmartlockStats();
      getCameraStats();
   }, []);

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
      <div className="preconfigured-devices">
         {/* SmartLock Section */}
         <section className="device-section mb-5">
            <div className="section-header mb-4">
               <Text
                  size="large"
                  fontWeight="bold"
                  color="primary"
                  text="SmartLock Management"
                  className="section-title"
               />
            </div>

            {/* SmartLock Stats */}
            <Row className="g-3 mb-4">
               <Col md={4}>
                  <StatCard value={smartlockStats?.installedCount} label="Installed" />
               </Col>
               <Col md={4}>
                  <StatCard
                     value={smartlockStats?.sdInstalledCount}
                     label="Installed By SmartDoor"
                  />
               </Col>
               <Col md={4}>
                  <StatCard value={smartlockStats?.readyToInstallCount} label="Ready To Install" />
               </Col>
            </Row>

            {/* SmartLock Table */}
            <Card className="table-card">
               <Card.Header className="table-header">
                  <Text size="regular" fontWeight="semibold" color="dark" text="SmartLock List" />
                  <div className="table-actions">
                     <Buttons
                        name="Refresh"
                        variant="outline-primary"
                        size="sm"
                        onClick={fetchDeviceIdList}
                        disabled={loading}
                     />
                  </div>
               </Card.Header>
               <Card.Body className="p-0">
                  <div className="table-container data-table">
                     <DataTableComponent
                        columns={smartlockColumns}
                        data={smartlockList}
                        paginationServer={false}
                        persistTableHead
                        progressPending={loading}
                        noDataComponent={
                           <div className="text-center py-4">
                              <Text text="No smartlocks found" color="muted" />
                           </div>
                        }
                     />
                  </div>
               </Card.Body>
            </Card>
         </section>

         {/* Camera Section */}
         <section className="device-section">
            <div className="section-header mb-4">
               <Text
                  size="large"
                  fontWeight="bold"
                  color="primary"
                  text="Camera Management"
                  className="section-title"
               />
            </div>

            {/* Camera Stats */}
            <Row className="g-3 mb-4">
               <Col md={4}>
                  <StatCard value={cameraStats?.installedCount} label="Installed" />
               </Col>
               <Col md={4}>
                  <StatCard value={cameraStats?.sdInstalledCount} label="Installed By SmartDoor" />
               </Col>
               <Col md={4}>
                  <StatCard value={cameraStats?.readyToInstallCount} label="Ready To Install" />
               </Col>
            </Row>

            {/* Camera Table */}
            <Card className="table-card">
               <Card.Header className="table-header">
                  <Text size="regular" fontWeight="semibold" color="dark" text="Camera List" />
                  <div className="table-actions">
                     <Buttons
                        name="Refresh"
                        variant="outline-primary"
                        size="sm"
                        onClick={fetchDeviceIdList}
                        disabled={loading}
                     />
                  </div>
               </Card.Header>
               <Card.Body className="p-0">
                  <div className="table-container data-table">
                     <DataTableComponent
                        data={cameraList}
                        columns={cameraColumns}
                        paginationServer={false}
                        persistTableHead={true}
                        progressPending={loading}
                        noDataComponent={
                           <div className="text-center py-4">
                              <Text text="No cameras found" color="muted" />
                           </div>
                        }
                     />
                  </div>
               </Card.Body>
            </Card>
         </section>
      </div>
   );
};

export default PreconfiguredDevices;
