/** @format */

import * as Actions from '../../types';
import produce from 'immer';

// Dispatch Function to Handle Sales Leads DataTable Data.
export const specDetailFields = (state = { data: {}, isLoading: false }, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case Actions.SPEC_DETAILS_SUCCESS:
                draft.data = action.data;
                draft.isLoading = false;
                return draft;

            case Actions.SPEC_DETAILS_ERROR:
                draft.error = action.data;
                draft.isLoading = false;
                return draft;

            case Actions.SPEC_DETAILS_LOADING:
                draft.isLoading = true;
                return draft;

            default:
                return state;
        }
    });
};
