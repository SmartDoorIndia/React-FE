/** @format */

import "./NewSociety.scss";

import Form from "react-bootstrap/Form";

import { Component, memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Col, Row } from "react-bootstrap";
import AutoCompleteInput from "../../../shared/Inputs/AutoComplete";
import Buttons from "../../../shared/Buttons/Buttons";
import Image from "../../../shared/Image/Image";
import camraIcon from "../../../assets/images/camra-icon.svg";
import crossIcon from '../../../assets/svg/crossIcon.svg';
import Text from "../../../shared/Text/Text";
import { createNewSociety, getAllRoles, getLeadsDetail, deleteSocietyLogo } from "../../../common/redux/actions";
import { getLocalStorage, getLocationByGeoCode, getPredictionByName, getReverseGeocodingDataai } from "../../../common/helpers/Utils";
import { validateNewSociety } from "../../../common/validations";
import S3 from 'react-aws-s3'
import Constants from '../../../common/helpers/Constants';
import TextArea from '../../../shared/Inputs/TextArea/TextArea';

const ReactS3Client = new S3(Constants.CONFIG);

class NewSociety extends Component {
   constructor(props) {
      super(props);
      this.state = {
         error: {},
         societyName: this.props.location.state
            ? this.props.location.state.data.societyName
               ? this.props.location.state.data.societyName
               : ""
            : "",
         location: this.props.location.state
            ? this.props.location.state.data.address
               ? this.props.location.state.data.address
               : ""
            : "",
         plotSize: this.props.location.state
            ? this.props.location.state.data.plotSize
               ? this.props.location.state.data.plotSize
               : ""
            : "",
         propertieslisted: this.props.location.state
            ? this.props.location.state.data.numberOfProperties
               ? this.props.location.state.data.numberOfProperties
               : ""
            : "",
         username: this.props.location.state
            ? this.props.location.state.data.contactPerson
               ? this.props.location.state.data.contactPerson
               : ""
            : "",
         userType: this.props.location.state
            ? this.props.location.state.data.position
               ? this.props.location.state.data.position
               : ""
            : "",
         phoneNumber: this.props.location.state
            ? this.props.location.state.data.contactNumber
               ? this.props.location.state.data.contactNumber
               : ""
            : "",
         societyLogo: this.props.location.state
            ? this.props.location.state.data.societyLogo
               ? this.props.location.state.data.societyLogo
               : ""
            : "",
         allAdminRoles: [],
         imageUrl: "",
         proposedCutOff: this.props.location.state
            ? this.props.location.state.data.proposedCutOff
               ? this.props.location.state.data.proposedCutOff
               : ""
            : "",
         leadId: this.props.location.state ? this.props.location.state.data.leadId : "",
         contactPerson: this.props.location.state
            ? this.props.location.state.data.contactPerson
               ? this.props.location.state.data.contactPerson
               : ""
            : "",
         contactNumber: this.props.location.state
            ? this.props.location.state.data.contactNumber
               ? this.props.location.state.data.contactNumber
               : ""
            : "",
         city: this.props.location.state
            ? this.props.location.state.data.city
               ? this.props.location.state.data.city
               : "indore"
            : "indore",
         _gPlaceCity: this.props.location.state
            ? this.props.location.state.data.city
               ? this.props.location.state.data.city
               : ""
            : "",
         cityLatLong: null,
         selectedCityName: "",
         _gPlaceLocation: this.props.location.state
            ? this.props.location.state.data.address
               ? this.props.location.state.data.address
               : ""
            : "",
         builtInYear: this.props.location.state
            ? this.props.location.state.data.constructed
               ? this.props.location.state.data.constructed
               : ""
            : "",
         locationLatLong: {
            lat: this.props.location.state
               ? this.props.location.state.data.latitude
                  ? this.props.location.state.data.latitude
                  : 0
               : 0,
            lng: this.props.location.state
               ? this.props.location.state.data.longitude
                  ? this.props.location.state.data.longitude
                  : 0
               : 0,
         },
         newSocietyName: this.props.location.state
            ? this.props.location.state.data.societyName
               ? this.props.location.state.data.societyName
               : ""
            : "",
         societyDescription: "",
         bankName: "",
         accountNumber: "",
         panNumber: "",
         societyId: this?.props?.location?.state?.data?.societyId,
         detailsData: {},
         zipcode: ''
         // loading: ''
      };
      this.fileUpload = this.fileUpload.bind(this);
   }



