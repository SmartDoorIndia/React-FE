(this.webpackJsonpsmartdoor=this.webpackJsonpsmartdoor||[]).push([[43],{121:function(e,t,a){"use strict";var s=a(148),n=a.n(s),c=(a(126),a(0)),i=a(123),l=a(55),r=a(4);const o=Object(r.jsx)("img",{src:i.a,className:"ml-1",width:"10px",alt:"SHORT_ICON"}),d=Object(r.jsx)(l.b,{}),j=e=>{let{title:t,columns:a,data:s,pagination:c,progressPending:i,onChangePage:l,paginationComponent:j,paginationRowsPerPageOptions:x,paginationPerPage:h,sortIcon:p,progressComponent:m,striped:O,...u}=e;return Object(r.jsx)(n.a,{title:t,columns:a,data:s,pagination:!1!==c,highlightOnHover:!0,progressPending:i,onChangePage:l,striped:!1!==O,paginationComponent:j,paginationRowsPerPageOptions:x,paginationPerPage:h,customStyles:b,sortIcon:p||o,progressComponent:m||d,...u})},b={rows:{style:{borderBottomWidth:"0 !important","&:nth-child(even)":{backgroundColor:"#fff"},"&:nth-child(odd)":{backgroundColor:"#f8f3f5"}}},headCells:{style:{fontWeight:"700 !important",fontSize:".875rem",color:"#252525",justifyContent:"center","&:first-child":{minWidth:"70px",maxWidth:"100px"}}},cells:{style:{fontSize:".875rem",color:"#252525","&:first-child":{minWidth:"100px",maxWidth:"120px"}}}};t.a=Object(c.memo)(j)},123:function(e,t,a){"use strict";t.a=a.p+"static/media/sort-icon.a64bca1a.svg"},126:function(e,t,a){},130:function(e,t,a){},132:function(e,t,a){"use strict";var s,n,c,i,l,r,o,d,j,b,x,h=a(133),p=a(0),m=a(161),O=a(4);const u=function(){return Object(m.css)(s||(s=Object(h.a)(["\n    @media screen and (max-width: ","px) {\n      ","\n    }\n  "])),599,Object(m.css)(...arguments))},g=m.default.select(n||(n=Object(h.a)(["\n  cursor: pointer;\n  height: 24px;\n  min-width: 24px;\n  user-select: none;\n  padding-left: 8px;\n  padding-right: 12px;\n  box-sizing: content-box;\n  font-size: inherit;\n  color: inherit;\n  border: none;\n  background-color: transparent;\n  appearance: none;\n  direction: ltr;\n  &::-ms-expand {\n    display: none;\n  }\n  &:disabled::-ms-expand {\n    background: #f60;\n  }\n  option {\n    color: initial;\n  }\n"]))),v=m.default.div(c||(c=Object(h.a)(["\n  position: relative;\n  flex-shrink: 0;\n  font-size: inherit;\n  color: inherit;\n  margin-top: 1px;\n  svg {\n    top: 0;\n    right: 0;\n    color: inherit;\n    position: absolute;\n    fill: currentColor;\n    width: 24px;\n    height: 24px;\n    display: inline-block;\n    user-select: none;\n    pointer-events: none;\n  }\n"]))),f={rowsPerPageText:"Rows per page:",rangeSeparatorText:"of",noRowsPerPage:!1,selectAllRowsItem:!1,selectAllRowsItemText:"All"},N=m.default.nav(i||(i=Object(h.a)(["\n  display: flex;\n  flex: 1 1 auto;\n  // justify-content: flex-end;\n  align-items: center;\n  box-sizing: border-box;\n  padding-right: 8px;\n  padding-left: 8px;\n  width: 100%;\n  ",";\n"])),(e=>e.theme.pagination.style)),P=m.default.button(l||(l=Object(h.a)(["\n  position: relative;\n  display: block;\n  user-select: none;\n  border: none;\n  ",";\n  ",";\n"])),(e=>e.theme.pagination.pageButtonsStyle),(e=>e.isRTL&&"transform: scale(-1, -1)")),C=m.default.div(r||(r=Object(h.a)(["\n  display: flex;\n  align-items: center;\n  border-radius: 4px;\n  white-space: nowrap;\n  ",";\n"])),u(o||(o=Object(h.a)(["\n    width: 100%;\n    justify-content: space-around;\n  "])))),y=m.default.span(d||(d=Object(h.a)(["\n  flex-shrink: 1;\n  user-select: none;\n"]))),w=Object(m.default)(y)(j||(j=Object(h.a)(["\n  margin: 0 24px;\n"]))),k=Object(m.default)(y)(b||(b=Object(h.a)(["\n  margin: 0 4px;\n"]))),I=m.default.div(x||(x=Object(h.a)(["\n  margin: ",";\n  display: ",";\n\n  "])),(e=>e.margin),(e=>e.display)),S=(e,t)=>Math.ceil(e/t),R=e=>Object(O.jsx)(v,{children:Object(O.jsx)(g,{...e})});t.a=e=>{let{rowsPerPage:t,rowCount:a,onChangePage:s,onChangeRowsPerPage:n,currentPage:c,direction:i,paginationRowsPerPageOptions:l,paginationIconLastPage:r,paginationIconFirstPage:o,paginationIconNext:d,paginationIconPrevious:j,paginationComponentOptions:b,PaginationActionButton:x}=e;const h=!1,m=S(a,t),u=c*t,g=u-t+1,v=1===c,y=c===m,T={...f,...b},D=c===m?"".concat(g,"-").concat(a," ").concat(T.rangeSeparatorText," ").concat(a):"".concat(g,"-").concat(u," ").concat(T.rangeSeparatorText," ").concat(a),z=Object(p.useCallback)((()=>s(c-1)),[c,s]),W=Object(p.useCallback)((()=>s(c+1)),[c,s]),A=Object(p.useCallback)((()=>s(1)),[s]),L=Object(p.useCallback)((()=>s(S(a,t))),[s,a,t]),B=Object(p.useCallback)((e=>{let{target:t}=e;return n(Number(t.value),c)}),[c,n]),F=l.map((e=>Object(O.jsx)("option",{value:e,children:e},e)));T.selectAllRowsItem&&F.push(Object(O.jsx)("option",{value:a,children:T.selectAllRowsItemText},-1));const _=Object(O.jsx)(R,{onChange:B,defaultValue:t,"aria-label":T.rowsPerPageText,children:F});return Object(O.jsxs)(N,{className:"rdt_Pagination",children:[Object(O.jsx)(I,{margin:"0 auto",children:" "}),Object(O.jsx)(I,{margin:"0 auto",children:x?Object(O.jsx)(x,{}):null}),Object(O.jsxs)(I,{style:{display:"contents"},children:[!T.noRowsPerPage&&Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(k,{children:T.rowsPerPageText}),_]}),Object(O.jsx)(w,{children:D}),Object(O.jsxs)(C,{children:[Object(O.jsx)(P,{id:"pagination-first-page",type:"button","aria-label":"First Page","aria-disabled":v,onClick:A,disabled:v,isRTL:h,children:o}),Object(O.jsx)(P,{id:"pagination-previous-page",type:"button","aria-label":"Previous Page","aria-disabled":v,onClick:z,disabled:v,isRTL:h,children:j}),!1,Object(O.jsx)(P,{id:"pagination-next-page",type:"button","aria-label":"Next Page","aria-disabled":y,onClick:W,disabled:y,isRTL:h,children:d}),Object(O.jsx)(P,{id:"pagination-last-page",type:"button","aria-label":"Last Page","aria-disabled":y,onClick:L,disabled:y,isRTL:h,children:r})]})]})]})}},146:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));a(130);var s=a(0),n=a(113),c=a(20),i=a(4);const l=Object(s.forwardRef)(((e,t)=>{let{id:a,label:s,children:l,error:r,placeholder:o,leadingIcon:d,type:j,component:b,...x}=e,h=a||s&&s.replace(/\s/g,"")||"formInput"+Math.random();return Object(i.jsx)("div",{className:"sdInputFields",children:Object(i.jsxs)(n.a.Group,{controlId:h,children:[Object(i.jsxs)(n.a.Label,{children:[" ",s," "]}),Object(i.jsx)(n.a.Control,{placeholder:b?"":o||s,ref:t,type:j,...x,children:l}),b&&Object(i.jsxs)("span",{className:"component position-absolute",children:[" ",b," "]}),d&&Object(i.jsxs)("span",{className:"leadingIcon position-absolute",children:[" ",d.replace('"',"")," "]}),r&&Object(i.jsx)(c.a,{color:"dangerText",size:"xSmall",text:r})]})})}));t.b=Object(s.memo)(l);const r=e=>{let{id:t,label:a,...s}=e,c=t||a&&a.replace(/\s/g,"")||"formInput"+Math.random();return Object(i.jsx)("div",{className:"sdInputFields",children:Object(i.jsx)("div",{className:"checkBox customChechbox",children:Object(i.jsx)(n.a.Group,{controlId:c,children:Object(i.jsx)(n.a.Check,{type:"checkbox",label:a,...s,className:"p-0"})})})})}},151:function(e,t,a){"use strict";var s=a(146),n=(a(153),a(29)),c=a.p+"static/media/Search.5d68d6da.svg",i=a(4);t.a=e=>{let{filterText:t,onFilter:a,onClear:l,placeholder:r,className:o}=e;return Object(i.jsxs)("div",{className:"searchCrossButon",children:[Object(i.jsx)(s.b,{id:"search",type:"text",placeholder:r,"aria-label":"Search Input",value:t,onChange:a,className:o}),Object(i.jsx)("div",{className:"inputSearchIcon",children:Object(i.jsx)(n.a,{src:c,name:"Search Icon",className:"img-fluid"})})]})}},153:function(e,t,a){},1534:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a(35),c=a(1491),i=a(141),l=a(1535),r=a(189),o=a(151),d=a(29),j=a(174),b=a(20),x=a(269),h=a(132),p=a(113),m=a(121),O=a(124),u=a(8),g=(a(365),a(117)),v=a(4);t.default=Object(n.c)()((e=>{var t,a,n,f,N,P,C,y,w,k,I,S,R;const{brokerdetailId:T}=Object(u.useParams)(),[D,z]=Object(s.useState)(null),[W,A]=Object(s.useState)([]);console.log(W,"broker_data");const[L,B]=Object(s.useState)(!1),[F,_]=Object(s.useState)(!0),H=Object(s.useCallback)((()=>{Object(g.kb)({brokerId:T}).then((e=>{console.log(e,"response"),_(!1),e&&(console.log(e,"kkkhkhkh"),e&&A(e.data))})).catch((e=>{_(!1)}))}),[g.kb,T]);Object(s.useEffect)((()=>{H()}),[H]);const[G,E]=Object(s.useState)(""),[M,V]=Object(s.useState)(!1),J=()=>Object(v.jsx)("div",{className:"d-flex justify-content-center tableBottom"}),Y=Object(s.useMemo)((()=>Object(v.jsx)(o.a,{onFilter:e=>E(e.target.value),onClear:()=>{G&&(V(!M),E(""))},filterText:G,placeholder:"Search here"})),[G,M]);return Object(v.jsx)(v.Fragment,{children:Object(v.jsx)("div",{className:"dashboard container-fluid12",children:Object(v.jsxs)(c.a,{children:[Object(v.jsx)(i.a,{lg:12,children:Object(v.jsxs)("div",{className:"authorContact mt-4",children:[Object(v.jsxs)("div",{className:"d-flex",children:[Object(v.jsx)("div",{className:"author-detail",children:Object(v.jsx)(d.a,{name:"author",className:"object-cover",src:j.a})}),Object(v.jsxs)("div",{className:"ml-3 mt-2",children:[Object(v.jsx)("div",{className:"broker-name",size:"large",fontWeight:"mediumbold",children:Object(v.jsxs)("p",{children:[null===W||void 0===W||null===(t=W.resourceData)||void 0===t?void 0:t.name,Object(v.jsx)("span",{children:"(4 Yrs)"})]})}),Object(v.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[Object(v.jsx)(x.a,{rating:""})," ",Object(v.jsx)(b.a,{size:"xSmall",fontWeight:"smbold",color:"TaupeGrey",text:"(0) customers",className:"ml-3"})]}),Object(v.jsx)(b.a,{size:"xSmall",fontWeight:"smbold",text:"Joined on: Aug 20, 2017"})]})]}),Object(v.jsxs)("div",{className:"sell-rent-status",children:[Object(v.jsxs)("div",{className:"sell-rent-box d-flex",children:[Object(v.jsxs)(l.a,{className:"table_sell-rent",children:[Object(v.jsxs)("tr",{children:[Object(v.jsx)("th",{children:Object(v.jsxs)("p",{children:["Sell",Object(v.jsx)("span",{children:" Last 90 days"})]})}),Object(v.jsx)("th",{children:Object(v.jsxs)("p",{children:["rent",Object(v.jsx)("span",{children:" Last 90 days"})]})})]}),Object(v.jsxs)("tr",{children:[Object(v.jsx)("td",{children:Object(v.jsxs)("div",{className:"d-flex",children:[Object(v.jsxs)("div",{children:[Object(v.jsx)("p",{children:"Active Cust."}),Object(v.jsx)("span",{children:"10"})]}),Object(v.jsxs)("div",{children:[Object(v.jsx)("p",{children:"Visits"}),Object(v.jsx)("span",{children:"100"})]})]})}),Object(v.jsx)("td",{children:Object(v.jsxs)("div",{className:"d-flex",children:[Object(v.jsxs)("div",{children:[Object(v.jsx)("p",{children:"Active Cust."}),Object(v.jsx)("span",{children:"10"})]}),Object(v.jsxs)("div",{children:[Object(v.jsx)("p",{children:"Visits"}),Object(v.jsx)("span",{children:"100"})]})]})})]})]}),Object(v.jsxs)(l.a,{className:"chat_date",children:[Object(v.jsx)("tr",{children:Object(v.jsx)("th",{children:Object(v.jsxs)("p",{children:["cHAT",Object(v.jsx)("span",{children:" Last 90 days "})]})})}),Object(v.jsx)("tr",{children:Object(v.jsx)("td",{children:Object(v.jsx)("div",{className:"d-flex",children:Object(v.jsxs)("div",{children:[Object(v.jsx)("p",{children:"Active Cust."}),Object(v.jsx)("span",{children:"10"})]})})})})]})]}),Object(v.jsx)("div",{})]})]})}),Object(v.jsxs)(i.a,{lg:12,children:[Object(v.jsxs)("div",{className:"profession_details",children:[Object(v.jsx)("div",{className:"profession-name",children:Object(v.jsx)("div",{children:Object(v.jsx)("p",{className:"personal_name",children:"Profession Details"})})}),Object(v.jsxs)("div",{className:"mt-1 row",children:[Object(v.jsx)(i.a,{className:"",children:Object(v.jsxs)("div",{children:[Object(v.jsx)("p",{className:"detail-heading",children:"Locations Assigned"}),(null===W||void 0===W||null===(a=W.resourceData)||void 0===a?void 0:a.brokerlocation)&&(null===W||void 0===W||null===(n=W.resourceData)||void 0===n?void 0:n.brokerlocation.map(((e,t)=>Object(v.jsx)("p",{className:"details",children:e.locationName},t))))]})}),Object(v.jsx)(i.a,{className:"",children:Object(v.jsxs)("div",{children:[Object(v.jsx)("p",{className:"detail-heading",children:"Specialized In"}),Object(v.jsx)("p",{className:"details",children:(null===W||void 0===W||null===(f=W.resourceData)||void 0===f?void 0:f.specializedIn)&&W.resourceData.specializedIn.map(((e,t)=>t===W.resourceData.specializedIn.length-1&&Object(v.jsx)("p",{className:"details",children:e.specializedIn},t)))})]})}),Object(v.jsx)(i.a,{className:"",children:Object(v.jsxs)("div",{children:[Object(v.jsx)("p",{className:"detail-heading",children:"Services Offered"}),Object(v.jsx)("p",{className:"details",children:null===(N=W.resourceData)||void 0===N?void 0:N.serviceOffered})]})}),Object(v.jsx)(i.a,{className:"",children:Object(v.jsxs)("div",{children:[Object(v.jsx)("p",{className:"detail-heading",children:"Language Preferences"}),Object(v.jsx)("p",{className:"details",children:(null===W||void 0===W||null===(P=W.resourceData)||void 0===P?void 0:P.languagePreference)&&W.resourceData.languagePreference.slice(0,2).map(((e,t)=>Object(v.jsx)("p",{className:"details",children:e.languagePreference},t)))})]})}),Object(v.jsx)(i.a,{className:"",children:Object(v.jsxs)("div",{children:[Object(v.jsx)("p",{className:"detail-heading",children:"Rera Number"}),Object(v.jsx)("p",{className:"details",children:null===W||void 0===W||null===(C=W.resourceData)||void 0===C?void 0:C.reraNumber})]})}),Object(v.jsx)(i.a,{className:"",children:Object(v.jsxs)("div",{children:[Object(v.jsx)("p",{className:"detail-heading",children:"Deals In"}),Object(v.jsx)("p",{className:"details",children:null===W||void 0===W||null===(y=W.resourceData)||void 0===y?void 0:y.dealsInNewProject})]})})]})]}),Object(v.jsx)("div",{className:"separator mt-4"}),Object(v.jsxs)("div",{className:"personal_details",children:[Object(v.jsx)("div",{className:"personal_name",children:Object(v.jsx)("p",{children:"Personal Details"})}),Object(v.jsxs)("div",{className:"mt-1 row",children:[Object(v.jsx)(i.a,{className:"",children:Object(v.jsxs)("div",{children:[Object(v.jsx)("p",{className:"detail-heading",children:"Phone Number"}),Object(v.jsx)("p",{className:"details",children:null===W||void 0===W||null===(w=W.resourceData)||void 0===w?void 0:w.phoneNumber})]})}),Object(v.jsx)(i.a,{className:"",children:Object(v.jsxs)("div",{children:[Object(v.jsx)("p",{className:"detail-heading",children:"Date of Birth"}),Object(v.jsx)("p",{className:"details",children:null===W||void 0===W||null===(k=W.resourceData)||void 0===k?void 0:k.dob})]})}),Object(v.jsx)(i.a,{className:"",children:Object(v.jsxs)("div",{children:[Object(v.jsx)("p",{className:"detail-heading",children:"Email"}),Object(v.jsx)("p",{className:"details",children:null===W||void 0===W||null===(I=W.resourceData)||void 0===I?void 0:I.email})]})}),Object(v.jsx)(i.a,{className:"",children:Object(v.jsxs)("div",{children:[Object(v.jsx)("p",{className:"detail-heading",children:"Company Details "}),Object(v.jsx)("p",{className:"details",children:(null===W||void 0===W||null===(S=W.resourceData)||void 0===S?void 0:S.companyName)+","+(null===W||void 0===W||null===(R=W.resourceData)||void 0===R?void 0:R.companyAddress)})]})})]})]})]}),Object(v.jsx)(i.a,{lg:12,children:Object(v.jsx)("div",{className:"heading mt-10",children:Object(v.jsx)("h6",{children:"PROPERTIES"})})}),Object(v.jsx)(i.a,{lg:12,children:Object(v.jsxs)("div",{className:"tableBox mb-5",children:[Object(v.jsxs)("div",{className:"d-flex flex-md-column flex-xl-row justify-content-xl-between align-items-xl-center align-items-left tableHeading",children:[Object(v.jsx)("div",{className:"text-nowrap mb-2",children:Object(v.jsx)(b.a,{size:"regular",fontWeight:"mediumbold",color:"secondryColor",text:"Properties Posted - 20"})}),Object(v.jsxs)("div",{className:"locationSelect d-flex align-items-xl-center align-items-left",children:[Y,Object(v.jsx)(O.a,{type:"submit",name:"Filters",className:"ml-2 me-3",size:"Small"}),Object(v.jsx)(p.a.Group,{controlId:"example",className:"w-40 userGrp ml-0"})]})]}),Object(v.jsx)(r.a,{children:Object(v.jsx)(m.a,{columns:[{name:"Posted On",selector:"Posted On",maxWidth:"550px",sortable:!0,center:!0},{name:"Posted for",selector:"Posted for",sortable:!0,maxWidth:"200px",center:!1},{name:"Location",selector:"Location",sortable:!1,maxWidth:"200px",center:!1},{name:"Plan",selector:"Plan",sortable:!0,maxWidth:"100px",center:!1},{name:"Config.",selector:"Config.",sortable:!1,maxWidth:"100px",center:!0},{name:"Status",selector:"Status",sortable:!1,maxWidth:"150px",center:!0},{name:"Action",selector:"Action",sortable:!1,maxWidth:"150px",center:!0}],paginationComponent:e=>Object(v.jsx)(h.a,{...e,PaginationActionButton:J}),paginationRowsPerPageOptions:[8,16,24,32,40,48,56,64,72,80],paginationPerPage:8,perPageOptions:[8,16,24,32,40,48,56,64,72,80],filterText:G,subHeaderComponent:Y,persistTableHead:"true",filterComponent:Y})})]})})]})})})}))},269:function(e,t,a){"use strict";a(0);var s=a(270),n=(a(271),a(4));t.a=e=>Object(n.jsx)(s.Rating,{readonly:!0,initialValue:e.rating,size:30,className:e.className})},271:function(e,t,a){},365:function(e,t,a){}}]);