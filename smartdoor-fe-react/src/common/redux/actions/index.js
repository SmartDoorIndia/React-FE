/** @format */

import notify from 'devextreme/ui/notify';

import mainApiService from '../../services/apiService';
import * as Actions from '../types';

import { clearLocalStorage, setLocalStorage } from '../../../common/helpers/Utils';
import { showSuccessToast, showErrorToast } from '../../../common/helpers/Utils';
import { provideAuth } from '../../../common/helpers/Auth';

export function showToastMessage(response) {
  if (response.data && response.data.status === 200) showSuccessToast(response.data.customMessage);
  else if (response.data && response.data.error) showErrorToast(response.data.error);
  else showErrorToast('Unexpected error. Please try again later');
}

export function showToastErrMessage({ data }) {
  if (data.status !== 200 && data.error) showErrorToast(data.error);
  else showErrorToast('Unexpected error. Please try again later');
}

// Action to perform Login
export const actionLogin = (data) => async (dispatch) => {
  const response = await mainApiService('login', data);
  if (response.data.access_token) {
    setLocalStorage('authData', response.data);
  }
  dispatch({ type: Actions.ADMIN_AUTH_DATA, data: response.data });
  return response;
};


// Action to get Login otp
export const actionGetOtp = (data) => async (dispatch) => {
  const response = await mainApiService('getOtp', data);
  dispatch({ type: Actions.ADMIN_AUTH_OTP_DATA, data: response.data });
  return response;
};

// Action to Get society Leades data
export const getSocietyLeadsData = (data) => async (dispatch) => {
  dispatch({ type: Actions.SALES_LEADS_DATATABLE_LOADING, data: {} });
  const response = await mainApiService('getSocietyLeads', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({
        type: Actions.SALES_LEADS_DATATABLE_SUCCESS,
        data: response.data.resourceData,
      });
    } else dispatch({ type: Actions.SALES_LEADS_DATATABLE_ERROR, data: response.data });
  }
};

// Action to Get society Leades data
export const getSalesTeamData = (data) => async (dispatch) => {
  dispatch({ type: Actions.SALES_TEAM_DATATABLE_LOADING, data: {} });
  const response = await mainApiService('getSalesTeam', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.SALES_TEAM_DATATABLE_SUCCESS, data: response.data.resourceData });
    } else dispatch({ type: Actions.SALES_TEAM_DATATABLE_ERROR, data: response.data });
  }
};

// Action to Get society Leades Counts
export const getLeadsCount = () => async (dispatch) => {
  const response = await mainApiService('getSalesCount', {});
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.SALES_LEADS_COUNT_SUCCESS, data: response.data.resourceData });
    } else dispatch({ type: Actions.SALES_LEADS_COUNT_ERROR, data: response.data });
  }
};

// Action to Get society Leads Details
export const getLeadsDetail = async (data) => {
  const response = await mainApiService('getLeadsDetail', data);
  return response;
};

export const postComment = async (data) => {
  const response = await mainApiService('postComment', data);
  if (response.data && response.data.status === 200) showSuccessToast(response.data.customMessage);
  else if (response.data && response.data.error) showErrorToast(response.data.error);
  else showErrorToast('Unexpected error. Please try again later');
  return response;
};

// Action to Get society Leades Counts
export const createLead = async (data) => {
  const response = await mainApiService('createLead', data);
  return response
};

// Action to Update/Approve society Lead
export const approveLead = async (data) => {
  const response = await mainApiService('approveLead', data);
  return response;
};

// Action to  Add new User/TeamMember Counts
export const addNewTeamMember = async (data) => {
  console.log(data,"add user management data");
  const response = await mainApiService('addNewTeamMember', data);
  if (response.data.status) {
    if (response.data && response.data.status === 200) {
      showSuccessToast('User has been created successfully.');
    } else if (response.data && response.data.status === 409) showErrorToast(response.data.message);
    else showErrorToast(response.data.message);
  }
  return response;
};

// Send cityId list with userid
export const setworkCityRequest = async (data) => {
  const response = await mainApiService('setWorkCityRequest', data);
  if (response.data.status) {
    if (response.data && response.data.status === 200) {
      // showSuccessToast('User has been created successfully.');
    } else if (response.data && response.data.status === 409) showErrorToast(response.data.message);
    else showErrorToast(response.data.message);
  }
  return response;
}
export const addNewPlan = async (data) => {
  console.log(data,"add new Plan");
  const response = await mainApiService('addNewPlan', data);
  if (response.data.status) {
    console.log("add new Plan",response.data);
    if (response.data && response.data.status === 200) {
      showSuccessToast(response.data.customMessage);
    } else if (response.data && response.data.status === 409) showErrorToast(response.data.responseMessage);
      else if (response.data && response.data.status === 500) showErrorToast("Please Try again...");
    else showErrorToast(response.data.customMessage);
  }
  return response;
};

// Action to  Get All User Roles
export const getAllRoles = (data) => async (dispatch) => {
  const response = await mainApiService('getAllRoles', data);
  if (response) {
    if (response.data && response.status === 200) {
      if (response.data.resourceData) {
        dispatch({ type: Actions.ADMIN_ALL_ROLES, data: response.data.resourceData });
      } // return response.data.resourceData;
    }
  }
};

// Action to  Get All User Roles
export const getAllCity = (data) => async (dispatch) => {
  const response = await mainApiService('getAllCity', data);
  if (response) {
    if (response.data && response.status === 200) {
      if (response.data.resourceData) {
        console.log(response.data.resourceData, "response.data.resourceData")
        dispatch({ type: Actions.ALL_CITIES, data: response.data.resourceData });
      } // return response.data.resourceData;
    }
  }
};

// Action to  Get All Cities With Id
export const getAllCityWithId = (data) => async (dispatch) => {
  const response = await mainApiService('getAllCityWithId', data);
  if (response) {
    if (response.data && response.status === 200) {
      if (response.data.resourceData) {
        console.log(response.data.resourceData, "response.data.resourceData")
        dispatch({ type: Actions.ALL_CITIES_ID, data: response.data.resourceData });
        return response
      } // return response.data.resourceData;
    }
  }
};

// Action to  Get All States with Id
export const getAllStateWithId = (data) => async (dispatch) => {
  const response = await mainApiService('getAllStateWithId', data);
  if (response) {
    if (response.data && response.status === 200) {
      if (response.data.resourceData) {
        console.log(response.data.resourceData, "response.data.resourceData")
        dispatch({ type: Actions.ALL_STATES_ID, data: response.data.resourceData });
        return response
      } // return response.data.resourceData;
    }
  }
};




//Action to get Location By City
export const getLocationByCity = (data) => async (dispatch) => {
  const response = await mainApiService('getLocationByCity', data);
  return response;
};

export const getUserLocationByCity = (data) => async (dispatch) => {
  const response = await mainApiService('getUserLocationByCity', data);
  return response;
};

//getAllInstallationCalenderCity
export const getAllInstallationCity = async (data) => {
  const response = await mainApiService('getAllCity', data);
  if (response.data.status !== 200) {
    showToastErrMessage(response);
  }
  return response;
};

export const getInstallationLocationByCity = async (data) => {
  const response = await mainApiService('getLocationByCity', data);
  if (response.data.status !== 200) {
    showToastErrMessage(response);
  }
  return response;
};

// Action to Get All users data
export const getAllUsers = (data) => async (dispatch) => {
  dispatch({ type: Actions.USER_MANAGEMENT_LOADING, data: {} });
  const response = await mainApiService('getAllUsers', data);
  if (response) {
    if (response.data && response.status === 200) {
      if (response.data.resourceData) {
        dispatch({ type: Actions.USER_MANAGEMENT_SUCCESS, data: {userData : response.data.resourceData, records : response.data.records, currentPage : data?.pageNo, rowsPerPage : data?.pageSize, searchStr: data?.searchString, city: data?.searchByCity, location: data?.searchByzipCode, department: data.departmentName, defaultSort: data?.defaultSort, defaultSortId: data?.defaultSortId, defaultSortFieldId: data?.defaultSortFieldId}});
      }
    } else dispatch({ type: Actions.USER_MANAGEMENT_ERROR, data: response.data });
  }
};

// Action to Get All Societies
export const getAllSociety = (data) => async (dispatch) => {
  dispatch({ type: Actions.SOCIETY_MODULE_LOADING, data: {} });
  const response = await mainApiService('getAllSociety', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.SOCIETY_MODULE_SUCCESS, data: response.data.resourceData });
    } else dispatch({ type: Actions.SOCIETY_MODULE_ERROR, data: response.data });
  } else dispatch({ type: Actions.SOCIETY_MODULE_ERROR, data: [] });
};

// Action to Get society Leads Details
export const getSocietyDetails = async (data) => {
  const response = await mainApiService('getSocietyDetails', data);
  return response;
};

