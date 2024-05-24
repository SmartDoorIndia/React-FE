/** @format */

// import react,{useEffect,useState} from 'react';
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Buttons from "../../../../shared/Buttons/Buttons";
import Text from "../../../../shared/Text/Text";
import { Col, Row } from "react-bootstrap";
import { ToolTip, getLocalStorage } from "../../../../common/helpers/Utils";
import {
   getAllFilters,
   getSocietyByCity,
   createNewProperty,
} from "../../../../common/redux/actions";
import { connect } from "react-redux";
import { compose } from "redux";
import CheckBoxComponent from "../../../../shared/CheckBox/CheckBoxComponent";
// import style from './EditProperty.scss';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import AutoCompleteInput from "../../../../shared/Inputs/AutoComplete";
import { validateNewProperty } from "../../../../common/validations";
import { Autocomplete } from "devextreme-react/autocomplete";
import RadioButton from "../../../../shared/RadioButton/RadioButton";
import S3 from "react-aws-s3";
import Constants from "../../../../common/helpers/Constants";

const numarr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const ReactS3Client = new S3(Constants.CONFIG);

class EditProperty extends Component {
   constructor(props) {
      super(props);
      const { getAllFilters, getAllFiltersData, getSocietyByCity, getSocietyByCityData } = props;
      const userData = getLocalStorage("authData");
      const editpropertyData = props.location.state
         ? props.location.state.editpropertyData || ""
         : "";

      //console.log("editpropertyData:",editpropertyData);

      //this.props.location.state ? this.props.location.state.data.societyName? this.props.location.state.data.societyName : "" : ''
      this.state = {
         error: {},
         postedById: userData.userid,
         amenities: editpropertyData
            ? editpropertyData.propertyInfoResponse.amenities
               ? editpropertyData.propertyInfoResponse.amenities
               : ""
            : "",
         // editpropertyData?editpropertyData.propertyInfoResponse.numberOfBath?editpropertyData.propertyInfoResponse.numberOfBath:"":""
         constructionSize: editpropertyData
            ? editpropertyData.propertyInfoResponse.contructionSize
               ? editpropertyData.propertyInfoResponse.contructionSize
               : ""
            : "",
         enteranceFacing: editpropertyData
            ? editpropertyData.propertyInfoResponse.enteranceFacing
               ? editpropertyData.propertyInfoResponse.enteranceFacing
               : ""
            : "",
         investmentOpportunity: editpropertyData
            ? editpropertyData.propertyInfoResponse.invetmentOppertunity
               ? editpropertyData.propertyInfoResponse.invetmentOppertunity
               : false
            : false,
         loanAvailable: editpropertyData
            ? editpropertyData.propertyInfoResponse.loanAvailable
               ? editpropertyData.propertyInfoResponse.loanAvailable
               : false
            : false,
         loanFromBank: editpropertyData
            ? editpropertyData.propertyInfoResponse.loanFromBank
               ? editpropertyData.propertyInfoResponse.loanFromBank
               : ""
            : "",
         majorityComposition: editpropertyData
            ? editpropertyData.propertyInfoResponse.majorityComposition
               ? editpropertyData.propertyInfoResponse.majorityComposition
               : ""
            : "",
         oldRate: editpropertyData
            ? editpropertyData.propertyInfoResponse.oldRate
               ? editpropertyData.propertyInfoResponse.oldRate
               : ""
            : "",
         propertyDescription: editpropertyData
            ? editpropertyData.propertyInfoResponse.propertyDescription
               ? editpropertyData.propertyInfoResponse.propertyDescription
               : ""
            : "",
         propertyFurnishing: editpropertyData
            ? editpropertyData.propertyInfoResponse.propertyFurnishing
               ? editpropertyData.propertyInfoResponse.propertyFurnishing
               : ""
            : "",
         religiousPlace: editpropertyData
            ? editpropertyData.propertyInfoResponse.religiousPlace
               ? editpropertyData.propertyInfoResponse.religiousPlace
               : ""
            : "",
         security: editpropertyData
            ? editpropertyData.propertyInfoResponse.security
               ? editpropertyData.propertyInfoResponse.security
               : ""
            : "",
         storeDistance: editpropertyData
            ? editpropertyData.propertyInfoResponse.storeDistance
               ? editpropertyData.propertyInfoResponse.storeDistance
               : ""
            : "",
         postedById: editpropertyData
            ? editpropertyData.postedById
               ? editpropertyData.postedById
               : ""
            : "",
         //buildingProjectSociety:editpropertyData.societyDetailResponse.societyName||"",
         buildingProjectSociety: editpropertyData
            ? editpropertyData.buildingProjectSociety
               ? editpropertyData.buildingProjectSociety
               : ""
            : "",
         city: editpropertyData ? (editpropertyData.city ? editpropertyData.city : "") : "",
         cityLat: 0,
         cityLong: 0,
         floorNumber: editpropertyData
            ? editpropertyData.propertyInfoResponse.floor
               ? editpropertyData.propertyInfoResponse.floor
               : ""
            : "",
         houseNumber: editpropertyData
            ? editpropertyData.houseNumber
               ? editpropertyData.houseNumber
               : ""
            : "",
         totalFloor: editpropertyData
            ? editpropertyData.propertyInfoResponse.totalFloor
               ? editpropertyData.propertyInfoResponse.totalFloor
               : ""
            : "",
         attachedOpenAreaOrGarden: editpropertyData
            ? editpropertyData.propertyInfoResponse.attachedOpenAreaOrGarden
               ? editpropertyData.propertyInfoResponse.attachedOpenAreaOrGarden
               : ""
            : "",
         attachedOpenTerraceArea: editpropertyData
            ? editpropertyData.propertyInfoResponse.attachedOpenTerraceArea
               ? editpropertyData.propertyInfoResponse.attachedOpenTerraceArea
               : ""
            : "",
         balcony: editpropertyData
            ? editpropertyData.propertyInfoResponse.balcony
               ? editpropertyData.propertyInfoResponse.balcony
               : ""
            : "",
         bedRooms: editpropertyData
            ? editpropertyData.bedRooms
               ? editpropertyData.bedRooms.toString().split(".")[0]
               : ""
            : "",
         carpetArea: editpropertyData
            ? editpropertyData.carpetArea
               ? editpropertyData.carpetArea
               : ""
            : "",
         coveredParking: editpropertyData
            ? editpropertyData.propertyInfoResponse.coveredParking
               ? editpropertyData.propertyInfoResponse.coveredParking
               : ""
            : "",
         furnishedText: editpropertyData
            ? editpropertyData.propertyFurnishing
               ? editpropertyData.propertyFurnishing
               : ""
            : "",
         hall: editpropertyData ? (editpropertyData.hall ? editpropertyData.hall : "") : "",
         kitchen: editpropertyData
            ? editpropertyData.kitchen
               ? editpropertyData.kitchen.toString()
               : ""
            : "",
         maintenanceCost: editpropertyData
            ? editpropertyData.propertyInfoResponse.maintenceCost
               ? editpropertyData.propertyInfoResponse.maintenceCost
               : ""
            : "",
         numberOfBath: editpropertyData
            ? editpropertyData.numberOfBath
               ? editpropertyData.numberOfBath
               : ""
            : "",
         openParking: editpropertyData
            ? editpropertyData.propertyInfoResponse.openParking
               ? editpropertyData.propertyInfoResponse.openParking
               : ""
            : "",
         propertyAge: editpropertyData
            ? editpropertyData.propertyInfoResponse.propertyAge
               ? editpropertyData.propertyInfoResponse.propertyAge
               : ""
            : "",
         propertyCategory: editpropertyData
            ? editpropertyData.propertyCategory
               ? editpropertyData.propertyCategory
               : ""
            : "",
         propertyRate: editpropertyData
            ? editpropertyData.propertyRate
               ? editpropertyData.propertyRate
               : ""
            : "",
         propertySubType: editpropertyData
            ? editpropertyData.propertySubType
               ? editpropertyData.propertySubType
               : ""
            : "",
         propertyType: editpropertyData
            ? editpropertyData.propertyType
               ? editpropertyData.propertyType
               : ""
            : "",
         type: editpropertyData
            ? editpropertyData.propertyInfoResponse.type
               ? editpropertyData.propertyInfoResponse.type
               : ""
            : "",
         roleId: userData ? (userData.roleId ? userData.roleId : "") : "",
         _gPlaceCity: editpropertyData ? (editpropertyData.city ? editpropertyData.city : "") : "",
         _gPlaceLocation: "",
         //editpropertyData.propertyInfoResponse.propertyAge ==="Ready Possession" || editpropertyData.propertyInfoResponse.propertyAge === "Under Construction"?
         propertyAgeVal: editpropertyData
            ? editpropertyData.propertyInfoResponse.propertyAge
               ? editpropertyData.propertyInfoResponse.propertyAge === "Ready Possession" ||
                 editpropertyData.propertyInfoResponse.propertyAge === "Under Construction"
                  ? editpropertyData.propertyInfoResponse.propertyAge
                  : "Others"
               : ""
            : "",
         societyString: "",
         locationLatLong: { lat: 0, lng: 0 },
         selectedCityName: editpropertyData
            ? editpropertyData.city
               ? editpropertyData.city
               : ""
            : "",
         societyResp: [],
         value: "",
         socSuggestions: [],
         locality: editpropertyData
            ? editpropertyData.propertyInfoResponse.locality
               ? editpropertyData.propertyInfoResponse.locality
               : "" || editpropertyData.societyDetailResponse.locality
               ? editpropertyData.societyDetailResponse.locality
               : "" || ""
            : "",
         addRooms: editpropertyData
            ? editpropertyData.bedRooms
               ? editpropertyData.bedRooms.toString().includes(".5")
               : false
            : false,
         propertyId: editpropertyData
            ? editpropertyData.smartdoorPropertyId
               ? editpropertyData.smartdoorPropertyId
               : ""
            : "",
         //editpropertyData.address||editpropertyData.societyDetailResponse.societyName||""
         address: editpropertyData
            ? editpropertyData.address
               ? editpropertyData.address
               : "" || editpropertyData.societyDetailResponse.societyName
               ? editpropertyData.societyDetailResponse.societyName
               : ""
            : "",
         noOfUnits: editpropertyData
            ? editpropertyData.noOfUnits
               ? editpropertyData.noOfUnits
               : ""
            : "",
         buttonDisable: false,
         latitude: editpropertyData
            ? editpropertyData.latitude
               ? editpropertyData.latitude
               : ""
            : "",
         longitude: editpropertyData
            ? editpropertyData.longitude
               ? editpropertyData.longitude
               : ""
            : "",
         societyId: editpropertyData
            ? editpropertyData.societyDetailResponse.societyId
               ? editpropertyData.societyDetailResponse.societyId
               : ""
            : "",
      };
   }

