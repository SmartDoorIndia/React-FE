/** @format */

import * as Actions from '../../types';
import produce from 'immer';

// Dispatch Function to Handle Sales Leads DataTable Data.
export const salesLeadsDataTable = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.SALES_LEADS_DATATABLE_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.SALES_LEADS_DATATABLE_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.SALES_LEADS_DATATABLE_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

// Dispatch Function to Handle Sales Leads DataTable Data.
export const salesTeamData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.SALES_TEAM_DATATABLE_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.SALES_TEAM_DATATABLE_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.SALES_TEAM_DATATABLE_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

const SaledsLeadsCountInitState = {
  data: {
    currentWeekLeadsCountFromApp: 0,
    currentWeekleadsCountConverted: 0,
    currentWeekleadsCountFromManualEntry: 0,
    currentWeekleadsCountFromQRScan: 0,
    totalLeadsCountConverted: 0,
    totalLeadsCountFromApp: 0,
    totalLeadsCountFromManualEntry: 0,
    totalLeadsCountFromQRScan: 0,
  },
  isLoading: false,
};

// Dispatch Function to Handle Sales Leads Count Data.
export const salesLeadsCount = (state = SaledsLeadsCountInitState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.SALES_LEADS_COUNT_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.SALES_LEADS_COUNT_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      default:
        return state;
    }
  });
};

// Function to set the SocietyLeads City list.
export const getSocietyLeadsCityData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.SOCIETY_LEADS_CITY_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.SOCIETY_LEADS_CITY_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      default:
        return state;
    }
  });
};

// Dispatch Function to set the admin roles list.
export const allCities = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.ALL_CITIES:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      default:
        return state;
    }
  });
};

// Function to set the SocietyLeads City list.
export const getSalesTeamCityData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.SALES_TEAM_CITY_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.SALES_TEAM_CITY_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      default:
        return state;
    }
  });
};
