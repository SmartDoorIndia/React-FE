/** @format */

import * as Actions from '../types'
import produce from 'immer';

// Dispatch Function to Handle Sales Leads DataTable Data.
export const allNonSDProperties = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.NON_SD_PROPERTIES_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.NON_SD_PROPERTIES_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        draft.data = [];
        return draft;

      case Actions.NON_SD_PROPERTIES_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};
