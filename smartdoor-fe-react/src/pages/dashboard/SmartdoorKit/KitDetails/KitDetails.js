/** @format */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getDeviceIdList } from "../../../../common/redux/actions";
import { Card, Col, Row } from "react-bootstrap";
import Text from "../../../../shared/Text/Text";
import { FallBackLoader } from "../../../../common/helpers/Loader";

const KitDetails = () => {
   const [smartLockList, setSmartLockList] = useState([]);
   const [cameraDeviceIdList, setCameraDeviceIdList] = useState([]);
   const [loading, setLoading] = useState(false);
   const location = useLocation();

   useEffect(() => {
      console.log(location?.state);
      setLoading(true);
      getDeviceIdList({ kitId: location?.state?.kitId }).then((response) => {
         setLoading(false);
         console.log(response);
         setSmartLockList([...response.data.resourceData.smartlockList]);
         setCameraDeviceIdList([...response.data.resourceData.cameraList]);
      });
   }, []);
   return (
      <>
         {loading ? <FallBackLoader /> : null}
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
                        <Col lg={4}>
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
                           <Text text="Client Id" style={{ fontSize: "13px", fontWeight: "600" }} />
                           <Text
                              text={smartlock.clientId || "-"}
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
                        <Col lg={4} className="mt-3">
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
                        </Col>
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
                           <Text text="UUId" style={{ fontSize: "13px", fontWeight: "600" }} />
                           <Text
                              text={camera.uuid || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col>
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
                        <Col lg={4} className="mt-3">
                           <Text text="Username" style={{ fontSize: "13px", fontWeight: "600" }} />
                           <Text
                              text={camera.username || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col>
                        <Col lg={4} className="mt-3">
                           <Text text="Password" style={{ fontSize: "13px", fontWeight: "600" }} />
                           <Text
                              text={camera.password || "-"}
                              style={{ fontSize: "13px", fontWeight: "500" }}
                           />
                        </Col>
                     </Row>
                  </Card.Body>
               </Card>
            </>
         ))}
      </>
   );
};

export default KitDetails;
