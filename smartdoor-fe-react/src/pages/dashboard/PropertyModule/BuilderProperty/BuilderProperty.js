/** @format */

import react, { Component } from "react";
import Form from "react-bootstrap/Form";
import Buttons from "../../../../shared/Buttons/Buttons";
import Text from "../../../../shared/Text/Text";
import Image from "../../../../shared/Image/Image";
import MapComponent from "../../../../shared/Map/MapComponent";
import { Col, Row } from "react-bootstrap";
import Camera from "../../../../assets/images/camra-icon.svg";
import Delete from "../../../../assets/images/delete-icon.svg";
import "./BuilderProperty.scss";
import { addBuilderProject } from "../../../../common/redux/actions";
import Building from "../BuilderProperty/Building";
import { ToolTip, showLimitedChar } from "../../../../common/helpers/Utils";
import AutoCompleteInput from "../../../../shared/Inputs/AutoComplete";
import S3 from "react-aws-s3";
import { validateBuilderProperty } from "../../../../common/validations";
import ConfirmationModal from "../../../../shared/Modal/ConfirmationModal/ConfirmationModal";
import Constants from "../../../../common/helpers/Constants";
import House from "../../../../assets/images/houseIcon.svg";
import Swimming from "../../../../assets/images/la_swimming-pool.svg";
import Power from "../../../../assets/images/powerIcon.svg";
import Gym from "../../../../assets/images/gym.svg";
import Lift from "../../../../assets/images/liftIcon.svg";
import Gated from "../../../../assets/images/Gatedcommunity.svg";
import Parking from "../../../../assets/images/tabler_parking.svg";
import Pets from "../../../../assets/images/Pets.svg";
import Playground from "../../../../assets/images/playground.svg";

import { provideAuth } from "../../../../common/helpers/Auth";

const ReactS3Client = new S3(Constants.CONFIG);

class BuilderProperty extends Component {
   constructor(props) {
      super(props);
      const { isAuth, userData } = provideAuth();

      this.state = {
         error: {},
         addProjectBuildingRequest: [],
         amenities: "",
         builderName: "",
         builtUpArea: "",
         city: "",
         description: "",
         externalLink: "",
         locality: "",
         openSpace: "",
         plotArea: "",
         postedById: isAuth ? userData.userid : null,
         proposedBuiltUpArea: "",
         reraId: "",
         societyName: "",
         street: "",
         towerCount: "",
         imageUrl: "",
         builderPropertyImg: "",
         cityLatLong: null,
         locationLatLong: { lat: 0, lng: 0 },
         _gPlaceLocation: "",
         numArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
         disableSave: false,
      };
   }

   //RESIDENTIAL STATUS -- CHECKED UNCHECKED FUNCTIONALITY
   buildingTypeResidential = (b_id, res_status) => {
      this.setState({
         addProjectBuildingRequest: this.state.addProjectBuildingRequest.map(
            (building_cVal, building_indx) => {
               if (building_cVal.id === b_id) {
                  if (res_status === false) {
                     return { ...building_cVal, addResidentialBuildingRequest: [] };
                  } else {
                     return {
                        ...building_cVal,
                        addResidentialBuildingRequest: [
                           {
                              id: 0,
                              availableUnits: "",
                              buildingBhk: "",
                              carpetArea: "",
                              maximumPrice: "",
                              minimumPrice: "",
                              totalUnits: "",
                           },
                        ],
                     };
                  }
               } else {
                  return building_cVal;
               }
            }
         ),
      });
   };

