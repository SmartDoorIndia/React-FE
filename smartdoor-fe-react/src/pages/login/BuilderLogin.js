/** @format */

import React, { useState, memo, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useDispatch } from "react-redux";
import { validateLogin } from "../../common/validations/ValidationLogin";
import { BuilderGetOtp } from "../../common/redux/actions";
import { showErrorToast, showSuccessToast } from "../../common/helpers/Utils";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./BuilderLogin.scss";
import Logo from "../../assets/images/smartdoor-logo.svg";

const BuilderLogin = (props) => {
   const [userNumber, setUserNumber] = useState("");
   const [buttonDisable, setButtonDisable] = useState(false);
   const [error, setError] = useState({ userNumber: null });
   const dispatch = useDispatch();
   const history = useHistory();

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
      if (validate.isValid) handleLogin();
   };

   const changeHandler = (e) => {
      const result = e.target.value.replace(/\D/g, "");
      setUserNumber(result.slice(0, 10));
   };

   const handleLogin = async () => {
      setButtonDisable(true);
      const abortController = new AbortController(); // Create an abort controller
      const signal = abortController.signal;

      try {
         const response = await dispatch(BuilderGetOtp({ mobile: userNumber, signal }));
         if (signal.aborted) return;
         if (Object.keys(response.data).length === 0) {
            showErrorToast("Unable to generate OTP");
         } else if (response.data.status === 200) {
            showSuccessToast("OTP sent successfully");
            history.push({
               pathname: "/builder/BuilderOtp",
               state: { mobile: userNumber, userExists: response.data.resourceData },
            });
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
      handleLogin();
      if (userNumber) {
         history.push("/builder/BuilderOtp", { mobile: userNumber });
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
                                 className={`input-icon ${
                                    userNumber.length === 10 ? "clickable" : "disabled"
                                 }`}
                                 style={{
                                    cursor: userNumber.length === 10 ? "pointer" : "not-allowed",
                                    opacity: userNumber.length === 10 ? 1 : 0.5,
                                 }}
                              />
                           </div>

                           {error.userNumber && <p className="error-text">{error.userNumber}</p>}

                           <button
                              type="submit"
                              className={`submit-button ${
                                 userNumber.length === 10 ? "clickable" : "disabled"
                              }`}
                              onClick={handleArrowClick}
                              disabled={userNumber.length !== 10}
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
