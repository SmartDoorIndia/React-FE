(this.webpackJsonpsmartdoor=this.webpackJsonpsmartdoor||[]).push([[53],{1080:function(e,t,a){},113:function(e,t,a){"use strict";var i=a(5),r=a(6),o=a(25),s=a.n(o),l=a(0),n=a.n(l),c=(a(112),a(7)),d=a.n(c),u=["as","className","type","tooltip"],p={type:d.a.string,tooltip:d.a.bool,as:d.a.elementType},m=n.a.forwardRef((function(e,t){var a=e.as,o=void 0===a?"div":a,l=e.className,c=e.type,d=void 0===c?"valid":c,p=e.tooltip,m=void 0!==p&&p,b=Object(r.a)(e,u);return n.a.createElement(o,Object(i.a)({},b,{ref:t,className:s()(l,d+"-"+(m?"tooltip":"feedback"))}))}));m.displayName="Feedback",m.propTypes=p;var b=m,f=n.a.createContext({controlId:void 0}),h=a(28),y=["id","bsPrefix","bsCustomPrefix","className","type","isValid","isInvalid","isStatic","as"],g=n.a.forwardRef((function(e,t){var a=e.id,o=e.bsPrefix,c=e.bsCustomPrefix,d=e.className,u=e.type,p=void 0===u?"checkbox":u,m=e.isValid,b=void 0!==m&&m,g=e.isInvalid,q=void 0!==g&&g,j=e.isStatic,v=e.as,N=void 0===v?"input":v,O=Object(r.a)(e,y),x=Object(l.useContext)(f),R=x.controlId,w=x.custom?[c,"custom-control-input"]:[o,"form-check-input"],C=w[0],P=w[1];return o=Object(h.a)(C,P),n.a.createElement(N,Object(i.a)({},O,{ref:t,type:p,id:a||R,className:s()(d,o,b&&"is-valid",q&&"is-invalid",j&&"position-static")}))}));g.displayName="FormCheckInput";var q=g,j=["bsPrefix","bsCustomPrefix","className","htmlFor"],v=n.a.forwardRef((function(e,t){var a=e.bsPrefix,o=e.bsCustomPrefix,c=e.className,d=e.htmlFor,u=Object(r.a)(e,j),p=Object(l.useContext)(f),m=p.controlId,b=p.custom?[o,"custom-control-label"]:[a,"form-check-label"],y=b[0],g=b[1];return a=Object(h.a)(y,g),n.a.createElement("label",Object(i.a)({},u,{ref:t,htmlFor:d||m,className:s()(c,a)}))}));v.displayName="FormCheckLabel";var N=v,O=["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","title","type","label","children","custom","as"],x=n.a.forwardRef((function(e,t){var a=e.id,o=e.bsPrefix,c=e.bsCustomPrefix,d=e.inline,u=void 0!==d&&d,p=e.disabled,m=void 0!==p&&p,y=e.isValid,g=void 0!==y&&y,j=e.isInvalid,v=void 0!==j&&j,x=e.feedbackTooltip,R=void 0!==x&&x,w=e.feedback,C=e.className,P=e.style,S=e.title,L=void 0===S?"":S,I=e.type,A=void 0===I?"checkbox":I,E=e.label,z=e.children,k=e.custom,T=e.as,D=void 0===T?"input":T,F=Object(r.a)(e,O),V="switch"===A||k,B=V?[c,"custom-control"]:[o,"form-check"],_=B[0],M=B[1];o=Object(h.a)(_,M);var G=Object(l.useContext)(f).controlId,U=Object(l.useMemo)((function(){return{controlId:a||G,custom:V}}),[G,V,a]),Z=V||null!=E&&!1!==E&&!z,H=n.a.createElement(q,Object(i.a)({},F,{type:"switch"===A?"checkbox":A,ref:t,isValid:g,isInvalid:v,isStatic:!Z,disabled:m,as:D}));return n.a.createElement(f.Provider,{value:U},n.a.createElement("div",{style:P,className:s()(C,o,V&&"custom-"+A,u&&o+"-inline")},z||n.a.createElement(n.a.Fragment,null,H,Z&&n.a.createElement(N,{title:L},E),(g||v)&&n.a.createElement(b,{type:g?"valid":"invalid",tooltip:R},w))))}));x.displayName="FormCheck",x.Input=q,x.Label=N;var R=x,w=["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","lang","as"],C=n.a.forwardRef((function(e,t){var a=e.id,o=e.bsPrefix,c=e.bsCustomPrefix,d=e.className,u=e.isValid,p=e.isInvalid,m=e.lang,b=e.as,y=void 0===b?"input":b,g=Object(r.a)(e,w),q=Object(l.useContext)(f),j=q.controlId,v=q.custom?[c,"custom-file-input"]:[o,"form-control-file"],N=v[0],O=v[1];return o=Object(h.a)(N,O),n.a.createElement(y,Object(i.a)({},g,{ref:t,id:a||j,type:"file",lang:m,className:s()(d,o,u&&"is-valid",p&&"is-invalid")}))}));C.displayName="FormFileInput";var P=C,S=["bsPrefix","bsCustomPrefix","className","htmlFor"],L=n.a.forwardRef((function(e,t){var a=e.bsPrefix,o=e.bsCustomPrefix,c=e.className,d=e.htmlFor,u=Object(r.a)(e,S),p=Object(l.useContext)(f),m=p.controlId,b=p.custom?[o,"custom-file-label"]:[a,"form-file-label"],y=b[0],g=b[1];return a=Object(h.a)(y,g),n.a.createElement("label",Object(i.a)({},u,{ref:t,htmlFor:d||m,className:s()(c,a),"data-browse":u["data-browse"]}))}));L.displayName="FormFileLabel";var I=L,A=["id","bsPrefix","bsCustomPrefix","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","label","children","custom","lang","data-browse","as","inputAs"],E=n.a.forwardRef((function(e,t){var a=e.id,o=e.bsPrefix,c=e.bsCustomPrefix,d=e.disabled,u=void 0!==d&&d,p=e.isValid,m=void 0!==p&&p,y=e.isInvalid,g=void 0!==y&&y,q=e.feedbackTooltip,j=void 0!==q&&q,v=e.feedback,N=e.className,O=e.style,x=e.label,R=e.children,w=e.custom,C=e.lang,S=e["data-browse"],L=e.as,E=void 0===L?"div":L,z=e.inputAs,k=void 0===z?"input":z,T=Object(r.a)(e,A),D=w?[c,"custom"]:[o,"form-file"],F=D[0],V=D[1];o=Object(h.a)(F,V);var B=Object(l.useContext)(f).controlId,_=Object(l.useMemo)((function(){return{controlId:a||B,custom:w}}),[B,w,a]),M=null!=x&&!1!==x&&!R,G=n.a.createElement(P,Object(i.a)({},T,{ref:t,isValid:m,isInvalid:g,disabled:u,as:k,lang:C}));return n.a.createElement(f.Provider,{value:_},n.a.createElement(E,{style:O,className:s()(N,o,w&&"custom-file")},R||n.a.createElement(n.a.Fragment,null,w?n.a.createElement(n.a.Fragment,null,G,M&&n.a.createElement(I,{"data-browse":S},x)):n.a.createElement(n.a.Fragment,null,M&&n.a.createElement(I,null,x),G),(m||g)&&n.a.createElement(b,{type:m?"valid":"invalid",tooltip:j},v))))}));E.displayName="FormFile",E.Input=P,E.Label=I;var z=E,k=(a(45),["bsPrefix","bsCustomPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","custom","as"]),T=n.a.forwardRef((function(e,t){var a,o,c=e.bsPrefix,d=e.bsCustomPrefix,u=e.type,p=e.size,m=e.htmlSize,b=e.id,y=e.className,g=e.isValid,q=void 0!==g&&g,j=e.isInvalid,v=void 0!==j&&j,N=e.plaintext,O=e.readOnly,x=e.custom,R=e.as,w=void 0===R?"input":R,C=Object(r.a)(e,k),P=Object(l.useContext)(f).controlId,S=x?[d,"custom"]:[c,"form-control"],L=S[0],I=S[1];if(c=Object(h.a)(L,I),N)(o={})[c+"-plaintext"]=!0,a=o;else if("file"===u){var A;(A={})[c+"-file"]=!0,a=A}else if("range"===u){var E;(E={})[c+"-range"]=!0,a=E}else if("select"===w&&x){var z;(z={})[c+"-select"]=!0,z[c+"-select-"+p]=p,a=z}else{var T;(T={})[c]=!0,T[c+"-"+p]=p,a=T}return n.a.createElement(w,Object(i.a)({},C,{type:u,size:m,ref:t,readOnly:O,id:b||P,className:s()(y,a,q&&"is-valid",v&&"is-invalid")}))}));T.displayName="FormControl";var D=Object.assign(T,{Feedback:b}),F=["bsPrefix","className","children","controlId","as"],V=n.a.forwardRef((function(e,t){var a=e.bsPrefix,o=e.className,c=e.children,d=e.controlId,u=e.as,p=void 0===u?"div":u,m=Object(r.a)(e,F);a=Object(h.a)(a,"form-group");var b=Object(l.useMemo)((function(){return{controlId:d}}),[d]);return n.a.createElement(f.Provider,{value:b},n.a.createElement(p,Object(i.a)({},m,{ref:t,className:s()(o,a)}),c))}));V.displayName="FormGroup";var B=V,_=a(141),M=["as","bsPrefix","column","srOnly","className","htmlFor"],G=n.a.forwardRef((function(e,t){var a=e.as,o=void 0===a?"label":a,c=e.bsPrefix,d=e.column,u=e.srOnly,p=e.className,m=e.htmlFor,b=Object(r.a)(e,M),y=Object(l.useContext)(f).controlId;c=Object(h.a)(c,"form-label");var g="col-form-label";"string"===typeof d&&(g=g+" "+g+"-"+d);var q=s()(p,c,u&&"sr-only",d&&g);return m=m||y,d?n.a.createElement(_.a,Object(i.a)({ref:t,as:"label",className:q,htmlFor:m},b)):n.a.createElement(o,Object(i.a)({ref:t,className:q,htmlFor:m},b))}));G.displayName="FormLabel",G.defaultProps={column:!1,srOnly:!1};var U=G,Z=["bsPrefix","className","as","muted"],H=n.a.forwardRef((function(e,t){var a=e.bsPrefix,o=e.className,l=e.as,c=void 0===l?"small":l,d=e.muted,u=Object(r.a)(e,Z);return a=Object(h.a)(a,"form-text"),n.a.createElement(c,Object(i.a)({},u,{ref:t,className:s()(o,a,d&&"text-muted")}))}));H.displayName="FormText";var W=H,$=n.a.forwardRef((function(e,t){return n.a.createElement(R,Object(i.a)({},e,{ref:t,type:"switch"}))}));$.displayName="Switch",$.Input=R.Input,$.Label=R.Label;var Y=$,J=a(128),K=["bsPrefix","inline","className","validated","as"],Q=Object(J.a)("form-row"),X=n.a.forwardRef((function(e,t){var a=e.bsPrefix,o=e.inline,l=e.className,c=e.validated,d=e.as,u=void 0===d?"form":d,p=Object(r.a)(e,K);return a=Object(h.a)(a,"form"),n.a.createElement(u,Object(i.a)({},p,{ref:t,className:s()(l,c&&"was-validated",o&&a+"-inline")}))}));X.displayName="Form",X.defaultProps={inline:!1},X.Row=Q,X.Group=B,X.Control=D,X.Check=R,X.File=z,X.Switch=Y,X.Label=U,X.Text=W;t.a=X},130:function(e,t,a){},1511:function(e,t,a){"use strict";a.r(t);a(1080);var i=a(113),r=a(0),o=a(37),s=a(35),l=a(1491),n=a(141),c=a(206),d=a(124),u=a(29),p=a(350),m=a(349),b=a(20),f=a(117),h=a(34),y=a(165),g=a(260),q=a.n(g),j=a(58),v=a(192),N=a(4);const O=new q.a(j.a.CONFIG);class x extends r.Component{constructor(e){var t,a,i,r;super(e),this.handleValidate=e=>{e.preventDefault();const{societyName:t,location:a,plotSize:i,propertieslisted:r,username:o,userType:s,phoneNumber:l,proposedCutOff:n,leadId:c,contactPerson:d,contactNumber:u,_gPlaceLocation:p,locationLatLong:m,builtInYear:b,newSocietyName:g,societyDescription:q,_gPlaceCity:j,bankName:v,accountNumber:N,panNumber:O,societyLogo:x,zipcode:R,detailsData:w}=this.state;let C=this.props.allAdminRoles.data.filter((e=>e.role.toLowerCase()===s.toLowerCase())),P={address:a||p,city:j,listedProperties:r,phoneNumber:l,plotSize:i,societyLogo:x,societyName:t||g,userName:o,position:Number(C.length?C[0].roleId:s)||"",proposedCutOff:n,contactNumber:u||l,contactPerson:d||o,latitude:m.lat,longitude:m.lng,leadId:c,societyUser:!1,builtInYear:b,newSocietyName:g,descriptions:q,newAddress:p,bankName:v,accountNumber:N,panNumber:O,zipcode:this.state.zipcode};console.log("societyData:",P);let S=Object(y.g)(P);if(this.setState({error:S.errors}),S.isValid){const e=Object(h.j)("authData");Object(f.w)({...P,creatorId:e.userid,listedProperties:Number(r),zipcode:this.state.zipcode}).then((e=>{e.data&&200===e.data.status&&this.props.history.push("/admin/societies")})).catch((e=>{}))}},this.setSocietyValue=async e=>{let t=e.data.name;this.setState({locationLatLong:e.latlng,newSocietyName:t,_gPlaceLocation:e.data.formatted_address})},this.changeHandler=e=>{const t=e.target.value.replace(/\D/g,"");this.setState({phoneNumber:t.slice(0,10)})},this.setLocationValue=async e=>{this.setState({locationLatLong:e.latlng,_gPlaceLocation:e.location})},this.setCityValue=async e=>{this.setState({cityLatLong:e.latlng,selectedCityName:e.city,_gPlaceCity:e.data.name,locationLatLong:e.latlng})},this.dltSocietyLogo=()=>{Object(f.A)({societyId:this.state.societyId}).then((e=>{e.data&&200===e.data.status&&Object(f.Ub)({leadId:this.state.leadId}),this.setState({societyLogo:""})})).catch((e=>{}))},this.state={error:{},societyName:this.props.location.state&&this.props.location.state.data.societyName?this.props.location.state.data.societyName:"",location:this.props.location.state&&this.props.location.state.data.address?this.props.location.state.data.address:"",plotSize:this.props.location.state&&this.props.location.state.data.plotSize?this.props.location.state.data.plotSize:"",propertieslisted:this.props.location.state&&this.props.location.state.data.numberOfProperties?this.props.location.state.data.numberOfProperties:"",username:this.props.location.state&&this.props.location.state.data.contactPerson?this.props.location.state.data.contactPerson:"",userType:this.props.location.state&&this.props.location.state.data.position?this.props.location.state.data.position:"",phoneNumber:this.props.location.state&&this.props.location.state.data.contactNumber?this.props.location.state.data.contactNumber:"",societyLogo:this.props.location.state&&this.props.location.state.data.societyLogo?this.props.location.state.data.societyLogo:"",allAdminRoles:[],imageUrl:"",proposedCutOff:this.props.location.state&&this.props.location.state.data.proposedCutOff?this.props.location.state.data.proposedCutOff:"",leadId:this.props.location.state?this.props.location.state.data.leadId:"",contactPerson:this.props.location.state&&this.props.location.state.data.contactPerson?this.props.location.state.data.contactPerson:"",contactNumber:this.props.location.state&&this.props.location.state.data.contactNumber?this.props.location.state.data.contactNumber:"",city:this.props.location.state&&this.props.location.state.data.city?this.props.location.state.data.city:"indore",_gPlaceCity:this.props.location.state&&this.props.location.state.data.city?this.props.location.state.data.city:"",cityLatLong:null,selectedCityName:"",_gPlaceLocation:this.props.location.state&&this.props.location.state.data.address?this.props.location.state.data.address:"",builtInYear:this.props.location.state&&this.props.location.state.data.constructed?this.props.location.state.data.constructed:"",locationLatLong:{lat:this.props.location.state&&this.props.location.state.data.latitude?this.props.location.state.data.latitude:0,lng:this.props.location.state&&this.props.location.state.data.longitude?this.props.location.state.data.longitude:0},newSocietyName:this.props.location.state&&this.props.location.state.data.societyName?this.props.location.state.data.societyName:"",societyDescription:"",bankName:"",accountNumber:"",panNumber:"",societyId:null===this||void 0===this||null===(t=this.props)||void 0===t||null===(a=t.location)||void 0===a||null===(i=a.state)||void 0===i||null===(r=i.data)||void 0===r?void 0:r.societyId,detailsData:{},zipcode:""},this.fileUpload=this.fileUpload.bind(this)}fileUpload(e){var t,a,i,r;if(console.log("file upload.."),null!==e&&void 0!==e&&null!==(t=e.target)&&void 0!==t&&t.files&&null!==e&&void 0!==e&&null!==(a=e.target)&&void 0!==a&&a.files[0]){let t=new FileReader;t.onload=e=>{console.log(e.target.result,"target.result"),this.setState({societyLogo:e.target.result})},t.readAsDataURL(e.target.files[0])}(console.log(null===e||void 0===e||null===(i=e.target)||void 0===i?void 0:i.files[0],"after upload files"),console.log(e.target.files,"before s3 files"),e.target.files.length>0)&&(O.uploadFile(null===e||void 0===e||null===(r=e.target)||void 0===r?void 0:r.files[0],e.target.files[0].name).then((e=>{console.log("data of upload file::",e.location),this.setState({societyLogo:e.location})})).catch((e=>{})),console.log(e.target.files[0],"end file"))}async componentDidMount(){console.log(this.state.zipcode,"zipcode");try{const e=await Object(f.Ub)({leadId:this.state.leadId});if(e.data.resourceData){this.setState({detailsData:e.data.resourceData});const t={address:e.data.resourceData.address};0===e.data.resourceData.latitude&&0===e.data.resourceData.longitude&&Object(h.k)(t).then((e=>{const t={lat:e.lat,lng:e.lng};this.setState({locationLatLong:t}),Object(h.o)(e.lat,e.lng).then((e=>{console.log(e,"for zipcode"),this.setState({zipcode:e})}))}))}}catch(t){console.log(t)}const e=this;if(this.props.getAllRoles({rollId:"SOCIETY"}),this.state.city){let t=await Object(h.m)(this.state.city);t.status&&e.setState({cityLatLong:{lat:t.lat,lng:t.lng}})}}render(){const{error:e,plotSize:t,propertieslisted:a,username:r,userType:o,phoneNumber:s,proposedCutOff:f,bankName:h,accountNumber:y,panNumber:g,societyId:q}=this.state;console.log("societyId",q);const{allAdminRoles:j}=this.props;return Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)("div",{style:{height:"5%"}}),Object(N.jsxs)("div",{className:"whiteBg",children:[Object(N.jsx)(b.a,{size:"medium",fontWeight:"mediumbold",color:"secondryColor",text:"Enroll New Society"})," ",Object(N.jsx)("div",{className:"newEntry mt-4",children:Object(N.jsxs)("form",{noValidate:!0,onSubmit:this.handleValidate,autoComplete:"off",children:[Object(N.jsxs)(l.a,{children:[Object(N.jsx)(n.a,{lg:4,children:Object(N.jsxs)("div",{className:"whiteBg addCopLogo position-relative",children:[Object(N.jsx)(b.a,{size:"Small",fontWeight:"smbold",color:"secondryColor",text:"Society Logo",className:"text-center mb-2"}),this.state.societyLogo?Object(N.jsx)("div",{class:"crossIcon position-absolute",children:Object(N.jsx)("span",{class:"closeRight",children:Object(N.jsx)(u.a,{onClick:this.dltSocietyLogo,name:"crossIcon",src:m.a,alt:"cross icon"})})}):null,Object(N.jsx)("div",{className:"companyLogo",children:Object(N.jsx)(u.a,{name:"companyLogo",src:this.state.societyLogo||"https://smartdoor-app.s3.us-east-2.amazonaws.com/society-logo/Societies_320.svg"})}),Object(N.jsx)("div",{className:"uploadImg newSocietyWrap justify-content-end",children:Object(N.jsx)("div",{className:"uploadIcon",children:Object(N.jsx)("div",{className:"inputFields",children:Object(N.jsxs)("label",{controlId:"formFileLg",className:"d-flex justify-content-end align-items-center mb-0",children:[Object(N.jsx)(i.a.Control,{accept:".png, .jpg, .jpeg",type:"file",size:"lg",onChange:e=>this.fileUpload(e)}),Object(N.jsx)(u.a,{src:p.a,className:"img-fluid",alt:"Upload Icon"})]})})})})]})}),Object(N.jsx)(n.a,{lg:8,children:Object(N.jsxs)(l.a,{children:[Object(N.jsx)(n.a,{lg:"6",children:Object(N.jsx)("div",{className:"form-input-control",children:Object(N.jsxs)(i.a.Group,{controlId:"formBasiPhone",children:[Object(N.jsx)(c.a,{label:"City",placeholder:"Enter City",id:"newSocietyCityAutoComplete",onSelectOption:this.setCityValue,customValue:this.state.city,onInputChange:e=>this.setState({_gPlaceCity:e.replace(/[^A-Za-z\s]/g,""),city:e.replace(/[^A-Za-z\s]/g,""),cityLatLong:null}),predictionType:"city"}),Object(N.jsx)(b.a,{color:"dangerText",size:"xSmall",text:e.city})]})})}),Object(N.jsx)(n.a,{lg:"6",children:Object(N.jsx)("div",{className:"form-input-control",children:Object(N.jsxs)(i.a.Group,{controlId:"formBasicContact",children:[Object(N.jsx)(c.a,{label:"Society Name",placeholder:"Enter Society Name",id:"newSocietySocietyAutoComplete",onSelectOption:this.setSocietyValue,customValue:this.state.societyName,onInputChange:e=>this.setState({newSocietyName:e}),center:this.state.cityLatLong,defaultValue:this.state.newSocietyName,maxLength:"35"}),Object(N.jsx)(b.a,{color:"dangerText",size:"xSmall",text:e.societyName})]})})}),Object(N.jsx)(n.a,{lg:"6",children:Object(N.jsx)("div",{className:"form-input-control",children:Object(N.jsxs)(i.a.Group,{controlId:"formBasiPhone",children:[Object(N.jsx)(c.a,{label:"Location",placeholder:"Enter Location",id:"newSocietyLocationAutoComplete",onSelectOption:this.setLocationValue,customValue:this.state.location,onInputChange:e=>this.setState({_gPlaceLocation:e}),center:this.state.cityLatLong,defaultValue:this.state._gPlaceLocation}),Object(N.jsx)(b.a,{color:"dangerText",size:"xSmall",text:e.address})]})})}),Object(N.jsx)(n.a,{lg:"6",children:Object(N.jsx)("div",{className:"form-input-control",children:Object(N.jsxs)(i.a.Group,{controlId:"formBasicSociety",children:[Object(N.jsx)(i.a.Label,{children:"Plot Size (Sq. Ft.)"}),Object(N.jsx)(i.a.Control,{type:"number",onWheel:()=>document.activeElement.blur(),placeholder:"Enter Plot Size (Sq. Ft.)",value:t,onChange:e=>this.setState({plotSize:e.target.value})}),Object(N.jsx)(b.a,{color:"dangerText",size:"xSmall",text:e.plotSize})]})})}),Object(N.jsx)(n.a,{lg:"6",children:Object(N.jsx)("div",{className:"form-input-control",children:Object(N.jsxs)(i.a.Group,{controlId:"formBasicSociety",children:[Object(N.jsx)(i.a.Label,{children:"Properties Listed"}),Object(N.jsx)(i.a.Control,{type:"number",placeholder:"Enter Properties Listed",onWheel:()=>document.activeElement.blur(),value:a,onChange:e=>this.setState({propertieslisted:e.target.value})}),Object(N.jsx)(b.a,{color:"dangerText",size:"xSmall",text:e.listedProperties})]})})}),Object(N.jsx)(n.a,{lg:"6",children:Object(N.jsx)("div",{className:"form-input-control",children:Object(N.jsxs)(i.a.Group,{controlId:"formBasicSociety",children:[Object(N.jsx)(v.a,{id:"descriptionSociety",label:"Enter Message",rows:"6",placeholder:"Enter Here...",maxLength:"500",style:{maxHeight:"170px"},value:this.state.societyDescription,className:"messagesModalWidth commentbox textareaWidth100",onChange:e=>this.setState({societyDescription:e.target.value})}),Object(N.jsx)(b.a,{color:"dangerText",size:"xSmall",text:""})]})})})]})})]}),Object(N.jsx)(b.a,{size:"xSmall",className:"pt-2 titleForm",text:"Society User Details"}),Object(N.jsxs)(l.a,{children:[Object(N.jsx)(n.a,{lg:"4",children:Object(N.jsx)("div",{className:"form-input-control",children:Object(N.jsxs)(i.a.Group,{controlId:"formBasicSociety",children:[Object(N.jsx)(i.a.Label,{children:"User Name"}),Object(N.jsx)(i.a.Control,{type:"text",maxLength:"35",placeholder:"Enter Admin Name",value:r,onChange:e=>this.setState({username:e.target.value})}),Object(N.jsx)(b.a,{color:"dangerText",size:"xSmall",text:e.userName})]})})}),Object(N.jsx)(n.a,{lg:"4",children:Object(N.jsx)("div",{className:"form-input-control",children:Object(N.jsxs)(i.a.Group,{controlId:"exampleForm.SelectCustom",children:[Object(N.jsx)(i.a.Label,{children:"User Type"}),Object(N.jsxs)(i.a.Control,{as:"select",onChange:e=>this.setState({userType:e.target.value}),children:[Object(N.jsx)("option",{value:"",children:"Select"}),j.data.length?j.data.map(((e,t)=>Object(N.jsxs)("option",{selected:o.toLowerCase()===e.role.toLowerCase(),value:e.roleId,children:[" ",e.role," "]},t))):null]}),Object(N.jsx)(b.a,{color:"dangerText",size:"xSmall",className:"pt-2",text:e.position})]})})}),Object(N.jsx)(n.a,{lg:"4",children:Object(N.jsx)("div",{className:"form-input-control",children:Object(N.jsxs)(i.a.Group,{controlId:"formBasicSociety",children:[Object(N.jsx)(i.a.Label,{children:"Phone Number"}),Object(N.jsx)(i.a.Control,{type:"text",placeholder:"Enter Phone Number",onWheel:()=>document.activeElement.blur(),value:s,onChange:e=>this.changeHandler(e)}),Object(N.jsx)(b.a,{color:"dangerText",size:"xSmall",text:e.phoneNumber})]})})})]}),Object(N.jsx)(l.a,{className:"justify-content-center mt-4",children:Object(N.jsx)(n.a,{lg:"3",children:Object(N.jsx)(d.a,{name:"Save",varient:"primary",type:"submit",size:"Small",color:"white"})})})]})})]})]})}}const R={getAllRoles:f.ab},w=Object(o.b)((e=>{let{allAdminRoles:t}=e;return{allAdminRoles:t}}),R);t.default=Object(s.c)(w,r.memo)(x)},155:function(e,t,a){"use strict";t.a={username:{required:"Please enter phone number.",invalid:"Please enter a valid phone number."},password:{required:"Please enter password."},address:{required:"Address is required."},contactNumber:{required:"Contact number is required."},contactPerson:{required:"Contact person is required."},societyName:{required:"Society name is required."},fieldRequired:{required:"This field is required."},executiveName:{required:"Enter Executive Name."},location:{required:"Enter Location."},post:{required:"Enter Post."},dob:{required:"Enter Date of Birth."},email:{required:"This field is required.",invalid:"Enter Valid Email"},societyName:{required:"Enter Society Name"},address:{required:"Enter Address"},plotSize:{required:"Enter Plot Size."},listedProperties:{required:"Enter Properties Listed."},userType:{required:"Select User type."},phoneNumber:{required:"Enter Phone Number",invalid:"Enter Valid Number"},userName:{required:"Enter User Name"},leadFor:{required:"Select Lead for."},proposedCutOff:{required:"Enter Proposed Cut."},panNumber:{invalid:"Enter Valid PAN Number"},accountNumber:{invalid:"Enter Valid Account Number"},negativeNumber:{invalid:"Enter positive number"}}},163:function(e,t,a){"use strict";t.a={alphaOnly:"^[a-zA-Z .]*$",passwordPattern:"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",passwordSpaceRemove:"^[ A-Za-z0-9()[]+-*/%]*$",numberOnly:"^[0-9]*$",validUrl:"((http|ftp|https)://)?(www.)?([w_-]+(?:(?:.[w_-]+)+))([w.,@?^=%&:/~+#-]*[w@?^=%&/~+#-])?",newValidUrl:"//,",googleDocUrl:" /([w-_]{15,})\\/(.*?gid=(d+))?",validateLinkURL:/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,validateEmail:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/,validatePAN:/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/}},165:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return c})),a.d(t,"h",(function(){return d})),a.d(t,"g",(function(){return u})),a.d(t,"f",(function(){return p})),a.d(t,"a",(function(){return m})),a.d(t,"d",(function(){return b})),a.d(t,"e",(function(){return f}));var i=a(193),r=a.n(i),o=a(155),s=a(163);function l(e){return!e||/^\s*$/.test(e)}const n=e=>{const t={};return l(e.address)&&(t.address=o.a.fieldRequired.required),l(e.contactNumber)?t.contactNumber=o.a.fieldRequired.required:l(e.contactNumber)||10!==e.contactNumber.length&&(t.contactNumber=o.a.phoneNumber.invalid),l(e.contactPerson)&&(t.contactPerson=o.a.fieldRequired.required),l(e.societyName)&&(t.societyName=o.a.fieldRequired.required),l(e.leadFor)&&(t.leadFor=o.a.fieldRequired.required),l(e.city)&&(t.city=o.a.fieldRequired.required),{errors:t,isValid:r()(t)}},c=e=>{const t={};return l(e.TNC)&&(t.TNC=o.a.fieldRequired.required),l(e.description)&&(t.description=o.a.fieldRequired.required),l(e.gstValue)&&(t.gstValue=o.a.fieldRequired.required),l(e.planName)&&(t.planName=o.a.fieldRequired.required),l(e.subscriptionMonth)&&(t.subscriptionMonth=o.a.fieldRequired.required),l(e.isDeviceCamera)&&(t.isDeviceCamera=o.a.fieldRequired.required),l(e.isDeviceDongle)&&(t.isDeviceDongle=o.a.fieldRequired.required),l(e.isDeviceHub)&&(t.isDeviceHub=o.a.fieldRequired.required),l(e.isDeviceSensor)&&(t.isDeviceSensor=o.a.fieldRequired.required),l(e.isDeviceSmartLock)&&(t.isDeviceSmartLock=o.a.fieldRequired.required),l(e.isLeadGeneration)&&(t.isLeadGeneration=o.a.fieldRequired.required),l(e.isMarketingVideo)&&(t.isMarketingVideo=o.a.fieldRequired.required),l(e.isMarketingSupport)&&(t.isMarketingSupport=o.a.fieldRequired.required),l(e.isAutoDoorCloser)&&(t.isAutoDoorCloser=o.a.fieldRequired.required),e.planHirarchy<0&&(t.planHirarchy=o.a.negativeNumber.invalid),e.depositeAmount<0&&(t.depositeAmount=o.a.negativeNumber.invalid),e.subscriptionMonth<0&&(t.subscriptionMonth=o.a.negativeNumber.invalid),e.installationCharges<0&&(t.installationCharges=o.a.negativeNumber.invalid),e.baseRentalCoins<0&&(t.baseRentalCoins=o.a.negativeNumber.invalid),e.renewalCoins<0&&(t.baseRentalCoins=o.a.negativeNumber.invalid),e.renewalInterval<0&&(t.renewalInterval=o.a.negativeNumber.invalid),e.gstValue<=0&&(t.gstValue=o.a.negativeNumber.invalid),l(e.gstValue)&&(t.gstValue=o.a.fieldRequired.required),l(e.imageLocation)&&(t.imageLocation="Image required"),console.log("Erros: ",t),{errors:t,isValid:r()(t)}},d=e=>{const t={};return l(e.dob)&&(t.dob=o.a.fieldRequired.required),l(e.email)?t.email=o.a.fieldRequired.required:l(e.email)||s.a.validateEmail.test(String(e.email).toLowerCase())||(t.email=o.a.email.invalid),l(e.executiveName)&&(t.executiveName=o.a.fieldRequired.required),"1"!==e.post&&(t.city=o.a.fieldRequired.required),console.log(e,"ddddddddddddddddddddddddddd"),"3"!==e.post&&"7"!==e.post&&"8"!==e.post&&"10"!==e.post&&"13"!==e.post&&"14"!==e.post&&"16"!==e.post&&"1"!==e.post&&!e.post.toLowerCase().includes("admin")&&e.location.length<1&&(t.location=o.a.fieldRequired.required),l(e.post)&&(t.post=o.a.fieldRequired.required),l(e.phoneNumber)?t.phoneNumber=o.a.fieldRequired.required:l(e.phoneNumber)||10!==e.phoneNumber.length&&(t.phoneNumber=o.a.phoneNumber.invalid),l(e.alternatePhoneNumber)||10!==e.alternatePhoneNumber.length&&(t.alternatePhoneNumber=o.a.phoneNumber.invalid),{errors:t,isValid:r()(t)}},u=e=>{const t={};return console.log("Vdata",e),l(e.newSocietyName)&&(t.societyName=o.a.fieldRequired.required),l(e.newAddress)&&(t.address=o.a.fieldRequired.required),l(e.plotSize)&&(t.plotSize=o.a.fieldRequired.required),l(e.listedProperties.toString())&&(t.listedProperties=o.a.fieldRequired.required),l(e.userName)&&(t.userName=o.a.fieldRequired.required),l(e.position.toString())&&(t.position=o.a.fieldRequired.required),l(e.phoneNumber)?t.phoneNumber=o.a.fieldRequired.required:l(e.phoneNumber)||10!==e.phoneNumber.length&&(t.phoneNumber=o.a.phoneNumber.invalid),l(e.city)&&(t.city=o.a.fieldRequired.required),l(e.accountNumber)||e.accountNumber.length>30&&(t.accountNumber=o.a.accountNumber.invalid),l(e.panNumber)||s.a.validatePAN.test(e.panNumber)||(t.panNumber=o.a.panNumber.invalid),{errors:t,isValid:r()(t)}},p=e=>{const t={};return console.log("Vdata",e),l(e.propertyAddressRequest.city)&&(t.city=o.a.fieldRequired.required),l(e.propertyAddressRequest.buildingProjectSociety)&&(t.buildingProjectSociety=o.a.fieldRequired.required),l(e.propertyBasicDetailRequest.propertyCategory)&&(t.propertyCategory=o.a.fieldRequired.required),l(e.propertyBasicDetailRequest.propertyType)&&(t.propertyType=o.a.fieldRequired.required),l(e.propertyBasicDetailRequest.propertySubType)&&(t.propertySubType=o.a.fieldRequired.required),l(e.propertyBasicDetailRequest.propertyAge)&&(t.propertyAge=o.a.fieldRequired.required),l(e.propertyBasicDetailRequest.bedRooms)&&(t.bedRooms=o.a.fieldRequired.required),l(e.propertyBasicDetailRequest.hall)&&(t.hall=o.a.fieldRequired.required),l(e.propertyBasicDetailRequest.kitchen)&&(t.kitchen=o.a.fieldRequired.required),l(e.propertyBasicDetailRequest.numberOfBaths)&&(t.numberOfBaths=o.a.fieldRequired.required),l(e.propertyBasicDetailRequest.balcony)&&(t.balcony=o.a.fieldRequired.required),l(e.propertyBasicDetailRequest.coveredParking)&&(t.coveredParking=o.a.fieldRequired.required),l(e.propertyBasicDetailRequest.openParking)&&(t.openParking=o.a.fieldRequired.required),l(e.propertyBasicDetailRequest.type)&&(t.type=o.a.fieldRequired.required),l(e.propertyBasicDetailRequest.propertyRate)&&(t.propertyRate=o.a.fieldRequired.required),l(e.propertyBasicDetailRequest.maintenanceCost)&&(t.maintenanceCost=o.a.fieldRequired.required),l(e.propertyBasicDetailRequest.carpetArea)&&(t.carpetArea=o.a.fieldRequired.required),l(e.propertyBasicDetailRequest.attachedOpenAreaOrGarden)&&(t.attachedOpenAreaOrGarden=o.a.fieldRequired.required),l(e.propertyBasicDetailRequest.attachedOpenTerraceArea)&&(t.attachedOpenTerraceArea=o.a.fieldRequired.required),l(e.propertyAddressRequest.houseNumber)&&(t.houseNumber=o.a.fieldRequired.required),l(e.propertyAddressRequest.floorNumber)&&(t.floorNumber=o.a.fieldRequired.required),l(e.propertyAddressRequest.totalFloor)&&(t.totalFloor=o.a.fieldRequired.required),l(e.addPropertyMoreInfoRequest.propertyDescription)&&(t.propertyDescription=o.a.fieldRequired.required),l(e.addPropertyMoreInfoRequest.enteranceFacing)&&(t.enteranceFacing=o.a.fieldRequired.required),l(e.addPropertyMoreInfoRequest.security)&&(t.security=o.a.fieldRequired.required),l(e.addPropertyMoreInfoRequest.storeDistance)&&(t.storeDistance=o.a.fieldRequired.required),l(e.addPropertyMoreInfoRequest.constructionSize)&&(t.constructionSize=o.a.fieldRequired.required),l(e.addPropertyMoreInfoRequest.majorityComposition)&&(t.majorityComposition=o.a.fieldRequired.required),l(e.addPropertyMoreInfoRequest.religiousPlace)&&(t.religiousPlace=o.a.fieldRequired.required),l(e.addPropertyMoreInfoRequest.oldRate)&&(t.oldRate=o.a.fieldRequired.required),{errors:t,isValid:r()(t)}},m=e=>{const t={};return console.log("CrtTcktdata",e),l(e.callFrom)&&(t.callFrom=o.a.fieldRequired.required),l(e.phoneNumber)?t.phoneNumber=o.a.fieldRequired.required:l(e.phoneNumber)||10!==e.phoneNumber.length&&(t.phoneNumber=o.a.phoneNumber.invalid),l(e.problem)&&(t.problem=o.a.fieldRequired.required),l(e.email)?t.email=o.a.fieldRequired.required:l(e.email)||s.a.validateEmail.test(String(e.email).toLowerCase())||(t.email=o.a.email.invalid),l(e.ticketName)&&(t.ticketName=o.a.fieldRequired.required),l(e.assignTo)&&(t.assignTo=o.a.fieldRequired.required),l(e.severity)&&(t.severity=o.a.fieldRequired.required),{errors:t,isValid:r()(t)}},b=e=>{const t={};return l(e.propertyCategory)&&(t.propertyCategory=o.a.fieldRequired.required),l(e.propertyType)?t.propertyType=o.a.fieldRequired.required:("Residential"===e.propertyType&&(l(e.propertySubType)&&(t.propertySubType=o.a.fieldRequired.required),l(e.bedRooms)&&0!==e.bedRooms&&(t.bedRooms=o.a.fieldRequired.required),l(e.numberOfHalls)&&0!==e.numberOfHalls&&(t.numberOfHalls=o.a.fieldRequired.required),l(e.kitchens)&&0!==e.kitchens&&(t.kitchens=o.a.fieldRequired.required),l(e.numberOfBaths)&&0!==e.numberOfBaths&&(t.numberOfBaths=o.a.fieldRequired.required),l(e.balcony)&&0!==e.balcony&&(t.balcony=o.a.fieldRequired.required)),"Commercial"===e.propertyType&&(l(e.commercialProjectType)&&(t.commercialProjectType=o.a.fieldRequired.required),l(e.commercialArea)&&(t.commercialArea=o.a.fieldRequired.required),l(e.commercialType)&&(t.commercialType=o.a.fieldRequired.required),l(e.numberOfBaths)&&0!==e.numberOfBaths&&(t.numberOfBaths=o.a.fieldRequired.required),l(e.commonReception)&&0!==e.commonReception&&(t.commonReception=o.a.fieldRequired.required),l(e.kitchenPantry)&&(t.kitchenPatry=o.a.fieldRequired.required),l(e.leaseType)&&(t.leaseType=o.a.fieldRequired.required)),"Semi Commercial"===e.propertyType&&(l(e.propertySubType)&&(t.propertySubType=o.a.fieldRequired.required),l(e.leaseType)&&(t.leaseType=o.a.fieldRequired.required),l(e.preferredFor)&&(t.preferredFor=o.a.fieldRequired.required),l(e.purpose)&&(t.purpose=o.a.fieldRequired.required)),l(e.coveredParking)&&0!==e.coveredParking&&(t.coveredParking=o.a.fieldRequired.required),l(e.openParking)&&0!==e.openParking&&(t.openParking=o.a.fieldRequired.required),l(e.type)&&(t.type=o.a.fieldRequired.required),null===e.isNegotiable&&(t.isNegotiable=o.a.fieldRequired.required)),l(e.propertyAge)&&0!==e.propertyAge&&(t.propertyAge=o.a.fieldRequired.required),l(e.propertyRate)&&0!==e.propertyRate&&(t.propertyRate=o.a.fieldRequired.required),l(e.maintenanceCost)&&0!==e.maintenanceCost&&(t.maintenanceCost=o.a.fieldRequired.required),l(e.plotArea)&&0!==e.plotArea&&(t.plotArea=o.a.fieldRequired.required),l(e.attachedOpenTerraceArea)&&0!==e.attachedOpenTerraceArea&&(t.attachedOpenTerraceArea=o.a.fieldRequired.required),l(e.attachedOpenAreaOrGarden)&&0!==e.attachedOpenAreaOrGarden&&(t.attachedOpenAreaOrGarden=o.a.fieldRequired.required),{errors:t,isValid:r()(t)}},f=e=>{const t={};return l(e.city)&&(t.city=o.a.fieldRequired.required),l(e.buildingProjectSociety)&&(t.buildingProjectSociety=o.a.fieldRequired.required),l(e.locality)&&(t.locality=o.a.fieldRequired.required),l(e.houseNumber)&&(t.houseNumber="Required"),l(e.floorNumber)&&(t.plotNo="Required"),l(e.totalFloor)&&(t.totalFloor="Required"),console.log(t),{errors:t,isValid:r()(t)}}},192:function(e,t,a){"use strict";a(130);var i=a(0),r=a(20),o=a(4);const s=Object(i.forwardRef)(((e,t)=>{let{id:a,label:s,children:l,error:n,className:c,rows:d,maxLength:u,...p}=e,m=a||s||"sdFormControlTextarea"+Math.random();const b=e=>{const t=document.getElementById("textAcharLimit"),a=e.currentTarget.value.length;t.innerHTML="".concat(a,"/500")};return Object(i.useEffect)((()=>{const e=document.getElementById(m);return e&&u&&e.addEventListener("input",b),()=>{e&&e.removeEventListener("input",b)}}),[m,u]),Object(o.jsxs)("div",{className:"sdInputFields positionLimit",children:[Object(o.jsx)("label",{htmlFor:m,className:"form-label",children:s}),Object(o.jsx)("textarea",{id:m,className:"textArea ".concat(c||""),rows:d||"3",maxLength:u||5e3,...p,children:l}),u&&Object(o.jsxs)("span",{className:"limitChar",id:"textAcharLimit",children:["0/",u]}),n&&Object(o.jsx)(r.a,{color:"dangerText",size:"xSmall",text:n})]})}));t.a=Object(i.memo)(s)},206:function(e,t,a){"use strict";var i=a(0),r=a(257),o=a(113),s=a(4);const l="input_location_autofill"+Math.random();t.a=e=>{let{customValue:t,autocompletionRequest:a,label:n,id:c,placeholder:d,defaultValue:u,predictionType:p,center:m,radius:b,onInputChange:f,onBlurInput:h,onSelectOption:y,...g}=e;n=n||"Location",c=c||l,d=d||"Enter Location";let q={componentRestrictions:{country:"IN"},strictBounds:!0};switch(b&&(q={...q,radius:b}),p){case"city":q={...q,types:["(cities)"]};break;case"region":q={...q,types:["(regions)"]};break;case"address":q={...q,types:["address"]};break;case"business":q={...q,types:["establishment"]};break;default:q={...q}}function j(e){new google.maps.event.addDomListener(e,"keydown",(function(e){13===e.keyCode&&e.preventDefault()}))}function v(){let e=document.getElementById(c);const t=new google.maps.places.Autocomplete(e,q);if(new google.maps.event.addListener(t,"place_changed",(function(){try{t&&N(t)}catch(e){}})),m&&"object"===typeof m&&null!==m&&m.lat&&m.lng){google.maps.event.trigger(t,"remove",!0),e=document.getElementById(c);const a=new google.maps.places.Autocomplete(e,q),i=new google.maps.Circle({center:new google.maps.LatLng(m.lat,m.lng),radius:15e3});a.setBounds(i.getBounds()),new google.maps.event.addListener(a,"place_changed",(function(){try{a&&N(a)}catch(e){}}))}j(e)}Object(i.useEffect)((()=>{const e=u?u.replace(/[^a-z]/gi,""):"";document.getElementById(c).value=e||""}),[u,c]),Object(i.useEffect)((()=>{try{(()=>{var e;e=google.maps.places.Autocomplete,google.maps.places.Autocomplete=function(t,a){const i=t.cloneNode(!0),r=new e(t,a);return google.maps.event.addListener(r,"remove",(function(e){google.maps.event.clearInstanceListeners(r),google.maps.event.trigger(t,"blur"),google.maps.event.clearInstanceListeners(t),!0===e?t.parentNode.replaceChild(i,t):t.parentNode.removeChild(t)})),r}})(),"city"===p&&window&&window.google&&function(e){const t=document.getElementById(c);e=new google.maps.places.Autocomplete(t,q),new google.maps.event.addListener(e,"place_changed",(function(){try{e&&N(e)}catch(t){}})),j(t)}()}catch(e){}}),[]),Object(i.useEffect)((()=>{try{"city"!==p&&window&&window.google&&v()}catch(e){}}),[m]);const N=async t=>{const a=t.getPlace(),i=await(async t=>{let{place_id:a}=t;try{const t=await Object(r.a)(a),i=t[0].address_components[0].long_name||t[0].address_components[0].short_name;return i.length&&e.changeCityState(),i||""}catch(i){}})(a),o=await(async e=>{let{place_id:t}=e;try{const e=await Object(r.a)(t);return await Object(r.b)(e[0])||{}}catch(a){}})(a),s=await(e=>{let{formatted_address:t,name:a}=e;return null!==t&&void 0!==t&&t.includes(a)?t:"".concat(a||"",", ").concat(t||"")})(a);y&&await y({city:i,latlng:o,location:s,data:a})};return Object(s.jsxs)(o.a.Group,{children:[Object(s.jsx)(o.a.Label,{children:n}),Object(s.jsx)(o.a.Control,{type:"text",id:c,autoComplete:"off",autoFill:"off",placeholder:d,value:t,onKeyPress:e=>{/[0-9]/.test(e.key)&&e.preventDefault()},onBlur:()=>{h&&h()},onChange:e=>{const t=e.target.value.replace(/[^a-z]/gi,"");f(t)},onInput:e=>{console.log(e),v()},...g})]})}},349:function(e,t,a){"use strict";t.a=a.p+"static/media/crossIcon.43b1a504.svg"},350:function(e,t,a){"use strict";t.a=a.p+"static/media/camra-icon.a9175af2.svg"}}]);