/** @format */

import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Row, Col, Modal } from "react-bootstrap";
import ImageSliderComponent from "./ImageSliderComponent";
import Buttons from "../../../shared/Buttons/Buttons";
import userImg from "../../../assets/svg/avatar_sml.svg";
import mailIcon from "../../../assets/images/mail-icon.svg";
import LockClose from "../../../assets/svg/LockClose.svg"
import LockOpen from "../../../assets/svg/LockOpen.svg"
import {
   getPropertyDetails,
   getPropertyAnalyticsByPropertyId,
   deletePropertyImage,
   addImage,
   getCameraDevice,
   getCameraUserToken,
   getContactSensor,
   getSmartLockData,
   getContactSensorLogin,
   getContactSensorDeviceDetails,
   doorClosed,
   remoteUnlock,
   remoteOTP,
   deletePropertyById,
   getPropertyPlanDetails,
} from "../../../common/redux/actions";
import MapComponent from "../../../shared/Map/MapComponent";
import Loader from "../../../common/helpers/Loader";
import { Link } from "react-router-dom";
import {
   showErrorToast,
   formateDate,
   ToolTip,
   setPrice,
   showSuccessToast,
} from "../../../common/helpers/Utils";
import "./PropertyDoc.scss";
import MessageModal from "../../../shared/Modal/MessageModal/MessageModal";
import doc from "../../../assets/svg/doc.svg";
import DownArrow from "../../../assets/svg/DownArrow.svg";
import UpArrow from "../../../assets/svg/UpArrow.svg";
import Text from "../../../shared/Text/Text";
import Image from "../../../shared/Image/Image";
import S3 from "react-aws-s3";
import Constants from "../../../common/helpers/Constants";
import requestLockApi from "../../../common/services/lockServices";
import cameraServicesApi from "../../../common/services/cameraServices";
import AesAlgo from "../../../camera-related/aesAlgorithm";
import SignatureAlgo from "../../../camera-related/signatureAlgorithm";
import TimeStampAlgo from "../../../camera-related/timeMilis";
import QrModal from "../../../shared/Modal/QrModal/QrModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Switch } from "@mui/material";
const ReactS3Client = new S3(Constants.CONFIG_PROPERTY);