   // async componentDidMount() {
   //    //this.props.getAllFilters();
   //    try{
   //       const response = await getLeadsDetail({ leadId: this.state.leadId});
   //       if (response.data.resourceData){
   //          this.setState({detailsData : response.data.resourceData})
   //       }
   //    }
   //    catch(err) { console.log(err)}
   // }

   // const _getLeadData = useCallback(() => {
   //    getLeadsDetail({ leadId: leadId })
   //      .then((response) => {
   //        if (response.data) {
   //          if (response.data.resourceData) setData(response.data.resourceData);
   //          if (response.data.error) setError(response.data.error)
   //        }
   //        setLoading(false);
   //        console.log('response', response)
   //      })
   //      .catch((error) => {
   //        setLoading(false);
   //        console.log('error', error)
   //      })
   //  }, [getLeadsDetail])

   fileUpload(event) {
      console.log("file upload..")
      if (event?.target?.files && event?.target?.files[0]) {
         let reader = new FileReader();
         reader.onload = (e) => {
            console.log(e.target.result, "target.result")
            //  setLogo(e.target.result)
            this.setState({ societyLogo: e.target.result });
         };
         reader.readAsDataURL(event.target.files[0]);
      }
      console.log(event?.target?.files[0], "after upload files")
      // this.setState({ imageUrl: event.target.files[0] });
      console.log(event.target.files, "before s3 files")
      if (event.target.files.length > 0) {
         // setImageLoader(true)
         ReactS3Client.uploadFile(event?.target?.files[0], event.target.files[0].name)
            .then((data) => {
               console.log("data of upload file::", data.location);
               this.setState({ societyLogo: data.location })
            })
            .catch((err) => {
            });
         console.log(event.target.files[0], 'end file');
      }
   }

   async componentDidMount() {

      console.log(this.state.zipcode, "zipcode");
      try {
         const response = await getLeadsDetail({ leadId: this.state.leadId });
         if (response.data.resourceData) {
            this.setState({ detailsData: response.data.resourceData })
            const options = {
               address: response.data.resourceData.address
            };
            if (response.data.resourceData.latitude === 0 && response.data.resourceData.longitude === 0) {
               getLocationByGeoCode(options)
                  .then(res => {
                     const updatedLocationLatLong = { lat: res.lat, lng: res.lng }
                     this.setState({ locationLatLong: updatedLocationLatLong })
                     getReverseGeocodingDataai(res.lat, res.lng)
                        .then(res => {
                           console.log(res, "for zipcode");
                           this.setState({ zipcode: res })
                        })
                  })
            }
         }
      }
      catch (err) { console.log(err) }

      const _this = this;
      this.props.getAllRoles({ rollId: "SOCIETY" });      


      if (this.state.city) {
         let result = await getPredictionByName(this.state.city);

         if (result.status) {
            _this.setState({ cityLatLong: { lat: result.lat, lng: result.lng } });
         }
      }

   }