   //COMMERCIAL STATUS -- CHECKED UNCHECKED FUNCTIONALITY
   buildingTypeCommercial = (b_id, commercial_status) => {
      this.setState({
         addProjectBuildingRequest: this.state.addProjectBuildingRequest.map(
            (building_cVal, building_indx) => {
               if (building_cVal.id === b_id) {
                  if (commercial_status === false) {
                     return { ...building_cVal, addCommercialBuildingRequest: [] };
                  } else {
                     return {
                        ...building_cVal,
                        addCommercialBuildingRequest: [
                           {
                              id: 0,
                              area: "",
                              availableUnits: "",
                              carpetArea: "",
                              categoryType: "",
                              maximumPrice: "",
                              minimumPrice: "",
                              totalUnits: "",
                              type: "",
                           },
                        ],
                     };
                  }
               } else {
                  return building_cVal;
               }
            }
         ),
      });
   };

   //DYNAMICALLY CREATE BUILDING FORM BASED ON TOWER COUNT
   handleTowercountChange(e) {
      let residentialComme = [];
      let addProjectBuildingRequest = [];
      let towercount = Number(e.target.value);
      this.setState({ towerCount: e.target.value });
      //{this.state.towerCount}
      for (let i = 1; i <= towercount; i++) {
         residentialComme.push({ id: i });
         addProjectBuildingRequest.push({
            id: i,
            addCommercialBuildingRequest: [
               {
                  id: 1,
                  area: "",
                  availableUnits: "",
                  carpetArea: "",
                  categoryType: "",
                  maximumPrice: "",
                  minimumPrice: "",
                  totalUnits: "",
                  type: "",
               },
            ],
            addResidentialBuildingRequest: [
               {
                  id: 1,
                  availableUnits: "",
                  buildingBhk: "",
                  carpetArea: "",
                  maximumPrice: "",
                  minimumPrice: "",
                  totalUnits: "",
               },
            ],
            floors: "",
            phase: "",
            possessionDate: "",
            proposedCompletion: "",
            revisedDate: "",
            startDate: "",
            towerName: "",
         });
      }
      this.setState({ residentialCommercial: residentialComme });
      this.setState({ addProjectBuildingRequest: addProjectBuildingRequest });
   }

   //handleDataChange -- ONCHANGE OF BUILDERPROPERTY FIELDS
   handleDataChange = (e, ind, val) => {
      this.setState({
         addProjectBuildingRequest: this.state.addProjectBuildingRequest.map((cVal, indx) => {
            if (indx === ind) {
               return { ...cVal, [e.target.name]: e.target.value };
            } else {
               return cVal;
            }
         }),
      });
   };

   //RESIDENTIAL -- ADD NEW ENTRY
   handleAddNewEntry = (e, b_id) => {
      let buildingData = this.state.addProjectBuildingRequest.map(
         (building_cVal, building_indx) => {
            let count = building_cVal.addResidentialBuildingRequest.length;

            if (building_cVal.id === b_id) {
               building_cVal.addResidentialBuildingRequest.push({
                  id: count + 1,
                  availableUnits: "",
                  buildingBhk: "",
                  carpetArea: "",
                  maximumPrice: "",
                  minimumPrice: "",
                  totalUnits: "",
               });
            }
            return building_cVal;
         }
      );
      this.setState({ addProjectBuildingRequest: buildingData });
   };

   handleConfirmDeleteEntry = () => {
      const { form, towerId, deleteId } = this.state;
      if (form === "RESIDENTIAL") {
         this.setState({
            addProjectBuildingRequest: this.state.addProjectBuildingRequest.map(
               (building_cVal, building_indx) => {
                  if (building_cVal.id === towerId) {
                     return {
                        ...building_cVal,
                        addResidentialBuildingRequest:
                           building_cVal.addResidentialBuildingRequest.filter((entry, indx) => {
                              return entry.id !== deleteId;
                           }),
                     };
                  } else {
                     return building_cVal;
                  }
               }
            ),
            showDeleteConfModal: false,
         });
      } else {
         this.setState({
            addProjectBuildingRequest: this.state.addProjectBuildingRequest.map(
               (building_cVal, building_indx) => {
                  if (building_cVal.id === towerId) {
                     return {
                        ...building_cVal,
                        addCommercialBuildingRequest:
                           building_cVal.addCommercialBuildingRequest.filter((entry, indx) => {
                              return entry.id !== deleteId;
                           }),
                     };
                  } else {
                     return building_cVal;
                  }
               }
            ),
            showDeleteConfModal: false,
         });
      }
   };

