const TAB_ACCORDING_MODULE = {
    SALES: {
       firstTabName: "Leads",
       secondTabName: "Completed",
       thirdTabName: "Total Transactions",
    },
    EXECUTION: {
       firstTabName: "Pending Tasks",
       secondTabName: "Completed",
       thirdTabName: undefined,
    },
    HELPDESK: {
       firstTabName: "Leads",
       secondTabName: "Service Requests",
       thirdTabName: undefined,
    },
    TRANSACTION: {
       firstTabName: "Visit Leads",
       secondTabName: "Deal Meetings",
       thirdTabName: "Total Transactions",
    },
    "Help Desk Executive": {
       module: "HELPDESK",
       firstTabName: "Leads",
       secondTabName: "Service Requests",
       thirdTabName: undefined,
    },
    "Help Desk Admin": {
       module: "HELPDESK",
       firstTabName: "Leads",
       secondTabName: "Service Requests",
    },
    "Installation Executive": {
       module: "EXECUTION",
       firstTabName: "Tasks",
       secondTabName: "Completed",
       thirdTabName: undefined,
    },
    "Execution Admin": {
       module: "EXECUTION",
       firstTabName: "Tasks",
       secondTabName: "Completed",
       thirdTabName: undefined,
    },
    "Sales Executive": {
       module: "SALES",
       firstTabName: "Leads",
       secondTabName: "completed",
       thirdTabName: undefined,
    },
    "Sales Admin": {
       module: "SALES",
       firstTabName: "Leads",
       secondTabName: "completed",
       thirdTabName: undefined,
    },
    "Transaction Executive": {
       module: "TRANSACTION",
       firstTabName: "Visit Leads",
       secondTabName: "Deal Meetings",
       thirdTabName: "Total Transactions",
    },
    "Transaction Admin": {
       module: "TRANSACTION",
       firstTabName: "Visit Leads",
       secondTabName: "Deal Meetings",
       thirdTabName: "Total Transactions",
    },
 };

 export default TAB_ACCORDING_MODULE 
