/** @format */
// API integration on line 66, 123 and 137
import React, { useCallback, useEffect, useState, useRef } from "react";
import "./BuilderProfileDetails.scss";
import Text from "../../../shared/Text/Text";
import { TiCameraOutline } from "react-icons/ti";
import { Row, Col, Form, Button, Modal } from "react-bootstrap"; // Ensure you have react-bootstrap installed
import { useUserContext } from "../../../common/helpers/Auth";
import {
   getBuilderById,
   createBuilderProfileDetail,
   approveBuilderProfile,
} from "../../../common/redux/actions"; // Ensure correct imports
import { showSuccessToast, showErrorToast, getLocalStorage } from "../../../common/helpers/Utils"; // Utility for displaying toast messages
import { CONSTANTS } from "../../../common/helpers/Constants";

const BuilderProfileDetails = () => {
   const {
      auth: { userData },
   } = useUserContext();
   const storedBuilderId = getLocalStorage("authData").builderId; // Get builderId from authData
   const builderId = localStorage.getItem("builderId") || storedBuilderId;
   const [approvalBadgeVisible, setApprovalBadgeVisible] = useState(false);
   const userId = getLocalStorage("authData").userid;
   const [isChecked, setIsChecked] = useState(false); // Set to checked by default
   const [isFormValid, setIsFormValid] = useState(false);
   const [isApproved, setIsApproved] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const fileInputRef = useRef(null); // Create a ref for the file input
   const [loading, setLoading] = useState(true);
   const [data, setData] = useState({
      mobile: "",
      companyName: "",
      brandName: "",
      companyAddress: "",
      companyEmail: "",
      companyGst: "",
      builderLogoS3ImageUrl: "",
      builderLogoImageAsBase64: "",
      builderCoinbalance: 0.0,
      directors: [],
      companyFacebookUrl: "",
      companyInstagramUrl: "",
      whatsappNumber: "",
      callNumber: "",
      contactPersonName: "",
      builderProfileComplete: true,
   });
   useEffect(() => {
      const approvalStatus = localStorage.getItem("builderProfileApproved");
      if (approvalStatus === "true") {
         setIsApproved(true);
      } else {
         setIsApproved(false);
      }
   }, []);
   const validateForm = () => {
      const {
         brandName,
         companyName,
         companyEmail,
         companyGst,
         companyAddress,
         usersName,
         mobile,
      } = data;
      const isValid =
         brandName &&
         companyName &&
         companyEmail &&
         companyGst &&
         companyAddress &&
         usersName &&
         mobile;
      setIsFormValid(isValid);
   };
   const [error, setError] = useState(null);
   const _getBuilderById = useCallback(() => {
      if (!builderId) return;
      setLoading(true);
      getBuilderById({ builderId: builderId, userId: userId })
         .then((response) => {
            if (response?.data) {
               const { resourceData, error: responseError } = response.data;
               if (resourceData) {
                  // Ensure no null values in resourceData
                  const sanitizedData = Object.fromEntries(
                     Object.entries(resourceData).map(([key, value]) => [key, value ?? ""])
                  );
                  // Set the logo fields correctly
                  setData((prevData) => ({
                     ...prevData,
                     ...sanitizedData, // Spread the sanitized data
                  }));
                  if (!sanitizedData.callNumber && sanitizedData.mobile) {
                     sanitizedData.callNumber = sanitizedData.mobile;
                  }
                  setData(sanitizedData);
                  setIsChecked(true);
               }
               if (responseError) setError(responseError);
            }
            setLoading(false);
         })
         .catch((error) => {
            setLoading(false);
            setError(error);
            console.log("Error fetching builder data:", error);
         });
   }, [builderId]);

   // Fetch builder profile on component mount or when builderId changes
   useEffect(() => {
      _getBuilderById();
   }, []);

   const callApproveBuilderProfile = async () => {
      if (!isApproved) {
         try {
            const response = await approveBuilderProfile({ builderId, userId });
            if (response.status === 200) {
               setIsApproved(true); // Set approval to true
               localStorage.setItem("builderProfileApproved", "true"); // Update local storage
               showSuccessToast("Builder profile approved successfully.");
            }
         } catch (error) {
            console.error("Error approving builder profile:", error);
            showErrorToast("Error approving profile. Please try again.");
         }
      } else {
         showErrorToast("Builder profile is already approved.");
      }
   };
   const handleChange = (event) => {
      const { name, value } = event.target;

      if (name.startsWith("directorName")) {
         const directorIndex = parseInt(name.replace("directorName", "")) - 1;

         setData((prevData) => {
            const newDirectors = [...prevData.directors];
            newDirectors[directorIndex] = value; // Update the specific director field

            return {
               ...prevData,
               directors: newDirectors, // Set the updated directors array back into data
            };
         });
         validateForm();
      } else {
         // Update other fields in data (not directors array)
         setData((prevData) => ({ ...prevData, [name]: value }));
      }
   };

   const handleLogoUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setData((prevData) => ({
               ...prevData,
               builderLogoImageAsBase64: reader.result, // Base64 encoding of image
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

      try {
         console.log("Data being submitted:", data);

         const response = await createBuilderProfileDetail(data);
         console.log("API Response:", response);

         // if (response && response.data && response.data.resourceData) {
         //    const approvalResponse = await callApproveBuilderProfile();
         //    if (approvalResponse && approvalResponse.status === 200) {
         //       showSuccessToast("Builder profile approved successfully.");
         //    }
         // } else {
         //    console.error("No resource data returned:", response);
         //    showErrorToast(" Failed to create builder profile. Please check your input.");
         // }

         // localStorage.setItem("companyName", data.companyName);

         setData({
            brandName: "",
            companyName: "",
            companyEmail: "",
            companyGst: "",
            companyAddress: "",
            usersName: "",
            mobile: "",
            directors: ["", "", "", ""],
         });

         setIsChecked(false);
         setIsFormValid(false);
         setIsApproved(false);
         const currentUrl = window.location.pathname;
         const newUrl = currentUrl.replace(/\/\d+$/, "");
         window.history.replaceState({}, "", newUrl);
         localStorage.removeItem("builderId");
         localStorage.removeItem("builderProfileApproved");
      } catch (error) {
         showErrorToast("Error submitting form. Please try again.");
         console.error("Error submitting builder profile:", error);
      } finally {
         setLoading(false);
      }
   };

   const handleCloseModal = () => setShowModal(false);

   // if (loading) return <div>Loading...</div>; // Show loading indicator
   if (error) return <div>Error: {error.message || "Failed to load builder details"}</div>; // Show error message
   const isBase64Image = (base64) => {
      return typeof base64 === "string" && base64.startsWith("data:image/png;base64,");
   };

   const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
   };

   return (
      <div className="profile-page">
         <div className="container-fluid content">
            {/* {!isApproved ? (
               <Button variant="warning" onClick={callApproveBuilderProfile}>
                  Approve
               </Button>
            ) : (
               <span
                  style={{
                     color: "White",
                     backgroundColor: "green",
                     padding: "5px 10px",
                     borderRadius: "5px",
                  }}
               >
                  Approved
               </span>
            )} */}
            {builderId ? (
               isApproved ? (
                  <span
                     style={{
                        color: "White",
                        backgroundColor: "green",
                        padding: "5px 10px",
                        borderRadius: "5px",
                     }}
                  >
                     Approved
                  </span>
               ) : (
                  <Button variant="warning" onClick={callApproveBuilderProfile}>
                     Under Review
                  </Button>
               )
            ) : null}
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
                        </div>
                        <Row className="pb-4">
                           <Col lg="2">
                              <div className="image-upload builderProfileImage">
                                 <label htmlFor="upload-input" className="upload-label">
                                    <TiCameraOutline className="camera-icon" />
                                    <span className="pt-3">
                                       {data.builderLogoImageAsBase64
                                          ? "Change logo"
                                          : "Upload logo"}
                                    </span>
                                    <input
                                       id="upload-input"
                                       type="file"
                                       className="upload-input"
                                       accept="image/*"
                                       onChange={handleLogoUpload}
                                       ref={fileInputRef}
                                    />

                                    {/* Displaying the uploaded image */}
                                    {data.builderLogoImageAsBase64 && (
                                       <div className="image-preview">
                                          <img
                                             src={data.builderLogoImageAsBase64}
                                             alt="Builder Logo"
                                             className="preview-img"
                                          />
                                       </div>
                                    )}

                                    {/* Check for S3 URL if Base64 is not available */}
                                    {!data.builderLogoImageAsBase64 &&
                                       data.builderLogoS3ImageUrl && (
                                          <div className="image-preview">
                                             <img
                                                src={`${CONSTANTS.CONFIG_PROPERTY.s3Url}/${data.builderLogoS3ImageUrl}`}
                                                alt="Builder Logo"
                                                className="preview-img"
                                             />
                                          </div>
                                       )}
                                 </label>
                              </div>
                           </Col>

                           {/* Row 1 */}

                           <Col lg="10">
                              <Row className="pb-3">
                                 <Col lg="5">
                                    <Form.Group controlId="brandName">
                                       <Form.Control
                                          className="builderFormControl"
                                          type="text"
                                          maxLength="35"
                                          placeholder="Brand Name"
                                          name="brandName"
                                          value={data.brandName || ""}
                                          onChange={handleChange}
                                       />
                                       <Text color="dangerText" size="xSmall" className="pt-2" />
                                    </Form.Group>
                                 </Col>
                                 <Col lg="5">
                                    <Form.Group controlId="formBasicContact">
                                       <Form.Control
                                          className="builderFormControl"
                                          type="text"
                                          maxLength="35"
                                          placeholder="Company Name"
                                          name="companyName"
                                          value={data.companyName || ""}
                                          onChange={handleChange}
                                       />
                                       <Text color="dangerText" size="xSmall" className="pt-2" />
                                    </Form.Group>
                                 </Col>
                              </Row>
                              <Row>
                                 <Col lg="5">
                                    <Form.Group controlId="companyEmail">
                                       <Form.Control
                                          className="builderFormControl"
                                          type="text"
                                          placeholder="Company Email "
                                          name="companyEmail"
                                          value={data.companyEmail || ""}
                                          onChange={handleChange}
                                       />
                                       <Text
                                          color="dangerText"
                                          size="xSmall"
                                          className="pt-2"
                                          // text={error.email}
                                       />
                                    </Form.Group>
                                 </Col>
                                 <Col lg="5">
                                    <Form.Group controlId="companyGst">
                                       <Form.Control
                                          className="builderFormControl"
                                          type="text"
                                          placeholder="Company GST"
                                          name="companyGst"
                                          value={data.companyGst || ""}
                                          onChange={handleChange}
                                       />
                                       <Text
                                          color="dangerText"
                                          size="xSmall"
                                          className="pt-2"
                                          // text={error.alternatePhoneNumber}
                                       />
                                    </Form.Group>
                                 </Col>
                              </Row>
                              {/* Row 2 */}
                           </Col>
                        </Row>
                        <Row className="align-items-center mb-3">
                           <Col lg="12">
                              <Form.Group controlId="companyAddress">
                                 <Form.Control
                                    className="builderFormControl"
                                    type="text"
                                    placeholder="Address"
                                    name="companyAddress"
                                    value={data.companyAddress || ""}
                                    onChange={handleChange}
                                    onWheel={() => document.activeElement.blur()}
                                 />
                                 <Text color="dangerText" size="xSmall" className="pt-2" />
                              </Form.Group>
                           </Col>
                        </Row>
                        {/* Row 3 */}
                        <Row className="align-items-center mt-3">
                           {Array(4)
                              .fill()
                              .map((_, index) => (
                                 <Col key={index} lg="4">
                                    <Form.Group controlId={`directorName${index + 1}`}>
                                       <Form.Control
                                          className="builderFormControl"
                                          type="text"
                                          placeholder={`Director Name ${index + 1}${
                                             index > 1 ? " (Optional)" : ""
                                          }`}
                                          name={`directorName${index + 1}`}
                                          value={data.directors[index] || ""} // Access directors from data
                                          onChange={handleChange}
                                          onWheel={() => document.activeElement.blur()}
                                       />
                                       <Text color="dangerText" size="xSmall" className="pt-2" />
                                    </Form.Group>
                                 </Col>
                              ))}

                           <Col lg="4" className="mt-3">
                              <Form.Group controlId="facebook">
                                 <Form.Control
                                    className="builderFormControl"
                                    type="text"
                                    placeholder="www.facebook.com/accountname"
                                    name="companyFacebookUrl"
                                    value={data.companyFacebookUrl || ""}
                                    onChange={handleChange}
                                    onWheel={() => document.activeElement.blur()}
                                 />
                                 <Text color="dangerText" size="xSmall" className="pt-2" />
                              </Form.Group>
                           </Col>
                           <Col lg="4" className="mt-3">
                              <Form.Group controlId="instagram">
                                 <Form.Control
                                    className="builderFormControl"
                                    type="text"
                                    placeholder="www.instagram.com/@accountname"
                                    name="companyInstagramUrl"
                                    value={data.companyInstagramUrl || ""}
                                    onChange={handleChange}
                                    onWheel={() => document.activeElement.blur()}
                                 />
                                 <Text color="dangerText" size="xSmall" className="pt-2" />
                              </Form.Group>
                           </Col>
                        </Row>

                        <Row className="align-items-center">
                           <Col lg="4" style={{ height: "104px" }}>
                              <Form.Group controlId="whatsappNumber">
                                 <Form.Label className="mb-0 mr-2" style={{ whiteSpace: "nowrap" }}>
                                    Whatsapp Business Number
                                 </Form.Label>
                                 <Form.Control
                                    className="builderFormControl"
                                    type="number"
                                    placeholder="Enter Phone Number"
                                    name="whatsappNumber"
                                    value={data.whatsappNumber || ""}
                                    onChange={handleChange}
                                    style={{ flex: "1" }} // To ensure the input takes the remaining space
                                 />
                                 <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    // text={error.phoneNumber}
                                 />
                              </Form.Group>
                           </Col>
                           <Col lg="4">
                              <Form.Group controlId="contactPersonName">
                                 <Form.Control
                                    className="builderFormControl"
                                    type="text"
                                    placeholder="Contact Person Name"
                                    name="contactPersonName"
                                    value={data.contactPersonName || ""}
                                    onChange={handleChange}
                                    onWheel={() => document.activeElement.blur()}
                                 />
                                 <Text color="dangerText" size="xSmall" className="pt-2" />
                              </Form.Group>
                           </Col>
                           <Col lg="4" style={{ height: "104px" }}>
                              <Form.Group controlId="mobile">
                                 <Form.Label className="mb-0 mr-2" style={{ whiteSpace: "nowrap" }}>
                                    Mobile Number
                                 </Form.Label>
                                 <Form.Control
                                    className="builderFormControl"
                                    type="number"
                                    placeholder="Enter Phone Number"
                                    name="mobile"
                                    value={data.mobile || ""}
                                    onChange={handleChange}
                                    style={{ flex: "1" }} // To ensure the input takes the remaining space
                                 />
                                 <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    // text={error.phoneNumber}
                                 />
                              </Form.Group>
                           </Col>
                        </Row>
                     </div>
                     <Row>
                        <Col lg="12">
                           <Form.Check
                              type="checkbox"
                              id="custom-checkbox"
                              label="I declare that I represent the above details to be true and as my own organisation and SmartDoor may take requisite action if any detail is found to be untrue."
                              checked={isChecked}
                              onChange={handleCheckboxChange}
                              className="custom-checkbox"
                           />
                        </Col>
                     </Row>
                     <Row>
                        <Col lg="3">
                           <button
                              type="submit"
                              className="btn-small submit-btn"
                              id="submit-team-member-button"
                              // className={`btn-small submit-btn ${
                              //    isFormValid ? "active-btn" : "disabled-btn"
                              // }`}
                              // disabled={!isFormValid} // Button disabled until all fields are filled
                           >
                              Submit
                           </button>
                        </Col>
                     </Row>
                  </div>

                  {/* <div className="optional-field">
                           <span className="d-flex justify-content-end">*Optional</span>

                           <Row>
                              <Col lg="5">
                                 <Form.Group controlId="adhaarNumber">
                                    <div className="input-wrapper">
                                       <Form.Control
                                          type="number"
                                          className="aadhaar-input"
                                          placeholder="Aadhaar Number "
                                          name="adhaarNumber"
                                          value={data.adhaarNumber || ""}
                                          onChange={handleChange}
                                       />
                                       <Text
                                          color="dangerText"
                                          size="xSmall"
                                          className="pt-2"
                                          // text={error.phoneNumber}
                                       />
                                       <button type="button" className="verify-btn">
                                          Verify
                                       </button>
                                    </div>
                                 </Form.Group>
                              </Col>

                              <Col lg="5">
                                 <Form.Group controlId="companyPan">
                                    <Form.Control
                                       type="text"
                                       placeholder="Company PAN"
                                       onWheel={() => document.activeElement.blur()}
                                       name="companyPan"
                                       value={data.companyPan || ""}
                                       onChange={handleChange}
                                    />
                                    <Text
                                       color="dangerText"
                                       size="xSmall"
                                       className="pt-2"
                                       // text={error.phoneNumber}
                                    />
                                 </Form.Group>
                              </Col>
                           </Row>

                           <Row>
                              <Col lg="3">
                                 <button
                                    type="submit"
                                    // disabled={this.state.disableSubmit}
                                    id="submit-team-member-button"
                                    className=" btn-small submit-btn"
                                 >
                                    Submit
                                 </button>
                              </Col>
                           </Row>
                        </div> */}
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
                     Your request for Builder profile has been sent to the SmartDoor Admin. We will
                     sent you the updates to your registered email address.
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

            {/* <div className="col-md-3">
                     <div className="coupons-section">
                        <img
                           src="/path/to/smartCouponsImage.png"
                           alt="Smart Coupons"
                           className="coupons-image"
                        />
                        <div className="coupons-info">
                           <h3>Get verified and activate your SmartCoupons</h3>
                           <p>For posting and generating leads</p>
                           <p>Please get verified by Aadhaar number</p>
                           <span>Get free 5000 Coupons</span>
                        </div>
                     </div>
                  </div> */}
         </div>
      </div>
   );
};

export default BuilderProfileDetails;