// Action to Get society Leades Counts
export const createNewSociety = async (data) => {
  const response = await mainApiService('createNewSociety', data);
  if (response.data.status) {
    if (response.data && response.data.status === 200) {
      showSuccessToast('Society created successfully');
    // } else if (response.data && response.data.status === 409) showErrorToast('User already exist');
  } else if (response.data && response.data.status === 409) showErrorToast(response.data.message);
    else showErrorToast(response.data.message);
  }
  return response;
};

// Action to Get society Leads Details
export const getSocietyUsers = async (data) => {
  const response = await mainApiService('getSocietyUsers', data);
  return response;
};

// Action to Get All Societied
export const setAuthData = () => async (dispatch) => {
  const { isAuth, userData } = provideAuth();
  if (isAuth) {
    dispatch({ type: Actions.ADMIN_AUTH_DATA, data: userData });
  }
};

// // Action to Get society Leads Details
// export const assignLeadToUser = async (data) => {
//   const response = await mainApiService('assignLeadToUser', data);
//   return response;
// };
// Action to Change/Update installation request assignee.
export const assignLeadToUser = async (data) => {
  const response = await mainApiService('assignLeadToUser', data);
  if (response.data && response.data.status === 200) {
    showSuccessToast(response.data.customMessage);
    // notify(response.data.customMessage, 'success', 1000);
  }
  // showSuccessToast(response.data.customMessage)
  else if (response.data && response.data.error) notify(response.data.message, 'error', 1000);
  showErrorToast(response.data.error)
  // else notify('Unexpected error. Please try again later', 'error', 1000);
  return response;
};

// Action to Get society Leads Details
export const getAllConvertedLeadsByUser = async (data) => {
  const response = await mainApiService('getAllConvertedLeadsByUser', data);
  return response;
};

// Action to Get society Leades data
export const getInstallationRequest = (data) => async (dispatch) => {
  console.log(data,"data for installation filter");
  dispatch({ type: Actions.EXCUTIVE_INSTALLATION_LOADING, data: [] });
  const response = await mainApiService('getInstallationRequest', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({
        type: Actions.EXCUTIVE_INSTALLATION_SUCCESS,
        data: response.data.resourceData,
      });
    } else dispatch({ type: Actions.EXCUTIVE_INSTALLATION_ERROR, data: response.data });
  }
};

// Action to Get society Leades data
export const getServiceRequest = (data) => async (dispatch) => {
  dispatch({ type: Actions.EXCUTIVE_SERVICE_REQ_LOADING, data: [] });
  const response = await mainApiService('getServiceRequest', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.EXCUTIVE_SERVICE_REQ_SUCCESS, data: response.data.resourceData });
    } else dispatch({ type: Actions.EXCUTIVE_SERVICE_REQ_ERROR, data: response.data });
  }
};

// Action to Get society Leades data
export const getAllPublishedProperty = (data) => async (dispatch) => {
  dispatch({ type: Actions.EXCUTIVE_PUBLISHED_PROPERTY_LOADING, data: [] });
  const response = await mainApiService('getAllPublishedProperty', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({
        type: Actions.EXCUTIVE_PUBLISHED_PROPERTY_SUCCESS,
        data: response.data.resourceData,
      });
    } else dispatch({ type: Actions.EXCUTIVE_PUBLISHED_PROPERTY_ERROR, data: response.data });
  }
};

// Action to Get society Leades data
export const getAllExecutiveTeams = (data) => async (dispatch) => {
  dispatch({ type: Actions.EXCUTIVE_TEAMS_LOADING, data: [] });
  const response = await mainApiService('getAllExecutiveTeams', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.EXCUTIVE_TEAMS_SUCCESS, data: response.data.resourceData });
    } else dispatch({ type: Actions.EXCUTIVE_TEAMS_ERROR, data: response.data });
  }
};

// Action to Get society Analytics data
export const getPropertyAnalytics = (data) => async (dispatch) => {
  dispatch({ type: Actions.SOCIETY_ANALYTICS_LOADING, data: [] });
  const response = await mainApiService('getPropertyAnalytics', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.SOCIETY_ANALYTICS_SUCCESS, data: response.data.resourceData });
    } else dispatch({ type: Actions.SOCIETY_ANALYTICS_ERROR, data: response.data });
  }
};

// Action to Get Society Deals data
export const getAllPropertyDeals = (data) => async (dispatch) => {
  dispatch({ type: Actions.SOCIETY_PROPERTYDEALS_LOADING, data: [] });
  const response = await mainApiService('getAllPropertyDeals', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({
        type: Actions.SOCIETY_PROPERTYDEALS_SUCCESS,
        data: response.data.resourceData,
      });
    } else dispatch({ type: Actions.SOCIETY_PROPERTYDEALS_ERROR, data: response.data });
  }
};

// Action to Get Society Deals data
export const getAllLeadsBySociety = (data) => async (dispatch) => {
  dispatch({ type: Actions.SOCIETY_PROPERTY_LEADS_LOADING, data: [] });
  const response = await mainApiService('getAllLeadsBySociety', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({
        type: Actions.SOCIETY_PROPERTY_LEADS_SUCCESS,
        data: response.data.resourceData,
      });
    } else dispatch({ type: Actions.SOCIETY_PROPERTY_LEADS_ERROR, data: response.data });
  }
};

// Action to Get Society Deals data
export const getAllPropertyBySocietyId = (data) => async (dispatch) => {
  dispatch({ type: Actions.SOCIETY_PROPERTY_LISTED_LOADING, data: [] });
  const response = await mainApiService('getAllPropertyBySocietyId', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({
        type: Actions.SOCIETY_PROPERTY_LISTED_SUCCESS,
        data: response.data.resourceData,
      });
    } else dispatch({ type: Actions.SOCIETY_PROPERTY_LISTED_SUCCESS, data: [] });
  }
};




// Action to  Edit User/TeamMember Counts
export const editTeamMember = async (data) => {
  const response = await mainApiService('editUser', data);
  if (response.data && response.data.status === 200) {
    showSuccessToast('User has been edited successfully.');
  } else if (response.data && response.data.status === 409) showErrorToast('User already exist.');
  else if (response.data && response.data.status !== 409 && response.data.error) {
    showErrorToast(response.data.error);
  } else showErrorToast('Unexpected error. Please try again later');
  return response;
};

// Action to  Block User/TeamMember Counts
export const getCameraUserToken = async (data) => {
  const response = await mainApiService('getCameraUserToken', data);
  if (response.data && response.data.status === 200) return response;
  else if (response.data && response.data.error) showErrorToast(response.data.error);
  else showErrorToast('Unexpected error. Please try again later');
  return response;
};

// Action to  Block User/TeamMember Counts
export const blockTeamMember = async (data) => {
  const response = await mainApiService('blockUser', data);
  if (response.data && response.data.status === 200) showSuccessToast(response.data.customMessage);
  else if (response.data && response.data.error) showErrorToast(response.data.error);
  else showErrorToast('Unexpected error. Please try again later');
  return response;
};

// Action to Deactivate User/TeamMember Counts
export const deactivateTeamMember = async (data) => {
  const response = await mainApiService('activateDeactivateUser', data);
  if (response.data && response.data.status === 200)
  {data.activateDeactivateuser ? showSuccessToast("User Activated Successfully") : showSuccessToast("User Deactivated Successfully")}
  //  showSuccessToast(response.data.customMessage);
  else if (response.data && response.data.error) showErrorToast(response.data.error);
  else showErrorToast('Unexpected error. Please try again later');
  return response;
};

// Action to Get User Data
export const getUserByCityAndDept = (data) => async (dispatch) => {
  dispatch({ type: Actions.USER_MANAGEMENT_LOADING, data: [] });
  const response = await mainApiService('getUserByCityAndDept', data);
  if (response) {
    if (response.data && response.status === 200) {
      if (response.data.resourceData) {
        dispatch({ type: Actions.USER_MANAGEMENT_SUCCESS, data: response.data.resourceData });
      }
    } else dispatch({ type: Actions.USER_MANAGEMENT_ERROR, data: response.data });
  }
};


export const getCityAndDept = (data) => async (dispatch) => {
  const response = await mainApiService('getCityAndDept', data);
  if (response) {
    if (response.data && response.status === 200) {
      if (response.data.resourceData) {
        dispatch({ type: Actions.CITY_DEP_LIST_SUCCESS, data: response.data.resourceData });
      }
    }
  }
};

// Action to Get All Plans For Admin
export const getPlansForAdmin = (data) => async (dispatch) => {
  const response = await mainApiService('getPlansForAdmin', data);
  if (response) {
    if (response.data && response.status === 200) {
      if (response.data.resourceData) {
        dispatch({ type: Actions.MANAGE_PLAN_SUCCESS, data: response.data.resourceData });
      }
    }
  }
};

