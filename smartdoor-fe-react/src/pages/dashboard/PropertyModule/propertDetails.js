/** @format */

import React, { useState, useEffect, useCallback, useRef } from "react";
import { connect, useDispatch } from "react-redux";
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
   uploadImage,
   restorePropertyById,
   getAllDeletedProperties,
   getAllProperties,
   getNonSDProperties,
   approveProperty
} from "../../../common/redux/actions";
import * as Actions from '../../../common/redux/types';
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
import Constants from "../../../common/helpers/Constants";
import requestLockApi from "../../../common/services/lockServices";
import cameraServicesApi from "../../../common/services/cameraServices";
import AesAlgo from "../../../camera-related/aesAlgorithm";
import SignatureAlgo from "../../../camera-related/signatureAlgorithm";
import TimeStampAlgo from "../../../camera-related/timeMilis";
import QrModal from "../../../shared/Modal/QrModal/QrModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Switch } from "@mui/material";
import reviewIcon from "../../../assets/svg/reviewIcon.svg"
import { getLocalStorage } from "../../../common/helpers/Utils";
import PostingFields from "../../../common/helpers/PostingFields";
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';
// import 'videojs-flash';
import { ReactFlvPlayer } from 'react-flv-player';

// const ReactS3Client = new S3(Constants.CONFIG_PROPERTY);

