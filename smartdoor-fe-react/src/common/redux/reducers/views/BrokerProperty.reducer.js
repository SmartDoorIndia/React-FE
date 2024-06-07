/** @format */

import * as Actions from '../../types';
import produce from 'immer';


export const brokerProperty = ( state = { date:[], isLoading: false},action) =>{
    return produce (state,(draft) =>{
      switch (action.type) {
       
        case Actions.BROKERS_PROPERTY_SUCCESS:
          draft.data = action.data;
          draft.isLoading = false;
          return draft;
        
  
        case Actions.BROKERS_PROPERTY_ERROR:
          draft.error = action.data;
          draft.isLoading = false;
          draft.data = [];
          return draft;
  
        case Actions.BROKERS_PROPERTY_LOADING:
          draft.isLoading = true;
          return draft;
                   
        default:
          return state;
      }
     
    });
};
