/** @format */

import React, { useEffect, useState } from "react";
import {
   fetchCameraStats,
   fetchSmartLockStats,
   getCameraTypes,
   getDeviceIdList,
   getDeviceToken,
   restoreOrDeleteDevice,
   updateCameraStatus,
   updateSmartlockStatus,
} from "../../../common/redux/actions";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import { showErrorToast, showSuccessToast, ToolTip } from "../../../common/helpers/Utils";
import Text from "../../../shared/Text/Text";
import "./PreconfigDevices.scss";
import Buttons from "../../../shared/Buttons/Buttons";
import { Card, Row, Col, Modal, Form } from "react-bootstrap";
import QrModal from "../../../shared/Modal/QrModal/QrModal";
import ReactPlayer from "react-player";

const PreconfiguredDevices = () => {
   const [cameraList, setCameraList] = useState([]);
   const [smartlockList, setSmartlockList] = useState([]);
   const [smartlockStats, setSmartlockStats] = useState({});
   const [cameraStats, setCameraStats] = useState({});
   const [loading, setLoading] = useState(false);
   const [showQrModal, setShowQrModal] = useState(false);
   const [qrData, setQrData] = useState({});
   const [selectedCamera, setSelectedCamera] = useState(null);
   const [livestreamURL, setLivestreamURL] = useState("");
   const [showLiveStream, setShowLiveStream] = useState(false);
   const [cameraTypeList, setCameraTypeList] = useState([]);
   const [selectedCameraType, setSelectedCameraType] = useState([]);
   const [confirmDeleteModalFlag, setConfirmDeleteModalFlag] = useState(false);
   const [selectedDevice, setSelectedDevice] = useState({
      deviceType: "",
      deviceId: null,
      actionType: "Delete",
   })
   let liveStremUrl = "";

   const qrGenerator = (slData) => {
      console.log(slData, "slData for qr");
      const data = {
         // accessToken: slData.accessToken,
         // lockId: slData.lockId,
         // lockmac: slData.lockmac,
         encryptedId: slData.encryptedId,
         propertyId: slData.propertyId,
      };
      setQrData(data, () => {
         console.log(qrData, "QR data");
      });
      setShowQrModal(true);
   };

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
            <ToolTip position="top" style={{ width: "100%" }} name={cameraDeviceId || "-"}>
               <Text className="elipsis-text" text={cameraDeviceId || "-"} />
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
            <ToolTip position="top" style={{ width: "100%" }} name={uuId || "-"}>
               <Text className="elipsis-text" text={uuId || "-"} />
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
            <ToolTip position="top" style={{ width: "100%" }} name={type || "-"}>
               <Text className="elipsis-text" text={type || "-"} />
            </ToolTip>
         ),
         id: 3,
      },
      {
         name: "SUB TYPE",
         selector: (row) => row.subType,
         sortable: false,
         center: true,
         width: "180px",
         cell: ({ subType }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={subType || "-"}>
               <Text className="elipsis-text" text={subType || "-"} />
            </ToolTip>
         ),
         id: 4,
      },
      {
         name: "STATUS",
         selector: (row) => row.status,
         sortable: false,
         center: true,
         width: "180px",
         cell: ({ status }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={status || "-"}>
               <Text className="elipsis-text" text={status || "-"} />
            </ToolTip>
         ),
         id: 5,
      },
      {
         name: "ACCOUNT EMAIL",
         selector: (row) => row.accountEmail,
         sortable: false,
         center: true,
         width: "250px",
         cell: ({ accountEmail }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={accountEmail || "-"}>
               <Text className="elipsis-text" text={accountEmail || "-"} />
            </ToolTip>
         ),
         id: 6,
      },
      {
         name: "ACTIONS",
         sortable: false,
         center: true,
         width: "400px",
         cell: ({ cameraDeviceId, type, status }) => (
            <>
               <Buttons name="Delete" variant="outline-danger" size="xSmall" onClick={() => {
                  setSelectedDevice({deviceType: 'Camera', deviceId: cameraDeviceId, actionType: 'Delete'});
                  setConfirmDeleteModalFlag(true)
               }} />{" "}
               &nbsp;&nbsp;
               {status === "PRECONFIGURED_DEVICE" ? (
                  <>
                     <Buttons
                        name="Mark as Defective"
                        variant="outline-danger"
                        size="xSmall"
                        onClick={async () => {
                           await updateCameraStatus({
                              cameraDeviceId: cameraDeviceId,
                              status: "DEFECTIVE",
                           }).then((response) => {
                              if (response?.status === 200) {
                                 showSuccessToast("Camera marked as defective successfully...");
                                 fetchDeviceIdList();
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
                              cameraDeviceId: cameraDeviceId,
                              status: "SOLD",
                           }).then((response) => {
                              if (response?.status === 200) {
                                 showSuccessToast("Camera marked as sold successfully...");
                                 fetchDeviceIdList();
                              } else {
                                 showErrorToast(response?.data?.message);
                              }
                           });
                        }}
                     />
                  </>
               ) : null}
               {/* <Buttons
                  name="View LiveStream"
                  varient="primary"
                  size="xSmall"
                  onClick={async () => {
                     // setLoading(true);
                     const response = await getDeviceToken({
                        sns: selectedCamera?.uuId,
                        status: "open",
                     });
                     // setLoading(false);
                     if (response.status === 200) {
                        liveStremUrl = response.data.resourceData.liveStreamUrl;
                        setLivestreamURL(response.data.resourceData.liveStreamUrl);
                        setShowLiveStream(true);
                     } else {
                        showErrorToast("Camera is offline");
                     }
                  }}
               ></Buttons> */}
            </>
         ),
         id: 7,
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
            <ToolTip position="top" style={{ width: "100%" }} name={id || "-"}>
               <Text className="elipsis-text" text={id || "-"} />
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
            <ToolTip position="top" style={{ width: "100%" }} name={lockId || "-"}>
               <Text className="elipsis-text" text={lockId || "-"} />
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
            <ToolTip position="top" style={{ width: "100%" }} name={smartlockAdminPasscode || "-"}>
               <Text className="elipsis-text" text={smartlockAdminPasscode || "-"} />
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
            <ToolTip position="top" style={{ width: "100%" }} name={lockmac || "-"}>
               <Text className="elipsis-text" text={lockmac || "-"} />
            </ToolTip>
         ),
         id: 4,
      },
      {
         name: "LOCK TYPE",
         selector: (row) => row.smartlockType,
         sortable: false,
         center: true,
         width: "180px",
         cell: ({ smartlockType }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={smartlockType || "-"}>
               <Text className="elipsis-text" text={smartlockType || "-"} />
            </ToolTip>
         ),
         id: 5,
      },
      {
         name: "STATUS",
         selector: (row) => row.status,
         sortable: false,
         center: true,
         width: "240px",
         cell: ({ status }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={status || "-"}>
               <Text className="elipsis-text" text={status || "-"} />
            </ToolTip>
         ),
         id: 6,
      },
      {
         name: "ACTIONS",
         sortable: false,
         center: true,
         width: "480px",
         cell: ({ id, lockId, encryptedId, status }) => (
            <div className="d-flex">
               <Buttons
                  name="Delete"
                  variant="outline-danger"
                  onClick={() => {
                     // if (window.confirm(`Are you sure you want to delete smartlock ${lockId}?`)) {
                     // }
                     // restoreOrDeleteDevice({
                     //    deviceType: "Smartlock",
                     //    deviceId: id,
                     //    actionType: "Delete",
                     // }).then((response) => {
                     //    if (response?.status === 200) {
                     //       showSuccessToast("Smartlock deleted successfully");
                     //       fetchDeviceIdList();
                     //    }
                     // });
                     setSelectedDevice({deviceType: 'Smartlock', deviceId: id, actionType: 'Delete'});
                     setConfirmDeleteModalFlag(true)
                  }}
               />{" "}
               &nbsp;&nbsp;
               <Buttons
                  name="PrintQR"
                  variant="outline-danger"
                  onClick={() => {
                     const data = {
                        encLockDeviceId: encryptedId,
                     };
                     setQrData(data, () => {
                        console.log(qrData, "QR data");
                     });
                     setShowQrModal(true);
                  }}
               />
               &nbsp;&nbsp;
               {status === "PRECONFIGURED_DEVICE" ? (
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
                                 fetchDeviceIdList();
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
                                 fetchDeviceIdList();
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
         id: 7,
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
      getCameraTypes({})
         .then((response) => {
            setCameraTypeList(response.data.resourceData);
         })
         .catch((error) => {
            console.log(error);
         });
      fetchDeviceIdList();
      getSmartlockStats();
      getCameraStats();
   }, []);

   const handleDelete = () => {
      restoreOrDeleteDevice({
         deviceType: selectedDevice.deviceType,
         deviceId: selectedDevice.deviceId,
         actionType: selectedDevice.actionType,
      }).then((response) => {
         if (response?.status === 200) {
            showSuccessToast(selectedDevice.deviceType + " deleted successfully");
            fetchDeviceIdList();
         }
      });
   };

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
         <div className="preconfigured-devices">
            {/* SmartLock Section */}
            <section className="device-section mb-5">
               <div className="section-header mb-4">
                  <Text
                     size="large"
                     fontWeight="bold"
                     color="primary"
                     text="SmartLock Management"
                     className="section-title px-2"
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
                     <StatCard
                        value={smartlockStats?.readyToInstallCount}
                        label="Ready To Install"
                     />
                  </Col>
               </Row>

               {/* SmartLock Table */}
               <Card className="table-card">
                  <Card.Header className="table-header">
                     <Text
                        size="regular"
                        fontWeight="semibold"
                        color="dark"
                        text="SmartLock List"
                     />
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
                     className="section-title px-2"
                  />
               </div>

               {/* Camera Stats */}
               <Row className="g-3 mb-4">
                  <Col md={4}>
                     <StatCard value={cameraStats?.installedCount} label="Installed" />
                  </Col>
                  <Col md={4}>
                     <StatCard
                        value={cameraStats?.sdInstalledCount}
                        label="Installed By SmartDoor"
                     />
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
                        {/* <Form.Group>
                           <Form.Control
                              as="select"
                              onChange={(e) => {
                                 setSelectedCameraType(e.target.value);
                              }}
                              value={selectedCameraType}
                           >
                              <option value="">Select Camera</option>
                              {cameraTypeList.length > 0
                                 ? cameraTypeList?.map((camera) => (
                                      <option key={camera} value={camera}>
                                         {camera}
                                      </option>
                                   ))
                                 : null}
                           </Form.Control>
                        </Form.Group> */}
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
         <QrModal
            show={showQrModal}
            qrData={qrData}
            handleClose={() => {
               setShowQrModal(false);
            }}
            headerText="QR Code"
         />
         <Modal
            show={showLiveStream}
            onHide={() => {
               setShowLiveStream(false);
            }}
            centered
            backdrop="static"
         >
            <Modal.Header>
               <Buttons
                  style={{ float: "right" }}
                  name="X"
                  varient="secondary"
                  onClick={async () => {
                     setSelectedCamera(null);
                     const response = await getDeviceToken({
                        sns: selectedCamera?.uuId,
                        status: "close",
                     });
                     setLivestreamURL(null);
                  }}
               ></Buttons>
            </Modal.Header>
            <Modal.Body>
               {selectedCamera !== null ? (
                  <>
                     {liveStremUrl !== null ? (
                        <>
                           <div className="d-flex justify-content-center mt-2">
                              <ReactPlayer
                                 url={livestreamURL}
                                 controls={true}
                                 muted={false}
                                 playing={true}
                                 width="80%"
                                 height="80%"
                                 style={{
                                    position: "relative",
                                    top: 0,
                                    left: 0,
                                    borderRadius: "4px",
                                 }}
                              />
                           </div>
                        </>
                     ) : null}
                  </>
               ) : null}
            </Modal.Body>
         </Modal>

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

export default PreconfiguredDevices;
