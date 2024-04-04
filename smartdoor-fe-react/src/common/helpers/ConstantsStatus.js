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
    propertyStatusArr :  [ "UNDER REVIEW" , "PUBLISHED" ],
    propertyType :  [ "SMARTDOOR" , "NON SMARTDOOR" ],
    realtorStatusArr :  [ "SUBMITTED" , "ACCEPTED", "REJECTED" ],
    brokerStatus: [ "Approved", "Rejected", "Hold", "Pending", "Expired", "Query" ],
    brokerPostedProperty: ["PUBLISHED", "UNDER REVIEW" , "PENDING" , "QUERY" , "UNINSTALLED/SOLD" , "REJECTED"]
 };
 
 export default CONSTANTS_STATUS;