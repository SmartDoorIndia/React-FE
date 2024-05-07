/**
 * /* global google
 *
 * @format
 */

/* global google */

import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import actionIcon from '../../assets/images/action-icon.svg';
import Text from '../../shared/Text/Text';
import Image from '../../shared/Image/Image';
let toastId = '';

// const ENCRYPTION_KEY = "sd5b75nb7577#^%$%*&G#CGF*&%@#%*&";
// var cryptlib = require("cryptlib"),
//   iv = "F@$%^*GD$*(*#!12", //16 bytes = 128 bit
//   //iv = crypto.randomBytes(16),
//   key = cryptlib.getHashSha256(ENCRYPTION_KEY, 32); //32 bytes = 256 bits

// const cryptr = new Cryptr(CONSTANTS.CRYPTER_KEY);

// export const encrypt = (text) => {
//   let cryptText = cryptlib.encrypt(text, key, iv);
//   return cryptText.replace(/\//g, "_smartdoor_");
// };

// export const decrypt = (text) => {
//   let decrptText = text.replace(/_smartdoor_/g, "/");
//   return cryptlib.decrypt(decrptText, key, iv);
// };

// //used to encryption of localstorage data
// export const encryptedData = (data) => {
//   return cryptr.encrypt(data);
// };

// //used to decrypt localstorage data
// export const decryptedData = (data) => {
//   return cryptr.decrypt(data);
// };

// Used to convert string into Base64
export const stringToBase64 = (data) => {
  if (data) {
    const encrypData = new Buffer(data).toString('base64');
    return encrypData;
  }
};

// Used to convert Base64 string into string
export const base64toString = (data) => {
  if (data) {
    const dcryptData = new Buffer(data, 'base64').toString('ascii');
    return dcryptData;
  }
};

// Toaster messages for error
export const showErrorToast = (errorMessage, event) => {
  if (errorMessage) {
    if (!toast.isActive(toastId)) {
      toastId = toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        autoClose: 4000,
      });
    }
  }
};

// Toaster messages for success
export const showSuccessToast = (message) => {
  if (!toast.isActive(toastId)) {
    toastId = toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      autoClose: 4000,
    });
  }
};

// used to set localstorage item
export const setLocalStorage = (key, value) => {
  value = stringToBase64(JSON.stringify(value));
  // const encodedData = encryptedData(value);
  localStorage.setItem(key, value);
};

// used to get localstorage item
export const getLocalStorage = (key) => {
 try {
    if (key) {
      let data = localStorage.getItem(key);
      if (data) {
        // data = JSON.parse(decryptedData(data));
        const data64 = base64toString(data);
        data = JSON.parse(data64);
        return data;
      }
    }
    return null;   
 } catch (e) {
   clearLocalStorage();
   window.location.reload();
 }
};

// used to remove localstorage item
export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

// used to clear localstorage
export const clearLocalStorage = () => {
  localStorage.clear();
};

