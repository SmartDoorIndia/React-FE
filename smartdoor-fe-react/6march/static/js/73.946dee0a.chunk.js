(this.webpackJsonpsmartdoor=this.webpackJsonpsmartdoor||[]).push([[73],{115:function(e,t,a){"use strict";var s=a(5),l=a(6),o=a(25),c=a.n(o),i=a(0),r=a.n(i),n=(a(114),a(7)),d=a.n(n),m=["as","className","type","tooltip"],b={type:d.a.string,tooltip:d.a.bool,as:d.a.elementType},u=r.a.forwardRef((function(e,t){var a=e.as,o=void 0===a?"div":a,i=e.className,n=e.type,d=void 0===n?"valid":n,b=e.tooltip,u=void 0!==b&&b,j=Object(l.a)(e,m);return r.a.createElement(o,Object(s.a)({},j,{ref:t,className:c()(i,d+"-"+(u?"tooltip":"feedback"))}))}));u.displayName="Feedback",u.propTypes=b;var j=u,x=r.a.createContext({controlId:void 0}),f=a(28),v=["id","bsPrefix","bsCustomPrefix","className","type","isValid","isInvalid","isStatic","as"],O=r.a.forwardRef((function(e,t){var a=e.id,o=e.bsPrefix,n=e.bsCustomPrefix,d=e.className,m=e.type,b=void 0===m?"checkbox":m,u=e.isValid,j=void 0!==u&&u,O=e.isInvalid,p=void 0!==O&&O,h=e.isStatic,y=e.as,N=void 0===y?"input":y,g=Object(l.a)(e,v),C=Object(i.useContext)(x),I=C.controlId,k=C.custom?[n,"custom-control-input"]:[o,"form-check-input"],S=k[0],P=k[1];return o=Object(f.a)(S,P),r.a.createElement(N,Object(s.a)({},g,{ref:t,type:b,id:a||I,className:c()(d,o,j&&"is-valid",p&&"is-invalid",h&&"position-static")}))}));O.displayName="FormCheckInput";var p=O,h=["bsPrefix","bsCustomPrefix","className","htmlFor"],y=r.a.forwardRef((function(e,t){var a=e.bsPrefix,o=e.bsCustomPrefix,n=e.className,d=e.htmlFor,m=Object(l.a)(e,h),b=Object(i.useContext)(x),u=b.controlId,j=b.custom?[o,"custom-control-label"]:[a,"form-check-label"],v=j[0],O=j[1];return a=Object(f.a)(v,O),r.a.createElement("label",Object(s.a)({},m,{ref:t,htmlFor:d||u,className:c()(n,a)}))}));y.displayName="FormCheckLabel";var N=y,g=["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","title","type","label","children","custom","as"],C=r.a.forwardRef((function(e,t){var a=e.id,o=e.bsPrefix,n=e.bsCustomPrefix,d=e.inline,m=void 0!==d&&d,b=e.disabled,u=void 0!==b&&b,v=e.isValid,O=void 0!==v&&v,h=e.isInvalid,y=void 0!==h&&h,C=e.feedbackTooltip,I=void 0!==C&&C,k=e.feedback,S=e.className,P=e.style,w=e.title,F=void 0===w?"":w,T=e.type,E=void 0===T?"checkbox":T,z=e.label,D=e.children,W=e.custom,R=e.as,L=void 0===R?"input":R,q=Object(l.a)(e,g),A="switch"===E||W,G=A?[n,"custom-control"]:[o,"form-check"],V=G[0],M=G[1];o=Object(f.a)(V,M);var U=Object(i.useContext)(x).controlId,B=Object(i.useMemo)((function(){return{controlId:a||U,custom:A}}),[U,A,a]),J=A||null!=z&&!1!==z&&!D,Q=r.a.createElement(p,Object(s.a)({},q,{type:"switch"===E?"checkbox":E,ref:t,isValid:O,isInvalid:y,isStatic:!J,disabled:u,as:L}));return r.a.createElement(x.Provider,{value:B},r.a.createElement("div",{style:P,className:c()(S,o,A&&"custom-"+E,m&&o+"-inline")},D||r.a.createElement(r.a.Fragment,null,Q,J&&r.a.createElement(N,{title:F},z),(O||y)&&r.a.createElement(j,{type:O?"valid":"invalid",tooltip:I},k))))}));C.displayName="FormCheck",C.Input=p,C.Label=N;var I=C,k=["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","lang","as"],S=r.a.forwardRef((function(e,t){var a=e.id,o=e.bsPrefix,n=e.bsCustomPrefix,d=e.className,m=e.isValid,b=e.isInvalid,u=e.lang,j=e.as,v=void 0===j?"input":j,O=Object(l.a)(e,k),p=Object(i.useContext)(x),h=p.controlId,y=p.custom?[n,"custom-file-input"]:[o,"form-control-file"],N=y[0],g=y[1];return o=Object(f.a)(N,g),r.a.createElement(v,Object(s.a)({},O,{ref:t,id:a||h,type:"file",lang:u,className:c()(d,o,m&&"is-valid",b&&"is-invalid")}))}));S.displayName="FormFileInput";var P=S,w=["bsPrefix","bsCustomPrefix","className","htmlFor"],F=r.a.forwardRef((function(e,t){var a=e.bsPrefix,o=e.bsCustomPrefix,n=e.className,d=e.htmlFor,m=Object(l.a)(e,w),b=Object(i.useContext)(x),u=b.controlId,j=b.custom?[o,"custom-file-label"]:[a,"form-file-label"],v=j[0],O=j[1];return a=Object(f.a)(v,O),r.a.createElement("label",Object(s.a)({},m,{ref:t,htmlFor:d||u,className:c()(n,a),"data-browse":m["data-browse"]}))}));F.displayName="FormFileLabel";var T=F,E=["id","bsPrefix","bsCustomPrefix","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","label","children","custom","lang","data-browse","as","inputAs"],z=r.a.forwardRef((function(e,t){var a=e.id,o=e.bsPrefix,n=e.bsCustomPrefix,d=e.disabled,m=void 0!==d&&d,b=e.isValid,u=void 0!==b&&b,v=e.isInvalid,O=void 0!==v&&v,p=e.feedbackTooltip,h=void 0!==p&&p,y=e.feedback,N=e.className,g=e.style,C=e.label,I=e.children,k=e.custom,S=e.lang,w=e["data-browse"],F=e.as,z=void 0===F?"div":F,D=e.inputAs,W=void 0===D?"input":D,R=Object(l.a)(e,E),L=k?[n,"custom"]:[o,"form-file"],q=L[0],A=L[1];o=Object(f.a)(q,A);var G=Object(i.useContext)(x).controlId,V=Object(i.useMemo)((function(){return{controlId:a||G,custom:k}}),[G,k,a]),M=null!=C&&!1!==C&&!I,U=r.a.createElement(P,Object(s.a)({},R,{ref:t,isValid:u,isInvalid:O,disabled:m,as:W,lang:S}));return r.a.createElement(x.Provider,{value:V},r.a.createElement(z,{style:g,className:c()(N,o,k&&"custom-file")},I||r.a.createElement(r.a.Fragment,null,k?r.a.createElement(r.a.Fragment,null,U,M&&r.a.createElement(T,{"data-browse":w},C)):r.a.createElement(r.a.Fragment,null,M&&r.a.createElement(T,null,C),U),(u||O)&&r.a.createElement(j,{type:u?"valid":"invalid",tooltip:h},y))))}));z.displayName="FormFile",z.Input=P,z.Label=T;var D=z,W=(a(46),["bsPrefix","bsCustomPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","custom","as"]),R=r.a.forwardRef((function(e,t){var a,o,n=e.bsPrefix,d=e.bsCustomPrefix,m=e.type,b=e.size,u=e.htmlSize,j=e.id,v=e.className,O=e.isValid,p=void 0!==O&&O,h=e.isInvalid,y=void 0!==h&&h,N=e.plaintext,g=e.readOnly,C=e.custom,I=e.as,k=void 0===I?"input":I,S=Object(l.a)(e,W),P=Object(i.useContext)(x).controlId,w=C?[d,"custom"]:[n,"form-control"],F=w[0],T=w[1];if(n=Object(f.a)(F,T),N)(o={})[n+"-plaintext"]=!0,a=o;else if("file"===m){var E;(E={})[n+"-file"]=!0,a=E}else if("range"===m){var z;(z={})[n+"-range"]=!0,a=z}else if("select"===k&&C){var D;(D={})[n+"-select"]=!0,D[n+"-select-"+b]=b,a=D}else{var R;(R={})[n]=!0,R[n+"-"+b]=b,a=R}return r.a.createElement(k,Object(s.a)({},S,{type:m,size:u,ref:t,readOnly:g,id:j||P,className:c()(v,a,p&&"is-valid",y&&"is-invalid")}))}));R.displayName="FormControl";var L=Object.assign(R,{Feedback:j}),q=["bsPrefix","className","children","controlId","as"],A=r.a.forwardRef((function(e,t){var a=e.bsPrefix,o=e.className,n=e.children,d=e.controlId,m=e.as,b=void 0===m?"div":m,u=Object(l.a)(e,q);a=Object(f.a)(a,"form-group");var j=Object(i.useMemo)((function(){return{controlId:d}}),[d]);return r.a.createElement(x.Provider,{value:j},r.a.createElement(b,Object(s.a)({},u,{ref:t,className:c()(o,a)}),n))}));A.displayName="FormGroup";var G=A,V=a(143),M=["as","bsPrefix","column","srOnly","className","htmlFor"],U=r.a.forwardRef((function(e,t){var a=e.as,o=void 0===a?"label":a,n=e.bsPrefix,d=e.column,m=e.srOnly,b=e.className,u=e.htmlFor,j=Object(l.a)(e,M),v=Object(i.useContext)(x).controlId;n=Object(f.a)(n,"form-label");var O="col-form-label";"string"===typeof d&&(O=O+" "+O+"-"+d);var p=c()(b,n,m&&"sr-only",d&&O);return u=u||v,d?r.a.createElement(V.a,Object(s.a)({ref:t,as:"label",className:p,htmlFor:u},j)):r.a.createElement(o,Object(s.a)({ref:t,className:p,htmlFor:u},j))}));U.displayName="FormLabel",U.defaultProps={column:!1,srOnly:!1};var B=U,J=["bsPrefix","className","as","muted"],Q=r.a.forwardRef((function(e,t){var a=e.bsPrefix,o=e.className,i=e.as,n=void 0===i?"small":i,d=e.muted,m=Object(l.a)(e,J);return a=Object(f.a)(a,"form-text"),r.a.createElement(n,Object(s.a)({},m,{ref:t,className:c()(o,a,d&&"text-muted")}))}));Q.displayName="FormText";var H=Q,_=r.a.forwardRef((function(e,t){return r.a.createElement(I,Object(s.a)({},e,{ref:t,type:"switch"}))}));_.displayName="Switch",_.Input=I.Input,_.Label=I.Label;var K=_,X=a(130),Y=["bsPrefix","inline","className","validated","as"],Z=Object(X.a)("form-row"),$=r.a.forwardRef((function(e,t){var a=e.bsPrefix,o=e.inline,i=e.className,n=e.validated,d=e.as,m=void 0===d?"form":d,b=Object(l.a)(e,Y);return a=Object(f.a)(a,"form"),r.a.createElement(m,Object(s.a)({},b,{ref:t,className:c()(i,n&&"was-validated",o&&a+"-inline")}))}));$.displayName="Form",$.defaultProps={inline:!1},$.Row=Z,$.Group=G,$.Control=L,$.Check=I,$.File=D,$.Switch=K,$.Label=B,$.Text=H;t.a=$},1419:function(e,t,a){},1586:function(e,t,a){"use strict";a.r(t);var s=a(0),l=a(115),o=a(126),c=a(20),i=a(1560),r=a(1494),n=a(143),d=a(119),m=(a(1419),a(371),a(34)),b=a(265),u=a(14),j=a.p+"static/media/Dialer.889237df.svg",x=a(21),f=a(687),v=a.n(f),O=a(4);const p=e=>{const t=e.location.state?e.location.state.taskId:"",[a,f]=Object(s.useState)(!0),[p,h]=Object(s.useState)({}),[y,N]=Object(s.useState)(null),[g,C]=Object(s.useState)(""),[I,k]=Object(s.useState)(!1),[S,P]=Object(s.useState)([]),[w,F]=Object(s.useState)(!1),T=()=>F(!1),{auth:{userData:E}}=Object(x.d)(),[z,D]=Object(s.useState)(""),[W,R]=Object(s.useState)(!1),[L,q]=Object(s.useState)({accessToken:"",lockId:"",lockmac:"",propertyId:""}),A=Object(s.useCallback)((async e=>{try{const c=await Object(d.pc)({id:e});if(200===c.data.status&&c.data.resourceData){var t,a,s,l,o;R(!0),console.log("result_data.data.resourceData:",c.data.resourceData),D(null===c||void 0===c||null===(t=c.data)||void 0===t?void 0:t.resourceData);const e={accessToken:null===c||void 0===c||null===(a=c.data)||void 0===a?void 0:a.resourceData.accessToken,lockId:null===c||void 0===c||null===(s=c.data)||void 0===s?void 0:s.resourceData.lockId,lockmac:null===c||void 0===c||null===(l=c.data)||void 0===l?void 0:l.resourceData.lockmac,propertyId:null===c||void 0===c||null===(o=c.data)||void 0===o?void 0:o.resourceData.propertyId};q(e)}}catch(c){}}),[]),G=Object(s.useCallback)((()=>{Object(d.Db)({taskId:t}).then((e=>{console.log("getExecutionTaskDetail",e),e.data&&(e.data.resourceData&&h(e.data.resourceData),A(e.data.resourceData.propertyId)),f(!1),console.log("response",e)})).catch((e=>{f(!1),console.log("error",e)}))}),[t]);Object(s.useEffect)((()=>{G()}),[G]);const V=Object(s.useCallback)((()=>{Object(d.Pb)({requestId:t}).then((e=>{e&&(e&&P(e),e.error&&N(e.error)),f(!1),console.log("response",e)})).catch((e=>{f(!1),console.log("error",e)}))}),[d.Pb]);Object(s.useEffect)((()=>{V()}),[V]);return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(i.a,{show:w,onHide:T,className:"confirmation-modal",centered:!0,children:Object(O.jsx)(i.a.Body,{children:Object(O.jsxs)("div",{className:"confirm-modal",children:[Object(O.jsx)(c.a,{size:"regular",fontWeight:"bold",color:"secondryColor",className:"text-center",text:"Do you wish to approve this property to list on Smartdoor?"}),Object(O.jsxs)("div",{className:"text-center mt-5 mb-3",children:[Object(O.jsx)(o.a,{name:"Cancel",varient:"disable",type:"button",size:"xSmall",color:"black",className:"mr-3",onClick:T}),Object(O.jsx)(o.a,{name:"Approve",varient:"primary",type:"submit",size:"xSmall",color:"white",onClick:function(){p.propertyId&&Object(d.m)({propertyId:p.propertyId}).then((e=>{e.data&&200===e.data.status&&G(),T()})).catch((e=>{console.log(e)}))}})]})]})})}),Object(O.jsx)("div",{style:{height:"2%"}}),Object(O.jsx)("div",{className:"whiteBg",children:y?Object(O.jsx)("h5",{className:"p-2",children:"Data Not Found"}):a&&!Object.keys(p).length>0?Object(O.jsx)("div",{children:"Loading..."}):Object(O.jsxs)(O.Fragment,{children:[Object(O.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(O.jsxs)("div",{children:[Object(O.jsxs)("div",{className:"d-flex align-items-center",children:[Object(O.jsx)(u.b,{className:"removeUnderline",to:{pathname:"/admin/execution/installation-detail/property-details",state:{propertyId:null===p||void 0===p?void 0:p.propertyId,userId:Number(E.userid)}},children:Object(O.jsx)(c.a,{size:"medium",fontWeight:"mediumbold",color:"secondryColor",text:p.societyName,className:" linkFor mr-2"})}),Object(m.p)(p.status)]}),Object(O.jsx)(c.a,{size:"Small",fontWeight:"smbold",color:"secondryColor",text:p.locality||""})]}),Object(O.jsxs)("div",{className:"locationSelect",children:[p.status&&"COMPLETED"===p.status&&"UN INSTALLATION"!==(null===p||void 0===p?void 0:p.requestType)&&null!==p&&void 0!==p&&p.societyEnrolled?Object(O.jsx)(o.a,{name:p.approved?"Approved":"Approve",varient:"primary",disabled:p.approved,type:"submit",size:"xSmall",color:"white",onClick:()=>F(!0)}):null,Object(O.jsx)("span",{className:"ml-2"}),!p.status||"COMPLETED"!==p.status&&"IN PROGRESS"!==p.status&&"ASSIGNED"!==p.status&&"ACCEPTED"!==p.status?Object(O.jsx)(o.a,{name:I?"Save":"Edit",varient:"primary",type:"submit",size:"xSmall",color:"white",onClick:()=>{k(!I),I?Object(d.q)({userRequestId:t,executivePersonId:g,city:S.location}).then((e=>{200===e.data.status&&G()})).catch((e=>console.log(e))):console.log("")}}):null,W?Object(O.jsx)(o.a,{name:"Print QR",varient:"primary",size:"xSmall",color:"white",onClick:()=>{console.log("print entered");const e='<div style="display:flex;justify-content:center;align-items:center;height:100%;"><div id="qrcode">'+document.getElementById("qrcode").innerHTML+"</div></div>",t=window.open("","","height=600,width=800");t.document.write("<html><head><title>QR Code</title>"),t.document.write("<style>@media print{body {margin: 0;}}</style>"),t.document.write("</head><body>"),t.document.write(e),t.document.write("</body></html>"),t.document.close(),t.focus(),t.print(),t.close()}}):null]})]}),Object(O.jsxs)(r.a,{className:"mt-3",children:[Object(O.jsx)(n.a,{children:Object(O.jsxs)("div",{children:[Object(O.jsx)(c.a,{size:"xSmall",fontWeight:"smbold",color:"TaupeGrey",text:"Date & Time"}),Object(O.jsx)(c.a,{size:"Small",fontWeight:"mediumbold",color:"secondryColor",text:"".concat(p.taskDate?Object(m.f)(p.taskDate):""," | ").concat(p.timeSlot||"-")})]})}),Object(O.jsx)(n.a,{children:Object(O.jsxs)("div",{children:[Object(O.jsx)(c.a,{size:"xSmall",fontWeight:"smbold",color:"TaupeGrey",text:"For"}),Object(O.jsx)(c.a,{size:"Small",fontWeight:"mediumbold",color:"secondryColor",text:p.requestType?p.requestType.replace(/\s+/g,"-").capitalize():"-"})]})}),Object(O.jsx)(n.a,{children:Object(O.jsxs)("div",{children:[Object(O.jsx)(c.a,{size:"xSmall",fontWeight:"smbold",color:"TaupeGrey",text:"Customer Name"}),Object(O.jsx)(u.b,{className:"removeUnderline",to:"/admin/execution/installation-detail/consumer-details/".concat(p.customerId),children:Object(O.jsx)(c.a,{className:"linkFor",size:"Small",fontWeight:"mediumbold",color:"secondryColor",text:p.requestType?p.customerName:"-"})})]})}),Object(O.jsx)(n.a,{children:Object(O.jsxs)("div",{children:[Object(O.jsx)(c.a,{size:"xSmall",fontWeight:"smbold",color:"TaupeGrey",text:"Customer Phone No"}),Object(O.jsx)("img",{className:"dialer",src:j}),Object(O.jsx)(c.a,{className:"phnumber",size:"Small",fontWeight:"mediumbold",color:"secondryColor",text:p.requestType?p.customerContactNumber:"-"})]})}),Object(O.jsx)(n.a,{children:Object(O.jsxs)("div",{children:[Object(O.jsx)(c.a,{size:"xSmall",fontWeight:"smbold",color:"TaupeGrey",text:"Assigned To"}),I?Object(O.jsx)("div",{className:"w-75 e_select",children:Object(O.jsx)(l.a.Group,{controlId:"exampleForm.SelectCustom",className:"",children:Object(O.jsxs)(l.a.Control,{as:"select",onChange:e=>C(e.target.value),children:[Object(O.jsx)("option",{value:"",disabled:!0,selected:!0,children:"Assign"}),S?S.map(((e,t)=>Object(O.jsx)("option",{value:e.id,children:e.name},t))):null]})})}):Object(O.jsx)(c.a,{size:"Small",fontWeight:"mediumbold",color:"secondryColor",text:p.assignTo||"-"})]})}),Object(O.jsx)(n.a,{children:Object(O.jsxs)("div",{children:[Object(O.jsx)(c.a,{size:"xSmall",fontWeight:"smbold",color:"TaupeGrey",text:"Property Type"}),Object(O.jsx)(c.a,{size:"Small",fontWeight:"mediumbold",color:"secondryColor",text:p.propertyType||"-"})]})})]}),Object(O.jsx)("div",{className:"separator mt-4"}),Object(O.jsx)("div",{id:"qrcode",style:{display:"none"},className:"qrcode",children:Object(O.jsx)(v.a,{id:"printable",title:"Property QR",value:JSON.stringify(L),size:400})}),Object(O.jsxs)("div",{className:"feedBack mt-4",children:[Object(O.jsx)(c.a,{size:"medium",fontWeight:"mediumbold",color:"secondryColor",text:"INSTALLATION"===(null===p||void 0===p?void 0:p.requestType)?"Installation Process":"Un-installation Process"}),p&&p.comments&&p.comments.length?Object(O.jsxs)("div",{className:"mt-3",children:[Object(O.jsx)(c.a,{size:"Small",fontWeight:"mediumbold",color:"secondryColor",text:"Problems Reported"}),p&&p.comments?p.comments.map(((e,t)=>Object(O.jsxs)("div",{children:[Object(O.jsxs)("div",{className:"d-flex align-items-center mt-2",children:[Object(O.jsx)(c.a,{size:"Small",fontWeight:"mediumbold",color:"",text:"From: ".concat(e.assignTo),className:"mt-0 mr-1"}),Object(O.jsx)(c.a,{size:"Small",fontWeight:"mediumbold",color:"primaryColor",text:e.status,className:"mt-0"}),Object(O.jsx)(c.a,{size:"xSmall",fontWeight:"smbold",color:"TaupeGrey",text:e.commentDate?Object(m.g)(e.commentDate):"-",className:"ml-2"})]}),Object(O.jsx)(c.a,{size:"Small",fontWeight:"smbold",color:"secondryColor",text:e.comment,className:"mt-1"})]},t))):Object(O.jsx)("span",{children:"-"})]}):null,p&&p.successMessage?Object(O.jsxs)("div",{className:"mt-3",children:[Object(O.jsx)(c.a,{size:"Small",fontWeight:"mediumbold",color:"secondryColor",text:"INSTALLATION"===(null===p||void 0===p?void 0:p.requestType)?"Installation Feedback":"Un-installation Feedback"}),Object(O.jsxs)("div",{className:"d-flex align-items-center mt-2",children:[Object(O.jsx)(c.a,{size:"Small",fontWeight:"mediumbold",color:"",text:"From: ".concat(p.assignTo||"-"),className:"mt-0 mr-1"}),Object(O.jsx)(c.a,{size:"xSmall",fontWeight:"smbold",color:"TaupeGrey",text:p.successMessageDate?Object(m.g)(p.successMessageDate):"-",className:"ml-2"})]}),Object(O.jsx)(c.a,{size:"Small",fontWeight:"mediumbold",color:"primaryColor",text:p.successMessage||"-",className:"mt-0"})]}):null,p&&p.requestCodeDetails&&p.requestCodeDetails.length?Object(O.jsxs)("div",{className:"mt-4",children:[Object(O.jsx)("div",{className:"d-flex align-items-center mt-2",children:Object(O.jsx)(c.a,{size:"Small",fontWeight:"mediumbold",color:"secondryColor",text:"Check List "})}),Object(O.jsx)("div",{children:Object(O.jsx)("div",{className:"cursor-remove",children:p&&p.requestCodeDetails?p.requestCodeDetails.map(((e,t)=>Object(O.jsx)("div",{className:"mt-2",children:Object(O.jsx)(b.a,{id:t,value:t,label:e.description,checked:e.checked})}))):null})})]}):null]})]})})]})};t.default=Object(s.memo)(p)},265:function(e,t,a){"use strict";a(266);var s=a(4);t.a=function(e){return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("input",{className:"styled-checkbox",id:e.id,type:"checkbox",value:e.value,checked:e.checked,onChange:e.onChange}),Object(s.jsx)("label",{htmlFor:e.id,className:"fs-14",children:e.label})]})}},266:function(e,t,a){}}]);