/** @format */

import React from 'react';

// Lazy import of Dashboard's components
const SalesDashboard = React.lazy(() => import('./SalesModule/SalesDashboard'));
const NewEntry = React.lazy(() => import('./SalesModule/NewEntry/NewEntry'));
const LeadDetails = React.lazy(() => import('./SalesModule/LeadDetails/LeadDetails'));
const NewTeamMember = React.lazy(() => import('./NewTeamMember/NewTeamMember'));
const UserManagement = React.lazy(() => import('./UserManagement/UserManagement'));
const SocietiesModule = React.lazy(() => import('./SocietiesModule/SocietiesMainModule'));
const SocietiesDetails = React.lazy(() => import('./SocietiesModule/SocietiesDetails'));
const NewSociety = React.lazy(() => import('./SocietiesModule/NewSociety'));
const ExecutionDashboard = React.lazy(() => import('./ExecutionDashboard/ExecutionDashboard'));
const ExecutionListingPage = React.lazy(() => import('./ExecutionDashboard/ExecutionListingPage/ExecutionListingPage'));
const EditTeamMember = React.lazy(() => import('./EditTeamMember/EditTeamMember'));
const PropertyModule = React.lazy(() => import('./PropertyModule/ConsumerProperty/Property'));
const PropertyDetailsModule = React.lazy(() => import('./PropertyModule/propertDetails'));
const PropertyDocModule = React.lazy(() => import('./PropertyModule/PropertyDoc'));
const DeletedProperties = React.lazy(() => import('./PropertyModule/DeletedProperties/DelUnlistedProperties'))
const PropertyDevice = React.lazy(() => import('./PropertyModule/PropertyDevices/PropertyDevice'))
const EditPost1 = React.lazy(() => import('./PropertyModule/EditPropertyDetails/EditPost1'))
const EditPost2 = React.lazy(() => import('./PropertyModule/EditPropertyDetails/EditPost2'))
const EditPost3 = React.lazy(() => import('./PropertyModule/EditPropertyDetails/EditPost3'))
const EditPost4 = React.lazy(() => import('./PropertyModule/EditPropertyDetails/EditPost4'))
const AddNewCity = React.lazy(()=> import('./AddNewCity/AddCity'));
const ManagePlan = React.lazy(() => import('./ManagePlan/ManagePlan'));
const AddNewPlan = React.lazy(() => import('./AddNewPlan/NewPlan'));
const NonSDProperties = React.lazy(() => import('./NonSdProperties/NonSDProperties'));
const Advisors = React.lazy(() => import('./Advisors/Advisors'))
const AddNewPost = React.lazy(() => import('./AddNewPost/AddNewPost'))
const AddNewPost2 = React.lazy(() => import('./AddNewPost/AddNewPost2'));
const AddNewPost3 = React.lazy(() => import('./AddNewPost/AddNewPost3'));
const AddNewPost4 = React.lazy(() => import('./AddNewPost/AddNewPost4'));
const AddNewPost5 = React.lazy(() => import('./AddNewPost/AddNewPost5'));

const InstallationCalenderView = React.lazy(() =>
  import('./ExecutionDashboard/InstallationCalender/InstallationCalender'),
);
const ConsumerManagementDetails = React.lazy(() =>
  import('./ConsumerManagementModule/ConsumerDetails/ConsumerDetails'),
);
const ConsumerManagementModule = React.lazy(() =>
  import('./ConsumerManagementModule/ConsumerManagement'),
);
const ExecutionPropertyDetail = React.lazy(() =>
  import('./ExecutionDashboard/PropertyDetail/PropertyDetail'),
);
const NewProperty = React.lazy(() => import('./PropertyModule/NewConsumerProperty/NewProperty'));
const EditProperty = React.lazy(() => import('./PropertyModule/EditConsumerProperty/EditProperty'));
// const BuilderProperty = React.lazy(() =>
//   import('./PropertyModule/BuilderProperty/BuilderProperty'),
// );
const BuilderPropertyListing = React.lazy(() =>
  import('./BuilderProject/BuilderProjectListing/BuilderProjectListing'),
);
const HelpdeskDashboard = React.lazy(() => import('./HelpDeskDashboard/HelpDeskDashboard'));
const HelpdeskServiceRequestDetails = React.lazy(() =>
  import('./HelpDeskDashboard/ServiceRequestDetails/ServiceRequestDetails'),
);
const HelpDeskListingPage = React.lazy(() =>
  import('./HelpDeskDashboard/HelpDeskListing/HelpDeskListing'),
);
const FinanceRefundRequestDetails = React.lazy(() =>
import('./FinanceModule/FinanceRefundRequestDetails/FinanceRefundRequestDetails'),
);
const ServiceRequest = React.lazy(() =>
  import('./HelpDeskDashboard/ServiceRequest/ServiceRequest'),
);
const CreateTicket = React.lazy(() => import('./HelpDeskDashboard/CreateTicket/CreateTicket'));
const SocietyLeads = React.lazy(() => import('./SalesModule/SocietyLeads/SocietyLeads'));

