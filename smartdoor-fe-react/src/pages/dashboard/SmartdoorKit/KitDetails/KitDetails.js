/** @format */

import React, { memo, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import {
   assignDeviceToKit,
   deleteKitByKitId,
   fetchKitById,
   getCorporateById,
   getDeviceIdList,
   getDeviceToken,
   restoreOrDeleteDevice,
   transferKit,
} from "../../../../common/redux/actions";
import { Card, Col, Modal, Row } from "react-bootstrap";
import Text from "../../../../shared/Text/Text";
import { FallBackLoader } from "../../../../common/helpers/Loader";
import Buttons from "../../../../shared/Buttons/Buttons";
import { MenuItem, TextField } from "@mui/material";
import { connect, useDispatch } from "react-redux";
import { compose } from "redux";
import * as Actions from "../../../../common/redux/types";
import downArrow from "../../../../assets/images/arrow-down.png";
import upArrow from "../../../../assets/images/up-arrow.png";
import KitHistory from "../KitHistory/KitHistory";
import { showErrorToast, showSuccessToast } from "../../../../common/helpers/Utils";
import ReactPlayer from "react-player";

const KitDetails = (props) => {
   const { allKitList } = props;
   const [kitDetails, setKitDetails] = useState({});
   const [smartLockList, setSmartLockList] = useState([]);
   const [cameraDeviceIdList, setCameraDeviceIdList] = useState([]);
   const [loading, setLoading] = useState(false);
   const location = useLocation();
   const corporateId = location?.state?.corporateId;
   const kitId = location?.state?.kitId;
   const [corporateDetails, setCorporateDetails] = useState({});
   const [destCorporateId, setDestCorporateId] = useState(null);
   const [corporateList, setCorporateList] = useState([]);
   const [transferKitModalFlag, setTransferKitModalFlag] = useState(false);
   const [viewKitHistoryFlag, setViewKitHistoryFlag] = useState(false);
   const [addCameraFlag, setAddCameraFlag] = useState(false);
   const [cameraList, setCameraList] = useState([]);
   const [smartlockList, setSmartlockList] = useState([]);
   const [selectedCamera, setSelectedCamera] = useState(null);
   const [livestreamURL, setLivestreamURL] = useState("");
   let liveStremUrl = "";
   const dispatch = useDispatch();
   const history = useHistory();

   const getCorprateDetails = async (detailsFlag) => {
      await getCorporateById({
         corporateId: detailsFlag ? corporateId : 0,
         pageNo: 1,
         pageSize: 8,
      }).then((response) => {
         if (detailsFlag) {
            setCorporateDetails(response?.data?.resourceData[0]);
         } else {
            setCorporateList([...response?.data?.resourceData]);
         }
      });
   };

   const fetchKitDetails = () => {
      fetchKitById({ kitId: kitId, pageNumber: 1, pageSize: 8 }).then((response) => {
         if (response.data.resourceData?.length === 0) {
            setKitDetails({ kitId: kitId, kitStatus: "DELETED" });
         } else {
            setKitDetails(response.data.resourceData[0]);
         }
      });
   };

   useEffect(() => {
      fetchKitDetails();
      getCorprateDetails(false);
   }, []);

   const fetchDeviceIdListByKitId = () => {
      setLoading(true);
      getDeviceIdList({ kitId: kitId }).then((response) => {
         setLoading(false);
         setSmartLockList([...response.data.resourceData.smartlockList]);
         setCameraDeviceIdList([...response.data.resourceData.cameraList]);
      });
   };

   useEffect(() => {
      console.log(props);
      fetchDeviceIdListByKitId();
   }, []);

   const fetchDeviceIdList = () => {
      getDeviceIdList({ kitId: 0 }).then((response) => {
         if (response?.status === 200) {
            setSmartlockList([...response.data.resourceData?.smartlockList]);
            setCameraList([...response.data.resourceData.cameraList]);
         }
      });
   };

   useEffect(() => {
      fetchDeviceIdList();
   }, []);

   const transferKitById = async () => {
      await transferKit({ kitId: kitId, corporateId: destCorporateId }).then((response) => {
         setDestCorporateId(null);
         setTransferKitModalFlag(false);
         if (response?.status === 200) {
            fetchKitDetails();
            let reduxData = { ...allKitList?.data };
            reduxData.autoRefresh = true;
            dispatch({ type: Actions.KIT_LIST_SUCCESS, data: reduxData });
         } else {
         }
      });
   };

   return (
      <>
         {loading ? <FallBackLoader /> : null}

         {kitDetails?.kitStatus !== "DELETED" ? (
            <Card className="mb-2">
               <Card.Body>
                  <div className="d-flex justify-content-between">
                     <div className="d-flex align-items-center">
                        <Text
                           text="Do you want to delete this kit permanently?"
                           style={{ fontSize: "16px", fontWeight: "600" }}
                        />{" "}
                        &nbsp;&nbsp;
                     </div>
                     <div>
                        <Buttons
                           name="Delete Kit"
                           onClick={() => {
                              deleteKitByKitId({ kitId: kitId }).then((response) => {
                                 if (response?.status === 200) {
                                    history.push(-1);
                                 }
                              });
                           }}
                        />
                     </div>
                  </div>
               </Card.Body>
            </Card>
         ) : null}
         <Card>
            <Card.Body>
               <div className="d-flex justify-content-between">
                  <div>
                     <div className="d-flex align-items-center">
                        <Text
                           text="Corporate Assigned:"
                           style={{ fontSize: "16px", fontWeight: "600" }}
                        />{" "}
                        &nbsp;&nbsp;
                        <Text
                           text={kitDetails?.corporateName || "-"}
                           style={{ fontSize: "16px", fontWeight: "500" }}
                        />
                     </div>
                     <div className="d-flex">
                        <Text
                           text="Note: Kit can be assigned to corporate only when it is "
                           style={{ fontSize: "13px", fontWeight: "500" }}
                        />{" "}
                        &nbsp;
                        <Text
                           text="Ready To Install"
                           style={{ fontSize: "13px", fontWeight: "700" }}
                        />
                     </div>
                  </div>
                  <div>
                     {kitDetails?.kitStatus === "READY_TO_INSTALL" ? (
                        <Buttons
                           name="Assign another corporate"
                           onClick={() => {
                              setTransferKitModalFlag(true);
                           }}
                        />
                     ) : null}
                  </div>
               </div>
            </Card.Body>
         </Card>
         <Text
            className="mt-2"
            text={"SmartLock"}
            style={{ fontSize: "16px", fontWeight: "600" }}
         />
         {smartLockList.map((smartlock) => (
            <>
               <Card>
                  <Card.Body>
                     <Row style={{ overflow: "hidden" }}>
                        <Col lg={4}>
                           <Text text="Id" style={{ fontSize: "13px", fontWeight: "600" }} />
                           <Text
                              text={smartlock.id || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col>
                        <Col lg={4}>
                           <Text text="Lock Id" style={{ fontSize: "13px", fontWeight: "600" }} />
                           <Text
                              text={smartlock.lockId || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col>
                        <Col lg={4} className="mt-3">
                           <Text
                              text="Admin Passcode"
                              style={{ fontSize: "13px", fontWeight: "600" }}
                           />
                           <Text
                              text={smartlock.smartlockAdminPasscode || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col>
                        <Col lg={4} className="mt-3">
                           <Text
                              text="Property Id"
                              style={{ fontSize: "13px", fontWeight: "600" }}
                           />
                           <Text
                              text={smartlock.propertyId || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col>
                        <Col lg={4} className="mt-3">
                           <Text text="Lockmac" style={{ fontSize: "13px", fontWeight: "600" }} />
                           <Text
                              text={smartlock.lockmac || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col>
                     </Row>
                  </Card.Body>
               </Card>
            </>
         ))}

         <hr />
         <div className="d-flex justify-content-between mb-2">
            <Text text={"Camera List"} style={{ fontSize: "16px", fontWeight: "600" }} />
            <Buttons
               className="mr-2"
               name="Add Camera"
               onClick={() => {
                  setAddCameraFlag(true);
               }}
            />
         </div>
         {cameraDeviceIdList.map((camera) => (
            <>
               <Card>
                  <Card.Body>
                     <Row style={{ overflow: "hidden" }}>
                        <Col lg={4}>
                           <Text
                              text="Camera Device Id"
                              style={{ fontSize: "13px", fontWeight: "600" }}
                           />
                           <Text
                              text={camera.cameraDeviceId || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col>
                        <Col lg={4}>
                           <Text text="UUId" style={{ fontSize: "13px", fontWeight: "600" }} />
                           <Text
                              text={camera.uuId || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col>
                        <Col lg={4}>
                           <Text text="Type" style={{ fontSize: "13px", fontWeight: "600" }} />
                           <Text
                              text={camera.type || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col>
                        <Col lg={4} className="mt-3">
                           <Text
                              text="Account Email"
                              style={{ fontSize: "13px", fontWeight: "600" }}
                           />
                           <Text
                              text={camera.accountEmail || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col>
                        <Col lg={4} className="mt-3">
                           <Text
                              text="Property Id"
                              style={{ fontSize: "13px", fontWeight: "600" }}
                           />
                           <Text
                              text={camera.propertyId || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col>
                        <Col lg={4} className="mt-3">
                           <Text text="Nickname" style={{ fontSize: "13px", fontWeight: "600" }} />
                           <Text
                              text={camera.nickName || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col>
                     </Row>
                     <div className="d-flex justify-content-end mt-1">
                        <Buttons
                           name="Delete"
                           onClick={() => {
                              restoreOrDeleteDevice({
                                 deviceType: "Camera",
                                 deviceId: camera?.cameraDeviceId,
                                 actionType: "Delete",
                              }).then((response) => {
                                 if (response?.status === 200) {
                                    showSuccessToast("Camera deleted successfully...");
                                    fetchDeviceIdListByKitId();
                                 }
                              });
                           }}
                        />{" "}
                        &nbsp;&nbsp;
                        <Buttons
                           name="Return to SD Inventory"
                           onClick={() => {
                              restoreOrDeleteDevice({
                                 deviceType: "Camera",
                                 deviceId: camera?.cameraDeviceId,
                                 actionType: "Restore",
                              }).then((response) => {
                                 if (response?.status === 200) {
                                    showSuccessToast(
                                       "Camera returned to Smartdoor inventory successfully..."
                                    );
                                    fetchDeviceIdListByKitId();
                                 }
                              });
                           }}
                        />
                     </div>
                  </Card.Body>
               </Card>
               <hr />
            </>
         ))}
         <div
            className="d-flex w-auto"
            style={{ cursor: "pointer", width: "fit-content" }}
            onClick={() => {
               setViewKitHistoryFlag(!viewKitHistoryFlag);
            }}
         >
            <Text
               text="View Kit History"
               style={{ fontSize: "16px", fontWeight: "600", color: "#BE1452" }}
            />{" "}
            &nbsp;&nbsp;
            <img
               className="mt-1"
               src={viewKitHistoryFlag ? upArrow : downArrow}
               alt=""
               style={{ height: "16px", width: "16px" }}
            />
         </div>
         {viewKitHistoryFlag ? <KitHistory kitId={kitId} /> : null}
         <Modal
            size="md"
            show={transferKitModalFlag}
            onHide={() => {
               setTransferKitModalFlag(false);
            }}
            centered
            backdrop="static"
         >
            <Modal.Header style={{ justifyContent: "end" }}>
               <Buttons
                  style={{ float: "right" }}
                  name="X"
                  varient="secondary"
                  onClick={() => {
                     setTransferKitModalFlag(false);
                  }}
               ></Buttons>
            </Modal.Header>
            <Modal.Body>
               <TextField
                  className="textfieldInput w-100 mt-1"
                  select
                  multiple={false}
                  value={destCorporateId}
                  label="Select Corporate"
                  onChange={(e) => {
                     console.log(e.target.value);
                     setDestCorporateId(e.target.value);
                  }}
                  style={{ minHeight: "50vh" }}
               >
                  {corporateList.map((corporate, index) => (
                     <MenuItem key={corporate?.corporateId} value={corporate?.corporateId}>
                        {corporate?.companyName}
                     </MenuItem>
                  ))}
               </TextField>
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: "center" }}>
               <Buttons
                  name="Transfer Kit"
                  onClick={() => {
                     transferKitById();
                  }}
               />
            </Modal.Footer>
         </Modal>

         <Modal
            show={addCameraFlag}
            onHide={() => {
               setAddCameraFlag(false);
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
                     setAddCameraFlag(false);
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
               <TextField
                  className="textfieldInput w-100 mt-1"
                  select
                  multiple={false}
                  value={selectedCamera}
                  label="Select Camera DeviceId"
                  onChange={async (e) => {
                     if (selectedCamera !== null) {
                        const response = await getDeviceToken({
                           sns: selectedCamera?.uuId,
                           status: "close",
                        });
                        await setLivestreamURL(null);
                     }
                     console.log(e.target.value);
                     setSelectedCamera(e.target.value);
                  }}
                  style={{ minHeight: "25vh" }}
               >
                  {cameraList.map((camera) => (
                     <MenuItem key={camera?.cameraDeviceId} value={camera}>
                        {camera?.cameraDeviceId}
                     </MenuItem>
                  ))}
               </TextField>

               {selectedCamera !== null ? (
                  <>
                     <div className="text-center">
                        <Buttons
                           name="View LiveStream"
                           varient="primary"
                           size="xSmall"
                           onClick={async () => {
                              setLoading(true);
                              const response = await getDeviceToken({
                                 sns: selectedCamera?.uuId,
                                 status: "open",
                              });
                              setLoading(false);
                              if (response.status === 200) {
                                 liveStremUrl = response.data.resourceData.liveStreamUrl;
                                 setLivestreamURL(response.data.resourceData.liveStreamUrl);
                              } else {
                                 showErrorToast("Camera is offline");
                              }
                           }}
                        ></Buttons>
                     </div>
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
            <Modal.Footer style={{ justifyContent: "center" }}>
               <Buttons
                  name="Assign Device to Kit"
                  onClick={async () => {
                     const response = await getDeviceToken({
                        sns: selectedCamera?.uuId,
                        status: "close",
                     });
                     assignDeviceToKit({
                        deviceType: "Camera",
                        kitId: kitId,
                        deviceId: selectedCamera?.cameraDeviceId,
                     }).then((response) => {
                        if (response?.status === 200) {
                           showSuccessToast("Device added successfully...");
                           fetchDeviceIdListByKitId();
                           setAddCameraFlag(false);
                           setSelectedCamera("");
                        }
                     });
                  }}
               />
            </Modal.Footer>
         </Modal>
      </>
   );
};

const mapStateToProps = ({ allKitList }) => ({ allKitList });
const actions = {};
const withConnect = connect(mapStateToProps, actions);
export default compose(withConnect, memo)(KitDetails);