   //RESIDENTIAL -- DELETE ENTRY
   handleDeleteResidentialEntry = (towerId, deleteId) => {
      this.setState({ showDeleteConfModal: true, towerId, deleteId, form: "RESIDENTIAL" });
   };

   //COMMERCIAL --DELETE ENTRY
   handleDeleteCommEntry = (towerId, deleteId) => {
      this.setState({ showDeleteConfModal: true, towerId, deleteId, form: "COMMERCIAL" });
   };

   //RESIDENTIAL - DATA CHANGE
   handleResiDataChange = (e, b_id, id, key, val) => {
      this.setState({
         addProjectBuildingRequest: this.state.addProjectBuildingRequest.map(
            (building_cVal, building_indx) => {
               if (building_cVal.id === b_id) {
                  return {
                     ...building_cVal,
                     addResidentialBuildingRequest: building_cVal.addResidentialBuildingRequest.map(
                        (res_cVal, res_indx) => {
                           if (res_cVal.id === id) {
                              return { ...res_cVal, [e.target.name]: e.target.value };
                           } else {
                              return res_cVal;
                           }
                        }
                     ),
                  };
               } else {
                  return building_cVal;
               }
            }
         ),
      });
   };

   //COMMERCIAL -- ADD NEW ENTRY
   handleAddNewCommEntry = (e, b_id) => {
      let buildingData = this.state.addProjectBuildingRequest.map(
         (building_cVal, building_indx) => {
            let count = building_cVal.addCommercialBuildingRequest.length;

            if (building_cVal.id === b_id) {
               building_cVal.addCommercialBuildingRequest.push({
                  id: count + 1,
                  area: "",
                  availableUnits: "",
                  carpetArea: "",
                  categoryType: "",
                  maximumPrice: "",
                  minimumPrice: "",
                  totalUnits: "",
                  type: "",
               });
            }
            return building_cVal;
         }
      );
      this.setState({ addProjectBuildingRequest: buildingData });
   };

   //COMMERCIAL -- DATA CHANGE
   handleCommDataChange = (eValue, b_id, id, name) => {
      this.setState({
         addProjectBuildingRequest: this.state.addProjectBuildingRequest.map(
            (building_cVal, building_indx) => {
               if (building_cVal.id === b_id) {
                  return {
                     ...building_cVal,
                     addCommercialBuildingRequest: building_cVal.addCommercialBuildingRequest.map(
                        (res_cVal, res_indx) => {
                           if (res_cVal.id === id) {
                              return { ...res_cVal, [name]: eValue };
                           } else {
                              return res_cVal;
                           }
                        }
                     ),
                  };
               } else {
                  return building_cVal;
               }
            }
         ),
      });
   };

