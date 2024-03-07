(this.webpackJsonpsmartdoor=this.webpackJsonpsmartdoor||[]).push([[44],{113:function(e,t,a){"use strict";var n=a(5),s=a(6),r=a(25),i=a.n(r),l=a(0),o=a.n(l),c=(a(112),a(7)),d=a.n(c),u=["as","className","type","tooltip"],b={type:d.a.string,tooltip:d.a.bool,as:d.a.elementType},m=o.a.forwardRef((function(e,t){var a=e.as,r=void 0===a?"div":a,l=e.className,c=e.type,d=void 0===c?"valid":c,b=e.tooltip,m=void 0!==b&&b,p=Object(s.a)(e,u);return o.a.createElement(r,Object(n.a)({},p,{ref:t,className:i()(l,d+"-"+(m?"tooltip":"feedback"))}))}));m.displayName="Feedback",m.propTypes=b;var p=m,f=o.a.createContext({controlId:void 0}),j=a(28),O=["id","bsPrefix","bsCustomPrefix","className","type","isValid","isInvalid","isStatic","as"],x=o.a.forwardRef((function(e,t){var a=e.id,r=e.bsPrefix,c=e.bsCustomPrefix,d=e.className,u=e.type,b=void 0===u?"checkbox":u,m=e.isValid,p=void 0!==m&&m,x=e.isInvalid,v=void 0!==x&&x,h=e.isStatic,g=e.as,P=void 0===g?"input":g,N=Object(s.a)(e,O),C=Object(l.useContext)(f),E=C.controlId,y=C.custom?[c,"custom-control-input"]:[r,"form-check-input"],I=y[0],S=y[1];return r=Object(j.a)(I,S),o.a.createElement(P,Object(n.a)({},N,{ref:t,type:b,id:a||E,className:i()(d,r,p&&"is-valid",v&&"is-invalid",h&&"position-static")}))}));x.displayName="FormCheckInput";var v=x,h=["bsPrefix","bsCustomPrefix","className","htmlFor"],g=o.a.forwardRef((function(e,t){var a=e.bsPrefix,r=e.bsCustomPrefix,c=e.className,d=e.htmlFor,u=Object(s.a)(e,h),b=Object(l.useContext)(f),m=b.controlId,p=b.custom?[r,"custom-control-label"]:[a,"form-check-label"],O=p[0],x=p[1];return a=Object(j.a)(O,x),o.a.createElement("label",Object(n.a)({},u,{ref:t,htmlFor:d||m,className:i()(c,a)}))}));g.displayName="FormCheckLabel";var P=g,N=["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","title","type","label","children","custom","as"],C=o.a.forwardRef((function(e,t){var a=e.id,r=e.bsPrefix,c=e.bsCustomPrefix,d=e.inline,u=void 0!==d&&d,b=e.disabled,m=void 0!==b&&b,O=e.isValid,x=void 0!==O&&O,h=e.isInvalid,g=void 0!==h&&h,C=e.feedbackTooltip,E=void 0!==C&&C,y=e.feedback,I=e.className,S=e.style,R=e.title,w=void 0===R?"":R,T=e.type,D=void 0===T?"checkbox":T,k=e.label,A=e.children,L=e.custom,F=e.as,G=void 0===F?"input":F,M=Object(s.a)(e,N),V="switch"===D||L,z=V?[c,"custom-control"]:[r,"form-check"],W=z[0],U=z[1];r=Object(j.a)(W,U);var B=Object(l.useContext)(f).controlId,q=Object(l.useMemo)((function(){return{controlId:a||B,custom:V}}),[B,V,a]),J=V||null!=k&&!1!==k&&!A,H=o.a.createElement(v,Object(n.a)({},M,{type:"switch"===D?"checkbox":D,ref:t,isValid:x,isInvalid:g,isStatic:!J,disabled:m,as:G}));return o.a.createElement(f.Provider,{value:q},o.a.createElement("div",{style:S,className:i()(I,r,V&&"custom-"+D,u&&r+"-inline")},A||o.a.createElement(o.a.Fragment,null,H,J&&o.a.createElement(P,{title:w},k),(x||g)&&o.a.createElement(p,{type:x?"valid":"invalid",tooltip:E},y))))}));C.displayName="FormCheck",C.Input=v,C.Label=P;var E=C,y=["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","lang","as"],I=o.a.forwardRef((function(e,t){var a=e.id,r=e.bsPrefix,c=e.bsCustomPrefix,d=e.className,u=e.isValid,b=e.isInvalid,m=e.lang,p=e.as,O=void 0===p?"input":p,x=Object(s.a)(e,y),v=Object(l.useContext)(f),h=v.controlId,g=v.custom?[c,"custom-file-input"]:[r,"form-control-file"],P=g[0],N=g[1];return r=Object(j.a)(P,N),o.a.createElement(O,Object(n.a)({},x,{ref:t,id:a||h,type:"file",lang:m,className:i()(d,r,u&&"is-valid",b&&"is-invalid")}))}));I.displayName="FormFileInput";var S=I,R=["bsPrefix","bsCustomPrefix","className","htmlFor"],w=o.a.forwardRef((function(e,t){var a=e.bsPrefix,r=e.bsCustomPrefix,c=e.className,d=e.htmlFor,u=Object(s.a)(e,R),b=Object(l.useContext)(f),m=b.controlId,p=b.custom?[r,"custom-file-label"]:[a,"form-file-label"],O=p[0],x=p[1];return a=Object(j.a)(O,x),o.a.createElement("label",Object(n.a)({},u,{ref:t,htmlFor:d||m,className:i()(c,a),"data-browse":u["data-browse"]}))}));w.displayName="FormFileLabel";var T=w,D=["id","bsPrefix","bsCustomPrefix","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","label","children","custom","lang","data-browse","as","inputAs"],k=o.a.forwardRef((function(e,t){var a=e.id,r=e.bsPrefix,c=e.bsCustomPrefix,d=e.disabled,u=void 0!==d&&d,b=e.isValid,m=void 0!==b&&b,O=e.isInvalid,x=void 0!==O&&O,v=e.feedbackTooltip,h=void 0!==v&&v,g=e.feedback,P=e.className,N=e.style,C=e.label,E=e.children,y=e.custom,I=e.lang,R=e["data-browse"],w=e.as,k=void 0===w?"div":w,A=e.inputAs,L=void 0===A?"input":A,F=Object(s.a)(e,D),G=y?[c,"custom"]:[r,"form-file"],M=G[0],V=G[1];r=Object(j.a)(M,V);var z=Object(l.useContext)(f).controlId,W=Object(l.useMemo)((function(){return{controlId:a||z,custom:y}}),[z,y,a]),U=null!=C&&!1!==C&&!E,B=o.a.createElement(S,Object(n.a)({},F,{ref:t,isValid:m,isInvalid:x,disabled:u,as:L,lang:I}));return o.a.createElement(f.Provider,{value:W},o.a.createElement(k,{style:N,className:i()(P,r,y&&"custom-file")},E||o.a.createElement(o.a.Fragment,null,y?o.a.createElement(o.a.Fragment,null,B,U&&o.a.createElement(T,{"data-browse":R},C)):o.a.createElement(o.a.Fragment,null,U&&o.a.createElement(T,null,C),B),(m||x)&&o.a.createElement(p,{type:m?"valid":"invalid",tooltip:h},g))))}));k.displayName="FormFile",k.Input=S,k.Label=T;var A=k,L=(a(45),["bsPrefix","bsCustomPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","custom","as"]),F=o.a.forwardRef((function(e,t){var a,r,c=e.bsPrefix,d=e.bsCustomPrefix,u=e.type,b=e.size,m=e.htmlSize,p=e.id,O=e.className,x=e.isValid,v=void 0!==x&&x,h=e.isInvalid,g=void 0!==h&&h,P=e.plaintext,N=e.readOnly,C=e.custom,E=e.as,y=void 0===E?"input":E,I=Object(s.a)(e,L),S=Object(l.useContext)(f).controlId,R=C?[d,"custom"]:[c,"form-control"],w=R[0],T=R[1];if(c=Object(j.a)(w,T),P)(r={})[c+"-plaintext"]=!0,a=r;else if("file"===u){var D;(D={})[c+"-file"]=!0,a=D}else if("range"===u){var k;(k={})[c+"-range"]=!0,a=k}else if("select"===y&&C){var A;(A={})[c+"-select"]=!0,A[c+"-select-"+b]=b,a=A}else{var F;(F={})[c]=!0,F[c+"-"+b]=b,a=F}return o.a.createElement(y,Object(n.a)({},I,{type:u,size:m,ref:t,readOnly:N,id:p||S,className:i()(O,a,v&&"is-valid",g&&"is-invalid")}))}));F.displayName="FormControl";var G=Object.assign(F,{Feedback:p}),M=["bsPrefix","className","children","controlId","as"],V=o.a.forwardRef((function(e,t){var a=e.bsPrefix,r=e.className,c=e.children,d=e.controlId,u=e.as,b=void 0===u?"div":u,m=Object(s.a)(e,M);a=Object(j.a)(a,"form-group");var p=Object(l.useMemo)((function(){return{controlId:d}}),[d]);return o.a.createElement(f.Provider,{value:p},o.a.createElement(b,Object(n.a)({},m,{ref:t,className:i()(r,a)}),c))}));V.displayName="FormGroup";var z=V,W=a(141),U=["as","bsPrefix","column","srOnly","className","htmlFor"],B=o.a.forwardRef((function(e,t){var a=e.as,r=void 0===a?"label":a,c=e.bsPrefix,d=e.column,u=e.srOnly,b=e.className,m=e.htmlFor,p=Object(s.a)(e,U),O=Object(l.useContext)(f).controlId;c=Object(j.a)(c,"form-label");var x="col-form-label";"string"===typeof d&&(x=x+" "+x+"-"+d);var v=i()(b,c,u&&"sr-only",d&&x);return m=m||O,d?o.a.createElement(W.a,Object(n.a)({ref:t,as:"label",className:v,htmlFor:m},p)):o.a.createElement(r,Object(n.a)({ref:t,className:v,htmlFor:m},p))}));B.displayName="FormLabel",B.defaultProps={column:!1,srOnly:!1};var q=B,J=["bsPrefix","className","as","muted"],H=o.a.forwardRef((function(e,t){var a=e.bsPrefix,r=e.className,l=e.as,c=void 0===l?"small":l,d=e.muted,u=Object(s.a)(e,J);return a=Object(j.a)(a,"form-text"),o.a.createElement(c,Object(n.a)({},u,{ref:t,className:i()(r,a,d&&"text-muted")}))}));H.displayName="FormText";var _=H,K=o.a.forwardRef((function(e,t){return o.a.createElement(E,Object(n.a)({},e,{ref:t,type:"switch"}))}));K.displayName="Switch",K.Input=E.Input,K.Label=E.Label;var Y=K,Q=a(128),X=["bsPrefix","inline","className","validated","as"],Z=Object(Q.a)("form-row"),$=o.a.forwardRef((function(e,t){var a=e.bsPrefix,r=e.inline,l=e.className,c=e.validated,d=e.as,u=void 0===d?"form":d,b=Object(s.a)(e,X);return a=Object(j.a)(a,"form"),o.a.createElement(u,Object(n.a)({},b,{ref:t,className:i()(l,c&&"was-validated",r&&a+"-inline")}))}));$.displayName="Form",$.defaultProps={inline:!1},$.Row=Z,$.Group=z,$.Control=G,$.Check=E,$.File=A,$.Switch=Y,$.Label=q,$.Text=_;t.a=$},121:function(e,t,a){"use strict";var n=a(148),s=a.n(n),r=(a(126),a(0)),i=a(123),l=a(55),o=a(4);const c=Object(o.jsx)("img",{src:i.a,className:"ml-1",width:"10px",alt:"SHORT_ICON"}),d=Object(o.jsx)(l.b,{}),u=e=>{let{title:t,columns:a,data:n,pagination:r,progressPending:i,onChangePage:l,paginationComponent:u,paginationRowsPerPageOptions:m,paginationPerPage:p,sortIcon:f,progressComponent:j,striped:O,...x}=e;return Object(o.jsx)(s.a,{title:t,columns:a,data:n,pagination:!1!==r,highlightOnHover:!0,progressPending:i,onChangePage:l,striped:!1!==O,paginationComponent:u,paginationRowsPerPageOptions:m,paginationPerPage:p,customStyles:b,sortIcon:f||c,progressComponent:j||d,...x})},b={rows:{style:{borderBottomWidth:"0 !important","&:nth-child(even)":{backgroundColor:"#fff"},"&:nth-child(odd)":{backgroundColor:"#f8f3f5"}}},headCells:{style:{fontWeight:"700 !important",fontSize:".875rem",color:"#252525",justifyContent:"center","&:first-child":{minWidth:"70px",maxWidth:"100px"}}},cells:{style:{fontSize:".875rem",color:"#252525","&:first-child":{minWidth:"100px",maxWidth:"120px"}}}};t.a=Object(r.memo)(u)},123:function(e,t,a){"use strict";t.a=a.p+"static/media/sort-icon.a64bca1a.svg"},126:function(e,t,a){},130:function(e,t,a){},132:function(e,t,a){"use strict";var n,s,r,i,l,o,c,d,u,b,m,p=a(133),f=a(0),j=a(161),O=a(4);const x=function(){return Object(j.css)(n||(n=Object(p.a)(["\n    @media screen and (max-width: ","px) {\n      ","\n    }\n  "])),599,Object(j.css)(...arguments))},v=j.default.select(s||(s=Object(p.a)(["\n  cursor: pointer;\n  height: 24px;\n  min-width: 24px;\n  user-select: none;\n  padding-left: 8px;\n  padding-right: 12px;\n  box-sizing: content-box;\n  font-size: inherit;\n  color: inherit;\n  border: none;\n  background-color: transparent;\n  appearance: none;\n  direction: ltr;\n  &::-ms-expand {\n    display: none;\n  }\n  &:disabled::-ms-expand {\n    background: #f60;\n  }\n  option {\n    color: initial;\n  }\n"]))),h=j.default.div(r||(r=Object(p.a)(["\n  position: relative;\n  flex-shrink: 0;\n  font-size: inherit;\n  color: inherit;\n  margin-top: 1px;\n  svg {\n    top: 0;\n    right: 0;\n    color: inherit;\n    position: absolute;\n    fill: currentColor;\n    width: 24px;\n    height: 24px;\n    display: inline-block;\n    user-select: none;\n    pointer-events: none;\n  }\n"]))),g={rowsPerPageText:"Rows per page:",rangeSeparatorText:"of",noRowsPerPage:!1,selectAllRowsItem:!1,selectAllRowsItemText:"All"},P=j.default.nav(i||(i=Object(p.a)(["\n  display: flex;\n  flex: 1 1 auto;\n  // justify-content: flex-end;\n  align-items: center;\n  box-sizing: border-box;\n  padding-right: 8px;\n  padding-left: 8px;\n  width: 100%;\n  ",";\n"])),(e=>e.theme.pagination.style)),N=j.default.button(l||(l=Object(p.a)(["\n  position: relative;\n  display: block;\n  user-select: none;\n  border: none;\n  ",";\n  ",";\n"])),(e=>e.theme.pagination.pageButtonsStyle),(e=>e.isRTL&&"transform: scale(-1, -1)")),C=j.default.div(o||(o=Object(p.a)(["\n  display: flex;\n  align-items: center;\n  border-radius: 4px;\n  white-space: nowrap;\n  ",";\n"])),x(c||(c=Object(p.a)(["\n    width: 100%;\n    justify-content: space-around;\n  "])))),E=j.default.span(d||(d=Object(p.a)(["\n  flex-shrink: 1;\n  user-select: none;\n"]))),y=Object(j.default)(E)(u||(u=Object(p.a)(["\n  margin: 0 24px;\n"]))),I=Object(j.default)(E)(b||(b=Object(p.a)(["\n  margin: 0 4px;\n"]))),S=j.default.div(m||(m=Object(p.a)(["\n  margin: ",";\n  display: ",";\n\n  "])),(e=>e.margin),(e=>e.display)),R=(e,t)=>Math.ceil(e/t),w=e=>Object(O.jsx)(h,{children:Object(O.jsx)(v,{...e})});t.a=e=>{let{rowsPerPage:t,rowCount:a,onChangePage:n,onChangeRowsPerPage:s,currentPage:r,direction:i,paginationRowsPerPageOptions:l,paginationIconLastPage:o,paginationIconFirstPage:c,paginationIconNext:d,paginationIconPrevious:u,paginationComponentOptions:b,PaginationActionButton:m}=e;const p=!1,j=R(a,t),x=r*t,v=x-t+1,h=1===r,E=r===j,T={...g,...b},D=r===j?"".concat(v,"-").concat(a," ").concat(T.rangeSeparatorText," ").concat(a):"".concat(v,"-").concat(x," ").concat(T.rangeSeparatorText," ").concat(a),k=Object(f.useCallback)((()=>n(r-1)),[r,n]),A=Object(f.useCallback)((()=>n(r+1)),[r,n]),L=Object(f.useCallback)((()=>n(1)),[n]),F=Object(f.useCallback)((()=>n(R(a,t))),[n,a,t]),G=Object(f.useCallback)((e=>{let{target:t}=e;return s(Number(t.value),r)}),[r,s]),M=l.map((e=>Object(O.jsx)("option",{value:e,children:e},e)));T.selectAllRowsItem&&M.push(Object(O.jsx)("option",{value:a,children:T.selectAllRowsItemText},-1));const V=Object(O.jsx)(w,{onChange:G,defaultValue:t,"aria-label":T.rowsPerPageText,children:M});return Object(O.jsxs)(P,{className:"rdt_Pagination",children:[Object(O.jsx)(S,{margin:"0 auto",children:" "}),Object(O.jsx)(S,{margin:"0 auto",children:m?Object(O.jsx)(m,{}):null}),Object(O.jsxs)(S,{style:{display:"contents"},children:[!T.noRowsPerPage&&Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(I,{children:T.rowsPerPageText}),V]}),Object(O.jsx)(y,{children:D}),Object(O.jsxs)(C,{children:[Object(O.jsx)(N,{id:"pagination-first-page",type:"button","aria-label":"First Page","aria-disabled":h,onClick:L,disabled:h,isRTL:p,children:c}),Object(O.jsx)(N,{id:"pagination-previous-page",type:"button","aria-label":"Previous Page","aria-disabled":h,onClick:k,disabled:h,isRTL:p,children:u}),!1,Object(O.jsx)(N,{id:"pagination-next-page",type:"button","aria-label":"Next Page","aria-disabled":E,onClick:A,disabled:E,isRTL:p,children:d}),Object(O.jsx)(N,{id:"pagination-last-page",type:"button","aria-label":"Last Page","aria-disabled":E,onClick:F,disabled:E,isRTL:p,children:o})]})]})]})}},133:function(e,t,a){"use strict";function n(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}a.d(t,"a",(function(){return n}))},137:function(e,t,a){"use strict";t.a=a.p+"static/media/content-ico.1134bf42.svg"},146:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));a(130);var n=a(0),s=a(113),r=a(20),i=a(4);const l=Object(n.forwardRef)(((e,t)=>{let{id:a,label:n,children:l,error:o,placeholder:c,leadingIcon:d,type:u,component:b,...m}=e,p=a||n&&n.replace(/\s/g,"")||"formInput"+Math.random();return Object(i.jsx)("div",{className:"sdInputFields",children:Object(i.jsxs)(s.a.Group,{controlId:p,children:[Object(i.jsxs)(s.a.Label,{children:[" ",n," "]}),Object(i.jsx)(s.a.Control,{placeholder:b?"":c||n,ref:t,type:u,...m,children:l}),b&&Object(i.jsxs)("span",{className:"component position-absolute",children:[" ",b," "]}),d&&Object(i.jsxs)("span",{className:"leadingIcon position-absolute",children:[" ",d.replace('"',"")," "]}),o&&Object(i.jsx)(r.a,{color:"dangerText",size:"xSmall",text:o})]})})}));t.b=Object(n.memo)(l);const o=e=>{let{id:t,label:a,...n}=e,r=t||a&&a.replace(/\s/g,"")||"formInput"+Math.random();return Object(i.jsx)("div",{className:"sdInputFields",children:Object(i.jsx)("div",{className:"checkBox customChechbox",children:Object(i.jsx)(s.a.Group,{controlId:r,children:Object(i.jsx)(s.a.Check,{type:"checkbox",label:a,...n,className:"p-0"})})})})}},151:function(e,t,a){"use strict";var n=a(146),s=(a(153),a(29)),r=a.p+"static/media/Search.5d68d6da.svg",i=a(4);t.a=e=>{let{filterText:t,onFilter:a,onClear:l,placeholder:o,className:c}=e;return Object(i.jsxs)("div",{className:"searchCrossButon",children:[Object(i.jsx)(n.b,{id:"search",type:"text",placeholder:o,"aria-label":"Search Input",value:t,onChange:a,className:c}),Object(i.jsx)("div",{className:"inputSearchIcon",children:Object(i.jsx)(s.a,{src:r,name:"Search Icon",className:"img-fluid"})})]})}},153:function(e,t,a){},1536:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(29),i=a(20),l=a(14),o=a(137),c=a(117),d=a(37),u=a(34),b=a(151),m=a(113),p=a(121),f=a(132),j=a(169),O=a(4);const x={getAllConsumerUsers:c.I};t.default=Object(d.b)((e=>{let{getAllConsumerUsersData:t}=e;return{getAllConsumerUsersData:t}}),x)((e=>{const{getAllConsumerUsers:t,getAllConsumerUsersData:a}=e,[c,d]=s.a.useState("");console.log(c,"texteq");const[x,v]=s.a.useState(!1),h=j.a.ConsumerStatusArr,[g,P]=Object(n.useState)(""),[N,C]=Object(n.useState)(""),E=[{name:"Id",selector:e=>e.id,sortable:!0,center:!0},{name:"Name",selector:e=>e.name,sortable:!1,center:!0,minWidth:"140px",cell:e=>{let{imageUrl:t,name:a}=e;return Object(O.jsx)(u.a,{position:"top",style:{width:"100%"},name:a||"",children:Object(O.jsx)(i.a,{size:"Small",color:"secondryColor elipsis-text",text:a?a.capitalizeWord():"-"})})}},{name:"Phone No",selector:e=>e.contactNumber,sortable:!1,center:!0,minWidth:"120px",cell:e=>{let{contactNumber:t}=e;return Object(O.jsx)("span",{children:"".concat(t)||"-"})}},{name:"Registered On",selector:e=>e.joiningDate,sortable:!0,center:!0,minWidth:"150px",cell:e=>{let{joiningDate:t}=e;return Object(O.jsx)("span",{children:"".concat(Object(u.f)(t))||"-"})}},{name:"Properties",selector:e=>e.propertyCount,sortable:!1,center:!0,cell:e=>{let{propertyCount:t}=e;return Object(O.jsx)("span",{children:"".concat(t)||"-"})}},{name:"Property Visited",selector:e=>e.visitCount,sortable:!0,center:!0,minWidth:"160px",cell:e=>{let{visitCount:t}=e;return Object(O.jsx)("span",{children:"".concat(t)||"-"})}},{name:"User Type",selector:e=>e.userType,center:!0,cell:e=>{let{userType:t}=e;return Object(O.jsx)("span",{children:"".concat(t)||"-"})}},{name:"KYC Status",selector:e=>e.kycverified,sortable:!1,center:!0,minWidth:"130px",cell:e=>{let{kycverified:t}=e;return(e=>{const t=e?"COMPLETED":"PENDING";return Object(u.p)(t)})(t)}},{name:"Action",selector:e=>e.action,sortable:!1,center:!0,cell:e=>Object(O.jsx)("div",{className:"action",children:Object(O.jsx)(u.a,{position:"left",name:"View Details",children:Object(O.jsx)("span",{children:Object(O.jsx)(l.b,{to:{pathname:"/admin/consumer-management/consumer-details/".concat(e.id)},children:Object(O.jsx)(r.a,{name:"contentIco",src:o.a})})})})})}];Object(n.useEffect)((()=>{t({city:"",records:"",pageNumber:""})}),[t]);const y=s.a.useMemo((()=>Object(O.jsx)(b.a,{onFilter:e=>d(e.target.value),onClear:()=>{c&&(v(!x),d(""))},filterText:c,placeholder:"Search here"})),[c,x]),I=e=>{let t=e||g,n=[];return n=a.data.length?a.data.filter((e=>{var t,a,n;return(null===e||void 0===e?void 0:e.id)==c||(null===e||void 0===e||null===(t=e.contactNumber)||void 0===t?void 0:t.includes(c))||(null===e||void 0===e||null===(a=e.name)||void 0===a?void 0:a.toLowerCase().includes(c.toLowerCase()))||(null===e||void 0===e?void 0:e.propertyCount)==c||(null===e||void 0===e||null===(n=e.userType)||void 0===n?void 0:n.toLowerCase().includes(c.toLowerCase()))})):[],t&&n.length&&(n=n.filter((e=>(null===e||void 0===e?void 0:e.kycStatus.toUpperCase())==t.toUpperCase()))),n};return Object(O.jsxs)("div",{className:"tableBox bg-white",children:[Object(O.jsxs)("div",{className:"d-flex justify-content-between align-items-center tableHeading",children:[Object(O.jsx)("div",{children:Object(O.jsx)(i.a,{size:"regular",fontWeight:"mediumbold",color:"secondryColor",text:"Consumers"})}),Object(O.jsxs)("div",{className:"locationSelect d-flex",children:[y,h.length?Object(O.jsx)(m.a.Group,{controlId:"exampleForm.SelectCustom",children:Object(O.jsxs)(m.a.Control,{as:"select",value:g,onChange:e=>{var t;t=e.target.value,P(t),I(t)},children:[Object(O.jsx)("option",{value:"",children:"Select Status"}),h.length?h.map(((e,t)=>Object(O.jsx)("option",{value:e,children:e},t))):null]})}):""]})]}),Object(O.jsx)("div",{className:"consumersTableWrapper",children:Object(O.jsx)(p.a,{data:I(),columns:E,progressPending:a.isLoading,paginationRowsPerPageOptions:[8,16,24,32,40,48,56,64,72,80],paginationPerPage:8,perPageOptions:[8,16,24,32,40,48,56,64,72,80],PaginationComponent:e=>Object(O.jsx)(f.a,{...e})})})]})}))},169:function(e,t,a){"use strict";t.a={installationRequestsStatusArr:["ASSIGNED","UNASSIGNED","ACCEPTED","NOT ACCEPTED","IN PROGRESS","PROBLEM","REJECTED","COMPLETED"],installationServiceRequestsStatusArr:["PENDING","ASSIGNED","PROBLEM","REJECTED","IN PROGRESS","COMPLETED","CLOSED"],helpdeskServiceRequestsStatusArr:["PENDING","ASSIGNED","PROBLEM","REJECTED","IN PROGRESS","COMPLETED","CLOSED"],financeConsumerTransactionsStatusArr:["FAILED","COMPLETED"],financeRefundRequestStatusArr:["IN PROGRESS","PENDING","CLOSED"],ConsumerStatusArr:["PENDING","COMPLETED"],transactionLeadsStatusArr:["UNASSIGNED","ASSIGNED","IN PROGRESS","COMPLETED","DISCARDED"],meetingRequestsStatusArr:["ASSIGNED","IN PROGRESS","COMPLETED","NOT DONE"],dealApprovalsStatusArr:["PENDING","CANCELLED","APPROVED"],societyLeadsStatusArr:["PENDING","IN PROGRESS","CONVERTED","CANCELLED","NOT INTERESTED"],propertyStatusArr:["UNDER REVIEW","PUBLISHED"],propertyType:["SMARTDOOR","NON SMARTDOOR"],realtorStatusArr:["SUBMITTED","ACCEPTED","REJECTED"],brokerStatus:["Approved","Rejected","Hold","Pending"]}}}]);