   //RadioButton: onValueChanged
   onValueChanged = (e) => {
      if (e.value === "Yes") {
         this.setState({
            loanAvailable: true,
         });
      } else {
         this.setState({
            loanAvailable: false,
         });
      }
   };

   //RadioButton: onValueinvestmentOpportunityChanged
   onValueinvestmentOpportunityChanged = (e) => {
      if (e.value === "Yes") {
         this.setState({
            investmentOpportunity: true,
         });
      } else {
         this.setState({
            investmentOpportunity: false,
         });
      }
   };

   //Autocomplete: onChange
   handleAutocompleteChange = (e) => {
      getSocietyByCity({ city: this.state.selectedCityName, societyString: e.value })
         .then((response) => {
            let suggestionArr = [];
            this.setState({ societyResp: response });
            console.log("societyResp", this.state.societyResp);
            this.state.societyResp.map((cVal, index) => {
               suggestionArr.push({
                  id: cVal.societyId,
                  name: cVal.societyName,
                  locality: cVal.locality,
                  socLat: cVal.latitude,
                  socLng: cVal.longitute,
               });
            });
            this.setState({ socSuggestions: suggestionArr });
         })
         .catch((error) => {});
   };

   handleoSelectionChanged = (e) => {
      this.setState({ buildingProjectSociety: e.selectedItem.name });
      this.setState({
         locality: e.selectedItem.locality,
         locationLatLong: { lat: e.selectedItem.socLat, lng: e.selectedItem.socLng },
         latitude: e.selectedItem.socLat,
         longitude: e.selectedItem.socLng,
         societyId: e.selectedItem.id,
      });
      console.log(e.value);
   };

