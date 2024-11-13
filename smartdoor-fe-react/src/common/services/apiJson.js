/** @format */

import { getLocalStorage } from "../helpers/Utils";

const userData = getLocalStorage("authData");

export const ApiJson = {
   login: {
      // url: 'userauth/oauth/token?username=:username&password=:password&roleId=&loginBy=password&grant_type=password&deviceId=4343&deviceType=crome&appName=admin',
      url: "/userauth/oauth/token?username=:username&password=:password&roleId=&loginBy=otp&grant_type=password&deviceId=4343&deviceType=crome&appName=admin",
      method: "POST",
      data: {},
      headers: {
         "Content-Type": "application/json",
      },
      showResultMessage: false,
      showErrorMessage: true,
   },

   getOtp: {
      url: "/userauth/public/sendLoginOtp?mobile=:mobile&appName=admin",
      method: "POST",
      data: {},
      headers: {
         "Content-Type": "application/json",
      },
      showResultMessage: false,
      showErrorMessage: true,
   },
   // getSocietyLeads: {
   //   url: 'admin/sales/getSocietyLeads?city=:city&records=:records&pageNumber=:pageNumber',
   //   method: 'GET',
   //   data: {},
   //   headers: {
   //     'Accept': '*/*',
   //     'Content-Type': 'application/json',

   //   },
   //   showResultMessage: false,
   //   showErrorMessage: false,
   // },

   // getPermissionsByRoleId: {
   //   url: '/admin/property/getSocietyByCity?city=:city&societyString=:societyString',
   //   method: 'GET',
   //   data: {},
   //   headers: {
   //     'Accept': '*/*',
   //     'Content-Type': 'application/json',
   //   },
   // },

   getSocietyLeads: {
      url: "admin/sales/getSocietyLeads?records=:records&pageNumber=:pageNumber",
      method: "POST",
      data: {
         city: "",
         endDate: "",
         id: "",
         societyName: "",
         startDate: "",
         status: [],
      },
      propertyDocsRequest: {},
      propertyId: '',
      roleId: '',
    },
//   },

  //Add New City Using pinCode
  addNewCity: {
    url: '/admin/dom/savelocations',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {}
  },

  // HelpDesk Service Requests
  getHelpDeskDashboardCount: {
    url: '/admin/helpdesk/getDashboardCount',
    method: 'GET',
  },

  getHelpDeskTeam: {
    url: '/admin/helpdesk/getHelpDeskTeam?city=:city&records=:records&pageNumber=:pageNumber',
    method: 'GET',
  },

  getHelpDeskTeamCity: {
    url: '/admin/helpdesk/getHelpDeskTeamCity',
    method: 'GET',
  },

  getHelpDeskPropertyLeads: {
    url: '/admin/helpdesk/getPropertyLeads?city=:city&records=:records&pageNumber=:pageNumber',
    method: 'GET',
  },

  getHelpDeskPropertyLeadsCity: {
    url: '/admin/helpdesk/getPropertyLeadsCity',
    method: 'GET',
  },

  getHelpDeskServiceRequest: {
    url: '/admin/helpdesk/getServiceRequest?records=:records&pageNumber=:pageNumber',
    method: 'POST',
    data: {
      status: [],
      endDate: '',
      city: '',
      contactNumber: '',
      ticketNumber: '',
      startDate: '',
    },
  },

  getHelpDeskServiceRequestCity: {
    url: '/admin/helpdesk/getServiceRequestCity',
    method: 'GET',
  },

  getHelpdeskLeadsByUser: {
    //http://103.76.253.133:8751/admin/helpdesk/getAllLeadsByUser/229?records=&pageNumber=&fromDate=2022-08-21&toDate=2022-09-01   
    url: '/admin/helpdesk/getAllLeadsByUser/:userId?records=:records&pageNumber=:pageNumber&fromDate=:fromDate&toDate=:toDate',
    method: 'GET',
  },
  createTicket: {
    url: '/admin/helpdesk/createTicket',
    method: 'POST',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    data: {
      actionToSolve: '',
      assignTo: '',
      callFrom: '',
      callerId: 0,
      email: '',
      notify: true,
      phoneNumber: '',
      problem: '',
      property: '',
      severity: '',
      ticketName: '',
      source: 'web',
      requestDate: '',
    },
  },

  getHelpDeskAssignedServiceRequest: {
    //records=&pageNumber=&fromDate=&toDate=
    url: '/admin/helpdesk/getAssignedServiceRequest/:userId?records=:records&pageNumber=:pageNumber&fromDate=:fromDate&toDate=:toDate',
    method: 'GET',
  },
  reOpenAndCloseRequest: {
    url: '/admin/helpdesk/reOpenAndCloseRequest/:requestID/:reOpen/:close',
    method: 'PUT',
  },
  //For installation close request
  closeRequestInstallation: {
    url: '/admin/helpdesk/closeRequest/:requestID',
    method: 'PUT',
  },
  getPropertyList: {
    url: '/admin/helpdesk/getPropertyList/:userId',
    method: 'GET',
  },
  // GET /helpdesk/getServiceRequestDetailById/{serviceRequestId}
  getServiceRequestDetailById: {
    url: '/admin/helpdesk/getServiceRequestDetailById/:serviceRequestId',
    method: 'GET',
  },
  // addComments: {
  //   url: '/admin/helpdesk/addComments/:serviceRequestId?comments=:comments',
  //   method: 'PUT',
  //   data: {},
  //   headers: {
  //     'Accept': '*/*',
  //     'Content-Type': 'application/json',
  //   },
  //   showResultMessage: false,
  //   showErrorMessage: false,
  // },

  addServiceRequestComments: {
    url: '/admin/helpdesk/addComments',
    method: 'PUT',
    data: {
      "comments": "string",
      "id": 0,
      "loginId": 0
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getTicketNameList: {
    url: '/admin/helpdesk/getTicketNameList',
    method: 'GET',
  },

  //http://localhost:8759/admin/helpdesk/teamName
  getTeamList: {
    url: '/admin/helpdesk/teamName',
    method: 'GET',
  },

  generateAgoraToken: {
    url: '/consumer/user/generateAgoraToken?channelName=:channelName',
    method: 'GET',
  },

  //FINANCE DASHBOARD MODULE
  getConsumerTransactions: {
    url: '/admin/finance/consumer/transactions',
    method: 'POST',
    data: {
      "pageNo": '',
      "pageSize": '',
      "userId": ''
    }
  },

  getRefundRequestList: {
    url: '/admin/finance/refund/requestList',
    method: 'POST',
    data: {
      "pageNo": '',
      "pageSize": '',
      "userId": ''
    }
  },

  getPayablePartnerCommisionsList: {
    url: 'admin/finance/getAllPayablePartnerCommisions?city=:city&records=:records&pageNumber=:pageNumber',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getAllFinanceTeams: {
    url: 'admin/finance/getAllFinanceTeams?city=:city&records=:records&pageNumber=:pageNumber',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  //getFinanceCount
  getFinanceCount: {
    url: 'admin/finance/getDashboardCount',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  getAllFinanceTeamsCity: {
    url: '/admin/finance/getAllFinanceTeamsCity',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getRefundRequestDetails: {
    url: '/admin/finance/refund/requestDetails?userId=:userId',
    // /admin/finance/refund/requestDetails?userId=25
    // admin/finance/getAllPayablePartnerCommisions?city=:city&records=:records&pageNumber=:pageNumber
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  togglefinanceRefundStatus: {
    url: '/admin/finance/buyback/toggleStatus?requestId=:requestId&status=:status',
    method: 'PUT',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  // getAllCityUsingGET
  getAllCity: {
    url: '/admin/user/getAllCity',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  // getAllCityUsingGET
  getAllCityWithId: {
    url: '/admin/property/getCityList',
    method: 'POST',
    data: {
      stateId: null,
      smartdoorServiceStatus: true
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getAllStateWithId: {
    url: '/admin/property/getAllStates',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  // getAllCityUsingGET
  getLocationByCity: {
    url: '/admin/user/getLocation?city=:city',
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getUserLocationByCity: {
    url: '/admin/user/getLocations',
    method: 'POST',
    data: {
      cities: ''
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  //realtor : api's
  getAllRealtors: {
    //http://localhost:8755/consumer/advisor/findAll?city=Pune&page=&size=&zipCode=411057
    url: '/consumer/advisor/findAll?city=:city&page=:page&size=:size&zipCode=:zipCode',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  // http://localhost:8755/consumer/advisor/76/BLOCKED?userId=1
  // /consumer/advisor/:advisorId/:status?userId=:userId
  toggleRealtorStatus: {
    url: '/consumer/advisor/:advisorId/:status?userId=:userId&comment=:message',
    method: 'PUT',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getRealtorDetails: {
    url: '/consumer/advisor/getDetail/:advisorId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getRealtorPropertyList: {
    url: '/consumer/advisor/getPropertyList/:ownerId?records=:records&pageNumber=:pageNumber&source=:source',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getRealtorHomeDetails: {
    url: '/consumer/advisor/getAdvisorHomeDetails/:userId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  // /consumer/advisor/getRatingList/246?records=10&pageNumber=1
  getRealtorRatingList: {
    url: '/consumer/advisor/getRatingList/:userId?records=:records&pageNumber=:pageNumber',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  //TRANSACTION
  getAllTransactionTeams: {
    url: '/admin/transaction/getAllTransactionTeams?city=:city&records=:records&pageNumber=:pageNumber',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getTransactionDashboardCount: {
    url: '/admin/transaction/getDashboardCount',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  // getIntallationRequestSlots: {
  //   url: '/admin/execution/getIntallationRequestSlots',
  //   method: 'POST',
  //   data: {
  //     city: '',
  //     propertyId: '',
  //     slotDate: '',
  //   },
  // },
  getAllTransactionMeetingRequest: {
    url: '/admin/transaction/getAllMeetingRequest',
    method: 'POST',
    data: {
      city: "",
      location: "",
      pageNumber: "",
      records: "",
      zipcode: 0
    },
  },

  getAllTransactionLead: {
    url: '/admin/transaction/getAllTransactionLead',
    method: 'POST',
    data: {
      city: "",
      location: "",
      pageNumber: null,
      records: null,
      zipcode: 0
      // userId: 0
    },
  },

  getAllTransactionTeamsCity: {
    url: '/admin/transaction/getAllTransactionTeamsCity',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getAllPendingDealApproval: {
    url: '/admin/transaction/getAllPendingDealApproval',
    method: 'POST',
    data: {
      "city": "",
      "location": "",
      "pageNumber": 0,
      "records": 0,
      "userId": 0,
      "zipcode": 0
    }
  },
  // http://103.187.101.51:8751/admin/transaction/getApprovalDetail/{dealId}
  getDealApprovalDetail: {
    url: '/admin/transaction/getApprovalDetail/:dealId',
    method: 'GET',
    data: {}
  },

  getTransactionMeetingDetailById: {
    url: '/admin/transaction/getDetailById/:MeetingRequestId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getTransactionLeadDetailById: {
    url: '/admin/transaction/getTransactionDetailById/:TransactionLeadId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getAllTransactionPreviousVisitRequest: {
    url: '/admin/transaction/getAllPreviousVisitRequest?userId=:userId&page=:page&size=:size',
    method: 'POST',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getTransactionLeadsByUser: {
    //http://103.76.253.133:8751/admin/helpdesk/getAllLeadsByUser/229?records=&pageNumber=&fromDate=2022-08-21&toDate=2022-09-01   
    url: '/admin/transaction/get/userId',
    method: 'POST',
    data: {
      "city": "",
      "location": "",
      "pageNumber": "",
      "records": "",
      "userId": 0,
      "zipcode": 0,
      "fromDate": "",
      "toDate": ""
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  ///admin/transaction/getAllMeetings/246
  getTransactionMeetingsByUserId: {
    url: '/admin/transaction/getAllMeetings/:userId?fromDate=:fromDate&toDate=:toDate',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getAllDealsByUserId: {
    url: '/admin/transaction/getAllDealsByUserId/:userId?fromDate=:fromDate&toDate=:toDate',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  reOpenTransactionLeadRequest: {
    url: '/admin/transaction/lead/reopen/:transactionLeadId/:userId',
    method: 'PUT',
  },
  ///transaction/viewFeedback/{visitId}
  getTransactionViewVisitFeedback: {
    url: '/admin/transaction/viewFeedback/:visitId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },


  //http://103.187.101.53:8751/admin/user/getWorkLocations?role=SALES_EXECUTIVE&page=1&size=10
  getExecutivesWrtRoleLocation: {
    // url: '/admin/user/getWorkLocations?role=:role&city=:city&page=:page&size=:size', 
    url: '/admin/user/getWorkLocation',
    method: 'POST',
    data: {
      role: '',
      page: '',
      size: '',
      city: ''
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  changeUserAssignee: {
    url: '/admin/admin/changeAssignee',
    method: 'PUT',
    data: {
      "assignedTo": '',
      "leadId": '',
      "leadFor": ""
    },
  },

  getSalesTransactionByUser: {
    //http://103.76.253.133:8751/admin/helpdesk/getAllLeadsByUser/229?records=&pageNumber=&fromDate=2022-08-21&toDate=2022-09-01   
    url: '/admin/sales/socities/enrolled',
    method: 'POST',
    data: {
      userId: "",
      records: "",
      pageNumber: "",
      fromDate: "",
      toDate: ""
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },


  //smartlock api's
  getCameraDevice: {
    url: '/smartlock/smartlock/getCameraDevice/:propertyid',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getDeviceInterfaceAccessToken: {
    url: 'https://tks.xmeye.net/v2/device/token/:timeMillis/:signature.rs',
    method: 'POST',
    data: {
      // {
      // "sns": [ "06c479f6dded087c" ],      
      // "userId": ""
      // }
    },
    headers: {
      // 'Accept': '*/*',
      // 'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getCameraUserToken: {
    // url: '/admin/user/getAllUsers?pageNumber=:pageNumber&records=:records&searchByCity=:searchByCity&searchByzipCode=:searchByzipCode',
    url: '/admin/dom/user/token',
    method: 'POST',
    data: {
      "account": "",
      "password": "",
      "signature": "",
      "timemilis": ""
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  //constact sensorapi's
  getContactSensor: {
    url: '/smartlock/smartlock/getContactSensor/:propertyId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getContactSensorLogin: {
    url: '/admin/dom/login/token',
    method: 'POST',
    data: {
      "email": "",
      "password": "",
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  ///admin/dom/user/devices
  getContactSensorDeviceDetails: {
    url: '/admin/dom/user/devices',
    method: 'POST',
    data: {
      "id": "",
      "token": ""
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getSmartLockData: {
    url: '/smartlock/smartlock/getSmartlockData/:id/PROPERTYID',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  doorClosed: {
    url: '/admin/dom/lock/unlock',
    method: 'POST',
    data: {
      'clientId': 'clientId',
      'accessToken': 'accessToken',
      'lockId': 'lockId',
      'date': 'date'
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getPropertyByUserId: {
    url: '/consumer/property/getPropertyByUserId/:userId?records=:recordes&pageNumber=:pagenumber',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  addNewPost: {
    url: '/consumer/property/addPropertyBasicDetails',
    method: 'POST',
    data: {
      smartdoorPropertyId: null,
      postedById: null,
      propertyCategory: '',
      propertyType: '',
      propertySubType: '',
      bedRooms: null,
      numberOfHalls: null,
      kitchens: null,
      numberOfBaths: null,
      balcony: null,
      coveredParking: null,
      openParking: null,
      type: '',
      isNegotiable: null,
      commercialProjectType: '',
      commercialArea: '',
      commercialType: '',
      leaseType: null,
      preferredFor: null,
      purpose: '',
      kitchenPatry: '',
      plotArea: null,
      attachedOpenTerraceArea: null,
      attachedOpenAreaOrGarden: null,
      maintenanceCost: null,
      propertyRate: null,
      propertyAge: null
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  addNewPost2: {
    url: '/consumer/property/addPropertyAddress',
    method: 'PUT',
    data: {
      smartdoorPropertyId: null,
      houseNumber: null,
      address: null,
      towerName: null,
      latitude: null,
      longitude: null,
      zipCode: null,
      country: null,
      state: null,
      city: null,
      isDraft: null,
      isPartial: null,
      floorNumber: null,
      societyId: null,
      otherSociety: null,
      buildingProjectSociety: null,
      totalFloor: null,
      locality: null,
      cityLat: null,
      cityLong: null
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  addNewPost4: {
    url: '/consumer/property/addPropertyMoreInfo',
    method: 'PUT',
    data: {
      smartdoorPropertyId: "",
      isDraft: "",
      propertyFurnishing: "",
      isLoanAvailable: "",
      loanFromBank: "",
      enteranceFacing: "",
      security: "",
      constructionSize: "",
      majorityComposition: "",
      religiousPlace: "",
      storeDistance: "",
      propertyDescription: "",
      investmentOpportunity: "",
      oldRate: "",
      amenities: [],
      isPartial: "",
      hallAndDining: "",
      furnishKitchen: "",
      furnishBedrooms: "",
      extras: "",
      landlordPossible: "",
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  addNewCity: {
    url: '/admin/property/addEditCity',
    method: 'POST',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  getSmartDoorServiceStatus: {
    url: 'consumer/property/getSmartDoorServiceStatus',
    method: 'POST',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  getSocietyName: {
    url: 'consumer/property/getSocietyByCity?city=:city&society=:society',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getPlanDetails: {
    url: 'consumer/property/getPlanDetail',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  deletePropertyById: {
    url: 'consumer/property/deletePropertyById/:propertyId',
    method: 'DELETE',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  restorePropertyById: {
    url: 'admin/property/restore/:propertyId',
    method: 'PUT',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getStaticMobNums: {
    url: '/admin/admin/getStaticMobile',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  setStaticMobNums: {
    url: '/admin/admin/setStaticMobile',
    method: 'POST',
    data: {
      mobile: ''
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getCoinTransactions: {
    url: 'consumer/transaction/getTransactionForUser/:userId/:pageNumber/:records',
    method: 'POST',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getPropertyPlanDetails: {
    url: 'admin/property/getPropertyPlandetails/:propertyId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  uploadImage: {
    url: 'consumer/user/uploadImages',
    method: 'PUT',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data'
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  setWorkCityRequest: {
    url: '/admin/property/setCityList',
    method: 'POST',
    data: {
      userId: null,
      cityIdList: []
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  setServiceStatus: {
    url: '/admin/property/setCityServiceStatus/:cityId/:status',
    method: 'PUT',
    data: {
      cityId: null,
      status: null
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  getFeaturedVideosList: {
    url: '/admin/system/getValues/:parameterId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  setFeaturedVideosList: {
    url: '/admin/system/addFeaturedVideos',
    method: 'PUT',
    data: {
      parameterId: '',
      parameterType: '',
      value: '',
      parameterDescription: ''
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  getSystemVariables: {
    url: '/consumer/user/getSystemVariables/:receiverId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  addEditAgency: {
    url: '/admin/marketingAgency/saveagency',
    method: 'POST',
    data: {
      agencyId: null,
      agencyName: '',
      location: '',
      contactName: '',
      contactNumber: null,
      contactEmail: null
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  getAllAgencies: {
    url: '/admin/marketingAgency/getAllAgency',
    method: 'POST',
    data: {

    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  getAllAgencyExecutives: {
    url: '/admin/marketingAgency/getAgencyExecutive',
    method: 'POST',
    data: {
      executiveId: null,
      agencyId: null,
      pageNo: null,
      pageSize: null,
      searchString: '',
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  addEditExecutive: {
    url: '/admin/marketingAgency/saveAgencyExecutive',
    method: 'POST',
    data: {
      agencyId: null,
      executiveId: null,
      executiveName: '',
      location: '',
      executiveNumber: null,
      executiveEmail: ''
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  getAgencyCustomers: {
    url: '/admin/marketingAgency/getCustomerList',
    method: 'POST',
    data: {
      agencyId: null,
      executiveId: null,
      searchString: "",
      pageNo: null,
      pageSize: null,
      fromDate: "",
      toDate: "",
      kycStatus: null
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  getAgencyProperty: {
    url: '/admin/marketingAgency/getPropertyList',
    method: 'POST',
    data: {
      agencyId: null,
      executiveId: null,
      customerId: null,
      searchString: "",
      pageNo: null,
      pageSize: null,
      fromDate: "",
      toDate: "",
      propertyStatus: "",
      propertyType: ""
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  transferAgencyCustomers: {
    url: '/admin/marketingAgency/TransferAgencyCustomer',
    method: 'PUT',
    data: {
      existingAgencyId: null,
      newAgencyId: null,
      existingExecutiveId: null,
      newExecutiveId: null,
      deactivateAgency: null,
      deleteExecutive: null,
      propertyTransfer: null
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  awardCoupons: {
    url: '/admin/marketingAgency/giftCouponsMarketingAgency',
    method: 'PUT',
    data: {
      consumerId: null,
      coins: null
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  addBasicDetails: {
    url: '/consumer/property/addPropertyBasicDetails',
    method: 'POST',
    data: {

    },
    showResultMessage: true,
    showErrorMessage: true
  },

  getChatGptDescription: {
    url: '/consumer/property/getChatGptDescription',
    method: 'POST',
    data: {

    },
    showResultMessage: true,
    showErrorMessage: true
  },

  checkExistingCustomer: {
    url: '/admin/marketingAgency/getCustomersPostings',
    method: 'POST',
    data: {
      mobile: ''
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  logoutUser: {
    url: '/userauth/public/revokeToken',
    method: 'DELETE',
    // data: {},
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Authorization': 'bearer ' + userData?.access_token
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  editCameraData: {
    url: '/smartlock/smartlock/saveorupdateCameraDevice',
    method: 'PUT',
    data: {
      uuId: null,
      userName: '',
      password: '',
      nickName: '',
      CameraType: '',
      propertyId: ''
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  getCameraTypes: {
    url: '/smartlock/smartlock/getCameraTypes',
    method: 'GET',
    data: {
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  setCallbackUrl: {
    url: '/smartlock/smartlock/setCallBackURL/:type/:sns/:propertyId',
    method: 'PUT',
    data: {
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  deleteCamera: {
    url: '/smartlock/smartlock/deleteCameraDeviceById/:cameraId',
    method: 'DELETE',
    data: {
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  getDeviceToken: {
    url: '/consumer/notification/notifyy/:sns/:status',
    method: 'GET',
    data: {
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    },
    showResultMessage: true,
    showErrorMessage: true
  },

  //Broker API details
  getBrokerListing: {
    url: "consumer/broker/getBrokerList",
    method: "POST",
    data: {
      userId: null
    },
    headers: {
      Accept: "*/*",
      "content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getBrokerDetails: {
    url: "/consumer/broker/getBrokerDetailsById/:userId",
    method: "GET",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getBrokerPropertyById: {
    url: "/consumer/property/getPropertyById/:propertyId/:brokerId",
    method: "GET",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getBrokerPostedProperty: {
    url: "consumer/broker/getPropertyListBroker",
    method: "POST",
    data: {
      brokerId: null,
      pageNo: null,
      records: null,
      searchString: "",
      fromDate: null,
      toDate: null,
      status: ""
    },
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getBrokerDetailsForApprove: {
    url: "/consumer/broker/getBrokerDetailsForApprove/:brokerId",
    method: "GET",
    data: {},
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getBrokerStatusDetail: {
    url: "/consumer/broker/updateStatus/:brokerId/:status",
    method: "PUT",
    data: {},
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  getBrokerDeclineStatusDetail: {
    url: "/consumer/broker/updateStatusAsRejected/:brokerId/:status",
    method: "PUT",
    data: {},
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  addHoldRequestComments: {
    url: "/consumer/broker/updateStatus/:brokerId/:status",
    method: "PUT",
    data: {
      comments: "string",
      id: 0,
    },
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  changeBrokerStatus: {
    url: "consumer/broker/changeBrokerStatus",
    method: "POST",
    data: {
      brokerId: null,
      brokerStatus: '',
      holdReason: ''
    },
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  setBrokerMbileStatic: {
    url: "/consumer/broker/setBrokerStatic/:mobile",
    method: "PUT",
    data: {

    },
    header: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getPlanForCorporate: {
    url: "consumer/property/getPlanDetail",
    method: "POST",
    data: {
      plantType: null,
      smartdoorPlan: null
    },
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getAllCoporate: {
    url: "consumer/corporate/getAllCorporate",
    method: "POST",
    data: {
      corporateId: null,
      pageNo: null,
      pageSize: null,
      searchString: ''
    },
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: true,
  },

  addEditCorporate: {
    url: "consumer/corporate/addEditCorporate",
    method: "POST",
    data: {
      logo: '',
      companyName: '',
      companyAddress: '',
      smartDoorPlanId: '',
      nonSmartDoorPlanId: ''
    },
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: true,
  },

  addEditCorporateUser: {
    url: "consumer/corporate/addEditUser",
    method: "POST",
    data: {
      name: '',
      mobile: '',
      corporateId: null,
      sdPosting: null,
      nonSdPosting: null
    },
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: true,
  },

  getAllCorporateUsers: {
    url: "consumer/corporate/getAllCorporateUser/:corporateId",
    method: "GET",
    data: {},
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: true,
  },

  getCorporateProperties: {
    url: "consumer/corporate/getCorporateProperties",
    method: "POST",
    data: {},
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: true,
  },

  getBatteryLvlChk: {
    url: "/admin/admin/getCameraDevices",
    method: "GET",
    data: {},
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: true,
  },

  getHubList: {
    url: "/admin/admin/getAllSmartDoorHubs",
    method: "POST",
    data: {},
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: true,
  },

  createNewHub: {
    url: "/admin/admin/createSmartDoorHub",
    method: "POST",
    data: {
      hubId: null,
      hubName: ''
    },
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: true,
  },

  getCorporateUserHubList: {
    url: "/admin/admin/getAllSmartDoorHubs?corporateUserId=:corporateUserId",
    method: "POST",
    data: {
      corporateUserId: null
    },
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: true,
  },

  getCorporatePlans: {
    url: 'consumer/property/getCorporatePlans',
    method: 'GET',
    data: {},
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: true,
  },

  getKitHubList: {
    url: "/smartlock/smartlock/getKitListbyPropertyId/:propertyId",
    method: "GET",
    data: {},
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: true,
  },

  getKitDevices: {
    url: "/smartlock/smartlock/getKItDeviceData/:kitid",
    method: "GET",
    data: {},
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: true,
  },

  editKitDetails: {
    url: "/smartlock/smartlock/editKitDetails",
    method: "PUT",
    data: {},
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: true,
  },
  
// },

   // BuilderProject Service Requests
   addBuilderProject: {
      url: "/admin/builderProject/addBuilderProject",
      method: "POST",
      data: {
         addProjectBuildingRequest: [],
         amenities: "",
         builderName: "",
         builtUpArea: "",
         city: "",
         description: "",
         externalLink: "",
         locality: "",
         openSpace: "",
         plotArea: "",
         postedById: "",
         proposedBuiltUpArea: "",
         reraId: "",
         societyName: "",
         street: "",
         towerCount: "",
         imageUrl: "",
      },
   },
   getAllBuilderProjects: {
      url: "admin/builderProject/getAllBuilderProjects?records=:records&pageNumber=:pageNumber",
      method: "GET",
   },
      // Admin Builder Project API calling data.
      getAdminBuilderProject: {
          url: "/admin/builderProject/getListedBuilders",
          method: "POST",
          data: {
             userId: "",
             location: "",
          },
       },
    
       getAdminBuilderProjectById: {
          url: "/admin/builderProject/get/id",
          method: "POST",
          data: {
             userId: "",
             id: "",
          },
       },
    
       getAdminBuilderProjectDetailById: {
          url: "/admin/builderProject/get/id/:userId/:builderProjectId",
          method: "GET",
       },
          //Builder login
     Builderlogin: {
      url: "/userauth/oauth/token?username=:mobile&password=:password&loginBy=otp&grant_type=password&deviceId=kdfjh&deviceType=android&appName=builder web&version=2.7.1+82",
      method: "POST",
      data: {},
      headers: {
         "Content-Type": "application/json",
      },
      showResultMessage: false,
      showErrorMessage: true,
   },
  
   BuildergetOtp: {
      url: "/userauth/public/sendLoginOtp?mobile=:mobile&appName=builder web",
      method: "POST",
      data: {},
      headers: {
         "Content-Type": "application/json",
      },
      showResultMessage: false,
      showErrorMessage: true,
   },
  
   // apiJson.js
   BuilderSignup: {
      url: "/consumer/user/verifyUser/:mobile/:otp/22?deviceId=4343&deviceType=crome&appName=builder web&version=2.7.1+82",
      method: "POST",
      data: {},
      headers: {
         "Content-Type": "application/json",
      },
      showResultMessage: false,
      showErrorMessage: true,
   },
   getBuilderById: {
      url: "/consumer/builder/getBuilderById/:builderId/:userId/",
      method: "GET",
      data: {
         builderLogoS3ImageUrl: "",
      },
      headers: {
         "Content-Type": "application/json",
      },
      showResultMessage: false,
      showErrorMessage: true,
   },
   createBuilderProfileDetail: {
      url: "/consumer/builder/createBuilderProfile/",
      method: "PUT",
      data: {
         mobile: "",
         companyName: "",
         brandName: "",
         companyAddress: "",
         companyEmail: "",
         companyGst: "",
         builderLogoS3ImageUrl: "",
         builderLogoImageAsBase64: "",
         builderCoinbalance: 0.0,
         directors: [],
         companyFacebookUrl: "",
         companyInstagramUrl: "",
         whatsappNumber: "",
         callNumber: "",
         contactPersonName: "",
         builderProfileComplete: false,
      },
      headers: {
         "Content-Type": "application/json",
      },
      showResultMessage: false,
      showErrorMessage: true,
   },
   getBuilderProjects: {
      url: "/consumer/builder/getBuilderProjects/",
      method: "POST",
      data: {
         builderId: "",
         searchString: "",
         userId: "",
         records: "",
         pageNumber: "",
      },
      headers: {
         "Content-Type": "application/json",
      },
      showResultMessage: false,
      showErrorMessage: true,
   },
   getBuilderProjectStats: {
      url: "/consumer/builder/getBuilderProjectStats/",
      method: "POST",
      data: {
         builderId: null,
         searchString: null,
         userId: null,
         records: null,
         pageNumber: null,
      },
      headers: {
         "Content-Type": "application/json",
      },
      showResultMessage: false,
      showErrorMessage: true,
   },
   getBuilderProjectSubPosts: {
      url: "/consumer/builder/getBuilderProjectSubPosts/",
      method: "POST",
      data: {
         builderProjectId: null,
         searchString: "",
         userId: null,
         records: null,
         pageNumber: null,
      },
      headers: {
         "Content-Type": "application/json",
      },
      showResultMessage: false,
      showErrorMessage: true,
   },
   getBuilderProjectSubPostsStats: {
      url: "/consumer/builder/getBuilderProjectSubPostsStats/",
      method: "POST",
      data: {
         builderId: null,
         searchString: null,
         userId: null,
         records: null,
         pageNumber: null,
      },
      headers: {
         "Content-Type": "application/json",
      },
      showResultMessage: false,
      showErrorMessage: true,
   },
   getBuilderProjectById: {
      url: "/consumer/builder/getBuilderProjectById/:builderProjectId/:userId/",
      method: "GET",
      data: {},
      headers: {
         Accept: "*/*",
         "Content-Type": "application/json",
      },
      showResultMessage: false,
      showErrorMessage: false,
   },
   createBuilderProject: {
      url: "/consumer/builder/addBuilderProject/",
      method: "PUT",
      data: {
         builderProjectId: null,
         userId: null,
         builderId: null,
         builderProjectName: "",
         totalTowersPlanned: null,
         landArea: null,
         landAreaMeasurementUnitEnteredByUser: "",
         areaToDevelop: null,
         areaToDevelopMeasurementUnitEnteredByUser: "",
         openAreaPercent: null,
         possessionFrom: "",
         possessionTo: "",
         projectDescription: "",
         latitude: 0,
         longitude: 0,
         builderProjectGeneralAmenities: [],
         city: "",
         state: "",
         locality: "",
         country: null,
         cityLat: 0,
         cityLong: 0,
         builderProjectImages: [],
         builderProjectVideos: [],
      },
      headers: {
         "Content-Type": "application/json",
      },
      showResultMessage: false,
      showErrorMessage: true,
   },
   addBuilderProjectSubPost: {
      url: "/consumer/builder/addBuilderProjectSubPost/",
      method: "PUT",
      data: {
         builderProjectSubPostId: null,
         builderProjectId: null,
         subPostType: "",
         userId: null,
         builderProjectSubPostName: "",
         reraNumber: "",
         areaToDevelop: null,
         areaToDevelopMeasurementUnitEnteredByUser: "",
         highlightsOrUsp: "",
         contactPersonName: "",
         contactPersonNumber: "",
         possessionFrom: "",
         possessionTo: "",
         totalFloors: null,
         unitsPerFloor: null,
         builderProjectSubPostInfo: [],
         builderProjectSubPostProperties: [],
         builderProjectSubPostVideos: [],
  
         builderProjectSubPostImages: [],
      },
      headers: {
         "Content-Type": "application/json",
      },
      showResultMessage: false,
      showErrorMessage: true,
   },
   getBuilderProjectSubPostById: {
      url: "/consumer/builder/getBuilderProjectSubPostById/:builderProjectSubPostId/:userId/",
      method: "GET",
      data: {},
      headers: {
         "Content-Type": "application/json",
      },
      showResultMessage: false,
      showErrorMessage: true,
   },
   approveBuilderProfile: {
      url: "/consumer/builder/approveBuilderProfile/:builderId/:userId/",
      method: "POST",
      data: {},
      headers: {
         Accept: "*/*",
         "Content-Type": "application/json",
      },
      showResultMessage: false,
      showErrorMessage: false,
   },
   approveBuilderProject: {
      url: "/consumer/builder/approveBuilderProject/:builderProjectId/:userId/",
      method: "POST",
      data: {},
      headers: {
         Accept: "*/*",
         "Content-Type": "application/json",
      },
      showResultMessage: false,
      showErrorMessage: false,
   },
   deleteBuilderProjectById: {
      url: "/consumer/builder/deleteBuilderProjectById/:builderProjectId/:userId/",
      method: "DELETE",
      data: {},
      headers: {
         Accept: "*/*",
         "Content-Type": "application/json",
      },
      showResultMessage: false,
      showErrorMessage: false,
   },
   deleteBuilderProjectSubPostById: {
      url: "/consumer/builder/deleteBuilderProjectSubPostById/:builderProjectSubPostId/:userId/",
      method: "DELETE",
      data: {},
      headers: {
         Accept: "*/*",
         "Content-Type": "application/json",
      },
      showResultMessage: false,
      showErrorMessage: false,
   },
   getBuilderList: {
      url: "/consumer/builder/getBuilderList/",
      method: "POST",
      data: {
         userId: null,
         builderName: "",
         records: null,
         pageNumber: null,
      },
      headers: {
         "Content-Type": "application/json",
      },
      showResultMessage: false,
      showErrorMessage: true,
   },
   getBuilderStats: {
      url: "/consumer/builder/getBuilderStats/",
      method: "POST",
      data: {
         userId: null,
         builderName: "",
         records: null,
         pageNumber: null,
      },
      headers: {
         "Content-Type": "application/json",
      },
      showResultMessage: false,
      showErrorMessage: true,
   }
};

console.log(userData);
