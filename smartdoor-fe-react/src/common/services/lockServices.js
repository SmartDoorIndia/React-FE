// /** @format */

// import axios from "axios";

// import CONSTANTS from "../helpers/Constants";

// import { ApiJson } from "./apiJson";
// import { showErrorToast, showSuccessToast, getLocalStorage } from "../helpers/Utils";

// import { disconnectSocket } from "../helpers/SocketProvider";
// import { tokenExpired, provideAuth } from "../helpers/Auth";

// let apiFailCounter = 0;
// // axios.defaults.baseURL = CONSTANTS.baseUrl;

// axios.interceptors.request.use(
//    function (config) {
//       const { isAuth, userData } = provideAuth();

//       if (isAuth) {
//         // if (userInfo.access_token) {
//         // config.headers.Authorization = `bearer ${userData.access_token}`;
//         // config.headers.Accept = "*/*";
//         // config.headers["Content-Type"] = "application/json";

//         // }

//         //added new
//         config.headers["Content-Type"] = "application/json";
//         config.headers["uuid"] =  CONSTANTS.CAMERA_UUID;
//         config.headers["appKey"] =  CONSTANTS.CAMERA_APP_KEY;
//      }
//      return config;
//    },

//    function (error) {
//       "application/json";

//       return Promise.reject(error);
//    }
// );

// const prepareDataObject = (_data_, paramObj = {}) => {
//    for (const key in _data_) {
//       if (paramObj[key] || paramObj[key] === false) {
//          _data_[key] = paramObj[key];
//       } else {
//          if (typeof _data_[key] !== "object") _data_[key] = "";
//       }
//    }

//    return _data_;
// };

// const injectParamsToUrl = (_url_, paramObj) => {
//    let url = _url_;

//    for (const key in paramObj) {
//       url = url.replace(":" + key, paramObj[key]);
//    }

//    return url;
// };

// // const HeadersToReq = async (_headers_) => {
// //   let userInfo = await getLocalStorage('authData');

// //   if (userInfo) {
// //     if (userInfo.access_token) {
// //       _headers_['Authorization'] = `bearer ${userInfo.access_token}`
// //     }
// //   }

// //   return _headers_;
// // };

// const handleErrorByStatus = (error) => {
//    if (error && error.data.error) {
//       if (error.status === 401) showErrorToast(error.data.error_description);
//       else showErrorToast(error.data.error_description);
//    }
// };

// const mainSmartlockApiService = async (apiKeyName, data) => {
//    const apiDetails = ApiJson[apiKeyName];

//    if (!apiDetails) {
//       console.log("Api configuration do not found in api-json, please check api-json.js");
//       throw new Error("Api configuration do not found in api-json, please check api-json.js");
//    }

//    const requestObject = Object.assign({}, apiDetails);
//    requestObject.data = prepareDataObject(requestObject.data, data);
//    requestObject.url = injectParamsToUrl(requestObject.url, data);
//    // requestObject.headers = await injectHeadersToReq(requestObject.headers, data);

//    return axios(requestObject)
//       .then(function (result) {
//         //  apiFailCounter = 0;
//         //  if (result.data && result) {
//         //     if (result.data.access_token) {
//         //        const message = "Login success!";
//         //        if (requestObject.showResultMessage === true) showSuccessToast(message);
//         //     }
//         //  } else {
//         //     handleErrorByStatus(result.data);
//         //  }
//          return result || { data: {} };
//       })
//       .catch(function (error) {
//         //  if (error && error.response) {
//         //     if (requestObject.showErrorMessage === true) handleErrorByStatus(error.response);
//         //  }
//         //  if (error.config) {
//         //     if (
//         //        error.config.maxContentLength - 1 &&
//         //        error.toString().indexOf("Network Error") > -1
//         //     )
//         //      {
//         //        apiFailCounter++;
//         //        if (apiFailCounter >= 3) {
//         //           disconnectSocket();
//         //           tokenExpired();
//         //        }
//         //     }
//         //  }

//          return error.response || { data: {} };
//       });
// };

// export default mainSmartlockApiService;

import axios from "axios";
import Constants from '../../common/helpers/Constants';

function handleError(error) {  
	let msg = { error: "Something Went Wrong" };  
  return error?.response?.data ?? msg;
  }
  
function handleSuccess(response) {
	return response.data;
}

console.log("constants in lock file:", Constants)

const ax = axios.create({  
	headers: {"uuid": '6360eabe28d6ae7c7ae27b9b',   
  "appKey": 'fde345f424b0b32b00502a8e96c1d006',    
  "appSecret": 'fc59834d4c8a4389857d583d3817e9f3',    
  "Content-type": "application/json",    
  "Accept" : "*/*" ,
  "Access-Control-Allow-Origin": '*', 
  "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept ', 
  "Access-Control-Max-Age": 3600 , 
  },  
  // headers: {"uuid": Constants.CAMERA_UUID,   
  // "appKey":  Constants.CAMERA_APP_KEY,    
  // "appSecret": Constants.CAMERA_APP_SECRET,    
  // "Content-type": "application/json",    
  // "Accept" : "*/*"  
  // },  
  baseURL: "",  
  timeout: 600000,
 });// timeout api calls to 10 minutes});
 
 ax.interceptors.response.use(handleSuccess, handleError);
 
 // Api should be called belowexport 
 
 async function requestLockApi(type, data, url) {  
 	try {    
  		if (type === "GET") {        
      	return await ax.get(url);    
      } else if (type === "POST") {        
      	return await ax.post(url, data);    
      } else if (type === "PUT") {        
      	return await ax.put(url, data);   
      } else if (type === "Delete") {       
      	return await ax.delete(url, data);    
      } else if (type === "Patch") {        
      	return await ax.patch(url, data);    
      }  
    } catch (e) {    
    	return e;  
    }}

    export default requestLockApi;




