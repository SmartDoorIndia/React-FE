(this.webpackJsonpsmartdoor=this.webpackJsonpsmartdoor||[]).push([[70],{1135:function(e,t,c){},1563:function(e,t,c){"use strict";c.r(t);var o=c(0),r=(c(512),c.p+"static/media/doc-icon.42541851.svg"),d=c.p+"static/media/pdf-icon.78f54e41.svg",s=c(517),n=(c(1135),c(1558)),a=c(34),i=c(263),l=c(1136),m=c.n(l),p=c(4);class u extends o.Component{render(){return Object(p.jsx)(m.a,{fileType:this.props.fileType[0],filePath:this.props.filePath,onError:this.onError})}onError(e){console.log("error here!!!")}}var j=u,A=c(29),b=c(117),h=c(124);var y=e=>{const t=null!==e&&void 0!==e&&e.propertyId?null===e||void 0===e?void 0:e.propertyId:null,c=null!==e&&void 0!==e&&e.userId?null===e||void 0===e?void 0:e.userId:null,[l,m]=Object(o.useState)([]),u=Object(a.j)("authData"),[y,x]=Object(o.useState)(""),[g,v]=Object(o.useState)({d_name:"",d_url:"",d_verify:""}),[O,f]=Object(o.useState)(!1),I=Object(o.useCallback)((e=>{console.log(e,"unverify docs"),Object(b.Uc)({docId:e.d_id}).then((t=>{if(t.data){f(!1);const t=l.map((t=>(t.docId===e.d_id&&(t.documentApprovedByAdmin=!t.documentApprovedByAdmin),t)));m((e=>t))}})).catch((e=>{console.log("error",e)}))}),[l]),B=Object(o.useCallback)((e=>{console.log(e,"verify docs"),Object(b.Vc)({docId:e.d_id}).then((t=>{if(t.data){f(!1);const t=l.map((t=>(t.docId===e.d_id&&(t.documentApprovedByAdmin=!t.documentApprovedByAdmin),t)));m(t)}})).catch((e=>{console.log("error",e)}))}),[l]),C=Object(o.useCallback)(((e,t)=>{Object(b.dc)({propertyId:e,userId:t}).then((e=>{e.data&&(console.log(e.data.resourceData.propertyDocsResp,"rrrrrrrrrrrrrrrrrrrrrr"),m(e.data.resourceData.propertyDocsResp),x(e.data.resourceData.status))})).catch((e=>{console.log("error",e)}))}),[t,b.dc]);return Object(o.useEffect)((()=>{console.log(l,"propertydocument"),C(t,c)}),[t,C]),Object(p.jsxs)(p.Fragment,{children:[l.length>0?l.map(((e,t)=>{return Object(p.jsxs)("div",{className:"d-flex justify-content-between align-items-center doc_strip p-3",children:[Object(p.jsxs)("div",{className:"d-flex align-items-center cursor-pointer",onClick:()=>{f(!0),v({d_id:e.docId,d_name:e.docName,d_url:e.docURL,d_verify:e.verify,d_documentApprovedByAdmin:e.documentApprovedByAdmin})},children:[Object(p.jsx)(A.a,{name:"DocumentImage",src:(c=e.docURL,console.log("urlstr",c),Object(a.e)(c).includes("pdf")?d:Object(a.e)(c).includes("docx")?r:c),className:"Document_img"}),Object(p.jsx)("div",{className:"ml-3",children:Object(p.jsx)("p",{className:"mb-0 fs-14 font-weight-bold",children:e.docName})})]}),Object(p.jsx)("div",{children:null!==e&&void 0!==e&&e.documentApprovedByAdmin?Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("span",{className:"text-muted mr-3 fs-14",children:e.documentApprovedByAdmin?"Verified by Admin":""}),Object(p.jsx)(i.a,{id:e.docId,value:"verify".concat(t+1),checked:e.documentApprovedByAdmin})]}):null}),Object(p.jsxs)("div",{children:[Object(p.jsx)("span",{className:"text-muted mr-3 fs-14",children:e.verify?"Verified by Executive":""}),null!==e&&void 0!==e&&e.verify?Object(p.jsx)(i.a,{id:e.docId,value:"verify".concat(t+1),checked:e.verify}):null]})]},t);var c})):Object(p.jsxs)("div",{className:"p-3",children:[Object(p.jsx)("h5",{children:" No Documents to display "})," "]}),Object(p.jsxs)(n.a,{show:O,onHide:()=>f(!1),className:"vid_modal",centered:!0,style:{height:"100%"},children:[Object(p.jsxs)(n.a.Header,{style:{margin:"5px"},children:[Object(p.jsx)("p",{style:{margin:"10px"},children:g.d_name}),Object(p.jsx)("button",{className:"modalcross-btn",onClick:()=>f(!1),children:Object(p.jsx)(A.a,{name:"CROSS_ICON",src:s.a})})]}),Object(p.jsx)(n.a.Body,{style:{marginLeft:"10px",marginRight:"10px",paddingLeft:"10px",paddingRight:"10px"},children:(N=g.d_url,console.log("handleShowDocument"),Object(a.e)(N).includes("pdf")?Object(p.jsx)("iframe",{title:"Document",loading:"lazy",width:"100%",height:"600px",frameBorder:"0",src:"https://docs.google.com/gview?url=".concat(N,"&embedded=true")}):Object(a.e)(N).includes("docx")?Object(p.jsx)(j,{fileType:Object(a.e)(N),filePath:N}):Object(p.jsx)(A.a,{name:"DocumentImage",src:N}))}),Object(p.jsx)(n.a.Footer,{style:{margin:"5px",display:"flex",justifyContent:"center"},children:Object(p.jsx)("div",{children:3!==u.roleId&&16!==u.roleId||"PUBLISHED"===y?null:!1===g.d_documentApprovedByAdmin?Object(p.jsx)(h.a,{name:"Verify",varient:"primary",type:"submit",size:"Small",color:"white",onClick:()=>B(g)}):Object(p.jsx)(h.a,{name:"Unverify",varient:"primary",type:"submit",size:"Small",color:"white",onClick:()=>I(g)})})})]})]});var N};t.default=e=>{const t=e.location.state&&e.location.state.propertyDocsResp?e.location.state.propertyDocsResp:[],c=e.location.state.propertyId?e.location.state.propertyId:null,o=e.location.state.userId?e.location.state.userId:null;return Object(p.jsx)("div",{className:"doc_container bg-white rounded my-0",children:Object(p.jsx)(y,{doc_imgArr:t,propertyId:c,userId:o})})}},263:function(e,t,c){"use strict";c(264);var o=c(4);t.a=function(e){return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("input",{className:"styled-checkbox",id:e.id,type:"checkbox",value:e.value,checked:e.checked,onChange:e.onChange}),Object(o.jsx)("label",{htmlFor:e.id,className:"fs-14",children:e.label})]})}},264:function(e,t,c){},512:function(e,t,c){},517:function(e,t,c){"use strict";t.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAELSURBVHgBndIxCsIwFAbg9x529wiugoNHqIK73kCP4CCIWxcVHDyCegLdRXsFB0F08gjdq3kmpWJpm6Txh9LQJh/Jy8N7b7ZhAP8F8aB1XF3AMQ9/1uYahsB8IBDYB4aGx1547U3a/0AMXJePT4LfY/VD7q7uAmahZD1jgGpw606HSLRRY/khijHumI5cgASMmuf5Fr8TqoI6KF33iw00QQXMBNqgUqwMFALGRLg2QVosD2ajg1QINGmel1vZLkEOCnSQcWf5GqWTjW1DVSBm3iVvS2OTFVI1Oi2GLMTIBqIVytTI1odYFaoCogtkA9EVMoEkPNi7QipJH+YuheS9P5EhcoEKoDSkePgAvAskKsVgoBoAAAAASUVORK5CYII="}}]);