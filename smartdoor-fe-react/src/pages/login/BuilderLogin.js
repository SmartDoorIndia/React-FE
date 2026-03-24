/** @format */

import React, { useState, memo, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useDispatch } from "react-redux";
import { validateLogin } from "../../common/validations/ValidationLogin";
import { actionGetOtp, actionLogin, actionGetOtpForNewUser } from "../../common/redux/actions";
import {
   setLocalStorage,
   showErrorToast,
   showSuccessToast,
   stringToBase64,
} from "../../common/helpers/Utils";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./BuilderLogin.scss";
import Logo from "../../assets/images/smartdoor-logo.svg";
import { Form } from "react-bootstrap";
import Text from "../../shared/Text/Text";
import { useUserContext } from "../../common/helpers/Auth";

const BuilderLogin = (props) => {
   const [userNumber, setUserNumber] = useState("");
   const [buttonDisable, setButtonDisable] = useState(false);
   const [error, setError] = useState({ userNumber: null });
   const dispatch = useDispatch();
   const history = useHistory();
   const [showOTP, setShowOTP] = useState(false);
   const num1 = useRef();
   const num2 = useRef();
   const num3 = useRef();
   const num4 = useRef();

   // State Hooks
   const [loginData, setLoginData] = useState({
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      disable: true,
   });
   const [count, setCount] = useState(60);
   const { loginUser, storeUserInfo } = useUserContext();
   const [userExists, setUserExists] = useState(false);
   const timerRef = useRef(null); // Store interval ID
   const isMountedRef = useRef(true);

   useEffect(() => {
      isMountedRef.current = true;

      return () => {
         isMountedRef.current = false;
         if (timerRef?.current) clearInterval(timerRef?.current);
      };
   }, []);

   const handleOtp1Change = (e) => {
      setLoginData({
         ...loginData,
         otp1: e,
         disable: !(e && loginData.otp2 && loginData.otp3 && loginData.otp4),
      });
      console.log(userNumber);
      console.log(e, "gggggggggggggggggggggg");
      // if(otpValue.length<0){
      //   num1.current.focus();
      // }
      if (e.length === 1) {
         num2.current.focus();
      }
   };

   const handleOtp2Change = (e) => {
      setLoginData({
         ...loginData,
         otp2: e,
         disable: !(loginData.otp1 && e && loginData.otp3 && loginData.otp4),
      });
      const otpValue = loginData.otp1 + loginData.otp2 + loginData.otp3 + loginData.otp4;

      if (otpValue.length > 1) {
         num1.current.focus();
      }
      if (e.length === 1) {
         num3.current.focus();
      }
   };

   const handleOtp3Change = (e) => {
      setLoginData({
         ...loginData,
         otp3: e,
         disable: !(loginData.otp1 && loginData.otp2 && e && loginData.otp4),
      });
      const otpValue = loginData.otp1 + loginData.otp2 + loginData.otp3 + loginData.otp4;

      if (otpValue.length > 2) {
         num2.current.focus();
      }
      if (e.length === 1) {
         num4.current.focus();
      }
   };

   const handleOtp4Change = (e) => {
      setLoginData({
         ...loginData,
         otp4: e,
         disable: !(loginData.otp1 && loginData.otp2 && loginData.otp3 && e),
      });
      const otpValue = loginData.otp1 + loginData.otp2 + loginData.otp3 + loginData.otp4;

      if (otpValue.length > 3) {
         num3.current.focus();
      }
   };

   const handleResendOtp = async () => {
      setLoginData({
         otp1: "",
         otp2: "",
         otp3: "",
         otp4: "",
         disable: true,
      });
      setButtonDisable(true);
      props
         .actionGetOtp({ mobile: userNumber })
         .then((response) => {
            setButtonDisable(false);
            if (response.data.status === 200) {
               showSuccessToast("OTP sent successfully");
               if (isMountedRef?.current && num1?.current) num1?.current?.focus();
               setCount(60);
               setTimer();
            }
         })
         .catch((error) => {
            setButtonDisable(false);
            console.log(error);
         });
   };

   useEffect(() => {
      return () => {
         if (timerRef?.current) clearInterval(timerRef?.current);
      };
   }, []);

   const validateMobileNumber = (event) => {
      event.preventDefault();
      const validate = validateLogin({ userNumber });
      setError(validate.errors);
      if (validate.isValid) {
         handleArrowClick();
      }
   };

   const changeHandler = (e) => {
      const result = e.target.value.replace(/\D/g, "");
      setUserNumber(result.slice(0, 10));
   };

   const setTimer = useCallback(() => {
      // Clear any existing timer before starting a new one
      if (timerRef.current) clearInterval(timerRef.current);

      setCount(60); // reset timer

      timerRef.current = setInterval(() => {
         // Do not run setState if unmounted
         if (!isMountedRef?.current) return;

         setCount((prevCount) => {
            if (prevCount <= 1) {
               clearInterval(timerRef.current);
               return 0;
            }
            return prevCount - 1;
         });
      }, 1000);
   }, []);

   const handleArrowClick = () => {
      props
         .actionGetOtp({ mobile: userNumber })
         .then((response) => {
            // setButtonDisable(false)
            if (Object.keys(response.data).length === 0) {
               showErrorToast("Unable to generate OTP");
            }
            if (response?.status === 200) {
               setShowOTP(true);
               setTimer();
               setUserExists(response?.data?.resourceData);
               showSuccessToast("OTP sent successfully");
            } else {
               showErrorToast(response.data.message);
            }
         })
         .catch((error) => {
            setButtonDisable(false);
            console.log(error);
         });
      // setShowOTP(true);
   };

   const validateForm = (event) => {
      event.preventDefault();
      handleSubmit();
   };

   const handleSubmit = () => {
      const otpValue = loginData.otp1 + loginData.otp2 + loginData.otp3 + loginData.otp4;
      console.log("otpValue@@@@:", otpValue);
      console.log(otpValue.length, "loginDataaaaaaaaaaaaaaaaaaaaaaaaa");
      if (otpValue.length !== 4) {
         showErrorToast("Enter a valid otp");
      } else handleLogin(otpValue);
   };

   const handleLogin = async (otpValue) => {
      console.log("otpValue:", otpValue);
      setButtonDisable(true);
      const passwordToBase64 = stringToBase64(otpValue);
      if (userExists) {
         await props
            // .actionLogin({ username: userNumber, password: passwordToBase64 })
            .actionLogin({ mobileNumber: userNumber, otp: otpValue })
            .then(async (response) => {
               setButtonDisable(false);
               if (response.data) {
                  if (response.data.access_token) {
                     setLocalStorage("authData", response.data);
                     loginUser();
                  } 
                  setLoginData((prevData) => ({
                     ...prevData,
                     value: "",
                     otp1: "",
                     otp2: "",
                     otp3: "",
                     otp4: "",
                     disable: true,
                  }));
                  if (isMountedRef?.current && num1?.current) {
                     num1?.current?.focus();
                  }
               }
            })
            .catch((error) => {
               setButtonDisable(false);
               console.log(error);
            });
      } else {
         await props
            .actionGetOtpForNewUser({ mobileNumber: userNumber, otp: otpValue })
            .then((response) => {
               setButtonDisable(false);
               if (response.data) {
                  if (response.data.access_token) storeUserInfo();
               } else if (response?.data?.status === 500) {
                  showErrorToast(response?.data?.message);
               }
            })
            .catch((error) => {
               setButtonDisable(false);
               console.log(error);
            });
      }
   };

   return (
      <div className="builder-login">
         <div className="container">
            {/* <div className="justify-self-end" style={{ justifySelf: "end" }}>
               <button
                  type="submit"
                  className={`submit-button clickable w-auto`}
                  onClick={() => {
                     window.open("/login", "_blank");
                  }}
               >
                  Sign In as Admin
               </button>
            </div> */}
            <div className="row d-flex justify-content-center">
               <div className="col-md-6 col-xs-12 d-flex justify-content-center">
                  <div className="login-box">
                     <img src={Logo} alt="SmartDoor Logo" className="logo" />
                     <h2>Welcome</h2>
                     <p>Sign In</p>

                     <div className="d-flex flex-column " style={{ gap: "30px" }}>
                        <form noValidate onSubmit={validateMobileNumber} autoComplete="off">
                           <div className="input-group">
                              <input
                                 type="text"
                                 value={userNumber}
                                 onChange={changeHandler}
                                 name="userNumber"
                                 maxLength="10"
                                 className="input-field"
                                 id="phone-number"
                                 autoFocus
                                 contentEditable={!showOTP}
                                 onKeyDown={(e) => {
                                    if (e.key === "Enter" && userNumber.length === 10) {
                                       e.preventDefault(); // Prevent form submission
                                       handleArrowClick(); // Call the click handler
                                    }
                                 }}
                              />
                              <label htmlFor="phone-number">Phone Number</label>
                              <FontAwesomeIcon
                                 icon={faArrowRight}
                                 type="submit"
                                 onClick={handleArrowClick}
                                 className={`input-icon ${
                                    userNumber.length === 10 ? "clickable" : "disabled"
                                 }`}
                                 style={{
                                    cursor: userNumber.length === 10 ? "pointer" : "not-allowed",
                                    opacity: userNumber.length === 10 ? 1 : 0.5,
                                 }}
                              />
                           </div>
                        </form>
                        {error.userNumber && <p className="error-text">{error.userNumber}</p>}

                        {showOTP ? (
                           <>
                              <form noValidate onSubmit={validateForm} autoComplete="off">
                                 <div className="d-flex justify-content-center mt-4">
                                    <Form.Group className="mr-2 otpWrap">
                                       <Form.Control
                                          autoFocus
                                          name="otp1"
                                          className="otpInput"
                                          type="text"
                                          maxLength="1"
                                          size="1"
                                          max="1"
                                          pattern="[0–9]{1}"
                                          value={loginData.otp1}
                                          onChange={(e) =>
                                             handleOtp1Change(e.target.value.replace(/[^0-9]/g, ""))
                                          }
                                          ref={num1}
                                       />
                                       <span className="dashBottom"></span>
                                    </Form.Group>
                                    <Form.Group className="mr-2 otpWrap">
                                       <Form.Control
                                          name="otp2"
                                          className="otpInput"
                                          type="text"
                                          maxLength="1"
                                          size="1"
                                          max="1"
                                          pattern="[0–9]{1}"
                                          value={loginData.otp2}
                                          onChange={(e) =>
                                             handleOtp2Change(e.target.value.replace(/[^0-9]/g, ""))
                                          }
                                          ref={num2}
                                       />
                                       <span className="dashBottom"></span>
                                    </Form.Group>
                                    <Form.Group className="mr-2 otpWrap">
                                       <Form.Control
                                          name="otp3"
                                          className="otpInput"
                                          type="text"
                                          maxLength="1"
                                          size="1"
                                          max="1"
                                          pattern="[0–9]{1}"
                                          value={loginData.otp3}
                                          onChange={(e) =>
                                             handleOtp3Change(e.target.value.replace(/[^0-9]/g, ""))
                                          }
                                          ref={num3}
                                       />
                                       <span className="dashBottom"></span>
                                    </Form.Group>
                                    <Form.Group className="mr-2 otpWrap">
                                       <Form.Control
                                          name="otp4"
                                          className="otpInput"
                                          type="text"
                                          maxLength="1"
                                          size="1"
                                          max="1"
                                          pattern="[0–9]{1}"
                                          value={loginData.otp4}
                                          onChange={(e) =>
                                             handleOtp4Change(e.target.value.replace(/[^0-9]/g, ""))
                                          }
                                          ref={num4}
                                       />
                                       <span className="dashBottom"></span>
                                    </Form.Group>
                                 </div>
                                 <div className="resend-container">
                                    {count === 0 ? (
                                       <span
                                          className="Resend-otp-btn mt-2"
                                          onClick={handleResendOtp}
                                          style={{ cursor: "pointer" }}
                                       >
                                          Resend otp
                                       </span>
                                    ) : (
                                       <>
                                          <Text
                                             text="Didn’t received yet?"
                                             fontWeight="mediumbold"
                                             color="secondry-color"
                                             className="fs-16 d-block"
                                          />
                                          <Text
                                             text="Request new code in "
                                             fontWeight="fw500"
                                             color="gray"
                                             className="fs-14"
                                          />
                                          <Text
                                             text={`00:${count}`}
                                             fontWeight="fw500"
                                             color="gray"
                                             className="fs-14 countdown"
                                          />
                                       </>
                                    )}
                                 </div>
                                 <button
                                    type="submit"
                                    className={`submit-button ${
                                       loginData.disable || buttonDisable ? "disabled" : "clickable"
                                    }`}
                                    disabled={loginData.disable || buttonDisable}
                                 >
                                    Sign In
                                 </button>
                              </form>
                           </>
                        ) : null}
                        <div className="social-icons">
                           <a
                              onClick={() => {
                                 window.open(
                                    "https://www.facebook.com/profile.php?id=100094630133513",
                                    "_blank"
                                 );
                              }}
                           >
                              {" "}
                              <FontAwesomeIcon icon={faFacebookF} />{" "}
                           </a>
                           <a
                              onClick={() => {
                                 window.open(
                                    "https://www.instagram.com/smart_door_official/",
                                    "_blank"
                                 );
                              }}
                           >
                              <FontAwesomeIcon icon={faInstagram} />
                           </a>
                           {/* <a href="#">
                              <FontAwesomeIcon icon={faTwitter} />
                           </a> */}
                        </div>
                     </div>
                  </div>
               </div>
               {/* <div className="col-md-6"></div> */}
               <div className="col-md-6 col-xs-12 d-flex justify-content-center align-items-center">
                  <ul className="" style={{ fontSize: "20px", fontWeight: "700", color: "white" }}>
                     <li>
                        Boost the sales of your project by posting the same on our platform for free
                        of next 6 months
                     </li>
                     <li>
                        Get live feed / recordings of all visitors to your sample property on your
                        mobile in form the videos and phone number for package of Rs.20,000/-
                        upfront
                     </li>
                     <li>
                        Offer the USP of free sale or rent (conditions apply) of the property
                        supported by SmartDoor to your customers, in case you choose SmartDoor for
                        your properties.
                     </li>
                     <li>
                        Put on sale any residual property you might be having in your earlier
                        projects and showcase the same on SmartDoor app without spending any cost of
                        sales resources and your total control and monitoring.
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};

const mapStateToProps = ({ otp }) => ({
   otp,
});

const actions = {
   // BuilderGetOtp,
   actionGetOtp,
   actionLogin,
   actionGetOtpForNewUser,
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(BuilderLogin);