   //SAVE BUTTON FUNCTIONALITY
   handleSave = () => {
      this.setState({ disableSave: true });

      let addProjectBuildingRequest = this.state.addProjectBuildingRequest.map((val, indx) => {
         let { id, ...rest } = val;
         return {
            ...rest,
            addResidentialBuildingRequest: rest.addResidentialBuildingRequest.map((rVal, rIndx) => {
               let { id, ...rest } = rVal;
               return rest;
            }),
            addCommercialBuildingRequest: rest.addCommercialBuildingRequest.map((rVal, rIndx) => {
               let { id, ...rest } = rVal;
               return rest;
            }),
         };
      });

      const builderPropertyData = {
         addProjectBuildingRequest: addProjectBuildingRequest,
         amenities: this.state.amenities || "",
         builderName: this.state.builderName,
         builtUpArea: Number(this.state.builtUpArea),
         city: this.state.city || "",
         description: this.state.description || "",
         externalLink: this.state.externalLink || "",
         locality: this.state._gPlaceLocation || "",
         openSpace: this.state.openSpace,
         plotArea: Number(this.state.plotArea),
         postedById: this.state.postedById || "",
         proposedBuiltUpArea: Number(this.state.proposedBuiltUpArea),
         reraId: this.state.reraId || "",
         societyName: this.state.societyName,
         street: this.state.street,
         towerCount: Number(this.state.towerCount),
         cityLatLong: null,
         locationLatLong: { lat: 0, lng: 0 },
      };

      // console.log("this.state:",builderPropertyData);

      let validate = validateBuilderProperty(builderPropertyData);
      this.setState({ error: validate.errors });
      if (validate.isValid) {
         if (this.state.builderPropertyImg === Camera) {
            addBuilderProject({ ...builderPropertyData })
               .then((response) => {
                  if (response.data && response.data.status === 200) {
                     this.props.history.push("/admin/builder-property");
                  }
               })
               .finally(() => {
                  this.setState({ disableSave: false });
               });
         } else {
            ReactS3Client.uploadFile(this.state.imageUrl, this.state.imageUrl.name)
               .then((data) => {
                  console.log("data", data);
                  addBuilderProject({ ...builderPropertyData, imageUrl: data.location })
                     .then((response) => {
                        if (response.data && response.data.status === 200) {
                           this.props.history.push("/admin/builder-property");
                        }
                     })
                     .finally(() => {
                        this.setState({ disableSave: false });
                     });
               })
               .catch((err) => {
                  addBuilderProject({ ...builderPropertyData, imageUrl: "" })
                     .then((response) => {
                        if (response.data && response.data.status === 200) {
                           this.props.history.push("/admin/builder-property");
                        }
                     })
                     .finally(() => {
                        this.setState({ disableSave: false });
                     });
               });
         }
      } else this.setState({ disableSave: false });
   };

   //FOR MEDIA FILES UPLOAD FUNCTIONALITY
   fileUpload = (event) => {
      if (event.target.files && event.target.files[0]) {
         let reader = new FileReader();
         reader.onload = (e) => {
            this.setState({ builderPropertyImg: e.target.result });
         };
         reader.readAsDataURL(event.target.files[0]);
      }
      this.setState({ imageUrl: event.target.files[0] });
      console.log(event.target.files[0]);
   };

   //SET LOCATION
   setLocationValue = async (event) => {
      console.log(event);
      this.setState({ locationLatLong: event.latlng, _gPlaceLocation: event.location });
   };

   //SET CITY
   setCityValue = async (event) => {
      this.setState({
         cityLatLong: event.latlng,
         city: event.city,
      });
   };

   onMarkerDragEnd = async (result) => {
      console.log("LOCATION_RESULT: ", result);
   };

