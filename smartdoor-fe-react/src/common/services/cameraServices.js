
import axios from "axios";
import Constants from '../../common/helpers/Constants';

function handleError(error) {  
	let msg = { error: "Something Went Wrong" };  
  return error?.response?.data ?? msg;
  }
  
function handleSuccess(response) {
	return response.data;
}

const camera_ax = axios.create({  
	headers: {
    "Content-type": "application/json",    
    "Access-Control-Allow-Origin": '*', 
    "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept ', 
    //"uuid": '6360eabe28d6ae7c7ae27b9b',   
  // "appKey": 'fde345f424b0b32b00502a8e96c1d006',    
  // // "appSecret": 'fc59834d4c8a4389857d583d3817e9f3',    
  // "Content-type": "application/x-www-form-urlencoded",  
  // "Accept" : "*/*" ,
  // "Access-Control-Max-Age": 3600 , 
  // "Sec-Fetch-Mode": "cors",
  },  
  // headers: {"uuid": Constants.CAMERA_UUID,   
  // "appKey":  Constants.CAMERA_APP_KEY,    
  // "appSecret": Constants.CAMERA_APP_SECRET,    
  // "Content-type": "application/json",    
  // "Accept" : "*/*"  
  // },  
  // baseURL: "",  
  timeout: 600000,
 });// timeout api calls to 10 minutes});
 
 camera_ax.interceptors.response.use(handleSuccess, handleError);
 
 // Api should be called belowexport 
 
 async function cameraServicesApi(type, data, url, headers) {  
 	try {    
  		if (type === "GET") {        
      	return await camera_ax.get(url, {headers});    
      } else if (type === "POST") {        
      	return await camera_ax.post(url, data, {headers});    
      } else if (type === "PUT") {        
      	return await camera_ax.put(url, data);   
      } else if (type === "Delete") {       
      	return await camera_ax.delete(url, data);    
      } else if (type === "Patch") {        
      	return await camera_ax.patch(url, data);    
      }  
    } catch (e) {    
    	return e;  
    }}

    export default cameraServicesApi;




