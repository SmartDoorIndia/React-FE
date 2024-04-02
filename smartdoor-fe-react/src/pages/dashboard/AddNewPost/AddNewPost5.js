import { compose } from "redux"
import { connect } from "react-redux"
import { addNewPostReducer } from "../../../common/redux/reducers/views/addNewPost.reducer"
import { useSelector } from "react-redux"
import { getPlanDetails } from "../../../common/redux/actions/addNewPost.action"
import { useEffect, useState } from "react"
import Text from "../../../shared/Text/Text"
import { Card, Col } from "react-bootstrap"
import { Checkbox } from "@mui/material"
import { List, ListItem, Divider, ListItemText } from "@mui/material"
import {Form} from "react-bootstrap"
import Buttons from "../../../shared/Buttons/Buttons"
import validateRegex from '../../../common/helpers/ValidateRegex';
import { showToastErrMessage } from "../../../common/redux/actions"
import { showErrorToast } from "../../../common/helpers/Utils"
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min"

const AddNewPost5 = () => {
    // const { basicDetails } = useSelector(state => state.addNewPostReducer)
    const location = useLocation();
    const [basicDetails, setBasicDetails] = useState(location?.state?.basicDetails)
    const [addressDetails, setAddressDetails] = useState(location?.state?.addressDetails)
    const [moreInfo, setMoreIfo] = useState(location?.state?.moreInfo)
    const [planDetails, setPlanDetails] = useState([])
    const [selectedPlan, setSelectedPlan] = useState('');
    const [ emailId, setEmailId ] = useState('')
    const history = useHistory();
    const [propertyData, setPropertyData] = useState(location?.state?.propertyData)
    
    useEffect(() => {
        getPlans();
    }, [addNewPostReducer])

    const getPlans = async () => {
        const response = await getPlanDetails({});
        setPlanDetails(response)
        console.log(response)
    }

    function isBlank(str) {
        return !str || /^\s*$/.test(str);
    }
    
    const validatePlan = () => {
        if(!isBlank(selectedPlan)) {
            validateEmail();
        } else {
            showErrorToast("Please select plan")
        }
    }

    const validateEmail = () => {
        if(!isBlank(emailId)) {
            if(validateRegex.validateEmail.test(String(emailId).toLowerCase())) {
                console.log("valid email" + emailId)
            } else {
                showErrorToast("Please enter valid email id")
            }
        } else {
            showErrorToast("Please enter valid email id")
        }
    }
    

    return (
        <>
            <div className="whiteBg">
                <Text
                    className="p-2 h5"
                    size="medium"
                    fontWeight="mediumbold"
                    color="secondryColor"
                    text="Select Plan">
                </Text>
                <div className="d-flex" style={{ overflowX: 'scroll' }}>
                    {planDetails.length > 0 ? (
                        planDetails.map((plan) => {
                            return plan.id ? (

                                <Col lg="4" md="6" sm="10">
                                    <Card className="px-1" style={{ borderRadius: 14, border: plan.planName === selectedPlan ? '1px solid #BE1452':'' }}>
                                        <Card className="m-1 mt-2" style={{ borderRadius: 10, borderStyle: 'none', position: 'relative', backgroundImage: `url(${plan.plan_background_image})`, backgroundSize: 'cover' }}>
                                            <div className="d-flex">
                                                <Col lg="10" md="10">
                                                    <Text
                                                        className="p-1 h5 mt-2 w-auto"
                                                        size="medium"
                                                        fontWeight="mediumbold"
                                                        style={{ color: '#FFC100', width: 'fit-content' }}
                                                        text={plan?.planName}
                                                    />
                                                </Col>
                                                <Col lg="1" md="1" >
                                                    <Checkbox className="me-1" color="default" style={{
                                                        opacity: '0.7', borderRadius: 10, height: '36px', width: '36px', marginTop: '5px', backgroundColor: '#d9dde1',
                                                        borderTopLeftRadius: 0, borderBottomRightRadius: 0
                                                    }}
                                                        id={plan.planName}
                                                        value={plan?.planName}
                                                        checked={selectedPlan === plan?.planName}
                                                        onChange={() => { setSelectedPlan(plan.planName); console.log(plan?.planName) }} />
                                                </Col>
                                            </div>
                                            <span className="d-flex">
                                                <Text
                                                    className="px-3 h2"
                                                    fontSize="32"
                                                    fontWeight="mediumbold"
                                                    color={plan.plan_background_image !== '' ? "white" : 'yellow'}
                                                    text={plan?.baseRentalCoins}
                                                />
                                                <Text
                                                    className="py-2 h5"
                                                    size="medium"
                                                    fontWeight="900"
                                                    color="white"
                                                    text="SD Coins"
                                                />
                                            </span>
                                            <Text
                                                className="py-0 px-3 h5"
                                                fontWeight="500"
                                                style={{ color: '#70B8C2', fontSize: '15px' }}
                                                text="1 SD Coin = ₹ 1 + Applicable Tax*"
                                            />

                                        </Card>

                                        <div>
                                            <Text
                                                className="py-0 px-2 h5"
                                                fontWeight="500"
                                                style={{ color: '#23565D', fontSize: '18px', wordWrap: 'break-word' }}
                                                text={plan.description}
                                            />
                                        </div>
                                        <div>
                                            <List style={{width: '100%', maxWidth: 360, bgcolor: 'background.paper',}} component="nav" aria-label="mailbox folders">
                                                {plan.subscriptionMonth !== null && (
                                                    <>
                                                        <ListItem >
                                                            <ListItemText primary="Validity" style={{textAlign:'start', fontSize:'10px'}} />
                                                            <Text text={plan.subscriptionMonth + " Months"} 
                                                                style={{textAlign:'end', fontWeight:'bold', fontSize:'15px'}}/>
                                                        </ListItem>
                                                    </>
                                                )}
                                                <Divider />
                                                {(plan.deviceSmartLock !== null && plan.deviceSmartLock !== 'NOT_AVAILABLE') && (
                                                    <>
                                                        <ListItem >
                                                            <ListItemText primary="Fingerprint Smart Lock" style={{textAlign:'start', fontSize:'10px', wordWrap:'break-word'}} />
                                                            <Text text={plan.deviceSmartLock} 
                                                                style={{textAlign:'end', fontWeight:'bold', fontSize:'15px'}}/>
                                                        </ListItem>
                                                        <Divider />
                                                    </>
                                                )}
                                                {(plan.deviceSensor !== null && plan.deviceSensor !== 'NOT_AVAILABLE') && (
                                                    <>
                                                        <ListItem >
                                                            <ListItemText primary="Contact Sensor" style={{textAlign:'start', fontSize:'10px', 'text-wrap':'nowrap'}} />
                                                            <Text text={plan.deviceSensor} 
                                                                style={{textAlign:'end', fontWeight:'bold', fontSize:'15px'}}/>
                                                        </ListItem>
                                                        <Divider />
                                                    </>
                                                )}
                                                {(plan.deviceCamera !== null && plan.deviceCamera !== 'NOT_AVAILABLE') && (
                                                    <>
                                                        <ListItem >
                                                            <ListItemText primary="Security Camera" style={{textAlign:'start', fontSize:'10px', 'text-wrap':'nowrap'}} />
                                                            <Text text={plan.deviceCamera} 
                                                                style={{textAlign:'end', fontWeight:'bold', fontSize:'15px'}}/>
                                                        </ListItem>
                                                        <Divider />
                                                    </>
                                                )}
                                                {(plan.deviceHub !== null && plan.deviceHub !== 'NOT_AVAILABLE') && (
                                                    <>
                                                        <ListItem >
                                                            <ListItemText primary="Internet Hub" style={{textAlign:'start', fontSize:'10px', 'text-wrap':'nowrap'}} />
                                                            <Text text={plan.deviceHub} 
                                                                style={{textAlign:'end', fontWeight:'bold', fontSize:'15px'}}/>
                                                        </ListItem>
                                                        <Divider />
                                                    </>
                                                )}
                                                {(plan.deviceDongle !== null && plan.deviceDongle !== 'NOT_AVAILABLE') && (
                                                    <>
                                                        <ListItem >
                                                            <ListItemText primary="Internet Dongle" style={{textAlign:'start', fontSize:'10px', 'text-wrap':'nowrap'}} />
                                                            <Text text={plan.deviceDongle} 
                                                                style={{textAlign:'end', fontWeight:'bold', fontSize:'15px'}}/>
                                                        </ListItem>
                                                        <Divider />
                                                    </>
                                                )}
                                                {(plan.autoDoorCloser !== null && plan.autoDoorCloser !== 'NOT_AVAILABLE') && (
                                                    <>
                                                        <ListItem >
                                                            <ListItemText primary="Auto Door Closer" style={{textAlign:'start', fontSize:'10px', 'text-wrap':'nowrap'}} />
                                                            <Text text={plan.autoDoorCloser} 
                                                                style={{textAlign:'end', fontWeight:'bold', fontSize:'15px'}}/>
                                                        </ListItem>
                                                        <Divider />
                                                    </>
                                                )}
                                                {(plan.leadGeneration !== null && plan.leadGeneration !== 'NOT_AVAILABLE') && (
                                                    <>
                                                        <ListItem >
                                                            <ListItemText primary="Lead Generation" style={{textAlign:'start', fontSize:'10px', 'text-wrap':'nowrap'}} />
                                                            <Text text={plan.leadGeneration} 
                                                                style={{textAlign:'end', fontWeight:'bold', fontSize:'15px'}}/>
                                                        </ListItem>
                                                        <Divider />
                                                    </>
                                                )}
                                                {(plan.marketingVideo !== null && plan.marketingVideo !== 'NOT_AVAILABLE') && (
                                                    <>
                                                        <ListItem >
                                                            <ListItemText primary="Marketing Video (Apx. 2mins.)" style={{textAlign:'start', fontSize:'10px', 'text-wrap':'nowrap'}} />
                                                            <Text text={plan.marketingVideo} 
                                                                style={{textAlign:'end', fontWeight:'bold', fontSize:'15px'}}/>
                                                        </ListItem>
                                                        <Divider />
                                                    </>
                                                )}

                                                {plan.installationCharges !== null && (
                                                    <>
                                                        <ListItem >
                                                            <ListItemText primary="Installation Charges" style={{textAlign:'start', fontSize:'10px', 'text-wrap':'nowrap'}} />
                                                            <Text text={plan.installationCharges === 0 ? 'Free' : plan.installationCharges} 
                                                                style={{textAlign:'end', fontWeight:'bold', fontSize:'15px'}}/>
                                                        </ListItem>
                                                        <Divider />
                                                    </>
                                                )}
                                                {plan.subscriptionMonth !== null && (
                                                    <>
                                                        <ListItem >
                                                            <ListItemText primary="Plan Renewal For 1 Month" style={{textAlign:'start', fontSize:'10px', 'text-wrap':'nowrap'}} />
                                                            <Text text={plan.renewalCoins + " SD Coins"} 
                                                                style={{textAlign:'end', fontWeight:'bold', fontSize:'15px'}}/>
                                                        </ListItem>
                                                        <Divider />
                                                    </>
                                                )}
                                            </List>
                                        </div>
                                    </Card>
                                </Col>
                            ) :  null
                            })) : (
                                <></>
                    )}
                </div>
                <Divider className="mt-3"/>
                <div className="mt-3">
                    <Col lg="4">
                        <Form.Group>    
                            {/* <Form.Label>Email</Form.Label> */}
                            <Form.Control
                                type="email"
                                maxLength="100"
                                placeholder=" Email same as entered before"
                                onInput={(e) => { setEmailId(e.target.value) }}
                            />
                        </Form.Group>
                        <Text
                            className=""
                            fontWeight="normal"
                            color="secondryColor"
                            style={{fontSize:'12px'}}
                            text="These details are required by the bank. Copy of invoice will be shared on your email ID.">
                        </Text>
                    </Col>
                </div>
                <div className="d-flex mt-5 px-2">
                    <button color="gray">Cancel</button> &nbsp;
                    <Buttons name="Back" onClick={() => { history.push('/admin/posts/add-new-post/info', {propertyData: propertyData}) }}></Buttons> &nbsp;
                    <Buttons name="Generate Payment Link" onClick={() => { validatePlan() }} />
                </div>
            </div>
        </>
    )
}

const mapStateToProps = ({ addNewPostReducer }) => ({
    addNewPostReducer
})

const actions = {

}

const withConnect = connect(mapStateToProps, actions);

export default compose()(AddNewPost5)