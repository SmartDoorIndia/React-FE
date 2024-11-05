/** @format */

import {
   FETCH_PROPERTY_LIST_REQUEST,
   FETCH_PROPERTY_LIST_SUCCESS,
   FETCH_PROPERTY_LIST_FAILURE,
   FETCH_PROJECT_DETAILS_REQUEST,
   FETCH_PROJECT_DETAILS_SUCCESS,
   FETCH_PROJECT_DETAILS_FAILURE,
} from "../../../types";

// Initial State
const initialState = {
   builderPropertyList: {
      data: [],
      isLoading: false,
      error: null,
   },
   builderProjectDetails: {
      data: {},
      isLoading: false,
      error: null,
   },
};

// Reducer Function
const BuilderPropertyListing = (state = initialState, action) => {
   switch (action.type) {
      // Builder Property Listings
      case FETCH_PROPERTY_LIST_REQUEST:
         return {
            ...state,
            builderPropertyList: {
               ...state.builderPropertyList,
               isLoading: true,
               error: null,
            },
         };
      case FETCH_PROPERTY_LIST_SUCCESS:
         return {
            ...state,
            builderPropertyList: {
               ...state.builderPropertyList,
               isLoading: false,
               data: action.payload,
            },
         };
      case FETCH_PROPERTY_LIST_FAILURE:
         return {
            ...state,
            builderPropertyList: {
               ...state.builderPropertyList,
               isLoading: false,
               error: action.payload,
            },
         };

      // Builder Project Details (existing)
      case FETCH_PROJECT_DETAILS_REQUEST:
         return {
            ...state,
            builderProjectDetails: {
               ...state.builderProjectDetails,
               isLoading: true,
               error: null,
            },
         };
      case FETCH_PROJECT_DETAILS_SUCCESS:
         return {
            ...state,
            builderProjectDetails: {
               ...state.builderProjectDetails,
               isLoading: false,
               data: action.payload,
            },
         };
      case FETCH_PROJECT_DETAILS_FAILURE:
         return {
            ...state,
            builderProjectDetails: {
               ...state.builderProjectDetails,
               isLoading: false,
               error: action.payload,
            },
         };

      default:
         return state;
   }
};

export default BuilderPropertyListing;
