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
import { useParams } from "react-router-dom";
import { TiCameraOutline } from "react-icons/ti";
import { TiTimes } from "react-icons/ti";
import { IoIosAdd } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { Range } from "react-range"; // You may need to install this package
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
const ProjectDetails = (props) => {
   // const builderProjectId = localStorage.getItem("builderProjectId"); // Retrieve ID
   const [show, setShow] = useState(false);
   const [imageCategory, setImageCategory] = useState("Interior");
   const [selectedImages, setSelectedImages] = useState([]); // Images selected in the modal
   const [imagePreviews, setImagePreviews] = useState([]); // Images to display on the page
   const fileInputRef = useRef(null);
   const [monthYearFrom, setMonthYearFrom] = useState({ month: "", year: "" });
   const [monthYearTo, setMonthYearTo] = useState({ month: "", year: "" });
   const currentYear = new Date().getFullYear();
   const [builderProjectSubPostId, setBuilderProjectSubPostId] = useState(null);
   const [userId, setUserId] = useState(null);
   const [builderProjectId, setBuilderProjectId] = useState(null);

   const [error, setError] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [currentVideoUrl, setCurrentVideoUrl] = useState("");
   const [towerRows, setTowerRows] = useState([]);
   const [plottedRows, setPlottedRows] = useState([]);
   const [formCount, setFormCount] = useState(1); // Start with one form
   const [newVideoUrl, setNewVideoUrl] = useState(null);
   const [showMoreUnits, setShowMoreUnits] = useState(false);
   const [currentUnitIndex, setCurrentUnitIndex] = useState(0);

   const defaultSubpost = ["Tower", "Plotted"];
   const auth = getLocalStorage("authData");
   const storedUserId = auth.userid;
   const storedBuilderId = auth.builderId;
   const storedBuilderProjectId = localStorage.getItem("builderProjectId");
   const storebuilderProjectSubPostId = localStorage.getItem("builderProjectSubPostId");
   console.log("storedUserId", storedUserId);
   console.log("storebuilderProjectSubPostId", storebuilderProjectSubPostId);
   const [data, setData] = useState({
      builderProjectSubPostId: null,
      builderProjectId: localStorage.getItem("builderProjectId"),
      subPostType: "",
      userId: auth.userid,
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
      builderProjectSubPostProperties: [
         // {
         //    propertyId: null,
         //    numberOfRooms: null,
         //    propertyRoomCompositionType: "",
         //    propertySubType: "",
         //    totalProjectUnits: null,
         //    minPlotArea: null,
         //    maxPlotArea: null,
         //    plotAreaMeasurementUnitEnteredByUser: "Sq. Mt.",
         //    minCarpetArea: null,
         //    maxCarpetArea: null,
         //    carpetAreaMeasurementUnitEnteredByUser: "Sq. Mt.",
         //    minBuiltUpArea: null,
         //    maxBuiltUpArea: null,
         //    builtUpAreaMeasurementUnitEnteredByUser: "Sq. Mt.",
         //    comments: "",
         //    minPrice: null,
         //    maxPrice: null,
         //    propertyVideos: [
         //       {
         //          docId: null,
         //          docName: "",
         //          docURL: "",
         //          docOrderInFrontendView: null,
         //          docDescription: "",
         //          builderProjectImageAsBase64: null,
         //       },
         //    ],
         //    propertyImages: [
         //       {
         //          docId: null,
         //          docName: "",
         //          docURL: "",
         //          docOrderInFrontendView: 2,
         //          docDescription: "",
         //          builderProjectImageAsBase64: "",
         //       },
         //    ],
         // },
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
         // {
         //    docId: null,
         //    docName: "",
         //    docURL: "",
         //    docOrderInFrontendView: null,
         //    docDescription: "",
         //    builderProjectImageAsBase64: "",
         // },
      ],
   });
   const step = 1; // Step size of 10L
   // const min
   // const [priceRanges, setPriceRanges] = useState(
   //    data.builderProjectSubPostProperties.map((property) => [property.minPrice, property.maxPrice])
   // );
   const [selectedType, setSelectedType] = useState("Villas");

   // useEffect(() => {
   //    if (data.builderProjectSubPostProperties && data.builderProjectSubPostProperties.length > 0) {
   //       const villasData = data.builderProjectSubPostProperties.filter(
   //          (item) => item.propertySubType === "Villas"
   //       );
   //       const plotsData = data.builderProjectSubPostProperties.filter(
   //          (item) => item.propertySubType === "Plots"
   //       );

   //       if (villasData.length > 0) {
   //          setSelectedType("Villas");
   //       } else if (plotsData.length > 0) {
   //          setSelectedType("Plots");
   //       }
   //    }
   // }, [data.builderProjectSubPostProperties]);

   const imageFields = [
      { docName: "Floor Plan" },
      { docName: "Hall Images" },
      { docName: "Kitchen Images" },
      { docName: "Bedroom 1 Images" },
      { docName: "Bedroom 2 Images" },
   ];
   console.log("storebuilderProjectSubPostId", storebuilderProjectSubPostId);
   useEffect(() => {
      const fetchData = async () => {
         if (storebuilderProjectSubPostId != null) {
            try {
               const response = await getBuilderProjectSubPostById({
                  builderProjectSubPostId: storebuilderProjectSubPostId,
                  userId: storedUserId,
                  builderProjectId: storedBuilderProjectId,
               });

               if (response?.data) {
                  const { resourceData, error: responseError } = response.data;

                  if (resourceData) {
                     setData((prevData) => ({
                        ...prevData,
                        ...resourceData,
                        builderProjectId:
                           resourceData.builderProjectId ?? prevData.builderProjectId,
                        builderProjectSubPostId:
                           resourceData.builderProjectSubPostId ?? prevData.builderProjectSubPostId,
                        userId: resourceData.userId ?? prevData.userId,
                        builderId: resourceData.builderId ?? prevData.builderId,
                     }));
                     console.log("response.data", resourceData);
                  }

                  if (
                     resourceData.subPostType === "Tower" ||
                     resourceData.subPostType === "Plotted"
                  ) {
                     setShowMoreUnits(true);
                  } else {
                     setShowMoreUnits(false);
                  }

                  if (responseError) setError(responseError);
               }
            } catch (error) {
               setError(error);
               console.log("Error fetching builder data:", error);
            }
         } else {
            // Clear data if no builderProjectSubPostId is present
            localStorage.removeItem("builderProjectSubPostId");

            setData({});
            // Remove builderProjectSubPostId from localStorage
         }
      };

      fetchData();
   }, [storedUserId, storedBuilderId, builderProjectSubPostId, builderProjectId]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const sanitizedVideos = data.builderProjectSubPostVideos.filter(
            (video) => video.docName && video.docURL
         );
         const updatedBuilderProjectSubPostProperties = data.builderProjectSubPostProperties.map(
            (property) => ({
               ...property,
               selectedPropertyType: selectedType, // Add selectedType to each property object
            })
         );

         console.log(
            "updatedBuilderProjectSubPostProperties",
            updatedBuilderProjectSubPostProperties
         );
         const submissionData = {
            ...data,
            userId: getLocalStorage("authData").userid,
            builderProjectId: storedBuilderProjectId,
            builderProjectSubPostVideos: sanitizedVideos, // Only submit valid videos
            builderProjectSubPostProperties: updatedBuilderProjectSubPostProperties, // Add the updated properties array
         };
         const response = await addBuilderProjectSubPost(submissionData);
         console.log("Submission Data:", submissionData);
         console.log("API Response:", response);
         if (response?.data) {
            const { resourceData, error: responseError } = response.data;
            console.log("Resource Data:", resourceData);
            if (resourceData) {
               setData((prevData) => ({
                  ...prevData,
                  ...resourceData,
               }));
               localStorage.removeItem("builderProjectSubPostId");
            } else if (responseError) {
               setError(responseError);
               console.error("Error in response:", responseError);
            }
            showSuccessToast("Project created successfully");
            console.log("storebuilderProjectSubPostId", storebuilderProjectSubPostId);
         }
      } catch (error) {
         console.error("Error submitting builder project:", error);
         // console.log("API Response:", response);
         showErrorToast("There was an error submitting the project.");
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

         // Prepare the submission data
         const submissionData = {
            ...data,
            userId: getLocalStorage("authData").userid,
            builderProjectSubPostVideos: sanitizedVideos, // Only valid videos are submitted
         };

         console.log("Submission data:", submissionData);

         // Submit the form data to the backend
         const response = await addBuilderProjectSubPost(submissionData);
         console.log("Response:", response);

         if (response?.data) {
            const { resourceData, error: responseError } = response.data;

            if (resourceData) {
               console.log("Resource data:", resourceData);

               // Clear the form fields immediately
               setData({
                  builderProjectSubPostId: null,
                  builderProjectId: null,
                  subPostType: "",
                  userId: null,
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
                  builderProjectSubPostProperties: [
                     {
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
                     },
                  ],
                  builderProjectSubPostVideos: [],
                  builderProjectSubPostImages: [],
               });

               setBuilderProjectSubPostId(null);
               setBuilderProjectId(null);
               setUserId(null);

               // Clear URL ID and remove form data from the URL
               const currentUrl = window.location.pathname;
               const newUrl = currentUrl.replace(/\/\d+$/, ""); // Removes any ID at the end of the URL
               window.history.replaceState({}, "", newUrl);
               localStorage.removeItem("builderProjectSubPostId");
               // Reload the page
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
         showErrorToast("Failed to save form data.");
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

   const handleDeleteProjectImage = (imageToDelete) => {
      setData((prevData) => ({
         ...prevData,
         builderProjectSubPostImages: prevData.builderProjectSubPostImages.filter(
            (image) => image !== imageToDelete
         ),
      }));

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
      // Ensure that newVideoUrl exists and is not an empty string
      if (newVideoUrl) {
         // Initialize new video object with the necessary properties
         const newVideo = {
            docId: null,
            docName: data.docName || "New Video", // Default video name if none provided
            docDescription: "Description here", // Default description, replace with actual data if needed
            docOrderInFrontendView: (data.builderProjectSubPostVideos?.length || 0) + 1, // Increment order safely
            docURL: newVideoUrl, // The URL for the new video
            builderProjectImageAsBase64: null, // Set default to null
         };

         // Only proceed if the video URL is valid
         if (newVideo.docURL) {
            // Update the list of videos, ensuring builderProjectSubPostVideos is an array
            const updatedVideos = [...(data.builderProjectSubPostVideos || []), newVideo];

            // Update the state with the new video list
            setData((prevData) => ({
               ...prevData,
               builderProjectSubPostVideos: updatedVideos, // Ensure this is always an array
            }));

            // Clear the input field after adding the video
            setNewVideoUrl("");
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

      // Add other video platforms as needed

      return url.replace("watch?v=", "embed/"); // Example conversion
   };
   const handleFileChange = (e, propertyIndex, imageIndex) => {
      const file = e.target.files[0];
      const fieldName = e.target.name; // Get the name from the input field
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            const newImage = {
               builderProjectImageAsBase64: reader.result, // Base64 representation of the file
               docDescription: fieldName, // You can initialize this with an empty string
               docId: null, // Initialize with null, unless you have an actual ID to assign
               docName: file.name, // Name of the file
               docOrderInFrontendView: imageIndex + 1, // The order of the image
               docURL: "", // Assuming this will remain empty unless there's a specific URL
            };
            setData((prevData) => {
               const updatedProperties = [...prevData.builderProjectSubPostProperties];
               if (!updatedProperties[propertyIndex].propertyImages) {
                  updatedProperties[propertyIndex].propertyImages = [];
               }
               updatedProperties[propertyIndex].propertyImages[imageIndex] = newImage;
               return {
                  ...prevData,
                  builderProjectSubPostProperties: updatedProperties,
               };
            });
         };
         reader.readAsDataURL(file); // Convert file to Base64
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
   // const handleAddMoreUnit = () => {
   //    if (data.subPostType === "Tower") {
   //       let tow = towerRows;
   //       tow.push({
   //          propertyId: null,
   //          numberOfRooms: null,
   //          propertyRoomCompositionType: "",
   //          propertySubType: "",
   //          totalProjectUnits: null,
   //          minPlotArea: null,
   //          maxPlotArea: null,
   //          plotAreaMeasurementUnitEnteredBy: "Sq. Mt.",
   //          minCarpetArea: null,
   //          maxCarpetArea: null,
   //          carpetAreaMeasurementUnitEnteredBy: "Sq. Mt.",
   //          minBuiltUpArea: null,
   //          maxBuiltUpArea: null,
   //          builtUpAreaMeasurementUnitEnteredBy: "Sq. Mt.",
   //          comments: "",
   //          minPrice: null,
   //          maxPrice: null,

   //          propertyVideos: [
   //             {
   //                docId: null,
   //                docName: "",
   //                docURL: "",
   //                docOrderInFrontendView: null,
   //                docDescription: "",
   //                builderProjectImageAsBase64: null,
   //             },
   //          ],
   //          propertyImages: [
   //             {
   //                docId: null,
   //                docName: "",
   //                docURL: "",
   //                docOrderInFrontendView: 2,
   //                docDescription: "",
   //                builderProjectImageAsBase64: "",
   //             },
   //          ],
   //       });
   //       setTowerRows(tow);
   //       setData((prevState) => ({
   //          ...prevState,
   //          builderProjectSubPostProperties: tow,
   //       }));
   //    } else if (data.subPostType === "Plotted") {
   //       let tow = towerRows;
   //       tow.push({
   //          propertyId: null,
   //          numberOfRooms: null,
   //          propertyRoomCompositionType: "",
   //          propertySubType: "",
   //          totalProjectUnits: null,
   //          minPlotArea: null,
   //          maxPlotArea: null,
   //          plotAreaMeasurementUnitEnteredBy: "Sq. Mt.",
   //          minCarpetArea: null,
   //          maxCarpetArea: null,
   //          carpetAreaMeasurementUnitEnteredBy: "Sq. Mt.",
   //          minBuiltUpArea: null,
   //          maxBuiltUpArea: null,
   //          builtUpAreaMeasurementUnitEnteredBy: "Sq. Mt.",
   //          comments: "",
   //          minPrice: null,
   //          maxPrice: null,

   //          propertyVideos: [
   //             {
   //                docId: null,
   //                docName: "",
   //                docURL: "",
   //                docOrderInFrontendView: null,
   //                docDescription: "",
   //                builderProjectImageAsBase64: null,
   //             },
   //          ],
   //          propertyImages: [
   //             {
   //                docId: null,
   //                docName: "",
   //                docURL: "",
   //                docOrderInFrontendView: 2,
   //                docDescription: "",
   //                builderProjectImageAsBase64: "",
   //             },
   //          ],
   //       });
   //       setTowerRows(tow);
   //       setData((prevState) => ({
   //          ...prevState,
   //          builderProjectSubPostProperties: tow,
   //       }));
   //    }
   // };
   // const handleAddMoreUnit = () => {
   //    if (data.subPostType === "Tower") {
   //       setData((prevState) => ({
   //          ...prevState,
   //          builderProjectSubPostProperties: [
   //             ...prevState.builderProjectSubPostProperties,
   //             {
   //                propertyId: null,
   //                numberOfRooms: null,
   //                propertyRoomCompositionType: "",
   //                propertySubType: "",
   //                totalProjectUnits: null,
   //                minPlotArea: null,
   //                maxPlotArea: null,
   //                plotAreaMeasurementUnitEnteredByUser: "Sq. Mt.",
   //                minCarpetArea: null,
   //                maxCarpetArea: null,
   //                carpetAreaMeasurementUnitEnteredByUser: "Sq. Mt.",
   //                minBuiltUpArea: null,
   //                maxBuiltUpArea: null,
   //                builtUpAreaMeasurementUnitEnteredByUser: "Sq. Mt.",
   //                comments: "",
   //                minPrice: null,
   //                maxPrice: null,

   //                propertyVideos: [
   //                   {
   //                      docId: null,
   //                      docName: "",
   //                      docURL: "",
   //                      docOrderInFrontendView: null,
   //                      docDescription: "",
   //                      builderProjectImageAsBase64: null,
   //                   },
   //                ],
   //                propertyImages: [
   //                   {
   //                      docId: null,
   //                      docName: "",
   //                      docURL: "",
   //                      docOrderInFrontendView: 2,
   //                      docDescription: "",
   //                      builderProjectImageAsBase64: "",
   //                   },
   //                ],
   //             },
   //          ],
   //       }));
   //    } else if (data.subPostType === "Plotted") {
   //       setData((prevState) => ({
   //          ...prevState,
   //          builderProjectSubPostProperties: [
   //             ...prevState.builderProjectSubPostProperties,
   //             {
   //                propertyId: null,
   //                numberOfRooms: null,
   //                propertyRoomCompositionType: "",
   //                propertySubType: "",
   //                totalProjectUnits: null,
   //                minPlotArea: null,
   //                maxPlotArea: null,
   //                plotAreaMeasurementUnitEnteredByUser: "Sq. Mt.",
   //                minCarpetArea: null,
   //                maxCarpetArea: null,
   //                carpetAreaMeasurementUnitEnteredByUser: "Sq. Mt.",
   //                minBuiltUpArea: null,
   //                maxBuiltUpArea: null,
   //                builtUpAreaMeasurementUnitEnteredByUser: "Sq. Mt.",
   //                comments: "",
   //                minPrice: null,
   //                maxPrice: null,

   //                propertyVideos: [
   //                   {
   //                      docId: null,
   //                      docName: "",
   //                      docURL: "",
   //                      docOrderInFrontendView: null,
   //                      docDescription: "",
   //                      builderProjectImageAsBase64: null,
   //                   },
   //                ],
   //                propertyImages: [
   //                   {
   //                      docId: null,
   //                      docName: "",
   //                      docURL: "",
   //                      docOrderInFrontendView: 2,
   //                      docDescription: "",
   //                      builderProjectImageAsBase64: "",
   //                   },
   //                ],
   //             },
   //          ],
   //       }));
   //    }
   // };
   const handleAddMoreUnit = () => {
      // Define a new unit structure
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

      // Update the state with the new unit
      setData((prevState) => ({
         ...prevState,
         builderProjectSubPostProperties: [
            ...(prevState.builderProjectSubPostProperties || []),
            newUnit,
         ],
      }));

      // Update the current unit index
      setCurrentUnitIndex((prevIndex) => prevIndex + 1);
   };

   // const currentUnit = data.builderProjectSubPostProperties[currentUnitIndex] || null;

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
                                             {/* Dynamically display images from builderProjectSubPostImages */}
                                             {[
                                                ...(data?.builderProjectSubPostImages || []),
                                                ...(imagePreviews || []),
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
                                                                  ? URL.createObjectURL(image.file)
                                                                  : "")
                                                            } // Use base64 or object URL
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
                                             {/* Show cross icon only if there are videos */}
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
                                             <div className="video-preview-container">
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
                                             </div>
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
                                                         property.propertyImages[index].docName ? (
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
                                                                     property.propertyImages[index]
                                                                        .docName
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
                                                      <Form.Group controlId="formselectConfiguration">
                                                         <label>Configuration</label>
                                                         <Form.Control
                                                            as="select"
                                                            value={selectedType}
                                                            onChange={(e) =>
                                                               setSelectedType(e.target.value)
                                                            }
                                                         >
                                                            <option value="Villas">Villas</option>
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
                                                         <div className="flex-item">
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
                                                            <div key={index} className="flex-item">
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
                                                         <div className="flex-item">
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
