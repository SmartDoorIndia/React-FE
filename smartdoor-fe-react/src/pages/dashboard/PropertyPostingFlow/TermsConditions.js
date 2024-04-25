import { compose } from "redux";
import { TextField, Checkbox } from '@mui/material';
import Text from "../../../shared/Text/Text";
import { Col } from 'react-bootstrap';
import { useEffect, useState } from "react";
import Buttons from "../../../shared/Buttons/Buttons";
import { connect, useDispatch } from "react-redux";
import * as Actions from '../../../common/redux/types';
import { addBasicDetails } from "../../../common/redux/actions";
import { getLocalStorage, showSuccessToast } from "../../../common/helpers/Utils";
import { useHistory } from "react-router-dom";
import { validateTermsConditions } from "../../../common/validations";
const TermsConditions = (props) => {
    const history = useHistory();
    const { basicDetailFields, addressDetailFields, specDetailFields, pricingDetailFields, uploadImages, termsConditions, customerDetails, editPropertyFlag} = props;
    const propertyId = props?.propertyId;
    const [miscellaneousDetails, setmiscellaneousDetails] = useState(props.miscellaneousDetails);
    const [termsConditionObj, setTermsConditionObj] = useState( termsConditions.data || {
        visitGuidelines: '',
        areTermsAndConditionsForPostingPropertyAccepted: false,
        securityGuardNumber:''
    });
    const [error, setError] = useState({});
    const [propertySuccessFlag, setPropertySuccessFlag] = useState(false);
    const userData = getLocalStorage('authData');

    const dispatch = useDispatch();

    useEffect(() => {
        if(editPropertyFlag) {
            setmiscellaneousDetails(prevMiscellaneousDetails => ({...prevMiscellaneousDetails, ownerName: null, ownerMobileNumber: null}));
        }
    },[]);

    const handlePhoneChange = (e) => {
        const result = e.target.value.replace(/\D/g, '');
        const mobileNum = (result.slice(0, 10));
        setTermsConditionObj(prevTermsConditionsObj => ({...prevTermsConditionsObj, securityGuardNumber: mobileNum}));
    }

    const notifyCustomer = async () => {
        let valid = {};
        valid = validateTermsConditions(termsConditionObj);
        setError(valid.errors);
        if(valid.isValid) {
            dispatch({type: Actions.TERMS_CONDITIONS_SUCCESS, data: {termsConditionObj : termsConditionObj}});
            const postProperty = {
                smartdoorPropertyId: propertyId,
                miscellaneousDetails: editPropertyFlag === true ? miscellaneousDetails : {
                    postedById: userData.userid,
                    lastPageOfInfoFilled: 0,
                    draft: false,
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
                    status: "UNDER REVIEWED",
                    postedByName: userData.name,
                    postedByMobile: userData.mobile,
                    postedByProfileImageUrl: '',
                    ownerName: customerDetails?.name,
                    ownerMobileNumber: customerDetails?.mobile,
                    isPostingForOthers: true
                },
                basicDetails: basicDetailFields?.data,
                address: addressDetailFields?.data,
                specs: specDetailFields?.data,
                pricing: pricingDetailFields?.data,
                uploads: uploadImages?.data,
                terms: termsConditionObj
            }

            const response = await addBasicDetails(postProperty);
            if(response.status === 200) {
                showSuccessToast('Property Posted is under reviewed');
                setPropertySuccessFlag(true);
                history.goBack();
            }
        }
    }

    return (
        <>
            <div className="whiteBg">
                <div className="d-flex">
                    <Col lg='6'>
                        <TextField
                            className="w-100"
                            multiline
                            label='Guidance'
                            placeholder='You can mention the guidance for visitors if any -
                            How to park the car 
                            How to enter the society'
                            type="text"
                            error={error.visitGuidelines}
                            onChange={(e) => {
                                setTermsConditionObj(prevTermsConditionObj =>
                                    ({ ...prevTermsConditionObj, visitGuidelines: e.target.value }))
                                }}
                                value={termsConditionObj.visitGuidelines}
                                ></TextField>
                        <TextField
                            className="mt-3 w-50"
                            label={'Manager/Sec. Guard Number'}
                            type="number"
                            error={error.securityGuardNumber}
                            inputProps={{ min: 0, max: 999999999 }}
                            InputProps={{
                                startAdornment: (
                                    <>
                                        <Text className='ml-2 mr-2' text={'+91'} style={{ fontSize: '16px', color: '#949494' }} fontWeight={'500'} />
                                    </>
                                )
                            }}
                            onChange={(e) => { handlePhoneChange(e) }}
                            value={termsConditionObj.securityGuardNumber} />
                    </Col>
                    <Col lg='6'>
                        <Text text={'Terms and Conditions'} fontWeight={'bold'} style={{ fontSize: '16px' }} />
                        <Text className='w-100 mt-3' text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra urna facilisis \
                        nibh et, eu, nulla laoreet sodales donec. Leo ultrices id lectus tristique massa nunc, venenatis \
                        elit non. Et, pellentesque gravida mauris scelerisque est sed tellus vel consequat. Turpis libero \
                        congue scelerisque malesuada euismod lacus. Aliquet semper vitae eget pharetra sit sed. Sollicitudin quis \
                        dapibus vel parturient eros tellus sed tellus. Integer aliquam elit leo quam at vel gravida eleifend sit.'}
                            fontWeight={'500'} style={{ fontSize: '14px' }} />
                        {/* <div className="d-flex">
                            <Checkbox onChange={(e) => {
                                setTermsConditionObj(prevTermsConditionObj =>
                                    ({ ...prevTermsConditionObj, areTermsAndConditionsForPostingPropertyAccepted: e.target.checked }))
                            }}
                                defaultChecked={termsConditionObj.areTermsAndConditionsForPostingPropertyAccepted} className="p-1" style={{ scale: '1.5', color: '#BE1452' }}></Checkbox>
                            <Text className='mt-1' text='I accept on ' fontWeight={'500'} style={{ fontSize: '14px' }} /> &nbsp;
                            <Text className='mt-1' text=' terms and condition' fontWeight={'500'} style={{ fontSize: '14px', color: '#BE1452' }} />
                        </div>
                        <Text text={error.areTermsAndConditionsForPostingPropertyAccepted} style={{color:'red'}} /> */}
                    </Col>
                </div>
            </div>
            <div className="d-flex">
                <Buttons className='p-2 px-4' name='Notify Customer' onClick={() => { notifyCustomer(); }}></Buttons> &nbsp; &nbsp;
                <Buttons className='p-2 px-4' name='Cancel' ></Buttons>
            </div>
        </>
    );
}

const mapStateToProps = ({ basicDetailFields, addressDetailFields, specDetailFields, pricingDetailFields, uploadImages, termsConditions }) => ({
    basicDetailFields, addressDetailFields, specDetailFields, pricingDetailFields, uploadImages, termsConditions
});

const actions = {

}

export default compose(connect(mapStateToProps, actions))(TermsConditions);