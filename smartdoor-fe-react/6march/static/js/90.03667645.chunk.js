(this.webpackJsonpsmartdoor=this.webpackJsonpsmartdoor||[]).push([[90],{1446:function(e,t,a){},1549:function(e,t,a){"use strict";a.r(t);var s=a(0),l=a.n(s),o=a(29),n=a(20),r=a(8),c=a(14),i=a(119),d=a(38),u=a(34),j=a(30),O=a(679),p=a(411),E=a(232),C=a(115),b=a(123),S=a(56),h=a(153),m=a(21),g=a(171),v=(a(1446),a(4));const D={getAllRealtors:i.Z,getAllCity:i.H,getLocationByCity:i.Vb};t.default=Object(d.b)((e=>{let{getAllRealtorsData:t,allRealtorCities:a,allCities:s}=e;return{getAllRealtorsData:t,allRealtorCities:a,allCities:s}}),D)((e=>{var t,a,d;const{advisorId:D}=Object(r.useParams)(),{getAllRealtors:R,getAllRealtorsData:x,getAllCity:A,allRealtorCities:N,allCities:I,getLocationByCity:P}=e,[T,L]=Object(s.useState)(!1),[y,f]=Object(s.useState)({}),G=()=>L(!1),B=()=>L(!0),w=g.a.realtorStatusArr,[M,k]=Object(s.useState)(""),[U,z]=Object(s.useState)(""),[J,W]=Object(s.useState)(""),[F,H]=Object(s.useState)([]),[V,q]=Object(s.useState)(""),[K,Z]=l.a.useState(""),[Q,X]=l.a.useState(!1),{auth:{userData:Y}}=Object(m.d)();Object(s.useEffect)((()=>{A(),R({page:"",size:"",city:"",zipCode:""})}),[R,A]),console.log("getAllRealtors:",x);const $=[{name:"Id",selector:"id",center:!0,sortable:!0},{name:"Joined On",selector:"dateOfRegistration",sortable:!0,center:!0,maxWidth:"140px",cell:e=>{let{dateOfRegistration:t}=e;return Object(v.jsx)("span",{children:Object(u.f)(t)})}},{name:"Name ",selector:"name",center:!0,minWidth:"200px",cell:e=>{let{name:t}=e;return Object(v.jsx)(u.a,{position:"top",style:{width:"100%"},name:t||"",children:Object(v.jsx)(n.a,{size:"Small",color:"secondryColor",className:"elipsis-text",text:t?t.capitalizeWord():"-"})})}},{name:"Location",selector:"dealInArea",center:!0,cell:e=>Object(v.jsx)(u.a,{position:"top",style:{width:"100%"},name:e.dealInArea.length?"".concat(Object(u.l)(e.dealInArea)):"-",children:Object(v.jsx)("span",{className:"cursor-pointer elipsis-text",children:e.dealInArea.length?e.dealInArea.length>1?"".concat(e.dealInArea[0].location,"..."):"".concat(e.dealInArea[0].location):"-"})})},{name:"City",selector:"dealInCity",center:!0,maxWidth:"80px",cell:e=>{let{dealInCity:t}=e;return Object(v.jsx)("span",{children:t||"-"})}},{name:"Properties Posted",selector:"propertyPostedCount",sortable:!0,center:!0,minWidth:"170px",cell:e=>{let{propertyPostedCount:t}=e;return Object(v.jsx)("span",{children:t||"-"})}},{name:"Ratings",selector:"avgRatings",sortable:!0,center:!0,cell:e=>{let{avgRatings:t}=e;return Object(v.jsx)("span",{children:t||"-"})}},{name:"Status",selector:"status",center:!0,cell:e=>{let{status:t}=e;return Object(u.p)(t)}},{name:"Action",center:!0,cell:e=>Object(v.jsxs)("div",{className:"action",children:[Object(v.jsx)(u.a,{position:"left",name:"View Details",children:Object(v.jsx)("span",{children:Object(v.jsx)(c.b,{to:{pathname:"/admin/realtor-advisor-management/advisor-details/".concat(e.id),state:{status:e.status,isBlocked:e.isBlocked}},children:Object(v.jsx)(o.a,{name:"editIcon",src:j.a})})})}),"SUBMITTED"===e.status||"REJECTED"===e.status?null:Object(v.jsx)(u.a,{position:"top",name:"ACCEPTED"===e.status?e.isBlocked?"Blocked":"Block":"Approve/Decline",children:Object(v.jsx)("span",{onClick:()=>"SUBMITTED"!==e.status&&("REJECTED"!==e.status&&(B(),void f({id:e.id,status:e.isBlocked}))),children:Object(v.jsx)(o.a,{name:"contentIcon",className:"p-1",src:e.isBlocked?O.a:p.a})})})]})}],_=(e,t)=>{R({city:e,zipCode:t,page:"",size:""})};console.log("allRealtorCities:",N);const ee=l.a.useMemo((()=>Object(v.jsx)(h.a,{onFilter:e=>Z(e.target.value),onClear:()=>{K&&(X(!Q),Z(""))},filterText:K,placeholder:"Search here"})),[K,Q]);function te(e,t,a){return e.location.toLowerCase().includes(K.toLowerCase())}const ae=e=>{let t=e||M,a=x.data.length?x.data.filter((e=>{var t,a,s;return(null===e||void 0===e?void 0:e.id)===K||(null===e||void 0===e||null===(t=e.name)||void 0===t?void 0:t.toLowerCase().includes(K.toLowerCase()))||(null===e||void 0===e||null===(a=e.dealInCity)||void 0===a?void 0:a.toLowerCase().includes(K.toLowerCase()))||(null===e||void 0===e||null===(s=e.status)||void 0===s?void 0:s.toLowerCase().includes(K.toLowerCase()))||e.dealInArea.some(te)})):[];return t&&a.length&&(a=a.filter((e=>(null===e||void 0===e?void 0:e.status.toUpperCase())===t.toUpperCase()))),a};const se=Object(v.jsx)(S.b,{});return Object(v.jsx)(v.Fragment,{children:Object(v.jsxs)("div",{className:"tableBox mb-5",children:[Object(v.jsx)(E.a,{title:y.status?"Are you sure you want to unblock this user?":"Are you sure you want to block this user?",cancelButtonName:"Cancel",primaryButtonName:y.status?"Unblock":"Block",show:T,handleClose:G,handleShow:B,handlePerformAction:()=>((e,t)=>{Object(i.Sc)({advisorId:e,status:t,userId:Number(Y.userid)}).then((e=>{R({page:"",size:"",city:"",zipCode:""})})).catch((e=>{console.log("")})),G()})(y.id,y.status?"UNBLOCKED":"BLOCKED")}),Object(v.jsxs)("div",{className:"d-flex justify-content-between align-items-center tableHeading",children:[Object(v.jsx)("div",{children:Object(v.jsx)(n.a,{size:"regular",fontWeight:"mediumbold",color:"secondryColor",text:"Realtors"})}),Object(v.jsxs)("div",{className:"locationSelect d-flex",children:[ee,w.length?Object(v.jsx)(C.a.Group,{controlId:"exampleForm.SelectCustom",children:Object(v.jsxs)(C.a.Control,{as:"select",value:M,onChange:e=>{var t;t=e.target.value,k(t),ae(t)},children:[Object(v.jsx)("option",{value:"",children:"Select Status"}),w.length?w.map(((e,t)=>Object(v.jsx)("option",{value:e,children:e},t))):null]})}):"",Object(v.jsx)(C.a.Group,{controlId:"exampleForm.SelectCustom",children:Object(v.jsxs)(C.a.Control,{as:"select",onChange:e=>{H([]),z(e.target.value),W(""),_(e.target.value,""),e.target.value.length&&P({city:e.target.value}).then((e=>{if(e.data&&200===e.data.status){const t=e.data.resourceData.locations.map((e=>({...e,location:"".concat(e.location," ,").concat(e.pinCode)})));H(t)}})).catch((e=>console.log("err:",e)))},value:U,children:[Object(v.jsx)("option",{value:"",children:"Select City"}),null!==I&&void 0!==I&&null!==(t=I.data)&&void 0!==t&&t.cities&&null!==I&&void 0!==I&&null!==(a=I.data)&&void 0!==a&&a.cities.length?null===I||void 0===I||null===(d=I.data)||void 0===d?void 0:d.cities.map(((e,t)=>Object(v.jsx)("option",{value:e,children:e},t))):null]})}),Object(v.jsx)(C.a.Group,{controlId:"exampleForm.SelectCustom",children:Object(v.jsxs)(C.a.Control,{as:"select",value:J,onChange:e=>{_(U,e.target.value),W(e.target.value)},className:"locationWidth",children:[Object(v.jsx)("option",{value:"",children:"Select Location"}),F&&F.length?F.map(((e,t)=>Object(v.jsx)("option",{value:e.pinCode,children:e.location},e.pinCode))):null]})})]})]}),Object(v.jsx)("div",{className:"realtorAdvisorManagementRealtorsTableWrapper",children:Object(v.jsx)(b.a,{onChangePage:function(e){},data:ae(),columns:$,progressPending:x.isLoading,progressComponent:se,perPageOptions:[8,16,24,32,40,48,56,64,72,80],paginationPerPage:8,paginationRowsPerPageOptions:[8,16,24,32,40,48,56,64,72,80],filterText:K,subHeaderComponent:ee,persistTableHead:!0,filterComponent:ee})})]})})}))},171:function(e,t,a){"use strict";t.a={installationRequestsStatusArr:["ASSIGNED","UNASSIGNED","ACCEPTED","NOT ACCEPTED","IN PROGRESS","PROBLEM","REJECTED","COMPLETED"],installationServiceRequestsStatusArr:["PENDING","ASSIGNED","PROBLEM","REJECTED","IN PROGRESS","COMPLETED","CLOSED"],helpdeskServiceRequestsStatusArr:["PENDING","ASSIGNED","PROBLEM","REJECTED","IN PROGRESS","COMPLETED","CLOSED"],financeConsumerTransactionsStatusArr:["FAILED","COMPLETED"],financeRefundRequestStatusArr:["IN PROGRESS","PENDING","CLOSED"],ConsumerStatusArr:["PENDING","COMPLETED"],transactionLeadsStatusArr:["UNASSIGNED","ASSIGNED","IN PROGRESS","COMPLETED","DISCARDED"],meetingRequestsStatusArr:["ASSIGNED","IN PROGRESS","COMPLETED","NOT DONE"],dealApprovalsStatusArr:["PENDING","CANCELLED","APPROVED"],societyLeadsStatusArr:["PENDING","IN PROGRESS","CONVERTED","CANCELLED","NOT INTERESTED"],propertyStatusArr:["UNDER REVIEW","PUBLISHED"],propertyType:["SMARTDOOR","NON SMARTDOOR"],realtorStatusArr:["SUBMITTED","ACCEPTED","REJECTED"],brokerStatus:["Approved","APPROVED","Rejected","Hold","Pending"]}}}]);