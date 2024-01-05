/** @format */

import * as Actions from '../../types';
import produce from 'immer';

// Dispatch Function to Handle Excutive Installation DataTable Data.
// export const installationReqData = (state = { data: [], isLoading: false }, action) => {
//   return produce(state, (draft) => {
//     switch (action.type) {
//       case Actions.EXCUTIVE_INSTALLATION_SUCCESS:
//         draft.data = action.data;
//         draft.isLoading = false;
//         return draft;

//       case Actions.EXCUTIVE_INSTALLATION_ERROR:
//         draft.error = action.data;
//         draft.isLoading = false;
//         return draft;

//       case Actions.EXCUTIVE_INSTALLATION_LOADING:
//         draft.isLoading = true;
//         return draft;

//       default:
//         return state;
//     }
//   });
// };

// Dispatch Function to Handle Excutive Service req DataTable Data.
// export const serviceRequestData = (state = { data: [], isLoading: false }, action) => {
//   return produce(state, (draft) => {
//     switch (action.type) {
//       case Actions.EXCUTIVE_SERVICE_REQ_SUCCESS:
//         draft.data = action.data;
//         draft.isLoading = false;
//         return draft;

//       case Actions.EXCUTIVE_SERVICE_REQ_ERROR:
//         draft.error = action.data;
//         draft.isLoading = false;
//         return draft;

//       case Actions.EXCUTIVE_SERVICE_REQ_LOADING:
//         draft.isLoading = true;
//         return draft;

//       default:
//         return state;
//     }
//   });
// };

// Dispatch Function to Handle Excutive Published Property  DataTable Data.
// export const publishedProperyData = (state = { data: [], isLoading: false }, action) => {
//   return produce(state, (draft) => {
//     switch (action.type) {
//       case Actions.EXCUTIVE_PUBLISHED_PROPERTY_SUCCESS:
//         draft.data = action.data;
//         draft.isLoading = false;
//         return draft;

//       case Actions.EXCUTIVE_PUBLISHED_PROPERTY_ERROR:
//         draft.error = action.data;
//         draft.isLoading = false;
//         return draft;

//       case Actions.EXCUTIVE_PUBLISHED_PROPERTY_LOADING:
//         draft.isLoading = true;
//         return draft;

//       default:
//         return state;
//     }
//   });
// };

// Dispatch Function to Handle Excutive Teams DataTable Data.
// export const excutiveTeamsData = (state = { data: [], isLoading: false }, action) => {
//   return produce(state, (draft) => {
//     switch (action.type) {
//       case Actions.EXCUTIVE_TEAMS_SUCCESS:
//         draft.data = action.data;
//         draft.isLoading = false;
//         return draft;

//       case Actions.EXCUTIVE_TEAMS_ERROR:
//         draft.error = action.data;
//         draft.isLoading = false;
//         return draft;

//       case Actions.EXCUTIVE_TEAMS_LOADING:
//         draft.isLoading = true;
//         return draft;

//       default:
//         return state;
//     }
//   });
// };

export const transactionMeetingRequestData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.TRANSACTION_MEETING_REQUEST_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.TRANSACTION_MEETING_REQUEST_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.TRANSACTION_MEETING_REQUEST_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

export const transactionLeadsData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.TRANSACTION_LEAD_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.TRANSACTION_LEAD_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.TRANSACTION_LEAD_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

export const dealApprovalData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.TRANSACTION_DEAL_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.TRANSACTION_DEAL_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.TRANSACTION_DEAL_LOADING:
        draft.isLoading = true;
        return draft;

      default:
        return state;
    }
  });
};

// Function to set the SocietyLeads City list.
export const transactionTeamsCityData = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.TRANSACTION_TEAM_CITY_SUCCESS:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      case Actions.TRANSACTION_TEAM_CITY_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      default:
        return state;
    }
  });
};