   handleCheckBoxChange = () => {
      this.setState({
         addRooms: !this.state.addRooms,
         // bedRooms:this.state.bedRooms + ".5"
      });
   };

   componentDidMount() {
      this.props.getAllFilters();
   }

   handleValidate = (event) => {
      event.preventDefault();
      const {
         error,
         amenities,
         constructionSize,
         enteranceFacing,
         investmentOpportunity,
         loanAvailable,
         loanFromBank,
         majorityComposition,
         oldRate,
         propertyDescription,
         propertyFurnishing,
         religiousPlace,
         security,
         storeDistance,
         postedById,
         buildingProjectSociety,
         city,
         cityLat,
         cityLong,
         floorNumber,
         houseNumber,
         totalFloor,
         attachedOpenAreaOrGarden,
         attachedOpenTerraceArea,
         balcony,
         bedRooms,
         carpetArea,
         coveredParking,
         furnishedText,
         hall,
         kitchen,
         noOfUnits,
         maintenanceCost,
         numberOfBath,
         openParking,
         propertyAge,
         propertyCategory,
         propertyRate,
         propertySubType,
         propertyType,
         type,
         latitude,
         longitude,
         societyId,
         roleId,
         propertyAgeVal,
         locationLatLong,
         selectedCityName,
         locality,
         propertyId,
         address,
      } = this.state;
      const userData = getLocalStorage("authData");

      let propertyData = {
         addPropertyMoreInfoRequest: {
            amenities: amenities.toString(),
            constructionSize: constructionSize,
            enteranceFacing: enteranceFacing,
            investmentOpportunity: investmentOpportunity,
            loanAvailable: loanAvailable,
            loanFromBank: loanFromBank,
            majorityComposition: majorityComposition,
            oldRate: oldRate,
            propertyDescription: propertyDescription,
            propertyFurnishing: propertyFurnishing,
            religiousPlace: religiousPlace,
            security: security,
            storeDistance: storeDistance,
         },
         postedById: userData.userid,
         propertyAddressRequest: {
            address: address,
            locality: locality,
            buildingProjectSociety: buildingProjectSociety,
            city: selectedCityName,
            cityLat: cityLat,
            cityLong: cityLong,
            floorNumber: floorNumber,
            houseNumber: houseNumber,
            totalFloor: totalFloor,
            latitude: latitude,
            longitude: longitude,
            societyId: societyId,
         },
         propertyBasicDetailRequest: {
            attachedOpenAreaOrGarden: attachedOpenAreaOrGarden,
            attachedOpenTerraceArea: attachedOpenTerraceArea,
            balcony: balcony,
            bedRooms: this.state.addRooms ? bedRooms.split(".")[0] + ".5" : bedRooms.split(".")[0],
            carpetArea: carpetArea,
            coveredParking: coveredParking,
            furnishedText: furnishedText,
            hall: hall,
            kitchen: kitchen,
            noOfUnits: noOfUnits,
            maintenanceCost: maintenanceCost,
            numberOfBath: numberOfBath,
            openParking: openParking,
            propertyAge: propertyAge,
            propertyCategory: propertyCategory,
            propertyRate: propertyRate,
            propertySubType: propertySubType,
            propertyType: propertyType,
            type: type,
         },
         propertyDocsRequest: {},
         propertyId: propertyId,
         roleId: roleId,
      };

      let validate = validateNewProperty(propertyData);
      this.setState({ error: validate.errors });
      if (validate.isValid) {
         this.setState({ buttonDisable: true });
         //API CALL
         createNewProperty({ ...propertyData })
            .then((response) => {
               this.setState({ buttonDisable: false });
               if (response.data && response.data.status === 200) {
                  this.props.history.push("/admin/property");
               }
            })
            .catch((error) => {
               this.setState({ buttonDisable: false });
            });
      }
   };

