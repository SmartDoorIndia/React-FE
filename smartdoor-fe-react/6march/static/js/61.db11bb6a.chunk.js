(this.webpackJsonpsmartdoor=this.webpackJsonpsmartdoor||[]).push([[61],{123:function(e,t,i){"use strict";var r=i(150),a=i.n(r),o=(i(128),i(0)),l=i(125),n=i(56),s=i(4);const d=Object(s.jsx)("img",{src:l.a,className:"ml-1",width:"10px",alt:"SHORT_ICON"}),c=Object(s.jsx)(n.b,{}),u=e=>{let{title:t,columns:i,data:r,pagination:o,progressPending:l,onChangePage:n,paginationComponent:u,paginationRowsPerPageOptions:m,paginationPerPage:h,sortIcon:b,progressComponent:g,striped:q,...y}=e;return Object(s.jsx)(a.a,{title:t,columns:i,data:r,pagination:!1!==o,highlightOnHover:!0,progressPending:l,onChangePage:n,striped:!1!==q,paginationComponent:u,paginationRowsPerPageOptions:m,paginationPerPage:h,customStyles:p,sortIcon:b||d,progressComponent:g||c,...y})},p={rows:{style:{borderBottomWidth:"0 !important","&:nth-child(even)":{backgroundColor:"#fff"},"&:nth-child(odd)":{backgroundColor:"#f8f3f5"}}},headCells:{style:{fontWeight:"700 !important",fontSize:".875rem",color:"#252525",justifyContent:"center","&:first-child":{minWidth:"70px",maxWidth:"100px"}}},cells:{style:{fontSize:".875rem",color:"#252525","&:first-child":{minWidth:"100px",maxWidth:"120px"}}}};t.a=Object(o.memo)(u)},125:function(e,t,i){"use strict";t.a=i.p+"static/media/sort-icon.a64bca1a.svg"},128:function(e,t,i){},1510:function(e,t,i){"use strict";i.r(t);var r=i(0),a=i(38),o=i(35),l=i(115),n=i(126),s=i(20),d=i(1494),c=i(143),u=(i(509),i(119)),p=i(34),m=i(167),h=(i(208),i(298)),b=i.n(h),g=i(123),q=(i(23),i(4));class y extends r.Component{constructor(){super(),this.handleValidate=()=>{let e=Object(m.h)(this.state);this.setState({error:e.errors}),e.isValid&&this.handleSubmit()},this.changeHandler=e=>{const t=e.target.value.replace(/\D/g,"");this.setState({phoneNumber:t.slice(0,10)})},this.handleSubmit=()=>{this.setState({disableSubmit:!0});let{dob:e,email:t,executiveName:i,location:r,phoneNumber:a,post:o,alternatePhoneNumber:l,city:n,businessLocality:s,latitude:d,longitude:c,cityLocations:[],_gPlaceLocation:m,cityLatLong:h}=this.state,b={city:n,dob:e,email:t,name:i,phoneNumber:a,position:Number(o),profileImageUrl:"",isProfileComplete:!0,isActive:!0,alternatePhoneNumber:l,businessLocality:"",location:r};Object(u.j)(b).then((e=>{e.data&&200===e.data.status&&(this.setState({handleSubmit:!1}),this.setState({disableSubmit:!1}),this.props.history.goBack()),e.data&&409===e.data.status&&(this.setState({handleSubmit:!1}),this.setState({disableSubmit:!1}))})).catch((e=>{this.setState({handleSubmit:!1}),Object(p.t)("Unexpected Error. Please try again later."),this.setState({disableSubmit:!1})}))},this.setCityValue=async e=>{this.setState({city:e.city,cityLatLong:e.latlng})},this.setLocationValue=async e=>{this.setState({latitude:e.latlng.lat,longitude:e.latlng.lng,_gPlaceLocation:e.location,businessLocality:e.location})},this.state={error:{},dob:"",email:"",executiveName:"",location:[],phoneNumber:"",post:"",alternatePhoneNumber:"",allAdminRoles:[],city:[],businessLocality:"",_gPlaceLocation:"",cityLatLong:"",allCities:[],allLocationsByCity:[],cityLocations:[],locationExecutiveListing:[],executiveCity:"",showList:!1,disableSubmit:!1,allLocationLoader:!1},this.handleSubmit=this.handleSubmit.bind(this),this.handleValidate=this.handleValidate.bind(this)}componentDidMount(){this.props.getAllRoles({rollId:this.props.module}),this.props.getAllCity()}render(){var e,t,i,r,a,o;const{error:u,excutiveRoles:p,dob:m,email:h,executiveName:y,location:f,phoneNumber:j,post:R,alternatePhoneNumber:x,latitude:v,longitude:N,businessLocality:O,_gPlaceLocation:C,allLocationsByCity:S,cityLocations:L}=this.state,{title:{formTitle:w,buttonText:P},allAdminRoles:A,allCities:B,allExecutives:E}=this.props,D=[{name:"Id",selector:"id",center:!0,sortable:!0},{name:"Location",selector:"location",center:!0,cell:e=>{let{location:t}=e;return Object(q.jsx)("span",{children:t||"-"})}},{name:"City",selector:"city",center:!0,maxWidth:"150px",cell:e=>{let{city:t}=e;return Object(q.jsx)("span",{children:t?t.capitalizeWord():"-"})}},{name:"Pincode",selector:"pinCode",center:!0,maxWidth:"120px",cell:e=>{let{pinCode:t}=e;return Object(q.jsx)("span",{children:t})}},{name:"No.Of Executives",selector:"noOfExecutives",center:!0,cell:e=>{let{noOfExecutives:t}=e;return Object(q.jsx)("span",{children:t||"0"})}}];return console.log(this.state.post,"pppppppppppppppppp"),console.log(this.state.allLocationsByCity,"all location by city"),Object(q.jsxs)(q.Fragment,{children:[Object(q.jsx)("div",{style:{height:"5%"}}),Object(q.jsxs)("div",{className:"whiteBg",children:[Object(q.jsx)(s.a,{size:"medium",fontWeight:"mediumbold",color:"secondryColor",text:w}),Object(q.jsx)(s.a,{size:"xSmall",fontWeight:"smbold",color:"TaupeGrey",text:"",className:"mt-1"}),Object(q.jsx)("div",{className:"newEntry",children:Object(q.jsxs)("form",{noValidate:!0,onSubmit:e=>e.preventDefault(),autoComplete:"off",children:[Object(q.jsxs)(d.a,{children:[Object(q.jsxs)(c.a,{lg:"4",children:[Object(q.jsxs)(l.a.Group,{controlId:"formBasicContact",children:[Object(q.jsx)(l.a.Label,{children:"Full Name"}),Object(q.jsx)(l.a.Control,{type:"text",maxLength:"35",placeholder:"Enter Name",value:y,onChange:e=>this.setState({executiveName:e.target.value.replace(/[^A-Za-z\s]/g,"")})})]}),Object(q.jsx)(s.a,{color:"dangerText",size:"xSmall",className:"pt-2",text:u.executiveName})]}),Object(q.jsxs)(c.a,{lg:"4",children:[Object(q.jsxs)(l.a.Group,{controlId:"exampleForm.SelectCustom",children:[Object(q.jsx)(l.a.Label,{children:"Position"}),Object(q.jsxs)(l.a.Control,{as:"select",value:R,onChange:e=>{this.setState({post:e.target.value,location:[]})},children:[Object(q.jsx)("option",{value:"",children:"Select"}),A.data.length?A.data.map(((e,t)=>Object(q.jsx)("option",{value:e.roleId,children:e.role},t))):null]})]}),Object(q.jsx)(s.a,{color:"dangerText",size:"xSmall",className:"pt-2",text:u.post})]}),"1"!==this.state.post?Object(q.jsxs)(c.a,{lg:"4",children:[Object(q.jsxs)(l.a.Group,{controlId:"exampleForm.SelectCustom",className:"removeSpace",children:[Object(q.jsx)(l.a.Label,{style:{zIndex:"999999"},children:"City"}),Object(q.jsx)("div",{className:"dropdown-location",children:null!==B&&void 0!==B&&null!==(e=B.data)&&void 0!==e&&null!==(t=e.cities)&&void 0!==t&&t.length?Object(q.jsx)(b.a,{optionLabel:"city",optionKey:"id",options:B.data.cities,selected:f,placeholder:"Select ",buttonClass:"btn-transperant mt-0 dropdown_multiselect",handleOnChange:e=>{this.setState({city:e,allLocationsByCity:[],location:[],allLocationLoader:!0}),this.props.getUserLocationByCity({cities:e}).then((e=>{if(e.data&&200===e.data.status){const t=e.data.resourceData.locations.map((e=>({...e,location:"".concat(e.location," ,").concat(e.pinCode)})));console.log(t,"location by city"),this.setState({allLocationsByCity:t,allLocationLoader:!1},(()=>{console.log(this.state.allLocationsByCity,"all location after api")}))}})).catch((e=>console.log("err:",e))),R.length&&e.length&&this.props.getExecutivesWrtRoleLocation({role:Number(R),page:1,size:"",city:e}).then((e=>this.setState({showList:!0}))).catch((e=>console.log("err")))}}):null})]}),Object(q.jsx)(s.a,{color:"dangerText",size:"xSmall",className:"pt-2",text:u.city})]}):null]}),Object(q.jsxs)(d.a,{children:["3"!==this.state.post&&"7"!==this.state.post&&"8"!==this.state.post&&"10"!==this.state.post&&"13"!==this.state.post&&"14"!==this.state.post&&"16"!==this.state.post&&""!==this.state.post&&"1"!==this.state.post?Object(q.jsxs)(c.a,{lg:"4",children:[this.state.allLocationLoader?null:Object(q.jsxs)(l.a.Group,{controlId:"exampleForm.SelectCustom",className:"removeSpace",children:[Object(q.jsx)(l.a.Label,{style:{zIndex:"999999"},children:"Location"}),Object(q.jsx)("div",{onClick:()=>{console.log(this.state.allLocationsByCity,S,"inside dropdown")},className:"dropdown-location",children:Object(q.jsx)(b.a,{optionLabel:"location",optionKey:"id",options:S,selected:f,placeholder:"Select ",selectDeselectLabel:L.length?"Deselect All":"Select All",buttonClass:"btn-transperant mt-0 dropdown_multiselect",handleOnChange:e=>{let t=[];t=S.filter((t=>e.includes(String(t.id)))),t=t.map((e=>({...e,location:e.location.substring(0,e.location.indexOf(" ,"))}))),this.setState({location:t})}})})]}),Object(q.jsx)(s.a,{color:"dangerText",size:"xSmall",className:"pt-2",text:u.location})]}):null,Object(q.jsxs)(c.a,{lg:"4",children:[Object(q.jsxs)(l.a.Group,{children:[Object(q.jsx)(l.a.Label,{children:"Date of Birth"}),Object(q.jsx)(l.a.Control,{type:"date",max:(new Date).toISOString().split("T")[0],placeholder:"Enter Date of Birth",value:m,onChange:e=>this.setState({dob:e.target.value})})]}),Object(q.jsx)(s.a,{color:"dangerText",size:"xSmall",className:"pt-2",text:u.dob})]}),Object(q.jsxs)(c.a,{lg:"4",children:[Object(q.jsxs)(l.a.Group,{children:[Object(q.jsx)(l.a.Label,{children:"Phone Number"}),Object(q.jsx)(l.a.Control,{type:"text",placeholder:"Enter Phone Number",onWheel:()=>document.activeElement.blur(),value:j,onChange:e=>this.changeHandler(e)})]}),Object(q.jsx)(s.a,{color:"dangerText",size:"xSmall",className:"pt-2",text:u.phoneNumber})]}),Object(q.jsxs)(c.a,{lg:"4",children:[Object(q.jsxs)(l.a.Group,{children:[Object(q.jsx)(l.a.Label,{children:"Alternative Number"}),Object(q.jsx)(l.a.Control,{type:"number",placeholder:"Enter Phone Number",value:x,onChange:e=>this.setState({alternatePhoneNumber:e.target.value.slice(0,10)})})]}),Object(q.jsx)(s.a,{color:"dangerText",size:"xSmall",className:"pt-2",text:u.alternatePhoneNumber})]}),Object(q.jsxs)(c.a,{lg:"4",children:[Object(q.jsxs)(l.a.Group,{children:[Object(q.jsx)(l.a.Label,{children:"Email"}),Object(q.jsx)(l.a.Control,{type:"text",placeholder:"Enter Email",value:h,onChange:e=>this.setState({email:e.target.value.replace(/[^A-Za-z0-9/@/./_]/g,"")})})]}),Object(q.jsx)(s.a,{color:"dangerText",size:"xSmall",className:"pt-2",text:u.email})]})]}),Object(q.jsx)(d.a,{className:"justify-content-center ",children:Object(q.jsx)(c.a,{lg:"3",children:Object(q.jsx)(n.a,{name:P,varient:"primary",type:"submit",disabled:this.state.disableSubmit,id:"submit-team-member-button",size:"Small",onClick:()=>this.handleValidate(),color:"white"})})})]})})]}),E.data.length&&this.state.showList?Object(q.jsx)(q.Fragment,{children:Object(q.jsxs)("div",{className:"tableBox mb-5",children:[Object(q.jsxs)("div",{className:"d-flex justify-content-between align-items-center tableHeading",children:[Object(q.jsx)("div",{children:Object(q.jsx)(s.a,{size:"regular",fontWeight:"mediumbold",color:"secondryColor",text:"Team Members"})}),Object(q.jsx)("div",{className:"locationSelect",children:Object(q.jsxs)(l.a.Group,{controlId:"exampleForm.SelectCustom",className:"w-40",children:[Object(q.jsx)(l.a.Label,{children:"Filter:"}),Object(q.jsxs)(l.a.Control,{as:"select",onChange:e=>{R.length&&e.target.value.length&&this.props.getExecutivesWrtRoleLocation({role:Number(R),page:1,size:"",city:[e.target.value]})},children:[Object(q.jsx)("option",{value:"",children:"Select City"}),null!==B&&void 0!==B&&null!==(i=B.data)&&void 0!==i&&null!==(r=i.cities)&&void 0!==r&&r.length?null===B||void 0===B||null===(a=B.data)||void 0===a||null===(o=a.cities)||void 0===o?void 0:o.map(((e,t)=>Object(q.jsx)("option",{value:e,children:e},t))):null]})]})})]}),Object(q.jsx)(g.a,{data:E.data,columns:D,progressPending:E.isLoading})]})}):null]})}}const f={getAllRoles:u.ab,getAllCity:u.H,getLocationByCity:u.Vb,getExecutivesWrtRoleLocation:u.Gb,getUserLocationByCity:u.Fc},j=Object(a.b)((e=>{let{allAdminRoles:t,allCities:i,allLocationsByCity:r,allExecutives:a}=e;return{allAdminRoles:t,allCities:i,allLocationsByCity:r,getUserLocationByCity:u.Fc,allExecutives:a}}),f);t.default=Object(o.c)(j,r.memo)(y)},157:function(e,t,i){"use strict";t.a={username:{required:"Please enter phone number.",invalid:"Please enter a valid phone number."},password:{required:"Please enter password."},address:{required:"Address is required."},contactNumber:{required:"Contact number is required."},contactPerson:{required:"Contact person is required."},societyName:{required:"Society name is required."},fieldRequired:{required:"This field is required."},executiveName:{required:"Enter Executive Name."},location:{required:"Enter Location."},post:{required:"Enter Post."},dob:{required:"Enter Date of Birth."},email:{required:"This field is required.",invalid:"Enter Valid Email"},societyName:{required:"Enter Society Name"},address:{required:"Enter Address"},plotSize:{required:"Enter Plot Size."},listedProperties:{required:"Enter Properties Listed."},userType:{required:"Select User type."},phoneNumber:{required:"Enter Phone Number",invalid:"Enter Valid Number"},userName:{required:"Enter User Name"},leadFor:{required:"Select Lead for."},proposedCutOff:{required:"Enter Proposed Cut."},panNumber:{invalid:"Enter Valid PAN Number"},accountNumber:{invalid:"Enter Valid Account Number"},negativeNumber:{invalid:"Enter positive number"}}},165:function(e,t,i){"use strict";t.a={alphaOnly:"^[a-zA-Z .]*$",passwordPattern:"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",passwordSpaceRemove:"^[ A-Za-z0-9()[]+-*/%]*$",numberOnly:"^[0-9]*$",validUrl:"((http|ftp|https)://)?(www.)?([w_-]+(?:(?:.[w_-]+)+))([w.,@?^=%&:/~+#-]*[w@?^=%&/~+#-])?",newValidUrl:"//,",googleDocUrl:" /([w-_]{15,})\\/(.*?gid=(d+))?",validateLinkURL:/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,validateEmail:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/,validatePAN:/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/}},167:function(e,t,i){"use strict";i.d(t,"b",(function(){return s})),i.d(t,"c",(function(){return d})),i.d(t,"h",(function(){return c})),i.d(t,"g",(function(){return u})),i.d(t,"f",(function(){return p})),i.d(t,"a",(function(){return m})),i.d(t,"d",(function(){return h})),i.d(t,"e",(function(){return b}));var r=i(195),a=i.n(r),o=i(157),l=i(165);function n(e){return!e||/^\s*$/.test(e)}const s=e=>{const t={};return n(e.address)&&(t.address=o.a.fieldRequired.required),n(e.contactNumber)?t.contactNumber=o.a.fieldRequired.required:n(e.contactNumber)||10!==e.contactNumber.length&&(t.contactNumber=o.a.phoneNumber.invalid),n(e.contactPerson)&&(t.contactPerson=o.a.fieldRequired.required),n(e.societyName)&&(t.societyName=o.a.fieldRequired.required),n(e.leadFor)&&(t.leadFor=o.a.fieldRequired.required),n(e.city)&&(t.city=o.a.fieldRequired.required),{errors:t,isValid:a()(t)}},d=e=>{const t={};return n(e.TNC)&&(t.TNC=o.a.fieldRequired.required),n(e.description)&&(t.description=o.a.fieldRequired.required),n(e.gstValue)&&(t.gstValue=o.a.fieldRequired.required),n(e.planName)&&(t.planName=o.a.fieldRequired.required),n(e.subscriptionMonth)&&(t.subscriptionMonth=o.a.fieldRequired.required),n(e.isDeviceCamera)&&(t.isDeviceCamera=o.a.fieldRequired.required),n(e.isDeviceDongle)&&(t.isDeviceDongle=o.a.fieldRequired.required),n(e.isDeviceHub)&&(t.isDeviceHub=o.a.fieldRequired.required),n(e.isDeviceSensor)&&(t.isDeviceSensor=o.a.fieldRequired.required),n(e.isDeviceSmartLock)&&(t.isDeviceSmartLock=o.a.fieldRequired.required),n(e.isLeadGeneration)&&(t.isLeadGeneration=o.a.fieldRequired.required),n(e.isMarketingVideo)&&(t.isMarketingVideo=o.a.fieldRequired.required),n(e.isMarketingSupport)&&(t.isMarketingSupport=o.a.fieldRequired.required),n(e.isAutoDoorCloser)&&(t.isAutoDoorCloser=o.a.fieldRequired.required),e.planHirarchy<0&&(t.planHirarchy=o.a.negativeNumber.invalid),e.depositeAmount<0&&(t.depositeAmount=o.a.negativeNumber.invalid),e.subscriptionMonth<0&&(t.subscriptionMonth=o.a.negativeNumber.invalid),e.installationCharges<0&&(t.installationCharges=o.a.negativeNumber.invalid),e.baseRentalCoins<0&&(t.baseRentalCoins=o.a.negativeNumber.invalid),e.renewalCoins<0&&(t.baseRentalCoins=o.a.negativeNumber.invalid),e.renewalInterval<0&&(t.renewalInterval=o.a.negativeNumber.invalid),e.gstValue<=0&&(t.gstValue=o.a.negativeNumber.invalid),n(e.gstValue)&&(t.gstValue=o.a.fieldRequired.required),n(e.imageLocation)&&(t.imageLocation="Image required"),console.log("Erros: ",t),{errors:t,isValid:a()(t)}},c=e=>{const t={};return n(e.dob)&&(t.dob=o.a.fieldRequired.required),n(e.email)?t.email=o.a.fieldRequired.required:n(e.email)||l.a.validateEmail.test(String(e.email).toLowerCase())||(t.email=o.a.email.invalid),n(e.executiveName)&&(t.executiveName=o.a.fieldRequired.required),"1"!==e.post&&(t.city=o.a.fieldRequired.required),console.log(e,"ddddddddddddddddddddddddddd"),"3"!==e.post&&"7"!==e.post&&"8"!==e.post&&"10"!==e.post&&"13"!==e.post&&"14"!==e.post&&"16"!==e.post&&"1"!==e.post&&!e.post.toLowerCase().includes("admin")&&e.location.length<1&&(t.location=o.a.fieldRequired.required),n(e.post)&&(t.post=o.a.fieldRequired.required),n(e.phoneNumber)?t.phoneNumber=o.a.fieldRequired.required:n(e.phoneNumber)||10!==e.phoneNumber.length&&(t.phoneNumber=o.a.phoneNumber.invalid),n(e.alternatePhoneNumber)||10!==e.alternatePhoneNumber.length&&(t.alternatePhoneNumber=o.a.phoneNumber.invalid),{errors:t,isValid:a()(t)}},u=e=>{const t={};return console.log("Vdata",e),n(e.newSocietyName)&&(t.societyName=o.a.fieldRequired.required),n(e.newAddress)&&(t.address=o.a.fieldRequired.required),n(e.plotSize)&&(t.plotSize=o.a.fieldRequired.required),n(e.listedProperties.toString())&&(t.listedProperties=o.a.fieldRequired.required),n(e.userName)&&(t.userName=o.a.fieldRequired.required),n(e.position.toString())&&(t.position=o.a.fieldRequired.required),n(e.phoneNumber)?t.phoneNumber=o.a.fieldRequired.required:n(e.phoneNumber)||10!==e.phoneNumber.length&&(t.phoneNumber=o.a.phoneNumber.invalid),n(e.city)&&(t.city=o.a.fieldRequired.required),n(e.accountNumber)||e.accountNumber.length>30&&(t.accountNumber=o.a.accountNumber.invalid),n(e.panNumber)||l.a.validatePAN.test(e.panNumber)||(t.panNumber=o.a.panNumber.invalid),{errors:t,isValid:a()(t)}},p=e=>{const t={};return console.log("Vdata",e),n(e.propertyAddressRequest.city)&&(t.city=o.a.fieldRequired.required),n(e.propertyAddressRequest.buildingProjectSociety)&&(t.buildingProjectSociety=o.a.fieldRequired.required),n(e.propertyBasicDetailRequest.propertyCategory)&&(t.propertyCategory=o.a.fieldRequired.required),n(e.propertyBasicDetailRequest.propertyType)&&(t.propertyType=o.a.fieldRequired.required),n(e.propertyBasicDetailRequest.propertySubType)&&(t.propertySubType=o.a.fieldRequired.required),n(e.propertyBasicDetailRequest.propertyAge)&&(t.propertyAge=o.a.fieldRequired.required),n(e.propertyBasicDetailRequest.bedRooms)&&(t.bedRooms=o.a.fieldRequired.required),n(e.propertyBasicDetailRequest.hall)&&(t.hall=o.a.fieldRequired.required),n(e.propertyBasicDetailRequest.kitchen)&&(t.kitchen=o.a.fieldRequired.required),n(e.propertyBasicDetailRequest.numberOfBaths)&&(t.numberOfBaths=o.a.fieldRequired.required),n(e.propertyBasicDetailRequest.balcony)&&(t.balcony=o.a.fieldRequired.required),n(e.propertyBasicDetailRequest.coveredParking)&&(t.coveredParking=o.a.fieldRequired.required),n(e.propertyBasicDetailRequest.openParking)&&(t.openParking=o.a.fieldRequired.required),n(e.propertyBasicDetailRequest.type)&&(t.type=o.a.fieldRequired.required),n(e.propertyBasicDetailRequest.propertyRate)&&(t.propertyRate=o.a.fieldRequired.required),n(e.propertyBasicDetailRequest.maintenanceCost)&&(t.maintenanceCost=o.a.fieldRequired.required),n(e.propertyBasicDetailRequest.carpetArea)&&(t.carpetArea=o.a.fieldRequired.required),n(e.propertyBasicDetailRequest.attachedOpenAreaOrGarden)&&(t.attachedOpenAreaOrGarden=o.a.fieldRequired.required),n(e.propertyBasicDetailRequest.attachedOpenTerraceArea)&&(t.attachedOpenTerraceArea=o.a.fieldRequired.required),n(e.propertyAddressRequest.houseNumber)&&(t.houseNumber=o.a.fieldRequired.required),n(e.propertyAddressRequest.floorNumber)&&(t.floorNumber=o.a.fieldRequired.required),n(e.propertyAddressRequest.totalFloor)&&(t.totalFloor=o.a.fieldRequired.required),n(e.addPropertyMoreInfoRequest.propertyDescription)&&(t.propertyDescription=o.a.fieldRequired.required),n(e.addPropertyMoreInfoRequest.enteranceFacing)&&(t.enteranceFacing=o.a.fieldRequired.required),n(e.addPropertyMoreInfoRequest.security)&&(t.security=o.a.fieldRequired.required),n(e.addPropertyMoreInfoRequest.storeDistance)&&(t.storeDistance=o.a.fieldRequired.required),n(e.addPropertyMoreInfoRequest.constructionSize)&&(t.constructionSize=o.a.fieldRequired.required),n(e.addPropertyMoreInfoRequest.majorityComposition)&&(t.majorityComposition=o.a.fieldRequired.required),n(e.addPropertyMoreInfoRequest.religiousPlace)&&(t.religiousPlace=o.a.fieldRequired.required),n(e.addPropertyMoreInfoRequest.oldRate)&&(t.oldRate=o.a.fieldRequired.required),{errors:t,isValid:a()(t)}},m=e=>{const t={};return console.log("CrtTcktdata",e),n(e.callFrom)&&(t.callFrom=o.a.fieldRequired.required),n(e.phoneNumber)?t.phoneNumber=o.a.fieldRequired.required:n(e.phoneNumber)||10!==e.phoneNumber.length&&(t.phoneNumber=o.a.phoneNumber.invalid),n(e.problem)&&(t.problem=o.a.fieldRequired.required),n(e.email)?t.email=o.a.fieldRequired.required:n(e.email)||l.a.validateEmail.test(String(e.email).toLowerCase())||(t.email=o.a.email.invalid),n(e.ticketName)&&(t.ticketName=o.a.fieldRequired.required),n(e.assignTo)&&(t.assignTo=o.a.fieldRequired.required),n(e.severity)&&(t.severity=o.a.fieldRequired.required),{errors:t,isValid:a()(t)}},h=e=>{const t={};return n(e.propertyCategory)&&(t.propertyCategory=o.a.fieldRequired.required),n(e.propertyType)?t.propertyType=o.a.fieldRequired.required:("Residential"===e.propertyType&&(n(e.propertySubType)&&(t.propertySubType=o.a.fieldRequired.required),n(e.bedRooms)&&0!==e.bedRooms&&(t.bedRooms=o.a.fieldRequired.required),n(e.numberOfHalls)&&0!==e.numberOfHalls&&(t.numberOfHalls=o.a.fieldRequired.required),n(e.kitchens)&&0!==e.kitchens&&(t.kitchens=o.a.fieldRequired.required),n(e.numberOfBaths)&&0!==e.numberOfBaths&&(t.numberOfBaths=o.a.fieldRequired.required),n(e.balcony)&&0!==e.balcony&&(t.balcony=o.a.fieldRequired.required)),"Commercial"===e.propertyType&&(n(e.commercialProjectType)&&(t.commercialProjectType=o.a.fieldRequired.required),n(e.commercialArea)&&(t.commercialArea=o.a.fieldRequired.required),n(e.commercialType)&&(t.commercialType=o.a.fieldRequired.required),n(e.numberOfBaths)&&0!==e.numberOfBaths&&(t.numberOfBaths=o.a.fieldRequired.required),n(e.commonReception)&&0!==e.commonReception&&(t.commonReception=o.a.fieldRequired.required),n(e.kitchenPantry)&&(t.kitchenPatry=o.a.fieldRequired.required),n(e.leaseType)&&(t.leaseType=o.a.fieldRequired.required)),"Semi Commercial"===e.propertyType&&(n(e.propertySubType)&&(t.propertySubType=o.a.fieldRequired.required),n(e.leaseType)&&(t.leaseType=o.a.fieldRequired.required),n(e.preferredFor)&&(t.preferredFor=o.a.fieldRequired.required),n(e.purpose)&&(t.purpose=o.a.fieldRequired.required)),n(e.coveredParking)&&0!==e.coveredParking&&(t.coveredParking=o.a.fieldRequired.required),n(e.openParking)&&0!==e.openParking&&(t.openParking=o.a.fieldRequired.required),n(e.type)&&(t.type=o.a.fieldRequired.required),null===e.isNegotiable&&(t.isNegotiable=o.a.fieldRequired.required)),n(e.propertyAge)&&0!==e.propertyAge&&(t.propertyAge=o.a.fieldRequired.required),n(e.propertyRate)&&0!==e.propertyRate&&(t.propertyRate=o.a.fieldRequired.required),n(e.maintenanceCost)&&0!==e.maintenanceCost&&(t.maintenanceCost=o.a.fieldRequired.required),n(e.plotArea)&&0!==e.plotArea&&(t.plotArea=o.a.fieldRequired.required),n(e.attachedOpenTerraceArea)&&0!==e.attachedOpenTerraceArea&&(t.attachedOpenTerraceArea=o.a.fieldRequired.required),n(e.attachedOpenAreaOrGarden)&&0!==e.attachedOpenAreaOrGarden&&(t.attachedOpenAreaOrGarden=o.a.fieldRequired.required),{errors:t,isValid:a()(t)}},b=e=>{const t={};return n(e.city)&&(t.city=o.a.fieldRequired.required),n(e.buildingProjectSociety)&&(t.buildingProjectSociety=o.a.fieldRequired.required),n(e.locality)&&(t.locality=o.a.fieldRequired.required),n(e.houseNumber)&&(t.houseNumber="Required"),n(e.floorNumber)&&(t.plotNo="Required"),n(e.totalFloor)&&(t.totalFloor="Required"),console.log(t),{errors:t,isValid:a()(t)}}},208:function(e,t,i){"use strict";var r=i(0),a=i(259),o=i(115),l=i(4);const n="input_location_autofill"+Math.random();t.a=e=>{let{customValue:t,autocompletionRequest:i,label:s,id:d,placeholder:c,defaultValue:u,predictionType:p,center:m,radius:h,onInputChange:b,onBlurInput:g,onSelectOption:q,...y}=e;s=s||"Location",d=d||n,c=c||"Enter Location";let f={componentRestrictions:{country:"IN"},strictBounds:!0};switch(h&&(f={...f,radius:h}),p){case"city":f={...f,types:["(cities)"]};break;case"region":f={...f,types:["(regions)"]};break;case"address":f={...f,types:["address"]};break;case"business":f={...f,types:["establishment"]};break;default:f={...f}}function j(e){new google.maps.event.addDomListener(e,"keydown",(function(e){13===e.keyCode&&e.preventDefault()}))}function R(){let e=document.getElementById(d);const t=new google.maps.places.Autocomplete(e,f);if(new google.maps.event.addListener(t,"place_changed",(function(){try{t&&x(t)}catch(e){}})),m&&"object"===typeof m&&null!==m&&m.lat&&m.lng){google.maps.event.trigger(t,"remove",!0),e=document.getElementById(d);const i=new google.maps.places.Autocomplete(e,f),r=new google.maps.Circle({center:new google.maps.LatLng(m.lat,m.lng),radius:15e3});i.setBounds(r.getBounds()),new google.maps.event.addListener(i,"place_changed",(function(){try{i&&x(i)}catch(e){}}))}j(e)}Object(r.useEffect)((()=>{const e=u?u.replace(/[^a-z]/gi,""):"";document.getElementById(d).value=e||""}),[u,d]),Object(r.useEffect)((()=>{try{(()=>{var e;e=google.maps.places.Autocomplete,google.maps.places.Autocomplete=function(t,i){const r=t.cloneNode(!0),a=new e(t,i);return google.maps.event.addListener(a,"remove",(function(e){google.maps.event.clearInstanceListeners(a),google.maps.event.trigger(t,"blur"),google.maps.event.clearInstanceListeners(t),!0===e?t.parentNode.replaceChild(r,t):t.parentNode.removeChild(t)})),a}})(),"city"===p&&window&&window.google&&function(e){const t=document.getElementById(d);e=new google.maps.places.Autocomplete(t,f),new google.maps.event.addListener(e,"place_changed",(function(){try{e&&x(e)}catch(t){}})),j(t)}()}catch(e){}}),[]),Object(r.useEffect)((()=>{try{"city"!==p&&window&&window.google&&R()}catch(e){}}),[m]);const x=async t=>{const i=t.getPlace(),r=await(async t=>{let{place_id:i}=t;try{const t=await Object(a.a)(i),r=t[0].address_components[0].long_name||t[0].address_components[0].short_name;return r.length&&e.changeCityState(),r||""}catch(r){}})(i),o=await(async e=>{let{place_id:t}=e;try{const e=await Object(a.a)(t);return await Object(a.b)(e[0])||{}}catch(i){}})(i),l=await(e=>{let{formatted_address:t,name:i}=e;return null!==t&&void 0!==t&&t.includes(i)?t:"".concat(i||"",", ").concat(t||"")})(i);q&&await q({city:r,latlng:o,location:l,data:i})};return Object(l.jsxs)(o.a.Group,{children:[Object(l.jsx)(o.a.Label,{children:s}),Object(l.jsx)(o.a.Control,{type:"text",id:d,autoComplete:"off",autoFill:"off",placeholder:c,value:t,onKeyPress:e=>{/[0-9]/.test(e.key)&&e.preventDefault()},onBlur:()=>{g&&g()},onChange:e=>{const t=e.target.value.replace(/[^a-z]/gi,"");b(t)},onInput:e=>{console.log(e),R()},...y})]})}},509:function(e,t,i){}}]);