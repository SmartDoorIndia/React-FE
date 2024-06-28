const CONSTANTS_STATUS = {
    installationRequestsStatusArr: [ "ASSIGNED" , "UNASSIGNED" , "ACCEPTED",  "NOT ACCEPTED" ,  "IN PROGRESS" , "PROBLEM" , "REJECTED", "COMPLETED" ],
    installationServiceRequestsStatusArr : ["PENDING" ,"ASSIGNED" ,"PROBLEM", "REJECTED" , "IN PROGRESS" ,  "COMPLETED" , "CLOSED"  ],
    helpdeskServiceRequestsStatusArr : ["PENDING" ,"ASSIGNED" ,"PROBLEM", "REJECTED" , "IN PROGRESS" ,  "COMPLETED" , "CLOSED"  ],
    financeConsumerTransactionsStatusArr  : [ "FAILED" , "COMPLETED" ],
    financeRefundRequestStatusArr  : ["IN PROGRESS" , "PENDING" , "CLOSED" ],
    ConsumerStatusArr  : ["PENDING" , "COMPLETED"],
    transactionLeadsStatusArr  :  [ "UNASSIGNED" ,"ASSIGNED" ,  "IN PROGRESS", "COMPLETED" , "DISCARDED" ],
    meetingRequestsStatusArr  :  [ "ASSIGNED" , "IN PROGRESS" , "COMPLETED" , "NOT DONE" ],
    dealApprovalsStatusArr  :  [ "PENDING" , "CANCELLED" , "APPROVED" ],
    societyLeadsStatusArr : ["PENDING" , "IN PROGRESS" ,"CONVERTED",  "CANCELLED" , "NOT INTERESTED" ],
    propertyStatusArr :  [ "UNDER REVIEW" , "PUBLISHED" , "Pending from Customer"],
    propertyType :  [ "SMARTDOOR" , "NON SMARTDOOR" ],
    realtorStatusArr :  [ "SUBMITTED" , "ACCEPTED", "REJECTED" ],
    propertyPostType : [ "Renting", "Selling"],
    propertyStage : [ "Ready" , "Under Construction"],
    propertySubType : [ "Apartment", "Independent house", "Builder Floor", "Plot", "PG/Co-living"],
    monthList : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    brokerStatus: [ "APPROVED", "REJECTED", "ON_HOLD", "PENDING_APPROVAL", "EXPIRED" ],
    brokerPostedProperty: ["PUBLISHED", "UNDER REVIEW" , "PENDING" , "QUERY" , "UNINSTALLED/SOLD" , "REJECTED"],
    permissionList: ['Smart Door Posting', 'Non Smart Door Posting']
 };
 
 export default CONSTANTS_STATUS;