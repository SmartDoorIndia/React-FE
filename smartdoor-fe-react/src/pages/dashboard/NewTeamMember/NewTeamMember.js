/** @format */

import { useState, Component, memo, createRef } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import Form from "react-bootstrap/Form";
import Buttons from "../../../shared/Buttons/Buttons";
import Text from "../../../shared/Text/Text";
import { Col, Row } from "react-bootstrap";
import "./NewEntry.scss";
import {
   addNewTeamMember,
   getAllRoles,
   getAllCity,
   getAllCityWithId,
   getLocationByCity,
   getUserLocationByCity,
   getExecutivesWrtRoleLocation,
   setworkCityRequest
} from "../../../common/redux/actions";
import { showErrorToast, showSuccessToast } from "../../../common/helpers/Utils";
import { validateNewTeamMember } from "../../../common/validations";
import AutoCompleteInput from "../../../shared/Inputs/AutoComplete";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import DataTableComponent from '../../../shared/DataTable/DataTable';
import { transactionMeetingRequestData } from "../../../common/redux/reducers/views/transaction.reducer";

// import Image from "../../../shared/Image/Image";
class NewTeamMemberPage extends Component {
   constructor() {
      super();
      this.state = {
         error: {},
         dob: "",
         email: "",
         executiveName: "",
         location: [],
         phoneNumber: "",
         post: "",
         alternatePhoneNumber: "",
         allAdminRoles: [],
         city: [],
         businessLocality: "",
         // latitude: "",
         // longitude: "",
         _gPlaceLocation: "",
         cityLatLong: "",
         allCities: [],
         cityNameList:[],
         allCitiesWithId: [],
         allLocationsByCity: [],
         cityLocations: [],
         locationExecutiveListing: [],
         executiveCity: "",
         showList: false,
         disableSubmit: false,
         allLocationLoader: false
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleValidate = this.handleValidate.bind(this);
   }

   handleValidate = async () => {
      // event.preventDefault();
      const {allCitiesWithId} = this.props
      let cityIds = [];

   // Iterate over the city array
      for (let i = 0; i < this.state.city.length; i++) {
      // Find the corresponding city object in allCitiesWithId
      const cityName = this.state.city[i]
      const cityObject = allCitiesWithId?.data?.find(city => Number(city.cityId) === Number(cityName));
      console.log(cityObject)
      
      // If a city object with the current city name is found
      if (cityObject) {
         // Push the cityId into the cityIds array
         cityIds.push(cityObject.cityName);
         }
      }
   
   // Update the state outside of the loop
      await this.setState({ cityNameList: cityIds });
      console.log(this.state.cityNameList)
      let validate = validateNewTeamMember(this.state);
      console.log(validate)
      this.setState({ error: validate.errors });
      if (validate.isValid) {
         this.handleSubmit();
      }
   };

   componentDidMount() {
      this.props.getAllRoles({ rollId: this.props.module});
      // this.props.getAllCity();
      this.props.getAllCityWithId({smartdoorServiceStatus: true, stateId: null});
   }

   changeHandler = (e) => {
      const result = e.target.value.replace(/\D/g, '');
      // setUserName(result.slice(0,10))
      this.setState({ phoneNumber: result.slice(0, 10) })
   }

   handleSubmit = () => {
      this.setState({disableSubmit:true})
      let {
         dob,
         email,
         executiveName,
         location,
         phoneNumber,
         post,
         alternatePhoneNumber,
         city,
         cityNameList,
         businessLocality,
         latitude,
         longitude,
         cityLocations: [],
         _gPlaceLocation,
         cityLatLong,
      } = this.state;
      let data = {
         city: cityNameList,
         dob: dob,
         email: email,
         name: executiveName,
         phoneNumber: phoneNumber,
         position: Number(post),
         // profileImageUrl: "",
         isProfileComplete: true,
         isActive: true,
         alternatePhoneNumber: alternatePhoneNumber,
         // businessLocality: "",
         // businessLocality: location,
         // location: location,
      };
      console.log(cityNameList)
      addNewTeamMember(data)
         .then((response) => {
            if (response.data && response.data.status === 200) {
               this.setState({handleSubmit:false})
               this.setState({disableSubmit:false})
               console.log(response)
               console.log(this.state.city)
               setworkCityRequest({userId : response?.data?.resourceData, cityIdList: city})
               .then((response) => {
                  if(response.status === 200) {
                     showSuccessToast("City assigned successfully...")
                     // this.props.history.goBack();
                     this.props.history.push("/admin/user-management", {autoRefresh : 'Yes'});
                  }
               })
            }
            if (response.data && response.data.status === 409) {
               this.setState({handleSubmit:false})
               this.setState({disableSubmit:false})
            }
         })
         .catch((error) => {
            this.setState({handleSubmit:false})
            showErrorToast("Unexpected Error. Please try again later.");
            this.setState({disableSubmit:false})
         });
   };

   setCityValue = async (event) => {
      this.setState({ city: event.city, cityLatLong: event.latlng });
   };

   setLocationValue = async (event) => {
      this.setState({
         latitude: event.latlng.lat,
         longitude: event.latlng.lng,
         _gPlaceLocation: event.location,
         businessLocality: event.location,
      });
   };

   render() {
      const {
         error,
         excutiveRoles,
         dob,
         email,
         executiveName,
         location,
         phoneNumber,
         post,
         alternatePhoneNumber,
         latitude,
         longitude,
         businessLocality,
         _gPlaceLocation,
         allLocationsByCity,
         cityLocations,
      } = this.state;
      const {
         title: { formTitle, buttonText },
         allAdminRoles,
         allCities,
         allCitiesWithId,
         allExecutives
      } = this.props;


      const columns = [
         {
            name: 'Id',
            selector: 'id',
            center: true,
            sortable: true,
         },
         {
            name: 'Location',
            selector: 'location',
            center: true,
            cell: ({ location }) => (<span>{location || '-'}</span>),
         },
         {
            name: 'City',
            selector: 'city',
            center: true,
            maxWidth: '150px',
            cell: ({ city }) => (<span>{city ? city.capitalizeWord() : '-'}</span>),
         },
         {
            name: 'Pincode',
            selector: 'pinCode',
            center: true,
            maxWidth: '120px',
            cell: ({ pinCode }) => (<span>{pinCode}</span>),
         },
         {
            name: 'No.Of Executives',
            selector: 'noOfExecutives',
            center: true,
            cell: ({ noOfExecutives }) => (<span>{noOfExecutives || '0'}</span>),
         },
      ];
// console.log(this.state.post,"pppppppppppppppppp")
// console.log(this.state.allLocationsByCity,"all location by city")
      return (
         <>
            {/* <div style={{ height: "5%" }}></div> */}
            <div className="whiteBg">
               <Text size="medium" fontWeight="mediumbold" color="secondryColor" text={formTitle} />
               <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="" className="mt-1" />
               <div className="newEntry">
                  <form noValidate onSubmit={(e) => e.preventDefault()} autoComplete="off">
                     <Row>
                        <Col lg="4">
                           <Form.Group controlId="formBasicContact">
                              <Form.Label>Full Name</Form.Label>
                              <Form.Control
                                 type="text"
                                 maxLength="35"
                                 placeholder="Enter Name"
                            
                                 value={executiveName}
                                 onChange={(e) => this.setState({ executiveName: (e.target.value).replace(/[^A-Za-z\s]/g, '') })}
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.executiveName}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Group controlId="exampleForm.SelectCustom">
                              <Form.Label>Position</Form.Label>
                              <Form.Control
                                 as="select"
                                 value={post}
                                 // onKeyPress={(e) => {
                                 //    if (e.key === 'Enter') {
                                 //       this.handleValidate()
                                 //    }
                                 // }}
                                 onChange={(e) => {
                                    this.setState({ post: e.target.value, location: [] })
                                    // if (this.state.city.length && e.target.value.length) {
                                    //    this.props.getExecutivesWrtRoleLocation({ role: Number(e.target.value), page: 1, size: 10, city: this.state.city })
                                    // }
                                 }}
                              >
                                 <option value="">Select</option>
                                 {allAdminRoles.data.length
                                    ? allAdminRoles.data.map((data, index) => (
                                       <option key={index} value={data.roleId}>
                                          {data.role}
                                       </option>
                                    ))
                                    : null}
                              </Form.Control>
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.post}
                           />
                        </Col>
                        {!(this.state.post === '1') ? (
                        <Col lg="4">
                        {/* {this.state.post==3 || this.state.post==7 || this.state.post==8 || this.state.post==10 || this.state.post==13 || this.state.post==14 || this.state.post==16 ?  */}
                        <Form.Group controlId="exampleForm.SelectCustom" className="removeSpace">
                        <Form.Label style={{ zIndex: "999999" }}>City</Form.Label>
                        <div className="dropdown-location">

                          {allCitiesWithId?.data?.length ?  
                        <DropdownMultiselect
                           optionLabel={'cityName'}
                           optionKey="cityId"
                           options={allCitiesWithId.data}
                           // options={["Gurugram", "Faridabad", "New Delhi"]}
                           selected={location}
                           placeholder="Select "
                           // selectDeselectLabel={!cityLocations.length ? 'Select All' : 'Deselect All'}
                           buttonClass="btn-transperant mt-0 dropdown_multiselect"
                           handleOnChange={(selectedOptions) => {
                              this.setState({ city: selectedOptions, allLocationsByCity: [], location: [], allLocationLoader:true });
                              console.log(selectedOptions)
                              
                           // this.props
                           //    .getUserLocationByCity({ cities: selected })
                           //    .then((res) => {
                           //       if (res.data && res.data.status === 200) {
                           //          const locationsByCity = res.data.resourceData.locations.map(loc => {

                           //             return { ...loc, location: `${loc.location} ,${loc.pinCode}` }
                           //          })
                           //          console.log(locationsByCity,"location by city")
                           //          this.setState({
                           //             allLocationsByCity: locationsByCity,
                           //             allLocationLoader: false
                           //          },()=>{console.log(this.state.allLocationsByCity,"all location after api")});
                           //       }
                           //    })
                           //    .catch((err) => console.log("err:", err));
                           //    if (post.length && selected.length) {
                           //       this.props.getExecutivesWrtRoleLocation({ role: Number(post), page: 1, size: '', city: selected })
                           //          .then(res => this.setState({ showList: true }))
                           //          .catch(err => console.log("err"))
                           //    }

                           }}
                        />
                        : null}
                        </div>
                     </Form.Group>
                     
                             
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.city}
                           />
                        </Col>
                       ) : null}
                     </Row>
                     <Row>
                        {/* {!(this.state.post==='3' || this.state.post==='7' || this.state.post==='8' || this.state.post==='10' || this.state.post==='13' || this.state.post==='14' || this.state.post==='16' || this.state.post==="" || this.state.post === '1') ? 
                        
                           <Col lg="4">
                              {!this.state.allLocationLoader ? 
                              <Form.Group controlId="exampleForm.SelectCustom" className="removeSpace">
                                 <Form.Label style={{ zIndex: "999999" }}>Location</Form.Label>
                                 <div onClick={()=>{console.log(this.state.allLocationsByCity,allLocationsByCity,"inside dropdown")}} className="dropdown-location">
                                 <DropdownMultiselect
                                    optionLabel={'location'}
                                    optionKey="id"
                                    options={allLocationsByCity}
                                    selected={location}
                                    placeholder="Select "
                                    selectDeselectLabel={!cityLocations.length ? 'Select All' : 'Deselect All'}
                                    buttonClass="btn-transperant mt-0 dropdown_multiselect"
                                    handleOnChange={(selected) => {
                                       let originals = [];

                                       originals = allLocationsByCity.filter((allLocations) =>
                                          selected.includes(String(allLocations.id))
                                       );
                                       originals = originals.map(el => { return { ...el, location: el.location.substring(0, el.location.indexOf(' ,')) } })


                                       this.setState({ location: originals });
                                    }}
                                 />
                                 </div>
                              </Form.Group>
                               : null}
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.location}
                              />
                           </Col>
                       
                     : null } */}
                        <Col lg="4">
                           <Form.Group>
                              <Form.Label>Date of Birth</Form.Label>
                              <Form.Control
                                 type="date"
                                 max={new Date().toISOString().split("T")[0]}
                                 placeholder="Enter Date of Birth"
                                 value={dob}
                                 // onKeyPress={(e) => {
                                 //    if (e.key === 'Enter') {
                                 //       this.handleValidate()
                                 //    }
                                 // }}
                                 onChange={(e) =>
                                    this.setState({ dob: e.target.value })
                                 }
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.dob}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Group>
                              <Form.Label>Phone Number</Form.Label>
                              <Form.Control
                                 type="text"
                                 placeholder="Enter Phone Number"
                                 onWheel={() => document.activeElement.blur()}
                                 // onKeyPress={(e) => {
                                 //    if (e.key === 'Enter') {
                                 //       this.handleValidate()
                                 //    }
                                 // }}
                                 value={phoneNumber}
                                 // onChange={(e) => this.setState({ phoneNumber: (e.target.value).slice(0,10) })}
                                 onChange={(e) => this.changeHandler(e)}
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.phoneNumber}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Group>
                              <Form.Label>Alternative Number</Form.Label>
                              <Form.Control
                                 type="number"
                                 placeholder="Enter Phone Number"
                                 value={alternatePhoneNumber}
                                 // onKeyPress={(e) => {
                                 //    if (e.key === 'Enter') {
                                 //       this.handleValidate()
                                 //    }
                                 // }}
                                 onChange={(e) =>
                                    this.setState({ alternatePhoneNumber: (e.target.value).slice(0, 10) })
                                 }
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.alternatePhoneNumber}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Group>
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                 type="text"
                                 placeholder="Enter Email"
                                 // onKeyPress={(e) => {
                                 //    if (e.key === 'Enter') {
                                 //       this.handleValidate()
                                 //    }
                                 // }}
                                 value={email}
                                 onChange={(e) => this.setState({ email: (e.target.value).replace(/[^A-Za-z0-9/@/./_]/g, '') })}
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.email}
                           />
                        </Col>
                     </Row>
                     <Row className="justify-content-center ">
                        <Col lg="3">
                           <Buttons
                              name={buttonText}
                              varient="primary"
                              type="submit"
                              disabled={this.state.disableSubmit}
                              id="submit-team-member-button"
                              size="Small"
                              onClick={() => this.handleValidate()}
                              color="white"
                           />
                        </Col>
                     </Row>
                  </form>
               </div>
            </div>

            {allExecutives.data.length && this.state.showList ?
               <>
                  <div className="tableBox mb-5">
                     <div className="d-flex justify-content-between align-items-center tableHeading">
                        <div>
                           <Text size="regular" fontWeight="mediumbold" color="secondryColor" text="Team Members" />
                        </div>
                        <div className="locationSelect">
                           <Form.Group controlId="exampleForm.SelectCustom" className="w-40">
                              <Form.Label>Filter:</Form.Label>
                              <Form.Control as="select"
                                 onChange={(e) => {
                                    if (post.length && e.target.value.length) {
                                       this.props.getExecutivesWrtRoleLocation({ role: Number(post), page: 1, size: '', city: [e.target.value] })
                                    }
                                 }}
                              >
                                 <option value="">Select City</option>
                                 {allCitiesWithId?.data?.length
                                    ? allCitiesWithId?.data?.map((data, index) => (
                                       <option key={index} value={data}>
                                          {data}
                                       </option>
                                    ))
                                    : null}
                              </Form.Control>
                           </Form.Group>
                        </div>
                     </div>
                     <DataTableComponent
                        data={allExecutives.data}
                        columns={columns}
                        progressPending={allExecutives.isLoading}
                     />
                  </div>
               </>
               : null}
         </>
      );
   }
}

const mapStateToProps = ({ allAdminRoles, allCities, allCitiesWithId, allLocationsByCity, allExecutives }) => ({
   allAdminRoles,
   allCities,
   allCitiesWithId,
   allLocationsByCity,
   getUserLocationByCity,
   allExecutives,
});

const actions = {
   getAllRoles,
   getAllCity,
   getAllCityWithId,
   getLocationByCity,
   getExecutivesWrtRoleLocation,
   getUserLocationByCity
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(NewTeamMemberPage);
