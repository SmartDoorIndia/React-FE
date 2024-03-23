(this.webpackJsonpsmartdoor=this.webpackJsonpsmartdoor||[]).push([[35],{1084:function(e,t,a){},115:function(e,t,a){"use strict";var n=a(5),r=a(6),i=a(25),s=a.n(i),o=a(0),l=a.n(o),c=(a(114),a(7)),d=a.n(c),p=["as","className","type","tooltip"],u={type:d.a.string,tooltip:d.a.bool,as:d.a.elementType},b=l.a.forwardRef((function(e,t){var a=e.as,i=void 0===a?"div":a,o=e.className,c=e.type,d=void 0===c?"valid":c,u=e.tooltip,b=void 0!==u&&u,m=Object(r.a)(e,p);return l.a.createElement(i,Object(n.a)({},m,{ref:t,className:s()(o,d+"-"+(b?"tooltip":"feedback"))}))}));b.displayName="Feedback",b.propTypes=u;var m=b,j=l.a.createContext({controlId:void 0}),f=a(28),O=["id","bsPrefix","bsCustomPrefix","className","type","isValid","isInvalid","isStatic","as"],x=l.a.forwardRef((function(e,t){var a=e.id,i=e.bsPrefix,c=e.bsCustomPrefix,d=e.className,p=e.type,u=void 0===p?"checkbox":p,b=e.isValid,m=void 0!==b&&b,x=e.isInvalid,h=void 0!==x&&x,g=e.isStatic,v=e.as,y=void 0===v?"input":v,C=Object(r.a)(e,O),P=Object(o.useContext)(j),N=P.controlId,E=P.custom?[c,"custom-control-input"]:[i,"form-check-input"],S=E[0],I=E[1];return i=Object(f.a)(S,I),l.a.createElement(y,Object(n.a)({},C,{ref:t,type:u,id:a||N,className:s()(d,i,m&&"is-valid",h&&"is-invalid",g&&"position-static")}))}));x.displayName="FormCheckInput";var h=x,g=["bsPrefix","bsCustomPrefix","className","htmlFor"],v=l.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.bsCustomPrefix,c=e.className,d=e.htmlFor,p=Object(r.a)(e,g),u=Object(o.useContext)(j),b=u.controlId,m=u.custom?[i,"custom-control-label"]:[a,"form-check-label"],O=m[0],x=m[1];return a=Object(f.a)(O,x),l.a.createElement("label",Object(n.a)({},p,{ref:t,htmlFor:d||b,className:s()(c,a)}))}));v.displayName="FormCheckLabel";var y=v,C=["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","title","type","label","children","custom","as"],P=l.a.forwardRef((function(e,t){var a=e.id,i=e.bsPrefix,c=e.bsCustomPrefix,d=e.inline,p=void 0!==d&&d,u=e.disabled,b=void 0!==u&&u,O=e.isValid,x=void 0!==O&&O,g=e.isInvalid,v=void 0!==g&&g,P=e.feedbackTooltip,N=void 0!==P&&P,E=e.feedback,S=e.className,I=e.style,R=e.title,w=void 0===R?"":R,D=e.type,T=void 0===D?"checkbox":D,A=e.label,L=e.children,k=e.custom,F=e.as,G=void 0===F?"input":F,z=Object(r.a)(e,C),M="switch"===T||k,V=M?[c,"custom-control"]:[i,"form-check"],W=V[0],B=V[1];i=Object(f.a)(W,B);var H=Object(o.useContext)(j).controlId,U=Object(o.useMemo)((function(){return{controlId:a||H,custom:M}}),[H,M,a]),J=M||null!=A&&!1!==A&&!L,q=l.a.createElement(h,Object(n.a)({},z,{type:"switch"===T?"checkbox":T,ref:t,isValid:x,isInvalid:v,isStatic:!J,disabled:b,as:G}));return l.a.createElement(j.Provider,{value:U},l.a.createElement("div",{style:I,className:s()(S,i,M&&"custom-"+T,p&&i+"-inline")},L||l.a.createElement(l.a.Fragment,null,q,J&&l.a.createElement(y,{title:w},A),(x||v)&&l.a.createElement(m,{type:x?"valid":"invalid",tooltip:N},E))))}));P.displayName="FormCheck",P.Input=h,P.Label=y;var N=P,E=["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","lang","as"],S=l.a.forwardRef((function(e,t){var a=e.id,i=e.bsPrefix,c=e.bsCustomPrefix,d=e.className,p=e.isValid,u=e.isInvalid,b=e.lang,m=e.as,O=void 0===m?"input":m,x=Object(r.a)(e,E),h=Object(o.useContext)(j),g=h.controlId,v=h.custom?[c,"custom-file-input"]:[i,"form-control-file"],y=v[0],C=v[1];return i=Object(f.a)(y,C),l.a.createElement(O,Object(n.a)({},x,{ref:t,id:a||g,type:"file",lang:b,className:s()(d,i,p&&"is-valid",u&&"is-invalid")}))}));S.displayName="FormFileInput";var I=S,R=["bsPrefix","bsCustomPrefix","className","htmlFor"],w=l.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.bsCustomPrefix,c=e.className,d=e.htmlFor,p=Object(r.a)(e,R),u=Object(o.useContext)(j),b=u.controlId,m=u.custom?[i,"custom-file-label"]:[a,"form-file-label"],O=m[0],x=m[1];return a=Object(f.a)(O,x),l.a.createElement("label",Object(n.a)({},p,{ref:t,htmlFor:d||b,className:s()(c,a),"data-browse":p["data-browse"]}))}));w.displayName="FormFileLabel";var D=w,T=["id","bsPrefix","bsCustomPrefix","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","label","children","custom","lang","data-browse","as","inputAs"],A=l.a.forwardRef((function(e,t){var a=e.id,i=e.bsPrefix,c=e.bsCustomPrefix,d=e.disabled,p=void 0!==d&&d,u=e.isValid,b=void 0!==u&&u,O=e.isInvalid,x=void 0!==O&&O,h=e.feedbackTooltip,g=void 0!==h&&h,v=e.feedback,y=e.className,C=e.style,P=e.label,N=e.children,E=e.custom,S=e.lang,R=e["data-browse"],w=e.as,A=void 0===w?"div":w,L=e.inputAs,k=void 0===L?"input":L,F=Object(r.a)(e,T),G=E?[c,"custom"]:[i,"form-file"],z=G[0],M=G[1];i=Object(f.a)(z,M);var V=Object(o.useContext)(j).controlId,W=Object(o.useMemo)((function(){return{controlId:a||V,custom:E}}),[V,E,a]),B=null!=P&&!1!==P&&!N,H=l.a.createElement(I,Object(n.a)({},F,{ref:t,isValid:b,isInvalid:x,disabled:p,as:k,lang:S}));return l.a.createElement(j.Provider,{value:W},l.a.createElement(A,{style:C,className:s()(y,i,E&&"custom-file")},N||l.a.createElement(l.a.Fragment,null,E?l.a.createElement(l.a.Fragment,null,H,B&&l.a.createElement(D,{"data-browse":R},P)):l.a.createElement(l.a.Fragment,null,B&&l.a.createElement(D,null,P),H),(b||x)&&l.a.createElement(m,{type:b?"valid":"invalid",tooltip:g},v))))}));A.displayName="FormFile",A.Input=I,A.Label=D;var L=A,k=(a(46),["bsPrefix","bsCustomPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","custom","as"]),F=l.a.forwardRef((function(e,t){var a,i,c=e.bsPrefix,d=e.bsCustomPrefix,p=e.type,u=e.size,b=e.htmlSize,m=e.id,O=e.className,x=e.isValid,h=void 0!==x&&x,g=e.isInvalid,v=void 0!==g&&g,y=e.plaintext,C=e.readOnly,P=e.custom,N=e.as,E=void 0===N?"input":N,S=Object(r.a)(e,k),I=Object(o.useContext)(j).controlId,R=P?[d,"custom"]:[c,"form-control"],w=R[0],D=R[1];if(c=Object(f.a)(w,D),y)(i={})[c+"-plaintext"]=!0,a=i;else if("file"===p){var T;(T={})[c+"-file"]=!0,a=T}else if("range"===p){var A;(A={})[c+"-range"]=!0,a=A}else if("select"===E&&P){var L;(L={})[c+"-select"]=!0,L[c+"-select-"+u]=u,a=L}else{var F;(F={})[c]=!0,F[c+"-"+u]=u,a=F}return l.a.createElement(E,Object(n.a)({},S,{type:p,size:b,ref:t,readOnly:C,id:m||I,className:s()(O,a,h&&"is-valid",v&&"is-invalid")}))}));F.displayName="FormControl";var G=Object.assign(F,{Feedback:m}),z=["bsPrefix","className","children","controlId","as"],M=l.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.className,c=e.children,d=e.controlId,p=e.as,u=void 0===p?"div":p,b=Object(r.a)(e,z);a=Object(f.a)(a,"form-group");var m=Object(o.useMemo)((function(){return{controlId:d}}),[d]);return l.a.createElement(j.Provider,{value:m},l.a.createElement(u,Object(n.a)({},b,{ref:t,className:s()(i,a)}),c))}));M.displayName="FormGroup";var V=M,W=a(143),B=["as","bsPrefix","column","srOnly","className","htmlFor"],H=l.a.forwardRef((function(e,t){var a=e.as,i=void 0===a?"label":a,c=e.bsPrefix,d=e.column,p=e.srOnly,u=e.className,b=e.htmlFor,m=Object(r.a)(e,B),O=Object(o.useContext)(j).controlId;c=Object(f.a)(c,"form-label");var x="col-form-label";"string"===typeof d&&(x=x+" "+x+"-"+d);var h=s()(u,c,p&&"sr-only",d&&x);return b=b||O,d?l.a.createElement(W.a,Object(n.a)({ref:t,as:"label",className:h,htmlFor:b},m)):l.a.createElement(i,Object(n.a)({ref:t,className:h,htmlFor:b},m))}));H.displayName="FormLabel",H.defaultProps={column:!1,srOnly:!1};var U=H,J=["bsPrefix","className","as","muted"],q=l.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.className,o=e.as,c=void 0===o?"small":o,d=e.muted,p=Object(r.a)(e,J);return a=Object(f.a)(a,"form-text"),l.a.createElement(c,Object(n.a)({},p,{ref:t,className:s()(i,a,d&&"text-muted")}))}));q.displayName="FormText";var _=q,Q=l.a.forwardRef((function(e,t){return l.a.createElement(N,Object(n.a)({},e,{ref:t,type:"switch"}))}));Q.displayName="Switch",Q.Input=N.Input,Q.Label=N.Label;var Y=Q,K=a(130),X=["bsPrefix","inline","className","validated","as"],Z=Object(K.a)("form-row"),$=l.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.inline,o=e.className,c=e.validated,d=e.as,p=void 0===d?"form":d,u=Object(r.a)(e,X);return a=Object(f.a)(a,"form"),l.a.createElement(p,Object(n.a)({},u,{ref:t,className:s()(o,c&&"was-validated",i&&a+"-inline")}))}));$.displayName="Form",$.defaultProps={inline:!1},$.Row=Z,$.Group=V,$.Control=G,$.Check=N,$.File=L,$.Switch=Y,$.Label=U,$.Text=_;t.a=$},123:function(e,t,a){"use strict";var n=a(150),r=a.n(n),i=(a(128),a(0)),s=a(125),o=a(56),l=a(4);const c=Object(l.jsx)("img",{src:s.a,className:"ml-1",width:"10px",alt:"SHORT_ICON"}),d=Object(l.jsx)(o.b,{}),p=e=>{let{title:t,columns:a,data:n,pagination:i,progressPending:s,onChangePage:o,paginationComponent:p,paginationRowsPerPageOptions:b,paginationPerPage:m,sortIcon:j,progressComponent:f,striped:O,...x}=e;return Object(l.jsx)(r.a,{title:t,columns:a,data:n,pagination:!1!==i,highlightOnHover:!0,progressPending:s,onChangePage:o,striped:!1!==O,paginationComponent:p,paginationRowsPerPageOptions:b,paginationPerPage:m,customStyles:u,sortIcon:j||c,progressComponent:f||d,...x})},u={rows:{style:{borderBottomWidth:"0 !important","&:nth-child(even)":{backgroundColor:"#fff"},"&:nth-child(odd)":{backgroundColor:"#f8f3f5"}}},headCells:{style:{fontWeight:"700 !important",fontSize:".875rem",color:"#252525",justifyContent:"center","&:first-child":{minWidth:"100px",maxWidth:"120px"}}},cells:{style:{fontSize:".875rem",color:"#252525","&:first-child":{minWidth:"100px",maxWidth:"120px"}}}};t.a=Object(i.memo)(p)},125:function(e,t,a){"use strict";t.a=a.p+"static/media/sort-icon.a64bca1a.svg"},128:function(e,t,a){},132:function(e,t,a){},134:function(e,t,a){"use strict";var n,r,i,s,o,l,c,d,p,u,b,m=a(135),j=a(0),f=a(163),O=a(4);const x=function(){return Object(f.css)(n||(n=Object(m.a)(["\n    @media screen and (max-width: ","px) {\n      ","\n    }\n  "])),599,Object(f.css)(...arguments))},h=f.default.select(r||(r=Object(m.a)(["\n  cursor: pointer;\n  height: 24px;\n  min-width: 24px;\n  user-select: none;\n  padding-left: 8px;\n  padding-right: 12px;\n  box-sizing: content-box;\n  font-size: inherit;\n  color: inherit;\n  border: none;\n  background-color: transparent;\n  appearance: none;\n  direction: ltr;\n  &::-ms-expand {\n    display: none;\n  }\n  &:disabled::-ms-expand {\n    background: #f60;\n  }\n  option {\n    color: initial;\n  }\n"]))),g=f.default.div(i||(i=Object(m.a)(["\n  position: relative;\n  flex-shrink: 0;\n  font-size: inherit;\n  color: inherit;\n  margin-top: 1px;\n  svg {\n    top: 0;\n    right: 0;\n    color: inherit;\n    position: absolute;\n    fill: currentColor;\n    width: 24px;\n    height: 24px;\n    display: inline-block;\n    user-select: none;\n    pointer-events: none;\n  }\n"]))),v={rowsPerPageText:"Rows per page:",rangeSeparatorText:"of",noRowsPerPage:!1,selectAllRowsItem:!1,selectAllRowsItemText:"All"},y=f.default.nav(s||(s=Object(m.a)(["\n  display: flex;\n  flex: 1 1 auto;\n  // justify-content: flex-end;\n  align-items: center;\n  box-sizing: border-box;\n  padding-right: 8px;\n  padding-left: 8px;\n  width: 100%;\n  ",";\n"])),(e=>e.theme.pagination.style)),C=f.default.button(o||(o=Object(m.a)(["\n  position: relative;\n  display: block;\n  user-select: none;\n  border: none;\n  ",";\n  ",";\n"])),(e=>e.theme.pagination.pageButtonsStyle),(e=>e.isRTL&&"transform: scale(-1, -1)")),P=f.default.div(l||(l=Object(m.a)(["\n  display: flex;\n  align-items: center;\n  border-radius: 4px;\n  white-space: nowrap;\n  ",";\n"])),x(c||(c=Object(m.a)(["\n    width: 100%;\n    justify-content: space-around;\n  "])))),N=f.default.span(d||(d=Object(m.a)(["\n  flex-shrink: 1;\n  user-select: none;\n"]))),E=Object(f.default)(N)(p||(p=Object(m.a)(["\n  margin: 0 24px;\n"]))),S=Object(f.default)(N)(u||(u=Object(m.a)(["\n  margin: 0 4px;\n"]))),I=f.default.div(b||(b=Object(m.a)(["\n  margin: ",";\n  display: ",";\n\n  "])),(e=>e.margin),(e=>e.display)),R=(e,t)=>Math.ceil(e/t),w=e=>Object(O.jsx)(g,{children:Object(O.jsx)(h,{...e})});t.a=e=>{let{rowsPerPage:t,rowCount:a,onChangePage:n,onChangeRowsPerPage:r,currentPage:i,direction:s,paginationRowsPerPageOptions:o,paginationIconLastPage:l,paginationIconFirstPage:c,paginationIconNext:d,paginationIconPrevious:p,paginationComponentOptions:u,PaginationActionButton:b}=e;const m=!1,f=R(a,t),x=i*t,h=x-t+1,g=1===i,N=i===f,D={...v,...u},T=i===f?"".concat(h,"-").concat(a," ").concat(D.rangeSeparatorText," ").concat(a):"".concat(h,"-").concat(x," ").concat(D.rangeSeparatorText," ").concat(a),A=Object(j.useCallback)((()=>n(i-1)),[i,n]),L=Object(j.useCallback)((()=>n(i+1)),[i,n]),k=Object(j.useCallback)((()=>n(1)),[n]),F=Object(j.useCallback)((()=>n(R(a,t))),[n,a,t]),G=Object(j.useCallback)((e=>{let{target:t}=e;return r(Number(t.value),i)}),[i,r]),z=o.map((e=>Object(O.jsx)("option",{value:e,children:e},e)));D.selectAllRowsItem&&z.push(Object(O.jsx)("option",{value:a,children:D.selectAllRowsItemText},-1));const M=Object(O.jsx)(w,{onChange:G,defaultValue:t,"aria-label":D.rowsPerPageText,children:z});return Object(O.jsxs)(y,{className:"rdt_Pagination",children:[Object(O.jsx)(I,{margin:"0 auto",children:" "}),Object(O.jsx)(I,{margin:"0 auto",children:b?Object(O.jsx)(b,{}):null}),Object(O.jsxs)(I,{style:{display:"contents"},children:[!D.noRowsPerPage&&Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(S,{children:D.rowsPerPageText}),M]}),Object(O.jsx)(E,{children:T}),Object(O.jsxs)(P,{children:[Object(O.jsx)(C,{id:"pagination-first-page",type:"button","aria-label":"First Page","aria-disabled":g,onClick:k,disabled:g,isRTL:m,children:c}),Object(O.jsx)(C,{id:"pagination-previous-page",type:"button","aria-label":"Previous Page","aria-disabled":g,onClick:A,disabled:g,isRTL:m,children:p}),!1,Object(O.jsx)(C,{id:"pagination-next-page",type:"button","aria-label":"Next Page","aria-disabled":N,onClick:L,disabled:N,isRTL:m,children:d}),Object(O.jsx)(C,{id:"pagination-last-page",type:"button","aria-label":"Last Page","aria-disabled":N,onClick:F,disabled:N,isRTL:m,children:l})]})]})]})}},135:function(e,t,a){"use strict";function n(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}a.d(t,"a",(function(){return n}))},139:function(e,t,a){"use strict";t.a=a.p+"static/media/content-ico.1134bf42.svg"},148:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));a(132);var n=a(0),r=a(115),i=a(20),s=a(4);const o=Object(n.forwardRef)(((e,t)=>{let{id:a,label:n,children:o,error:l,placeholder:c,leadingIcon:d,type:p,component:u,...b}=e,m=a||n&&n.replace(/\s/g,"")||"formInput"+Math.random();return Object(s.jsx)("div",{className:"sdInputFields",children:Object(s.jsxs)(r.a.Group,{controlId:m,children:[Object(s.jsxs)(r.a.Label,{children:[" ",n," "]}),Object(s.jsx)(r.a.Control,{placeholder:u?"":c||n,ref:t,type:p,...b,children:o}),u&&Object(s.jsxs)("span",{className:"component position-absolute",children:[" ",u," "]}),d&&Object(s.jsxs)("span",{className:"leadingIcon position-absolute",children:[" ",d.replace('"',"")," "]}),l&&Object(s.jsx)(i.a,{color:"dangerText",size:"xSmall",text:l})]})})}));t.b=Object(n.memo)(o);const l=e=>{let{id:t,label:a,...n}=e,i=t||a&&a.replace(/\s/g,"")||"formInput"+Math.random();return Object(s.jsx)("div",{className:"sdInputFields",children:Object(s.jsx)("div",{className:"checkBox customChechbox",children:Object(s.jsx)(r.a.Group,{controlId:i,children:Object(s.jsx)(r.a.Check,{type:"checkbox",label:a,...n,className:"p-0"})})})})}},1517:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(8),s=a(29),o=a(20),l=a(14),c=a(139),d=a(115),p=a(119),u=a(38),b=a(35),m=a(123),j=a(134),f=a(126),O=a(353),x=(a(1084),a(34)),h=a(219),g=(a(148),a(153)),v=a(168),y=a(4);const C={getAllProperties:p.W,getPropertyCity:p.fc,getAllCity:p.I,getLocationByCity:p.Yb},P=Object(u.b)((e=>{let{allPropertyData:t,getPropertyCityData:a,allCities:n}=e;return{allPropertyData:t,getPropertyCityData:a,allCities:n}}),C);t.default=Object(b.c)(P)((e=>{var t,a,p;const{getAllProperties:u,allPropertyData:b,getPropertyCity:C,getAllCity:P,getPropertyCityData:N,allCities:E,getLocationByCity:S}=e,I=Object(x.j)("authData"),[R,w]=Object(n.useState)(""),[D,T]=Object(n.useState)(""),[A,L]=Object(n.useState)([]),[k,F]=Object(n.useState)(""),G=v.a.propertyStatusArr,[z,M]=Object(n.useState)(""),V=v.a.propertyType,[W,B]=Object(n.useState)(""),[H,U]=r.a.useState(""),[J,q]=r.a.useState(!1);const _=[{name:"Id",selector:"propertyId",sortable:!0,center:!0},{name:"Added On",sortable:!0,center:!0,maxWidth:"120px",style:{padding:"0 !important"},cell:e=>{let{postedDate:t}=e;return Object(y.jsx)("span",{children:"".concat(Object(x.f)(t))||""})}},{name:"Owner",selector:"ownerName",sortable:!1,sortable:!1,center:!0,maxWidth:"200px",style:{padding:"0 !important"}},{name:"Location",sortable:!1,wrap:!0,style:{padding:"0 !important"},center:!0,cell:e=>{let{houseNumber:t,societyName:a,societyAddress:n}=e;return Object(y.jsxs)("span",{children:[t," "," , ",a," , ",n]})}},{name:"Type",selector:"propertyType",sortable:!1,center:!0,maxWidth:"130px",style:{padding:"0 !important"}},{name:"Status",sortable:!1,center:!0,maxWidth:"120px",style:{padding:"0 !important"},cell:e=>{let{status:t}=e;return Object(y.jsx)("span",{children:Object(x.p)(t)})}},{name:"Assets",selector:e=>e.propertyId,sortable:!1,center:!0,maxWidth:"30px",cell:e=>{let{row:t,propertyId:a,propertyDocsResp:n}=e;return Object(y.jsx)(l.b,{className:"dociconSpace",to:{pathname:"/admin/property/property-documents",state:{propertyId:a,propertyDocsResp:n,userId:I.userid}},children:Object(y.jsx)(s.a,{alt:"doc icon",src:O.a})})}},{name:"Action",sortable:!1,center:!0,maxWidth:"60px",cell:e=>{let{row:t,propertyId:a}=e;return Object(y.jsx)("div",{className:"action",children:Object(y.jsx)(x.a,{position:"left",name:"View Details",children:Object(y.jsx)("span",{children:Object(y.jsx)(l.b,{to:{pathname:"/admin/property/property-details",state:{propertyId:a,userId:I.userid}},children:Object(y.jsx)(s.a,{name:"editIcon",src:c.a})})})})})}}],Q=()=>Object(y.jsx)("div",{className:"d-flex justify-content-center tableBottom"});Object(n.useEffect)((()=>{P()}),[C,P]);const Y=(e,t)=>{console.log(e,t,"location filter data");const a=t.match(/([^,]+),\s*(\d{6})/);if(a){console.log("inside match");const t=a[1].trim();T(t);const n=a[2];F(n),console.log(t,n,"data for filter"),u({city:e,zipcode:n,location:t,pageSize:"",pageNo:"",userId:I.userid})}if(""==t){let t="",a="";console.log("outside match"),u({city:e,zipcode:a,location:t,pageSize:"",pageNo:"",userId:I.userid})}},K=r.a.useMemo((()=>Object(y.jsx)(g.a,{onFilter:e=>U(e.target.value),onClear:()=>{H&&(q(!J),U(""))},filterText:H,placeholder:"Search here"})),[H,J]);let X=[];X=b.data.length?b.data.filter((e=>{var t,a;return(null===e||void 0===e?void 0:e.propertyId)==H||(null===e||void 0===e||null===(t=e.postedDate)||void 0===t?void 0:t.toLowerCase().includes(H.toLowerCase()))||(null===e||void 0===e||null===(a=e.propertyType)||void 0===a?void 0:a.toLowerCase().includes(H.toLowerCase()))||e.societyName.toLowerCase().includes(H.toLowerCase())||e.societyAddress.toLowerCase().includes(H.toLowerCase())})):[];const Z=e=>{let t=e||z;return t&&X.length&&(X=X.filter((e=>(null===e||void 0===e?void 0:e.status.toUpperCase())==t.toUpperCase()))),X},$=e=>{let t="SMARTDOOR"===W;return(e||W)&&X.length&&(X=X.filter((e=>(null===e||void 0===e?void 0:e.smartDoorProperty)===t))),X};return Object(y.jsx)(y.Fragment,{children:Object(y.jsxs)("div",{className:"tableBox mb-5",children:[Object(y.jsx)(i.Route,{path:"/admin/user-management/user-details",name:"Admin Dashboard",component:h.a}),Object(y.jsxs)("div",{className:"d-flex justify-content-between align-items-center tableHeading",children:[Object(y.jsx)("div",{children:Object(y.jsx)(o.a,{size:"regular",fontWeight:"mediumbold",color:"secondryColor",text:"Properties on Smartdoor"})}),Object(y.jsxs)("div",{className:"locationSelect d-flex",children:[K,Object(y.jsx)(d.a.Group,{controlId:"exampleForm.SelectCustom",children:Object(y.jsxs)(d.a.Control,{as:"select",onChange:e=>{L([]),w(e.target.value),T(""),Y(e.target.value,""),e.target.value.length&&S({city:e.target.value}).then((e=>{if(e.data&&200===e.data.status){const t=e.data.resourceData.locations.map((e=>({...e,location:"".concat(e.location," ,").concat(e.pinCode)})));L(t)}})).catch((e=>console.log("err:",e)))},value:R,children:[Object(y.jsx)("option",{value:"",children:"Select City"}),(null===E||void 0===E||null===(t=E.data)||void 0===t||null===(a=t.cities)||void 0===a?void 0:a.length)>0?null===E||void 0===E||null===(p=E.data)||void 0===p?void 0:p.cities.map(((e,t)=>Object(y.jsx)("option",{value:e,children:e},t))):null]})}),Object(y.jsx)(d.a.Group,{controlId:"exampleForm.SelectCustom",className:"loc-input",children:Object(y.jsxs)(d.a.Control,{as:"select",value:D,onChange:e=>{Y(R,e.target.value),T(e.target.value)},className:"locationWidth",children:[Object(y.jsx)("option",{value:"",children:"Select Location"}),A&&A.length?A.map(((e,t)=>Object(y.jsx)("option",{value:e.location,children:e.location},e.pinCode))):null]})}),V.length?Object(y.jsx)(d.a.Group,{controlId:"exampleForm.SelectCustom",children:Object(y.jsxs)(d.a.Control,{as:"select",value:W,onChange:e=>{var t;t=e.target.value,B(t),$(t)},children:[Object(y.jsx)("option",{value:"",children:"Select Property Type"}),V.length?V.map(((e,t)=>Object(y.jsx)("option",{value:e,children:e},t))):null]})}):"",G.length?Object(y.jsx)(d.a.Group,{controlId:"exampleForm.SelectCustom",children:Object(y.jsxs)(d.a.Control,{as:"select",value:z,onChange:e=>{var t;t=e.target.value,M(t),Z(t)},children:[Object(y.jsx)("option",{value:"",children:"Select Status"}),G.length?G.map(((e,t)=>Object(y.jsx)("option",{value:e,children:e},t))):null]})}):"",Object(y.jsx)("div",{className:"ml-3",children:Object(y.jsx)(f.a,{name:"Search",varient:"primary",size:"Small",color:"white",style:{height:"40px !important"},onClick:()=>{const e=D.match(/([^,]+),\s*(\d{6})/);u({userId:I.userid,city:R||"",pageSize:"",pageNo:"",zipcode:k||"",location:e?e[1].trim():""})}})})]})]}),Object(y.jsx)("div",{className:"propertiesTableWrapper",children:Object(y.jsx)(m.a,{data:$()&&Z(),columns:_,progressPending:b.isLoading,paginationComponent:e=>Object(y.jsx)(j.a,{...e,PaginationActionButton:Q}),paginationRowsPerPageOptions:[8,16,24,32,40,48,56,64,72,80],paginationPerPage:8,perPageOptions:[8,16,24,32,40,48,56,64,72,80],filterText:H,subHeaderComponent:K,persistTableHead:!0,filterComponent:K})}),b.isLoading?Object(y.jsx)(Q,{}):b.data.length?null:Object(y.jsx)(Q,{})]})})}))},153:function(e,t,a){"use strict";var n=a(148),r=(a(155),a(29)),i=a.p+"static/media/Search.5d68d6da.svg",s=a(4);t.a=e=>{let{filterText:t,onFilter:a,onClear:o,placeholder:l,className:c}=e;return Object(s.jsxs)("div",{className:"searchCrossButon",children:[Object(s.jsx)(n.b,{id:"search",type:"text",placeholder:l,"aria-label":"Search Input",value:t,onChange:a,className:c}),Object(s.jsx)("div",{className:"inputSearchIcon",children:Object(s.jsx)(r.a,{src:i,name:"Search Icon",className:"img-fluid"})})]})}},155:function(e,t,a){},168:function(e,t,a){"use strict";t.a={installationRequestsStatusArr:["ASSIGNED","UNASSIGNED","ACCEPTED","NOT ACCEPTED","IN PROGRESS","PROBLEM","REJECTED","COMPLETED"],installationServiceRequestsStatusArr:["PENDING","ASSIGNED","PROBLEM","REJECTED","IN PROGRESS","COMPLETED","CLOSED"],helpdeskServiceRequestsStatusArr:["PENDING","ASSIGNED","PROBLEM","REJECTED","IN PROGRESS","COMPLETED","CLOSED"],financeConsumerTransactionsStatusArr:["FAILED","COMPLETED"],financeRefundRequestStatusArr:["IN PROGRESS","PENDING","CLOSED"],ConsumerStatusArr:["PENDING","COMPLETED"],transactionLeadsStatusArr:["UNASSIGNED","ASSIGNED","IN PROGRESS","COMPLETED","DISCARDED"],meetingRequestsStatusArr:["ASSIGNED","IN PROGRESS","COMPLETED","NOT DONE"],dealApprovalsStatusArr:["PENDING","CANCELLED","APPROVED"],societyLeadsStatusArr:["PENDING","IN PROGRESS","CONVERTED","CANCELLED","NOT INTERESTED"],propertyStatusArr:["UNDER REVIEW","PUBLISHED"],propertyType:["SMARTDOOR","NON SMARTDOOR"],realtorStatusArr:["SUBMITTED","ACCEPTED","REJECTED"],brokerStatus:["Approved","Rejected","Hold","Pending","Expired","Query"]}},353:function(e,t,a){"use strict";t.a=a.p+"static/media/doc.e1dd8771.svg"}}]);