// Dispatch Function to set the admin roles list.
export const allTransactionCities = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.ALL_CITIES:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      default:
        return state;
    }
  });
};

// Dispatch Function to set the admin roles list.
export const allCities = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.ALL_CITIES:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      default:
        return state;
    }
  });
};

// Dispatch Function to set the admin roles list.
export const allTransactionLocationsByCity = (state = { data: [], isLoading: false }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.ALL_LOCATION_BY_CITY:
        draft.data = action.data;
        draft.isLoading = false;
        return draft;

      default:
        return state;
    }
  });
};

export const transactionTeamsData = (state = { data: [], isLoading: false }, action) => {
    return produce(state, (draft) => {
      switch (action.type) {
        case Actions.TRANSACTION_TEAMS_SUCCESS:
          draft.data = action.data;
          draft.isLoading = false;
          return draft;
  
        case Actions.TRANSACTION_TEAMS_ERROR:
          draft.error = action.data;
          draft.isLoading = false;
          return draft;
  
        case Actions.TRANSACTION_TEAMS_LOADING:
          draft.isLoading = true;
          return draft;
  
        default:
          return state;
      }
    });
  };
  

// const ExecutionStatsCountInitState = {
//   data: {
//     currentWeekInstallationCompletedCount: 0,
//     currentWeekInstallationRequestCount: 0,
//     currentWeekOpenServiceRequestCount: 0,
//     installationCompletedCount: 0,
//     installationRequestCount: 0,
//     openServiceRequestCount: 0,
//     teamMembersCount: 0,
//   },
//   isLoading: false,
// };

const TransactionStatsCountInitState = {
  data: {
    dealMeetingCount: 0,
    currentWeekDealMeetingCount: 0,
    dealCompletedCount: 0,
    currentWeekDealCompletedCount: 0,
    totalTransactionCount: 0,
    currentWeekTotalTransactionCount: 0,
    refundCount: 0,
    currentWeekRefundCount: 0
  },
  isLoading: false,
};

// // Dispatch Function to Handle Excutive Stats CountData.
export const transactionDashboardCount = (state = TransactionStatsCountInitState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Actions.TRANSACTION_STATS_COUNT_SUCCESS:
        draft.data = action.data || state;
        draft.isLoading = false;
        return draft;

      case Actions.TRANSACTION_STATS_COUNT_ERROR:
        draft.error = action.data;
        draft.isLoading = false;
        return draft;

      default:
        return state;
    }
  });
};

// const ExcutionDashboardCityState = {
//   installationReqCity: [],
//   publishPropertyCity: [],
//   excutionteamCity: [],
//   serviceReqCity: [],
// };

// // Dispatch Function to Handle Excution Dashboard DataTable filter Data.
// export const excutiveDashboardCity = (state = ExcutionDashboardCityState, action) => {
//   return produce(state, (draft) => {
//     switch (action.type) {
//       case Actions.EXECUTION_INSTALLATION_CITY_SUCCESS:
//         draft.installationReqCity = action.data;
//         return draft;

//       case Actions.EXCUTIVE_PUBLISHED_PROPERTY_CITY_SUCCESS:
//         draft.publishPropertyCity = action.data;
//         return draft;

//       case Actions.EXECUTION_TEAM_CITY_SUCCESS:
//         draft.excutionteamCity = action.data;
//         return draft;

//       case Actions.EXCUTIVE_SERVICE_REQ_CITY_SUCCESS:
//         draft.serviceReqCity = action.data;
//         return draft;

//       default:
//         return state;
//     }
//   });
// };

// export const allExecutiveLocationsByCity = (state = { data: [], isLoading: false }, action) => {
//   return produce(state, (draft) => {
//     switch (action.type) {
//       case Actions.ALL_EXECUTIVE_LOCATION_BY_CITY:
//         draft.data = action.data;
//         draft.isLoading = false;
//         return draft;

//       default:
//         return state;
//     }
//   });
// };
