/** @format */

import * as Actions from '../../types';
import produce from 'immer';


export const corporateProperty = ( state = { data:[], isLoading: false},action) =>{
    return produce (state,(draft) =>{
      switch (action.type) {
       
        case Actions.CORPORATE_PROPERTY_SUCCESS:
          draft.data = action.data;
          draft.isLoading = false;
          return draft;
        
  
        case Actions.CORPORATE_PROPERTY_ERROR:
          draft.error = action.data;
          draft.isLoading = false;
          draft.data = [];
          return draft;
  
        case Actions.CORPORATE_PROPERTY_LOADING:
          draft.isLoading = true;
          return draft;
                   
        default:
          return state;
      }
     
    });
};
