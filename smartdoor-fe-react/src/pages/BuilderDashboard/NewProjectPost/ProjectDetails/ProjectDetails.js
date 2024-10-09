/** @format */
// API integration on line 281 and 305
import React, { useRef, useEffect, useState } from "react";
import "./ProjectDetails.scss";
import { Modal, Button, Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import {
   showSuccessToast,
   showErrorToast,
   getLocalStorage,
} from "../../../../common/helpers/Utils"; // Utility for displaying toast messages
import Text from "../../../../shared/Text/Text";
import { TiCameraOutline } from "react-icons/ti";
import { TiTimes } from "react-icons/ti";
import { IoIosAdd } from "react-icons/io";
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { Range } from "react-range"; // You may need to install this package
import { FaTimesCircle, FaUtensilSpoon } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { PiPlayCircleLight } from "react-icons/pi";
import addIcon from "../../../../assets/svg/add.svg";
import {
   getBuilderProjectSubPostById,
   addBuilderProjectSubPost,
   deleteBuilderProjectSubPostById,
} from "../../../../common/redux/actions";
// import Buttons from "../../../shared/Buttons/Buttons";
const ProjectDetails = () => {
   // const [formData, setFormData] = useState({
   //    projectName: "",
   //    customerAddress: "",
   //    reraNumber: "",
   //    generalAmenities: "",
   //    projectDescription: "",
   //    projectLocation: "",
   //    projectImages: [],
   //    projectVideo: "",
   //    guidance: "",
   //    salesManagerContact: "",
   //    termsAccepted: false,
   // });
   const [show, setShow] = useState(false);
   const [imageCategory, setImageCategory] = useState("Interior");
   const [selectedImages, setSelectedImages] = useState([]); // Images selected in the modal
   const [imagePreviews, setImagePreviews] = useState([]); // Images to display on the page
   const fileInputRef = useRef(null);
   const [monthYearFrom, setMonthYearFrom] = useState({ month: "", year: "" });
   const [monthYearTo, setMonthYearTo] = useState({ month: "", year: "" });
   const currentYear = new Date().getFullYear();
   const [videoLinks, setVideoLinks] = useState([]);
   const [file, setFile] = useState(null);
   const [builderProjectSubPostId, setBuilderProjectSubPostId] = useState(null);
   const [userId, setUserId] = useState(398);
   const [error, setError] = useState(null);
   // const [selectSubPostType, setSelectSubPostType] = useState(""); // Separate state for selected amenities
   // const [selectedSubPost, setSelectedSubPost] = useState(data.subPostType || "");
   const [files, setFiles] = useState({}); // To keep track of uploaded files

   const [isEditing, setIsEditing] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [videoUrl, setVideoUrl] = useState("");
   const [configuration, setConfiguration] = useState("Villas");

   const [towerRows, setTowerRows] = useState([]);
   const [plottedRows, setPlottedRows] = useState([]);

   const [formCount, setFormCount] = useState(1); // Start with one form
   const [propertyIndex, setPropertyIndex] = useState(0);
   const [newVideoUrl, setNewVideoUrl] = useState(null);
   const [showMoreUnits, setShowMoreUnits] = useState(false);
   const [showVillas, setShowVillas] = useState(false);
   const [showPlots, setShowPlots] = useState(false);
   const [selectedType, setSelectedType] = useState("Villas");

   const handleAddForm = () => {
      setFormCount((prevCount) => prevCount + 1); // Increment the count
   };
   const handleConfigurationChange = (e, index) => {
      const value = e.target.value;
      setData((prevData) => ({
         ...prevData,
         builderProjectSubPostProperties: prevData.builderProjectSubPostProperties.map(
            (property, propertyIndex) => {
               if (propertyIndex === index) {
                  return { ...property, configuration: value };
               }
               return property;
            }
         ),
      }));
   };

   const defaultSubpost = ["Tower", "Plotted"];

   const [data, setData] = useState({
      builderProjectSubPostId: null,
      builderProjectId: null,
      subPostType: "",
      userId: null,
      builderProjectSubPostName: "",
      reraNumber: "",
      areaToDevelop: null,
      areaToDevelopMeasurementUnitEnteredByUser: "",
      highlightsOrUsp: "",
      contactPersonName: "",
      contactPersonNumber: "",
      possessionFrom: "",
      possessionTo: "",
      totalFloors: null,
      unitsPerFloor: null,
      builderProjectSubPostInfo: [],
      builderProjectSubPostProperties: [
         {
            propertyId: null,
            numberOfRooms: null,
            propertyRoomCompositionType: "",
            propertySubType: "",
            totalProjectUnits: null,
            minPlotArea: null,
            maxPlotArea: null,
            plotAreaMeasurementUnitEnteredByUser: "Sq. Mt",
            minCarpetArea: null,
            maxCarpetArea: null,
            carpetAreaMeasurementUnitEnteredByUser: "Sq. Mt",
            minBuiltUpArea: null,
            maxBuiltUpArea: null,
            builtUpAreaMeasurementUnitEnteredByUser: "Sq. Mt",
            comments: "",
            minPrice: null,
            maxPrice: null,

            propertyVideos: [
               {
                  docId: null,
                  docName: "",
                  docURL: "",
                  docOrderInFrontendView: null,
                  docDescription: "",
                  builderProjectImageAsBase64: null,
               },
            ],
            propertyImages: [
               {
                  docId: null,
                  docName: "",
                  docURL: "",
                  docOrderInFrontendView: 2,
                  docDescription: "",
                  builderProjectImageAsBase64: "",
               },
            ],
         },
      ],
      builderProjectSubPostVideos: [
         {
            docId: null,
            docName: "",
            docURL: "",
            docOrderInFrontendView: null,
            docDescription: "",
            builderProjectImageAsBase64: "",
         },
      ],

      builderProjectSubPostImages: [
         {
            docId: null,
            docName: "",
            docURL: "",
            docOrderInFrontendView: null,
            docDescription: "",
            builderProjectImageAsBase64: "",
         },
      ],
   });
   const step = 1; // Step size of 10L
   // const min
   const [priceRanges, setPriceRanges] = useState(
      data.builderProjectSubPostProperties.map((property) => [property.minPrice, property.maxPrice])
   );

   const imageFields = [
      { docName: "Floor Plan" },
      { docName: "Hall Images" },
      { docName: "Kitchen Images" },
      { docName: "Bedroom 1 Images" },
      { docName: "Bedroom 2 Images" },
   ];
   const auth = getLocalStorage("authData");
   const storedUserId = auth.userid;
   const storedBuilderId = auth.builderId;
   console.log("storedUserId:- ", storedUserId);
   console.log("storedBuilderId:- ", storedBuilderId);
   // const storedBuilderProjectSubPostId = auth.builderProjectSubPostId;

   useEffect(async () => {
      if (builderProjectSubPostId != null) {
         await getBuilderProjectSubPostById({
            builderProjectSubPostId: builderProjectSubPostId,
            userId: storedUserId,
            builderId: storedBuilderId,
         })
            .then((response) => {
               if (response?.data) {
                  const { resourceData, error: responseError } = response.data;
                  if (resourceData) {
                     // Ensure no null values in resourceData
                     // const sanitizedData = Object.fromEntries(
                     //    Object.entries(resourceData).map(([key, value]) => [key, value ?? ""])
                     // );
                     console.log(resourceData);
                     setData(resourceData);
                  }
                  if (responseError) setError(responseError);
               }
               // setLoading(false);
            })
            .catch((error) => {
               // setLoading(false);
               setError(error);
               console.log("Error fetching builder data:", error);
            });
      }
   }, [storedUserId, storedBuilderId, builderProjectSubPostId]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         // Filter out any videos with empty or null fields
         const sanitizedVideos = data.builderProjectSubPostVideos.filter(
            (video) => video.docName && video.docURL
         );

         const submissionData = {
            ...data,
            builderProjectSubPostVideos: sanitizedVideos, // Only submit valid videos
         };

         const response = await addBuilderProjectSubPost(submissionData);
         if (response?.data) {
            console.log("Project created successfully:", response.data);
            showSuccessToast("Project created successfully");
         }
      } catch (error) {
         console.error("Error submitting builder project:", error);
         showErrorToast("There was an error submitting the project.");
      }
   };

   const deleteBuilderProjectSubPost = async (e) => {
      e.preventDefault();

      try {
         const response = await deleteBuilderProjectSubPostById({
            builderProjectSubPostId: builderProjectSubPostId,
            userId: userId,
         });
      } catch (error) {
         showErrorToast("Error deleting builder project sub post");
         console.log("Error deleting builder project sub post: ", error);
      } finally {
         // setLoading(false);
      }
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      const [fieldName, propertyIndex] = name.split("_");

      if (name === "newVideoUrl") {
         setNewVideoUrl(value); // Update the newVideoUrl state
      } else if (fieldName && propertyIndex) {
         setData((prevData) => {
            const updatedProperties = [...prevData.builderProjectSubPostProperties];
            if (updatedProperties[parseInt(propertyIndex)]) {
               updatedProperties[parseInt(propertyIndex)][fieldName] = value;
               return { ...prevData, builderProjectSubPostProperties: updatedProperties };
            } else {
               return prevData;
            }
         });
      }
   };
   const handleShow = () => {
      setSelectedImages([]); // Reset selected images
      setShow(true); // Open the modal
   };

   const handleClose = () => {
      setShow(false); // Close the modal
   };

   const handleProjectImagesChange = (e) => {
      const files = Array.from(e.target.files);
      const newImages = files.map((file) => ({
         name: file.name,
         category: imageCategory, // Store the selected category with the image
         file,
      }));
      setSelectedImages((prevImages) => [...prevImages, ...newImages]);

      // Clear the file input to allow re-selecting the same file
      fileInputRef.current.value = "";
   };

   const handleSaveImages = () => {
      // Combine existing images with the newly selected images
      setData((prevData) => ({
         ...prevData,
         builderProjectSubPostImages: [
            ...prevData.builderProjectSubPostImages,
            ...selectedImages.map((image) => ({
               ...image, // Spread existing image properties
               docDescription: "", // You can assign a description if needed
            })),
         ],
      }));

      setSelectedImages([]); // Clear selected images after saving
      handleClose(); // Close the modal
   };

   const handleDeleteProjectImage = (imageToDelete) => {
      setData((prevData) => ({
         ...prevData,
         builderProjectSubPostImages: prevData.builderProjectSubPostImages.filter(
            (image) => image !== imageToDelete
         ),
      }));

      // Optional: Handle deletion from selectedImages if needed
      if (selectedImages.includes(imageToDelete)) {
         setSelectedImages((prevSelected) =>
            prevSelected.filter((image) => image !== imageToDelete)
         );
      }
   };

   const handleDeleteSelectedImage = (index) => {
      const updatedImages = [...selectedImages];
      updatedImages.splice(index, 1); // Remove the image at the specified index
      setSelectedImages(updatedImages);
   };
   const clearInput = () => {
      setData((prevData) => ({
         ...prevData,
         builderProjectSubPostVideos: [],
      }));
      setNewVideoUrl("");
   };

   const handleAddVideo = () => {
      if (newVideoUrl) {
         const newVideo = {
            docId: null,
            docName: data.docName || "New Video", // Ensure docName is not empty
            docDescription: "Description here", // Replace with actual description if available
            docOrderInFrontendView: data.builderProjectSubPostVideos.length + 1, // Increment order
            docURL: newVideoUrl, // New video URL
            builderProjectImageAsBase64: null, // Default to null if no image is provided
         };

         // Ensure no empty fields before adding the video
         if (newVideo.docName && newVideo.docURL) {
            setData((prevData) => ({
               ...prevData,
               builderProjectSubPostVideos: [...prevData.builderProjectSubPostVideos, newVideo],
            }));
         }

         // Reset newVideoUrl to empty or null after adding
         setNewVideoUrl("");
      }
   };

   const handleDeleteVideo = (index) => {
      console.log("Deleting video at index:", index);
      setData((prevData) => {
         const updatedVideos = prevData.builderProjectSubPostVideos.filter((_, i) => i !== index);
         console.log("Updated videos:", updatedVideos);
         return {
            ...prevData,
            builderProjectSubPostVideos: updatedVideos,
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

      // Add other video platforms as needed

      return url.replace("watch?v=", "embed/"); // Example conversion
   };

   const handleFileChange = (e, propertyIndex, index) => {
      const file = e.target.files[0];
      if (file) {
         const newImage = {
            docName: file.name,
            file: file,
         };

         setData((prevData) => {
            const updatedProperties = [...prevData.builderProjectSubPostProperties];
            if (!updatedProperties[propertyIndex].propertyImages) {
               updatedProperties[propertyIndex].propertyImages = []; // Ensure propertyImages is initialized
            }
            updatedProperties[propertyIndex].propertyImages[index] = newImage;
            return { ...prevData, builderProjectSubPostProperties: updatedProperties };
         });
      }
   };

   // Handle image deletion
   const handleDeletePropertyImage = (propertyIndex, index) => {
      setData((prevData) => {
         const updatedProperties = [...prevData.builderProjectSubPostProperties];
         if (updatedProperties[propertyIndex].propertyImages) {
            updatedProperties[propertyIndex].propertyImages.splice(index, 1); // Remove image at index
         }
         return { ...prevData, builderProjectSubPostProperties: updatedProperties };
      });
   };
   const handleFileRemove = (description) => {
      setFiles((prev) => ({
         ...prev,
         [description]: null,
      }));
   };
   // Delete file

   const handleSubPostChange = (e) => {
      const value = e.target.value;
      setData((prevData) => ({
         ...prevData,
         subPostType: value,
      }));
   };
   const labels = {
      floorPlan: "Floor Plan",
      hallImages: "Hall Images",
      kitchenImages: "Kitchen Images",
      bedroom1Images: "Bedroom 1 Images",
      bedroom2Images: "Bedroom 2 Images",
   };
   useEffect(() => {
      // Whenever the user selects both month and year for 'from', update the possessionFrom
      if (monthYearFrom.month && monthYearFrom.year) {
         setData((prevData) => ({
            ...prevData,
            possessionFrom: `${monthYearFrom.month}-${monthYearFrom.year}`, // Save in the desired format
         }));
      }
   }, [monthYearFrom]);

   useEffect(() => {
      // Whenever the user selects both month and year for 'to', update the possessionTo
      if (monthYearTo.month && monthYearTo.year) {
         setData((prevData) => ({
            ...prevData,
            possessionTo: `${monthYearTo.month}-${monthYearTo.year}`, // Save in the desired format
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
      const selectedValue = e.target.value;

      // Avoid adding empty values
      if (selectedValue) {
         setData((prevData) => ({
            ...prevData,
            builderProjectSubPostInfo: [...prevData.builderProjectSubPostInfo, selectedValue], // Add the selected value to the existing array
         }));
      }
   };

   const handleShowVideo = (url) => {
      setVideoUrl(url);
      setShowModal(true);
   };

   const handleCloseVideo = () => {
      setShowModal(false);
      setVideoUrl("");
   };
   const handleRemoveProperty = (index) => {
      const updatedProperties = data.builderProjectSubPostProperties.filter((_, i) => i !== index);

      // Update the state with the filtered properties
      setData((prevState) => ({
         ...prevState,
         builderProjectSubPostProperties: updatedProperties,
      }));

      if (data.subPostType === "Tower") {
         setTowerRows(towerRows.filter((_, i) => i !== index));
      } else if (data.subPostType === "Plotted") {
         setPlottedRows(plottedRows.filter((_, i) => i !== index));
      }
   };
   const handleAddMoreUnit = () => {
      if (data.subPostType === "Tower") {
         setTowerRows([...towerRows, {}]);
      } else if (data.subPostType === "Plotted") {
         setPlottedRows([...plottedRows, {}]);
      }
   };

   const handleSaveAsDraft = () => {
      // Save the current form data as a draft
      localStorage.setItem("draftFormData", JSON.stringify(data));

      // Optionally, show a success message
      alert("Draft saved successfully!");
   };
   useEffect(() => {
      const savedData = localStorage.getItem("draftFormData");
      console.log("savedData", savedData);
      if (savedData) {
         setData(JSON.parse(savedData));
      }
   }, []);

   return (
      <>
         <div className="container-fluid">
            <div className="builderProjectDetails">
               <div className="projectDetailTitle p-1 mb-2">
                  <Row>
                     <Col lg="12 d-flex justify-content-between align-items-center">
                        <Text text="Project Detail" />
                        <IoIosArrowDown style={{ color: "#fff", fontWeight: 700 }} />
                     </Col>
                  </Row>
               </div>
               <form onSubmit={handleSubmit}>
                  <div className="projectDetailForm">
                     {[...Array(formCount)].map((_, index) => (
                        <div key={index} className="mt-4 bg-white">
                           <div className="towerPlottedForm p-2">
                              <Row>
                                 <Col lg="12">
                                    <Text text="Tower / Plotted  " />
                                 </Col>
                              </Row>
                           </div>
                           <div className="p-3">
                              <Row>
                                 <Col lg="4">
                                    <Form.Group controlId="formselectSubPostType">
                                       <Form.Label>Property Type </Form.Label>
                                       <Form.Control
                                          as="select"
                                          name="selectSubPostType"
                                          value={data.subPostType}
                                          onChange={handleSubPostChange}
                                       >
                                          <option value="">Select</option>
                                          {defaultSubpost.map((subPost, index) => (
                                             <option key={index} value={subPost}>
                                                {subPost}
                                             </option>
                                          ))}
                                       </Form.Control>
                                    </Form.Group>
                                 </Col>
                                 <Col lg={4}>
                                    <Form.Group controlId="formTowerName">
                                       <Form.Label>Tower Name</Form.Label>
                                       <Form.Control
                                          type="text"
                                          placeholder="Enter Tower Name"
                                          name="builderProjectSubPostName"
                                          value={data.builderProjectSubPostName}
                                          onChange={handleInputChange}
                                       />
                                    </Form.Group>
                                 </Col>
                                 <Col lg={4}>
                                    <Form.Group controlId="formReraNumber">
                                       <Form.Label>Rera Number</Form.Label>
                                       <Form.Control
                                          type="text"
                                          placeholder="Enter Rera Number"
                                          name="reraNumber"
                                          value={data.reraNumber}
                                          onChange={handleInputChange}
                                       />
                                    </Form.Group>
                                 </Col>
                              </Row>
                              <Row className="mt-4">
                                 <Col lg={4}>
                                    <Form.Group controlId="formTotalAreaDevelop">
                                       <InputGroup className="custom-input-group TotalAreaDevelopCon">
                                          <Form.Control
                                             type="number"
                                             placeholder="Total Area to Develop"
                                             className="custom-form-control"
                                             name="areaToDevelop"
                                             value={data.areaToDevelop}
                                             onChange={handleInputChange}
                                          />
                                          <InputGroup.Append className="custom-input-group-append">
                                             <Form.Control
                                                as="select"
                                                className="custom-select-size custom-text"
                                                style={{ borderRadius: "0px" }}
                                                value={
                                                   data.areaToDevelopMeasurementUnitEnteredByUser
                                                }
                                                name="areaToDevelopMeasurementUnitEnteredByUser"
                                                onChange={(e) => {
                                                   // Update the state with the selected unit
                                                   setData((prevData) => ({
                                                      ...prevData,
                                                      areaToDevelopMeasurementUnitEnteredByUser:
                                                         e.target.value,
                                                   }));
                                                }}
                                             >
                                                <option value="Sq. Mt">Sq. Mt</option>
                                                <option value="Sq. Ft">Sq. Ft</option>
                                                <option value="Sq. Yt">Sq. Yt</option>
                                             </Form.Control>
                                          </InputGroup.Append>
                                       </InputGroup>
                                    </Form.Group>
                                 </Col>
                                 <Col lg={4}>
                                    <Form.Group controlId="formTotalFloors">
                                       <Form.Control
                                          type="text"
                                          placeholder="Total Floors"
                                          name="totalFloors"
                                          value={data.totalFloors}
                                          onChange={handleInputChange}
                                       />
                                    </Form.Group>
                                 </Col>
                                 <Col lg={4}>
                                    <Form.Group controlId="formUnitPerFloors">
                                       <Form.Control
                                          type="text"
                                          placeholder="Units Per Floor"
                                          name="unitsPerFloor"
                                          value={data.unitsPerFloor}
                                          onChange={handleInputChange}
                                       />
                                    </Form.Group>
                                 </Col>
                              </Row>
                              <Row className="mt-4">
                                 <Col lg="4">
                                    <Form.Group controlId="formGeneralAmenities">
                                       <Form.Control
                                          as="select"
                                          name="generalAmenities"
                                          value={data.selectedAmenity} // Assuming you have a state to store selected value
                                          onChange={(e) => handleSelectChange(e)} // Handle select change
                                       >
                                          <option value="">
                                             Separate Amenities (Not compulsory)
                                          </option>
                                          {/* Dynamically render options from builderProjectSubPostInfo */}
                                          {data.builderProjectSubPostInfo.map((amenity, index) => (
                                             <option key={index} value={amenity}>
                                                {amenity}
                                             </option>
                                          ))}
                                       </Form.Control>
                                    </Form.Group>
                                 </Col>
                                 <Col lg={8}>
                                    <Form.Group controlId="formHighlightUSP">
                                       <Form.Control
                                          type="text"
                                          placeholder="Highlights / USP"
                                          name="highlightsOrUsp"
                                          value={data.highlightsOrUsp}
                                          onChange={handleInputChange}
                                       />
                                    </Form.Group>
                                 </Col>
                              </Row>
                              <Row className="mt-4">
                                 <Col lg={4}>
                                    <Form.Group controlId="formContactPersonName">
                                       <Form.Control
                                          type="text"
                                          placeholder="Contact Person Name"
                                          name="contactPersonName"
                                          value={data.contactPersonName}
                                          onChange={handleInputChange}
                                       />
                                    </Form.Group>
                                 </Col>
                                 <Col lg={4}>
                                    <Form.Group controlId="formContactPersonMobile">
                                       <Form.Control
                                          type="text"
                                          placeholder="Contact Person Mobile Number"
                                          name="contactPersonNumber"
                                          value={data.contactPersonNumber}
                                          onChange={handleInputChange}
                                       />
                                    </Form.Group>
                                 </Col>
                              </Row>
                              <Row className="date-container mt-4">
                                 <Col lg={4}>
                                    <Text text="Possession from" />
                                    <Form.Group as={Row} controlId="monthYear">
                                       <Col sm="6">
                                          <Form.Label>Month</Form.Label>
                                          <Form.Control
                                             as="select"
                                             aria-label="Month"
                                             name="month"
                                             value={monthYearFrom.month} // Preselect the month from parsed value
                                             onChange={handleFromMonthChange}
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
                                       </Col>
                                       <Col sm="6">
                                          <Form.Label>Year</Form.Label>
                                          <Form.Control
                                             as="select"
                                             aria-label="Year"
                                             name="year" // Set name for the year select
                                             value={monthYearFrom.year} // Preselect the year from parsed value
                                             onChange={handleFromYearChange}
                                          >
                                             <option value="">Select Year</option>
                                             {Array.from(
                                                { length: 101 },
                                                (_, index) => currentYear - index
                                             ).map((year) => (
                                                <option key={year} value={year}>
                                                   {year}
                                                </option>
                                             ))}
                                          </Form.Control>
                                       </Col>
                                    </Form.Group>
                                 </Col>
                                 <Col lg="4">
                                    <Text text="Possession to" />
                                    <Form.Group as={Row} controlId="monthYear">
                                       <Col sm="6">
                                          <Form.Label>Month</Form.Label>
                                          <Form.Control
                                             as="select"
                                             name="month" // Set name for the month select
                                             aria-label="Month"
                                             value={monthYearTo.month} // Preselect the month from parsed value
                                             onChange={handleToMonthChange}
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
                                       </Col>
                                       <Col sm="6">
                                          <Form.Label>Year</Form.Label>
                                          <Form.Control
                                             as="select"
                                             aria-label="Year"
                                             name="year" // Set name for the year select
                                             value={monthYearTo.year} // Preselect the year from parsed value
                                             onChange={handleToYearChange}
                                          >
                                             <option value="">Select Year</option>
                                             {Array.from(
                                                { length: 101 },
                                                (_, index) => currentYear - index
                                             ).map((year) => (
                                                <option key={year} value={year}>
                                                   {year}
                                                </option>
                                             ))}
                                          </Form.Control>
                                       </Col>
                                    </Form.Group>
                                 </Col>
                              </Row>
                              <Row className="imageUploadRow mt-4">
                                 {data.builderProjectSubPostImages.length > 0 ||
                                 imagePreviews.length > 0 ? (
                                    <Col lg={4}>
                                       <Form.Group
                                          controlId="formProjectImages"
                                          className="formProjectImages"
                                       >
                                          <span>Upload project images</span>
                                          <div className="image-upload mt-2">
                                             <label
                                                className="upload-label"
                                                onClick={handleShow}
                                                style={{ cursor: "pointer" }}
                                             >
                                                <TiCameraOutline className="camera-icon" />
                                                <span>Upload Images</span>
                                             </label>
                                          </div>

                                          {/* Display Image Previews */}
                                          {data.builderProjectSubPostImages.length > 0 ||
                                          imagePreviews.length > 0 ? (
                                             <Row className="mt-2">
                                                {/* Dynamically display images from builderProjectSubPostImages */}
                                                {[
                                                   ...data.builderProjectSubPostImages,
                                                   ...imagePreviews,
                                                ].map((image, index) =>
                                                   image.builderProjectImageAsBase64 ||
                                                   image.file instanceof File ? (
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
                                                               src={
                                                                  image.builderProjectImageAsBase64 ||
                                                                  (image.file instanceof File
                                                                     ? URL.createObjectURL(
                                                                          image.file
                                                                       )
                                                                     : "")
                                                               } // Use base64 or object URL, check if image.file is a valid File object
                                                               alt={
                                                                  image.docDescription ||
                                                                  image.docName
                                                               } // Use description or name as alt text
                                                               className="img-fluid"
                                                               style={{
                                                                  maxWidth: "100px",
                                                                  borderRadius: "4px",
                                                               }}
                                                            />
                                                            <div
                                                               style={{
                                                                  position: "absolute",
                                                                  bottom: "-17px",
                                                                  left: "30px",
                                                                  color: "#949494",
                                                                  padding: "2px 5px",
                                                                  borderRadius: "4px",
                                                                  fontSize: "12px",
                                                                  fontWeight: 500,
                                                                  lineHeight: "13.66px",
                                                                  letterSpacing: "-0.02em",
                                                                  textAlign: "left",
                                                               }}
                                                            >
                                                               {image.docDescription ||
                                                                  image.docName}{" "}
                                                               {/* Display the image description */}
                                                            </div>
                                                            <RxCross2
                                                               className="delete-icon"
                                                               onClick={() =>
                                                                  handleDeleteProjectImage(image)
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
                                                   ) : null
                                                )}
                                             </Row>
                                          ) : null}
                                       </Form.Group>
                                       <Form.Text className="text-muted">
                                          File should be 5MB (max) in png, jpg, etc.
                                       </Form.Text>
                                    </Col>
                                 ) : null}

                                 {/* Custom Modal */}
                                 <Modal
                                    show={show}
                                    onHide={handleClose}
                                    centered
                                    className="ImageModal"
                                 >
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
                                          <Form.Group
                                             controlId="formProjectImages"
                                             className="uploadProjectImageModal"
                                          >
                                             <label htmlFor="" className="upload-label">
                                                <TiCameraOutline className="camera-icon" />
                                                <input
                                                   id="upload-project-image"
                                                   type="file"
                                                   className="upload-input"
                                                   accept="image/*"
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
                                                <Col
                                                   lg="6"
                                                   style={{ minHeight: "100px" }}
                                                   className="image-column"
                                                >
                                                   <h6>Interior</h6>
                                                   <ul
                                                      className="mt-3 pl-1"
                                                      style={{ listStyle: "none", padding: 0 }}
                                                   >
                                                      {selectedImages
                                                         .filter(
                                                            (image) => image.category === "Interior"
                                                         )
                                                         .map((image, index) => (
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
                                                                     handleDeleteSelectedImage(
                                                                        index
                                                                     )
                                                                  }
                                                                  style={{
                                                                     position: "absolute",
                                                                     top: "0px",
                                                                     left: "0px", // Moved the cross to the left of the image name
                                                                     cursor: "pointer",
                                                                     color: "#ff0000",
                                                                  }}
                                                               />
                                                               <span style={{ marginLeft: "13px" }}>
                                                                  {image.name}
                                                               </span>{" "}
                                                            </li>
                                                         ))}
                                                   </ul>
                                                </Col>

                                                <Col
                                                   lg="6"
                                                   style={{ minHeight: "100px" }}
                                                   className="image-column"
                                                >
                                                   <h6>Exterior</h6>
                                                   <ul
                                                      className="mt-3 pl-1"
                                                      style={{ listStyle: "none", padding: 0 }}
                                                   >
                                                      {selectedImages
                                                         .filter(
                                                            (image) => image.category === "Exterior"
                                                         )
                                                         .map((image, index) => (
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
                                                                     handleDeleteSelectedImage(
                                                                        index
                                                                     )
                                                                  }
                                                                  style={{
                                                                     position: "absolute",
                                                                     top: "0px",
                                                                     left: "0px", // Moved the cross to the left of the image name
                                                                     cursor: "pointer",
                                                                     color: "#ff0000",
                                                                  }}
                                                               />
                                                               <span style={{ marginLeft: "13px" }}>
                                                                  {image.name}
                                                               </span>{" "}
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
                                             <button
                                                type="button"
                                                className="btn-small cancel-btn"
                                                onClick={handleClose}
                                             >
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
                                 {/* Project Layout Section */}

                                 <Col lg={4}>
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
                                                name="newVideoUrl"
                                                value={newVideoUrl}
                                                onChange={handleInputChange}
                                                style={{ paddingRight: "2.5rem" }}
                                             />
                                             {data.builderProjectSubPostVideos && (
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
                                             <IoIosAdd
                                                size={32}
                                                className="Plus-icon"
                                                onClick={handleAddVideo}
                                                style={{
                                                   cursor: "pointer",
                                                   marginLeft: "10px",
                                                   color: "#fff",
                                                   backgroundColor: "#BE1452",
                                                   padding: "5px",
                                                }}
                                             />
                                          </div>
                                          {/* Display the list of videos below the input */}
                                          {Array.isArray(data.builderProjectSubPostVideos) && (
                                             <Row>
                                                {data.builderProjectSubPostVideos.map(
                                                   (video, index) => {
                                                      const embedUrl = getEmbedUrl(video.docURL); // Get embed URL
                                                      return (
                                                         embedUrl && (
                                                            <Col lg="6" key={index}>
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
                                                                     src={embedUrl}
                                                                     title={`Video thumbnail ${
                                                                        index + 1
                                                                     }`}
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
                                                                  />
                                                                  <RxCross2
                                                                     className="delete-icon"
                                                                     onClick={() =>
                                                                        handleDeleteVideo(index)
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
                                                                        zIndex: 1, // Ensure the icon is on top of other content
                                                                     }}
                                                                  />
                                                               </div>
                                                            </Col>
                                                         )
                                                      );
                                                   }
                                                )}
                                             </Row>
                                          )}

                                          <Form.Text className="text-muted">
                                             Paste the link of the video (YouTube, Vimeo, etc.)
                                          </Form.Text>
                                       </div>
                                    </Form.Group>
                                 </Col>
                              </Row>
                              <hr className="p-0" />
                              {/* Tower */}

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
                              {data.subPostType === "Tower" &&
                                 showMoreUnits &&
                                 towerRows.map((row, index) => (
                                    <Row
                                       key={index}
                                       className="align-items-center m-1 border rounded UnitsForm"
                                    >
                                       {data.builderProjectSubPostProperties.map(
                                          (property, propertyIndex) => (
                                             <Col
                                                key={propertyIndex}
                                                lg={11}
                                                className="UnitformContainer"
                                             >
                                                <Row className="mb-3">
                                                   <Col>
                                                      <Form.Group controlId="configuration">
                                                         <label>BHK</label>
                                                         <Form.Control
                                                            as="select"
                                                            name={`numberOfRooms_${propertyIndex}`}
                                                            className="custom-select-size"
                                                            onChange={(e) => {
                                                               const [rooms, compositionType] =
                                                                  e.target.value.split(" "); // Split value into numberOfRooms and propertyRoomCompositionType
                                                               setData((prevData) => {
                                                                  const updatedProperties = [
                                                                     ...prevData.builderProjectSubPostProperties,
                                                                  ];
                                                                  updatedProperties[propertyIndex] =
                                                                     {
                                                                        ...updatedProperties[
                                                                           propertyIndex
                                                                        ],
                                                                        numberOfRooms: rooms,
                                                                        propertyRoomCompositionType:
                                                                           compositionType,
                                                                     };
                                                                  return {
                                                                     ...prevData,
                                                                     builderProjectSubPostProperties:
                                                                        updatedProperties,
                                                                  };
                                                               });
                                                            }}
                                                            value={
                                                               property.numberOfRooms &&
                                                               property.propertyRoomCompositionType
                                                                  ? `${property.numberOfRooms} ${property.propertyRoomCompositionType}`
                                                                  : ""
                                                            }
                                                         >
                                                            {property.numberOfRooms &&
                                                            property.propertyRoomCompositionType ? (
                                                               <option
                                                                  key={propertyIndex}
                                                                  value={`${property.numberOfRooms} ${property.propertyRoomCompositionType}`}
                                                               >
                                                                  {`${property.numberOfRooms} ${property.propertyRoomCompositionType}`}
                                                               </option>
                                                            ) : null}
                                                            <option value="2 BHK">2 BHK</option>
                                                            <option value="3 BHK">3 BHK</option>
                                                            <option value="4 BHK">4 BHK</option>
                                                         </Form.Control>
                                                      </Form.Group>
                                                   </Col>

                                                   <Col>
                                                      <Form.Group controlId="totalUnits">
                                                         <label>Total Units</label>
                                                         <Form.Control
                                                            type="number"
                                                            placeholder="Enter"
                                                            name={`totalProjectUnits_${propertyIndex}`}
                                                            onChange={handleInputChange}
                                                            value={property.totalProjectUnits}
                                                         />
                                                      </Form.Group>
                                                   </Col>

                                                   <Col>
                                                      <Form.Group controlId="sizeFrom">
                                                         <label>Size From</label>
                                                         <InputGroup>
                                                            <Form.Control
                                                               type="number"
                                                               placeholder="Enter"
                                                               name={`minCarpetArea_${propertyIndex}`}
                                                               value={property.minCarpetArea}
                                                               onChange={handleInputChange}
                                                            />
                                                            <InputGroup.Append className="custom-input-group-append">
                                                               <Form.Control
                                                                  as="select"
                                                                  className="custom-select-size custom-text"
                                                                  style={{ borderRadius: "0px" }}
                                                                  name={`carpetAreaMeasurementUnitEnteredByUser_${propertyIndex}`}
                                                                  value={
                                                                     property.carpetAreaMeasurementUnitEnteredByUser ||
                                                                     "Sq. Mt"
                                                                  }
                                                                  onChange={(e) => {
                                                                     const index = parseInt(
                                                                        e.target.name.split("_")[1],
                                                                        10
                                                                     ); // Ensure you extract the correct index

                                                                     // Add console.log to debug values before updating state
                                                                     console.log(
                                                                        "Selected Unit:",
                                                                        e.target.value
                                                                     );
                                                                     console.log(
                                                                        "Property Index:",
                                                                        index
                                                                     );

                                                                     setData((prevData) => {
                                                                        const updatedProperties =
                                                                           prevData.builderProjectSubPostProperties.map(
                                                                              (prop, i) => {
                                                                                 if (i === index) {
                                                                                    return {
                                                                                       ...prop,
                                                                                       carpetAreaMeasurementUnitEnteredByUser:
                                                                                          e.target
                                                                                             .value, // Update only the correct property
                                                                                    };
                                                                                 }
                                                                                 return prop;
                                                                              }
                                                                           );

                                                                        // Debug updated properties
                                                                        console.log(
                                                                           "Updated Properties:",
                                                                           updatedProperties
                                                                        );

                                                                        return {
                                                                           ...prevData,
                                                                           builderProjectSubPostProperties:
                                                                              updatedProperties,
                                                                        };
                                                                     });
                                                                  }}
                                                               >
                                                                  <option value="Sq. Mt">
                                                                     Sq. Mt
                                                                  </option>
                                                                  <option value="Sq. Ft">
                                                                     Sq. Ft
                                                                  </option>
                                                                  <option value="Sq. Yt">
                                                                     Sq. Yt
                                                                  </option>
                                                               </Form.Control>
                                                            </InputGroup.Append>
                                                         </InputGroup>
                                                      </Form.Group>
                                                   </Col>

                                                   <Col>
                                                      <Form.Group controlId="sizeTo">
                                                         <label>Size To</label>

                                                         <InputGroup>
                                                            <Form.Control
                                                               type="number"
                                                               placeholder="Enter"
                                                               name={`maxCarpetArea_${propertyIndex}`}
                                                               value={property.maxCarpetArea}
                                                               onChange={handleInputChange}
                                                            />

                                                            <InputGroup.Append className="custom-input-group-append">
                                                               <Form.Control
                                                                  as="select"
                                                                  className="custom-select-size custom-text"
                                                                  style={{
                                                                     borderRadius: "0px",
                                                                  }}
                                                                  name={`plotAreaMeasurementUnitEnteredByUser _${propertyIndex}`}
                                                                  value={
                                                                     property.plotAreaMeasurementUnitEnteredByUser ||
                                                                     "Sq. Mt"
                                                                  }
                                                                  onChange={(e) => {
                                                                     setData((prevData) => {
                                                                        const updatedProperties = [
                                                                           ...prevData.builderProjectSubPostProperties,
                                                                        ];
                                                                        updatedProperties[
                                                                           parseInt(propertyIndex)
                                                                        ].plotAreaMeasurementUnitEnteredByUser =
                                                                           e.target.value;
                                                                        return {
                                                                           ...prevData,
                                                                           builderProjectSubPostProperties:
                                                                              updatedProperties,
                                                                        };
                                                                     });
                                                                  }}
                                                               >
                                                                  <option value="Sq. Mt">
                                                                     Sq. Mt
                                                                  </option>
                                                                  <option value="Sq. Ft">
                                                                     Sq. Ft
                                                                  </option>
                                                                  <option value="Sq. Yt">
                                                                     Sq. Yt
                                                                  </option>
                                                               </Form.Control>
                                                            </InputGroup.Append>
                                                         </InputGroup>
                                                      </Form.Group>
                                                   </Col>
                                                   {/* 
                                       <Col>
                                          <Form.Group controlId="priceRange" className="priceRange">
                                             <label>Price Range</label>
                                             <div
                                                className="price-range-slider"
                                                style={{ width: "100%" }}
                                             >
                                               
                                                <Range
                                                   step={100} // Adjust step size as needed
                                                   min={property.minPrice} // Dynamically set minimum price
                                                   max={property.maxPrice} // Dynamically set maximum price
                                                   values={priceRanges[index]} // The current selected price range for this property
                                                   onChange={(values) =>
                                                      handlePriceRangeChange(values, index)
                                                   } // Update the price range for this property
                                                   allowOverlap={false} // Prevent range overlap
                                                   renderTrack={({ props, children }) => (
                                                      <div
                                                         {...props}
                                                         style={{
                                                            height: "2px",
                                                            width: "100%",
                                                            background: "#ddd",
                                                            position: "relative",
                                                            display: "flex",
                                                         }}
                                                      >
                                                         <div
                                                            style={{
                                                               position: "absolute",
                                                               height: "3px",
                                                               background: "#C2185B",
                                                               left: `${
                                                                  ((priceRanges[index][0] -
                                                                     property.minPrice) /
                                                                     (property.maxPrice -
                                                                        property.minPrice)) *
                                                                  100
                                                               }%`,
                                                               right: `${
                                                                  100 -
                                                                  ((priceRanges[index][1] -
                                                                     property.minPrice) /
                                                                     (property.maxPrice -
                                                                        property.minPrice)) *
                                                                     100
                                                               }%`,
                                                            }}
                                                         />
                                                         {children}
                                                      </div>
                                                   )}
                                                   renderThumb={({ props, index: thumbIndex }) => (
                                                      <div
                                                         {...props}
                                                         style={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            color: "white",
                                                            fontSize: "14px",
                                                            cursor: "pointer",
                                                            position: "absolute",
                                                            top: "0px",
                                                         }}
                                                      >
                                                         {thumbIndex === 0 ? (
                                                            <IoIosArrowDropleftCircle
                                                               style={{
                                                                  color: "#C2185B",
                                                                  fontSize: "20px",
                                                               }}
                                                            />
                                                         ) : (
                                                            <IoIosArrowDroprightCircle
                                                               style={{
                                                                  color: "#C2185B",
                                                                  fontSize: "20px",
                                                               }}
                                                            />
                                                         )}
                                                      </div>
                                                   )}
                                                />
                                              
                                             </div>
                                          </Form.Group>
                                       </Col> */}
                                                   <Col>
                                                      <Form.Group controlId="sizeTo">
                                                         <label>Price Min</label>
                                                         <InputGroup>
                                                            <Form.Control
                                                               type="text"
                                                               placeholder="Enter"
                                                               name={`minPrice_${propertyIndex}`}
                                                               value={property.minPrice}
                                                               onChange={handleInputChange}
                                                            />
                                                            {/* <Form.Control
                                                   as="select"
                                                   value={
                                                      property.plotAreaMeasurementUnitEnteredByUser
                                                   }
                                                   className="custom-select-size"
                                                >
                                                   <option>Sq.Mt.</option>
                                                   <option>Sq.Ft.</option>
                                                </Form.Control> */}
                                                         </InputGroup>
                                                      </Form.Group>
                                                   </Col>
                                                   <Col>
                                                      <Form.Group controlId="sizeTo">
                                                         <label>Price Max</label>
                                                         <InputGroup>
                                                            <Form.Control
                                                               type="text"
                                                               placeholder="Enter"
                                                               name={`maxPrice_${propertyIndex}`}
                                                               value={property.maxPrice}
                                                               onChange={handleInputChange}
                                                            />
                                                            {/* <Form.Control
                                                   as="select"
                                                   value={
                                                      property.plotAreaMeasurementUnitEnteredByUser
                                                   }
                                                   className="custom-select-size"
                                                >
                                                   <option>Sq.Mt.</option>
                                                   <option>Sq.Ft.</option>
                                                </Form.Control> */}
                                                         </InputGroup>
                                                      </Form.Group>
                                                   </Col>
                                                </Row>
                                                <Row>
                                                   {imageFields.map((field, index) => (
                                                      <Col key={index}>
                                                         <Form.Group controlId={field.docName}>
                                                            <label>{field.docName}</label>
                                                            <Form.File custom>
                                                               <Form.File.Input
                                                                  name={field.docName}
                                                                  onChange={(e) =>
                                                                     handleFileChange(
                                                                        e,
                                                                        propertyIndex,
                                                                        index
                                                                     )
                                                                  }
                                                               />
                                                               <Form.File.Label>
                                                                  <TiCameraOutline className="mr-2" />{" "}
                                                                  Browse
                                                               </Form.File.Label>
                                                            </Form.File>
                                                            {property.propertyImages[index] &&
                                                            property.propertyImages[index]
                                                               .docName ? (
                                                               <div className="d-flex align-items-center">
                                                                  <RxCross2
                                                                     className="delete-icon ml-2 text-danger"
                                                                     style={{
                                                                        cursor: "pointer",
                                                                     }}
                                                                     onClick={() =>
                                                                        handleDeletePropertyImage(
                                                                           propertyIndex,
                                                                           index
                                                                        )
                                                                     }
                                                                  />
                                                                  <span
                                                                     style={{
                                                                        fontSize: "12px",
                                                                        fontWeight: 400,
                                                                        lineHeight: "16.39px",
                                                                        letterSpacing: "-0.02em",
                                                                        textAlign: "left",
                                                                     }}
                                                                  >
                                                                     {
                                                                        property.propertyImages[
                                                                           index
                                                                        ].docName
                                                                     }
                                                                  </span>
                                                               </div>
                                                            ) : (
                                                               <span
                                                                  style={{
                                                                     fontSize: "12px",
                                                                     fontWeight: 400,
                                                                     lineHeight: "16.39px",
                                                                     letterSpacing: "-0.02em",
                                                                     textAlign: "left",
                                                                  }}
                                                                  className="mt-2 text-muted"
                                                               >
                                                                  No image available
                                                               </span>
                                                            )}
                                                         </Form.Group>
                                                      </Col>
                                                   ))}
                                                   <Col md={12} className="mt-3">
                                                      <Form.Group controlId="comments">
                                                         <Form.Control
                                                            type="text"
                                                            placeholder="Comments"
                                                            name={`comments_${propertyIndex}`}
                                                            value={property.comments}
                                                            onChange={handleInputChange}
                                                         />
                                                      </Form.Group>
                                                   </Col>
                                                </Row>
                                             </Col>
                                          )
                                       )}
                                       {/* Close Button Area */}
                                       <Col lg={1} className="p-0 d-flex justify-content-end">
                                          <div className="close-col d-flex align-items-center justify-content-center">
                                             <FaTimesCircle
                                                style={{
                                                   color: "#FF1919",
                                                   cursor: "pointer",
                                                }}
                                                onClick={() => handleRemoveProperty(index)} // Call the remove function
                                             />
                                          </div>
                                       </Col>
                                    </Row>
                                 ))}

                              {data.subPostType === "Plotted" &&
                                 showMoreUnits &&
                                 plottedRows.map((row, index) => (
                                    <Row key={index}>
                                       {data.builderProjectSubPostProperties.map(
                                          (property, propertyIndex) => (
                                             <Row
                                                key={propertyIndex}
                                                className="align-items-center m-1 border rounded UnitsForm"
                                             >
                                                <div className="UnitformContainer1">
                                                   <div className="mb-3 flex-container1">
                                                      <div className="flex-item">
                                                         <Form.Group controlId="formselectConfiguration">
                                                            <label>Configuration</label>
                                                            <Form.Control
                                                               as="select"
                                                               name="selectConfiguration"
                                                               onChange={(e) => {
                                                                  setSelectedType(e.target.value);
                                                               }}
                                                            >
                                                               <option value="Villas">
                                                                  Villas
                                                               </option>
                                                               <option value="Plots">Plots</option>
                                                            </Form.Control>
                                                         </Form.Group>
                                                      </div>
                                                      {selectedType === "Villas" && (
                                                         <>
                                                            <div className="flex-item">
                                                               <Form.Group controlId="configuration">
                                                                  <label>BHK</label>

                                                                  <Form.Control
                                                                     as="select"
                                                                     defaultValue="6 BHK"
                                                                     name=""
                                                                     className="custom-select-size"
                                                                  >
                                                                     <option>2 BHK</option>
                                                                     <option>3 BHK</option>
                                                                  </Form.Control>
                                                               </Form.Group>
                                                            </div>

                                                            <div className="flex-item">
                                                               <Form.Group controlId="totalUnits">
                                                                  <label>Total Units</label>
                                                                  <Form.Control
                                                                     type="number"
                                                                     placeholder="Enter"
                                                                     name={`totalProjectUnits_${propertyIndex}`}
                                                                     value={
                                                                        property.totalProjectUnits
                                                                     }
                                                                     onChange={handleInputChange}
                                                                  />
                                                               </Form.Group>
                                                            </div>

                                                            <div className="flex-item">
                                                               <Form.Group controlId="sizeFrom">
                                                                  <label>Built up area From</label>
                                                                  <InputGroup className="custom-input-group TotalAreaDevelopCon">
                                                                     <Form.Control
                                                                        type="number"
                                                                        placeholder="Enter"
                                                                        name={`minBuiltUpArea${propertyIndex}`}
                                                                        value={
                                                                           property.minBuiltUpArea
                                                                        }
                                                                        onChange={handleInputChange}
                                                                     />
                                                                     <InputGroup.Append className="custom-input-group-append">
                                                                        <Form.Control
                                                                           as="select"
                                                                           className="custom-select-size custom-text"
                                                                           style={{
                                                                              borderRadius: "0px",
                                                                           }}
                                                                           name={`builtUpAreaMeasurementUnitEnteredByUser _${propertyIndex}`}
                                                                           value={
                                                                              property.builtUpAreaMeasurementUnitEnteredByUser ||
                                                                              "Sq. Mt"
                                                                           }
                                                                           onChange={(e) => {
                                                                              setData(
                                                                                 (prevData) => {
                                                                                    const updatedProperties =
                                                                                       [
                                                                                          ...prevData.builderProjectSubPostProperties,
                                                                                       ];
                                                                                    updatedProperties[
                                                                                       parseInt(
                                                                                          propertyIndex
                                                                                       )
                                                                                    ].builtUpAreaMeasurementUnitEnteredByUser =
                                                                                       e.target.value;
                                                                                    return {
                                                                                       ...prevData,
                                                                                       builderProjectSubPostProperties:
                                                                                          updatedProperties,
                                                                                    };
                                                                                 }
                                                                              );
                                                                           }}
                                                                        >
                                                                           <option value="Sq. Mt">
                                                                              Sq. Mt
                                                                           </option>
                                                                           <option value="Sq. Ft">
                                                                              Sq. Ft
                                                                           </option>
                                                                           <option value="Sq. Yt">
                                                                              Sq. Yt
                                                                           </option>
                                                                        </Form.Control>
                                                                     </InputGroup.Append>
                                                                  </InputGroup>
                                                               </Form.Group>
                                                            </div>

                                                            <div className="flex-item">
                                                               <Form.Group controlId="sizeTo">
                                                                  <label>Built up area To</label>

                                                                  <InputGroup className="custom-input-group TotalAreaDevelopCon">
                                                                     <Form.Control
                                                                        type="number"
                                                                        placeholder="Enter"
                                                                        name={`maxBuiltUpArea${propertyIndex}`}
                                                                        value={
                                                                           property.maxBuiltUpArea
                                                                        }
                                                                        onChange={handleInputChange}
                                                                     />
                                                                     <InputGroup.Append className="custom-input-group-append">
                                                                        <Form.Control
                                                                           as="select"
                                                                           className="custom-select-size custom-text"
                                                                           style={{
                                                                              borderRadius: "0px",
                                                                           }}
                                                                           name="builtUpAreaMeasurementUnitEnteredByUser"
                                                                           value={
                                                                              property.builtUpAreaMeasurementUnitEnteredByUser ||
                                                                              "Sq. Mt"
                                                                           }
                                                                           onChange={(e) => {
                                                                              // Update the state with the selected unit
                                                                              setData(
                                                                                 (prevData) => ({
                                                                                    ...prevData,
                                                                                    builtUpAreaMeasurementUnitEnteredByUser:
                                                                                       e.target
                                                                                          .value,
                                                                                 })
                                                                              );
                                                                           }}
                                                                        >
                                                                           <option value="Sq. Mt">
                                                                              Sq. Mt
                                                                           </option>
                                                                           <option value="Sq. Ft">
                                                                              Sq. Ft
                                                                           </option>
                                                                           <option value="Sq. Yt">
                                                                              Sq. Yt
                                                                           </option>
                                                                        </Form.Control>
                                                                     </InputGroup.Append>
                                                                  </InputGroup>
                                                               </Form.Group>
                                                            </div>

                                                            <div className="flex-item">
                                                               <Form.Group controlId="sizeTo">
                                                                  <label>Plot Size From</label>

                                                                  <InputGroup className="custom-input-group TotalAreaDevelopCon">
                                                                     <Form.Control
                                                                        type="number"
                                                                        placeholder="Enter"
                                                                        name={`minPlotArea${propertyIndex}`}
                                                                        value={property.minPlotArea}
                                                                        onChange={handleInputChange}
                                                                     />
                                                                     <InputGroup.Append className="custom-input-group-append">
                                                                        <Form.Control
                                                                           as="select"
                                                                           className="custom-select-size custom-text"
                                                                           name="plotAreaMeasurementUnitEnteredByUser"
                                                                           style={{
                                                                              borderRadius: "0px",
                                                                           }}
                                                                           value={
                                                                              property.plotAreaMeasurementUnitEnteredByUser ||
                                                                              "Sq. Mt"
                                                                           }
                                                                           onChange={(e) => {
                                                                              // Update the state with the selected unit
                                                                              setData(
                                                                                 (prevData) => ({
                                                                                    ...prevData,
                                                                                    plotAreaMeasurementUnitEnteredByUser:
                                                                                       e.target
                                                                                          .value,
                                                                                 })
                                                                              );
                                                                           }}
                                                                        >
                                                                           <option value="Sq. Mt">
                                                                              Sq. Mt
                                                                           </option>
                                                                           <option value="Sq. Ft">
                                                                              Sq. Ft
                                                                           </option>
                                                                           <option value="Sq. Yt">
                                                                              Sq. Yt
                                                                           </option>
                                                                        </Form.Control>
                                                                     </InputGroup.Append>
                                                                  </InputGroup>
                                                               </Form.Group>
                                                            </div>

                                                            <div className="flex-item">
                                                               <Form.Group controlId="sizeTo">
                                                                  <label>Plot Size To</label>

                                                                  <InputGroup className="custom-input-group TotalAreaDevelopCon">
                                                                     <Form.Control
                                                                        type="number"
                                                                        placeholder="Enter"
                                                                        name={`maxPlotArea${propertyIndex}`}
                                                                        value={property.maxPlotArea}
                                                                        onChange={handleInputChange}
                                                                     />
                                                                     <InputGroup.Append className="custom-input-group-append">
                                                                        <Form.Control
                                                                           as="select"
                                                                           className="custom-select-size custom-text"
                                                                           style={{
                                                                              borderRadius: "0px",
                                                                           }}
                                                                           name="plotAreaMeasurementUnitEnteredByUser"
                                                                           value={
                                                                              property.plotAreaMeasurementUnitEnteredByUser ||
                                                                              "Sq. Mt"
                                                                           }
                                                                           onChange={(e) => {
                                                                              // Update the state with the selected unit
                                                                              setData(
                                                                                 (prevData) => ({
                                                                                    ...prevData,
                                                                                    plotAreaMeasurementUnitEnteredByUser:
                                                                                       e.target
                                                                                          .value,
                                                                                 })
                                                                              );
                                                                           }}
                                                                        >
                                                                           <option value="Sq. Mt">
                                                                              Sq. Mt
                                                                           </option>
                                                                           <option value="Sq. Ft">
                                                                              Sq. Ft
                                                                           </option>
                                                                           <option value="Sq. Yt">
                                                                              Sq. Yt
                                                                           </option>
                                                                        </Form.Control>
                                                                     </InputGroup.Append>
                                                                  </InputGroup>
                                                               </Form.Group>
                                                            </div>
                                                            <div className="flex-item"></div>
                                                            <div className="flex-item"></div>
                                                            <div className="flex-item"></div>

                                                            {imageFields.map((field, index) => (
                                                               <div
                                                                  className="flex-item"
                                                                  key={index}
                                                               >
                                                                  <Form.Group
                                                                     controlId={field.docName}
                                                                  >
                                                                     <label>{field.docName}</label>
                                                                     <Form.File custom>
                                                                        <Form.File.Input
                                                                           name={field.docName}
                                                                           onChange={(e) =>
                                                                              handleFileChange(
                                                                                 e,
                                                                                 propertyIndex,
                                                                                 index
                                                                              )
                                                                           }
                                                                        />
                                                                        <Form.File.Label>
                                                                           <TiCameraOutline className="mr-2" />{" "}
                                                                           Browse
                                                                        </Form.File.Label>
                                                                     </Form.File>
                                                                     {property.propertyImages[
                                                                        index
                                                                     ] &&
                                                                     property.propertyImages[index]
                                                                        .docName ? (
                                                                        <div className="d-flex align-items-center">
                                                                           <RxCross2
                                                                              className="delete-icon ml-2 text-danger"
                                                                              style={{
                                                                                 cursor: "pointer",
                                                                              }}
                                                                              onClick={() =>
                                                                                 handleDeletePropertyImage(
                                                                                    propertyIndex,
                                                                                    index
                                                                                 )
                                                                              }
                                                                           />
                                                                           <span
                                                                              style={{
                                                                                 fontSize: "12px",
                                                                                 fontWeight: 400,
                                                                                 lineHeight:
                                                                                    "16.39px",
                                                                                 letterSpacing:
                                                                                    "-0.02em",
                                                                                 textAlign: "left",
                                                                              }}
                                                                           >
                                                                              {
                                                                                 property
                                                                                    .propertyImages[
                                                                                    index
                                                                                 ].docName
                                                                              }
                                                                           </span>
                                                                        </div>
                                                                     ) : (
                                                                        <span
                                                                           style={{
                                                                              fontSize: "12px",
                                                                              fontWeight: 400,
                                                                              lineHeight: "16.39px",
                                                                              letterSpacing:
                                                                                 "-0.02em",
                                                                              textAlign: "left",
                                                                           }}
                                                                           className="mt-2 text-muted"
                                                                        >
                                                                           No image available
                                                                        </span>
                                                                     )}
                                                                  </Form.Group>
                                                               </div>
                                                            ))}
                                                         </>
                                                      )}
                                                      {selectedType === "Plots" && (
                                                         <>
                                                            <div className="flex-item">
                                                               <Form.Group controlId="totalUnits">
                                                                  <label>Total Units</label>
                                                                  <Form.Control
                                                                     type="number"
                                                                     placeholder="Enter"
                                                                     name={`totalProjectUnits_${propertyIndex}`}
                                                                     onChange={handleInputChange}
                                                                     value={
                                                                        property.totalProjectUnits
                                                                     }
                                                                  />
                                                               </Form.Group>
                                                            </div>

                                                            <div className="flex-item">
                                                               <Form.Group controlId="sizeFrom">
                                                                  <label>Plot Size From</label>

                                                                  <InputGroup className="custom-input-group TotalAreaDevelopCon">
                                                                     <Form.Control
                                                                        type="number"
                                                                        placeholder="Enter"
                                                                        name={`minPlotArea${propertyIndex}`}
                                                                        value={property.minPlotArea}
                                                                        onChange={handleInputChange}
                                                                     />
                                                                     <InputGroup.Append className="custom-input-group-append">
                                                                        <Form.Control
                                                                           as="select"
                                                                           className="custom-select-size custom-text"
                                                                           style={{
                                                                              borderRadius: "0px",
                                                                           }}
                                                                           name={`plotAreaMeasurementUnitEnteredByUser _${propertyIndex}`}
                                                                           value={
                                                                              property.plotAreaMeasurementUnitEnteredByUser ||
                                                                              "Sq. Mt"
                                                                           }
                                                                           onChange={(e) => {
                                                                              setData(
                                                                                 (prevData) => {
                                                                                    const updatedProperties =
                                                                                       [
                                                                                          ...prevData.builderProjectSubPostProperties,
                                                                                       ];
                                                                                    updatedProperties[
                                                                                       parseInt(
                                                                                          propertyIndex
                                                                                       )
                                                                                    ].plotAreaMeasurementUnitEnteredByUser =
                                                                                       e.target.value;
                                                                                    return {
                                                                                       ...prevData,
                                                                                       builderProjectSubPostProperties:
                                                                                          updatedProperties,
                                                                                    };
                                                                                 }
                                                                              );
                                                                           }}
                                                                        >
                                                                           <option value="Sq. Mt">
                                                                              Sq. Mt
                                                                           </option>
                                                                           <option value="Sq. Ft">
                                                                              Sq. Ft
                                                                           </option>
                                                                           <option value="Sq. Yt">
                                                                              Sq. Yt
                                                                           </option>
                                                                        </Form.Control>
                                                                     </InputGroup.Append>
                                                                  </InputGroup>
                                                               </Form.Group>
                                                            </div>

                                                            <div className="flex-item">
                                                               <Form.Group controlId="sizeTo">
                                                                  <label>Plot Size To</label>

                                                                  <InputGroup className="custom-input-group TotalAreaDevelopCon">
                                                                     <Form.Control
                                                                        type="number"
                                                                        placeholder="Enter"
                                                                        name={`maxPlotArea${propertyIndex}`}
                                                                        value={property.maxPlotArea}
                                                                        onChange={handleInputChange}
                                                                     />
                                                                     <InputGroup.Append className="custom-input-group-append">
                                                                        <Form.Control
                                                                           as="select"
                                                                           className="custom-select-size custom-text"
                                                                           style={{
                                                                              borderRadius: "0px",
                                                                           }}
                                                                           name={`plotAreaMeasurementUnitEnteredByUser _${propertyIndex}`}
                                                                           value={
                                                                              property.plotAreaMeasurementUnitEnteredByUser ||
                                                                              "Sq. Mt"
                                                                           }
                                                                           onChange={(e) => {
                                                                              setData(
                                                                                 (prevData) => {
                                                                                    const updatedProperties =
                                                                                       [
                                                                                          ...prevData.builderProjectSubPostProperties,
                                                                                       ];
                                                                                    updatedProperties[
                                                                                       parseInt(
                                                                                          propertyIndex
                                                                                       )
                                                                                    ].plotAreaMeasurementUnitEnteredByUser =
                                                                                       e.target.value;
                                                                                    return {
                                                                                       ...prevData,
                                                                                       builderProjectSubPostProperties:
                                                                                          updatedProperties,
                                                                                    };
                                                                                 }
                                                                              );
                                                                           }}
                                                                        >
                                                                           <option value="Sq. Mt">
                                                                              Sq. Mt
                                                                           </option>
                                                                           <option value="Sq. Ft">
                                                                              Sq. Ft
                                                                           </option>
                                                                           <option value="Sq. Yt">
                                                                              Sq. Yt
                                                                           </option>
                                                                        </Form.Control>
                                                                     </InputGroup.Append>
                                                                  </InputGroup>
                                                               </Form.Group>
                                                            </div>
                                                            <div className="flex-item"></div>

                                                            {imageFields.map((field, index) => (
                                                               <div
                                                                  key={index}
                                                                  className="flex-item"
                                                               >
                                                                  <Form.Group
                                                                     controlId={field.docName}
                                                                  >
                                                                     <label>{field.docName}</label>
                                                                     <Form.File custom>
                                                                        <Form.File.Input
                                                                           name={field.docName}
                                                                           onChange={(e) =>
                                                                              handleFileChange(
                                                                                 e,
                                                                                 propertyIndex,
                                                                                 index
                                                                              )
                                                                           }
                                                                        />
                                                                        <Form.File.Label>
                                                                           <TiCameraOutline className="mr-2" />{" "}
                                                                           Browse
                                                                        </Form.File.Label>
                                                                     </Form.File>
                                                                     {property.propertyImages[
                                                                        index
                                                                     ] &&
                                                                     property.propertyImages[index]
                                                                        .docName ? (
                                                                        <div className="d-flex align-items-center">
                                                                           <RxCross2
                                                                              className="delete-icon ml-2 text-danger"
                                                                              style={{
                                                                                 cursor: "pointer",
                                                                              }}
                                                                              onClick={() =>
                                                                                 handleDeletePropertyImage(
                                                                                    propertyIndex,
                                                                                    index
                                                                                 )
                                                                              }
                                                                           />
                                                                           <span
                                                                              style={{
                                                                                 fontSize: "12px",
                                                                                 fontWeight: 400,
                                                                                 lineHeight:
                                                                                    "16.39px",
                                                                                 letterSpacing:
                                                                                    "-0.02em",
                                                                                 textAlign: "left",
                                                                              }}
                                                                           >
                                                                              {
                                                                                 property
                                                                                    .propertyImages[
                                                                                    index
                                                                                 ].docName
                                                                              }
                                                                           </span>
                                                                        </div>
                                                                     ) : (
                                                                        <span
                                                                           style={{
                                                                              fontSize: "12px",
                                                                              fontWeight: 400,
                                                                              lineHeight: "16.39px",
                                                                              letterSpacing:
                                                                                 "-0.02em",
                                                                              textAlign: "left",
                                                                           }}
                                                                           className="mt-2 text-muted"
                                                                        >
                                                                           No image available
                                                                        </span>
                                                                     )}
                                                                  </Form.Group>
                                                               </div>
                                                            ))}
                                                         </>
                                                      )}
                                                      <div className="flex-itemp-0 d-flex justify-content-end"></div>
                                                   </div>
                                                   <div className="close-col d-flex align-items-center justify-content-center flex-container2">
                                                      <FaTimesCircle
                                                         onClick={() => handleRemoveProperty(index)} // Call the remove function
                                                         style={{
                                                            color: "#FF1919",
                                                            cursor: "pointer",
                                                         }}
                                                      />
                                                   </div>
                                                </div>
                                             </Row>
                                          )
                                       )}
                                    </Row>
                                 ))}
                              <Row>
                                 <Col lg="2">
                                    <Button
                                       className="d-flex py-1 ml-3 mb-2"
                                       style={{
                                          color: "#BE1452",
                                          backgroundColor: "#F8F3F5",
                                          borderColor: "#DED6D9",
                                       }}
                                       onClick={() => {
                                          setShowMoreUnits(true);
                                          handleAddMoreUnit();
                                       }}
                                    >
                                       <div
                                          style={{
                                             width: "20px",
                                             height: "20px",
                                             display: "flex",
                                             alignItems: "center",
                                             justifyContent: "center",
                                          }}
                                       >
                                          <Image src={addIcon} style={{ width: "10px" }} />
                                       </div>
                                       <Text
                                          text={"Add More Unit"}
                                          fontWeight="bold"
                                          style={{ fontSize: "12px", color: "#BE1452" }}
                                       />
                                    </Button>
                                 </Col>
                              </Row>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div>
                     <Row>
                        <Col lg="3">
                           <Button
                              className="d-flex py-1 mb-2"
                              style={{
                                 color: "#BE1452",
                                 backgroundColor: "#F8F3F5",
                                 borderColor: "#DED6D9",
                              }}
                              onClick={handleAddForm}
                           >
                              <div
                                 style={{
                                    width: "20px",
                                    height: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                 }}
                              >
                                 <Image src={addIcon} style={{ width: "10px" }} />
                              </div>
                              <Text
                                 text={"Add More Tower / Plotted "}
                                 fontWeight="bold"
                                 style={{ fontSize: "12px", color: "#BE1452" }}
                              />
                           </Button>
                        </Col>
                     </Row>
                  </div>
                  <div className="projectDetailFormActions pb-4">
                     <button
                        type="submit"
                        // disabled={this.state.disableSubmit}
                        id="submit-team-member-button"
                        className=" btn-small cancel-btn"
                     >
                        Cancel
                     </button>
                     <button
                        type=""
                        // disabled={this.state.disableSubmit}
                        id="cancel-team-member-button"
                        className=" btn-small submit-btn"
                        onClick={handleSaveAsDraft}
                     >
                        Save as Draft
                     </button>
                     <button
                        type="submit"
                        // disabled={this.state.disableSubmit}
                        id="cancel-team-member-button"
                        className=" btn-small submit-btn"
                     >
                        Save & Publish
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
};
export default ProjectDetails;
