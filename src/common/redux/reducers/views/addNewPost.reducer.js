import * as Actions from '../../types';
import produce from 'immer';

export const addNewPostReducer = (state = { data: [], isLoading: false }, action) => {
    return produce(state, (draft) => {
      switch (action.type) {
        case Actions.ADD_NEW_POST_SUCCESS:
          draft.data = action.data;
          draft.isLoading = false;
          return draft;

        case Actions.ADD_NEW_POST_ERROR:
          draft.data = action.data;
          draft.isLoading = false;
          return draft;

        case Actions.ADD_NEW_POST_LOADING:
          draft.isLoading = true;
          return draft;
  
        default:
          return state;
      } 
    });
  };