/** @format */
// API integration on line 115, 259 and 271
import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Col, FormControl, InputGroup, Row } from "react-bootstrap";
import "./AddNewProjectPost.scss"; // Make sure to import the SCSS file
import { TiCameraOutline } from "react-icons/ti";
import { TiTimes } from "react-icons/ti";
import { IoIosAdd } from "react-icons/io";
import { MdMyLocation } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa"; // Import the icon from react-icons
import Container from "react-bootstrap/Container";
import { RxCross2 } from "react-icons/rx";
import { PiPlayCircleLight } from "react-icons/pi";
import {
   getBuilderProjectById,
   createBuilderProject,
   approveBuilderProject,
} from "../../../../common/redux/actions";
import { showSuccessToast, showErrorToast } from "../../../../common/helpers/Utils"; // Utility for displaying toast messages
import { MenuItem, TextField } from "@mui/material";
import POSTING_CONSTANTS from "../../../../common/helpers/POSTING_CONSTANTS";
import Text from "../../../../shared/Text/Text";
const AddNewProjectPost = () => {
   // const [data, setFormData] = useState({
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
   const currentYear = new Date().getFullYear();

   const [selectedFiles, setSelectedFiles] = useState([]);
   const [imagePreviews, setImagePreviews] = useState([]); // Project Images
   const [projectLayout, setProjectLayout] = useState([]); // Project Layout Images
   const [validationError, setValidationError] = useState();
   const [videoLinks, setVideoLinks] = useState([]);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);
   const [data, setData] = useState({
      builderProjectId: 13,
      userId: 398,
      builderId: 6,
      builderProjectName: "Rohit Builder Project",
      totalTowersPlanned: 10,
      landArea: 100.30000000000001,
      landAreaMeasurementUnitEnteredByUser: "Sq. Mt.",
      areaToDevelop: 200.5,
      areaToDevelopMeasurementUnitEnteredByUser: "Sq. Mt.",
      openAreaPercent: 31.0,
      possessionFrom: "01-2025",
      possessionTo: "05-2025",
      projectDescription: "Rohit Builder Project Description",
      latitude: 18.56988525390625,
      longitude: 73.77430725097656,
      builderProjectGeneralAmenities: ["dw", "jqkqk", "aaaaaa", "jjadsjk"],
      city: "Pimpri-Chinchwad",
      state: "Maharashtra",
      locality: "Baner",
      country: null,
      cityLat: 18.6297811,
      cityLong: 73.7997094,
      builderProjectImages: [
         {
            docId: 123,
            docName: "ffff",
            docDescription: "jerj",
            docOrderInFrontendView: 2,
            docURL: "app-images/builder-project-image/smartDoor45545_1727681068589.png",
            builderProjectImageAsBase64:
               "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAMCAYAAACA0IaCAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAgSURBVDhPY/wPBAxUAkxQmipg1DDSwahhpIPBahgDAwCHWAQUsz0sHwAAAABJRU5ErkJggg==",
         },
         {
            docId: null,
            docName: "kkkkk",
            docDescription: "jerj",
            docOrderInFrontendView: 4,
            docURL: "app-images/builder-project-image/smartDoor91754_1727681068632.png",
            builderProjectImageAsBase64:
               "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAMCAYAAACA0IaCAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAgSURBVDhPY/wPBAxUAkxQmipg1DDSwahhpIPBahgDAwCHWAQUsz0sHwAAAABJRU5ErkJggg==",
         },
      ],
      builderProjectVideos: [
         {
            docId: null,
            docName: "ffff",
            docDescription: "jerj",
            docOrderInFrontendView: 2,
            docURL: "lkllk",
            builderProjectImageAsBase64: null,
         },
         {
            docId: null,
            docName: "klklaslk",
            docDescription: "jerj",
            docOrderInFrontendView: 2,
            docURL: "kllk",
            builderProjectImageAsBase64: null,
         },
      ],
   });
   const [userId, setUserId] = useState(398);
   const [builderProjectId, setBuilderProjectId] = useState(13);

   const fileInputRef = useRef();

   useEffect(() => {
      const fetchBuilderProject = async () => {
         try {
            const response = await getBuilderProjectById({ builderProjectId, userId });
            if (response?.data) {
               const { resourceData, error: responseError } = response.data;

               if (resourceData) {
                  console.log(resourceData);
                  setData(resourceData);
               } else if (responseError) {
                  setError(responseError);
               }
            }
         } catch (error) {
            setError(error);
            console.error("Error fetching builder data:", error);
         } finally {
            // Optionally set loading to false here
            // setLoading(false);
         }
      };

      fetchBuilderProject();
   }, [userId, builderProjectId]);

   const allowedExtensions = [".jpg", ".png"];
   const handleProjectImagesChange = (event) => {
      const files = Array.from(event.target.files);
      const validFiles = [];

      files.forEach((file) => {
         const selectedFileExtension = file.name.split(".").pop().toLowerCase();
         if (allowedExtensions.includes("." + selectedFileExtension)) {
            validFiles.push(file);

            const reader = new FileReader();
            reader.onloadend = () => {
               setImagePreviews((prevPreviews) => [...prevPreviews, reader.result]);
            };
            reader.readAsDataURL(file);
         }
      });

      if (validFiles.length) {
         setValidationError(null);
      } else {
         setValidationError(
            "Invalid file extension. Please select files with .jpg or .png extensions."
         );
      }
   };

   // Handle file change for project layout
   const handleProjectLayoutChange = (event) => {
      const files = Array.from(event.target.files);
      const validFiles = [];

      files.forEach((file) => {
         const selectedFileExtension = file.name.split(".").pop().toLowerCase();
         if (allowedExtensions.includes("." + selectedFileExtension)) {
            validFiles.push(file);

            const reader = new FileReader();
            reader.onloadend = () => {
               setProjectLayout((prevLayout) => [...prevLayout, reader.result]);
            };
            reader.readAsDataURL(file);
         }
      });

      if (validFiles.length) {
         setValidationError(null);
      } else {
         setValidationError(
            "Invalid file extension. Please select files with .jpg or .png extensions."
         );
      }
   };

   // Delete an image from project images
   const handleDeleteProjectImage = (index) => {
      setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
   };

   // Delete an image from project layout
   const handleDeleteProjectLayoutImage = (index) => {
      setProjectLayout((prevLayout) => prevLayout.filter((_, i) => i !== index));
   };
   const [videoLink, setVideoLink] = useState(""); // State to store the added video link

   const handleInputChange = (event) => {
      setData({ ...data, [event.target.name]: event.target.value });
   };

   const clearInput = () => {
      setData({ ...data, projectVideo: "" });
   };

   const handleAddVideo = () => {
      if (data.projectVideo && videoLinks.length < 5) {
         setVideoLinks([...videoLinks, data.projectVideo]);
         clearInput();
      } else if (videoLinks.length >= 5) {
         alert("You can only upload up to 5 videos.");
      }
   };

   const handleDeleteVideo = (index) => {
      const updatedVideos = videoLinks.filter((_, i) => i !== index);
      setVideoLinks(updatedVideos);
   };

   const getEmbedUrl = (url) => {
      const youtubeRegex =
         /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/;

      const youtubeMatch = url.match(youtubeRegex);
      const vimeoMatch = url.match(vimeoRegex);
      if (youtubeMatch) {
         return `https://img.youtube.com/vi/${youtubeMatch[1]}/0.jpg`; // Thumbnail URL
      } else if (vimeoMatch) {
         return `https://vumbnail.com/${vimeoMatch[1]}.jpg`; // Vimeo thumbnail
      }
      return null; // Return null if the URL is not recognized as YouTube or Vimeo
   };

   const handleLogoUpload = (e) => {
      // const extractBase64 = data.builderLogoImageAsBase64.split(",")[1];
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
         setData((prevData) => ({
            ...prevData,
            projectImages: reader.result, // Base64 encoding of image
         }));
      };
      if (file) {
         reader.readAsDataURL(file);
      }
   };
   const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      setData({ ...data, [name]: checked });
   };
   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await createBuilderProject(data);
         if (response?.data) {
            // Handle successful project creation here
            console.log("Project created successfully:", response.data);
         }
      } catch (error) {
         showErrorToast("Error submitting form. Please try again.");
         console.error("Error submitting builder profile:", error);
      }
   };

   const approveBuilderProject = async (e) => {
      e.preventDefault();

      try {
         const response = await approveBuilderProject({
            builderProjectId: builderProjectId,
            userId: userId,
         });
      } catch (error) {
         showErrorToast("Error approving profile. Please try again");
         console.log("Error submitting builder profile:", error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="add-new-project-post mb-3">
         <Container fluid>
            <h2 className="page-title">PROJECT DETAIL</h2>

            <div className="newEntry project-details">
               <Form
                  onSubmit={handleSubmit}
                  noValidate
                  autoComplete="off"
                  className="form-white-bg"
               >
                  <Row className="mapAndForm">
                     <Col lg={5} className="map-col">
                        <div className="map-container">
                           <div className="map-header">
                              <input
                                 type="text"
                                 className="map-search"
                                 placeholder="Search location of property"
                              />
                              <div className="map-icons d-flex align-items-center">
                                 <MdMyLocation />
                              </div>
                              <div className="map-icons icon-location">
                                 <FaMapMarkerAlt
                                    className=""
                                    style={{ color: "#C31155", fontSize: "18px" }}
                                 />
                              </div>
                           </div>
                           <div className="map-placeholder">
                              <iframe
                                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.70906421894!2d73.69814960405998!3d18.52487061465784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1725367051022!5m2!1sen!2sin"
                                 width="600"
                                 height="450"
                                 style={{ border: 0, height: "100%", width: "100%" }}
                                 allowFullScreen=""
                                 loading="lazy"
                                 referrerPolicy="no-referrer-when-downgrade"
                                 title="Google Map"
                              ></iframe>
                           </div>
                           <div className="map-footer">Pune</div>
                        </div>
                     </Col>
                     <Col lg={7} className="form-col">
                        <Row>
                           <Col lg={6}>
                              <Form.Group controlId="formBasicContact">
                                 <Form.Label>Project Name</Form.Label>
                                 <Form.Control
                                    type="text"
                                    placeholder="Enter project name"
                                    name="projectName"
                                    value={data.builderProjectName}
                                    onChange={handleInputChange}
                                 />
                              </Form.Group>
                           </Col>
                           <Col lg="6">
                              <Form.Group controlId="formGeneralAmenities">
                                 <Form.Label>General Amenities</Form.Label>
                                 <Form.Control
                                    as="select"
                                    name="generalAmenities"
                                    value={data.builderProjectGeneralAmenities}
                                    onChange={handleInputChange}
                                 >
                                    <option value="">Select</option>
                                    <option value="amenity1">Amenity 1</option>
                                    <option value="amenity2">Amenity 2</option>
                                 </Form.Control>
                              </Form.Group>
                           </Col>
                        </Row>
                        <Row className="align-items-center mb-4">
                           <Col lg={6}>
                              <Form.Group controlId="formtowerPlottedPlanner">
                                 <Form.Label>Total Tower / Plotted Planned</Form.Label>
                                 <Form.Control
                                    type="text"
                                    placeholder="Enter Total Tower / Plotted Planned"
                                    name="towerPlottedPlanner"
                                    value={data.totalTowersPlanned}
                                    onChange={handleInputChange}
                                 />
                              </Form.Group>
                           </Col>
                           <Col lg={6} className="mt-4">
                              <Form.Group controlId="formLandArea">
                                 <InputGroup className="custom-input-group">
                                    <Form.Control
                                       type="text"
                                       placeholder="Land Area"
                                       className="custom-form-control"
                                       value={data.landArea}
                                    />
                                    <InputGroup.Append className="custom-input-group-append">
                                       <InputGroup.Text className="custom-text">
                                          Acre
                                       </InputGroup.Text>
                                    </InputGroup.Append>
                                 </InputGroup>
                              </Form.Group>
                           </Col>
                        </Row>
                        <Row className="mb-4">
                           <Col lg={6}>
                              <Form.Group controlId="formTotalAreaDevelop">
                                 <InputGroup className="custom-input-group">
                                    <Form.Control
                                       type="text"
                                       placeholder="Total Area to Develop"
                                       className="custom-form-control"
                                       value={data.areaToDevelop}
                                    />
                                    <InputGroup.Append className="custom-input-group-append">
                                       <InputGroup.Text className="custom-text">
                                          Sq. Mt.
                                       </InputGroup.Text>
                                    </InputGroup.Append>
                                 </InputGroup>
                              </Form.Group>
                           </Col>
                           <Col lg={6}>
                              <Form.Group controlId="formOpenArea">
                                 <InputGroup className="custom-input-group">
                                    <Form.Control
                                       type="text"
                                       placeholder="Open Area"
                                       className="custom-form-control"
                                    />
                                    <InputGroup.Append className="custom-input-group-append">
                                       <InputGroup.Text className="custom-text">%</InputGroup.Text>
                                    </InputGroup.Append>
                                 </InputGroup>
                              </Form.Group>
                           </Col>
                        </Row>
                        <Row className="date-container">
                           <Col lg={6}>
                              <Text text="Possession from" />
                              <Form.Group as={Row} controlId="monthYear">
                                 <Col sm="6">
                                    <Form.Label>Month</Form.Label>
                                    <Form.Control as="select" aria-label="Month">
                                       <option value="">Select Month</option>
                                       {Array.from({ length: 12 }, (_, index) => (
                                          <option key={index} value={index + 1}>
                                             {new Date(0, index).toLocaleString("default", {
                                                month: "long",
                                             })}
                                          </option>
                                       ))}
                                    </Form.Control>
                                 </Col>
                                 <Col sm="6">
                                    <Form.Label>Year</Form.Label>
                                    <Form.Control as="select" aria-label="Year">
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
                           <Col lg="6">
                              <Text text="Possession to" />
                              <Form.Group as={Row} controlId="monthYear">
                                 <Col sm="6">
                                    <Form.Label>Month</Form.Label>
                                    <Form.Control as="select" aria-label="Month">
                                       <option value="">Select Month</option>
                                       {Array.from({ length: 12 }, (_, index) => (
                                          <option key={index} value={index + 1}>
                                             {new Date(0, index).toLocaleString("default", {
                                                month: "long",
                                             })}
                                          </option>
                                       ))}
                                    </Form.Control>
                                 </Col>
                                 <Col sm="6">
                                    <Form.Label>Year</Form.Label>
                                    <Form.Control as="select" aria-label="Year">
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
                     </Col>
                  </Row>
                  <Row className="mt-4">
                     <Col lg="12">
                        <Form.Group controlId="formBasicContact">
                           <Form.Control
                              type="text"
                              placeholder="project description"
                              name="projectName"
                              value={data.projectDescription}
                              onChange={handleInputChange}
                           />
                        </Form.Group>
                     </Col>
                  </Row>
                  <Row className="imageUploadRow mt-5">
                     <Col lg={4}>
                        <Form.Group
                           controlId="formProjectImages"
                           className="mb-4 formProjectImages"
                        >
                           <span>Upload project images</span>

                           <div className="image-upload mt-2">
                              <label htmlFor="upload-project-image" className="upload-label">
                                 <TiCameraOutline className="camera-icon" />
                                 <input
                                    id="upload-project-image"
                                    type="file"
                                    className="upload-input"
                                    accept="image/*"
                                    multiple // Allow multiple files to be selected
                                    onChange={handleProjectImagesChange}
                                    ref={fileInputRef}
                                 />
                                 <span>Upload Images</span>
                              </label>

                              {validationError && <p className="text-danger">{validationError}</p>}

                              {imagePreviews.map((preview, index) => (
                                 <div key={index} className="project-images mt-3">
                                    <div
                                       className="image-preview-container"
                                       style={{ position: "relative" }}
                                    >
                                       <img
                                          src={preview}
                                          alt={`Preview ${index + 1}`}
                                          className="img-fluid"
                                          style={{ maxWidth: "115px" }}
                                       />
                                       <RxCross2
                                          className="delete-icon"
                                          onClick={() => handleDeleteProjectImage(index)}
                                          style={{
                                             position: "absolute",
                                             top: "-5px",
                                             right: "1px",
                                             cursor: "pointer",
                                             color: "#fff",
                                             background: "#ff0000",
                                             borderRadius: "50%",
                                          }}
                                       />
                                    </div>
                                 </div>
                              ))}

                              <Form.Text className="text-muted">
                                 File should be 5MB(max) in png, jpg, etc.
                              </Form.Text>
                           </div>
                        </Form.Group>
                     </Col>

                     {/* Project Layout Section */}
                     <Col lg={4}>
                        <Form.Group
                           controlId="formProjectLayout"
                           className="mb-4 formProjectLayout"
                        >
                           <span>Project Layout</span>

                           <div className="image-upload mt-2">
                              <label htmlFor="upload-project-layout" className="upload-label">
                                 <TiCameraOutline className="camera-icon" />
                                 <input
                                    id="upload-project-layout"
                                    type="file"
                                    className="upload-input"
                                    accept="image/*"
                                    multiple // Allow multiple files to be selected
                                    onChange={handleProjectLayoutChange}
                                    ref={fileInputRef}
                                 />
                                 <span>Upload Layout</span>
                              </label>

                              {validationError && <p className="text-danger">{validationError}</p>}

                              {projectLayout.map((preview, index) => (
                                 <div key={index} className="project-images mt-3">
                                    <div
                                       className="image-preview-container"
                                       style={{ position: "relative" }}
                                    >
                                       <img
                                          src={preview}
                                          alt={`Preview ${index + 1}`}
                                          className="img-fluid"
                                          style={{ maxWidth: "115px" }}
                                       />
                                       <RxCross2
                                          className="delete-icon"
                                          onClick={() => handleDeleteProjectLayoutImage(index)}
                                          style={{
                                             position: "absolute",
                                             top: "-5px",
                                             right: "1px",
                                             cursor: "pointer",
                                             color: "#fff",
                                             background: "#ff0000",
                                             borderRadius: "50%",
                                          }}
                                       />
                                    </div>
                                 </div>
                              ))}

                              <Form.Text className="text-muted">
                                 File should be 5MB(max) in png, jpg, etc.
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
                              <div
                                 className="d-flex"
                                 style={{ position: "relative", width: "100%" }}
                              >
                                 <Form.Control
                                    type="text"
                                    placeholder="Upload Videos"
                                    name="projectVideo"
                                    value={data.projectVideo}
                                    onChange={handleInputChange}
                                    style={{ paddingRight: "2.5rem" }}
                                 />
                                 {data.projectVideo && (
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
                              {videoLinks.map((link, index) => {
                                 const thumbnailUrl = getEmbedUrl(link);
                                 return (
                                    thumbnailUrl && (
                                       <Row>
                                          <Col lg={6}>
                                             <div
                                                className="video-preview"
                                                style={{
                                                   position: "relative",
                                                   display: "inline-block",
                                                   margin: "10px",
                                                }}
                                                key={index}
                                             >
                                                <img
                                                   src={thumbnailUrl}
                                                   alt={`Video thumbnail ${index + 1}`}
                                                   style={{
                                                      width: "120px",
                                                      height: "70px",
                                                      objectFit: "cover",
                                                      borderRadius: "8px",
                                                      border: "1px solid #ddd",
                                                   }}
                                                />
                                                <PiPlayCircleLight
                                                   style={{
                                                      position: "absolute",
                                                      top: "50%",
                                                      left: "50%",
                                                      transform: "translate(-50%, -50%)",
                                                      color: "#fff",
                                                      fontSize: "47px",
                                                   }}
                                                />
                                                <RxCross2
                                                   className="delete-icon"
                                                   onClick={() => handleDeleteVideo(index)}
                                                   style={{
                                                      position: "absolute",
                                                      top: "-10px",
                                                      right: "-10px",
                                                      cursor: "pointer",
                                                      color: "#fff",
                                                      background: "#ff0000",
                                                      borderRadius: "50%",
                                                      padding: "2px",
                                                   }}
                                                />
                                             </div>
                                          </Col>
                                       </Row>
                                    )
                                 );
                              })}
                              <Form.Text className="text-muted">
                                 Paste the link of the video (Youtube, Vemio, etc.)
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
                     >
                        Cancel
                     </button>
                     <button
                        type="submit"
                        // disabled={this.state.disableSubmit}
                        id="cancel-team-member-button"
                        className=" btn-small submit-btn"
                     >
                        Save & Add Tower/Plotted
                     </button>
                  </div>
               </Form>
            </div>
         </Container>
      </div>
   );
};

export default AddNewProjectPost;
