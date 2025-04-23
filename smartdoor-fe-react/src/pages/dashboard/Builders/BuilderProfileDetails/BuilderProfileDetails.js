/** @format */
// API integration on line 66, 123 and 137
import React, { useCallback, useEffect, useState, useRef } from "react";
import "./BuilderProfileDetails.scss";
import { TiCameraOutline } from "react-icons/ti";
import { Row, Col, Form, Modal } from "react-bootstrap"; // Ensure you have react-bootstrap installed
import { getBuilderById, createBuilderProfileDetail } from "../../../../common/redux/actions"; // Ensure correct imports
import {
   showErrorToast,
   getLocalStorage,
   handlePhoneChange,
   setLocalStorage,
} from "../../../../common/helpers/Utils"; // Utility for displaying toast messages
import { TextField } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { validateBuilderDetails } from "../../../../common/validations";

const BuilderProfileDetails = (props) => {
   const userData = getLocalStorage("authData");
   const userId = getLocalStorage("authData").userid;
   const builderId = props?.location?.state?.builderDetails?.builderId || null;
   const [isChecked, setIsChecked] = useState(false); // Set to checked by default
   const [isFormValid, setIsFormValid] = useState(builderId !== null ? true : false);
   const [isApproved, setIsApproved] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const fileInputRef = useRef(null); // Create a ref for the file input
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [data, setData] = useState(
      {
         contactNumber: "",
         companyName: "",
         brandName: "",
         companyAddress: "",
         companyEmail: "",
         companyGST: "",
         builderLogoS3ImageUrl: "",
         companyLogoImageUrl: "",
         builderCoinbalance: 0.0,
         directors: [],
         facebookUrl: "",
         instaUrl: "",
         whatsappNumber: "",
         contactNumber: "",
         contactName: "",
         builderProfileComplete: true,
      } || props?.location?.state?.builderDetails
   );
   const history = useHistory();

   useEffect(() => {
      const approvalStatus = localStorage.getItem("builderProfileApproved");
      if (approvalStatus === "true") {
         setIsApproved(true);
      } else {
         setIsApproved(false);
      }
      console.log("BuilderDetails: ", props);
      if (props?.location?.state?.builderDetails) {
         setData(props?.location?.state?.builderDetails);
      }
   }, []);

   const validateForm = (isCheck) => {
      const {
         brandName,
         companyName,
         companyEmail,
         companyGST,
         companyAddress,
         contactNumber,
         companyLogoImageUrl,
         directors,
      } = data;
      const areFirstTwoDirectorsValid =
         directors[0]?.directorName?.trim()?.length !== 0 ? true : false;
      console.log(isChecked);
      const checked = isChecked || isCheck;
      if (builderId !== null) {
         const isValid =
            !!brandName?.trim() &&
            !!companyName?.trim() &&
            !!companyEmail?.trim() &&
            // !!companyGST?.trim() &&
            !!companyAddress?.trim() &&
            !!companyLogoImageUrl?.trim() &&
            // String(contactNumber).trim().length === 10 &&
            areFirstTwoDirectorsValid === true;

         console.log("isvalid", isValid);
         setIsFormValid(isValid);
      } else {
         const isValid =
            !!brandName?.trim() &&
            !!companyName?.trim() &&
            !!companyEmail?.trim() &&
            // !!companyGST?.trim() &&
            !!companyAddress?.trim() &&
            !!companyLogoImageUrl?.trim() &&
            isCheck === true &&
            // String(contactNumber).trim().length === 10 &&
            areFirstTwoDirectorsValid === true;

         console.log("isvalid", isValid);
         setIsFormValid(isValid);
      }
   };

   const _getBuilderById = useCallback(() => {
      if (userData.roleId !== 19 && userData.roleId !== 1 && userData.roleId !== 22) {
         if (!builderId) return;
      }
      setLoading(true);
      getBuilderById({
         builderId:
            userData.roleId === 19 || userData.roleId === 1 || userData.roleId !== 22
               ? 0
               : builderId,
         userId:
            userData.roleId === 19 || userData.roleId === 1 || userData.roleId !== 22
               ? userData?.userid
               : 0,
      })
         .then((response) => {
            if (response?.status === 200) {
               const { resourceData, error: responseError } = response.data;
               setData(resourceData);
               setLocalStorage("builderData", resourceData);
               setIsChecked(true);
               setIsFormValid(true);
               // if (responseError) setError(responseError);
            }
            setLoading(false);
         })
         .catch((error) => {
            setLoading(false);
            // setError(error);
            console.log("Error fetching builder data:", error);
         });
   }, [builderId]);

   // Fetch builder profile on component mount or when builderId changes
   useEffect(() => {
      _getBuilderById();
   }, []);

   const handleChange = async (event) => {
      const { id, value } = event.target;

      if (id.startsWith("directorName")) {
         const directorIndex = parseInt(id.replace("directorName", "")) - 1;

         setData((prevData) => {
            const newDirectors = [...prevData.directors];
            newDirectors[directorIndex] = {
               directorId:
                  newDirectors[directorIndex]?.directorId !== null
                     ? newDirectors[directorIndex]?.directorId
                     : null,
               directorName: value,
            }; // Update the specific director field

            return {
               ...prevData,
               directors: newDirectors, // Set the updated directors array back into data
            };
         });
         if (value?.trim()?.length === 0) {
            setData((prevData) => {
               const directorList = [...prevData.directors];
               directorList.pop();
               return {
                  ...prevData,
                  directors: directorList,
               };
            });
         }
         validateForm(isChecked);
      } else if (id === "whatsappNumber") {
         const mobileNum = handlePhoneChange(event);
         await setData((prevData) => ({ ...prevData, whatsappNumber: mobileNum }));
         validateForm(isChecked);
      } else if (id === "contactNumber") {
         const mobileNum = handlePhoneChange(event);
         await setData((prevData) => ({ ...prevData, contactNumber: mobileNum }));
         validateForm(isChecked);
      } else {
         // Update other fields in data (not directors array)
         await setData((prevData) => ({ ...prevData, [id]: value }));
         validateForm(isChecked);
      }
   };

   const handleLogoUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setData((prevData) => ({
               ...prevData,
               companyLogoImageUrl: reader.result,
               builderLogoS3ImageUrl: "", // Clear S3 URL if needed
            }));
            // Reset the input value to allow uploading the same file again
            fileInputRef.current.value = null; // Clear the input value
         };
         reader.readAsDataURL(file); // Start reading the file
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const valid = await validateBuilderDetails(data);
      setError(valid.errors);
      if (!valid.isValid) {
         return null;
      }
      try {
         let reqData = { ...data };
         if (reqData?.builderId === 0) {
            reqData.builderId = null;
         }
         const response = await createBuilderProfileDetail(reqData);
         console.log("API Response:", response);
         if (response?.status === 200) {
            // setData({
            //    brandName: "",
            //    companyName: "",
            //    companyEmail: "",
            //    companyGST: "",
            //    companyAddress: "",
            //    // usersName: "",
            //    contactNumber: "",
            //    directors: ["", "", "", ""],
            // });

            setIsChecked(false);
            setIsFormValid(false);
            setIsApproved(false);
            if (userData?.roleName === "SUPER ADMIN") {
               history.goBack();
            } else {
               setData((prevData) => ({ ...prevData, status: "UNDER_REVIEW" }));
               setShowModal(true);
            }
         }
      } catch (error) {
         showErrorToast("Error submitting form. Please try again.");
         console.error("Error submitting builder profile:", error);
      } finally {
         setLoading(false);
      }
   };

   const handleCloseModal = () => setShowModal(false);

   const isBase64Image = (base64) => {
      return typeof base64 === "string" && base64.startsWith("data:image/png;base64,");
   };

   // const handleCheckboxChange = async (event) => {
   //    await setIsChecked(event.target.checked);
   //    console.log(event.target.checked);
   //    validateForm();
   // };

   return (
      <div className="profile-page">
         <div className="container-fluid content">
            <div className="form-container">
               <form noValidate onSubmit={handleSubmit} autoComplete="off">
                  <div className="newEntry">
                     <div className="form-section p-4">
                        <div className="form-head-text pb-4">
                           <h2>Your profile info in SmartDoor Services</h2>
                           <p className="info-text">
                              Dedupe on company brand name to identify impersonation and call on
                              7767811351 to address the same
                           </p>
                           {data?.status === "UNDER_REVIEW" ? (
                              <>
                                 <p className="info-text">
                                    Your profile is currently under reviewed by SmartDoor Admin
                                 </p>
                              </>
                           ) : null}
                           {data?.status === "REJECTED" ? (
                              <>
                                 <p className="info-text" style={{fontSize:'16px', color:'red'}}>
                                    Your profile has been rejected because of{" "}
                                    {data?.rejectionComment}
                                 </p>
                              </>
                           ) : null}
                           {data?.status === "ON_HOLD" ? (
                              <>
                                 <p className="info-text" style={{fontSize:'16px', color:'red'}}>
                                    Your profile is currently On Hold by SmartDoor Admin
                                 </p>
                              </>
                           ) : null}
                           {data?.status === "APPROVED" ? (
                              <>
                                 <p className="info-text" style={{fontSize:'18px', color:'green'}}>
                                    Your profile has been approved by Smartdoor Admin. You can now
                                    add new projects. Please resubmit your profile if you need to
                                    update any existing information.
                                 </p>
                              </>
                           ) : null}
                        </div>
                        <Row className="pb-4">
                           <Col lg="2">
                              <div className="image-upload builderProfileImage">
                                 <label
                                    htmlFor="upload-input"
                                    className="upload-label"
                                    onClick={() => fileInputRef.current?.click()}
                                 >
                                    <TiCameraOutline className="camera-icon" />
                                    <span className="pt-3">
                                       {data?.companyLogoImageUrl ? "Change logo" : "Upload logo *"}
                                    </span>
                                    <input
                                       id="upload-input upload-logo"
                                       type="file"
                                       className="upload-input"
                                       accept="image/*"
                                       onChange={handleLogoUpload}
                                       ref={fileInputRef}
                                       disabled={
                                          data?.status === "UNDER_REVIEW" ||
                                          data?.status === "ON_HOLD"
                                             ? true
                                             : false
                                       }
                                    />

                                    {/* Displaying the uploaded image */}
                                    {data?.companyLogoImageUrl && (
                                       <div className="image-preview">
                                          <img
                                             src={data?.companyLogoImageUrl}
                                             alt="Builder Logo"
                                             id="builder-logo"
                                             className="preview-img"
                                          />
                                       </div>
                                    )}

                                    {/* Check for S3 URL if Base64 is not available */}
                                    {/* {!data.companyLogoImageUrl &&
                                       data.builderLogoS3ImageUrl && (
                                          <div className="image-preview">
                                             <img
                                                src={`${CONSTANTS.CONFIG_PROPERTY.s3Url}/${data.builderLogoS3ImageUrl}`}
                                                alt="Builder Logo"
                                                className="preview-img"
                                             />
                                          </div>
                                       )} */}
                                 </label>
                              </div>
                           </Col>

                           {/* Row 1 */}

                           <Col lg="10">
                              <Row className="pb-3">
                                 <Col lg="5">
                                    <TextField
                                       id={"brandName"}
                                       className="textFieldInput w-100"
                                       type="text"
                                       required={true}
                                       // maxLength={35}
                                       label={"Brand Name"}
                                       onInput={(e) => handleChange(e)}
                                       value={data?.brandName}
                                       disabled={
                                          data?.status === "UNDER_REVIEW" ||
                                          data?.status === "ON_HOLD"
                                             ? true
                                             : false
                                       }
                                       error={error?.brandName}
                                    />
                                 </Col>
                                 <Col lg="5">
                                    <TextField
                                       id={"companyName"}
                                       className="textFieldInput w-100"
                                       type="text"
                                       required={true}
                                       maxLength={35}
                                       label={"Company Name"}
                                       value={data.companyName}
                                       onInput={(e) => handleChange(e)}
                                       disabled={
                                          data?.status === "UNDER_REVIEW" ||
                                          data?.status === "ON_HOLD"
                                             ? true
                                             : false
                                       }
                                       error={error?.companyName}
                                    />
                                 </Col>
                              </Row>
                              <Row>
                                 <Col lg="5">
                                    <TextField
                                       id={"companyEmail"}
                                       type="email"
                                       required={true}
                                       className="textFieldInput w-100"
                                       label={"Company Email"}
                                       value={data.companyEmail}
                                       onInput={(e) => handleChange(e)}
                                       disabled={
                                          data?.status === "UNDER_REVIEW" ||
                                          data?.status === "ON_HOLD"
                                             ? true
                                             : false
                                       }
                                       error={error?.companyEmail}
                                    />
                                 </Col>
                                 <Col lg="5">
                                    <TextField
                                       id={"companyGST"}
                                       type="text"
                                       // required={true}
                                       className="textFieldInput w-100"
                                       label="Company GST"
                                       value={data.companyGST}
                                       onInput={(e) => handleChange(e)}
                                       disabled={
                                          data?.status === "UNDER_REVIEW" ||
                                          data?.status === "ON_HOLD"
                                             ? true
                                             : false
                                       }
                                       // error={error?.companyGST}
                                    />
                                 </Col>
                              </Row>
                              {/* Row 2 */}
                           </Col>
                        </Row>
                        <Row className="align-items-center mb-3">
                           <Col lg="12">
                              <TextField
                                 id={"companyAddress"}
                                 type="text"
                                 required={true}
                                 className="textFieldInput w-100"
                                 label="Address"
                                 value={data.companyAddress}
                                 onInput={(e) => handleChange(e)}
                                 disabled={
                                    data?.status === "UNDER_REVIEW" || data?.status === "ON_HOLD"
                                       ? true
                                       : false
                                 }
                                 error={error?.companyAddress}
                              />
                           </Col>
                        </Row>
                        {/* Row 3 */}
                        <Row className="align-items-center ">
                           {Array(4)
                              .fill()
                              .map((_, index) => (
                                 <Col className="mt-3" key={index} lg="4">
                                    <TextField
                                       id={`directorName${index + 1}`}
                                       type="text"
                                       className="textFieldInput w-100"
                                       label={`Director Name ${index + 1} ${
                                          index !== 0 ? "(Optional)" : "*"
                                       }`}
                                       value={data.directors[index]?.directorName || ""}
                                       onInput={(e) => handleChange(e)}
                                       disabled={
                                          data?.status === "UNDER_REVIEW" ||
                                          data?.status === "ON_HOLD"
                                             ? true
                                             : false
                                       }
                                       error={error?.directors ? error?.directors[index] : false}
                                    />
                                 </Col>
                              ))}

                           <Col lg="4" className="mt-3">
                              <TextField
                                 id={"facebookUrl"}
                                 type="text"
                                 // required={true}
                                 placeholder="www.facebook.com/accountname"
                                 className="textFieldInput w-100"
                                 label="Facebook URL"
                                 value={data.facebookUrl}
                                 onInput={(e) => handleChange(e)}
                                 disabled={
                                    data?.status === "UNDER_REVIEW" || data?.status === "ON_HOLD"
                                       ? true
                                       : false
                                 }
                              />
                           </Col>
                           <Col lg="4" className="mt-3">
                              <TextField
                                 id={"instaUrl"}
                                 type="text"
                                 // required={true}
                                 placeholder="www.instagram.com/accountname"
                                 className="textFieldInput w-100"
                                 label="Instagram URL"
                                 value={data.instaUrl}
                                 onInput={(e) => handleChange(e)}
                                 disabled={
                                    data?.status === "UNDER_REVIEW" || data?.status === "ON_HOLD"
                                       ? true
                                       : false
                                 }
                              />
                           </Col>
                        </Row>

                        <Row className="align-items-center mt-3">
                           <Col lg="4">
                              <TextField
                                 id={"whatsappNumber"}
                                 type="number"
                                 required={true}
                                 inputProps={{ min: 0 }}
                                 className="textFieldInput w-100"
                                 label="Whatsapp Business Number"
                                 value={data.whatsappNumber}
                                 onChange={(e) => handleChange(e)}
                                 disabled={
                                    data?.status === "UNDER_REVIEW" || data?.status === "ON_HOLD"
                                       ? true
                                       : false
                                 }
                                 error={error?.whatsappNumber}
                              />
                           </Col>
                           <Col lg="4">
                              <TextField
                                 id={"contactName"}
                                 type="text"
                                 required={true}
                                 className="textFieldInput w-100"
                                 label="Contact Person Name"
                                 value={data.contactName}
                                 onInput={(e) => handleChange(e)}
                                 disabled={
                                    data?.status === "UNDER_REVIEW" || data?.status === "ON_HOLD"
                                       ? true
                                       : false
                                 }
                                 error={error?.contactName}
                              />
                           </Col>
                           <Col lg="4">
                              <TextField
                                 id={"contactNumber"}
                                 type="number"
                                 required={true}
                                 inputProps={{ min: 0 }}
                                 className="textFieldInput w-100"
                                 label="Phone Number"
                                 value={data.contactNumber}
                                 onChange={(e) => handleChange(e)}
                                 disabled={
                                    data?.status === "UNDER_REVIEW" || data?.status === "ON_HOLD"
                                       ? true
                                       : false
                                 }
                                 error={error?.contactNumber}
                              />
                           </Col>
                        </Row>
                     </div>
                     {builderId === null ? (
                        <Row>
                           <Col lg="12">
                              <Form.Check
                                 type="checkbox"
                                 id="custom-checkbox"
                                 label="I declare that I represent the above details to be true and as my own organisation and SmartDoor may take requisite action if any detail is found to be untrue."
                                 checked={isChecked}
                                 onChange={(e) => {
                                    setIsChecked(e.target.checked);
                                    validateForm(e.target.checked);
                                 }}
                                 className="custom-checkbox"
                                 disabled={
                                    data?.status === "UNDER_REVIEW" || data?.status === "ON_HOLD"
                                       ? true
                                       : false
                                 }
                              />
                           </Col>
                        </Row>
                     ) : null}
                     <Row>
                        {data?.status !== "UNDER_REVIEW" && data?.status !== "ON_HOLD" ? (
                           <>
                              <Col lg="3">
                                 <button
                                    type="submit"
                                    className={
                                       isFormValid
                                          ? "btn-small submit-btn"
                                          : "btn-small disabled-btn"
                                    }
                                    id="submit-team-member-button"
                                    disabled={!isFormValid} // Button disabled until all fields are filled
                                 >
                                    {props?.location?.state?.builderDetails?.builderId
                                       ? "Save"
                                       : "Submit"}
                                 </button>
                              </Col>
                           </>
                        ) : null}
                     </Row>
                  </div>
               </form>
               <Modal show={showModal} onHide={handleCloseModal}>
                  <Modal.Title
                     style={{
                        fontSize: " 20px",
                        fontWeight: 700,
                        lineHeight: "27.32px",
                        letterSpacing: "-0.02em",
                        textAlign: "left",
                        padding: "20px 3px 1px 16px",
                     }}
                  >
                     Account Approval
                  </Modal.Title>
                  <Modal.Body>
                     Your request for Builder profile has been sent to the SmartDoor Admin.
                     <Row className="ModalActions">
                        <Col lg="6">
                           <button
                              type="button"
                              className="btn-small cancel-btn"
                              onClick={handleCloseModal}
                           >
                              Close
                           </button>
                        </Col>
                     </Row>
                  </Modal.Body>
               </Modal>
            </div>
         </div>
      </div>
   );
};

export default BuilderProfileDetails;
