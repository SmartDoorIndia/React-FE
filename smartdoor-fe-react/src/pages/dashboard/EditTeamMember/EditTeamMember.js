/** @format */

import { Component, memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Form from "react-bootstrap/Form";
import Buttons from "../../../shared/Buttons/Buttons";
import Text from "../../../shared/Text/Text";
import { Col, Row } from "react-bootstrap";
import "../NewTeamMember/NewEntry.scss";
import { editTeamMember, getAllRoles, getAllCity, getAllCityWithId, getLocationByCity, getUserLocationByCity } from "../../../common/redux/actions";
import { showErrorToast } from "../../../common/helpers/Utils";
import { validateNewTeamMember } from "../../../common/validations";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

class EditTeamMemberPage extends Component {
   constructor(props) {
      super(props);
      console.log("user mgmnt : this?.props?.location?.state?.user_Data", this?.props?.location?.state?.user_Data);
      this.state = {
         error: {},
         dob: this?.props?.location?.state?.user_Data?.dob || '',
         email: this?.props?.location?.state?.user_Data?.email || '',
         executiveName: this?.props?.location?.state?.user_Data?.name || '',
         location: this?.props?.location?.state?.user_Data?.workLocation || [],
         phoneNumber: this?.props?.location?.state?.user_Data?.contactNumber || '',
         post: this?.props?.location?.state?.user_Data?.position || '',
         postroleId: this?.props?.location?.state?.user_Data?.roleId || '',
         userId: this?.props?.location?.state?.user_Data?.id || '',
         alternatePhoneNumber: this?.props?.location?.state?.user_Data?.alternatePhoneNumber || "",
         allAdminRoles: [],
         city: this?.props?.location?.state?.user_Data?.city || '',
         cityIdList: this?.props?.location?.state?.user_Data?.cityIdList || '',
         allCities: [],
         allCitiesWithId: [],
         allLocationsByCity: [],
         cityLocations: [],
         latitude: this?.props?.location?.state?.user_Data?.lat || '',
         longitude: this?.props?.location?.state?.user_Data?.lng || '',
         businessLocality: this?.props?.location?.state?.user_Data?.location || '',
         allLocationLoader: false
      };

      this.handleSubmit = this.handleSubmit.bind(this);
   }

   componentDidMount() {
      this.props.getAllRoles({ rollId: this.props.module });
      this.props.getAllCityWithId({smartdoorServiceStatus: true, stateId: null});
      console.log(this.state.city)
      console.log(this.state.cityIdList)
      // this.props.getAllCity();
      // if (this.state.city.length) {
      //    this.setState({allLocationLoader:true})
      //    this.props.getUserLocationByCity({ cities: this.state.city[0].split(",") }).then((res) => {
      //       if (res.data && res.data.status === 200) {
      //          console.log("res:", res.data);
      //          const locationsByCity = res.data.resourceData.locations.map(loc => {

      //             return { ...loc, location: `${loc.location} ,${loc.pinCode}` }
      //          })
      //          this.setState({
      //             allLocationsByCity: locationsByCity,
      //             allLocationLoader: false
      //          });
      //       }
      //    })
      //       .catch((err) => console.log("err:", err));
      // }
   }

   handleValidate = async (event) => {
      // event.preventDefault();
      const {allCitiesWithId} = this.props
      let cityIds = [];
      let cityNames = []
   // Iterate over the city array
      for (let i = 0; i < this.state.cityIdList.length; i++) {
      // Find the corresponding city object in allCitiesWithId
      const cityId = this.state.cityIdList[i]
      const cityObject = allCitiesWithId?.data?.find(city => Number(city.cityId) === Number(cityId));
      console.log(cityObject)
      
      // If a city object with the current city name is found
      if (cityObject) {
         // Push the cityId into the cityIds array
         cityIds.push(cityObject.cityId)
         cityNames.push(cityObject.cityName);
         }
      }
   
   // Update the state outside of the loop
      await this.setState({ city: cityNames, cityIdList: cityIds });
      let validate = validateNewTeamMember(this.state);
      this.setState({ error: validate.errors });
      console.log(validate,"validation")
      if (validate.isValid) {
         this.handleSubmit();
      }
   };

   handleSubmit = () => {
      let {
         dob,
         email,
         executiveName,
         location,
         phoneNumber,
         post,
         userId,
         alternatePhoneNumber,
         city,
         cityIdList,
         latitude,
         longitude,
      } = this.state;

      let position = this.props.allAdminRoles.data.filter(
         (_value) => _value.role.toLowerCase() === post.toLowerCase()
      );

      let data = {
         active: true,
         city: city,
         cityIdList: cityIdList,
         dob: dob,
         email: email,
         name: executiveName,
         phoneNumber: phoneNumber,
         position: position.length ? position[0].roleId : post,
         profileComplete: true,
         profileImageUrl: "",
         userId: userId,
         alternatePhoneNumber: alternatePhoneNumber,
         location: location,
         businessLocality: "",
      };

      editTeamMember(data)
         .then((response) => {
            if (response.data && response.data.status === 200) {
               this.props.history.push("/admin/user-management", {autoRefresh : 'Yes'});
            }
         })
         .catch((error) => {
            showErrorToast("Unexpected Error. Please try again later.");
         });
   };

   setCityValue = ({ location, city }) => {
      this.setState({ location: location, city: city });
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
         allLocationsByCity,
         cityLocations
      } = this.state;
      const {
         title: { formTitle, buttonText },
         allAdminRoles,
         allCities,
         allCitiesWithId
      } = this.props;
      const { userData } = this.props.location.state;
      console.log(this.state.city, "seleceted city")
      console.log(this.state.cityIdList, "seleceted city")
      console.log(this.state.location, "selected location")
      console.log(this.state.allLocationsByCity, "all location by city")
      console.log(this.state.post,"[pstt post post post")
      return (
         <>
            <div style={{ height: "5%" }}></div>
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
                                 placeholder="Enter Name"
                                 maxlength="35"
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
                                 disabled="true"
                                 onChange={(e) => this.setState({ post: e.target.value })}>
                                 <option value="">Select</option>
                                 {allAdminRoles.data.length
                                    ? allAdminRoles.data.map((data, index) => (
                                       <option
                                          key={index}
                                          selected={
                                             post.toLowerCase() === data.role.toLowerCase()
                                                ? true
                                                : false
                                          }
                                          value={data.roleId}>
                                          {" "}
                                          {data.role}{" "}
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

                        <Col lg="4">
                        <FormControl className="w-100 mt-4 py-0" style={{height:'40px'}}>
								<InputLabel id="demo-simple-select-helper-label">City</InputLabel>
								<Select
                           
									labelId="demo-simple-select-helper-label"
									id="demo-simple-select-helper"
									multiple
									value={(this.state.cityIdList)}
									label="City"
									onChange={(e) => {
                              this.setState({cityIdList: e.target.value})
										// setData({ ...data, furnishKitchen: [...e?.target?.value] });
									}}
								>
									{allCitiesWithId?.data?.map((option) => (
										<MenuItem key={option.cityId} value={option.cityId}>
											{option.cityName}
										</MenuItem>
									))}
								</Select>
							</FormControl>
                           {/* <Form.Group controlId="exampleForm.SelectCustom">
                              <Form.Label>City</Form.Label>
                              <Form.Control
                                 as="select"
                                 value={this.state.city}
                                 onChange={(e) => {
                                    this.setState({ city: e.target.value , allLocationsByCity: [], location: []});
                                    
                                    this.props
                                       .getLocationByCity({ city: e.target.value })
                                       .then((res) => {
                                          if (res.data && res.data.status === 200) {
                                             console.log("res:", res.data);
                                             this.setState({
                                                allLocationsByCity: res.data.resourceData.locations,
                                             });
                                          }
                                       })
                                       .catch((err) => console.log("err:", err));
                                 }}
                              >
                                 <option value="" disabled>
                                    Select
                                 </option>
                                 {allCities?.data?.cities?.length
                                    ? allCities?.data?.cities?.map((data, index) => (
                                         <option key={index} value={data}>
                                            {data}
                                         </option>
                                      ))
                                    : null}
                              </Form.Control>
                           </Form.Group> */}
                           {/* {this.state.post.toLowerCase().includes("admin") ?  */}
                              {/* <Form.Group controlId="exampleForm.SelectCustom" className="removeSpace">
                              <Form.Label style={{ zIndex: "999999" }}>City</Form.Label>
                              {allCitiesWithId?.data?.length ?
                                 <DropdownMultiselect
                                 name='dropdownCity'
                                    optionLabel={"cityName"}
                                    optionKey={'cityId'}
                                    options={allCitiesWithId?.data}
                                    // options={allLocationsByCity}
                                    // selected={this.state.location.map(locn => {return `${locn.id.toString()}`})}
                                    selected={this.state?.cityIdList || []}
                                    placeholder="Select "
                                    buttonClass="btn-transperant mt-0 dropdown_multiselect"
                                    handleOnChange={(selected) => {
                                       console.log("selected: " + selected)
                                       // console.log(allLocationsByCity, this.state.location, "inside handle change")
                                       this.setState({ cityIdList: selected ? selected : '', allLocationsByCity: [], allLocationLoader: true });
                                       // this.setState({location: []})
                                       // this.props
                                       //    .getUserLocationByCity({ cities: selected })
                                       //    .then((res) => {
                                       //       if (res.data && res.data.status === 200) {
                                       //          console.log("res:", res.data);
                                       //          let loc = []
                                       //          for (let i of res.data.resourceData.locations) {
                                       //             loc = [...loc,...this.state.location.filter(x => x.id === i.id)]
                                       //          }
                                       //          const locationsByCity = res.data.resourceData.locations.map(loc => {

                                       //             return { ...loc, location: `${loc.location} ,${loc.pinCode}` }
                                       //          })
                                       //          console.log(loc,"loc loc loc loc")
                                       //          this.setState({
                                       //             allLocationsByCity: locationsByCity,
                                       //             location: loc,
                                       //             allLocationLoader: false
                                       //          });
                                       //       }
                                       //    })
                                       //    .catch((err) => console.log("err:", err));
                                       // console.log("selected..", selected);
                                       // const originals = allLocationsByCity.filter((allLocations) =>
                                       //    selected.includes(String(allLocations.id))
                                       // );
                                       // console.log("selected:", selected, originals);
                                       // this.setState({ location: originals });
                                    }}
                                 />
                                 : null}
                           </Form.Group> */}
                            {/* :
                            <Form.Group controlId="exampleForm.SelectCustom">
                               <Form.Label>City</Form.Label>
                               <Form.Control
                                 as="select"
                                 value={this.state.city}
                                 onChange={(e) => {
                                    this.setState({ city: [e.target.value] , allLocationsByCity: [], location: [], allLocationLoader:true});
                                    
                                    this.props
                                       .getUserLocationByCity({ cities: [e.target.value] })
                                       .then((res) => {
                                          if (res.data && res.data.status === 200) {
                                             console.log("res:", res.data);
                                             this.setState({
                                                allLocationsByCity: res.data.resourceData.locations,
                                                allLocationLoader: false
                                             });
                                          }
                                       })
                                       .catch((err) => console.log("err:", err));
                                 }}
                              >
                                 <option value="" disabled>
                                    Select
                                 </option>
                                 {allCities?.data?.cities?.length
                                    ? allCities?.data?.cities?.map((data, index) => (
                                         <option key={index} value={data}>
                                            {data}
                                         </option>
                                      ))
                                    : null}
                              </Form.Control>
                           </Form.Group>
                           } */}
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.city}
                           />
                        </Col>
                     </Row>
                     <Row>
                        {/* {!this?.state?.post?.toLowerCase()?.includes("admin") ?
                        // allLocationsByCity.length ? (
                           <Col lg="4">
                              {!this.state.allLocationLoader ? 
                              <Form.Group controlId="exampleForm.SelectCustom" className="removeSpace">
                                 <Form.Label style={{ zIndex: "999999" }}>Location</Form.Label>
                                 <div className="dropdown-location">
                                    
                                    <DropdownMultiselect
                                       optionLabel="location"
                                       optionKey="id"
                                       options={allLocationsByCity}
                                       selected={this.state.location ? this.state.location.map(locn => { return `${locn.id.toString()}` }) : [{ label: '' }]}
                                       placeholder="Select "
                                       buttonClass="btn-transperant mt-0 dropdown_multiselect"
                                       handleOnChange={(selected) => {
                                          console.log("selected..", selected);
                                          let originals = [];
                                          originals = allLocationsByCity.filter((allLocations) =>
                                             selected.includes(String(allLocations.id))
                                          );
                                          originals = originals.map(el => { return { ...el, location: el.location.substring(0, el.location.indexOf(' ,')) } })

                                          console.log("selected:", selected, originals);
                                          this.setState({ location: originals || [] });
                                       }}
                                    />
                                   
                                 </div>
                              </Form.Group>
                               : null}
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="topSpaceminus"
                                 text={error.location}
                              />
                           </Col>
                         : null} */}

                        <Col lg="4">
                           <Form.Group controlId="formBasicLocation">
                              <Form.Label>Date of Birth</Form.Label>
                              <Form.Control
                                 type="date"
                                 // max={new Date().toISOString().split("T")[0]}
                                 placeholder="Enter Date of Birth"
                                 value={dob}
                                 onChange={(e) => this.setState({ dob: e.target.value })}
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
                           <Form.Group controlId="formBasicLocation">
                              <Form.Label>Phone Number</Form.Label>
                              <Form.Control
                                 disabled
                                 type="number"
                                 placeholder="Enter Phone Number"
                                 value={phoneNumber}
                                 onChange={(e) => this.setState({ phoneNumber: e.target.value })}
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
                           <Form.Group controlId="formBasicLocation">
                              <Form.Label>Alternate Number</Form.Label>
                              <Form.Control
                                 type="number"
                                 placeholder="Enter Phone Number"
                                 value={alternatePhoneNumber}
                                 onChange={(e) =>
                                    this.setState({ alternatePhoneNumber: e.target.value })
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
                           <Form.Group controlId="formBasicLocation">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                 type="text"
                                 placeholder="Enter Email"
                                 value={email}
                                 onChange={(e) => this.setState({ email: e.target.value })}
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
                              size="Small"
                              onClick={() => this.handleValidate()}
                              color="white"
                           />
                        </Col>
                     </Row>
                  </form>
               </div>
            </div>
         </>
      );
   }
}

const mapStateToProps = ({ allAdminRoles, allCities, allCitiesWithId, allLocationsByCity }) => ({
   allAdminRoles,
   allCities,
   allLocationsByCity,
   allCitiesWithId
});

const actions = {
   getAllRoles,
   getAllCity,
   getAllCityWithId,
   getLocationByCity,
   getUserLocationByCity
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(EditTeamMemberPage);