   handleValidate = (event) => {
      event.preventDefault();
      const {
         societyName,
         location,
         plotSize,
         propertieslisted,
         username,
         userType,
         phoneNumber,
         proposedCutOff,
         leadId,
         contactPerson,
         contactNumber,
         _gPlaceLocation,
         locationLatLong,
         builtInYear,
         newSocietyName,
         societyDescription,
         _gPlaceCity,
         bankName,
         accountNumber,
         panNumber,
         societyLogo,
         zipcode,
         detailsData
      } = this.state;

      let position = this.props.allAdminRoles.data.filter(
         (_value) => _value.role.toLowerCase() === userType.toLowerCase()
      );

      let societyData = {
         address: location || _gPlaceLocation,
         city: _gPlaceCity,
         listedProperties: propertieslisted,
         phoneNumber: phoneNumber,
         plotSize: plotSize,
         societyLogo: societyLogo,
         societyName: societyName || newSocietyName,
         userName: username,
         position: Number(position.length ? position[0].roleId : userType) || "",
         proposedCutOff: proposedCutOff,
         contactNumber: contactNumber ? contactNumber : phoneNumber,
         contactPerson: contactPerson ? contactPerson : username,
         latitude: locationLatLong.lat,
         longitude: locationLatLong.lng,
         leadId: leadId,
         societyUser: false,
         builtInYear: builtInYear,
         newSocietyName: newSocietyName,
         descriptions: societyDescription,
         newAddress: _gPlaceLocation,
         bankName: bankName,
         accountNumber: accountNumber,
         panNumber: panNumber,
         zipcode: this.state.zipcode
      };
      console.log("societyData:", societyData);
      let validate = validateNewSociety(societyData);
      this.setState({ error: validate.errors });
      if (validate.isValid) {
         const userData = getLocalStorage("authData");

         createNewSociety({
            ...societyData,
            creatorId: userData.userid,
            listedProperties: Number(propertieslisted),
            zipcode: this.state.zipcode
         })
            .then((response) => {
               if (response.data && response.data.status === 200) {
                  this.props.history.push("/admin/societies");
               }
            })
            .catch((error) => {});

         // ReactS3Client
         //     .uploadFile(this.state.imageUrl, this.state.imageUrl.name)
         //     .then(data => {console.log("data",data);
         //         createNewSociety({...societyData, creatorId:userData.userid, societyLogo:data.location})
         //             .then((response) => {
         //                 if (response.data && response.data.status === 200) {
         //                     this.props.history.push('/admin/societies');
         //                 }
         //             })
         //             .catch((error) => {
         //                 console.log('error', error)
         //             })

         //         })
         //     .catch((err) => {
         //         createNewSociety({...societyData, creatorId:userData.userid, societyLogo:""})
         //         .then((response) => {
         //             if (response.data && response.data.status === 200) {
         //                 this.props.history.push('/admin/societies');
         //             }
         //         })
         //         .catch((error) => {
         //             console.log('error', error)
         //         })
         //     })
      }
   };

   // fileUpload = (event) => {
   //    alert("Under Development");
   //    // if (event.target.files && event.target.files[0]) {
   //    //   let reader = new FileReader();
   //    //   reader.onload = (e) => {
   //    //    this.setState({societyLogo:e.target.result})

   //    //   };
   //    //   reader.readAsDataURL(event.target.files[0]);
   //    // }
   //    // this.setState({imageUrl:event.target.files[0]});
   //    // console.log(event.target.files[0])
   // };

   setSocietyValue = async (event) => {
      let societyName =
         event.data.name
      // event.data.address_components.length
      //    ? event.data.address_components[0].long_name || ""
      //    : "";
      this.setState({
         locationLatLong: event.latlng,
         newSocietyName: societyName,
         _gPlaceLocation: event.data.formatted_address
         // event.location,
      });
   };

   changeHandler = (e) => {
      const result = e.target.value.replace(/\D/g, '');
      // setUserName(result.slice(0,10))
      this.setState({ phoneNumber: result.slice(0, 10) })
   }

   setLocationValue = async (event) => {
      this.setState({ locationLatLong: event.latlng, _gPlaceLocation: event.location });
   };

   setCityValue = async (event) => {
      this.setState({
         cityLatLong: event.latlng,
         selectedCityName: event.city,
         _gPlaceCity: event.data.name,
         locationLatLong: event.latlng,
      });
   };

   dltSocietyLogo = () => {
      deleteSocietyLogo({ societyId: this.state.societyId })
         .then((response) => {
            if (response.data && response.data.status === 200)
               getLeadsDetail({ leadId: this.state.leadId });
            this.setState({ societyLogo: '' })
         })
         .catch((err) => {
         })
   }

