/** @format */

import { getLocalStorage } from "../helpers/Utils";

const userData = getLocalStorage('authData');

export const ApiJson = {
  login: {
    // url: 'userauth/oauth/token?username=:username&password=:password&roleId=&loginBy=password&grant_type=password&deviceId=4343&deviceType=crome&appName=admin',
    url: '/userauth/oauth/token?username=:username&password=:password&roleId=&loginBy=otp&grant_type=password&deviceId=4343&deviceType=crome&appName=admin',
    method: 'POST',
    data: {},
    headers: {
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: true,
  },

  getOtp: {
    url: '/userauth/public/sendLoginOtp?mobile=:mobile&appName=admin',
    method: 'POST',
    data: {},
    headers: {
      'Content-Type': 'application/json',
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
    url: 'admin/sales/getSocietyLeads?records=:records&pageNumber=:pageNumber',
    method: 'POST',
    data: {
      city: '',
      endDate: '',
      id: '',
      societyName: '',
      startDate: '',
      status: [],
    },
  },
  getSalesTeam: {
    url: 'admin/sales/getSalesTeam?city=:city&records=:records&pageNumber=:pageNumber',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  getSalesCount: {
    url: 'admin/sales/getLeadsCount',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  getLeadsDetail: {
    url: '/admin/sales/getLeadById/:leadId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  // /sales/updateLead
  postComment: {
    url: '/admin/sales/updateLead',
    method: 'PUT',
    data: {
      leadId: '',
      loginId: '',
      review: ''
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  createLead: {
    url: '/admin/sales/createLead',
    method: 'POST',
    data: {
      address: '',
      adminId: 0,
      builtInYear: '',
      clientInterest: '',
      contactNumber: '',
      contactPerson: '',
      leadFor: '',
      leadId: 0,
      noOfProperties: 0,
      proposedCutOff: 0,
      review: '',
      societyName: '',
      source: '',
      city: '',
      zipcode: ''
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  approveLead: {
    url: '/admin/sales/leadApproved/:leadId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  addNewTeamMember: {
    url: '/admin/user/addUser',
    method: 'POST',
    data: {
      city: '',
      dob: '',
      email: '',
      name: '',
      phoneNumber: '',
      position: '',
      profileImageUrl: '',
      userId: '',
      isProfileComplete: true,
      isActive: true,
      alternatePhoneNumber: '',
      businessLocality: '',
      // latitude: '',
      // longitude: '',
      location: []
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  addNewPlan: {
    url: '/consumer/property/saveorupdatePlanDetails',
    method: 'POST',
    data: {
      id: '',
      amount: '',
      planName: '',
      description: '',
      subscriptionMonth: '',
      gstEnable: false,
      gstValue: '',
      termsAndCondition: '',
      active: false,
      refundableAmount: '',
      smartLockPlan: false,
      autoRenewable: false,
      marketingSupport: false,
      leadGeneration: false,
      marketingVideo: false,
      deviceCamera: '',
      deviceDongle: '',
      deviceHub: '',
      deviceSensor: '',
      deviceSmartLock: '',
      renewalCoins: '',
      renewalInterval: '',
      baseRentalCoins: '',
      depositeAmount: '',
      installationCharges: '',
      planHirarchy: '',
      imageLocation: '',
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getAllRoles: {
    url: '/admin/admin/getAllRoles/:rollId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getAllUsers: {
    // url: '/admin/user/getAllUsers?pageNumber=:pageNumber&records=:records&searchByCity=:searchByCity&searchByzipCode=:searchByzipCode',
    url: '/admin/user/getAllUsers',
    method: 'POST',
    data: {
      pageNumber: '',
      records: '',
      searchByCity: '',
      searchByzipCode: '',
      departmentName: '',
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  getAllSociety: {
    url: '/admin/society/getAllSocietyCustom?city=:city&records=:records&pageNumber=:pageNumber',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  getSocietyDetails: {
    url: '/admin/society/getSocietyById/:societyId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  createNewSociety: {
    url: '/admin/society/addSociety',
    method: 'POST',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    data: {
      address: '',
      city: '',
      creatorId: 0,
      latitude: 0,
      leadId: 0,
      listedProperties: 0,
      longitude: 0,
      phoneNumber: '',
      plotSize: '',
      position: 0,
      profileImageUrl: '',
      proposedCutOff: 0,
      societyId: 0,
      societyLogo: '',
      societyName: '',
      societyUser: true,
      userName: '',
      contactNumber: '',
      contactPerson: '',
      builtInYear: '',
      newSocietyName: '',
      descriptions: '',
      bankName: '',
      accountNumber: '',
      panNumber: '',
      newAddress: '',
      zipcode: ''
    },
  },
  getSocietyUsers: {
    url: '/admin/society/getSocietyUser/:societyId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  assignLeadToUser: {
    url: '/admin/sales/assignLeadToUser/:leadId/:userId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getAllConvertedLeadsByUser: {
    url: '/admin/sales/getAllConvertedLeadsByUser/:userId?records=:records&pageNumber=:pageNumber&fromDate=:fromDate&toDate=:toDate',
    method: 'GET',
  },
  getInstallationRequest: {
    //http://103.187.101.53:8751/admin/execution/getInstallationRequest?city=Pune&location=452010
    // url: '/admin/execution/getInstallationRequest?city=:city&zipcode=:zipcode&location=:location&records=:records&pageNumber=:pageNumber',
    url: '/admin/execution/getInstallationRequest',
    method: 'POST',
    data: {
      "city": "",
      "zipcode": "",
      "location": "",
      "pageNo": "",
      "pageSize": ""

    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  // getServiceRequest: {
  //   url: '/admin/execution/getServiceRequest?records=:records&pageNumber=:pageNumber',
  //   method: 'POST',
  //   data: {
  //     // "assignTo":"",
  //     // "status":"",
  //     // "requestSubType":"",
  //     // "requestBy":"",
  //     // "city":"",
  //     // "contactNumber":"",
  //     // "ticketId":0,
  //     // "date":""
  //     status: [],
  //     endDate: '',
  //     city: '',
  //     contactNumber: '',
  //     ticketNumber: '',
  //     startDate: '',
  //   },
  //   headers: {
  //     'Accept': '*/*',
  //     'Content-Type': 'application/json',
  //   },
  //   showResultMessage: false,
  //   showErrorMessage: false,
  // },
  getServiceRequest: {
    url: '/admin/execution/getAllServiceRequest?records=:records&pageNumber=:pageNumber',
    method: 'POST',
    data: {
      // "assignTo":"",
      // "status":"",
      // "requestSubType":"",
      // "requestBy":"",
      // "city":"",
      // "contactNumber":"",
      // "ticketId":0,
      // "date":""
      status: [],
      endDate: '',
      city: '',
      contactNumber: '',
      ticketNumber: '',
      startDate: '',
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  getAllPublishedProperty: {
    url: '/admin/execution/getAllPublishedProperty?city=:city&records=:records&pageNumber=:pageNumber',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  getAllProperties: {
    // url: '/admin/property/getAllProperty?city=:city&userId=:userId&records=:records&pageNumber=:pageNumber&zipCode=:zipCode',
    url: '/admin/property/getAllPropertyCustom',
    method: 'POST',
    data: {
      "userId": "",
      "city": "",
      "location": "",
      "zipcode": "",
      "pageSize": "",
      "pageNo": "",
      "fromDate": null,
      "toDate": null
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  getAllDeletedProperties: {
    // url: '/admin/property/getAllProperty?city=:city&userId=:userId&records=:records&pageNumber=:pageNumber&zipCode=:zipCode',
    url: '/admin/property/getAllDeletedPropertyCustom',
    method: 'POST',
    data: {
      "userId": "",
      "city": "",
      "location": "",
      "zipcode": "",
      "pageSize": "",
      "pageNo": "",

    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  getAllExecutiveTeams: {
    url: '/admin/execution/getAllExecutiveTeams?city=:city',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  // GET /property/getPropertyById/{propertyId}/{userId}
  getPropertyDetails: {
    url: '/consumer/property/getSearchedPropertyById/:propertyId/:userId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  // Delete /property/deleteDocById/{docId}
  deletePropertyImage: {
    url: '/consumer/property/deleteDocById/:docId',
    method: 'DELETE',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  // verify docs of property /admin/property/approveDocumentByAdmin/1/true
  verifyDoc: {
    url: '/admin/property/approveDocumentByAdmin/:docId/true',
    method: 'PUT',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  // unverify docs of property /admin/property/approveDocumentByAdmin/1/false
  unverifyDoc: {
    url: '/admin/property/approveDocumentByAdmin/:docId/false',
    method: 'PUT',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  remoteUnlock: {
    url: 'consumer/visit/smartLockUnlockbyOwner',
    method: 'POST',
    data: {
      'propertyId': null,
      'userId': null,
      'consumer_requested': null
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  remoteOTP: {
    url: 'consumer/visit/remoteOTPbyOwner',
    method: 'POST',
    data: {
      'propertyId': null,
      'userId': null,
      'consumer_requested': null
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  // Delete /property/deleteDocById/{docId}
  deleteSocietyLogo: {
    url: '/admin/society/deleteSocietyLogo/:societyId',
    method: 'PUT',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  // send msg to owner admin/property/sendNotificationToOwner/361/394
  sendMsgToOwner: {
    url: '/admin/property/sendNotificationToOwner',
    method: 'PUT',
    data: {
      id: '',
      loginId: "",
      comments: "",
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  // upload property image /property/savePropertyDocs consumer/property/savePropertyDocs
  addImage: {
    url: '/consumer/property/savePropertyDocs',
    method: 'POST',
    data: {
      propertyId: '',
      propertyDocs: [
        {}
      ],
      propertyImage: [
        {
          docId: '',
          docName: '',
          docURL: ''
        }
      ]
    }
  },

  getPropertyAnalytics: {
    url: '/admin/society/getPropertyAnalytics/:societyId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getAllPropertyDeals: {
    url: '/admin/society/getAllPropertyDeals/:societyId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getAllLeadsBySociety: {
    url: '/admin/society/getAllLeadsBySociety/:societyId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getAllPropertyBySocietyId: {
    url: '/admin/society/getAllPropertyBySocietyId?societyId=:societyId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  saveSocietyLogo: {
    url: '/admin/society/saveSocietyLogo',
    method: 'PUT',
    data: {
      "societyId": "",
      "societyLogo": ""
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  editUser: {
    url: '/admin/user/editUser',
    method: 'PUT',
    data: {
      active: true,
      city: '',
      dob: '',
      email: '',
      name: '',
      phoneNumber: '',
      position: '',
      profileComplete: true,
      profileImageUrl: '',
      userId: '',
      alternatePhoneNumber: '',
      location: [],
      businessLocality: '',
      // latitude: '',
      // longitude: '',
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  blockUser: {
    url: '/admin/user/blockUser/:userId?startDate=:startDate&endDate=:endDate',
    method: 'PUT',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  blockUser: {
    url: '/admin/user/blockUser/:userId?startDate=:startDate&endDate=:endDate',
    method: 'PUT',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  //activateDeactivateUser
  //http://localhost:8759/admin/user/activateDeactivateUser/124?isActive=true%27
  activateDeactivateUser: {
    url: '/admin/user/activateDeactivateUser/:userId?isActive=:activateDeactivateuser',
    method: 'PUT',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getUserByCityAndDept: {
    url: '/admin/user/getUserByCityAndDept?city=:city&departments=:departments',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getCityAndDept: {
    url: '/admin/user/getCityAndDept',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getPlansForAdmin: {
    url: '/consumer/property/getPlansForAdmin',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getNonSDProperties: {
    url: '/admin/property/getnonSmartlockProperties',
    method: 'POST',
    data: {
      "userId": "",
      "city": "",
      "location": "",
      "zipcode": "",
      "pageSize": "",
      "pageNo": "",
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  getPropertyAnalyticsByPropertyId: {
    url: '/admin/property/getPropertyAnalytics/:propertyId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  getPropertyCity: {
    url: '/admin/property/getPropertyCity',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  getSocietyLeadsCity: {
    url: '/admin/sales/getSocietyLeadsCity',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getInstallationRequestCity: {
    url: '/admin/execution/getInstallationRequestCity',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getSalesTeamCity: {
    url: '/admin/sales/getSalesTeamCity',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },


  getAllPublishedPropertyCity: {
    url: '/admin/execution/getAllPublishedPropertyCity',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getAllExecutiveTeamsCity: {
    url: '/admin/execution/getAllExecutiveTeamsCity',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getServiceRequestCity: {
    url: '/admin/execution/getServiceRequestCity',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getAllSocietyCity: {
    url: '/admin/society/getAllSocietyCity',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getExecutionDashboardCount: {
    url: 'admin/execution/getExecutionDashboardCount',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  approveProperty: {
    url: '/admin/execution/approveProperty/:propertyId',
    method: 'PUT',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  disableSociety: {
    url: '/admin/society/disableSociety/:societyId',
    method: 'PUT',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  getAllConsumerUsers: {
    url: '/admin/consumer/getAllUsers?city=:city&records=:records&pageNumber=:pageNumber',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getAllConsumers: {
    url: '/admin/user/getAllUserDetails',
    method: 'POST',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getUpcomingVisits: {
    url: '/consumer/visit/UpcomingVisits/:userId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getVisitRequests: {
    url: '/consumer/visit/getVisitReqHistory/:userId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  allNotification: {
    url: '/consumer/notification/:userId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getConsumerPropertyByUserId: {
    url: '/admin/consumer/getPropertyByUserId/:userId?records=:records&pageNumber=:pageNumber',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  // http://localhost:8759/admin/finance/refund/transactions
  getConsumerTransactionsByUserId: {
    url: '/admin/finance/refund/transactions',
    method: 'POST',
    data: {
      userId: ''
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  // http://103.187.101.53:8751/admin/finance/transactions/invoice/
  financeInvoice: {
    url: '/admin/finance/transactions/invoice/:transactionId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  // GET /property/mailInvoice/{transactionId}
  emailInvoice: {
    url: '/consumer/property/mailInvoice/:transactionId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  // /finance/getBuybackRequests
  getBuybackRequests: {
    url: '/admin/finance/getBuybackRequests',
    method: 'POST',
    data: {
      // "id": 0,
      "pageNo": '',
      "pageSize": '',
      // "userId": ''      
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  blockConsumerUser: {
    url: 'admin/consumer/blockUser/:userId',
    method: 'PUT',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  getAllServiceRequest: {
    url: '/admin/consumer/getAllPreviousServiceRequest/:userId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  // for consumer details
  getConsumerDetails: {
    url: '/admin/consumer/getConsumerDetails/:userId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  giftCoinsToConsumer: {
    url: '/admin/consumer/addSDcoinsToConsumer/:consumerId/:coins',
    method: 'PUT',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  //http://103.187.101.53:8751/admin/finance/getUserDetailById/305/67
  getConsumerDetailsFinance: {
    url: '/admin/finance/getUserDetailById/:userId/:transactionId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  // refund request detail page api
  refundRequestDetail: {
    url: '/admin/finance/buyback/details/:buybackRequestId',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  // refund request detail page comment api

  refundRequestDetailComment: {
    url: '/admin/finance/addComment',
    method: 'PUT',
    data: {
      comments: '',
      id: '',
      loginId: ''
    },
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getUserDetailById: {
    url: '/admin/user/getUserDetailById/:userId',
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getPlanDetailsById: {
    url: '/consumer/property/getsingleplandetail/:planId',
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getAllExecutionCompletedTask: {
    url: '/admin/execution/getAllCompletedTask/:userId?fromDate=:fromDate&toDate=:toDate',
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getAllExecutionTask: {
    url: '/admin/execution/getAllTask/:userId?fromDate=:fromDate&toDate=:toDate',
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  getTaskDetail: {
    url: '/admin/execution/getTaskDetail/:taskId',
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  getExecutiveCalendar: {
    url: '/admin/execution/getExecutiveCalendar?weekStartDate=:weekStartDate&weekEndDate=:weekEndDate&cityId=:city',
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },
  changeAssignee: {
    url: '/admin/execution/changeAssignee',
    method: 'PUT',
    data: {
      userRequestId: '',
      executivePersonId: '',
      timeSlot: '',
      userRequestDate: '',
      city: '',
    },
  },
  // consumer/property/rePublishProperty/{propertyId}
  republish: {
    url: '/consumer/property/rePublishProperty/:id',
    method: 'PUT',
    data: {
      id: '',
    },
  },
  changeDepartmentAssignee: {
    url: '/admin/helpdesk/assignTeam/:serviceRequestId?teamName=:teamName',
    method: 'PUT',
    data: {},
  },
  closeSalesLead: {
    url: '/admin/sales/closeLead/:leadId',
    method: 'PUT',
    data: {},
  },
  getAllFilters: {
    url: '/admin/property/getAllFilters',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getAllFiltersForNewPost: {
    url: '/consumer/property/getAllFilters',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getInstallationCity: {
    url: '/consumer/property/getAllInstallationTeamsCity',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getSocietyByCity: {
    url: '/admin/property/getSocietyByCity?city=:city&societyString=:societyString',
    method: 'GET',
    data: {},
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
  },

  // Execution Team API Services
  getIntallationRequestSlots: {
    url: '/admin/execution/getIntallationRequestSlots',
    method: 'POST',
    data: {
      city: '',
      propertyId: '',
      slotDate: '',
    },
  },
  getExecutiveList: {
    // city=:city&date=:date&timeSlot=:timeSlot
    url: 'admin/execution/getExecutiveList?date=:date&timeSlot=:timeSlot&userRequestId=:userRequestId',
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  getInstallationExecutiveList: {
    // city=:city&date=:date&timeSlot=:timeSlot
    url: '/admin/execution/getInstallationExecutiveList/:requestId',
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    showResultMessage: false,
    showErrorMessage: false,
  },

  // /execution/changeAssignee

  //Property module api's
  createNewProperty: {
    url: '/admin/property/addPropertyDetails',
    method: 'POST',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    data: {
      addPropertyMoreInfoRequest: {
        amenities: '',
        constructionSize: '',
        enteranceFacing: '',
        investmentOpportunity: true,
        loanAvailable: true,
        loanFromBank: '',
        majorityComposition: '',
        oldRate: '',
        propertyDescription: '',
        propertyFurnishing: '',
        religiousPlace: '',
        security: '',
        storeDistance: '',
      },
      postedById: '',
      propertyAddressRequest: {
        address: '',
        locality: '',
        buildingProjectSociety: '',
        city: '',
        cityLat: 0,
        cityLong: 0,
        floorNumber: '',
        houseNumber: '',
        totalFloor: '',
        latitude: '',
        longitude: '',
        societyId: '',
      },
      propertyBasicDetailRequest: {
        attachedOpenAreaOrGarden: '',
        attachedOpenTerraceArea: '',
        balcony: '',
        bedRooms: '',
        carpetArea: '',
        coveredParking: '',
        furnishedText: '',
        hall: '',
        kitchen: '',
        noOfUnits: '',
        maintenanceCost: '',
        numberOfBath: '',
        openParking: '',
        propertyAge: '',
        propertyCategory: '',
        propertyRate: '',
        propertySubType: '',
        propertyType: '',
        type: '',
      },
      propertyDocsRequest: {},
      propertyId: '',
      roleId: '',
    },
  },

  // BuilderProject Service Requests
  addBuilderProject: {
    url: '/admin/builderProject/addBuilderProject',
    method: 'POST',
    data: {
      addProjectBuildingRequest: [],
      amenities: '',
      builderName: '',
      builtUpArea: '',
      city: '',
      description: '',
      externalLink: '',
      locality: '',
      openSpace: '',
      plotArea: '',
      postedById: '',
      proposedBuiltUpArea: '',
      reraId: '',
      societyName: '',
      street: '',
      towerCount: '',
      imageUrl: '',
    },
  },

  //Add New City Using pinCode
  addNewCity: {
    url: '/admin/dom/savelocations',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {}
  },

  getAllBuilderProjects: {
    url: 'admin/builderProject/getAllBuilderProjects?records=:records&pageNumber=:pageNumber',
    method: 'GET',
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


  // Admin Builder Project API calling data.
  getAdminBuilderProject: {
    url: '/admin/builderProject/getListedBuilders',
    method: 'POST',
    data: {
      'userId': '',
      'location': ''
    }
  },

  getAdminBuilderProjectById: {
    url: '/admin/builderProject/get/id',
    method: 'POST',
    data: {
      'userId': '',
      'id': ''
    }
  },

  getAdminBuilderProjectDetailById: {
    url: '/admin/builderProject/get/id/:userId/:builderProjectId',
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
    data: { },
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
    data: { },
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    showResultMessage: false,
    showErrorMessage: true,
  }
};
console.log(userData)








