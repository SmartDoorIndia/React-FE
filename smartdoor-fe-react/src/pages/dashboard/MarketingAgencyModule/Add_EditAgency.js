import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "redux"
import Buttons from "../../../shared/Buttons/Buttons";
import { validateAgencyDetails } from "../../../common/validations";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AutoCompleteInput from "../../../shared/Inputs/AutoComplete";
// import './Add_EditAgency.scss';
import Text from "../../../shared/Text/Text";
import { addEditAgency } from "../../../common/redux/actions";
import { showSuccessToast } from "../../../common/helpers/Utils";
import AutoCompleteTextField from '../../../shared/Inputs/AutoComplete/textField';
const Add_EditAgency = (props) => {

    const [agencyDetails, setAgencyDetails] = useState(props.location.state?.agencyDetails || {
        agencyId:null,
        agencyName: '',
        location: '',
        contactName: '',
        contactNumber: null,
        contactEmail: ''
    });
    const [error, setError] = useState({});
    const history = useHistory();

    useEffect(() => {
        console.log("Add")
        // if(props.location.state.agencyDetails !== undefined) {
        //     setAgencyDetails(props.location.state.agencyDetails)
        //     console.log(props.location.state.agencyDetails)
        // }
    }, []);

    const validateAgencyDetail = async () => {
        const valid = validateAgencyDetails(agencyDetails);
        console.log(valid);
        console.log(agencyDetails);
        if(valid.isValid) {
            const response = await addEditAgency(agencyDetails);
            console.log(response);
            if(response.status === 200 ) {
                showSuccessToast('Agency added successfully...');
                history.goBack();
            }
        }
    }

    const handlePhoneChange = (e) => {
        const result = e.target.value.replace(/\D/g, '');
        const mobileNum = (result.slice(0,10));
        setAgencyDetails({...agencyDetails, contactNumber: mobileNum});
    }

    return (
        <>
            <div className="whiteBg">
                <Row>
                    <Col lg='4' style={{marginTop:'0%'}}>
                        <TextField
                            className="w-100 mt-4"
                            type="text"
                            label="Agency Name"
                            onInput={(e) => { setAgencyDetails({ ...agencyDetails, agencyName: e.target.value }) }}
                            defaultValue={agencyDetails.agencyName}
                        />
                        <Text
                            color="dangerText"
                            size="xSmall"
                            className="pt-2"
                            text={error.agencyName}
                        />
                    </Col>
                    <Col lg='8'>
                        <AutoCompleteTextField
                            className='locationSelect w-100 mt-4'
                            label={'Location'}
                            cityLatLng={null}
                            placeholder="Enter City"
                            id="AgencyCityAutoComplete"
                            onSelectOption={(e) => { setAgencyDetails({ ...agencyDetails, agencyLocation: e.location, location: e.location }); console.log(e) }}
                            onInputChange={(value) => { setAgencyDetails({ ...agencyDetails, agencyLocation: value, location: value }); }
                            }
                            predictionType="city"
                            customValue={agencyDetails?.agencyLocation}
                        />
                        <Text
                            color="dangerText"
                            size="xSmall"
                            className="pt-2"
                            text={error.location}
                        />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col lg='4'>
                        <TextField
                            className="w-100"
                            type="text"
                            label="Contact Name"
                            onInput={(e) => { setAgencyDetails({ ...agencyDetails, contactName: e.target.value }) }}
                            defaultValue={agencyDetails.contactName}
                            
                        />
                        <Text
                            color="dangerText"
                            size="xSmall"
                            className="pt-2"
                            text={error.contactName}
                        />
                    </Col>
                    <Col lg='4'>
                        <TextField
                            className="w-100"
                            type="number"
                            label="Phone"
                            inputProps={{ min: 0 }}
                            onInput={(e) => { setAgencyDetails({ ...agencyDetails, contactNumber: e.target.value });
                                                if(e.target.value.length !== 10) {
                                                    setError({...error, contactNumber:'Contact Number must be 10 digits'}) }
                                                    else { setError({...error, contactNumber:''}) }    }
                                                }
                                                onChange={(e) => {handlePhoneChange(e)}}
                            value={agencyDetails.contactNumber}
                        />
                        <Text
                            color="dangerText"
                            size="xSmall"
                            className="pt-2"
                            text={error.contactNumber}
                        />
                    </Col>
                    <Col lg='4'>
                        <TextField
                            className="w-100"
                            type="email"
                            label="Email"
                            onInput={(e) => { setAgencyDetails({ ...agencyDetails, contactEmail: e.target.value }) }}
                            defaultValue={agencyDetails.contactEmail}
                        />
                        <Text
                            color="dangerText"
                            size="xSmall"
                            className="pt-2"
                            text={error.contactEmail}
                        />
                    </Col>
                </Row>
                <div className="d-flex mt-3">
                    <Buttons name='Cancel' size='medium' varient='secondary' onClick={() => { history.goBack(); }}></Buttons> &nbsp;&nbsp;&nbsp;&nbsp;
                    <Buttons name='Submit' size='medium' varient='primary' onClick={() => { validateAgencyDetail() }}></Buttons>
                </div>
            </div>
        </>
    );
}

export default compose(Add_EditAgency);