   render() {
      const {
         error,
         plotSize,
         propertieslisted,
         username,
         userType,
         phoneNumber,
         proposedCutOff,
         bankName,
         accountNumber,
         panNumber,
         societyId
      } = this.state;

      console.log("societyId", societyId);
      const { allAdminRoles } = this.props;

      // console.log("this.state._gPlaceCity:", this.state._gPlaceCity);

      return (
         <>
            <div style={{ height: "5%" }}></div>
            <div className="whiteBg">
               <Text
                  size="medium"
                  fontWeight="mediumbold"
                  color="secondryColor"
                  text="Enroll New Society"
               />
               {/*                    <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Lorem ipsum is simply a dummy text" className="mt-1" />
                */}{" "}
               <div className="newEntry mt-4">
                  <form noValidate onSubmit={this.handleValidate} autoComplete="off">
                     <Row>
                        <Col lg={4}>
                           <div className="whiteBg addCopLogo position-relative">
                              <Text
                                 size="Small"
                                 fontWeight="smbold"
                                 color="secondryColor"
                                 text="Society Logo"
                                 className="text-center mb-2"
                              />
                              {this.state.societyLogo ?
                                 <div class="crossIcon position-absolute">
                                    <span class="closeRight">
                                       <Image onClick={this.dltSocietyLogo} name="crossIcon" src={crossIcon} alt="cross icon" />
                                    </span>
                                 </div>
                                 : null}

                              {/* <div class="crossIcon position-absolute">
                                 <span class="closeRight">
                                    <Image onClick={this.dltSocietyLogo} name="crossIcon" src={crossIcon} alt="cross icon" />
                                 </span>
                              </div> */}
                              <div className="companyLogo">
                                 <Image
                                    name="companyLogo"
                                    src={
                                       this.state.societyLogo ||
                                       "https://smartdoor-app.s3.us-east-2.amazonaws.com/society-logo/Societies_320.svg"
                                    }
                                 />
                              </div>
                              {/* <div className="addImage"> */}
                              <div className="uploadImg newSocietyWrap justify-content-end">
                                 <div className='uploadIcon'>
                                    <div className='inputFields'>
                                       <label controlId="formFileLg" className='d-flex justify-content-end align-items-center mb-0'>
                                          <Form.Control accept=".png, .jpg, .jpeg" type="file" size="lg" onChange={(e) => this.fileUpload(e)} />
                                          <Image src={camraIcon} className="img-fluid" alt="Upload Icon" />
                                       </label>

                                    </div>
                                 </div>
                              </div>
                              {/* <Image
                                    name="camraIcon"
                                    src={camraIcon}
                                    className="filePicker"
                                    onClick={(e) => this.fileUpload(e)}
                                 />
                                 <div style={{ marginBottom: "21px" }}></div> */}
                              {/*<Form.File id="exampleFormControlFile1" custom onChange={(e)=>this.fileUpload(e)}/>*/}
                           </div>
                           {/* </div> */}
                        </Col>
                        <Col lg={8}>
                           <Row>
                              <Col lg="6">
                                 <div className="form-input-control">
                                    <Form.Group controlId="formBasiPhone">
                                       <AutoCompleteInput
                                          label="City"
                                          placeholder="Enter City"
                                          id="newSocietyCityAutoComplete"
                                          onSelectOption={this.setCityValue}
                                          customValue={this.state.city}
                                          // disabled={true}
                                          onInputChange={(value) =>
                                             this.setState({
                                                _gPlaceCity: value.replace(/[^A-Za-z\s]/g, ''),
                                                city: value.replace(/[^A-Za-z\s]/g, ''),
                                                cityLatLong: null,
                                             })
                                          }
                                          predictionType="city"
                                       // defaultValue={this.state._gPlaceCity || this.state.city}
                                       />
                                       <Text color="dangerText" size="xSmall" text={error.city} />
                                    </Form.Group>
                                 </div>
                              </Col>

                              <Col lg="6">
                                 <div className="form-input-control">
                                    <Form.Group controlId="formBasicContact">
                                       <AutoCompleteInput
                                          label="Society Name"
                                          placeholder="Enter Society Name"
                                          id="newSocietySocietyAutoComplete"
                                          onSelectOption={this.setSocietyValue}
                                          customValue={this.state.societyName}
                                          // disabled={true}
                                          onInputChange={(value) =>
                                             this.setState({ newSocietyName: value })
                                          }
                                          center={this.state.cityLatLong}
                                          defaultValue={this.state.newSocietyName}
                                          maxLength="35"
                                       />
                                       <Text
                                          color="dangerText"
                                          size="xSmall"
                                          text={error.societyName}
                                       />
                                    </Form.Group>
                                 </div>
                              </Col>
                              <Col lg="6">
                                 <div className="form-input-control">
                                    <Form.Group controlId="formBasiPhone">
                                       <AutoCompleteInput
                                          label="Location"
                                          placeholder="Enter Location"
                                          id="newSocietyLocationAutoComplete"
                                          onSelectOption={this.setLocationValue}
                                          customValue={this.state.location}
                                          onInputChange={(value) =>
                                             this.setState({ _gPlaceLocation: value })
                                          }
                                          // disabled={true}
                                          center={this.state.cityLatLong}
                                          defaultValue={this.state._gPlaceLocation}
                                       />

                                       <Text
                                          color="dangerText"
                                          size="xSmall"
                                          text={error.address}
                                       />
                                    </Form.Group>
                                 </div>
                              </Col>

                              <Col lg="6">
                                 <div className="form-input-control">
                                    <Form.Group controlId="formBasicSociety">
                                       <Form.Label>Plot Size (Sq. Ft.)</Form.Label>
                                       <Form.Control
                                          type="number"
                                          onWheel={() => document.activeElement.blur()}
                                          placeholder="Enter Plot Size (Sq. Ft.)"
                                          value={plotSize}
                                          onChange={(e) =>
                                             this.setState({ plotSize: e.target.value })
                                          }
                                       />
                                       <Text
                                          color="dangerText"
                                          size="xSmall"
                                          text={error.plotSize}
                                       />
                                    </Form.Group>
                                 </div>
                              </Col>
                              <Col lg="6">
                                 <div className="form-input-control">
                                    <Form.Group controlId="formBasicSociety">
                                       <Form.Label>Properties Listed</Form.Label>
                                       <Form.Control
                                          type="number"
                                          placeholder="Enter Properties Listed"
                                          onWheel={() => document.activeElement.blur()}
                                          value={propertieslisted}
                                          onChange={(e) =>
                                             this.setState({ propertieslisted: e.target.value })
                                          }
                                       />

                                       <Text
                                          color="dangerText"
                                          size="xSmall"
                                          text={error.listedProperties}
                                       />
                                    </Form.Group>
                                 </div>
                              </Col>
                              {/* <Col lg="6">
                                 <div className="form-input-control">
                                    <Form.Group controlId="formBasicSociety">
                                       <Form.Label>Proposed Percentage</Form.Label>
                                       <Form.Control
                                          type="number"
                                          placeholder="Enter Proposed Percentage"
                                          onWheel={() => document.activeElement.blur()}
                                          value={proposedCutOff}
                                          onChange={(e) =>
                                             this.setState({ proposedCutOff: e.target.value })
                                          }
                                       />

                                       <Text
                                          color="dangerText"
                                          size="xSmall"
                                          text={error.proposedCutOff}
                                       />
                                    </Form.Group>
                                 </div>
                              </Col> */}
                              <Col lg="6">
                                 <div className="form-input-control">
                                    <Form.Group controlId="formBasicSociety">
                                       {/* <Form.Label>Description</Form.Label> */}
                                       {/* <TextArea
                                          // type="textarea"
                                          maxLength="400"
                                          height="150px"
                                          placeholder="Enter Description"
                                          onChange={(e) =>
                                             this.setState({ societyDescription: e.target.value })
                                          }
                                       /> */}
                                       <TextArea
                                          id="descriptionSociety"
                                          label="Enter Message"
                                          rows="6"
                                          placeholder="Enter Here..."
                                          maxLength="500"
                                          style={{ "maxHeight": "170px" }}
                                          value={this.state.societyDescription}
                                          className="messagesModalWidth commentbox textareaWidth100"
                                          onChange={(e) =>
                                             this.setState({ societyDescription: e.target.value })
                                          }
                                       />
                                       <Text color="dangerText" size="xSmall" text="" />
                                    </Form.Group>
                                    {/* <TextArea
                                                id="descriptionSociety"
                                                label="Enter Message"
                                                rows="6"
                                                placeholder="Enter Here..."
                                                style={{ "maxHeight": "150px" }}
                                                value={this.state.societyDescription}
                                                className="messagesModalWidth commentbox textareaWidth100"
                                                onChange={(e) =>
                                                   this.setState({ societyDescription: e.target.value })
                                                }
                                            /> */}
                                 </div>
                              </Col>
                           </Row>
                        </Col>
                     </Row>

                     <Text size="xSmall" className="pt-2 titleForm" text="Society User Details" />
                     <Row>
                        <Col lg="4">
                           <div className="form-input-control">
                              <Form.Group controlId="formBasicSociety">
                                 <Form.Label>User Name</Form.Label>
                                 <Form.Control
                                    type="text"
                                    maxLength="35"
                                    placeholder="Enter Admin Name"
                                    value={username}
                                    onChange={(e) => this.setState({ username: e.target.value })}
                                 />

                                 <Text color="dangerText" size="xSmall" text={error.userName} />
                              </Form.Group>
                           </div>
                        </Col>

                        <Col lg="4">
                           <div className="form-input-control">
                              <Form.Group controlId="exampleForm.SelectCustom">
                                 <Form.Label>User Type</Form.Label>
                                 <Form.Control
                                    as="select"
                                    onChange={(e) => this.setState({ userType: e.target.value })}>
                                    <option value="">Select</option>
                                    {allAdminRoles.data.length
                                       ? allAdminRoles.data.map((data, index) => (
                                          <option
                                             key={index}
                                             selected={
                                                userType.toLowerCase() === data.role.toLowerCase()
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
                                 <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.position}
                                 />
                              </Form.Group>
                           </div>
                        </Col>
                        <Col lg="4">
                           <div className="form-input-control">
                              <Form.Group controlId="formBasicSociety">
                                 <Form.Label>Phone Number</Form.Label>
                                 <Form.Control
                                    type="text"
                                    placeholder="Enter Phone Number"
                                    onWheel={() => document.activeElement.blur()}
                                    value={phoneNumber}
                                    // onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                                    onChange={(e) => this.changeHandler(e)}
                                 />

                                 <Text color="dangerText" size="xSmall" text={error.phoneNumber} />
                              </Form.Group>
                           </div>
                        </Col>
                     </Row>

                     {/* <div className="borderBottom"></div>

                     <Text
                        size="xSmall"
                        className="pt-2 titleForm"
                        text="Society  Account Details"
                     /> */}
                     {/* <Row>
                        <Col lg="4">
                           <div className="form-input-control">
                              <Form.Group controlId="formBasicSociety">
                                 <Form.Label>Bank Name</Form.Label>
                                 <Form.Control
                                    disabled="true"
                                    type="text"
                                    maxLength="50"
                                    placeholder="Enter Bank Name"
                                    value={bankName}
                                    onChange={(e) => this.setState({ bankName: e.target.value })}
                                 />

                                 <Text color="dangerText" size="xSmall" text={error.bankName} />
                              </Form.Group>
                           </div>
                        </Col>

                        <Col lg="4">
                           <div className="form-input-control">
                              <Form.Group controlId="formBasicSociety">
                                 <Form.Label>Account Number</Form.Label>
                                 <Form.Control
                                    disabled="true"
                                    type="number"
                                    // maxLength='20'
                                    pattern="[0-9]{16}"
                                    placeholder="Enter Account Number"
                                    value={accountNumber}
                                    onChange={(e) =>
                                       this.setState({ accountNumber: e.target.value })
                                    }
                                 />

                                 <Text
                                    color="dangerText"
                                    size="xSmall"
                                    text={error.accountNumber}
                                 />
                              </Form.Group>
                           </div>
                        </Col>

                        <Col lg="4">
                           <div className="form-input-control">
                              <Form.Group controlId="formBasicSociety">
                                 <Form.Label>PAN Number</Form.Label>
                                 <Form.Control
                                    disabled="true"
                                    type="text"
                                    maxLength="10"
                                    placeholder="Enter PAN Number"
                                    value={panNumber}
                                    onChange={(e) => this.setState({ panNumber: e.target.value })}
                                 />

                                 <Text color="dangerText" size="xSmall" text={error.panNumber} />
                              </Form.Group>
                           </div>
                        </Col>

                        <Col lg="4">
                           <div className="form-input-control">
                              <Form.Group controlId="formBasicSociety">
                                 <Form.Label>GST Number</Form.Label>
                                 <Form.Control
                                    disabled="true"
                                    type="text"
                                    maxLength="10"
                                    placeholder="Enter GST Number"
                                    value={panNumber}
                                    onChange={(e) => this.setState({ panNumber: e.target.value })}
                                 />

                                 <Text color="dangerText" size="xSmall" text={error.panNumber} />
                              </Form.Group>
                           </div>
                        </Col>
                     </Row> */}

                     <Row className="justify-content-center mt-4">
                        <Col lg="3">
                           <Buttons
                              name="Save"
                              varient="primary"
                              type="submit"
                              size="Small"
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

const mapStateToProps = ({ allAdminRoles }) => ({
   allAdminRoles,
});

const actions = {
   getAllRoles,
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(NewSociety);