// Action to Get All Plans For Admin
export const getNonSDProperties= (data) => async (dispatch) => {
  const response = await mainApiService('getNonSDProperties', data);
  if (response) {
    if (response.data && response.status === 200) {
      if (response.data.resourceData) {
        await dispatch({ type: Actions.NON_SD_PROPERTIES_SUCCESS, data: {propertyData : response.data.resourceData, records : response.data.records, currentPage : data?.pageNo, rowsPerPage : data?.pageSize, searchStr: data?.searchString, propertyId: data.propertyId, city: data?.city, location: data?.location, smartLockProperty: data?.smartLockProperty, propertyStatus: data?.propertyStatus, fromDate: data.fromDate, toDate:data.toDate, pState: data.pState, defaultSort: data.defaultSort, defaultSortId: data.defaultSortId, defaultSortFieldId: data.defaultSortFieldId} });
        return response;
      }
    }
  }
};

// Action to get all properties..
export const getAllProperties = (data) => async (dispatch) => {
  dispatch({ type: Actions.PROPERTY_MODULE_LOADING, data: {} });
  const response = await mainApiService('getAllProperties', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      await dispatch({ type: Actions.PROPERTY_MODULE_SUCCESS, data: {propertyData : response.data.resourceData, records : response.data.records, currentPage : data?.pageNo, rowsPerPage : data?.pageSize, searchStr: data?.searchString, propertyId: data.propertyId, city: data?.city, location: data?.location, smartLockProperty: data?.smartLockProperty, propertyStatus: data?.propertyStatus, fromDate: data.fromDate, toDate:data.toDate, pState: data.pState, defaultSort: data.defaultSort, defaultSortId: data.defaultSortId, defaultSortFieldId: data.defaultSortFieldId,} });
      return response;
    } else dispatch({ type: Actions.PROPERTY_MODULE_ERROR, data: response.data });
  }
};

export const getAllDeletedProperties = (data) => async (dispatch) => {
  dispatch({ type: Actions.DELETED_PROPERTY_DATA_LOADING, data: {} });
  const response = await mainApiService('getAllDeletedProperties', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      await dispatch({ type: Actions.DELETED_PROPERTY_DATA_SUCCESS, data: {propertyData : response.data.resourceData, records : response.data.records, currentPage : data?.pageNo, rowsPerPage : data?.pageSize, searchStr: data?.searchString, propertyId: data.propertyId, city: data?.city, location: data?.location, smartLockProperty: data?.smartLockProperty, propertyStatus: data?.propertyStatus, fromDate: data.fromDate, toDate:data.toDate, pState: data.pState, defaultSort: data.defaultSort, defaultSortId: data.defaultSortId, defaultSortFieldId: data.defaultSortFieldId} });
      return response;
    } else dispatch({ type: Actions.DELETED_PROPERTY_DATA_ERROR, data: response.data });
  }
};

// Action to get property details acc to the property id//getPropertyDetails
export const getPropertyDetails = async (data) => {
  const response = await mainApiService('getPropertyDetails', data);
  return response;
};

export const getPropertyPlanDetails = async(data) => {
  const response = await mainApiService('getPropertyPlanDetails',data);
  return response;
}

//Upload Image File to AWS
export const uploadImage = async(formData) => {
  const response = await mainApiService('uploadImage', formData)
  return response;
}

//Action to remote unlock by owner
export const remoteUnlock = async (data) => {
  const response = await mainApiService('remoteUnlock', data)
  return response
};

//Action to remote OTP by owner
export const remoteOTP = async (data) => {
  const response = await mainApiService('remoteOTP', data)
  return response
};

// Action to verify docs from property
export const verifyDoc = async (data) => {
  const response = await mainApiService('verifyDoc', data);
  if (response.data.status) {
    if (response.data && response.data.status === 200) {
      showSuccessToast(response.data.customMessage);
    }
    // else showErrorToast(response.data.customMessage);
  }
  return response;
};
// Action to unverify docs from property
export const unverifyDoc = async (data) => {
  const response = await mainApiService('unverifyDoc', data);
  if (response.data.status) {
    if (response.data && response.data.status === 200) {
      showSuccessToast(response.data.customMessage);
    }
    // else showErrorToast(response.data.customMessage);
  }
  return response;
};

// Action to delete get property according to the docId 
export const deletePropertyImage = async (data) => {
  const response = await mainApiService('deletePropertyImage', data);
  return response;
};

// Action to delete society logo
export const deleteSocietyLogo = async (data) => {
  const response = await mainApiService('deleteSocietyLogo', data);
  return response;
};

// Action to send msg to owner
export const sendMsgToOwner = async (data) => {
  const response = await mainApiService('sendMsgToOwner', data);
  return response;
};
// Action to upload property image
export const addImage = async (data) => {
  const response = await mainApiService('addImage', data);
  if (response.data.status) {
    if (response.data && response.data.status === 200) {
      showSuccessToast('Image uploaded successfully');
    } else if (response.data && response.data.status === 409) showErrorToast('Image not uploaded');
    else showErrorToast(response.data.message);
  }
  return response;
};

// Action to upload property image
export const saveSocietyLogoAction = async (data) => {
  const response = await mainApiService('saveSocietyLogo', data);
  if (response.data.status) {
    if (response.data && response.data.status === 200) {
      showSuccessToast('Image uploaded successfully');
    } else if (response.data && response.data.status === 409) showErrorToast('Image not uploaded');
    else showErrorToast(response.data.message);
  }
  return response;
};

// Action to Get Property Analytics data
export const getPropertyAnalyticsByPropertyId = (data) => async (dispatch) => {
  dispatch({ type: Actions.PROPERTY_ANALYTICS_LOADING, data: [] });
  const response = await mainApiService('getPropertyAnalyticsByPropertyId', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.PROPERTY_ANALYTICS_SUCCESS, data: response.data.resourceData });
    } else dispatch({ type: Actions.PROPERTY_ANALYTICS_ERROR, data: response.data });
  }
};

// Action to Update Property data
export const approveProperty = async (data) => {
  const response = await mainApiService('approveProperty', data);

  if (response.data && response.data.status === 200) showSuccessToast(response.data.customMessage);
  else if (response.data && response.data.error) showErrorToast(response.data.message);
  else showErrorToast('Unexpected error. Please try again later');
  return response;
};

// Action to Get Property City
export const getPropertyCity = (data) => async (dispatch) => {
  const response = await mainApiService('getPropertyCity', data);
  if (response) {
    if (response.data && response.status === 200) {
      if (response.data.resourceData) {
        dispatch({
          type: Actions.PROPERTY_CITY_LIST_SUCCESS,
          data: response.data.resourceData,
        });
      }
    }
  }
};

export const getAllFilters = (data) => async (dispatch) => {
  const response = await mainApiService('getAllFilters', data);
  if (response) {
    if (response.data && response.status === 200) {
      if (response.data.resourceData) {
        dispatch({
          type: Actions.PROPERTY_FILTER_LIST_SUCCESS,
          data: response.data.resourceData,
        });
      }
    }
  }
};

// Action to Get society Leades Counts
export const createNewProperty = async (data) => {
  const response = await mainApiService('createNewProperty', data);
  if (response.data.status) {
    if (response.data && response.data.status === 200) {
      showSuccessToast('Property updated successfully');
    } else if (response.data && response.data.status === 409) showErrorToast('User already exist');
    else showErrorToast(response.data.message);
  }
  return response;
};

// Action to get Society Leads City
export const getSocietyLeadsCity = (data) => async (dispatch) => {
  const response = await mainApiService('getSocietyLeadsCity', data);
  if (response) {
    if (response.data && response.status === 200) {
      if (response.data.resourceData) {
        dispatch({
          type: Actions.SOCIETY_LEADS_CITY_SUCCESS,
          data: response.data.resourceData,
        });
      }
    }
  }
};

// Action to get SalesTeam City
export const getSalesTeamCity = (data) => async (dispatch) => {
  const response = await mainApiService('getSalesTeamCity', data);
  if (response) {
    if (response.data && response.status === 200) {
      if (response.data.resourceData) {
        dispatch({ type: Actions.SALES_TEAM_CITY_SUCCESS, data: response.data.resourceData });
      }
    }
  }
};

// Action to get all society City
export const getAllSocietyCity = (data) => async (dispatch) => {
  const response = await mainApiService('getAllSocietyCity', data);
  if (response) {
    if (response.data && response.status === 200) {
      if (response.data.resourceData) {
        dispatch({ type: Actions.SOCIETY_CITY_SUCCESS, data: response.data.resourceData });
      }
    }
  }
};

// Action to Update / Disable Society
export const disableSociety = async (data) => {
  const response = await mainApiService('disableSociety', data);
  if (response) {
    if (response.data && response.data.status === 200) {
      showSuccessToast(response.data.customMessage);
    } else if (response.data && response.data.error) showErrorToast(response.data.error);
    else showErrorToast('Unexpected error. Please try again later');
    return response;
  }
};

// ---------------CONSUMER----------------------------------------------------------

