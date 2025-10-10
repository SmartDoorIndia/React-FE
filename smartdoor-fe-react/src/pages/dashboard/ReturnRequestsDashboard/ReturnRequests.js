/** @format */

import React, { useEffect, useState } from "react";
import Text from "../../../shared/Text/Text";
import {
   acceptRejectReturnRequest,
   fetchReturnRequests,
   getDeviceIdList,
   getKitDevices,
} from "../../../common/redux/actions";
import {
   formateDate,
   handleStatusElement,
   showSuccessToast,
   ToolTip,
} from "../../../common/helpers/Utils";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import "./ReturnRequests.scss";
import Buttons from "../../../shared/Buttons/Buttons";
import { Card, Col, Modal, Row } from "react-bootstrap";
import Image from "../../../shared/Image/Image";
import contentIcon from "../../../assets/images/content-ico.png";
import { TableLoader } from "../../../common/helpers/Loader";

const ReturnRequests = () => {
   const [returnReqList, setReturnReqList] = useState([]);
   const [viewKitDetails, setViewKitDetails] = useState(false);
   const [smartlockList, setSmartlockList] = useState([]);
   const [cameraList, setCameraList] = useState([]);
   const [selectedRequest, setSelectedRequest] = useState(null);
   const [loading, setLoading] = useState(false);

   const fetchDeviceIdList = (kitId) => {
      setLoading(true)
      getDeviceIdList({ kitId: kitId }).then((response) => {
         setLoading(false)
         if (response?.status === 200) {
            setSmartlockList([...response.data.resourceData?.smartlockList]);
            setCameraList([...response.data.resourceData.cameraList]);
         }
      });
   };

   const returnReqColumns = [
      {
         name: "REQUEST ID",
         selector: (row) => row.requestId,
         sortable: true,
         center: true,
         width: "150px",
         minWidth: "150px",
         maxWidth: "150px",
         cell: ({ requestId }) => (
            <div className="column-content">
               <ToolTip position="top" name={requestId}>
                  <Text
                     size="16px"
                     color="secondaryColor"
                     className="elipsis-text"
                     text={requestId}
                  />
               </ToolTip>
            </div>
         ),
         id: 1,
      },
      {
         name: "KIT ID",
         selector: (row) => row.kitId,
         sortable: true,
         center: true,
         width: "100px",
         minWidth: "80px",
         maxWidth: "120px",
         cell: ({ kitId }) => (
            <div className="column-content">
               <ToolTip position="top" name={kitId}>
                  <Text size="16px" color="secondaryColor" className="elipsis-text" text={kitId} />
               </ToolTip>
            </div>
         ),
         id: 2,
      },
      {
         name: "RETURN REQUEST DATE",
         selector: (row) => row.returnReqDate,
         sortable: true,
         center: true,
         width: "180px",
         minWidth: "160px",
         maxWidth: "200px",
         cell: ({ returnReqDate }) => (
            <div className="column-content">
               <ToolTip position="top" name={returnReqDate}>
                  <Text
                     size="16px"
                     color="secondaryColor"
                     className="elipsis-text"
                     text={formateDate(returnReqDate)}
                  />
               </ToolTip>
            </div>
         ),
         id: 3,
      },
      {
         name: "REQUEST BY MOBILE",
         selector: (row) => row.reqByMobile,
         sortable: true,
         center: true,
         width: "160px",
         minWidth: "140px",
         maxWidth: "180px",
         cell: ({ reqByMobile }) => (
            <div className="column-content">
               <ToolTip position="top" name={reqByMobile}>
                  <Text
                     size="16px"
                     color="secondaryColor"
                     className="elipsis-text"
                     text={reqByMobile}
                  />
               </ToolTip>
            </div>
         ),
         id: 4,
      },
      {
         name: "CORPORATE",
         selector: (row) => row.corporateName,
         sortable: true,
         center: false,
         width: "200px",
         minWidth: "180px",
         maxWidth: "220px",
         cell: ({ corporateName }) => (
            <div className="column-content">
               <ToolTip position="top" name={corporateName}>
                  <Text
                     size="16px"
                     color="secondaryColor"
                     className="elipsis-text"
                     text={corporateName}
                  />
               </ToolTip>
            </div>
         ),
         id: 5,
      },
      {
         name: "STATUS",
         selector: (row) => row.reqStatus,
         sortable: false,
         center: true,
         width: "140px",
         minWidth: "120px",
         maxWidth: "160px",
         cell: ({ reqStatus }) => (
            <div className="column-content">
               <ToolTip position="top" name={reqStatus}>
                  <Text
                     size="16px"
                     color="secondaryColor"
                     className="elipsis-text"
                     text={handleStatusElement(reqStatus)}
                  />
               </ToolTip>
            </div>
         ),
         id: 6,
      },
      {
         name: "ACTIONS",
         sortable: false,
         center: true,
         width: "120px",
         minWidth: "100px",
         maxWidth: "140px",
         cell: (row) => (
            <div className="column-content">
               <ToolTip
                  position="left"
                  name={row.kitId !== null ? "View Details" : "Kit not present"}
               >
                  <span className="action-icon">
                     <Image
                        name="viewIcon"
                        src={contentIcon}
                        onClick={() => {
                           if (row?.kitId !== null) {
                              setSelectedRequest(row);
                              setViewKitDetails(true);
                              fetchDeviceIdList(row?.kitId);
                           }
                        }}
                     />
                  </span>
               </ToolTip>
            </div>
         ),
         id: 7,
      },
   ];

   const ProgressComponent = <TableLoader />;

   const getReturnRequests = () => {
      setLoading(true);
      fetchReturnRequests({
         status: "",
         corporateId: null,
      }).then((response) => {
         setLoading(false);
         if (response?.status === 200) {
            setReturnReqList(response?.data?.resourceData);
         }
      });
   };

   useEffect(() => {
      getReturnRequests();
   }, []);

   const acceptRejectRequest = (actionType, requestId) => {
      setLoading(true);
      acceptRejectReturnRequest({ actionType: actionType, requestId: requestId }).then(
         (response) => {
            setLoading(false);
            if (response?.status === 200) {
               showSuccessToast(
                  actionType === "Accept"
                     ? "Request accepted successfully"
                     : "Request rejected successfully"
               );
               setViewKitDetails(false);
               getReturnRequests();
            }
         }
      );
   };

   return (
      <div className="return-requests">
         {/* Main Table Section */}
         <section className="device-section">
            {/* Return Requests Table */}
            <Card className="table-card">
               <Card.Header className="table-header">
                  <Text
                     size="regular"
                     fontWeight="semibold"
                     color="dark"
                     text="Return Requests List"
                  />
                  <div className="table-actions">
                     <Buttons
                        name="Refresh"
                        variant="outline-primary"
                        size="sm"
                        onClick={getReturnRequests}
                        disabled={loading}
                     />
                  </div>
               </Card.Header>
               <Card.Body className="p-0">
                  <div className="table-container data-table">
                     <DataTableComponent
                        columns={returnReqColumns}
                        data={returnReqList}
                        progressPending={loading}
                        progressComponent={ProgressComponent}
                        paginationServer={false}
                        persistTableHead
                        noDataComponent={
                           <div className="text-center py-4">
                              <Text text="No return requests found" color="muted" />
                           </div>
                        }
                     />
                  </div>
               </Card.Body>
            </Card>
         </section>

         {/* Kit Details Modal */}
         <Modal
            show={viewKitDetails}
            onHide={() => setViewKitDetails(false)}
            centered
            backdrop="static"
            size="lg"
            className="kit-details-modal"
         >
            <Modal.Header className="modal-header-custom">
               <div className="d-flex justify-content-between align-items-center w-100">
                  <Text
                     text="Kit Details"
                     style={{ fontSize: "18px", fontWeight: "600", color: "#333" }}
                  />
                  <Buttons
                     name="X"
                     variant="outline-secondary"
                     size="sm"
                     onClick={() => {
                        setViewKitDetails(false);
                        setSelectedRequest(null);
                        setSmartlockList([]);
                        setCameraList([]);
                     }}
                     style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                     }}
                  />
               </div>
            </Modal.Header>

            <Modal.Body className="modal-body-custom">
               {loading ? (
                  <TableLoader />
               ) : (
                  <>
                     {smartlockList.length > 0 && (
                        <>
                           <Text
                              className="mb-3"
                              text="SmartLock Devices"
                              style={{ fontSize: "16px", fontWeight: "600", color: "#333" }}
                           />
                           {smartlockList.map((smartlock, index) => (
                              <Card key={index} className="mb-3 device-card">
                                 <Card.Body>
                                    <Row>
                                       <Col lg={4} className="mb-2">
                                          <Text
                                             text="Lock Id"
                                             style={{
                                                fontSize: "12px",
                                                fontWeight: "600",
                                                color: "#6c757d",
                                             }}
                                          />
                                          <Text
                                             text={smartlock.lockId || "-"}
                                             style={{
                                                fontSize: "14px",
                                                fontWeight: "500",
                                                color: "#333",
                                             }}
                                          />
                                       </Col>
                                       <Col lg={4} className="mb-2">
                                          <Text
                                             text="Admin Passcode"
                                             style={{
                                                fontSize: "12px",
                                                fontWeight: "600",
                                                color: "#6c757d",
                                             }}
                                          />
                                          <Text
                                             text={smartlock.smartlockAdminPasscode || "-"}
                                             style={{
                                                fontSize: "14px",
                                                fontWeight: "500",
                                                color: "#333",
                                             }}
                                          />
                                       </Col>
                                       <Col lg={4} className="mb-2">
                                          <Text
                                             text="Property Id"
                                             style={{
                                                fontSize: "12px",
                                                fontWeight: "600",
                                                color: "#6c757d",
                                             }}
                                          />
                                          <Text
                                             text={smartlock.propertyId || "-"}
                                             style={{
                                                fontSize: "14px",
                                                fontWeight: "500",
                                                color: "#333",
                                             }}
                                          />
                                       </Col>
                                       <Col lg={4} className="mb-2">
                                          <Text
                                             text="Lockmac"
                                             style={{
                                                fontSize: "12px",
                                                fontWeight: "600",
                                                color: "#6c757d",
                                             }}
                                          />
                                          <Text
                                             text={smartlock.lockmac || "-"}
                                             style={{
                                                fontSize: "14px",
                                                fontWeight: "500",
                                                color: "#333",
                                             }}
                                          />
                                       </Col>
                                    </Row>
                                 </Card.Body>
                              </Card>
                           ))}
                           <hr className="my-4" />
                        </>
                     )}

                     {/* Camera Section */}
                     {cameraList.length > 0 && (
                        <>
                           <div className="d-flex justify-content-between align-items-center mb-3">
                              <Text
                                 text="Camera Devices"
                                 style={{ fontSize: "16px", fontWeight: "600", color: "#333" }}
                              />
                           </div>
                           {cameraList.map((camera, index) => (
                              <React.Fragment key={index}>
                                 <Card className="mb-3 device-card">
                                    <Card.Body>
                                       <Row>
                                          <Col lg={4} className="mb-2">
                                             <Text
                                                text="Camera Device Id"
                                                style={{
                                                   fontSize: "12px",
                                                   fontWeight: "600",
                                                   color: "#6c757d",
                                                }}
                                             />
                                             <Text
                                                text={camera.cameraDeviceId || "-"}
                                                style={{
                                                   fontSize: "14px",
                                                   fontWeight: "500",
                                                   color: "#333",
                                                }}
                                             />
                                          </Col>
                                          <Col lg={4} className="mb-2">
                                             <Text
                                                text="UUID"
                                                style={{
                                                   fontSize: "12px",
                                                   fontWeight: "600",
                                                   color: "#6c757d",
                                                }}
                                             />
                                             <Text
                                                text={camera.uuId || "-"}
                                                style={{
                                                   fontSize: "14px",
                                                   fontWeight: "500",
                                                   color: "#333",
                                                }}
                                             />
                                          </Col>
                                          <Col lg={4} className="mb-2">
                                             <Text
                                                text="Type"
                                                style={{
                                                   fontSize: "12px",
                                                   fontWeight: "600",
                                                   color: "#6c757d",
                                                }}
                                             />
                                             <Text
                                                text={camera.type || "-"}
                                                style={{
                                                   fontSize: "14px",
                                                   fontWeight: "500",
                                                   color: "#333",
                                                }}
                                             />
                                          </Col>
                                          <Col lg={4} className="mb-2">
                                             <Text
                                                text="Account Email"
                                                style={{
                                                   fontSize: "12px",
                                                   fontWeight: "600",
                                                   color: "#6c757d",
                                                }}
                                             />
                                             <Text
                                                text={camera.accountEmail || "-"}
                                                style={{
                                                   fontSize: "14px",
                                                   fontWeight: "500",
                                                   color: "#333",
                                                }}
                                             />
                                          </Col>
                                          <Col lg={4} className="mb-2">
                                             <Text
                                                text="Property Id"
                                                style={{
                                                   fontSize: "12px",
                                                   fontWeight: "600",
                                                   color: "#6c757d",
                                                }}
                                             />
                                             <Text
                                                text={camera.propertyId || "-"}
                                                style={{
                                                   fontSize: "14px",
                                                   fontWeight: "500",
                                                   color: "#333",
                                                }}
                                             />
                                          </Col>
                                          <Col lg={4} className="mb-2">
                                             <Text
                                                text="Nickname"
                                                style={{
                                                   fontSize: "12px",
                                                   fontWeight: "600",
                                                   color: "#6c757d",
                                                }}
                                             />
                                             <Text
                                                text={camera.nickName || "-"}
                                                style={{
                                                   fontSize: "14px",
                                                   fontWeight: "500",
                                                   color: "#333",
                                                }}
                                             />
                                          </Col>
                                       </Row>
                                    </Card.Body>
                                 </Card>
                                 {index < cameraList.length - 1 && <hr className="my-3" />}
                              </React.Fragment>
                           ))}
                        </>
                     )}
                     {smartlockList.length === 0 && cameraList.length === 0 && (
                        <div className="text-center py-4">
                           <Text text="No devices found in this kit" color="muted" />
                        </div>
                     )}
                  </>
               )}

            </Modal.Body>
            {selectedRequest?.reqStatus === "INITIATED" ?
               <Modal.Footer className="modal-footer-custom">
                  <div className="d-flex gap-3">
                     <Buttons
                        name="Accept Request"
                        variant="success"
                        onClick={() => acceptRejectRequest("Accept", selectedRequest?.requestId)}
                        disabled={loading}
                     />{" "}
                     &nbsp;&nbsp;
                     <Buttons
                        name="Reject Request"
                        variant="outline-danger"
                        onClick={() => acceptRejectRequest("Reject", selectedRequest?.requestId)}
                        disabled={loading}
                     />
                  </div>
               </Modal.Footer>
               : null
            }
         </Modal>
      </div>
   );
};

export default ReturnRequests;
