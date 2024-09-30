/** @format */

import React, { useRef, useState } from "react";
import "./ProjectDetails.scss";
import { Modal, Button, Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import Text from "../../../../shared/Text/Text";
import { TiCameraOutline } from "react-icons/ti";
import { TiTimes } from "react-icons/ti";
import { IoIosAdd } from "react-icons/io";
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { Range } from "react-range"; // You may need to install this package
import { FaTimesCircle } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { PiPlayCircleLight } from "react-icons/pi";
import addIcon from "../../../../assets/svg/add.svg";
// import Buttons from "../../../shared/Buttons/Buttons";
const ProjectDetails = () => {
   const [formData, setFormData] = useState({
      projectName: "",
      customerAddress: "",
      reraNumber: "",
      generalAmenities: "",
      projectDescription: "",
      projectLocation: "",
      projectImages: [],
      projectVideo: "",
      guidance: "",
      salesManagerContact: "",
      termsAccepted: false,
   });
   const [show, setShow] = useState(false);
   const [imageCategory, setImageCategory] = useState("Interior");
   const [selectedImages, setSelectedImages] = useState([]); // Images selected in the modal
   const [imagePreviews, setImagePreviews] = useState([]); // Images to display on the page
   const fileInputRef = useRef(null);
   const [validationError, setValidationError] = useState("");

   const currentYear = new Date().getFullYear();
   const [videoLinks, setVideoLinks] = useState([]);
   const [file, setFile] = useState(null);
   const [priceRange, setPriceRange] = useState([50, 200]); // Default: 50L to 2Cr
   const step = 10; // Step size of 10L
   const min = 50; // Minimum value in Lakhs (₹50L)
   const max = 200;
   const handlePriceRangeChange = (values) => {
      setPriceRange(values);
   };

   const formatPrice = (value) => {
      return value >= 100 ? `₹${value / 100}Cr` : `₹${value}L`;
   };

   const handleInputChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
   };

   const clearInput = () => {
      setFormData({ ...formData, projectVideo: "" });
   };
   const allowedExtensions = [".jpg", ".png"];
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
      // Update imagePreviews with selected images
      setImagePreviews((prev) => [...prev, ...selectedImages]);
      handleClose(); // Close the modal
   };

   const handleDeleteProjectImage = (index) => {
      const updatedImages = imagePreviews.filter((_, i) => i !== index);
      setImagePreviews(updatedImages);
   };

   const handleDeleteSelectedImage = (index) => {
      const updatedImages = [...selectedImages];
      updatedImages.splice(index, 1); // Remove the image at the specified index
      setSelectedImages(updatedImages);
   };

   const handleAddVideo = () => {
      if (formData.projectVideo && videoLinks.length < 5) {
         setVideoLinks([...videoLinks, formData.projectVideo]);
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

   const handleFileChange = (event) => {
      const uploadedFile = event.target.files[0];
      if (uploadedFile) {
         setFile(uploadedFile);
      }
   };

   // Handle file removal
   const handleFileRemove = () => {
      setFile(null);
      // Reset the input field
      const fileInput = document.getElementById("floorPlanInput");
      if (fileInput) {
         fileInput.value = null; // Clear the input value
      }
   };

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
               <form>
                  <div className="projectDetailForm">
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
                              <Form.Group controlId="formGeneralAmenities">
                                 <Form.Label>Property Type </Form.Label>
                                 <Form.Control as="select" name="generalAmenities">
                                    <option value="">Select</option>
                                    <option value="Tower">Tower</option>
                                    <option value="Plotted">Plotted</option>
                                 </Form.Control>
                              </Form.Group>
                           </Col>
                           <Col lg={4}>
                              <Form.Group controlId="formTowerName">
                                 <Form.Label>Tower Name</Form.Label>
                                 <Form.Control
                                    type="text"
                                    placeholder="Enter Tower Name"
                                    name="TowerName"
                                    //   value={formData.TowerName}
                                    //   onChange={handleInputChange}
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
                                    //   value={formData.TowerName}
                                    //   onChange={handleInputChange}
                                 />
                              </Form.Group>
                           </Col>
                        </Row>
                        <Row className="mt-4">
                           <Col lg={4}>
                              <Form.Group controlId="formTotalAreaDevelop">
                                 <InputGroup className="custom-input-group">
                                    <Form.Control
                                       type="text"
                                       placeholder="Total Area to Develop"
                                       className="custom-form-control"
                                    />
                                    <InputGroup.Append className="custom-input-group-append">
                                       <InputGroup.Text className="custom-text">
                                          Sq. Mt.
                                       </InputGroup.Text>
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
                                 />
                              </Form.Group>
                           </Col>
                           <Col lg={4}>
                              <Form.Group controlId="formUnitPerFloors">
                                 <Form.Control
                                    type="text"
                                    placeholder="Units Per Floor"
                                    name="unitPerFloors"
                                 />
                              </Form.Group>
                           </Col>
                        </Row>
                        <Row className="mt-4">
                           <Col lg="4">
                              <Form.Group controlId="formGeneralAmenities">
                                 <Form.Control as="select" name="generalAmenities">
                                    <option value="">Separate Amenities (Not compulsory)</option>
                                    <option value="Tower">Tower</option>
                                    <option value="Plotted">Plotted</option>
                                 </Form.Control>
                              </Form.Group>
                           </Col>
                           <Col lg={8}>
                              <Form.Group controlId="formUnitPerFloors">
                                 <Form.Control
                                    type="text"
                                    placeholder="Units Per Floor"
                                    name="unitPerFloors"
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
                                 />
                              </Form.Group>
                           </Col>
                           <Col lg={4}>
                              <Form.Group controlId="formContactPersonMobile">
                                 <Form.Control
                                    type="text"
                                    placeholder="Contact Person Mobile Number"
                                    name="contactPersonMobile"
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
                           <Col lg="4">
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
                        <Row className="imageUploadRow mt-4">
                           <Col lg={4}>
                              <Form.Group
                                 controlId="formProjectImages"
                                 className="mb-4 formProjectImages"
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
                                 <div className="d-flex mt-3 flex-wrap">
                                    {imagePreviews.map((image, index) => (
                                       <div key={index} className="project-images mr-3">
                                          <div
                                             className="image-preview-container"
                                             style={{ position: "relative" }}
                                          >
                                             <img
                                                src={URL.createObjectURL(image.file)} // Use createObjectURL to display the image
                                                alt={`Preview ${index + 1}`}
                                                className="img-fluid"
                                                style={{ maxWidth: "100px", borderRadius: "4px" }}
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
                                                {image.category} {/* Display the category */}
                                             </div>
                                             <RxCross2
                                                className="delete-icon"
                                                onClick={() => handleDeleteProjectImage(index)}
                                                style={{
                                                   position: "absolute",
                                                   top: "-5px",
                                                   right: "-5px",
                                                   cursor: "pointer",
                                                   color: "#fff",
                                                   background: "#ff0000",
                                                   borderRadius: "50%",
                                                }}
                                             />
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              </Form.Group>
                           </Col>

                           {/* Custom Modal */}
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
                                                   .filter((image) => image.category === "Interior")
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
                                                               handleDeleteSelectedImage(index)
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
                                                   .filter((image) => image.category === "Exterior")
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
                                                               handleDeleteSelectedImage(index)
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
                                          name="projectVideo"
                                          value={formData.projectVideo}
                                          onChange={handleInputChange}
                                          style={{ paddingRight: "2.5rem" }}
                                       />
                                       {formData.projectVideo && (
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
                        <hr className="p-0" />
                        {/* Tower */}
                        <div>
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
                           <Row className="align-items-center m-1 border rounded UnitsForm">
                              {/* Form Area */}
                              <Col lg={11} className="UnitformContainer1">
                                 <Row className="mb-3">
                                    <Col>
                                       <Form.Group controlId="configuration">
                                          <label>Configuration</label>
                                          <Form.Control
                                             as="select"
                                             defaultValue="3BHK"
                                             className="custom-select-size"
                                          >
                                             <option>2BHK</option>
                                             <option>3BHK</option>
                                             <option>4BHK</option>
                                          </Form.Control>
                                       </Form.Group>
                                    </Col>

                                    <Col>
                                       <Form.Group controlId="totalUnits">
                                          <label>Total Units</label>
                                          <Form.Control type="number" placeholder="Enter" />
                                       </Form.Group>
                                    </Col>

                                    <Col>
                                       <Form.Group controlId="sizeFrom">
                                          <label>Size From</label>
                                          <InputGroup>
                                             <Form.Control type="text" placeholder="Enter" />
                                             <Form.Control
                                                as="select"
                                                defaultValue="Sq.Mt"
                                                className="custom-select-size"
                                             >
                                                <option>Sq.Mt.</option>
                                                <option>Sq.Ft.</option>
                                             </Form.Control>
                                          </InputGroup>
                                       </Form.Group>
                                    </Col>

                                    <Col>
                                       <Form.Group controlId="sizeTo">
                                          <label>Size To</label>
                                          <InputGroup>
                                             <Form.Control type="text" placeholder="Enter" />
                                             <Form.Control
                                                as="select"
                                                defaultValue="Sq.Mt"
                                                className="custom-select-size"
                                             >
                                                <option>Sq.Mt.</option>
                                                <option>Sq.Ft.</option>
                                             </Form.Control>
                                          </InputGroup>
                                       </Form.Group>
                                    </Col>

                                    <Col>
                                       <Form.Group controlId="priceRange" className="priceRange">
                                          <label>Price Range</label>
                                          <div
                                             className="price-range-slider"
                                             style={{ width: "100%" }}
                                          >
                                             <div className="d-flex mb-1">
                                                <span>{formatPrice(priceRange[0])}</span>
                                                <span>-</span>
                                                <span>{formatPrice(priceRange[1])}</span>
                                             </div>
                                             <Range
                                                step={step}
                                                min={min}
                                                max={max}
                                                values={priceRange}
                                                onChange={handlePriceRangeChange}
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
                                                               ((priceRange[0] - min) /
                                                                  (max - min)) *
                                                               100
                                                            }%`,
                                                            right: `${
                                                               100 -
                                                               ((priceRange[1] - min) /
                                                                  (max - min)) *
                                                                  100
                                                            }%`,
                                                         }}
                                                      />
                                                      {children}
                                                   </div>
                                                )}
                                                renderThumb={({ props, index }) => (
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
                                                      {index === 0 ? (
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
                                    </Col>
                                 </Row>

                                 {/* Row for File Inputs */}
                                 <Row>
                                    <Col>
                                       <Form.Group controlId="floorPlan">
                                          <label>Floor Plan</label>
                                          <Form.File
                                             custom
                                             onChange={handleFileChange}
                                             id="floorPlanInput"
                                          >
                                             <Form.File.Input />
                                             <Form.File.Label>
                                                <TiCameraOutline className="mr-2" /> Browse
                                             </Form.File.Label>
                                          </Form.File>
                                          {file && (
                                             <div className="mt-2">
                                                <span>{file.name}</span>
                                                <button
                                                   type="button"
                                                   onClick={handleFileRemove}
                                                   className="ml-2 text-danger"
                                                   style={{
                                                      border: "none",
                                                      background: "none",
                                                      cursor: "pointer",
                                                   }}
                                                >
                                                   &times; {/* This will show a cross sign */}
                                                </button>
                                             </div>
                                          )}
                                       </Form.Group>
                                    </Col>

                                    <Col>
                                       <Form.Group controlId="hallImages">
                                          <label>Hall Images</label>
                                          <Form.File custom>
                                             <Form.File.Input />
                                             <Form.File.Label>
                                                <TiCameraOutline className="mr-2" /> Browse
                                             </Form.File.Label>
                                          </Form.File>
                                       </Form.Group>
                                    </Col>

                                    <Col>
                                       <Form.Group controlId="kitchenImages">
                                          <label>Kitchen Images</label>
                                          <Form.File custom>
                                             <Form.File.Input />
                                             <Form.File.Label>
                                                <TiCameraOutline className="mr-2" /> Browse
                                             </Form.File.Label>
                                          </Form.File>
                                       </Form.Group>
                                    </Col>

                                    <Col>
                                       <Form.Group controlId="bedroom1Images">
                                          <label>Bedroom 1 Images</label>
                                          <Form.File custom>
                                             <Form.File.Input />
                                             <Form.File.Label>
                                                <TiCameraOutline className="mr-2" /> Browse
                                             </Form.File.Label>
                                          </Form.File>
                                       </Form.Group>
                                    </Col>

                                    <Col>
                                       <Form.Group controlId="bedroom2Images">
                                          <label>Bedroom 2 Images</label>
                                          <Form.File custom>
                                             <Form.File.Input />
                                             <Form.File.Label>
                                                <TiCameraOutline className="mr-2" /> Browse
                                             </Form.File.Label>
                                          </Form.File>
                                       </Form.Group>
                                    </Col>

                                    <Col md={12} className="mt-3">
                                       <Form.Group controlId="comments">
                                          <Form.Control
                                             type="text"
                                             placeholder="Comments"
                                             name="comment"
                                          />
                                       </Form.Group>
                                    </Col>
                                 </Row>
                              </Col>

                              {/* Close Button Area */}
                              <Col lg={1} className="p-0 d-flex justify-content-end">
                                 <div className="close-col d-flex align-items-center justify-content-center">
                                    <FaTimesCircle
                                       style={{ color: "#FF1919", cursor: "pointer" }}
                                    />
                                 </div>
                              </Col>
                           </Row>
                        </div>
                        {/* Plotted-Villas */}

                        <div>
                           <Row className="align-items-center m-1 border rounded UnitsForm">
                              {/* Form Area */}
                              <Col lg={11} className="UnitformContainer1">
                                 <Row className="mb-3">
                                    <Col>
                                       <Form.Group controlId="configuration">
                                          <label>Configuration</label>
                                          <Form.Control
                                             as="select"
                                             defaultValue="Villas"
                                             className="custom-select-size"
                                          >
                                             <option>Villas</option>
                                             <option>Plots</option>
                                          </Form.Control>
                                       </Form.Group>
                                    </Col>
                                    <Col>
                                       <Form.Group controlId="configuration">
                                          <label>BHK</label>
                                          <Form.Control
                                             as="select"
                                             defaultValue="6 BHK"
                                             className="custom-select-size"
                                          >
                                             <option>2 BHK</option>
                                             <option>3 BHK</option>
                                          </Form.Control>
                                       </Form.Group>
                                    </Col>

                                    <Col>
                                       <Form.Group controlId="totalUnits">
                                          <label>Total Units</label>
                                          <Form.Control type="number" placeholder="Enter" />
                                       </Form.Group>
                                    </Col>

                                    <Col>
                                       <Form.Group controlId="sizeFrom">
                                          <label>Built up area From</label>
                                          <InputGroup>
                                             <Form.Control type="text" placeholder="Enter" />
                                             <Form.Control
                                                as="select"
                                                defaultValue="Sq.Mt"
                                                className="custom-select-size"
                                             >
                                                <option>Sq.Mt.</option>
                                                <option>Sq.Ft.</option>
                                             </Form.Control>
                                          </InputGroup>
                                       </Form.Group>
                                    </Col>

                                    <Col>
                                       <Form.Group controlId="sizeTo">
                                          <label>Built up area To</label>
                                          <InputGroup>
                                             <Form.Control type="text" placeholder="Enter" />
                                             <Form.Control
                                                as="select"
                                                defaultValue="Sq.Mt"
                                                className="custom-select-size"
                                             >
                                                <option>Sq.Mt.</option>
                                                <option>Sq.Ft.</option>
                                             </Form.Control>
                                          </InputGroup>
                                       </Form.Group>
                                    </Col>
                                 </Row>
                                 <Row className="mb-3">
                                    <Col lg="">
                                       <Form.Group controlId="sizeTo">
                                          <label>Plot Size From</label>
                                          <InputGroup>
                                             <Form.Control type="text" placeholder="Enter" />
                                             <Form.Control
                                                as="select"
                                                defaultValue="Sq.Mt"
                                                className="custom-select-size"
                                             >
                                                <option>Sq.Mt.</option>
                                                <option>Sq.Ft.</option>
                                             </Form.Control>
                                          </InputGroup>
                                       </Form.Group>
                                    </Col>
                                    <Col>
                                       <Form.Group controlId="sizeTo">
                                          <label>Plot Size To</label>
                                          <InputGroup>
                                             <Form.Control type="text" placeholder="Enter" />
                                             <Form.Control
                                                as="select"
                                                defaultValue="Sq.Mt"
                                                className="custom-select-size"
                                             >
                                                <option>Sq.Mt.</option>
                                                <option>Sq.Ft.</option>
                                             </Form.Control>
                                          </InputGroup>
                                       </Form.Group>
                                    </Col>

                                    <Col>
                                       <Form.Group controlId="priceRange" className="priceRange">
                                          <label>Price Range</label>
                                          <div
                                             className="price-range-slider"
                                             style={{ width: "100%" }}
                                          >
                                             <div className="d-flex mb-1">
                                                <span>{formatPrice(priceRange[0])}</span>
                                                <span>-</span>
                                                <span>{formatPrice(priceRange[1])}</span>
                                             </div>
                                             <Range
                                                step={step}
                                                min={min}
                                                max={max}
                                                values={priceRange}
                                                onChange={handlePriceRangeChange}
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
                                                               ((priceRange[0] - min) /
                                                                  (max - min)) *
                                                               100
                                                            }%`,
                                                            right: `${
                                                               100 -
                                                               ((priceRange[1] - min) /
                                                                  (max - min)) *
                                                                  100
                                                            }%`,
                                                         }}
                                                      />
                                                      {children}
                                                   </div>
                                                )}
                                                renderThumb={({ props, index }) => (
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
                                                      {index === 0 ? (
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
                                    </Col>
                                    <Col></Col>
                                    <Col></Col>
                                 </Row>

                                 {/* Row for File Inputs */}
                                 <Row>
                                    <Col>
                                       <Form.Group controlId="floorPlan">
                                          <label>Floor Plan</label>
                                          <Form.File
                                             custom
                                             onChange={handleFileChange}
                                             id="floorPlanInput"
                                          >
                                             <Form.File.Input />
                                             <Form.File.Label>
                                                <TiCameraOutline className="mr-2" /> Browse
                                             </Form.File.Label>
                                          </Form.File>
                                          {file && (
                                             <div className="mt-2">
                                                <span>{file.name}</span>
                                                <button
                                                   type="button"
                                                   onClick={handleFileRemove}
                                                   className="ml-2 text-danger"
                                                   style={{
                                                      border: "none",
                                                      background: "none",
                                                      cursor: "pointer",
                                                   }}
                                                >
                                                   &times; {/* This will show a cross sign */}
                                                </button>
                                             </div>
                                          )}
                                       </Form.Group>
                                    </Col>

                                    <Col>
                                       <Form.Group controlId="hallImages">
                                          <label>Hall Images</label>
                                          <Form.File custom>
                                             <Form.File.Input />
                                             <Form.File.Label>
                                                <TiCameraOutline className="mr-2" /> Browse
                                             </Form.File.Label>
                                          </Form.File>
                                       </Form.Group>
                                    </Col>

                                    <Col>
                                       <Form.Group controlId="kitchenImages">
                                          <label>Kitchen Images</label>
                                          <Form.File custom>
                                             <Form.File.Input />
                                             <Form.File.Label>
                                                <TiCameraOutline className="mr-2" /> Browse
                                             </Form.File.Label>
                                          </Form.File>
                                       </Form.Group>
                                    </Col>

                                    <Col>
                                       <Form.Group controlId="bedroom1Images">
                                          <label>Bedroom 1 Images</label>
                                          <Form.File custom>
                                             <Form.File.Input />
                                             <Form.File.Label>
                                                <TiCameraOutline className="mr-2" /> Browse
                                             </Form.File.Label>
                                          </Form.File>
                                       </Form.Group>
                                    </Col>

                                    <Col>
                                       <Form.Group controlId="bedroom2Images">
                                          <label>Bedroom 2 Images</label>
                                          <Form.File custom>
                                             <Form.File.Input />
                                             <Form.File.Label>
                                                <TiCameraOutline className="mr-2" /> Browse
                                             </Form.File.Label>
                                          </Form.File>
                                       </Form.Group>
                                    </Col>

                                    <Col md={12} className="mt-3">
                                       <Form.Group controlId="comments">
                                          <Form.Control
                                             type="text"
                                             placeholder="Comments"
                                             name="comment"
                                          />
                                       </Form.Group>
                                    </Col>
                                 </Row>
                              </Col>

                              {/* Close Button Area */}
                              <Col lg={1} className="p-0 d-flex justify-content-end">
                                 <div className="close-col1 d-flex align-items-center justify-content-center">
                                    <FaTimesCircle
                                       style={{ color: "#FF1919", cursor: "pointer" }}
                                    />
                                 </div>
                              </Col>
                           </Row>
                        </div>
                        {/* Plotted-Plot */}
                        <div>
                           <Row className="align-items-center m-1 border rounded UnitsForm">
                              {/* Form Area */}
                              <Col lg={11} className="UnitformContainer1">
                                 <Row className="mb-3">
                                    <Col>
                                       <Form.Group controlId="configuration">
                                          <label>Configuration</label>
                                          <Form.Control
                                             as="select"
                                             defaultValue="Plots"
                                             className="custom-select-size"
                                          >
                                             <option>Villas</option>
                                             <option>Plots</option>
                                          </Form.Control>
                                       </Form.Group>
                                    </Col>

                                    <Col>
                                       <Form.Group controlId="totalUnits">
                                          <label>Total Units</label>
                                          <Form.Control type="number" placeholder="Enter" />
                                       </Form.Group>
                                    </Col>

                                    <Col>
                                       <Form.Group controlId="sizeFrom">
                                          <label>Plot Size From</label>
                                          <InputGroup>
                                             <Form.Control type="text" placeholder="Enter" />
                                             <Form.Control
                                                as="select"
                                                defaultValue="Sq.Mt"
                                                className="custom-select-size"
                                             >
                                                <option>Sq.Mt.</option>
                                                <option>Sq.Ft.</option>
                                             </Form.Control>
                                          </InputGroup>
                                       </Form.Group>
                                    </Col>

                                    <Col>
                                       <Form.Group controlId="sizeTo">
                                          <label>Plot Size To</label>
                                          <InputGroup>
                                             <Form.Control type="text" placeholder="Enter" />
                                             <Form.Control
                                                as="select"
                                                defaultValue="Sq.Mt"
                                                className="custom-select-size"
                                             >
                                                <option>Sq.Mt.</option>
                                                <option>Sq.Ft.</option>
                                             </Form.Control>
                                          </InputGroup>
                                       </Form.Group>
                                    </Col>

                                    <Col>
                                       <Form.Group controlId="priceRange" className="priceRange">
                                          <label>Price Range</label>
                                          <div
                                             className="price-range-slider"
                                             style={{ width: "100%" }}
                                          >
                                             <div className="d-flex mb-1">
                                                <span>{formatPrice(priceRange[0])}</span>
                                                <span>-</span>
                                                <span>{formatPrice(priceRange[1])}</span>
                                             </div>
                                             <Range
                                                step={step}
                                                min={min}
                                                max={max}
                                                values={priceRange}
                                                onChange={handlePriceRangeChange}
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
                                                               ((priceRange[0] - min) /
                                                                  (max - min)) *
                                                               100
                                                            }%`,
                                                            right: `${
                                                               100 -
                                                               ((priceRange[1] - min) /
                                                                  (max - min)) *
                                                                  100
                                                            }%`,
                                                         }}
                                                      />
                                                      {children}
                                                   </div>
                                                )}
                                                renderThumb={({ props, index }) => (
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
                                                      {index === 0 ? (
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
                                    </Col>
                                 </Row>

                                 {/* Row for File Inputs */}
                                 <Row>
                                    <Col>
                                       <Form.Group controlId="floorPlan">
                                          <label>Floor Plan</label>
                                          <Form.File
                                             custom
                                             onChange={handleFileChange}
                                             id="floorPlanInput"
                                          >
                                             <Form.File.Input />
                                             <Form.File.Label>
                                                <TiCameraOutline className="mr-2" /> Browse
                                             </Form.File.Label>
                                          </Form.File>
                                          {file && (
                                             <div className="mt-2">
                                                <span>{file.name}</span>
                                                <button
                                                   type="button"
                                                   onClick={handleFileRemove}
                                                   className="ml-2 text-danger"
                                                   style={{
                                                      border: "none",
                                                      background: "none",
                                                      cursor: "pointer",
                                                   }}
                                                >
                                                   &times; {/* This will show a cross sign */}
                                                </button>
                                             </div>
                                          )}
                                       </Form.Group>
                                    </Col>
                                    <Col></Col>
                                    <Col></Col>
                                    <Col></Col>
                                    <Col></Col>

                                    <Col md={12} className="mt-3">
                                       <Form.Group controlId="comments">
                                          <Form.Control
                                             type="text"
                                             placeholder="Comments"
                                             name="comment"
                                          />
                                       </Form.Group>
                                    </Col>
                                 </Row>
                              </Col>

                              {/* Close Button Area */}
                              <Col lg={1} className="p-0 d-flex justify-content-end">
                                 <div className="close-col d-flex align-items-center justify-content-center">
                                    <FaTimesCircle
                                       style={{ color: "#FF1919", cursor: "pointer" }}
                                    />
                                 </div>
                              </Col>
                           </Row>
                        </div>
                        <Row>
                           <Col lg="2">
                              <Button
                                 className="d-flex py-1 ml-3 mb-2"
                                 style={{
                                    color: "#BE1452",
                                    backgroundColor: "#F8F3F5",
                                    borderColor: "#DED6D9",
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
                        type="submit"
                        // disabled={this.state.disableSubmit}
                        id="cancel-team-member-button"
                        className=" btn-small submit-btn"
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
