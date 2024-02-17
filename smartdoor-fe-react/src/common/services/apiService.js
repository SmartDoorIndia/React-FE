/** @format */

import axios from "axios";

import CONSTANTS from "../helpers/Constants";

import { ApiJson } from "./apiJson";
import { showErrorToast, showSuccessToast } from "../helpers/Utils";

import { disconnectSocket } from "../helpers/SocketProvider";
import { tokenExpired, provideAuth } from "../helpers/Auth";

let apiFailCounter = 0;
axios.defaults.baseURL = CONSTANTS.baseUrl;

axios.interceptors.request.use(
   function (config) {
      const { isAuth, userData } = provideAuth();

      if (isAuth) {
         // if (userInfo.access_token) {
         config.headers.Authorization = `bearer ${userData.access_token}`;
         config.headers.Accept = "*/*";
         // config.headers["Content-Type"] = "application/json";

         // }

         //added new
         // config.headers["Content-Type"]: "application/json",
         // config.headers["uuid"] =  CONSTANTS.CAMERA_UUID;
         // config.headers["appKey"] =  CONSTANTS.CAMERA_APP_KEY;
      }
      return config;
   },

   function (error) {
      "application/json";

      return Promise.reject(error);
   }
);

const prepareDataObject = (_data_, paramObj = {}) => {
   for (const key in _data_) {
      if (paramObj[key] || paramObj[key] === false) {
         _data_[key] = paramObj[key];
      } else {
         if (typeof _data_[key] !== "object") _data_[key] = "";
      }
   }
   return _data_;
};

const injectParamsToUrl = (_url_, paramObj) => {
   let url = _url_;

   for (const key in paramObj) {
      url = url.replace(":" + key, paramObj[key]);
   }

   return url;
};

// const HeadersToReq = async (_headers_) => {
//   let userInfo = await getLocalStorage('authData');

//   if (userInfo) {
//     if (userInfo.access_token) {
//       _headers_['Authorization'] = `bearer ${userInfo.access_token}`
//     }
//   }

//   return _headers_;
// };

const handleErrorByStatus = (error) => {
   if (error && error.data.error) {
      if (error.status === 401) showErrorToast(error.data.error_description);
      else showErrorToast(error.data.error_description);
   }
};

const mainApiService = async (apiKeyName, data) => {
   const apiDetails = ApiJson[apiKeyName];

   if (!apiDetails) {
      throw new Error("Api configuration do not found in api-json, please check api-json.js");
   }

   const requestObject = Object.assign({}, apiDetails);
   requestObject.data =
      typeof data === "object" ? data : prepareDataObject(requestObject.data, data);
   requestObject.url = injectParamsToUrl(requestObject.url, data);
   // requestObject.headers = await injectHeadersToReq(requestObject.headers, data);
   return axios(requestObject)
      .then(function (result) {
         apiFailCounter = 0;
         if (result.data && result) {
            if (result.data.access_token) {
               const message = "Login success!";
               if (requestObject.showResultMessage === true) showSuccessToast(message);
            }
         } else {
            handleErrorByStatus(result.data);
         }
         return result || { data: {} };
      })
      .catch(function (error) {
         if (error && error.response) {
            if (requestObject.showErrorMessage === true) handleErrorByStatus(error.response);
         }
         if (error.config) {
            if (
               error.config.maxContentLength - 1 &&
               error.toString().indexOf("Network Error") > -1
            ) {
               apiFailCounter++;
               if (apiFailCounter >= 3) {
                  disconnectSocket();
                  tokenExpired();
               }
            }
         }

         return error.response || { data: {} };
      });
};

export default mainApiService;
