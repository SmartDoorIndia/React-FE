/** @format */

import * as Actions from '../../types';
import produce from 'immer';

// Dispatch Function to Handle Sales Leads DataTable Data.
export const allSocietyData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.SOCIETY_MODULE_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.SOCIETY_MODULE_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.SOCIETY_MODULE_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

const SOCIETY_ANALYTICS_STATE = {
  data: {
    dealCancelled: 0,
    dealOnHold: 0,
    favouriteCount: 0,
    latitude: 0,
    longitude: 0,
    meetingDone: 0,
    registerdOn: '',
    upcomingVisits: 0,
    userVisited: 0,
  },
  isLoading: false,
};

// Reducer Function to Handle Society Analytics Data.
export const societyAnalyticsData = (state = SOCIETY_ANALYTICS_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.SOCIETY_ANALYTICS_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.SOCIETY_ANALYTICS_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        draft.data = [];
        return draft;

      case Actions.SOCIETY_ANALYTICS_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

// Dispatch Function to Handle Sales Leads Deals Data.
export const societyDealsData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.SOCIETY_PROPERTYDEALS_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.SOCIETY_PROPERTYDEALS_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        draft.data = [];
        return draft;

      case Actions.SOCIETY_PROPERTYDEALS_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

// Function to Handle Sales  Property Leads Data.
export const societyPropertyLeadsData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.SOCIETY_PROPERTY_LEADS_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.SOCIETY_PROPERTY_LEADS_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        draft.data = [];
        return draft;

      case Actions.SOCIETY_PROPERTY_LEADS_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

// Function to Handle Sales  Property Listed Data.
export const societyPropertyListedData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.SOCIETY_PROPERTY_LISTED_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.SOCIETY_PROPERTY_LISTED_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        draft.data = [];
        return draft;

      case Actions.SOCIETY_PROPERTY_LISTED_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

// Function to set the all Society City list.
export const getAllSocietyCityData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.SOCIETY_CITY_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.SOCIETY_CITY_ERROR:
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
