/** @format */

import * as Actions from '../../types';
import produce from 'immer';


export const allCorporates = ( state = { data:[], isLoading: false},action) =>{
    return produce (state,(draft) =>{
      switch (action.type) {
       
        case Actions.CORPORATE_LIST_SUCCESS:
          draft.data = action.data;
          draft.isLoading = false;
          return draft;
        
  
        case Actions.CORPORATE_LIST_ERROR:
          draft.error = action.data;
          draft.isLoading = false;
          draft.data = [];
          return draft;
  
        case Actions.CORPORATE_LIST_LOADING:
          draft.isLoading = true;
          return draft;
                   
        default:
          return state;
      }
     
    });
};
