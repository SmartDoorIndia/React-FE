(this.webpackJsonpsmartdoor=this.webpackJsonpsmartdoor||[]).push([[43],{123:function(e,t,a){"use strict";var s=a(150),n=a.n(s),c=(a(128),a(0)),l=a(125),i=a(56),r=a(4);const o=Object(r.jsx)("img",{src:l.a,className:"ml-1",width:"10px",alt:"SHORT_ICON"}),d=Object(r.jsx)(i.b,{}),j=e=>{let{title:t,columns:a,data:s,pagination:c,progressPending:l,onChangePage:i,paginationComponent:j,paginationRowsPerPageOptions:h,paginationPerPage:x,sortIcon:m,progressComponent:O,striped:p,...u}=e;return Object(r.jsx)(n.a,{title:t,columns:a,data:s,pagination:!1!==c,highlightOnHover:!0,progressPending:l,onChangePage:i,striped:!1!==p,paginationComponent:j,paginationRowsPerPageOptions:h,paginationPerPage:x,customStyles:b,sortIcon:m||o,progressComponent:O||d,...u})},b={rows:{style:{borderBottomWidth:"0 !important","&:nth-child(even)":{backgroundColor:"#fff"},"&:nth-child(odd)":{backgroundColor:"#f8f3f5"}}},headCells:{style:{fontWeight:"700 !important",fontSize:".875rem",color:"#252525",justifyContent:"center","&:first-child":{minWidth:"70px",maxWidth:"100px"}}},cells:{style:{fontSize:".875rem",color:"#252525","&:first-child":{minWidth:"100px",maxWidth:"120px"}}}};t.a=Object(c.memo)(j)},125:function(e,t,a){"use strict";t.a=a.p+"static/media/sort-icon.a64bca1a.svg"},128:function(e,t,a){},132:function(e,t,a){},134:function(e,t,a){"use strict";var s,n,c,l,i,r,o,d,j,b,h,x=a(135),m=a(0),O=a(163),p=a(4);const u=function(){return Object(O.css)(s||(s=Object(x.a)(["\n    @media screen and (max-width: ","px) {\n      ","\n    }\n  "])),599,Object(O.css)(...arguments))},g=O.default.select(n||(n=Object(x.a)(["\n  cursor: pointer;\n  height: 24px;\n  min-width: 24px;\n  user-select: none;\n  padding-left: 8px;\n  padding-right: 12px;\n  box-sizing: content-box;\n  font-size: inherit;\n  color: inherit;\n  border: none;\n  background-color: transparent;\n  appearance: none;\n  direction: ltr;\n  &::-ms-expand {\n    display: none;\n  }\n  &:disabled::-ms-expand {\n    background: #f60;\n  }\n  option {\n    color: initial;\n  }\n"]))),v=O.default.div(c||(c=Object(x.a)(["\n  position: relative;\n  flex-shrink: 0;\n  font-size: inherit;\n  color: inherit;\n  margin-top: 1px;\n  svg {\n    top: 0;\n    right: 0;\n    color: inherit;\n    position: absolute;\n    fill: currentColor;\n    width: 24px;\n    height: 24px;\n    display: inline-block;\n    user-select: none;\n    pointer-events: none;\n  }\n"]))),f={rowsPerPageText:"Rows per page:",rangeSeparatorText:"of",noRowsPerPage:!1,selectAllRowsItem:!1,selectAllRowsItemText:"All"},N=O.default.nav(l||(l=Object(x.a)(["\n  display: flex;\n  flex: 1 1 auto;\n  // justify-content: flex-end;\n  align-items: center;\n  box-sizing: border-box;\n  padding-right: 8px;\n  padding-left: 8px;\n  width: 100%;\n  ",";\n"])),(e=>e.theme.pagination.style)),P=O.default.button(i||(i=Object(x.a)(["\n  position: relative;\n  display: block;\n  user-select: none;\n  border: none;\n  ",";\n  ",";\n"])),(e=>e.theme.pagination.pageButtonsStyle),(e=>e.isRTL&&"transform: scale(-1, -1)")),C=O.default.div(r||(r=Object(x.a)(["\n  display: flex;\n  align-items: center;\n  border-radius: 4px;\n  white-space: nowrap;\n  ",";\n"])),u(o||(o=Object(x.a)(["\n    width: 100%;\n    justify-content: space-around;\n  "])))),y=O.default.span(d||(d=Object(x.a)(["\n  flex-shrink: 1;\n  user-select: none;\n"]))),w=Object(O.default)(y)(j||(j=Object(x.a)(["\n  margin: 0 24px;\n"]))),k=Object(O.default)(y)(b||(b=Object(x.a)(["\n  margin: 0 4px;\n"]))),I=O.default.div(h||(h=Object(x.a)(["\n  margin: ",";\n  display: ",";\n\n  "])),(e=>e.margin),(e=>e.display)),S=(e,t)=>Math.ceil(e/t),D=e=>Object(p.jsx)(v,{children:Object(p.jsx)(g,{...e})});t.a=e=>{let{rowsPerPage:t,rowCount:a,onChangePage:s,onChangeRowsPerPage:n,currentPage:c,direction:l,paginationRowsPerPageOptions:i,paginationIconLastPage:r,paginationIconFirstPage:o,paginationIconNext:d,paginationIconPrevious:j,paginationComponentOptions:b,PaginationActionButton:h}=e;const x=!1,O=S(a,t),u=c*t,g=u-t+1,v=1===c,y=c===O,R={...f,...b},T=c===O?"".concat(g,"-").concat(a," ").concat(R.rangeSeparatorText," ").concat(a):"".concat(g,"-").concat(u," ").concat(R.rangeSeparatorText," ").concat(a),z=Object(m.useCallback)((()=>s(c-1)),[c,s]),W=Object(m.useCallback)((()=>s(c+1)),[c,s]),A=Object(m.useCallback)((()=>s(1)),[s]),L=Object(m.useCallback)((()=>s(S(a,t))),[s,a,t]),B=Object(m.useCallback)((e=>{let{target:t}=e;return n(Number(t.value),c)}),[c,n]),F=i.map((e=>Object(p.jsx)("option",{value:e,children:e},e)));R.selectAllRowsItem&&F.push(Object(p.jsx)("option",{value:a,children:R.selectAllRowsItemText},-1));const H=Object(p.jsx)(D,{onChange:B,defaultValue:t,"aria-label":R.rowsPerPageText,children:F});return Object(p.jsxs)(N,{className:"rdt_Pagination",children:[Object(p.jsx)(I,{margin:"0 auto",children:" "}),Object(p.jsx)(I,{margin:"0 auto",children:h?Object(p.jsx)(h,{}):null}),Object(p.jsxs)(I,{style:{display:"contents"},children:[!R.noRowsPerPage&&Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(k,{children:R.rowsPerPageText}),H]}),Object(p.jsx)(w,{children:T}),Object(p.jsxs)(C,{children:[Object(p.jsx)(P,{id:"pagination-first-page",type:"button","aria-label":"First Page","aria-disabled":v,onClick:A,disabled:v,isRTL:x,children:o}),Object(p.jsx)(P,{id:"pagination-previous-page",type:"button","aria-label":"Previous Page","aria-disabled":v,onClick:z,disabled:v,isRTL:x,children:j}),!1,Object(p.jsx)(P,{id:"pagination-next-page",type:"button","aria-label":"Next Page","aria-disabled":y,onClick:W,disabled:y,isRTL:x,children:d}),Object(p.jsx)(P,{id:"pagination-last-page",type:"button","aria-label":"Last Page","aria-disabled":y,onClick:L,disabled:y,isRTL:x,children:r})]})]})]})}},148:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));a(132);var s=a(0),n=a(115),c=a(20),l=a(4);const i=Object(s.forwardRef)(((e,t)=>{let{id:a,label:s,children:i,error:r,placeholder:o,leadingIcon:d,type:j,component:b,...h}=e,x=a||s&&s.replace(/\s/g,"")||"formInput"+Math.random();return Object(l.jsx)("div",{className:"sdInputFields",children:Object(l.jsxs)(n.a.Group,{controlId:x,children:[Object(l.jsxs)(n.a.Label,{children:[" ",s," "]}),Object(l.jsx)(n.a.Control,{placeholder:b?"":o||s,ref:t,type:j,...h,children:i}),b&&Object(l.jsxs)("span",{className:"component position-absolute",children:[" ",b," "]}),d&&Object(l.jsxs)("span",{className:"leadingIcon position-absolute",children:[" ",d.replace('"',"")," "]}),r&&Object(l.jsx)(c.a,{color:"dangerText",size:"xSmall",text:r})]})})}));t.b=Object(s.memo)(i);const r=e=>{let{id:t,label:a,...s}=e,c=t||a&&a.replace(/\s/g,"")||"formInput"+Math.random();return Object(l.jsx)("div",{className:"sdInputFields",children:Object(l.jsx)("div",{className:"checkBox customChechbox",children:Object(l.jsx)(n.a.Group,{controlId:c,children:Object(l.jsx)(n.a.Check,{type:"checkbox",label:a,...s,className:"p-0"})})})})}},153:function(e,t,a){"use strict";var s=a(148),n=(a(155),a(29)),c=a.p+"static/media/Search.5d68d6da.svg",l=a(4);t.a=e=>{let{filterText:t,onFilter:a,onClear:i,placeholder:r,className:o}=e;return Object(l.jsxs)("div",{className:"searchCrossButon",children:[Object(l.jsx)(s.b,{id:"search",type:"text",placeholder:r,"aria-label":"Search Input",value:t,onChange:a,className:o}),Object(l.jsx)("div",{className:"inputSearchIcon",children:Object(l.jsx)(n.a,{src:c,name:"Search Icon",className:"img-fluid"})})]})}},155:function(e,t,a){},1585:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a(35),c=a(1494),l=a(143),i=a(1537),r=a(191),o=a(153),d=a(29),j=a(176),b=a(20),h=a(271),x=a(134),m=a(115),O=a(123),p=a(126),u=a(8),g=a(34),v=a(1560),f=a(119),N=a(4);var P=e=>{const t=e.modalData,[a,n]=Object(s.useState)({}),{brokerdetailId:c}=Object(u.useParams)();return console.log("feedback modal:",t),Object(s.useEffect)((()=>{(async()=>{if(c)try{const e=await Object(f.kb)({brokerId:c});n(e.data.resourceData)}catch(e){console.log(e)}})()}),[c]),Object(N.jsx)(N.Fragment,{children:Object(N.jsx)(v.a,{show:e.show,onHide:e.handleClose,className:"mediumModal modal-dialog-centered","aria-labelledby":"contained-modal-title-vcenter",centered:!0,children:Object(N.jsx)(v.a.Body,{children:Object(N.jsx)("div",{children:Object(N.jsx)("h3",{children:"Reason For Holding"})})})})})};a(367);t.default=Object(n.c)()((e=>{var t,a,n,v,C,y,w,k,I,S,D,R,T,z,W;const[A,L]=Object(s.useState)(!1);console.log(A,"show");const B=()=>L(!0),[F,H]=Object(s.useState)();console.log(F,"modaldata");const{brokerdetailId:_}=Object(u.useParams)();console.log(_,"brokeriddddd");const[M,E]=Object(s.useState)(null),[G,V]=Object(s.useState)([]);console.log(G,"broker_data");const[J,Y]=Object(s.useState)(!0),q=()=>L(!1),K=Object(s.useCallback)((()=>{Object(f.kb)({brokerId:_}).then((e=>{Y(!1),e&&e&&V(e.data)})).catch((e=>{Y(!1)}))}),[f.kb,_]);Object(s.useEffect)((()=>{K()}),[K]);const[Q,U]=Object(s.useState)(""),[X,Z]=Object(s.useState)(!1),$=()=>Object(N.jsx)("div",{className:"d-flex justify-content-center tableBottom"}),ee=Object(s.useMemo)((()=>Object(N.jsx)(o.a,{onFilter:e=>U(e.target.value),onClear:()=>{Q&&(Z(!X),U(""))},filterText:Q,placeholder:"Search here"})),[Q,X]),te=function(){H(_)};return Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)(P,{show:A,handleShow:B,handleClose:q,modalData:F,closeModal:te,history:{goBack:te}}),Object(N.jsx)("div",{className:"dashboard container-fluid12",children:Object(N.jsxs)(c.a,{children:[Object(N.jsx)(l.a,{lg:12,children:Object(N.jsxs)("div",{className:"authorContact",children:[Object(N.jsxs)("div",{className:"d-flex",children:[Object(N.jsx)("div",{className:"author-detail",children:Object(N.jsx)(d.a,{name:"author",className:"object-cover",src:j.a})}),Object(N.jsxs)("div",{className:"ml-3 mt-2",children:[Object(N.jsx)("div",{className:"broker-name",size:"large",fontWeight:"mediumbold",children:Object(N.jsxs)("p",{children:[null===G||void 0===G||null===(t=G.resourceData)||void 0===t?void 0:t.name,Object(N.jsx)("span",{children:"(4 Yrs)"})]})}),Object(N.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[Object(N.jsx)(h.a,{rating:""})," ",Object(N.jsx)(b.a,{size:"xSmall",fontWeight:"smbold",color:"TaupeGrey",text:"(0) customers",className:"ml-3"})]}),Object(N.jsx)("p",{size:"xSmall",fontWeight:"smbold",children:null!==(a=Object(g.f)(null===G||void 0===G||null===(n=G.resourceData)||void 0===n?void 0:n.joinedDate))&&void 0!==a?a:""})]})]}),Object(N.jsx)("div",{className:"sell-rent-status",children:Object(N.jsxs)("div",{className:"sell-rent-box d-flex",children:[Object(N.jsxs)(i.a,{className:"table_sell-rent",children:[Object(N.jsxs)("tr",{children:[Object(N.jsx)("th",{children:Object(N.jsxs)("p",{children:["Sell",Object(N.jsx)("span",{children:" Last 90 days"})]})}),Object(N.jsx)("th",{children:Object(N.jsxs)("p",{children:["rent",Object(N.jsx)("span",{children:" Last 90 days"})]})})]}),Object(N.jsxs)("tr",{children:[Object(N.jsx)("td",{children:Object(N.jsxs)("div",{className:"d-flex",children:[Object(N.jsxs)("div",{children:[Object(N.jsx)("p",{children:"Active Cust."}),Object(N.jsx)("span",{children:"10"})]}),Object(N.jsxs)("div",{children:[Object(N.jsx)("p",{children:"Visits"}),Object(N.jsx)("span",{children:"100"})]})]})}),Object(N.jsx)("td",{children:Object(N.jsxs)("div",{className:"d-flex",children:[Object(N.jsxs)("div",{children:[Object(N.jsx)("p",{children:"Active Cust."}),Object(N.jsx)("span",{children:"10"})]}),Object(N.jsxs)("div",{children:[Object(N.jsx)("p",{children:"Visits"}),Object(N.jsx)("span",{children:"100"})]})]})})]})]}),Object(N.jsxs)(i.a,{className:"chat_date",children:[Object(N.jsx)("tr",{children:Object(N.jsx)("th",{children:Object(N.jsxs)("p",{children:["cHAT",Object(N.jsx)("span",{children:" Last 90 days "})]})})}),Object(N.jsx)("tr",{children:Object(N.jsx)("td",{children:Object(N.jsx)("div",{className:"d-flex",children:Object(N.jsxs)("div",{children:[Object(N.jsx)("p",{children:"Active Cust."}),Object(N.jsx)("span",{children:"10"})]})})})})]}),Object(N.jsx)("div",{className:"brokerdetail-hold",children:Object(N.jsx)(p.a,{className:"hold-btn",name:"Hold",onClick:()=>{B(),H(_)}})})]})})]})}),Object(N.jsxs)(l.a,{lg:12,children:[Object(N.jsxs)("div",{className:"profession_details",children:[Object(N.jsx)("div",{className:"profession-name",children:Object(N.jsx)("div",{children:Object(N.jsx)("p",{className:"personal_name",children:"Profession Details"})})}),Object(N.jsxs)("div",{className:"mt-1 row",children:[Object(N.jsx)(l.a,{className:"",children:Object(N.jsxs)("div",{children:[Object(N.jsx)("p",{className:"detail-heading",children:"Locations Assigned"}),(null===G||void 0===G||null===(v=G.resourceData)||void 0===v?void 0:v.brokerlocation)&&(null===G||void 0===G||null===(C=G.resourceData)||void 0===C?void 0:C.brokerlocation.map(((e,t)=>Object(N.jsx)("p",{className:"details",children:e.locationName},t))))]})}),Object(N.jsx)(l.a,{className:"",children:Object(N.jsxs)("div",{children:[Object(N.jsx)("p",{className:"detail-heading",children:"Specialized In"}),Object(N.jsx)("p",{className:"details",children:(null===G||void 0===G||null===(y=G.resourceData)||void 0===y?void 0:y.specializedIn)&&G.resourceData.specializedIn.map(((e,t)=>t===G.resourceData.specializedIn.length-1&&Object(N.jsx)("p",{className:"details",children:e.specializedIn},t)))})]})}),Object(N.jsx)(l.a,{className:"",children:Object(N.jsxs)("div",{children:[Object(N.jsx)("p",{className:"detail-heading",children:"Services Offered"}),Object(N.jsx)("p",{className:"details",children:null===(w=G.resourceData)||void 0===w?void 0:w.serviceOffered})]})}),Object(N.jsx)(l.a,{className:"",children:Object(N.jsxs)("div",{children:[Object(N.jsx)("p",{className:"detail-heading",children:"Language Preferences"}),Object(N.jsx)("div",{className:"langauge-part",children:(null===G||void 0===G||null===(k=G.resourceData)||void 0===k?void 0:k.languagePreference)&&G.resourceData.languagePreference.slice(0,2).map(((e,t)=>Object(N.jsx)("div",{className:"language-data",children:e.languagePreference},t)))})]})}),Object(N.jsx)(l.a,{className:"",children:Object(N.jsxs)("div",{children:[Object(N.jsx)("p",{className:"detail-heading",children:"Rera Number"}),Object(N.jsx)("p",{className:"details",children:null===G||void 0===G||null===(I=G.resourceData)||void 0===I?void 0:I.reraNumber})]})}),Object(N.jsx)(l.a,{className:"",children:Object(N.jsxs)("div",{children:[Object(N.jsx)("p",{className:"detail-heading",children:"Deals In"}),Object(N.jsx)("p",{className:"details",children:null===G||void 0===G||null===(S=G.resourceData)||void 0===S?void 0:S.dealsInNewProject})]})})]})]}),Object(N.jsx)("div",{className:"separator mt-4"}),Object(N.jsxs)("div",{className:"personal_details",children:[Object(N.jsx)("div",{className:"personal_name",children:Object(N.jsx)("p",{children:"Personal Details"})}),Object(N.jsxs)("div",{className:"mt-1 row",children:[Object(N.jsx)(l.a,{className:"",children:Object(N.jsxs)("div",{children:[Object(N.jsx)("p",{className:"detail-heading",children:"Phone Number"}),Object(N.jsx)("p",{className:"details",children:null===G||void 0===G||null===(D=G.resourceData)||void 0===D?void 0:D.phoneNumber})]})}),Object(N.jsx)(l.a,{className:"",children:Object(N.jsxs)("div",{children:[Object(N.jsx)("p",{className:"detail-heading",children:"Date of Birth"}),Object(N.jsx)("p",{className:"details",children:null===G||void 0===G||null===(R=G.resourceData)||void 0===R?void 0:R.dob})]})}),Object(N.jsx)(l.a,{className:"",children:Object(N.jsxs)("div",{children:[Object(N.jsx)("p",{className:"detail-heading",children:"Email"}),Object(N.jsx)("p",{className:"details",children:null===G||void 0===G||null===(T=G.resourceData)||void 0===T?void 0:T.email})]})}),Object(N.jsx)(l.a,{className:"",children:Object(N.jsxs)("div",{children:[Object(N.jsx)("p",{className:"detail-heading",children:"Company Details "}),Object(N.jsx)("p",{className:"details",children:(null===G||void 0===G||null===(z=G.resourceData)||void 0===z?void 0:z.companyName)+","+(null===G||void 0===G||null===(W=G.resourceData)||void 0===W?void 0:W.companyAddress)})]})})]})]})]}),Object(N.jsx)(l.a,{lg:12,children:Object(N.jsx)("div",{className:"heading mt-10",children:Object(N.jsx)("h6",{children:"PROPERTIES"})})}),Object(N.jsx)(l.a,{lg:12,children:Object(N.jsxs)("div",{className:"tableBox mb-5",children:[Object(N.jsxs)("div",{className:"d-flex flex-md-column flex-xl-row justify-content-xl-between align-items-xl-center align-items-left tableHeading",children:[Object(N.jsx)("div",{className:"text-nowrap mb-2",children:Object(N.jsx)(b.a,{size:"regular",fontWeight:"mediumbold",color:"secondryColor",text:"Properties Posted - 20"})}),Object(N.jsxs)("div",{className:"locationSelect d-flex align-items-xl-center align-items-left",children:[ee,Object(N.jsx)(p.a,{type:"submit",name:"Filters",className:"ml-2 me-3",size:"Small"}),Object(N.jsx)(m.a.Group,{controlId:"example",className:"w-40 userGrp ml-0"})]})]}),Object(N.jsx)(r.a,{children:Object(N.jsx)(O.a,{columns:[{name:"Posted On",selector:"Posted On",maxWidth:"550px",sortable:!0,center:!0},{name:"Posted for",selector:"Posted for",sortable:!0,maxWidth:"200px",center:!1},{name:"Location",selector:"Location",sortable:!1,maxWidth:"200px",center:!1},{name:"Plan",selector:"Plan",sortable:!0,maxWidth:"100px",center:!1},{name:"Config.",selector:"Config.",sortable:!1,maxWidth:"100px",center:!0},{name:"Status",selector:"Status",sortable:!1,maxWidth:"150px",center:!0},{name:"Action",selector:"Action",sortable:!1,maxWidth:"150px",center:!0}],paginationComponent:e=>Object(N.jsx)(x.a,{...e,PaginationActionButton:$}),paginationRowsPerPageOptions:[8,16,24,32,40,48,56,64,72,80],paginationPerPage:8,perPageOptions:[8,16,24,32,40,48,56,64,72,80],filterText:Q,subHeaderComponent:ee,persistTableHead:"true",filterComponent:ee})})]})})]})})]})}))},271:function(e,t,a){"use strict";a(0);var s=a(272),n=(a(273),a(4));t.a=e=>Object(n.jsx)(s.Rating,{readonly:!0,initialValue:e.rating,size:30,className:e.className})},273:function(e,t,a){},367:function(e,t,a){}}]);