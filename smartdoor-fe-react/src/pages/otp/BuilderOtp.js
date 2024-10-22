/** @format */

import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom"; // For retrieving the passed state
import { connect, useDispatch } from "react-redux";
import { compose } from "redux";
import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./BuilderOtp.scss";
import Form from "react-bootstrap/Form";
import Buttons from "../../shared/Buttons/Buttons";
import Logo from "../../assets/images/smartdoor-logo.svg";
import Image from "../../shared/Image/Image";
import Text from "../../shared/Text/Text";

import { BuilderLogin, BuilderGetOtp, BuilderSignup } from "../../common/redux/actions";
import {
   setLocalStorage,
   showErrorToast,
   showSuccessToast,
   stringToBase64,
} from "../../common/helpers/Utils";
import { useUserContext } from "../../common/helpers/Auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BuilderOtp = (props) => {
   const location = useLocation();
   const mobile = location.state.mobile; // Retrieve the mobile number from state
   const userExists = location.state.userExists; // Retrieve the mobile number from state
   const dispatch = useDispatch();
   const history = useHistory();
   // Custom Hooks
   const { loginUser } = useUserContext();

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
   const [buttonDisable, setButtonDisable] = useState(false);
   const [count, setCount] = useState(60);

   const validateForm = (event) => {
      event.preventDefault();
      handleSubmit();
   };

   const handleSubmit = () => {
      const otpValue = loginData.otp1 + loginData.otp2 + loginData.otp3 + loginData.otp4;
      if (otpValue.length !== 4) {
         showErrorToast("Enter a valid OTP");
      } else {
         handleLogin(otpValue);
      }
   };
   // const handleLogin = async (otpValue) => {
   //    setButtonDisable(true);
   //    const passwordToBase64 = stringToBase64(otpValue); // Convert OTP to Base64
   //    if (userExists) {
   //       // User exists, proceed with login
   //       const response = await dispatch(
   //          BuilderLogin({ mobile: mobile, password: passwordToBase64 })
   //       );
   //       if (response.status === 200) {
   //          showSuccessToast("Login successful");
   //          console.log("auth response:- ", response);
   //          setLocalStorage("authData", response.data);
   //          history.push("/builder/detail"); // Redirect to login page or intended page
   //       } else {
   //          showErrorToast("Login failed");
   //       }
   //       //  props
   //       //     .BuilderLogin({ username: mobile, password: passwordToBase64 })
   //       //     .then((response) => {
   //       //        setLocalStorage("authData", response.data);
   //       //        setButtonDisable(false);
   //       //        if (response.data && response.data.access_token) {
   //       //           showSuccessToast("Login successful");
   //       //           history.push("/admin/execution"); // Redirect to the dashboard or intended page
   //       //        }
   //       //     })
   //       //     .catch((error) => {
   //       //        setButtonDisable(false);
   //       //        // Check for specific error message and display update instruction
   //       //        if (
   //       //           error.response &&
   //       //           error.response.status === 404 &&
   //       //           error.response.data.message.includes("old version")
   //       //        ) {
   //       //           showErrorToast(
   //       //              "Your application is outdated. Please update to the latest version."
   //       //           );
   //       //        } else {
   //       //           showErrorToast("Login failed");
   //       //           console.log(error);
   //       //        }
   //       //     });
   //    } else {
   //       // User does not exist, handle sign-up
   //       try {
   //          const response = await dispatch(BuilderSignup({ mobile: mobile, otp: otpValue }));
   //          if (response.status === 200) {
   //             showSuccessToast("Sign Up successful");
   //             setLocalStorage("authData", response.data);
   //             history.push("/builder/detail"); // Redirect to login page or intended page
   //          } else {
   //             showErrorToast("Sign Up failed");
   //          }
   //       } catch (error) {
   //          showErrorToast("Sign Up error");
   //          console.log(error);
   //       } finally {
   //          setButtonDisable(false);
   //       }
   //    }
   // };
   const handleLogin = async (otpValue) => {
      setButtonDisable(true);
      const passwordToBase64 = stringToBase64(otpValue); // Convert OTP to Base64

      if (userExists) {
         // User exists, proceed with login
         try {
            const response = await dispatch(
               BuilderLogin({ mobile: mobile, password: passwordToBase64 })
            );

            if (response?.status === 200) {
               showSuccessToast("Login successful");
               console.log("auth response:", response);

               // Store auth data in local storage
               setLocalStorage("authData", response.data);

               // Delay redirect to ensure auth data is set
               window.location.href = "/builder/detail";
            } else {
               showErrorToast("Login failed");
            }
         } catch (error) {
            showErrorToast("Login error");
            console.log("Login error:", error);
         } finally {
            setButtonDisable(false);
         }
      }
   };

   const handleOtpChange = (e, refNext) => {
      const { name, value } = e.target;
      setLoginData((prevData) => ({
         ...prevData,
         [name]: value.replace(/[^0-9]/g, ""),
      }));

      if (value.length === 1 && refNext) {
         refNext.current.focus();
      }
   };

   const handleOtp1Change = (e) => {
      setLoginData({ ...loginData, otp1: e });
      // const otpValue = loginData.otp1 + loginData.otp2 + loginData.otp3 + loginData.otp4
      console.log(userExists);
      console.log(mobile);
      console.log(e, "gggggggggggggggggggggg");
      // if(otpValue.length<0){
      //   num1.current.focus();
      // }
      if (e.length === 1) {
         num2.current.focus();
      }
   };

   const handleOtp2Change = (e) => {
      setLoginData({ ...loginData, otp2: e });
      const otpValue = loginData.otp1 + loginData.otp2 + loginData.otp3 + loginData.otp4;

      if (otpValue.length > 1) {
         num1.current.focus();
      }
      if (e.length === 1) {
         num3.current.focus();
      }
   };

   const handleOtp3Change = (e) => {
      setLoginData({ ...loginData, otp3: e });
      const otpValue = loginData.otp1 + loginData.otp2 + loginData.otp3 + loginData.otp4;

      if (otpValue.length > 2) {
         num2.current.focus();
      }
      if (e.length === 1) {
         num4.current.focus();
      }
   };

   const handleOtp4Change = (e) => {
      setLoginData({ ...loginData, otp4: e });
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
         .BuilderGetOtp({ mobile })
         .then((response) => {
            setButtonDisable(false);
            if (response.data.status === 200) {
               showSuccessToast("OTP sent successfully");
               num1.current.focus();
               setCount(60);
            }
         })
         .catch((error) => {
            setButtonDisable(false);
            console.log(error);
         });
   };

   useEffect(() => {
      const timer = setTimeout(() => setCount(count > 0 ? count - 1 : 0), 1000);
      return () => clearTimeout(timer);
   }, [count]);

   return (
      <div className="builder-otp">
         <div className="container">
            <div className="row d-flex justify-content-center">
               <div className="col-md-6 d-flex justify-content-center">
                  <div className="login-box">
                     <img src={Logo} alt="SmartDoor Logo" className="logo" />
                     <h2>Welcome</h2>
                     <p>Builder Sign In</p>

                     <div className="d-flex flex-column " style={{ gap: "30px" }}>
                        <form noValidate onSubmit={validateForm} autoComplete="off">
                           <div className="input-group">
                              <input
                                 type="text"
                                 value={mobile}
                                 readOnly
                                 name="userNumber"
                                 className="input-field"
                                 id="phone-number"
                              />
                              <label htmlFor="phone-number">Phone Number</label>
                              <FontAwesomeIcon
                                 icon={faArrowRight}
                                 className="input-icon clickable"
                              />
                           </div>

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
                              <p onClick={handleResendOtp}>Resend OTP</p>
                           </div>
                           <button type="submit" className="submit-button" disabled={buttonDisable}>
                              Sign In
                           </button>
                        </form>
                        <div className="social-icons">
                           <a href="#">
                              {" "}
                              <FontAwesomeIcon icon={faFacebookF} />{" "}
                           </a>
                           <a href="#">
                              <FontAwesomeIcon icon={faInstagram} />
                           </a>
                           <a href="#">
                              <FontAwesomeIcon icon={faTwitter} />
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-md-6 d-flex justify-content-center align-items-center">
                  <ul className="otp-text">
                     <li>Boost the sales of your project by posting the same on our platform.</li>
                     <li>You will be charged only for Customer calls or messages.</li>
                     <li>Use your free coupons to try out this amazing feature.</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};

export default compose(connect(null, { BuilderLogin, BuilderGetOtp }))(BuilderOtp);
