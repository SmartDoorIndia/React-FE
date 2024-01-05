import * as Actions from '../../types';
import produce from 'immer';

export const addNewPost2Reducer = (state = { data: [], isLoading: false }, action) => {
    return produce(state, (draft) => {
      switch (action.type) {
        case Actions.ADD_NEW_POST_ADDRESS_SUCCESS:
          draft.data = action.data;
          draft.isLoading = false;
          return draft;

        case Actions.ADD_NEW_POST_ADDRESS_ERROR:
          draft.data = action.data;
          draft.isLoading = false;
          return draft;

        case Actions.ADD_NEW_POST_ADDRESS_LOADING:
          draft.isLoading = true;
          return draft;
  
        default:
          return state;
      } 
    });
  };