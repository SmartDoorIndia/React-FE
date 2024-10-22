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
import { IoIosArrowDown } from "react-icons/io";
import { FaTimesCircle } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { PiPlayCircleLight } from "react-icons/pi";
import addIcon from "../../../../assets/svg/add.svg";
import {
   getBuilderProjectSubPostById,
   addBuilderProjectSubPost,
   deleteBuilderProjectSubPostById,
} from "../../../../common/redux/actions";
import { CONSTANTS } from "../../../../common/helpers/Constants";

const ProjectDetails = (props) => {
   // const { builderProjectSubPostId } = useParams(); // Get the project ID from URL parameters
   const [show, setShow] = useState(false);
   const [imageCategory, setImageCategory] = useState("Interior");
   const [selectedImages, setSelectedImages] = useState([]); // Images selected in the modal
   const [imagePreviews, setImagePreviews] = useState([]); // Images to display on the page
   const fileInputRef = useRef(null);
   const [monthYearFrom, setMonthYearFrom] = useState({ month: "", year: "" });
   const [monthYearTo, setMonthYearTo] = useState({ month: "", year: "" });
   const currentYear = new Date().getFullYear();
   const [userId, setUserId] = useState(null);
   const [builderProjectId, setBuilderProjectId] = useState(null);
   const [error, setError] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [showImageModal, setImageShowModal] = useState(false);
   const [selectedImageSrc, setSelectedImageSrc] = useState("");
   const [currentVideoUrl, setCurrentVideoUrl] = useState("");
   const [towerRows, setTowerRows] = useState([]);
   const [plottedRows, setPlottedRows] = useState([]);
   const [formCount, setFormCount] = useState(1); // Start with one form
   const [newVideoUrl, setNewVideoUrl] = useState(null);
   const [showMoreUnits, setShowMoreUnits] = useState(false);
   const [currentUnitIndex, setCurrentUnitIndex] = useState(0);
   const [selectedType, setSelectedType] = useState([]);
   const [builderProjectSubPostId, setBuilderProjectSubPostId] = useState(null);
   const auth = getLocalStorage("authData");
   const storedUserId = auth?.userid;
   const storedBuilderId = auth.builderId;
   const storedBuilderProjectId = localStorage.getItem("builderProjectId");
   const storebuilderProjectSubPostId = localStorage.getItem("builderProjectSubPostId");
   const [data, setData] = useState({
      builderProjectSubPostId: null,
      builderProjectId: localStorage.getItem("builderProjectId"),
      subPostType: "",
      userId: auth?.userid,
      builderProjectSubPostName: "",
      reraNumber: "",
      areaToDevelop: null,
      areaToDevelopMeasurementUnitEnteredByUser: "Sq. Mt.",
      highlightsOrUsp: "",
      contactPersonName: "",
      contactPersonNumber: "",
      possessionFrom: "",
      possessionTo: "",
      totalFloors: null,
      unitsPerFloor: null,
      builderProjectSubPostInfo: [],
      builderProjectSubPostProperties: [{ propertyImages: [] }],
      builderProjectSubPostVideos: [],
      builderProjectSubPostImages: [],
   });

   const imageFields = [
      { docName: "Floor Plan" },
      { docName: "Hall Images" },
      { docName: "Kitchen Images" },
      { docName: "Bedroom 1 Images" },
      { docName: "Bedroom 2 Images" },
   ];
   const defaultSubpost = ["Tower", "Plotted"];
   const handleTypeChange = (index, value) => {
      setSelectedType((prevTypes) => {
         const updatedTypes = [...prevTypes];
         updatedTypes[index] = value; // Update the selected type for the specific property
         return updatedTypes;
      });

      // Update the state with the new type
      setData((prevState) => {
         const updatedProperties = [...prevState.builderProjectSubPostProperties];
         updatedProperties[index].propertySubType = value; // Update the propertySubType
         return { ...prevState, builderProjectSubPostProperties: updatedProperties };
      });
   };

   useEffect(() => {
      const fetchData = async () => {
         if (!storebuilderProjectSubPostId) {
            setData({}); // Set data to an empty object if ID is not present
            return; // Exit the function early
         }
         try {
            const requestData = {
               builderProjectSubPostId: storebuilderProjectSubPostId,
               builderProjectId: storedBuilderProjectId,
               userId: storedUserId,
            };
            const response = await getBuilderProjectSubPostById(requestData);
            if (response?.data) {
               const { resourceData, error: responseError } = response.data;
               if (resourceData) {
                  const { userId, ...restResourceData } = resourceData; // Omit userId here

                  const filteredUnits = resourceData.builderProjectSubPostProperties.filter(
                     (property) => property.propertySubType && property.propertySubType !== ""
                  );
                  const mappedProperties = filteredUnits.map((property) => {
                     const images = property.propertyImages || []; // Ensure propertyImages is an array
                     return {
                        ...property,
                        propertyImages: images.map((image) => ({
                           ...image,
                           // Ensure each image has the necessary fields
                           docURL: image.docURL || "",
                           builderProjectImageAsBase64: image.builderProjectImageAsBase64 || "",
                        })),
                     };
                  });

                  setData((prevData) => ({
                     ...prevData,
                     ...resourceData,
                     builderProjectId: resourceData.builderProjectId ?? prevData.builderProjectId,
                     builderProjectSubPostId:
                        resourceData.builderProjectSubPostId ?? prevData.builderProjectSubPostId,
                     builderProjectSubPostProperties: mappedProperties,
                  }));
                  const [fromMonth, fromYear] = restResourceData.possessionFrom.split("-");
                  const [toMonth, toYear] = restResourceData.possessionTo.split("-");

                  setMonthYearFrom({
                     month: String(fromMonth).padStart(2, "0"), // Ensure two-digit format
                     year: fromYear, // Year as a string
                  });

                  setMonthYearTo({
                     month: String(toMonth).padStart(2, "0"), // Ensure two-digit format
                     year: toYear, // Year as a string
                  });

                  const initialSelectedTypes = restResourceData.builderProjectSubPostProperties.map(
                     (property) => {
                        if (property.propertySubType === "Independent House / Bungalow") {
                           return "Villas"; // Map to Villas
                        } else {
                           return property.propertySubType || "Villas"; // Default to Villas if not defined
                        }
                     }
                  );
                  setSelectedType(initialSelectedTypes);
               }

               if (resourceData.subPostType === "Tower" || resourceData.subPostType === "Plotted") {
                  setShowMoreUnits(true);
               } else {
                  setShowMoreUnits(false);
               }

               if (responseError) setError(responseError);
            }
         } catch (error) {
            setError(error);
         }
      };

      fetchData();
      return () => {
         localStorage.removeItem("builderProjectSubPostId"); // Remove builderProjectSubPostId when component unmounts
      };
   }, [storedUserId, storedBuilderId, builderProjectSubPostId, builderProjectId]);
   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const sanitizedVideos = data.builderProjectSubPostVideos
            ? data.builderProjectSubPostVideos.filter((video) => video.docName && video.docURL)
            : [];

         const updatedBuilderProjectSubPostProperties = data.builderProjectSubPostProperties.map(
            (property, index) => {
               let propertySubType = "";

               // Use the selectedType specific to this unit (index)
               if (data.subPostType === "Tower") {
                  propertySubType = "Apartment"; // Set propertySubType for "Tower"
               } else if (selectedType[index] === "Villas") {
                  propertySubType = "Independent House / Bungalow";
               } else if (selectedType[index] === "Plot") {
                  propertySubType = "Plot";
               }

               return {
                  ...property,
                  propertySubType,
                  propertyImages: property.propertyImages.filter((image) => image && image.docName), // Filter out null or empty images
               };
            }
         );

         // Prepare submission data
         const submissionData = {
            ...data,
            userId: storedUserId,
            builderProjectId: storedBuilderProjectId,
            builderProjectSubPostVideos: sanitizedVideos, // Only submit valid videos
            builderProjectSubPostProperties: updatedBuilderProjectSubPostProperties,
         };
         console.log("submissionData", submissionData);

         const response = await addBuilderProjectSubPost(submissionData);

         // Handle the response
         if (response?.data) {
            const { resourceData, error: responseError } = response.data;

            if (resourceData) {
               setData((prevData) => ({
                  ...prevData,
                  ...resourceData,
               }));

               // Update the URL to remove any ID if present
               const currentUrl = window.location.pathname;
               const newUrl = currentUrl.replace(/\/\d+$/, ""); // Removes any ID at the end of the URL
               window.history.replaceState({}, "", newUrl);

               // Clear the form fields but retain numeric values
               setData({
                  builderProjectSubPostId: null,
                  builderProjectId: null,
                  subPostType: "",
                  userId: null,
                  builderProjectSubPostName: "",
                  reraNumber: "",
                  areaToDevelop: "", // Retaining as null since it's likely a number
                  areaToDevelopMeasurementUnitEnteredByUser: "",
                  highlightsOrUsp: "",
                  contactPersonName: "",
                  contactPersonNumber: "",
                  possessionFrom: "", // Clear to null (for numbers/dates)
                  possessionTo: "", // Clear to null (for numbers/dates)
                  totalFloors: "", // Clear to null (for numbers)
                  unitsPerFloor: "", // Clear to null (for numbers)
                  builderProjectSubPostInfo: [],
                  builderProjectSubPostProperties: [],
                  builderProjectSubPostVideos: [],
                  builderProjectSubPostImages: [],
               });
               // localStorage.removeItem("builderProjectSubPostId");
               setMonthYearFrom({ month: "", year: "" });
               setMonthYearTo({ month: "", year: "" });
               showSuccessToast("Project created successfully");
            } else if (responseError) {
               setError(responseError);
               console.error("Error in response:", responseError);
            }
         }
      } catch (error) {
         console.error("Error submitting builder project:", error);
         showErrorToast("There was an error submitting the project.");
      } finally {
         // This ensures that localStorage is cleared after form submission
         // localStorage.removeItem("builderProjectSubPostId");
      }
   };

   // const handleAddForm = async () => {
   //    try {
   //       const sanitizedVideos = data.builderProjectSubPostVideos.filter(
   //          (video) => video.docName && video.docURL
   //       );
   //       const submissionData = {
   //          ...data,
   //          userId: getLocalStorage("authData").userid,
   //          builderProjectSubPostVideos: sanitizedVideos, // Ensure only valid videos are submitted
   //       };

   //       console.log("Submission data:", submissionData);

   //       const response = await addBuilderProjectSubPost(submissionData);
   //       console.log("Response:", response);

   //       if (response?.data) {
   //          const { resourceData, error: responseError } = response.data;
   //          if (resourceData) {
   //             setData((prevData) => ({
   //                ...prevData,
   //                ...resourceData,
   //             }));
   //          } else if (responseError) {
   //             setError(responseError);
   //             console.error("Error in response:", responseError);
   //          }
   //          showSuccessToast("Form data saved successfully");
   //          window.location.reload(); // Reloads the page
   //       } else {
   //          throw new Error("Failed to save form data.");
   //       }
   //    } catch (error) {
   //       console.error("Error saving form data:", error);
   //       showErrorToast("Failed to save form data.");
   //    }
   // };
   const handleAddForm = async () => {
      try {
         // Sanitize the videos data
         const sanitizedVideos = data.builderProjectSubPostVideos.filter(
            (video) => video.docName && video.docURL
         );
         const updatedBuilderProjectSubPostProperties = data.builderProjectSubPostProperties.map(
            (property, index) => {
               let propertySubType = "";
               console.log("data.builderProjectSubPostType", data.subPostType);
               // Use the selectedType specific to this unit (index)
               if (data.subPostType === "Tower") {
                  propertySubType = "Apartment"; // Set propertySubType for "Tower"
               } else if (selectedType[index] === "Villas") {
                  propertySubType = "Independent House / Bungalow";
               } else if (selectedType[index] === "Plot") {
                  propertySubType = "Plot";
               }
               return {
                  ...property,
                  propertySubType, // Assign the determined value to propertySubType
               };
            }
         );
         const submissionData = {
            ...data,
            userId: storedUserId,
            builderProjectId: storedBuilderProjectId,
            builderProjectSubPostVideos: sanitizedVideos, // Only submit valid videos
            builderProjectSubPostProperties: updatedBuilderProjectSubPostProperties, // Only valid videos are submitted
         };

         const response = await addBuilderProjectSubPost(submissionData);
         if (response?.data) {
            const { resourceData, error: responseError } = response.data;

            if (resourceData) {
               setData((prevData) => ({
                  ...prevData,
                  ...resourceData,
               }));

               const currentUrl = window.location.pathname;
               const newUrl = currentUrl.replace(/\/\d+$/, ""); // Removes any ID at the end of the URL
               window.history.replaceState({}, "", newUrl);
               localStorage.removeItem("builderProjectSubPostId");

               window.location.reload();
               // Show success notification
               showSuccessToast("Form data saved successfully");
            } else if (responseError) {
               console.error("Error in response:", responseError);
               setError(responseError);
            }
         } else {
            console.error("Failed to save form data. Response:", response);
            throw new Error("Failed to save form data.");
         }
      } catch (error) {
         console.error("Error saving form data:", error);
         showErrorToast("Please complete all required fields");
      }
      return () => {
         localStorage.removeItem("builderProjectSubPostId");
      };
   };

   const deleteBuilderProjectSubPost = async (e) => {
      e.preventDefault();

      try {
         const response = await deleteBuilderProjectSubPostById({
            builderProjectSubPostId: storebuilderProjectSubPostId,
            userId: storedUserId,
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
      } else if (fieldName && propertyIndex !== undefined) {
         setData((prevData) => {
            const updatedProperties = [...prevData.builderProjectSubPostProperties]; // Clone the existing properties
            if (updatedProperties[parseInt(propertyIndex)]) {
               updatedProperties[parseInt(propertyIndex)][fieldName] = value; // Update the specific field in the correct property
            }
            return { ...prevData, builderProjectSubPostProperties: updatedProperties }; // Return the updated state
         });
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
   const handleImageModalShow = (image) => {
      if (image.startsWith("data:image")) {
         // This is a base64 image, set it directly
         setSelectedImageSrc(image);
      } else {
         // It's a URL, prepend the S3 URL base path if necessary
         setSelectedImageSrc(`${CONSTANTS.CONFIG_PROPERTY.s3Url}/${image}`);
      }
      setImageShowModal(true);
   };

   const handleProjectImagesChange = (e) => {
      const files = Array.from(e.target.files);
      const newImages = files.map((file) => {
         const reader = new FileReader();
         reader.onloadend = () => {
            setSelectedImages((prevImages) => [
               ...prevImages,
               {
                  docName: file.name,
                  docDescription: imageCategory,
                  file,
                  builderProjectImageAsBase64: reader.result,
               },
            ]);
         };
         reader.readAsDataURL(file);
         return {
            docName: file.name,
            docDescription: imageCategory,
            file,
         };
      });
      fileInputRef.current.value = "";
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
         builderProjectSubPostImages: prevData.builderProjectSubPostImages
            .filter((image) => image.docDescription === description)
            .filter((_, i) => i !== index) // Remove only the image from the relevant category
            .concat(
               prevData.builderProjectSubPostImages.filter(
                  (image) => image.docDescription !== description
               )
            ), // Keep other categories unchanged
      }));
   };
   const handleDeleteSelectedImage = (indexToDelete, docDescription) => {
      setSelectedImages((prevImages) => {
         const filteredImages = [...prevImages]; // Create a shallow copy of the images array
         const imagesToKeep = filteredImages.filter(
            (image) => image.docDescription === docDescription
         );

         if (imagesToKeep[indexToDelete]) {
            // Remove the image at the specified index for the corresponding docDescription
            filteredImages.splice(
               prevImages.findIndex((image) => image === imagesToKeep[indexToDelete]),
               1
            );
         }

         return filteredImages;
      });
   };

   const clearInput = () => {
      setNewVideoUrl(""); // Clear the input field
   };

   const handleAddVideo = () => {
      if (newVideoUrl) {
         const newVideo = {
            docId: null,
            docName: data.docName || "New Video", // Default video name if none provided
            docDescription: "Description here", // Default description, replace with actual data if needed
            docOrderInFrontendView: (data.builderProjectSubPostVideos?.length || 0) + 1, // Increment order safely
            docURL: newVideoUrl, // The URL for the new video
            builderProjectImageAsBase64: null, // Set default to null
         };
         if (newVideo.docURL) {
            const updatedVideos = [...(data.builderProjectSubPostVideos || []), newVideo];
            setData((prevData) => {
               const updatedVideos = [...(prevData.builderProjectSubPostVideos || [])]; // Ensure it's an array
               updatedVideos.push(newVideo);
               return { ...prevData, builderProjectSubPostVideos: updatedVideos };
            });
            clearInput(); // Clear the input after adding the video
         }
      }
   };

   const handleDeleteVideo = (index) => {
      setData((prevData) => {
         const updatedVideos = prevData.builderProjectSubPostVideos.filter((_, i) => i !== index);
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
      return url.replace("watch?v=", "embed/"); // Example conversion
   };
   const handleFileChange = (e, propertyIndex, docDescription) => {
      const file = e.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            const newImage = {
               builderProjectImageAsBase64: reader.result, // Base64 representation of the file
               docDescription, // Use docDescription to identify the image
               docId: null, // Initialize with null, unless you have an actual ID to assign
               docName: file.name, // Name of the file
               docOrderInFrontendView: null, // Optional: Set if you need specific order
               docURL: "", // Assuming this will remain empty unless there's a specific URL
            };

            setData((prevData) => {
               const updatedProperties = [...prevData.builderProjectSubPostProperties];
               const currentProperty = updatedProperties[propertyIndex];

               // Ensure the propertyImages array exists
               if (!currentProperty.propertyImages) {
                  currentProperty.propertyImages = [];
               }

               // Find the image with the same docDescription
               const existingImageIndex = currentProperty.propertyImages.findIndex(
                  (img) => img.docDescription === docDescription
               );

               if (existingImageIndex !== -1) {
                  // If the image exists, replace it
                  currentProperty.propertyImages[existingImageIndex] = newImage;
               } else {
                  // Otherwise, add the new image
                  currentProperty.propertyImages.push(newImage);
               }

               return {
                  ...prevData,
                  builderProjectSubPostProperties: updatedProperties,
               };
            });
         };
         reader.readAsDataURL(file); // Convert file to Base64
      }
   };

   const handleDeletePropertyImage = (propertyIndex, docDescription) => {
      setData((prevData) => {
         const updatedProperties = [...prevData.builderProjectSubPostProperties];
         const currentProperty = updatedProperties[propertyIndex];

         // Filter out the image with the matching docDescription
         currentProperty.propertyImages = currentProperty.propertyImages.filter(
            (img) => img.docDescription !== docDescription
         );

         return {
            ...prevData,
            builderProjectSubPostProperties: updatedProperties,
         };
      });

      // Reset file input field after deletion
      const fileInput = document.querySelector(`input[name="${docDescription}"]`);
      if (fileInput) {
         fileInput.value = ""; // Reset the file input to allow re-upload
      }
   };

   // const handleDeletePropertyImage = (propertyIndex, imageIndex) => {
   //    setData((prevData) => {
   //       const updatedProperties = [...prevData.builderProjectSubPostProperties];
   //       const propertyImages = [...updatedProperties[propertyIndex].propertyImages];

   //       // Check if the image to be deleted is new or existing
   //       const imageToDelete = propertyImages[imageIndex];

   //       // Only delete the image if it is new or an existing image (handle based on flag or image type)
   //       if (imageToDelete.isNew || (imageIndex >= 0 && imageIndex < propertyImages.length)) {
   //          // Remove the image at the specified index
   //          propertyImages.splice(imageIndex, 1);
   //       }

   //       updatedProperties[propertyIndex].propertyImages = propertyImages;

   //       return {
   //          ...prevData,
   //          builderProjectSubPostProperties: updatedProperties,
   //       };
   //    });
   // };

   const handleSubPostChange = (e) => {
      const value = e.target.value;
      setData((prevData) => ({
         ...prevData,
         subPostType: value,
      }));
   };

   useEffect(() => {
      if (monthYearFrom.month && monthYearFrom.year) {
         setData((prevData) => ({
            ...prevData,
            possessionFrom: `${monthYearFrom.month}-${monthYearFrom.year}`, // Save in the desired format
         }));
      }
   }, [monthYearFrom]);

   useEffect(() => {
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
      if (selectedValue) {
         setData((prevData) => ({
            ...prevData,
            builderProjectSubPostInfo: [...prevData.builderProjectSubPostInfo, selectedValue], // Add the selected value to the existing array
         }));
      }
   };
   const handlePlayVideo = (videoUrl) => {
      setCurrentVideoUrl(videoUrl); // Set the video URL to be displayed
      setShowModal(true); // Open the modal
   };

   const handleRemoveProperty = (index) => {
      const updatedProperties = data.builderProjectSubPostProperties.filter((_, i) => i !== index);
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
      const newUnit = {
         propertyId: null,
         numberOfRooms: null,
         propertyRoomCompositionType: "",
         propertySubType: "",
         totalProjectUnits: null,
         minPlotArea: null,
         maxPlotArea: null,
         plotAreaMeasurementUnitEnteredByUser: "Sq. Mt.",
         minCarpetArea: null,
         maxCarpetArea: null,
         carpetAreaMeasurementUnitEnteredByUser: "Sq. Mt.",
         minBuiltUpArea: null,
         maxBuiltUpArea: null,
         builtUpAreaMeasurementUnitEnteredByUser: "Sq. Mt.",
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
      };

      const newUnitIndex = data.builderProjectSubPostProperties?.length || 0;
      setSelectedType((prevTypes) => {
         const newTypes = [...prevTypes, "Villas"]; // Add a new type to the end of the array
         return newTypes;
      });
      setData((prevState) => ({
         ...prevState,
         builderProjectSubPostProperties: [
            ...(prevState.builderProjectSubPostProperties || []), // Ensure this is an array
            newUnit,
         ],
      }));
      setCurrentUnitIndex((prevIndex) => prevIndex + 1);
   };
   const handleSaveAsDraft = () => {
      localStorage.setItem("draftFormData", JSON.stringify(data));
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
                                       <InputGroup className="customTotalAreaDevelopCon TotalAreaDevelopCon">
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
                                                <option value="Sq. Mt.">Sq. Mt.</option>
                                                <option value="Sq. Ft.">Sq. Ft.</option>
                                                <option value="Sq. Yd..">Sq. Yd.</option>
                                             </Form.Control>
                                          </InputGroup.Append>
                                       </InputGroup>
                                    </Form.Group>
                                 </Col>
                                 <Col lg={4}>
                                    <Form.Group controlId="formTotalFloors">
                                       <Form.Control
                                          type="number"
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
                                          type="number"
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
                                          {data.builderProjectSubPostInfo &&
                                          data.builderProjectSubPostInfo.length > 0 ? (
                                             data.builderProjectSubPostInfo.map(
                                                (amenity, index) => (
                                                   <option key={index} value={amenity}>
                                                      {amenity}
                                                   </option>
                                                )
                                             )
                                          ) : (
                                             <option value="" disabled>
                                                No amenities available
                                             </option>
                                          )}
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
                                             value={monthYearFrom.month} // Preselect the month
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
                                             name="year"
                                             value={monthYearFrom.year} // Preselect the year
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
                                             name="month"
                                             aria-label="Month"
                                             value={monthYearTo.month} // Preselect the month
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
                                             name="year"
                                             value={monthYearTo.year} // Preselect the year
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
                                       {(data?.builderProjectSubPostImages?.length > 0 ||
                                          imagePreviews?.length > 0) && (
                                          <Row className="mt-2">
                                             {/* Combine and map images from both sources */}
                                             {[
                                                ...(data?.builderProjectSubPostImages || []),
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
                                                            src={
                                                               image.docURL
                                                                  ? `${CONSTANTS.CONFIG_PROPERTY.s3Url}/${image.docURL}` // Use docURL if available
                                                                  : image.builderProjectImageAsBase64 // Fallback to base64 if docURL is not available
                                                            }
                                                            alt={
                                                               image.docDescription || image.docName
                                                            } // Use description or name as alt text
                                                            className="img-fluid"
                                                            style={{
                                                               maxWidth: "100px",
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
                                    <Form.Text className="text-muted">
                                       File should be 5MB (max) in png, jpg, etc.
                                    </Form.Text>
                                 </Col>

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
                                                            (image) =>
                                                               image.docDescription === "Interior"
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
                                                                        index,
                                                                        "Interior"
                                                                     )
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
                                                               <span style={{ marginLeft: "13px" }}>
                                                                  {image.docName}
                                                               </span>
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
                                                            (image) =>
                                                               image.docDescription === "Exterior"
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
                                                                        index,
                                                                        "Exterior"
                                                                     )
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
                                                               <span style={{ marginLeft: "13px" }}>
                                                                  {image.docName}
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
                                             {/* Show cross icon only if there is a value in the input */}
                                             {newVideoUrl && ( // Change this line
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
                                             {/* Add video button */}
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
                                             <Row className="video-preview-container d-flex">
                                                {data.builderProjectSubPostVideos.map(
                                                   (video, index) => {
                                                      const embedUrl = getEmbedUrl(video.docURL); // Generate embed URL
                                                      return (
                                                         embedUrl && (
                                                            <div
                                                               className="video-preview"
                                                               style={{
                                                                  position: "relative",
                                                                  display: "inline-block",
                                                                  margin: "10px",
                                                               }}
                                                               key={index} // Add key prop
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
                                                                  onClick={() =>
                                                                     handlePlayVideo(embedUrl)
                                                                  }
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
                                                                     zIndex: 1,
                                                                  }}
                                                               />
                                                            </div>
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

                                 <Modal
                                    show={showModal}
                                    onHide={() => setShowModal(false)}
                                    centered
                                 >
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
                                 data.builderProjectSubPostProperties.map(
                                    (property, propertyIndex) => (
                                       <Row
                                          className="align-items-center m-1 border rounded UnitsForm"
                                          key={propertyIndex}
                                       >
                                          <Col lg={11} className="UnitformContainer">
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
                                                               updatedProperties[propertyIndex] = {
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
                                                               : "" // Set empty string as default value so that dropdown will not auto-select
                                                         }
                                                      >
                                                         {/* Default value when no selection is made */}
                                                         <option value="" disabled>
                                                            Select
                                                         </option>

                                                         {/* Static options */}
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
                                                         value={property.totalProjectUnits || ""}
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
                                                            value={property.minCarpetArea || ""}
                                                            onChange={handleInputChange}
                                                         />
                                                         <InputGroup.Append className="custom-input-group-append">
                                                            <Form.Control
                                                               as="select"
                                                               className="custom-select-size custom-text"
                                                               style={{ borderRadius: "0px" }}
                                                               name={`carpetAreaMeasurementUnitEnteredByUser_${propertyIndex}`}
                                                               value={
                                                                  property.carpetAreaMeasurementUnitEnteredByUser
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
                                                               <option value="Sq. Mt.">
                                                                  Sq. Mt.
                                                               </option>
                                                               <option value="Sq. Ft.">
                                                                  Sq. Ft.
                                                               </option>
                                                               <option value="Sq. Yd..">
                                                                  Sq. Yd.
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
                                                            value={property.maxCarpetArea || ""}
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
                                                                  property.plotAreaMeasurementUnitEnteredByUser
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
                                                               <option value="Sq. Mt.">
                                                                  Sq. Mt.
                                                               </option>
                                                               <option value="Sq. Ft.">
                                                                  Sq. Ft.
                                                               </option>
                                                               <option value="Sq. Yd.">
                                                                  Sq. Yd.
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
                                                            value={property.minPrice || ""}
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
                                                            value={property.maxPrice || ""}
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
                                                                     field.docName
                                                                  )
                                                               }
                                                            />
                                                            <Form.File.Label>
                                                               <TiCameraOutline className="mr-2" />{" "}
                                                               Browse
                                                            </Form.File.Label>
                                                         </Form.File>

                                                         {/* Check if property.propertyImages exists and map images based on docDescription */}
                                                         {property.propertyImages &&
                                                         property.propertyImages.length > 0 ? (
                                                            property.propertyImages
                                                               .filter(
                                                                  (image) =>
                                                                     image.docDescription ===
                                                                     field.docName
                                                               ) // Filter images by docDescription
                                                               .map((image, imgIndex) => (
                                                                  <div
                                                                     key={imgIndex}
                                                                     className="d-flex align-items-center"
                                                                  >
                                                                     <RxCross2
                                                                        className="delete-icon ml-2 text-danger"
                                                                        style={{
                                                                           cursor: "pointer",
                                                                        }}
                                                                        onClick={() =>
                                                                           handleDeletePropertyImage(
                                                                              propertyIndex,
                                                                              image.docDescription
                                                                           )
                                                                        } // Pass both indices
                                                                     />
                                                                     <span
                                                                        style={{
                                                                           fontSize: "12px",
                                                                           fontWeight: 400,
                                                                           lineHeight: "16.39px",
                                                                           letterSpacing: "-0.02em",
                                                                           textAlign: "left",
                                                                           cursor: "pointer",
                                                                        }}
                                                                        onClick={() => {
                                                                           // Set the selected image source
                                                                           if (
                                                                              image.builderProjectImageAsBase64
                                                                           ) {
                                                                              setSelectedImageSrc(
                                                                                 image.builderProjectImageAsBase64
                                                                              );
                                                                           } else {
                                                                              setSelectedImageSrc(
                                                                                 `${CONSTANTS.CONFIG_PROPERTY.s3Url}/${image.docURL}`
                                                                              );
                                                                           }
                                                                           setImageShowModal(true); // Open the modal
                                                                        }} // Open modal on click
                                                                     >
                                                                        {image.docName}
                                                                     </span>
                                                                  </div>
                                                               ))
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

                                                <Modal
                                                   show={showImageModal}
                                                   onHide={() => setImageShowModal(false)}
                                                   centered
                                                >
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

                                                <Col md={12} className="mt-3">
                                                   <Form.Group controlId="comments">
                                                      <Form.Control
                                                         type="text"
                                                         placeholder="Comments"
                                                         name={`comments_${propertyIndex}`}
                                                         value={property.comments || ""}
                                                         onChange={handleInputChange}
                                                      />
                                                   </Form.Group>
                                                </Col>
                                             </Row>
                                          </Col>

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
                                    )
                                 )}

                              {data.subPostType === "Plotted" && showMoreUnits && (
                                 <Row>
                                    {data.builderProjectSubPostProperties.map(
                                       (property, propertyIndex) => (
                                          <Row
                                             key={propertyIndex}
                                             className="align-items-center m-1 border rounded UnitsForm"
                                          >
                                             <div className="UnitformContainer1">
                                                <div className="mb-3 flex-container1">
                                                   <div className="flex-item">
                                                      <Form.Group
                                                         controlId={`formselectConfiguration-${propertyIndex}`}
                                                      >
                                                         <label>Configuration</label>
                                                         <Form.Control
                                                            as="select"
                                                            value={
                                                               selectedType[propertyIndex] ||
                                                               "Villas"
                                                            } // Use selectedType for the current unit
                                                            onChange={(e) =>
                                                               handleTypeChange(
                                                                  propertyIndex,
                                                                  e.target.value
                                                               )
                                                            }
                                                         >
                                                            <option value="Villas">Villas</option>
                                                            <option value="Plot">Plot</option>
                                                         </Form.Control>
                                                      </Form.Group>
                                                   </div>
                                                   {selectedType[propertyIndex] === "Villas" && (
                                                      <>
                                                         <div className="flex-item">
                                                            <Form.Group controlId="configuration">
                                                               <label>BHK</label>
                                                               <Form.Control
                                                                  as="select"
                                                                  name={`numberOfRooms_${propertyIndex}`}
                                                                  className="custom-select-size"
                                                                  onChange={(e) => {
                                                                     const [
                                                                        rooms,
                                                                        compositionType,
                                                                     ] = e.target.value.split(" "); // Split value into numberOfRooms and propertyRoomCompositionType

                                                                     setData((prevData) => {
                                                                        const updatedProperties = [
                                                                           ...prevData.builderProjectSubPostProperties,
                                                                        ];
                                                                        updatedProperties[
                                                                           propertyIndex
                                                                        ] = {
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
                                                                        : "" // Set empty string as default value so that dropdown will not auto-select
                                                                  }
                                                               >
                                                                  {/* Default value when no selection is made */}
                                                                  <option value="" disabled>
                                                                     Select
                                                                  </option>

                                                                  {/* Static options */}
                                                                  <option value="3 BHK">
                                                                     3 BHK
                                                                  </option>
                                                                  <option value="4 BHK">
                                                                     4 BHK
                                                                  </option>
                                                                  <option value="6 BHK">
                                                                     6 BHK
                                                                  </option>
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
                                                                     property.totalProjectUnits ||
                                                                     ""
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
                                                                     name={`minBuiltUpArea_${propertyIndex}`}
                                                                     value={
                                                                        property.minBuiltUpArea ||
                                                                        ""
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
                                                                           property.builtUpAreaMeasurementUnitEnteredByUser
                                                                        }
                                                                        onChange={(e) => {
                                                                           setData((prevData) => {
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
                                                                           });
                                                                        }}
                                                                     >
                                                                        <option value="Sq. Mt.">
                                                                           Sq. Mt.
                                                                        </option>
                                                                        <option value="Sq. Ft.">
                                                                           Sq. Ft.
                                                                        </option>
                                                                        <option value="Sq. Yd.">
                                                                           Sq. Yd.
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
                                                                     name={`maxBuiltUpArea_${propertyIndex}`}
                                                                     value={
                                                                        property.maxBuiltUpArea ||
                                                                        ""
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
                                                                           property.builtUpAreaMeasurementUnitEnteredByUser
                                                                        }
                                                                        onChange={(e) => {
                                                                           // Update the state with the selected unit
                                                                           setData((prevData) => ({
                                                                              ...prevData,
                                                                              builtUpAreaMeasurementUnitEnteredByUser:
                                                                                 e.target.value,
                                                                           }));
                                                                        }}
                                                                     >
                                                                        <option value="Sq. Mt.">
                                                                           Sq. Mt.
                                                                        </option>
                                                                        <option value="Sq. Ft.">
                                                                           Sq. Ft.
                                                                        </option>
                                                                        <option value="Sq. Yd.">
                                                                           Sq. Yd.
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
                                                                     name={`minPlotArea_${propertyIndex}`}
                                                                     value={
                                                                        property.minPlotArea || ""
                                                                     }
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
                                                                           property.plotAreaMeasurementUnitEnteredByUser
                                                                        }
                                                                        onChange={(e) => {
                                                                           // Update the state with the selected unit
                                                                           setData((prevData) => ({
                                                                              ...prevData,
                                                                              plotAreaMeasurementUnitEnteredByUser:
                                                                                 e.target.value,
                                                                           }));
                                                                        }}
                                                                     >
                                                                        <option value="Sq. Mt.">
                                                                           Sq. Mt.
                                                                        </option>
                                                                        <option value="Sq. Ft.">
                                                                           Sq. Ft.
                                                                        </option>
                                                                        <option value="Sq. Yd.">
                                                                           Sq. Yd.
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
                                                                     name={`maxPlotArea_${propertyIndex}`}
                                                                     value={
                                                                        property.maxPlotArea || ""
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
                                                                        name="plotAreaMeasurementUnitEnteredByUser"
                                                                        value={
                                                                           property.plotAreaMeasurementUnitEnteredByUser
                                                                        }
                                                                        onChange={(e) => {
                                                                           // Update the state with the selected unit
                                                                           setData((prevData) => ({
                                                                              ...prevData,
                                                                              plotAreaMeasurementUnitEnteredByUser:
                                                                                 e.target.value,
                                                                           }));
                                                                        }}
                                                                     >
                                                                        <option value="Sq. Mt.">
                                                                           Sq. Mt.
                                                                        </option>
                                                                        <option value="Sq. Ft.">
                                                                           Sq. Ft.
                                                                        </option>
                                                                        <option value="Sq. Yd.">
                                                                           Sq. Yd.
                                                                        </option>
                                                                     </Form.Control>
                                                                  </InputGroup.Append>
                                                               </InputGroup>
                                                            </Form.Group>
                                                         </div>
                                                         <div className="flex-item">
                                                            <Form.Group controlId="sizeTo">
                                                               <label>Price Min</label>
                                                               <InputGroup>
                                                                  <Form.Control
                                                                     type="text"
                                                                     placeholder="Enter"
                                                                     name={`minPrice_${propertyIndex}`}
                                                                     value={property.minPrice || ""}
                                                                     onChange={handleInputChange}
                                                                  />
                                                               </InputGroup>
                                                            </Form.Group>
                                                         </div>
                                                         <div className="flex-item">
                                                            <Form.Group controlId="sizeTo">
                                                               <label>Price Max</label>
                                                               <InputGroup>
                                                                  <Form.Control
                                                                     type="text"
                                                                     placeholder="Enter"
                                                                     name={`maxPrice_${propertyIndex}`}
                                                                     value={property.maxPrice || ""}
                                                                     onChange={handleInputChange}
                                                                  />
                                                               </InputGroup>
                                                            </Form.Group>
                                                         </div>
                                                         <div className="flex-item"></div>
                                                         {imageFields.map((field, index) => (
                                                            <div className="flex-item" key={index}>
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
                                                                              field.docName
                                                                           )
                                                                        }
                                                                     />
                                                                     <Form.File.Label>
                                                                        <TiCameraOutline className="mr-2" />{" "}
                                                                        Browse
                                                                     </Form.File.Label>
                                                                  </Form.File>

                                                                  {/* Check if property.propertyImages exists and map images based on docDescription */}
                                                                  {property.propertyImages &&
                                                                  property.propertyImages.length >
                                                                     0 ? (
                                                                     property.propertyImages
                                                                        .filter(
                                                                           (image) =>
                                                                              image.docDescription ===
                                                                              field.docName
                                                                        ) // Filter images by docDescription
                                                                        .map((image, imgIndex) => (
                                                                           <div
                                                                              key={imgIndex}
                                                                              className="d-flex align-items-center"
                                                                           >
                                                                              <RxCross2
                                                                                 className="delete-icon ml-2 text-danger"
                                                                                 style={{
                                                                                    cursor:
                                                                                       "pointer",
                                                                                 }}
                                                                                 onClick={() =>
                                                                                    handleDeletePropertyImage(
                                                                                       propertyIndex,
                                                                                       image.docDescription
                                                                                    )
                                                                                 } // Pass both indices
                                                                              />
                                                                              <span
                                                                                 style={{
                                                                                    fontSize:
                                                                                       "12px",
                                                                                    fontWeight: 400,
                                                                                    lineHeight:
                                                                                       "16.39px",
                                                                                    letterSpacing:
                                                                                       "-0.02em",
                                                                                    textAlign:
                                                                                       "left",
                                                                                 }}
                                                                              >
                                                                                 {image.docName}
                                                                              </span>
                                                                           </div>
                                                                        ))
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
                                                            </div>
                                                         ))}

                                                         {/* Image Modal */}
                                                         <Modal
                                                            show={showImageModal}
                                                            onHide={() => setImageShowModal(false)}
                                                            centered
                                                         >
                                                            <Modal.Body
                                                               style={{ position: "relative" }}
                                                            >
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
                                                                  onClick={() =>
                                                                     setImageShowModal(false)
                                                                  }
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
                                                                     alt={
                                                                        selectedImageSrc
                                                                           ? "Image"
                                                                           : ""
                                                                     }
                                                                     className="img-fluid"
                                                                  />
                                                               )}
                                                            </Modal.Body>
                                                         </Modal>
                                                         <div className="flex-item comment-conta">
                                                            <Form.Group controlId="comments">
                                                               <Form.Control
                                                                  type="text"
                                                                  placeholder="Comments"
                                                                  name={`comments_${propertyIndex}`}
                                                                  value={property.comments || ""}
                                                                  onChange={handleInputChange}
                                                               />
                                                            </Form.Group>
                                                         </div>
                                                      </>
                                                   )}
                                                   {selectedType[propertyIndex] === "Plot" && (
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
                                                                     property.totalProjectUnits ||
                                                                     ""
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
                                                                     name={`minPlotArea_${propertyIndex}`}
                                                                     value={
                                                                        property.minPlotArea || ""
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
                                                                        name={`plotAreaMeasurementUnitEnteredByUser _${propertyIndex}`}
                                                                        value={
                                                                           property.plotAreaMeasurementUnitEnteredByUser
                                                                        }
                                                                        onChange={(e) => {
                                                                           setData((prevData) => {
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
                                                                           });
                                                                        }}
                                                                     >
                                                                        <option value="Sq. Mt.">
                                                                           Sq. Mt.
                                                                        </option>
                                                                        <option value="Sq. Ft.">
                                                                           Sq. Ft.
                                                                        </option>
                                                                        <option value="Sq. Yd.">
                                                                           Sq. Yd.
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
                                                                     name={`maxPlotArea_${propertyIndex}`}
                                                                     value={
                                                                        property.maxPlotArea || ""
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
                                                                        name={`plotAreaMeasurementUnitEnteredByUser _${propertyIndex}`}
                                                                        value={
                                                                           property.plotAreaMeasurementUnitEnteredByUser
                                                                        }
                                                                        onChange={(e) => {
                                                                           setData((prevData) => {
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
                                                                           });
                                                                        }}
                                                                     >
                                                                        <option value="Sq. Mt.">
                                                                           Sq. Mt.
                                                                        </option>
                                                                        <option value="Sq. Ft.">
                                                                           Sq. Ft.
                                                                        </option>
                                                                        <option value="Sq. Yd.">
                                                                           Sq. Yd.
                                                                        </option>
                                                                     </Form.Control>
                                                                  </InputGroup.Append>
                                                               </InputGroup>
                                                            </Form.Group>
                                                         </div>
                                                         <div className="flex-item"></div>

                                                         {imageFields.map((field, index) => (
                                                            <Col key={index}>
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
                                                                              field.docName
                                                                           )
                                                                        }
                                                                     />
                                                                     <Form.File.Label>
                                                                        <TiCameraOutline className="mr-2" />{" "}
                                                                        Browse
                                                                     </Form.File.Label>
                                                                  </Form.File>

                                                                  {/* Check if property.propertyImages exists and map images based on docDescription */}
                                                                  {property.propertyImages &&
                                                                  property.propertyImages.length >
                                                                     0 ? (
                                                                     property.propertyImages
                                                                        .filter(
                                                                           (image) =>
                                                                              image.docDescription ===
                                                                              field.docName
                                                                        ) // Filter images by docDescription
                                                                        .map((image, imgIndex) => (
                                                                           <div
                                                                              key={imgIndex}
                                                                              className="d-flex align-items-center"
                                                                           >
                                                                              <RxCross2
                                                                                 className="delete-icon ml-2 text-danger"
                                                                                 style={{
                                                                                    cursor:
                                                                                       "pointer",
                                                                                 }}
                                                                                 onClick={() =>
                                                                                    handleDeletePropertyImage(
                                                                                       propertyIndex,
                                                                                       image.docDescription
                                                                                    )
                                                                                 } // Pass both indices
                                                                              />
                                                                              <span
                                                                                 style={{
                                                                                    fontSize:
                                                                                       "12px",
                                                                                    fontWeight: 400,
                                                                                    lineHeight:
                                                                                       "16.39px",
                                                                                    letterSpacing:
                                                                                       "-0.02em",
                                                                                    textAlign:
                                                                                       "left",
                                                                                 }}
                                                                              >
                                                                                 {image.docName}
                                                                              </span>
                                                                           </div>
                                                                        ))
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

                                                         {/* Image Modal */}
                                                         <Modal
                                                            show={showImageModal}
                                                            onHide={() => setImageShowModal(false)}
                                                            centered
                                                         >
                                                            <Modal.Body
                                                               style={{ position: "relative" }}
                                                            >
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
                                                                  onClick={() =>
                                                                     setImageShowModal(false)
                                                                  }
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
                                                                     alt={
                                                                        selectedImageSrc
                                                                           ? "Image"
                                                                           : ""
                                                                     }
                                                                     className="img-fluid"
                                                                  />
                                                               )}
                                                            </Modal.Body>
                                                         </Modal>
                                                         <div className="flex-item comment-conta">
                                                            <Form.Group controlId="comments">
                                                               <Form.Control
                                                                  type="text"
                                                                  placeholder="Comments"
                                                                  name={`comments_${propertyIndex}`}
                                                                  value={property.comments || ""}
                                                                  onChange={handleInputChange}
                                                               />
                                                            </Form.Group>
                                                         </div>
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
                              )}
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
                              onClick={handleAddForm} // Bind this function to handle the click
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