   render() {
      const {
         error,
         residentialCommercial,
         buildingTypeResidential,
         buildingTypeCommercial,
         description,
         reraId,
         locality,
         street,
         city,
         plotArea,
         builtUpArea,
         proposedBuiltUpArea,
         builderName,
         externalLink,
         openSpace,
         towerCount,
         amenities,
         commercialavailableUnits,
         commercialcarpetArea,
         commercialmaximumPrice,
         commercialminimumPrice,
         residentialavailableUnits,
         residentialbuildingBhk,
         residentialcarpetArea,
         residentialmaximumPrice,
         residentialminimumPrice,
         residentialtotalUnits,
         addProjectBuildingRequest,
         societyName,
         numArr,
         disableSave,
         showDeleteConfModal,
      } = this.state;

      this.handleTowercountChange = this.handleTowercountChange.bind(this);
      // this.handleAddNewEntry = this.handleAddNewEntry.bind(this);

      console.log("addProjectBuildingRequest:", addProjectBuildingRequest);

      return (
         <>
            <ConfirmationModal
               title={"Are you sure you want to delete this entry?"}
               cancelButtonName="Cancel"
               primaryButtonName="Delete"
               show={showDeleteConfModal}
               handleClose={() => {
                  this.setState({ showDeleteConfModal: false });
               }}
               handlePerformAction={this.handleConfirmDeleteEntry}
            />

            <div className="builderForm bg-white mt-1">
               <Text
                  size="medium"
                  fontWeight="mediumbold"
                  color="secondryColor"
                  text="Project Details "
               />
               <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="" />
               <div className="builderFormField newEntry">
                  <Row className="mt-4">
                     <Col lg={3} md={3}>
                        <div className="formLeftpart">
                           <div className="mb-1">
                              <Form.Group controlId="formBasicContact">
                                 <Form.Label>Building/Project/Society</Form.Label>
                                 <Form.Control
                                    type="text"
                                    placeholder="Building/Project/Society"
                                    maxlength="35"
                                    value={societyName}
                                    onChange={(e) => this.setState({ societyName: e.target.value })}
                                 />
                                 <Text color="dangerText" size="xSmall" text={error.societyName} />
                              </Form.Group>
                           </div>
                           <div className="mb-1">
                              <label for="exampleFormControlTextarea1" class="form-label">
                                 Short Description
                              </label>
                              <textarea
                                 id="exampleFormControlTextarea1"
                                 className="textArea"
                                 rows="3"
                                 value={description}
                                 onChange={(e) =>
                                    this.setState({ description: e.target.value })
                                 }></textarea>

                              {/*                                        <Form.Group controlId="formBasicContact">
                                            <Form.Label>Short Description</Form.Label>
                                            <Form.Control as="textarea" type="text" placeholder="Short Description" className="textArea"  
                                            value ={description}
                                            onChange={(e) => this.setState({description: e.target.value })}
                                            />
                                        </Form.Group>                                         */}
                              <Text color="dangerText" size="xSmall" text={error.description} />
                           </div>
                           <div className="mb-1">
                              <Form.Group controlId="formBasicContact">
                                 <Form.Label>Builder</Form.Label>
                                 <Form.Control
                                    type="text"
                                    placeholder="Builder"
                                    maxlength="35"
                                    value={builderName}
                                    onChange={(e) => this.setState({ builderName: e.target.value })}
                                 />
                                 <Text color="dangerText" size="xSmall" text={error.builder} />
                              </Form.Group>
                           </div>
                           <div className="mb-1">
                              <Form.Group controlId="formBasicContact">
                                 <Form.Label>Rera ID</Form.Label>
                                 <Form.Control
                                    type="string"
                                    placeholder="Rera ID"
                                    maxlength="35"
                                    value={reraId}
                                    onChange={(e) => this.setState({ reraId: e.target.value })}
                                 />
                                 <Text color="dangerText" size="xSmall" text={error.reraId} />
                              </Form.Group>
                           </div>
                           <div className="mb-1">
                              <Form.Group controlId="formBasicContact">
                                 {/* <Form.Label>City </Form.Label>
                                            <Form.Control type="text" placeholder="City " maxlength="35" 
                                            value ={city}
                                            onChange={(e) => this.setState({city: e.target.value })} */}

                                 <AutoCompleteInput
                                    label="City"
                                    placeholder="Enter City"
                                    id="builderPropertyCityAutoComplete"
                                    onSelectOption={this.setCityValue}
                                    onInputChange={(value) =>
                                       this.setState({ city: value, cityLatLong: null })
                                    }
                                    predictionType="city"
                                    // defaultValue = {this.state.city}
                                 />
                                 <Text color="dangerText" size="xSmall" text={error.city} />
                              </Form.Group>
                           </div>
                           <div className="mb-1">
                              <Form.Group controlId="formBasicContact">
                                 <Form.Label>Street/ Landmark </Form.Label>
                                 <Form.Control
                                    type="text"
                                    placeholder="Street/ Landmark "
                                    maxlength="35"
                                    value={street}
                                    onChange={(e) => this.setState({ street: e.target.value })}
                                 />
                                 <Text color="dangerText" size="xSmall" text={error.street} />
                              </Form.Group>
                           </div>
                           <div className="mb-1">
                              <Form.Group controlId="formBasicContact">
                                 {/* <Form.Label>Locality</Form.Label>
                                            <Form.Control type="text" placeholder="Locality" maxlength="35" 
                                            value ={locality}
                                            onChange={(e) => this.setState({locality: e.target.value })}
                                            /> */}
                                 <AutoCompleteInput
                                    label="Location"
                                    placeholder="Enter Location"
                                    id="builderPropertyLocationAutoComplete"
                                    onSelectOption={this.setLocationValue}
                                    onInputChange={(value) =>
                                       this.setState({ _gPlaceLocation: value })
                                    }
                                    center={this.state.cityLatLong}
                                    defaultValue={this.state._gPlaceLocation}
                                 />
                                 <Text color="dangerText" size="xSmall" text={error.locality} />
                              </Form.Group>
                           </div>
                           <div className="mb-4 positionRelative pt-3">
                              <MapComponent
                                 p_lat={this.state.locationLatLong.lat}
                                 p_lng={this.state.locationLatLong.lng}
                                 draggable
                                 onMarkerDragEnd={(result) => this.onMarkerDragEnd(result)}
                              />
                           </div>
                           <div className="mb-3">
                              <div className="companyLogo">
                                 <Image
                                    name="consumerIcon"
                                    src={this.state.builderPropertyImg || Camera}
                                 />
                                 {this.state.builderPropertyImg ? (
                                    <Text
                                       size="Small"
                                       style={{ zIndex: 99999999 }}
                                       fontWeight="mediumbold"
                                       color="dangerColor"
                                       text="Cancel"
                                       onClick={() => {
                                          this.setState({ imageUrl: "", builderPropertyImg: "" });
                                       }}
                                    />
                                 ) : (
                                    <Text
                                       size="Small"
                                       fontWeight="mediumbold"
                                       color="secondryColor"
                                       text="Upload Images"
                                    />
                                 )}

                                 <Form.File
                                    id="exampleFormControlFile1"
                                    className="fileSelect"
                                    custom
                                    onChange={(e) => this.fileUpload(e)}
                                    accept=".png, .jpg, .jpeg"
                                 />
                              </div>
                           </div>
                           <div className="mb-3">
                              <Form.Group controlId="formBasicContact">
                                 <Form.Label>External Link</Form.Label>
                                 <Form.Control
                                    type="text"
                                    placeholder="External Link"
                                    maxlength="35"
                                    value={externalLink}
                                    onChange={(e) =>
                                       this.setState({ externalLink: e.target.value })
                                    }
                                 />
                              </Form.Group>
                           </div>
                           <div className="amenitiesBox mt-4">
                              <Text
                                 size="regular"
                                 fontWeight="mediumbold"
                                 color="secondryColor"
                                 className="mb-2"
                                 text="Amenities"
                              />
                              <Row>
                                 <Col lg={4} md={4}>
                                    <div className="boxAmenities">
                                       <Image src={House} name="House" />
                                       <Text
                                          size="small"
                                          fontWeight="smbold"
                                          color="secondryColor"
                                          text="Club House"
                                       />
                                    </div>
                                 </Col>
                                 <Col lg={4} md={4}>
                                    <div className="boxAmenities">
                                       <Image src={Swimming} name="House" />
                                       <Text
                                          size="small"
                                          fontWeight="smbold"
                                          color="secondryColor"
                                          text="Swimming P..."
                                       />
                                    </div>
                                 </Col>
                                 <Col lg={4} md={4}>
                                    <div className="boxAmenities">
                                       <Image src={Gym} name="House" />
                                       <Text
                                          size="small"
                                          fontWeight="smbold"
                                          color="secondryColor"
                                          text="Gym"
                                       />
                                    </div>
                                 </Col>
                              </Row>
                              <Row className="mt-1">
                                 <Col lg={4} md={4}>
                                    <div className="boxAmenities">
                                       <Image src={Lift} name="House" />
                                       <Text
                                          size="small"
                                          fontWeight="smbold"
                                          color="secondryColor"
                                          text="Lift"
                                       />
                                    </div>
                                 </Col>
                                 <Col lg={4} md={4}>
                                    <div className="boxAmenities">
                                       <Image src={Gated} name="House" />
                                       <Text
                                          size="small"
                                          fontWeight="smbold"
                                          color="secondryColor"
                                          text="Gated comm..."
                                       />
                                    </div>
                                 </Col>
                                 <Col lg={4} md={4}>
                                    <div className="boxAmenities">
                                       <Image src={Parking} name="House" />
                                       <Text
                                          size="small"
                                          fontWeight="smbold"
                                          color="secondryColor"
                                          text="Parking"
                                       />
                                    </div>
                                 </Col>
                              </Row>
                              <Row className="mt-1">
                                 <Col lg={4} md={4}>
                                    <div className="boxAmenities">
                                       <Image src={Pets} name="House" />
                                       <Text
                                          size="small"
                                          fontWeight="smbold"
                                          color="secondryColor"
                                          text="Pets"
                                       />
                                    </div>
                                 </Col>
                                 <Col lg={4} md={4}>
                                    <div className="boxAmenities">
                                       <Image src={Power} name="House" />
                                       <Text
                                          size="small"
                                          fontWeight="smbold"
                                          color="grayColor"
                                          text="Power"
                                       />
                                    </div>
                                 </Col>
                                 <Col lg={4} md={4}>
                                    <div className="boxAmenities">
                                       <Image src={Playground} name="House" />
                                       <Text
                                          size="small"
                                          fontWeight="smbold"
                                          color="grayColor"
                                          text="Playground"
                                       />
                                    </div>
                                 </Col>
                              </Row>
                           </div>
                           <div className="mb-3">
                              <Form.Group controlId="formBasicContact">
                                 <Form.Label>Add More Amenities</Form.Label>
                                 <Form.Control
                                    type="text"
                                    placeholder="Cricket Ground"
                                    maxlength="35"
                                    value={externalLink}
                                    onChange={(e) =>
                                       this.setState({ externalLink: e.target.value })
                                    }
                                 />
                              </Form.Group>
                           </div>
                        </div>
                     </Col>
                     <Col lg={9} md={9}>
                        <Row>
                           <Col lg={6} md={6}>
                              <Form.Group controlId="formBasicContact">
                                 <Form.Label>Plot/Project Area </Form.Label>
                                 <Form.Control
                                    type="number"
                                    placeholder="Plot/Project Area "
                                    maxlength="35"
                                    value={plotArea}
                                    onChange={(e) => this.setState({ plotArea: e.target.value })}
                                 />
                                 <Text color="dangerText" size="xSmall" text={error.plotArea} />
                              </Form.Group>
                           </Col>
                           <Col lg={6} md={6}>
                              <Form.Group controlId="formBasicContact">
                                 <Form.Label>Proposed Built-up-Area</Form.Label>
                                 <Form.Control
                                    type="number"
                                    placeholder="Proposed Built-up-Area"
                                    maxlength="35"
                                    value={proposedBuiltUpArea}
                                    onChange={(e) =>
                                       this.setState({ proposedBuiltUpArea: e.target.value })
                                    }
                                 />
                                 <Text
                                    color="dangerText"
                                    size="xSmall"
                                    text={error.proposedBuiltUpArea}
                                 />
                              </Form.Group>
                           </Col>
                        </Row>
                        <Row>
                           <Col lg={6} md={6}>
                              <Form.Group controlId="formBasicContact">
                                 <Form.Label>Built-up-Area as per Approved FSI </Form.Label>
                                 <Form.Control
                                    type="number"
                                    placeholder="Built-up-Area as per Approved FSI"
                                    maxlength="35"
                                    value={builtUpArea}
                                    onChange={(e) => this.setState({ builtUpArea: e.target.value })}
                                 />
                                 <Text color="dangerText" size="xSmall" text={error.builtUpArea} />
                              </Form.Group>
                           </Col>
                           <Col lg={6} md={6}>
                              <Form.Group controlId="formBasicContact">
                                 <Form.Label>Open Space </Form.Label>
                                 <Form.Control
                                    type="text"
                                    placeholder="Open Space "
                                    maxlength="35"
                                    value={openSpace}
                                    onChange={(e) => this.setState({ openSpace: e.target.value })}
                                 />
                                 <Text color="dangerText" size="xSmall" text={error.openSpace} />
                              </Form.Group>
                           </Col>
                        </Row>
                        <Row>
                           <Col lg={6} md={6}>
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Total Building / TowerCount </Form.Label>
                                 {/* //(e) => this.setState({ towerCount: e.target.value }) */}

                                 <Form.Control
                                    as="select"
                                    value={towerCount}
                                    onChange={this.handleTowercountChange}>
                                    <option value="">Select</option>
                                    {numArr.map((cVal, ind) => {
                                       return <option value={cVal}>{cVal}</option>;
                                    })}

                                    {/* <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option> */}
                                 </Form.Control>
                                 <Text color="dangerText" size="xSmall" text={error.towerCount} />
                              </Form.Group>
                           </Col>
                           <Col lg={6} md={6}>
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>Amenities </Form.Label>
                                 <Form.Control
                                    as="select"
                                    value={amenities}
                                    onChange={(e) => this.setState({ amenities: e.target.value })}>
                                    <option value="">Select </option>
                                    <option value="Lift">Lift </option>
                                    <option value="Gym">Gym</option>
                                    <option value="PlayArea">Play Area</option>
                                    <option value="SwimmingPool">Swimming Pool</option>
                                 </Form.Control>
                                 <Text color="dangerText" size="xSmall" text={error.amenities} />
                              </Form.Group>
                           </Col>
                        </Row>

                        {this.state.addProjectBuildingRequest.length > 0
                           ? this.state.addProjectBuildingRequest.map((BuildingcVal, indx) => {
                                return (
                                   <Building
                                      BuildingcVal={BuildingcVal}
                                      indx={indx}
                                      addProjectBuildingReq={addProjectBuildingRequest}
                                      handleAddNewEntry={this.handleAddNewEntry}
                                      handleDeleteResidentialEntry={
                                         this.handleDeleteResidentialEntry
                                      }
                                      handleResiDataChange={this.handleResiDataChange}
                                      handleAddNewCommEntry={this.handleAddNewCommEntry}
                                      handleDeleteCommEntry={this.handleDeleteCommEntry}
                                      handleCommDataChange={this.handleCommDataChange}
                                      handleDataChange={this.handleDataChange}
                                      buildingTypeResidential={this.buildingTypeResidential}
                                      buildingTypeCommercial={this.buildingTypeCommercial}
                                      error={error}
                                      numArr={numArr}
                                   />
                                );
                             })
                           : null}

                        <div className="submitBtn mt-3">
                           <Buttons
                              name="Save"
                              disabled={disableSave}
                              varient="primary"
                              type="submit"
                              size="Small"
                              color="white"
                              onClick={this.handleSave}
                           />
                        </div>
                     </Col>
                  </Row>
               </div>
            </div>
         </>
      );
   }
}

export default BuilderProperty;