// Action to show all consumers //getAllConsumerUsers
export const getAllConsumerUsers = (data) => async (dispatch) => {
  dispatch({ type: Actions.CONSUMSER_MANAGEMENT_LOADING, data: {} });
  const response = await mainApiService('getAllConsumerUsers', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.CONSUMSER_MANAGEMENT_SUCCESS, data: response.data.resourceData });
    } else dispatch({ type: Actions.CONSUMSER_MANAGEMENT_ERROR, data: response.data });
  }
};

export const getAllConsumers = (data) => async (dispatch) => {
  dispatch({ type: Actions.CONSUMSER_MANAGEMENT_LOADING, data: {} });
  const response = await mainApiService('getAllConsumers', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.CONSUMSER_MANAGEMENT_SUCCESS, data: {consumersData: response.data.resourceData, records: response.data.records, currentPage: data.pageNo, rowsPerPage: data.pageSize, searchStr: data.searchString, kycStatus: data.kycStatus, defaultSort: data.defaultSort, defaultSortId: data.defaultSortId, defaultSortFieldId: data.defaultSortFieldId} });
    } else dispatch({ type: Actions.CONSUMSER_MANAGEMENT_ERROR, data: response.data.resourceData });
  }
};

// Action to get Consumer Property By UserId
export const getConsumerPropertyByUserId = async (data) => {
  const response = await mainApiService('getConsumerPropertyByUserId', data);
  return response;
};

export const getConsumerTransactionsByUserId = async (data) => {
  const response = await mainApiService('getConsumerTransactionsByUserId', data);
  return response;
};

// export const getBuybackRequests = async (data) => {
//   const response = await mainApiService('getBuybackRequests', data);
//   return response;
// };

export const getBuybackRequests = (data) => async (dispatch) => {
  dispatch({ type: Actions.BUYBACK_DATATABLE_LOADING, data: {} });
  const response = await mainApiService('getBuybackRequests', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.BUYBACK_DATATABLE_SUCCESS, data: response.data.resourceData });
    } else dispatch({ type: Actions.BUYBACK_DATATABLE_ERROR, data: response.data });
  }
};

// Action to Block consumer user
export const blockConsumerUser = async (data) => {
  const response = await mainApiService('blockConsumerUser', data);
  if (response.data && response.data.status === 200) showSuccessToast(response.data.customMessage);
  else if (response.data && response.data.error) showErrorToast(response.data.error);
  else showErrorToast('Unexpected error. Please try again later');
  return response;
};

// Action to get Consumer Property By UserId
export const getAllServiceRequest = async (data) => {
  const response = await mainApiService('getAllServiceRequest', data);
  return response;
};

// Action to get Consumer details acc to the consumer id
export const getConsumerDetails = async (data) => {
  const response = await mainApiService('getConsumerDetails', data);
  return response;
};

// Action to gift coins
export const giftCoinsToConsumer = async (data) => {
  const response = await mainApiService('giftCoinsToConsumer', data);
  return response;
};

// Action to get Consumer details acc to the consumer id
export const getConsumerDetailsFinance = async (data) => {
  const response = await mainApiService('getConsumerDetailsFinance', data);
  return response;
};

export const getCoinTransactions = async (data) => {
  const response = await mainApiService('getCoinTransactions', data);
  return response;
}

export const getUpcomingVisits = async (data) => {
  const response = await mainApiService('getUpcomingVisits', data);
  return response;
}

export const getVisitRequests = async (data) => {
  const response = await mainApiService('getVisitRequests', data);
  return response;
}

export const allNotification = async (data) => {
  const response = await mainApiService('allNotification', data);
  return response;
};

export const refundRequestDetail = async (data) => {
  const response = await mainApiService('refundRequestDetail', data);
  return response;
};

export const refundRequestDetailComment = async (data) => {
  const response = await mainApiService('refundRequestDetailComment', data);
  if (response.data && response.data.status === 200) showSuccessToast(response.data.customMessage);
  else if (response.data && response.data.error) showErrorToast(response.data.error);
  return response;
};

// Action to  toggle status of realtor advisor
export const togglefinanceRefundStatus = async (data) => {
  const response = await mainApiService('togglefinanceRefundStatus', data);
  if (response.data && response.data.status === 200) showSuccessToast(response.data.customMessage);
  if (response.data && response.data.status === 400) showErrorToast(response.data.message);
  else if (response.data && response.data.error) showErrorToast(response.data.error);
  // else showErrorToast('Unexpected error. Please try again later');
  return response;
};
// -------------------------------------------------------------------------------------------------

// Action to get User Details By UserId
export const getUserDetailById = async (data) => {
  const response = await mainApiService('getUserDetailById', data);
  return response;
};

export const getPlanDetailsById = async (data) => {
  const response = await mainApiService('getPlanDetailsById', data);
  return response;
};

// Action to Get Society By City
export const getSocietyByCity = async (data) => {
  const response = await mainApiService('getSocietyByCity', data);
  if (response) {
    if (response.data && response.status === 200) {
      if (response.data.resourceData) {
        return response.data.resourceData;
      } else {
        return [];
      }
    } else {
      return [];
    }
  }
};

/** ----------------------Builder Property---------------------------------------------------- */
export const addBuilderProject = async (data) => {
  const response = await mainApiService('addBuilderProject', data);
  if (response.data.status) {
    if (response.data && response.data.status === 200) {
      showSuccessToast('Builder Project added successfully');
    } else if (response.data && response.data.status === 409) showErrorToast('User already exist');
    else showErrorToast(response.data.message);
  }
  return response;
};

// Action to get all Builder Propertiess..
export const getAllBuilderProjects = (data) => async (dispatch) => {
  dispatch({ type: Actions.BUILDERPROPERTY_LOADING, data: {} });
  const response = await mainApiService('getAllBuilderProjects', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.BUILDERPROPERTY_SUCCESS, data: response.data.resourceData });
    } else dispatch({ type: Actions.BUILDERPROPERTY_ERROR, data: response.data });
  }
};

/* -------------------------------Execution Module APis------------------------------*/

// Action to Get Execution Leades Counts
export const getExecutionDashboardCount = () => async (dispatch) => {
  const response = await mainApiService('getExecutionDashboardCount', {});
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({
        type: Actions.EXECUTION_STATS_COUNT_SUCCESS,
        data: response.data.resourceData,
      });
    } else dispatch({ type: Actions.EXECUTION_STATS_COUNT_ERROR, data: response.data });
  }
};


/*-----------------------------------Adding New Cities-----------------------------------*/
export const addNewCity = async (formData) => {
  const response = await mainApiService('addNewCity', formData);
  if (response.data.status) {
    if (response.data && response.data.status === 200) {
      showSuccessToast('New Cities added successfully');
    } else if (response.data && response.data.status === 409) showErrorToast('User already exist');
    else showErrorToast(response.data.message);
  }
  return response;
};

// Action to Get Excution Dashboard Cities data
export const getExcutionDashboardCity = () => async (dispatch) => {
  const responseInstallation = await mainApiService('getInstallationRequestCity', {});
  const responsePublishProperty = await mainApiService('getAllPublishedPropertyCity', {});
  const responseTeam = await mainApiService('getAllExecutiveTeamsCity', {});
  const responseServiceReq = await mainApiService('getServiceRequestCity', {});

  if (responseInstallation) {
    if (
      responseInstallation.data &&
         responseInstallation.status === 200 &&
         responseInstallation.data.resourceData
    ) {
      dispatch({
        type: Actions.EXECUTION_INSTALLATION_CITY_SUCCESS,
        data: responseInstallation.data.resourceData,
      });
    } else dispatch({ type: Actions.EXECUTION_INSTALLATION_CITY_SUCCESS, data: [] });
  }

  if (responsePublishProperty) {
    if (
      responsePublishProperty.data &&
         responsePublishProperty.status === 200 &&
         responsePublishProperty.data.resourceData
    ) {
      dispatch({
        type: Actions.EXCUTIVE_PUBLISHED_PROPERTY_CITY_SUCCESS,
        data: responsePublishProperty.data.resourceData,
      });
    } else dispatch({ type: Actions.EXCUTIVE_PUBLISHED_PROPERTY_CITY_SUCCESS, data: [] });
  }

  if (responseTeam) {
    if (responseTeam.data && responseTeam.status === 200 && responseTeam.data.resourceData) {
      dispatch({
        type: Actions.EXECUTION_TEAM_CITY_SUCCESS,
        data: responseTeam.data.resourceData,
      });
    } else dispatch({ type: Actions.EXECUTION_TEAM_CITY_SUCCESS, data: [] });
  }

  if (responseServiceReq) {
    if (
      responseServiceReq.data &&
         responseServiceReq.status === 200 &&
         responseServiceReq.data.resourceData
    ) {
      dispatch({
        type: Actions.EXCUTIVE_SERVICE_REQ_CITY_SUCCESS,
        data: responseServiceReq.data.resourceData,
      });
    } else dispatch({ type: Actions.EXCUTIVE_SERVICE_REQ_CITY_SUCCESS, data: [] });
  }
};

// Action to get User All Execution Completed Tasks  By UserId
export const getAllExecutionCompletedTask = async (data) => {
  const response = await mainApiService('getAllExecutionCompletedTask', data);
  return response;
};

