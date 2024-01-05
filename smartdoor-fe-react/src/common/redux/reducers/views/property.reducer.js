/** @format */

import * as Actions from '../../types';
import produce from 'immer';

// Dispatch Function to Handle Sales Leads DataTable Data.
export const allPropertyData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.PROPERTY_MODULE_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.PROPERTY_MODULE_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.PROPERTY_MODULE_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

export const deletedPropertyData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.DELETED_PROPERTY_DATA_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.DELETED_PROPERTY_DATA_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.DELETED_PROPERTY_DATA_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

const PROPERTY_ANALYTICS_STATE = {
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

// Reducer Function to Handle Property Analytics Data.
export const propertyAnalyticsData = (state = PROPERTY_ANALYTICS_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.PROPERTY_ANALYTICS_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.PROPERTY_ANALYTICS_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.PROPERTY_ANALYTICS_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

// Function to set the Property City list.
export const getPropertyCityData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.PROPERTY_CITY_LIST_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.PROPERTY_CITY_LIST_ERROR:
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

// Dispatch Function to Handle Sales Leads DataTable Data.
export const getAllFiltersData = (state = { data: {}, isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.PROPERTY_FILTER_LIST_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      default:
        return state;
    }
  });
};
