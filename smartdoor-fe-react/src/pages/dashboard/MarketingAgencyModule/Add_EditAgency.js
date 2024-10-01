import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { compose } from "redux"
import Buttons from "../../../shared/Buttons/Buttons";
import { validateAgencyDetails } from "../../../common/validations";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './Add_EditAgency.scss';
import Text from "../../../shared/Text/Text";
import { addEditAgency } from "../../../common/redux/actions";
import { showSuccessToast, showErrorToast } from "../../../common/helpers/Utils";
import AutoCompleteTextField from '../../../shared/Inputs/AutoComplete/textField';

const Add_EditAgency = (props) => {
    const addNew = props.location.state.addNew;
    const [agencyDetails, setAgencyDetails] = useState(props.location.state?.agencyDetails || {
        agencyId: null,
        agencyName: '',
        location: '',
        contactName: '',
        contactNumber: null,
        contactEmail: ''
    });
    const [error, setError] = useState({});
    const [disableFlag, setDisableFlag] = useState(false);
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
        setError(valid.errors)
        console.log(agencyDetails);
        if (valid.isValid) {
            setDisableFlag(true);
            await addEditAgency(agencyDetails)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        setDisableFlag(true);
                        if (addNew) {
                            showSuccessToast('Agency added successfully...');
                        } else {
                            showSuccessToast('Agency edited successfully...');
                        }

                        history.goBack();
                    } else {
                        setDisableFlag(false);
                    }
                })
                .catch(error => {
                    showErrorToast('Number already exist');
                    setDisableFlag(false);
                });
        }
    }

    const handlePhoneChange = (e) => {
        const result = e.target.value.replace(/\D/g, '');
        const mobileNum = (result.slice(0, 10));
        if ((mobileNum.trim()).length !== 10) {
            setError({ ...error, contactNumber: 'Contact Number must be 10 digits' })
        }
        else { setError({ ...error, contactNumber: '' }) }
        setAgencyDetails({ ...agencyDetails, contactNumber: mobileNum });
    }

    return (
        <>
            <div className="tableBox mt-0 w-100">
                <div className="tableHeading">
                    <div className="locationSelect">
                        <div className="w-100" style={{ overflowX: 'hidden' }}>
                            <Row>
                                <Col lg='4' style={{ marginTop: '0%' }}>
                                    <TextField
                                        className="w-100 mt-4"
                                        type="text"
                                        label="Agency Name"
                                        onChange={(e) => { setAgencyDetails({ ...agencyDetails, agencyName: e.target.value }) }}
                                        value={agencyDetails.agencyName}
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
                                        onSelectOption={(e) => { setAgencyDetails({ ...agencyDetails, location: e.location }); console.log(e) }}
                                        onInputChange={(value) => { setAgencyDetails({ ...agencyDetails, location: value }); }
                                        }
                                        predictionType="city"
                                        customValue={agencyDetails?.location}
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
                                        // disabled={!addNew}
                                        inputProps={{ min: 0 }}
                                        // onInput={(e) => {
                                        //     setAgencyDetails({ ...agencyDetails, contactNumber: e.target.value });
                                        // }
                                        // }
                                        onChange={(e) => { handlePhoneChange(e) }}
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
                                <Buttons name='Submit' disabled={disableFlag} size='medium' varient='primary' onClick={() => { validateAgencyDetail() }}></Buttons>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default compose(Add_EditAgency);