// Action to get User All Execution Tasks  By UserId
export const getAllExecutionTask = async (data) => {
  const response = await mainApiService('getAllExecutionTask', data);
  return response;
};

// Action to get User All Execution Tasks  By UserId
export const getExecutionTaskDetail = async (data) => {
  const response = await mainApiService('getTaskDetail', data);
  return response;
};

// Action to get Execution Installation Calender Data
export const getExecutiveCalendar = async (data) => {
  const response = await mainApiService('getExecutiveCalendar', data);
  if (response.data.status !== 200) {
    showToastErrMessage(response);
  }
  return response;
};

// Action to Change/Update installation request assignee.
export const changeInstallationAssignee = async (data) => {
  const response = await mainApiService('changeAssignee', data);
  if (response.data && response.data.status === 200) {
    showSuccessToast(response.data.customMessage);
    // notify(response.data.customMessage, 'success', 1000);
  }
  // showSuccessToast(response.data.customMessage)
  else if (response.data && response.data.error) 
  // notify(response.data.message, 'error', 1000);
  showErrorToast(response.data.message)
  // else notify('Unexpected error. Please try again later', 'error', 1000);
  return response;
};

export const republish = async (data) => {
  console.log("republish", data);
  const response = await mainApiService('republish', data);
  if (response.data && response.data.status === 200) {
    showSuccessToast(response.data.customMessage);
  }
  else if (response.data && response.data.error) 
  showErrorToast(response.data.message)
  return response;
};


// Action to Change/Update installation request assignee.
export const closeSalesLead = async (data) => {
  const response = await mainApiService('closeSalesLead', data);
  if (response.data && response.data.status === 200) {
    showSuccessToast(response.data.customMessage);
  }
  // showSuccessToast(response.data.customMessage)
  else if (response.data && response.data.error) showErrorToast(response.data.message);
  // showErrorToast(response.data.error)
  else showErrorToast('Unexpected error. Please try again later');
  return response;
};

// Action to Change/Update installation request assignee.
export const changeDepartmentAssignee = async (data) => {
  const response = await mainApiService('changeDepartmentAssignee', data);
  if (response.data && response.data.status === 200) {
    notify(response.data.customMessage, 'success', 1000);
  }
  // showSuccessToast(response.data.customMessage)
  else if (response.data && response.data.error) notify(response.data.message, 'error', 1000);
  // showErrorToast(response.data.error)
  else notify('Unexpected error. Please try again later', 'error', 1000);
  return response;
};

// Action to get Execution Installation Calender Available Slots.
export const getIntallationRequestSlots = async (data) => {
  const response = await mainApiService('getIntallationRequestSlots', data);
  if (response) {
    if (response.data) {
      if (response.data.status === 200) {
        return response.data.resourceData.timeSlots;
      }
    }
  } else return [];
};

// Action to get Execution Installation Calender ExecutiveList Slots.
export const getExecutiveList = async (data) => {
  const response = await mainApiService('getExecutiveList', data);
  if (response) {
    if (response.data) {
      if (response.data.status === 200 && response.data.resourceData.length) {
        return response.data.resourceData;
      }
    }
  } else return [];
};

// Action to get Execution Installation Calender ExecutiveList Slots.
export const getInstallationExecutiveList = async (data) => {
  const response = await mainApiService('getInstallationExecutiveList', data);
  if (response) {
    if (response.data) {
      if (response.data.status === 200 && response.data.resourceData.length) {
        return response.data.resourceData;
      }
    }
  } else return [];
};

/* -------------------------------HelpDesk Module APis------------------------------*/

// Actions for HelpDesk Dashboard Reqests

export const getHelpDeskDashboardCount = () => async (dispatch) => {
  const response = await mainApiService('getHelpDeskDashboardCount', {});
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      if (response.data.resourceData) {
        dispatch({
          type: Actions.HELPDESK_STATS_COUNT_SUCCESS,
          data: response.data.resourceData,
        });
      }
    } else dispatch({ type: Actions.HELPDESK_STATS_COUNT_ERROR });
  }
};

export const getHelpDeskTeam = (data) => async (dispatch) => {
  try {
    dispatch({ type: Actions.HELPDESK_TEAMS_LOADING, data: [] });
    const response = await mainApiService('getHelpDeskTeam', data);
    if (response) {
      if (response.data && response.status === 200 && response.data.resourceData) {
        if (response.data.resourceData) {
          dispatch({ type: Actions.HELPDESK_TEAMS_SUCCESS, data: response.data.resourceData });
          return;
        }
      }
    }
    dispatch({ type: Actions.HELPDESK_TEAMS_ERROR });
  } catch (e) {
    dispatch({ type: Actions.HELPDESK_TEAMS_ERROR });
  }
};

export const getHelpDeskPropertyLeads = (data) => async (dispatch) => {
  try {
    dispatch({ type: Actions.HELPDESK_PROPERTY_LEADS_LOADING, data: [] });
    const response = await mainApiService('getHelpDeskPropertyLeads', data);
    if (response) {
      if (response.data && response.status === 200 && response.data.resourceData) {
        if (response.data.resourceData) {
          dispatch({
            type: Actions.HELPDESK_PROPERTY_LEADS_SUCCESS,
            data: response.data.resourceData,
          });
          return;
        }
      }
    }
    dispatch({ type: Actions.HELPDESK_PROPERTY_LEADS_ERROR });
  } catch (e) {
    dispatch({ type: Actions.HELPDESK_PROPERTY_LEADS_ERROR });
  }
};

export const getHelpDeskServiceRequest = (data) => async (dispatch) => {
  try {
    dispatch({ type: Actions.HELPDESK_SERVICE_REQ_LOADING, data: [] });
    const response = await mainApiService('getHelpDeskServiceRequest', data);
    if (response) {
      if (response.data && response.status === 200 && response.data.resourceData) {
        if (response.data.resourceData) {
          dispatch({
            type: Actions.HELPDESK_SERVICE_REQ_SUCCESS,
            data: response.data.resourceData,
          });
          return;
        }
      }
    }
    dispatch({ type: Actions.HELPDESK_SERVICE_REQ_ERROR });
  } catch (e) {
    dispatch({ type: Actions.HELPDESK_SERVICE_REQ_ERROR });
  }
};

// Action to Get HelpDesk Leads Details
export const getHelpdeskLeadById = async (data) => {
  const response = await mainApiService('getHelpdeskLeadById', data);
  return response;
};

// Action to Createticket
export const createTicket = async (data) => {
  const response = await mainApiService('createTicket', data);
  if (response.data.status) {
    if (response.data && response.data.status === 200) {
      showSuccessToast('Ticket created successfully');
    } else if (response.data && response.data.status === 409) {
      showErrorToast('Ticket already exist');
    } else showErrorToast(response.data.message);
  }
  return response;
};

// Action to Get HelpDesk Dashboard Cities data
export const getHelpDeskDashboardCity = () => async (dispatch) => {
  const responsePropertyLeads = await mainApiService('getHelpDeskPropertyLeadsCity', {});
  const responseTeam = await mainApiService('getHelpDeskTeamCity', {});
  const responseServiceReq = await mainApiService('getHelpDeskServiceRequestCity', {});

  if (responsePropertyLeads) {
    if (
      responsePropertyLeads.data &&
         responsePropertyLeads.status === 200 &&
         responsePropertyLeads.data.resourceData
    ) {
      dispatch({
        type: Actions.HELPDESK_LEADS_CITY_SUCCESS,
        data: responsePropertyLeads.data.resourceData,
      });
    } else dispatch({ type: Actions.HELPDESK_LEADS_CITY_SUCCESS, data: [] });
  }

  if (responseTeam) {
    if (responseTeam.data && responseTeam.status === 200 && responseTeam.data.resourceData) {
      dispatch({
        type: Actions.HELPDESK_TEAM_CITY_SUCCESS,
        data: responseTeam.data.resourceData,
      });
    } else dispatch({ type: Actions.HELPDESK_TEAM_CITY_SUCCESS, data: [] });
  }

  if (responseServiceReq) {
    if (
      responseServiceReq.data &&
         responseServiceReq.status === 200 &&
         responseServiceReq.data.resourceData
    ) {
      dispatch({
        type: Actions.HELPDESK_SERVICE_REQ_CITY_SUCCESS,
        data: responseServiceReq.data.resourceData,
      });
    } else dispatch({ type: Actions.HELPDESK_SERVICE_REQ_CITY_SUCCESS, data: [] });
  }
};

export const getHelpdeskLeadsByUser = async (data) => {
  const response = await mainApiService('getHelpdeskLeadsByUser', data);
  return response;
};

export const getHelpDeskAssignedServiceRequest = async (data) => {
  const response = await mainApiService('getHelpDeskAssignedServiceRequest', data);
  return response;
};

