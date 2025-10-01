/** @format */

import React, { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import {
   fetchKitById,
   getCorporateById,
   getDeviceIdList,
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
   const dispatch = useDispatch();

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
         setKitDetails(response.data.resourceData[0]);
      });
   };

   useEffect(() => {
      fetchKitDetails();
      getCorprateDetails(false);
   }, []);

   useEffect(() => {
      console.log(props);
      setLoading(true);
      getDeviceIdList({ kitId: kitId }).then((response) => {
         setLoading(false);
         setSmartLockList([...response.data.resourceData.smartlockList]);
         setCameraDeviceIdList([...response.data.resourceData.cameraList]);
      });
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

         <Card>
            <Card.Body>
               <div className="d-flex justify-content-between">
                  <div className="d-flex">
                     <Text
                        text="Corporate Assigned:"
                        style={{ fontSize: "16px", fontWeight: "600" }}
                     />{" "}
                     &nbsp;&nbsp;
                     <Text
                        text={kitDetails?.corporateName}
                        style={{ fontSize: "16px", fontWeight: "500" }}
                     />
                  </div>
                  <div>
                     <Buttons
                        name="Assign another corporate"
                        onClick={() => {
                           setTransferKitModalFlag(true);
                        }}
                     />
                  </div>
               </div>
            </Card.Body>
         </Card>
         <Text text={"SmartLock"} style={{ fontSize: "16px", fontWeight: "600" }} />
         {smartLockList.map((smartlock) => (
            <>
               <Card>
                  <Card.Body>
                     <Row style={{ overflow: "hidden" }}>
                        <Col lg={4}>
                           <Text text="Lock Id" style={{ fontSize: "13px", fontWeight: "600" }} />
                           <Text
                              text={smartlock.lockId || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col>
                        {/* <Col lg={4}>
                           <Text
                              text="Access Token"
                              style={{ fontSize: "13px", fontWeight: "600" }}
                           />
                           <Text
                              text={smartlock.accessToken || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col>
                        <Col lg={4}>
                           <Text
                              text="Refresh Token"
                              style={{ fontSize: "13px", fontWeight: "600" }}
                           />
                           <Text
                              text={smartlock.refreshToken || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col> */}
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
                        {/* <Col lg={4} className="mt-3">
                           <Text text="Client Id" style={{ fontSize: "13px", fontWeight: "600" }} />
                           <Text
                              text={smartlock.clientId || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col> */}
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
                        {/* <Col lg={4} className="mt-3">
                           <Text text="Lock Data" style={{ fontSize: "13px", fontWeight: "600" }} />
                           <Text
                              text={smartlock.lockData || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col>
                        <Col lg={4} className="mt-3">
                           <Text text="Username" style={{ fontSize: "13px", fontWeight: "600" }} />
                           <Text
                              text={smartlock.username || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col>
                        <Col lg={4} className="mt-3">
                           <Text text="Password" style={{ fontSize: "13px", fontWeight: "600" }} />
                           <Text
                              text={smartlock.password || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col>
                        <Col lg={4} className="mt-3">
                           <Text text="Installed" style={{ fontSize: "13px", fontWeight: "600" }} />
                           <Text
                              text={smartlock.smartlockInstalled || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col> */}
                     </Row>
                  </Card.Body>
               </Card>
            </>
         ))}

         <hr />
         <Text text={"Camera List"} style={{ fontSize: "16px", fontWeight: "600" }} />
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
                        {/* <Col lg={4} className="mt-3">
                           <Text
                              text="Account Password"
                              style={{ fontSize: "13px", fontWeight: "600" }}
                           />
                           <Text
                              text={camera.accountPassword || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col> */}
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
                        {/* <Col lg={4} className="mt-3">
                           <Text text="Username" style={{ fontSize: "13px", fontWeight: "600" }} />
                           <Text
                              text={camera.username || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col> */}
                        {/* <Col lg={4} className="mt-3">
                           <Text text="Password" style={{ fontSize: "13px", fontWeight: "600" }} />
                           <Text
                              text={camera.password || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col> */}
                     </Row>
                  </Card.Body>
               </Card>
               <hr />
               <div className="d-flex w-auto" style={{cursor: 'pointer', width: 'fit-content'}} onClick={() => {setViewKitHistoryFlag(!viewKitHistoryFlag)}}>
                  <Text
                     text="View Kit History"
                     style={{ fontSize: "16px", fontWeight: "600", color: "#BE1452" }}
                  /> &nbsp;&nbsp;
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
                        className="textfieldInput w-100"
                        select
                        multiple={false}
                        value={destCorporateId}
                        label="Select Corporate"
                        onChange={(e) => {
                           console.log(e.target.value);
                           setDestCorporateId(e.target.value);
                        }}
                        style={{ minHeight: "50vh", overflow: "auto" }}
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
                        name="Transfer"
                        onClick={() => {
                           transferKitById();
                        }}
                     />
                  </Modal.Footer>
               </Modal>
            </>
         ))}
      </>
   );
};

const mapStateToProps = ({ allKitList }) => ({ allKitList });
const actions = {};
const withConnect = connect(mapStateToProps, actions);
export default compose(withConnect, memo)(KitDetails);
