/** @format */

import {
   GET_BUILDER_PROJECTS_REQUEST,
   GET_BUILDER_PROJECTS_SUCCESS,
   GET_BUILDER_PROJECTS_FAILURE,
   GET_BUILDER_PROJECT_STATS_REQUEST,
   GET_BUILDER_PROJECT_STATS_SUCCESS,
   GET_BUILDER_PROJECT_STATS_FAILURE,
} from "../../../types";

const initialState = {
   projects: [],
   projectStats: {},
   isLoading: false,
   error: null,
};

const builderReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_BUILDER_PROJECTS_REQUEST:
         return {
            ...state,
            isLoading: true,
            error: null,
         };
      case GET_BUILDER_PROJECTS_SUCCESS:
         return {
            ...state,
            isLoading: false,
            projects: action.payload, // Assuming the payload contains the projects array
         };
      case GET_BUILDER_PROJECTS_FAILURE:
         return {
            ...state,
            isLoading: false,
            error: action.payload,
         };
      case GET_BUILDER_PROJECT_STATS_REQUEST:
         return {
            ...state,
            isLoading: true,
            error: null,
         };
      case GET_BUILDER_PROJECT_STATS_SUCCESS:
         return {
            ...state,
            isLoading: false,
            projectStats: action.payload, // Assuming the payload contains project stats data
         };
      case GET_BUILDER_PROJECT_STATS_FAILURE:
         return {
            ...state,
            isLoading: false,
            error: action.payload,
         };
      default:
         return state;
   }
};

export default builderReducer;
