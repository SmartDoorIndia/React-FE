/** @format */
// API integration on line 281 and 305
import React, { useRef, useEffect, useState } from "react";
import "./AddNewSubProject.scss";
import { Modal, Button, Col, Form, Image, Row } from "react-bootstrap";
import {
   showErrorToast,
   getLocalStorage,
   handlePhoneChange,
   showSuccessToast,
} from "../../../../common/helpers/Utils"; // Utility for displaying toast messages
import Text from "../../../../shared/Text/Text";
import { TiCameraOutline } from "react-icons/ti";
import { TiTimes } from "react-icons/ti";
import { IoIosAdd } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { PiPlayCircleLight } from "react-icons/pi";
import addIcon from "../../../../assets/svg/add.svg";
import CONSTANTS from "../../../../common/helpers/Constants";
import {
   Checkbox,
   FormControl,
   FormControlLabel,
   InputAdornment,
   ListItemText,
   MenuItem,
   Radio,
   RadioGroup,
   TextField,
} from "@mui/material";
import Units from "./AddNewUnit/Units";
import {
   saveBuilderProject,
   saveBuilderSubProject,
   uploadImage,
} from "../../../../common/redux/actions";
import { validateProjectDetails, validateSubProjectDetails } from "../../../../common/validations";
import Buttons from "../../../../shared/Buttons/Buttons";
import POSTING_CONSTANTS from "../../../../common/helpers/POSTING_CONSTANTS";