const PropertyDetails = (props) => {
   const { getPropertyAnalyticsByPropertyId, propertyAnalyticsData, module } = props;

   console.log("props.module in details page:", props.module);

   const propertyId = props.location.state ? props.location.state.propertyId || "" : "";
   const userId = props.location.state ? props.location.state.userId || "" : "";
   const [loading, setLoading] = useState(true);
   const [propertyData, setpropertyData] = useState({});
   // const [societyUserData, setSocietyUserData] = useState({})
   const history = useHistory();
   const [show, setShow] = useState(false);
   const [showMsgModal, setShowMsgModal] = useState(false);
   const [showQrModal, setShowQrModal] = useState(false);
   const [showMore, setShowMore] = useState(false);
   const [ownerId, setOwnerId] = useState("");
   const [cameraData, setCameraData] = useState([]);
   const [showCameraDD, setShowCameraDD] = useState(false);
   const [cameraSno, setCameraSno] = useState("");
   // const [imageData, setImageData] = useState({
   //    propertyId: propertyId,
   //    propertyDocs: [],
   //    propertyImage: [],
   // });
   const [imageLoader, setImageLoader] = useState(false);
   const [censorData, setCensorData] = useState({});
   const [smartdoorBattery, setSmartdoorBattery] = useState('');
   const [smartlockAdminPassCode, setSmartlockAdminPassCode] = useState('');
   const [door_status, setDoor_status] = useState("");
   const [censorBattery_status, setCensorBattery_status] = useState("");
   const [smartLockData, setSmartLockData] = useState("");
   const [qrData, setQrData] = useState({})
   const [showQr, setShowQr] = useState(false)
   const [currentPlanData, setCurrentPlanData] = useState({})
   const [upgradePlanData, setUpgradePlanData] = useState([])

   const batteryStatusCensor = (censorBatteryStatus) => {
      if (censorBatteryStatus === 0) {
         return "75-100";
      } else if (censorBatteryStatus === 1) {
         return "50-75";
      } else if (censorBatteryStatus === 2) {
         return "25-50";
      } else if (censorBatteryStatus === 3) {
         return "0-25";
      } else {
         return "Unknown battery status";
      }
   };

   const _getContactSensor = useCallback(
      async (propertyId) => {
         try {
            console.log(" not a basic plan");
            const result_data = await getContactSensor({ propertyId });
            let access_token_device;
            if (result_data.data.status === 200 && result_data.data.resourceData) {
               setCensorData(result_data.data.resourceData);
               console.log("result_data.data.resourceData: CENSOR:", result_data.data.resourceData);
               //   const censor_login_result = await cameraServicesApi("POST", {
               //     "email":"sd176@smartdoor.com",
               //     "password":"smartdoor@176"
               // }
               // , `https://77dfrqoarc.execute-api.us-east-2.amazonaws.com/dev/user/login`);
               //getContactSensorLogin
               const censor_login_result = await getContactSensorLogin({
                  email: result_data?.data?.resourceData?.email,
                  password: result_data?.data?.resourceData?.password,
               });
               console.log("censor_login_result", censor_login_result);
               if (
                  censor_login_result.data.status === 200 &&
                  censor_login_result.data.resourceData
               ) {
                  const cersor_device_data = JSON.parse(censor_login_result.data.resourceData);
                  console.log("cersor_device_data:", cersor_device_data);
                  if (cersor_device_data.statusCode === 200) {
                     access_token_device = cersor_device_data.result.accessToken;

                     console.log("access_token_device:", access_token_device);
                     //   const get_censor_data = await cameraServicesApi("GET", {Authorization: `Bearer ${access_token_device}` }
                     // , `https://77dfrqoarc.execute-api.us-east-2.amazonaws.com/dev/user/devices/${result_data?.data?.resourceData?.serialNumber}`);
                     try {
                        const get_censor_data = await getContactSensorDeviceDetails({
                           id: result_data?.data?.resourceData?.serialNumber,
                           token: access_token_device,
                        });
                        if (get_censor_data.status === 200 && get_censor_data.data.resourceData) {
                           let censorObj = JSON.parse(get_censor_data.data.resourceData);
                           console.log("censorObj:", censorObj);
                           setDoor_status(censorObj?.door_status === 0 ? "Open" : "Closed");
                           setCensorBattery_status(batteryStatusCensor(censorObj?.battery_status));
                        }
                     } catch (err) {
                        console.log("Unexpected Error , please try again later.");
                     }
                  }
               }
            }
         } catch (err) {
            showErrorToast("Unexpected Error.");
         }
      },
      [propertyId, getPropertyDetails]
   );

   const _getSmartLockData = useCallback(async () => {
      try {
         const result_data = await getSmartLockData({ id: propertyId });
         console.log(result_data)
         if (result_data.data.status === 200 && result_data.data.resourceData) {
            console.log("result_data.data.resourceData:", result_data.data.resourceData);
            setSmartdoorBattery(result_data?.data?.resourceData?.lockPowerPercentage);
            setSmartlockAdminPassCode(result_data?.data?.resourceData?.smartlockAdminPasscode);
            setSmartLockData(result_data?.data?.resourceData);
            console.log(result_data?.data?.resourceData?.lockPowerPercentage)
            setShowQr(true)
            setTimeout(() => {
               console.log("smart lock data after update", smartLockData);
            }, 3000);

            //   setCensorData(result_data.data.resourceData)
            //   const censor_login_result = await cameraServicesApi("POST", {
            //     "email":"sd176@smartdoor.com",
            //     "password":"smartdoor@176"
            // }
            // , `https://77dfrqoarc.execute-api.us-east-2.amazonaws.com/dev/user/login`);

            // console.log( "censor_login_result" , censor_login_result )
            // }
         }
      } catch (err) {
         showErrorToast("Unexpected Error.");
      }
   }, [propertyId, getPropertyDetails]);

   // getPropertyDetails()
   const _getPropertyDetails = useCallback(() => {
      getPropertyDetails({ propertyId: propertyId, userId: userId })
         .then((response) => {
            setLoading(false);
            if (response.data) {
               if (response.data.resourceData && response.data.status === 200) {
                  setpropertyData(response.data.resourceData);
                  setOwnerId(response.data.resourceData.postedById);
                  _getSmartLockData({ propertyId });
                  if (!response.data.resourceData.basicPlan) _getContactSensor(propertyId);
               }
            }
            console.log("responseSocietyDetails", response);
            console.log("owner id", response.data.resourceData.postedById);
         })
         .catch((error) => {
            setLoading(false);
            console.log("error", error);
         });
   }, [propertyId, getPropertyDetails]);

   const _getPropertyPlanDetailsById = useCallback(
      () => {
         getPropertyPlanDetails({ propertyId: propertyId })
            .then((response) => {
               if (response.data) {
                  if (response.data.resourceData && response.data.status === 200) {
                     console.log(response.data.resourceData)
                     setCurrentPlanData(response?.data?.resourceData?.currentPlanData)
                     setUpgradePlanData(response?.data?.resourceData?.upgradePlanData)
                  }
               }
            })
            .catch((error) => {
               console.log("error", error);
            });
      }
   )
   console.log("censor data:", censorData);
   console.log("smart lock data", smartLockData);

   const deleteImageHandler = useCallback(
      (docId) => {
         console.log(docId, "doc id");
         deletePropertyImage({ docId: docId })
            .then((response) => {
               // setLoading(false);
               if (response.data) {
                  if (response.data.resourceData) {
                     _getPropertyDetails();
                     getPropertyAnalyticsByPropertyId({ propertyId: propertyId });
                     // setpropertyData(response.data.resourceData);
                  }
               }
               console.log("responseDeleteImage", response);
            })
            .catch((error) => {
               // setLoading(false);
               console.log("error", error);
            });
      },
      [getPropertyDetails]
   );

   // const sendMsgHandler = useCallback(() => {

   //   console.log(userId,ownerId,"msg id")
   //   sendMsgToOwner({userId:userId, ownerId:ownerId })
   //     .then((response) => {
   //       // setLoading(false);
   //       if (response.data) {
   //         if (response.data.resourceData) {
   //           _getPropertyDetails();
   //           getPropertyAnalyticsByPropertyId({ propertyId: propertyId });
   //           console.log(response,"send msggggggggggggggggggggggggg")
   //           // setpropertyData(response.data.resourceData);
   //         }
   //       }
   //       console.log('responsemsgToOwner', response);
   //     })
   //     .catch((error) => {
   //       // setLoading(false);
   //       console.log('error', error)
   //     })

   // }, [getPropertyDetails])

   // const handleDeviceInterface = ()

   const handleDeviceInterface = async (camera_sno) => {
      console.log("camera_sno::", camera_sno);
      var userAccessToken;
      var deviceToken;
      var liveFeed_url;
      let result = await requestLockApi(
         "POST",
         {
            sns: [camera_sno],
            userId: "",
         },
         "https://tks.xmeye.net/v2/device/token/00000011673509759382/b712b4d786d71bd6f2d8ffb80478734a.rs"
      );
      console.log(result, "Result- device interface");
      if (result.code === 2000) {
         deviceToken = result.data[0].token;
         const timeStamp_Algo = new TimeStampAlgo();
         const aes_Algo = new AesAlgo();
         const signature_Algo = new SignatureAlgo();
         const timeMillis = timeStamp_Algo.getTimMillis();
         console.log("timeMillis:", timeMillis);
         const user = aes_Algo.encryptWithAES(
            aes_Algo.keyFilter("00000011673509759382", `${Constants.CAMERA_APP_SECRET}`),
            "domsdcamera1@gmail.com"
         );
         const pass = aes_Algo.encryptWithAES(
            aes_Algo.keyFilter("00000011673509759382", `${Constants.CAMERA_APP_SECRET}`),
            "Domsd@123"
         );
         console.log(`data user = ${user.toUpperCase()}`);
         console.log(`data pass = ${pass.toUpperCase()}`);
         const signatureData = signature_Algo.getEncryptStr(
            `${Constants.CAMERA_UUID}`,
            `${Constants.CAMERA_APP_KEY}`,
            `${Constants.CAMERA_APP_SECRET}`,
            "00000011673509759382",
            `${Constants.CAMERA_MOVE_CARD}`
         );
         console.log("signatureData:", signatureData);

         const tokenResult = await getCameraUserToken({
            account: "58D59FAAECE240D42E5835558B3ABC97F1F688D11398534FFD786F477F40D4BC",
            password: "B81409395A1E34333396EFB9FF78C0DB",
            signature: "c33647c28800ea2ef46bab84843d6fbc",
            timemilis: "00000011673509759382",
         });
         console.log(tokenResult.data.resourceData, "tokenResult");
         if (tokenResult.data.resourceData.length) {
            let decoded = decodeURIComponent(tokenResult.data.resourceData);
            const decodedObj = JSON.parse(decoded);
            console.log("decodedObj:", decodedObj);
            if (decodedObj.code === 2000 && Object.keys(decodedObj).length) {
               userAccessToken = decodedObj?.data?.accessToken;
               console.log("userAccessToken:", userAccessToken, "deviceToken:", deviceToken);
               const livefeeds_result = await cameraServicesApi(
                  "POST",
                  {
                     mediaType: "hls",
                     channel: "0",
                     stream: "0",
                     protocol: "ts",
                     username: "admin",
                     devPwd: "",
                     userToken:
                        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJycyIsImFwcEtleSI6ImZhM2FhMTZiZTAwODFkZjYzZDBjZTVjZDM1MTIzMTEwIiwiZXhwIjoxNjgwMjY1OTcxLCJ0eXBlIjoiY29tIiwiYWNjb3VudCI6ImU0ODM4ZWY4ZmQ4YjRkZDE5MGRmYTE3Yjg3ZTc5NDlkIn0.KRz5BRm782zck0X1YYv8vpEqZarsb5-JMUBEDKEZeRc.1",
                     // "userToken": userAccessToken
                  },
                  `https://rds.bcloud365.net/v2/rtc/device/livestream/${deviceToken}`
               );
               console.log("livefeeds_result", livefeeds_result);
               if (livefeeds_result.code === 2000) {
                  liveFeed_url = livefeeds_result.data.url;
                  // fetch(livefeeds_result.data.url, {
                  //   headers: {Authentication: `Bearer ${userAccessToken}`}
                  // })
                  // fetch(livefeeds_result.data.url)
                  // .then(response_res => console.log("responese@:", response_res))
                  // // .then( json => console.log(JSON.stringify(json)))
                  // .catch( error => console.error(error))
                  // showErrorToast(livefeeds_result.msg)
               } else {
                  showErrorToast(livefeeds_result.msg);
               }
            } else {
               showErrorToast("Unexpected Error, please try again later!");
            }
         }
      }
   };


   const handleViewRecording = async () => {
      try {
         const result = await getCameraDevice({ propertyid: propertyId });
         if (result.data.status === 200) {
            console.log("camera Data is :", result.data.resourceData);
            setCameraData(result.data.resourceData);
            setShowCameraDD(true);
         }
      } catch (err) {
         console.log("err:", err);
      }
   };



   const fileUpload = (event) => {
      if (event.target.files && event.target.files[0]) {
         let reader = new FileReader();
         reader.onload = (e) => {
            console.log(e.target.result, "target.result");
            // this.setState({ builderPropertyImg: e.target.result });
         };
         reader.readAsDataURL(event.target.files[0]);
      }
      console.log(event.target.files[0], "after upload files");

      const imageData = {
         propertyId: propertyId,
         propertyDocs: [],
         propertyImage: [
            {
               docId: null,
               docName: "",
               docURL: "",
            },
         ],
      };
      // this.setState({ imageUrl: event.target.files[0] });
      console.log(event.target.files, "before s3 files");
      if (event.target.files.length > 0) {
         setImageLoader(true);
         ReactS3Client.uploadFile(event.target.files[0], event.target.files[0].name)
            .then((data) => {
               console.log("data", data);
               const property_image = [];
               property_image.push({
                  docId: null,
                  docName: "",
                  docURL: data.location,
               });
               const image_data = {
                  ...imageData,
                  propertyDocs: [],
                  propertyImage: property_image,
               };
               // setImageData({})
               addImage(
                  image_data
                  // ...imageData,
                  //  propertyId:propertyId,
                  //  propertyImage: [...propertyImage],
                  //  propertyImage:[
                  //   {...iZgeData.propertyImage,docURL: data.location}

                  // ],
               )
                  .then((response) => {
                     setLoading(false);
                     if (response.data) {
                        if (response.data.resourceData) {
                           setImageLoader(false);
                           // setpropertyData(response.data.resourceData);
                           // setOwnerId(response.data.resourceData.postedById)
                           _getPropertyDetails();
                        }
                     }
                     // console.log('responseSocietyDetails', response);
                     // console.log('owner id', ownerId)
                  })
                  .catch((error) => {
                     setImageLoader(false);
                     setLoading(false);
                     console.log("error", error);
                  });
               // addBuilderProject({ ...builderPropertyData, imageUrl: data.location })
               //    .then((response) => {
               //       if (response.data && response.data.status === 200) {
               //          this.props.history.push("/admin/builder-property");
               //       }
               //    })
               //    .finally(() => {
               //       this.setState({ disableSave: false });
               //    });
            })
            .catch((err) => {
               // addBuilderProject({ ...builderPropertyData, imageUrl: "" })
               //    .then((response) => {
               //       if (response.data && response.data.status === 200) {
               //          this.props.history.push("/admin/builder-property");
               //       }
               //    })
               //    .finally(() => {
               //       this.setState({ disableSave: false });
               //    });
            });
         console.log(event.target.files[0], "end file");
      }
   };

   const qrGenerator = (slData) => {
      console.log(slData, "slData for qr");
      const data = {
         accessToken: slData.accessToken,
         lockId: slData.lockId,
         lockmac: slData.lockmac,
         propertyId: slData.propertyId
      }
      setQrData(data, () => {
         console.log(qrData, "QR data");
      });
      setShowQrModal(true)
   }
   const handleCloseQrModal = () => {
      setShowQrModal(false)
   }

   useEffect(() => {
      _getPropertyDetails();
      getPropertyAnalyticsByPropertyId({ propertyId: propertyId });
      _getPropertyPlanDetailsById();
   }, [propertyId, _getPropertyDetails, getPropertyAnalyticsByPropertyId]);

   // console.log('propertyData', propertyData);
   console.log(props, "props");

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const handleCloseMsgModal = () => setShowMsgModal(false);
   const handleshowMsgModal = () => setShowMsgModal(true);

   const doorClose = useCallback(async (smartLockData) => {
      try {
         const timeStamp_Algo = new TimeStampAlgo();
         const timeMillis = timeStamp_Algo.getTimMillis();
         let currentTimeMs = Date.now();

         let doorCloseData = {
            clientId: "1145ea4053bc4cfe894ce24ac53f3b22",
            accessToken: smartLockData.accessToken,
            lockId: smartLockData.lockId,
            date: currentTimeMs,
         };
         const result_data = await doorClosed(doorCloseData);
         if (result_data.data.status === 200 && result_data.data.resourceData) {
            let doorOpenResponse = JSON.parse(result_data.data.resourceData);
            console.log("doorOpenResponse:", doorOpenResponse);
            if (doorOpenResponse.errcode === 0) {
               setDoor_status("Open");
            }

            // _getContactSensor(propertyId);
            console.log("doorClose result_data.data.resourceData:", result_data.data.resourceData);
            // setSmartdoorBattery(result_data?.data?.resourceData?.lockPowerPercentage)
            //   setCensorData(result_data.data.resourceData)
            //   const censor_login_result = await cameraServicesApi("POST", {
            //     "email":"sd176@smartdoor.com",
            //     "password":"smartdoor@176"
            // }
            // , `https://77dfrqoarc.execute-api.us-east-2.amazonaws.com/dev/user/login`);

            // console.log( "censor_login_result" , censor_login_result )
            // }
         }
      } catch (err) {
         showErrorToast("Unexpected Error.");
      }
   }, []);

   const showCameraButton = () => {
      if (propertyAnalyticsData?.data?.basicPlan === false) {
         return (
            <div className="cameraIcon">
               {propertyData.basicPlan ? null : (
                  <>
                     {/* <Image src={CameraRecording} /> */}
                     {/* <Image src={CameraRecording} /> */}
                     {/* <span className='cameraText'>View Camera Recording</span> */}

                     {/* { <Text
                        className="fw500 ml-2"
                        size="Small"
                        color="primaryColor"
                        text={"View Camera Recording"}
                        onClick={() => handleViewRecording()}
                     /> } */}
                  </>
               )}{" "}
            </div>
         );
      }
   };

   const [remoteUnlockResponse, setRemoteUnlockresponse] = useState({});
   const [remoteOTPResponse, setRemoteOTPresponse] = useState({});
   const [showRemoteUnlockModal, setShowRemoteUnlockModal] = useState(false);
   const [showRemoteOTPModal, setShowRemoteOTPModal] = useState(false);
   const [remoteUnlockErr , setRemoteUnlockErr] = useState(false);
   const [remoteOTPErr , setRemoteOTPErr] = useState(false);

   const remoteUnLock = async () => {
      let map = {
         propertyId: propertyId,
         userId: ownerId,
         consumer_requested: false
      }
      const response = await remoteUnlock(map);
      console.log(response)
      if(response?.data?.resourceData?.status === 200) {
         setRemoteUnlockresponse(response.data.resourceData)
         remoteUnlockShow()
      } else {
         setRemoteUnlockresponse(response?.data)
         console.log(response?.data)
         setRemoteUnlockErr(true)
      }
   }

   const remoteUnlockShow = () => {
      setShowRemoteUnlockModal(true)
   }
   const remoteUnlockHide = () => {
      setShowRemoteUnlockModal(false)
   }
   const remoteOTPShow = () => {
      setShowRemoteOTPModal(true)
   }
   const remoteOTPHide = () => {
      setShowRemoteOTPModal(false)
   }
   const remoteOtp = async () => {
      let map = {
         propertyId: propertyId,
         userId: ownerId,
         consumer_requested: false
      }
      const response = await remoteOTP(map);
      console.log(response)
      if(response?.data?.resourceData?.status === 200) {
         setRemoteOTPresponse(response.data.resourceData)
         remoteOTPShow()
      } else {
         setRemoteOTPresponse(response?.data)
         setRemoteOTPErr(true)
      }
   }

   const handleDelete = async () => {
      const response = await deletePropertyById({ propertyId })
      if (response?.data?.status === 200) {
         console.log(response)
         showSuccessToast("Property deleted successfully");
         history.push("/admin/property")
      }
   }
   return (
      <>
         {Object.keys(propertyData).length > 0 ? (
            <div>
               <Row>
                  <Col md={8}>
                     {propertyData.propertyImageResp.length > 0 ? (
                        <ImageSliderComponent
                           imagesArr={propertyData.propertyImageResp}
                           deleteImageHandler={deleteImageHandler}
                           fileUpload={fileUpload}
                           imageLoader={imageLoader}
                        />
                     ) : (
                        <ImageSliderComponent fileUpload={fileUpload} imageLoader={imageLoader} />
                     )}
                     <div className="my-0 pb-3 border-bottom">
                        <h5 className="d-flex justify-content-between font-weight-bold mb-0">
                           <div className="d-grid">
                              <Text
                                 size="large"
                                 fontWeight="mediumbold"
                                 color="secondry-color"
                                 text={`Flat/House  ${propertyData.houseNumber || "-"}, ${propertyData.towerName ? `${propertyData.towerName},` : ""
                                    } ${propertyData.societyDetailResponse.societyName}`}
                              />
                              <Text
                                 className="fw500"
                                 size="Small"
                                 fontWeight="smbold"
                                 color="secondry-color"
                                 text={propertyData.societyDetailResponse.locality || "-"}
                              />
                           </div>

                           <div className="d-grid">
                              <Text
                                 size="large"
                                 fontWeight="mediumbold"
                                 color="secondry-color"
                                 text={
                                    propertyData.propertyCategory === "Sale"
                                       ? `${setPrice(propertyData.propertyRate)}`
                                       : `${setPrice(propertyData.propertyRate)}/month`
                                 }
                              />
                              <Text
                                 className="fw500"
                                 size="Small"
                                 fontWeight="smbold"
                                 color="secondry-color"
                                 text={
                                    propertyData.propertyCategory === "Lease"
                                       ? "For Rent"
                                       : `For ${propertyData.propertyCategory || "-"}`
                                 }
                              />
                           </div>
                        </h5>
                     </div>
                  </Col>
                  <Col md={4} className="mb-3">
                     <Link
                        className="float-right editButton"
                        to={{
                           pathname: "/admin/property/edit-property",
                           state: { editpropertyData: propertyData },
                        }}
                     ></Link>

                     {propertyAnalyticsData.isLoading ? (
                        <Loader />
                     ) : (
                        <div className="bg-white rounded px-3 py-3 border">
                           {!propertyData.uninstallationDone ?
                              <div className="statusDiv">
                                 {/* { propertyData?.cameraPlan? */}
                                 {/* {propertyAnalyticsData?.basicPlan ? '' :   */}

                                 {/* }  */}
                                 {propertyData.propertyType === "Commercial" ? (

                                    <div className="lock-div">
                                       {showCameraButton()}
                                       <div className="lockIcon">
                                          {/* <img src={smartLock} /> */}
                                       </div>
                                       {/* <div>
                                       Smartlock Power % : {smartdoorBattery}%
                                    </div> */}
                                       {propertyData?.smartLockProperty === true && propertyData?.deleted === false && propertyData.status === "UNDER REVIEW" ?
                                          <>
                                             <Text
                                                className=" mt-2"
                                                size="xSmall"
                                                fontWeight="xsemibold"
                                                color="primaryColor"
                                                text={`Power: ${smartdoorBattery}%`}
                                             />
                                             <Text
                                                className=" mt-2"
                                                size="xSmall"
                                                fontWeight="xsemibold"
                                                color="primaryColor"
                                                text={`SmartLock Admin Passcode: ${smartlockAdminPassCode}`}
                                             />
                                             <Text
                                                className=" mt-2"
                                                size="xSmall"
                                                fontWeight="xsemibold"
                                                color="primaryColor"
                                                text={`Contact sensor status: ${door_status}`}
                                             />
                                             <Text
                                                className=" mt-2"
                                                size="xSmall"
                                                fontWeight="xsemibold"
                                                color="primaryColor"
                                                text={`Camera ID: ${cameraData[0]?.uuId}`}
                                             />

                                          </> : null
                                       }
                                       {propertyData.basicPlan ? null : (
                                          <>
                                             {door_status ? (
                                                <div style={{ "display": "flex" }}>
                                                   {/* <Text
                                                
                                                className=" mt-2"
                                                size="xSmall"
                                                fontWeight="xsemibold"
                                                color="primaryColor"
                                                text={`Door Status: ${door_status}`}
                                             /> */}

                                                   {door_status === "Open" ?
                                                      <img className="LockIconOpen" src={LockOpen} />

                                                      : <img className="LockIconClose" onClick={() => doorClose(smartLockData)} src={LockClose} />
                                                   }

                                                   {/* <Buttons
                                             onClick={() => doorClose(smartLockData)}
                                             name="Door Open"
                                             varient="primary"
                                             type="submit"
                                             size="Small"
                                             color="white"
                                          /> */}
                                                </div>
                                             ) : null}
                                             {censorBattery_status ? (
                                                <Text
                                                   className=" mt-2"
                                                   size="xSmall"
                                                   fontWeight="xsemibold"
                                                   color="primaryColor"
                                                   text={`Sensor Power: ${censorBattery_status}%`}
                                                />
                                             ) : null}
                                          </>
                                       )}
                                    </div>
                                 ) : null}
                              </div> : ''}

                           {showCameraDD ? (
                              <select
                                 class="form-select"
                                 aria-label="Default select example"
                                 className="select-dd"
                                 onChange={(e) => {
                                    setCameraSno(e.target.value);
                                    handleDeviceInterface(e.target.value);
                                 }}
                              >
                                 <option selected>Select camera</option>
                                 {cameraData.length
                                    ? cameraData.map((cItem, cIndx) => {
                                       return (
                                          <option value={cItem.uuId} key={cIndx}>{`camera ${cIndx + 1
                                             } (${cItem.nickName})`}</option>
                                       );
                                    })
                                    : ""}
                              </select>
                           ) : (
                              ""
                           )}

                           {/* </div> */}

                           {/* <div><span className="TaupeGrey fs-12 fw500">Description</span></div> */}
                           <div className="d-flex">
                              {showQr ?
                                 <>
                                    <Buttons
                                       onClick={() => qrGenerator(smartLockData)}
                                       name="Print QR"
                                       varient="primary"
                                       size="xSmall"
                                       color="white"
                                       className="mt-2 mb-2" /> &nbsp;&nbsp;
                                 </>
                                 : null}

                              {propertyData?.smartLockProperty === true && propertyData?.deleted === false ?
                                 <>
                                    <Link
                                       to={{
                                          pathname: "/admin/property/property-devices",
                                          state: {
                                             propertyId: propertyData.smartdoorPropertyId,
                                             smartLockData: smartLockData,
                                             propertyDocsResp:
                                                propertyData.propertyDocsResp,
                                             userId: userId
                                          },
                                       }}
                                    >
                                       <Buttons
                                          style={{ float: 'right' }}
                                          name="Show Device Data"
                                          varient="primary"
                                          size="xSmall"
                                          color="white"
                                          className="mt-2 mb-2" />
                                    </Link>
                                 </>
                                 : null}
                           </div>

                           <div className="d-flex">
                              {propertyData?.smartLockProperty === true && propertyData?.deleted === false ? (
                                 <>
                                    <Buttons
                                       style={{ float: 'right' }}
                                       name="Remote Unlock"
                                       varient="primary"
                                       size="xSmall"
                                       color="white"
                                       className="mt-2 mb-2"
                                       onClick={() => { remoteUnLock() }} /> &nbsp; &nbsp;
                                    <Buttons
                                       style={{ float: 'right' }}
                                       name="Remote OTP"
                                       varient="primary"
                                       size="xSmall"
                                       color="white"
                                       className="mt-2 mb-2"
                                       onClick={() => { remoteOtp() }} />
                                 </>
                              ) : (null)}
                           </div>

                           <div className="d-flex">
                              <Buttons
                                 style={{ float: 'left' }}
                                 name="Edit Property"
                                 varient="primary"
                                 size="xSmall"
                                 color="white"
                                 className=" mb-2"
                                 onClick={() => { history.push('/admin/property/edit-basic-details', { propertyData: propertyData }) }} /> &nbsp; &nbsp;

                              {propertyData?.smartLockProperty === false ?
                                 <>
                                    <Buttons
                                       style={{ float: 'left' }}
                                       name="Delete"
                                       varient="primary"
                                       size="xSmall"
                                       color="white"
                                       className=" mb-2 bg-danger"
                                       onClick={() => { handleDelete() }} />
                                 </> : <></>}
                           </div>

                           <Text
                              className="fw500 mt-5"
                              size="xSmall"
                              color="TaupeGrey"
                              text="Description"
                           />

                           {/* <p className="mb-0 fs-13">{propertyAnalyticsData.data.description || ''}</p> */}
                           {/* <Text className="fw500" size="Small" color="secondry-color" text={propertyAnalyticsData.data.description || ''} /> */}
                           <Text
                              className="fw500"
                              size="Small"
                              color="secondry-color"
                              text={propertyAnalyticsData.data.description || ""}
                           />

                           <div className="mapLocation my-3">
                              {/* <div style={{height: '120px',overflow: 'hidden'}}>
                     <MapComponent p_lat ="22.7196" p_lng ="75.8577" />
                  </div> */}
                              <div style={{ height: "120px", overflow: "hidden" }}>
                                 <MapComponent
                                    p_lat={propertyData.latitude}
                                    p_lng={propertyData.longitude}
                                 />
                              </div>
                              <hr />
                           </div>

                           <div className="mt-0"></div>
                           {/* <h5 className="d-flex justify-content-between font-weight-bold my-3"> */}
                           <div className="d-grid">
                              {/* <span>Analytics</span> */}
                              <Text
                                 size="large"
                                 fontWeight="mediumbold"
                                 color="secondry-color"
                                 text={"Analytics"}
                              />

                              {/* <small className="fs-12 d-block mt-1 fw500">{(propertyAnalyticsData.data.registerdOn === null) ? 'Published On: - ' : `Published On: ${formateDate(propertyAnalyticsData.data.registerdOn) || '-'}`}</small> */}
                              <Text
                                 className="fw500"
                                 size="Small"
                                 fontWeight="semibold"
                                 color="secondry-color"
                                 text={
                                    propertyAnalyticsData.data.registerdOn === null
                                       ? "Published On: - "
                                       : `Published On: ${formateDate(propertyAnalyticsData.data.registerdOn) ||
                                       "-"
                                       }`
                                 }
                              />
                           </div>

                           {/* </h5> */}

                           <table className="w-100">
                              <tbody>
                                 <tr>
                                    <td className="pl-0 ">
                                       {/* <div className="text-muted fs-12">Users Visited</div>
                           <p className="mb-0 fs-14 font-weight-bold">{propertyAnalyticsData.data.userVisited}</p> */}

                                       <Text
                                          size="xSmall"
                                          fontWeight="fw500"
                                          color="TaupeGrey"
                                          text={"Users Visited"}
                                       />
                                       <Text
                                          size="Small"
                                          fontWeight="mediumbold"
                                          color="secondry-color"
                                          text={propertyAnalyticsData.data.userVisited}
                                       />
                                    </td>
                                    <td className="p-2">
                                       {/* <div className="text-muted fs-12">Meetings Done</div>
                           <p className="mb-0 fs-14 font-weight-bold">{propertyAnalyticsData.data.meetingDone}</p> */}

                                       <Text
                                          size="xSmall"
                                          fontWeight="fw500"
                                          color="TaupeGrey"
                                          text={"Meetings Done"}
                                       />
                                       <Text
                                          size="Small"
                                          fontWeight="mediumbold"
                                          color="secondry-color"
                                          text={propertyAnalyticsData.data.meetingDone}
                                       />
                                    </td>
                                    <td className="p-2">
                                       {/* <div className="text-muted fs-12">Favorited</div>
                           <p className="mb-0 fs-14 font-weight-bold">{propertyAnalyticsData.data.favouriteCount}</p> */}

                                       <Text
                                          size="xSmall"
                                          fontWeight="fw500"
                                          color="TaupeGrey"
                                          text={"Favorited"}
                                       />
                                       <Text
                                          size="Small"
                                          fontWeight="mediumbold"
                                          color="secondry-color"
                                          text={propertyAnalyticsData.data.favouriteCount}
                                       />
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="pl-0">
                                       {/* <div className="text-muted fs-12">Upcoming Visits</div>
                           <p className="mb-0 fs-14 font-weight-bold">{propertyAnalyticsData.data.upcomingVisits}</p> */}

                                       <Text
                                          size="xSmall"
                                          fontWeight="fw500"
                                          color="TaupeGrey"
                                          text={"Upcoming Visits"}
                                       />
                                       <Text
                                          size="Small"
                                          fontWeight="mediumbold"
                                          color="secondry-color"
                                          text={propertyAnalyticsData.data.upcomingVisits}
                                       />
                                    </td>
                                    <td className="p-2">
                                       {/* <div className="text-muted fs-12">Cancelled Deals</div>
                           <p className="mb-0 fs-14 font-weight-bold">{propertyAnalyticsData.data.dealCancelled}</p> */}

                                       <Text
                                          size="xSmall"
                                          fontWeight="fw500"
                                          color="TaupeGrey"
                                          text={"Cancelled Deals"}
                                       />
                                       <Text
                                          size="Small"
                                          fontWeight="mediumbold"
                                          color="secondry-color"
                                          text={propertyAnalyticsData.data.dealCancelled}
                                       />
                                    </td>
                                    <td className="p-2">
                                       {/* <span className="text-muted fs-12">User Views</span>
                           <p className="mb-0 fs-14 font-weight-bold">{propertyAnalyticsData.data.userVisited}</p> */}

                                       {/* <Text size="xSmall" fontWeight="fw500" color="TaupeGrey" text={'User Views'} />
                           <Text size="Small" fontWeight="mediumbold" color="secondry-color" text={propertyAnalyticsData.data.userVisited} /> */}
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                           <hr />
                           <div className="ownerInfoWrap">
                              <Text
                                 fontWeight="mediumbold"
                                 color="secondry-color"
                                 text="Owner Info"
                                 className="mb-3 fs16 mt-2"
                              />
                              {propertyData.ownerName === null ? null : (
                                 <div className="d-flex justify-content-between mb-2 propertyOwnerInfoWrap align-items-baseline">
                                    <div className="d-flex userName propertyOwnerInfoWrapFirst mb-3 align-items-end">
                                       <div className="uName">
                                          <img
                                             src={propertyData.ownerImageUrl || userImg}
                                             className="rounded-circle object-cover"
                                             width="50px"
                                             height="50px"
                                          />
                                       </div>
                                       <div className="flex-1 align-items-center ml-2 ownerdetail">
                                          {/* <p className="mb-0 fs-13 font-weight-bold">{propertyData.ownerName || '-'}</p>
                            <small className="d-block">{propertyData.ownerMobileNumber || '-'}</small> */}
                                          <ToolTip
                                             position="top"
                                             name={propertyData.ownerName || "-"}
                                          >
                                             <Text
                                                size="Small"
                                                fontWeight="mediumbold"
                                                className="userName"
                                                color="secondry-color"
                                                text={propertyData.ownerName || "-"}
                                             />
                                          </ToolTip>
                                          <Text
                                             className="fw500 wordWrap"
                                             size="xSmall"
                                             color="secondry-color"
                                             text={propertyData.ownerMobileNumber || "-"}
                                          />
                                       </div>
                                    </div>
                                    <div className="msgtoowner propertyOwnerInfoWrapLast">
                                       {/* <ToolTip position="left" name="Under development"> */}
                                       <span className="btnNew">
                                          <Buttons
                                             onClick={() => setShowMsgModal(true)}
                                             disabled={
                                                propertyData.ownerNotAvailable ? true : false
                                             }
                                             name="Owner"
                                             varient="primary"
                                             type="submit"
                                             size="Small"
                                             color="white"
                                             iconSrc={mailIcon}
                                          />
                                          {/* <img color='red' src={mailIcon} /> */}
                                       </span>
                                       {/* </ToolTip> */}

                                       <ToolTip position="top" name="Property Document">
                                          {propertyData?.ownerNotAvailable ? (
                                             <img
                                                className={
                                                   "doc docOwner" + propertyData?.ownerNotAvailable
                                                      ? "doc docOwner disabled-icon"
                                                      : ""
                                                }
                                                src={doc}
                                             />
                                          ) : (
                                             <Link
                                                to={{
                                                   pathname: "/admin/property/property-documents",
                                                   state: {
                                                      propertyId: propertyData.smartdoorPropertyId,
                                                      propertyDocsResp:
                                                         propertyData.propertyDocsResp,
                                                      userId: userId
                                                   },
                                                }}
                                             >
                                                {/* <Buttons name="View Property Documents" varient="buttonGray" type="submit" size="Small" color="" className="ml-3 " /> */}
                                                <img className="doc docOwner" src={doc} />
                                             </Link>
                                          )}
                                       </ToolTip>
                                    </div>
                                 </div>
                              )}
                           </div>
                           <div className="ownerInfoWrap">
                              <div className="d-flex justify-content-between mb-2 propertyOwnerInfoWrap align-items-baseline">
                                 <div className="d-flex userName propertyOwnerInfoWrapFirst mb-3 align-items-end">
                                    <div className="uName">
                                       <img
                                          src={propertyData.imageUrl || userImg}
                                          className="rounded-circle object-cover"
                                          width="50px"
                                          height="50px"
                                       />
                                    </div>
                                    <div className="flex-1 ml-2 ownerdetail">
                                       {/* <p className="mb-0 fs-13 font-weight-bold">{propertyData.propertyPostedBy || '-'}</p>
                          <small className="d-block">{propertyData.phoneNumber || '-'}</small> */}

                                       <ToolTip
                                          position="top"
                                          name={propertyData.propertyPostedBy || "-"}
                                       >
                                          <Text
                                             size="Small"
                                             fontWeight="mediumbold"
                                             className="userName"
                                             color="secondry-color"
                                             text={propertyData.propertyPostedBy || "-"}
                                          />
                                       </ToolTip>
                                       <Text
                                          className="fw500"
                                          size="xSmall"
                                          color="secondry-color"
                                          text={propertyData.phoneNumber || "-"}
                                       />
                                    </div>
                                 </div>
                                 <div className="msgtoowner propertyOwnerInfoWrapLast">
                                    <span className="btnNew">
                                       {propertyData?.ownerName === null ? (
                                          <>
                                             <Buttons
                                                onClick={() => setShowMsgModal(true)}
                                                name={propertyData.ownerName ? "Realtor" : "Owner"}
                                                varient="primary"
                                                type="submit"
                                                size="Small"
                                                color="white"
                                                iconSrc={mailIcon}
                                             />
                                             <ToolTip position="top" name="Property Document">
                                                <Link
                                                   to={{
                                                      pathname:
                                                         // props.module==='EXECUTION SALES LEAD'?'/admin/sales/sales-lead/consumer/property/property-documents':
                                                         "/admin/property/property-documents",
                                                      state: {
                                                         propertyId:
                                                            propertyData.smartdoorPropertyId,
                                                         propertyDocsResp:
                                                            propertyData.propertyDocsResp,
                                                         userId: userId
                                                      },
                                                   }}
                                                >
                                                   {/* <Buttons name="View Property Documents" varient="buttonGray" type="submit" size="Small" color="" className="ml-3 " /> */}
                                                   <img className="doc docOwner" src={doc} />
                                                </Link>
                                             </ToolTip>
                                          </>
                                       ) : (
                                          <>
                                             <Buttons
                                                disabled={
                                                   propertyData?.ownerNotAvailable ? false : true
                                                }
                                                onClick={() => setShowMsgModal(true)}
                                                name={propertyData.ownerName ? "Realtor" : "Owner"}
                                                varient="primary"
                                                type="submit"
                                                size="Small"
                                                color="white"
                                                iconSrc={mailIcon}
                                             />
                                             <ToolTip position="top" name="Property Document">
                                                {propertyData?.ownerNotAvailable ? (
                                                   <Link
                                                      style={{
                                                         pointerEvents:
                                                            propertyData.ownerNotAvailable
                                                               ? ""
                                                               : "none",
                                                      }}
                                                      to={{
                                                         pathname:
                                                            // props.module==='EXECUTION SALES LEAD'?'/admin/sales/sales-lead/consumer/property/property-documents':
                                                            "/admin/property/property-documents",
                                                         state: {
                                                            propertyId:
                                                               propertyData.smartdoorPropertyId,
                                                            propertyDocsResp:
                                                               propertyData.propertyDocsResp,
                                                            userId: userId
                                                         },
                                                      }}
                                                   >
                                                      {/* <Buttons name="View Property Documents" varient="buttonGray" type="submit" size="Small" color="" className="ml-3 " /> */}
                                                      <img className={"doc docOwner "} src={doc} />
                                                   </Link>
                                                ) : (
                                                   <img
                                                      className={
                                                         "doc docOwner " +
                                                            propertyData?.ownerNotAvailable
                                                            ? "doc docOwner"
                                                            : "disabled-icon "
                                                      }
                                                      src={doc}
                                                   />
                                                )}
                                             </ToolTip>
                                          </>
                                       )}
                                    </span>
                                    {/* '/admin/property/property-documents' */}
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}
                  </Col>
               </Row>

               <Row>
                  <Col md={12} className="propertyDetailsTable">
                     <table className="w-100 bg-white">
                        {/* First ROW */}
                        {propertyData.propertyType !== "Commercial" ? (
                           <tr>
                              <td className="p-2">
                                 <Text
                                    size="xSmall"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={"Hall"}
                                 />
                                 <Text
                                    size="Small"
                                    fontWeight="semibold"
                                    color="secondryColor"
                                    text={propertyData.hall}
                                 />
                              </td>
                              <td className="p-2">
                                 <Text
                                    size="xSmall"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={"Kitchen"}
                                 />
                                 <Text
                                    size="Small"
                                    fontWeight="semibold"
                                    color="secondryColor"
                                    text={propertyData.kitchen || "-"}
                                 />
                              </td>
                              <td className="p-2">
                                 <Text
                                    size="xSmall"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={"Beds"}
                                 />
                                 <Text
                                    size="Small"
                                    fontWeight="semibold"
                                    color="secondryColor"
                                    text={propertyData.bedRooms || "-"}
                                 />
                              </td>
                              <td className="p-2">
                                 <Text
                                    size="xSmall"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={"Baths"}
                                 />
                                 <Text
                                    size="Small"
                                    fontWeight="semibold"
                                    color="secondryColor"
                                    text={propertyData.numberOfBath || "-"}
                                 />
                              </td>
                           </tr>
                        ) : null}
                        {propertyData.propertyType === "Commercial" ? (
                           <tr>
                              <td className="p-2">
                                 <Text
                                    size="xSmall"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={"Commercial Area"}
                                 />
                                 <Text
                                    size="Small"
                                    fontWeight="semibold"
                                    color="secondryColor"
                                    text={propertyData.propertyInfoResponse.commercialArea}
                                 />
                              </td>
                              <td className="p-2">
                                 <Text
                                    size="xSmall"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={"Commercial Type"}
                                 />
                                 <Text
                                    size="Small"
                                    fontWeight="semibold"
                                    color="secondryColor"
                                    text={propertyData.propertyInfoResponse.commercialType || "-"}
                                 />
                              </td>
                              <td className="p-2">
                                 <Text
                                    size="xSmall"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={"commonReception"}
                                 />
                                 <Text
                                    size="Small"
                                    fontWeight="semibold"
                                    color="secondryColor"
                                    text={propertyData.propertyInfoResponse.commonReception || "-"}
                                 />
                              </td>
                              <td className="p-2">
                                 <Text
                                    size="xSmall"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={"Kitchen Pantry"}
                                 />
                                 <Text
                                    size="Small"
                                    fontWeight="semibold"
                                    color="secondryColor"
                                    text={propertyData.propertyInfoResponse.kitchenPantry || "-"}
                                 />
                              </td>
                           </tr>
                        ) : null}

                        {/* Second Row */}
                        <tr>
                           <td className="p-2">
                              <Text
                                 size="xSmall"
                                 fontWeight="bold"
                                 color="secondryColor"
                                 text={"Entrance Facing"}
                              />
                              <Text
                                 size="Small"
                                 fontWeight="semibold"
                                 color="secondryColor"
                                 text={
                                    propertyData.propertyInfoResponse.enteranceFacing
                                       ? propertyData.propertyInfoResponse.enteranceFacing
                                       : "-"
                                 }
                              />
                           </td>
                           <td className="p-2">
                              <Text
                                 size="xSmall"
                                 fontWeight="bold"
                                 color="secondryColor"
                                 text={"Security"}
                              />
                              <Text
                                 size="Small"
                                 fontWeight="semibold"
                                 color="secondryColor"
                                 text={propertyData.propertyInfoResponse.security || "-"}
                              />
                           </td>
                           <td className="p-2">
                              <Text
                                 size="xSmall"
                                 fontWeight="bold"
                                 color="secondryColor"
                                 text={"Majority Composition"}
                              />
                              <Text
                                 size="Small"
                                 fontWeight="semibold"
                                 color="secondryColor"
                                 text={propertyData.propertyInfoResponse.majorityComposition || "-"}
                              />
                           </td>
                           <td className="p-2">
                              <Text
                                 size="xSmall"
                                 fontWeight="bold"
                                 color="secondryColor"
                                 text={"Distance To Convenience Store"}
                              />
                              <Text
                                 size="Small"
                                 fontWeight="semibold"
                                 color="secondryColor"
                                 text={propertyData.propertyInfoResponse.storeDistance || "-"}
                              />
                           </td>
                        </tr>

                        {/* Third Row */}

                        <tr>
                           <td className="p-2">
                              <Text
                                 size="xSmall"
                                 fontWeight="bold"
                                 color="secondryColor"
                                 text={"Area"}
                              />
                              <Text
                                 size="Small"
                                 fontWeight="semibold"
                                 color="secondryColor"
                                 text={
                                    propertyData.carpetArea === null
                                       ? "-"
                                       : propertyData.carpetArea + " Sq. Ft."
                                 }
                              />
                           </td>
                           <td className="p-2">
                              <Text
                                 size="xSmall"
                                 fontWeight="bold"
                                 color="secondryColor"
                                 text={"Property Type"}
                              />
                              <Text
                                 size="Small"
                                 fontWeight="semibold"
                                 color="secondryColor"
                                 text={propertyData.propertySubType || "-"}
                              />
                           </td>
                           <td className="p-2">
                              <Text
                                 size="xSmall"
                                 fontWeight="bold"
                                 color="secondryColor"
                                 text={"Property Category"}
                              />
                              <Text
                                 size="Small"
                                 fontWeight="semibold"
                                 color="secondryColor"
                                 text={propertyData.propertyType || "-"}
                              />
                           </td>
                           <td className="p-2">
                              <Text
                                 size="xSmall"
                                 fontWeight="bold"
                                 color="secondryColor"
                                 text={"Negotiable"}
                              />
                              <Text
                                 size="Small"
                                 fontWeight="semibold"
                                 color="secondryColor"
                                 text={propertyData.negotiable.toString() === "true" ? "Yes" : "No"}
                              />
                           </td>
                        </tr>

                        {showMore ? (
                           //  Fourth Row
                           <tr>
                              {/* {propertyData.propertyCategory === 'Sale' || propertyData.propertyCategory === 'Buy' ? */}
                              <td className="p-2">
                                 <Text
                                    size="xSmall"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={"Property Age"}
                                 />
                                 <Text
                                    size="Small"
                                    fontWeight="semibold"
                                    color="secondryColor"
                                    text={
                                       propertyData?.propertyInfoResponse?.propertyAge
                                          ? `${propertyData?.propertyInfoResponse?.propertyAge} Years`
                                          : "-"
                                    }
                                 />
                              </td>
                              {/* // : null } */}
                              <td className="p-2">
                                 <Text
                                    size="xSmall"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={"Religious Place"}
                                 />
                                 <Text
                                    size="Small"
                                    fontWeight="semibold"
                                    color="secondryColor"
                                    text={
                                       propertyData?.propertyInfoResponse?.religiousPlace
                                          ? propertyData?.propertyInfoResponse?.religiousPlace
                                          : "-"
                                    }
                                 />
                              </td>
                              <td className="p-2">
                                 <Text
                                    size="xSmall"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={"Coverd Parking"}
                                 />
                                 <Text
                                    size="Small"
                                    fontWeight="semibold"
                                    color="secondryColor"
                                    text={
                                       propertyData.propertyInfoResponse.coveredParking
                                          ? propertyData.propertyInfoResponse.coveredParking
                                          : "-"
                                    }
                                 />
                              </td>
                              <td className="p-2">
                                 <Text
                                    size="xSmall"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={"Open Parking"}
                                 />
                                 <Text
                                    size="Small"
                                    fontWeight="semibold"
                                    color="secondryColor"
                                    text={
                                       propertyData.propertyInfoResponse.openParking
                                          ? propertyData?.propertyInfoResponse?.openParking
                                          : "-"
                                    }
                                 />
                              </td>
                           </tr>
                        ) : null}
                        {showMore ? (
                           // Fifth Row
                           <tr>
                              {propertyData.propertyInfoResponse.loanFromBank ? (
                                 <td className="p-2">
                                    <Text
                                       size="xSmall"
                                       fontWeight="bold"
                                       color="secondryColor"
                                       text={"Loan From Bank"}
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="semibold"
                                       color="secondryColor"
                                       text={
                                          propertyData?.propertyInfoResponse?.loanFromBank
                                             ? propertyData?.propertyInfoResponse?.loanFromBank
                                             : "-"
                                       }
                                    />
                                 </td>
                              ) : null}
                              {propertyData.propertyType === "Commercial" ? (
                                 <td className="p-2">
                                    <Text
                                       size="xSmall"
                                       fontWeight="bold"
                                       color="secondryColor"
                                       text={"Rest Room"}
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="semibold"
                                       color="secondryColor"
                                       text={
                                          propertyData?.propertyInfoResponse?.restRoom
                                             ? propertyData?.propertyInfoResponse?.restRoom
                                             : "-"
                                       }
                                    />
                                 </td>
                              ) : null}
                              {/* {propertyData.propertyType !== "Commercial" ?
                      <td className="p-2">
                        <Text className='fw500' size="xSmall" fontWeight="semibold" color="TaupeGrey" text={'Balcony'} />
                        <Text size="Small" fontWeight="mediumbold" color="secondry-color" text={(propertyData?.propertyInfoResponse?.balconyOpenArea === null) ? '-' : propertyData?.propertyInfoResponse?.balconyOpenArea + ' Sq. Ft.'} />
                      </td>
                      : null} */}
                              {propertyData.propertyType !== "Commercial" ? (
                                 <td className="p-2">
                                    <Text
                                       size="xSmall"
                                       fontWeight="bold"
                                       color="secondryColor"
                                       text={"Balcony"}
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="semibold"
                                       color="secondryColor"
                                       text={propertyData?.propertyInfoResponse?.balcony || "-"}
                                    />
                                 </td>
                              ) : null}

                              {propertyData.propertySubType === "Independent House/Villa" ? (
                                 <td className="p-2">
                                    <Text
                                       size="xSmall"
                                       fontWeight="bold"
                                       color="secondryColor"
                                       text={"Plot Size"}
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="semibold"
                                       color="secondryColor"
                                       text={
                                          propertyData.propertyInfoResponse.plotArea
                                             ? propertyData.propertyInfoResponse.plotArea +
                                             " Sq. Ft."
                                             : "-"
                                       }
                                    />
                                 </td>
                              ) : null}
                           </tr>
                        ) : null}
                        {showMore ? (
                           // Sixth Row
                           <tr>
                              {propertyData.propertyCategory === "Lease" &&
                                 propertyData.propertyType !== "Commercial" ? (
                                 <td className="p-2">
                                    <Text
                                       size="xSmall"
                                       fontWeight="bold"
                                       color="secondryColor"
                                       text={"Preferred For"}
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="semibold"
                                       color="secondryColor"
                                       text={propertyData.preferredFor || "-"}
                                    />
                                 </td>
                              ) : null}
                              {propertyData.propertyCategory === "Lease" &&
                                 propertyData.propertyType !== "Commercial" ? (
                                 <td className="p-2">
                                    <Text
                                       size="xSmall"
                                       fontWeight="bold"
                                       color="secondryColor"
                                       text={"Purpose"}
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="semibold"
                                       color="secondryColor"
                                       text={propertyData.purpose || "-"}
                                    />
                                 </td>
                              ) : null}
                           </tr>
                        ) : null}
                        {showMore ? (
                           //  Seventh Row
                           <tr>
                              <td className="p-2">
                                 <Text
                                    size="xSmall"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={"Maintenance Charges (Monthly)"}
                                 />
                                 <Text
                                    size="Small"
                                    fontWeight="semibold"
                                    color="secondryColor"
                                    text={
                                       propertyData.propertyInfoResponse.maintenceCost
                                          ? `₹${propertyData.propertyInfoResponse.maintenceCost}`
                                          : "-"
                                    }
                                 />
                              </td>
                              <td className="p-2">
                                 <Text
                                    size="xSmall"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={"Attached Open Area/Garden"}
                                 />
                                 <Text
                                    size="Small"
                                    fontWeight="semibold"
                                    color="secondryColor"
                                    text={
                                       propertyData.propertyInfoResponse.attachedOpenAreaOrGarden
                                          ? propertyData.propertyInfoResponse
                                             .attachedOpenAreaOrGarden + " Sq. Ft."
                                          : "-"
                                    }
                                 />
                              </td>
                              <td className="p-2">
                                 <Text
                                    size="xSmall"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={"Attached Open Terrace Area"}
                                 />
                                 <Text
                                    size="Small"
                                    fontWeight="semibold"
                                    color="secondryColor"
                                    text={
                                       propertyData.propertyInfoResponse.attachedOpenTerraceArea
                                          ? propertyData.propertyInfoResponse
                                             .attachedOpenTerraceArea + " Sq. Ft."
                                          : "-"
                                    }
                                 />
                              </td>
                              <td className="p-2">
                                 <Text
                                    size="xSmall"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={"Extras"}
                                 />
                                 <Text
                                    size="Small"
                                    fontWeight="semibold"
                                    color="secondryColor"
                                    text={
                                       propertyData.propertyInfoResponse.extras
                                          ? `${propertyData.propertyInfoResponse.extras}`
                                          : "-"
                                    }
                                 />
                              </td>
                           </tr>
                        ) : null}
                        {showMore ? (
                           //  Eighth Row
                           <tr>
                              <td className="p-2">
                                 <Text
                                    size="xSmall"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={"Floor No"}
                                 />
                                 <Text
                                    size="Small"
                                    fontWeight="semibold"
                                    color="secondryColor"
                                    text={
                                       propertyData?.propertyInfoResponse?.floor
                                          ? propertyData?.propertyInfoResponse?.floor
                                          : "-"
                                    }
                                 />
                              </td>
                              <td className="p-2">
                                 <Text
                                    size="xSmall"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={"Total Floor"}
                                 />
                                 <Text
                                    size="Small"
                                    fontWeight="semibold"
                                    color="secondryColor"
                                    text={
                                       propertyData?.propertyInfoResponse?.totalFloor
                                          ? propertyData?.propertyInfoResponse?.totalFloor
                                          : "-"
                                    }
                                 />
                              </td>
                              <td className="p-2">
                                 <Text
                                    size="xSmall"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={"Amenities"}
                                 />
                                 <Text
                                    size="Small"
                                    fontWeight="semibold"
                                    color="secondryColor"
                                    text={
                                       propertyData?.propertyInfoResponse?.amenities
                                          ? `${propertyData?.propertyInfoResponse?.amenities} `
                                          : "-"
                                    }
                                 />
                              </td>
                              {propertyData.propertyCategory === "Lease" ? (
                                 <td className="p-2">
                                    <Text
                                       size="xSmall"
                                       fontWeight="bold"
                                       color="secondryColor"
                                       text={"Lease Type"}
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="semibold"
                                       color="secondryColor"
                                       text={propertyData.leaseType}
                                    />
                                 </td>
                              ) : null}
                           </tr>
                        ) : null}
                        {showMore ? (
                           //  Nineth Row
                           <tr>
                              {propertyData.propertyCategory === "Sale" ? (
                                 <td className="p-2">
                                    <Text
                                       size="xSmall"
                                       fontWeight="bold"
                                       color="secondryColor"
                                       text={"Society Size"}
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="semibold"
                                       color="secondryColor"
                                       text={
                                          propertyData.propertyInfoResponse.contructionSize || "-"
                                       }
                                    />
                                 </td>
                              ) : null}
                              {propertyData.propertyCategory === "Sale" ? (
                                 <td className="p-2">
                                    <Text
                                       size="xSmall"
                                       fontWeight="bold"
                                       color="secondryColor"
                                       text={"Type"}
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="semibold"
                                       color="secondryColor"
                                       text={propertyData.propertyInfoResponse.type || "-"}
                                    />
                                 </td>
                              ) : null}
                              {propertyData.propertyCategory === "Lease" ? null : (
                                 <td className="p-2">
                                    <Text
                                       size="xSmall"
                                       fontWeight="bold"
                                       color="secondryColor"
                                       text={"Furnishing"}
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="semibold"
                                       color="secondryColor"
                                       text={propertyData.furnishBedrooms || "-"}
                                    />
                                 </td>
                              )}
                           </tr>
                        ) : null}
                        {showMore ? (
                           <tr>
                              {propertyData.propertyCategory === "Lease" ? (
                                 <td className="p-2">
                                    <Text
                                       size="xSmall"
                                       fontWeight="bold"
                                       color="secondryColor"
                                       text={"Furnish Bedrooms"}
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="semibold"
                                       color="secondryColor"
                                       text={
                                          propertyData.propertyInfoResponse.furnishBedrooms
                                             ? `${propertyData.propertyInfoResponse.furnishBedrooms} `
                                             : "-"
                                       }
                                    />
                                 </td>
                              ) : null}

                              {propertyData.propertyCategory === "Lease" ? (
                                 <td className="p-2">
                                    <Text
                                       size="xSmall"
                                       fontWeight="bold"
                                       color="secondryColor"
                                       text={"Furnish Hall And Dining"}
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="semibold"
                                       color="secondryColor"
                                       text={
                                          propertyData.propertyInfoResponse.hallAndDining
                                             ? `${propertyData?.propertyInfoResponse?.hallAndDining}`
                                             : "-"
                                       }
                                    />
                                 </td>
                              ) : null}

                              {propertyData.propertyCategory === "Lease" ? (
                                 <td className="p-2">
                                    <Text
                                       size="xSmall"
                                       fontWeight="bold"
                                       color="secondryColor"
                                       text={"Furnish Kitchen"}
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="semibold"
                                       color="secondryColor"
                                       text={
                                          propertyData.propertyInfoResponse.furnishKitchen
                                             ? `${propertyData.propertyInfoResponse.furnishKitchen} `
                                             : "-"
                                       }
                                    />
                                 </td>
                              ) : null}
                              <td className="p-2">
                                 <Text
                                    size="xSmall"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={"Built In"}
                                 />
                                 <Text
                                    size="Small"
                                    fontWeight="semibold"
                                    color="secondryColor"
                                    text={
                                       propertyData.propertyInfoResponse.propertyAge === null
                                          ? "-"
                                          : `${Number(moment().year()) -
                                          propertyData.propertyInfoResponse.propertyAge
                                          }`
                                    }
                                 />
                              </td>
                           </tr>
                        ) : null}
                     </table>
                     <div
                        onClick={() => setShowMore(!showMore)}
                        className="showMore moreinfosection py-4"
                     >
                        {/* {showMore ? 'Less Info' : 'More Info'}  */}

                        <Text
                           className="fs16"
                           alt="show more"
                           fontWeight="mediumbold"
                           color="primaryColor"
                           text={showMore ? "Less Info" : "More Info"}
                        />

                        {/* <Text size="regular" fontWeight="mediumbold" color="primary" text={showMore ? 'Less Info' : 'More Info'} /> */}

                        {showMore ? (
                           <Image className="downarrow" alt="up arrow" src={UpArrow} />
                        ) : (
                           <Image alt="down arrow" src={DownArrow} />
                        )}
                     </div>
                  </Col>
               </Row>

               <Row>
                  <Col md={12} className="propertyDetailsTable mb-5">
                  <Text
                        size="medium"
                        fontWeight="bold"
                        color="secondryColor"
                        text="Current Plan details"
                     />
                     <table className="w-100 bg-white">
                        <tr>
                           <td className="p-2">
                              <Text
                                 size="xSmall"
                                 fontWeight="bold"
                                 color="secondryColor"
                                 text="Plan Name"
                              />
                              <Text
                                 size="Small"
                                 fontWeight="semibold"
                                 color="secondryColor"
                                 text={currentPlanData.planName}
                              />
                           </td>
                           <td className="p-2">
                              <Text
                                 size="xSmall"
                                 fontWeight="bold"
                                 color="secondryColor"
                                 text="Current Plan Start Date"
                              />
                              <Text
                                 size="Small"
                                 fontWeight="semibold"
                                 color="secondryColor"
                                 text={currentPlanData.currentPlanStartDate}
                              />
                           </td>
                           <td className="p-2">
                              <Text
                                 size="xSmall"
                                 fontWeight="bold"
                                 color="secondryColor"
                                 text="Current Plan Expiry Date"
                              />
                              <Text
                                 size="Small"
                                 fontWeight="semibold"
                                 color="secondryColor"
                                 text={currentPlanData.expiryDate}
                              />
                           </td>
                        </tr>
                        <tr>
                           <td className="p-2">
                              <Text
                                 size="xSmall"
                                 fontWeight="bold"
                                 color="secondryColor"
                                 text="Auto Renew Status"
                              />
                              {/* <Text
                                 size="Small"
                                 fontWeight="semibold"
                                 color="secondryColor"
                                 text={currentPlanData.autoRenewStatus ? "YES" : "NO"}
                              /> */}
                              <Switch checked={currentPlanData.autoRenewStatus ? true : false} color="warning" />
                           </td>
                           <td className="p-2">
                              <Text
                                 size="xSmall"
                                 fontWeight="bold"
                                 color="secondryColor"
                                 text="Plan Start Date"
                              />
                              <Text
                                 size="Small"
                                 fontWeight="semibold"
                                 color="secondryColor"
                                 text={currentPlanData.planStartDate}
                              />
                           </td>
                           <td className="p-2">
                              <Text
                                 size="xSmall"
                                 fontWeight="bold"
                                 color="secondryColor"
                                 text="Security Deposit"
                              />
                              <Text
                                 size="Small"
                                 fontWeight="semibold"
                                 color="secondryColor"
                                 text={currentPlanData.securitydeposite}
                              />
                           </td>
                        </tr>
                     </table>
                  </Col>
               </Row>

               <Row>
                  <Col md={12} className="propertyDetailsTable mb-5">
                     <Text
                        size="medium"
                        fontWeight="bold"
                        color="secondryColor"
                        text="Upgrade Plan details"
                     />
                     {upgradePlanData.length > 0 ? <>
                        {upgradePlanData.map((planData) => (
                           <table className="w-100 bg-white">
                              <tr>
                                 <td className="p-2">
                                    <Text
                                       size="xSmall"
                                       fontWeight="bold"
                                       color="secondryColor"
                                       text="Plan Name"
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="semibold"
                                       color="secondryColor"
                                       text={planData.planName}
                                    />
                                 </td>
                                 <td className="p-2">
                                    <Text
                                       size="xSmall"
                                       fontWeight="bold"
                                       color="secondryColor"
                                       text="Current Plan Start Date"
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="semibold"
                                       color="secondryColor"
                                       text={planData.currentPlanStartDate}
                                    />
                                 </td>
                                 <td className="p-2">
                                    <Text
                                       size="xSmall"
                                       fontWeight="bold"
                                       color="secondryColor"
                                       text="Current Plan Expiry Date"
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="semibold"
                                       color="secondryColor"
                                       text={planData.expiryDate}
                                    />
                                 </td>
                              </tr>
                              <tr>
                                 <td className="p-2">
                                    <Text
                                       size="xSmall"
                                       fontWeight="bold"
                                       color="secondryColor"
                                       text="Auto Renew Status"
                                    />
                                    {/* <Text
                                       size="Small"
                                       fontWeight="semibold"
                                       color="secondryColor"
                                       text={currentPlanData.autoRenewStatus ? "YES" : "NO"}
                                    /> */}
                                    <Switch checked={planData.autoRenewStatus ? true : false} color="warning" />
                                 </td>
                                 <td className="p-2">
                                    <Text
                                       size="xSmall"
                                       fontWeight="bold"
                                       color="secondryColor"
                                       text="Plan Start Date"
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="semibold"
                                       color="secondryColor"
                                       text={planData.planStartDate}
                                    />
                                 </td>
                                 <td className="p-2">
                                    <Text
                                       size="xSmall"
                                       fontWeight="bold"
                                       color="secondryColor"
                                       text="Security Deposit"
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="semibold"
                                       color="secondryColor"
                                       text={planData.securitydeposite}
                                    />
                                 </td>
                              </tr>
                           </table>
                        ))}
                     </> :
                     <>
                        <Row>
                           <Col md={12} className="mb-3">
                              <Text
                                 fontSize="40px"
                                 fontWeight="bold"
                                 color="secondryColor"
                                 text="No Plan Details to show"
                              />
                           </Col>
                        </Row>
                     </>}
                  </Col>
               </Row>
               {/* <ConfirmationModal
        title ={ blockData.status ? 'Are you sure you want to unblock this user?':'Are you sure you want to block this user?' }
        // title = "Are you sure you want to decline the request ?"
        cancelButtonName = "Cancel"
        // primaryButtonName = { blockData.isBlocked?'Unblock':'Block' }
        primaryButtonName = {blockData.status ? 'Unblock' : 'Block'}
        show = { show }
        handleClose = { handleClose }
        handleShow = { handleShow }
        handlePerformAction = { ()=> handleRealtorStatus(blockData.id, blockData.status ? "UNBLOCKED" : "BLOCKED" ) }
      /> */}

               <MessageModal
                  show={showMsgModal}
                  handleShow={handleshowMsgModal}
                  handleClose={handleCloseMsgModal}
                  headerText="Message to Owner"
                  subHeaderText="Message"
                  // sendMsgHandler={sendMsgHandler}
                  ownerId={ownerId}
                  userId={userId}
               // modalData={modalData}
               // dataFrom="user_manage"
               // closeModal={closeModal}
               // history={{ goBack: closeModal }}
               // getAllUsers={getAllUsers}
               />

               <QrModal
                  show={showQrModal}
                  qrData={qrData}
                  // handleShow={handleshowQrModal}
                  handleClose={handleCloseQrModal}
                  headerText="QR Code"
               // subHeaderText="Message"
               // sendMsgHandler={sendMsgHandler}
               // ownerId={ownerId}
               // userId={userId}
               // modalData={modalData}
               // dataFrom="user_manage"
               // closeModal={closeModal}
               // history={{ goBack: closeModal }}
               // getAllUsers={getAllUsers}
               />

               {/* <ModalComponent /> */}

               {/* <Modal show={show} onHide={handleClose} className="vid_modal" centered>
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>
                     <img src={smapleImg} />
                  </Modal.Body>
               </Modal> */}
            </div>
         ) : null}

         <Modal show={showRemoteOTPModal} onHide={() => { remoteOTPHide() }} centered style={{ backgroundImage: 'unset' }}>
            <Modal.Body>
               <div>
                  <Text
                     size="regular"
                     fontWeight="bold"
                     color="secondryColor"
                     className="text-center"
                     text="Remote OTP" />

                  <Text
                     size="regular"
                     fontWeight="bold"
                     color="secondryColor"
                     className="text-center"
                     text={"OTP : " + remoteOTPResponse?.keyboardPwd} />
                  <Text
                     size="regular"
                     fontWeight="bold"
                     color="secondryColor"
                     className="text-center"
                     text={"KeyboardPwdId : " + remoteOTPResponse?.keyboardPwdId} />

                  <div className="text-center mt-5 mb-3">
                     <Buttons
                        name="Cancel"
                        varient="disable"
                        type="button"
                        size="xSmall"
                        color="black"
                        className="mr-3"
                        onClick={() => { remoteOTPHide() }} />
                  </div>
               </div>
            </Modal.Body>
         </Modal>

         <Modal show={remoteOTPErr} onHide={() => { setRemoteOTPErr(false) }} centered style={{ backgroundImage: 'unset' }}>
            <Modal.Body>
               <div>
                  <Text
                     size="regular"
                     fontWeight="bold"
                     color="secondryColor"
                     className="text-center"
                     text="Remote OTP" />

                  <Text
                     size="regular"
                     fontWeight="bold"
                     color="secondryColor"
                     className="text-center"
                     text={"Message : " + remoteOTPResponse?.message} />

                  <div className="text-center mt-5 mb-3">
                     <Buttons
                        name="Cancel"
                        varient="disable"
                        type="button"
                        size="xSmall"
                        color="black"
                        className="mr-3"
                        onClick={() => { setRemoteOTPErr(false) }} />
                  </div>
               </div>
            </Modal.Body>
         </Modal>

         <Modal show={showRemoteUnlockModal} onHide={() => { remoteUnlockHide() }} centered style={{ backgroundImage: 'unset' }}>
            <Modal.Body>
               <div>
                  <Text
                     size="regular"
                     fontWeight="bold"
                     color="secondryColor"
                     className="text-center"
                     text="Remote Unlock" />

                  <Text
                     size="regular"
                     fontWeight="bold"
                     color="secondryColor"
                     className="text-center"
                     text={"Error Code : " + remoteUnlockResponse?.errcode} />
                  <Text
                     size="regular"
                     fontWeight="bold"
                     color="secondryColor"
                     className="text-center"
                     text={"Error Message : " + remoteUnlockResponse?.errmsg} />

                  <div className="text-center mt-5 mb-3">
                     <Buttons
                        name="Cancel"
                        varient="disable"
                        type="button"
                        size="xSmall"
                        color="black"
                        className="mr-3"
                        onClick={() => { remoteUnlockHide() }} />
                  </div>
               </div>
            </Modal.Body>
         </Modal>
         <Modal show={remoteUnlockErr} onHide={() => { setRemoteUnlockErr(false) }} centered style={{ backgroundImage: 'unset' }}>
            <Modal.Body>
               <div>
                  <Text
                     size="regular"
                     fontWeight="bold"
                     color="secondryColor"
                     className="text-center"
                     text="Remote Unlock" />

                  <Text
                     size="regular"
                     fontWeight="bold"
                     color="secondryColor"
                     className="text-center"
                     text={"Error Message : " + remoteUnlockResponse?.message} />

                  <div className="text-center mt-5 mb-3">
                     <Buttons
                        name="Cancel"
                        varient="disable"
                        type="button"
                        size="xSmall"
                        color="black"
                        className="mr-3"
                        onClick={() => { setRemoteUnlockErr(false) }} />
                  </div>
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
};

const mapStateToProps = ({ propertyAnalyticsData }) => ({
   propertyAnalyticsData,
});

const actions = {
   getPropertyAnalyticsByPropertyId,
};

const withConnect = connect(mapStateToProps, actions);

export default connect(mapStateToProps, actions)(PropertyDetails);
