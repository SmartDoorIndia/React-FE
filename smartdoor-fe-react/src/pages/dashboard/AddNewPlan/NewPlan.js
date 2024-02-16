/** @format */

import { Component, createRef, memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Form from "react-bootstrap/Form";
import Buttons from "../../../shared/Buttons/Buttons";
import Text from "../../../shared/Text/Text";
import { Col, Row } from "react-bootstrap";
import "./NewPlan.scss";
import {
   getAllRoles,
   getAllCity,
   getLocationByCity,
   getUserLocationByCity,
   getExecutivesWrtRoleLocation,
   addNewPlan,
} from "../../../common/redux/actions";
import S3 from "react-aws-s3";
import { showErrorToast } from "../../../common/helpers/Utils";
import { validateNewPlan } from "../../../common/validations";
import RadioButton from "../../../shared/RadioButton/RadioButton";
import Constants from "../../../common/helpers/Constants";
// import Image from "../../../shared/Image/Image";
class NewPlan extends Component {
   fileInputRef = createRef(null);
   ReactS3Client = new S3(Constants.CONFIG_PROPERTY);
   imageArray = ''

   constructor(props) {
      super(props);
      console.log(this?.props?.location?.state?.planData?.leadGeneration)
      console.log(this?.props?.location?.state?.planData?.marketingVideo)
    
      this.state = {
         planId: this?.props?.location?.state?.planData?.id || "",
         error: {},
         description: this?.props?.location?.state?.planData?.description || "",
         planName: this?.props?.location?.state?.planData?.planName || "",
         amount: this?.props?.location?.state?.planData?.amount || "",
         gstValue: this?.props?.location?.state?.planData?.gstValue || "",
         refundableAmount: this?.props?.location?.state?.planData?.refundableAmount || 0,
         subscriptionMonth: this?.props?.location?.state?.planData?.subscriptionMonth || 1,
         baseRentalCoins: this?.props?.location?.state?.planData?.baseRentalCoins || 0,
         depositeAmount: this?.props?.location?.state?.planData?.depositeAmount || 0,
         installationCharges: this?.props?.location?.state?.planData?.installationCharges || 0,
         planHirarchy: this?.props?.location?.state?.planData?.planHirarchy || 0,
         renewalCoins: this?.props?.location?.state?.planData?.renewalCoins || 0,
         renewalInterval: this?.props?.location?.state?.planData?.renewalInterval || 0,
         imageLocation: this?.props?.location?.state?.planData?.imageLocation || "",
         TNC: this?.props?.location?.state?.planData?.termsAndCondition || "",
         isActive:
            this?.props?.location?.state?.planData?.active ||
            (this?.props?.location?.state?.planData?.active === undefined && true) ||
            "",
         isAutoRenewable:
            this?.props?.location?.state?.planData?.autoRenewable ||
            (this?.props?.location?.state?.planData?.autoRenewable === undefined && true) ||
            "",
         isMarketingSupport:
            this?.props?.location?.state?.planData?.marketingSupport,
         isLeadGeneration:
            this?.props?.location?.state?.planData?.leadGeneration,
         isMarketingVideo:
            this?.props?.location?.state?.planData?.marketingVideo,

         isDeviceCamera:
            this?.props?.location?.state?.planData?.deviceCamera,
         isDeviceDongle:
            this?.props?.location?.state?.planData?.deviceDongle,
         isDeviceHub:
            this?.props?.location?.state?.planData?.deviceHub,
         isDeviceSensor:
            this?.props?.location?.state?.planData?.deviceSensor,
         isDeviceSmartLock:
            this?.props?.location?.state?.planData?.deviceSmartLock,
         isAutoDoorCloser: 
         this?.props?.location?.state?.planData?.autoDoorCloser,

         isSmartDoorProperty:
            this?.props?.location?.state?.planData?.smartLockPlan ||
            (this?.props?.location?.state?.planData?.smartLockPlan === undefined && true) ||
            "",
         isGstEnabled:
            this?.props?.location?.state?.planData?.gstEnable ||
            (this?.props?.location?.state?.planData?.gstEnable === undefined && true) ||
            "",
         disableSubmit: false,
         allLocationLoader: false,
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleValidate = this.handleValidate.bind(this);
   }

   handleValidate = () => {
      // event.preventDefault();
      let validate = validateNewPlan(this.state);
      this.setState({ error: validate.errors });
      if (validate.isValid) {
         this.handleSubmit();
      }
   };

   fileUpload = (event) => {
		if (event.target.files && event.target.files[0]) {
			let reader = new FileReader();
			reader.onload = (e) => {
				console.log(e.target.result, "target.result");
				// this.setState({ builderPropertyImg: e.target.result });
			};
			reader.readAsDataURL(event.target.files[0]);
		}
		console.log(event.target.files[0], "after upload files");
		const imageData = {
			propertyId: '',
			propertyDocs: [],
			propertyImage: [
				{
					docId: null,
					docName: "",
					docURL: "",
				},
			],
		};
		console.log(event.target.files, "before s3 files");
		if (event.target.files.length > 0) {
			this.ReactS3Client.uploadFile(event.target.files[0], event.target.files[0].name)
				.then((data) => {
					console.log("data", data);
					const property_image = [];
					property_image.push({
						docId: null,
						docName: "",
						docURL: data.location,
					});
					// const image_data = {
					// 	...imageData,
					// 	propertyDocs: [],
					// 	propertyImage: property_image,
					// };
               // const imageArray = Array.from(event.target.files[0])?.map((file) => URL.createObjectURL(file));
               // this.imageArray = (imageArray);
               this.imageArray = data.location
               this.setState({imageLocation: data.location})
               // this.state.imageLocation = data.location
               console.log(this.imageArray)
               console.log(this.state.imageLocation)

				})
				.catch((err) => {
				});
			console.log(event.target.files[0], "end file");
		}
	}; 
   
   handleSubmit = () => {
      this.setState({ disableSubmit: true });
      let {
         planId,
         description,
         planName,
         TNC,
         amount,
         subscriptionMonth,
         baseRentalCoins,
         depositeAmount,
         installationCharges,
         planHirarchy,
         refundableAmount,
         renewalCoins,
         renewalInterval,
         isActive,
         isAutoRenewable,
         isMarketingSupport,
         isLeadGeneration,
         isMarketingVideo,
         isDeviceCamera,
         isDeviceDongle,
         isDeviceHub,
         isDeviceSensor,
         isAutoDoorCloser,
         isDeviceSmartLock,
         isSmartDoorProperty,
         isGstEnabled,
         gstValue,
         imageLocation
      } = this.state;
      let data = {
         id: planId,
         description,
         planName,
         termsAndCondition: TNC,
         gstValue,
         active: isActive,
         autoRenewable: isAutoRenewable,
         marketingSupport: isMarketingSupport,
         leadGeneration: isLeadGeneration,
         marketingVideo: isMarketingVideo,
         deviceCamera: isDeviceCamera,
         deviceDongle: isDeviceDongle,
         deviceHub: isDeviceHub,
         deviceSensor: isDeviceSensor,
         deviceSmartLock: isDeviceSmartLock,
         autoDoorCloser: isAutoDoorCloser,
         smartLockPlan: isSmartDoorProperty,
         gstEnable: isGstEnabled,
         subscriptionMonth: subscriptionMonth,
         baseRentalCoins: baseRentalCoins,
         depositeAmount: depositeAmount,
         installationCharges: installationCharges,
         planHirarchy: planHirarchy,
         renewalCoins: renewalCoins,
         renewalInterval: renewalInterval,
         refundableAmount: refundableAmount,
         amount: 0,
         imageLocation: imageLocation,
      };
      addNewPlan(data)
         .then((response) => {
            if (response.data && response.data.status === 200) {
               this.setState({ handleSubmit: false });
               this.setState({ disableSubmit: false });
               // showSuccessToast("Plan saved successfully")
               this.props.history.goBack();
            }
            if (response.data && response.data.status === 409) {
               this.setState({ handleSubmit: false });
               this.setState({ disableSubmit: false });
            }
            if (response.data && response.data.status === 500) {
               this.setState({ handleSubmit: true });
               this.setState({ disableSubmit: false });
            }
         })
         .catch((error) => {
            this.setState({ handleSubmit: false });
            showErrorToast("Unexpected Error. Please try again later.");
            this.setState({ disableSubmit: false });
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
         planId,
         error,
         description,
         planName,
         TNC,
         amount,
         gstValue,
         subscriptionMonth,
         baseRentalCoins,
         depositeAmount,
         refundableAmount,
         installationCharges,
         planHirarchy,
         renewalCoins,
         renewalInterval,
         isActive,
         isLeadGeneration,
         isMarketingVideo,
         isDeviceCamera,
         isDeviceDongle,
         isDeviceHub,
         isDeviceSensor,
         isAutoDoorCloser,
         isDeviceSmartLock,
         isAutoRenewable,
         isMarketingSupport,
         isSmartDoorProperty,
         isGstEnabled,
         imageLocation
      } = this.state;

      const options = ['PURCHASED', 'RENTED', 'AVAILABLE', 'NOT_AVAILABLE'];
      const options1 = ['AVAILABLE', 'NOT_AVAILABLE'];

      return (
         <>
            {/* <div style={{ height: "5%" }}></div> */}
            <div className="whiteBg" style={{height : '78vh', overflowY:'auto'}}>
               <Text
                  size="medium"
                  fontWeight="mediumbold"
                  color="secondryColor"
                  text={!planId ? "Add New Plan" : "Edit Plan"}
               />
               {/* <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="" className="mt-1" /> */}
               <div className="newEntry">
                  <form noValidate onSubmit={(e) => e.preventDefault()} autoComplete="off">
                     <Row>
                        <Col lg="4">
                           <Form.Group controlId="formBasicContact">
                              <Form.Label>Plan Name</Form.Label>
                              <Form.Control
                                 type="text"
                                 maxLength="35"
                                 placeholder="Enter Plan Name"
                                 value={planName}
                                 onChange={(e) =>
                                    this.setState({
                                       planName: e.target.value,
                                    })
                                 }
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.planName}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Label>Is Active</Form.Label>
                           <div className="p-3 align-right">
                              <RadioButton
                                 items={["Yes", "No"]}
                                 name={"isActive"}
                                 layout={"horizontal"}
                                 value={isActive ? "Yes" : "No"}
                                 onValueChanged={(e) => {
                                    if (e.value === "Yes") {
                                       this.setState({
                                          isActive: true,
                                       });
                                    } else {
                                       this.setState({
                                          isActive: false,
                                       });
                                    }
                                 }}
                              />
                           </div>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.isActive}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Label>Is SmartDoor Property Plan</Form.Label>
                           <div className="p-3 align-right">
                              <RadioButton
                                 items={["Yes", "No"]}
                                 name={"isSmartDoorProperty"}
                                 layout={"horizontal"}
                                 value={isSmartDoorProperty ? "Yes" : "No"}
                                 onValueChanged={(e) => {
                                    if (e.value === "Yes") {
                                       this.setState({
                                          isSmartDoorProperty: true,
                                       });
                                    } else {
                                       this.setState({
                                          isSmartDoorProperty: false,
                                       });
                                    }
                                 }}
                              />
                           </div>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.isSmartDoorProperty}
                           />
                        </Col>
                        {/* <Col lg="4">
                           <Form.Group controlId="formBasicContact">
                              <Form.Label>Amount</Form.Label>
                              <Form.Control
                                 type="number"
                                 maxLength="35"
                                 placeholder="Enter Amount"
                                 value={amount}
                                 onChange={(e) =>
                                    this.setState({
                                       amount: e.target.value.slice(0, 10),
                                    })
                                 }
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.amount}
                           />
                        </Col> */}
                        <Col lg="4">
                           <Form.Group>
                              <Form.Label>GST Value</Form.Label>
                              <Form.Control
                                 type="number"
                                 placeholder="Enter GST Value"
                                 value={gstValue}
                                 min='0'
                                 onChange={(e) =>
                                    this.setState({
                                       gstValue: e.target.value.slice(0, 10),
                                    })
                                 }
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.gstValue}
                           />
                        </Col>

                        <Col lg="4">
                           <Form.Label>Is GST Enabled</Form.Label>
                           <div className="p-3 align-right">
                              <RadioButton
                                 items={["Yes", "No"]}
                                 name={"isGstEnabled"}
                                 layout={"horizontal"}
                                 value={isGstEnabled ? "Yes" : "No"}
                                 onValueChanged={(e) => {
                                    if (e.value === "Yes") {
                                       this.setState({
                                          isGstEnabled: true,
                                       });
                                    } else {
                                       this.setState({
                                          isGstEnabled: false,
                                       });
                                    }
                                 }}
                              />
                           </div>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.isGstEnabled}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Label>Is Digital Marketing Support</Form.Label>
                           {/* <div className="p-3 align-right">
                              <RadioButton
                                 items={["Yes", "No"]}
                                 name={"isMarketingSupport"}
                                 layout={"horizontal"}
                                 value={isMarketingSupport ? "Yes" : "No"}
                                 onValueChanged={(e) => {
                                    if (e.value === "Yes") {
                                       this.setState({
                                          isMarketingSupport: true,
                                       });
                                    } else {
                                       this.setState({
                                          isMarketingSupport: false,
                                       });
                                    }
                                 }}
                              />
                           </div> */}
                           <Form.Control id="dropdown"
                              as="select"
                              value={isMarketingSupport}
                              onChange={(e) => {
                                 this.setState({
                                    isMarketingSupport: e.target.value,
                                 })
                                 console.log(e.target.value)
                              }
                              }>
                              <option value="">Please select</option>
                              {options1.map((option, index) => (
                                 <option key={index} value={option}>
                                    {option}
                                 </option>
                              ))}
                           </Form.Control>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.isMarketingSupport}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Label>Lead Generation</Form.Label>
                           {/* <div className="p-3 align-right">
                              <RadioButton
                                 items={["Yes", "No"]}
                                 name={"isLeadGeneration"}
                                 layout={"horizontal"}
                                 value={isLeadGeneration ? "Yes" : "No"}
                                 onValueChanged={(e) => {
                                    if (e.value === "Yes") {
                                       this.setState({
                                          isLeadGeneration: true,
                                       });
                                    } else {
                                       this.setState({
                                          isLeadGeneration: false,
                                       });
                                    }
                                 }}
                              />
                           </div> */}
                           <Form.Control id="dropdown"
                              as="select"
                              value={isLeadGeneration}
                              onChange={(e) => {
                                 this.setState({
                                    isLeadGeneration: e.target.value,
                                 })
                                 console.log(e.target.value)
                              }
                              }>
                              <option value="">Please select</option>
                              {options1.map((option, index) => (
                                 <option key={index} value={option}>
                                    {option}
                                 </option>
                              ))}
                           </Form.Control>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.isLeadGeneration}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Label>Is Marketing Video</Form.Label>
                           {/* <div className="p-3 align-right">
                              <RadioButton
                                 items={["Yes", "No"]}
                                 name={"isMarketingVideo"}
                                 layout={"horizontal"}
                                 value={isMarketingVideo ? "Yes" : "No"}
                                 onValueChanged={(e) => {
                                    if (e.value === "Yes") {
                                       this.setState({
                                          isMarketingVideo: true,
                                       });
                                    } else {
                                       this.setState({
                                          isMarketingVideo: false,
                                       });
                                    }
                                 }}
                              />
                           </div> */}
                           <Form.Control id="dropdown"
                              as="select"
                              value={isMarketingVideo}
                              onChange={(e) => {
                                 this.setState({
                                    isMarketingVideo: e.target.value,
                                 })
                                 console.log(e.target.value)
                              }
                              }>
                              <option value="">Please select</option>
                              {options1.map((option, index) => (
                                 <option key={index} value={option}>
                                    {option}
                                 </option>
                              ))}
                           </Form.Control>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.isMarketingVideo}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Label>Is auto Renewable</Form.Label>
                           <div className="p-3 align-right">
                              <RadioButton
                                 items={["Yes", "No"]}
                                 name={"isAutoRenewable"}
                                 layout={"horizontal"}
                                 value={isAutoRenewable ? "Yes" : "No"}
                                 onValueChanged={(e) => {
                                    if (e.value === "Yes") {
                                       this.setState({
                                          isAutoRenewable: true,
                                       });
                                    } else {
                                       this.setState({
                                          isAutoRenewable: false,
                                       });
                                    }
                                 }}
                              />
                           </div>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.isAutoRenewable}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Label>Is Device Camera Included?</Form.Label>
                           {/* <div className="p-3 align-right">
                              <RadioButton
                                 items={["Yes", "No"]}
                                 name={"isDeviceCamera"}
                                 layout={"horizontal"}
                                 value={isDeviceCamera ? "Yes" : "No"}
                                 onValueChanged={(e) => {
                                    if (e.value === "Yes") {
                                       this.setState({
                                          isDeviceCamera: true,
                                       });
                                    } else {
                                       this.setState({
                                          isDeviceCamera: false,
                                       });
                                    }
                                 }}
                              />
                           </div> */}
                           <Form.Control id="dropdown"
                              as="select"
                              value={isDeviceCamera}
                              onChange={(e) => {
                                 this.setState({
                                    isDeviceCamera: e.target.value,
                                 })
                                 console.log(e.target.value)
                              }
                              }>
                              <option value="">Please select</option>
                              {options.map((option, index) => (
                                 <option key={index} value={option}>
                                    {option}
                                 </option>
                              ))}
                           </Form.Control>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.isDeviceCamera}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Label>Is Device Dongle Included?</Form.Label>
                           <Form.Control id="dropdown"
                              as="select"
                              value={isDeviceDongle}
                              onChange={(e) => {
                                 this.setState({
                                    isDeviceDongle: e.target.value,
                                 })
                                 console.log(e.target.value)
                              }
                              }>
                              <option value="">Please select</option>
                              {options.map((option, index) => (
                                 <option key={index} value={option}>
                                    {option}
                                 </option>
                              ))}
                           </Form.Control>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.isDeviceDongle}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Label>Is Device Hub Included?</Form.Label>
                           <Form.Control id="dropdown"
                              as="select"
                              value={isDeviceHub}
                              onChange={(e) => {
                                 this.setState({
                                    isDeviceHub: e.target.value,
                                 })
                                 console.log(e.target.value)
                              }
                              }>
                              <option value="">Please select</option>
                              {options.map((option, index) => (
                                 <option key={index} value={option}>
                                    {option}
                                 </option>
                              ))}
                           </Form.Control>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.isDeviceHub}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Label>Is Device Sensor Included?</Form.Label>
                           <Form.Control id="dropdown"
                              as="select"
                              value={isDeviceSensor}
                              onChange={(e) => {
                                 this.setState({
                                    isDeviceSensor: e.target.value,
                                 })
                                 console.log(e.target.value)
                              }
                              }>
                              <option value="">Please select</option>
                              {options.map((option, index) => (
                                 <option key={index} value={option}>
                                    {option}
                                 </option>
                              ))}
                           </Form.Control>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.isDeviceSensor}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Label>Is Device SmartLock Included?</Form.Label>
                           <Form.Control id="dropdown"
                              as="select"
                              value={isDeviceSmartLock}
                              onChange={(e) => {
                                 this.setState({
                                    isDeviceSmartLock: e.target.value,
                                 })
                                 console.log(e.target.value)
                              }
                              }>
                              <option value="">Please select</option>
                              {options.map((option, index) => (
                                 <option key={index} value={option}>
                                    {option}
                                 </option>
                              ))}
                           </Form.Control>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.isDeviceSmartLock}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Label>Is AutoDoorCloser Included?</Form.Label>
                           <Form.Control id="dropdown"
                              as="select"
                              value={isAutoDoorCloser}
                              onChange={(e) => {
                                 this.setState({
                                    isAutoDoorCloser: e.target.value,
                                 })
                                 console.log(e.target.value)
                              }
                              }>
                              <option value="">Please select</option>
                              {options.map((option, index) => (
                                 <option key={index} value={option}>
                                    {option}
                                 </option>
                              ))}
                           </Form.Control>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.isAutoDoorCloser}
                           />
                        </Col>
                        {/* <Col lg="4">
                           <Form.Group>
                              <Form.Label>imageLocation</Form.Label>
                              <Form.Control
                                // type="number"
                                 placeholder="Enter imageLocation"
                                 value={imageLocation}
                                 onChange={(e) =>
                                    this.setState({
                                       imageLocation: e.target.value.slice(0, 2),
                                    })
                                 }
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.imageLocation}
                           />
                        </Col> */}
                        {/* <Col lg="4">
                           <Form.Group>
                              <Form.Label>Refundable Amount</Form.Label>
                              <Form.Control
                                 type="number"
                                 placeholder="Enter Refundable Amount"
                                 value={refundableAmount}
                                 min='0'
                                 onChange={(e) =>
                                    this.setState({
                                       refundableAmount: e.target.value.slice(0, 10),
                                    })
                                 }
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.refundableAmount}
                           />
                        </Col> */}
                        { /*<Col lg="4"></Col> */}
                        <Col lg="4">
                           <Form.Group>
                              <Form.Label>Plan Hirarchy</Form.Label>
                              <Form.Control
                                 type="number"
                                 placeholder="Enter Plan Hirarchy"
                                 value={planHirarchy}
                                 min='0'
                                 onChange={(e) =>
                                    this.setState({
                                       planHirarchy: e.target.value.slice(0, 10),
                                    })
                                 }
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.planHirarchy}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Group>
                              <Form.Label>Deposite Amount</Form.Label>
                              <Form.Control
                                 type="number"
                                 placeholder="Enter Deposite Amount"
                                 value={depositeAmount}
                                 min='0'
                                 onChange={(e) =>
                                    this.setState({
                                       depositeAmount: e.target.value.slice(0, 10),
                                    })
                                 }
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.depositeAmount}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Group>
                              <Form.Label>Subscription Month</Form.Label>
                              <Form.Control
                                 type="number"
                                 placeholder="Enter Subscription Month"
                                 value={subscriptionMonth}
                                 min='0'
                                 onChange={(e) =>
                                    this.setState({
                                       subscriptionMonth: e.target.value.slice(0, 10),
                                    })
                                 }
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.subscriptionMonth}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Group>
                              <Form.Label>Installation Charges</Form.Label>
                              <Form.Control
                                 type="number"
                                 placeholder="Enter Installation Charges"
                                 value={installationCharges}
                                 min='0'
                                 onChange={(e) =>
                                    this.setState({
                                       installationCharges: e.target.value.slice(0, 10),
                                    })
                                 }
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.installationCharges}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Group>
                              <Form.Label>Base Rental Coins</Form.Label>
                              <Form.Control
                                 type="number"
                                 placeholder="Enter Base Rental Coins"
                                 value={baseRentalCoins}
                                 min='0'
                                 onChange={(e) =>
                                    this.setState({
                                       baseRentalCoins: e.target.value.slice(0, 10),
                                    })
                                 }
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.baseRentalCoins}
                           />
                        </Col>

                        <Col lg="4">
                           <Form.Group>
                              <Form.Label>Renewal Coins</Form.Label>
                              <Form.Control
                                 type="number"
                                 placeholder="Enter Renewal Coins"
                                 value={renewalCoins}
                                 min='0'
                                 onChange={(e) =>
                                    this.setState({
                                       renewalCoins: e.target.value.slice(0, 10),
                                    })
                                 }
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.renewalCoins}
                           />
                        </Col>
                        <Col lg="4">
                           <Form.Group>
                              <Form.Label>Renewal Interval</Form.Label>
                              <Form.Control
                                 type="number"
                                 placeholder="Enter Renewal Interval"
                                 value={renewalInterval}
                                 min='0'
                                 onChange={(e) =>
                                    this.setState({
                                       renewalInterval: e.target.value.slice(0, 10),
                                    })
                                 }
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.renewalInterval}
                           />
                        </Col>
                        <Col lg='6'>
                           <Form.Group>
                              <Form.Label>Image Url</Form.Label>
                              <Form.Control
                                 type="text"
                                 value={imageLocation}
                                 disabled
                              />
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.imageLocation}
                           />
                        </Col>
                        <Col lg="2">
                           <Buttons
                              name="Upload Plan Image"
                              varient="primary"
                              size="Small"
                              onClick={() => {this.fileInputRef.current?.click()}}
                              color="white"
                              className='button py-0'
                              style={{width:'fit-content', padding:'0px'}}
                           />
                              {/* <img className="" src={imageLocation} style={{width: '60px', height: '60px', borderRadius: 8, border: '1px #9BA5AD solid'}}></img>  */}
                           <input
                              hidden
                              type="file"
                              multiple={false}
                              ref={this.fileInputRef}
                              onChange={(e) => {
                                 this.fileUpload(e);
                              }}
                           />
                           
                        </Col>
                        
                        <Col lg="12">
                           <Form.Group controlId="formBasicContact">
                              <Form.Label>Description</Form.Label>
                              <textarea
                                 id="description"
                                 className="textArea"
                                 placeholder="Enter Description"
                                 rows="1"
                                 value={description}
                                 onChange={(e) => this.setState({ description: e.target.value })}
                              ></textarea>
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.description}
                           />
                        </Col>
                     </Row>
                     <Row>
                        <Col lg="12">
                           <Form.Group controlId="formBasicContact1">
                              <Form.Label>Terms and Conditions</Form.Label>
                              <textarea
                                 id="termsandconditions"
                                 className="textArea"
                                 placeholder="Enter terms and conditions"
                                 rows="3"
                                 value={TNC}
                                 onChange={(e) => this.setState({ TNC: e.target.value })}
                              ></textarea>
                           </Form.Group>
                           <Text
                              color="dangerText"
                              size="xSmall"
                              className="pt-2"
                              text={error.TNC}
                           />
                        </Col>
                     </Row>
                     <Row className="justify-content-center ">
                        <Col lg="3">
                           <Buttons
                              name={!planId ? "Save" : "Update"}
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
         </>
      );
   }
}

const mapStateToProps = ({ allAdminRoles, allCities, allLocationsByCity, allExecutives }) => ({
   allAdminRoles,
   allCities,
   allLocationsByCity,
   getUserLocationByCity,
   allExecutives,
});

const actions = {
   getAllRoles,
   getAllCity,
   getLocationByCity,
   getExecutivesWrtRoleLocation,
   getUserLocationByCity,
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(NewPlan);
