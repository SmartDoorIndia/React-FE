(this.webpackJsonpsmartdoor=this.webpackJsonpsmartdoor||[]).push([[91],{1536:function(e,l,a){"use strict";a.r(l);var s=a(0),c=a(35),t=a(1494),i=a(143),o=a(29),d=a(176),r=a(20),n=a(126),j=(a(367),a(34)),b=a(119),u=a(8),m=a(4);l.default=Object(c.c)()((e=>{var l,a,c,h,v,x,O,p,g,f,N,y,D,z,S,k,C,W;const{brokerdetailId:w}=Object(u.useParams)(),[T,I]=Object(s.useState)(!0),[G,P]=Object(s.useState)([]);console.log(G,"approved");const A=Object(u.useHistory)(),F=Object(u.useHistory)(),B=Object(s.useCallback)((()=>{Object(b.nb)({brokerId:w}).then((e=>{I(!1),e.data&&e.data&&P(e.data)})).catch((e=>{I(!0)}))}),[b.nb,w]);return Object(s.useEffect)((()=>{B()}),[B]),Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)("div",{className:"dashboard container-fluid12",children:[Object(m.jsx)(t.a,{children:Object(m.jsx)(i.a,{lg:12,children:Object(m.jsx)("div",{className:"authorContact mt-4",children:Object(m.jsxs)("div",{className:"d-flex",children:[Object(m.jsx)("div",{className:"author",children:Object(m.jsx)(o.a,{name:"author",className:"object-cover",src:d.a})}),Object(m.jsxs)("div",{className:"ml-3 mt-2",children:[Object(m.jsx)("p",{className:"bold",size:"large",fontWeight:"mediumbold",children:null===(l=G.resourceData)||void 0===l?void 0:l.name}),Object(m.jsx)("p",{size:"xSmall",fontWeight:"smbold",children:null!==(a=Object(j.f)(null===(c=G.resourceData)||void 0===c?void 0:c.joinedDate))&&void 0!==a?a:""})]})]})})})}),Object(m.jsxs)("div",{className:"hjkfh mt-5 ",children:[Object(m.jsx)(r.a,{size:"large",fontWeight:"mediumbold",color:"secondryColor",text:"Profession Details"}),Object(m.jsxs)(t.a,{className:"mt-2",children:[Object(m.jsxs)(i.a,{children:[Object(m.jsx)(r.a,{size:"xSmall",fontWeight:"semibold",color:"TaupeGrey",text:"Location Assigned"}),Object(m.jsx)("div",{className:"details-heading d-flex",children:G&&G.resourceData&&Object(m.jsx)(m.Fragment,{children:(null===G||void 0===G||null===(h=G.resourceData.brokerlocation)||void 0===h?void 0:h.city)&&Object(m.jsx)("span",{className:"details-value",children:null===(v=G.resourceData)||void 0===v||null===(x=v.brokerlocation)||void 0===x?void 0:x.city})})})]}),Object(m.jsxs)(i.a,{children:[Object(m.jsx)(r.a,{size:"xSmall",fontWeight:"semibold",color:"TaupeGrey",text:"Specialized In"}),Object(m.jsx)("div",{className:"details-heading",children:Object(m.jsx)("p",{size:"Small","font-weight":"bold",color:"secondryColor",children:(null===G||void 0===G||null===(O=G.resourceData)||void 0===O?void 0:O.specializedIn)&&G.resourceData.specializedIn.map(((e,l)=>l===G.resourceData.specializedIn.length-1&&Object(m.jsx)("p",{className:"details-value",children:e.specializedIn},l)))})})]}),Object(m.jsxs)(i.a,{children:[Object(m.jsx)(r.a,{size:"xSmall",fontWeight:"semibold",color:"TaupeGrey",text:"Services Offered"}),Object(m.jsx)("div",{className:"details-heading d-flex",children:G&&G.resourceData&&Object(m.jsxs)(m.Fragment,{children:[(null===G||void 0===G||null===(p=G.resourceData)||void 0===p?void 0:p.rent)&&Object(m.jsx)("span",{className:"details-value",children:"Rent"}),((null===G||void 0===G||null===(g=G.resourceData)||void 0===g?void 0:g.sale)||(null===G||void 0===G||null===(f=G.resourceData)||void 0===f?void 0:f.buy))&&Object(m.jsx)("span",{className:"details-value",children:"Sell / Buy"})]})})]}),Object(m.jsxs)(i.a,{children:[Object(m.jsx)(r.a,{size:"xSmall",fontWeight:"semibold",color:"TaupeGrey",text:"Languages Preferences"}),Object(m.jsx)("div",{className:"details-heading",children:(null===G||void 0===G||null===(N=G.resourceData)||void 0===N?void 0:N.languagePreference)&&G.resourceData.languagePreference.map(((e,l)=>Object(m.jsx)("span",{className:"details-value ",children:e.languagePreference},l)))})]})]})]}),Object(m.jsxs)("div",{className:" mt-4 ",children:[Object(m.jsx)(r.a,{size:"large",fontWeight:"mediumbold",color:"secondryColor",text:"Personal Details"}),Object(m.jsxs)(t.a,{className:"mt-2",children:[Object(m.jsxs)(i.a,{children:[Object(m.jsx)(r.a,{size:"xSmall",fontWeight:"semibold",color:"TaupeGrey",text:"Phone Number"}),Object(m.jsx)("div",{className:"details-heading",children:Object(m.jsx)("p",{size:"Small","font-weight":"bold",color:"secondryColor",className:"details-value",children:null===G||void 0===G||null===(y=G.resourceData)||void 0===y?void 0:y.mobileNoForCustomer})})]}),Object(m.jsxs)(i.a,{children:[Object(m.jsx)(r.a,{size:"xSmall",fontWeight:"semibold",color:"TaupeGrey",text:"Date of Birth"}),Object(m.jsx)("div",{className:"details-heading",children:Object(m.jsx)("p",{size:"Small","font-weight":"bold",color:"secondryColor",className:"details-value",children:null===G||void 0===G||null===(D=G.resourceData)||void 0===D?void 0:D.dob})})]}),Object(m.jsxs)(i.a,{children:[Object(m.jsx)(r.a,{size:"xSmall",fontWeight:"semibold",color:"TaupeGrey",text:"Email"}),Object(m.jsx)("div",{className:"details-heading",children:Object(m.jsx)("p",{size:"Small","font-weight":"bold",color:"secondryColor",className:"details-value",children:null===G||void 0===G||null===(z=G.resourceData)||void 0===z?void 0:z.email})})]}),Object(m.jsxs)(i.a,{children:[Object(m.jsx)(r.a,{size:"xSmall",fontWeight:"semibold",color:"TaupeGrey",text:"Office Address"}),Object(m.jsx)("div",{className:"details-heading",children:Object(m.jsxs)("p",{className:"details-value approved-loca",children:[null!==G&&void 0!==G&&null!==(S=G.resourceData)&&void 0!==S&&S.companyName?(null===G||void 0===G||null===(k=G.resourceData)||void 0===k?void 0:k.companyName)+",":"",null!==G&&void 0!==G&&null!==(C=G.resourceData)&&void 0!==C&&C.companyAddress?null===G||void 0===G||null===(W=G.resourceData)||void 0===W?void 0:W.companyAddress:""]})})]})]})]}),Object(m.jsxs)("div",{className:" mt-4  d-flex ",children:[Object(m.jsx)("div",{className:"mr-2",children:Object(m.jsx)(n.a,{name:"Decline",varient:"lightBtn",size:"Small",color:"secondryColor",style:{height:"40px !important"},onClick:()=>{Object(b.lb)({brokerId:w,status:"Rejected"}),setTimeout((()=>{F.push("/admin/broker"),window.location.reload()}),1e3)},children:"Decline"})}),Object(m.jsx)("div",{className:"mr-2",children:Object(m.jsx)(n.a,{class:"btn Small white  primary",name:"Approve",onClick:()=>{Object(b.qb)({brokerId:w,status:"Approved"}),setTimeout((()=>{A.push("/admin/broker"),window.location.reload()}),1e3)},children:"Approve"})})]})]})})}))},367:function(e,l,a){}}]);