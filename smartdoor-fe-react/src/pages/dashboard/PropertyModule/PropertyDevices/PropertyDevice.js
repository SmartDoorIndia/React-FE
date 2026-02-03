/** @format */

import { useEffect, useState, useCallback, useRef } from "react";
import { connect } from "react-redux";
import {
   assignDeviceToProperty,
   getSmartLockData,
   getContactSensor,
   getCameraDevice,
   editCameraData,
   getCameraTypes,
   setCallBackUrl,
   getDeviceToken,
   deleteCamera,
   getAccountEmailDetails,
   getDeviceIdList,
   restoreOrDeleteDevice,
   updateCameraStatus,
} from "../../../../common/redux/actions";
import { showErrorToast, showSuccessToast } from "../../../../common/helpers/Utils";
import Text from "../../../../shared/Text/Text";
import Buttons from "../../../../shared/Buttons/Buttons";
import ListingDataTable from "../../../../shared/DataTable/ListingDataTable";
import { Divider, MenuItem, TextField } from "@mui/material";
import TextArea from "../../../../shared/Inputs/TextArea/TextArea";
import { Modal } from "react-bootstrap";
import { validateCameraData } from "../../../../common/validations";
import Loader from "../../../../common/helpers/Loader";
import cameraServicesApi from "../../../../common/services/cameraServices";
import { ReactFlvPlayer } from "react-flv-player";
import ReactPlayer from "react-player";
import VisitMedia from "../VisitRecordings/VisitMedia";
import IntrusionMedia from "../Intrusions/IntrusionMedia";