   setLocationValue = async (data) => {
      this.setState({ locationLatLong: data.latlng, _gPlaceLocation: data.location });
   };

   setCityValue = async (data) => {
      this.setState({
         cityLatLong: data.latlng,
         selectedCityName: data.city,
         _gPlaceCity: data.city,
         cityLat: data.latlng.lat,
         cityLong: data.latlng.lng,
      });
   };

   render() {
      const { getAllFilters, getAllFiltersData, getSocietyByCity, getSocietyByCityData } =
         this.props;
      const {
         error,
         amenities,
         constructionSize,
         enteranceFacing,
         investmentOpportunity,
         loanAvailable,
         loanFromBank,
         majorityComposition,
         oldRate,
         propertyDescription,
         propertyFurnishing,
         religiousPlace,
         security,
         storeDistance,
         postedById,
         buildingProjectSociety,
         city,
         cityLat,
         cityLong,
         floorNumber,
         houseNumber,
         totalFloor,
         attachedOpenAreaOrGarden,
         attachedOpenTerraceArea,
         balcony,
         bedRooms,
         carpetArea,
         coveredParking,
         furnishedText,
         hall,
         kitchen,
         maintenanceCost,
         numberOfBath,
         openParking,
         propertyAge,
         propertyCategory,
         propertyRate,
         propertySubType,
         propertyType,
         type,
         locality,
         societyId,
         roleId,
         propertyAgeVal,
         locationLatLong,
         selectedCityName,
         societyResp,
         societytext,
         socSuggestions,
         addRooms,
         address,
         buttonDisable,
         noOfUnits,
      } = this.state;

      this.onValueChanged = this.onValueChanged.bind(this);
      this.onValueinvestmentOpportunityChanged =
         this.onValueinvestmentOpportunityChanged.bind(this);
      this.handleAutocompleteChange = this.handleAutocompleteChange.bind(this);

      return (
         <>
            {/* <div style={{height:'5%'}}>
                </div> */}
            <div className="whiteBg">
               <Text
                  size="medium"
                  fontWeight="mediumbold"
                  color="secondryColor"
                  text="Upload Property"
               />
               <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="" className="mt-1" />
               {Object.keys(getAllFiltersData.data).length > 0 ? (
                  <div className="new_property">
                     <form noValidate onSubmit={this.handleValidate} autoComplete="off">
                        <Row>
                           <Col lg="4">
                              <div className="form-input-control">
                                 <Form.Group controlId="formBasiPhone">
                                    <AutoCompleteInput
                                       label="City"
                                       placeholder="Enter City"
                                       onSelectOption={this.setCityValue}
                                       predictionType="city"
                                       defaultValue={city}
                                    />

                                    <Text
                                       color="dangerText"
                                       size="xSmall"
                                       className="pt-2"
                                       text={error.city}
                                    />
                                 </Form.Group>
                              </div>
                           </Col>

                           <Col lg="4">
                              <Form.Group controlId="formBasiPhone">
                                 <Form.Label style={{ zIndex: "999999" }}>
                                    Building/Project/Society
                                 </Form.Label>

                                 <Autocomplete
                                    dataSource={socSuggestions}
                                    // value={buildingProjectSociety}
                                    defaultValue={buildingProjectSociety}
                                    onValueChanged={this.handleAutocompleteChange}
                                    onSelectionChanged={this.handleoSelectionChanged}
                                    placeholder="Select"
                                    valueExpr="name"
                                    searchExpr="name"
                                    style={{ height: "48px" }}
                                 />

                                 <Text color="dangerText" size="xSmall" className="pt-2" text="" />
                              </Form.Group>
                           </Col>

                           <Col lg="4">
                              <Form.Group controlId="formBasicSociety">
                                 <Form.Label>Street/Landmark</Form.Label>

                                 <Form.Control
                                    type="text"
                                    maxlength="35"
                                    placeholder="Enter Street/Landmark"
                                    value={address}
                                    onChange={(e) => this.setState({ address: e.target.value })}
                                 />
                              </Form.Group>
                              <Text color="dangerText" size="xSmall" className="pt-2" text="" />
                           </Col>
                        </Row>

                        <Row>
                           <Col lg="4">
                              <Form.Group controlId="formBasicSociety">
                                 <Form.Label>Locality</Form.Label>
                                 <Form.Control
                                    type="text"
                                    maxlength="35"
                                    placeholder="Enter Locality"
                                    // onChange={(e)=>e.target.value}
                                    value={locality}
                                    disabled
                                 />
                              </Form.Group>
                              <Text color="dangerText" size="xSmall" className="pt-2" text="" />
                           </Col>
                        </Row>
                        <hr />

                        <Row>
                           <Col lg="4">
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Property For</Form.Label>

                                 <Form.Control
                                    as="select"
                                    value={propertyCategory}
                                    onChange={(e) =>
                                       this.setState({ propertyCategory: e.target.value })
                                    }>
                                    <option value="">Select</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Sale">Sale</option>
                                    {/* {getAllFiltersData.data.propertyCategory.map((cVal)=>{ 
                                            return <option value="">{cVal}</option>
                                        })} */}
                                 </Form.Control>
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.propertyCategory}
                              />
                           </Col>

                           <Col lg="4">
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Property Type</Form.Label>
                                 <Form.Control
                                    as="select"
                                    value={propertyType}
                                    onChange={(e) =>
                                       this.setState({ propertyType: e.target.value })
                                    }>
                                    <option value="">Select</option>
                                    {getAllFiltersData.data.propertyType.map((cVal) => {
                                       return <option value={cVal}>{cVal}</option>;
                                    })}
                                 </Form.Control>
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.propertyType}
                              />
                           </Col>

                           <Col lg="4">
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Residential</Form.Label>
                                 <Form.Control
                                    as="select"
                                    value={propertySubType}
                                    onChange={(e) =>
                                       this.setState({ propertySubType: e.target.value })
                                    }>
                                    <option value="">Select</option>
                                    {getAllFiltersData.data.propertySubType.map((cVal) => {
                                       return <option value={cVal}>{cVal}</option>;
                                    })}
                                 </Form.Control>
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.propertySubType}
                              />
                           </Col>
                        </Row>

                        <Row>
                           <Col lg="4">
                              <Form.Group controlId="formBasicSociety">
                                 <Form.Label>No. Of Units</Form.Label>
                                 <Form.Control
                                    type="numeric"
                                    maxlength="35"
                                    placeholder="Enter No. Of Units"
                                    value={noOfUnits}
                                    onChange={(e) => this.setState({ noOfUnits: e.target.value })}
                                 />
                              </Form.Group>
                              <Text color="dangerText" size="xSmall" className="pt-2" text="" />
                           </Col>

                           <Col lg={propertyAgeVal === "Others" ? "3" : "4"}>
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Property Age</Form.Label>
                                 <Form.Control
                                    as="select"
                                    value={propertyAgeVal}
                                    onChange={(e) =>
                                       e.target.value === "Ready Possession" ||
                                       e.target.value === "Under Construction"
                                          ? this.setState({ propertyAge: e.target.value })
                                          : this.setState({ propertyAgeVal: e.target.value })
                                    }>
                                    <option value="">Select</option>
                                    <option value="Ready Possession">Ready Possession</option>
                                    <option value="Under Construction">Under Construction</option>
                                    <option value="Others">Others</option>
                                 </Form.Control>
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.propertyAge}
                              />
                           </Col>
                           {propertyAgeVal === "Others" ? (
                              <Col lg="1">
                                 <Form.Group controlId="formBasicSociety">
                                    <Form.Label> </Form.Label>
                                    <Form.Control
                                       type="numeric"
                                       maxlength="20"
                                       placeholder="Age"
                                       value={propertyAge}
                                       onChange={(e) =>
                                          this.setState({ propertyAge: e.target.value })
                                       }
                                    />
                                 </Form.Group>
                                 <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.propertyAge}
                                 />
                              </Col>
                           ) : null}

                           <Col lg="4">
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Bedrooms</Form.Label>
                                 {/* <Form.Control as="select" value={bedRooms.split(".")[0]} onChange={(e) => this.setState({bedRooms: e.target.value })}> */}
                                 <Form.Control
                                    as="select"
                                    value={bedRooms}
                                    onChange={(e) => this.setState({ bedRooms: e.target.value })}>
                                    <option value="">Select</option>
                                    {numarr.map((cVal) => {
                                       return <option value={cVal}>{cVal}</option>;
                                    })}
                                 </Form.Control>
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.bedRooms}
                              />
                           </Col>
                        </Row>
                        <Row>
                           <Col lg="4">
                              <div className="mt-5">
                                 <span className="text-muted mr-3 fs-14 p-3">
                                    Additional .5 Room
                                 </span>
                                 <CheckBoxComponent
                                    id="AdditionalRoom"
                                    value=""
                                    checked={addRooms}
                                    onChange={this.handleCheckBoxChange}
                                 />
                              </div>
                              {/* <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label>Additional .5 Room </Form.Label>
                                    <CheckBoxComponent id= "AdditionalRoom" className = "mt-3" value="" checked =""/>
                                </Form.Group>
                                <Text color="dangerText" size="xSmall" className="pt-2" text="" /> */}
                           </Col>

                           <Col lg="4">
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Hall</Form.Label>
                                 <Form.Control
                                    as="select"
                                    value={hall}
                                    onChange={(e) => this.setState({ hall: e.target.value })}>
                                    <option value="">Select</option>
                                    {numarr.map((cVal) => {
                                       return <option value={cVal}>{cVal}</option>;
                                    })}
                                 </Form.Control>
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.hall}
                              />
                           </Col>

                           <Col lg="4">
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Kitchen</Form.Label>
                                 <Form.Control
                                    as="select"
                                    value={kitchen}
                                    onChange={(e) => this.setState({ kitchen: e.target.value })}>
                                    <option value="">Select</option>
                                    {numarr.map((cVal) => {
                                       return <option value={cVal}>{cVal}</option>;
                                    })}
                                 </Form.Control>
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.kitchen}
                              />
                           </Col>
                        </Row>

                        <Row>
                           <Col lg="4">
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Bathrooms</Form.Label>
                                 <Form.Control
                                    as="select"
                                    value={numberOfBath}
                                    onChange={(e) =>
                                       this.setState({ numberOfBath: e.target.value })
                                    }>
                                    <option value="">Select</option>
                                    {numarr.map((cVal) => {
                                       return <option value={cVal}>{cVal}</option>;
                                    })}
                                 </Form.Control>
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.numberOfBath}
                              />
                           </Col>

                           <Col lg="4">
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Balcony</Form.Label>
                                 <Form.Control
                                    as="select"
                                    value={balcony}
                                    onChange={(e) => this.setState({ balcony: e.target.value })}>
                                    <option value="">Select</option>
                                    {numarr.map((cVal) => {
                                       return <option value={cVal}>{cVal}</option>;
                                    })}
                                 </Form.Control>
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.balcony}
                              />
                           </Col>

                           <Col lg="4">
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Covered Parking</Form.Label>
                                 <Form.Control
                                    as="select"
                                    value={coveredParking}
                                    onChange={(e) =>
                                       this.setState({ coveredParking: e.target.value })
                                    }>
                                    <option value="">Select</option>
                                    {numarr.map((cVal) => {
                                       return <option value={cVal}>{cVal}</option>;
                                    })}
                                 </Form.Control>
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.coveredParking}
                              />
                           </Col>
                        </Row>

                        <Row>
                           <Col lg="4">
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Open Parking</Form.Label>
                                 <Form.Control
                                    as="select"
                                    value={openParking}
                                    onChange={(e) =>
                                       this.setState({ openParking: e.target.value })
                                    }>
                                    <option value="">Select</option>
                                    {numarr.map((cVal) => {
                                       return <option value={cVal}>{cVal}</option>;
                                    })}
                                 </Form.Control>
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.openParking}
                              />
                           </Col>

                           <Col lg="4">
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Access Type</Form.Label>
                                 <Form.Control
                                    as="select"
                                    value={type}
                                    onChange={(e) => this.setState({ type: e.target.value })}>
                                    <option value="">Select</option>
                                    {getAllFiltersData.data.independentHouseProjectType.map(
                                       (cVal) => {
                                          return <option value={cVal}>{cVal}</option>;
                                       }
                                    )}
                                 </Form.Control>
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.type}
                              />
                           </Col>

                           <Col lg="4">
                              <Form.Group controlId="formBasiPhone">
                                 <Form.Label>Price</Form.Label>
                                 <Form.Control
                                    type="number"
                                    placeholder="Enter Price"
                                    value={propertyRate}
                                    onChange={(e) =>
                                       this.setState({ propertyRate: e.target.value })
                                    }
                                 />
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.propertyRate}
                              />
                           </Col>
                        </Row>

                        <Row>
                           <Col lg="4">
                              <Form.Group controlId="formBasicSociety">
                                 <Form.Label>Maintanance Charges (Per Month)</Form.Label>
                                 <Form.Control
                                    type="text"
                                    maxlength="35"
                                    placeholder="Enter Maintanance Charges"
                                    value={maintenanceCost}
                                    onChange={(e) =>
                                       this.setState({ maintenanceCost: e.target.value })
                                    }
                                 />
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.maintenanceCost}
                              />
                           </Col>

                           <Col lg="4">
                              <Form.Group controlId="formBasicSociety">
                                 <Form.Label>Carpet Area (Including Balcony)</Form.Label>
                                 <Form.Control
                                    type="text"
                                    maxlength="35"
                                    placeholder="Enter Carpet Area"
                                    value={carpetArea}
                                    onChange={(e) => this.setState({ carpetArea: e.target.value })}
                                 />
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.carpetArea}
                              />
                           </Col>

                           <Col lg="4">
                              <Form.Group controlId="formBasicSociety">
                                 <Form.Label>Attached Open Terrace Area</Form.Label>
                                 <Form.Control
                                    type="text"
                                    maxlength="35"
                                    placeholder="Enter Attached Open Terrace Area"
                                    value={attachedOpenTerraceArea}
                                    onChange={(e) =>
                                       this.setState({ attachedOpenTerraceArea: e.target.value })
                                    }
                                 />
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.attachedOpenAreaOrGarden}
                              />
                           </Col>
                        </Row>

                        <Row>
                           <Col lg="4">
                              <Form.Group controlId="formBasicSociety">
                                 <Form.Label>Attached Open Area/Garden</Form.Label>
                                 <Form.Control
                                    type="text"
                                    maxlength="35"
                                    placeholder="Enter Attached Open Area/Garden"
                                    value={attachedOpenAreaOrGarden}
                                    onChange={(e) =>
                                       this.setState({ attachedOpenAreaOrGarden: e.target.value })
                                    }
                                 />
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.attachedOpenTerraceArea}
                              />
                           </Col>

                           <Col lg="4">
                              <Form.Group controlId="formBasicSociety">
                                 <Form.Label>Flat No</Form.Label>
                                 <Form.Control
                                    type="numeric"
                                    maxlength="35"
                                    placeholder="Enter Flat No"
                                    value={houseNumber}
                                    onChange={(e) => this.setState({ houseNumber: e.target.value })}
                                 />
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.houseNumber}
                              />
                           </Col>

                           <Col lg="4">
                              <Form.Group controlId="formBasicSociety">
                                 <Form.Label>Floor No</Form.Label>
                                 <Form.Control
                                    type="numeric"
                                    maxlength="35"
                                    placeholder="Enter Floor No"
                                    value={floorNumber}
                                    onChange={(e) => this.setState({ floorNumber: e.target.value })}
                                 />
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.floorNumber}
                              />
                           </Col>
                        </Row>

                        <Row>
                           <Col lg="4">
                              <Form.Group controlId="formBasicSociety">
                                 <Form.Label>Total Floors</Form.Label>
                                 <Form.Control
                                    type="numeric"
                                    maxlength="35"
                                    placeholder="Enter Total Floors"
                                    value={totalFloor}
                                    onChange={(e) => this.setState({ totalFloor: e.target.value })}
                                 />
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.totalFloor}
                              />
                           </Col>
                        </Row>
                        <hr />

                        <Row>
                           <Col lg="12">
                              <Form.Group controlId="formBasicSociety">
                                 <Form.Label>Description</Form.Label>
                                 <Form.Control
                                    as="textarea"
                                    type="text"
                                    placeholder="Enter Description"
                                    value={propertyDescription}
                                    onChange={(e) =>
                                       this.setState({ propertyDescription: e.target.value })
                                    }
                                 />
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.propertyDescription}
                              />
                           </Col>
                        </Row>

                        <Row>
                           <Col lg="4">
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Furnishing</Form.Label>
                                 <Form.Control
                                    as="select"
                                    value={propertyFurnishing}
                                    onChange={(e) =>
                                       this.setState({ propertyFurnishing: e.target.value })
                                    }>
                                    <option value="">Select</option>
                                    {getAllFiltersData.data.propertyFurnishing.map((cVal) => {
                                       return <option value={cVal}>{cVal}</option>;
                                    })}
                                 </Form.Control>
                              </Form.Group>
                              <Text color="dangerText" size="xSmall" className="pt-2" text="" />
                           </Col>

                           <Col lg="4">
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Entrance Facing</Form.Label>
                                 <Form.Control
                                    as="select"
                                    value={enteranceFacing}
                                    onChange={(e) =>
                                       this.setState({ enteranceFacing: e.target.value })
                                    }>
                                    <option value="">Select</option>
                                    {getAllFiltersData.data.enteranceFacing.map((cVal) => {
                                       return <option value={cVal}>{cVal}</option>;
                                    })}
                                 </Form.Control>
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.enteranceFacing}
                              />
                           </Col>

                           <Col lg="4">
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Security</Form.Label>
                                 <Form.Control
                                    as="select"
                                    value={security}
                                    onChange={(e) => this.setState({ security: e.target.value })}>
                                    <option value="">Select</option>
                                    {getAllFiltersData.data.security.map((cVal) => {
                                       return <option value={cVal}>{cVal}</option>;
                                    })}
                                 </Form.Control>
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.security}
                              />
                           </Col>
                        </Row>

                        <Row>
                           {/* <Col lg="4">
                                <Form.Label>Loan Against Property</Form.Label>
                                <div className="radio_div form-check" >
                                <label>
                                    <input
                                    type="radio"
                                    name="LoanAgainstProperty"
                                    value= {true}
                                    //{this.setState({loanAvailable:true})}
                                    // checked={true}
                                    className="form-check-input"
                                    onChange = {(e) => this.setState({loanAvailable:e.target.value})}
                                    />
                                    Yes
                                </label>
                                
    
                               <label>
                                    <input
                                    type="radio"
                                    name="LoanAgainstProperty"
                                    value= {false}
                                    className="form-check-input"
                                    onChange = {(e) => this.setState({loanAvailable:e.target.value})}
                                    />
                                    No
                                </label>
                                </div>
                            </Col> */}

                           <Col lg="4">
                              <Form.Label>Loan Against Property</Form.Label>
                              <div className="p-3 align-left">
                                 <RadioButton
                                    items={["Yes", "No"]}
                                    name={"LoanAgainstProperty"}
                                    layout={"horizontal"}
                                    value={loanAvailable ? "Yes" : "No"}
                                    // defaultValue = {this.items[0]}
                                    onValueChanged={this.onValueChanged}
                                 />
                              </div>
                           </Col>

                           <Col lg="4">
                              <Form.Group controlId="formBasicSociety">
                                 <Form.Label>Loan From Bank</Form.Label>
                                 <Form.Control
                                    type="text"
                                    maxlength="35"
                                    placeholder="Enter Loan From Bank"
                                    value={loanFromBank}
                                    onChange={(e) =>
                                       this.setState({ loanFromBank: e.target.value })
                                    }
                                 />
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.loanFromBank}
                              />
                           </Col>

                           <Col lg="4">
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Distance To Convinience Store</Form.Label>
                                 <Form.Control
                                    as="select"
                                    value={storeDistance}
                                    onChange={(e) =>
                                       this.setState({ storeDistance: e.target.value })
                                    }>
                                    <option value="">Select</option>
                                    {getAllFiltersData.data.convenienceStore.map((cVal) => {
                                       return <option value={cVal}>{cVal}</option>;
                                    })}
                                 </Form.Control>
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.storeDistance}
                              />
                           </Col>
                        </Row>

                        <Row>
                           <Col lg="4">
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Society Size</Form.Label>
                                 <Form.Control
                                    as="select"
                                    value={constructionSize}
                                    onChange={(e) =>
                                       this.setState({ constructionSize: e.target.value })
                                    }>
                                    <option value="">Select</option>
                                    {getAllFiltersData.data.socialConstructSize.map((cVal) => {
                                       return <option value={cVal}>{cVal}</option>;
                                    })}
                                 </Form.Control>
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.constructionSize}
                              />
                           </Col>

                           <Col lg="4">
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label style={{ zIndex: "999999" }}>Amenities</Form.Label>
                                 <DropdownMultiselect
                                    options={getAllFiltersData.data.socialConstructSpecificAmenity}
                                    placeholder="Select "
                                    buttonClass="btn-transperant mt-0 dropdown_multiselect"
                                    selected={amenities}
                                    handleOnChange={(selected) => {
                                       console.log(selected.toString());
                                       this.setState({ amenities: selected });
                                    }}
                                 />

                                 {/* <Form.Control as="select" onChange={(e)=>e.target.value}>
                                    <option value="">Select</option>
                                    {getAllFiltersData.data.enteranceFacing.map((cVal)=>{ 
                                        return <option value="">{cVal}</option>
                                    })}
                                    
                                </Form.Control> */}
                              </Form.Group>
                              <Text color="dangerText" size="xSmall" className="pt-2" text="" />
                           </Col>

                           <Col lg="4">
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Major Composition</Form.Label>
                                 <Form.Control
                                    as="select"
                                    value={majorityComposition}
                                    onChange={(e) =>
                                       this.setState({ majorityComposition: e.target.value })
                                    }>
                                    <option value="">Select</option>
                                    {getAllFiltersData.data.majorityComposition.map((cVal) => {
                                       return <option value={cVal}>{cVal}</option>;
                                    })}
                                 </Form.Control>
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.majorityComposition}
                              />
                           </Col>
                        </Row>

                        <Row>
                           <Col lg="4">
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Religious Places Within 2 KM</Form.Label>
                                 <Form.Control
                                    as="select"
                                    value={religiousPlace}
                                    onChange={(e) =>
                                       this.setState({ religiousPlace: e.target.value })
                                    }>
                                    <option value="">Select</option>
                                    {getAllFiltersData.data.religiousPlace.map((cVal) => {
                                       return <option value={cVal}>{cVal}</option>;
                                    })}
                                 </Form.Control>
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.religiousPlace}
                              />
                           </Col>

                           <Col lg="4">
                              <Form.Label>Good Investment Opportunity</Form.Label>
                              <div className="p-3 align-left">
                                 <RadioButton
                                    items={["Yes", "No"]}
                                    name={"InvestmentOpportunity"}
                                    layout={"horizontal"}
                                    value={investmentOpportunity ? "Yes" : "No"}
                                    onValueChanged={this.onValueinvestmentOpportunityChanged}
                                 />
                              </div>
                           </Col>

                           <Col lg="4">
                              <Form.Group controlId="formBasicSociety">
                                 <Form.Label>Price Before 1 Year</Form.Label>
                                 <Form.Control
                                    type="text"
                                    maxlength="35"
                                    placeholder="Enter Price Before 1 Year"
                                    value={oldRate}
                                    onChange={(e) => this.setState({ oldRate: e.target.value })}
                                 />
                              </Form.Group>
                              <Text
                                 color="dangerText"
                                 size="xSmall"
                                 className="pt-2"
                                 text={error.oldRate}
                              />
                           </Col>
                        </Row>

                        <Row className="justify-content-center ">
                           <Col lg="4">
                              <ToolTip position="left" name="Under development">
                                 <div className="uploadFile mt-5">
                                    <Form.Group>
                                       <Form.File
                                          id="exampleFormControlFile1"
                                          label="Upload Images"
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
                           </Col>

                           <Col lg="4">
                              <ToolTip position="left" name="Under development">
                                 <div className="uploadFile mt-5">
                                    <Form.Group>
                                       <Form.File
                                          id="exampleFormControlFile1"
                                          label="Upload Documents"
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
                           </Col>
                        </Row>

                        <Row className="justify-content-center ">
                           <Col lg="3">
                              <Buttons
                                 name="Save"
                                 varient="primary"
                                 type="submit"
                                 size="Small"
                                 color="white"
                                 disabled={buttonDisable}
                              />
                              {/* <Text size="body" fontWeight="smbold" color="secondryColor" text="Or" className="text-center pt-4 pb-4" />
                                <ToolTip position="left" name="Under development">
    
                                    <div className="uploadFile">
                                        <Form.Group>
                                            <Form.File id="exampleFormControlFile1" label="Upload Files" />
                                            <Text size="xSmall" fontWeight="smbold" color="secondryColor" text=".xls, .ext, .ext" className="mt-1" />
                                            
                                        </Form.Group>
                                    </div>
                                </ToolTip> */}
                           </Col>
                        </Row>
                     </form>
                  </div>
               ) : null}
            </div>
         </>
      );
   }
}

const mapStateToProps = ({ getAllFiltersData }) => ({
   getAllFiltersData,
});

//mapDispatchToProps
const actions = {
   getAllFilters,
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect)(EditProperty);

//export default NewProperty;