const AddNewSubProject = (props) => {
   const {
      updateSubProject,
      builderId,
      editTower,
      toggleEditTower,
      updateSubProjectList,
      closeNewTowerForm,
      projectDetails,
   } = props;
   const [show, setShow] = useState(false);
   const [imageCategory, setImageCategory] = useState("Interior");
   const [selectedImages, setSelectedImages] = useState([]);
   const [imagePreviews, setImagePreviews] = useState([]);
   const fileInputRef = useRef(null);
   const [monthYearFrom, setMonthYearFrom] = useState({ month: "", year: "" });
   const [monthYearTo, setMonthYearTo] = useState({ month: "", year: "" });
   const currentYear = new Date().getFullYear();
   const [error, setError] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [showImageModal, setImageShowModal] = useState(false);
   const [selectedImageSrc, setSelectedImageSrc] = useState("");
   const [currentVideoUrl, setCurrentVideoUrl] = useState("");
   const [newVideoUrl, setNewVideoUrl] = useState(null);
   const [showMoreUnits, setShowMoreUnits] = useState(false);
   const [currentUnitIndex, setCurrentUnitIndex] = useState(0);
   const [selectedType, setSelectedType] = useState([]);
   const auth = getLocalStorage("authData");
   const [saveSubProjectFlag, setSaveSubProjectFlag] = useState(true);
   const [data, setData] = useState({
      builderId: props?.builderId,
      parentProjectId: props.projectId,
      projectId: null,
      propertyType: "",
      projectName: "",
      reraNumber: projectDetails?.builderProjectSearchDto[0]?.reraNumber || "",
      totalAreaToDevelop: "",
      totalAreaMetrics: "Sq. Ft.",
      highlightsOrUsp: "",
      contactPersonName: projectDetails?.builderProjectSearchDto[0]?.contactPersonName || "",
      contactPersonNumber: projectDetails?.builderProjectSearchDto[0]?.contactPersonNumber || "",
      possessionFrom: "",
      possessionTo: "",
      totalFloors: "",
      unitsPerFloor: "",
      amenities: [],
      properties: [],
      projectVideoUrl: "",
      projectImages: [],
   });

   const measurementUnits = ["Sq. Ft.", "Sq. Mt.", "Sq. Yd."];

   const defaultSubpost = ["Tower", "Plotted"];
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

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      const [fieldName, propertyIndex] = name.split("_");

      if (name === "newVideoUrl") {
         setNewVideoUrl(value); // Update the newVideoUrl state
      } else if (fieldName && propertyIndex !== undefined) {
         setData((prevData) => {
            const updatedProperties = [...prevData.builderProjectSubPostProperties]; // Clone the existing properties
            if (updatedProperties[parseInt(propertyIndex)]) {
               updatedProperties[parseInt(propertyIndex)][fieldName] = value; // Update the specific field in the correct property
            }
            return { ...prevData, builderProjectSubPostProperties: updatedProperties }; // Return the updated state
         });
      } else if (name === "contactPersonNumber") {
         const mobileNum = handlePhoneChange(e);
         setData((prevData) => ({
            ...prevData,
            [name]: mobileNum || "", // Update the specific field in the general data
         }));
      } else {
         setData((prevData) => ({
            ...prevData,
            [name]: value || "", // Update the specific field in the general data
         }));
      }
   };

   const handleShow = () => {
      setSelectedImages([]); // Reset selected images
      setShow(true); // Open the modal
   };

   const handleClose = () => {
      setShow(false); // Close the modal
      setSelectedImageSrc("");
   };

   const handleProjectImagesChange = (e) => {
      const files = Array.from(e.target.files);
      fileInputRef.current.value = "";
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
                  let projectImage = [...data?.projectImages];
                  for (let i = 0; i < response.data.resourceData.length; i++) {
                     // projectImage.push({
                     //    docId: 0,
                     //    docName: "",
                     //    docDescription: imageCategory,
                     //    docOrderInFrontendView: i,
                     //    docURL: response.data.resourceData[i],
                     // });
                     projectImage.push(response.data.resourceData[i]);
                  }
                  console.log(projectImage);
                  setData((prevData) => ({
                     ...prevData,
                     projectImages: [...projectImage],
                  }));
                  showSuccessToast(response.data.customMessage);
               }
            })
            .catch((error) => {
               // setLoading(false);
            });
      }
   };

   const handleSaveImages = () => {
      setData((prevData) => {
         const existingImages = prevData.builderProjectSubPostImages || [];
         const newImages = selectedImages.map((image) => ({
            ...image,
            docId: image.docId || null,
            docName: image.docName,
            docURL: image.docURL || "",
            docOrderInFrontendView: image.docOrderInFrontendView || null,
            docDescription: image.docDescription,
            builderProjectImageAsBase64: image.builderProjectImageAsBase64 || "",
         }));
         return {
            ...prevData,
            builderProjectSubPostImages: [...existingImages, ...newImages],
         };
      });
      setSelectedImages([]);
      handleClose();
   };

   const handleDeleteProjectImage = (index, description) => {
      setData((prevData) => ({
         ...prevData,
         projectImages: prevData.projectImages
            .filter((image) => image.docDescription === description)
            .filter((_, i) => i !== index) // Remove only the image from the relevant category
            .concat(prevData.projectImages.filter((image) => image.docDescription !== description)),
      }));
   };

   const handleDeleteSelectedImage = (indexToDelete, docDescription) => {
      setData((prevData) => {
         const updatedProjectImages = prevData.projectImages.filter(
            (image) => image.docDescription === docDescription
         );

         if (updatedProjectImages[indexToDelete]) {
            return {
               ...prevData,
               projectImages: prevData.projectImages.filter(
                  (image) => image !== updatedProjectImages[indexToDelete]
               ),
            };
         }

         return prevData;
      });
   };

   const clearInput = () => {
      setNewVideoUrl(""); // Clear the input field
   };

   const handleAddVideo = () => {
      if (newVideoUrl) {
         const newVideo = {
            docId: null,
            docName: data.docName || "New Video",
            docDescription: "Description here",
            docOrderInFrontendView: (data.builderProjectSubPostVideos?.length || 0) + 1,
            docURL: newVideoUrl,
            builderProjectImageAsBase64: null,
         };
         if (newVideo.docURL) {
            setData((prevData) => {
               const updatedVideos = [...(prevData.builderProjectSubPostVideos || [])];
               updatedVideos.push(newVideo);
               return { ...prevData, builderProjectSubPostVideos: updatedVideos };
            });
            clearInput();
         }
      }
   };

   const handleDeleteVideo = () => {
      setData((prevData) => {
         return {
            ...prevData,
            projectVideoUrl: "",
         };
      });
   };

   const getEmbedUrl = (url) => {
      // YouTube
      const youtubeMatch = url.match(
         /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/
      );
      if (youtubeMatch) {
         return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
      }

      // Vimeo
      const vimeoMatch = url.match(/(https?:\/\/)?(www\.)?(vimeo\.com\/)([0-9]{1,10})/);
      if (vimeoMatch) {
         return `https://player.vimeo.com/video/${vimeoMatch[4]}`;
      }
      return url.replace("watch?v=", "embed/"); // Example conversion
   };

   const handleSubPostChange = (e) => {
      const value = e.target.value;
      console.log(e);
      setData((prevData) => ({
         ...prevData,
         propertyType: value,
         properties: [],
      }));
   };

   useEffect(() => {
      console.log(props?.projectId);
      console.log(props?.builderId);
      console.log(props);
      if (props?.editTower === true) {
         setData({
            ...props?.subProjectDetails,
            builderId: props?.builderId,
            parentProjectId: props?.parentProjectId,
            totalAreaMetrics: "Sq. Ft.",
         });
         const possessionFrom = props?.subProjectDetails?.possessionFrom;
         const date = new Date(possessionFrom);

         setMonthYearFrom({
            month: String(date.getMonth() + 1).padStart(2, "0"),
            year: date.getFullYear(),
         });

         const possessionTo = props?.subProjectDetails?.possessionTo;
         const dateTo = new Date(possessionTo);
         setMonthYearTo({
            month: String(dateTo.getMonth() + 1).padStart(2, "0"),
            year: dateTo.getFullYear(),
         });
         setData((prevData) => ({
            ...prevData,
            contactPersonName: props?.subProjectDetails?.contactName,
            contactPersonNumber: props?.subProjectDetails?.contactNumber,
            highlightsOrUsp: props?.subProjectDetails?.highlights,
            totalAreaMetrics: "Sq. Ft.",
         }));
         // let projectImageList = props?.subProjectDetails?.projectImages;
         // let imageList = []
         // projectImageList.forEach((image, index) => {
         //    let imageDto = {
         //       docId: '',
         //       docName: '',
         //       docDescription: '',
         //       docOrderInFrontendView: index + 1,
         //       docURL: image
         //    }
         //    imageList.push(imageDto);
         // });
         // setData((prevData) => ({ ...prevData, openAreaPerc: props?.projectDetails?.openAreaPercent }))
         // if (props?.projectDetails?.projectAmenities === null) {
         //    setData((prevData) => ({ ...prevData, projectAmenities: [] }))
         // }
      }
      if (projectDetails?.builderProjectSearchDto[0]?.totalTowers === 1) {
         setData((prevData) => ({
            ...prevData,
            totalAreaToDevelop: projectDetails?.builderProjectSearchDto[0]?.totalAreaToDevelop,
            amenities: projectDetails?.builderProjectSearchDto[0]?.projectAmenities,
            possessionFrom: projectDetails?.builderProjectSearchDto[0]?.possessionFrom,
            possessionTo: projectDetails?.builderProjectSearchDto[0]?.possessionTo,
         }));
         const possessionFrom = projectDetails?.builderProjectSearchDto[0]?.possessionFrom;
         const date = new Date(possessionFrom);

         setMonthYearFrom({
            month: String(date.getMonth() + 1).padStart(2, "0"),
            year: date.getFullYear(),
         });

         const possessionTo = projectDetails?.builderProjectSearchDto[0]?.possessionTo;
         const dateTo = new Date(possessionTo);
         setMonthYearTo({
            month: String(dateTo.getMonth() + 1).padStart(2, "0"),
            year: dateTo.getFullYear(),
         });
      }
   }, []);

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
   const handleSelectChange = (e) => {
      const { value } = e.target; // Extract the selected values array

      setData((prevData) => ({
         ...prevData,
         amenities: value, // Set the new selected values
      }));
   };
   const handlePlayVideo = (videoUrl) => {
      setCurrentVideoUrl(videoUrl);
      setShowModal(true);
   };

   const handleRemoveUnit = (index) => {
      let units = data.properties;
      units.splice(index);
      setData((prevData) => ({
         ...prevData,
         properties: units,
      }));
   };

   const handleAddMoreUnit = () => {
      const newUnit = {
         builderId: props?.builderId,
         projectId: data.projectId,
      };

      setSelectedType((prevTypes) => {
         const newTypes = [...prevTypes, "Independent House / Bungalow"];
         return newTypes;
      });
      let units = [];
      units = data.properties;
      units.push(newUnit);
      setData((prevState) => ({
         ...prevState,
         properties: units,
      }));
      setCurrentUnitIndex((prevIndex) => prevIndex + 1);
      console.log(data);
   };

   const saveSubProjectDetails = async () => {
      console.log(data);
      // e.preventDefault();
      try {
         const submissionData = {
            ...data,
         };

         const valid = await validateSubProjectDetails(submissionData);
         setError(valid.errors);
         console.log(valid);

         if (valid.isValid) {
            const response = await saveBuilderSubProject(submissionData, editTower ? true : false);
            setSaveSubProjectFlag(false);
            if (response?.data) {
               // history.push(-1);
               // fetchProjectId(response?.data?.resourceData);
               if (editTower) {
                  updateSubProject(data);
               } else {
                  setData((prevData) => ({
                     ...prevData,
                     projectId: response?.data?.resourceData,
                     contactName: data?.contactPersonName,
                     contactNumber: data?.contactPersonNumber,
                     highlights: data?.highlightsOrUsp,
                  }));
                  let subProjectData = { ...data };
                  subProjectData.projectId = response?.data?.resourceData;
                  subProjectData.contactName = data?.contactPersonName;
                  subProjectData.contactNumber = data?.contactPersonNumber;
                  subProjectData.highlights = data?.highlightsOrUsp;
                  // updateSubProjectList(subProjectData)
               }
            } else {
               const responseError = response?.data?.error || "Unknown error occurred";
               // setError(responseError);
               console.error("Error in response:", responseError);
            }
         } else {
            return null;
         }
      } catch (error) {
         console.error("Error submitting builder project:", error);
         // setError("An unexpected error occurred. Please try again.");
      }
   };

   const handleFetchUnit = (unitDetails) => {
      console.log("", unitDetails);
      let units = [...data?.properties];
      units[units.length - 1] = unitDetails;
      setData((prevData) => ({ ...prevData, properties: [...units] }));
      if (editTower) {
         setShowMoreUnits(false);
         updateSubProject(data);
      }
   };

   return (
      <>
         <div className="" style={{ backgroundColor: editTower ? "whitesmoke" : "white" }}>
            <div className="builderProjectDetails">
               <div className="">
                  <div className="mt-2 ">
                     <div className="p-3">
                        <Row>
                           <Col lg="4">
                              <TextField
                                 className="w-100 textFieldInput"
                                 select
                                 name="propertyType"
                                 required={true}
                                 value={data.propertyType}
                                 onChange={handleSubPostChange}
                                 label={"Property Type"}
                                 sx={{
                                    ".MuiInputBase-root": {
                                       display: "flex",
                                       flexWrap: "wrap",
                                       overflow: "hidden",
                                       // minHeight: "54px",
                                       maxHeight: "52px",
                                       borderTopLeftRadius: "0px",
                                       borderTopRightRadius: "0px",
                                       width: "100% !important",
                                    },
                                 }}
                                 error={error?.propertyType}
                              >
                                 <MenuItem value={""} disabled>
                                    Select
                                 </MenuItem>
                                 {defaultSubpost.map((subPost, index) => (
                                    <MenuItem key={index} value={subPost}>
                                       {subPost}
                                    </MenuItem>
                                 ))}
                              </TextField>
                           </Col>
                           <Col lg={4}>
                              <TextField
                                 className="w-100 textFieldInput"
                                 type="text"
                                 label="Tower Name"
                                 name="projectName"
                                 required={true}
                                 autoComplete="off"
                                 value={data.projectName}
                                 onChange={handleInputChange}
                                 error={error?.projectName}
                              />
                           </Col>
                           <Col lg={4}>
                              <TextField
                                 className="w-100 textFieldInput"
                                 type="text"
                                 label="Rera Number"
                                 name="reraNumber"
                                 required={true}
                                 autoComplete="off"
                                 value={data.reraNumber}
                                 onChange={handleInputChange}
                                 error={error?.reraNumber}
                              />
                           </Col>
                        </Row>
                        <Row>
                           <Col lg={4} className="mt-4">
                              <TextField
                                 className="w-100 textFieldInput"
                                 type="number"
                                 label="Total Area To Develop"
                                 name="totalAreaToDevelop"
                                 required={true}
                                 inputProps={{ min: 0, max: 999999999 }}
                                 autoComplete="off"
                                 value={data.totalAreaToDevelop}
                                 onChange={handleInputChange}
                                 error={error?.totalAreaToDevelop}
                                 InputProps={{
                                    endAdornment: (
                                       <>
                                          <InputAdornment
                                             position="end"
                                             // sx={{ marginLeft: "-120px" }}
                                          >
                                             <TextField
                                                className="textFieldInput w-100"
                                                name="totalAreaMetrics"
                                                select
                                                disabled
                                                value={data.totalAreaMetrics}
                                                onChange={(e) => {
                                                   setData((prevData) => ({
                                                      ...prevData,
                                                      totalAreaMetrics: e.target.value,
                                                   }));
                                                }}
                                                sx={{
                                                   ".MuiInputBase-root": {
                                                      display: "flex",
                                                      flexWrap: "wrap",
                                                      overflow: "hidden",
                                                      maxHeight: "54px",
                                                      borderTopLeftRadius: "0px",
                                                      borderTopRightRadius: "0px",
                                                      width: "100% !important",
                                                      paddingRight: "30px",
                                                      marginLeft: "15%",
                                                   },
                                                }}
                                             >
                                                {measurementUnits.map((element) => (
                                                   <MenuItem key={element} value={element}>
                                                      {element}
                                                   </MenuItem>
                                                ))}
                                             </TextField>
                                          </InputAdornment>
                                       </>
                                    ),
                                 }}
                              ></TextField>
                           </Col>
                           {data.propertyType === "Tower" ? (
                              <Col lg={4} className="mt-4">
                                 <TextField
                                    className="w-100 textFieldInput"
                                    type="number"
                                    inputProps={{ min: 0, max: 99999 }}
                                    label="Tower Floors"
                                    autoComplete="off"
                                    name="totalFloors"
                                    required={true}
                                    value={data.totalFloors}
                                    onChange={handleInputChange}
                                    error={error?.totalFloors}
                                 />
                              </Col>
                           ) : null}
                           {data.propertyType === "Tower" ? (
                              <Col lg={4} className="mt-4">
                                 <TextField
                                    className="w-100 textFieldInput"
                                    type="text"
                                    label="Units Per Floor"
                                    name="unitsPerFloor"
                                    required={true}
                                    inputProps={{ min: 0, max: 99999 }}
                                    value={data.unitsPerFloor}
                                    autoComplete="off"
                                    onChange={handleInputChange}
                                    error={error?.unitsPerFloor}
                                 />
                              </Col>
                           ) : null}
                           <Col lg={8} className="mt-4">
                              <TextField
                                 className="w-100 textFieldInput"
                                 type="text"
                                 label="Highlights / USP"
                                 name="highlightsOrUsp"
                                 required={true}
                                 value={data.highlightsOrUsp}
                                 autoComplete="off"
                                 onChange={handleInputChange}
                                 error={error?.highlightsOrUsp}
                              />
                           </Col>
                           <Col lg="4" className="mt-4">
                              <TextField
                                 className="w-100 textFieldInput"
                                 select
                                 label="Amenities"
                                 name="selectedAmenity"
                                 required={true}
                                 sx={{
                                    ".MuiInputBase-root": {
                                       display: "flex",
                                       flexWrap: "wrap",
                                       overflow: "hidden",
                                       // minHeight: "54px",
                                       maxHeight: "52px",
                                    },
                                 }}
                                 SelectProps={{
                                    multiple: true,
                                    renderValue: (selected) => selected.join(", "),
                                 }}
                                 value={data.amenities}
                                 onChange={(e) => handleSelectChange(e)}
                                 error={error?.amenities}
                              >
                                 {/* <MenuItem value="" >
                                    Separate Amenities (Not compulsory)
                                 </MenuItem> */}
                                 {POSTING_CONSTANTS.GeneralAmenities?.map((amenity, index) => (
                                    <MenuItem key={index} value={amenity}>
                                       <Checkbox checked={data?.amenities?.includes(amenity)} />
                                       <ListItemText primary={amenity} />
                                    </MenuItem>
                                 ))}
                              </TextField>
                           </Col>
                           <Col lg={4} className="mt-4">
                              <TextField
                                 className="w-100 textFieldInput"
                                 type="text"
                                 label="Contact Person Name"
                                 name="contactPersonName"
                                 required={true}
                                 value={data.contactPersonName}
                                 autoComplete="off"
                                 onChange={handleInputChange}
                                 error={error?.contactPersonName}
                              />
                           </Col>
                           <Col lg={4} className="mt-4">
                              <TextField
                                 className="w-100 textFieldInput"
                                 type="text"
                                 label="Contact Person Mobile Number"
                                 name="contactPersonNumber"
                                 required={true}
                                 value={data.contactPersonNumber}
                                 autoComplete="off"
                                 onChange={handleInputChange}
                                 error={error?.contactPersonNumber}
                              />
                           </Col>
                        </Row>
                        <Row className="mt-4">
                           <Col lg={6}>
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
                        </Row>
                        {data?.stageOfProject === "Under Construction" ? (
                           <>
                              <Row className="date-container mt-0">
                                 <Col lg={4}>
                                    <Text text="Possession from" />
                                    <Row className="mt-4">
                                       <Col sm="6">
                                          <TextField
                                             className="w-100 textFieldInput"
                                             select
                                             label="Month *"
                                             name="month"
                                             required={true}
                                             value={monthYearFrom.month}
                                             onChange={handleFromMonthChange}
                                             sx={{
                                                ".MuiInputBase-root": {
                                                   display: "flex",
                                                   flexWrap: "wrap",
                                                   overflow: "hidden",
                                                   // minHeight: "54px",
                                                   maxHeight: "52px",
                                                },
                                             }}
                                             error={
                                                monthYearFrom.month ? false : error?.possessionFrom
                                             }
                                          >
                                             <MenuItem value="">Select Month</MenuItem>
                                             {Array.from({ length: 12 }, (_, index) => (
                                                <MenuItem
                                                   key={index}
                                                   value={String(index + 1).padStart(2, "0")}
                                                >
                                                   {new Date(0, index).toLocaleString("default", {
                                                      month: "long",
                                                   })}
                                                </MenuItem>
                                             ))}
                                          </TextField>
                                       </Col>
                                       <Col sm="6">
                                          <TextField
                                             className="w-100 textFieldInput"
                                             select
                                             label="Year *"
                                             name="year"
                                             required={true}
                                             value={monthYearFrom.year}
                                             onChange={handleFromYearChange}
                                             sx={{
                                                ".MuiInputBase-root": {
                                                   display: "flex",
                                                   flexWrap: "wrap",
                                                   overflow: "hidden",
                                                   // minHeight: "54px",
                                                   maxHeight: "52px",
                                                },
                                             }}
                                             error={
                                                monthYearFrom.year ? false : error?.possessionFrom
                                             }
                                          >
                                             <MenuItem value="">Select Year</MenuItem>
                                             {Array.from(
                                                { length: 101 },
                                                (_, index) => currentYear + 20 - index
                                             ).map((year) => (
                                                <MenuItem key={year} value={year}>
                                                   {year}
                                                </MenuItem>
                                             ))}
                                          </TextField>
                                       </Col>
                                    </Row>
                                 </Col>

                                 <Col lg="4">
                                    <Text text="Possession to" />
                                    <Row className="mt-4">
                                       <Col sm="6">
                                          <TextField
                                             className="w-100 textFieldInput"
                                             select
                                             label="Month *"
                                             name="month"
                                             required={true}
                                             value={monthYearTo.month}
                                             onChange={handleToMonthChange}
                                             sx={{
                                                ".MuiInputBase-root": {
                                                   display: "flex",
                                                   flexWrap: "wrap",
                                                   overflow: "hidden",
                                                   // minHeight: "54px",
                                                   maxHeight: "52px",
                                                },
                                             }}
                                             error={monthYearTo.month ? false : error?.possessionTo}
                                          >
                                             <MenuItem value="">Select Month</MenuItem>
                                             {Array.from({ length: 12 }, (_, index) => (
                                                <MenuItem
                                                   key={index}
                                                   value={String(index + 1).padStart(2, "0")}
                                                >
                                                   {new Date(0, index).toLocaleString("default", {
                                                      month: "long",
                                                   })}
                                                </MenuItem>
                                             ))}
                                          </TextField>
                                       </Col>
                                       <Col sm="6">
                                          <TextField
                                             className="w-100 textFieldInput"
                                             select
                                             label="Year *"
                                             name="year"
                                             required={true}
                                             value={monthYearTo.year}
                                             onChange={handleToYearChange}
                                             sx={{
                                                ".MuiInputBase-root": {
                                                   display: "flex",
                                                   flexWrap: "wrap",
                                                   overflow: "hidden",
                                                   // minHeight: "54px",
                                                   maxHeight: "52px",
                                                },
                                             }}
                                             error={monthYearTo.year ? false : error?.possessionTo}
                                          >
                                             <MenuItem value="">Select Year</MenuItem>
                                             {Array.from(
                                                { length: 41 },
                                                (_, index) => currentYear + 20 - index
                                             ).map((year) => (
                                                <MenuItem key={year} value={year}>
                                                   {year}
                                                </MenuItem>
                                             ))}
                                          </TextField>
                                       </Col>
                                    </Row>
                                 </Col>
                              </Row>
                           </>
                        ) : null}

                        <Row className="imageUploadRow mt-4">
                           <Col lg={4}>
                              <Form.Group
                                 controlId="formProjectImages"
                                 className="formProjectImages"
                              >
                                 <span>Upload sub project images *</span>
                                 <div className="image-upload mt-2 ">
                                    <label
                                       className="upload-label"
                                       onClick={handleShow}
                                       style={{ cursor: "pointer" }}
                                    >
                                       <TiCameraOutline className="camera-icon" />
                                       <span className="py-1" style={{ fontSize: "14px" }}>
                                          Upload Tower Images only
                                       </span>
                                    </label>
                                 </div>

                                 {/* Display Image Previews */}
                                 {(data?.projectImages?.length > 0 ||
                                    imagePreviews?.length > 0) && (
                                    <Row className="mt-2">
                                       {/* Combine and map images from both sources */}
                                       {[
                                          ...(data?.projectImages || []),
                                          ...(imagePreviews || []),
                                       ].map((image, index) => {
                                          return (
                                             <Col
                                                lg="4"
                                                key={index}
                                                className="project-images mr-3"
                                             >
                                                <div
                                                   className="image-preview-container"
                                                   style={{ position: "relative" }}
                                                >
                                                   <img
                                                      src={image}
                                                      alt={image.docDescription || image.docName} // Use description or name as alt text
                                                      className="img-fluid"
                                                      style={{
                                                         width: "100px",
                                                         height: "100px",
                                                         borderRadius: "4px",
                                                      }}
                                                   />
                                                   <div
                                                      style={{
                                                         color: "#949494",
                                                         padding: "2px 5px",
                                                         borderRadius: "4px",
                                                         fontSize: "12px",
                                                         fontWeight: 500,
                                                         lineHeight: "13.66px",
                                                         letterSpacing: "-0.02em",
                                                         textAlign: "center",
                                                         marginLeft: "20px",
                                                      }}
                                                   >
                                                      {image.docDescription || image.docName}{" "}
                                                      {/* Display the image description */}
                                                   </div>
                                                   <RxCross2
                                                      className="delete-icon"
                                                      onClick={() =>
                                                         handleDeleteProjectImage(
                                                            index,
                                                            image.docDescription
                                                         )
                                                      }
                                                      style={{
                                                         position: "absolute",
                                                         top: "-5px",
                                                         right: "-39px",
                                                         cursor: "pointer",
                                                         color: "#fff",
                                                         background: "#ff0000",
                                                         borderRadius: "50%",
                                                      }}
                                                   />
                                                </div>
                                             </Col>
                                          );
                                       })}
                                    </Row>
                                 )}
                              </Form.Group>
                              {error?.projectImages ? (
                                 <Form.Text className="text-danger" style={{ fontSize: "13px" }}>
                                    Please add tower images
                                 </Form.Text>
                              ) : null}
                              <Form.Text className="text-muted">
                                 File should be 5MB (max) in png, jpg, etc.
                              </Form.Text>
                           </Col>

                           {/* <Col lg={4}>
                              <Form.Group
                                 controlId="formProjectVideo"
                                 className="mb-4 video-upload-container formProjectVideo"
                              >
                                 <span>Add project video</span>

                                 <div className="input-plus-icon mt-2 d-flex flex-column align-items-start">
                                    <div
                                       className="d-flex"
                                       style={{ position: "relative", width: "100%" }}
                                    >
                                       <Form.Control
                                          type="text"
                                          placeholder="Upload Videos"
                                          name="projectVideoUrl"
                                          value={data?.projectVideoUrl}
                                          onChange={handleInputChange}
                                          style={{ paddingRight: "2.5rem" }}
                                       />
                                       
                                       {data?.projectVideoUrl && ( // Change this line
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
                                    </div>

                                    {(data.projectVideoUrl) && (
                                       <Row className="video-preview-container d-flex">
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
                                                src={data.projectVideoUrl}
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
                                                   transform:
                                                      "translate(-50%, -50%)",
                                                   color: "#fff",
                                                   fontSize: "47px",
                                                   cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                   handlePlayVideo(data?.projectVideoUrl)
                                                }
                                             />
                                             <RxCross2
                                                className="delete-icon"
                                                onClick={() =>
                                                   handleDeleteVideo()
                                                }
                                                style={{
                                                   position: "absolute",
                                                   top: "-10px",
                                                   right: "-10px",
                                                   cursor: "pointer",
                                                   color: "#fff",
                                                   background: "#ff0000",
                                                   borderRadius: "50%",
                                                   padding: "3px",
                                                   zIndex: 1,
                                                }}
                                             />
                                          </div>
                                       </Row>
                                    )}
                                    <Form.Text className="text-muted">
                                       Paste the link of the video (YouTube, Vimeo, etc.)
                                    </Form.Text>
                                 </div>
                              </Form.Group>
                           </Col> */}
                        </Row>
                        <div style={{ justifySelf: "end" }}>
                           {editTower && (
                              <>
                                 <Buttons
                                    name={"Cancel"}
                                    varient="secondary"
                                    onClick={() => {
                                       toggleEditTower();
                                    }}
                                 />{" "}
                                 &nbsp;&nbsp;
                              </>
                           )}
                           {saveSubProjectFlag ? (
                              <Buttons
                                 name={editTower ? "Save" : "Save Tower"}
                                 varient="primary"
                                 onClick={() => {
                                    saveSubProjectDetails();
                                 }}
                              />
                           ) : null}
                        </div>
                        <hr className="p-0 w-100" />
                        {/* Tower */}

                        {showMoreUnits ? (
                           <>
                              <div>
                                 <Text
                                    text="Unit(s)"
                                    style={{
                                       fontSize: "16px",
                                       fontWeight: "700",
                                       lineHeight: "21.86px",
                                       letterSpacing: "-0.02em",
                                       textAlign: "left",
                                    }}
                                 />
                              </div>
                              {data.properties.map((property, propertyIndex) => (
                                 <>
                                    <Units
                                       builderId={data?.builderId}
                                       projectId={data?.projectId}
                                       subProjectDetails={data}
                                       handleRemoveUnit={handleRemoveUnit}
                                       unitIndex={propertyIndex}
                                       fetchUnitDetails={handleFetchUnit}
                                    />
                                 </>
                              ))}
                           </>
                        ) : null}

                        <div>
                           {editTower !== true ? (
                              <>
                                 <Button
                                    className="d-flex mb-2 mt-3"
                                    style={{
                                       color: "#BE1452",
                                       backgroundColor: "#F8F3F5",
                                       borderColor: "#DED6D9",
                                    }}
                                    onClick={() => {
                                       if (
                                          data.propertyType !== null &&
                                          data.propertyType.length !== 0 &&
                                          data.projectId !== null
                                       ) {
                                          setShowMoreUnits(true);
                                          handleAddMoreUnit();
                                       } else {
                                          showErrorToast("Please save tower details above...");
                                          return 0;
                                       }
                                    }}
                                 >
                                    <div
                                       style={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                       }}
                                    >
                                       <Image
                                          src={addIcon}
                                          style={{ width: "14px", height: "14px" }}
                                       />
                                    </div>
                                    <Text
                                       text={"Add More Unit"}
                                       fontWeight="bold"
                                       style={{ fontSize: "12px", color: "#BE1452" }}
                                    />
                                 </Button>
                              </>
                           ) : null}
                           {!editTower && props?.newTowerinExisting ? (
                              <>
                                 <Buttons
                                    name={"Cancel"}
                                    varient="secondary"
                                    onClick={() => {
                                       closeNewTowerForm();
                                    }}
                                 />{" "}
                                 &nbsp;&nbsp;
                                 <Buttons
                                    name={"Done"}
                                    varient="primary"
                                    onClick={() => {
                                       updateSubProjectList(data);
                                    }}
                                 />
                              </>
                           ) : null}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Body style={{ position: "relative" }}>
               <div>
                  <Text
                     text="Project Videos"
                     style={{
                        fontSize: "24px",
                        fontWeight: 700,
                        lineHeight: "21.86px",
                        letterSpacing: "-0.02em",
                        textAlign: "left",
                        marginBottom: "20px",
                     }}
                  />
               </div>
               {/* Close Button */}
               <RxCross2
                  className="delete-icon"
                  onClick={() => setShowModal(false)}
                  style={{
                     position: "absolute",
                     top: "-11px",
                     right: "-11px",
                     cursor: "pointer",
                     color: "#fff ",
                     background: "#ff1919",
                     fontSize: "24px",
                     borderRadius: "50%",
                     zIndex: 1,
                  }}
               />

               {/* Video Iframe */}
               {currentVideoUrl && (
                  <iframe
                     width="100%"
                     height="400px"
                     src={currentVideoUrl}
                     title="Video player"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                     style={{
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                     }}
                  ></iframe>
               )}
            </Modal.Body>
         </Modal>
         <Modal show={showImageModal} onHide={() => setImageShowModal(false)} centered>
            <Modal.Body style={{ position: "relative" }}>
               <h4
                  style={{
                     fontSize: "24px",
                     fontWeight: 700,
                     lineHeight: "21.86px",
                     letterSpacing: "-0.02em",
                     textAlign: "left",
                     marginBottom: "20px",
                  }}
               >
                  Project Images
               </h4>

               <RxCross2
                  className="delete-icon"
                  onClick={() => setImageShowModal(false)}
                  style={{
                     position: "absolute",
                     top: "-11px",
                     right: "-11px",
                     cursor: "pointer",
                     color: "#fff",
                     background: "#ff1919",
                     fontSize: "24px",
                     borderRadius: "50%",
                     zIndex: 1,
                  }}
               />

               {selectedImageSrc && (
                  <img
                     src={selectedImageSrc}
                     alt={selectedImageSrc ? "Image" : ""}
                     className="img-fluid"
                  />
               )}
            </Modal.Body>
         </Modal>
         <Modal show={show} onHide={handleClose} centered className="ImageModal">
            <Modal.Body>
               <div>
                  <h4>Upload Image</h4>
               </div>
               <Form>
                  {/* Select Category */}
                  <Form.Group controlId="categorySelect">
                     <Form.Label>Select Category</Form.Label>
                     <Form.Control
                        as="select"
                        value={imageCategory}
                        onChange={(e) => setImageCategory(e.target.value)}
                     >
                        <option value="Interior">Interior</option>
                        <option value="Exterior">Exterior</option>
                     </Form.Control>
                  </Form.Group>

                  {/* Image Upload */}
                  <Form.Group controlId="formProjectImages" className="uploadProjectImageModal">
                     <label htmlFor="" className="upload-label">
                        <TiCameraOutline className="camera-icon" />
                        <input
                           id="upload-project-image"
                           type="file"
                           className="upload-input"
                           accept=".jpg,.jpeg,.png"
                           multiple
                           onChange={handleProjectImagesChange}
                           ref={fileInputRef}
                           style={{ display: "none" }} // Hidden input
                           onClick={(e) => e.stopPropagation()} // Prevents the click from bubbling up
                        />
                        <span
                           onClick={(e) => {
                              e.preventDefault(); // Prevent default action
                              fileInputRef.current.click(); // Programmatically trigger the file input click
                           }}
                        >
                           Upload Images
                        </span>
                     </label>

                     <Row className="d-flex justify-content-center align-items-center interior-exterior">
                        <Col lg="6" style={{ minHeight: "100px" }} className="image-column">
                           <h6>Interior</h6>
                           <ul className="mt-3 pl-1" style={{ listStyle: "none", padding: 0 }}>
                              {data?.projectImages
                                 ?.filter((image) => image.docDescription === "Interior")
                                 ?.map((image, index) => (
                                    <li
                                       key={index}
                                       style={{
                                          position: "relative",
                                          fontSize: "10px",
                                       }}
                                    >
                                       <FaTimes
                                          className="delete-icon"
                                          onClick={() =>
                                             handleDeleteSelectedImage(index, "Interior")
                                          } // Pass docDescription here
                                          // Pass index and docDescription here
                                          style={{
                                             position: "absolute",
                                             top: "0px",
                                             left: "0px", // Moved the cross to the left of the image name
                                             cursor: "pointer",
                                             color: "#ff0000",
                                          }}
                                       />
                                       <span style={{ marginLeft: "13px" }}>{image.docName}</span>
                                    </li>
                                 ))}
                           </ul>
                        </Col>

                        <Col lg="6" style={{ minHeight: "100px" }} className="image-column">
                           <h6>Exterior</h6>
                           <ul className="mt-3 pl-1" style={{ listStyle: "none", padding: 0 }}>
                              {data?.projectImages
                                 ?.filter((image) => image.docDescription === "Exterior")
                                 ?.map((image, index) => (
                                    <li
                                       key={index}
                                       style={{
                                          position: "relative",
                                          fontSize: "10px",
                                       }}
                                    >
                                       <FaTimes
                                          className="delete-icon"
                                          onClick={() =>
                                             handleDeleteSelectedImage(index, "Exterior")
                                          }
                                          // Pass index and docDescription here
                                          style={{
                                             position: "absolute",
                                             top: "0px",
                                             left: "0px", // Moved the cross to the left of the image name
                                             cursor: "pointer",
                                             color: "#ff0000",
                                          }}
                                       />
                                       <span style={{ marginLeft: "13px" }}>{image.docName}</span>{" "}
                                    </li>
                                 ))}
                           </ul>
                        </Col>
                     </Row>
                  </Form.Group>
               </Form>

               {/* Modal Action Buttons */}
               <Row className="projectDetailModalActions">
                  <Col lg="6">
                     <button type="button" className="btn-small cancel-btn" onClick={handleClose}>
                        Cancel
                     </button>
                  </Col>
                  <Col lg="6">
                     <button
                        type="button"
                        className="btn-small submit-btn"
                        onClick={handleSaveImages}
                     >
                        Save
                     </button>
                  </Col>
               </Row>
            </Modal.Body>
         </Modal>
      </>
   );
};
export default AddNewSubProject;
