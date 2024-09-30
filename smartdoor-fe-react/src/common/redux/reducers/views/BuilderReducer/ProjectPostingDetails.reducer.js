/** @format */

import {
   FETCH_SUB_POSTS_REQUEST,
   FETCH_SUB_POSTS_SUCCESS,
   FETCH_SUB_POSTS_FAILURE,
   FETCH_PROJECT_DETAILS_REQUEST,
   FETCH_PROJECT_DETAILS_SUCCESS,
   FETCH_PROJECT_DETAILS_FAILURE,
} from "../../../types";

// Initial State
const initialState = {
   builderProjectSubPosts: {
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
const ProjectPostingDetails = (state = initialState, action) => {
   switch (action.type) {
      // Builder Project SubPosts
      case FETCH_SUB_POSTS_REQUEST:
         return {
            ...state,
            builderProjectSubPosts: {
               ...state.builderProjectSubPosts,
               isLoading: true,
               error: null,
            },
         };
      case FETCH_SUB_POSTS_SUCCESS:
         return {
            ...state,
            builderProjectSubPosts: {
               ...state.builderProjectSubPosts,
               isLoading: false,
               data: action.payload,
            },
         };
      case FETCH_SUB_POSTS_FAILURE:
         return {
            ...state,
            builderProjectSubPosts: {
               ...state.builderProjectSubPosts,
               isLoading: false,
               error: action.payload,
            },
         };

      // Builder Project Details
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

export default ProjectPostingDetails;
