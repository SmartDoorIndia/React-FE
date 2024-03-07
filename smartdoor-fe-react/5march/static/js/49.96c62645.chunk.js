(this.webpackJsonpsmartdoor=this.webpackJsonpsmartdoor||[]).push([[49],{1027:function(e,t,a){},113:function(e,t,a){"use strict";var n=a(5),s=a(6),i=a(25),l=a.n(i),o=a(0),r=a.n(o),c=(a(112),a(7)),d=a.n(c),m=["as","className","type","tooltip"],b={type:d.a.string,tooltip:d.a.bool,as:d.a.elementType},u=r.a.forwardRef((function(e,t){var a=e.as,i=void 0===a?"div":a,o=e.className,c=e.type,d=void 0===c?"valid":c,b=e.tooltip,u=void 0!==b&&b,j=Object(s.a)(e,m);return r.a.createElement(i,Object(n.a)({},j,{ref:t,className:l()(o,d+"-"+(u?"tooltip":"feedback"))}))}));u.displayName="Feedback",u.propTypes=b;var j=u,p=r.a.createContext({controlId:void 0}),x=a(28),f=["id","bsPrefix","bsCustomPrefix","className","type","isValid","isInvalid","isStatic","as"],g=r.a.forwardRef((function(e,t){var a=e.id,i=e.bsPrefix,c=e.bsCustomPrefix,d=e.className,m=e.type,b=void 0===m?"checkbox":m,u=e.isValid,j=void 0!==u&&u,g=e.isInvalid,O=void 0!==g&&g,h=e.isStatic,v=e.as,y=void 0===v?"input":v,C=Object(s.a)(e,f),N=Object(o.useContext)(p),P=N.controlId,w=N.custom?[c,"custom-control-input"]:[i,"form-check-input"],S=w[0],I=w[1];return i=Object(x.a)(S,I),r.a.createElement(y,Object(n.a)({},C,{ref:t,type:b,id:a||P,className:l()(d,i,j&&"is-valid",O&&"is-invalid",h&&"position-static")}))}));g.displayName="FormCheckInput";var O=g,h=["bsPrefix","bsCustomPrefix","className","htmlFor"],v=r.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.bsCustomPrefix,c=e.className,d=e.htmlFor,m=Object(s.a)(e,h),b=Object(o.useContext)(p),u=b.controlId,j=b.custom?[i,"custom-control-label"]:[a,"form-check-label"],f=j[0],g=j[1];return a=Object(x.a)(f,g),r.a.createElement("label",Object(n.a)({},m,{ref:t,htmlFor:d||u,className:l()(c,a)}))}));v.displayName="FormCheckLabel";var y=v,C=["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","title","type","label","children","custom","as"],N=r.a.forwardRef((function(e,t){var a=e.id,i=e.bsPrefix,c=e.bsCustomPrefix,d=e.inline,m=void 0!==d&&d,b=e.disabled,u=void 0!==b&&b,f=e.isValid,g=void 0!==f&&f,h=e.isInvalid,v=void 0!==h&&h,N=e.feedbackTooltip,P=void 0!==N&&N,w=e.feedback,S=e.className,I=e.style,k=e.title,T=void 0===k?"":k,F=e.type,W=void 0===F?"checkbox":F,L=e.label,E=e.children,R=e.custom,z=e.as,D=void 0===z?"input":z,A=Object(s.a)(e,C),B="switch"===W||R,V=B?[c,"custom-control"]:[i,"form-check"],M=V[0],G=V[1];i=Object(x.a)(M,G);var H=Object(o.useContext)(p).controlId,U=Object(o.useMemo)((function(){return{controlId:a||H,custom:B}}),[H,B,a]),J=B||null!=L&&!1!==L&&!E,_=r.a.createElement(O,Object(n.a)({},A,{type:"switch"===W?"checkbox":W,ref:t,isValid:g,isInvalid:v,isStatic:!J,disabled:u,as:D}));return r.a.createElement(p.Provider,{value:U},r.a.createElement("div",{style:I,className:l()(S,i,B&&"custom-"+W,m&&i+"-inline")},E||r.a.createElement(r.a.Fragment,null,_,J&&r.a.createElement(y,{title:T},L),(g||v)&&r.a.createElement(j,{type:g?"valid":"invalid",tooltip:P},w))))}));N.displayName="FormCheck",N.Input=O,N.Label=y;var P=N,w=["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","lang","as"],S=r.a.forwardRef((function(e,t){var a=e.id,i=e.bsPrefix,c=e.bsCustomPrefix,d=e.className,m=e.isValid,b=e.isInvalid,u=e.lang,j=e.as,f=void 0===j?"input":j,g=Object(s.a)(e,w),O=Object(o.useContext)(p),h=O.controlId,v=O.custom?[c,"custom-file-input"]:[i,"form-control-file"],y=v[0],C=v[1];return i=Object(x.a)(y,C),r.a.createElement(f,Object(n.a)({},g,{ref:t,id:a||h,type:"file",lang:u,className:l()(d,i,m&&"is-valid",b&&"is-invalid")}))}));S.displayName="FormFileInput";var I=S,k=["bsPrefix","bsCustomPrefix","className","htmlFor"],T=r.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.bsCustomPrefix,c=e.className,d=e.htmlFor,m=Object(s.a)(e,k),b=Object(o.useContext)(p),u=b.controlId,j=b.custom?[i,"custom-file-label"]:[a,"form-file-label"],f=j[0],g=j[1];return a=Object(x.a)(f,g),r.a.createElement("label",Object(n.a)({},m,{ref:t,htmlFor:d||u,className:l()(c,a),"data-browse":m["data-browse"]}))}));T.displayName="FormFileLabel";var F=T,W=["id","bsPrefix","bsCustomPrefix","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","label","children","custom","lang","data-browse","as","inputAs"],L=r.a.forwardRef((function(e,t){var a=e.id,i=e.bsPrefix,c=e.bsCustomPrefix,d=e.disabled,m=void 0!==d&&d,b=e.isValid,u=void 0!==b&&b,f=e.isInvalid,g=void 0!==f&&f,O=e.feedbackTooltip,h=void 0!==O&&O,v=e.feedback,y=e.className,C=e.style,N=e.label,P=e.children,w=e.custom,S=e.lang,k=e["data-browse"],T=e.as,L=void 0===T?"div":T,E=e.inputAs,R=void 0===E?"input":E,z=Object(s.a)(e,W),D=w?[c,"custom"]:[i,"form-file"],A=D[0],B=D[1];i=Object(x.a)(A,B);var V=Object(o.useContext)(p).controlId,M=Object(o.useMemo)((function(){return{controlId:a||V,custom:w}}),[V,w,a]),G=null!=N&&!1!==N&&!P,H=r.a.createElement(I,Object(n.a)({},z,{ref:t,isValid:u,isInvalid:g,disabled:m,as:R,lang:S}));return r.a.createElement(p.Provider,{value:M},r.a.createElement(L,{style:C,className:l()(y,i,w&&"custom-file")},P||r.a.createElement(r.a.Fragment,null,w?r.a.createElement(r.a.Fragment,null,H,G&&r.a.createElement(F,{"data-browse":k},N)):r.a.createElement(r.a.Fragment,null,G&&r.a.createElement(F,null,N),H),(u||g)&&r.a.createElement(j,{type:u?"valid":"invalid",tooltip:h},v))))}));L.displayName="FormFile",L.Input=I,L.Label=F;var E=L,R=(a(45),["bsPrefix","bsCustomPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","custom","as"]),z=r.a.forwardRef((function(e,t){var a,i,c=e.bsPrefix,d=e.bsCustomPrefix,m=e.type,b=e.size,u=e.htmlSize,j=e.id,f=e.className,g=e.isValid,O=void 0!==g&&g,h=e.isInvalid,v=void 0!==h&&h,y=e.plaintext,C=e.readOnly,N=e.custom,P=e.as,w=void 0===P?"input":P,S=Object(s.a)(e,R),I=Object(o.useContext)(p).controlId,k=N?[d,"custom"]:[c,"form-control"],T=k[0],F=k[1];if(c=Object(x.a)(T,F),y)(i={})[c+"-plaintext"]=!0,a=i;else if("file"===m){var W;(W={})[c+"-file"]=!0,a=W}else if("range"===m){var L;(L={})[c+"-range"]=!0,a=L}else if("select"===w&&N){var E;(E={})[c+"-select"]=!0,E[c+"-select-"+b]=b,a=E}else{var z;(z={})[c]=!0,z[c+"-"+b]=b,a=z}return r.a.createElement(w,Object(n.a)({},S,{type:m,size:u,ref:t,readOnly:C,id:j||I,className:l()(f,a,O&&"is-valid",v&&"is-invalid")}))}));z.displayName="FormControl";var D=Object.assign(z,{Feedback:j}),A=["bsPrefix","className","children","controlId","as"],B=r.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.className,c=e.children,d=e.controlId,m=e.as,b=void 0===m?"div":m,u=Object(s.a)(e,A);a=Object(x.a)(a,"form-group");var j=Object(o.useMemo)((function(){return{controlId:d}}),[d]);return r.a.createElement(p.Provider,{value:j},r.a.createElement(b,Object(n.a)({},u,{ref:t,className:l()(i,a)}),c))}));B.displayName="FormGroup";var V=B,M=a(141),G=["as","bsPrefix","column","srOnly","className","htmlFor"],H=r.a.forwardRef((function(e,t){var a=e.as,i=void 0===a?"label":a,c=e.bsPrefix,d=e.column,m=e.srOnly,b=e.className,u=e.htmlFor,j=Object(s.a)(e,G),f=Object(o.useContext)(p).controlId;c=Object(x.a)(c,"form-label");var g="col-form-label";"string"===typeof d&&(g=g+" "+g+"-"+d);var O=l()(b,c,m&&"sr-only",d&&g);return u=u||f,d?r.a.createElement(M.a,Object(n.a)({ref:t,as:"label",className:O,htmlFor:u},j)):r.a.createElement(i,Object(n.a)({ref:t,className:O,htmlFor:u},j))}));H.displayName="FormLabel",H.defaultProps={column:!1,srOnly:!1};var U=H,J=["bsPrefix","className","as","muted"],_=r.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.className,o=e.as,c=void 0===o?"small":o,d=e.muted,m=Object(s.a)(e,J);return a=Object(x.a)(a,"form-text"),r.a.createElement(c,Object(n.a)({},m,{ref:t,className:l()(i,a,d&&"text-muted")}))}));_.displayName="FormText";var q=_,K=r.a.forwardRef((function(e,t){return r.a.createElement(P,Object(n.a)({},e,{ref:t,type:"switch"}))}));K.displayName="Switch",K.Input=P.Input,K.Label=P.Label;var Q=K,X=a(128),Y=["bsPrefix","inline","className","validated","as"],Z=Object(X.a)("form-row"),$=r.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.inline,o=e.className,c=e.validated,d=e.as,m=void 0===d?"form":d,b=Object(s.a)(e,Y);return a=Object(x.a)(a,"form"),r.a.createElement(m,Object(n.a)({},b,{ref:t,className:l()(o,c&&"was-validated",i&&a+"-inline")}))}));$.displayName="Form",$.defaultProps={inline:!1},$.Row=Z,$.Group=V,$.Control=D,$.Check=P,$.File=E,$.Switch=Q,$.Label=U,$.Text=q;t.a=$},121:function(e,t,a){"use strict";var n=a(148),s=a.n(n),i=(a(126),a(0)),l=a(123),o=a(55),r=a(4);const c=Object(r.jsx)("img",{src:l.a,className:"ml-1",width:"10px",alt:"SHORT_ICON"}),d=Object(r.jsx)(o.b,{}),m=e=>{let{title:t,columns:a,data:n,pagination:i,progressPending:l,onChangePage:o,paginationComponent:m,paginationRowsPerPageOptions:u,paginationPerPage:j,sortIcon:p,progressComponent:x,striped:f,...g}=e;return Object(r.jsx)(s.a,{title:t,columns:a,data:n,pagination:!1!==i,highlightOnHover:!0,progressPending:l,onChangePage:o,striped:!1!==f,paginationComponent:m,paginationRowsPerPageOptions:u,paginationPerPage:j,customStyles:b,sortIcon:p||c,progressComponent:x||d,...g})},b={rows:{style:{borderBottomWidth:"0 !important","&:nth-child(even)":{backgroundColor:"#fff"},"&:nth-child(odd)":{backgroundColor:"#f8f3f5"}}},headCells:{style:{fontWeight:"700 !important",fontSize:".875rem",color:"#252525",justifyContent:"center","&:first-child":{minWidth:"70px",maxWidth:"100px"}}},cells:{style:{fontSize:".875rem",color:"#252525","&:first-child":{minWidth:"100px",maxWidth:"120px"}}}};t.a=Object(i.memo)(m)},123:function(e,t,a){"use strict";t.a=a.p+"static/media/sort-icon.a64bca1a.svg"},126:function(e,t,a){},132:function(e,t,a){"use strict";var n,s,i,l,o,r,c,d,m,b,u,j=a(133),p=a(0),x=a(161),f=a(4);const g=function(){return Object(x.css)(n||(n=Object(j.a)(["\n    @media screen and (max-width: ","px) {\n      ","\n    }\n  "])),599,Object(x.css)(...arguments))},O=x.default.select(s||(s=Object(j.a)(["\n  cursor: pointer;\n  height: 24px;\n  min-width: 24px;\n  user-select: none;\n  padding-left: 8px;\n  padding-right: 12px;\n  box-sizing: content-box;\n  font-size: inherit;\n  color: inherit;\n  border: none;\n  background-color: transparent;\n  appearance: none;\n  direction: ltr;\n  &::-ms-expand {\n    display: none;\n  }\n  &:disabled::-ms-expand {\n    background: #f60;\n  }\n  option {\n    color: initial;\n  }\n"]))),h=x.default.div(i||(i=Object(j.a)(["\n  position: relative;\n  flex-shrink: 0;\n  font-size: inherit;\n  color: inherit;\n  margin-top: 1px;\n  svg {\n    top: 0;\n    right: 0;\n    color: inherit;\n    position: absolute;\n    fill: currentColor;\n    width: 24px;\n    height: 24px;\n    display: inline-block;\n    user-select: none;\n    pointer-events: none;\n  }\n"]))),v={rowsPerPageText:"Rows per page:",rangeSeparatorText:"of",noRowsPerPage:!1,selectAllRowsItem:!1,selectAllRowsItemText:"All"},y=x.default.nav(l||(l=Object(j.a)(["\n  display: flex;\n  flex: 1 1 auto;\n  // justify-content: flex-end;\n  align-items: center;\n  box-sizing: border-box;\n  padding-right: 8px;\n  padding-left: 8px;\n  width: 100%;\n  ",";\n"])),(e=>e.theme.pagination.style)),C=x.default.button(o||(o=Object(j.a)(["\n  position: relative;\n  display: block;\n  user-select: none;\n  border: none;\n  ",";\n  ",";\n"])),(e=>e.theme.pagination.pageButtonsStyle),(e=>e.isRTL&&"transform: scale(-1, -1)")),N=x.default.div(r||(r=Object(j.a)(["\n  display: flex;\n  align-items: center;\n  border-radius: 4px;\n  white-space: nowrap;\n  ",";\n"])),g(c||(c=Object(j.a)(["\n    width: 100%;\n    justify-content: space-around;\n  "])))),P=x.default.span(d||(d=Object(j.a)(["\n  flex-shrink: 1;\n  user-select: none;\n"]))),w=Object(x.default)(P)(m||(m=Object(j.a)(["\n  margin: 0 24px;\n"]))),S=Object(x.default)(P)(b||(b=Object(j.a)(["\n  margin: 0 4px;\n"]))),I=x.default.div(u||(u=Object(j.a)(["\n  margin: ",";\n  display: ",";\n\n  "])),(e=>e.margin),(e=>e.display)),k=(e,t)=>Math.ceil(e/t),T=e=>Object(f.jsx)(h,{children:Object(f.jsx)(O,{...e})});t.a=e=>{let{rowsPerPage:t,rowCount:a,onChangePage:n,onChangeRowsPerPage:s,currentPage:i,direction:l,paginationRowsPerPageOptions:o,paginationIconLastPage:r,paginationIconFirstPage:c,paginationIconNext:d,paginationIconPrevious:m,paginationComponentOptions:b,PaginationActionButton:u}=e;const j=!1,x=k(a,t),g=i*t,O=g-t+1,h=1===i,P=i===x,F={...v,...b},W=i===x?"".concat(O,"-").concat(a," ").concat(F.rangeSeparatorText," ").concat(a):"".concat(O,"-").concat(g," ").concat(F.rangeSeparatorText," ").concat(a),L=Object(p.useCallback)((()=>n(i-1)),[i,n]),E=Object(p.useCallback)((()=>n(i+1)),[i,n]),R=Object(p.useCallback)((()=>n(1)),[n]),z=Object(p.useCallback)((()=>n(k(a,t))),[n,a,t]),D=Object(p.useCallback)((e=>{let{target:t}=e;return s(Number(t.value),i)}),[i,s]),A=o.map((e=>Object(f.jsx)("option",{value:e,children:e},e)));F.selectAllRowsItem&&A.push(Object(f.jsx)("option",{value:a,children:F.selectAllRowsItemText},-1));const B=Object(f.jsx)(T,{onChange:D,defaultValue:t,"aria-label":F.rowsPerPageText,children:A});return Object(f.jsxs)(y,{className:"rdt_Pagination",children:[Object(f.jsx)(I,{margin:"0 auto",children:" "}),Object(f.jsx)(I,{margin:"0 auto",children:u?Object(f.jsx)(u,{}):null}),Object(f.jsxs)(I,{style:{display:"contents"},children:[!F.noRowsPerPage&&Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(S,{children:F.rowsPerPageText}),B]}),Object(f.jsx)(w,{children:W}),Object(f.jsxs)(N,{children:[Object(f.jsx)(C,{id:"pagination-first-page",type:"button","aria-label":"First Page","aria-disabled":h,onClick:R,disabled:h,isRTL:j,children:c}),Object(f.jsx)(C,{id:"pagination-previous-page",type:"button","aria-label":"Previous Page","aria-disabled":h,onClick:L,disabled:h,isRTL:j,children:m}),!1,Object(f.jsx)(C,{id:"pagination-next-page",type:"button","aria-label":"Next Page","aria-disabled":P,onClick:E,disabled:P,isRTL:j,children:d}),Object(f.jsx)(C,{id:"pagination-last-page",type:"button","aria-label":"Last Page","aria-disabled":P,onClick:z,disabled:P,isRTL:j,children:r})]})]})]})}},133:function(e,t,a){"use strict";function n(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}a.d(t,"a",(function(){return n}))},137:function(e,t,a){"use strict";t.a=a.p+"static/media/content-ico.1134bf42.svg"},1504:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a(37),i=a(35),l=a(20),o=a(189),r=a(113),c=a(29),d=a(124),m=a(217),b=(a(1027),a(117)),u=a(14),j=a(8),p=a(55),x=a(121),f=a(132),g=a(137),O=a(34),h=a(154),v=a(4);const y=Object(v.jsx)(p.b,{}),C={getAllCity:b.H,getSocietyLeadsData:b.tc,getSalesTeamData:b.lc,getLeadsCount:b.Tb,getSocietyLeadsCity:b.sc,getSalesTeamCity:b.kc},N=Object(s.b)((e=>{let{salesLeadsDataTable:t,salesTeamData:a,salesLeadsCount:n,getSocietyLeadsCityData:s,allCities:i,getSalesTeamCityData:l}=e;return{salesLeadsDataTable:t,salesTeamData:a,salesLeadsCount:n,getSocietyLeadsCityData:s,allCities:i,getSalesTeamCityData:l}}),C);t.default=Object(i.c)(N,n.memo)((e=>{var t,a,s;const{getLeadsCount:i,getAllCity:p,getSocietyLeadsData:C,getSalesTeamData:N,salesLeadsCount:P,salesLeadsDataTable:w,salesTeamData:S,allCities:I,getSalesTeamCity:k}=e,[T,F]=Object(n.useState)(""),[W,L]=Object(n.useState)("");const E=[{name:"Id",selector:e=>e.id,center:!0,sortable:!0},{name:"Name",selector:e=>e.name,center:!0,cell:e=>{let{name:t,imageUrl:a}=e;return Object(v.jsx)("div",{className:"userName",children:Object(v.jsx)(O.a,{position:"top",style:{width:"100%"},name:t||"",children:Object(v.jsx)(l.a,{size:"Small",color:"secondryColor",text:t?t.capitalizeWord():"-"})})})}},{name:"Role",selector:e=>e.position,center:!0,cell:e=>{let{userType:t}=e;return Object(v.jsx)("div",{className:"userName",children:Object(v.jsx)(O.a,{position:"top",style:{width:"100%"},name:t||"",children:Object(v.jsx)(l.a,{size:"Small",color:"secondryColor",text:t?t.capitalizeWord():"-"})})})}},{name:"City",selector:e=>e.city,center:!0},{name:"Lead Assigned",selector:e=>e.leadAssigned,center:!0,maxWidth:"160px"},{name:"Lead Completed",selector:e=>e.leadCompleted,sortable:!0,center:!0,minWidth:"160px"},{name:"Action",center:!0,style:{"max-width":"60px"},maxWidth:"60px",cell:e=>Object(v.jsx)("div",{className:"action",children:Object(v.jsx)(O.a,{position:"left",name:"View Details",children:Object(v.jsx)("span",{children:Object(v.jsx)(u.b,{to:{pathname:"/admin/sales/user-details/",state:{userData:e,module:"SALES"}},children:Object(v.jsx)(c.a,{name:"editIcon",src:g.a})})})})})}],R=[{name:"Id",selector:e=>e.leadId,center:!0,sortable:!0},{name:"Date",selector:e=>e.leadDate,sortable:!0,center:!0,maxWidth:"130px",cell:e=>{let{leadDate:t}=e;return Object(v.jsx)("span",{children:Object(O.f)(t)})}},{name:"Source",selector:e=>e.source,center:!0,maxWidth:"60px"},{name:"Society",selector:e=>e.societyName,center:!0,cell:e=>{let{societyName:t}=e;return Object(v.jsx)(O.a,{position:"top",style:{width:"100%"},name:t||"",children:Object(v.jsxs)("span",{className:"elipsis-text",children:[" ",t||"-"]})})}},{name:"City",selector:e=>e.city,center:!0},{name:"Assigned To",selector:e=>e.assignTo,center:!0,cell:e=>{let{assignTo:t,assignToList:a,leadId:n,status:s}=e;return"PENDING"===s?t?Object(v.jsx)(l.a,{size:"Small",color:"secondryColor",className:"text-center",text:t?t.capitalizeWord():"-"}):Object(v.jsx)("div",{className:"w-100",children:Object(v.jsx)("div",{className:"assignTo",children:Object(v.jsx)(r.a.Group,{controlId:"exampleForm.SelectCustom",className:"w-100 display-flex",children:Object(v.jsxs)(r.a.Control,{as:"select",className:"w-100",onChange:e=>function(e,t){e&&t&&Object(b.n)({leadId:e,userId:t}).then((e=>{200===e.data.status&&C({city:T,endDate:"",id:"",societyName:"",startDate:"",status:[],records:"",pageNumber:""})})).catch((e=>{console.log(e)}))}(n,e.target.value),children:[Object(v.jsx)("option",{children:"Assign"}),a.map(((e,t)=>Object(v.jsx)("option",{value:e.id,children:e.name},t)))]})})})}):Object(v.jsx)(l.a,{size:"Small",color:"secondryColor",className:"text-center",text:t?t.capitalizeWord():"-"})}},{name:"Status",selector:e=>e.status,center:!0,maxWidth:"200px",cell:e=>{let{status:t}=e;return Object(O.p)("COMPLETED"===t?"CONVERTED":t)}},{name:"Action",center:!0,maxWidth:"60px",cell:e=>{let{leadId:t,status:a}=e;return Object(v.jsx)("div",{className:"action",children:Object(v.jsx)(O.a,{position:"left",name:"View Details",children:Object(v.jsx)("span",{children:Object(v.jsx)(u.b,{to:{pathname:"/admin/sales/lead-details",state:{leadId:t}},children:Object(v.jsx)(c.a,{name:"editIcon",src:g.a})})})})})}}],z=()=>{var e;return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)("div",{className:"d-flex justify-content-between tableBottom ml-auto",children:Object(v.jsx)(u.b,{to:"/admin/sales/new-entry",children:Object(v.jsx)(d.a,{name:"Add New Entry",varient:"success",type:"submit",size:"Small",color:"white",className:"add-new-entry-btn"})})}),Object(v.jsx)("div",{className:"table-bottom ml-auto",children:Object(v.jsx)(u.b,{to:"/admin/sales/society-leads",className:"viewAll-btn",children:null!==w&&void 0!==w&&null!==(e=w.data)&&void 0!==e&&e.length?Object(v.jsx)(l.a,{size:"Small",fontWeight:"mediumbold",color:"primaryColor",text:"View All",className:"ml-2 d-flex"}):null})})]})},D=()=>Object(v.jsx)("div",{className:"d-flex justify-content-center tableBottom",children:Object(v.jsx)(u.b,{to:{pathname:"/admin/user-management",state:{moduleName:"Sales"}},children:Object(v.jsx)(d.a,{name:"Manage Team",varient:"primary",type:"submit",size:"Small",color:"white"})})});Object(n.useEffect)((()=>{p(),i(),C({city:T,endDate:"",id:"",societyName:"",startDate:"",status:[],records:4,pageNumber:1}),N({city:W,records:"",pageNumber:""})}),[i,C,N,k]),Object(n.useEffect)((()=>{C({city:"",endDate:"",id:"",societyName:"",startDate:"",status:[],records:4,pageNumber:1})}),[T]),Object(n.useEffect)((()=>{N({city:W,records:"",pageNumber:""})}),[W]);return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)(j.Route,{path:"/admin/sales/user-details",excat:!0,name:"User Details",render:e=>Object(v.jsx)(m.a,{...e})}),Object(v.jsx)(j.Route,{path:"/admin/sales/user-details",name:"User Details",component:m.a}),Object(v.jsxs)("div",{className:"cardBox cardTractions",children:[Object(v.jsx)(o.a,{className:"cardWidth",children:Object(v.jsxs)(o.a.Body,{children:[Object(v.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[Object(v.jsx)(l.a,{size:"medium",fontWeight:"mediumbold",color:"primaryColor",text:P.data.totalLeadsCountFromApp}),Object(v.jsx)(l.a,{size:"Small",fontWeight:"smbold",color:P.data.currentWeekLeadsCountFromApp.toString().includes("-")?"dangerColor":"successColor",text:P.data.currentWeekLeadsCountFromApp.toString().includes("-")?P.data.currentWeekLeadsCountFromApp:"+"+P.data.currentWeekLeadsCountFromApp})]}),Object(v.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[Object(v.jsx)(l.a,{size:"xSmall",fontWeight:"smbold",color:"TaupeGrey",text:"Leads From App"}),Object(v.jsx)(l.a,{size:"xSmall",fontWeight:"smbold",color:"secondryColor",text:"Change This Week"})]})]})}),Object(v.jsx)(o.a,{className:"cardWidth",children:Object(v.jsxs)(o.a.Body,{children:[Object(v.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[Object(v.jsx)(l.a,{size:"medium",fontWeight:"mediumbold",color:"primaryColor",text:P.data.totalLeadsCountFromManualEntry}),Object(v.jsx)(l.a,{size:"Small",fontWeight:"smbold",color:P.data.currentWeekleadsCountFromManualEntry.toString().includes("-")?"dangerColor":"successColor",text:P.data.currentWeekleadsCountFromManualEntry.toString().includes("-")?P.data.currentWeekleadsCountFromManualEntry:"+"+P.data.currentWeekleadsCountFromManualEntry})]}),Object(v.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[Object(v.jsx)(l.a,{size:"xSmall",fontWeight:"smbold",color:"TaupeGrey",text:"Leads From Manual Entry"}),Object(v.jsx)(l.a,{size:"xSmall",fontWeight:"smbold",color:"secondryColor",text:"Change This Week"})]})]})}),Object(v.jsx)(o.a,{className:"cardWidth",children:Object(v.jsxs)(o.a.Body,{children:[Object(v.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[Object(v.jsx)(l.a,{size:"medium",fontWeight:"mediumbold",color:"primaryColor",text:P.data.totalLeadsCountConverted}),Object(v.jsx)(l.a,{size:"Small",fontWeight:"smbold",color:P.data.currentWeekleadsCountConverted.toString().includes("-")?"dangerColor":"successColor",text:P.data.currentWeekleadsCountConverted.toString().includes("-")?P.data.currentWeekleadsCountConverted:"+"+P.data.currentWeekleadsCountConverted})]}),Object(v.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[Object(v.jsx)(l.a,{size:"xSmall",fontWeight:"smbold",color:"TaupeGrey",text:"Leads Converted"}),Object(v.jsx)(l.a,{size:"xSmall",fontWeight:"smbold",color:"secondryColor",text:"Change This Week"})]})]})})]}),Object(v.jsx)("div",{className:"salesSocietyLeadsTableWrapper",children:Object(v.jsx)(h.a,{title:"Society Leads",data:w.data.length?w.data.slice(0,4):[],columns:R,isPaginationButton:!0,progressPending:w.isLoading,PaginationButton:Object(v.jsx)(z,{}),filter:!0,filterCity:I.data.cities,handleFilterChange:e=>{C({endDate:"",id:"",societyName:"",startDate:"",status:[],city:e,records:4,pageNumber:1})},pagination:!1})}),Object(v.jsxs)("div",{className:"salesSocietySalessteamTableWrapper",children:[Object(v.jsx)("div",{className:"tableBox",children:Object(v.jsxs)("div",{className:"d-flex justify-content-between align-items-center tableHeading",children:[Object(v.jsx)("div",{children:Object(v.jsx)(l.a,{size:"regular",fontWeight:"mediumbold",color:"secondryColor",text:"Society Sales Team"})}),Object(v.jsx)("div",{className:"locationSelect",children:Object(v.jsx)(r.a.Group,{controlId:"exampleForm.SelectCustom",children:Object(v.jsxs)(r.a.Control,{as:"select",onChange:e=>L(e.target.value),value:W,children:[Object(v.jsx)("option",{value:"",children:"Select City"}),(null===I||void 0===I||null===(t=I.data)||void 0===t||null===(a=t.cities)||void 0===a?void 0:a.length)>0?null===I||void 0===I||null===(s=I.data)||void 0===s?void 0:s.cities.map(((e,t)=>Object(v.jsx)("option",{value:e,children:e},t))):null]})})})]})}),Object(v.jsx)("div",{className:"societysalesteamTableWrapper",children:Object(v.jsx)(x.a,{onChangePage:function(e){},data:S.data,columns:E,progressPending:S.isLoading,paginationComponent:e=>Object(v.jsx)(f.a,{...e,PaginationActionButton:D}),paginationRowsPerPageOptions:[4,8,12,16,20,24,28,32,36,40],paginationPerPage:4,progressComponent:y})}),S.data.length?null:Object(v.jsx)("div",{className:"d-flex justify-content-center",children:Object(v.jsx)(D,{})})]})]})}))},154:function(e,t,a){"use strict";a(162);var n=a(113),s=a(0),i=a(121),l=a(20),o=a(4);const r=e=>{let{title:t,textComponent:a,filterComponent:s,filter:r,filterCity:c,data:d,columns:m,isLoading:b,PaginationComponent:u,perPageOptions:j,paginationPerPage:p,ProgressComponent:x,pagination:f,isPaginationButton:g,PaginationButton:O,handleFilterChange:h,className:v,...y}=e;return Object(o.jsxs)("div",{className:"finance-table"===v?"finance-tableBox tableBox bg-white":"tableBox bg-white",children:[t?Object(o.jsxs)("div",{className:"d-flex justify-content-between align-items-center tableHeading",children:[Object(o.jsx)("div",{children:Object(o.jsx)(l.a,{size:"regular",fontWeight:"mediumbold",color:"secondryColor",text:t})}),Object(o.jsxs)("div",{className:"locationSelect",children:[a||null,s||null,r?Object(o.jsx)(n.a.Group,{controlId:"exampleForm.SelectCustom",children:Object(o.jsxs)(n.a.Control,{as:"select",onChange:e=>h(e.target.value),children:[Object(o.jsx)("option",{value:"",children:"Select City"}),c&&null!==c&&void 0!==c&&c.length?c.map(((e,t)=>Object(o.jsx)("option",{value:e,children:e},t))):null]})}):null]})]}):null,Object(o.jsx)(i.a,{data:d,columns:m,progressPending:b,paginationComponent:u,paginationRowsPerPageOptions:j,paginationPerPage:p,progressComponent:x,pagination:f,...y}),g?Object(o.jsx)("div",{className:"d-flex justify-content-center",children:O||""}):null!==d&&void 0!==d&&d.length?null:O?Object(o.jsx)("div",{className:"d-flex justify-content-center",children:O}):null]})};t.a=Object(s.memo)(r)},162:function(e,t,a){},189:function(e,t,a){"use strict";var n=a(5),s=a(6),i=a(25),l=a.n(i),o=a(0),r=a.n(o),c=a(28),d=a(128),m=a(205),b=a(203),u=["bsPrefix","className","variant","as"],j=r.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.className,o=e.variant,d=e.as,m=void 0===d?"img":d,b=Object(s.a)(e,u),j=Object(c.a)(a,"card-img");return r.a.createElement(m,Object(n.a)({ref:t,className:l()(o?j+"-"+o:j,i)},b))}));j.displayName="CardImg",j.defaultProps={variant:null};var p=j,x=["bsPrefix","className","bg","text","border","body","children","as"],f=Object(m.a)("h5"),g=Object(m.a)("h6"),O=Object(d.a)("card-body"),h=Object(d.a)("card-title",{Component:f}),v=Object(d.a)("card-subtitle",{Component:g}),y=Object(d.a)("card-link",{Component:"a"}),C=Object(d.a)("card-text",{Component:"p"}),N=Object(d.a)("card-header"),P=Object(d.a)("card-footer"),w=Object(d.a)("card-img-overlay"),S=r.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.className,d=e.bg,m=e.text,u=e.border,j=e.body,p=e.children,f=e.as,g=void 0===f?"div":f,h=Object(s.a)(e,x),v=Object(c.a)(a,"card"),y=Object(o.useMemo)((function(){return{cardHeaderBsPrefix:v+"-header"}}),[v]);return r.a.createElement(b.a.Provider,{value:y},r.a.createElement(g,Object(n.a)({ref:t},h,{className:l()(i,v,d&&"bg-"+d,m&&"text-"+m,u&&"border-"+u)}),j?r.a.createElement(O,null,p):p))}));S.displayName="Card",S.defaultProps={body:!1},S.Img=p,S.Title=h,S.Subtitle=v,S.Body=O,S.Link=y,S.Text=C,S.Header=N,S.Footer=P,S.ImgOverlay=w;t.a=S}}]);