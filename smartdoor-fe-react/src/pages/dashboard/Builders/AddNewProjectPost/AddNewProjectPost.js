/** @format */
import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import "./AddNewProjectPost.scss";
import { TiCameraOutline } from "react-icons/ti";
import { TiTimes } from "react-icons/ti";
import { IoIosAdd } from "react-icons/io";
import {
   getLocalStorage,
   handlePhoneChange,
   showErrorToast,
   showSuccessToast,
} from "../../../../common/helpers/Utils";
import Container from "react-bootstrap/Container";
import { RxCross2 } from "react-icons/rx";
import { PiPlayCircleLight } from "react-icons/pi";
import {
   getBuilderProjectById,
   saveBuilderProject,
   deleteBuilderProjectById,
   getSmartDoorServiceStatus,
   uploadImage,
   fetchBuilderProjectById,
} from "../../../../common/redux/actions";
import Text from "../../../../shared/Text/Text";
import MapComponent from "../../../../shared/Map/MapComponent";
import CONSTANTS from "../../../../common/helpers/Constants";
import {
   Box,
   Checkbox,
   Divider,
   FormControl,
   FormControlLabel,
   FormLabel,
   InputAdornment,
   ListItemText,
   MenuItem,
   Radio,
   RadioGroup,
   TextField,
} from "@mui/material";
import AutoCompleteTextField from "../../../../shared/Inputs/AutoComplete/textField";
import { geocodeByAddress, geocodeByLatLng } from "react-google-places-autocomplete";
import Buttons from "../../../../shared/Buttons/Buttons";
import { validateProjectDetails } from "../../../../common/validations";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import POSTING_CONSTANTS from "../../../../common/helpers/POSTING_CONSTANTS";
import docIcon from "../../../../assets/images/doc-icon.png";

