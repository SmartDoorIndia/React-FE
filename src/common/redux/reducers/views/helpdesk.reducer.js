/** @format */

import * as Actions from '../../types';
import produce from 'immer';

// Dispatch Functiona to Handle HelpDesk Data.

const HelpdeskStatsCountInitState = {
  data: {
    customerQueries: 0,
    customerQueriesThisWeek: 0,
    customerResolvedQueries: 0,
    customerResolvedQueriesThisWeek: 0,
    location: '-',
    teamMembersCount: 0,
  },
};

export const helpdeskDashboardCount = (state = HelpdeskStatsCountInitState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.HELPDESK_STATS_COUNT_SUCCESS:
        draft.data = action.data ?
               { ...action.data, location: action.data.location ? action.data.location : '-' } :
               state;
        return draft;

      case Actions.HELPDESK_STATS_COUNT_ERROR:
        return state;

      default:
        return state;
    }
  });
};

export const helpdeskTeams = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.HELPDESK_TEAMS_SUCCESS:
        draft.data = action.data || state;
        draft.isLoading = false;
        return draft;

      case Actions.HELPDESK_TEAMS_ERROR:
      draft.error = action.data;
      draft.isLoading = false;
      return draft;

      case Actions.HELPDESK_TEAMS_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

export const helpdeskPropertyLeads = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.HELPDESK_PROPERTY_LEADS_SUCCESS:
        draft.data = action.data || state;
        draft.isLoading = false;
        return draft;

      case Actions.HELPDESK_PROPERTY_LEADS_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;
      
      case Actions.HELPDESK_PROPERTY_LEADS_LOADING:
        draft.isLoading = true;
        return draft;
  

      default:
        return state;
    }
  });
};

export const helpdeskServiceReq = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.HELPDESK_SERVICE_REQ_SUCCESS:
        draft.data = action.data ?
               action.data.filter((value) => {
                 return value !== null;
               }) :
               state;
        draft.isLoading = false;
        return draft;

      case Actions.HELPDESK_SERVICE_REQ_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.HELPDESK_SERVICE_REQ_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

const HelpDeskDashboardCityState = {
  propertyLeadsCity: [],
  helpdeskTeamCity: [],
  serviceReqCity: [],
};

// Dispatch Function to Handle HelpDesk Dashboard DataTable filter City Data.
export const helpdeskDashboardCity = (state = HelpDeskDashboardCityState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.HELPDESK_LEADS_CITY_SUCCESS:
        draft.propertyLeadsCity = action.data;
        return draft;

      case Actions.HELPDESK_TEAM_CITY_SUCCESS:
        draft.helpdeskTeamCity = action.data;
        return draft;

      case Actions.HELPDESK_SERVICE_REQ_CITY_SUCCESS:
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