const PropertyDetails = (props) => {
   const { getPropertyAnalyticsByPropertyId, propertyAnalyticsData, module, getAllDeletedProperties, deletedPropertyData,
      getAllProperties, allPropertyData, getNonSDProperties, allNonSDProperties } = props;
   const propertyId = props.location.state ? props.location.state.propertyId || "" : "";
   const userId = props.location.state ? props.location.state.userId || "" : "";
   const menuName = props.location.state ? props.location.state.menuName || "" : "";
   const isDeleted = props.location.state ? props.location.state.isDeleted : null;
   const [loading, setLoading] = useState(true);
   const [propertyData, setpropertyData] = useState({});
   // const [societyUserData, setSocietyUserData] = useState({})
   const history = useHistory();
   const [show, setShow] = useState(false);
   const [showMsgModal, setShowMsgModal] = useState(false);
   const [showQrModal, setShowQrModal] = useState(false);
   const [showMore, setShowMore] = useState(false);
   const [ownerId, setOwnerId] = useState("");
   const [ownerName, setOwnerName] = useState("");
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
   const [visitorReviewList, setVisitorReviewList] = useState([])
   const userData = getLocalStorage("authData");
   const dispatch = useDispatch();
   const [specList, setSpecList] = useState([]);


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


         }
      } catch (err) {
         showErrorToast("Unexpected Error.");
      }
   }, [propertyId, getPropertyDetails]);

   // getPropertyDetails()
   const _getPropertyDetails = useCallback(async () => {
      await getPropertyDetails({ propertyId: propertyId, userId: userId })
         .then((response) => {
            console.log("resp data => ", response);
            setLoading(false);

            if (response.data) {
               if (response.data.resourceData && response.data.status === 200) {
                  setpropertyData(response.data.resourceData);
                  setOwnerId(response.data.resourceData.miscellaneousDetails.postedById);
                  setOwnerName(response.data.resourceData.miscellaneousDetails.ownerName);
                  setVisitorReviewList(response.data.resourceData.visitorReviewList)
                  _getSmartLockData({ propertyId });
                  dispatch({ type: Actions.BASIC_DETAILS_SUCCESS, data: response.data.resourceData.basicDetails })
                  dispatch({ type: Actions.ADDRESS_DETAILS_SUCCESS, data: response.data.resourceData.address })
                  dispatch({ type: Actions.SPEC_DETAILS_SUCCESS, data: response.data.resourceData.specs })
                  dispatch({ type: Actions.PRICING_DETAILS_SUCCESS, data: response.data.resourceData.pricing })
                  dispatch({ type: Actions.UPLOAD_IMAGES_SUCCESS, data: response.data.resourceData.uploads })
                  dispatch({ type: Actions.TERMS_CONDITIONS_SUCCESS, data: response.data.resourceData.terms })
                  if (Object.keys(response.data.resourceData.basicDetails)?.length !== 0) {
                     let speclist = [];
                     let fields = response.data.resourceData.basicDetails;
                     if (fields?.propertyType === 'Residential') {
                        if (fields?.propertySubType === 'PG/Co-iving') {
                           speclist = PostingFields.postingFieldsObject[fields.propertyCategory][fields.stageOfProperty][fields.propertyType]["Pg"][fields.guestHouseOrPgPropertyType].Specs
                           console.log("specs=> ", PostingFields.postingFieldsObject[fields.propertyCategory][fields.stageOfProperty][fields.propertyType]["Pg"][fields.guestHouseOrPgPropertyType].Specs)
                        } else {
                           speclist = PostingFields.postingFieldsObject[fields.propertyCategory][fields.stageOfProperty][fields.propertyType][fields.propertySubType].Specs
                        }
                     } else if (fields?.propertyType === 'Commercial') {
                        speclist = PostingFields.postingFieldsObject[fields.propertyCategory][fields.stageOfProperty][fields.propertyType].Specs
                        console.log("speclist", speclist)
                     }
                     setSpecList(speclist);
                  }
                  if (!response.data.resourceData.basicPlan) _getContactSensor(propertyId);
               }
            }
            console.log("responseSocietyDetails", response);
            // console.log("owner id", response.data.resourceData.postedById);
         })
         .catch((error) => {
            setLoading(false);
            console.log("error", error);
         });
   }, []);

   console.log("propertyData=> ", propertyData);




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


   // const handleViewRecording = async () => {
   //    try {
   //       const result = await getCameraDevice({ propertyid: propertyId });
   //       if (result.data.status === 200) {
   //          console.log("camera Data is :", result.data.resourceData);
   //          setCameraData(result.data.resourceData);
   //          setShowCameraDD(true);
   //       }
   //    } catch (err) {
   //       console.log("err:", err);
   //    }
   // };



   const fileUpload = (event) => {
      // if (event.target.files && event.target.files[0]) {
      //    let reader = new FileReader();
      //    reader.onload = (e) => {
      //       console.log(e.target.result, "target.result");
      //       // this.setState({ builderPropertyImg: e.target.result });
      //    };
      //    reader.readAsDataURL(event.target.files[0]);
      // }
      // console.log(event.target.files[0], "after upload files");

      // const imageData = {
      //    propertyId: propertyId,
      //    propertyDocs: [],
      //    propertyImage: [
      //       {
      //          docId: null,
      //          docName: "",
      //          docURL: "",
      //       },
      //    ],
      // };
      // this.setState({ imageUrl: event.target.files[0] });
      if (event.target.files.length > 0) {
         // setImageLoader(true);
         // ReactS3Client.uploadFile(event.target.files[0], event.target.files[0].name)
         //    .then((data) => {
         //       console.log("data", data);
         //       const property_image = [];
         //       property_image.push({
         //          docId: null,
         //          docName: "",
         //          docURL: data.location,
         //       });
         //       const image_data = {
         //          ...imageData,
         //          propertyDocs: [],
         //          propertyImage: property_image,
         //       };
         //       // setImageData({})
         //       addImage(
         //          image_data
         //          // ...imageData,
         //          //  propertyId:propertyId,
         //          //  propertyImage: [...propertyImage],
         //          //  propertyImage:[
         //          //   {...iZgeData.propertyImage,docURL: data.location}

         //          // ],
         //       )
         //          .then((response) => {
         //             setLoading(false);
         //             if (response.data) {
         //                if (response.data.resourceData) {
         //                   setImageLoader(false);
         //                   // setpropertyData(response.data.resourceData);
         //                   // setOwnerId(response.data.resourceData.postedById)
         //                   _getPropertyDetails();
         //                }
         //             }
         //             // console.log('responseSocietyDetails', response);
         //             // console.log('owner id', ownerId)
         //          })
         //          .catch((error) => {
         //             setImageLoader(false);
         //             setLoading(false);
         //             console.log("error", error);
         //          });
         //       // addBuilderProject({ ...builderPropertyData, imageUrl: data.location })
         //       //    .then((response) => {
         //       //       if (response.data && response.data.status === 200) {
         //       //          this.props.history.push("/admin/builder-property");
         //       //       }
         //       //    })
         //       //    .finally(() => {
         //       //       this.setState({ disableSave: false });
         //       //    });
         //    })
         //    .catch((err) => {
         //       // addBuilderProject({ ...builderPropertyData, imageUrl: "" })
         //       //    .then((response) => {
         //       //       if (response.data && response.data.status === 200) {
         //       //          this.props.history.push("/admin/builder-property");
         //       //       }
         //       //    })
         //       //    .finally(() => {
         //       //       this.setState({ disableSave: false });
         //       //    });
         //    });
         if (event.target.files.length > 10) {
            alert("Please select up to 10 files only.");
            return;
         }

         const imageData = {
            propertyId: propertyId,
            propertyDocs: [],
            draft: false,
            partial: false,
            propertyImage: [
               {
                  docId: null,
                  docName: "",
                  docURL: "",
               },
            ],
         };
         if (event.target.files.length > 0) {
            setImageLoader(true);
            let formData = new FormData();
            const maxSizeInBytes = 15 * 1024 * 1024; // 10MB
            Array.from(event.target.files).map((file) => {
               if (file.size > maxSizeInBytes) {
                  showErrorToast('File must be less than 15MB...')
                  return;
               }
            })
            let fileList = []
            for (let i = 0; i < event.target.files.length; i++) {
               fileList.push(event.target.files[i])
               formData.append('file', event.target.files[i]);
            }
            formData.append('id', propertyData.smartdoorPropertyId);
            formData.append('enumType', 'PROPERTY_IMAGES');
            uploadImage(formData)
               .then((response) => {
                  setImageLoader(true);
                  if (response.data.status === 200) {
                     const property_image = [];
                     for (let i = 0; i < response.data.resourceData.length; i++) {
                        property_image.push({
                           docId: null,
                           docName: "",
                           docURL: response.data.resourceData[i],
                        });
                     }
                     const image_data = {
                        ...imageData,
                        propertyDocs: [],
                        propertyImage: property_image,
                     };
                     addImage(
                        image_data
                     )
                        .then((response) => {
                           setLoading(false);
                           setImageLoader(false);
                           if (response.data) {
                              if (response.data.resourceData) {
                                 setImageLoader(false);
                                 _getPropertyDetails();
                              }
                           }
                        })
                        .catch((error) => {
                           setImageLoader(false);
                           setLoading(false);
                           console.log("error", error);
                        });
                     showSuccessToast(response.data.customMessage)
                  }
               })
               .catch((error) => {
                  setImageLoader(false);
                  setLoading(false);
                  console.log("error", error);
               });
            // console.log(event.target.files[0], "end file");
         }
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
   const [remoteUnlockErr, setRemoteUnlockErr] = useState(false);
   const [remoteOTPErr, setRemoteOTPErr] = useState(false);

   const remoteUnLock = async () => {
      let map = {
         propertyId: propertyId,
         userId: ownerId,
         consumer_requested: false
      }
      const response = await remoteUnlock(map);
      if (response?.status === 200) {
         setRemoteUnlockresponse(response.data.resourceData)
         remoteUnlockShow()
      } else {
         setRemoteUnlockresponse(response?.data)
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
      if (response?.status === 200) {
         setRemoteOTPresponse(response.data.resourceData)
         remoteOTPShow()
      } else {
         setRemoteOTPresponse(response?.data)
         setRemoteOTPErr(true)
      }
   }
   let deletedList = [];
   let PropertyList = [];

   const handleDelete = async () => {
      const response = await deletePropertyById({ propertyId })
      if (response?.data?.status === 200) {
         showSuccessToast("Property deleted successfully");
         await getAllDeletedProperties({
            city: '',
            zipcode: '',
            location: '',
            pageSize: 8,
            pageNo: 1,
            userId: userData.userid,
            searchString: '',
            propertyId: null,
            fromDate: '',
            toDate: '',
            defaultSort: false, defaultSortId: 'propertyId', defaultSortFieldId: 1
         });
         await getNonSDProperties({
            city: allNonSDProperties?.data?.city,
            zipcode: '',
            location: '',
            pageSize: allNonSDProperties?.data?.rowsPerPage,
            pageNo: allNonSDProperties?.data?.currentPage,
            userId: userData.userid,
            searchString: allNonSDProperties?.data?.searchStr,
            propertyId: allNonSDProperties?.data?.propertyId,
            fromDate: allNonSDProperties?.data?.fromDate,
            toDate: allNonSDProperties?.data?.toDate,
            defaultSort: allNonSDProperties?.data?.defaultSort, defaultSortId: allNonSDProperties?.data?.defaultSortId, defaultSortFieldId: allNonSDProperties?.data?.defaultSortFieldId
         })
            .then((response) => {
               console.log(response)
               PropertyList = response?.data?.resourceData
            });
         if (menuName === 'NonSDProperties') {
            handleSortedData();

         }
         await getAllProperties({
            city: allPropertyData?.data?.city,
            zipcode: '',
            location: '',
            pageSize: allPropertyData?.data?.rowsPerPage,
            pageNo: allPropertyData?.data?.currentPage,
            userId: userData.userid,
            searchString: allPropertyData?.data?.searchStr,
            propertyId: allPropertyData?.data?.propertyId,
            smartLockProperty: false,
            propertyStatus: allPropertyData?.data?.propertyStatus,
            fromDate: allPropertyData?.data?.fromDate,
            toDate: allPropertyData?.data?.toDate,
            defaultSort: allPropertyData?.data?.defaultSort, defaultSortId: allPropertyData?.data?.defaultSortId, defaultSortFieldId: allPropertyData?.data?.defaultSortFieldId
         })
            .then((response) => {
               console.log(response)
               PropertyList = response.data.resourceData
            });
         if (menuName === 'Properties') {
            handleSortedData();

         }
      } else {
         showErrorToast("Property deletion failed");
      }
   }


   const handleRestore = async () => {
      const response = await restorePropertyById({ propertyId })
      if (response?.data?.status === 200) {
         let type = null
         if (deletedPropertyData?.data?.smartLockProperty === 'SMARTDOOR') {
            type = true
         } else if (deletedPropertyData?.data?.smartLockProperty === 'NON SMARTDOOR') {
            type = false
         }
         await getAllDeletedProperties({
            city: deletedPropertyData?.data?.city,
            zipcode: '',
            location: '',
            pageSize: deletedPropertyData?.data?.rowsPerPage,
            pageNo: deletedPropertyData?.data?.currentPage,
            userId: userData.userid,
            searchString: deletedPropertyData?.data?.searchStr,
            propertyId: deletedPropertyData?.data?.propertyId,
            smartLockProperty: type,
            propertyStatus: deletedPropertyData?.data?.propertyStatus,
            fromDate: deletedPropertyData?.data?.fromDate,
            toDate: deletedPropertyData?.data?.toDate,
            defaultSort: deletedPropertyData?.data?.defaultSort, defaultSortId: deletedPropertyData?.data?.defaultSortId, defaultSortFieldId: deletedPropertyData?.data?.defaultSortFieldId
         })
            .then((response) => {
               console.log(response)
               deletedList = response.data.resourceData
            });
         await getNonSDProperties({
            city: '',
            zipcode: '',
            location: '',
            pageSize: 8,
            pageNo: 1,
            userId: userData.userid,
            searchString: '',
            searchString: null,
            fromDate: '',
            toDate: '',
            defaultSort: false, defaultSortId: 'propertyId', defaultSortFieldId: 1
         });
         await getAllProperties({
            city: '',
            zipcode: '',
            location: '',
            pageSize: 8,
            pageNo: 1,
            userId: userData.userid,
            searchString: '',
            propertyId: null,
            smartLockProperty: null,
            propertyStatus: null,
            fromDate: '',
            toDate: '',
            defaultSort: false, defaultSortId: 'propertyId', defaultSortFieldId: 1
         });
         showSuccessToast("Property restored successfully");
         handleSortedData();
         // if (menuName === 'DeletedProperties') {
         //    history.push("/admin/deleted-unlisted-property")
         // }
      } else {
         showErrorToast("Property restored failed");
      }
   }

   const handleBackButton = () => {
      if (localStorage.getItem('autoRefresh') === 'Yes') {
         if (menuName === 'Properties') {
            history.push('/admin/property')
         }
         else if (menuName === 'NonSDProperties') {
            history.push('/admin/nonsdproperty')
         }
         else if (menuName === 'DeletedProperties') {
            history.push('/admin/deleted-unlisted-property')
         }
      }
      else if (localStorage.getItem('autoRefresh') === 'No') {
         if (menuName === 'Properties') {
            history.push('/admin/property')
         }
         else if (menuName === 'NonSDProperties') {
            history.push('/admin/nonsdproperty')
         }
         else if (menuName === 'DeletedProperties') {
            history.push('/admin/deleted-unlisted-property')
         }
      }
   }

   const handleApproveProperty = () => {
      if (propertyData.smartdoorPropertyId) {
         approveProperty({ propertyId: propertyData.smartdoorPropertyId })
            .then((response) => {
               if (response.data && response.status === 200) {
                  _getPropertyDetails();
                  let type = null;
                  if (allPropertyData?.data?.smartLockProperty === 'SMARTDOOR') {
                     type = true;
                  } else if (allPropertyData?.data?.smartLockProperty === 'NON SMARTDOOR') {
                     type = false;
                  } else {
                     type = null
                  }
                  if (menuName === 'NonSDProperties') {
                     getNonSDProperties({
                        city: allNonSDProperties?.data?.city,
                        zipcode: '',
                        location: '',
                        pageSize: allNonSDProperties?.data?.rowsPerPage,
                        pageNo: allNonSDProperties?.data?.currentPage,
                        userId: userData.userid,
                        searchString: allNonSDProperties?.data?.searchStr,
                        propertyId: allNonSDProperties?.data?.propertyId,
                        fromDate: allNonSDProperties?.data?.fromDate,
                        toDate: allNonSDProperties?.data?.toDate,
                        defaultSort: allNonSDProperties?.data?.defaultSort, defaultSortId: allNonSDProperties?.data?.defaultSortId, defaultSortFieldId: allNonSDProperties?.data?.defaultSortFieldId
                     }).then((response) => {
                        console.log(response)
                        PropertyList = response.data.resourceData
                     });
                  }

                  else if (menuName === 'Properties') {
                     getAllProperties({
                        city: allPropertyData?.data?.city,
                        zipcode: '',
                        location: '',
                        pageSize: allPropertyData?.data?.rowsPerPage,
                        pageNo: allPropertyData?.data?.currentPage,
                        userId: userData.userid,
                        searchString: allPropertyData?.data?.searchStr,
                        propertyId: allPropertyData?.data?.propertyId,
                        smartLockProperty: type,
                        propertyStatus: allPropertyData?.data?.propertyStatus,
                        fromDate: allPropertyData?.data?.fromDate,
                        toDate: allPropertyData?.data?.toDate,
                        defaultSort: allPropertyData?.data?.defaultSort, defaultSortId: allPropertyData?.data?.defaultSortId, defaultSortFieldId: allPropertyData?.data?.defaultSortFieldId
                     }).then((response) => {
                        console.log(response)
                        PropertyList = response.data.resourceData
                     });
                  }
                  handleSortedData(false);
               }
            })
            .catch((err) => {
               console.log(err);
            });
      }
   }

   const handleSortedData = (isGoBack) => {
      let filteredItems = [];
      if (menuName === 'Properties') {
         filteredItems = [...PropertyList]
      }
      else if (menuName === 'NonSDProperties') {
         filteredItems = [...PropertyList]
      }
      else if (menuName === 'DeletedProperties') {
         filteredItems = [...deletedList]
      }
      const sorted = [...filteredItems].sort((a, b) => {
         if (props.location?.state?.defaultSortId === 'propertyId') {
            if (props.location?.state?.defaultSort === true) {
               return a['propertyId'] - b['propertyId']; // Example sorting logic
            } else {
               return b['propertyId'] - a['propertyId']; // Example sorting logic for descending order
            }
         }
         else if (props.location?.state?.defaultSortId === 'postedDate') {
            const dateA = new Date(a['postedDate']);
            const dateB = new Date(b['postedDate']);

            if (props.location?.state?.defaultSort === true) {
               return dateA - dateB;
            } else {
               return dateB - dateA;
            }
         }
      });
      console.log(sorted);
      filteredItems = [...sorted]
      if (menuName === 'Properties') {
         dispatch({
            type: Actions.PROPERTY_MODULE_SUCCESS,
            data: { propertyData: [...sorted], records: allPropertyData?.data?.records, currentPage: allPropertyData?.data?.currentPage, rowsPerPage: allPropertyData?.data?.rowsPerPage, searchStr: allPropertyData?.data?.searchStr, propertyId: allPropertyData?.data?.propertyId, city: allPropertyData?.data?.city, location: allPropertyData?.data?.location, smartLockProperty: allPropertyData?.data?.smartLockProperty, propertyStatus: allPropertyData?.data?.propertyStatus, fromDate: allPropertyData?.data?.fromDate, toDate: allPropertyData?.data?.toDate, defaultSort: allPropertyData?.data?.defaultSort, defaultSortId: allPropertyData?.data?.defaultSortId }
         });
         if (isGoBack !== false) {
            history.push("/admin/property", { defaultSort: props.location.state.defaultSort, defaultSortId: props.location.state.defaultSortId })
         }
      }
      else if (menuName === 'NonSDProperties') {
         dispatch({
            type: Actions.NON_SD_PROPERTIES_SUCCESS,
            data: { propertyData: [...sorted], records: allNonSDProperties?.data?.records, currentPage: allNonSDProperties?.data?.currentPage, rowsPerPage: allNonSDProperties?.data?.rowsPerPage, searchStr: allNonSDProperties?.data?.searchStr, propertyId: allNonSDProperties?.data?.propertyId, city: allNonSDProperties?.data?.city, location: allNonSDProperties?.data?.location, smartLockProperty: allNonSDProperties?.data?.smartLockProperty, propertyStatus: allNonSDProperties?.data?.propertyStatus, fromDate: allNonSDProperties?.data?.fromDate, toDate: allNonSDProperties?.data?.toDate, defaultSort: allNonSDProperties?.data?.defaultSort, defaultSortId: allNonSDProperties?.data?.defaultSortId }
         });
         if (isGoBack !== false) {
            history.push("/admin/nonsdproperty")
         }
      }
      else if (menuName === 'DeletedProperties') {
         dispatch({
            type: Actions.DELETED_PROPERTY_DATA_SUCCESS,
            data: { propertyData: [...sorted], records: deletedPropertyData?.data?.records, currentPage: deletedPropertyData?.data?.currentPage, rowsPerPage: deletedPropertyData?.data?.rowsPerPage, searchStr: deletedPropertyData?.data?.searchStr, propertyId: deletedPropertyData?.data?.propertyId, city: deletedPropertyData?.data?.city, location: deletedPropertyData?.data?.location, smartLockProperty: deletedPropertyData?.data?.smartLockProperty, propertyStatus: deletedPropertyData?.data?.propertyStatus, fromDate: deletedPropertyData?.data?.fromDate, toDate: deletedPropertyData?.data?.toDate, defaultSort: props.location?.state?.defaultSort, defaultSortId: props.location?.state?.defaultSortId }
         });
         history.push('/admin/deleted-unlisted-property')
      }
   };

   return (
      <>
         {Object.keys(propertyData).length > 0 ? (
            <>
               {menuName !== "" ?
                  <Buttons type="button" size={"medium"} color={"secondary"} varient="disable" name='Back' onClick={() => { handleBackButton() }}></Buttons>
                  : null}
               <div className="container" style={{ height: '84vh', overflowY: 'auto' }}>
                  {/* {menuName === 'Properties' ?
                  <Buttons type="button" size={"medium"} color={"secondary"} varient="disable" name='Back' onClick={() => { history.push('/admin/property') }}></Buttons>
                  : <></>}
               {menuName === 'NonSDProperties' ?
                  <Buttons type="button" size={"medium"} color={"secondary"} varient="disable" name='Back' onClick={() => { history.push('/admin/nonsdproperty') }}></Buttons>
                  : <></>}
               {menuName === 'DeletedProperties' ?
                  <Buttons type="button" size={"medium"} color={"secondary"} varient="disable" name='Back' onClick={() => { history.push('/admin/deleted-unlisted-property') }}></Buttons>
                  : <></>} */}
                  <Row>
                     <Col md={8}>
                        {propertyData.uploads?.propertyImages?.length > 0 ? (
                           <ImageSliderComponent
                              imagesArr={propertyData.uploads.propertyImages}
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
                                    text={`Flat/House  ${propertyData.address.houseNumber || "-"}, ${propertyData.address.towerName ? `${propertyData.address.towerName},` : ""
                                       } ${propertyData.address.otherSociety}`}
                                 />
                                 <Text
                                    className="fw500"
                                    size="Small"
                                    fontWeight="smbold"
                                    color="secondry-color"
                                    text={propertyData.address.locality || "-"}
                                 />
                              </div>

                              <div className="d-grid">
                                 <Text
                                    size="large"
                                    fontWeight="mediumbold"
                                    color="secondry-color"
                                    text={propertyData.basicDetails?.propertyCategory === "Selling"
                                       ? `${setPrice(propertyData.pricing?.propertyRate)}`
                                       : `${setPrice(propertyData.pricing?.propertyRate)}/month`}
                                 />
                                 <Text
                                    className="fw500"
                                    size="Small"
                                    fontWeight="smbold"
                                    color="secondry-color"
                                    text={propertyData.basicDetails?.propertyCategory}
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
                                    {propertyData.basicDetails.propertyType === "Commercial" ? (

                                       <div className="lock-div">
                                          {showCameraButton()}
                                          <div className="lockIcon">
                                             {/* <img src={smartLock} /> */}
                                          </div>
                                          {/* <div>
                                       Smartlock Power % : {smartdoorBattery}%
                                    </div> */}
                                          {propertyData.miscellaneousDetails?.smartLockProperty === true && propertyData.miscellaneousDetails?.deleted === false && propertyData.miscellaneousDetails.status === "UNDER REVIEW" ?
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

                              {/* <Buttons
                              onClick={() => {}}
                              name="Approve"
                              varient="primary"
                              size="xSmall"
                              color="white"
                              className="mt-2 mb-2" />  */}
                              {/* <div><span className="TaupeGrey fs-12 fw500">Description</span></div> */}
                              <div className="d-flex justify-content-end">

                                 {userData.roleName === 'SUPER ADMIN' && propertyData.miscellaneousDetails.status === 'UNDER REVIEW' && propertyData.miscellaneousDetails.smartLockProperty === false && propertyData?.miscellaneousDetails?.deleted === false ?

                                    <>
                                       <Buttons
                                          name="Approve"
                                          varient="primary"
                                          size="xSmall"
                                          style={{ width: "100px", height: "28px", textAlign: "center" }}
                                          color="white"
                                          onClick={() => {
                                             handleApproveProperty();
                                          }}
                                       /> &nbsp; &nbsp;
                                    </> : null}
                                 {userData.roleName === 'SUPER ADMIN' ?
                                    <Link
                                       to={{
                                          pathname: "/admin/chat-history",
                                          state: {
                                             userId: userData.userid,
                                             ownerId: ownerId,
                                             ownerName: ownerName,
                                             roleId: propertyData?.ownerRoleId
                                          },
                                       }}
                                    >
                                       <Buttons
                                          style={{ float: 'left' }}
                                          name="Chat"
                                          varient="primary"
                                          size="xSmall"
                                          color="white"
                                          className=" mb-2" />
                                    </Link>
                                    : null}
                              </div>
                              <div className="d-flex mt-2">
                                 {propertyData.miscellaneousDetails?.smartLockProperty === true ?
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

                                 {propertyData.miscellaneousDetails?.smartLockProperty === true && propertyData.miscellaneousDetails?.deleted === false && userData.roleName === 'SUPER ADMIN' ?
                                    <>
                                       <Link
                                          to={{
                                             pathname: "/admin/property/property-devices",
                                             state: {
                                                propertyId: propertyData.smartdoorPropertyId,
                                                smartLockData: smartLockData,
                                                propertyDocsResp:
                                                   propertyData.uploads,
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

                              <div className="d-flex mt-2">

                                 {propertyData.miscellaneousDetails?.smartLockProperty === true && propertyData?.miscellaneousDetails?.deleted === false && userData.roleName === 'SUPER ADMIN' ? (

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
                              <div className="d-flex mt-2">
                                 {userData.roleName === 'SUPER ADMIN' ?
                                    <>
                                       <Buttons
                                          style={{ float: 'left' }}
                                          name="Edit Property"
                                          varient="primary"
                                          size="xSmall"
                                          color="white"
                                          className=" mb-2"
                                          onClick={() => {
                                             let miscellaneousDetailsDto = propertyData.miscellaneousDetails;
                                             if (propertyData.miscellaneousDetails.status !== null) {
                                                miscellaneousDetailsDto.draft = false;
                                             }
                                             history.push('/admin/property/property-details/EditPost', { existingDetails: { propertyId: propertyData.smartdoorPropertyId, saveFlag: true }, miscellaneousDetails: miscellaneousDetailsDto })
                                          }} /> &nbsp; &nbsp;

                                    </>
                                    : null}
                                 {userData.roleName === 'MARKETING EXECUTIVE' && propertyData.miscellaneousDetails.status !== 'APPROVED' ?
                                    <>
                                       <Buttons
                                          style={{ float: 'left' }}
                                          name="Edit Property"
                                          varient="primary"
                                          size="xSmall"
                                          color="white"
                                          className=" mb-2"
                                          onClick={() => {
                                             let miscellaneousDetailsDto = propertyData.miscellaneousDetails;
                                             if (propertyData.miscellaneousDetails.status !== null) {
                                                miscellaneousDetailsDto.draft = false;
                                             }
                                             history.push('/admin/property/property-details/EditPost', { existingDetails: { propertyId: propertyData.smartdoorPropertyId, saveFlag: true }, miscellaneousDetails: miscellaneousDetailsDto })
                                          }} /> &nbsp; &nbsp;

                                    </>
                                    : null}
                                 {isDeleted === false && userData.roleName === 'MARKETING EXECUTIVE' && propertyData.miscellaneousDetails.status !== 'APPROVED' ?
                                    <>
                                       <Buttons
                                          style={{ float: 'left' }}
                                          name="Delete"
                                          varient="primary"
                                          size="xSmall"
                                          color="white"
                                          className=" mb-2 bg-danger"
                                          onClick={() => { handleDelete() }} /> &nbsp; &nbsp;
                                    </> : <></>}
                                 {isDeleted === false && userData.roleName === 'SUPER ADMIN' ?
                                    <>
                                       <Buttons
                                          style={{ float: 'left' }}
                                          name="Delete"
                                          varient="primary"
                                          size="xSmall"
                                          color="white"
                                          className=" mb-2 bg-danger"
                                          onClick={() => { handleDelete() }} /> &nbsp; &nbsp;
                                    </> : <></>}
                              </div>
                              <div>
                                 {isDeleted === true && userData.roleName === 'SUPER ADMIN' ?
                                    <>
                                       <Buttons
                                          style={{ float: 'left' }}
                                          name="Restore"
                                          varient="primary"
                                          size="xSmall"
                                          color="white"
                                          className=" mb-2 bg-danger"
                                          onClick={() => { handleRestore() }} />
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
                                       p_lat={propertyData.address.latitude}
                                       p_lng={propertyData.address.longitude}
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
                                 {/* {propertyData.miscellaneousDetails.ownerName === null ? null : (
                                 )} */}
                                 <div className="d-flex justify-content-between mb-2 propertyOwnerInfoWrap align-items-baseline">
                                    <div className="d-flex userName propertyOwnerInfoWrapFirst mb-3 align-items-end">
                                       <div className="uName">
                                          <img
                                             src={propertyData.ownerImageUrl || userImg}
                                             className="rounded-circle object-cover"
                                             width="50px"
                                             height="50px"
                                             alt=""
                                          />
                                       </div>
                                       <div className="flex-1 align-items-center ml-2 ownerdetail">

                                          <ToolTip
                                             position="top"
                                             name={propertyData.miscellaneousDetails.ownerName || propertyData.miscellaneousDetails.postedByName}
                                          >
                                             <Text
                                                size="Small"
                                                fontWeight="mediumbold"
                                                className="userName"
                                                color="secondry-color"
                                                text={propertyData.miscellaneousDetails.ownerName || propertyData.miscellaneousDetails.postedByName}
                                             />
                                          </ToolTip>
                                          <Text
                                             className="fw500 wordWrap"
                                             size="xSmall"
                                             color="secondry-color"
                                             text={propertyData.miscellaneousDetails.ownerMobileNumber || propertyData.miscellaneousDetails.postedByMobile}
                                          />
                                       </div>
                                    </div>
                                    <div className="msgtoowner propertyOwnerInfoWrapLast">
                                       {/* <ToolTip position="left" name="Under development"> */}
                                       <span className="btnNew">
                                          <Buttons
                                             onClick={() => setShowMsgModal(true)}
                                             disabled={
                                                propertyData.miscellaneousDetails.ownerAvailable ? true : false
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
                                          {propertyData?.miscellaneousDetails.ownerAvailable ? (
                                             <img
                                                className={
                                                   "doc docOwner" + propertyData?.miscellaneousDetails.ownerAvailable
                                                      ? "doc docOwner disabled-icon"
                                                      : ""
                                                }
                                                src={doc}
                                                alt=""
                                             />
                                          ) : (
                                             <Link
                                                to={{
                                                   pathname: "/admin/property/property-documents",
                                                   state: {
                                                      propertyId: propertyData.smartdoorPropertyId,
                                                      propertyDocsResp:
                                                         propertyData.uploads,
                                                      userId: userId
                                                   },
                                                }}
                                             >
                                                {/* <Buttons name="View Property Documents" varient="buttonGray" type="submit" size="Small" color="" className="ml-3 " /> */}
                                                <img className="doc docOwner" src={doc} alt="" />
                                             </Link>
                                          )}
                                       </ToolTip>
                                    </div>
                                 </div>
                              </div>
                              {/* <div className="ownerInfoWrap">
                                 <div className="d-flex justify-content-between mb-2 propertyOwnerInfoWrap align-items-baseline">
                                    <div className="d-flex userName propertyOwnerInfoWrapFirst mb-3 align-items-end">
                                       <div className="uName">
                                          <img
                                             src={propertyData.imageUrl || userImg}
                                             className="rounded-circle object-cover"
                                             width="50px"
                                             height="50px"
                                             alt=""
                                          />
                                       </div>
                                       <div className="flex-1 ml-2 ownerdetail">

                                          <ToolTip
                                             position="top"
                                             name={propertyData.miscellaneousDetails.ownerName || "-"}
                                          >
                                             <Text
                                                size="Small"
                                                fontWeight="mediumbold"
                                                className="userName"
                                                color="secondry-color"
                                                text={propertyData.miscellaneousDetails.ownerName || "-"}
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
                                          {propertyData.miscellaneousDetails.ownerName === null ? (
                                             <>
                                                <Buttons
                                                   onClick={() => setShowMsgModal(true)}
                                                   name={propertyData.miscellaneousDetails.ownerName ? "Realtor" : "Owner"}
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

                                                       <Buttons name="View Property Documents" varient="buttonGray" type="submit" size="Small" color="" className="ml-3 " />
                                                      <img className="doc docOwner" src={doc} alt=""/>

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

                                                       <Buttons name="View Property Documents" varient="buttonGray" type="submit" size="Small" color="" className="ml-3 " />
                                                         <img className={"doc docOwner "} src={doc} alt="" />
                                                         <img className={"doc docOwner "} src={doc} alt=""/>

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
                                                         alt=""
                                                      />
                                                   )}
                                                </ToolTip>
                                             </>
                                          )}
                                       </span>
                                    </div>
                                 </div>
                                       </div> */}
                           </div>
                        )}
                     </Col>
                  </Row>

                  <Row>
                     <Col md={12} className="propertyDetailsTable">
                        <div className=" bg-white">
                           <table className="w-100 bg-white">
                              {/* First ROW */}

                              <tr>
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
                                       text={propertyData.basicDetails?.propertyType || "-"}
                                    />
                                 </td>
                                 <td className="p-2">
                                    <Text
                                       size="xSmall"
                                       fontWeight="bold"
                                       color="secondryColor"
                                       text={"Property Sub Type"}
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="semibold"
                                       color="secondryColor"
                                       text={propertyData.basicDetails?.propertySubType || "-"}
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
                                       text={propertyData.basicDetails?.propertyCategory || "-"}
                                    />
                                 </td>
                                 <td className="p-2">
                                    <Text
                                       size="xSmall"
                                       fontWeight="bold"
                                       color="secondryColor"
                                       text={"Stage of Property"}
                                    />
                                    <Text
                                       size="Small"
                                       fontWeight="semibold"
                                       color="secondryColor"
                                       text={propertyData.basicDetails?.stageOfProperty || "-"}
                                    />
                                 </td>
                              </tr>

                              {/* second Row */}

                              <tr>
                                 {specList.includes('Carpet area/built-up area') ?
                                    <td className="p-2">
                                       <Text
                                          size="xSmall"
                                          fontWeight="bold"
                                          color="secondryColor"
                                          text={"Carpet Area"}
                                       />
                                       <Text
                                          size="Small"
                                          fontWeight="semibold"
                                          color="secondryColor"
                                          text={
                                             propertyData.specs?.carpetArea === null
                                                ? "-"
                                                : (propertyData.specs?.carpetArea + " " + propertyData.specs?.carpetAreaMeasurementUnit)
                                          }
                                       />
                                    </td> : ""}
                                 {specList.includes('Carpet area/built-up area') ?
                                    <td className="p-2">
                                       <Text
                                          size="xSmall"
                                          fontWeight="bold"
                                          color="secondryColor"
                                          text={"Build up Area"}
                                       />
                                       <Text
                                          size="Small"
                                          fontWeight="semibold"
                                          color="secondryColor"
                                          text={
                                             propertyData.specs?.builtUpArea === null
                                                ? "-"
                                                : (propertyData.specs?.builtUpArea + " " + propertyData.specs?.builtUpAreaMeasurementUnit)
                                          }
                                       />
                                    </td> : ""}
                                 {specList.includes('Plot area') ?
                                    <td className="p-2">
                                       <Text
                                          size="xSmall"
                                          fontWeight="bold"
                                          color="secondryColor"
                                          text={"Plot Area"}
                                       />
                                       <Text
                                          size="Small"
                                          fontWeight="semibold"
                                          color="secondryColor"
                                          text={
                                             propertyData.specs?.plotArea === null
                                                ? "-"
                                                : (propertyData.specs?.plotArea + " " + propertyData.specs?.plotAreaMeasurementUnit)
                                          }
                                       />
                                    </td> : ""}
                                 {specList.includes('Open area') ?
                                    <td className="p-2">
                                       <Text
                                          size="xSmall"
                                          fontWeight="bold"
                                          color="secondryColor"
                                          text={"Open Area"}
                                       />
                                       <Text
                                          size="Small"
                                          fontWeight="semibold"
                                          color="secondryColor"
                                          text={propertyData.specs?.openArea === null
                                             ? "-"
                                             : propertyData.specs?.openArea + " " + propertyData.specs?.openAreaMeasurementUnit}
                                       />
                                    </td> : ""}
                                 {specList.includes('Loading factor') ?
                                    <td className="p-2">
                                       <Text
                                          size="xSmall"
                                          fontWeight="bold"
                                          color="secondryColor"
                                          text={"Loading factor"}
                                       />
                                       <Text
                                          size="Small"
                                          fontWeight="semibold"
                                          color="secondryColor"
                                          text={propertyData.specs?.loadingFactorInPercent === null
                                             ? "-"
                                             : propertyData.specs?.loadingFactorInPercent + "%"}
                                       />
                                    </td> : ""}
                              </tr>

                              {showMore ? (
                                 //  third Row
                                 <tr>
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
                                             propertyData?.basicDetails?.ageOfProperty
                                                ? `${propertyData?.basicDetails?.ageOfProperty} Years`
                                                : "-"
                                          }
                                       />
                                    </td>
                                    <td className="p-2">
                                       <Text
                                          size="xSmall"
                                          fontWeight="bold"
                                          color="secondryColor"
                                          text={"Property Rate"}
                                       />
                                       <Text
                                          size="Small"
                                          fontWeight="semibold"
                                          color="secondryColor"
                                          text={
                                             propertyData?.pricing?.propertyRate
                                                ? `${propertyData?.pricing?.propertyRate}`
                                                : "-"
                                          }
                                       />
                                    </td>
                                    {specList.includes('Reserved car parkings') ?
                                       <td className="p-2">
                                          <Text
                                             size="xSmall"
                                             fontWeight="bold"
                                             color="secondryColor"
                                             text={"Reserved Car Parking"}
                                          />
                                          <Text
                                             size="Small"
                                             fontWeight="semibold"
                                             color="secondryColor"
                                             text={
                                                propertyData.specs.numberOfCarParking
                                                   ? propertyData.specs.numberOfCarParking
                                                   : "-"
                                             }
                                          />
                                       </td> : ""}
                                    {specList.includes('Reserved two wheeler parkings') ?
                                       <td className="p-2">
                                          <Text
                                             size="xSmall"
                                             fontWeight="bold"
                                             color="secondryColor"
                                             text={"Reserved Two Wheeler Parking"}
                                          />
                                          <Text
                                             size="Small"
                                             fontWeight="semibold"
                                             color="secondryColor"
                                             text={
                                                propertyData.specs.numberOfTwoWheelerParking
                                                   ? propertyData?.specs?.numberOfTwoWheelerParking
                                                   : "-"
                                             }
                                          />
                                       </td> : ""}
                                 </tr>
                              ) : null}

                              {/* forth row */}
                              {showMore ? (
                                 <tr>
                                    {specList.includes('BHK') ?
                                       <td className="p-2">
                                          <Text
                                             size="xSmall"
                                             fontWeight="bold"
                                             color="secondryColor"
                                             text={"No of rooms"}
                                          />
                                          <Text
                                             size="Small"
                                             fontWeight="semibold"
                                             color="secondryColor"
                                             text={propertyData.specs?.numberOfRooms || "-"}
                                          />
                                       </td> : ""}
                                    {specList.includes('Number of washrooms') ?
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
                                             text={propertyData.specs?.numberOfBaths || "-"}
                                          />
                                       </td> : ""}
                                    {specList.includes('Entrance facing') ?
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
                                                propertyData.specs?.entranceFacing
                                                   ? propertyData.specs?.entranceFacing
                                                   : "-"
                                             }
                                          />
                                       </td> : ""}
                                    {specList.includes('Overlooking') ?
                                       <td className="p-2">
                                          <Text
                                             size="xSmall"
                                             fontWeight="bold"
                                             color="secondryColor"
                                             text={"Overlooking"}
                                          />
                                          <Text
                                             size="Small"
                                             fontWeight="semibold"
                                             color="secondryColor"
                                             text={
                                                propertyData.specs?.propertyOverlookings
                                                   ? propertyData.specs?.propertyOverlookings.join(', ')
                                                   : "-"
                                             }
                                          />
                                       </td> : ""}
                                 </tr>
                              ) : null}
                              {/* fifth row */}
                              {showMore ? (
                                 <tr>
                                    {specList.includes('Number of balconies') ?
                                       <td className="p-2">
                                          <Text
                                             size="xSmall"
                                             fontWeight="bold"
                                             color="secondryColor"
                                             text={"Number of balconies"}
                                          />
                                          <Text
                                             size="Small"
                                             fontWeight="semibold"
                                             color="secondryColor"
                                             text={propertyData?.specs?.numberOfBalconies || "-"}
                                          />
                                       </td> : ""}
                                    {specList.includes('General amenities' || 'Internal amenities') ?
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
                                             text={propertyData.specs?.internalAmenities.length !== 0 || propertyData.specs?.generalAmenities.length !== 0 || propertyData.specs?.commercialGeneralAmenities.length !== 0 ?
                                                propertyData.specs?.internalAmenities + ", " + propertyData.specs?.generalAmenities + ", " + propertyData.specs?.commercialGeneralAmenities : '-'}
                                          />
                                       </td> : "-"}
                                 </tr>
                              ) : null}
                              {showMore ? (
                                 // Sixth Row
                                 <tr>
                                    {specList.includes('Preferred for') ? (
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
                                             text={propertyData.pricing.preferredFor || "-"}
                                          />
                                       </td>
                                    ) : ""}
                                    {specList.includes('Purpose') ? (
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
                                             text={propertyData.specs?.purposes ? propertyData.specs.purposes.join(', ') : "-"}
                                          />
                                       </td>
                                    ) : null}
                                 </tr>
                              ) : null}
                              {showMore ? (
                                 //  Seventh Row
                                 <tr>
                                    {specList.includes('Maintenance') ?
                                       <td className="p-2">
                                          <Text
                                             size="xSmall"
                                             fontWeight="bold"
                                             color="secondryColor"
                                             text={"Maintenance Charge"}
                                          />
                                          <Text
                                             size="Small"
                                             fontWeight="semibold"
                                             color="secondryColor"
                                             text={propertyData.specs?.maintenanceCharge === null
                                                ? "-"
                                                :
                                                propertyData.specs.maintenanceCharge}
                                          />
                                       </td> : ""}

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
                                             propertyData?.address?.floorNumber
                                                ? propertyData?.address?.floorNumber
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
                                             propertyData?.address?.totalFloors
                                                ? propertyData?.address?.totalFloors
                                                : "-"
                                          }
                                       />
                                    </td>
                                    {specList.includes('Type of lease:') ?
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
                                             text={propertyData.pricing?.leaseType || '-'}
                                          />
                                       </td> : ""}
                                 </tr>
                              ) : null}
                              {showMore ? (
                                 //  Nineth Row
                                 <tr>
                                    {specList.includes('Furnishing type' || 'Unit furnishing') ?
                                       <td className="p-2">
                                          <Text
                                             size="xSmall"
                                             fontWeight="bold"
                                             color="secondryColor"
                                             text={"Furnishing"}
                                          />
                                          {propertyData.basicDetails?.propertyCategory === "Commercial" ?
                                             (<Text
                                                size="Small"
                                                fontWeight="semibold"
                                                color="secondryColor"
                                                text={propertyData.specs?.unitFurnishing || "-"} />) :
                                             (<Text
                                                size="Small"
                                                fontWeight="semibold"
                                                color="secondryColor"
                                                text={propertyData.specs?.furnishing || "-"}
                                             />)
                                          }
                                       </td> : ""}
                                    {specList.includes('Furnishing description') ?
                                       <td className="p-2">
                                          <Text
                                             size="xSmall"
                                             fontWeight="bold"
                                             color="secondryColor"
                                             text={"Furnishing description"}
                                          />
                                          <Text
                                             size="Small"
                                             fontWeight="semibold"
                                             color="secondryColor"
                                             text={
                                                propertyData.specs.furnishingDescription || "-"
                                             }
                                          />
                                       </td> : ""}


                                 </tr>
                              ) : null}

                           </table>
                           {showMore ? (
                              <div className="ml-2">
                                 <Text
                                    size="xSmall"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={"property description"}
                                 />
                                 <Text
                                    size="Small"
                                    fontWeight="semibold"
                                    color="secondryColor"
                                    text={
                                       propertyData.specs?.propertyDescription || "-"
                                    }
                                 />
                              </div>) : ""}
                        </div>
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
                           text="Previous Plan details"
                        />
                        {upgradePlanData?.length > 0 ? <>
                           {upgradePlanData?.map((planData) => (
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

                  <Text
                     size="medium"
                     fontWeight="bold"
                     color="secondryColor"
                     text="Visitor Reviews"
                  />
                  {visitorReviewList?.length > 0 ?
                     <>
                        <div className="d-flex whiteBg">
                           <Col lg='4'>
                              <Text
                                 fontSize="medium"
                                 fontWeight="bold"
                                 style={{ fontSize: 'medium' }}
                                 color="secondryColor"
                                 text="Visitor Name"
                              />
                           </Col>
                           <Col lg='4'>
                              <Text
                                 fontSize="medium"
                                 fontWeight="bold"
                                 style={{ fontSize: 'medium' }}
                                 color="secondryColor"
                                 text="Visitor Reviews"
                              />
                           </Col>
                           <Col lg='4'>
                              <Text
                                 fontSize="medium"
                                 fontWeight="bold"
                                 style={{ fontSize: 'medium' }}
                                 color="secondryColor"
                                 text="Comments"
                              />
                           </Col>
                        </div>
                        <div style={{ height: '20rem', overflowY: 'auto' }}>
                           {visitorReviewList?.map((element) => (
                              <div className="d-flex whiteBg" style={{ marginTop: '0px' }}>
                                 <Col lg='4'>
                                    <Text
                                       fontSize="medium"
                                       fontWeight=""
                                       style={{ fontSize: 'medium' }}
                                       color="secondryColor"
                                       text={element.visitorName}
                                    />
                                 </Col>
                                 <Col lg='4'>
                                    {/* {visitorReviewList} */}
                                    {Array.from({ length: Number(element.visitRating) }, (_, index) => (
                                       <img src={reviewIcon} alt="" style={{ alignItems: 'center', width: 'fit-content', height: '25px' }}></img>
                                    ))}
                                    {/* <Text
                                 fontSize="40px"
                                 fontWeight="bold"
                                 color="secondryColor"
                                 text={element.visitRating}
                              /> */}
                                 </Col>
                                 <Col lg='4'>
                                    <Text
                                       fontSize="40px"
                                       fontWeight=""
                                       color="secondryColor"
                                       text={element.visitReview}
                                    />
                                 </Col>
                              </div>
                           ))}
                        </div>
                     </>
                     : <>
                        <Text
                           fontSize="40px"
                           fontWeight="bold"
                           color="secondryColor"
                           text={"No reviews"}
                        /></>}

                  {/* <div>
                     <Text
                        fontSize="40px"
                        fontWeight="bold"
                        color="secondryColor"
                        text={"Chat History"}
                     />
                     {chatHistory.map((chat) => (
                        <>
                           <div className="row col-8">
                              <div className="col-4">
                                 <Text
                                    fontSize="40px"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={chat.sender_id === 361 ? chat.message : null}
                                 />
                              </div>
                              <div className="col-4">
                                 <Text
                                    fontSize="40px"
                                    fontWeight="bold"
                                    color="secondryColor"
                                    text={chat.sender_id === 271 ? chat.message : null}
                                 />
                              </div>
                           </div>
                        </>
                     ))}
                  </div> */}
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
            </>
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

const mapStateToProps = ({ propertyAnalyticsData, deletedPropertyData, allPropertyData, allNonSDProperties }) => ({
   propertyAnalyticsData,
   deletedPropertyData,
   allPropertyData,
   allNonSDProperties
});

const actions = {
   getPropertyAnalyticsByPropertyId,
   getAllDeletedProperties,
   getAllProperties,
   getNonSDProperties
};

const withConnect = connect(mapStateToProps, actions);

export default connect(mapStateToProps, actions)(PropertyDetails);
