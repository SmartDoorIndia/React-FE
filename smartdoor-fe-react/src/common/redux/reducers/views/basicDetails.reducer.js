/** @format */

import * as Actions from '../../types';
import produce from 'immer';

// Dispatch Function to Handle Sales Leads DataTable Data.
export const basicDetailFields = (state = { data: {}, isLoading: false }, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case Actions.BASIC_DETAILS_SUCCESS:
                draft.data = action.data;
                draft.isLoading = false;
                return draft;

            case Actions.BASIC_DETAILS_ERROR:
                draft.error = action.data;
                draft.isLoading = false;
                return draft;

            case Actions.BASIC_DETAILS_LOADING:
                draft.isLoading = true;
                return draft;

            default:
                return state;
        }
    });
};
