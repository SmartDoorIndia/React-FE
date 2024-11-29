/** @format */

import React, { useState, memo, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useDispatch } from "react-redux";
import { validateLogin } from "../../common/validations/ValidationLogin";
import { BuilderGetOtp, BuilderSignup } from "../../common/redux/actions";
import { setLocalStorage, showErrorToast, showSuccessToast, stringToBase64 } from "../../common/helpers/Utils";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./BuilderLogin.scss";
import Logo from "../../assets/images/smartdoor-logo.svg";
import { Form } from "react-bootstrap";
import Text from "../../shared/Text/Text";

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
   let userExists = false;
   const [count, setCount] = useState(60);

   const handleOtp1Change = (e) => {
      setLoginData({ ...loginData, otp1: e });
      // const otpValue = loginData.otp1 + loginData.otp2 + loginData.otp3 + loginData.otp4
      console.log(userExists);
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
         .BuilderGetOtp({ userNumber })
         .then((response) => {
            setButtonDisable(false);
            if (response.data.status === 200) {
               showSuccessToast("OTP sent successfully");
               num1.current.focus();
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
      // Cleanup function
      return () => {
         // Logic to cancel async tasks or API calls can go here if needed
      };
   }, []);

   const validateForm = (event) => {
      event.preventDefault();
      const validate = validateLogin({ userNumber });
      setError(validate.errors);
      if (validate.isValid) fetchOTP();
   };

   const changeHandler = (e) => {
      const result = e.target.value.replace(/\D/g, "");
      setUserNumber(result.slice(0, 10));
   };

   const setTimer = useCallback(() => {
      const timer = setInterval(() => {
         setCount(prevCount => {
            if (prevCount <= 0) {
               clearInterval(timer); // Stop the timer when count reaches 0
               return 0;
            }
            return prevCount - 1;
         });
      }, 1000);
   }, []); // No dependency needed



   const fetchOTP = async () => {
      setButtonDisable(true);
      const abortController = new AbortController(); // Create an abort controller
      const signal = abortController.signal;

      try {
         const response = await dispatch(BuilderGetOtp({ mobile: userNumber, signal }));
         if (signal.aborted) return;
         if (Object.keys(response.data).length === 0) {
            showErrorToast("Unable to generate OTP");
         } else if (response.data.status === 200) {
            setShowOTP(true);
            showSuccessToast("OTP sent successfully");
            userExists = response.data.resourceData;
            setTimer();
            // history.push({
            //    pathname: "/builder/BuilderOtp",
            //    state: { mobile: userNumber, userExists: response.data.resourceData },
            // });
         } else {
            showErrorToast(response.data.message);
         }
      } catch (error) {
         if (signal.aborted) return; // Stop execution if aborted
         setButtonDisable(false);
         console.log(error);
      }
      return () => {
         abortController.abort(); // Abort the request if the component unmounts
      };
   };

   const handleArrowClick = () => {
      fetchOTP();
      // if (userNumber) {
      //    history.push("/builder/BuilderOtp", { mobile: userNumber });
      // }
   };

   const handleLogin = async (otpValue) => {
      setButtonDisable(true);
      const passwordToBase64 = stringToBase64(otpValue); // Convert OTP to Base64

      if (userExists) {
         // User exists, proceed with login
         try {
            const response = await dispatch(
               BuilderLogin({ mobile: userNumber, password: passwordToBase64 })
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
      } else {
         try {
            const response = await dispatch(BuilderSignup({ mobile: userNumber, otp: otpValue }));
            if (response.status === 200) {
               showSuccessToast("Sign Up successful");
               setLocalStorage("authData", response.data);
               // Delay redirect to ensure auth data is set
               window.location.href = "/builder/detail";
            } else {
               showErrorToast("Sign Up failed");
            }
         } catch (error) {
            showErrorToast("Sign Up error");
            console.log(error);
         } finally {
            setButtonDisable(false);
         }
      }
   };

   return (
      <div className="builder-login">
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
                                 value={userNumber}
                                 onChange={changeHandler}
                                 name="userNumber"
                                 maxLength="10"
                                 className="input-field"
                                 id="phone-number"
                              />
                              <label htmlFor="phone-number">Phone Number</label>
                              <FontAwesomeIcon
                                 icon={faArrowRight}
                                 onClick={handleArrowClick}
                                 className={`input-icon ${userNumber.length === 10 ? "clickable" : "disabled"
                                    }`}
                                 style={{
                                    cursor: userNumber.length === 10 ? "pointer" : "not-allowed",
                                    opacity: userNumber.length === 10 ? 1 : 0.5,
                                 }}
                              />
                           </div>

                           {error.userNumber && <p className="error-text">{error.userNumber}</p>}

                           {showOTP ?
                              <>
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
                                    {count === 0 ?
                                       <span className="Resend-otp-btn mt-2" onClick={handleResendOtp}>Resend otp</span> :
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
                                       </>}
                                 </div>
                              </>
                              : null}
                           <button
                              type="submit"
                              className={`submit-button ${"disabled"
                                 }`}
                              onClick={() => { handleLogin() }}
                              disabled={true}
                           >
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
               <div className="col-md-6"></div>
            </div>
         </div>
      </div>
   );
};

const mapStateToProps = ({ otp }) => ({
   otp,
});

const actions = {
   BuilderGetOtp,
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(BuilderLogin);
