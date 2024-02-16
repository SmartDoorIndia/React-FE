/** @format */

import * as Actions from '../types';
import produce from 'immer';

// Dispatch Function to change the dashboard title.
export const dashboardTitle = (
    state = { name: 'Dashboard', bradcrumb: false, path: '', headerButton: false, stepper:'' },
    action,
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.CURRENT_DASHBOARD_NAME:
        draft.name = action.data.name || 'Dashboard';
        draft.bradcrumb = action.data.bradcrumb || false;
        draft.headerButton = action.data.headerButton || false;
        draft.path = action.data.path || '#';
        draft.stepper = action.data.stepper !== undefined ? action.data.stepper : null;
        return draft;

      default:
        return state;
    }
  });
};

// Dispatch Function to set the admin roles list.
export const allAdminRoles = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.ADMIN_ALL_ROLES:
        draft.data = action.data;
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

export const allCitiesWithId = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.ALL_CITIES_ID:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      default:
        return state;
    }
  });
};

// Dispatch Function to set the admin roles list.
export const allLocationsByCity = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.ALL_LOCATION_BY_CITY:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      default:
        return state;
    }
  });
};

// Dispatch Function to set the admin roles list.
export const allExecutives = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.ALL_EXECUTIVES:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      default:
        return state;
    }
  });
};

// Dispatch Function to set the admin roles list.
export const userAuthData = (state = { authData: {} }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.ADMIN_AUTH_DATA:
        draft.authData = action.data;
        return draft;

      default:
        return state;
    }
  });
};

// Function to set the Dep and City list.
export const generalCityDepData = (state = { city: [], departments: [] }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.CITY_DEP_LIST_SUCCESS:
        draft.city = action.data.city;
        draft.departments = action.data.departments;
        return draft;

      default:
        return state;
    }
  });
};
