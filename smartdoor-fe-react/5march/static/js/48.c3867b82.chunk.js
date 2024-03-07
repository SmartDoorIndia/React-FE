(this.webpackJsonpsmartdoor=this.webpackJsonpsmartdoor||[]).push([[48],{113:function(e,t,a){"use strict";var n=a(5),s=a(6),i=a(25),l=a.n(i),r=a(0),c=a.n(r),o=(a(112),a(7)),d=a.n(o),m=["as","className","type","tooltip"],b={type:d.a.string,tooltip:d.a.bool,as:d.a.elementType},u=c.a.forwardRef((function(e,t){var a=e.as,i=void 0===a?"div":a,r=e.className,o=e.type,d=void 0===o?"valid":o,b=e.tooltip,u=void 0!==b&&b,p=Object(s.a)(e,m);return c.a.createElement(i,Object(n.a)({},p,{ref:t,className:l()(r,d+"-"+(u?"tooltip":"feedback"))}))}));u.displayName="Feedback",u.propTypes=b;var p=u,j=c.a.createContext({controlId:void 0}),x=a(28),f=["id","bsPrefix","bsCustomPrefix","className","type","isValid","isInvalid","isStatic","as"],h=c.a.forwardRef((function(e,t){var a=e.id,i=e.bsPrefix,o=e.bsCustomPrefix,d=e.className,m=e.type,b=void 0===m?"checkbox":m,u=e.isValid,p=void 0!==u&&u,h=e.isInvalid,g=void 0!==h&&h,O=e.isStatic,v=e.as,y=void 0===v?"input":v,P=Object(s.a)(e,f),N=Object(r.useContext)(j),C=N.controlId,k=N.custom?[o,"custom-control-input"]:[i,"form-check-input"],w=k[0],I=k[1];return i=Object(x.a)(w,I),c.a.createElement(y,Object(n.a)({},P,{ref:t,type:b,id:a||C,className:l()(d,i,p&&"is-valid",g&&"is-invalid",O&&"position-static")}))}));h.displayName="FormCheckInput";var g=h,O=["bsPrefix","bsCustomPrefix","className","htmlFor"],v=c.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.bsCustomPrefix,o=e.className,d=e.htmlFor,m=Object(s.a)(e,O),b=Object(r.useContext)(j),u=b.controlId,p=b.custom?[i,"custom-control-label"]:[a,"form-check-label"],f=p[0],h=p[1];return a=Object(x.a)(f,h),c.a.createElement("label",Object(n.a)({},m,{ref:t,htmlFor:d||u,className:l()(o,a)}))}));v.displayName="FormCheckLabel";var y=v,P=["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","title","type","label","children","custom","as"],N=c.a.forwardRef((function(e,t){var a=e.id,i=e.bsPrefix,o=e.bsCustomPrefix,d=e.inline,m=void 0!==d&&d,b=e.disabled,u=void 0!==b&&b,f=e.isValid,h=void 0!==f&&f,O=e.isInvalid,v=void 0!==O&&O,N=e.feedbackTooltip,C=void 0!==N&&N,k=e.feedback,w=e.className,I=e.style,R=e.title,W=void 0===R?"":R,S=e.type,T=void 0===S?"checkbox":S,F=e.label,E=e.children,L=e.custom,D=e.as,z=void 0===D?"input":D,A=Object(s.a)(e,P),B="switch"===T||L,H=B?[o,"custom-control"]:[i,"form-check"],V=H[0],q=H[1];i=Object(x.a)(V,q);var Q=Object(r.useContext)(j).controlId,G=Object(r.useMemo)((function(){return{controlId:a||Q,custom:B}}),[Q,B,a]),M=B||null!=F&&!1!==F&&!E,J=c.a.createElement(g,Object(n.a)({},A,{type:"switch"===T?"checkbox":T,ref:t,isValid:h,isInvalid:v,isStatic:!M,disabled:u,as:z}));return c.a.createElement(j.Provider,{value:G},c.a.createElement("div",{style:I,className:l()(w,i,B&&"custom-"+T,m&&i+"-inline")},E||c.a.createElement(c.a.Fragment,null,J,M&&c.a.createElement(y,{title:W},F),(h||v)&&c.a.createElement(p,{type:h?"valid":"invalid",tooltip:C},k))))}));N.displayName="FormCheck",N.Input=g,N.Label=y;var C=N,k=["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","lang","as"],w=c.a.forwardRef((function(e,t){var a=e.id,i=e.bsPrefix,o=e.bsCustomPrefix,d=e.className,m=e.isValid,b=e.isInvalid,u=e.lang,p=e.as,f=void 0===p?"input":p,h=Object(s.a)(e,k),g=Object(r.useContext)(j),O=g.controlId,v=g.custom?[o,"custom-file-input"]:[i,"form-control-file"],y=v[0],P=v[1];return i=Object(x.a)(y,P),c.a.createElement(f,Object(n.a)({},h,{ref:t,id:a||O,type:"file",lang:u,className:l()(d,i,m&&"is-valid",b&&"is-invalid")}))}));w.displayName="FormFileInput";var I=w,R=["bsPrefix","bsCustomPrefix","className","htmlFor"],W=c.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.bsCustomPrefix,o=e.className,d=e.htmlFor,m=Object(s.a)(e,R),b=Object(r.useContext)(j),u=b.controlId,p=b.custom?[i,"custom-file-label"]:[a,"form-file-label"],f=p[0],h=p[1];return a=Object(x.a)(f,h),c.a.createElement("label",Object(n.a)({},m,{ref:t,htmlFor:d||u,className:l()(o,a),"data-browse":m["data-browse"]}))}));W.displayName="FormFileLabel";var S=W,T=["id","bsPrefix","bsCustomPrefix","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","label","children","custom","lang","data-browse","as","inputAs"],F=c.a.forwardRef((function(e,t){var a=e.id,i=e.bsPrefix,o=e.bsCustomPrefix,d=e.disabled,m=void 0!==d&&d,b=e.isValid,u=void 0!==b&&b,f=e.isInvalid,h=void 0!==f&&f,g=e.feedbackTooltip,O=void 0!==g&&g,v=e.feedback,y=e.className,P=e.style,N=e.label,C=e.children,k=e.custom,w=e.lang,R=e["data-browse"],W=e.as,F=void 0===W?"div":W,E=e.inputAs,L=void 0===E?"input":E,D=Object(s.a)(e,T),z=k?[o,"custom"]:[i,"form-file"],A=z[0],B=z[1];i=Object(x.a)(A,B);var H=Object(r.useContext)(j).controlId,V=Object(r.useMemo)((function(){return{controlId:a||H,custom:k}}),[H,k,a]),q=null!=N&&!1!==N&&!C,Q=c.a.createElement(I,Object(n.a)({},D,{ref:t,isValid:u,isInvalid:h,disabled:m,as:L,lang:w}));return c.a.createElement(j.Provider,{value:V},c.a.createElement(F,{style:P,className:l()(y,i,k&&"custom-file")},C||c.a.createElement(c.a.Fragment,null,k?c.a.createElement(c.a.Fragment,null,Q,q&&c.a.createElement(S,{"data-browse":R},N)):c.a.createElement(c.a.Fragment,null,q&&c.a.createElement(S,null,N),Q),(u||h)&&c.a.createElement(p,{type:u?"valid":"invalid",tooltip:O},v))))}));F.displayName="FormFile",F.Input=I,F.Label=S;var E=F,L=(a(45),["bsPrefix","bsCustomPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","custom","as"]),D=c.a.forwardRef((function(e,t){var a,i,o=e.bsPrefix,d=e.bsCustomPrefix,m=e.type,b=e.size,u=e.htmlSize,p=e.id,f=e.className,h=e.isValid,g=void 0!==h&&h,O=e.isInvalid,v=void 0!==O&&O,y=e.plaintext,P=e.readOnly,N=e.custom,C=e.as,k=void 0===C?"input":C,w=Object(s.a)(e,L),I=Object(r.useContext)(j).controlId,R=N?[d,"custom"]:[o,"form-control"],W=R[0],S=R[1];if(o=Object(x.a)(W,S),y)(i={})[o+"-plaintext"]=!0,a=i;else if("file"===m){var T;(T={})[o+"-file"]=!0,a=T}else if("range"===m){var F;(F={})[o+"-range"]=!0,a=F}else if("select"===k&&N){var E;(E={})[o+"-select"]=!0,E[o+"-select-"+b]=b,a=E}else{var D;(D={})[o]=!0,D[o+"-"+b]=b,a=D}return c.a.createElement(k,Object(n.a)({},w,{type:m,size:u,ref:t,readOnly:P,id:p||I,className:l()(f,a,g&&"is-valid",v&&"is-invalid")}))}));D.displayName="FormControl";var z=Object.assign(D,{Feedback:p}),A=["bsPrefix","className","children","controlId","as"],B=c.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.className,o=e.children,d=e.controlId,m=e.as,b=void 0===m?"div":m,u=Object(s.a)(e,A);a=Object(x.a)(a,"form-group");var p=Object(r.useMemo)((function(){return{controlId:d}}),[d]);return c.a.createElement(j.Provider,{value:p},c.a.createElement(b,Object(n.a)({},u,{ref:t,className:l()(i,a)}),o))}));B.displayName="FormGroup";var H=B,V=a(141),q=["as","bsPrefix","column","srOnly","className","htmlFor"],Q=c.a.forwardRef((function(e,t){var a=e.as,i=void 0===a?"label":a,o=e.bsPrefix,d=e.column,m=e.srOnly,b=e.className,u=e.htmlFor,p=Object(s.a)(e,q),f=Object(r.useContext)(j).controlId;o=Object(x.a)(o,"form-label");var h="col-form-label";"string"===typeof d&&(h=h+" "+h+"-"+d);var g=l()(b,o,m&&"sr-only",d&&h);return u=u||f,d?c.a.createElement(V.a,Object(n.a)({ref:t,as:"label",className:g,htmlFor:u},p)):c.a.createElement(i,Object(n.a)({ref:t,className:g,htmlFor:u},p))}));Q.displayName="FormLabel",Q.defaultProps={column:!1,srOnly:!1};var G=Q,M=["bsPrefix","className","as","muted"],J=c.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.className,r=e.as,o=void 0===r?"small":r,d=e.muted,m=Object(s.a)(e,M);return a=Object(x.a)(a,"form-text"),c.a.createElement(o,Object(n.a)({},m,{ref:t,className:l()(i,a,d&&"text-muted")}))}));J.displayName="FormText";var K=J,_=c.a.forwardRef((function(e,t){return c.a.createElement(C,Object(n.a)({},e,{ref:t,type:"switch"}))}));_.displayName="Switch",_.Input=C.Input,_.Label=C.Label;var U=_,X=a(128),Y=["bsPrefix","inline","className","validated","as"],Z=Object(X.a)("form-row"),$=c.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.inline,r=e.className,o=e.validated,d=e.as,m=void 0===d?"form":d,b=Object(s.a)(e,Y);return a=Object(x.a)(a,"form"),c.a.createElement(m,Object(n.a)({},b,{ref:t,className:l()(r,o&&"was-validated",i&&a+"-inline")}))}));$.displayName="Form",$.defaultProps={inline:!1},$.Row=Z,$.Group=H,$.Control=z,$.Check=C,$.File=E,$.Switch=U,$.Label=G,$.Text=K;t.a=$},121:function(e,t,a){"use strict";var n=a(148),s=a.n(n),i=(a(126),a(0)),l=a(123),r=a(55),c=a(4);const o=Object(c.jsx)("img",{src:l.a,className:"ml-1",width:"10px",alt:"SHORT_ICON"}),d=Object(c.jsx)(r.b,{}),m=e=>{let{title:t,columns:a,data:n,pagination:i,progressPending:l,onChangePage:r,paginationComponent:m,paginationRowsPerPageOptions:u,paginationPerPage:p,sortIcon:j,progressComponent:x,striped:f,...h}=e;return Object(c.jsx)(s.a,{title:t,columns:a,data:n,pagination:!1!==i,highlightOnHover:!0,progressPending:l,onChangePage:r,striped:!1!==f,paginationComponent:m,paginationRowsPerPageOptions:u,paginationPerPage:p,customStyles:b,sortIcon:j||o,progressComponent:x||d,...h})},b={rows:{style:{borderBottomWidth:"0 !important","&:nth-child(even)":{backgroundColor:"#fff"},"&:nth-child(odd)":{backgroundColor:"#f8f3f5"}}},headCells:{style:{fontWeight:"700 !important",fontSize:".875rem",color:"#252525",justifyContent:"center","&:first-child":{minWidth:"70px",maxWidth:"100px"}}},cells:{style:{fontSize:".875rem",color:"#252525","&:first-child":{minWidth:"100px",maxWidth:"120px"}}}};t.a=Object(i.memo)(m)},123:function(e,t,a){"use strict";t.a=a.p+"static/media/sort-icon.a64bca1a.svg"},126:function(e,t,a){},132:function(e,t,a){"use strict";var n,s,i,l,r,c,o,d,m,b,u,p=a(133),j=a(0),x=a(161),f=a(4);const h=function(){return Object(x.css)(n||(n=Object(p.a)(["\n    @media screen and (max-width: ","px) {\n      ","\n    }\n  "])),599,Object(x.css)(...arguments))},g=x.default.select(s||(s=Object(p.a)(["\n  cursor: pointer;\n  height: 24px;\n  min-width: 24px;\n  user-select: none;\n  padding-left: 8px;\n  padding-right: 12px;\n  box-sizing: content-box;\n  font-size: inherit;\n  color: inherit;\n  border: none;\n  background-color: transparent;\n  appearance: none;\n  direction: ltr;\n  &::-ms-expand {\n    display: none;\n  }\n  &:disabled::-ms-expand {\n    background: #f60;\n  }\n  option {\n    color: initial;\n  }\n"]))),O=x.default.div(i||(i=Object(p.a)(["\n  position: relative;\n  flex-shrink: 0;\n  font-size: inherit;\n  color: inherit;\n  margin-top: 1px;\n  svg {\n    top: 0;\n    right: 0;\n    color: inherit;\n    position: absolute;\n    fill: currentColor;\n    width: 24px;\n    height: 24px;\n    display: inline-block;\n    user-select: none;\n    pointer-events: none;\n  }\n"]))),v={rowsPerPageText:"Rows per page:",rangeSeparatorText:"of",noRowsPerPage:!1,selectAllRowsItem:!1,selectAllRowsItemText:"All"},y=x.default.nav(l||(l=Object(p.a)(["\n  display: flex;\n  flex: 1 1 auto;\n  // justify-content: flex-end;\n  align-items: center;\n  box-sizing: border-box;\n  padding-right: 8px;\n  padding-left: 8px;\n  width: 100%;\n  ",";\n"])),(e=>e.theme.pagination.style)),P=x.default.button(r||(r=Object(p.a)(["\n  position: relative;\n  display: block;\n  user-select: none;\n  border: none;\n  ",";\n  ",";\n"])),(e=>e.theme.pagination.pageButtonsStyle),(e=>e.isRTL&&"transform: scale(-1, -1)")),N=x.default.div(c||(c=Object(p.a)(["\n  display: flex;\n  align-items: center;\n  border-radius: 4px;\n  white-space: nowrap;\n  ",";\n"])),h(o||(o=Object(p.a)(["\n    width: 100%;\n    justify-content: space-around;\n  "])))),C=x.default.span(d||(d=Object(p.a)(["\n  flex-shrink: 1;\n  user-select: none;\n"]))),k=Object(x.default)(C)(m||(m=Object(p.a)(["\n  margin: 0 24px;\n"]))),w=Object(x.default)(C)(b||(b=Object(p.a)(["\n  margin: 0 4px;\n"]))),I=x.default.div(u||(u=Object(p.a)(["\n  margin: ",";\n  display: ",";\n\n  "])),(e=>e.margin),(e=>e.display)),R=(e,t)=>Math.ceil(e/t),W=e=>Object(f.jsx)(O,{children:Object(f.jsx)(g,{...e})});t.a=e=>{let{rowsPerPage:t,rowCount:a,onChangePage:n,onChangeRowsPerPage:s,currentPage:i,direction:l,paginationRowsPerPageOptions:r,paginationIconLastPage:c,paginationIconFirstPage:o,paginationIconNext:d,paginationIconPrevious:m,paginationComponentOptions:b,PaginationActionButton:u}=e;const p=!1,x=R(a,t),h=i*t,g=h-t+1,O=1===i,C=i===x,S={...v,...b},T=i===x?"".concat(g,"-").concat(a," ").concat(S.rangeSeparatorText," ").concat(a):"".concat(g,"-").concat(h," ").concat(S.rangeSeparatorText," ").concat(a),F=Object(j.useCallback)((()=>n(i-1)),[i,n]),E=Object(j.useCallback)((()=>n(i+1)),[i,n]),L=Object(j.useCallback)((()=>n(1)),[n]),D=Object(j.useCallback)((()=>n(R(a,t))),[n,a,t]),z=Object(j.useCallback)((e=>{let{target:t}=e;return s(Number(t.value),i)}),[i,s]),A=r.map((e=>Object(f.jsx)("option",{value:e,children:e},e)));S.selectAllRowsItem&&A.push(Object(f.jsx)("option",{value:a,children:S.selectAllRowsItemText},-1));const B=Object(f.jsx)(W,{onChange:z,defaultValue:t,"aria-label":S.rowsPerPageText,children:A});return Object(f.jsxs)(y,{className:"rdt_Pagination",children:[Object(f.jsx)(I,{margin:"0 auto",children:" "}),Object(f.jsx)(I,{margin:"0 auto",children:u?Object(f.jsx)(u,{}):null}),Object(f.jsxs)(I,{style:{display:"contents"},children:[!S.noRowsPerPage&&Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(w,{children:S.rowsPerPageText}),B]}),Object(f.jsx)(k,{children:T}),Object(f.jsxs)(N,{children:[Object(f.jsx)(P,{id:"pagination-first-page",type:"button","aria-label":"First Page","aria-disabled":O,onClick:L,disabled:O,isRTL:p,children:o}),Object(f.jsx)(P,{id:"pagination-previous-page",type:"button","aria-label":"Previous Page","aria-disabled":O,onClick:F,disabled:O,isRTL:p,children:m}),!1,Object(f.jsx)(P,{id:"pagination-next-page",type:"button","aria-label":"Next Page","aria-disabled":C,onClick:E,disabled:C,isRTL:p,children:d}),Object(f.jsx)(P,{id:"pagination-last-page",type:"button","aria-label":"Last Page","aria-disabled":C,onClick:D,disabled:C,isRTL:p,children:c})]})]})]})}},133:function(e,t,a){"use strict";function n(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}a.d(t,"a",(function(){return n}))},137:function(e,t,a){"use strict";t.a=a.p+"static/media/content-ico.1134bf42.svg"},1421:function(e,t,a){},154:function(e,t,a){"use strict";a(162);var n=a(113),s=a(0),i=a(121),l=a(20),r=a(4);const c=e=>{let{title:t,textComponent:a,filterComponent:s,filter:c,filterCity:o,data:d,columns:m,isLoading:b,PaginationComponent:u,perPageOptions:p,paginationPerPage:j,ProgressComponent:x,pagination:f,isPaginationButton:h,PaginationButton:g,handleFilterChange:O,className:v,...y}=e;return Object(r.jsxs)("div",{className:"finance-table"===v?"finance-tableBox tableBox bg-white":"tableBox bg-white",children:[t?Object(r.jsxs)("div",{className:"d-flex justify-content-between align-items-center tableHeading",children:[Object(r.jsx)("div",{children:Object(r.jsx)(l.a,{size:"regular",fontWeight:"mediumbold",color:"secondryColor",text:t})}),Object(r.jsxs)("div",{className:"locationSelect",children:[a||null,s||null,c?Object(r.jsx)(n.a.Group,{controlId:"exampleForm.SelectCustom",children:Object(r.jsxs)(n.a.Control,{as:"select",onChange:e=>O(e.target.value),children:[Object(r.jsx)("option",{value:"",children:"Select City"}),o&&null!==o&&void 0!==o&&o.length?o.map(((e,t)=>Object(r.jsx)("option",{value:e,children:e},t))):null]})}):null]})]}):null,Object(r.jsx)(i.a,{data:d,columns:m,progressPending:b,paginationComponent:u,paginationRowsPerPageOptions:p,paginationPerPage:j,progressComponent:x,pagination:f,...y}),h?Object(r.jsx)("div",{className:"d-flex justify-content-center",children:g||""}):null!==d&&void 0!==d&&d.length?null:g?Object(r.jsx)("div",{className:"d-flex justify-content-center",children:g}):null]})};t.a=Object(s.memo)(c)},1584:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a(37),i=a(35),l=a(189),r=a(29),c=(a(124),a(217)),o=a(117),d=a(14),m=a(8),b=a(20),u=a(154),p=(a(132),a(34)),j=a(137),x=a.p+"static/media/locationIcon.1b8a9172.svg",f=(a(1421),a(4));const h={getHelpDeskDashboardCount:o.Kb,getHelpDeskTeam:o.Nb,getHelpDeskPropertyLeads:o.Lb,getHelpDeskServiceRequest:o.Mb,getHelpDeskDashboardCity:o.Jb,getAllCity:o.H},g=Object(s.b)((e=>{let{helpdeskDashboardCount:t,helpdeskTeams:a,helpdeskPropertyLeads:n,helpdeskServiceReq:s,helpdeskDashboardCity:i,allCities:l,userAuthData:r}=e;return{helpdeskDashboardCount:t,helpdeskTeams:a,helpdeskPropertyLeads:n,helpdeskServiceReq:s,helpdeskDashboardCity:i,allCities:l,userAuthData:r}}),h),O=e=>Object(f.jsx)("div",{className:"table-bottom ml-auto",children:Object(f.jsx)(d.b,{to:{pathname:"/admin/helpdesk/property-leads",state:{module:"Property Leads"}},className:"viewAll-btn",children:Object(f.jsx)(b.a,{size:"Small",fontWeight:"mediumbold",color:"primaryColor",text:"View All",className:"ml-2 d-flex"})})}),v=()=>Object(f.jsx)(f.Fragment,{children:Object(f.jsx)("div",{className:"table-bottom ml-auto",children:Object(f.jsx)(d.b,{to:"/admin/helpdesk/serviceRequest",className:"viewAll-btn",children:Object(f.jsx)(b.a,{size:"Small",fontWeight:"mediumbold",color:"primaryColor",text:"View All",className:"ml-2 d-flex"})})})}),y=[{name:"Id",selector:e=>e.leadId,sortable:!0,center:!0},{name:"Date",selector:e=>e.leadDate,sortable:!0,center:!0,cell:e=>{let{leadDate:t}=e;return Object(f.jsx)("span",{children:Object(p.f)(t)})}},{name:"Lead For",selector:e=>e.leadFor,center:!0,minWidth:"80px"},{name:"Contact Person",selector:e=>e.contactPerson,center:!0,minWidth:"140px",style:{"text-align":"center"},cell:e=>{let{contactPerson:t}=e;return Object(f.jsxs)("span",{children:[" ",t||"-"," "]})}},{name:"Phone No",selector:e=>e.contactNumber,center:!0,minWidth:"140px",cell:e=>{let{contactNumber:t}=e;return Object(f.jsxs)("span",{children:[" ",t||"-"," "]})}},{name:"Society",selector:e=>e.societyName,center:!0,maxWidth:"150px",minWidth:"140px",cell:e=>{let{societyName:t}=e;return Object(f.jsx)("span",{children:t||"-"})}},{name:"Location",selector:e=>e.address,center:!0,maxWidth:"150px",cell:e=>{let{address:t}=e;return Object(f.jsx)(p.a,{position:"top",style:{width:"100%"},name:t||"",children:Object(f.jsx)("span",{className:"cursor-pointer elipsis-text",children:t.substring(0,-1!==t.indexOf(",")?t.indexOf(","):t.length)})})}},{name:"Recommended By ",selector:e=>e.recommendedBy,center:!0,minWidth:"160px",cell:e=>{let{recommendedBy:t}=e;return Object(f.jsx)(b.a,{size:"Small",className:"text-align-center",color:"secondryColor",text:t?t.capitalizeWord():"-"})}},{name:"Action",center:!0,maxWidth:"60px",cell:e=>{let{leadId:t}=e;return Object(f.jsx)("div",{className:"action",children:Object(f.jsx)(p.a,{position:"left",name:"View Details",children:Object(f.jsx)("span",{children:Object(f.jsx)(d.b,{to:{pathname:"/admin/helpdesk/lead-details",state:{leadId:t,module:"HELPDESK"}},children:Object(f.jsx)(r.a,{name:"useraddIcon",src:j.a})})})})})}}];t.default=Object(i.c)(g,n.memo)((e=>{var t,a;const{getHelpDeskDashboardCount:s,getHelpDeskTeam:i,getHelpDeskPropertyLeads:o,getHelpDeskServiceRequest:h,getAllCity:g,helpdeskDashboardCount:P,helpdeskPropertyLeads:N,helpdeskServiceReq:C,allCities:k}=e;Object(n.useEffect)((()=>{s(),g(),o({city:"",records:"",pageNumber:"",zipCode:""}),h({status:[],endDate:"",city:"",contactNumber:"",ticketNumber:"",startDate:"",records:"5",pageNumber:"1"}),i({city:"",records:"",pageNumber:""})}),[]);const w=[{name:"Id",selector:e=>e.ticketNo,center:!0,sortable:!0,maxWidth:"100px !important"},{name:"Date",selector:e=>e.createdDate,center:!0,sortable:!0,cell:e=>{let{createdDate:t,time:a}=e;return Object(f.jsx)("span",{children:"".concat(Object(p.f)(t)," | ").concat(Object(p.d)(t,"hh:mm a")||"-")})}},{name:"Request",selector:e=>e.ticketName,center:!0,cell:e=>{let{ticketName:t}=e;return Object(f.jsx)(p.a,{position:"top",name:t||"",children:Object(f.jsxs)("span",{className:"cursor-pointer elipsis-text",children:[" ",t||"-"," "]})})}},{name:"From",selector:e=>e.requestedBy,maxWidth:"100px",center:!0},{name:"Phone No",center:!0,maxWidth:"130px",cell:e=>{let{contactNumber:t}=e;return Object(f.jsxs)("span",{children:[" ",t||"-"," "]})}},{name:"Assigned To",selector:e=>e.assignTo,center:!0,maxWidth:"130px",cell:e=>{let{id:t,teamName:a,teamNameList:n}=e;return Object(f.jsx)(b.a,{size:"Small",color:"secondryColor",className:"text-center",text:a||"UNASSIGNED"})}},{name:"Status",selector:e=>e.status,center:!0,maxWidth:"120px",style:{"white-space":"nowrap",padding:"0 !important","max-width":"120px"},cell:e=>{let{status:t}=e;return Object(p.p)(t)}},{name:"Action",center:!0,maxWidth:"50px",cell:e=>{let{id:t}=e;return Object(f.jsx)("div",{className:"action",children:Object(f.jsx)(p.a,{position:"left",name:"View Details",children:Object(f.jsx)("span",{children:Object(f.jsx)(d.b,{to:{pathname:"/admin/helpdesk/serviceRequest-details/".concat(t)},children:Object(f.jsx)(r.a,{name:"useraddIcon",src:j.a})})})})})}}];return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(m.Route,{path:"/admin/helpdesk/user-detail",excat:!0,render:e=>Object(f.jsx)(c.a,{...e,module:"HELPDESK",tabName:["Leads","Service Requests"]})}),Object(f.jsxs)("div",{className:"cardBox",children:[Object(f.jsx)(l.a,{className:"cardWidth",children:Object(f.jsx)(l.a.Body,{children:Object(f.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[Object(f.jsxs)("div",{className:"align-items-center",children:[Object(f.jsx)(b.a,{size:"medium",fontWeight:"mediumbold",color:"primaryColor",text:P.data.location}),Object(f.jsx)(b.a,{size:"xSmall",fontWeight:"smbold",color:"TaupeGrey",text:"Top Location",className:"mt-1"})]}),Object(f.jsx)("div",{className:"align-items-center d-flex card-group-align",children:Object(f.jsx)(r.a,{name:"sort_icon",src:x,className:"m-0"})})]})})}),Object(f.jsx)(l.a,{className:"cardWidth",children:Object(f.jsxs)(l.a.Body,{children:[Object(f.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[Object(f.jsx)(b.a,{size:"medium",fontWeight:"mediumbold",color:"primaryColor",text:P.data.customerQueries}),Object(f.jsx)(b.a,{size:"Small",fontWeight:"smbold",color:P.data.customerQueriesThisWeek.toString().includes("-")?"dangerColor":"successColor",text:P.data.customerQueriesThisWeek.toString().includes("-")?P.data.customerQueriesThisWeek:"+"+P.data.customerQueriesThisWeek})]}),Object(f.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[Object(f.jsx)(b.a,{size:"xSmall",fontWeight:"smbold",color:"TaupeGrey",text:"Customer Queries"}),Object(f.jsx)(b.a,{size:"xSmall",fontWeight:"smbold",color:"secondryColor",text:"Change This Week"})]})]})}),Object(f.jsx)(l.a,{className:"cardWidth",children:Object(f.jsxs)(l.a.Body,{children:[Object(f.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[Object(f.jsx)(b.a,{size:"medium",fontWeight:"mediumbold",color:"primaryColor",text:P.data.customerResolvedQueries}),Object(f.jsx)(b.a,{size:"Small",fontWeight:"smbold",color:P.data.customerResolvedQueriesThisWeek.toString().includes("-")?"dangerColor":"successColor",text:P.data.customerResolvedQueriesThisWeek.toString().includes("-")?P.data.customerResolvedQueriesThisWeek:"+"+P.data.customerResolvedQueriesThisWeek})]}),Object(f.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[Object(f.jsx)(b.a,{size:"xSmall",fontWeight:"smbold",color:"TaupeGrey",text:"Queries Resolved"}),Object(f.jsx)(b.a,{size:"xSmall",fontWeight:"smbold",color:"secondryColor",text:"Change This Week"})]})]})})]}),Object(f.jsx)("div",{className:"helpdeskPropertyleadsTableWrapper",children:Object(f.jsx)(u.a,{title:"Property Leads",data:N.data,columns:y,isLoading:!1,progressPending:N.isLoading,PaginationComponent:null!==N&&void 0!==N&&null!==(t=N.data)&&void 0!==t&&t.length?O:null,perPageOptions:[4,10,20,50],paginationPerPage:4,filter:!0,filterCity:k.data.cities,handleFilterChange:e=>{o({city:e,records:"",pageNumber:""})}})}),Object(f.jsx)("div",{className:"helpdeskServicereqTableWrapper",children:Object(f.jsx)(u.a,{title:"Service Requests",data:C.data.length?C.data.slice(0,4):[],columns:w,isPaginationButton:!0,isLoading:!1,progressPending:C.isLoading,PaginationButton:null!==C&&void 0!==C&&null!==(a=C.data)&&void 0!==a&&a.length?Object(f.jsx)(v,{}):null,filterCity:k.data.cities,handleFilterChange:e=>{h({city:e,records:"5",pageNumber:"1"})},pagination:!1})})]})}))},162:function(e,t,a){},189:function(e,t,a){"use strict";var n=a(5),s=a(6),i=a(25),l=a.n(i),r=a(0),c=a.n(r),o=a(28),d=a(128),m=a(205),b=a(203),u=["bsPrefix","className","variant","as"],p=c.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.className,r=e.variant,d=e.as,m=void 0===d?"img":d,b=Object(s.a)(e,u),p=Object(o.a)(a,"card-img");return c.a.createElement(m,Object(n.a)({ref:t,className:l()(r?p+"-"+r:p,i)},b))}));p.displayName="CardImg",p.defaultProps={variant:null};var j=p,x=["bsPrefix","className","bg","text","border","body","children","as"],f=Object(m.a)("h5"),h=Object(m.a)("h6"),g=Object(d.a)("card-body"),O=Object(d.a)("card-title",{Component:f}),v=Object(d.a)("card-subtitle",{Component:h}),y=Object(d.a)("card-link",{Component:"a"}),P=Object(d.a)("card-text",{Component:"p"}),N=Object(d.a)("card-header"),C=Object(d.a)("card-footer"),k=Object(d.a)("card-img-overlay"),w=c.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.className,d=e.bg,m=e.text,u=e.border,p=e.body,j=e.children,f=e.as,h=void 0===f?"div":f,O=Object(s.a)(e,x),v=Object(o.a)(a,"card"),y=Object(r.useMemo)((function(){return{cardHeaderBsPrefix:v+"-header"}}),[v]);return c.a.createElement(b.a.Provider,{value:y},c.a.createElement(h,Object(n.a)({ref:t},O,{className:l()(i,v,d&&"bg-"+d,m&&"text-"+m,u&&"border-"+u)}),p?c.a.createElement(g,null,j):j))}));w.displayName="Card",w.defaultProps={body:!1},w.Img=j,w.Title=O,w.Subtitle=v,w.Body=g,w.Link=y,w.Text=P,w.Header=N,w.Footer=C,w.ImgOverlay=k;t.a=w}}]);