const BuilderProjectView = React.lazy(() =>
  import('./BuilderProject/BuilderProjectView/BuilderProjectView'),
);
const BuilderProjectEdit = React.lazy(() =>
  import('./BuilderProject/BuilderProjectEdit/BuilderProjectEdit'),
);
const FinanceDashboard = React.lazy(() => import('./FinanceModule/FinanceDashboard'));
const FinanceListingPage = React.lazy(() => import('./FinanceModule/FinanceListingPage/FinanceListingPage'));
const FinanceRefundRequest = React.lazy(() => import('./FinanceModule/FinanceRefundRequest/FinanceRefundRequest'));
// const FinanceRefunds = React.lazy(() => import('./FinanceModule/FinanceRefunds/FinanceRefunds'));
const FinanceInvoice = React.lazy(() => import('./FinanceModule/FinanceInvoice/FinanceInvoice'));

const RealtorManagement = React.lazy(() => import('./RealtorManagement/RealtorManagement'));
const RealtorManagementDetails = React.lazy(() =>
  import('./RealtorManagement/RealtorDetails/RealtorDetails'),
);
const RealtorReviews = React.lazy(() =>
  import('./RealtorManagement/RealtorRatings/RealtorRatings'),
);
const TransactionDashboard = React.lazy(() => import('./TransactionDashboard/Transaction'));
const TransactionDetailsPage = React.lazy(() => import('./TransactionDashboard/TranscationDetails/TransactionDetails'));
const TransactionListingPage = React.lazy(() => import('./TransactionDashboard/TransactionListing/TransactionListing'));
const DealApprovalDetailPage = React.lazy(()=> import('./TransactionDashboard/DealApproval/DealApproval'))


