(this.webpackJsonpsmartdoor=this.webpackJsonpsmartdoor||[]).push([[40],{115:function(e,t,a){"use strict";var n=a(5),s=a(6),i=a(25),l=a.n(i),r=a(0),o=a.n(r),c=(a(114),a(7)),d=a.n(c),u=["as","className","type","tooltip"],b={type:d.a.string,tooltip:d.a.bool,as:d.a.elementType},m=o.a.forwardRef((function(e,t){var a=e.as,i=void 0===a?"div":a,r=e.className,c=e.type,d=void 0===c?"valid":c,b=e.tooltip,m=void 0!==b&&b,p=Object(s.a)(e,u);return o.a.createElement(i,Object(n.a)({},p,{ref:t,className:l()(r,d+"-"+(m?"tooltip":"feedback"))}))}));m.displayName="Feedback",m.propTypes=b;var p=m,j=o.a.createContext({controlId:void 0}),f=a(28),O=["id","bsPrefix","bsCustomPrefix","className","type","isValid","isInvalid","isStatic","as"],x=o.a.forwardRef((function(e,t){var a=e.id,i=e.bsPrefix,c=e.bsCustomPrefix,d=e.className,u=e.type,b=void 0===u?"checkbox":u,m=e.isValid,p=void 0!==m&&m,x=e.isInvalid,v=void 0!==x&&x,h=e.isStatic,g=e.as,C=void 0===g?"input":g,N=Object(s.a)(e,O),P=Object(r.useContext)(j),E=P.controlId,y=P.custom?[c,"custom-control-input"]:[i,"form-check-input"],S=y[0],I=y[1];return i=Object(f.a)(S,I),o.a.createElement(C,Object(n.a)({},N,{ref:t,type:b,id:a||E,className:l()(d,i,p&&"is-valid",v&&"is-invalid",h&&"position-static")}))}));x.displayName="FormCheckInput";var v=x,h=["bsPrefix","bsCustomPrefix","className","htmlFor"],g=o.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.bsCustomPrefix,c=e.className,d=e.htmlFor,u=Object(s.a)(e,h),b=Object(r.useContext)(j),m=b.controlId,p=b.custom?[i,"custom-control-label"]:[a,"form-check-label"],O=p[0],x=p[1];return a=Object(f.a)(O,x),o.a.createElement("label",Object(n.a)({},u,{ref:t,htmlFor:d||m,className:l()(c,a)}))}));g.displayName="FormCheckLabel";var C=g,N=["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","title","type","label","children","custom","as"],P=o.a.forwardRef((function(e,t){var a=e.id,i=e.bsPrefix,c=e.bsCustomPrefix,d=e.inline,u=void 0!==d&&d,b=e.disabled,m=void 0!==b&&b,O=e.isValid,x=void 0!==O&&O,h=e.isInvalid,g=void 0!==h&&h,P=e.feedbackTooltip,E=void 0!==P&&P,y=e.feedback,S=e.className,I=e.style,w=e.title,R=void 0===w?"":w,L=e.type,T=void 0===L?"checkbox":L,D=e.label,k=e.children,A=e.custom,F=e.as,G=void 0===F?"input":F,M=Object(s.a)(e,N),z="switch"===T||A,V=z?[c,"custom-control"]:[i,"form-check"],W=V[0],B=V[1];i=Object(f.a)(W,B);var U=Object(r.useContext)(j).controlId,J=Object(r.useMemo)((function(){return{controlId:a||U,custom:z}}),[U,z,a]),q=z||null!=D&&!1!==D&&!k,H=o.a.createElement(v,Object(n.a)({},M,{type:"switch"===T?"checkbox":T,ref:t,isValid:x,isInvalid:g,isStatic:!q,disabled:m,as:G}));return o.a.createElement(j.Provider,{value:J},o.a.createElement("div",{style:I,className:l()(S,i,z&&"custom-"+T,u&&i+"-inline")},k||o.a.createElement(o.a.Fragment,null,H,q&&o.a.createElement(C,{title:R},D),(x||g)&&o.a.createElement(p,{type:x?"valid":"invalid",tooltip:E},y))))}));P.displayName="FormCheck",P.Input=v,P.Label=C;var E=P,y=["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","lang","as"],S=o.a.forwardRef((function(e,t){var a=e.id,i=e.bsPrefix,c=e.bsCustomPrefix,d=e.className,u=e.isValid,b=e.isInvalid,m=e.lang,p=e.as,O=void 0===p?"input":p,x=Object(s.a)(e,y),v=Object(r.useContext)(j),h=v.controlId,g=v.custom?[c,"custom-file-input"]:[i,"form-control-file"],C=g[0],N=g[1];return i=Object(f.a)(C,N),o.a.createElement(O,Object(n.a)({},x,{ref:t,id:a||h,type:"file",lang:m,className:l()(d,i,u&&"is-valid",b&&"is-invalid")}))}));S.displayName="FormFileInput";var I=S,w=["bsPrefix","bsCustomPrefix","className","htmlFor"],R=o.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.bsCustomPrefix,c=e.className,d=e.htmlFor,u=Object(s.a)(e,w),b=Object(r.useContext)(j),m=b.controlId,p=b.custom?[i,"custom-file-label"]:[a,"form-file-label"],O=p[0],x=p[1];return a=Object(f.a)(O,x),o.a.createElement("label",Object(n.a)({},u,{ref:t,htmlFor:d||m,className:l()(c,a),"data-browse":u["data-browse"]}))}));R.displayName="FormFileLabel";var L=R,T=["id","bsPrefix","bsCustomPrefix","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","label","children","custom","lang","data-browse","as","inputAs"],D=o.a.forwardRef((function(e,t){var a=e.id,i=e.bsPrefix,c=e.bsCustomPrefix,d=e.disabled,u=void 0!==d&&d,b=e.isValid,m=void 0!==b&&b,O=e.isInvalid,x=void 0!==O&&O,v=e.feedbackTooltip,h=void 0!==v&&v,g=e.feedback,C=e.className,N=e.style,P=e.label,E=e.children,y=e.custom,S=e.lang,w=e["data-browse"],R=e.as,D=void 0===R?"div":R,k=e.inputAs,A=void 0===k?"input":k,F=Object(s.a)(e,T),G=y?[c,"custom"]:[i,"form-file"],M=G[0],z=G[1];i=Object(f.a)(M,z);var V=Object(r.useContext)(j).controlId,W=Object(r.useMemo)((function(){return{controlId:a||V,custom:y}}),[V,y,a]),B=null!=P&&!1!==P&&!E,U=o.a.createElement(I,Object(n.a)({},F,{ref:t,isValid:m,isInvalid:x,disabled:u,as:A,lang:S}));return o.a.createElement(j.Provider,{value:W},o.a.createElement(D,{style:N,className:l()(C,i,y&&"custom-file")},E||o.a.createElement(o.a.Fragment,null,y?o.a.createElement(o.a.Fragment,null,U,B&&o.a.createElement(L,{"data-browse":w},P)):o.a.createElement(o.a.Fragment,null,B&&o.a.createElement(L,null,P),U),(m||x)&&o.a.createElement(p,{type:m?"valid":"invalid",tooltip:h},g))))}));D.displayName="FormFile",D.Input=I,D.Label=L;var k=D,A=(a(46),["bsPrefix","bsCustomPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","custom","as"]),F=o.a.forwardRef((function(e,t){var a,i,c=e.bsPrefix,d=e.bsCustomPrefix,u=e.type,b=e.size,m=e.htmlSize,p=e.id,O=e.className,x=e.isValid,v=void 0!==x&&x,h=e.isInvalid,g=void 0!==h&&h,C=e.plaintext,N=e.readOnly,P=e.custom,E=e.as,y=void 0===E?"input":E,S=Object(s.a)(e,A),I=Object(r.useContext)(j).controlId,w=P?[d,"custom"]:[c,"form-control"],R=w[0],L=w[1];if(c=Object(f.a)(R,L),C)(i={})[c+"-plaintext"]=!0,a=i;else if("file"===u){var T;(T={})[c+"-file"]=!0,a=T}else if("range"===u){var D;(D={})[c+"-range"]=!0,a=D}else if("select"===y&&P){var k;(k={})[c+"-select"]=!0,k[c+"-select-"+b]=b,a=k}else{var F;(F={})[c]=!0,F[c+"-"+b]=b,a=F}return o.a.createElement(y,Object(n.a)({},S,{type:u,size:m,ref:t,readOnly:N,id:p||I,className:l()(O,a,v&&"is-valid",g&&"is-invalid")}))}));F.displayName="FormControl";var G=Object.assign(F,{Feedback:p}),M=["bsPrefix","className","children","controlId","as"],z=o.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.className,c=e.children,d=e.controlId,u=e.as,b=void 0===u?"div":u,m=Object(s.a)(e,M);a=Object(f.a)(a,"form-group");var p=Object(r.useMemo)((function(){return{controlId:d}}),[d]);return o.a.createElement(j.Provider,{value:p},o.a.createElement(b,Object(n.a)({},m,{ref:t,className:l()(i,a)}),c))}));z.displayName="FormGroup";var V=z,W=a(143),B=["as","bsPrefix","column","srOnly","className","htmlFor"],U=o.a.forwardRef((function(e,t){var a=e.as,i=void 0===a?"label":a,c=e.bsPrefix,d=e.column,u=e.srOnly,b=e.className,m=e.htmlFor,p=Object(s.a)(e,B),O=Object(r.useContext)(j).controlId;c=Object(f.a)(c,"form-label");var x="col-form-label";"string"===typeof d&&(x=x+" "+x+"-"+d);var v=l()(b,c,u&&"sr-only",d&&x);return m=m||O,d?o.a.createElement(W.a,Object(n.a)({ref:t,as:"label",className:v,htmlFor:m},p)):o.a.createElement(i,Object(n.a)({ref:t,className:v,htmlFor:m},p))}));U.displayName="FormLabel",U.defaultProps={column:!1,srOnly:!1};var J=U,q=["bsPrefix","className","as","muted"],H=o.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.className,r=e.as,c=void 0===r?"small":r,d=e.muted,u=Object(s.a)(e,q);return a=Object(f.a)(a,"form-text"),o.a.createElement(c,Object(n.a)({},u,{ref:t,className:l()(i,a,d&&"text-muted")}))}));H.displayName="FormText";var _=H,Q=o.a.forwardRef((function(e,t){return o.a.createElement(E,Object(n.a)({},e,{ref:t,type:"switch"}))}));Q.displayName="Switch",Q.Input=E.Input,Q.Label=E.Label;var K=Q,X=a(130),Y=["bsPrefix","inline","className","validated","as"],Z=Object(X.a)("form-row"),$=o.a.forwardRef((function(e,t){var a=e.bsPrefix,i=e.inline,r=e.className,c=e.validated,d=e.as,u=void 0===d?"form":d,b=Object(s.a)(e,Y);return a=Object(f.a)(a,"form"),o.a.createElement(u,Object(n.a)({},b,{ref:t,className:l()(r,c&&"was-validated",i&&a+"-inline")}))}));$.displayName="Form",$.defaultProps={inline:!1},$.Row=Z,$.Group=V,$.Control=G,$.Check=E,$.File=k,$.Switch=K,$.Label=J,$.Text=_;t.a=$},123:function(e,t,a){"use strict";var n=a(150),s=a.n(n),i=(a(128),a(0)),l=a(125),r=a(56),o=a(4);const c=Object(o.jsx)("img",{src:l.a,className:"ml-1",width:"10px",alt:"SHORT_ICON"}),d=Object(o.jsx)(r.b,{}),u=e=>{let{title:t,columns:a,data:n,pagination:i,progressPending:l,onChangePage:r,paginationComponent:u,paginationRowsPerPageOptions:m,paginationPerPage:p,sortIcon:j,progressComponent:f,striped:O,...x}=e;return Object(o.jsx)(s.a,{title:t,columns:a,data:n,pagination:!1!==i,highlightOnHover:!0,progressPending:l,onChangePage:r,striped:!1!==O,paginationComponent:u,paginationRowsPerPageOptions:m,paginationPerPage:p,customStyles:b,sortIcon:j||c,progressComponent:f||d,...x})},b={rows:{style:{borderBottomWidth:"0 !important","&:nth-child(even)":{backgroundColor:"#fff"},"&:nth-child(odd)":{backgroundColor:"#f8f3f5"}}},headCells:{style:{fontWeight:"700 !important",fontSize:".875rem",color:"#252525",justifyContent:"center","&:first-child":{minWidth:"100px",maxWidth:"120px"}}},cells:{style:{fontSize:".875rem",color:"#252525","&:first-child":{minWidth:"100px",maxWidth:"120px"}}}};t.a=Object(i.memo)(u)},125:function(e,t,a){"use strict";t.a=a.p+"static/media/sort-icon.a64bca1a.svg"},128:function(e,t,a){},132:function(e,t,a){},134:function(e,t,a){"use strict";var n,s,i,l,r,o,c,d,u,b,m,p=a(135),j=a(0),f=a(163),O=a(4);const x=function(){return Object(f.css)(n||(n=Object(p.a)(["\n    @media screen and (max-width: ","px) {\n      ","\n    }\n  "])),599,Object(f.css)(...arguments))},v=f.default.select(s||(s=Object(p.a)(["\n  cursor: pointer;\n  height: 24px;\n  min-width: 24px;\n  user-select: none;\n  padding-left: 8px;\n  padding-right: 12px;\n  box-sizing: content-box;\n  font-size: inherit;\n  color: inherit;\n  border: none;\n  background-color: transparent;\n  appearance: none;\n  direction: ltr;\n  &::-ms-expand {\n    display: none;\n  }\n  &:disabled::-ms-expand {\n    background: #f60;\n  }\n  option {\n    color: initial;\n  }\n"]))),h=f.default.div(i||(i=Object(p.a)(["\n  position: relative;\n  flex-shrink: 0;\n  font-size: inherit;\n  color: inherit;\n  margin-top: 1px;\n  svg {\n    top: 0;\n    right: 0;\n    color: inherit;\n    position: absolute;\n    fill: currentColor;\n    width: 24px;\n    height: 24px;\n    display: inline-block;\n    user-select: none;\n    pointer-events: none;\n  }\n"]))),g={rowsPerPageText:"Rows per page:",rangeSeparatorText:"of",noRowsPerPage:!1,selectAllRowsItem:!1,selectAllRowsItemText:"All"},C=f.default.nav(l||(l=Object(p.a)(["\n  display: flex;\n  flex: 1 1 auto;\n  // justify-content: flex-end;\n  align-items: center;\n  box-sizing: border-box;\n  padding-right: 8px;\n  padding-left: 8px;\n  width: 100%;\n  ",";\n"])),(e=>e.theme.pagination.style)),N=f.default.button(r||(r=Object(p.a)(["\n  position: relative;\n  display: block;\n  user-select: none;\n  border: none;\n  ",";\n  ",";\n"])),(e=>e.theme.pagination.pageButtonsStyle),(e=>e.isRTL&&"transform: scale(-1, -1)")),P=f.default.div(o||(o=Object(p.a)(["\n  display: flex;\n  align-items: center;\n  border-radius: 4px;\n  white-space: nowrap;\n  ",";\n"])),x(c||(c=Object(p.a)(["\n    width: 100%;\n    justify-content: space-around;\n  "])))),E=f.default.span(d||(d=Object(p.a)(["\n  flex-shrink: 1;\n  user-select: none;\n"]))),y=Object(f.default)(E)(u||(u=Object(p.a)(["\n  margin: 0 24px;\n"]))),S=Object(f.default)(E)(b||(b=Object(p.a)(["\n  margin: 0 4px;\n"]))),I=f.default.div(m||(m=Object(p.a)(["\n  margin: ",";\n  display: ",";\n\n  "])),(e=>e.margin),(e=>e.display)),w=(e,t)=>Math.ceil(e/t),R=e=>Object(O.jsx)(h,{children:Object(O.jsx)(v,{...e})});t.a=e=>{let{rowsPerPage:t,rowCount:a,onChangePage:n,onChangeRowsPerPage:s,currentPage:i,direction:l,paginationRowsPerPageOptions:r,paginationIconLastPage:o,paginationIconFirstPage:c,paginationIconNext:d,paginationIconPrevious:u,paginationComponentOptions:b,PaginationActionButton:m}=e;const p=!1,f=w(a,t),x=i*t,v=x-t+1,h=1===i,E=i===f,L={...g,...b},T=i===f?"".concat(v,"-").concat(a," ").concat(L.rangeSeparatorText," ").concat(a):"".concat(v,"-").concat(x," ").concat(L.rangeSeparatorText," ").concat(a),D=Object(j.useCallback)((()=>n(i-1)),[i,n]),k=Object(j.useCallback)((()=>n(i+1)),[i,n]),A=Object(j.useCallback)((()=>n(1)),[n]),F=Object(j.useCallback)((()=>n(w(a,t))),[n,a,t]),G=Object(j.useCallback)((e=>{let{target:t}=e;return s(Number(t.value),i)}),[i,s]),M=r.map((e=>Object(O.jsx)("option",{value:e,children:e},e)));L.selectAllRowsItem&&M.push(Object(O.jsx)("option",{value:a,children:L.selectAllRowsItemText},-1));const z=Object(O.jsx)(R,{onChange:G,defaultValue:t,"aria-label":L.rowsPerPageText,children:M});return Object(O.jsxs)(C,{className:"rdt_Pagination",children:[Object(O.jsx)(I,{margin:"0 auto",children:" "}),Object(O.jsx)(I,{margin:"0 auto",children:m?Object(O.jsx)(m,{}):null}),Object(O.jsxs)(I,{style:{display:"contents"},children:[!L.noRowsPerPage&&Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(S,{children:L.rowsPerPageText}),z]}),Object(O.jsx)(y,{children:T}),Object(O.jsxs)(P,{children:[Object(O.jsx)(N,{id:"pagination-first-page",type:"button","aria-label":"First Page","aria-disabled":h,onClick:A,disabled:h,isRTL:p,children:c}),Object(O.jsx)(N,{id:"pagination-previous-page",type:"button","aria-label":"Previous Page","aria-disabled":h,onClick:D,disabled:h,isRTL:p,children:u}),!1,Object(O.jsx)(N,{id:"pagination-next-page",type:"button","aria-label":"Next Page","aria-disabled":E,onClick:k,disabled:E,isRTL:p,children:d}),Object(O.jsx)(N,{id:"pagination-last-page",type:"button","aria-label":"Last Page","aria-disabled":E,onClick:F,disabled:E,isRTL:p,children:o})]})]})]})}},135:function(e,t,a){"use strict";function n(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}a.d(t,"a",(function(){return n}))},139:function(e,t,a){"use strict";t.a=a.p+"static/media/content-ico.1134bf42.svg"},1428:function(e,t,a){},148:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));a(132);var n=a(0),s=a(115),i=a(20),l=a(4);const r=Object(n.forwardRef)(((e,t)=>{let{id:a,label:n,children:r,error:o,placeholder:c,leadingIcon:d,type:u,component:b,...m}=e,p=a||n&&n.replace(/\s/g,"")||"formInput"+Math.random();return Object(l.jsx)("div",{className:"sdInputFields",children:Object(l.jsxs)(s.a.Group,{controlId:p,children:[Object(l.jsxs)(s.a.Label,{children:[" ",n," "]}),Object(l.jsx)(s.a.Control,{placeholder:b?"":c||n,ref:t,type:u,...m,children:r}),b&&Object(l.jsxs)("span",{className:"component position-absolute",children:[" ",b," "]}),d&&Object(l.jsxs)("span",{className:"leadingIcon position-absolute",children:[" ",d.replace('"',"")," "]}),o&&Object(l.jsx)(i.a,{color:"dangerText",size:"xSmall",text:o})]})})}));t.b=Object(n.memo)(r);const o=e=>{let{id:t,label:a,...n}=e,i=t||a&&a.replace(/\s/g,"")||"formInput"+Math.random();return Object(l.jsx)("div",{className:"sdInputFields",children:Object(l.jsx)("div",{className:"checkBox customChechbox",children:Object(l.jsx)(s.a.Group,{controlId:i,children:Object(l.jsx)(s.a.Check,{type:"checkbox",label:a,...n,className:"p-0"})})})})}},153:function(e,t,a){"use strict";var n=a(148),s=(a(155),a(29)),i=a.p+"static/media/Search.5d68d6da.svg",l=a(4);t.a=e=>{let{filterText:t,onFilter:a,onClear:r,placeholder:o,className:c}=e;return Object(l.jsxs)("div",{className:"searchCrossButon",children:[Object(l.jsx)(n.b,{id:"search",type:"text",placeholder:o,"aria-label":"Search Input",value:t,onChange:a,className:c}),Object(l.jsx)("div",{className:"inputSearchIcon",children:Object(l.jsx)(s.a,{src:i,name:"Search Icon",className:"img-fluid"})})]})}},1545:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(38),l=a(35),r=a(29),o=a(119),c=a(14),d=a(20),u=a(134),b=a(34),m=a(139),p=a(115),j=(a(1428),a(153)),f=a(123),O=a(168),x=a(4);const v={getSocietyLeadsData:o.wc,getLeadsCount:o.Wb,getSocietyLeadsCity:o.vc,getAllCity:o.I},h=Object(i.b)((e=>{let{salesLeadsDataTable:t,salesLeadsCount:a,getSocietyLeadsCityData:n,allCities:s}=e;return{salesLeadsDataTable:t,salesLeadsCount:a,getSocietyLeadsCityData:n,allCities:s}}),v);t.default=Object(l.c)(h,n.memo)((e=>{var t,a,i;const{getSocietyLeadsData:l,salesLeadsDataTable:v,getSocietyLeadsCity:h,getAllCity:g,allCities:C}=e,[N,P]=Object(n.useState)(!1),E=O.a.societyLeadsStatusArr,[y,S]=Object(n.useState)(""),[I,w]=s.a.useState(""),[R,L]=s.a.useState(!1),[T,D]=Object(n.useState)(""),[k,A]=Object(n.useState)({city:"",endDate:"",id:"",societyName:"",startDate:"",status:[]});Object(n.useEffect)((()=>{l({...k,records:"",pageNumber:""}),g()}),[l,h,g]);const F=[{name:"Id",selector:"leadId",center:!0,sortable:!0},{name:"Date",selector:"leadDate",sortable:!0,center:!0,maxWidth:"130px",cell:e=>{let{leadDate:t}=e;return Object(x.jsx)("span",{children:Object(b.f)(t)})}},{name:"Source",selector:"source",center:!0,maxWidth:"60px"},{name:"Society",selector:"societyName",center:!0,cell:e=>{let{societyName:t}=e;return Object(x.jsx)(b.a,{position:"top",style:{width:"100%"},name:t||"",children:Object(x.jsxs)("span",{className:"cursor-pointer elipsis-text",children:[" ",t||"-"]})})}},{name:"City",selector:"city",center:!0},{name:"Assigned To",selector:"assignTo",center:!0,cell:e=>{let{assignTo:t,assignToList:a,leadId:n,status:s}=e;return"PENDING"===s?t?Object(x.jsx)(d.a,{size:"Small",color:"secondryColor",className:"text-center",text:t?t.capitalizeWord():"-"}):Object(x.jsx)("div",{className:"w-100",children:Object(x.jsx)("div",{className:"assignTo",children:Object(x.jsx)(p.a.Group,{controlId:"exampleForm.SelectCustom",className:"w-100 display-flex",children:Object(x.jsxs)(p.a.Control,{as:"select",className:"w-100",onChange:e=>function(e,t){e&&t&&Object(o.o)({leadId:e,userId:t}).then((e=>{200===e.data.status&&l({...k,records:"",pageNumber:""})})).catch((e=>{console.log(e)}))}(n,e.target.value),children:[Object(x.jsx)("option",{children:"Assign"}),a.map(((e,t)=>Object(x.jsx)("option",{value:e.id,children:e.name},t)))]})})})}):Object(x.jsx)(d.a,{size:"Small",color:"secondryColor",className:"text-center",text:t?t.capitalizeWord():"-"})}},{name:"Status",selector:"status",center:!0,cell:e=>{let{status:t}=e;return Object(b.p)("COMPLETED"===t?"CONVERTED":t)}},{name:"Action",center:!0,maxWidth:"60px",cell:e=>{let{leadId:t,status:a}=e;return Object(x.jsx)("div",{className:"action",children:Object(x.jsx)(b.a,{position:"left",name:"View Details",children:Object(x.jsx)("span",{children:Object(x.jsx)(c.b,{to:{pathname:"/admin/sales/lead-details",state:{leadId:t}},children:Object(x.jsx)(r.a,{name:"editIcon",src:m.a})})})})})}}],G=s.a.useMemo((()=>Object(x.jsx)(j.a,{onFilter:e=>w(e.target.value),onClear:()=>{I&&(L(!R),w(""))},filterText:I,placeholder:"Search here"})),[I,R]),M=e=>{let t=e||y,a=[];return a=v.data.length?v.data.filter((e=>{var t,a,n,s,i;return(null===e||void 0===e?void 0:e.leadId)===I||(null===e||void 0===e||null===(t=e.societyName)||void 0===t?void 0:t.toLowerCase().includes(I.toLowerCase()))||(null===e||void 0===e||null===(a=e.source)||void 0===a?void 0:a.toLowerCase().includes(I.toLowerCase()))||(null===e||void 0===e||null===(n=e.city)||void 0===n?void 0:n.toLowerCase().includes(I.toLowerCase()))||(null===e||void 0===e||null===(s=e.status)||void 0===s?void 0:s.toLowerCase().includes(I.toLowerCase()))||(null===e||void 0===e||null===(i=e.assignTo)||void 0===i?void 0:i.toLowerCase().includes(I.toLowerCase()))})):[],t&&a.length&&(a=a.filter((e=>(null===e||void 0===e?void 0:e.status.toUpperCase())===t.toUpperCase()))),a};return Object(x.jsxs)("div",{className:"tableBox bg-white",children:[Object(x.jsxs)("div",{className:"d-flex justify-content-between align-items-center tableHeading",children:[Object(x.jsx)("div",{children:Object(x.jsx)(d.a,{size:"regular",fontWeight:"mediumbold",color:"secondryColor",text:"Society Leads"})}),Object(x.jsxs)("div",{className:"locationSelect d-flex",children:[G,E.length?Object(x.jsx)(p.a.Group,{controlId:"exampleForm.SelectCustom",children:Object(x.jsxs)(p.a.Control,{as:"select",value:y,onChange:e=>{var t;t=e.target.value,S(t),M(t)},children:[Object(x.jsx)("option",{value:"",children:"Select Status"}),E.length?E.map(((e,t)=>Object(x.jsx)("option",{value:e,children:e},t))):null]})}):"",Object(x.jsx)(p.a.Group,{controlId:"exampleForm.SelectCustom",children:Object(x.jsxs)(p.a.Control,{as:"select",value:T,onChange:e=>{var t;t=e.target.value,D(t),l({...k,city:t,records:"",pageNumber:""})},children:[Object(x.jsx)("option",{value:"",children:"Select City"}),null!==C&&void 0!==C&&C.data&&null!==C&&void 0!==C&&null!==(t=C.data)&&void 0!==t&&null!==(a=t.cities)&&void 0!==a&&a.length?null===C||void 0===C||null===(i=C.data)||void 0===i?void 0:i.cities.map(((e,t)=>Object(x.jsx)("option",{value:e,children:e},t))):null]})})]})]}),Object(x.jsx)("div",{className:"SocietyLeadsTableWrapper",children:Object(x.jsx)(f.a,{data:M(),columns:F,progressPending:v.isLoading,paginationRowsPerPageOptions:[8,16,24,32,40,48,56,64,72,80],paginationPerPage:8,perPageOptions:[8,16,24,32,40,48,56,64,72,80],PaginationComponent:e=>Object(x.jsx)(u.a,{...e})})})]})}))},155:function(e,t,a){},168:function(e,t,a){"use strict";t.a={installationRequestsStatusArr:["ASSIGNED","UNASSIGNED","ACCEPTED","NOT ACCEPTED","IN PROGRESS","PROBLEM","REJECTED","COMPLETED"],installationServiceRequestsStatusArr:["PENDING","ASSIGNED","PROBLEM","REJECTED","IN PROGRESS","COMPLETED","CLOSED"],helpdeskServiceRequestsStatusArr:["PENDING","ASSIGNED","PROBLEM","REJECTED","IN PROGRESS","COMPLETED","CLOSED"],financeConsumerTransactionsStatusArr:["FAILED","COMPLETED"],financeRefundRequestStatusArr:["IN PROGRESS","PENDING","CLOSED"],ConsumerStatusArr:["PENDING","COMPLETED"],transactionLeadsStatusArr:["UNASSIGNED","ASSIGNED","IN PROGRESS","COMPLETED","DISCARDED"],meetingRequestsStatusArr:["ASSIGNED","IN PROGRESS","COMPLETED","NOT DONE"],dealApprovalsStatusArr:["PENDING","CANCELLED","APPROVED"],societyLeadsStatusArr:["PENDING","IN PROGRESS","CONVERTED","CANCELLED","NOT INTERESTED"],propertyStatusArr:["UNDER REVIEW","PUBLISHED"],propertyType:["SMARTDOOR","NON SMARTDOOR"],realtorStatusArr:["SUBMITTED","ACCEPTED","REJECTED"],brokerStatus:["Approved","Rejected","Hold","Pending","Expired","Query"]}}}]);