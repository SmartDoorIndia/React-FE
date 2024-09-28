/** @format */

import "./Login.scss";

import Form from "react-bootstrap/Form";

import { useState, memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Col, Row } from "react-bootstrap";

import Buttons from "../../shared/Buttons/Buttons";
import Logo from "../../assets/images/smartdoor-logo.svg";
import Image from "../../shared/Image/Image";
import Text from "../../shared/Text/Text";

import { validateLogin } from "../../common/validations/ValidationLogin";
import { actionGetOtp } from "../../common/redux/actions";
import { showErrorToast, showSuccessToast } from "../../common/helpers/Utils";

const Login = (props) => {
   const [username, setUserName] = useState("");
   const [buttonDisable, setButtonDisable] = useState(false);
   const [error, setError] = useState({ username: null, password: null });
   console.log("login", props);

   // Call on Form Submit
   const validateForm = (event) => {
      event.preventDefault();
      const validate = validateLogin({ username });
      setError(validate.errors);
      if (validate.isValid) handleLogin();
   };

   const changeHandler = (e) => {
      const result = e.target.value.replace(/\D/g, "");
      setUserName(result.slice(0, 10));
   };

   // Call if Validate
   const handleLogin = async () => {
      setButtonDisable(true);
      props
         .actionGetOtp({ mobile: username })
         .then((response) => {
            setButtonDisable(false);

            if (Object.keys(response.data).length === 0) {
               showErrorToast("Unable to generate OTP");
            }

            if (response.data.status === 200) {
               showSuccessToast("OTP sent successfully");
               props.history.push({
                  pathname: "/otp",
                  state: { mobile: username },
               });
            }

            showErrorToast(response.data.message);
         })
         .catch((error) => {
            setButtonDisable(false);
            console.log(error);
         });
   };

   return (
      <div className="loginForm">
         <div className="container">
            <div className="centerBox">
               <Image name="Logo" src={Logo} className="mb-4" alt="SmartDoor Logo" />
               <Text size="large" color="black" fontWeight="mediumbold" text="Welcome" />
               <Text size="Small" color="gray" text="Sign in to continue" />
            </div>
            <form noValidate onSubmit={validateForm} autoComplete="off">
               <Row className="justify-content-center mt-4">
                  <Col lg="4">
                     <Form.Group controlId="formBasicEmail">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                           onWheel={() => document.activeElement.blur()}
                           type="text"
                           placeholder="Phone Number"
                           value={username}
                           onChange={(e) => changeHandler(e)}
                           name="username"
                           autoFocus
                        />
                        <Text
                           color="dangerText"
                           size="xSmall"
                           className="pt-2"
                           text={error.username}
                           autoFocus={true}
                        />
                     </Form.Group>
                     <Buttons
                        disabled={buttonDisable}
                        name="Get OTP"
                        varient="primary"
                        type="submit"
                        size="Small"
                        color="primary"
                     />
                  </Col>
               </Row>
            </form>
         </div>
      </div>
   );
};

const mapStateToProps = ({ otp }) => ({
   otp,
});

const actions = {
   //actionLogin,
   actionGetOtp,
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(Login);
