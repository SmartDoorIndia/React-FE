/** @format */

import { LOGIN, OTP, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from "../types";
import produce from "immer";

const INITIAL_STATE = {};
const initialState = {
   user: null,
   error: null,
   loading: false,
};
// Reducer Function to set login data.
export const login = (state = INITIAL_STATE, action) => {
   return produce(state, (draft) => {
      switch (action.type) {
         case LOGIN:
            draft.data = action.data;
            return draft;

         default:
            return state;
      }
   });
};
// export default login;

// Reducer Function to set login data.
export const otp = (state = INITIAL_STATE, action) => {
   return produce(state, (draft) => {
      switch (action.type) {
         case OTP:
            draft.data = action.data;
            return draft;

         default:
            return state;
      }
   });
};

export const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case SIGN_UP_SUCCESS:
         return { ...state, user: action.payload, loading: false };
      case SIGN_UP_FAILURE:
         return { ...state, error: action.payload, loading: false };
      default:
         return state;
   }
};
