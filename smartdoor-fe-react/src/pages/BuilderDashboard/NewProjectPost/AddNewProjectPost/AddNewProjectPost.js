/** @format */
// API integration on line 117, 261 and 272
import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Col, Dropdown, FormControl, InputGroup, Row } from "react-bootstrap";
import "./AddNewProjectPost.scss"; // Make sure to import the SCSS file
import { TiCameraOutline } from "react-icons/ti";
import { TiTimes } from "react-icons/ti";
import { IoIosAdd } from "react-icons/io";
import { getLocalStorage } from "../../../../common/helpers/Utils";
import { MdMyLocation } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa"; // Import the icon from react-icons
import Container from "react-bootstrap/Container";
import { RxCross2 } from "react-icons/rx";
import { PiPlayCircleLight } from "react-icons/pi";
import {
   getBuilderProjectById,
   createBuilderProject,
   approveBuilderProject,
   deleteBuilderProjectById,
} from "../../../../common/redux/actions";
import Text from "../../../../shared/Text/Text";
import MapComponent from "../../../../shared/Map/MapComponent";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
const AddNewProjectPost = () => {
   const location = useLocation();
   const { possessionFrom, possessionTo } = location.state || {};

   const [data, setData] = useState({
      builderProjectId: null,
      userId: null,
      builderId: null,
      builderProjectName: "",
      totalTowersPlanned: null,
      landArea: null,
      areaToDevelop: null,
      openAreaPercent: null,
      possessionFrom: "",
      possessionTo: "",
      projectDescription: "",
      latitude: 0.0,
      longitude: 0.0,
      builderProjectGeneralAmenities: [],
      city: "",
      state: "",
      locality: "",
      country: null,
      cityLat: 0.0,
      cityLong: 0.0,
      builderProjectImages: [],
      builderProjectVideos: [],
   });

   const [userId, setUserId] = useState(null);
   const [autocomplete, setAutocomplete] = useState(null);
   const [builderProjectId, setBuilderProjectId] = useState(null);
   const fileInputRef = useRef();
   const currentYear = new Date().getFullYear();
   const [monthYearFrom, setMonthYearFrom] = useState({ month: "", year: "" });
   const [monthYearTo, setMonthYearTo] = useState({ month: "", year: "" });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [selectedAmenities, setSelectedAmenities] = useState(""); // Separate state for selected amenities
   const [isEditing, setIsEditing] = useState(false);
   const inputRef = useRef(null); // Reference to the input field
   const [showDropdown, setShowDropdown] = useState(false);

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
   // useEffect(() => {
   //    const auth = getLocalStorage("authData");
   //    const storedUserId = auth.userid;
   //    const storedBuilderId = auth.builderId;
   //    const urlParams = new URLSearchParams(window.location.search);
   //    const storedBuilderProjectId =
   //       urlParams.get("builderProjectId") || localStorage.getItem("builderProjectId") || "";

   //    if (storedUserId) {
   //       setUserId(storedUserId); // Set userId state from localStorage

   //       setData((prevData) => ({
   //          ...prevData,
   //          userId: storedUserId,
   //       }));
   //    }

   //    const fetchBuilderProject = async () => {
   //       setLoading(true); // Set loading to true while fetching

   //       try {
   //          setData((prevData) => ({
   //             ...prevData,
   //             builderId: storedBuilderId,
   //          }));

   //          if (storedBuilderProjectId == null) return;

   //          const response = await getBuilderProjectById({
   //             builderProjectId: storedBuilderProjectId,
   //             userId: storedUserId,
   //          });
   //          console.log("response", response);

   //          if (response?.data) {
   //             const { resourceData, error: responseError } = response.data;

   //             if (resourceData) {
   //                setSelectedAmenities(resourceData.selectedAmenities || "");
   //                setData((prevData) => ({
   //                   ...prevData,
   //                   ...resourceData, // Merge fetched data
   //                }));

   //                // Parse possession dates
   //                if (resourceData.possessionFrom) {
   //                   const [monthFrom, yearFrom] = resourceData.possessionFrom.split("-");
   //                   setMonthYearFrom({ month: monthFrom, year: yearFrom });
   //                }

   //                if (resourceData.possessionTo) {
   //                   const [monthTo, yearTo] = resourceData.possessionTo.split("-");
   //                   setMonthYearTo({ month: monthTo, year: yearTo });
   //                }

   //                setIsEditing(true);
   //             } else if (responseError) {
   //                setError(responseError);
   //             }
   //          }
   //       } catch (error) {
   //          setError(error);
   //          console.error("Error fetching builder data:", error);
   //       } finally {
   //          setLoading(false); // Set loading to false after fetching
   //       }
   //    };

   //    if (storedUserId) {
   //       fetchBuilderProject();
   //    }
   // }, [builderProjectId]);
   useEffect(() => {
      const auth = getLocalStorage("authData");
      const storedUserId = auth.userid;
      const storedBuilderId = auth.builderId;
      const urlParams = new URLSearchParams(window.location.search);
      const builderProjectId =
         urlParams.get("builderProjectId") || localStorage.getItem("builderProjectId") || "";

      const path = window.location.pathname;
      const pathParts = path.split("/");
      const lastPathPart = pathParts[pathParts.length - 1];

      let id = "";

      if (!isNaN(lastPathPart)) {
         id = lastPathPart;
      }

      if (storedUserId) {
         setUserId(storedUserId); // Set userId state from localStorage

         setData((prevData) => ({
            ...prevData,
            userId: storedUserId,
         }));
      }

      const fetchBuilderProject = async () => {
         setLoading(true); // Set loading to true while fetching

         try {
            setData((prevData) => ({
               ...prevData,
               builderId: storedBuilderId,
            }));

            if (id) {
               const response = await getBuilderProjectById({
                  builderProjectId: id,
                  userId: storedUserId,
               });
               console.log("response", response);

               if (response?.data) {
                  const { resourceData, error: responseError } = response.data;

                  if (resourceData) {
                     setSelectedAmenities(resourceData.selectedAmenities || "");
                     setData((prevData) => ({
                        ...prevData,
                        ...resourceData, // Merge fetched data
                     }));

                     // Parse possession dates
                     if (resourceData.possessionFrom) {
                        const [monthFrom, yearFrom] = resourceData.possessionFrom.split("-");
                        setMonthYearFrom({ month: monthFrom, year: yearFrom });
                     }

                     if (resourceData.possessionTo) {
                        const [monthTo, yearTo] = resourceData.possessionTo.split("-");
                        setMonthYearTo({ month: monthTo, year: yearTo });
                     }

                     setIsEditing(true);
                  } else if (responseError) {
                     setError(responseError);
                  }
               }
            } else {
               // Show blank fields
               setData((prevData) => ({
                  ...prevData,
                  builderProjectId: "",
                  selectedAmenities: "",
                  possessionFrom: "",
                  possessionTo: "",
               }));
            }
         } catch (error) {
            setError(error);
            console.error("Error fetching builder data:", error);
         } finally {
            setLoading(false); // Set loading to false after fetching
         }
      };

      if (storedUserId) {
         fetchBuilderProject();
      }
   }, [builderProjectId]);

   // const handleInputChange = (e) => {
   //    const { name, value, options, type } = e.target;
   //    console.log("hiii");
   //    if (type === "select-multiple") {
   //       // Handle multiple select input
   //       const selectedValues = [];
   //       for (let i = 0; i < options.length; i++) {
   //          if (options[i].selected) {
   //             selectedValues.push(options[i].value);
   //          }
   //       }
   //       setData((prevState) => ({
   //          ...prevState,
   //          [name]: selectedValues, // Update the selected values based on the input name
   //       }));
   //    } else {
   //       // Handle other types of inputs (e.g., text, number)
   //       setData((prevState) => ({
   //          ...prevState,
   //          [name]: value, // Update the specific field based on the input name
   //       }));
   //    }
   // };
   const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
   };

   // Handle checkbox change
   const handleCheckboxChange = (event) => {
      const { value, checked } = event.target;
      setData((prevData) => {
         let selectedAmenities = [...prevData.builderProjectGeneralAmenities];
         if (checked) {
            // Add the selected amenity
            selectedAmenities.push(value);
         } else {
            // Remove the unselected amenity
            selectedAmenities = selectedAmenities.filter((amenity) => amenity !== value);
         }

         return {
            ...prevData,
            builderProjectGeneralAmenities: selectedAmenities,
         };
      });
   };

   const getSelectedAmenitiesText = () => {
      if (data.builderProjectGeneralAmenities.length === 0) {
         return "Select";
      }
      return data.builderProjectGeneralAmenities.join(", ");
   };

   const handleInputChange = (event) => {
      const { name, value, type, options } = event.target;

      if (type === "select" && options) {
         const selectedValues = Array.from(options)
            .filter((option) => option.selected)
            .map((option) => option.value);

         setData((prevData) => ({
            ...prevData,
            [name]: selectedValues,
         }));
      } else {
         setData((prevData) => ({
            ...prevData,
            [name]: value || "", // Default to an empty string to avoid undefined
         }));
      }
   };
   const handleFileChange = (e, description) => {
      const files = Array.from(e.target.files); // Convert FileList to an array
      const newImages = [];

      files.forEach((file) => {
         const reader = new FileReader();
         reader.onload = (event) => {
            const image = {
               docName: file.name,
               docDescription: description,
               builderProjectImageAsBase64: event.target.result,
            };
            newImages.push(image);

            // Once all files are processed, update the state
            if (newImages.length === files.length) {
               setData((prevData) => ({
                  ...prevData,
                  builderProjectImages: [
                     ...prevData.builderProjectImages,
                     ...newImages, // Add all new images
                  ],
               }));

               // Reset the file input after successful upload
               e.target.value = ""; // This will clear the file input, allowing re-upload of the same image
            }
         };
         reader.readAsDataURL(file); // Convert image to base64
      });
   };

   const handleDeleteImage = (index, description) => {
      setData((prevData) => ({
         ...prevData,
         builderProjectImages: prevData.builderProjectImages
            .filter((image) => image.docDescription === description)
            .filter((_, i) => i !== index) // Remove only the image from the relevant category
            .concat(
               prevData.builderProjectImages.filter((image) => image.docDescription !== description)
            ), // Keep other categories unchanged
      }));
   };

   const clearInput = () => {
      setData((prevData) => ({
         ...prevData,
         newVideoUrl: "", // Clear new video URL input
      }));
   };
   const handleAddVideo = () => {
      if (data.newVideoUrl) {
         const newVideo = {
            docId: null,
            docName: data.docName || "New Video",
            docDescription: "Description here",
            docOrderInFrontendView: data.builderProjectVideos.length + 1,
            docURL: data.newVideoUrl,
            builderProjectImageAsBase64: null,
         };

         setData((prevData) => ({
            ...prevData,
            builderProjectVideos: [...prevData.builderProjectVideos, newVideo],
            newVideoUrl: "", // Clear the new video URL after adding
         }));
      }
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

   const handleDeleteVideo = (index) => {
      console.log("Deleting video at index:", index);
      setData((prevData) => {
         const updatedVideos = prevData.builderProjectVideos.filter((_, i) => i !== index);
         console.log("Updated videos:", updatedVideos);
         return {
            ...prevData,
            builderProjectVideos: updatedVideos,
            newVideoUrl: "", // Clear the new video URL input
         };
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         // Prepare the submission data with selectedAmenities and userId
         const submissionData = {
            ...data,
            selectedAmenities, // Include selected amenities
            userId: getLocalStorage("authData").userid, // Ensure userId is included here
         };

         // Call API to create builder project
         const response = await createBuilderProject(submissionData);

         if (response?.data) {
            const { resourceData, error: responseError } = response.data;

            if (resourceData) {
               // Handle resource data (Assuming resourceData contains the builderProjectId)
               const builderProjectId = resourceData.builderProjectId; // Extract builderProjectId from the response

               // Log the fetched resource data for debugging purposes
               console.log("Fetched resource data:", resourceData);

               // Optionally store resource data in state (if needed)
               setData((prevData) => ({
                  ...prevData,
                  ...resourceData,
               }));

               // Save the builderProjectId in localStorage
               localStorage.setItem("builderProjectId", builderProjectId);

               // Redirect to the project details page using the builderProjectId
               window.location.href = `/builder/Project-details/${builderProjectId}`;
            } else if (responseError) {
               // Handle the error response if any
               setError(responseError);
               console.error("Error in response:", responseError);
            }
         }
      } catch (error) {
         // Handle any errors during the form submission process
         console.error("Error submitting builder project:", error);
         // Optionally show an error alert
         // alert("There was an error submitting the project.");
      }
   };

   const approveBuilderProject = async (e) => {
      e.preventDefault();
      try {
         const response = await approveBuilderProject({
            builderProjectId,
            userId,
         });
         console.log("Project approved successfully:", response.data);
      } catch (error) {
         console.error("Error approving project:", error);
      }
   };

   const deleteBuilderProject = async (e) => {
      e.preventDefault();
      try {
         const response = await deleteBuilderProjectById({
            builderProjectId,
            userId,
         });
         console.log("Project deleted successfully:", response.data);
      } catch (error) {
         console.error("Error deleting builder project:", error);
      }
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
   useEffect(() => {
      if (window.google && window.google.maps) {
         // Initialize the autocomplete object once the Google Maps API is loaded
         const autocompleteObj = new window.google.maps.places.Autocomplete(inputRef.current, {
            types: ["geocode"], // Restrict results to geographical locations
         });

         // Add an event listener to get the place details when a place is selected
         autocompleteObj.addListener("place_changed", () => {
            const place = autocompleteObj.getPlace();
            if (place.geometry) {
               const lat = place.geometry.location.lat();
               const lng = place.geometry.location.lng();
               const addressComponents = place.address_components;

               // Helper function to extract specific data from address components
               const getAddressComponent = (type) => {
                  const component = addressComponents.find((component) =>
                     component.types.includes(type)
                  );
                  return component ? component.long_name : "";
               };

               // Extract locality, city, and state from address components
               const locality =
                  getAddressComponent("sublocality_level_1") || getAddressComponent("locality"); // Locality or sublocality
               const city =
                  getAddressComponent("locality") ||
                  getAddressComponent("administrative_area_level_2"); // City without "Division"
               const state = getAddressComponent("administrative_area_level_1"); // State
               const country = getAddressComponent("country"); // Country

               console.log("Selected Place:", place);

               // Update the data with new location values
               setData((prevData) => ({
                  ...prevData,
                  latitude: lat,
                  longitude: lng,
                  city: city,
                  state: state,
                  locality: locality,
                  country: country, // Include country in the data
               }));
            }
         });

         setAutocomplete(autocompleteObj);
      }
   }, [setAutocomplete]);

   return (
      <div className="add-new-project-post mb-3">
         <Container fluid>
            <h2 className="page-title">PROJECT DETAIL</h2>

            <div className="newEntry project-details">
               <form
                  onSubmit={handleSubmit}
                  noValidate
                  autoComplete="off"
                  className="form-white-bg"
               >
                  <Row className="mapAndForm">
                     <Col lg={5} className="map-col">
                        <div className="map-con">
                           <div className="map-container">
                              <div className="map-header">
                                 <input
                                    type="text"
                                    ref={inputRef}
                                    className="map-search"
                                    placeholder="Search location of property"
                                 />
                                 <div className="map-icons d-flex align-items-center">
                                    <MdMyLocation style={{ cursor: "pointer" }} />
                                 </div>
                                 <div className="map-icons icon-location">
                                    <FaMapMarkerAlt
                                       style={{
                                          color: "#C31155",
                                          fontSize: "18px",
                                          cursor: "pointer",
                                       }}
                                    />
                                 </div>
                              </div>

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
                                    {/* Pass handleLocationSelect as a prop to MapComponent */}
                                    <MapComponent
                                       latitude={data.latitude}
                                       longitude={data.longitude}
                                       // onLocationSelect={handleLocationSelect} // Pass the callback to get data from MapComponent
                                       style={{
                                          height: "264px",
                                          width: "100%",
                                          borderRadius: "5px",
                                       }}
                                    />
                                 </div>
                              </div>

                              {/* Map Footer */}
                           </div>
                           <div className="map-footer" style={{ padding: "10px 10px" }}>
                              {data.locality
                                 ? `${data.locality}, ${data.city}, ${data.state}`
                                 : "Location not available"}
                           </div>
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
                                    name="builderProjectName"
                                    value={data.builderProjectName}
                                    onChange={handleInputChange}
                                 />
                              </Form.Group>
                           </Col>
                           <Col lg="6">
                              <Form.Group
                                 controlId="formGeneralAmenities"
                                 style={{ position: "relative" }}
                              >
                                 {/* Styled Label */}
                                 <Form.Label
                                    style={{
                                       position: "absolute",
                                       top: "-10px",
                                       backgroundColor: showDropdown ? "#fff" : "#fff",
                                       left: "12px",
                                       fontSize: "12px",
                                       paddingLeft: "5px",
                                       paddingRight: "5px",
                                       color: "#8C96A3",
                                       zIndex: 1,
                                       fontWeight: "500",
                                    }}
                                 >
                                    General Amenities
                                 </Form.Label>

                                 {/* Dropdown */}
                                 <Dropdown show={showDropdown} onToggle={toggleDropdown}>
                                    <Dropdown.Toggle
                                       variant="outline-secondary"
                                       className="form-control"
                                       style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                          padding: "10px",
                                          borderRadius: "5px",
                                          backgroundColor: "transparent !important",
                                          borderRadius: "8px !important",
                                          borderColor: "#ced4da",
                                          // borderColor: showDropdown ? "transparent" : "#ced4da",
                                          overflow: "hidden", // Hide content overflow
                                          textOverflow: "ellipsis", // Show ellipsis if content overflows
                                          whiteSpace: "nowrap",
                                          position: "relative", // Prevent text from wrapping
                                       }}
                                    >
                                       <span
                                          style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                                       >
                                          {getSelectedAmenitiesText()}
                                       </span>
                                       <span
                                          style={{ position: "absolute", right: "10px" }}
                                          className={`dropdown-toggle::after ${
                                             showDropdown ? "open" : ""
                                          }`}
                                       ></span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu style={{ width: "100%", padding: "10px" }}>
                                       {defaultAmenities.map((amenity, index) => (
                                          <Form.Check
                                             key={index}
                                             type="checkbox"
                                             label={amenity}
                                             value={amenity}
                                             checked={data.builderProjectGeneralAmenities.includes(
                                                amenity
                                             )}
                                             onChange={handleCheckboxChange}
                                          />
                                       ))}
                                    </Dropdown.Menu>
                                 </Dropdown>
                              </Form.Group>
                           </Col>

                           {/* <Col lg="6">
                              <Form.Group controlId="formGeneralAmenities">
                                 <Form.Label>General Amenities</Form.Label>
                                 <Form.Control
                                    as="select"
                                    name="selectedAmenities"
                                    value={selectedAmenities} // Bind to the separate state
                                    onChange={handleAmenitiesChange} // Call handler on change
                                 >
                                    <option value="">Select</option>
                                    {isEditing
                                       ? data.builderProjectGeneralAmenities.map(
                                            (amenity, index) => (
                                               <option key={index} value={amenity}>
                                                  {amenity}
                                               </option>
                                            )
                                         )
                                       : // Show default value only when creating
                                         defaultAmenities.map((amenity, index) => (
                                            <option key={index} value={amenity}>
                                               {amenity}
                                            </option>
                                         ))}
                                 </Form.Control>
                              </Form.Group>
                           </Col> */}
                        </Row>
                        <Row className="align-items-center mb-4">
                           <Col lg={6}>
                              <Form.Group controlId="formtowerPlottedPlanner">
                                 <Form.Label>Total Tower / Plotted Planned</Form.Label>
                                 <Form.Control
                                    type="text"
                                    placeholder="Enter Total Tower / Plotted Planned"
                                    name="totalTowersPlanned"
                                    value={data.totalTowersPlanned}
                                    onChange={handleInputChange}
                                 />
                              </Form.Group>
                           </Col>
                           <Col lg={6} className="mt-4">
                              <Form.Group controlId="formLandArea">
                                 <InputGroup className="custom-input-group">
                                    <Form.Control
                                       type="number"
                                       placeholder="Land Area"
                                       name="landArea"
                                       className="custom-form-control"
                                       value={data.landArea}
                                       onChange={handleInputChange}
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
                                       type="number"
                                       placeholder="Total Area to Develop"
                                       className="custom-form-control"
                                       name="areaToDevelop"
                                       value={data.areaToDevelop}
                                       onChange={handleInputChange}
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
                                       name="openAreaPercent"
                                       value={data.openAreaPercent}
                                       onChange={handleInputChange}
                                    />
                                    <InputGroup.Append className="custom-input-group-append">
                                       <InputGroup.Text className="custom-text">%</InputGroup.Text>
                                    </InputGroup.Append>
                                 </InputGroup>
                              </Form.Group>
                           </Col>
                        </Row>
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
                                       className="custom-dropdown" // Add your custom class if needed
                                       value={monthYearFrom.month} // Preselect the month from parsed value
                                       onChange={handleFromMonthChange}
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

                           {/* Show the selected possession dates */}
                           {/* <Col lg={12}>
            <p><strong>Possession From:</strong> {data.possessionFrom || "Not selected"}</p>
            <p><strong>Possession To:</strong> {data.possessionTo || "Not selected"}</p>
         </Col> */}
                        </Row>
                     </Col>
                  </Row>
                  <Row className="mt-4">
                     <Col lg="12">
                        <Form.Group controlId="formBasicContact">
                           <Form.Control
                              as="textarea" // Specify the element type as textarea
                              rows={10} // You can specify the number of rows for the textarea
                              placeholder="Project description"
                              name="projectDescription"
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
                           <span>Upload Image</span>
                           <div className="image-upload mt-2">
                              <label htmlFor="upload-project-image" className="upload-label">
                                 <TiCameraOutline className="camera-icon" />
                                 <input
                                    id="upload-project-image"
                                    type="file"
                                    className="upload-input"
                                    accept="image/*"
                                    multiple // Allow multiple files to be selected
                                    onChange={(e) => handleFileChange(e, "upload image")}
                                    ref={fileInputRef}
                                 />
                                 <span>Upload Images</span>
                              </label>

                              {/* Display the list of uploaded images */}
                              <div className="d-flex flex-wrap mt-2">
                                 {data.builderProjectImages
                                    .filter((image) => image.docDescription === "upload image")
                                    .map((image, index) => (
                                       <div
                                          key={index}
                                          className="project-images mt-3"
                                          style={{ position: "relative", marginRight: "10px" }}
                                       >
                                          <img
                                             src={image.builderProjectImageAsBase64}
                                             alt={image.docName}
                                             className="img-fluid"
                                             style={{ maxWidth: "115px" }}
                                          />
                                          <RxCross2
                                             className="delete-icon"
                                             onClick={() =>
                                                handleDeleteImage(index, "upload image")
                                             } // Pass the docDescription to delete the correct image
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
                                    onChange={(e) => handleFileChange(e, "project layout")}
                                    ref={fileInputRef}
                                 />
                                 <span>Upload Layout</span>
                              </label>
                              <div className="d-flex flex-wrap mt-2">
                                 {data.builderProjectImages
                                    .filter((image) => image.docDescription === "project layout")
                                    .map((image, index) => (
                                       <div
                                          key={index}
                                          className="project-images mt-3"
                                          style={{ position: "relative", marginRight: "10px" }}
                                       >
                                          <img
                                             src={image.builderProjectImageAsBase64}
                                             alt={image.docName}
                                             className="img-fluid"
                                             style={{ maxWidth: "115px" }}
                                          />
                                          <RxCross2
                                             className="delete-icon"
                                             onClick={() =>
                                                handleDeleteImage(index, "project layout")
                                             } // Pass the docDescription to delete the correct image
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
                                    name="newVideoUrl" // Changed to newVideoUrl
                                    value={data.newVideoUrl} // Use newVideoUrl for the input value
                                    onChange={handleInputChange}
                                    style={{ paddingRight: "2.5rem" }}
                                 />
                                 {data.newVideoUrl && (
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

                              <Row>
                                 {(data.builderProjectVideos || []).map((video, index) => {
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
                                                   title={`Video thumbnail ${index + 1}`}
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
                                                   onClick={() => handleDeleteVideo(index)}
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
                                 })}
                              </Row>

                              <Form.Text className="text-muted">
                                 Paste the link of the video (YouTube, Vimeo, etc.)
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
               </form>
            </div>
         </Container>
      </div>
   );
};

export default AddNewProjectPost;
