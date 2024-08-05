/** @format */

import * as Actions from '../../types';
import produce from 'immer';


export const batteryLevel = ( state = { date:[], isLoading: false},action) =>{
    return produce (state,(draft) =>{
      switch (action.type) {
       
        case Actions.BATTERY_LEVEL_SUCCESS:
          draft.data = action.data;
          draft.isLoading = false;
          return draft;
        
  
        case Actions.BATTERY_LEVEL_ERROR:
          draft.error = action.data;
          draft.isLoading = false;
          draft.data = [];
          return draft;
  
        case Actions.BATTERY_LEVEL_LOADING:
          draft.isLoading = true;
          return draft;
                   
        default:
          return state;
      }
     
    });
};
