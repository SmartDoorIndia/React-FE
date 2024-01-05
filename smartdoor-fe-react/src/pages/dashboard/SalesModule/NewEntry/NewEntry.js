/** @format */

import { Component, memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import Form from "react-bootstrap/Form";
import Buttons from "../../../../shared/Buttons/Buttons";
import Text from "../../../../shared/Text/Text";
import { Col, Row } from "react-bootstrap";
import { createLead } from "../../../../common/redux/actions";
import { getReverseGeocodingData } from "../../../../common/helpers/Utils";
import { validateNewLeadEntry } from "../../../../common/validations";
import AutoCompleteInput from "../../../../shared/Inputs/AutoComplete";
import { showSuccessToast, showErrorToast } from '../../../../common/helpers/Utils';


class NewEntryPage extends Component {
   constructor() {
      super();
      this.state = {
         error: {},
         contactPerson: "",
         phoneNumber: "",
         location: "",
         leadFor: "",
         post: "",
         societyName: "",
         city: "",
         buttonDisable: false,
         cityLatLong: { lat: 0, lng: 0 },
         zipcode: '',
         citySelected: false,
         locationSelected: false,
      };
   }

   changeHandler = (e) => {
      const result = e.target.value.replace(/\D/g, '');
      // setUserName(result.slice(0,10))
      this.setState({ phoneNumber: result.slice(0, 10) })

   }

   changeCityState = () => {
      this.setState({ citySelected: true })
   }

   changeLocationState = () => {
      this.setState({ locationSelected: true })
   }


   handleValidate = (event) => {
      event.preventDefault();
      const { location, phoneNumber, contactPerson, societyName, leadFor, city, zipcode } = this.state;
      let modifiedAddress = location.replace(/ [0-9]{6}(?=,)/g, "");
      console.log(modifiedAddress,"modifiedAddress");
      const {
         userAuthData: { authData },
      } = this.props;
      let data = {
         address: modifiedAddress,
         builtInYear: "",
         clientInterest: "",
         contactNumber: phoneNumber,
         contactPerson: contactPerson,
         leadFor: "SOCIETY",
         leadId: 0,
         noOfProperties: 0,
         proposedCutOff: 0,
         review: "",
         societyName: societyName,
         source: "Web",
         city: city,
         zipcode: zipcode
      };
      let validate = validateNewLeadEntry(data);
      this.setState({ error: validate.errors });
      if (validate.isValid) {
         this.setState({ buttonDisable: true });
         createLead({ ...data, adminId: authData.userid })
            .then((response) => {
               this.setState({ buttonDisable: false });

               if (response.data && response.data.status === 200) {
                  showSuccessToast(response.data.customMessage);
                  this.props.history.push("/admin/sales");
               } else showErrorToast(response.data.message)

               // if (response.data && response.data.status === 200) {
               //    // this.props.history.goBack();
               // }
            })
            .catch((error) => {
               this.setState({ buttonDisable: false });
            })
         // .finally(() => {
         //    this.props.history.push("/admin/sales");
         // });
      }
   };

   async componentDidMount() {
      // const city = 'Gurugram';
      // const location = await getLocationByCityName(city);
      // if (location.status) {
      //   const { lat, lng } = location;
      //   this.setState({ cityLatLong: { lat, lng } }, () => {
      //    console.log(this.state.cityLatLong);
      //  });
      // }
    }

   render() {
      const { error, buttonDisable, citySelected } = this.state;

      // this.getgeoCodeFromLatLong = this.getgeoCodeFromLatLong.bind(this);

      return (
         <>
            <div style={{ height: "5%" }}></div>
            <div className="whiteBg">
               <Text
                  size="medium"
                  fontWeight="mediumbold"
                  color="secondryColor"
                  text="New Lead Entry"
               />
               <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="" className="mt-1" />
               <div className="newEntry">
                  <form noValidate onSubmit={this.handleValidate} autoComplete="off">
                     <Row>
                        <Col lg="4">
                           <Form.Group controlId="formBasicContact">
                              <Form.Label>Contact Person</Form.Label>
                              <Form.Control
                                 type="text"
                                 maxlength="35"
                                 placeholder="Enter Name"
                                 value={this.state.contactPerson}
                                 onChange={(e) => this.setState({ contactPerson: (e.target.value).replace(/[^A-Za-z\s]/g, '') })}
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.contactPerson}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Group controlId="formBasiPhone">
                              <Form.Label>Phone Number</Form.Label>
                              <Form.Control
                                 type="text"
                                 maxLength={10}
                                 placeholder="Enter Phone Number"
                                 onWheel={() => document.activeElement.blur()}
                                 value={this.state.phoneNumber}
                                 // onChange={(e) => { this.setState({ phoneNumber: (e.target.value).slice(0,10) })}}
                                 onChange={(e) => this.changeHandler(e)}
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.contactNumber}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Group controlId="formBasicSociety">
                              <Form.Label>Society Name</Form.Label>
                              <Form.Control
                                 type="text"
                                 maxlength="35"
                                 placeholder="Enter Society Name"
                                 onChange={(e) => this.setState({ societyName: e.target.value })}
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.societyName}
                           />
                        </Col>
                     </Row>
                     <Row>
                        <Col lg="4">
                           <Form.Group controlId="formBasicLocation">
                              <AutoCompleteInput
                                 label="City"
                                 placeholder="Enter City"
                                 id="newLeadCityAutoComplete"
                                 onSelectOption={({ city, latlng }) =>
                                    this.setState({ city, cityLatLong: latlng })
                                 }
                                 onBlurInput={() => {
                                    if (!this.state?.cityLatLong) {
                                       this.setState({ city: '', cityLatLong: '' })
                                    }
                                 }
                                 }
                                 customValue={this.state.city || ''}
                                 onInputChange={(value) => {
                                    this.setState({ city: value, cityLatLong: null })
                                 }
                                 }
                                 predictionType="city"
                                 changeCityState={this.changeCityState}
                              citySelected = {citySelected}
                                 // disabled
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.city}
                           />
                        </Col>

                        <Col lg="4">
                           <Form.Group controlId="formBasicLocation">
                              <AutoCompleteInput
                                 label="Location"
                                 placeholder="Enter Location"
                                 id="newLeadLocationAutoComplete"
                                 onSelectOption={({ location, latlng }) => {
                                    console.log(location, latlng)
                                    this.setState({ location,  locationLatLog: latlng})
                                    getReverseGeocodingData(latlng.lat, latlng.lng).then(res => this.setState({ zipcode: res, locationSelected: true }))
                                       .catch(err => console.log("err..", err));
                                 }}
                                 onBlurInput={() => {
                                    if (!this.state?.locationLatLog) {
                                       this.setState({ location: '', locationLatLog: '' })
                                    }
                                 }}
                                 customValue={this.state.location || ''}
                                 onInputChange={(value) => {
                                    this.setState({ location: value, locationLatLog: null })
                                 }}
                                 center={this.state.cityLatLong}
                              // changeLocationState = {this.changeLocationState}
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.address}
                           />
                        </Col>

                        <Col lg="4">
                           <Form.Group controlId="exampleForm.SelectCustom">
                              <Form.Label>Lead For</Form.Label>
                              <Form.Control
                                 // as="select"
                                 type="text"
                                 value={"Society"}
                                 disabled="true"
                                 // onChange={(e) => this.setState({ leadFor: e.target.value })}
                                 >
                                 {/* <option value="">Select</option> */}
                                 {/* <option value="SOCIETY">Society</option> */}
                                 {/*<option value="PROPERTY">Property</option>*/}
                              </Form.Control>
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.leadFor}
                           />
                        </Col>
                     </Row>

                     <Row className="justify-content-center ">
                        <Col lg="3">
                           <Buttons
                              name="Add New Entry"
                              varient="primary"
                              type="submit"
                              size="Small"
                              color="white"
                              disabled={
                                 // this.state.citySelected && 
                                 this.state.locationSelected && !buttonDisable ? false : true}
                           />
                           {/* {this.props.module === "SALES" ? (
                              <>
                                 <Text
                                    size="body"
                                    fontWeight="smbold"
                                    color="secondryColor"
                                    text="Or"
                                    className="text-center pt-4 pb-4"
                                 />
                                 <ToolTip position="left" name="Under development">
                                    <div className="uploadFile">
                                       <Form.Group>
                                          <Form.File
                                             id="exampleFormControlFile1"
                                             label="Upload Files"
                                          />
                                          <Text
                                             size="xSmall"
                                             fontWeight="smbold"
                                             color="secondryColor"
                                             text=".xls, .ext, .ext"
                                             className="mt-1"
                                          />
                                       </Form.Group>
                                    </div>
                                 </ToolTip>
                              </>
                           ) : null} */}
                        </Col>
                     </Row>
                  </form>
               </div>
            </div>
         </>
      );
   }
}

const mapStateToProps = ({ userAuthData }) => ({
   userAuthData,
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(NewEntryPage);