const PropertyDevice = (props) => {
   const propertyId = props.location.state.propertyId ? props.location.state.propertyId : null;
   const [smartLockData, setSmartLockData] = useState([]);
   const [showEditSmartLockData, setShowEditSmartLockData] = useState(false);
   const [selectedSmartLockData, setselectedSmartLockData] = useState({});

   const [censorData, setCensorData] = useState([]);
   const [showEditCensorData, setShowEditCensorData] = useState(false);
   const [selectedCensorData, setselectedCensorData] = useState({});

   const [cameraData, setCameraData] = useState([]);
   const [showEditCameraData, setShowEditCameraData] = useState(false);
   const [selectedCameraData, setselectedCameraData] = useState({});
   const [addCameraFlag, setAddCameraFlag] = useState(false);
   const [viewCameraFlag, setViewCameraFlag] = useState(false);
   const [changeUUIDFlag, setChangeUUIDFlag] = useState(false);
   const [cameraTypeList, setCameraTypeList] = useState([]);
   const [cameraSubTypeList, setCameraSubTypeList] = useState([]);
   const endPointList = ["prod", "uat"];
   const [lockLoading, setLockLoading] = useState(false);
   const [censorloading, setCensorLoading] = useState(false);
   const [cameraloading, setCameraLoading] = useState(false);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState({});
   const [showLiveStream, setShowLiveStream] = useState(false);
   const [livestreamURL, setLivestreamURL] = useState("");
   const [currentUUID, setCurrentUUID] = useState(null);
   const [accountDetails, setAccountDetails] = useState({});
   const [cameraList, setCameraList] = useState([]);
   const [selectedCamera, setSelectedCamera] = useState(null);
   let liveStremUrl = "";

   const _getSmartLockData = useCallback(async () => {
      try {
         setLockLoading(true);
         const result_data = await getSmartLockData({ id: propertyId });
         setLockLoading(false);
         if (result_data.data.status === 200 && result_data.data.resourceData) {
            let data = [];
            data.push(result_data.data.resourceData);
            setSmartLockData(data);
         }
      } catch (err) {
         showErrorToast("Unexpected Error.");
      }
   }, [propertyId]);

   const _getContactSensor = useCallback(
      async (propertyId) => {
         try {
            setCensorLoading(true);
            const result_data = await getContactSensor({ propertyId });
            setCensorLoading(false);
            if (result_data.data.status === 200 && result_data.data.resourceData) {
               let data = [];
               data.push(result_data.data.resourceData);
               setCensorData(data);
            }
         } catch (err) {
            showErrorToast("Unexpected Error.");
         }
      },
      [propertyId]
   );

   const _getCameraDevice = useCallback(
      async (propertyid) => {
         try {
            setCameraLoading(true);
            const result_data = await getCameraDevice({ propertyid });
            setCameraLoading(false);
            if (result_data.data.status === 200 && result_data.data.resourceData) {
               setCameraData(result_data.data.resourceData);
            } else if (result_data.status !== 200) {
               setCameraData([]);
            }
         } catch (err) {
            showErrorToast("Unexpected Error.");
         }
      },
      [propertyId]
   );

   const fetchDeviceIdListByKitId = () => {
      setLoading(true);
      getDeviceIdList({ kitId: 0 }).then((response) => {
         setLoading(false);
         setCameraList([...response.data.resourceData.cameraList]);
      });
   };

   useEffect(() => {
      _getSmartLockData();
      // _getContactSensor(propertyId);
      _getCameraDevice(propertyId);
      getCameraTypes({})
         .then((response) => {
            setCameraTypeList(response.data.resourceData?.cameraTypes);
            setCameraSubTypeList(response.data.resourceData?.cameraSubTypes);
         })
         .catch((error) => {
            console.log(error);
         });
      fetchDeviceIdListByKitId();
   }, [propertyId, _getSmartLockData, _getContactSensor, _getCameraDevice]);

   const columns = [
      {
         name: "id",
         selector: "id",
         center: false,
         maxWidth: "60px",
      },
      {
         name: "PropertyId",
         selector: "propertyId",
         maxWidth: "120px",
         center: true,
      },
      {
         name: "Lock Type",
         selector: "smartlockType",
         maxWidth: "220px",
         center: true,
      },
      {
         name: "Access Token",
         selector: "accessToken",
         maxWidth: "300px",
         center: true,
      },
      {
         name: "Refresh Token",
         selector: "refreshToken",
         maxWidth: "300px",
         center: true,
      },
      {
         name: "Status",
         selector: "status",
         maxWidth: "260px",
         center: true,
      },
      {
         name: "Action",
         sortable: false,
         center: true,
         maxWidth: "180px",
         cell: ({ id, deleted }) => (
            <div className="action">
               <Buttons
                  name="View Data"
                  varient="primary"
                  // disable={deleted ? true : false}
                  size="xSmall"
                  color="white"
                  className="mt-2 mb-2"
                  onClick={() => {
                     showSmartLockData(id);
                  }}
               />{" "}
               &nbsp;&nbsp;
            </div>
         ),
      },
   ];

   const contactSensorColumns = [
      {
         name: "id",
         selector: "id",
         maxWidth: "60px",
         center: true,
      },
      {
         name: "Serial No.",
         selector: "serialNumber",
         maxWidth: "150px",
         center: true,
      },
      {
         name: "Email Id.",
         selector: "email",
         maxWidth: "200px",
         center: true,
      },
      {
         name: "Password",
         selector: "password",
         maxWidth: "150px",
         center: true,
      },
      {
         name: "Is Deleted",
         selector: "deleted",
         maxWidth: "60px",
         center: true,
         cell: ({ deleted }) => (deleted ? <Text text="Yes" /> : <Text text="No" />),
      },
      {
         name: "Action",
         sortable: false,
         center: true,
         maxWidth: "180px",
         cell: ({ id, deleted }) => (
            <div className="action">
               <Buttons
                  name="View Data"
                  varient="primary"
                  size="xSmall"
                  color="white"
                  className="mt-2 mb-2"
                  onClick={() => {
                     showCensorData(id);
                  }}
               />
            </div>
         ),
      },
   ];

   const videoRef = useRef(null);
   const playerRef = useRef(null);
   let hls;

   const cameraDeviceColumns = [
      {
         name: "Id",
         selector: "cameraDeviceId",
         maxWidth: "150px",
         center: true,
      },
      {
         name: "Property Id",
         selector: "propertyId",
         maxWidth: "150px !important",
         center: true,
      },
      {
         name: "UUId",
         selector: "uuId",
         minWidth: "120px",
         center: true,
      },
      {
         name: "Is Deleted",
         selector: "deleted",
         maxWidth: "60px",
         center: true,
         cell: ({ deleted }) => (deleted ? <Text text="Yes" /> : <Text text="No" />),
      },
      {
         name: "Battery %",
         selector: "batteryPercentage",
         maxWidth: "60px",
         center: true,
         cell: ({ batteryPercentage }) =>
            batteryPercentage !== null ? (
               <Text text={batteryPercentage + "%"} />
            ) : (
               <Text text="-" />
            ),
      },
      {
         name: "Status",
         selector: "status",
         maxWidth: "260px",
         center: true,
      },
      {
         name: "Set callBack URL",
         sortable: false,
         center: true,
         minWidth: "150px",
         cell: ({ uuId, propertyId, type, cameraDeviceId }) => (
            <>
               {type !== "PIR_CAMERA" ? (
                  <>
                     <div>
                        <Buttons
                           name="Set Alarm"
                           varient="primary"
                           size="xSmall"
                           onClick={async () => {
                              const response = await setCallBackUrl({
                                 type: "prod",
                                 sns: uuId,
                                 propertyId: propertyId,
                              });
                              if (response.status === 200) {
                                 showSuccessToast(response?.data?.customMessage);
                              } else {
                                 showErrorToast(response?.data?.customMessage);
                              }
                           }}
                        ></Buttons>
                     </div>
                  </>
               ) : null}
            </>
         ),
      },
      {
         name: "View Live Stream",
         sortable: false,
         center: true,
         minWidth: "170px",
         cell: ({ uuId, type }) => (
            <div>
               {type !== "PIR_CAMERA" ? (
                  <>
                     {loading && uuId === currentUUID ? (
                        <Loader />
                     ) : (
                        <Buttons
                           name="View LiveStream"
                           varient="primary"
                           size="xSmall"
                           onClick={async () => {
                              // setShowLiveStream(true);
                              setCurrentUUID(uuId);
                              setLoading(true);
                              const response = await getDeviceToken({
                                 sns: uuId,
                                 status: "open",
                                 // propertyId: propertyId,
                              });
                              setLoading(false);
                              if (response.status === 200) {
                                 liveStremUrl = response.data.resourceData.liveStreamUrl;
                                 setLivestreamURL(response.data.resourceData.liveStreamUrl);
                                 setShowLiveStream(true);
                              } else {
                                 showErrorToast("Camera is offline");
                              }
                           }}
                        ></Buttons>
                     )}
                  </>
               ) : null}
            </div>
         ),
      },
      {
         name: "Delete Camera",
         sortable: false,
         center: true,
         cell: ({ cameraDeviceId }) => (
            <div>
               {/* <Buttons
                  name="Delete"
                  varient="primary"
                  size="xSmall"
                  onClick={async () => {
                     const response = await deleteCamera({
                        cameraId: cameraDeviceId,
                     });
                     if (response.status === 200) {
                        await _getCameraDevice(propertyId);
                     } else {
                        showErrorToast(response?.data?.customMessage);
                     }
                  }}
               ></Buttons> */}
               <Buttons
                  name="Delete"
                  varient="primary"
                  size="xSmall"
                  onClick={async () => {
                     const response = await deleteCamera({
                        cameraId: cameraDeviceId,
                     });
                     if (response.status === 200) {
                        await _getCameraDevice(propertyId);
                        fetchDeviceIdListByKitId();
                     } else {
                        showErrorToast(response?.data?.customMessage);
                     }
                  }}
               ></Buttons>
            </div>
         ),
      },
      {
         name: "Action",
         sortable: false,
         center: true,
         minWidth: "440px",
         cell: ({ uuId, cameraDeviceId }) => (
            <div className="action">
               <Buttons
                  name="View Data"
                  varient="primary"
                  size="xSmall"
                  color="white"
                  className="mt-2 mb-2"
                  onClick={() => {
                     showCameraData(uuId);
                  }}
               />
               {/* &nbsp;&nbsp;
               <Buttons
                  name="Mark as Defective"
                  variant="outline-danger"
                  size="xSmall"
                  onClick={async () => {
                     await updateCameraStatus({
                        cameraId: cameraDeviceId,
                        status: "",
                     }).then((response) => {
                        if (response?.status === 200) {
                           showSuccessToast("Marked as defective successfully...");
                           _getCameraDevice(propertyId);
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
                        cameraId: cameraDeviceId,
                        status: "",
                     }).then((response) => {
                        if (response?.status === 200) {
                           showSuccessToast("Marked as sold successfully...");
                           _getCameraDevice(propertyId);
                        } else {
                           showErrorToast(response?.data?.message);
                        }
                     });
                  }}
               /> */}
            </div>
         ),
      },
   ];

   const showSmartLockData = (id) => {
      setShowEditSmartLockData(true);
      smartLockData.forEach((element) => {
         if (element.id === id) {
            setselectedSmartLockData(element);
         }
      });
   };

   const showCensorData = (id) => {
      setShowEditCensorData(true);
      censorData.forEach((element) => {
         if (element.id === id) {
            setselectedCensorData(element);
         }
      });
   };
   const showCameraData = (uuId) => {
      setShowEditCameraData(true);
      setViewCameraFlag(true);
      cameraData.forEach((element) => {
         if (element.uuId === uuId) {
            console.log(element);
            setselectedCameraData({
               ...element,
               cameraId: element.cameraDeviceId,
               type: element.type,
               endpointType: "prod",
               subType: element.subType,
            });
            // if(Object.keys(cameraSubTypeList).includes(element?.type)) {
            //    setCameraSubTypeList(cameraSubTypeList[element?.type]);
            // }
         }
      });
   };

   const editCameraDetails = async (addNewFlag) => {
      if (addNewFlag === false) {
         await setselectedCameraData((prevCameraData) => ({
            ...prevCameraData,
            cameraId: selectedCameraData.cameraDeviceId,
         }));
      }
      const valid = await validateCameraData(selectedCameraData, addNewFlag);
      setError(valid.errors);
      if (valid.isValid) {
         setLoading(true);
         let reqData = {
            ...selectedCameraData,
            ...accountDetails,
            adminLogin: selectedCameraData.type === "4G_CAMERA" ? true : false,
            cameraAlreadyAdded: false,
         };
         const response = await editCameraData(reqData);
         setLoading(false);
         if (response.status === 200) {
            showSuccessToast("CameraDevice Data updated successfully");
            setShowEditCameraData(false);
            setAddCameraFlag(false);
            _getCameraDevice(propertyId);
            setselectedCameraData((prevCameraData) => ({
               ...prevCameraData,
               uuId: "",
               userName: "",
               password: "",
               nickName: "",
               cameraDeviceId: "",
               cameraId: "",
               type: "",
               subType: "",
               endpointType: "",
               propertyId: propertyId,
            }));
         }
      }
   };

   return (
      <>
         <div className="whiteBg">
            <Text className="h5" size="medium" text={"Smart Lock Data"} />
            <ListingDataTable
               isLoading={lockLoading}
               columns={columns}
               data={smartLockData}
               paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
               paginationPerPage={8}
               perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
               persistTableHead="true"
            ></ListingDataTable>
            <Text className="mt-3 h5" size="medium" text={"Contact Sensor Data"} />
            <ListingDataTable
               isLoading={censorloading}
               columns={contactSensorColumns}
               data={censorData}
               paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
               paginationPerPage={8}
               perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
               persistTableHead="true"
            ></ListingDataTable>
            <Text className="mt-3 mb-0 h5" size="medium" text={"Camera Device Data"} />
            <ListingDataTable
               isLoading={cameraloading}
               className="mt-0"
               columns={cameraDeviceColumns}
               data={cameraData}
               paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
               paginationPerPage={8}
               perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
               persistTableHead="true"
            ></ListingDataTable>
            <Buttons
               name="Add New Camera"
               varient="primary"
               // style={{float:'right'}}
               size="xSmall"
               color="white"
               className="mt-2 mb-2"
               onClick={async () => {
                  setselectedCameraData((prevCameraData) => ({
                     ...prevCameraData,
                     uuId: "",
                     userName: "",
                     password: "",
                     nickName: "",
                     cameraDeviceId: "",
                     cameraId: "",
                     type: "",
                     subType: "",
                     endpointType: "",
                     propertyId: propertyId,
                  }));
                  setAddCameraFlag(true);
                  setChangeUUIDFlag(false);
                  const response = await getAccountEmailDetails();
                  setAccountDetails(response?.data?.resourceData);
               }}
            />{" "}
            &nbsp;&nbsp;
            {cameraData.map((camera) => (
               <>
                  <hr />
                  <Text className="mt-3 mb-0 h5" size="medium" text={"Visits"} />
                  <VisitMedia cameraId={camera?.cameraDeviceId} />
                  <hr />
                  <Text
                     className="mt-3 mb-0 h5"
                     size="medium"
                     text={"Intrusions (In last 30 days)"}
                  />
                  <IntrusionMedia cameraId={camera?.cameraDeviceId} />
               </>
            ))}
         </div>

         <Modal
            size="lg"
            show={showEditSmartLockData}
            onHide={() => {
               setShowEditSmartLockData(false);
            }}
            centered={true}
         >
            <Modal.Body>
               <Text className="m-2 h5" size="medium" text="View SmartLock Data" />
               <div className="d-flex mt-3 row col-12">
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="id"
                     contentEditable="false"
                     label="id"
                     value={selectedSmartLockData?.id}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="propertyId"
                     contentEditable="false"
                     label="propertyId"
                     value={selectedSmartLockData?.propertyId}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="uid"
                     contentEditable="false"
                     label="uid"
                     value={selectedSmartLockData?.uid}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="lockmac"
                     multiline
                     contentEditable="false"
                     label="lockmac"
                     value={selectedSmartLockData?.lockmac}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="lockPowerPercentage"
                     contentEditable="false"
                     label="lockPowerPercentage"
                     value={selectedSmartLockData?.lockPowerPercentage}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="expiresIn"
                     contentEditable="false"
                     label="expiresIn"
                     value={selectedSmartLockData?.expiresIn}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="tokenType"
                     contentEditable="false"
                     label="tokenType"
                     value={selectedSmartLockData?.tokenType}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="scope"
                     contentEditable="false"
                     label="scope"
                     value={selectedSmartLockData?.scope}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="smartlockAdminPasscode"
                     contentEditable="false"
                     label="smartlockAdminPasscode"
                     value={selectedSmartLockData?.smartlockAdminPasscode}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="smartlockInstalled"
                     contentEditable="false"
                     label="smartlockInstalled"
                     value={selectedSmartLockData?.smartlockInstalled ? "Yes" : "No"}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="gatewayInstalled"
                     contentEditable="false"
                     label="gatewayInstalled"
                     value={selectedSmartLockData?.gatewayInstalled ? "Yes" : "No"}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="doorOpen"
                     contentEditable="false"
                     label="doorOpen"
                     value={selectedSmartLockData?.doorOpen ? "Yes" : "No"}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="accessToken"
                     multiline
                     contentEditable="false"
                     label="accessToken"
                     value={selectedSmartLockData?.accessToken}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="refreshToken"
                     multiline
                     contentEditable="false"
                     label="refreshToken"
                     value={selectedSmartLockData?.refreshToken}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="username"
                     multiline
                     contentEditable="false"
                     label="username"
                     value={selectedSmartLockData?.username}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="password"
                     multiline
                     contentEditable="false"
                     label="password"
                     value={selectedSmartLockData?.password}
                  />
                  <div className="col-12 px-1">
                     <TextArea
                        id="lockData"
                        contentEditable="false"
                        label="lockData"
                        value={selectedSmartLockData?.lockData}
                     />
                  </div>
               </div>
               <div className="mb-5">
                  <Buttons
                     name="Hide Data"
                     varient="primary"
                     style={{ float: "right", marginInlineEnd: "4%" }}
                     size="xSmall"
                     color="white"
                     className="mt-2 mb-2"
                     onClick={() => {
                        setShowEditSmartLockData(false);
                     }}
                  />
               </div>
            </Modal.Body>
         </Modal>
         <Modal
            size="lg"
            show={showEditCensorData}
            onHide={() => {
               setShowEditCensorData(false);
            }}
            centered={true}
         >
            <Modal.Body>
               <Text className="m-2 h5" size="medium" text="View Contact Sensor Data" />
               <div className="d-flex mt-3 row col-12">
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="id"
                     contentEditable="false"
                     label="id"
                     value={selectedCensorData?.id}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="serialNumber"
                     contentEditable="false"
                     label="serial No."
                     value={selectedCensorData?.serialNumber}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="email"
                     contentEditable="false"
                     label="Email Id"
                     value={selectedCensorData?.email}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="id"
                     contentEditable="false"
                     label="Password"
                     value={selectedCensorData?.password}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="deleted"
                     contentEditable="false"
                     label="Is deleted"
                     value={selectedCensorData?.deleted ? "Yes" : "No"}
                  />
               </div>
               <div className="mb-5">
                  <Buttons
                     name="Hide Data"
                     varient="primary"
                     style={{ float: "right", marginInlineEnd: "4%" }}
                     size="xSmall"
                     color="white"
                     className="mt-2 mb-2"
                     onClick={() => {
                        setShowEditCensorData(false);
                     }}
                  />
               </div>
            </Modal.Body>
         </Modal>
         <Modal
            size="md"
            show={addCameraFlag}
            onHide={() => {
               setAddCameraFlag(false);
               setShowEditCameraData(false);
            }}
            centered={true}
            backdrop="static"
         >
            <Modal.Header>
               <Text
                  text="Select a pre-configured camera device ID from the dropdown below."
                  style={{ fontSize: "14px", fontWeight: "600" }}
               />
               <Buttons
                  style={{ float: "right" }}
                  name="X"
                  varient="secondary"
                  onClick={async () => {
                     setAddCameraFlag(false);
                     setSelectedCamera(null);
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
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: "center" }}>
               <Buttons
                  name="Assign Camera to Property"
                  onClick={async () => {
                     assignDeviceToProperty({
                        deviceType: "Camera",
                        propertyId: propertyId,
                        deviceId: selectedCamera?.cameraDeviceId,
                     }).then((response) => {
                        if (response?.status === 200) {
                           showSuccessToast("Device added successfully...");
                           fetchDeviceIdListByKitId();
                           setAddCameraFlag(false);
                           setSelectedCamera(null);
                           _getCameraDevice(propertyId);
                           fetchDeviceIdListByKitId();
                        }
                     });
                  }}
               />
            </Modal.Footer>
         </Modal>
         <Modal
            size="lg"
            show={viewCameraFlag}
            onHide={() => {
               setViewCameraFlag(false);
               setShowEditCameraData(false);
            }}
            centered={true}
            backdrop="static"
         >
            <Modal.Header>
               <Text
                  className="m-2 h5"
                  size="medium"
                  text={showEditCameraData ? "Camera Device Data" : "Add New Camera Device Data"}
               />
               <Buttons
                  style={{ float: "right" }}
                  name="X"
                  varient="secondary"
                  onClick={async () => {
                     setViewCameraFlag(false);
                     setSelectedCamera(null);
                  }}
               ></Buttons>
            </Modal.Header>
            <Modal.Body>
               <div className="d-flex row col-12">
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="uuId"
                     error={error.uuId}
                     contentEditable={true}
                     label="UUID"
                     disabled={true}
                     onChange={(e) => {
                        setselectedCameraData((prevCameraData) => ({
                           ...prevCameraData,
                           uuId: e.target.value,
                        }));
                     }}
                     value={selectedCameraData?.uuId}
                  />
                  {/* <TextField
                     className="col-4 px-1 mt-3"
                     id="propertyId"
                     contentEditable={false}
                     // disabled={showEditCameraData ? true : false}
                     label="Property Id"
                     value={selectedCameraData?.propertyId}
                  /> */}
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="propertyId"
                     contentEditable={false}
                     label="Camera DeviceId"
                     disabled={true}
                     onChange={(e) => {
                        setselectedCameraData((prevCameraData) => ({
                           ...prevCameraData,
                           cameraId: Number(e.target.value),
                        }));
                     }}
                     value={selectedCameraData?.cameraId}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="userName"
                     contentEditable={true}
                     error={error.userName}
                     type="text"
                     label="userName"
                     disabled={true}
                     onChange={(e) => {
                        setselectedCameraData((prevCameraData) => ({
                           ...prevCameraData,
                           userName: e.target.value,
                        }));
                     }}
                     value={selectedCameraData?.userName}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="password"
                     contentEditable={true}
                     error={error.password}
                     type="text"
                     label="Password"
                     disabled={true}
                     onChange={(e) => {
                        setselectedCameraData((prevCameraData) => ({
                           ...prevCameraData,
                           password: e.target.value,
                        }));
                     }}
                     value={selectedCameraData?.password}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="type"
                     select
                     error={error.type}
                     label="Camera Type"
                     disabled={true}
                     onChange={(e) => {
                        setselectedCameraData((prevCameraData) => ({
                           ...prevCameraData,
                           type: e.target.value,
                        }));
                     }}
                     value={selectedCameraData?.type}
                  >
                     {cameraTypeList?.map((item) => (
                        <MenuItem key={item} value={item}>
                           {item}
                        </MenuItem>
                     ))}
                  </TextField>
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="subType"
                     select
                     error={error.subType}
                     label="Camera Sub Type"
                     disabled={true}
                     onChange={(e) => {
                        setselectedCameraData((prevCameraData) => ({
                           ...prevCameraData,
                           subType: e.target.value,
                        }));
                     }}
                     value={selectedCameraData?.subType}
                  >
                     {}
                     {cameraSubTypeList[selectedCameraData?.type]?.map((item) => (
                        <MenuItem key={item} value={item}>
                           {item}
                        </MenuItem>
                     ))}
                  </TextField>
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="nickName"
                     contentEditable={true}
                     error={error.nickName}
                     type="text"
                     label="Nick Name"
                     disabled={true}
                     onChange={(e) => {
                        setselectedCameraData((prevCameraData) => ({
                           ...prevCameraData,
                           nickName: e.target.value,
                        }));
                     }}
                     value={selectedCameraData?.nickName}
                  />
                  <TextField
                     className="col-5 px-1 mt-3"
                     id="accountEmail"
                     contentEditable={true}
                     error={error.accountEmail}
                     type="text"
                     label="Account Email"
                     disabled={true}
                     onChange={(e) => {
                        setselectedCameraData((prevCameraData) => ({
                           ...prevCameraData,
                           accountEmail: e.target.value,
                        }));
                     }}
                     value={selectedCameraData?.accountEmail}
                  />
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="endPointType"
                     select
                     error={error.endpointType}
                     label="EndPoint Type"
                     disabled={true}
                     onChange={(e) => {
                        setselectedCameraData((prevCameraData) => ({
                           ...prevCameraData,
                           endpointType: e.target.value,
                        }));
                     }}
                     value={selectedCameraData?.endpointType}
                  >
                     {endPointList.map((item) => (
                        <MenuItem key={item} value={item}>
                           {item}
                        </MenuItem>
                     ))}
                  </TextField>
                  <TextField
                     className="col-4 px-1 mt-3"
                     id="deleted"
                     contentEditable={false}
                     disabled={true}
                     label="Is deleted"
                     value={selectedCameraData?.deleted ? "Yes" : "No"}
                  />
               </div>
               {/* <div className="d-flex justify-content-center">
                  {!showEditCameraData ? (
                     <>
                        {loading ? (
                           <Loader />
                        ) : (
                           <Buttons
                              name={showEditCameraData ? "Save" : "Add Camera Data"}
                              varient="primary"
                              size="xSmall"
                              color="white"
                              className="mt-2 mb-2 p-3"
                              onClick={() => {
                                 editCameraDetails(showEditCameraData ? false : true);
                              }}
                           />
                        )}
                     </>
                  ) : (
                     <Buttons
                        name={showEditCameraData ? "Save" : "Add Camera Data"}
                        varient="primary"
                        size="xSmall"
                        color="white"
                        className="mt-2 mb-2 p-3"
                        onClick={() => {
                           editCameraDetails(showEditCameraData ? false : true);
                        }}
                     />
                  )}
               </div> */}
            </Modal.Body>
         </Modal>
         <Modal
            size="lg"
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
                     setShowLiveStream(false);
                     const response = await getDeviceToken({
                        sns: currentUUID,
                        status: "close",
                     });
                  }}
               ></Buttons>
            </Modal.Header>
            <Modal.Body>
               <ReactPlayer
                  // type=''
                  url={livestreamURL}
                  controls={true}
                  muted={false}
                  playing={true}
               />
            </Modal.Body>
         </Modal>
      </>
   );
};

const mapStateToProps = ({ getSmartLockData, getCameraData, getContactSensorData }) => ({
   getSmartLockData,
   getCameraData,
   getContactSensorData,
});

// mapDispatchToProps
const actions = {
   // getAllProperties,
   // getPropertyCity,
};

export default connect(mapStateToProps, actions)(PropertyDevice);
