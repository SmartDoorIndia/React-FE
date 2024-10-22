/** @format */

import * as Actions from "../../../types";
import produce from "immer";
const initialState = {
   data: {
      builderProjectList: [],
      records: 0,
      currentPage: 1,
      rowsPerPage: 7,
      searchString: "",
   },
   isLoading: false,
   error: null,
};

const ProjectsPostings = (state = initialState, action) => {
   return produce(state, (draft) => {
      switch (action.type) {
         case Actions.GET_BUILDER_PROJECTS_SUCCESS:
            console.log("Updating state with:", action.data.builderProjectList);
            return {
               ...state,
               isLoading: false,
               builderProjectList: action.data.builderProjectList,
               records: action.data.records,
            };

         case Actions.GET_BUILDER_PROJECTS_ERROR:
            draft.error = action.data;
            draft.isLoading = false;
            return draft;

         case Actions.GET_BUILDER_PROJECTS_LOADING:
            draft.isLoading = true;
            return draft;

         default:
            return state;
      }
   });
};

export default ProjectsPostings;
