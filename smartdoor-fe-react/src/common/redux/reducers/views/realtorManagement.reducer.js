/** @format */

import * as Actions from '../../types';
import produce from 'immer';

// Dispatch Function to Handle Sales Leads DataTable Data.
export const getAllRealtorsData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.REALTOR_MANAGEMENT_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.REALTOR_MANAGEMENT_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.REALTOR_MANAGEMENT_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

// Dispatch Function to set the admin roles list.
export const allRealtorCities = (state = { data: [], isLoading: false }, action) => {
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

// Dispatch Function to set the admin roles list.
export const allRealtorLocationsByCity = (state = { data: [], isLoading: false }, action) => {
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
