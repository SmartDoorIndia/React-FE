(this.webpackJsonpsmartdoor=this.webpackJsonpsmartdoor||[]).push([[32],{113:function(e,t,a){"use strict";var n=a(5),i=a(6),s=a(25),l=a.n(s),o=a(0),r=a.n(o),c=(a(112),a(7)),d=a.n(c),b=["as","className","type","tooltip"],u={type:d.a.string,tooltip:d.a.bool,as:d.a.elementType},m=r.a.forwardRef((function(e,t){var a=e.as,s=void 0===a?"div":a,o=e.className,c=e.type,d=void 0===c?"valid":c,u=e.tooltip,m=void 0!==u&&u,p=Object(i.a)(e,b);return r.a.createElement(s,Object(n.a)({},p,{ref:t,className:l()(o,d+"-"+(m?"tooltip":"feedback"))}))}));m.displayName="Feedback",m.propTypes=u;var p=m,j=r.a.createContext({controlId:void 0}),f=a(28),x=["id","bsPrefix","bsCustomPrefix","className","type","isValid","isInvalid","isStatic","as"],h=r.a.forwardRef((function(e,t){var a=e.id,s=e.bsPrefix,c=e.bsCustomPrefix,d=e.className,b=e.type,u=void 0===b?"checkbox":b,m=e.isValid,p=void 0!==m&&m,h=e.isInvalid,v=void 0!==h&&h,g=e.isStatic,O=e.as,y=void 0===O?"input":O,P=Object(i.a)(e,x),C=Object(o.useContext)(j),N=C.controlId,w=C.custom?[c,"custom-control-input"]:[s,"form-check-input"],I=w[0],k=w[1];return s=Object(f.a)(I,k),r.a.createElement(y,Object(n.a)({},P,{ref:t,type:u,id:a||N,className:l()(d,s,p&&"is-valid",v&&"is-invalid",g&&"position-static")}))}));h.displayName="FormCheckInput";var v=h,g=["bsPrefix","bsCustomPrefix","className","htmlFor"],O=r.a.forwardRef((function(e,t){var a=e.bsPrefix,s=e.bsCustomPrefix,c=e.className,d=e.htmlFor,b=Object(i.a)(e,g),u=Object(o.useContext)(j),m=u.controlId,p=u.custom?[s,"custom-control-label"]:[a,"form-check-label"],x=p[0],h=p[1];return a=Object(f.a)(x,h),r.a.createElement("label",Object(n.a)({},b,{ref:t,htmlFor:d||m,className:l()(c,a)}))}));O.displayName="FormCheckLabel";var y=O,P=["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","title","type","label","children","custom","as"],C=r.a.forwardRef((function(e,t){var a=e.id,s=e.bsPrefix,c=e.bsCustomPrefix,d=e.inline,b=void 0!==d&&d,u=e.disabled,m=void 0!==u&&u,x=e.isValid,h=void 0!==x&&x,g=e.isInvalid,O=void 0!==g&&g,C=e.feedbackTooltip,N=void 0!==C&&C,w=e.feedback,I=e.className,k=e.style,L=e.title,R=void 0===L?"":L,F=e.type,S=void 0===F?"checkbox":F,E=e.label,T=e.children,D=e.custom,z=e.as,B=void 0===z?"input":z,W=Object(i.a)(e,P),V="switch"===S||D,A=V?[c,"custom-control"]:[s,"form-check"],q=A[0],H=A[1];s=Object(f.a)(q,H);var M=Object(o.useContext)(j).controlId,G=Object(o.useMemo)((function(){return{controlId:a||M,custom:V}}),[M,V,a]),J=V||null!=E&&!1!==E&&!T,_=r.a.createElement(v,Object(n.a)({},W,{type:"switch"===S?"checkbox":S,ref:t,isValid:h,isInvalid:O,isStatic:!J,disabled:m,as:B}));return r.a.createElement(j.Provider,{value:G},r.a.createElement("div",{style:k,className:l()(I,s,V&&"custom-"+S,b&&s+"-inline")},T||r.a.createElement(r.a.Fragment,null,_,J&&r.a.createElement(y,{title:R},E),(h||O)&&r.a.createElement(p,{type:h?"valid":"invalid",tooltip:N},w))))}));C.displayName="FormCheck",C.Input=v,C.Label=y;var N=C,w=["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","lang","as"],I=r.a.forwardRef((function(e,t){var a=e.id,s=e.bsPrefix,c=e.bsCustomPrefix,d=e.className,b=e.isValid,u=e.isInvalid,m=e.lang,p=e.as,x=void 0===p?"input":p,h=Object(i.a)(e,w),v=Object(o.useContext)(j),g=v.controlId,O=v.custom?[c,"custom-file-input"]:[s,"form-control-file"],y=O[0],P=O[1];return s=Object(f.a)(y,P),r.a.createElement(x,Object(n.a)({},h,{ref:t,id:a||g,type:"file",lang:m,className:l()(d,s,b&&"is-valid",u&&"is-invalid")}))}));I.displayName="FormFileInput";var k=I,L=["bsPrefix","bsCustomPrefix","className","htmlFor"],R=r.a.forwardRef((function(e,t){var a=e.bsPrefix,s=e.bsCustomPrefix,c=e.className,d=e.htmlFor,b=Object(i.a)(e,L),u=Object(o.useContext)(j),m=u.controlId,p=u.custom?[s,"custom-file-label"]:[a,"form-file-label"],x=p[0],h=p[1];return a=Object(f.a)(x,h),r.a.createElement("label",Object(n.a)({},b,{ref:t,htmlFor:d||m,className:l()(c,a),"data-browse":b["data-browse"]}))}));R.displayName="FormFileLabel";var F=R,S=["id","bsPrefix","bsCustomPrefix","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","label","children","custom","lang","data-browse","as","inputAs"],E=r.a.forwardRef((function(e,t){var a=e.id,s=e.bsPrefix,c=e.bsCustomPrefix,d=e.disabled,b=void 0!==d&&d,u=e.isValid,m=void 0!==u&&u,x=e.isInvalid,h=void 0!==x&&x,v=e.feedbackTooltip,g=void 0!==v&&v,O=e.feedback,y=e.className,P=e.style,C=e.label,N=e.children,w=e.custom,I=e.lang,L=e["data-browse"],R=e.as,E=void 0===R?"div":R,T=e.inputAs,D=void 0===T?"input":T,z=Object(i.a)(e,S),B=w?[c,"custom"]:[s,"form-file"],W=B[0],V=B[1];s=Object(f.a)(W,V);var A=Object(o.useContext)(j).controlId,q=Object(o.useMemo)((function(){return{controlId:a||A,custom:w}}),[A,w,a]),H=null!=C&&!1!==C&&!N,M=r.a.createElement(k,Object(n.a)({},z,{ref:t,isValid:m,isInvalid:h,disabled:b,as:D,lang:I}));return r.a.createElement(j.Provider,{value:q},r.a.createElement(E,{style:P,className:l()(y,s,w&&"custom-file")},N||r.a.createElement(r.a.Fragment,null,w?r.a.createElement(r.a.Fragment,null,M,H&&r.a.createElement(F,{"data-browse":L},C)):r.a.createElement(r.a.Fragment,null,H&&r.a.createElement(F,null,C),M),(m||h)&&r.a.createElement(p,{type:m?"valid":"invalid",tooltip:g},O))))}));E.displayName="FormFile",E.Input=k,E.Label=F;var T=E,D=(a(45),["bsPrefix","bsCustomPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","custom","as"]),z=r.a.forwardRef((function(e,t){var a,s,c=e.bsPrefix,d=e.bsCustomPrefix,b=e.type,u=e.size,m=e.htmlSize,p=e.id,x=e.className,h=e.isValid,v=void 0!==h&&h,g=e.isInvalid,O=void 0!==g&&g,y=e.plaintext,P=e.readOnly,C=e.custom,N=e.as,w=void 0===N?"input":N,I=Object(i.a)(e,D),k=Object(o.useContext)(j).controlId,L=C?[d,"custom"]:[c,"form-control"],R=L[0],F=L[1];if(c=Object(f.a)(R,F),y)(s={})[c+"-plaintext"]=!0,a=s;else if("file"===b){var S;(S={})[c+"-file"]=!0,a=S}else if("range"===b){var E;(E={})[c+"-range"]=!0,a=E}else if("select"===w&&C){var T;(T={})[c+"-select"]=!0,T[c+"-select-"+u]=u,a=T}else{var z;(z={})[c]=!0,z[c+"-"+u]=u,a=z}return r.a.createElement(w,Object(n.a)({},I,{type:b,size:m,ref:t,readOnly:P,id:p||k,className:l()(x,a,v&&"is-valid",O&&"is-invalid")}))}));z.displayName="FormControl";var B=Object.assign(z,{Feedback:p}),W=["bsPrefix","className","children","controlId","as"],V=r.a.forwardRef((function(e,t){var a=e.bsPrefix,s=e.className,c=e.children,d=e.controlId,b=e.as,u=void 0===b?"div":b,m=Object(i.a)(e,W);a=Object(f.a)(a,"form-group");var p=Object(o.useMemo)((function(){return{controlId:d}}),[d]);return r.a.createElement(j.Provider,{value:p},r.a.createElement(u,Object(n.a)({},m,{ref:t,className:l()(s,a)}),c))}));V.displayName="FormGroup";var A=V,q=a(141),H=["as","bsPrefix","column","srOnly","className","htmlFor"],M=r.a.forwardRef((function(e,t){var a=e.as,s=void 0===a?"label":a,c=e.bsPrefix,d=e.column,b=e.srOnly,u=e.className,m=e.htmlFor,p=Object(i.a)(e,H),x=Object(o.useContext)(j).controlId;c=Object(f.a)(c,"form-label");var h="col-form-label";"string"===typeof d&&(h=h+" "+h+"-"+d);var v=l()(u,c,b&&"sr-only",d&&h);return m=m||x,d?r.a.createElement(q.a,Object(n.a)({ref:t,as:"label",className:v,htmlFor:m},p)):r.a.createElement(s,Object(n.a)({ref:t,className:v,htmlFor:m},p))}));M.displayName="FormLabel",M.defaultProps={column:!1,srOnly:!1};var G=M,J=["bsPrefix","className","as","muted"],_=r.a.forwardRef((function(e,t){var a=e.bsPrefix,s=e.className,o=e.as,c=void 0===o?"small":o,d=e.muted,b=Object(i.a)(e,J);return a=Object(f.a)(a,"form-text"),r.a.createElement(c,Object(n.a)({},b,{ref:t,className:l()(s,a,d&&"text-muted")}))}));_.displayName="FormText";var K=_,Y=r.a.forwardRef((function(e,t){return r.a.createElement(N,Object(n.a)({},e,{ref:t,type:"switch"}))}));Y.displayName="Switch",Y.Input=N.Input,Y.Label=N.Label;var Q=Y,U=a(128),X=["bsPrefix","inline","className","validated","as"],Z=Object(U.a)("form-row"),$=r.a.forwardRef((function(e,t){var a=e.bsPrefix,s=e.inline,o=e.className,c=e.validated,d=e.as,b=void 0===d?"form":d,u=Object(i.a)(e,X);return a=Object(f.a)(a,"form"),r.a.createElement(b,Object(n.a)({},u,{ref:t,className:l()(o,c&&"was-validated",s&&a+"-inline")}))}));$.displayName="Form",$.defaultProps={inline:!1},$.Row=Z,$.Group=A,$.Control=B,$.Check=N,$.File=T,$.Switch=Q,$.Label=G,$.Text=K;t.a=$},121:function(e,t,a){"use strict";var n=a(148),i=a.n(n),s=(a(126),a(0)),l=a(123),o=a(55),r=a(4);const c=Object(r.jsx)("img",{src:l.a,className:"ml-1",width:"10px",alt:"SHORT_ICON"}),d=Object(r.jsx)(o.b,{}),b=e=>{let{title:t,columns:a,data:n,pagination:s,progressPending:l,onChangePage:o,paginationComponent:b,paginationRowsPerPageOptions:m,paginationPerPage:p,sortIcon:j,progressComponent:f,striped:x,...h}=e;return Object(r.jsx)(i.a,{title:t,columns:a,data:n,pagination:!1!==s,highlightOnHover:!0,progressPending:l,onChangePage:o,striped:!1!==x,paginationComponent:b,paginationRowsPerPageOptions:m,paginationPerPage:p,customStyles:u,sortIcon:j||c,progressComponent:f||d,...h})},u={rows:{style:{borderBottomWidth:"0 !important","&:nth-child(even)":{backgroundColor:"#fff"},"&:nth-child(odd)":{backgroundColor:"#f8f3f5"}}},headCells:{style:{fontWeight:"700 !important",fontSize:".875rem",color:"#252525",justifyContent:"center","&:first-child":{minWidth:"70px",maxWidth:"100px"}}},cells:{style:{fontSize:".875rem",color:"#252525","&:first-child":{minWidth:"100px",maxWidth:"120px"}}}};t.a=Object(s.memo)(b)},123:function(e,t,a){"use strict";t.a=a.p+"static/media/sort-icon.a64bca1a.svg"},126:function(e,t,a){},130:function(e,t,a){},132:function(e,t,a){"use strict";var n,i,s,l,o,r,c,d,b,u,m,p=a(133),j=a(0),f=a(161),x=a(4);const h=function(){return Object(f.css)(n||(n=Object(p.a)(["\n    @media screen and (max-width: ","px) {\n      ","\n    }\n  "])),599,Object(f.css)(...arguments))},v=f.default.select(i||(i=Object(p.a)(["\n  cursor: pointer;\n  height: 24px;\n  min-width: 24px;\n  user-select: none;\n  padding-left: 8px;\n  padding-right: 12px;\n  box-sizing: content-box;\n  font-size: inherit;\n  color: inherit;\n  border: none;\n  background-color: transparent;\n  appearance: none;\n  direction: ltr;\n  &::-ms-expand {\n    display: none;\n  }\n  &:disabled::-ms-expand {\n    background: #f60;\n  }\n  option {\n    color: initial;\n  }\n"]))),g=f.default.div(s||(s=Object(p.a)(["\n  position: relative;\n  flex-shrink: 0;\n  font-size: inherit;\n  color: inherit;\n  margin-top: 1px;\n  svg {\n    top: 0;\n    right: 0;\n    color: inherit;\n    position: absolute;\n    fill: currentColor;\n    width: 24px;\n    height: 24px;\n    display: inline-block;\n    user-select: none;\n    pointer-events: none;\n  }\n"]))),O={rowsPerPageText:"Rows per page:",rangeSeparatorText:"of",noRowsPerPage:!1,selectAllRowsItem:!1,selectAllRowsItemText:"All"},y=f.default.nav(l||(l=Object(p.a)(["\n  display: flex;\n  flex: 1 1 auto;\n  // justify-content: flex-end;\n  align-items: center;\n  box-sizing: border-box;\n  padding-right: 8px;\n  padding-left: 8px;\n  width: 100%;\n  ",";\n"])),(e=>e.theme.pagination.style)),P=f.default.button(o||(o=Object(p.a)(["\n  position: relative;\n  display: block;\n  user-select: none;\n  border: none;\n  ",";\n  ",";\n"])),(e=>e.theme.pagination.pageButtonsStyle),(e=>e.isRTL&&"transform: scale(-1, -1)")),C=f.default.div(r||(r=Object(p.a)(["\n  display: flex;\n  align-items: center;\n  border-radius: 4px;\n  white-space: nowrap;\n  ",";\n"])),h(c||(c=Object(p.a)(["\n    width: 100%;\n    justify-content: space-around;\n  "])))),N=f.default.span(d||(d=Object(p.a)(["\n  flex-shrink: 1;\n  user-select: none;\n"]))),w=Object(f.default)(N)(b||(b=Object(p.a)(["\n  margin: 0 24px;\n"]))),I=Object(f.default)(N)(u||(u=Object(p.a)(["\n  margin: 0 4px;\n"]))),k=f.default.div(m||(m=Object(p.a)(["\n  margin: ",";\n  display: ",";\n\n  "])),(e=>e.margin),(e=>e.display)),L=(e,t)=>Math.ceil(e/t),R=e=>Object(x.jsx)(g,{children:Object(x.jsx)(v,{...e})});t.a=e=>{let{rowsPerPage:t,rowCount:a,onChangePage:n,onChangeRowsPerPage:i,currentPage:s,direction:l,paginationRowsPerPageOptions:o,paginationIconLastPage:r,paginationIconFirstPage:c,paginationIconNext:d,paginationIconPrevious:b,paginationComponentOptions:u,PaginationActionButton:m}=e;const p=!1,f=L(a,t),h=s*t,v=h-t+1,g=1===s,N=s===f,F={...O,...u},S=s===f?"".concat(v,"-").concat(a," ").concat(F.rangeSeparatorText," ").concat(a):"".concat(v,"-").concat(h," ").concat(F.rangeSeparatorText," ").concat(a),E=Object(j.useCallback)((()=>n(s-1)),[s,n]),T=Object(j.useCallback)((()=>n(s+1)),[s,n]),D=Object(j.useCallback)((()=>n(1)),[n]),z=Object(j.useCallback)((()=>n(L(a,t))),[n,a,t]),B=Object(j.useCallback)((e=>{let{target:t}=e;return i(Number(t.value),s)}),[s,i]),W=o.map((e=>Object(x.jsx)("option",{value:e,children:e},e)));F.selectAllRowsItem&&W.push(Object(x.jsx)("option",{value:a,children:F.selectAllRowsItemText},-1));const V=Object(x.jsx)(R,{onChange:B,defaultValue:t,"aria-label":F.rowsPerPageText,children:W});return Object(x.jsxs)(y,{className:"rdt_Pagination",children:[Object(x.jsx)(k,{margin:"0 auto",children:" "}),Object(x.jsx)(k,{margin:"0 auto",children:m?Object(x.jsx)(m,{}):null}),Object(x.jsxs)(k,{style:{display:"contents"},children:[!F.noRowsPerPage&&Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(I,{children:F.rowsPerPageText}),V]}),Object(x.jsx)(w,{children:S}),Object(x.jsxs)(C,{children:[Object(x.jsx)(P,{id:"pagination-first-page",type:"button","aria-label":"First Page","aria-disabled":g,onClick:D,disabled:g,isRTL:p,children:c}),Object(x.jsx)(P,{id:"pagination-previous-page",type:"button","aria-label":"Previous Page","aria-disabled":g,onClick:E,disabled:g,isRTL:p,children:b}),!1,Object(x.jsx)(P,{id:"pagination-next-page",type:"button","aria-label":"Next Page","aria-disabled":N,onClick:T,disabled:N,isRTL:p,children:d}),Object(x.jsx)(P,{id:"pagination-last-page",type:"button","aria-label":"Last Page","aria-disabled":N,onClick:z,disabled:N,isRTL:p,children:r})]})]})]})}},133:function(e,t,a){"use strict";function n(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}a.d(t,"a",(function(){return n}))},137:function(e,t,a){"use strict";t.a=a.p+"static/media/content-ico.1134bf42.svg"},1423:function(e,t,a){},146:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));a(130);var n=a(0),i=a(113),s=a(20),l=a(4);const o=Object(n.forwardRef)(((e,t)=>{let{id:a,label:n,children:o,error:r,placeholder:c,leadingIcon:d,type:b,component:u,...m}=e,p=a||n&&n.replace(/\s/g,"")||"formInput"+Math.random();return Object(l.jsx)("div",{className:"sdInputFields",children:Object(l.jsxs)(i.a.Group,{controlId:p,children:[Object(l.jsxs)(i.a.Label,{children:[" ",n," "]}),Object(l.jsx)(i.a.Control,{placeholder:u?"":c||n,ref:t,type:b,...m,children:o}),u&&Object(l.jsxs)("span",{className:"component position-absolute",children:[" ",u," "]}),d&&Object(l.jsxs)("span",{className:"leadingIcon position-absolute",children:[" ",d.replace('"',"")," "]}),r&&Object(l.jsx)(s.a,{color:"dangerText",size:"xSmall",text:r})]})})}));t.b=Object(n.memo)(o);const r=e=>{let{id:t,label:a,...n}=e,s=t||a&&a.replace(/\s/g,"")||"formInput"+Math.random();return Object(l.jsx)("div",{className:"sdInputFields",children:Object(l.jsx)("div",{className:"checkBox customChechbox",children:Object(l.jsx)(i.a.Group,{controlId:s,children:Object(l.jsx)(i.a.Check,{type:"checkbox",label:a,...n,className:"p-0"})})})})}},151:function(e,t,a){"use strict";var n=a(146),i=(a(153),a(29)),s=a.p+"static/media/Search.5d68d6da.svg",l=a(4);t.a=e=>{let{filterText:t,onFilter:a,onClear:o,placeholder:r,className:c}=e;return Object(l.jsxs)("div",{className:"searchCrossButon",children:[Object(l.jsx)(n.b,{id:"search",type:"text",placeholder:r,"aria-label":"Search Input",value:t,onChange:a,className:c}),Object(l.jsx)("div",{className:"inputSearchIcon",children:Object(l.jsx)(i.a,{src:s,name:"Search Icon",className:"img-fluid"})})]})}},153:function(e,t,a){},154:function(e,t,a){"use strict";a(162);var n=a(113),i=a(0),s=a(121),l=a(20),o=a(4);const r=e=>{let{title:t,textComponent:a,filterComponent:i,filter:r,filterCity:c,data:d,columns:b,isLoading:u,PaginationComponent:m,perPageOptions:p,paginationPerPage:j,ProgressComponent:f,pagination:x,isPaginationButton:h,PaginationButton:v,handleFilterChange:g,className:O,...y}=e;return Object(o.jsxs)("div",{className:"finance-table"===O?"finance-tableBox tableBox bg-white":"tableBox bg-white",children:[t?Object(o.jsxs)("div",{className:"d-flex justify-content-between align-items-center tableHeading",children:[Object(o.jsx)("div",{children:Object(o.jsx)(l.a,{size:"regular",fontWeight:"mediumbold",color:"secondryColor",text:t})}),Object(o.jsxs)("div",{className:"locationSelect",children:[a||null,i||null,r?Object(o.jsx)(n.a.Group,{controlId:"exampleForm.SelectCustom",children:Object(o.jsxs)(n.a.Control,{as:"select",onChange:e=>g(e.target.value),children:[Object(o.jsx)("option",{value:"",children:"Select City"}),c&&null!==c&&void 0!==c&&c.length?c.map(((e,t)=>Object(o.jsx)("option",{value:e,children:e},t))):null]})}):null]})]}):null,Object(o.jsx)(s.a,{data:d,columns:b,progressPending:u,paginationComponent:m,paginationRowsPerPageOptions:p,paginationPerPage:j,progressComponent:f,pagination:x,...y}),h?Object(o.jsx)("div",{className:"d-flex justify-content-center",children:v||""}):null!==d&&void 0!==d&&d.length?null:v?Object(o.jsx)("div",{className:"d-flex justify-content-center",children:v}):null]})};t.a=Object(i.memo)(r)},1540:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),s=a(37),l=a(35),o=a(29),r=(a(124),a(117)),c=a(121),d=a(14),b=a(20),u=(a(154),a(132)),m=a(34),p=a(137),j=a(113),f=(a(344),a(174),a(151)),x=(a(1423),a(4));const h={getInstallationRequest:r.Rb,getServiceRequest:r.nc,getAllPublishedProperty:r.Y,getAllExecutiveTeams:r.O,getExecutionDashboardCount:r.Cb,getExcutionDashboardCity:r.Bb,getLocationByCity:r.Vb,getAllCity:r.H,getHelpDeskPropertyLeads:r.Lb},v=Object(s.b)((e=>{let{salesLeadsDataTable:t,excutiveTeamsData:a,publishedProperyData:n,serviceRequestData:i,installationReqData:s,executionDashboardCount:l,excutiveDashboardCity:o,allLocationsByCity:r,allTransactionCities:c,allCities:d,helpdeskPropertyLeads:b}=e;return{excutiveTeamsData:a,publishedProperyData:n,serviceRequestData:i,installationReqData:s,executionDashboardCount:l,excutiveDashboardCity:o,allLocationsByCity:r,allTransactionCities:c,allCities:d,allLocationsByCity:r,helpdeskPropertyLeads:b}}),h);t.default=Object(l.c)(v,n.memo)((e=>{var t,a,s;const{getInstallationRequest:l,getAllPublishedProperty:r,getLocationByCity:h,publishedProperyData:v,installationReqData:g,getAllCity:O,allTransactionCities:y,allCities:P,getHelpDeskPropertyLeads:C,helpdeskPropertyLeads:N}=e,[w,I]=Object(n.useState)(""),[k,L]=Object(n.useState)([]),[R,F]=i.a.useState(""),[S,E]=i.a.useState(!1);const[T,D]=Object(n.useState)("");Object(n.useEffect)((()=>{console.log(e,"propssssssssssssssssssssssssssssssssssss"),O(),"Property Leads"===(null===e||void 0===e?void 0:e.tabName)&&C({city:"",records:"",pageNumber:"",zipCode:""})}),[l,r,O,C]);const z=[{name:"Id",selector:"leadId",sortable:!0,center:!0},{name:"Date",selector:"leadDate",sortable:!0,center:!0,cell:e=>{let{leadDate:t}=e;return Object(x.jsx)("span",{children:Object(m.f)(t)})}},{name:"Lead For",selector:"leadFor",center:!0,minWidth:"80px"},{name:"Contact Person",selector:"contactPerson",center:!0,minWidth:"140px",maxWidth:"150px",style:{"text-align":"center"},cell:e=>{let{contactPerson:t}=e;return Object(x.jsxs)("span",{children:[" ",t||"-"," "]})}},{name:"Phone No",selector:"contactNumber",center:!0,minWidth:"140px",cell:e=>{let{contactNumber:t}=e;return Object(x.jsxs)("span",{children:[" ",t||"-"," "]})}},{name:"Society",selector:"societyName",center:!0,minWidth:"150px",cell:e=>{let{societyName:t}=e;return Object(x.jsx)("span",{children:t||"-"})}},{name:"Location",selector:"address",center:!0,maxWidth:"150px",cell:e=>{let{address:t}=e;return Object(x.jsx)(m.a,{position:"top",style:{width:"100%"},name:t||"",children:Object(x.jsx)("span",{className:"cursor-pointer elipsis-text",children:t.substring(0,-1!==t.indexOf(",")?t.indexOf(","):t.length)})})}},{name:"Recommended By ",selector:e=>e.recommendedBy,center:!0,minWidth:"160px",cell:e=>{let{recommendedBy:t}=e;return Object(x.jsx)(b.a,{size:"Small",className:"text-align-center",color:"secondryColor",text:t?t.capitalizeWord():"-"})}},{name:"Action",center:!0,maxWidth:"60px",cell:e=>{let{leadId:t}=e;return Object(x.jsx)("div",{className:"action",children:Object(x.jsx)(m.a,{position:"left",name:"View Details",children:Object(x.jsx)("span",{children:Object(x.jsx)(d.b,{to:{pathname:"/admin/helpdesk/lead-details",state:{leadId:t,module:"HELPDESK"}},children:Object(x.jsx)(o.a,{name:"useraddIcon",src:p.a})})})})})}}],B=(e,t)=>{I(e),C({city:e,records:"",pageNumber:"",zipCode:t})},[W,V]=Object(n.useState)(!1),[A,q]=Object(n.useState)(""),H=i.a.useMemo((()=>Object(x.jsx)(f.a,{onFilter:e=>F(e.target.value),onClear:()=>{R&&(E(!S),F(""))},filterText:R,placeholder:"Search here "})),[R,S]);return Object(x.jsxs)("div",{className:"tableBox bg-white",children:[Object(x.jsxs)("div",{className:"d-flex justify-content-between align-items-center tableHeading",children:[Object(x.jsx)("div",{children:Object(x.jsx)(b.a,{size:"regular",fontWeight:"mediumbold",color:"secondryColor",text:null!==e&&void 0!==e&&e.tabName?null===e||void 0===e?void 0:e.tabName:""})}),Object(x.jsxs)("div",{className:"locationSelect d-flex",children:[H,Object(x.jsx)(j.a.Group,{controlId:"exampleForm.SelectCustom",children:Object(x.jsxs)(j.a.Control,{as:"select",value:T,onChange:t=>{((t,a)=>{"Property Leads"===(null===e||void 0===e?void 0:e.tabName)&&B(t,""),L([]),D(t),t.length&&h({city:t}).then((e=>{if(e.data&&200===e.data.status){const t=e.data.resourceData.locations.map((e=>({...e,location:"".concat(e.location," ,").concat(e.pinCode)})));L(t)}})).catch((e=>console.log("err:",e)))})(t.target.value)},children:[Object(x.jsx)("option",{value:"",children:"Select City"}),null!==P&&void 0!==P&&null!==(t=P.data)&&void 0!==t&&t.cities&&null!==P&&void 0!==P&&null!==(a=P.data)&&void 0!==a&&a.cities.length?null===P||void 0===P||null===(s=P.data)||void 0===s?void 0:s.cities.map(((e,t)=>Object(x.jsx)("option",{value:e,children:e},t))):null]})})]})]}),Object(x.jsx)("div",{className:"property-leadsTableWrapper",children:Object(x.jsx)(c.a,{data:(()=>{let t=[];if("Property Leads"===(null===e||void 0===e?void 0:e.tabName))return t=N.data.length?N.data.filter((e=>{var t,a,n,i;return(null===e||void 0===e?void 0:e.leadId)==R||(null===e||void 0===e||null===(t=e.assignTo)||void 0===t?void 0:t.toLowerCase().includes(R.toLowerCase()))||(null===e||void 0===e||null===(a=e.contactPerson)||void 0===a?void 0:a.toLowerCase().includes(R.toLowerCase()))||(null===e||void 0===e||null===(n=e.societyName)||void 0===n?void 0:n.toLowerCase().includes(R.toLowerCase()))||(null===e||void 0===e||null===(i=e.contactNumber)||void 0===i?void 0:i.toLowerCase().includes(R.toLowerCase()))||(null===e||void 0===e?void 0:e.address.toLowerCase().includes(R.toLowerCase()))})):[],t})(),columns:(()=>{if("Property Leads"===(null===e||void 0===e?void 0:e.tabName))return z})(),paginationRowsPerPageOptions:[8,16,24,32,40,48,56,64,72,80],paginationPerPage:8,PaginationComponent:e=>Object(x.jsx)(u.a,{...e})})})]})}))},162:function(e,t,a){}}]);