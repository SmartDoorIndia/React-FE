/** @format */

import * as Actions from '../../types';
import produce from 'immer';

// Dispatch Function to Handle Camera Media Segregation Dashboard stats+list data.
export const cameraMediaStats = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.CAMERA_MEDIA_STATS_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.CAMERA_MEDIA_STATS_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.CAMERA_MEDIA_STATS_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};
