/** @format */

import * as Actions from '../../types';
import produce from 'immer';

// Dispatch Function to Handle Sales Leads DataTable Data.
export const consumerTransactionsDataTable = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.CONSUMER_TRANSACTIONS_DATATABLE_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.CONSUMER_TRANSACTIONS_DATATABLE_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.CONSUMER_TRANSACTIONS_DATATABLE_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

// Dispatch Function to Handle Sales Leads DataTable Data.
export const getBuybackRequestsData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.BUYBACK_DATATABLE_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.BUYBACK_DATATABLE_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.BUYBACK_DATATABLE_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};


// Dispatch Function to Handle refund requests list DataTable Data.
export const refundRequestsDataTable = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.REFUND_REQUESTS_DATATABLE_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.REFUND_REQUESTS_DATATABLE_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.REFUND_REQUESTS_DATATABLE_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

// Dispatch Function to Handle refund requests list DataTable Data.
// export const payablePartnerCommisionDataTable = (state = { data: [], isLoading: false }, action) => {
//   return produce(state, (draft) => {
//     switch (action.type) {
//       case Actions.PAYABLE_PARTNER_COMMISIONS_DATATABLE_SUCCESS:
//         draft.data = action.data;
//         draft.isLoading = false;
//         return draft;

//       case Actions.PAYABLE_PARTNER_COMMISIONS_DATATABLE_ERROR:
//         draft.error = action.data;
//         draft.isLoading = false;
//         return draft;

//       case Actions.PAYABLE_PARTNER_COMMISIONS_LOADING:
//         draft.isLoading = true;
//         return draft;

//       default:
//         return state;
//     }
//   });
// };

export const payablePartnerCommisionDataTable = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.PAYABLE_PARTNER_COMMISIONS_DATATABLE_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.PAYABLE_PARTNER_COMMISIONS_DATATABLE_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.PAYABLE_PARTNER_COMMISIONS_DATATABLE_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

export const financeTeamDataTable = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.FINANCE_TEAM_DATATABLE_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.FINANCE_TEAM_DATATABLE_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.FINANCE_TEAM_DATATABLE_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};


const SaledsLeadsCountInitState = {
  data: {
    currentWeekLeadsCountFromApp: 0,
    currentWeekleadsCountConverted: 0,
    currentWeekleadsCountFromManualEntry: 0,
    currentWeekleadsCountFromQRScan: 0,
    totalLeadsCountConverted: 0,
    totalLeadsCountFromApp: 0,
    totalLeadsCountFromManualEntry: 0,
    totalLeadsCountFromQRScan: 0,
  },
  isLoading: false,
};

// Dispatch Function to Handle Sales Leads Count Data.
export const salesLeadsCount = (state = SaledsLeadsCountInitState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.SALES_LEADS_COUNT_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.SALES_LEADS_COUNT_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      default:
        return state;
    }
  });
};

const FinanceCountInitState = {
  data: {
    "totalRevenueCount": 0,
    "currentWeekRevenueCount": 0,
    "totalCostCount": 0,
    "currentWeekCostCount": 0,
    "totalTransactionCount": 0,
    "currentWeekTransactionCount": 0,
    "refundCount": 0,
    "currentWeekRefundCount": 0
  },
  isLoading: false,
};


export const financeCount = (state = FinanceCountInitState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.FINANCE_COUNT_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.FINANCE_COUNT_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      default:
        return state;
    }
  });
};

export const getAllFinanceTeamsCityData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.FINANCE_TEAM_CITY_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.FINANCE_TEAM_CITY_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      default:
        return state;
    }
  });
};

export const financeRefundRequestDetails = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.FINANCE_REFUND_REQUEST_DETAILS_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.FINANCE_REFUND_REQUEST_DETAILS_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.FINANCE_REFUND_REQUEST_DETAILS_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

// Function to set the SocietyLeads City list.
export const getSocietyLeadsCityData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.SOCIETY_LEADS_CITY_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.SOCIETY_LEADS_CITY_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      default:
        return state;
    }
  });
};

// Function to set the SocietyLeads City list.
export const getSalesTeamCityData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.SALES_TEAM_CITY_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.SALES_TEAM_CITY_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      default:
        return state;
    }
  });
};
