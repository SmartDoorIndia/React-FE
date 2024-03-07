(this.webpackJsonpsmartdoor=this.webpackJsonpsmartdoor||[]).push([[38],{115:function(e,t,a){"use strict";var n=a(5),s=a(6),i=a(25),r=a.n(i),l=a(0),o=a.n(l),c=(a(114),a(7)),d=a.n(c),u=["as","className","type","tooltip"],m={type:d.a.string,tooltip:d.a.bool,as:d.a.elementType},b=o.a.forwardRef((function(e,t){var a=e.as,i=void 0===a?"div":a,l=e.className,c=e.type,d=void 0===c?"valid":c,m=e.tooltip,b=void 0!==m&&m,p=Object(s.a)(e,u);return o.a.createElement(i,Object(n.a)({},p,{ref:t,className:r()(l,d+"-"+(b?"tooltip":"feedback"))}))}));b.displayName="Feedback",b.propTypes=m;var p=b,j=o.a.createContext({controlId:void 0}),f=a(28),x=["id","bsPrefix","bsCustomPrefix","className","type","isValid","isInvalid","isStatic","as"],O=o.a.forwardRef((function(e,t){var a=e.id,i=e.bsPrefix,c=e.bsCustomPrefix,d=e.className,u=e.type,m=void 0===u?"checkbox":u,b=e.isValid,p=void 0!==b&&b,O=e.isInvalid,v=void 0!==O&&O,h=e.isStatic,g=e.as,N=void 0===g?"input":g,P=Object(s.a)(e,x),C=Object(l.useContext)(j),E=C.controlId,S=C.custom?[c,"custom-control-input"]:[i,"form-check-input"],I=S[0],R=S[1];return i=Object(f.a)(I,R),o.a.createElement(N,Object(n.a)({},P,{ref:t,type:m,id:a||E,className:r()(d,i,p&&"is-valid",v&&"is-invalid",h&&"position-static")}))}));O.displayName="FormCheckInput";var v=O,h=["bsPrefix","bsCustomPrefix","className","htmlFor"],g=o.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.bsCustomPrefix,c=e.className,d=e.htmlFor,u=Object(s.a)(e,h),m=Object(l.useContext)(j),b=m.controlId,p=m.custom?[i,"custom-control-label"]:[a,"form-check-label"],x=p[0],O=p[1];return a=Object(f.a)(x,O),o.a.createElement("label",Object(n.a)({},u,{ref:t,htmlFor:d||b,className:r()(c,a)}))}));g.displayName="FormCheckLabel";var N=g,P=["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","title","type","label","children","custom","as"],C=o.a.forwardRef((function(e,t){var a=e.id,i=e.bsPrefix,c=e.bsCustomPrefix,d=e.inline,u=void 0!==d&&d,m=e.disabled,b=void 0!==m&&m,x=e.isValid,O=void 0!==x&&x,h=e.isInvalid,g=void 0!==h&&h,C=e.feedbackTooltip,E=void 0!==C&&C,S=e.feedback,I=e.className,R=e.style,y=e.title,w=void 0===y?"":y,D=e.type,T=void 0===D?"checkbox":D,k=e.label,L=e.children,A=e.custom,F=e.as,G=void 0===F?"input":F,q=Object(s.a)(e,P),M="switch"===T||A,z=M?[c,"custom-control"]:[i,"form-check"],V=z[0],W=z[1];i=Object(f.a)(V,W);var H=Object(l.useContext)(j).controlId,B=Object(l.useMemo)((function(){return{controlId:a||H,custom:M}}),[H,M,a]),U=M||null!=k&&!1!==k&&!L,J=o.a.createElement(v,Object(n.a)({},q,{type:"switch"===T?"checkbox":T,ref:t,isValid:O,isInvalid:g,isStatic:!U,disabled:b,as:G}));return o.a.createElement(j.Provider,{value:B},o.a.createElement("div",{style:R,className:r()(I,i,M&&"custom-"+T,u&&i+"-inline")},L||o.a.createElement(o.a.Fragment,null,J,U&&o.a.createElement(N,{title:w},k),(O||g)&&o.a.createElement(p,{type:O?"valid":"invalid",tooltip:E},S))))}));C.displayName="FormCheck",C.Input=v,C.Label=N;var E=C,S=["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","lang","as"],I=o.a.forwardRef((function(e,t){var a=e.id,i=e.bsPrefix,c=e.bsCustomPrefix,d=e.className,u=e.isValid,m=e.isInvalid,b=e.lang,p=e.as,x=void 0===p?"input":p,O=Object(s.a)(e,S),v=Object(l.useContext)(j),h=v.controlId,g=v.custom?[c,"custom-file-input"]:[i,"form-control-file"],N=g[0],P=g[1];return i=Object(f.a)(N,P),o.a.createElement(x,Object(n.a)({},O,{ref:t,id:a||h,type:"file",lang:b,className:r()(d,i,u&&"is-valid",m&&"is-invalid")}))}));I.displayName="FormFileInput";var R=I,y=["bsPrefix","bsCustomPrefix","className","htmlFor"],w=o.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.bsCustomPrefix,c=e.className,d=e.htmlFor,u=Object(s.a)(e,y),m=Object(l.useContext)(j),b=m.controlId,p=m.custom?[i,"custom-file-label"]:[a,"form-file-label"],x=p[0],O=p[1];return a=Object(f.a)(x,O),o.a.createElement("label",Object(n.a)({},u,{ref:t,htmlFor:d||b,className:r()(c,a),"data-browse":u["data-browse"]}))}));w.displayName="FormFileLabel";var D=w,T=["id","bsPrefix","bsCustomPrefix","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","label","children","custom","lang","data-browse","as","inputAs"],k=o.a.forwardRef((function(e,t){var a=e.id,i=e.bsPrefix,c=e.bsCustomPrefix,d=e.disabled,u=void 0!==d&&d,m=e.isValid,b=void 0!==m&&m,x=e.isInvalid,O=void 0!==x&&x,v=e.feedbackTooltip,h=void 0!==v&&v,g=e.feedback,N=e.className,P=e.style,C=e.label,E=e.children,S=e.custom,I=e.lang,y=e["data-browse"],w=e.as,k=void 0===w?"div":w,L=e.inputAs,A=void 0===L?"input":L,F=Object(s.a)(e,T),G=S?[c,"custom"]:[i,"form-file"],q=G[0],M=G[1];i=Object(f.a)(q,M);var z=Object(l.useContext)(j).controlId,V=Object(l.useMemo)((function(){return{controlId:a||z,custom:S}}),[z,S,a]),W=null!=C&&!1!==C&&!E,H=o.a.createElement(R,Object(n.a)({},F,{ref:t,isValid:b,isInvalid:O,disabled:u,as:A,lang:I}));return o.a.createElement(j.Provider,{value:V},o.a.createElement(k,{style:P,className:r()(N,i,S&&"custom-file")},E||o.a.createElement(o.a.Fragment,null,S?o.a.createElement(o.a.Fragment,null,H,W&&o.a.createElement(D,{"data-browse":y},C)):o.a.createElement(o.a.Fragment,null,W&&o.a.createElement(D,null,C),H),(b||O)&&o.a.createElement(p,{type:b?"valid":"invalid",tooltip:h},g))))}));k.displayName="FormFile",k.Input=R,k.Label=D;var L=k,A=(a(46),["bsPrefix","bsCustomPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","custom","as"]),F=o.a.forwardRef((function(e,t){var a,i,c=e.bsPrefix,d=e.bsCustomPrefix,u=e.type,m=e.size,b=e.htmlSize,p=e.id,x=e.className,O=e.isValid,v=void 0!==O&&O,h=e.isInvalid,g=void 0!==h&&h,N=e.plaintext,P=e.readOnly,C=e.custom,E=e.as,S=void 0===E?"input":E,I=Object(s.a)(e,A),R=Object(l.useContext)(j).controlId,y=C?[d,"custom"]:[c,"form-control"],w=y[0],D=y[1];if(c=Object(f.a)(w,D),N)(i={})[c+"-plaintext"]=!0,a=i;else if("file"===u){var T;(T={})[c+"-file"]=!0,a=T}else if("range"===u){var k;(k={})[c+"-range"]=!0,a=k}else if("select"===S&&C){var L;(L={})[c+"-select"]=!0,L[c+"-select-"+m]=m,a=L}else{var F;(F={})[c]=!0,F[c+"-"+m]=m,a=F}return o.a.createElement(S,Object(n.a)({},I,{type:u,size:b,ref:t,readOnly:P,id:p||R,className:r()(x,a,v&&"is-valid",g&&"is-invalid")}))}));F.displayName="FormControl";var G=Object.assign(F,{Feedback:p}),q=["bsPrefix","className","children","controlId","as"],M=o.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.className,c=e.children,d=e.controlId,u=e.as,m=void 0===u?"div":u,b=Object(s.a)(e,q);a=Object(f.a)(a,"form-group");var p=Object(l.useMemo)((function(){return{controlId:d}}),[d]);return o.a.createElement(j.Provider,{value:p},o.a.createElement(m,Object(n.a)({},b,{ref:t,className:r()(i,a)}),c))}));M.displayName="FormGroup";var z=M,V=a(143),W=["as","bsPrefix","column","srOnly","className","htmlFor"],H=o.a.forwardRef((function(e,t){var a=e.as,i=void 0===a?"label":a,c=e.bsPrefix,d=e.column,u=e.srOnly,m=e.className,b=e.htmlFor,p=Object(s.a)(e,W),x=Object(l.useContext)(j).controlId;c=Object(f.a)(c,"form-label");var O="col-form-label";"string"===typeof d&&(O=O+" "+O+"-"+d);var v=r()(m,c,u&&"sr-only",d&&O);return b=b||x,d?o.a.createElement(V.a,Object(n.a)({ref:t,as:"label",className:v,htmlFor:b},p)):o.a.createElement(i,Object(n.a)({ref:t,className:v,htmlFor:b},p))}));H.displayName="FormLabel",H.defaultProps={column:!1,srOnly:!1};var B=H,U=["bsPrefix","className","as","muted"],J=o.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.className,l=e.as,c=void 0===l?"small":l,d=e.muted,u=Object(s.a)(e,U);return a=Object(f.a)(a,"form-text"),o.a.createElement(c,Object(n.a)({},u,{ref:t,className:r()(i,a,d&&"text-muted")}))}));J.displayName="FormText";var K=J,_=o.a.forwardRef((function(e,t){return o.a.createElement(E,Object(n.a)({},e,{ref:t,type:"switch"}))}));_.displayName="Switch",_.Input=E.Input,_.Label=E.Label;var Q=_,X=a(130),Y=["bsPrefix","inline","className","validated","as"],Z=Object(X.a)("form-row"),$=o.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.inline,l=e.className,c=e.validated,d=e.as,u=void 0===d?"form":d,m=Object(s.a)(e,Y);return a=Object(f.a)(a,"form"),o.a.createElement(u,Object(n.a)({},m,{ref:t,className:r()(l,c&&"was-validated",i&&a+"-inline")}))}));$.displayName="Form",$.defaultProps={inline:!1},$.Row=Z,$.Group=z,$.Control=G,$.Check=E,$.File=L,$.Switch=Q,$.Label=B,$.Text=K;t.a=$},123:function(e,t,a){"use strict";var n=a(150),s=a.n(n),i=(a(128),a(0)),r=a(125),l=a(56),o=a(4);const c=Object(o.jsx)("img",{src:r.a,className:"ml-1",width:"10px",alt:"SHORT_ICON"}),d=Object(o.jsx)(l.b,{}),u=e=>{let{title:t,columns:a,data:n,pagination:i,progressPending:r,onChangePage:l,paginationComponent:u,paginationRowsPerPageOptions:b,paginationPerPage:p,sortIcon:j,progressComponent:f,striped:x,...O}=e;return Object(o.jsx)(s.a,{title:t,columns:a,data:n,pagination:!1!==i,highlightOnHover:!0,progressPending:r,onChangePage:l,striped:!1!==x,paginationComponent:u,paginationRowsPerPageOptions:b,paginationPerPage:p,customStyles:m,sortIcon:j||c,progressComponent:f||d,...O})},m={rows:{style:{borderBottomWidth:"0 !important","&:nth-child(even)":{backgroundColor:"#fff"},"&:nth-child(odd)":{backgroundColor:"#f8f3f5"}}},headCells:{style:{fontWeight:"700 !important",fontSize:".875rem",color:"#252525",justifyContent:"center","&:first-child":{minWidth:"70px",maxWidth:"100px"}}},cells:{style:{fontSize:".875rem",color:"#252525","&:first-child":{minWidth:"100px",maxWidth:"120px"}}}};t.a=Object(i.memo)(u)},125:function(e,t,a){"use strict";t.a=a.p+"static/media/sort-icon.a64bca1a.svg"},128:function(e,t,a){},132:function(e,t,a){},134:function(e,t,a){"use strict";var n,s,i,r,l,o,c,d,u,m,b,p=a(135),j=a(0),f=a(163),x=a(4);const O=function(){return Object(f.css)(n||(n=Object(p.a)(["\n    @media screen and (max-width: ","px) {\n      ","\n    }\n  "])),599,Object(f.css)(...arguments))},v=f.default.select(s||(s=Object(p.a)(["\n  cursor: pointer;\n  height: 24px;\n  min-width: 24px;\n  user-select: none;\n  padding-left: 8px;\n  padding-right: 12px;\n  box-sizing: content-box;\n  font-size: inherit;\n  color: inherit;\n  border: none;\n  background-color: transparent;\n  appearance: none;\n  direction: ltr;\n  &::-ms-expand {\n    display: none;\n  }\n  &:disabled::-ms-expand {\n    background: #f60;\n  }\n  option {\n    color: initial;\n  }\n"]))),h=f.default.div(i||(i=Object(p.a)(["\n  position: relative;\n  flex-shrink: 0;\n  font-size: inherit;\n  color: inherit;\n  margin-top: 1px;\n  svg {\n    top: 0;\n    right: 0;\n    color: inherit;\n    position: absolute;\n    fill: currentColor;\n    width: 24px;\n    height: 24px;\n    display: inline-block;\n    user-select: none;\n    pointer-events: none;\n  }\n"]))),g={rowsPerPageText:"Rows per page:",rangeSeparatorText:"of",noRowsPerPage:!1,selectAllRowsItem:!1,selectAllRowsItemText:"All"},N=f.default.nav(r||(r=Object(p.a)(["\n  display: flex;\n  flex: 1 1 auto;\n  // justify-content: flex-end;\n  align-items: center;\n  box-sizing: border-box;\n  padding-right: 8px;\n  padding-left: 8px;\n  width: 100%;\n  ",";\n"])),(e=>e.theme.pagination.style)),P=f.default.button(l||(l=Object(p.a)(["\n  position: relative;\n  display: block;\n  user-select: none;\n  border: none;\n  ",";\n  ",";\n"])),(e=>e.theme.pagination.pageButtonsStyle),(e=>e.isRTL&&"transform: scale(-1, -1)")),C=f.default.div(o||(o=Object(p.a)(["\n  display: flex;\n  align-items: center;\n  border-radius: 4px;\n  white-space: nowrap;\n  ",";\n"])),O(c||(c=Object(p.a)(["\n    width: 100%;\n    justify-content: space-around;\n  "])))),E=f.default.span(d||(d=Object(p.a)(["\n  flex-shrink: 1;\n  user-select: none;\n"]))),S=Object(f.default)(E)(u||(u=Object(p.a)(["\n  margin: 0 24px;\n"]))),I=Object(f.default)(E)(m||(m=Object(p.a)(["\n  margin: 0 4px;\n"]))),R=f.default.div(b||(b=Object(p.a)(["\n  margin: ",";\n  display: ",";\n\n  "])),(e=>e.margin),(e=>e.display)),y=(e,t)=>Math.ceil(e/t),w=e=>Object(x.jsx)(h,{children:Object(x.jsx)(v,{...e})});t.a=e=>{let{rowsPerPage:t,rowCount:a,onChangePage:n,onChangeRowsPerPage:s,currentPage:i,direction:r,paginationRowsPerPageOptions:l,paginationIconLastPage:o,paginationIconFirstPage:c,paginationIconNext:d,paginationIconPrevious:u,paginationComponentOptions:m,PaginationActionButton:b}=e;const p=!1,f=y(a,t),O=i*t,v=O-t+1,h=1===i,E=i===f,D={...g,...m},T=i===f?"".concat(v,"-").concat(a," ").concat(D.rangeSeparatorText," ").concat(a):"".concat(v,"-").concat(O," ").concat(D.rangeSeparatorText," ").concat(a),k=Object(j.useCallback)((()=>n(i-1)),[i,n]),L=Object(j.useCallback)((()=>n(i+1)),[i,n]),A=Object(j.useCallback)((()=>n(1)),[n]),F=Object(j.useCallback)((()=>n(y(a,t))),[n,a,t]),G=Object(j.useCallback)((e=>{let{target:t}=e;return s(Number(t.value),i)}),[i,s]),q=l.map((e=>Object(x.jsx)("option",{value:e,children:e},e)));D.selectAllRowsItem&&q.push(Object(x.jsx)("option",{value:a,children:D.selectAllRowsItemText},-1));const M=Object(x.jsx)(w,{onChange:G,defaultValue:t,"aria-label":D.rowsPerPageText,children:q});return Object(x.jsxs)(N,{className:"rdt_Pagination",children:[Object(x.jsx)(R,{margin:"0 auto",children:" "}),Object(x.jsx)(R,{margin:"0 auto",children:b?Object(x.jsx)(b,{}):null}),Object(x.jsxs)(R,{style:{display:"contents"},children:[!D.noRowsPerPage&&Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(I,{children:D.rowsPerPageText}),M]}),Object(x.jsx)(S,{children:T}),Object(x.jsxs)(C,{children:[Object(x.jsx)(P,{id:"pagination-first-page",type:"button","aria-label":"First Page","aria-disabled":h,onClick:A,disabled:h,isRTL:p,children:c}),Object(x.jsx)(P,{id:"pagination-previous-page",type:"button","aria-label":"Previous Page","aria-disabled":h,onClick:k,disabled:h,isRTL:p,children:u}),!1,Object(x.jsx)(P,{id:"pagination-next-page",type:"button","aria-label":"Next Page","aria-disabled":E,onClick:L,disabled:E,isRTL:p,children:d}),Object(x.jsx)(P,{id:"pagination-last-page",type:"button","aria-label":"Last Page","aria-disabled":E,onClick:F,disabled:E,isRTL:p,children:o})]})]})]})}},135:function(e,t,a){"use strict";function n(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}a.d(t,"a",(function(){return n}))},139:function(e,t,a){"use strict";t.a=a.p+"static/media/content-ico.1134bf42.svg"},148:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));a(132);var n=a(0),s=a(115),i=a(20),r=a(4);const l=Object(n.forwardRef)(((e,t)=>{let{id:a,label:n,children:l,error:o,placeholder:c,leadingIcon:d,type:u,component:m,...b}=e,p=a||n&&n.replace(/\s/g,"")||"formInput"+Math.random();return Object(r.jsx)("div",{className:"sdInputFields",children:Object(r.jsxs)(s.a.Group,{controlId:p,children:[Object(r.jsxs)(s.a.Label,{children:[" ",n," "]}),Object(r.jsx)(s.a.Control,{placeholder:m?"":c||n,ref:t,type:u,...b,children:l}),m&&Object(r.jsxs)("span",{className:"component position-absolute",children:[" ",m," "]}),d&&Object(r.jsxs)("span",{className:"leadingIcon position-absolute",children:[" ",d.replace('"',"")," "]}),o&&Object(r.jsx)(i.a,{color:"dangerText",size:"xSmall",text:o})]})})}));t.b=Object(n.memo)(l);const o=e=>{let{id:t,label:a,...n}=e,i=t||a&&a.replace(/\s/g,"")||"formInput"+Math.random();return Object(r.jsx)("div",{className:"sdInputFields",children:Object(r.jsx)("div",{className:"checkBox customChechbox",children:Object(r.jsx)(s.a.Group,{controlId:i,children:Object(r.jsx)(s.a.Check,{type:"checkbox",label:a,...n,className:"p-0"})})})})}},153:function(e,t,a){"use strict";var n=a(148),s=(a(155),a(29)),i=a.p+"static/media/Search.5d68d6da.svg",r=a(4);t.a=e=>{let{filterText:t,onFilter:a,onClear:l,placeholder:o,className:c}=e;return Object(r.jsxs)("div",{className:"searchCrossButon",children:[Object(r.jsx)(n.b,{id:"search",type:"text",placeholder:o,"aria-label":"Search Input",value:t,onChange:a,className:c}),Object(r.jsx)("div",{className:"inputSearchIcon",children:Object(r.jsx)(s.a,{src:i,name:"Search Icon",className:"img-fluid"})})]})}},1544:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(38),r=a(35),l=a(29),o=a(119),c=a(14),d=a(20),u=a(134),m=a(34),b=a(139),p=a(115),j=(a(800),a(153)),f=a(123),x=a(171),O=a(4);const v={getHelpDeskServiceRequest:o.Mb,getServiceRequest:o.nc},h=Object(i.b)((e=>{let{helpdeskServiceReq:t,serviceRequestData:a}=e;return{helpdeskServiceReq:t,serviceRequestData:a}}),v);t.default=Object(r.c)(h,n.memo)((e=>{const{getHelpDeskServiceRequest:t,helpdeskServiceReq:a,getServiceRequest:i,serviceRequestData:r}=e,[v,h]=Object(n.useState)({status:[],endDate:"",city:"",contactNumber:"",ticketNumber:"",startDate:""}),g="HELPDESK"===e.module?x.a.helpdeskServiceRequestsStatusArr:x.a.installationServiceRequestsStatusArr,[N,P]=Object(n.useState)(""),[C,E]=Object(n.useState)(""),[S,I]=Object(n.useState)(""),[R,y]=Object(n.useState)(""),[w,D]=s.a.useState(""),[T,k]=s.a.useState(!1);Object(n.useEffect)((()=>{"HELPDESK"===e.module?t({...v,records:"",pageNumber:""}):(i({...v,records:"",pageNumber:""}),Object(o.Bb)())}),[t,i]);const L=s.a.useMemo((()=>Object(O.jsx)(j.a,{onFilter:e=>D(e.target.value),onClear:()=>{w&&(k(!T),D(""))},filterText:w,placeholder:"Search here"})),[w,T]),A=[{name:"Id",selector:"ticketNo",center:!0,sortable:!0,maxWidth:"100px !important"},{name:"Date",selector:"createdDate",center:!0,sortable:!0,cell:e=>{let{createdDate:t,time:a}=e;return Object(O.jsx)("span",{children:"".concat(Object(m.f)(t)," | ").concat(Object(m.d)(t,"hh:mm a")||"-")})}},{name:"Request",selector:"ticketName",center:!0,cell:e=>{let{ticketName:t}=e;return Object(O.jsx)(m.a,{position:"top",name:t||"",children:Object(O.jsxs)("span",{className:"cursor-pointer elipsis-text",children:[" ",t||"-"," "]})})}},{name:"From",selector:"requestedBy",maxWidth:"100px",center:!0,cell:e=>{let{from:t}=e;return Object(O.jsx)("div",{children:Object(O.jsx)(m.a,{position:"top",name:t,children:Object(O.jsxs)("span",{className:"cursor-pointer elipsis-text",children:[" ",t||"-"," "]})})})}},{name:"Phone No",center:!0,maxWidth:"130px",cell:e=>{let{contactNumber:t}=e;return Object(O.jsxs)("span",{children:[" ",t||"-"," "]})}},{name:"Assigned To",selector:"assignTo",center:!0,maxWidth:"130px",cell:t=>{let{id:a,teamName:n,teamNameList:s,assignTo:r,userList:l}=t;return"HELPDESK"===e.module?Object(O.jsx)(d.a,{size:"Small",color:"secondryColor",className:"text-center",text:n||"UNASSIGNED"}):r?Object(O.jsx)(d.a,{size:"Small",color:"secondryColor",className:"text-center",text:r?r.capitalizeWord():"-"}):Object(O.jsx)("div",{className:"w-100",children:Object(O.jsx)("div",{className:"assignTo",children:Object(O.jsx)(p.a.Group,{controlId:"exampleForm.SelectCustom",className:"w-100 display-flex",children:Object(O.jsxs)(p.a.Control,{as:"select",className:"w-100 mb-1",onChange:e=>{return t=a,n=e.target.value,void Object(o.q)({userRequestId:t,executivePersonId:n}).then((e=>{200===e.data.status&&i({status:[],endDate:"",city:"",contactNumber:"",ticketNumber:"",startDate:"",records:"",pageNumber:""})})).catch((e=>console.log(e)));var t,n},children:[Object(O.jsx)("option",{children:"Assign"}),null===l||void 0===l?void 0:l.map(((e,t)=>Object(O.jsx)("option",{value:e.id,children:e.name},t)))]})})})})}},{name:"Status",selector:"status",center:!0,maxWidth:"120px",style:{"white-space":"nowrap",padding:"0 !important","max-width":"120px"},cell:e=>{let{status:t}=e;return Object(m.p)(t)}},{name:"Action",center:!0,maxWidth:"50px",cell:t=>{let{id:a}=t;return Object(O.jsx)("div",{className:"action",children:Object(O.jsx)(m.a,{position:"left",name:"View Details",children:Object(O.jsx)("span",{children:"HELPDESK"===e.module?Object(O.jsx)(c.b,{to:{pathname:"/admin/helpdesk/serviceRequest-details/".concat(a)},children:Object(O.jsx)(l.a,{name:"useraddIcon",src:b.a})}):Object(O.jsx)(c.b,{to:{pathname:"/admin/execution/serviceRequest-details/".concat(a)},children:Object(O.jsx)(l.a,{name:"useraddIcon",src:b.a})})})})})}}],F=(t,n)=>{console.log(t,"show data status"),console.log(n,"show data team");let s=t||N,i=n||C,l=[];return"HELPDESK"===e.module?(l=a.data.length?a.data.filter((e=>{var t,a,n;return(null===e||void 0===e?void 0:e.id)==w||(null===e||void 0===e||null===(t=e.ticketName)||void 0===t?void 0:t.toLowerCase().includes(w.toLowerCase()))||(null===e||void 0===e||null===(a=e.from)||void 0===a?void 0:a.toLowerCase().includes(w.toLowerCase()))||(null===e||void 0===e||null===(n=e.contactNumber)||void 0===n?void 0:n.toLowerCase().includes(w.toLowerCase()))})):[],s&&l.length&&(l=l.filter((e=>(null===e||void 0===e?void 0:e.status.toUpperCase())==s.toUpperCase()))),i&&l.length&&(l=l.filter((e=>(null===e||void 0===e?void 0:e.teamName.toUpperCase())==i.toUpperCase()))),l):(l=r.data.length?r.data.filter((e=>{var t,a,n;return(null===e||void 0===e?void 0:e.id)==w||(null===e||void 0===e||null===(t=e.ticketName)||void 0===t?void 0:t.toLowerCase().includes(w.toLowerCase()))||(null===e||void 0===e||null===(a=e.from)||void 0===a?void 0:a.toLowerCase().includes(w.toLowerCase()))||(null===e||void 0===e||null===(n=e.contactNumber)||void 0===n?void 0:n.toLowerCase().includes(w.toLowerCase()))})):[],s&&l.length&&(l=l.filter((e=>(null===e||void 0===e?void 0:e.status.toUpperCase())==s.toUpperCase()))),l)};return Object(O.jsxs)("div",{className:"tableBox bg-white",children:[Object(O.jsxs)("div",{className:"d-flex justify-content-between align-items-center tableHeading",children:[Object(O.jsx)("div",{children:Object(O.jsx)(d.a,{size:"regular",fontWeight:"mediumbold",color:"secondryColor",text:"Service Requests"})}),Object(O.jsxs)("div",{className:"locationSelect d-flex",children:[L,g.length?Object(O.jsx)(p.a.Group,{controlId:"exampleForm.SelectCustom",children:Object(O.jsxs)(p.a.Control,{as:"select",value:N,onChange:e=>{var t;t=e.target.value,P(t),I(t),F(t,R)},children:[Object(O.jsx)("option",{value:"",children:"Select Status"}),g.length?g.map(((e,t)=>Object(O.jsx)("option",{value:e,children:e},t))):null]})}):"",Object(O.jsx)(p.a.Group,{controlId:"exampleForm.SelectCustom",children:Object(O.jsxs)(p.a.Control,{as:"select",value:C,onChange:e=>{var t;t=e.target.value,E(t),y(t),F(S,t)},children:[Object(O.jsx)("option",{value:"",children:"Select Team"}),Object(O.jsx)("option",{value:"Sales Team",children:"Sales Team"}),Object(O.jsx)("option",{value:"Installation Team",children:"Installation Team"}),Object(O.jsx)("option",{value:"Helpdesk Team",children:"Helpdesk Team"}),Object(O.jsx)("option",{value:"Finance Team",children:"Finance Team"})]})})]})]}),Object(O.jsx)("div",{className:"servicrequestServicerequestsTableWrapper",children:Object(O.jsx)(f.a,{data:F(),columns:A,isPaginationButton:!1,isLoading:!1,perPageOptions:[8,16,24,32,40,48,56,64,72,80],paginationPerPage:8,paginationRowsPerPageOptions:[8,16,24,32,40,48,56,64,72,80],PaginationComponent:e=>Object(O.jsx)(u.a,{...e}),progressPending:"HELPDESK"===e.module?a.isLoading:r.isLoading})})]})}))},155:function(e,t,a){},171:function(e,t,a){"use strict";t.a={installationRequestsStatusArr:["ASSIGNED","UNASSIGNED","ACCEPTED","NOT ACCEPTED","IN PROGRESS","PROBLEM","REJECTED","COMPLETED"],installationServiceRequestsStatusArr:["PENDING","ASSIGNED","PROBLEM","REJECTED","IN PROGRESS","COMPLETED","CLOSED"],helpdeskServiceRequestsStatusArr:["PENDING","ASSIGNED","PROBLEM","REJECTED","IN PROGRESS","COMPLETED","CLOSED"],financeConsumerTransactionsStatusArr:["FAILED","COMPLETED"],financeRefundRequestStatusArr:["IN PROGRESS","PENDING","CLOSED"],ConsumerStatusArr:["PENDING","COMPLETED"],transactionLeadsStatusArr:["UNASSIGNED","ASSIGNED","IN PROGRESS","COMPLETED","DISCARDED"],meetingRequestsStatusArr:["ASSIGNED","IN PROGRESS","COMPLETED","NOT DONE"],dealApprovalsStatusArr:["PENDING","CANCELLED","APPROVED"],societyLeadsStatusArr:["PENDING","IN PROGRESS","CONVERTED","CANCELLED","NOT INTERESTED"],propertyStatusArr:["UNDER REVIEW","PUBLISHED"],propertyType:["SMARTDOOR","NON SMARTDOOR"],realtorStatusArr:["SUBMITTED","ACCEPTED","REJECTED"],brokerStatus:["Approved","APPROVED","Rejected","Hold","Pending"]}},800:function(e,t,a){}}]);