export const reOpenAndCloseRequest = async (data) => {
  console.log(data,"hhhhhhhhhhhhhhhhhhhdata");
  const response = await mainApiService('reOpenAndCloseRequest', data);
  showToastMessage(response);
  return response;
};

export const closeRequestInstallation = async (data) => {
  console.log(data,"iiiiiiiiiiiiiiiiiiiidata");
  const response = await mainApiService('closeRequestInstallation', data);
  showToastMessage(response);
  return response;
};

export const getPropertyList = async (data) => {
  const response = await mainApiService('getPropertyList', data);
  return response;
};

export const getServiceRequestDetailById = async (data) => {
  const response = await mainApiService('getServiceRequestDetailById', data);
  return response;
};

// Action to Add comments
export const addComments = async (data) => {
  const response = await mainApiService('addComments', data);
  if (response.data && response.data.status === 200) showSuccessToast(response.data.customMessage);
  else if (response.data && response.data.error) showErrorToast(response.data.error);
  else showErrorToast('Unexpected error. Please try again later');
  return response;
};

// Action to Add service request comments
export const addServiceRequestComments = async (data) => {
  const response = await mainApiService('addServiceRequestComments', data);
  if (response.data && response.data.status === 200) showSuccessToast(response.data.customMessage);
  else if (response.data && response.data.error) showErrorToast(response.data.error);
  else showErrorToast('Unexpected error. Please try again later');
  return response;
};


export const getTicketNameList = async (data) => {
  const response = await mainApiService('getTicketNameList', data);
  return response;
};

export const getTeamList = async (data) => {
  const response = await mainApiService('getTeamList', data);
  return response;
};

// To Get Agora Token.
export const generateAgoraToken = async (data) => {
  const response = await mainApiService('generateAgoraToken', data);
  return response;
};

//FINANCE DASHBOARD MODULE
// export const getConsumerTransactions = async (data) => {
//   const response = await mainApiService('getConsumerTransactions', data);
//   return response;
// };

export const financeInvoice = async (data) => {
  const response = await mainApiService('financeInvoice', data);
  // if (response.data && response.data.status === 200) showSuccessToast(response.data.customMessage);
  // else if (response.data && response.data.error) showErrorToast(response.data.error);
  // else showErrorToast('Unexpected error. Please try again later');
  return response;
};

export const emailInvoice = async (data) => {
  const response = await mainApiService('emailInvoice', data);
  if (response.data && response.data.status === 200) showSuccessToast(response.data.customMessage);
  else if (response.data && response.data.error) showErrorToast(response.data.error);
  // else showErrorToast('Unexpected error. Please try again later');
  return response;
};

// Action to get all properties..
export const getConsumerTransactionsData = (data) => async (dispatch) => {
  dispatch({ type: Actions.CONSUMER_TRANSACTIONS_DATATABLE_LOADING, data: {} });
  const response = await mainApiService('getConsumerTransactions', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.CONSUMER_TRANSACTIONS_DATATABLE_SUCCESS, data: response.data.resourceData });
    } else dispatch({ type: Actions.CONSUMER_TRANSACTIONS_DATATABLE_ERROR, data: response.data });
  }
};

//Action to get Refund Request List
export const getRefundRequestListData = (data) => async (dispatch) => {
  dispatch({ type: Actions.REFUND_REQUESTS_DATATABLE_LOADING, data: {} });
  const response = await mainApiService('getRefundRequestList', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.REFUND_REQUESTS_DATATABLE_SUCCESS, data: response.data.resourceData });
    } else dispatch({ type: Actions.REFUND_REQUESTS_DATATABLE_ERROR, data: response.data });
  }
};


// Action to get Payable Partner Commisions List Data
export const getPayablePartnerCommisionsListData = (data) => async (dispatch) => {
  dispatch({ type: Actions.PAYABLE_PARTNER_COMMISIONS_DATATABLE_LOADING, data: {} });
  const response = await mainApiService('getPayablePartnerCommisionsList', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.PAYABLE_PARTNER_COMMISIONS_DATATABLE_SUCCESS, data: response.data.resourceData });
    } else dispatch({ type: Actions.PAYABLE_PARTNER_COMMISIONS_DATATABLE_ERROR, data: response.data });
  }
};

//getAllFinanceTeams
// Action to get All Finance Teams
export const getAllFinanceTeamsData = (data) => async (dispatch) => {
  dispatch({ type: Actions.FINANCE_TEAM_DATATABLE_LOADING, data: {} });
  const response = await mainApiService('getAllFinanceTeams', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.FINANCE_TEAM_DATATABLE_SUCCESS, data: response.data.resourceData });
    } else dispatch({ type: Actions.FINANCE_TEAM_DATATABLE_ERROR, data: response.data });
  }
};

// Action to Get society Leades Counts
export const getFinanceDashboardCount = () => async (dispatch) => {
  const response = await mainApiService('getFinanceCount', {});
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.FINANCE_COUNT_SUCCESS, data: response.data.resourceData });
    } else dispatch({ type: Actions.FINANCE_COUNT_ERROR, data: response.data });
  }
};

//Action to get All Finance Teams City
export const getAllFinanceTeamsCity = (data) => async (dispatch) => {
  const response = await mainApiService('getAllFinanceTeamsCity', data);
  if (response) {
    if (response.data && response.status === 200) {
      if (response.data.resourceData) {
        dispatch({ type: Actions.FINANCE_TEAM_CITY_SUCCESS, data: response.data.resourceData });
      }
    }
  }
};

//Action to get finance Refund Request Details
export const getRefundRequestDetails = (data) => async (dispatch) => {
  dispatch({ type: Actions.FINANCE_REFUND_REQUEST_DETAILS_LOADING, data: {} });
  const response = await mainApiService('getRefundRequestDetails', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.FINANCE_REFUND_REQUEST_DETAILS_SUCCESS, data: response.data.resourceData });
    } else dispatch({ type: Actions.FINANCE_REFUND_REQUEST_DETAILS_ERROR, data: response.data });
  }
};

//-------realtor managemnet api's----------

export const getAllRealtors = (data) => async (dispatch) => {
  dispatch({ type: Actions.REALTOR_MANAGEMENT_LOADING, data: {} });
  const response = await mainApiService('getAllRealtors', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.REALTOR_MANAGEMENT_SUCCESS, data: response.data.resourceData });
    } else dispatch({ type: Actions.REALTOR_MANAGEMENT_ERROR, data: response.data });
  }
};

// Action to  toggle status of realtor advisor
export const toggleRealtorAdvisorStatus = async (data) => {
  const response = await mainApiService('toggleRealtorStatus', data);
  if (response.data && response.data.status === 200) showSuccessToast(response.data.customMessage);
  if (response.data && response.data.status === 400) showErrorToast(response.data.message);
  else if (response.data && response.data.error) showErrorToast(response.data.error);
  // else showErrorToast('Unexpected error. Please try again later');
  return response;
};

// Action to Get society Leads Details
export const getRealtorDetails = async (data) => {
  const response = await mainApiService('getRealtorDetails', data);
  return response;
};

// Action to Get realtor property listing
export const getRealtorPropertyList = async (data) => {
  const response = await mainApiService('getRealtorPropertyList', data);
  return response;
};

//Action to get Realtor Home Details
export const getRealtorHomeDetails = async (data) => {
  const response = await mainApiService('getRealtorHomeDetails', data);
  return response;
};

//Action to get Realtor rating 
export const getRealtorRatingList = async (data) => {
  const response = await mainApiService('getRealtorRatingList', data);
  return response;
};

//TRANSACTION 
// Action to Get society Leades data
export const getAllTransactionTeams = (data) => async (dispatch) => {
  dispatch({ type: Actions.TRANSACTION_TEAMS_LOADING, data: [] });
  const response = await mainApiService('getAllTransactionTeams', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.TRANSACTION_TEAMS_SUCCESS, data: response.data.resourceData });
    } else dispatch({ type: Actions.TRANSACTION_TEAMS_ERROR, data: response.data });
  }
};

// Action to Get Execution Leades Counts
export const getTransactionDashboardCount = () => async (dispatch) => {
  const response = await mainApiService('getTransactionDashboardCount', {});
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({
        type: Actions.TRANSACTION_STATS_COUNT_SUCCESS,
        data: response.data.resourceData,
      });
    } else dispatch({ type: Actions.TRANSACTION_STATS_COUNT_ERROR, data: response.data });
  }
};


export const getAllTransactionMeetingRequest = (data) => async (dispatch) => {
  dispatch({ type: Actions.TRANSACTION_MEETING_REQUEST_LOADING, data: [] });
  const response = await mainApiService('getAllTransactionMeetingRequest', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.TRANSACTION_MEETING_REQUEST_SUCCESS, data: response.data.resourceData });
    } else dispatch({ type: Actions.TRANSACTION_MEETING_REQUEST_ERROR, data: response.data });
  }
};

