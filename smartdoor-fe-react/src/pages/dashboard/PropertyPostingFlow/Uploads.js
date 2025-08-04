/** @format */

import { compose } from "redux";
import Text from "../../../shared/Text/Text";
import Buttons from "../../../shared/Buttons/Buttons";
import { Col, Button, Row } from "react-bootstrap";
import Image from "../../../shared/Image";
import cameraIcon from "../../../assets/images/camra-icon.svg";
import closeBtn from "../../../assets/images/closeBtn.png";
import { useCallback, useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";
import { getLocalStorage, showErrorToast, showSuccessToast } from "../../../common/helpers/Utils";
import {
   addBasicDetails,
   addImage,
   deletePropertyImage,
   uploadImage,
} from "../../../common/redux/actions";
import { connect, useDispatch } from "react-redux";
import * as Actions from "../../../common/redux/types";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import equalIcon from "../../../assets/svg/equalIcon.svg";

const Uploads = (props) => {
   const {
      basicDetailFields,
      uploadImages,
      saveUploadsFields,
      addressDetailFields,
      pricingDetailFields,
      specDetailFields,
      editPropertyFlag,
      customerDetails,
   } = props;
   const fileInputRef = useRef(null);
   const propertyId = props?.propertyId;
   const [miscellaneousDetails, setmiscellaneousDetails] = useState(props.miscellaneousDetails);
   const [imageArr, setImageArray] = useState(uploadImages.data.propertyImages || []);
   const [addNewVideoFlag, setAddNewVideoFlag] = useState(
      uploadImages?.data?.propertyVideos?.length > 1 ? true : false
   );
   const [videoUrl1, setVideoUrl1] = useState(
      uploadImages?.data?.propertyVideos !== undefined &&
         uploadImages?.data?.propertyVideos !== null
         ? uploadImages?.data?.propertyVideos[0]?.docURL
         : ""
   );
   const [videoUrl2, setVideoUrl2] = useState(
      uploadImages?.data?.propertyVideos !== undefined &&
         uploadImages?.data?.propertyVideos !== null
         ? uploadImages?.data?.propertyVideos[1]?.docURL
         : ""
   );
   const [saveUploadFlag, setSaveUploadFlag] = useState(false);
   const [imageLoader, setImageLoader] = useState(false);
   const [loading, setLoading] = useState(true);
   const dispatch = useDispatch();
   const history = useHistory();

   useEffect(() => {
      console.log(props);
   }, []);

   const handleDragStart = (e, id) => {
      e.dataTransfer.setData("id", id);
   };

   const handleDragOver = (e) => {
      e.preventDefault();
   };

   const handleDrop = (e, id) => {
      const draggedId = e.dataTransfer.getData("id");
      const draggedItem = imageArr.find((item) => item.docURL === draggedId);
      const newItems = imageArr.filter((item) => item.docURL !== draggedId);
      const index = imageArr.findIndex((item) => item.docURL === id);
      newItems.splice(index, 0, draggedItem);
      setImageArray(newItems);
      console.log(newItems);
      // setSaveFlag(true)
   };

   const deleteImageHandler = useCallback(
      (docId, index) => {
         // console.log(docId, "doc id");
         // deletePropertyImage({ docId: docId })
         // 	.then((response) => {
         // 		if (response.data) {
         // 			if (response.data.resourceData) {
         //                 const newList = imageArr.filter(item => item.docId !== docId);
         //                 setImageArray(newList);
         // 			}
         // 		}
         // 		console.log("responseDeleteImage", response);
         // 	})
         // 	.catch((error) => {
         // 		// setLoading(false);
         // 		console.log("error", error);
         // 	});
         let imageList = [];
         imageList = [...imageArr];
         imageList.splice(index, 1);
         setImageArray(imageList);
      },
      [imageArr]
   );

   const fileUpload = (event) => {
      if (event.target.files.length > 15) {
         alert("Please select up to 15 files only.");
         return;
      }

      const imageData = {
         propertyId: propertyId,
         propertyDocs: [],
         draft: false,
         partial: false,
         propertyImage: [
            {
               docId: null,
               docName: "",
               docDescription: "",
               docURL: "",
               docOrderInFrontendView: null,
            },
         ],
      };
      if (event.target.files.length > 0) {
         setImageLoader(true);
         let formData = new FormData();
         const maxSizeInBytes = 15 * 1024 * 1024; // 10MB
         Array.from(event.target.files).map((file) => {
            if (file.size > maxSizeInBytes) {
               showErrorToast("File must be less than 15MB...");
               return;
            }
         });
         let fileList = [];
         for (let i = 0; i < event.target.files.length; i++) {
            fileList.push(event.target.files[i]);
            formData.append("file", event.target.files[i]);
         }
         formData.append("id", propertyId);
         formData.append("enumType", "PROPERTY_IMAGES");
         uploadImage(formData)
            .then((response) => {
               if (response.data.status === 200) {
                  // const property_image = [];
                  const property_image = [...imageArr];
                  for (let i = 0; i < response.data.resourceData.length; i++) {
                     property_image.push({
                        docId: 0,
                        docName: "",
                        docDescription: "",
                        docURL: response.data.resourceData[i],
                     });
                  }
                  const image_data = {
                     ...imageData,
                     propertyDocs: [],
                     propertyImage: property_image,
                  };
                  setImageArray(property_image);
                  addImage(image_data)
                     .then((response) => {
                        setLoading(false);
                        if (response.data) {
                           if (response.data.resourceData) {
                              setImageLoader(false);
                           }
                        }
                     })
                     .catch((error) => {
                        setImageLoader(false);
                        setLoading(false);
                     });
                  showSuccessToast(response.data.customMessage);
               }
            })
            .catch((error) => {
               setImageLoader(false);
               setLoading(false);
            });
      }
   };
   const [error, setError] = useState({});

   const saveUploads = () => {
      let isValid = true;
      if (imageArr.length < 3) {
         showErrorToast("Please upload minimum 3 images");
         isValid = false;
      }
      let videoUrlObj = [];
      if (videoUrl1?.trim()?.length !== 0 && addNewVideoFlag === false) {
         videoUrlObj = [
            {
               docId: null,
               docName: "",
               docDescription: "",
               docURL: videoUrl1,
            },
         ];
      }
      if (addNewVideoFlag === true && isValid) {
         videoUrlObj = [
            {
               docId: null,
               docName: "",
               docDescription: "",
               docURL: videoUrl1,
            },
            {
               docId: null,
               docName: "",
               docDescription: "",
               docURL: videoUrl2,
            },
         ];
      }
      if (isValid) {
         let image_arr = imageArr.map((image, index) => ({
            ...image,
            docOrderInFrontendView: index + 1,
         }));
         setImageArray(image_arr);

         setImageArray(image_arr);
         setSaveUploadFlag(true);
         saveUploadsFields({ saveFlag: true });
         dispatch({
            type: Actions.UPLOAD_IMAGES_SUCCESS,
            data: { propertyImages: image_arr, propertyVideos: videoUrlObj },
         });
         if (editPropertyFlag) {
            notifyUploads(true);
         }
      }
   };

   const notifyUploads = async (loadNext) => {
      let isValid = true;
      if (imageArr.length < 3) {
         showErrorToast("Please upload minimum 3 images");
         isValid = false;
      }
      let videoUrlObj = [];
      if (videoUrl1?.trim()?.length !== 0 && addNewVideoFlag === false) {
         videoUrlObj = [
            {
               docId: null,
               docName: "",
               docDescription: "",
               docURL: videoUrl1,
            },
         ];
      }
      if (addNewVideoFlag === true && isValid) {
         videoUrlObj = [
            {
               docId: null,
               docName: "",
               docDescription: "",
               docURL: videoUrl1,
            },
            {
               docId: null,
               docName: "",
               docDescription: "",
               docURL: videoUrl2,
            },
         ];
      }
      if (isValid) {
         let image_arr = imageArr.map((image, index) => ({
            ...image,
            docOrderInFrontendView: index + 1,
         }));
         setImageArray(image_arr);

         let pricingDetail = { ...pricingDetailFields?.data }; // Make a copy of pricingDetailFields.data
         if (
            basicDetailFields?.data.propertyCategory === "Selling" &&
            pricingDetail.isQuickSale === true
         ) {
            const dateString = pricingDetail.expectedTimeToSellThePropertyWithin;
            const dateObject = new Date(dateString);
            const day = String(dateObject.getDate()).padStart(2, "0");
            const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so we add 1
            const year = dateObject.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;
            pricingDetail = {
               ...pricingDetail,
               expectedTimeToSellThePropertyWithin: formattedDate,
            }; // Update the copied object with formattedDate
         }
         let userId = getLocalStorage("authData");
         const data = {
            ...(propertyId && { smartdoorPropertyId: propertyId }),
            miscellaneousDetails:
               editPropertyFlag === true
                  ? miscellaneousDetails
                  : {
                       postedById: userId.userid,
                       lastPageOfInfoFilled: 4,
                       draft: true,
                       partial: false,
                       requestAlerts: false,
                       favourite: false,
                       smartLockProperty: false,
                       autoRenew: null,
                       autoApproval: null,
                       cityProvidesSmartdoorSevice: null,
                       planId: null,
                       currentPlanName: null,
                       expiryDate: null,
                       numberOfDaysLeft: null,
                       status: "",
                       postedByName: userId.name,
                       postedByMobile: userId.mobile,
                       postedByProfileImageUrl: "",
                       ownerName: customerDetails?.name,
                       ownerMobileNumber: customerDetails?.mobile,
                       isPostingForOthers: true,
                       notifyCustomer: true,
                    },
            basicDetails: basicDetailFields?.data,
            address: addressDetailFields?.data,
            specs: specDetailFields?.data,
            pricing: pricingDetail,
            uploads: { propertyImages: image_arr, propertyVideos: videoUrlObj },
         };
         // setLoading(true)
         const response = await addBasicDetails(data);
         if (response.status === 200) {
            // setLoading(false)
            setSaveUploadFlag(true);
            saveUploadsFields({ saveFlag: true });
            dispatch({
               type: Actions.UPLOAD_IMAGES_SUCCESS,
               data: { propertyImages: image_arr, propertyVideos: videoUrlObj },
            });
            if (!loadNext) {
               showSuccessToast("Property Posted successfully");
               history.goBack();
            }
         }
      }
   };

   return (
      <>
         <div className="whiteBg mb-1">
            <div className="d-flex">
               <Col lg="6">
                  <Text
                     text={"Upload property images"}
                     fontWeight={"bold"}
                     style={{ fontSize: "16px" }}
                  />
                  <span>
                     <Text
                        text={"Capture or choose from gallery. File should be in png, jpg, etc."}
                        fontWeight={"500"}
                        style={{ fontSize: "12px", color: "#949494" }}
                     />
                     {/* <Text text={'Please upload at-least 2 exterior image'} fontWeight={'500'} style={{ fontSize: '12px', color: '#A11447' }} /> */}
                     <Text
                        text={"Please upload minimum 3 exterior images"}
                        fontWeight={"500"}
                        style={{ fontSize: "12px", color: "#A11447" }}
                     />
                  </span>
                  <Button
                     className="w-50"
                     style={{
                        color: "#949494",
                        borderStyle: "dotted",
                        borderColor: "GrayText",
                        borderWidth: "2px",
                        backgroundColor: "unset",
                     }}
                     onClick={() => {
                        fileInputRef.current?.click();
                     }}
                  >
                     <div className="d-flex justify-content-center mt-1 mb-0  ">
                        <Image src={cameraIcon}></Image>Upload Image
                     </div>
                  </Button>
                  <input
                     hidden
                     type="file"
                     accept=".png, .jpg, .jpeg"
                     multiple={true}
                     ref={fileInputRef}
                     onChange={(e) => {
                        fileUpload(e);
                     }}
                  />
                  <div className="d-flex mt-3" style={{ overflowX: "hidden", flexWrap: "wrap" }}>
                     {imageArr.map((image, index) => (
                        <>
                           <Row
                              key={image.docURL}
                              className="d-flex mt-3 mb-3"
                              draggable
                              onDragStart={(e) => handleDragStart(e, image.docURL)}
                              onDragOver={(e) => handleDragOver(e)}
                              onDrop={(e) => handleDrop(e, image.docURL)}
                           >
                              <Col lg="1" style={{ alignSelf: "center" }}>
                                 <img
                                    className=""
                                    src={equalIcon}
                                    alt="close"
                                    style={{
                                       height: "40px",
                                       width: "40px",
                                       cursor: "move",
                                       scale: "2.5",
                                    }}
                                 />
                              </Col>
                              <Col lg="11">
                                 <div
                                    key={editPropertyFlag ? image.docId : index}
                                    className="d-flex"
                                 >
                                    <img
                                       src={image?.docURL}
                                       alt=""
                                       style={{
                                          border: "1px #DEDEDE solid",
                                          borderRadius: 8,
                                          height: "100px",
                                          width: "200px",
                                          marginInlineEnd: "10px",
                                       }}
                                    />
                                    {/* <img className="me-3 mt-3" src={image.docURL} style={{ width: '150px', height: '100px', borderRadius: 8, border: '1px #9BA5AD solid' }}></img> */}
                                    <TextField
                                       style={{ marginTop: "5%" }}
                                       label="Image Desc."
                                       type="text"
                                       value={image?.docDescription}
                                       onChange={(e) => {
                                          const newDescription = e.target.value;
                                          setImageArray((prevImageArr) =>
                                             prevImageArr.map((img, idx) =>
                                                idx === index
                                                   ? { ...img, docDescription: newDescription }
                                                   : img
                                             )
                                          );
                                       }}
                                    />
                                    <img
                                       className="mt-2"
                                       src={closeBtn}
                                       alt=""
                                       style={{
                                          float: "right",
                                          width: "15px",
                                          height: "15px",
                                          marginInlineStart: "0px",
                                       }}
                                       onClick={() => {
                                          deleteImageHandler(image?.docId, index);
                                       }}
                                    />
                                 </div>{" "}
                                 &nbsp; &nbsp; &nbsp; &nbsp;
                              </Col>
                           </Row>
                        </>
                     ))}
                  </div>
               </Col>
               <Col lg="6">
                  <Text
                     text={"Add property video"}
                     fontWeight={"bold"}
                     style={{ fontSize: "16px" }}
                  />
                  <Text
                     text={
                        "Paste the link of the video (Youtube, Vemio, etc.)\
                            Max 2 videos can be shared."
                     }
                     fontWeight={"500"}
                     style={{ fontSize: "12px", color: "#949494" }}
                  />
                  <div className="d-flex mt-2">
                     <TextField
                        className="col-10"
                        type="text"
                        InputProps={{
                           endAdornment: (
                              <>
                                 <Image
                                    src={closeBtn}
                                    className="mt-3"
                                    style={{ scale: "1.5" }}
                                    onClick={() => {
                                       setVideoUrl1("");
                                    }}
                                 />
                              </>
                           ),
                        }}
                        onChange={(e) => {
                           setVideoUrl1(e.target.value);
                        }}
                        value={videoUrl1}
                     ></TextField>
                     {addNewVideoFlag === false ? (
                        <Buttons
                           className="ml-3"
                           name={"+"}
                           style={{ fontSize: "12px", cursor: "pointer" }}
                           onClick={() => {
                              setAddNewVideoFlag(true);
                           }}
                        />
                     ) : null}
                  </div>
                  {addNewVideoFlag ? (
                     <>
                        <TextField
                           className="w-100 mt-2 col-10"
                           type="text"
                           InputProps={{
                              endAdornment: (
                                 <>
                                    <Image
                                       src={closeBtn}
                                       className="mt-3"
                                       style={{ scale: "1.5", cursor: "pointer" }}
                                       onClick={() => {
                                          setVideoUrl2("");
                                       }}
                                    />
                                 </>
                              ),
                           }}
                           onChange={(e) => {
                              setVideoUrl2(e.target.value);
                           }}
                           value={videoUrl2}
                        ></TextField>
                        <Buttons
                           className="ml-3 mt-2 py-3"
                           name={"X"}
                           style={{ fontSize: "12px" }}
                           onClick={() => {
                              setAddNewVideoFlag(false);
                              setVideoUrl2("");
                           }}
                        />
                     </>
                  ) : null}
               </Col>
            </div>
         </div>
         {saveUploadFlag === false ? (
            <div className="d-flex">
               {!editPropertyFlag ? (
                  <>
                     <Buttons
                        className="p-2 px-4"
                        name={editPropertyFlag ? "Save" : "Notify Customer"}
                        onClick={() => {
                           notifyUploads(false);
                        }}
                     ></Buttons>{" "}
                     &nbsp; &nbsp;
                  </>
               ) : null}
               <Buttons
                  className="p-2 px-4"
                  name="Next"
                  onClick={() => {
                     saveUploads();
                  }}
               ></Buttons>{" "}
               &nbsp; &nbsp;
               {/* <Buttons className='p-2 px-4' name='Cancel' ></Buttons> */}
            </div>
         ) : null}
      </>
   );
};
const mapStateToProps = ({
   basicDetailFields,
   addressDetailFields,
   specDetailFields,
   pricingDetailFields,
   uploadImages,
}) => ({
   basicDetailFields,
   addressDetailFields,
   specDetailFields,
   pricingDetailFields,
   uploadImages,
});

const actions = {};

export default compose(connect(mapStateToProps, actions))(Uploads);
