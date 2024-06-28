/** @format */

import * as Actions from '../../types';
import produce from 'immer';

// Dispatch Function to Handle Sales Leads DataTable Data.
export const featuredVideos = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.SAVE_FEATURED_VIDEOS_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.SAVE_FEATURED_VIDEOS_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.SAVE_FEATURED_VIDEOS_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};