//getAllTransactionLead
export const getAllTransactionLead = (data) => async (dispatch) => {
  dispatch({ type: Actions.TRANSACTION_LEAD_LOADING, data: [] });
  const response = await mainApiService('getAllTransactionLead', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.TRANSACTION_LEAD_SUCCESS, data: response.data.resourceData });
    } else dispatch({ type: Actions.TRANSACTION_LEAD_ERROR, data: response.data });
  }
};

// Action to get SalesTeam City
export const getAllTransactionTeamsCity = (data) => async (dispatch) => {
  const response = await mainApiService('getAllTransactionTeamsCity', data);
  if (response) {
    if (response.data && response.status === 200) {
      if (response.data.resourceData) {
        dispatch({ type: Actions.TRANSACTION_TEAM_CITY_SUCCESS, data: response.data.resourceData });
      }
    }
  }
};

export const getAllPendingDealApproval = (data) => async (dispatch) => {
  dispatch({ type: Actions.TRANSACTION_DEAL_LOADING, data: [] });
  const response = await mainApiService('getAllPendingDealApproval', data);
  if (response) {
    if (response.data && response.status === 200 && response.data.resourceData) {
      dispatch({ type: Actions.TRANSACTION_DEAL_SUCCESS, data: response.data.resourceData });
    } else dispatch({ type: Actions.TRANSACTION_DEAL_ERROR, data: response.data });
  }
};

export const getDealApprovalDetail = async (data) => {
  console.log(data,"api data");
  const response = await mainApiService('getDealApprovalDetail', data);
  return response;
};

//Action to get Transaction meeting Details By id
export const getTransactionMeetingDetailById = async (data) => {
  const response = await mainApiService('getTransactionMeetingDetailById', data);
  return response;
};

//Action to get Transaction lead Details By id
export const getTransactionLeadDetailById = async (data) => {
  const response = await mainApiService('getTransactionLeadDetailById', data);
  return response;
};

//getAllTransactionPreviousVisitRequest
export const getAllTransactionPreviousVisitRequest = async (data) => {
  const response = await mainApiService('getAllTransactionPreviousVisitRequest', data);
  return response;
};

//getAllTransactionPreviousVisitRequest
export const getTransactionViewVisitFeedback = async (data) => {
  const response = await mainApiService('getTransactionViewVisitFeedback', data);
  return response;
};


// Action to get Transaction Leads By UserId
export const getTransactionLeadsByUser = async (data) => {
  const response = await mainApiService('getTransactionLeadsByUser', data);
  if ( response.data.status !== 200 && response.data.status !== 404) showErrorToast('Unexpected error. Please try again later');
  return response;
};

export const getTransactionMeetingsByUserId = async (data) => {
  const response = await mainApiService('getTransactionMeetingsByUserId', data);
  if ( response.data.status !== 200 && response.data.status !== 404) showErrorToast('Unexpected error. Please try again later');
  return response;
};

export const getAllDealsByUserId = async (data) => {
  const response = await mainApiService('getAllDealsByUserId', data);
  if ( response.data.status !== 200 &&  response.data.status !== 404) showErrorToast('Unexpected error. Please try again later');
  return response;
};

export const reOpenTransactionLeadRequest = async (data) => {
  const response = await mainApiService('reOpenTransactionLeadRequest', data);
  if ( response.data.status === 200) showSuccessToast(response.data.customMessage);
  if ( response.data.status !== 200) showErrorToast(response.data.message);
  return response;
};

// export const getExecutivesWrtRoleLocation = async (data) => {
//   const response = await mainApiService('getExecutivesWrtRoleLocation', data);
//   if ( response.data.status !== 200 ) showErrorToast('Unexpected error. Please try again later');
//   return response;
// };

// Action to  Get All User Roles
export const getExecutivesWrtRoleLocation = (data) => async (dispatch) => {
  const response = await mainApiService('getExecutivesWrtRoleLocation', data);
  if (response) {
    if (response.data && response.status === 200) {
      if (response.data.resourceData) {
        dispatch({ type: Actions.ALL_EXECUTIVES, data: response.data.resourceData });
      } // return response.data.resourceData;
    }
  }
};

// Action to Change/Update installation request assignee.
// export const changeUserAssignee = async (data) => {
//   const response = await mainApiService('changeUserAssignee', data);
//   if (response.data && response.data.status === 200) {
//     // notify(response.data.customMessage, 'success', 1000);
//     showSuccessToast(response.data.customMessage)
//   }
  
//   else if (response.data && response.data.error) 
//   // notify(response.data.error, 'error', 1000);
//   showErrorToast(response.data.error)
//   else notify('Unexpected error. Please try again later', 'error', 1000);
//   return response;
// };

// Action to Change/Update installation request assignee.
export const changeUserAssignee = async (data) => {
  const response = await mainApiService('changeUserAssignee', data);
  if (response.data && response.data.status === 200) {
    showSuccessToast(response.data.customMessage);
    // notify(response.data.customMessage, 'success', 1000);
  }
  // showSuccessToast(response.data.customMessage)
  else if (response.data && response.data.error) 
  // notify(response.data.message, 'error', 1000);
  showErrorToast(response.data.message)
  // else notify('Unexpected error. Please try again later', 'error', 1000);
  return response;
};

// Action to get Transaction Leads By UserId
export const getSalesTransactionByUser = async (data) => {
  const response = await mainApiService('getSalesTransactionByUser', data);
  if ( response.data.status !== 200 && response.data.status !== 404) showErrorToast('Unexpected error. Please try again later');
  return response;
};

// Action to get Execution Installation Calender Available Slots.
// export const getAllTransactionMeetingRequest = async (data) => {
//   const response = await mainApiService('getAllTransactionMeetingRequest', data);
//   console.log('response', response);
//   if (response) {
//     if (response.data) {
//       if (response.data.status === 200) {
//         return response.data.resourceData;
//       }
//     }
//   } else return [];
// };

// export const getSocietyLeadsData = (data) => async (dispatch) => {
//   dispatch({ type: Actions.SALES_LEADS_DATATABLE_LOADING, data: {} });
//   const response = await mainApiService('getSocietyLeads', data);
//   if (response) {
//     if (response.data && response.status === 200 && response.data.resourceData) {
//       dispatch({
//         type: Actions.SALES_LEADS_DATATABLE_SUCCESS,
//         data: response.data.resourceData,
//       });
//     } else dispatch({ type: Actions.SALES_LEADS_DATATABLE_ERROR, data: response.data });
//   }
// };

//smartdoor- api's
// Action to  Get All User Roles
export const getCameraDevice = async (data) => {
  const response = await mainApiService('getCameraDevice', data);
  if ( response.data.status !== 200 && response.data.status !== 404) showErrorToast('Unexpected error. Please try again later');
  return response;
};

// Action to  Get contact sensor data
export const getContactSensor = async (data) => {
  const response = await mainApiService('getContactSensor', data);
  if ( response.data.status !== 200 && response.data.status !== 404) showErrorToast('Unexpected error. Please try again later');
  return response;
};

// Action to  Get contact sensor data
export const getContactSensorLogin = async (data) => {
  const response = await mainApiService('getContactSensorLogin', data);
  if ( response.data.status !== 200 && response.data.status !== 404) showErrorToast('Unexpected error. Please try again later');
  return response;
};

// Action to  Get contact sensor data
export const getContactSensorDeviceDetails = async (data) => {
  const response = await mainApiService('getContactSensorDeviceDetails', data);
  // if ( response.data.status !== 200 && response.data.status !== 404) showErrorToast('Unexpected error. Please try again later');
  return response;
};

