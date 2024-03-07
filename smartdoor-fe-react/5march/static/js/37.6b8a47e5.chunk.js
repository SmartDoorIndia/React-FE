(this.webpackJsonpsmartdoor=this.webpackJsonpsmartdoor||[]).push([[37],{1081:function(e,t,a){},113:function(e,t,a){"use strict";var n=a(5),i=a(6),l=a(25),s=a.n(l),o=a(0),r=a.n(o),c=(a(112),a(7)),d=a.n(c),u=["as","className","type","tooltip"],b={type:d.a.string,tooltip:d.a.bool,as:d.a.elementType},m=r.a.forwardRef((function(e,t){var a=e.as,l=void 0===a?"div":a,o=e.className,c=e.type,d=void 0===c?"valid":c,b=e.tooltip,m=void 0!==b&&b,p=Object(i.a)(e,u);return r.a.createElement(l,Object(n.a)({},p,{ref:t,className:s()(o,d+"-"+(m?"tooltip":"feedback"))}))}));m.displayName="Feedback",m.propTypes=b;var p=m,j=r.a.createContext({controlId:void 0}),x=a(28),h=["id","bsPrefix","bsCustomPrefix","className","type","isValid","isInvalid","isStatic","as"],v=r.a.forwardRef((function(e,t){var a=e.id,l=e.bsPrefix,c=e.bsCustomPrefix,d=e.className,u=e.type,b=void 0===u?"checkbox":u,m=e.isValid,p=void 0!==m&&m,v=e.isInvalid,f=void 0!==v&&v,O=e.isStatic,g=e.as,y=void 0===g?"input":g,C=Object(i.a)(e,h),P=Object(o.useContext)(j),N=P.controlId,E=P.custom?[c,"custom-control-input"]:[l,"form-check-input"],I=E[0],S=E[1];return l=Object(x.a)(I,S),r.a.createElement(y,Object(n.a)({},C,{ref:t,type:b,id:a||N,className:s()(d,l,p&&"is-valid",f&&"is-invalid",O&&"position-static")}))}));v.displayName="FormCheckInput";var f=v,O=["bsPrefix","bsCustomPrefix","className","htmlFor"],g=r.a.forwardRef((function(e,t){var a=e.bsPrefix,l=e.bsCustomPrefix,c=e.className,d=e.htmlFor,u=Object(i.a)(e,O),b=Object(o.useContext)(j),m=b.controlId,p=b.custom?[l,"custom-control-label"]:[a,"form-check-label"],h=p[0],v=p[1];return a=Object(x.a)(h,v),r.a.createElement("label",Object(n.a)({},u,{ref:t,htmlFor:d||m,className:s()(c,a)}))}));g.displayName="FormCheckLabel";var y=g,C=["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","title","type","label","children","custom","as"],P=r.a.forwardRef((function(e,t){var a=e.id,l=e.bsPrefix,c=e.bsCustomPrefix,d=e.inline,u=void 0!==d&&d,b=e.disabled,m=void 0!==b&&b,h=e.isValid,v=void 0!==h&&h,O=e.isInvalid,g=void 0!==O&&O,P=e.feedbackTooltip,N=void 0!==P&&P,E=e.feedback,I=e.className,S=e.style,R=e.title,w=void 0===R?"":R,T=e.type,D=void 0===T?"checkbox":T,L=e.label,A=e.children,k=e.custom,F=e.as,G=void 0===F?"input":F,q=Object(i.a)(e,C),W="switch"===D||k,z=W?[c,"custom-control"]:[l,"form-check"],B=z[0],M=z[1];l=Object(x.a)(B,M);var V=Object(o.useContext)(j).controlId,U=Object(o.useMemo)((function(){return{controlId:a||V,custom:W}}),[V,W,a]),H=W||null!=L&&!1!==L&&!A,J=r.a.createElement(f,Object(n.a)({},q,{type:"switch"===D?"checkbox":D,ref:t,isValid:v,isInvalid:g,isStatic:!H,disabled:m,as:G}));return r.a.createElement(j.Provider,{value:U},r.a.createElement("div",{style:S,className:s()(I,l,W&&"custom-"+D,u&&l+"-inline")},A||r.a.createElement(r.a.Fragment,null,J,H&&r.a.createElement(y,{title:w},L),(v||g)&&r.a.createElement(p,{type:v?"valid":"invalid",tooltip:N},E))))}));P.displayName="FormCheck",P.Input=f,P.Label=y;var N=P,E=["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","lang","as"],I=r.a.forwardRef((function(e,t){var a=e.id,l=e.bsPrefix,c=e.bsCustomPrefix,d=e.className,u=e.isValid,b=e.isInvalid,m=e.lang,p=e.as,h=void 0===p?"input":p,v=Object(i.a)(e,E),f=Object(o.useContext)(j),O=f.controlId,g=f.custom?[c,"custom-file-input"]:[l,"form-control-file"],y=g[0],C=g[1];return l=Object(x.a)(y,C),r.a.createElement(h,Object(n.a)({},v,{ref:t,id:a||O,type:"file",lang:m,className:s()(d,l,u&&"is-valid",b&&"is-invalid")}))}));I.displayName="FormFileInput";var S=I,R=["bsPrefix","bsCustomPrefix","className","htmlFor"],w=r.a.forwardRef((function(e,t){var a=e.bsPrefix,l=e.bsCustomPrefix,c=e.className,d=e.htmlFor,u=Object(i.a)(e,R),b=Object(o.useContext)(j),m=b.controlId,p=b.custom?[l,"custom-file-label"]:[a,"form-file-label"],h=p[0],v=p[1];return a=Object(x.a)(h,v),r.a.createElement("label",Object(n.a)({},u,{ref:t,htmlFor:d||m,className:s()(c,a),"data-browse":u["data-browse"]}))}));w.displayName="FormFileLabel";var T=w,D=["id","bsPrefix","bsCustomPrefix","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","label","children","custom","lang","data-browse","as","inputAs"],L=r.a.forwardRef((function(e,t){var a=e.id,l=e.bsPrefix,c=e.bsCustomPrefix,d=e.disabled,u=void 0!==d&&d,b=e.isValid,m=void 0!==b&&b,h=e.isInvalid,v=void 0!==h&&h,f=e.feedbackTooltip,O=void 0!==f&&f,g=e.feedback,y=e.className,C=e.style,P=e.label,N=e.children,E=e.custom,I=e.lang,R=e["data-browse"],w=e.as,L=void 0===w?"div":w,A=e.inputAs,k=void 0===A?"input":A,F=Object(i.a)(e,D),G=E?[c,"custom"]:[l,"form-file"],q=G[0],W=G[1];l=Object(x.a)(q,W);var z=Object(o.useContext)(j).controlId,B=Object(o.useMemo)((function(){return{controlId:a||z,custom:E}}),[z,E,a]),M=null!=P&&!1!==P&&!N,V=r.a.createElement(S,Object(n.a)({},F,{ref:t,isValid:m,isInvalid:v,disabled:u,as:k,lang:I}));return r.a.createElement(j.Provider,{value:B},r.a.createElement(L,{style:C,className:s()(y,l,E&&"custom-file")},N||r.a.createElement(r.a.Fragment,null,E?r.a.createElement(r.a.Fragment,null,V,M&&r.a.createElement(T,{"data-browse":R},P)):r.a.createElement(r.a.Fragment,null,M&&r.a.createElement(T,null,P),V),(m||v)&&r.a.createElement(p,{type:m?"valid":"invalid",tooltip:O},g))))}));L.displayName="FormFile",L.Input=S,L.Label=T;var A=L,k=(a(45),["bsPrefix","bsCustomPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","custom","as"]),F=r.a.forwardRef((function(e,t){var a,l,c=e.bsPrefix,d=e.bsCustomPrefix,u=e.type,b=e.size,m=e.htmlSize,p=e.id,h=e.className,v=e.isValid,f=void 0!==v&&v,O=e.isInvalid,g=void 0!==O&&O,y=e.plaintext,C=e.readOnly,P=e.custom,N=e.as,E=void 0===N?"input":N,I=Object(i.a)(e,k),S=Object(o.useContext)(j).controlId,R=P?[d,"custom"]:[c,"form-control"],w=R[0],T=R[1];if(c=Object(x.a)(w,T),y)(l={})[c+"-plaintext"]=!0,a=l;else if("file"===u){var D;(D={})[c+"-file"]=!0,a=D}else if("range"===u){var L;(L={})[c+"-range"]=!0,a=L}else if("select"===E&&P){var A;(A={})[c+"-select"]=!0,A[c+"-select-"+b]=b,a=A}else{var F;(F={})[c]=!0,F[c+"-"+b]=b,a=F}return r.a.createElement(E,Object(n.a)({},I,{type:u,size:m,ref:t,readOnly:C,id:p||S,className:s()(h,a,f&&"is-valid",g&&"is-invalid")}))}));F.displayName="FormControl";var G=Object.assign(F,{Feedback:p}),q=["bsPrefix","className","children","controlId","as"],W=r.a.forwardRef((function(e,t){var a=e.bsPrefix,l=e.className,c=e.children,d=e.controlId,u=e.as,b=void 0===u?"div":u,m=Object(i.a)(e,q);a=Object(x.a)(a,"form-group");var p=Object(o.useMemo)((function(){return{controlId:d}}),[d]);return r.a.createElement(j.Provider,{value:p},r.a.createElement(b,Object(n.a)({},m,{ref:t,className:s()(l,a)}),c))}));W.displayName="FormGroup";var z=W,B=a(141),M=["as","bsPrefix","column","srOnly","className","htmlFor"],V=r.a.forwardRef((function(e,t){var a=e.as,l=void 0===a?"label":a,c=e.bsPrefix,d=e.column,u=e.srOnly,b=e.className,m=e.htmlFor,p=Object(i.a)(e,M),h=Object(o.useContext)(j).controlId;c=Object(x.a)(c,"form-label");var v="col-form-label";"string"===typeof d&&(v=v+" "+v+"-"+d);var f=s()(b,c,u&&"sr-only",d&&v);return m=m||h,d?r.a.createElement(B.a,Object(n.a)({ref:t,as:"label",className:f,htmlFor:m},p)):r.a.createElement(l,Object(n.a)({ref:t,className:f,htmlFor:m},p))}));V.displayName="FormLabel",V.defaultProps={column:!1,srOnly:!1};var U=V,H=["bsPrefix","className","as","muted"],J=r.a.forwardRef((function(e,t){var a=e.bsPrefix,l=e.className,o=e.as,c=void 0===o?"small":o,d=e.muted,u=Object(i.a)(e,H);return a=Object(x.a)(a,"form-text"),r.a.createElement(c,Object(n.a)({},u,{ref:t,className:s()(l,a,d&&"text-muted")}))}));J.displayName="FormText";var _=J,Y=r.a.forwardRef((function(e,t){return r.a.createElement(N,Object(n.a)({},e,{ref:t,type:"switch"}))}));Y.displayName="Switch",Y.Input=N.Input,Y.Label=N.Label;var K=Y,Q=a(128),X=["bsPrefix","inline","className","validated","as"],Z=Object(Q.a)("form-row"),$=r.a.forwardRef((function(e,t){var a=e.bsPrefix,l=e.inline,o=e.className,c=e.validated,d=e.as,u=void 0===d?"form":d,b=Object(i.a)(e,X);return a=Object(x.a)(a,"form"),r.a.createElement(u,Object(n.a)({},b,{ref:t,className:s()(o,c&&"was-validated",l&&a+"-inline")}))}));$.displayName="Form",$.defaultProps={inline:!1},$.Row=Z,$.Group=z,$.Control=G,$.Check=N,$.File=A,$.Switch=K,$.Label=U,$.Text=_;t.a=$},121:function(e,t,a){"use strict";var n=a(148),i=a.n(n),l=(a(126),a(0)),s=a(123),o=a(55),r=a(4);const c=Object(r.jsx)("img",{src:s.a,className:"ml-1",width:"10px",alt:"SHORT_ICON"}),d=Object(r.jsx)(o.b,{}),u=e=>{let{title:t,columns:a,data:n,pagination:l,progressPending:s,onChangePage:o,paginationComponent:u,paginationRowsPerPageOptions:m,paginationPerPage:p,sortIcon:j,progressComponent:x,striped:h,...v}=e;return Object(r.jsx)(i.a,{title:t,columns:a,data:n,pagination:!1!==l,highlightOnHover:!0,progressPending:s,onChangePage:o,striped:!1!==h,paginationComponent:u,paginationRowsPerPageOptions:m,paginationPerPage:p,customStyles:b,sortIcon:j||c,progressComponent:x||d,...v})},b={rows:{style:{borderBottomWidth:"0 !important","&:nth-child(even)":{backgroundColor:"#fff"},"&:nth-child(odd)":{backgroundColor:"#f8f3f5"}}},headCells:{style:{fontWeight:"700 !important",fontSize:".875rem",color:"#252525",justifyContent:"center","&:first-child":{minWidth:"70px",maxWidth:"100px"}}},cells:{style:{fontSize:".875rem",color:"#252525","&:first-child":{minWidth:"100px",maxWidth:"120px"}}}};t.a=Object(l.memo)(u)},123:function(e,t,a){"use strict";t.a=a.p+"static/media/sort-icon.a64bca1a.svg"},126:function(e,t,a){},130:function(e,t,a){},132:function(e,t,a){"use strict";var n,i,l,s,o,r,c,d,u,b,m,p=a(133),j=a(0),x=a(161),h=a(4);const v=function(){return Object(x.css)(n||(n=Object(p.a)(["\n    @media screen and (max-width: ","px) {\n      ","\n    }\n  "])),599,Object(x.css)(...arguments))},f=x.default.select(i||(i=Object(p.a)(["\n  cursor: pointer;\n  height: 24px;\n  min-width: 24px;\n  user-select: none;\n  padding-left: 8px;\n  padding-right: 12px;\n  box-sizing: content-box;\n  font-size: inherit;\n  color: inherit;\n  border: none;\n  background-color: transparent;\n  appearance: none;\n  direction: ltr;\n  &::-ms-expand {\n    display: none;\n  }\n  &:disabled::-ms-expand {\n    background: #f60;\n  }\n  option {\n    color: initial;\n  }\n"]))),O=x.default.div(l||(l=Object(p.a)(["\n  position: relative;\n  flex-shrink: 0;\n  font-size: inherit;\n  color: inherit;\n  margin-top: 1px;\n  svg {\n    top: 0;\n    right: 0;\n    color: inherit;\n    position: absolute;\n    fill: currentColor;\n    width: 24px;\n    height: 24px;\n    display: inline-block;\n    user-select: none;\n    pointer-events: none;\n  }\n"]))),g={rowsPerPageText:"Rows per page:",rangeSeparatorText:"of",noRowsPerPage:!1,selectAllRowsItem:!1,selectAllRowsItemText:"All"},y=x.default.nav(s||(s=Object(p.a)(["\n  display: flex;\n  flex: 1 1 auto;\n  // justify-content: flex-end;\n  align-items: center;\n  box-sizing: border-box;\n  padding-right: 8px;\n  padding-left: 8px;\n  width: 100%;\n  ",";\n"])),(e=>e.theme.pagination.style)),C=x.default.button(o||(o=Object(p.a)(["\n  position: relative;\n  display: block;\n  user-select: none;\n  border: none;\n  ",";\n  ",";\n"])),(e=>e.theme.pagination.pageButtonsStyle),(e=>e.isRTL&&"transform: scale(-1, -1)")),P=x.default.div(r||(r=Object(p.a)(["\n  display: flex;\n  align-items: center;\n  border-radius: 4px;\n  white-space: nowrap;\n  ",";\n"])),v(c||(c=Object(p.a)(["\n    width: 100%;\n    justify-content: space-around;\n  "])))),N=x.default.span(d||(d=Object(p.a)(["\n  flex-shrink: 1;\n  user-select: none;\n"]))),E=Object(x.default)(N)(u||(u=Object(p.a)(["\n  margin: 0 24px;\n"]))),I=Object(x.default)(N)(b||(b=Object(p.a)(["\n  margin: 0 4px;\n"]))),S=x.default.div(m||(m=Object(p.a)(["\n  margin: ",";\n  display: ",";\n\n  "])),(e=>e.margin),(e=>e.display)),R=(e,t)=>Math.ceil(e/t),w=e=>Object(h.jsx)(O,{children:Object(h.jsx)(f,{...e})});t.a=e=>{let{rowsPerPage:t,rowCount:a,onChangePage:n,onChangeRowsPerPage:i,currentPage:l,direction:s,paginationRowsPerPageOptions:o,paginationIconLastPage:r,paginationIconFirstPage:c,paginationIconNext:d,paginationIconPrevious:u,paginationComponentOptions:b,PaginationActionButton:m}=e;const p=!1,x=R(a,t),v=l*t,f=v-t+1,O=1===l,N=l===x,T={...g,...b},D=l===x?"".concat(f,"-").concat(a," ").concat(T.rangeSeparatorText," ").concat(a):"".concat(f,"-").concat(v," ").concat(T.rangeSeparatorText," ").concat(a),L=Object(j.useCallback)((()=>n(l-1)),[l,n]),A=Object(j.useCallback)((()=>n(l+1)),[l,n]),k=Object(j.useCallback)((()=>n(1)),[n]),F=Object(j.useCallback)((()=>n(R(a,t))),[n,a,t]),G=Object(j.useCallback)((e=>{let{target:t}=e;return i(Number(t.value),l)}),[l,i]),q=o.map((e=>Object(h.jsx)("option",{value:e,children:e},e)));T.selectAllRowsItem&&q.push(Object(h.jsx)("option",{value:a,children:T.selectAllRowsItemText},-1));const W=Object(h.jsx)(w,{onChange:G,defaultValue:t,"aria-label":T.rowsPerPageText,children:q});return Object(h.jsxs)(y,{className:"rdt_Pagination",children:[Object(h.jsx)(S,{margin:"0 auto",children:" "}),Object(h.jsx)(S,{margin:"0 auto",children:m?Object(h.jsx)(m,{}):null}),Object(h.jsxs)(S,{style:{display:"contents"},children:[!T.noRowsPerPage&&Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(I,{children:T.rowsPerPageText}),W]}),Object(h.jsx)(E,{children:D}),Object(h.jsxs)(P,{children:[Object(h.jsx)(C,{id:"pagination-first-page",type:"button","aria-label":"First Page","aria-disabled":O,onClick:k,disabled:O,isRTL:p,children:c}),Object(h.jsx)(C,{id:"pagination-previous-page",type:"button","aria-label":"Previous Page","aria-disabled":O,onClick:L,disabled:O,isRTL:p,children:u}),!1,Object(h.jsx)(C,{id:"pagination-next-page",type:"button","aria-label":"Next Page","aria-disabled":N,onClick:A,disabled:N,isRTL:p,children:d}),Object(h.jsx)(C,{id:"pagination-last-page",type:"button","aria-label":"Last Page","aria-disabled":N,onClick:F,disabled:N,isRTL:p,children:r})]})]})]})}},133:function(e,t,a){"use strict";function n(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}a.d(t,"a",(function(){return n}))},137:function(e,t,a){"use strict";t.a=a.p+"static/media/content-ico.1134bf42.svg"},146:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));a(130);var n=a(0),i=a(113),l=a(20),s=a(4);const o=Object(n.forwardRef)(((e,t)=>{let{id:a,label:n,children:o,error:r,placeholder:c,leadingIcon:d,type:u,component:b,...m}=e,p=a||n&&n.replace(/\s/g,"")||"formInput"+Math.random();return Object(s.jsx)("div",{className:"sdInputFields",children:Object(s.jsxs)(i.a.Group,{controlId:p,children:[Object(s.jsxs)(i.a.Label,{children:[" ",n," "]}),Object(s.jsx)(i.a.Control,{placeholder:b?"":c||n,ref:t,type:u,...m,children:o}),b&&Object(s.jsxs)("span",{className:"component position-absolute",children:[" ",b," "]}),d&&Object(s.jsxs)("span",{className:"leadingIcon position-absolute",children:[" ",d.replace('"',"")," "]}),r&&Object(s.jsx)(l.a,{color:"dangerText",size:"xSmall",text:r})]})})}));t.b=Object(n.memo)(o);const r=e=>{let{id:t,label:a,...n}=e,l=t||a&&a.replace(/\s/g,"")||"formInput"+Math.random();return Object(s.jsx)("div",{className:"sdInputFields",children:Object(s.jsx)("div",{className:"checkBox customChechbox",children:Object(s.jsx)(i.a.Group,{controlId:l,children:Object(s.jsx)(i.a.Check,{type:"checkbox",label:a,...n,className:"p-0"})})})})}},151:function(e,t,a){"use strict";var n=a(146),i=(a(153),a(29)),l=a.p+"static/media/Search.5d68d6da.svg",s=a(4);t.a=e=>{let{filterText:t,onFilter:a,onClear:o,placeholder:r,className:c}=e;return Object(s.jsxs)("div",{className:"searchCrossButon",children:[Object(s.jsx)(n.b,{id:"search",type:"text",placeholder:r,"aria-label":"Search Input",value:t,onChange:a,className:c}),Object(s.jsx)("div",{className:"inputSearchIcon",children:Object(s.jsx)(i.a,{src:l,name:"Search Icon",className:"img-fluid"})})]})}},1512:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),l=a(37),s=a(35),o=a(29),r=(a(124),a(117)),c=a(121),d=a(8),u=a(14),b=a(20),m=a(132),p=a(34),j=a(137),x=a(113),h=(a(344),a(151)),v=(a(1081),a(169)),f=a(4);const O={getInstallationRequest:r.Rb,getServiceRequest:r.nc,getAllPublishedProperty:r.Y,getAllExecutiveTeams:r.O,getExecutionDashboardCount:r.Cb,getExcutionDashboardCity:r.Bb,getLocationByCity:r.Vb,getAllCity:r.H},g=Object(l.b)((e=>{let{salesLeadsDataTable:t,excutiveTeamsData:a,publishedProperyData:n,serviceRequestData:i,installationReqData:l,executionDashboardCount:s,excutiveDashboardCity:o,allLocationsByCity:r,allTransactionCities:c,allCities:d}=e;return{excutiveTeamsData:a,publishedProperyData:n,serviceRequestData:i,installationReqData:l,executionDashboardCount:s,excutiveDashboardCity:o,allLocationsByCity:r,allTransactionCities:c,allCities:d,allLocationsByCity:r}}),O);t.default=Object(s.c)(g,n.memo)((e=>{var t,a,l;const{getInstallationRequest:s,getAllPublishedProperty:O,getLocationByCity:g,publishedProperyData:y,installationReqData:C,getAllCity:P,allTransactionCities:N,allCities:E}=e,[I,S]=(Object(d.useLocation)(),Object(n.useState)("")),[R,w]=Object(n.useState)([]),T="Installation/Un-installation Requests"===(null===e||void 0===e?void 0:e.tabName)?v.a.installationRequestsStatusArr:[],[D,L]=Object(n.useState)(""),[A,k]=i.a.useState(""),[F,G]=i.a.useState(!1),[q,W]=Object(n.useState)(""),[z,B]=Object(n.useState)(""),M=t=>{let a=t||D,n=[];return"Installation/Un-installation Requests"===(null===e||void 0===e?void 0:e.tabName)?(n=C.data.length?C.data.filter((e=>{var t,a,n,i,l;return(null===e||void 0===e?void 0:e.id)==A||(null===e||void 0===e||null===(t=e.location)||void 0===t?void 0:t.toLowerCase().includes(A.toLowerCase()))||(null!==(null===e||void 0===e?void 0:e.city)?null===e||void 0===e||null===(a=e.city)||void 0===a?void 0:a.toLowerCase().includes(A.toLowerCase()):[])||(null===e||void 0===e||null===(n=e.propertySubType)||void 0===n?void 0:n.toLowerCase().includes(A.toLowerCase()))||(null===e||void 0===e||null===(i=e.status)||void 0===i?void 0:i.includes(A.toUpperCase()))||(null===e||void 0===e||null===(l=e.assignedTo)||void 0===l?void 0:l.toLowerCase().includes(A.toLowerCase()))})):[],a&&n.length&&(n=n.filter((e=>(null===e||void 0===e?void 0:e.status)==a))),n):"Published Property"===(null===e||void 0===e?void 0:e.tabName)?(n=y.data.length?y.data.filter((e=>{var t,a,n,i;return(null===e||void 0===e?void 0:e.smartdoorPropertyId)==A||(null===e||void 0===e||null===(t=e.propertyPostedBy)||void 0===t?void 0:t.toLowerCase().includes(A.toLowerCase()))||(null===e||void 0===e||null===(a=e.phoneNumber)||void 0===a?void 0:a.includes(A))||(null===e||void 0===e||null===(n=e.city)||void 0===n?void 0:n.toLowerCase().includes(A.toLowerCase()))||(null===e||void 0===e||null===(i=e.propertySubType)||void 0===i?void 0:i.toLowerCase().includes(A.toLowerCase()))})):[],n):void 0};Object(n.useEffect)((()=>{console.log(e,"module name"),P(),"Installation/Un-installation Requests"===(null===e||void 0===e?void 0:e.tabName)&&s({city:"",location:"",records:"",pageNumber:""}),"Published Property"===(null===e||void 0===e?void 0:e.tabName)&&O({city:"",records:"",pageNumber:""})}),[s,O,P]);const V=[{name:"Id",selector:"id",sortable:!0,center:!0},{name:"Installation Time",selector:"dateTime",sortable:!0,center:!0,minWidth:"160px",cell:e=>{let{dateTime:t,slotTime:a}=e;return Object(f.jsx)("span",{children:"".concat(Object(p.f)(t)," | ").concat(a||"-")})}},{name:"Location",selector:"location",center:!0,maxWidth:"150px",cell:e=>{let{location:t}=e;return Object(f.jsx)(p.a,{position:"top",style:{width:"100%"},name:t||"",children:Object(f.jsxs)("span",{className:"cursor-pointer elipsis-text",children:[" ",t.substring(0,-1!==t.indexOf(",")?t.indexOf(","):t.length)]})})}},{name:"City",selector:"city",center:!0,maxWidth:"150px",cell:e=>{let{city:t}=e;return Object(f.jsx)(p.a,{position:"top",style:{width:"100%"},name:t||"",children:Object(f.jsxs)("span",{className:"cursor-pointer elipsis-text",children:[" ",t.substring(0,-1!==t.indexOf(",")?t.indexOf(","):t.length)]})})}},{name:"Request Type",selector:"requestFor",center:!0,maxWidth:"150px",minWidth:"140px",style:{"text-align":"center"},cell:e=>{let{requestFor:t}=e;return Object(f.jsxs)("span",{className:"cursor-pointer elipsis-text",children:[" ",t]})}},{name:"Property Type",selector:"propertySubType",center:!0,maxWidth:"150px",minWidth:"140px",style:{"text-align":"center"},cell:e=>{let{propertySubType:t}=e;return Object(f.jsx)(p.a,{position:"top",style:{width:"100%"},name:t||"",children:Object(f.jsxs)("span",{className:"cursor-pointer elipsis-text",children:[" ",t.substring(0,-1!==t.indexOf(",")?t.indexOf(","):t.length)]})})}},{name:"Assigned To",selector:"assignedTo",center:!0,minWidth:"120px",cell:e=>{let{id:t,assignedTo:a,userList:n}=e;return a?Object(f.jsx)(b.a,{size:"Small",color:"secondryColor",className:"text-center elipsis-text",text:a?a.capitalizeWord():"-"}):Object(f.jsx)("div",{className:"w-100",children:Object(f.jsx)("div",{className:"assignTo",children:Object(f.jsx)(x.a.Group,{controlId:"exampleForm.SelectCustom",className:"w-100 display-flex",children:Object(f.jsxs)(x.a.Control,{as:"select",className:"w-100",onChange:e=>{return a=t,n=e.target.value,void Object(r.q)({userRequestId:a,executivePersonId:n}).then((e=>{200===e.data.status&&s({city:"",location:"",records:"",pageNumber:""})})).catch((e=>console.log(e)));var a,n},children:[Object(f.jsx)("option",{children:"Assign"}),n.map(((e,t)=>Object(f.jsx)("option",{value:e.id,children:e.name},t)))]})})})})}},{name:"Status",selector:"status",center:!0,maxWidth:"150px",minWidth:"140px",cell:e=>{let{status:t}=e;return Object(p.p)(t)}},{name:"Action",center:!0,maxWidth:"60px",cell:e=>{let{id:t}=e;return Object(f.jsx)("div",{className:"action",children:Object(f.jsx)(p.a,{position:"left",name:"View Details",children:Object(f.jsx)("span",{children:Object(f.jsx)(u.b,{to:{pathname:"/admin/execution/installation-detail",state:{taskId:t}},children:Object(f.jsx)(o.a,{name:"useraddIcon",src:j.a})})})})})}}],U=[{name:"Id",selector:"smartdoorPropertyId",center:!0,sortable:!0},{name:"Name",selector:"name",center:!0,cell:e=>{let{propertyPostedBy:t,imageUrl:a}=e;return Object(f.jsx)(p.a,{position:"top",style:{width:"100%"},name:t||"",children:Object(f.jsxs)("span",{className:"elipsis-text",children:[" ",t||"-"]})})}},{name:"Phone No",selector:"phoneNumber",center:!0},{name:"City",selector:"city",center:!0,cell:e=>{let{city:t}=e;return Object(f.jsxs)("span",{children:[" ",t||"-"," "]})}},{name:"Property Type",selector:"leadCompleted",center:!0,style:{"text-align":"center"},cell:e=>{let{propertySubType:t}=e;return Object(f.jsx)(b.a,{size:"Small",color:"secondryColor",text:t||"-"})}},{name:"Action",center:!0,cell:e=>{let{smartdoorPropertyId:t,postedById:a}=e;return Object(f.jsx)("div",{className:"action",children:Object(f.jsx)(p.a,{position:"left",name:"View Details",children:Object(f.jsx)("span",{children:Object(f.jsx)(u.b,{to:{pathname:"/admin/property/property-details",state:{propertyId:t,userId:a}},children:Object(f.jsx)(o.a,{name:"useraddIcon",src:j.a})})})})})}}],H=(e,t)=>{console.log(t,"in the api for city and location");const a=t.match(/([^,]+),\s*(\d{6})/);if(a){console.log("inside match");const t=a[1].trim(),n=a[2];console.log(e,t,n,"data for filter"),s({city:e,zipcode:n,location:t,pageSize:"",pageNo:"1"})}""==t&&(console.log("outside match"),S(e),s({city:e,location:t,records:"",pageNumber:""}))},J=(t,a)=>{w([]),"Installation Requests"===e.location.state.module&&H(t,""),"Published Property"===e.location.state.module&&((e,t)=>{S(e),O({city:e,location:t,records:"",pageNumber:""})})(t,""),W(t),B(""),t.length?g({city:t}).then((e=>{if(e.data&&200===e.data.status){const t=e.data.resourceData.locations.map((e=>({...e,location:"".concat(e.location," ,").concat(e.pinCode)})));w(t)}})).catch((e=>console.log("err:",e))):w([])},_=i.a.useMemo((()=>Object(f.jsx)(h.a,{onFilter:e=>k(e.target.value),onClear:()=>{A&&(G(!F),k(""))},filterText:A,placeholder:"Search here"})),[A,F]);return Object(f.jsxs)("div",{className:"tableBox bg-white",children:[Object(f.jsxs)("div",{className:"d-flex justify-content-between align-items-center tableHeading",children:[Object(f.jsx)("div",{children:Object(f.jsx)(b.a,{size:"regular",fontWeight:"mediumbold",color:"secondryColor",text:null===e||void 0===e?void 0:e.tabName})}),Object(f.jsxs)("div",{className:"locationSelect d-flex",children:[_,T.length?Object(f.jsx)(x.a.Group,{controlId:"exampleForm.SelectCustom",children:Object(f.jsxs)(x.a.Control,{as:"select",value:D,onChange:e=>{var t;t=e.target.value,L(t),M(t)},children:[Object(f.jsx)("option",{value:"",children:"Select Status"}),T.length?T.map(((e,t)=>Object(f.jsx)("option",{value:e,children:e},t))):null]})}):"",Object(f.jsx)(x.a.Group,{controlId:"exampleForm.SelectCustom",children:Object(f.jsxs)(x.a.Control,{as:"select",value:q,onChange:e=>{J(e.target.value)},children:[Object(f.jsx)("option",{value:"",children:"Select City"}),null!==E&&void 0!==E&&null!==(t=E.data)&&void 0!==t&&t.cities&&null!==E&&void 0!==E&&null!==(a=E.data)&&void 0!==a&&a.cities.length?null===E||void 0===E||null===(l=E.data)||void 0===l?void 0:l.cities.map(((e,t)=>Object(f.jsx)("option",{value:e,children:e},t))):null]})}),"Published Property"===(null===e||void 0===e?void 0:e.tabName)?null:Object(f.jsx)(x.a.Group,{controlId:"exampleForm.SelectCustom",children:Object(f.jsxs)(x.a.Control,{as:"select",className:"locationWidth",onChange:t=>((t,a)=>{console.log(a,"location filter zipcode"),"Installation Requests"===e.location.state.module&&H(t,a)})(q,t.target.value),children:[Object(f.jsx)("option",{value:"",children:"Select Location"}),R&&R.length?R.map(((e,t)=>Object(f.jsx)("option",{value:e.location,children:e.location},e.pinCode))):null]})})]})]}),Object(f.jsx)("div",{className:"executionInstallationreqTableWrapper",children:Object(f.jsx)(c.a,{data:M(),columns:"Installation/Un-installation Requests"===(null===e||void 0===e?void 0:e.tabName)?V:"Published Property"===(null===e||void 0===e?void 0:e.tabName)?U:void 0,progressPending:"Published Property"===(null===e||void 0===e?void 0:e.tabName)?y.isLoading:C.isLoading,paginationRowsPerPageOptions:[8,16,24,32,40,48,56,64,72,80],paginationPerPage:8,PaginationComponent:e=>Object(f.jsx)(m.a,{...e})})})]})}))},153:function(e,t,a){},169:function(e,t,a){"use strict";t.a={installationRequestsStatusArr:["ASSIGNED","UNASSIGNED","ACCEPTED","NOT ACCEPTED","IN PROGRESS","PROBLEM","REJECTED","COMPLETED"],installationServiceRequestsStatusArr:["PENDING","ASSIGNED","PROBLEM","REJECTED","IN PROGRESS","COMPLETED","CLOSED"],helpdeskServiceRequestsStatusArr:["PENDING","ASSIGNED","PROBLEM","REJECTED","IN PROGRESS","COMPLETED","CLOSED"],financeConsumerTransactionsStatusArr:["FAILED","COMPLETED"],financeRefundRequestStatusArr:["IN PROGRESS","PENDING","CLOSED"],ConsumerStatusArr:["PENDING","COMPLETED"],transactionLeadsStatusArr:["UNASSIGNED","ASSIGNED","IN PROGRESS","COMPLETED","DISCARDED"],meetingRequestsStatusArr:["ASSIGNED","IN PROGRESS","COMPLETED","NOT DONE"],dealApprovalsStatusArr:["PENDING","CANCELLED","APPROVED"],societyLeadsStatusArr:["PENDING","IN PROGRESS","CONVERTED","CANCELLED","NOT INTERESTED"],propertyStatusArr:["UNDER REVIEW","PUBLISHED"],propertyType:["SMARTDOOR","NON SMARTDOOR"],realtorStatusArr:["SUBMITTED","ACCEPTED","REJECTED"],brokerStatus:["Approved","Rejected","Hold","Pending"]}}}]);