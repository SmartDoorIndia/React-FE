/** @format */

const {
   REACT_APP_ENV,
   REACT_APP_QA_API_BASE_URL,
   REACT_APP_DEV_API_BASE_URL,
   REACT_APP_PROD_API_BASE_URL,
   REACT_APP_GOGOLE_API_KEY,
   REACT_APP_DEV_SOCKET_URL,
   REACT_APP_QA_SOCKET_URL,
   REACT_APP_PROD_SOCKET_URL,
} = process.env;

let API_BASE_URL = REACT_APP_PROD_API_BASE_URL;
let SOCKET_URL = REACT_APP_PROD_SOCKET_URL;

switch (REACT_APP_ENV) {
   case "qualityAnalyst":
      API_BASE_URL = REACT_APP_QA_API_BASE_URL;
      SOCKET_URL = REACT_APP_QA_SOCKET_URL;
      break;

   case "production":
      API_BASE_URL = REACT_APP_PROD_API_BASE_URL;
      SOCKET_URL = REACT_APP_PROD_SOCKET_URL;
      break;

   case "development":
      API_BASE_URL = REACT_APP_DEV_API_BASE_URL;
      SOCKET_URL = REACT_APP_DEV_SOCKET_URL;
      break;

   default:
      API_BASE_URL = REACT_APP_PROD_API_BASE_URL;
      SOCKET_URL = REACT_APP_PROD_SOCKET_URL;
}

const CONSTANTS = {
   baseUrl: API_BASE_URL,
   IV_LENGTH: 16,
   ENCRYPTION_KEY: "sd5b75nb7577#^%$%*&G#CGF*&%@#%*&",
   CRYPTER_KEY: "0xffffffff,0xffffffff,0xffffffff,0xffffffff,0xffffffff,0xfffffff8",
   GOOGLE_API_KEY: REACT_APP_GOGOLE_API_KEY,
   SOCKET_URL: SOCKET_URL,
   // CONFIG: {
   //    bucketName: "smartdoor-app",
   //    dirName: "property-image" /* optional */,
   //    region: "us-east-2",
   //    accessKeyId: "AKIAU3F5O4RJDGC4CHX3",
   //    secretAccessKey: "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",
   //    s3Url: "https://smartdoor-app.s3.us-east-2.amazonaws.com" /* optional */,
   // },
   // CONFIG: {
   //    bucketName: "smartdoor-app",
   //    dirName: "builder-property-img" /* optional */,
   //    region: "us-east-2",
   //    accessKeyId: "AKIAU3F5O4RJDGC4CHX3",
   //    secretAccessKey: "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",
   //    s3Url: "https://smartdoor-app.s3.us-east-2.amazonaws.com" /* optional */,
   // },

   // Latest changes for S3 deploy

   CONFIG: {
      bucketName: "smartdoor-uat",
      dirName: "app-images/profile-images" /* optional */,
      region: "ap-south-1",
      accessKeyId: "AKIA6RL7DX4AARQAF62B",
      secretAccessKey: "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",
      s3Url: "https://smartdoor-uat.s3.ap-south-1.amazonaws.com" /* optional */,
   },
   CONFIG_PROPERTY: {
      bucketName: "smartdoor-uat",
      dirName: "app-images/property-images" /* optional */,
      region: "ap-south-1",
      accessKeyId: "AKIA6RL7DX4AARQAF62B",
      secretAccessKey: "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",
      s3Url: "https://smartdoor-uat.s3.ap-south-1.amazonaws.com" /* optional */,
   },



   CAMERA_UUID : "6360eabe28d6ae7c7ae27b9b",
   CAMERA_APP_KEY : "fde345f424b0b32b00502a8e96c1d006",
   CAMERA_APP_SECRET : "fc59834d4c8a4389857d583d3817e9f3",
   CAMERA_MOVE_CARD : 1,
   FEATURED_VIDEO_KEY : 'YOUTUBE_VIDEO'
};

export default CONSTANTS;

// if (REACT_APP_ENV === "qualityAnalyst")   {
// 	API_BASE_URL = REACT_APP_QA_API_BASE_URL;
// 	SOCKET_URL = REACT_APP_QA_SOCKET_URL;
// }
// else if (REACT_APP_ENV === "production")  {
// 	API_BASE_URL = REACT_APP_PROD_API_BASE_URL;
// 	SOCKET_URL = REACT_APP_PROD_SOCKET_URL;
// }
// else if (REACT_APP_ENV === "development") {
// 	API_BASE_URL = REACT_APP_DEV_API_BASE_URL;
// 	SOCKET_URL = REACT_APP_DEV_SOCKET_URL;
// }

// API_BASE_URL  = "http://103.187.101.53:8751/"
// SOCKET_URL = "http://103.187.101.53:5100";