// Action to  Get smartlock data
export const getSmartLockData = async (data) => {
  console.log(data,"iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
  const response = await mainApiService('getSmartLockData', data);
  if ( response.data.status !== 200 && response.data.status !== 404) showErrorToast('Unexpected error. Please try again later');
  return response;
};

// Actio  for closing the door
export const doorClosed = async (data) => {
  console.log("door close api data",data);
  const response = await mainApiService('doorClosed', data);
  if ( response.data.status !== 200 && response.data.status !== 404) showErrorToast('Unexpected error. Please try again later');
  return response;
};


//Action to get smartlock device interface acess token 
// export const getDeviceInterfaceAccessToken = async (data) => {
//   const response = await mainSmartlockApiService('getDeviceInterfaceAccessToken', data);
//   // if (response.data.status) {
//   //   if (response.data && response.data.status === 200) {
//   //     showSuccessToast('data retrieved successfully');
//   //   } else if (response.data && response.data.status === 409) showErrorToast(response.data.message);
//   //   else showErrorToast(response.data.message);
//   // }
//   return response;
// };


//Check if smartlock is installed in city
export const getInstallationCity = async () => {
  const response = await mainApiService('getInstallationCity');
  return response;
}

//Get all properties by userId
export const getPropertyByUserId = async(data) => {
  const response = await mainApiService('getPropertyByUserId', data);
  return response;
}

//Action for adding  new property
export const addNewPost  = (data) => async (dispatch) => {
  dispatch({ type: Actions.ADD_NEW_POST_LOADING, data: {} });
  const response = await mainApiService('addNewPost', data);
  if(response != null) {
    if(response?.status === 200) {
      console.log(response)
      if(data.smartdoorPropertyId === undefined || data.smartdoorPropertyId === null) {
        data.smartdoorPropertyId = response?.data?.resourceData?.propertyId;
      }
      showSuccessToast("Data updated successfully")
      return (dispatch({ type: Actions.ADD_NEW_POST_SUCCESS, data: data }));
    }
    if ( response?.status !== 200 && response?.status !== 404) {
      showErrorToast('Unexpected error. Please try again later');
    }
  }
};

export const addNewPost2  = (data) => async (dispatch) => {
  console.log("test ")
  dispatch({ type: Actions.ADD_NEW_POST_ADDRESS_LOADING, data: {} });
  const response = await mainApiService('addNewPost2', data);
  console.log(response)
  if(response != null) {
    if(response?.status === 200) {
      showSuccessToast("Address updated successfully")
      return (dispatch({ type: Actions.ADD_NEW_POST_ADDRESS_SUCCESS, data: data }));
    }
    if ( response?.status !== 200 && response?.status !== 404) {
      showErrorToast('Unexpected error. Please try again later');
    }
  }
};

export const addNewPost4 = (data) => async(dispatch) => {
  dispatch({type: Actions.ADD_NEW_POST_INFO_LOADING, data : {}})
  const response = await mainApiService('addNewPost4', data);
  if(response !== null) {
    if(response?.status === 200) {
      showSuccessToast("Information updated successfully")
      return (dispatch({ type: Actions.ADD_NEW_POST_INFO_SUCCESS, data: data }));
    }
    if ( response?.status !== 200 && response?.status !== 404) {
      showErrorToast('Unexpected error. Please try again later');
    }
  }
}

export const deletePropertyById = async(data) => {
  const response = await mainApiService('deletePropertyById',data)
  return response
}

export const restorePropertyById = async(data) => {
  const response = await mainApiService('restorePropertyById',data)
  return response
}


export const getStaticMobNumbers = async () => {
  const response  = await mainApiService('getStaticMobNums');
  return response
}
export const setStaticMobNumbers = async (data) => {
  const response  = await mainApiService('setStaticMobNums',data);
  return response
}

export const setCityServiceStatus = async (data) => {
  const response  = await mainApiService('setServiceStatus',data);
  return response
}

export const getFeaturedVideoList = (data) => async (dispatch) => {
  dispatch({type: Actions.SAVE_FEATURED_VIDEOS_LOADING, data : {}})
  const response = await mainApiService('getFeaturedVideosList', data);
  if(response.status === 200) {
    let obj = JSON.parse(response.data.resourceData);
    let videoList = obj.values.toString().split(',')
    return(dispatch({ type: Actions.SAVE_FEATURED_VIDEOS_SUCCESS, data: videoList }))
  }
  if ( response?.status !== 200) {
    showErrorToast('Unexpected error. Please try again later');
    return(dispatch({ type: Actions.SAVE_FEATURED_VIDEOS_ERROR, data: response }))
  }
};

export const addFeaturedVideoList = (data) => async (dispatch) => {
  dispatch({type: Actions.SAVE_FEATURED_VIDEOS_LOADING, data : {}})
  const response = await mainApiService('setFeaturedVideosList', data);
  if(response.status === 200) {
    let obj = JSON.parse(data.value);
    let videoList = obj?.values?.toString()?.split(',')
    showSuccessToast("Videos saved successfully...")
    return(dispatch({ type: Actions.SAVE_FEATURED_VIDEOS_SUCCESS, data: videoList }))
  }
  if ( response?.status !== 200) {
    showErrorToast('Unexpected error. Please try again later');
    return(dispatch({ type: Actions.SAVE_FEATURED_VIDEOS_ERROR, data: data }))
  }
};

export const getSystemVariables = async (data) => {
  const response = await mainApiService('getSystemVariables', data);
  if(response.status === 200) {
    return response;
  }
}

export const addEditAgency = async (data) => {
  const response = await mainApiService('addEditAgency', data);
  if(response.status === 200) {
    return response;
  }
}

export const getAllAgencies = (data) => async(dispatch) => {
  dispatch({type: Actions.AGENCY_LIST_LOADING, data: []});
  const response = await mainApiService('getAllAgencies', data);
  if(response.status === 200) {
    console.log(response)
    if(data.agencyId === 0) {
      return(dispatch({ type: Actions.AGENCY_LIST_SUCCESS, data: response.data.resourceData }))
    } else {return response}
  }
  if ( response?.status !== 200) {
    showErrorToast('Unexpected error. Please try again later');
    return(dispatch({ type: Actions.AGENCY_LIST_ERROR, data: response }))
  }
}

export const getAgencyById = async (data) => {
  const response = await mainApiService('getAllAgencies', data);
  if(response.status === 200) {
    console.log(response)
    return response;
  }
  if ( response?.status !== 200) {
    showErrorToast('Unexpected error. Please try again later');
  }
}

export const getAllAgencyExecutives = (data) => async(dispatch) => {
  dispatch({type: Actions.AGENCY_EXECUTIVE_LIST_LOADING, data: []});
  const response = await mainApiService('getAllAgencyExecutives', data);
  if(response.status === 200) {
    console.log(response)
    return(dispatch({ type: Actions.AGENCY_EXECUTIVE_LIST_SUCCESS, data: {executives: response.data.resourceData, records: response.data.records, currentPage: data.pageNo, rowsPerPage: data.pageSize, searchStr: data.searchStr} }))
  }
  if ( response?.status !== 200) {
    showErrorToast('Unexpected error. Please try again later');
    return(dispatch({ type: Actions.AGENCY_EXECUTIVE_LIST_ERROR, data: response }))
  }
}

export const getAgencyExecutiveById = async (data) => {
  const response = await mainApiService('getAllAgencyExecutives', data);
  if(response.status === 200) {
    console.log(response)
    return response
  }
  if ( response?.status !== 200) {
    showErrorToast('Unexpected error. Please try again later');
  }
}

export const addEditExecutive = async (data) => {
  const response = await mainApiService('addEditExecutive', data);
  if(response.status === 200) {
    return response;
  }
}

export const getAgencyCustomers = (data) => async (dispatch) => {
  dispatch({type: Actions.AGENCY_CUSTOMER_LIST_LOADING, data: []});
  const response = await mainApiService('getAgencyCustomers', data);
  if(response.status === 200) {
    console.log(response)
    return(dispatch({ type: Actions.AGENCY_CUSTOMER_LIST_SUCCESS, data: {customerData: response.data.resourceData, records: response.data.records, currentPage: data.pageNo, rowsPerPage: data.pageSize, fromDate: data.fromDate, toDate: data.toDate, searchStr: data.searchStr, kycStatus: data.kycStatus} }))
  }
  if ( response?.status !== 200) {
    showErrorToast('Unexpected error. Please try again later');
    return(dispatch({ type: Actions.AGENCY_CUSTOMER_LIST_ERROR, data: response }))
  }
}

export const getAgencyProperties = (data) => async (dispatch) => {
  dispatch({type: Actions.AGENCY_PROPERTY_LIST_LOADING, data: []});
  const response = await mainApiService('getAgencyProperty', data);
  if(response.status === 200) {
    console.log(response)
    return(dispatch({ type: Actions.AGENCY_PROPERTY_LIST_SUCCESS, data: {propertyData: response.data.resourceData, records: response.data.records, currentPage: data.pageNo, rowsPerPage: data.pageSize, fromDate: data.fromDate, toDate: data.toDate, searchStr: data.searchStr, propertyStatus: data.propertyStatus, propertyType: data.propertyType} }))
  }
  if ( response?.status !== 200) {
    showErrorToast('Unexpected error. Please try again later');
    return(dispatch({ type: Actions.AGENCY_PROPERTY_LIST_ERROR, data: response }))
  }
}

export const transferCustomers = async (data) => {
  const response = await mainApiService('transferAgencyCustomers', data);
  return response;
} 

export const awardCoupons = async (data) => {
  const response = await mainApiService('awardCoupons', data);
  return response;
} 

export const checkExistingCustomers = async (data) => {
  const response = await mainApiService('checkExistingCustomer', data);
  return response;
}

export const addBasicDetails = async (data) => {
  const response = await mainApiService('addBasicDetails', data);
  return response;
}

export const getChatGptDescription = async (data) => {
  const response = await mainApiService('getChatGptDescription', data);
  return response;
}

export const revokeToken = async (data) => {
  const response = await mainApiService('logoutUser', {});
  if(response.status === 200) {
    clearLocalStorage();
  }
  return response;
}

export const editCameraData = async (data) => {
  const response = await mainApiService('editCameraData', data);
  return response;
}

export const getCameraTypes = async (data) => {
  const response = await mainApiService('getCameraTypes', data);
  return response;
}

export const setCallBackUrl = async (data) => {
  const response = await mainApiService('setCallbackUrl', data);
  return response;
}