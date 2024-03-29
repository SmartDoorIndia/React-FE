import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "redux"
import Buttons from "../../../shared/Buttons/Buttons";
import { validateAgencyDetails } from "../../../common/validations";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Add_EditAgency = (props) => {

    const [agencyDetails, setAgencyDetails] = useState({});
    const history = useHistory();

    useEffect(() => {
        console.log("Add")
    },[]);

    const validateAgencyDetail = () => {
        const valid = validateAgencyDetails(agencyDetails);
        console.log(valid);
    }

    return (
        <>
            <div className="whiteBg">
                    <Row>
                        <Col lg='4'>
                            <TextField
                                className="w-100"
                                type="text"
                                label="Agency Name"
                            />
                        </Col>
                        <Col lg='8'>
                            <TextField
                                className="w-100"
                                type="text"
                                label="Location"
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col lg='4'>
                            <TextField
                                className="w-100"
                                type="text"
                                label="Contact Name"
                            />
                        </Col>
                        <Col lg='4'>
                            <TextField
                                className="w-100"
                                type="number"
                                label="Phone"
                                InputProps={{
                                    maxLength: 10, // Maximum length of input
                                  }}
                            />
                        </Col>
                        <Col lg='4'>
                            <TextField
                                className="w-100"
                                type="email"
                                label="Email"
                            />
                        </Col>
                    </Row>
                    <div className="d-flex mt-3">
                        <Buttons name='Cancel' size='medium' varient='secondary' onClick={()=>{history.goBack();}}></Buttons> &nbsp;&nbsp;&nbsp;&nbsp;
                        <Buttons name='Submit' size='medium' varient='primary' onClick={() => {validateAgencyDetail()}}></Buttons>
                    </div>
            </div>
        </>
    );
}

export default compose(Add_EditAgency);