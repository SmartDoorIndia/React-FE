/** @format */

import { LOGIN, OTP } from '../types';
import produce from 'immer';

const INITIAL_STATE = {};

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