export const generateRandomString = (strLength = 8) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=@#$%&=';

  for (let i = 0; i < strLength; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

// Use to generate UUID - Unique ID
export const generateUUID = () => {
  let d = new Date().getTime(); // Timestamp
  let d2 = (performance && performance.now && performance.now() * 1000) || 0; // Time in microseconds since page-load or 0 if unsupported

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16; // random number between 0 and 16
    if (d > 0) {
      // Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      // Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

/**
 * Name: handleStatusElement
 * Desc: Return a  Color Tag according to status
 * @param {string} status
 */
export function handleStatusElement(status) {
  if ([ 'COMPLETED', 'PUBLISHED', 'CONVERTED', 'APPROVED', 'VISITED', 'Yes, I’m interested', 'completed', 'Completed' ].includes(status)) {
    return (
      <Text
        size="xSmall"
        fontWeight="mediumbold"
        color="white"
        text={ status }
        className="tagSuccess defaultTag ml-2 "
      />
    );
  } else if ([ 'PENDING', 'ASSIGNED', 'UNDER REVIEW', 'Will decide later','Make an offer' ].includes(status)) {
    return (
      <Text
        size="xSmall"
        fontWeight="mediumbold"
        color="white"
        text={ status }
        className="tagAlert defaultTag ml-2 "
      />
    );
  } else if (
    [ 'CANCELLED', 'PROBLEM', 'NOT INTERESTED', 'ON HOLD', 'REJECTED', 'CLOSED', 'FAILED', 'NOT_ACCEPTED', 'DISCARDED' , 'NOT VISITED', 'No, does not look interesting', 'Closed', 'Rejected'].includes(status)
  ) {
    return (
      <Text
        size="xSmall"
        fontWeight="mediumbold"
        color="white"
        text={ status }
        className="tagDangerous defaultTag ml-2"
      />
    );
  } else if (status === 'IN_PROGRESS' || status ==='IN PROGRESS'|| status ==='In progress' ) {
    return (
      <Text
        size="xSmall"
        fontWeight="mediumbold"
        color="white"
        text="IN PROGRESS"
        className="tagInfo defaultTag ml-2 labelFontSize 11"
      />
    );
  } else if (status === 'NOT_INTERESTED') {
    return (
      <Text
        fontWeight="mediumbold"
        color="white"
        text="NOT INTERESTED"
        className="tagDangerous defaultTag ml-1 labelFontSize fs-11"
      />
    );
  } else if (status === 'UNDER_REVIEW') {
    return (
      <Text
        size="xSmall"
        fontWeight="mediumbold"
        color="white"
        text={ status }
        className="tagAlert defaultTag ml-2 "
      />
    );
  } else if (status === 'KYC_COMPLETED') {
    return (
      <Text
        fontWeight="mediumbold"
        color="white"
        text="KYC COMPLETED"
        className="tagSuccess defaultTag ml-2 fs-11"
      />
    );
  }
  else if (status === 'INACTIVE') {
    return (
      <Text
        size="xSmall"
        fontWeight="mediumbold"
        color="white"
        text={ status }
        className="tagAlert defaultTag ml-2 "
      />
    );
  } else if (status === 'ACTIVE') {
    return (
      <Text
        fontWeight="mediumbold"
        color="white"
        text="ACTIVE"
        className="tagSuccess defaultTag ml-2 fs-11"
      />
    );
  } else if (status === 'ON_HOLD') {
    return (
      <Text
        size="xSmall"
        fontWeight="mediumbold"
        color="white"
        text="ON HOLD"
        className="tagDangerous defaultTag ml-1 labelFontSize"
      />
    );
  }
  else if (status === 'Pending form Cusomter') {
    return (
      <Text
        fontWeight="mediumbold"
        color="white"
        text="Pending form Cusomter"
        style={{backgroundColor:'#FF6C1A'}}
        className="tagAlert defaultTag ml-2 "
      />
    );
  } else {
    return (
      <Text
        size="xSmall"
        fontWeight="mediumbold"
        color="white"
        text={ status }
        className="tagAlert defaultTag ml-2 "
      />
    );
  }
}

/**
 * Name: ToolTip
 * Desc: Return Tool Tip
 * @param {string} position
 * @param {string} name
 * @param {Component} children
 */
export function ToolTip({ position, name, children, disable, ...rest }) {

  return (
    <span className="cursor-pointer">
      <OverlayTrigger
        placement={ position }
        delay={ { show: 250, hide: 400 } }
        overlay={ !disable ? <Tooltip id="button-tooltip">{name}</Tooltip> : <span></span> }
        { ...rest }>
        {children}
      </OverlayTrigger>
    </span>
  );
}


// export function showModalDataWrtPosition( position, rowData ) {
//   switch(position) {
//     // case ("Transaction Executive" || "Transaction Admin"):
//     //   // code block
//     // return <Link to={ { pathname: '/admin/transaction/user-detail',
//     //   state: { userData: rowData, module: 'TRANSACTION' },
//     //   } }>
//     //   <Image name="editIcon" src={ actionIcon } />
//     // </Link>
//     //   break;

//       case ("Sales Admin" || "Sales Executive"):
//         // code block
//       return <Link to={ { pathname: '/admin/sales/user-details',
//         state: { userData: rowData, module: 'SALES' },
//         } }>
//         <Image name="editIcon" src={ actionIcon } />
//       </Link>
//         break;
//     default:
//       // code block
//   }
// }

export function showModalDataWrtPosition( position, rowData ) {
  if(position==="Sales Admin" || position==="Sales Executive"){
    return <Link to={ { pathname: '/admin/sales/user-details',
        state: { userData: rowData, module: 'SALES' },
        } }>
        <Image name="editIcon" src={ actionIcon } />
      </Link>
  }
  else if(position==="Transaction Admin" || position==="Transaction Executive"){
    return <Link to={ { pathname: '/admin/user-management/user-details',///admin/transaction/user-detail
        state: { userData: rowData, module: 'TRANSACTION' },
        } }>
        <Image name="editIcon" src={ actionIcon } />
      </Link>
  }
  else if(position==="Help Desk Executive" || position==="Help Desk Admin"){
    return <Link to={ { pathname: '/admin/helpdesk/user-detail',
        state: { userData: rowData, module: 'HELPDESK' },
        } }>
        <Image name="editIcon" src={ actionIcon } />
      </Link>
  }
  else if(position==="Installation Executive" || position==="Installation Admin"){
    return <Link to={ { pathname: '/admin/execution/user-detail',
        state: { userData: rowData, module: 'EXECUTION' },
        } }>
        <Image name="editIcon" src={ actionIcon } />
      </Link>
  }
  else if(position==="Installation Executive" || position==="Installation Admin"){
    return <Link to={ { pathname: '/admin/execution/user-detail',
        state: { userData: rowData, module: 'EXECUTION' },
        } }>
        <Image name="editIcon" src={ actionIcon } />
      </Link>
  }else{
    return <Link to={ { pathname: '/admin/user-management/user-details',
    state: { userData: rowData, module: 'USER' },
    } }>
    <Image name="editIcon" src={ actionIcon } />
    </Link>
  }
}

/**
 * Name: setPrice
 * Desc: Return Price with comma formate. Ex: 1,00,000
 * @param {string} price
 */
// export function setPrice(price) {
//   if (price !== null) {
//     let x = price;
//     x = x.toString();
//     let lastThree = x.substring(x.length - 3);
//     const otherNumbers = x.substring(0, x.length - 3);
//     if (otherNumbers != '') lastThree = ',' + lastThree;
//     const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
//     return '₹' + res;
//   } else {
//     return '-';
//   }
// }

export function setPrice(price) {
  if (price !== null) {
    let x = price;
    let parts = parseFloat(x).toFixed(2).toString().split('.'); // Convert to a float with 2 decimal places and split into parts
    let integerPart = parts[0];
    let decimalPart = parts[1];

    let lastThree = integerPart.substring(integerPart.length - 3);
    const otherNumbers = integerPart.substring(0, integerPart.length - 3);
    if (otherNumbers !== '') lastThree = ',' + lastThree;
    const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
    return '₹' + res + (decimalPart !== '00' ? '.' + decimalPart : '');
  } else {
    return '-';
  }
}



/**
 * Name: showLimitedChar
 * Desc: Use to limit the characters.
 * @param {string} val
 */

export function showLimitedChar(val) {
  if (val) {
    const len = val.length;
    if (len >= 500) {
      val = val.substring(0, 500);
      return val;
    } else {
      return val;
    }
  } else {
    return '';
  }
}

/**
 * Name: formateDate
 * Desc: Return Date { Jan, 1 2021 }
 * @param {date} _date_
 */
export function formateDate(_date_, _formate_ = 'll') {

  try {
    if (_date_) return moment(_date_).format(_formate_);
    else return '-';
  } catch (e) {
    return '';
  }
}

/**
 * Name: getTimeInPeriod
 * Desc: Get time in AM PM formate
 * @param {string} hours
 * @param {string} minutes
 */
export function getTimeInPeriod(hours, minutes) {
  if (hours && minutes) {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  } else return '';
}

/**
 * Name: formateDateTime
 * Desc: Return Date With Time
 * @param {date} _datetime_
 */

export function formateDateTime(_datetime_) {
  try {
    if (_datetime_) {
      let dateTime = moment(_datetime_).format('lll');

      if (dateTime !== 'Invalid date') return dateTime;
      else {
        dateTime = _datetime_.replace(' IST', '');
        dateTime = moment(dateTime, 'ddd MMM DD HH:mm:ss YYYY');
        return moment(dateTime).format('lll');
      }
    } else return '';
  } catch (e) {
    return '';
  }
}


/**
 * Name: dateWithFormate
 * Desc: Return Date According To Format
 * @param {date} _date_
 * @param {string} _formate_
 */
export function dateWithFormate(_date_, _formate_ = 'YYYY-MM-DD') {
  try {
    if (_date_) return moment(_date_).format(_formate_);
    else return '';
  } catch (e) {
    return '';
  }
}

/**
 * Name: getCurrentWeek
 * Desc: Get Current Week by Date
 * @param {date} _date_
 */
export function getCurrentWeek(_date_ = new Date()) {
  try {
    if (_date_) {
      const currentDate = moment(_date_);
      const firstday = moment(currentDate).startOf('week');
      const lastday = moment(currentDate).endOf('week');
      return { firstday, lastday };
    }
  } catch (e) {
    return '';
  }
}

/**
 * Name: createDate
 * Desc: Create New Date in DateTime Format
 * @param {date} date
 * @param {string} time  // Ex: 09:00 AM
 * @param {boolean} isEnd
 */
export function createDate(date, time, isEnd) {
  try {
    date = formateDate(date);
    time = moment(time, 'h:mm A');
    if (isEnd) {
      time = moment(time, 'h:mm A').add(2, 'hour');
      return moment(`${ date } ${ time.format('HH:mm') }`).format();
    } else {
      return moment(`${ date } ${ time.format('HH:mm') }`).format();
    }
  } catch (e) {
    return '';
  }
}

// eslint-disable-next-line no-extend-native
// Used to capatilize the String
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

// eslint-disable-next-line no-extend-native
// Used to capatilize the Words in String
String.prototype.capitalizeWord = function() {
  return this.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export function getLocationStr(locationArr){
  const locations= locationArr && locationArr.length ? locationArr.map(val => val.location): [];
  return locations.toString().split(',').join(' , ');
}

/**
 *
 * Name: fileExtension
 * Desc: Use to get extension of file by url
 * @param {string} _urlStr_
 *
 */
export function fileExtension(_urlStr_) {
  try {
    // const doctypefileExtnsnsArr = [
    //   'doc',
    //   'docx',
    //   'odt',
    //   'pdf',
    //   'xls',
    //   'xlsx',
    //   'ods',
    //   'ppt',
    //   'pptx',
    //   'txt',
    // ];
    if (_urlStr_) {
      const f_extnsn =
            ('img file type:', /[.]/.exec(_urlStr_) ? /[^.]+$/.exec(_urlStr_) : undefined);
      return f_extnsn;
    } else return '';
  } catch (e) {
    return '';
  }
}

/**
 *
 * Name: rotateTableIcon
 * Desc: Use to rotate icons by id
 * Warn: first put the $rotatable class in element in className attribute.
 * @param {string} id
 *
 */
export function rotateTableIcon(id) {
  const element = document.getElementById(id);
  if (element) element.classList.toggle('done');
}

/**
 *
 * Name: getLocationByGeoCode
 * Desc: Use to get Location results by Google Geo code (placeId,  latLng)
 * Warn: options params is as per the Google location types doc.
 * @param {object} options
 * #options {string} placeId
 * #options {object} latLng {lat: float, lng: float}
 *
 */
export const getLocationByGeoCode = async (options) => {
  if (google) {
    const geocoder = new google.maps.Geocoder();
    const { results } = await geocoder.geocode(options);
    if (results && results[ 0 ]) {
      const lat = await results[ 0 ].geometry.location.lat();
      const lng = await results[ 0 ].geometry.location.lng();
      const location = results[ 0 ];

      return { lat, lng, location, status: true };
    }

    // return geocoder.geocode(
    //   options,
    //   function(responses, status) {
    //     if (status == 'OK') {
    //       if (responses[0]) {
    //         const lat      = responses[0].geometry.location.lat();
    //         const lng      = responses[0].geometry.location.lng();
    //         const location = responses[0];
    //         return { lat, lng, location}
    //       }
    //     }
    // });
  }

  return { status: false };
};

export const getLocationByCityName = async (cityName) => {
  if (google) {
    const geocoder = new google.maps.Geocoder();
    const { results } = await geocoder.geocode({ address: cityName });
    if (results && results[0]) {
      const lat = await results[0].geometry.location.lat();
      const lng = await results[0].geometry.location.lng();
      const location = results[0];
      return { lat, lng, location, status: true };
    }
  }
  return { status: false };
};

export const getReverseGeocodingDataai = async (lat, lng) => {
  const latlng = new google.maps.LatLng(lat, lng);
  const geocoder = new google.maps.Geocoder();

  // Convert the callback function to a promise
  const geocodePromise = (latlng) => {
    return new Promise((resolve, reject) => {
      geocoder.geocode({ 'latLng': latlng }, (results, status) => {
        if (status !== google.maps.GeocoderStatus.OK) {
          reject(status);
        }
        resolve(results);
      });
    });
  };

  try {
    const results = await geocodePromise(latlng);
    let zipcode = '';

    for (let i = 0; i < results.length; i++) {
      for (let j = 0; j < results[i]?.address_components?.length; j++) {
        if (results[i]?.address_components[j]?.types[0] === 'postal_code') {
          zipcode = results[i]?.address_components[j]?.long_name;
          break;
        }
      }
      if (zipcode.length) break;
    }

    return zipcode;
  } catch (error) {
    console.log('Error getting reverse geocoding data:', error);
    return '';
  }
};



export const getReverseGeocodingData = async (lat, lng) => {
  // export const getReverseGeocodingData = (latlng) => {
  let zipcode =''
  var latlng = new google.maps.LatLng(lat, lng);
  // This is making the Geocode request
  var geocoder =  new google.maps.Geocoder();
  await geocoder.geocode({ 'latLng': latlng },  (results, status) =>{
      if (status !== google.maps.GeocoderStatus.OK) {
          // alert(status);
          console.log(status, "status from getReverseGeocodingData")
      }
      // This is checking to see if the Geoeode Status is OK before proceeding
      if (status === google.maps.GeocoderStatus.OK) {          
          console.log(results);
          for(let i =0; i< results.length; i++){
            for(let j = 0;j< results[i]?.address_components?.length;j++){
              if(results[i]?.address_components[j]?.types[0]==='postal_code'){
                console.log("postal code:", results[i]?.address_components[j]?.long_name);
                zipcode = results[i]?.address_components[j]?.long_name
              }
              if(zipcode.length)break;
            }
            if(zipcode.length)break;
          }
      }      
  });
  return zipcode;
}

/**
 *
 * Name: getPredictionByName
 * Desc: Use to get location predictions by location name
 * Warn: types param is as per the Google location types doc.
 * @param {string} name*
 * @param {string} type (optional)
 *
 */
export const getPredictionByName = async (name, type = '(cities)') => {
  if (google) {
    const options = { input: name, types: [ type ], componentRestrictions: { country: 'IN' } };
    const service = new google.maps.places.AutocompleteService();
    const { predictions } = await service.getPlacePredictions(options);

    if (predictions.length) {
      const result = await getLocationByGeoCode({ placeId: predictions[ 0 ].place_id });

      return await result;
    }

    // return service.getPlacePredictions(options, async function (predictions, status) {
    //     if(status=='OK'){
    //       let result = await getLocationByGeoCode({placeId:predictions[0].place_id});
    //       return result;
    //     }
    // });
  }

  return { status: false };
};

/**
 *
 * Name: getPredictionByName
 * Desc: Use to get location predictions by location name
 * Warn: types param is as per the Google location types doc.
 * @param {string} name*
 * @param {string} type (optional)
 *
 */

export function showHideEditIcon(loginuserRole, position ) {
  if(loginuserRole === "SUPER ADMIN"){
    return true
  }
  if(loginuserRole === "ADMIN"){
    return true
  }
  if(loginuserRole === "HELP DESK ADMIN" &&  position === "Help Desk Executive"){
    return true
  }
  if(loginuserRole === "TRANSACTION ADMIN" &&  position === "TRANSACTION EXECUTIVE"){
    return true
  }
  if(loginuserRole === "FINANCE ADMIN" &&  position === "Finance Executive"){
    return true
  }
  if(loginuserRole === "SALES ADMIN" &&  position === "Sales Executive"){
    return true
  }
  if(loginuserRole === "INSTALLATION ADMIN" &&  position === "Installation Executive"){
    return true
  }
  else{
    return false
  }
  // if(loginuserRole)//HELP DESK EXECUTIVE
}


export function sensorBatteryStatus(loginuserRole, position ) {
  if(loginuserRole === "SUPER ADMIN"){
    return true
  }
  if(loginuserRole === "HELP DESK ADMIN" &&  position === "Help Desk Executive"){
    return true
  }
  if(loginuserRole === "TRANSACTION ADMIN" &&  position === "TRANSACTION EXECUTIVE"){
    return true
  }
  if(loginuserRole === "FINANCE ADMIN" &&  position === "Finance Executive"){
    return true
  }
  if(loginuserRole === "SALES ADMIN" &&  position === "Sales Executive"){
    return true
  }
  if(loginuserRole === "INSTALLATION ADMIN" &&  position === "Installation Executive"){
    return true
  }
  else{
    return false
  }
  // if(loginuserRole)//HELP DESK EXECUTIVE
}


/* -------------------------------DATE FORMATW--------------------------------------*/

// let month    = new Date(Date.parse(_datetime_)).toLocaleString('default', { month: 'short'});
// let year     = new Date(Date.parse(_datetime_)).getFullYear();
// let date     = new Date(Date.parse(_datetime_)).getDate();
// let hours    =  new Date(Date.parse(_datetime_)).getHours();
// let minutes  =  new Date(Date.parse(_datetime_)).getMinutes();

// Get Current week
// var curr = new Date(_date_); // get current date
// var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
// var last = first + 6; // last day is the first day + 6

// var firstday = new Date(curr.setDate(first)).toUTCString();
// var lastday = new Date(curr.setDate(last)).toUTCString();

// export function formateDateTimeIST (_datetime_) {
//   if (_datetime_){
//       var date = new Date(_datetime_.replace('IST', ''));

//       let day     = date.getDate();
//       let month   = date.toLocaleString('default', { month: 'short'});
//       let year    = date.getFullYear();
//       let hours   = date.getHours();
//       let minutes = date.getMinutes();

//     return month+" "+day+", "+year +"  "+getTimeInPeriod(hours,minutes);
//   }else{
//     return ""
//   }

// }

// var date = new Date(_date_.replace('IST', ''));
// let day   = date.getDate();
// let month = date.toLocaleString('default', { month: 'short'});
// let year  = date.getFullYear();

// console.log("momenterer" ,moment(_date_).format(_formate_) );

// if(formate === "YYYY-MM-DD"){
//   month = date.getMonth()+1;
//   return year+"-"+month+"-"+day
// } else {
//   return month+" "+day+", "+year
// }

// export const generateTimestamp = (fileName) => {
//   let extension = fileName.split(".").pop();
//   let newFileName =
//     moment().valueOf() + generateRandomString() + "." + extension;
//   return newFileName;
// };
