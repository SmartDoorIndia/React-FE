(this.webpackJsonpsmartdoor=this.webpackJsonpsmartdoor||[]).push([[93],{1445:function(e,a,t){},1589:function(e,a,t){"use strict";t.r(a);var s=t(0),l=(t(29),t(1494)),c=t(143),i=(t.p,t(1445),t(119)),o=t(20),d=t(126),n=t(56),r=t(4);a.default=e=>{var a,t,j,m,b,x,u,v;const[h,O]=Object(s.useState)(!0),[N,g]=Object(s.useState)([]),[p,f]=Object(s.useState)(),W=null!==e&&void 0!==e&&null!==(a=e.location)&&void 0!==a&&null!==(t=a.state)&&void 0!==t&&t.transactionId?null===e||void 0===e||null===(j=e.location)||void 0===j||null===(m=j.state)||void 0===m?void 0:m.transactionId:null,S=null!==e&&void 0!==e&&null!==(b=e.location)&&void 0!==b&&null!==(x=b.state)&&void 0!==x&&x.userId?null===e||void 0===e||null===(u=e.location)||void 0===u||null===(v=u.state)||void 0===v?void 0:v.userId:null,D=Object(s.useCallback)((()=>{Object(i.tb)({userId:S,transactionId:W}).then((e=>{O(!1),e.data&&e.data.resourceData&&f(e.data.resourceData)})).catch((e=>{O(!1),console.log("error",e)}))}),[i.tb]),I=Object(s.useCallback)((()=>{Object(i.F)({transactionId:W}).then((e=>{O(!1),e.data&&e.data.resourceData&&g(e.data.resourceData),console.log("consumerDetails",e.data.resourceData)})).catch((e=>{O(!1),console.log("error",e)}))}),[i.F]),z=Object(s.useCallback)((()=>{Object(i.E)({transactionId:W}).then((e=>{e.data})).catch((e=>{O(!1),console.log("error",e)}))}),[i.E]);return Object(s.useEffect)((()=>{D(),I()}),[]),console.log(e,"invoice"),Object(r.jsx)(r.Fragment,{children:Object(r.jsx)("div",{class:"tableBox bg-white financeInvoiceMainWrap mt-0",children:h?Object(r.jsx)(n.c,{}):Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("div",{class:"tableHeading mb-4 pb-3",children:[Object(r.jsxs)("div",{className:"d-flex justify-content-between align-items-center ",children:[Object(r.jsxs)("div",{children:[Object(r.jsx)(o.a,{size:"large",className:"pl-4",fontWeight:"mediumbold",color:"secondry-color",text:null===N||void 0===N?void 0:N.userName}),Object(r.jsx)(o.a,{size:"Small",className:"pl-4 fw500",color:"secondry-color",text:null===N||void 0===N?void 0:N.address})]}),"FAILED"==N.status?null:Object(r.jsx)("div",{class:"downloadBtn",children:Object(r.jsx)(d.a,{onClick:z,className:"mediumbold",size:"xSmall",type:"submit",name:"Security Deposit For Visit"==N.planName?"Send Deposit Receipt":"Send Invoice",alt:"Download Invoice"})})]}),Object(r.jsx)(l.a,{className:"mt-3 pl-4",children:Object(r.jsx)(c.a,{md:4,sm:6,lg:3,children:Object(r.jsxs)("div",{children:[Object(r.jsx)(o.a,{size:"xSmall",fontWeight:"smbold",color:"TaupeGrey",text:"Phone Number"}),Object(r.jsx)(o.a,{size:"Small",fontWeight:"mediumbold",color:"secondryColor",text:null===N||void 0===N?void 0:N.phoneNumber})]})})})]}),Object(r.jsx)("div",{className:"financeInvoiceWrap",children:Object(r.jsx)("div",{className:"row",children:Object(r.jsxs)("div",{className:"col-md-11 financeInvoiceData m-5",children:[Object(r.jsx)("div",{className:"row",children:Object(r.jsx)("div",{className:"col-md-12 p-0",children:Object(r.jsx)(o.a,{size:"xregular",fontWeight:"mediumbold",className:"pl-4 invoiceDataWrapheading",text:"Invoice"})})}),Object(r.jsxs)("div",{className:"row p-2 invoiceHeading mb-2",children:[Object(r.jsx)("div",{className:"col-md-6",children:Object(r.jsx)(o.a,{className:"text-left",size:"xxSmall",fontWeight:"mediumbold",text:"ITEM NAME"})}),Object(r.jsx)("div",{className:"col-md-3",children:Object(r.jsx)(o.a,{className:"",size:"xxSmall",fontWeight:"mediumbold",text:"QUANTITY"})}),Object(r.jsx)("div",{className:"col-md-3",children:Object(r.jsx)(o.a,{className:"",size:"xxSmall",fontWeight:"mediumbold",text:"PRICE"})})]}),Object(r.jsxs)("div",{className:"row mb-3",children:[Object(r.jsx)("div",{className:"col-md-6",children:Object(r.jsxs)("div",{className:"invoiceDataWrapheadingsub",children:[Object(r.jsx)(o.a,{size:"Small",fontWeight:"mediumbold",text:"Security Deposit For Visit"===N.planName}),Object(r.jsx)("div",{className:"invoiceTC",children:Object(r.jsx)(o.a,{size:"Small",fontWeight:"semibold",color:"TaupeGrey",text:N.description})})]})}),Object(r.jsx)("div",{className:"col-md-3"}),Object(r.jsx)("div",{className:"col-md-3",children:Object(r.jsx)(o.a,{className:"invoiceDataWrapheadingsub",size:"xxSmall",fontWeight:"bold",text:N.amount})})]}),Object(r.jsx)("div",{className:"row mb-3",children:null===(null===N||void 0===N?void 0:N.gstValue)?null:Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("div",{className:"col-md-6",children:Object(r.jsx)("div",{className:"invoiceDataWrapheadingsub",children:Object(r.jsx)(o.a,{size:"xxSmall",fontWeight:"bold",text:"GST(".concat(null===N||void 0===N?void 0:N.gstValue,")")})})}),Object(r.jsx)("div",{className:"col-md-3"}),Object(r.jsx)("div",{className:"col-md-3",children:Object(r.jsx)(o.a,{className:"invoiceDataWrapheadingsub",size:"xxSmall",fontWeight:"bold",text:N.gstAmount})})]})}),Object(r.jsxs)("div",{className:"row total border-top",children:[Object(r.jsx)("div",{className:"col-md-6",children:Object(r.jsx)("div",{className:"invoiceDataWrapheadingsub",children:Object(r.jsx)(o.a,{size:"xxSmall",fontWeight:"bold",text:"Total Price"})})}),Object(r.jsx)("div",{className:"col-md-3"}),Object(r.jsx)("div",{className:"col-md-3",children:Object(r.jsx)(o.a,{className:"invoiceDataWrapheadingsub",size:"xxSmall",fontWeight:"bold",color:"primaryColor",text:N.netPayAmount})})]})]})})})]})})})}}}]);