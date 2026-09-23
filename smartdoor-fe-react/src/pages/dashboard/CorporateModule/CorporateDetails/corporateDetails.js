import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { compose } from "redux"
import Image from "../../../../shared/Image";
import Text from "../../../../shared/Text/Text";
import pencilIcon from '../../../../assets/svg/pencilIcon.svg';
import logoIcon from '../../../../assets/svg/logoIcon.svg';
import CorporateProperty from "../CorporateProperties/corporateProperty";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { downloadMIS, getAllCityWithId, getCorporateById, sendMISMail } from "../../../../common/redux/actions";
import { connect } from "react-redux";
import { formateDate } from "../../../../common/helpers/Utils";
import Buttons from "../../../../shared/Buttons/Buttons";
import { Checkbox, ListItemText, MenuItem, TextField } from "@mui/material";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import './corporateDetails.scss';
import { validateDates } from "../../../../common/validations";

const CorporateDetails = (props) => {
    const { getAllCityWithId, allCitiesWithId } = props;
    const corporateId = props?.location?.state?.corporateId;
    const [corporateDetails, setCorporateDetails] = useState({});
    const [downloadMISModalFlag, setDownloadMISModalFlag] = useState(false);
    const [emailForMISDownload, setEmailForMISDownload] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [city, setCity] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cityWiseData, setCityWiseData] = useState([]);

    const history = useHistory();

    const getCorprateDetails = async () => {
        await getCorporateById({
            corporateId: corporateId,
            pageNo: 1,
            pageSize: 8
        }).then(response => {
            console.log(response)
            setCorporateDetails(response?.data?.resourceData[0])
        });
    }
    useEffect(() => {
        console.log(props);
        getCorprateDetails();
        getAllCityWithId({ smartdoorServiceStatus: true, stateId: null });
    }, []);


    const sendMISEmailFunc = async () => {
        const emailList = emailForMISDownload
            .split(',')
            .map(email => email.trim())
            .filter(email => email !== '');
        const MISRequestDto = {
            corporateId: corporateId,
            emailList: emailList,
            startDate: startDate,
            endDate: endDate,
            cityList: city
        }
        if (validateDates && emailForMISDownload.length > 0 && city.length > 0) {
            const response = await sendMISMail(MISRequestDto);
            console.log(response);
        }
    }

    const downloadMISFunc = async () => {
        const emailList = emailForMISDownload
            .split(',')
            .map(email => email.trim())
            .filter(email => email !== '');

        const MISRequestDto = {
            corporateId: corporateId,
            emailList: emailList,
            startDate: startDate,
            endDate: endDate,
            cityList: city
        };

        if (
            validateDates &&
            city.length > 0
        ) {
            const response = await downloadMIS(MISRequestDto);

            console.log(response);

            const cityWiseDataResponse =
                response?.data?.resourceData?.cityWiseData || [];

            // Update state if you need it elsewhere
            setCityWiseData(cityWiseDataResponse);

            // Download using the response data directly
            await downloadCityWiseCSV(cityWiseDataResponse);
        }
    };

    const downloadCityWiseCSV = async (cityWiseData) => {
        if (!cityWiseData || cityWiseData.length === 0) {
            return;
        }

        for (let index = 0; index < cityWiseData.length; index++) {
            const cityData = cityWiseData[index];

            const city = cityData.city || `City_${index + 1}`;

            const propertyList = cityData.propertyList || [];
            const visitorList = cityData.visitorList || [];

            // ==========================================
            // PROPERTY CSV
            // ==========================================

            if (propertyList.length > 0) {
                const propertyHeaders = Object.keys(propertyList[0]);

                const propertyRows = [
                    propertyHeaders.join(","),
                    ...propertyList.map((property) =>
                        propertyHeaders
                            .map((header) => {
                                let value = property[header];

                                if (value === null || value === undefined) {
                                    value = "";
                                }

                                if (typeof value === "object") {
                                    value = JSON.stringify(value);
                                }

                                value = String(value).replace(/"/g, '""');

                                return `"${value}"`;
                            })
                            .join(",")
                    )
                ];

                const propertyCSV = propertyRows.join("\n");

                const propertyBlob = new Blob(
                    [propertyCSV],
                    {
                        type: "text/csv;charset=utf-8;"
                    }
                );

                const propertyUrl =
                    URL.createObjectURL(propertyBlob);

                const propertyLink =
                    document.createElement("a");

                propertyLink.href = propertyUrl;
                propertyLink.download =
                    `${city}_Property_Report.csv`;

                document.body.appendChild(propertyLink);
                propertyLink.click();
                document.body.removeChild(propertyLink);

                URL.revokeObjectURL(propertyUrl);

                // Small delay between downloads
                await new Promise(resolve =>
                    setTimeout(resolve, 500)
                );
            }

            // ==========================================
            // VISITOR CSV
            // ==========================================

            if (visitorList.length > 0) {
                const visitorHeaders = Object.keys(visitorList[0]);

                const visitorRows = [
                    visitorHeaders.join(","),
                    ...visitorList.map((visitor) =>
                        visitorHeaders
                            .map((header) => {
                                let value = visitor[header];

                                if (value === null || value === undefined) {
                                    value = "";
                                }

                                if (typeof value === "object") {
                                    value = JSON.stringify(value);
                                }

                                value = String(value).replace(/"/g, '""');

                                return `"${value}"`;
                            })
                            .join(",")
                    )
                ];

                const visitorCSV = visitorRows.join("\n");

                const visitorBlob = new Blob(
                    [visitorCSV],
                    {
                        type: "text/csv;charset=utf-8;"
                    }
                );

                const visitorUrl =
                    URL.createObjectURL(visitorBlob);

                const visitorLink =
                    document.createElement("a");

                visitorLink.href = visitorUrl;
                visitorLink.download =
                    `${city}_Visitor_Report.csv`;

                document.body.appendChild(visitorLink);
                visitorLink.click();
                document.body.removeChild(visitorLink);

                URL.revokeObjectURL(visitorUrl);

                // Small delay before next city
                await new Promise(resolve =>
                    setTimeout(resolve, 500)
                );
            }
        }
    };

    return (
        <>
            <div className="whiteBg">
                <Row>
                    <Col lg='3' className="text-center" style={{ borderInlineEnd: '2px dashed #DED6D9' }}>
                        <img src={corporateDetails.logo} alt='' style={{ height: '85px', width: '85px' }} />
                        <Text text={corporateDetails?.companyName} fontWeight='bold' style={{ fontSize: '16px', }} />
                        <Text text={'( ' + corporateDetails.totalPostingCount + ' Postings ) '} fontWeight='600' style={{ fontSize: '12px', color: '#8E878A' }} />
                        <Text text={'Joined on: ' + formateDate(corporateDetails?.joiningDate)} fontWeight='600' style={{ fontSize: '12px' }} />
                    </Col>
                    <Col lg='7'>
                        <Text text='Location Details' fontWeight='bold' style={{ fontSize: '16px', color: '#BE1452' }} />
                        <Text className='mt-1' text='Address' fontWeight='bold' style={{ fontSize: '14px', color: '#757575' }} />
                        <Text text={corporateDetails?.companyAddress}
                            fontWeight='700' style={{ fontSize: '14px' }} />
                        <Text className='mt-2' text='Email Ids' fontWeight='bold' style={{ fontSize: '14px', color: '#757575' }} />
                        <Text text={corporateDetails?.corporateEmails || '-'}
                            fontWeight='700' style={{ fontSize: '14px' }} />
                    </Col>
                    <Col lg='2'>
                        <Button className="d-flex px-1" style={{ borderColor: '#BE1452', backgroundColor: '#FCDAE6', color: '#BE1452', borderRadius: '8', fontWeight: '500' }}
                            onClick={() => { history.push('/admin/corporate/editCorporate', { corporateId: corporateId }); }} >
                            <img className='p-0' src={pencilIcon} alt={''} style={{ width: '18px', height: '18px' }} />
                            Edit Details</Button>

                        <Buttons className="d-flex mt-2" name="Download MIS"
                            onClick={() => { setDownloadMISModalFlag(true) }} >
                        </Buttons>

                        <Text className="mt-3" text="Retention Period" fontWeight='bold' style={{ fontSize: '14px', color: '#757575' }} />
                        <Text text={corporateDetails?.retentionPeriod || "-"}
                            fontWeight='700' style={{ fontSize: '14px' }} />
                    </Col>
                </Row>
            </div>
            <CorporateProperty corporateId={corporateId} ></CorporateProperty>

            <Modal backdrop="static" onHide={() => { setDownloadMISModalFlag(false) }} show={downloadMISModalFlag} >
                <Modal.Header>
                    <Buttons
                        style={{ float: "right" }}
                        name="X"
                        size="small"
                        varient="secondary"
                        onClick={() => {
                            setDownloadMISModalFlag(false);
                        }}
                    ></Buttons>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <TextField
                            className="textFieldInput mt-1 w-100"
                            label="Email Id"
                            placeholder="Enter comma separated email ids"
                            multiline
                            maxRows={3}
                            value={emailForMISDownload}
                            onChange={(e) => {
                                setEmailForMISDownload(e.target.value);
                            }}
                        />
                        <div className="w-100 mt-3 d-flex" style={{ justifyContent: "space-between" }}>

                            <TextField
                                className="textFieldInput mt-1"
                                style={{ width: '45%' }}
                                placeholder=""
                                InputLabelProps={{ shrink: true }}
                                type="date"
                                value={startDate}
                                label="Start Date"
                                required={true}
                                onChange={(e) => { setStartDate(e.target.value) }}
                            />
                            <TextField
                                className="textFieldInput mt-1"
                                style={{ width: '45%' }}
                                placeholder=""
                                InputLabelProps={{ shrink: true }}
                                type="date"
                                value={endDate}
                                label="End Date"
                                required={true}
                                onChange={(e) => { setEndDate(e.target.value) }}
                            />
                        </div>
                        <TextField
                            select
                            multiple
                            className="textFieldInput mt-3 w-100"
                            label="City"
                            value={city}
                            onChange={(e) => {
                                const value = e.target.value;
                                setCity(typeof value === 'string' ? value.split(',') : value);
                            }}
                            SelectProps={{
                                multiple: true,
                                renderValue: (selected) => selected.join(', ')
                            }}
                            required={true}
                        >
                            {allCitiesWithId?.data?.map((cityItem) => (
                                <MenuItem
                                    key={cityItem.cityId}
                                    value={cityItem.cityName}
                                >
                                    <Checkbox
                                        checked={city.includes(cityItem.cityName)}
                                    />
                                    <ListItemText primary={cityItem.cityName} />
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex" style={{ justifyContent: 'center' }}>
                    <Buttons name="Download MIS" onClick={() => { downloadMISFunc(); }} /> &nbsp;
                    <Buttons name="Send MIS Email" onClick={() => { sendMISEmailFunc(); }} />
                </Modal.Footer>
            </Modal>
        </>
    )
}

const mapStateToProps = ({ allCitiesWithId }) => ({ allCitiesWithId });

const actions = {
    getCorporateById, getAllCityWithId
}

export default compose(connect(mapStateToProps, actions))(CorporateDetails);