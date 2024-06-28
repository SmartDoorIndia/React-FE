import './Otp.scss';

import Form from 'react-bootstrap/Form'

import { useState, memo, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Container, Row, Col } from 'react-bootstrap';

import Buttons from '../../shared/Buttons/Buttons'
import Logo from '../../assets/images/smartdoor-logo.svg';
import Image from '../../shared/Image/Image';
import Text from '../../shared/Text/Text';

import { actionLogin, actionGetOtp } from '../../common/redux/actions';
import { showErrorToast, showSuccessToast, stringToBase64 } from '../../common/helpers/Utils';
import { useUserContext } from '../../common/helpers/Auth';

const Otp = (props) => {
  // Custom Hooks
  const { loginUser } = useUserContext();
  console.log("otp screen props", props);
  const num1 = useRef();
  const num2 = useRef();
  const num3 = useRef();
  const num4 = useRef();

  // State Hooks
  const [loginData, setLoginData] = useState({
    value: "",
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    disable: true
  })
  // const [username, setUserName] = useState('');
  // const [password, setPassword] = useState('');
  const [buttonDisable, setButtonDisable] = useState(false);
  // const [error, setError] = useState({ username: null, password: null });
  const [count, setCount] = useState(60);

  const validateForm = (event) => {
    event.preventDefault();
    handleSubmit();
  }

  const handleSubmit = () => {
    const otpValue = loginData.otp1 + loginData.otp2 + loginData.otp3 + loginData.otp4
    console.log("otpValue@@@@:", otpValue);
    console.log((otpValue).length,"loginDataaaaaaaaaaaaaaaaaaaaaaaaa");
    if (otpValue.length !== 4) {
      showErrorToast("Enter a valid otp")
    } else handleLogin(otpValue)
  }

  const handleLogin = async (otpValue) => {
    console.log("otpValue:", otpValue);
    setButtonDisable(true)
    const passwordToBase64 = stringToBase64(otpValue);
    props.actionLogin({ username: props.location.state.mobile, password: passwordToBase64 })
      .then((response) => {
        setButtonDisable(false)
        if (response.data) {
          if (response.data.access_token) loginUser();
          setLoginData({
            value: "",
            otp1: "",
            otp2: "",
            otp3: "",
            otp4: "",
            disable: true
          })
          num1.current.focus()
        }
      })
      .catch((error) => {
        setButtonDisable(false)
        console.log(error)
      })
  }

  const handleOtp1Change = (e) => {
    setLoginData({ ...loginData, otp1: e })
    // const otpValue = loginData.otp1 + loginData.otp2 + loginData.otp3 + loginData.otp4
    console.log(e,"gggggggggggggggggggggg")
    // if(otpValue.length<0){
    //   num1.current.focus();
    // }
    if(e.length===1){
      num2.current.focus();
    }
    
  }

  const handleOtp2Change = (e) => {
    setLoginData({ ...loginData, otp2: e })
    const otpValue = loginData.otp1 + loginData.otp2 + loginData.otp3 + loginData.otp4

    if(otpValue.length>1){
      num1.current.focus();
    }
    if(e.length===1) {
      num3.current.focus();

    }
  }

  const handleOtp3Change = (e) => {
    setLoginData({ ...loginData, otp3: e })
    const otpValue = loginData.otp1 + loginData.otp2 + loginData.otp3 + loginData.otp4

    if(otpValue.length>2){
      num2.current.focus();
    }
    if(e.length===1) { 
      num4.current.focus();
    }
  }

  const handleOtp4Change = (e) => {
    setLoginData({ ...loginData, otp4: e })
    const otpValue = loginData.otp1 + loginData.otp2 + loginData.otp3 + loginData.otp4

    if(otpValue.length>3){
      num3.current.focus();
    }
  }

  const handleResendOtp = async () => {
    setLoginData({
      value: "",
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      disable: true
    })
    setButtonDisable(true)
    props.actionGetOtp({ mobile: props.location.state.mobile })
      .then((response) => {
        setButtonDisable(false)
        if (response.data.status === 200) {
          showSuccessToast('OTP sent successfully')
          num1.current.focus()
          setCount(60)
        }
      })
      .catch((error) => {
        setButtonDisable(false)
        console.log(error)
      })
  }

  useEffect(() => {
    setTimeout(() => setCount(count > 0 ? count - 1 : 0), 1000)
  }, [count])

  return (
    <div className="loginForm">
      <Container>
      <form noValidate onSubmit={validateForm} autoComplete="off">

        <Row>
          <Col lg="5" md="6" className='mx-auto pt-md-5 pt-3 text-center'>
            <Image src={Logo}  name='logoImg'/>
            <Text size="large" color="black" fontWeight="mediumbold" text="Enter OTP" />
            <Text
              text="Enter 4 digits code sent to your phone number:"
              fontWeight="fw500"
              color="gray"
              className="fs-14 d-block"
            />
            <Text
              text={props.location.state.mobile}
              fontWeight="fw500"
              color="text-col2"
              className="fs-14"
            />
            <div className='d-flex justify-content-center my-4'>
              <Form.Group className='mr-2 otpWrap'>
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
                  onChange={(e) => handleOtp1Change((e.target.value).replace(/[^0-9]/g, ''))}
                  ref={num1}
                />
                <span className="dashBottom"></span>
              </Form.Group>
              <Form.Group className='mr-2 otpWrap'>
                <Form.Control
                  name="otp2"
                  className="otpInput"
                  type="text"
                  maxLength="1"
                  size="1"
                  max="1"
                  pattern="[0–9]{1}"
                  value={loginData.otp2}
                  onChange={(e) => handleOtp2Change((e.target.value).replace(/[^0-9]/g, ''))}
                  ref={num2}
                />
                <span className="dashBottom"></span>
              </Form.Group>
              <Form.Group className='mr-2 otpWrap'>
                <Form.Control
                  name="otp3"
                  className="otpInput"
                  type="text"
                  maxLength="1"
                  size="1"
                  max="1"
                  pattern="[0–9]{1}"
                  value={loginData.otp3}
                  onChange={(e) => handleOtp3Change((e.target.value).replace(/[^0-9]/g, ''))}
                  ref={num3}
                />
                <span className="dashBottom"></span>
              </Form.Group>
              <Form.Group className='mr-2 otpWrap'>
                <Form.Control
                  name="otp4"
                  className="otpInput"
                  type="text"
                  maxLength="1"
                  size="1"
                  max="1"
                  pattern="[0–9]{1}"
                  value={loginData.otp4}
                  onChange={(e) => handleOtp4Change((e.target.value).replace(/[^0-9]/g, ''))}
                  ref={num4}
                />
                <span className="dashBottom"></span>
              </Form.Group>
            </div>
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
            <Buttons disabled={count === 0 || buttonDisable ? true : false} variant="primary" name="Submit" type="submit" className="w-100 mt-4"  />
          </Col>
        </Row>
        </form>
      </Container>
    </div>
  )
}

const mapStateToProps = ({ login, otp }) => ({
  login,
  otp
});

const actions = {
  actionLogin,
  actionGetOtp
};

const withConnect = connect(
  mapStateToProps,
  actions,
);

export default compose(
  withConnect,
  memo,
)(Otp);