const AddNewProjectPost = (props) => {
   const { fetchProjectId, projectId, builderId, showEditProject, toggleEdit } = props;

   const fileInputRef = useRef();
   const fileInputRef1 = useRef();
   const currentYear = new Date().getFullYear();
   const [monthYearFrom, setMonthYearFrom] = useState({ month: "", year: "" });
   const [monthYearTo, setMonthYearTo] = useState({ month: "", year: "" });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [saveProjectFlag, setSaveProjectFlag] = useState(true);
   const [data, setData] = useState({
      builderId: builderId,
      projectId: projectId || null,
      userId: null,
      projectName: "",
      totalTowers: "",
      landArea: "",
      totalAreaToDevelop: "",
      openAreaPerc: "",
      possessionFrom: "",
      possessionTo: "",
      projectDescription: "",
      latitude: 0.0,
      longitude: 0.0,
      projectAmenities: [],
      city: "",
      state: "",
      projectAddress: "",
      country: null,
      cityLat: 0.0,
      cityLong: 0.0,
      contactPersonName: "",
      contactPersonNumber: "",
      projectImages: [],
      projectVideoUrl: "",
      brochureUrl: "",
      reraNumber: "",
      separateAddress: "",
      stageOfProject: "Ready",
      landAreaMeasurementUnit: "Acre",
   });
   const defaultAmenities = [
      "Common Guest",
      "Power Backup",
      "Playground",
      "Inhouse Market",
      "Children Play Area",
      "Tennis Court",
      "Table Tennis",
      "Podium Space",
      "BasketBall",
      "Sauna",
      "Steam",
      "Squash Court",
      "Piped Gas",
      "Cricket Pitch/Lawn",
      "Snooker/Billiards",
      "Jogging Track",
      "Badminton",
   ];
   const history = useHistory();

   useEffect(() => {
      console.log(props);
      if (props?.editProject === true) {
         setData({ ...props?.projectDetails, builderId: props?.builderId });
         const possessionFrom = props?.projectDetails?.possessionFrom;
         const date = new Date(possessionFrom);

         setMonthYearFrom({
            month: String(date.getMonth() + 1).padStart(2, "0"),
            year: date.getFullYear(),
         });

         const possessionTo = props?.projectDetails?.possessionTo;
         const dateTo = new Date(possessionTo);
         setMonthYearTo({
            month: String(dateTo.getMonth() + 1).padStart(2, "0"),
            year: dateTo.getFullYear(),
         });
         let projectImageList = props?.projectDetails?.projectImages;
         let imageList = [];
         projectImageList.forEach((image, index) => {
            let imageDto = {
               docId: "",
               docName: "",
               docDescription: "",
               docOrderInFrontendView: index + 1,
               docURL: image,
            };
            imageList.push(imageDto);
         });
         setData((prevData) => ({
            ...prevData,
            projectImages: imageList,
            openAreaPerc: props?.projectDetails?.openAreaPercent,
         }));
         if (props?.projectDetails?.projectAmenities === null) {
            setData((prevData) => ({ ...prevData, projectAmenities: [] }));
         }
      }
   }, []);

   const handleCheckboxChange = (event) => {
      const { value } = event.target; // Extract the selected values array

      setData((prevData) => ({
         ...prevData,
         projectAmenities: value, // Set the new selected values
      }));
   };

   const handleFileChange = (e, description) => {
      const files = Array.from(e.target.files);

      if (files.length > 0) {
         let formData = new FormData();
         const maxSizeInBytes = 15 * 1024 * 1024; // 10MB
         Array.from(files).map((file) => {
            if (file.size > maxSizeInBytes) {
               showErrorToast("File must be less than 15MB...");
               return;
            }
         });
         let fileList = [];
         for (let i = 0; i < files.length; i++) {
            fileList.push(files[i]);
            formData.append("file", files[i]);
         }
         formData.append("id", "0");
         formData.append("enumType", "PROJECT_IMAGES");
         uploadImage(formData)
            .then((response) => {
               if (response.data.status === 200) {
                  console.log(response.data.resourceData);
                  if (description === "PROJECT_IMAGES") {
                     let projectImage = [...data?.projectImages];
                     for (let i = 0; i < response.data.resourceData.length; i++) {
                        projectImage.push({
                           docId: 0,
                           docName: "",
                           docDescription: "",
                           docOrderInFrontendView: i,
                           docURL: response.data.resourceData[i],
                        });
                     }
                     console.log(projectImage);
                     setData((prevData) => ({
                        ...prevData,
                        projectImages: [...projectImage],
                     }));
                  } else {
                     // let brochureUrl = [];
                     // for (let i = 0; i < response.data.resourceData.length; i++) {
                     //    brochureUrl.push({
                     //       docId: 0,
                     //       docName: "",
                     //       docDescription: "",
                     //       docOrderInFrontendView: i,
                     //       docURL: response.data.resourceData[i],
                     //    });
                     // }
                     // console.log(brochureUrl)
                     setData((prevData) => ({
                        ...prevData,
                        brochureUrl: response.data.resourceData[0],
                     }));
                  }
                  if (description === "PROJECT_LAYOUT") {
                     showSuccessToast("Brochure uploaded successfully...");
                  } else {
                     showSuccessToast(response.data.customMessage);
                  }
               }
            })
            .catch((error) => {
               setLoading(false);
            });
      }
   };

   const handleDeleteImage = (index, description) => {
      if (description === "brochureUrl") {
         setData((prevData) => ({
            ...prevData,
            brochureUrl: "",
         }));
      } else {
         setData((prevData) => ({
            ...prevData,
            projectImages: prevData.projectImages.filter((_, i) => i !== index),
         }));
      }
   };

   const clearInput = () => {
      setData((prevData) => ({
         ...prevData,
         projectVideoUrl: "",
      }));
   };

   const handleAddVideo = () => {
      if (data.newVideoUrl) {
         const newVideo = {
            docId: null,
            docName: data.docName || "New Video",
            docDescription: "Description here",
            docOrderInFrontendView: data.projectVideoUrl.length + 1,
            docURL: data.newVideoUrl,
            builderProjectImageAsBase64: null,
         };

         setData((prevData) => ({
            ...prevData,
            projectVideoUrl: [...prevData.projectVideoUrl, newVideo],
            newVideoUrl: "",
         }));
      }
   };

   const getEmbedUrl = (url) => {
      const youtubeMatch = url.match(
         /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/
      );
      if (youtubeMatch) {
         return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
      }
      const vimeoMatch = url.match(/(https?:\/\/)?(www\.)?(vimeo\.com\/)([0-9]{1,10})/);
      if (vimeoMatch) {
         return `https://player.vimeo.com/video/${vimeoMatch[4]}`;
      }
      return url.replace("watch?v=", "embed/");
   };

   const handleDeleteVideo = (index) => {
      console.log("Deleting video at index:", index);
      setData((prevData) => {
         const updatedVideos = prevData.projectVideoUrl.filter((_, i) => i !== index);
         console.log("Updated videos:", updatedVideos);
         return {
            ...prevData,
            projectVideoUrl: updatedVideos,
            newVideoUrl: "",
         };
      });
   };

   const handleSubmit = async () => {
      console.log(data);

      // Disable the button before submitting
      setSaveProjectFlag(true);

      try {
         const submissionData = { ...data };

         const valid = await validateProjectDetails(submissionData);
         setError(valid.errors);
         console.log(valid);

         if (valid.isValid) {
            const response = await saveBuilderProject(
               submissionData,
               projectId !== null ? true : false
            );

            if (response?.data) {
               setSaveProjectFlag(false);
               if (props?.editProject) {
                  showEditProject();
               } else {
                  fetchProjectId(response?.data?.resourceData);
               }
            } else {
               const responseError = response?.data?.error || "Unknown error occurred";
               console.error("Error in response:", responseError);
            }
         } else {
            setSaveProjectFlag(true); // Re-enable the button if validation fails
            return;
         }
      } catch (error) {
         console.error("Error submitting builder project:", error);
         setSaveProjectFlag(false); // Re-enable the button if an error occurs
      }
   };

   const approveBuilderProject = async (e) => {
      e.preventDefault();
      try {
      } catch (error) {
         console.error("Error approving project:", error);
      }
   };

   useEffect(() => {
      if (monthYearFrom.month && monthYearFrom.year) {
         setData((prevData) => ({
            ...prevData,
            possessionFrom: `${monthYearFrom.year}-${monthYearFrom.month}-01`, // Save in the desired format
         }));
      }
   }, [monthYearFrom]);

   useEffect(() => {
      if (monthYearTo.month && monthYearTo.year) {
         setData((prevData) => ({
            ...prevData,
            possessionTo: `${monthYearTo.year}-${monthYearTo.month}-01`, // Save in the desired format
         }));
      }
   }, [monthYearTo]);

   const handleFromMonthChange = (e) => {
      console.log(e);
      setMonthYearFrom((prev) => ({ ...prev, month: e.target.value }));
   };

   const handleFromYearChange = (e) => {
      setMonthYearFrom((prev) => ({ ...prev, year: e.target.value }));
   };

   const handleToMonthChange = (e) => {
      setMonthYearTo((prev) => ({ ...prev, month: e.target.value }));
   };

   const handleToYearChange = (e) => {
      setMonthYearTo((prev) => ({ ...prev, year: e.target.value }));
   };

   const mapAddressComponents = async (address_components) => {
      console.log(address_components);
      let m_address = {
         sublocality_level_1: "",
         sublocality_level_2: "",
         postal_code: "",
         locality: "",
         administrative_area_level_3: "",
         state: "",
         country: "",
      };
      address_components?.forEach((element) => {
         if (element.types.includes("sublocality_level_1")) {
            m_address.sublocality_level_1 = element.long_name;
         }
         if (element.types.includes("sublocality_level_2")) {
            m_address.sublocality_level_2 = element.long_name;
         }
         if (element.types.includes("postal_code")) {
            m_address.postal_code = element.long_name;
         }
         if (element.types.includes("locality")) {
            m_address.locality = element.long_name;
         }
         if (element.types.includes("administrative_area_level_1")) {
            m_address.state = element.long_name;
         }
         if (element.types.includes("administrative_area_level_3")) {
            m_address.administrative_area_level_3 = element.long_name;
         }
         if (element.types.includes("country")) {
            m_address.country = element.long_name;
         }
         if (m_address.locality.length !== 0 || m_address.sublocality_level_1.length !== 0) {
            return null;
         }
      });
      if (
         (m_address.sublocality_level_1 === null || m_address.sublocality_level_1.length === 0) &&
         m_address.postal_code !== null
      ) {
         m_address.sublocality_level_1 = m_address.postal_code;
      }
      if (m_address.locality.length === 0) {
         m_address.locality = m_address.administrative_area_level_3;
      }
      if (m_address.sublocality_level_1 === m_address.administrative_area_level_3) {
         showErrorToast("Please enter precise location...");
         return null;
      }
      return m_address;
   };

   const handleLatLngChanged = async () => {
      let newData = { ...data };
      const location = { lat: data.latitude, lng: data.longitude };
      // console.log(data)
      const res = await geocodeByLatLng(location);
      const m_address = await mapAddressComponents(res[0].address_components);
      if (
         m_address?.sublocality_level_1.length !== 0 &&
         m_address?.locality.length !== 0 &&
         m_address?.administrative_area_level_3.length !== 0 &&
         m_address?.state.length !== 0
      ) {
         newData.city = m_address?.locality;
         newData.locality = m_address?.sublocality_level_1;
         newData.projectAddress =
            m_address.sublocality_level_1 +
            ", " +
            m_address.locality +
            ", " +
            m_address.state +
            ", " +
            m_address.country +
            m_address.postal_code;
         newData.zipCode = m_address?.postal_code;
         newData.state = m_address?.state;
         newData.country = m_address?.country;
      }
      console.log(m_address);
      let reqData = {
         sublocality_level_1: m_address?.sublocality_level_1,
         cityName: m_address?.locality,
         state: m_address?.state,
         latitude: data.latitude,
         longitude: data.longitude,
      };
      // const responseData = await getSmartDoorServiceStatus(reqData);
      // if (responseData.status === 200) {
      //    // console.log(responseData)
      //    // setSDIconFlag(responseData.data.resourceData.serviceStatus)
      //    newData.city = responseData.data.resourceData.cityName;
      // }
      const response = await geocodeByAddress(newData.city);
      const latFunction = response[0].geometry.location.lat;
      const eLat = latFunction();
      const lngFunction = response[0].geometry.location.lng;
      const eLng = lngFunction();
      newData.cityLat = eLat;
      newData.cityLong = eLng;
      // Update latitude and longitude outside the loop
      newData.latitude = data.latitude;
      newData.longitude = data.longitude;

      // Update the state once
      setData(newData);
      // setData((prevData) => ({ ...prevData, locality: newData.locality, city: newData.city, state: m_address.state, cityLat: newData.cityLat, cityLong: newData.cityLong }))
   };

   const handleMarkerChanged = async (e) => {
      let newData = { ...data }; // Make a copy of the current state
      console.log(e);
      let m_address = {
         sublocality_level_1: "",
         sublocality_level_2: "",
         postal_code: "",
         locality: "",
         administrative_area_level_3: "",
         state: "",
         country: "",
      };
      m_address = await mapAddressComponents(e?.location?.address_components);
      if (
         m_address?.sublocality_level_1?.length !== 0 &&
         m_address?.locality?.length !== 0 &&
         m_address?.administrative_area_level_3?.length !== 0 &&
         m_address?.state?.length !== 0
      ) {
         newData.city = m_address.locality;
         newData.locality = m_address.sublocality_level_1;
         newData.projectAddress =
            m_address.sublocality_level_1 +
            ", " +
            m_address.locality +
            ", " +
            m_address.state +
            ", " +
            m_address.country +
            " " +
            m_address.postal_code;
         newData.zipCode = m_address.postal_code;
         newData.state = m_address.state;
         newData.country = m_address.country;
      }
      let reqData = {
         sublocality_level_1: m_address.sublocality_level_1,
         cityName: m_address.locality,
         state: m_address.state,
         latitude: e.lat,
         longitude: e.lng,
      };
      // const responseData = await getSmartDoorServiceStatus(reqData);
      // if (responseData.status === 200) {
      //    console.log(responseData)
      //    // setSDIconFlag(responseData.data.resourceData.serviceStatus)
      //    newData.city = responseData.data.resourceData.cityName;
      // }
      const response = await geocodeByAddress(newData.city);
      const latFunction = response[0].geometry.location.lat;
      const eLat = latFunction();
      const lngFunction = response[0].geometry.location.lng;
      const eLng = lngFunction();
      newData.cityLat = eLat;
      newData.cityLong = eLng;
      // Update latitude and longitude outside the loop
      newData.latitude = e?.lat;
      newData.longitude = e?.lng;

      // Update the state once
      // setData(newData);
      setData((prevData) => ({
         ...prevData,
         projectAddress: newData.projectAddress,
         locality: e.location,
         city: newData.city,
         state: m_address.state,
         latitude: newData.latitude,
         longitude: newData.longitude,
         cityLat: newData.cityLat,
         cityLong: newData.cityLong,
      }));
   };

   const handleCurrentLocation = async (latLng) => {
      let newData = { ...data };
      const location = { lat: latLng.latitude, lng: latLng.longitude };
      const res = await geocodeByLatLng(location);
      const m_address = await mapAddressComponents(res[0].address_components);
      if (
         m_address?.sublocality_level_1.length !== 0 &&
         m_address?.locality.length !== 0 &&
         m_address?.administrative_area_level_3.length !== 0 &&
         m_address?.state.length !== 0
      ) {
         newData.city = m_address?.locality;
         newData.locality = m_address?.sublocality_level_1;
         newData.projectAddress =
            m_address.sublocality_level_1 +
            ", " +
            m_address.locality +
            ", " +
            m_address.state +
            ", " +
            m_address.country +
            " " +
            m_address.postal_code;
         newData.zipCode = m_address?.postal_code;
         newData.state = m_address?.state;
         newData.country = m_address?.country;
      }
      let reqData = {
         sublocality_level_1: m_address?.sublocality_level_1,
         cityName: m_address?.locality,
         state: m_address?.state,
         latitude: latLng.latitude,
         longitude: latLng.longitude,
      };
      // const responseData = await getSmartDoorServiceStatus(reqData);
      // if (responseData.status === 200) {
      //    console.log(responseData)
      //    // setSDIconFlag(responseData.data.resourceData.serviceStatus)
      //    newData.city = responseData.data.resourceData.cityName;
      // }
      const response = await geocodeByAddress(newData.city);
      const latFunction = response[0].geometry.location.lat;
      const eLat = latFunction();
      const lngFunction = response[0].geometry.location.lng;
      const eLng = lngFunction();
      newData.cityLat = eLat;
      newData.cityLong = eLng;
      // Update latitude and longitude outside the loop
      newData.latitude = latLng.latitude;
      newData.longitude = latLng.longitude;

      // Update the state once
      setData(newData);
   };

   const setCurrentLocation = () => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition((position) => {
            setData((prevData) => ({
               ...prevData,
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
            }));
            handleCurrentLocation({
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
            });
         });
      }
   };

   const handleSelectLocalityOption = async (e) => {
      // e?.preventDefault();
      let newData = { ...data }; // Make a copy of the current state
      console.log(e);
      const m_address = await mapAddressComponents(e?.data?.address_components);
      if (
         m_address.sublocality_level_1.length !== 0 &&
         m_address.locality.length !== 0 &&
         m_address.administrative_area_level_3.length !== 0 &&
         m_address.state.length !== 0
      ) {
         newData.city = m_address.locality;
         newData.locality = m_address.sublocality_level_1;
         newData.projectAddress =
            m_address.sublocality_level_1 +
            ", " +
            m_address.locality +
            ", " +
            m_address.state +
            ", " +
            m_address.country +
            " " +
            m_address.postal_code;
         newData.zipCode = m_address.postal_code;
         newData.state = m_address.state;
         newData.country = m_address.country;
      }
      let reqData = {
         sublocality_level_1: m_address.sublocality_level_1,
         cityName: m_address.locality,
         state: m_address.state,
         latitude: e.latlng.lat,
         longitude: e.latlng.lng,
      };
      // const responseData = await getSmartDoorServiceStatus(reqData);
      // if (responseData.status === 200) {
      //    console.log(responseData)
      //    // setSDIconFlag(responseData.data.resourceData.serviceStatus)
      //    newData.city = responseData.data.resourceData.cityName;
      // }

      const response = await geocodeByAddress(newData.city, m_address.state);
      const latFunction = response[0].geometry.location.lat;
      const eLat = latFunction();
      const lngFunction = response[0].geometry.location.lng;
      const eLng = lngFunction();
      newData.cityLat = eLat;
      newData.cityLong = eLng;
      // Update latitude and longitude outside the loop
      newData.latitude = e?.latlng?.lat;
      newData.longitude = e?.latlng?.lng;
      console.log(newData);
      setData((prevData) => ({
         ...prevData,
         projectAddress: newData.projectAddress,
         locality: e.location,
         city: newData.city,
         state: m_address.state,
         latitude: newData.latitude,
         longitude: newData.longitude,
         cityLat: newData.cityLat,
         cityLong: newData.cityLong,
      }));
      // setAddressDetails(newData);
   };

   const handleUnitChange = (newUnit) => {
      const convertArea = (area, currentUnit) => {
         if (currentUnit === "Acre" && newUnit === "Sq.Mt.") {
            return (parseFloat(area) * 4046.8564224).toFixed(2);
         } else if (currentUnit === "Sq.Mt." && newUnit === "Acre") {
            return (parseFloat(area) * 0.0002471054).toFixed(2);
         }
         return area;
      };

      setData((prevData) => ({
         ...prevData,
         landArea: convertArea(prevData.landArea, prevData.landAreaMeasurementUnit),
         landAreaMeasurementUnit: newUnit,
      }));
   };

   return (
      <div
         className="add-new-project-post mb-3"
         style={{
            overflowX: "hidden",
            backgroundColor: props?.editProject ? "whitesmoke" : "white",
         }}
      >
         <Container fluid>
            {/* <h2 className="page-title">PROJECT DETAIL</h2> */}

            <div className="newEntry project-details">
               {/* <form
                  // onSubmit={handleSubmit}
                  noValidate
                  autoComplete="off"
                  className="form-white-bg"
               > */}
               <Row className="mapAndForm">
                  <Col lg={5} className="map-col">
                     <div className="map-con">
                        <div className="map-container">
                           <AutoCompleteTextField
                              style={{ width: "100%", backgroundColor: "white" }}
                              className="custom-text-field2"
                              sdIconFlag={false}
                              currentLocFlag={true}
                              label=""
                              cityLatLng={null}
                              placeholder="Select  location of property *"
                              id="PropertyCityAutoComplete"
                              onSelectOption={(e) => {
                                 handleSelectLocalityOption(e);
                              }}
                              onInputChange={(value) => setData({ ...data, projectAddress: value })}
                              predictionType="business"
                              customValue={data?.projectAddress}
                              useCurrentLocation={() => setCurrentLocation()}
                           />

                           {/* Map Body */}
                           <div
                              className="map-body"
                              style={{ flex: "1 1 auto", overflow: "hidden" }}
                           >
                              <div
                                 style={{
                                    height: "264px",
                                    width: "100%",
                                    borderRadius: "5px",
                                 }}
                              >
                                 <MapComponent
                                    height={"260px"}
                                    p_lat={data?.latitude}
                                    p_lng={data?.longitude}
                                    style={{
                                       height: "260px",
                                       width: "100%",
                                       borderRadius: "5px",
                                    }}
                                    draggable={true}
                                    onMarkerDragEnd={handleMarkerChanged}
                                 />
                              </div>
                           </div>

                           {/* Map Footer */}
                        </div>
                        <div className="map-footer" style={{ padding: "10px 10px" }}>
                           {data?.projectAddress
                              ? `${data?.projectAddress}`
                              : "Location not available"}
                        </div>
                     </div>
                     {/* <div>
                        <TextField
                           className="mt-4 w-100 textFieldInput"
                           label="Separate Address (Optional)"
                           id="separateAddress"
                           multiline={true}
                           rows={4}
                           aria-expanded={true}
                           fullWidth
                           autoComplete="off"
                           inputProps={{ autoComplete: "off" }}
                           value={data?.separateAddress}
                           onChange={(e) => {
                              setData({ ...data, separateAddress: e?.target.value });
                           }}
                        />
                     </div> */}
                  </Col>
                  <Col
                     lg={7}
                     className="form-col"
                     style={{ backgroundColor: props?.editProject ? "whitesmoke" : "white" }}
                  >
                     <Row>
                        <Col lg={6}>
                           <TextField
                              className="mt-4 w-100 textFieldInput"
                              label="Project Name"
                              id="projectName"
                              required={true}
                              autoComplete="off"
                              inputProps={{ autoComplete: "off" }}
                              value={data?.projectName}
                              onChange={(e) => {
                                 setData({ ...data, projectName: e?.target.value });
                              }}
                              error={error?.projectName}
                           />
                        </Col>
                        <Col lg="6">
                           <TextField
                              select
                              className="mt-4 w-100 textFieldInput p-0"
                              label="General Amenities"
                              id="projectAmenities"
                              required={true}
                              name="projectAmenities"
                              value={data?.projectAmenities}
                              onChange={handleCheckboxChange}
                              SelectProps={{
                                 multiple: true,
                                 renderValue: (selected) => selected.join(", "),
                              }}
                              variant="outlined"
                              sx={{
                                 ".MuiInputBase-root": {
                                    display: "flex",
                                    flexWrap: "wrap",
                                    overflow: "hidden",
                                    maxHeight: "52px",
                                 },
                                 ".MuiSelect-select": {
                                    display: "flex",
                                    alignItems: "center",
                                 },
                              }}
                              error={error?.projectAmenities}
                           >
                              {POSTING_CONSTANTS.GeneralAmenities?.map((amenity, index) => (
                                 <MenuItem key={index} value={amenity}>
                                    <Checkbox checked={data?.projectAmenities?.includes(amenity)} />
                                    <ListItemText primary={amenity} />
                                 </MenuItem>
                              ))}
                           </TextField>
                        </Col>
                     </Row>
                     <Row className="align-items-center mb-4">
                        <Col lg={6}>
                           <TextField
                              className="w-100 mt-4 textFieldInput"
                              type="number"
                              required={true}
                              autoComplete="off"
                              inputProps={{ min: 0, max: 99999, autoComplete: "off" }}
                              label="Total Tower / Plotted Planned"
                              id="totalTowers"
                              value={data?.totalTowers}
                              onChange={(e) => {
                                 setData({ ...data, totalTowers: e?.target.value });
                              }}
                              error={error?.totalTowers}
                           />
                        </Col>
                        <Col lg={6} className="">
                           <TextField
                              className="w-100 mt-4 textFieldInput"
                              type="number"
                              required={true}
                              label="Land Area"
                              id="landArea"
                              autoComplete="off"
                              inputProps={{ min: 0, max: 9999999, autoComplete: "off" }}
                              value={data?.landArea}
                              onChange={(e) => {
                                 setData({ ...data, landArea: Number(e?.target.value) });
                              }}
                              InputProps={{
                                 endAdornment: (
                                    <>
                                       <InputAdornment position="end" sx={{ marginLeft: "-60px" }}>
                                          <Box display="flex" alignItems="center">
                                             <Divider
                                                orientation="vertical"
                                                flexItem
                                                sx={{ height: 45, marginLeft: -1 }}
                                             />{" "}
                                             &nbsp; Acre
                                          </Box>
                                       </InputAdornment>
                                    </>
                                 ),
                              }}
                              // InputProps={{
                              //    endAdornment: (
                              //       <>
                              //          <TextField
                              //             className="w-100 p-0 me-5 textFieldInput"
                              //             select
                              //             onChange={(e) => {
                              //                handleUnitChange(e?.target?.value);
                              //             }}
                              //             InputProps={{
                              //                style: {
                              //                   border: "unset",
                              //                   paddingRight: "0%",
                              //                   marginLeft: "15%",
                              //                },
                              //             }}
                              //             value={data?.landAreaMeasurementUnit}
                              //          >
                              //             <MenuItem key={"Acre"} value={"Acre"}>
                              //                Acre
                              //             </MenuItem>
                              //             <MenuItem key={"Sq.Mt."} value={"Sq.Mt."}>
                              //                Sq.Mt
                              //             </MenuItem>
                              //          </TextField>
                              //       </>
                              //    ),
                              // }}
                              error={error?.landArea}
                           />
                        </Col>
                     </Row>
                     <Row className="mb-4">
                        <Col lg={6}>
                           <TextField
                              className="w-100 textFieldInput"
                              type="number"
                              required={true}
                              inputProps={{ min: 0, max: 999999999, autoComplete: "off" }}
                              label="Total Area to Develop"
                              id="totalAreaToDevelop"
                              autoComplete="off"
                              value={data?.totalAreaToDevelop}
                              onChange={(e) => {
                                 setData({ ...data, totalAreaToDevelop: Number(e?.target.value) });
                              }}
                              error={error?.totalAreaToDevelop}
                              InputLabelProps={{ shrink: true }} // <-- Keeps label floated
                              InputProps={{
                                 endAdornment: (
                                    <>
                                       <InputAdornment position="end" sx={{ marginLeft: "-65px" }}>
                                          <Box display="flex" alignItems="center">
                                             <Divider
                                                orientation="vertical"
                                                flexItem
                                                sx={{ height: 45, marginLeft: -1 }}
                                             />{" "}
                                             &nbsp; Sq. Ft.
                                          </Box>
                                       </InputAdornment>
                                    </>
                                 ),
                              }}
                           />
                        </Col>
                        <Col lg={6}>
                           <TextField
                              className="w-100 textFieldInput"
                              type="number"
                              required={true}
                              inputProps={{ min: 0, max: 500, autoComplete: "off" }}
                              label="Open Area"
                              autoComplete="off"
                              id="openAreaPerc"
                              value={data?.openAreaPerc}
                              onChange={(e) => {
                                 setData({ ...data, openAreaPerc: e?.target.value });
                              }}
                              error={error?.openAreaPerc}
                              InputProps={{
                                 endAdornment: (
                                    <>
                                       <InputAdornment position="end" sx={{ marginLeft: "-45px" }}>
                                          <Box display="flex" alignItems="center">
                                             <Divider
                                                orientation="vertical"
                                                flexItem
                                                sx={{ height: 45, marginLeft: 0 }}
                                             />{" "}
                                             &nbsp; %
                                          </Box>
                                       </InputAdornment>
                                    </>
                                 ),
                              }}
                           />
                        </Col>
                     </Row>
                     {/* <Row>
                        <Col lg={12}>
                           <Text
                              text="Stage Of Project"
                              style={{ fontSize: "14px", fontWeight: "500" }}
                           />
                           <FormControl>
                              <RadioGroup
                                 row
                                 aria-labelledby="demo-radio-buttons-group-label"
                                 defaultValue={data?.stageOfProject}
                                 onChange={(e) => {
                                    setData((prevData) => ({
                                       ...prevData,
                                       stageOfProject: e.target.value,
                                    }));
                                 }}
                                 name="radio-buttons-group"
                              >
                                 <FormControlLabel
                                    value="Ready"
                                    control={
                                       <Radio
                                          sx={{
                                             color: "#BE1452", // default color
                                             "&.Mui-checked": {
                                                color: "#BE1452", // checked color
                                             },
                                          }}
                                       />
                                    }
                                    label="Ready"
                                 />
                                 <FormControlLabel
                                    value="Under Construction"
                                    control={
                                       <Radio
                                          sx={{
                                             color: "#BE1452",
                                             "&.Mui-checked": {
                                                color: "#BE1452",
                                             },
                                          }}
                                       />
                                    }
                                    label="Under Construction"
                                 />
                              </RadioGroup>
                           </FormControl>
                        </Col>
                     </Row> */}
                     {/* {data?.stageOfProject === "Under Construction" ? (
                        <> */}
                           <Row className="date-container">
                              {/* Possession From */}
                              <Col lg={6}>
                                 <Text text="Possession from" />
                                 <Form.Group as={Row} controlId="monthYearFrom">
                                    <Col sm="6">
                                       <Form.Label>Month</Form.Label>
                                       <Form.Control
                                          as="select"
                                          aria-label="Month"
                                          name="month"
                                          required={true}
                                          className="custom-dropdown" // Add your custom class if needed
                                          value={monthYearFrom.month} // Preselect the month from parsed value
                                          onChange={handleFromMonthChange}
                                          isInvalid={
                                             monthYearFrom.month !== null
                                                ? false
                                                : error?.possessionFrom
                                          }
                                       >
                                          <option value="">Select Month</option>
                                          {Array.from({ length: 12 }, (_, index) => (
                                             <option
                                                key={index}
                                                value={String(index + 1).padStart(2, "0")} // Pad month with 0
                                             >
                                                {new Date(0, index).toLocaleString("default", {
                                                   month: "long",
                                                })}
                                             </option>
                                          ))}
                                       </Form.Control>
                                       {!monthYearFrom.month && error?.possessionFrom ? (
                                          <>
                                             <Text
                                                text={"Please enter month"}
                                                style={{
                                                   fontSize: "13px",
                                                   fontWeight: "600",
                                                   color: "red",
                                                }}
                                             />
                                          </>
                                       ) : null}
                                    </Col>
                                    <Col sm="6">
                                       <Form.Label>Year</Form.Label>
                                       <Form.Control
                                          as="select"
                                          aria-label="Year"
                                          required={true}
                                          name="year" // Set name for the year select
                                          value={monthYearFrom.year} // Preselect the year from parsed value
                                          onChange={handleFromYearChange}
                                          isInvalid={
                                             monthYearFrom.year !== null
                                                ? false
                                                : error?.possessionFrom
                                          }
                                       >
                                          <option value="">Select Year</option>
                                          {Array.from(
                                             { length: 5 },
                                             (_, index) => currentYear + index
                                          ).map((year) => (
                                             <option key={year} value={year}>
                                                {year}
                                             </option>
                                          ))}
                                       </Form.Control>
                                       {!monthYearFrom.year && error?.possessionFrom ? (
                                          <>
                                             <Text
                                                text={"Please enter year"}
                                                style={{
                                                   fontSize: "13px",
                                                   fontWeight: "600",
                                                   color: "red",
                                                }}
                                             />
                                          </>
                                       ) : null}
                                    </Col>
                                 </Form.Group>
                              </Col>

                              {/* Possession To */}
                              <Col lg={6}>
                                 <Text text="Possession to" />
                                 <Form.Group as={Row} controlId="monthYearTo">
                                    <Col sm="6">
                                       <Form.Label>Month</Form.Label>
                                       <Form.Control
                                          as="select"
                                          name="month" // Set name for the month select
                                          aria-label="Month"
                                          required={true}
                                          value={monthYearTo.month} // Preselect the month from parsed value
                                          onChange={handleToMonthChange}
                                          isInvalid={
                                             monthYearTo?.month !== null
                                                ? false
                                                : error?.possessionTo
                                          }
                                       >
                                          <option value="">Select Month</option>
                                          {Array.from({ length: 12 }, (_, index) => (
                                             <option
                                                key={index}
                                                value={String(index + 1).padStart(2, "0")}
                                             >
                                                {new Date(0, index).toLocaleString("default", {
                                                   month: "long",
                                                })}
                                             </option>
                                          ))}
                                       </Form.Control>
                                       {!monthYearTo.month && error?.possessionTo ? (
                                          <>
                                             <Text
                                                text={"Please enter month"}
                                                style={{
                                                   fontSize: "13px",
                                                   fontWeight: "600",
                                                   color: "red",
                                                }}
                                             />
                                          </>
                                       ) : null}
                                    </Col>
                                    <Col sm="6">
                                       <Form.Label>Year</Form.Label>
                                       <Form.Control
                                          as="select"
                                          aria-label="Year"
                                          required={true}
                                          name="year" // Set name for the year select
                                          value={monthYearTo.year} // Preselect the year from parsed value
                                          onChange={handleToYearChange}
                                          isInvalid={
                                             monthYearTo?.year !== null
                                                ? false
                                                : error?.possessionTo
                                          }
                                          disabled={!data.possessionFrom}
                                       >
                                          <option value="">Select Year</option>
                                          {Array.from(
                                             { length: 10 },
                                             (_, index) => (Number(monthYearFrom.year) - 1) + 10 - index
                                          ).map((year) => (
                                             <option key={year} value={year}>
                                                {year}
                                             </option>
                                          ))}
                                       </Form.Control>
                                       {!monthYearTo.year && error?.possessionTo ? (
                                          <>
                                             <Text
                                                text={"Please enter year"}
                                                style={{
                                                   fontSize: "13px",
                                                   fontWeight: "600",
                                                   color: "red",
                                                }}
                                             />
                                          </>
                                       ) : null}
                                    </Col>
                                 </Form.Group>
                              </Col>
                           </Row>
                           {!data.possessionFrom ?
                              <div className="text-end">
                                 <Text text={"Add possesion from first"} style={{fontSize: '12px', fontWeight: '500'}} />
                              </div>
                           : null}
                        {/* </>
                     ) : null} */}
                     <Row className="mt-4">
                        <Col lg={4}>
                           <TextField
                              className="mt-2 mb-3 w-100 textFieldInput"
                              label="Latitude"
                              type="number"
                              onChange={(e) => {
                                 setData({ ...data, latitude: Number(e.target.value) });
                              }}
                              value={data?.latitude}
                           />
                        </Col>
                        <Col lg={4}>
                           <TextField
                              className="mt-2 mb-3 w-100 textFieldInput"
                              label="Longitude"
                              type="number"
                              onChange={(e) => {
                                 setData({ ...data, longitude: Number(e.target.value) });
                              }}
                              value={data?.longitude}
                           />
                        </Col>
                        <Col lg={4}>
                           <Buttons
                              className="mt-2"
                              name="Update location"
                              varient="primary"
                              onClick={() => {
                                 if (data?.latitude !== 0 && data?.longitude !== 0) {
                                    handleLatLngChanged();
                                 }
                              }}
                           />
                        </Col>
                     </Row>
                  </Col>
               </Row>
               <Row className="mt-4">
                  <Col lg="4">
                     <TextField
                        id={"contactName"}
                        type="text"
                        required={true}
                        autoComplete="off"
                        inputProps={{ autoComplete: "off" }}
                        className="textFieldInput w-100"
                        label="Contact Person Name"
                        value={data?.contactPersonName}
                        onChange={(e) => setData({ ...data, contactPersonName: e?.target.value })}
                        error={error?.contactPersonName}
                     />
                  </Col>
                  <Col lg="4">
                     <TextField
                        id={"contactNumber"}
                        type="number"
                        required={true}
                        autoComplete="off"
                        inputProps={{ min: 0, autoComplete: "off" }}
                        className="textFieldInput w-100"
                        label="Phone Number"
                        value={data?.contactPersonNumber}
                        onChange={(e) => {
                           const mobileNum = handlePhoneChange(e);
                           setData({ ...data, contactPersonNumber: mobileNum });
                        }}
                        error={error?.contactPersonNumber}
                     />
                  </Col>
                  <Col lg="4">
                     <TextField
                        id={"reraNumber"}
                        type="text"
                        required={true}
                        inputProps={{ min: 0, autoComplete: "off" }}
                        className="textFieldInput w-100"
                        label="Rera Number"
                        autoComplete="off"
                        value={data?.reraNumber}
                        onChange={(e) => {
                           setData({ ...data, reraNumber: e?.target?.value });
                        }}
                        error={error?.reraNumber}
                     />
                  </Col>
                  <Col lg="12" className="mt-4">
                     <TextField
                        id="projectDescription"
                        className="textFieldInput w-100"
                        type="text"
                        multiline={true}
                        required={true}
                        autoComplete="off"
                        inputProps={{ autoComplete: "off" }}
                        label="Project Description"
                        value={data?.projectDescription}
                        onChange={(e) => {
                           setData({ ...data, projectDescription: e?.target.value });
                        }}
                        error={error?.projectDescription}
                     />
                  </Col>
               </Row>

               <Row className="imageUploadRow mt-3">
                  <Col lg={4}>
                     <Form.Group controlId="formProjectImages" className="mb-4 formProjectImages">
                        <span>Upload Project Images*</span>
                        <div className="image-upload mt-2">
                           <label htmlFor="upload-project-image" className="upload-label">
                              <TiCameraOutline className="camera-icon" />
                              <input
                                 id="upload-project-image"
                                 type="file"
                                 className="upload-input"
                                 accept="image/*"
                                 multiple
                                 onChange={(e) => handleFileChange(e, "PROJECT_IMAGES")}
                                 ref={fileInputRef}
                              />
                              <span>Upload Images only</span>
                           </label>

                           {/* Display the list of uploaded images */}
                           <div className="d-flex flex-wrap mt-2 justify-content-center">
                              {data?.projectImages?.map((image, index) => (
                                 <div
                                    key={index}
                                    className="project-images mt-3"
                                    style={{
                                       position: "relative",
                                       marginRight: "10px",
                                    }}
                                 >
                                    <img
                                       src={image.docURL}
                                       alt={image.docDescription || image.docName} // Ensure alt text is appropriate for accessibility
                                       className="img-fluid"
                                       style={{ width: "100px", height: "100px" }}
                                    />
                                    <RxCross2
                                       className="delete-icon"
                                       onClick={() => handleDeleteImage(index, "upload image")}
                                       style={{
                                          position: "absolute",
                                          top: "-5px",
                                          right: "-4px",
                                          cursor: "pointer",
                                          color: "#fff",
                                          background: "#ff0000",
                                          borderRadius: "50%",
                                       }}
                                    />
                                 </div>
                              ))}
                           </div>

                           <Form.Text className="text-muted">
                              File should be 5MB(max) in png, jpg, etc.
                           </Form.Text>
                        </div>
                     </Form.Group>
                  </Col>

                  {/* Project Layout Section */}
                  <Col lg={4}>
                     <Form.Group controlId="formProjectLayout" className="mb-4 formProjectLayout">
                        <span>Brochure URL *</span>

                        <div className="image-upload mt-2">
                           <label htmlFor="upload-project-layout" className="upload-label">
                              <TiCameraOutline className="camera-icon" />
                              <input
                                 id="upload-project-layout"
                                 type="file"
                                 className="upload-input"
                                 accept="application/pdf"
                                 multiple={false}
                                 onChange={(e) => {
                                    handleFileChange(e, "PROJECT_LAYOUT");
                                    e.target.value = null;
                                 }}
                                 // ref={fileInputRef1}
                              />
                              <span>Upload Brochure URL</span>
                           </label>
                           <div className=" flex-wrap mt-2 justify-content-center">
                              {/* {data?.projectImages
                                 ?.filter((image) => image.docDescription === "project layout")
                                 ?.map((image, index) => (
                                    <div
                                       key={index}
                                       className="project-images mt-3"
                                       style={{ position: "relative", marginRight: "10px" }}
                                    >
                                       <img
                                          src={
                                             image.docURL
                                                ? `${CONSTANTS.CONFIG_PROPERTY.s3Url}/${image.docURL}` // Use docURL if available
                                                : image.builderProjectImageAsBase64 // Fallback to base64 if docURL is not available
                                          }
                                          alt={image.docDescription || image.docName} // Ensure alt text is appropriate for accessibility
                                          className="img-fluid"
                                          style={{ maxWidth: "115px" }}
                                       />
                                       <RxCross2
                                          className="delete-icon"
                                          onClick={() =>
                                             handleDeleteImage(index, "project layout")
                                          }
                                          style={{
                                             position: "absolute",
                                             top: "-5px",
                                             right: "-4px",
                                             cursor: "pointer",
                                             color: "#fff",
                                             background: "#ff0000",
                                             borderRadius: "50%",
                                          }}
                                       />
                                    </div>
                                 ))} */}
                              {data?.brochureUrl !== null && data?.brochureUrl?.length !== 0 ? (
                                 <>
                                    <div
                                       className="project-images mt-3"
                                       style={{ position: "relative", marginRight: "10px" }}
                                    >
                                       {/* <img
                                          src={
                                             data?.brochureUrl
                                          }
                                          alt={"Brochure Url"} // Ensure alt text is appropriate for accessibility
                                          className="img-fluid"
                                          style={{ maxWidth: "115px" }}
                                       /> */}
                                       <div>
                                          <img src={docIcon} alt="" style={{height: '3rem', width:'3rem'}} onClick={() => {window.open(data.brochureUrl, "_blank")}} />
                                          
                                       </div>
                                       <RxCross2
                                          className="delete-icon"
                                          onClick={() => handleDeleteImage(null, "brochureUrl")}
                                          style={{
                                             position: "absolute",
                                             top: "-5px",
                                             right: "150px",
                                             cursor: "pointer",
                                             color: "#fff",
                                             background: "#ff0000",
                                             borderRadius: "50%",
                                          }}
                                       />
                                       
                                    </div>
                                    <Text
                                          text={"Brochure uploaded. Click the icon to view."}
                                          style={{ fontSize: "12px", fontWeight: "500" }}
                                       />
                                 </>

                              ) : null}
                           </div>
                           <Form.Text className="text-muted">
                              File should be 15MB(max) in pdf.
                           </Form.Text>
                        </div>
                     </Form.Group>
                  </Col>

                  <Col lg={4}>
                     <Form.Group
                        controlId="formProjectVideo"
                        className="mb-4 video-upload-container formProjectVideo"
                     >
                        <span>Add project video</span>

                        <div className="input-plus-icon mt-2 d-flex flex-column align-items-start">
                           <div className="d-flex" style={{ position: "relative", width: "100%" }}>
                              <Form.Control
                                 type="text"
                                 placeholder="Upload Video"
                                 name="newVideoUrl" // Changed to newVideoUrl
                                 value={data?.projectVideoUrl || ""} // Use newVideoUrl for the input value
                                 onChange={(e) => {
                                    setData((prevData) => ({
                                       ...prevData,
                                       projectVideoUrl: e?.target?.value,
                                    }));
                                 }}
                                 style={{ paddingRight: "2.5rem" }}
                              />
                              {data?.projectVideoUrl && (
                                 <TiTimes
                                    className="crossicon"
                                    onClick={clearInput}
                                    style={{
                                       position: "absolute",
                                       right: "50px",
                                       top: "50%",
                                       transform: "translateY(-50%)",
                                       cursor: "pointer",
                                       color: "#aaa",
                                    }}
                                 />
                              )}
                              {/* <IoIosAdd
                                 size={30}
                                 className="Plus-icon"
                                 onClick={handleAddVideo}
                                 style={{
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                    color: "#fff",
                                    backgroundColor: "#BE1452",
                                    padding: "5px",
                                 }}
                              /> */}
                           </div>
                           {/* Display the list of videos below the input */}

                           <Row>
                              {data?.projectVideoUrl && (
                                 <>
                                    <Col lg="6">
                                       <div
                                          className="video-preview"
                                          style={{
                                             position: "relative",
                                             display: "inline-block",
                                             margin: "10px",
                                          }}
                                       >
                                          <iframe
                                             width="120"
                                             height="70"
                                             src={data?.projectVideoUrl}
                                             title={`Video thumbnail`}
                                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                             allowFullScreen
                                             style={{
                                                borderRadius: "8px",
                                                border: "1px solid #ddd",
                                             }}
                                          ></iframe>
                                          <PiPlayCircleLight
                                             style={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                                color: "#fff",
                                                fontSize: "47px",
                                                cursor: "pointer",
                                             }}
                                          />
                                          <RxCross2
                                             className="delete-icon"
                                             onClick={() => clearInput()}
                                             style={{
                                                position: "absolute",
                                                top: "-10px",
                                                right: "-10px",
                                                cursor: "pointer",
                                                color: "#fff",
                                                background: "#ff0000",
                                                borderRadius: "50%",
                                                padding: "3px",
                                                zIndex: 1, // Ensure the icon is on top of other content
                                             }}
                                          />
                                       </div>
                                    </Col>
                                 </>
                              )}
                           </Row>

                           <Form.Text className="text-muted">
                              Paste the link of the video (YouTube, etc.)
                           </Form.Text>
                        </div>
                     </Form.Group>
                  </Col>
               </Row>

               <div className="form-actions">
                  <button
                     type="submit"
                     // disabled={this.state.disableSubmit}
                     id="submit-team-member-button"
                     className=" btn-small cancel-btn"
                     onClick={() => {
                        if (props?.editProject) {
                           toggleEdit();
                        } else {
                           history.goBack();
                        }
                     }}
                  >
                     Cancel
                  </button>
                  {saveProjectFlag ? (
                     <button
                        type="submit"
                        // disabled={this.state.disableSubmit}
                        id="cancel-team-member-button"
                        disabled={!saveProjectFlag}
                        className=" btn-small submit-btn"
                        onClick={() => {
                           handleSubmit();
                        }}
                     >
                        {props?.editProject === true ? "Save" : "Save & Add Tower/Plotted"}
                     </button>
                  ) : null}
               </div>
               {/* </form> */}
            </div>
         </Container>
      </div>
   );
};

export default AddNewProjectPost;
