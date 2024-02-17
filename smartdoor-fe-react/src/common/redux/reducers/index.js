/** @format */

import { combineReducers } from 'redux';

import {login , otp} from './login.reducer';

import {
  allSocietyData,
  societyAnalyticsData,
  societyDealsData,
  societyPropertyLeadsData,
  societyPropertyListedData,
  getAllSocietyCityData,
} from './views/societymodules.reducer';
import {
  salesLeadsDataTable,
  salesTeamData,
  salesLeadsCount,
  getSocietyLeadsCityData,
  getSalesTeamCityData,
} from './views/salesview.reducer';
import {
  consumerTransactionsDataTable,
  refundRequestsDataTable,
  payablePartnerCommisionDataTable,
  financeTeamDataTable,
  financeCount,
  getAllFinanceTeamsCityData,
  financeRefundRequestDetails,
  getBuybackRequestsData
} from './views/finance.reducer';
import {
  allPropertyData,
  deletedPropertyData,
  propertyAnalyticsData,
  getPropertyCityData,
  getAllFiltersData,
} from './views/property.reducer';
import {
  dashboardTitle,
  allAdminRoles,
  allCities,
  allLocationsByCity,
  userAuthData,
  generalCityDepData,
  allExecutives
} from './dashboard.reducer';
import { getAllBuilderProjectsData } from './views/builderProperty.reducer';
import { getAllConsumerUsersData } from './views/consumerMangement.reducer';
import { getAllRealtorsData, allRealtorCities, allRealtorLocationsByCity } from './views/realtorManagement.reducer';
import { allUsersData } from './views/usermanagement.reducer';
import { allPlanData } from './views/ManagerPlan.reducer';
import { allNonSDProperties } from './NonSDProperties.reducer';
import {
  excutiveTeamsData,
  publishedProperyData,
  serviceRequestData,
  installationReqData,
  executionDashboardCount,
  excutiveDashboardCity,
  allExecutiveLocationsByCity
} from './views/executive.reducer';

import {
  helpdeskDashboardCount,
  helpdeskTeams,
  helpdeskPropertyLeads,
  helpdeskServiceReq,
  helpdeskDashboardCity,
} from './views/helpdesk.reducer';
import {
  transactionTeamsData,
  transactionDashboardCount,
  transactionMeetingRequestData ,
  transactionLeadsData,
  transactionTeamsCityData,
  allTransactionCities,
  allTransactionLocationsByCity,
  dealApprovalData
} from './views/transaction.reducer';
import { allPlanDataBroker } from './views/ManageBroker.reducer';
import { addNewPostReducer } from './views/addNewPost.reducer';
import { addNewPost2Reducer } from './views/addNewPost2.reducer';

import { USER_LOGOUT } from '../types';

const appReducer = combineReducers({
  dashboardTitle,
  salesLeadsDataTable,
  login,
  otp,
  salesTeamData,
  salesLeadsCount,
  allUsersData,
  allPlanData,
  allNonSDProperties,
  allSocietyData,
  allAdminRoles,
  allCities,
  allLocationsByCity,
  userAuthData,
  excutiveTeamsData,
  publishedProperyData,
  serviceRequestData,
  installationReqData,
  societyAnalyticsData,
  societyDealsData,
  societyPropertyLeadsData,
  societyPropertyListedData,
  generalCityDepData,
  allPropertyData,
  deletedPropertyData,
  excutiveDashboardCity,
  propertyAnalyticsData,
  executionDashboardCount,
  getPropertyCityData,
  getSocietyLeadsCityData,
  getSalesTeamCityData,
  getAllSocietyCityData,
  getAllConsumerUsersData,
  getAllFiltersData,
  getAllBuilderProjectsData,
  helpdeskDashboardCount,
  helpdeskTeams,
  helpdeskPropertyLeads,
  helpdeskServiceReq,
  helpdeskDashboardCity,
  consumerTransactionsDataTable,
  refundRequestsDataTable, 
  payablePartnerCommisionDataTable,
  financeTeamDataTable,
  financeCount,
  getAllFinanceTeamsCityData,
  financeRefundRequestDetails,
  getAllRealtorsData,
  allExecutiveLocationsByCity,
  transactionTeamsData,
  transactionDashboardCount,
  transactionMeetingRequestData,
  transactionLeadsData,
  transactionTeamsCityData,
  allTransactionCities,
  allTransactionLocationsByCity,
  dealApprovalData,
  allExecutives,
  allRealtorCities, 
  allRealtorLocationsByCity,
  getBuybackRequestsData,
  addNewPostReducer,
  addNewPost2Reducer,
  allPlanDataBroker,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
