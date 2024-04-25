import { Col, Row } from "react-bootstrap";
import { compose } from "redux";
import Text from "../../../../shared/Text/Text";
import AutoCompleteInput from "../../../../shared/Inputs/AutoComplete";
import Buttons from "../../../../shared/Buttons/Buttons";
import { TextField } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { validateAgencyDetails, validateExecutiveDetails } from "../../../../common/validations";
import '../Add_EditAgency.scss';
import { addEditExecutive } from '../../../../common/redux/actions';
import { showSuccessToast } from "../../../../common/helpers/Utils";
import { showErrorToast } from "../../../../common/helpers/Utils";
import AutoCompleteTextField from "../../../../shared/Inputs/AutoComplete/textField";

const AgencyExecutives = (props) => {
    const addNew = props.location.state.addNew;
    const [executiveDetails, setExecutiveDetails] = useState({
        agencyId: props?.location?.state?.agencyId || null,
        executiveId: props?.location?.state?.executiveDetails?.executiveId || null,
        executiveName: props?.location?.state?.executiveDetails?.name || '',
        location: props?.location?.state?.executiveDetails?.location || '',
        executiveNumber: props?.location?.state?.executiveDetails?.mobile || null,
        executiveEmail: props?.location?.state?.executiveDetails?.email || ''
    });
    const [error, setError] = useState({});
    const history = useHistory();

    const validateExecutiveDetail = async () => {
        const valid = await validateExecutiveDetails(executiveDetails);
        console.log(valid);
        console.log(executiveDetails);
        if (valid.isValid) {
            const response = await addEditExecutive(executiveDetails).then((response) => {
                if (response.status === 200) {
                    showSuccessToast('Agency Executive added successfully...');
                    history.goBack();
                }
            })
                .catch(error => {
                    console.log(error);
                    showErrorToast("Number Already exist...")
                });

            // if (response.status === 200) {
            //     showSuccessToast('Agency Executive added successfully...');
            //     history.goBack();
            // }else{
            //     showErrorToast(response.data.message);
            // }
        }
    }

    useEffect(() => {
        // console.log(executiveDetails);
    })

    return (
        <>
            <div className="whiteBg">
                <Row>
                    <Col lg='4' style={{ marginTop: '0%' }}>
                        <TextField
                            className="w-100 mt-4"
                            type="text"
                            label="Name"
                            onInput={(e) => { setExecutiveDetails({ ...executiveDetails, executiveName: e.target.value }) }}
                            defaultValue={executiveDetails.executiveName}
                        />
                        <Text
                            color="dangerText"
                            size="xSmall"
                            className="pt-2"
                            text={error.executiveName}
                        />
                    </Col>
                    <Col lg='8'>
                        <AutoCompleteTextField
                            className='locationSelect w-100 mt-4'
                            label={'Location'}
                            cityLatLng={null}
                            placeholder="Enter City"
                            id="AgencyCityAutoComplete"
                            onSelectOption={(e) => { setExecutiveDetails({ ...executiveDetails, location: e.location }); console.log(e) }}
                            onInputChange={(value) => { setExecutiveDetails({ ...executiveDetails, location: value }); }
                            }
                            predictionType="city"
                            value={executiveDetails?.location}
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
                            type="number"
                            label="Phone"
                            disabled={!addNew}
                            inputProps={{ min: 0 }}
                            onInput={(e) => {
                                setExecutiveDetails({ ...executiveDetails, executiveNumber: e.target.value });
                                if (e.target.value.length !== 10) {
                                    setError({ ...error, executiveNumber: 'Contact Number must be 10 digits' })
                                }
                                else { setError({ ...error, executiveNumber: '' }) }
                            }
                            }
                            defaultValue={executiveDetails.executiveNumber}
                        />
                        <Text
                            color="dangerText"
                            size="xSmall"
                            className="pt-2"
                            text={error.executiveNumber}
                        />
                    </Col>
                    <Col lg='4'>
                        <TextField
                            className="w-100"
                            type="email"
                            label="Email"
                            onInput={(e) => { setExecutiveDetails({ ...executiveDetails, executiveEmail: e.target.value }) }}
                            defaultValue={executiveDetails.executiveEmail}
                        />
                        <Text
                            color="dangerText"
                            size="xSmall"
                            className="pt-2"
                            text={error.executiveEmail}
                        />
                    </Col>
                </Row>
                <div className="d-flex mt-3">
                    <Buttons name='Cancel' size='medium' varient='secondary' onClick={() => { history.goBack(); }}></Buttons> &nbsp;&nbsp;&nbsp;&nbsp;
                    <Buttons name='Submit' size='medium' varient='primary' onClick={() => { validateExecutiveDetail() }}></Buttons>
                </div>
            </div>
        </>
    );
}

export default compose(AgencyExecutives)