// Routing data
const routeData = [
  // Sales Management Route
  // /admin/helpdesk/serviceRequest
  {
    path: '/admin/sales/sales-lead/consumer/property/property-documents',
    name: 'Society Sales Team Dashboard',
    bradcrumb: [  'Society Leads', 'Lead Details', 'Consumer', 'Property Details', 'Property Documents' ],
    excat: true,
    module: 'EXECUTION SALES LEAD',
    component: PropertyDocModule,
  },
  {
    path: '/admin/sales/sales-lead/consumer/property-details',
    name: 'Society Sales Team Dashboard',
    bradcrumb: [  'Society Leads', 'Lead Details', 'Consumer', 'Property Details' ],
    excat: true,
    module: 'EXECUTION SALES LEAD',
    component: PropertyDetailsModule,
  },
  {
    path: '/admin/sales/society-leads',
    name: 'Society Sales Team Dashboard',
    bradcrumb: [ '< Society Sales Team Dashboard' ],
    excat: true,
    module: 'SALES',
    component: SocietyLeads,
  },
  {
    path: '/admin/sales/lead-details/enroll-new-society',
    name: 'Society Sales Team Dashboard',
    bradcrumb: [ 'Society Leads', 'Lead Details' , 'Enroll New Society'],
    excat: true,
    // module: 'SALES',
    module: 'EXECUTION SALES LEAD',
    component: NewSociety,
  },
  {
    path: '/admin/sales/lead-details',
    name: 'Society Sales Team Dashboard',
    bradcrumb: [ 'Society Leads', 'Lead Details' ],
    excat: true,
    // module: 'SALES',
    module: 'EXECUTION SALES LEAD',
    component: LeadDetails,
  },
  {
    path: '/admin/sales/sales-lead/consumer-details/:consumerId',
    name: 'Society Sales Team Dashboard',
    bradcrumb: [ 'Society Leads', 'Lead Details', 'Consumer Details' ],
    excat: true,
    module: 'EXECUTION',
    component: ConsumerManagementDetails,
  },
  {
    path: '/admin/sales/new-entry',
    name: 'Society Sales Team Dashboard',
    bradcrumb: [ 'Society Leads', 'New Entry' ],
    excat: true,
    module: 'SALES',
    component: NewEntry,
  },
  {
    path: '/admin/sales/add-member',
    name: 'Society Sales Team Dashboard',
    bradcrumb: [ 'Society Leads', 'New Entry' ],
    excat: true,
    title: { formTitle: 'New Team Member', buttonText: 'Add Team Member' },
    module: 'SALES',
    component: NewTeamMember,
  },
  {
    path: '/admin/sales',
    name: 'Society Sales Team Dashboard',
    bradcrumb: false,
    excat: true,
    component: SalesDashboard,
  },

  // User Management Route
  {
    path: '/admin/user-management/add-new-member',
    name: 'User Management',
    bradcrumb: [ 'Team Members', 'Add New User' ],
    excat: true,
    title: { formTitle: 'Add New User', buttonText: 'Save' },
    module: 'USER',
    buttonText: 'Save',
    component: NewTeamMember,
  },
  {
    path: '/admin/manage-plan/add-new-plan',
    name: 'Manage Plans',
    bradcrumb: [ 'Existing Plans', 'Plan' ],
    excat: true,
    title: { formTitle: 'Add New Plan', buttonText: 'Save' },
    module: 'USER',
    buttonText: 'Save',
    component: AddNewPlan,
  },
  {
    path: '/admin/user-management/edit-member',
    name: 'User Management',
    bradcrumb: [ 'Team Members', 'Edit User' ],
    excat: true,
    title: { formTitle: 'Edit User', buttonText: 'Save' },
    module: 'USER',
    buttonText: 'Save',
    component: EditTeamMember,
  },
  {
    path: '/admin/user-management',
    name: 'User Management',
    bradcrumb: false,
    excat: true,
    module: 'USER',
    component: UserManagement,
  },

  // Societies Management Route
  {
    path: '/admin/societies/property-details',
    name: 'Societies',
    bradcrumb: [ 'Societies', 'Society Details','Property Details' ],
    excat: true,
    module: 'SOCIETY',
    component: PropertyDetailsModule,
  },
  {
    path: '/admin/societies/details',
    name: 'Societies',
    bradcrumb: [ 'Societies', 'Society Details' ],
    excat: true,
    module: 'SOCIETY',
    component: SocietiesDetails,
  },
  {
    path: '/admin/societies/new-societies',
    name: 'Societies',
    bradcrumb: [ 'Societies Enlisted', 'New Entry' ],
    excat: true,
    module: 'SOCIETY',
    component: NewSociety,
  },
  {
    path: '/admin/societies',
    name: 'Societies',
    bradcrumb: false,
    excat: true,
    module: 'SOCIETY',
    component: SocietiesModule,
  },

  // Excuation Module Route -- Installation Requests
  {
    path: '/admin/execution/installation-requests',
    name: 'Installation Team Dashboard',
    bradcrumb: [ '< Installation Team Dashboard' ],
    excat: true,
    module: 'EXECUTION',
    tabName:"Installation/Un-installation Requests",
    component: ExecutionListingPage,
  },
  {
    path: '/admin/execution/published-property/property-details',
    name: 'Installation Team Dashboard',
    bradcrumb: [  'Published Property','Property Details' ],
    excat: true,
    module: 'EXECUTION',
    component: PropertyDetailsModule,
  },

  //Excuation Module -- Published Property
  {
    path: '/admin/execution/published-property',
    name: 'Installation Team Dashboard',
    bradcrumb: [ '< Installation Team Dashboard' ],
    excat: true,
    module: 'EXECUTION',
    tabName:"Published Property",
    component: ExecutionListingPage,
  }, 
  // { "path": "/admin/execution/user-detail", name:"Execution Team Dashboard", bradcrumb: false, tabName: ["Tasks", "Completed"], excat:true, module: "EXECUTION", component: UserDetailsModal  },
  {
    path: '/admin/execution/installation-calender',
    name: 'Installation Team Dashboard',
    bradcrumb: [  'Installation Requests' , 'Assign Executive' ],
    excat: true,
    module: 'EXECUTION',
    component: InstallationCalenderView,
  },
  {
    path: '/admin/execution/installation-detail/property-details',
    name: 'Installation Team Dashboard',
    bradcrumb: [  'Installation Requests' , 'Task Details', 'Property Details' ],
    excat: true,
    module: 'EXECUTION',
    component: PropertyDetailsModule,
  },
  {
    path: '/admin/execution/installation-detail/consumer/property-details',
    name: 'Installation Team Dashboard',
    bradcrumb: [  'Installation Requests','Task Details', 'Consumer','Property Details' ],
    excat: true,
    module: 'EXECUTION INSTALLATION REQUESTS',
    component: PropertyDetailsModule,
  },
  {
    path: '/admin/execution/installation-detail/consumer-details/:consumerId',
    name: 'Installation Team Dashboard',
    bradcrumb: [  'Installation Requests','Task Details', 'Consumer Details' ],
    excat: true,
    module: 'EXECUTION INSTALLATION REQUESTS',
    component: ConsumerManagementDetails,
  },
  {
    path: '/admin/execution/installation-detail',
    name: 'Installation Team Dashboard',
    bradcrumb: [  'Installation Requests','Task Details' ],
    excat: true,
    module: 'EXECUTION',
    component: ExecutionPropertyDetail,
  },
  {
    path: '/admin/execution/serviceRequest/consumer/property-details',
    name: 'Installation Team Dashboard',
    bradcrumb: [  'Service Requests','Service Request Details', 'Consumer','Property Details' ],
    excat: true,
    module: 'EXECUTION SERVICE REQUESTS',
    component: PropertyDetailsModule,
  },
  {
    path: '/admin/execution/serviceRequest/consumer-details/:consumerId',
    name: 'Installation Team Dashboard',
    bradcrumb: [  'Service Requests','Service Request Details', 'Consumer Details' ],
    excat: true,
    module: 'EXECUTION SERVICE REQUESTS',
    component: ConsumerManagementDetails,
  },
  {
    path: '/admin/execution/serviceRequest-details/:serviceRequestId',
    name: 'Installation Team Dashboard',
    bradcrumb: [  'Service Requests',  'Service Request Details' ],
    excat: true,
    module: 'EXECUTION',
    component: HelpdeskServiceRequestDetails,
  },
  {
    path: '/admin/execution/serviceRequest',
    name: 'Installation Team Dashboard',
    bradcrumb: [  '< Installation Team Dashboard' ],
    excat: true,
    module: 'EXECUTION',
    component: ServiceRequest,
  },
  {
    path: '/admin/execution',
    name: 'Installation Team Dashboard',
    bradcrumb: false,
    excat: true,
    module: 'EXECUTION',
    component: ExecutionDashboard,
  },

  // Property module
  {
    path: '/admin/property/property-details',
    name: 'Properties',
    bradcrumb: [ 'Property Listed', 'Property Details' ],
    excat: true,
    module: 'EXECUTION',
    component: PropertyDetailsModule,
  },
  {
    path: '/admin/property/property-documents',
    name: 'Properties',
    bradcrumb: [ 'Property Listed', 'Property Documents' ],
    headerButton: 'Back',
    excat: true,
    module: 'EXECUTION',
    component: PropertyDocModule,
  },
  {
    path: '/admin/property/property-devices',
    name: 'Properties',
    bradcrumb: [ 'Property Listed', 'Property Devices' ],
    headerButton: 'Back',
    excat: true,
    module: 'EXECUTION',
    component: PropertyDevice,
  },
  {
    path: '/admin/property/new-property',
    name: 'Properties',
    bradcrumb: [ 'Property Listed', 'New Property' ],
    excat: true,
    module: 'EXECUTION',
    component: NewProperty,
  },
  {
    path: '/admin/property/edit-property',
    name: 'Properties',
    bradcrumb: [ 'Property Listed', 'Edit Property' ],
    excat: true,
    module: 'EXECUTION',
    component: EditProperty,
  },
  {
    path: '/admin/property/edit-basic-details',
    name: 'Edit Basic Details',
    bradcrumb: [ 'Property Listed', 'Edit Property' ],
    excat: true,
    module: 'EXECUTION',
    component: EditPost1,
  },
  {
    path: '/admin/property/edit-address-details',
    name: 'Edit Address Details',
    bradcrumb: [ 'Property Listed', 'Edit Property' ],
    excat: true,
    module: 'EXECUTION',
    component: EditPost2,
  },
  {
    path: '/admin/property/upload-property-image',
    name: 'Upload Property Images',
    bradcrumb: [ 'Property Listed', 'Edit Property' ],
    excat: true,
    module: 'EXECUTION',
    component: EditPost3,
  },
  {
    path: '/admin/property/edit-more-info',
    name: 'Edit Info',
    bradcrumb: [ 'Property Listed', 'Edit Property' ],
    excat: true,  
    module: 'EXECUTION',
    component: EditPost4,
  },
  {
    path: '/admin/deleted-unlisted-property/view-property',
    name: 'Properties',
    bradcrumb: [ 'Property Listed', 'Edit Property' ],
    excat: true,
    module: 'EXECUTION',
    component: PropertyDetailsModule,
  },
  {
    path: '/admin/property',
    name: 'Listed Properties',
    bradcrumb: false,
    excat: true,
    module: 'EXECUTION',
    component: PropertyModule,
  },
  {
    path: '/admin/deleted-unlisted-property',
    name: 'Deleted/ Unlisted Properties',
    bradcrumb: false,
    excat: true,
    module: 'EXECUTION',
    component: DeletedProperties,
  },

  // Builder property
  {
    path: '/admin/builder-project/details/:builderProjectId',
    name: 'Builder Project',
    bradcrumb: [ 'Builder Projects', 'Project Details' ],
    excat: true,
    module: 'BUILDER PROJECT',
    component: BuilderProjectView,
  },
  {
    path: '/admin/builder-project/edit',
    name: 'Builder Projects',
    bradcrumb: [ 'Builder Project', 'Project Details', "Edit Details" ],
    excat: true,
    module: 'BUILDER-PROPERTY',
    component: BuilderProjectEdit,
  },
  {
    path: '/admin/builder-project',
    name: 'Builder Project',
    excat: true,
    module: 'BUILDER-PROPERTY',
    component: BuilderPropertyListing,
  },

  // Consumer Management
  {
    path: '/admin/consumer-management/consumer-details/property-details',
    name: 'Consumer Management',
    bradcrumb: [ 'Consumers', 'Consumer Details','Property Details' ],
    excat: true,
    module: 'CONSUMER',
    component: PropertyDetailsModule,
  },
  {
    path: '/admin/consumer-management/consumer-details/:consumerId',
    name: 'Consumer Management',
    bradcrumb: [ 'Consumers', 'Consumer Details' ],
    excat: true,
    module: 'CONSUMER',
    component: ConsumerManagementDetails,
  },
  {
    path: '/admin/consumer-management',
    name: 'Consumer Management',
    bradcrumb: false,
    excat: true,
    module: 'CONSUMER',
    component: ConsumerManagementModule,
  },
  // Helpdesk Dashboard 
  {
    path: '/admin/helpdesk/property-leads/create-ticket',
    name: 'Helpdesk Team Dashboard',
    bradcrumb: [  'Property Leads', 'Create Ticket' ],
    excat: true,
    module: 'HELPDESK',
    component: CreateTicket,
  },
  {    
    path: '/admin/helpdesk/property-leads/consumer-details/:consumerId',
    name: 'Consumer Management',
    bradcrumb: [ 'Property Leads', 'Consumer Details' ],
    excat: true,
    module: 'HELPDESK',
    component: ConsumerManagementDetails,
  },
  {
    path: '/admin/helpdesk/property-leads',
    name: 'Helpdesk Team Dashboard',
    bradcrumb: [  '< Helpdesk Team Dashboard' ],
    excat: true,
    module: 'HELPDESK',
    tabName: 'Property Leads',
    component: HelpDeskListingPage,
  },
  {
    path: '/admin/helpdesk/new-lead',
    name: 'Helpdesk Team Dashboard',
    bradcrumb: [  'New Lead' ],
    excat: true,
    module: 'HELPDESK',
    component: NewEntry,
  },
  {
    path: '/admin/helpdesk/serviceRequest/consumer/create-ticket',
    name: 'Helpdesk Team Dashboard',
    bradcrumb: [ 'Service Requests','Service Request Details', 'Consumer', 'Create Ticket' ],
    excat: true,
    module: 'HELPDESK',
    component: CreateTicket,
  },
  {
    path: '/admin/helpdesk/create-ticket',
    name: 'Helpdesk Team Dashboard',
    bradcrumb: [ 'Caller Details', 'Create Ticket' ],
    excat: true,
    module: 'HELPDESK',
    component: CreateTicket,
  },
  {
    path: '/admin/helpdesk/consumer-details/:consumerId',
    name: 'Helpdesk Team Dashboard',
    bradcrumb: [ 'Caller Details' ],
    excat: true,
    module: 'HELPDESK',
    component: ConsumerManagementDetails,
  },
  {
    path: '/admin/helpdesk/lead-details',
    name: 'Helpdesk Team Dashboard',
    bradcrumb: [  'Property Leads' ,'Lead Details' ],
    excat: true,
    module: 'HELPDESK',
    component: LeadDetails,
  },
  {
    path: '/admin/helpdesk/serviceRequest-details/:serviceRequestId',
    name: 'Helpdesk Team Dashboard',
    bradcrumb: [  'Service Requests', 'Service Request Details' ],
    excat: true,
    module: 'HELPDESK',
    component: HelpdeskServiceRequestDetails,
  },
  // {
  //   path: '/admin/helpdesk/serviceRequest/consumer/create-ticket',
  //   name: 'Helpdesk Team Dashboard',
  //   bradcrumb: [  'Service Requests','Service Request Details', 'Consumer', 'Create Ticket' ],
  //   excat: true,
  //   module: 'HELPDESK',
  //   component: CreateTicket,
  // },
  {
    path: '/admin/helpdesk/serviceRequest/consumer/property-details',
    name: 'Helpdesk Team Dashboard',
    bradcrumb: [  'Service Requests','Service Request Details', 'Consumer','Property Details' ],
    excat: true,
    module: 'HELPDESK INSTALLATION REQUESTS',
    component: PropertyDetailsModule,
  },
  {
    path: '/admin/helpdesk/serviceRequest/consumer-details/:consumerId',
    name: 'Helpdesk Team Dashboard',
    bradcrumb: [  'Service Requests', 'Service Request Details', 'Consumer Details' ],
    excat: true,
    module: 'HELPDESK INSTALLATION REQUESTS',
    component: ConsumerManagementDetails,
  },
  {
    path: '/admin/helpdesk/serviceRequest/create-ticket',
    name: 'Helpdesk Team Dashboard',
    bradcrumb: [  'Service Request', 'Create Ticket' ],
    excat: true,
    module: 'HELPDESK',
    component: CreateTicket,
  },
  {
    path: '/admin/helpdesk/serviceRequest',
    name: 'Helpdesk Team Dashboard',
    bradcrumb: [  '< Helpdesk Team Dashboard' ],
    excat: true,
    module: 'HELPDESK',
    component: ServiceRequest,
  },
  {
    path: '/admin/helpdesk',
    name: 'Helpdesk Team Dashboard',
    bradcrumb: false,
    excat: true,
    module: 'HELPDESK',
    component: HelpdeskDashboard,
  },

  {
    path: 'admin/finance/refund-request/consumer-transactions/property-details',
    name: 'Finance Team Dashboard',
    bradcrumb: [  'Refund Request','Consumer Transactions','Property Details' ],
    excat: true,
    module: 'FINANCE',
    component: PropertyDetailsModule,
  },
  //FINANCE
  {
    path: '/admin/finance/transactions/invoice',
    name: 'Finance Team Dashboard',
    bradcrumb: ['Consumer Transactions','Consumer Transactions Details', 'Invoice' ],
    excat: true,
    module: 'FINANCE',
    component: FinanceInvoice,
  },
  {
    path: '/admin/finance/consumer-transaction-details/property-details',
    name: 'Finance Team Dashboard',
    bradcrumb: [  'Consumer Transactions','Consumer Transaction Details', 'Property Details' ],
    excat: true,
    module: 'FINANCE',
    component: PropertyDetailsModule,
  },
  {
    path: '/admin/finance/refundRequest-details/property-details',
    name: 'Finance Team Dashboard',
    bradcrumb: [  'Refund Request','Refund Request Details', 'Property Details' ],
    excat: true,
    module: 'FINANCE',
    component: PropertyDetailsModule,
  },
  {
    path: '/admin/finance/refundRequest/:userid',
    name: 'Finance Team Dashboard',
    bradcrumb: [ 'Consumer Transactions','Consumer Transaction Details' ],
    excat: true,
    module: 'FINANCE',
    component: FinanceRefundRequest,
  },
  
 
 
  //FinanceRefundRequestDetails
  {
    path: '/admin/finance/refundRequest-details/:buybackRequestId',
    name: 'Finance Team Dashboard',
    bradcrumb: [  'Refund Request', 'Refund Request Details' ],
    excat: true,
    module: 'FINANCE',
    component: FinanceRefundRequestDetails,
  },
  {
    path: '/admin/finance/transactions',
    name: 'Finance Team Dashboard',
    bradcrumb: [ '< Finance Team Dashboard' ],
    excat: true,
    module: 'FINANCE',
    tabName: 'Consumer Transactions',
    component: FinanceListingPage,
  },
  //Buyback Request
  {
    path: '/admin/finance/buyback-request',
    name: 'Finance Team Dashboard',
    bradcrumb: [  '< Finance Team Dashboard' ],
    excat: true,
    module: 'FINANCE',
    tabName: 'Buyback Request',
    component: FinanceListingPage,
  },
  {
    path: '/admin/finance',
    name: 'Finance Team Dashboard',
    bradcrumb: false,
    excat: true,
    module: 'FINANCE',
    component: FinanceDashboard,
  },
  {
    path: '/admin/addCity',
    name: 'Add New City',
    bradcrumb: false,
    excat: true,
    module: 'CITY',
    component: AddNewCity,
  },
  {
    path: '/admin/addPlans',
    name: 'Manage Plans',
    bradcrumb: false,
    excat: true,
    module: 'CITY',
    component: ManagePlan,
  },
  {
    path: '/admin/nonsdproperty',
    name: 'Non SmartDoor Properties',
    bradcrumb: false,
    excat: true,
    module: 'CITY',
    component: NonSDProperties,
  },

  //realtor management
  {
    path: '/admin/realtor-advisor-management/advisor-details/:userId/reviews',
    name: 'Realtor Advisor Management',
    bradcrumb: [ 'Realtors', 'Realtor Details', 'Reviews' ],
    excat: true,
    module: 'REALTOR',
    component: RealtorReviews,
  },
   {
    path: '/admin/realtor-advisor-management/advisor-details/property-details',
    name: 'Realtor Team Dashboard',
    bradcrumb: [ 'Realtors', 'Realtor Details' ,'Property Details' ],
    excat: true,
    module: 'REALTOR',
    component: PropertyDetailsModule,
  },
  {
    path: '/admin/realtor-advisor-management/advisor-details/:advisorId',
    name: 'Realtor Advisor Management',
    bradcrumb: [ 'Realtors', 'Realtor Details' ],
    excat: true,
    module: 'REALTOR',
    component: RealtorManagementDetails,
  },
  {
    path: '/admin/realtor-advisor-management',
    name: 'Realtor Advisor Management',
    bradcrumb: false,
    excat: true,
    module: 'REALTOR',
    component: RealtorManagement,
  },

  //transaction team
  {
    path: '/admin/transaction/meeting-details/:id',
    name: 'Transaction Team Dashboard',
    bradcrumb: [ 'Meeting Requests', 'Meeting Details' ],
    excat: true,
    module: 'TRANSACTION',
    component: TransactionDetailsPage,
  },
  {
    path: '/admin/transaction/lead-details/:id',
    name: 'Transaction Team Dashboard',
    bradcrumb: [ 'Transaction Leads', 'Lead Details' ],
    excat: true,
    module: 'TRANSACTION',
    component: TransactionDetailsPage,
  },
  {
    path: '/admin/transaction/transaction-leads',
    name: 'Transaction Team Dashboard',
    bradcrumb: ['< Transaction Team Dashboard'],
    excat: true,
    module: 'TRANSACTION',
    tabName: 'Transaction Leads',
    component: TransactionListingPage,
  },
  {
    path: '/admin/transaction/meeting-requests',
    name: 'Transaction Team Dashboard',
    bradcrumb: ['< Transaction Team Dashboard'],
    excat: true,
    module: 'TRANSACTION',
    tabName: 'Meeting Requests',
    component: TransactionListingPage,
  },
  {
    path: '/admin/transaction/deal-approvals',
    name: 'Transaction Team Dashboard',
    bradcrumb: [ '< Transaction Team Dashboard'],
    excat: true,
    module: 'TRANSACTION',
    tabName: 'Deal Approvals',
    component: TransactionListingPage,
  },
  {
    path: '/admin/transaction/getApprovalDetail/:id',
    name: 'Transaction Team Dashboard',
    bradcrumb: [ 'Deal Approvals', 'Deal Approval Details' ],
    excat: true,
    module: 'TRANSACTION',
    tabName: 'Deal Approvals',
    component: DealApprovalDetailPage,
  },
  {
    path: '/admin/transaction',
    name: 'Transaction Team Dashboard',
    bradcrumb: false,
    excat: true,
    module: 'TRANSACTION',
    component: TransactionDashboard,
  },
  {
    path: '/admin/transaction-leads/property-details',
    name: 'Transaction Team Dashboard',
    bradcrumb: [ 'Transaction Leads','Lead Details', 'Property Details' ],
    excat: true,
    module: 'TRANSACTION',
    component: PropertyDetailsModule,
  },

  // '/admin/meeting-requests/property-details'
  {
    path: '/admin/meeting-requests/property-details',
    name: 'Transaction Team Dashboard',
    bradcrumb: [ 'Meeting Requests' , 'Meeting Details' , 'Property details' ],
    excat: true,
    module: 'TRANSACTION',
    component: PropertyDetailsModule,
  },

  {
    path: '/admin/advisors',
    name: 'Add New Posting',
    bradcrumb: false,
    excat: true,
    component: Advisors,
  },
  {
    path: '/admin/posts/add-new-post/basic-details',
    name: 'Add New Post',
    bradcrumb: [ 'Users' ,'Add new Posting' ],
    excat: true,
    component: AddNewPost,
    stepper: '1',
    module : 'NEW POST'
  },
  {
    path: '/admin/posts/add-new-post/address',
    name: 'Add New Post',
    bradcrumb: [ 'Users' ,'Add new Posting' ],
    excat: true,
    component: AddNewPost2,
    stepper: '2',
    module : 'NEW POST'
  },
  {
    path: '/admin/posts/add-new-post/pics',
    name: 'Add New Post',
    bradcrumb: [ 'Users' ,'Add new Posting' ],
    excat: true,
    component: AddNewPost3,
    stepper: '3',
    module : 'NEW POST'
  },
  {
    path: '/admin/posts/add-new-post/info',
    name: 'Add New Post',
    bradcrumb: [ 'Users' ,'Add new Posting' ],
    excat: true,
    component: AddNewPost4,
    stepper: '4',
    module : 'NEW POST'
  },
  {
    path: '/admin/posts/add-new-post/select_plan',
    name: 'Add New Post',
    bradcrumb: [ 'Users' ,'Add new Posting' ],
    excat: true,
    component: AddNewPost5,
    stepper: '5',
    module : 'NEW POST'
  }

  // {
  //   path: '/admin/execution/installation-detail/property-details',
  //   name: 'Installation Team Dashboard',
  //   bradcrumb: [ 'Installation Team', 'Task Details', 'Property Details' ],
  //   excat: true,
  //   module: 'EXECUTION',
  //   component: PropertyDetailsModule,
  // },

  // Builder Project
  // { "path": "/builder/projects/detail/:builderProjectId", name:"Builder Project", bradcrumb:["Builder Projects", "Project Details"], excat:true, module: "BUILDER", component: BuilderProjectView},
  // { "path": "/builder/builder-property/new-builder-property", name:"Builder Project - Posting", bradcrumb: ["Builder Project",	"Add New"], excat:true, module: "BUILDER", component: BuilderProperty },
  // { "path": "/builder/projects", name:"Builder Project", excat:true, module: "BUILDER", component:  BuilderPropertyListing },
];

export default routeData;
