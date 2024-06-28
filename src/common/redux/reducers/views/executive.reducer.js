/** @format */

import * as Actions from '../../types';
import produce from 'immer';

// Dispatch Function to Handle Excutive Installation DataTable Data.
export const installationReqData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.EXCUTIVE_INSTALLATION_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.EXCUTIVE_INSTALLATION_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.EXCUTIVE_INSTALLATION_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

// Dispatch Function to Handle Excutive Service req DataTable Data.
export const serviceRequestData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.EXCUTIVE_SERVICE_REQ_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.EXCUTIVE_SERVICE_REQ_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.EXCUTIVE_SERVICE_REQ_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

// Dispatch Function to Handle Excutive Published Property  DataTable Data.
export const publishedProperyData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.EXCUTIVE_PUBLISHED_PROPERTY_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.EXCUTIVE_PUBLISHED_PROPERTY_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.EXCUTIVE_PUBLISHED_PROPERTY_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

// Dispatch Function to Handle Excutive Teams DataTable Data.
export const excutiveTeamsData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.EXCUTIVE_TEAMS_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.EXCUTIVE_TEAMS_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.EXCUTIVE_TEAMS_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

const ExecutionStatsCountInitState = {
  data: {
    currentWeekInstallationCompletedCount: 0,
    currentWeekInstallationRequestCount: 0,
    currentWeekOpenServiceRequestCount: 0,
    installationCompletedCount: 0,
    installationRequestCount: 0,
    openServiceRequestCount: 0,
    teamMembersCount: 0,
  },
  isLoading: false,
};

// Dispatch Function to Handle Excutive Stats CountData.
export const executionDashboardCount = (state = ExecutionStatsCountInitState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.EXECUTION_STATS_COUNT_SUCCESS:
        draft.data = action.data || state;
        draft.isLoading = false;
        return draft;

      case Actions.EXECUTION_STATS_COUNT_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      default:
        return state;
    }
  });
};

const ExcutionDashboardCityState = {
  installationReqCity: [],
  publishPropertyCity: [],
  excutionteamCity: [],
  serviceReqCity: [],
};

// Dispatch Function to Handle Excution Dashboard DataTable filter Data.
export const excutiveDashboardCity = (state = ExcutionDashboardCityState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.EXECUTION_INSTALLATION_CITY_SUCCESS:
        draft.installationReqCity = action.data;
        return draft;

      case Actions.EXCUTIVE_PUBLISHED_PROPERTY_CITY_SUCCESS:
        draft.publishPropertyCity = action.data;
        return draft;

      case Actions.EXECUTION_TEAM_CITY_SUCCESS:
        draft.excutionteamCity = action.data;
        return draft;

      case Actions.EXCUTIVE_SERVICE_REQ_CITY_SUCCESS:
        draft.serviceReqCity = action.data;
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

export const allExecutiveLocationsByCity = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.ALL_EXECUTIVE_LOCATION_BY_CITY:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      default:
        return state;
    }
  });
};
