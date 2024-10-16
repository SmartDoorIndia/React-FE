/** @format */

import {
   GET_BUILDER_LIST_REQUEST,
   GET_BUILDER_LIST_SUCCESS,
   GET_BUILDER_LIST_FAILURE,
   GET_BUILDER_LIST_STATS_REQUEST,
   GET_BUILDER_LIST_STATS_SUCCESS,
   GET_BUILDER_LIST_STATS_FAILURE,
} from "../../../types";

const initialState = {
   builderList: [], // Holds the list of builders
   builderStats: {}, // Holds the stats related to builders
   isLoading: false, // Loading indicator for both list and stats
   error: null, // Error handling
};

const BuilderListing = (state = initialState, action) => {
   switch (action.type) {
      case GET_BUILDER_LIST_REQUEST:
         return {
            ...state,
            isLoading: true,
            error: null,
         };
      case GET_BUILDER_LIST_SUCCESS:
         return {
            ...state,
            isLoading: false,
            builderList: action.payload, // Assuming the payload contains the builder list
         };
      case GET_BUILDER_LIST_FAILURE:
         return {
            ...state,
            isLoading: false,
            error: action.payload, // Assuming payload contains the error message
         };
      case GET_BUILDER_LIST_STATS_REQUEST:
         return {
            ...state,
            isLoading: true,
            error: null,
         };
      case GET_BUILDER_LIST_STATS_SUCCESS:
         return {
            ...state,
            isLoading: false,
            builderStats: action.payload, // Assuming the payload contains builder stats data
         };
      case GET_BUILDER_LIST_STATS_FAILURE:
         return {
            ...state,
            isLoading: false,
            error: action.payload,
         };
      default:
         return state;
   }
};

export default BuilderListing;
