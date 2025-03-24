import React, { useEffect, useState } from 'react'
import UnitPostingFields from '../../../../../common/helpers/UnitPostingFields';
import { Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { InputAdornment, MenuItem, Slider, TextField } from '@mui/material';
import Text from '../../../../../shared/Text/Text';
import { TiCameraOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { FaTimesCircle } from "react-icons/fa";
import closeBtn from "../../../../../assets/images/closeBtn.png";
import './AddNewUnit.scss';

const Units = (props) => {
    const { handleRemoveUnit, unitIndex } = props;
    const [subProjectDetails, setSubProjectDetails] = useState(props?.subProjectDetails || {
        unitDetails: {
            configuration: 'BHK',
            propertyImageList: []
        }
    });
    const [unitFieldsList, setUnitFieldsList] = useState([]);
    const [unitDetails, setUnitDetails] = useState({
        configuration: '',
        propertyImageList: []
    })
    const imageFields = [
        { docName: "Floor Plan" },
        { docName: "Hall Images" },
        { docName: "Kitchen Images" },
        { docName: "Bedroom 1 Images" },
        { docName: "Bedroom 2 Images" },
    ];
    const [showImageModal, setImageShowModal] = useState(false);
    const [selectedImageSrc, setSelectedImageSrc] = useState("");

    const handleConfigurationChange = (e) => {
        if (subProjectDetails.subPostType === 'Tower') {
            const [rooms, compositionType] =
                e.target.value.split(" "); // Split value into numberOfRooms and propertyRoomCompositionType

            setUnitDetails((prevData) => ({
                ...prevData,
                configuration: e.target.value,
                numberOfRooms: rooms
            }));
            let unitFields = UnitPostingFields.unitPostingFieldsObj[subProjectDetails.subPostType][compositionType].fields;
            console.log(unitFields);
            setUnitFieldsList([...unitFields]);
        } else {
            setUnitDetails((prevData) => ({
                ...prevData,
                configuration: e.target.value
            }));
            let unitFields = UnitPostingFields.unitPostingFieldsObj[subProjectDetails.subPostType][e.target.value].fields;
            console.log(unitFields);
            setUnitFieldsList([...unitFields]);
        }
    }

    const handleFileChange = (e, docDescription) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImage = {
                    builderProjectImageAsBase64: reader.result,
                    docDescription,
                    docId: null,
                    docName: file.name,
                    docOrderInFrontendView: null,
                    docURL: "",
                };

                let propertyImages = [];
                propertyImages = [...unitDetails?.propertyImageList];
                propertyImages?.push(newImage);
                console.log(propertyImages)
                setUnitDetails((prevData) =>
                ({
                    ...prevData,
                    propertyImageList: propertyImages,
                })
                );
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeletePropertyImage = (propertyIndex, docDescription) => {


    };

    useEffect(() => {
        console.log(props)
        let unitFields = UnitPostingFields.unitPostingFieldsObj[subProjectDetails?.subPostType][subProjectDetails?.subPostType === 'Tower' ? "BHK" : "villas"]?.fields;
        console.log(unitFields);
        setUnitFieldsList([...unitFields]);
    }, []);

    return (
        <>
            <div className='d-flex mt-3 ' style={{ backgroundColor: '#E5E7E9', border: '1px solid #DED6D9', borderRadius: '5px', width: '100%' }}>
                <Row className='UnitformContainer row mt-3' style={{ width: '100%' }} >
                    <Col xs={12} sm={6} md={3} style={{ paddingLeft: '20px', paddingRight: "20px" }} >
                        <Text text={'Configuration'} style={{ fontSize: '14px', fontWeight: '700' }} ></Text>
                        <TextField
                            select
                            name="numberOfRooms"
                            className="unitTextFieldInput w-100"
                            onChange={(e) => handleConfigurationChange(e)}
                            value={unitDetails.configuration || ""} // Ensure value is valid
                        >
                            <MenuItem value="" disabled>
                                Select
                            </MenuItem>
                            {subProjectDetails.subPostType === "Tower"
                                ? [
                                    <MenuItem key="2 BHK" value="2 BHK">
                                        2 BHK
                                    </MenuItem>,
                                    <MenuItem key="3 BHK" value="3 BHK">
                                        3 BHK
                                    </MenuItem>,
                                    <MenuItem key="4 BHK" value="4 BHK">
                                        4 BHK
                                    </MenuItem>,
                                ]
                                : [
                                    <MenuItem key="villas" value="villas">
                                        Villas
                                    </MenuItem>,
                                    <MenuItem key="plots" value="plots">
                                        Plots
                                    </MenuItem>,
                                    <MenuItem key="office" value="office">
                                        Office
                                    </MenuItem>,
                                ]}
                        </TextField>
                    </Col>
                    {unitFieldsList.includes('BHK') ?
                        <>
                            <Col xs={12} sm={6} md={3} style={{ paddingLeft: '20px', paddingRight: "20px" }} >
                                <Text text={'BHK'} style={{ fontSize: '14px', fontWeight: '700' }} ></Text>
                                <TextField
                                    select
                                    name="numberOfRooms"
                                    className="unitTextFieldInput w-100"
                                    onChange={(e) => {
                                        setUnitDetails((prevData) => ({
                                            ...prevData,
                                            numberOfRooms: e.target.value,
                                        }));
                                    }}
                                    value={unitDetails.numberOfRooms || ""} // Ensure value is valid
                                >
                                    <MenuItem value="" disabled>
                                        Select
                                    </MenuItem>
                                    <MenuItem key="3" value="3 BHK">
                                        3 BHK
                                    </MenuItem>
                                    <MenuItem key="4" value="4 BHK">
                                        4 BHK
                                    </MenuItem>
                                    <MenuItem key="5" value="5 BHK">
                                        5 BHK
                                    </MenuItem>
                                    <MenuItem key="6" value="6 BHK">
                                        6 BHK
                                    </MenuItem>
                                </TextField>
                            </Col>
                        </>
                        : null}
                    {unitFieldsList.includes('totalUnits') ?
                        <>
                            <Col xs={12} sm={6} md={3} style={{ paddingLeft: '20px', paddingRight: "20px" }} >
                                <Text text={'Total Units'} style={{ fontSize: '14px', fontWeight: '700' }} ></Text>

                                <TextField
                                    className="unitTextFieldInput w-100"
                                    type='number'
                                    name='totalProjectUnits'
                                    onChange={(e) => {
                                        setUnitDetails({ totalProjectUnits: e.target.value })
                                    }}
                                    value={unitDetails.totalProjectUnits || ""}
                                />
                            </Col>
                        </>
                        : null}
                    {unitFieldsList.includes('minBuiltUpArea') ?
                        <>
                            <Col xs={12} sm={6} md={3} style={{ paddingLeft: '20px', paddingRight: "20px" }} >
                                <Text text={'Builtup Area (Min)'} style={{ fontSize: '14px', fontWeight: '700' }} ></Text>
                                <TextField
                                    className="unitTextFieldInput w-100"
                                    type="number"
                                    name="minCarpetArea"
                                    value={unitDetails.minBuiltUpArea || ""}
                                    onChange={(e) => {
                                        setUnitDetails((prevData) => ({
                                            ...prevData,
                                            minBuiltUpArea: e.target.value,
                                        }));
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" style={{ marginRight: '-8%' }}>
                                                <TextField
                                                    select
                                                    name="builtUpAreaMeasurementUnitEnteredByUser"
                                                    className="unitTextFieldInput"
                                                    onChange={(e) => {
                                                        setUnitDetails((prevData) => ({
                                                            ...prevData,
                                                            builtUpAreaMeasurementUnitEnteredByUser: e.target.value,
                                                        }));
                                                    }}
                                                    value={unitDetails.builtUpAreaMeasurementUnitEnteredByUser || ""}
                                                >
                                                    <MenuItem value="" disabled>
                                                        Select
                                                    </MenuItem>
                                                    <MenuItem key="Sq. Mt." value="Sq. Mt.">
                                                        Sq. Mt.
                                                    </MenuItem>
                                                    <MenuItem key="Sq. Ft." value="Sq. Ft.">
                                                        Sq. Ft.
                                                    </MenuItem>
                                                    <MenuItem key="Sq. Yd." value="Sq. Yd.">
                                                        Sq. Yd.
                                                    </MenuItem>
                                                </TextField>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Col>
                        </>
                        : null}
                    {unitFieldsList.includes('maxBuiltUpArea') ?
                        <>
                            <Col xs={12} sm={6} md={3} style={{ paddingLeft: '20px', paddingRight: "20px" }} >
                                <Text text={'Builtup Area (Max)'} style={{ fontSize: '14px', fontWeight: '700' }} ></Text>
                                <TextField
                                    className="unitTextFieldInput w-100"
                                    type="number"
                                    name="maxBuiltUpArea"
                                    value={unitDetails.maxBuiltUpArea || ""}
                                    onChange={(e) => {
                                        setUnitDetails((prevData) => ({
                                            ...prevData,
                                            maxBuiltUpArea: e.target.value,
                                        }));
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" style={{ marginRight: '-8%' }}>
                                                <TextField
                                                    select
                                                    name="builtUpAreaMeasurementUnitEnteredByUser"
                                                    className="unitTextFieldInput"
                                                    onChange={(e) => {
                                                        setUnitDetails((prevData) => ({
                                                            ...prevData,
                                                            builtUpAreaMeasurementUnitEnteredByUser: e.target.value,
                                                        }));
                                                    }}
                                                    value={unitDetails.builtUpAreaMeasurementUnitEnteredByUser || ""}
                                                >
                                                    <MenuItem value="" disabled>
                                                        Select
                                                    </MenuItem>
                                                    <MenuItem key="Sq. Mt." value="Sq. Mt.">
                                                        Sq. Mt.
                                                    </MenuItem>
                                                    <MenuItem key="Sq. Ft." value="Sq. Ft.">
                                                        Sq. Ft.
                                                    </MenuItem>
                                                    <MenuItem key="Sq. Yd." value="Sq. Yd.">
                                                        Sq. Yd.
                                                    </MenuItem>
                                                </TextField>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Col>
                        </>
                        : null}
                    {unitFieldsList.includes('minPlotSize') ?
                        <>
                            <Col xs={12} sm={6} md={3} style={{ paddingLeft: '20px', paddingRight: "20px" }} >
                                <Text text={'Plot Size (Min)'} style={{ fontSize: '14px', fontWeight: '700' }} ></Text>
                                <TextField
                                    className="unitTextFieldInput w-100"
                                    type="number"
                                    name="minPlotSize"
                                    value={unitDetails.minPlotSize || ""}
                                    onChange={(e) => {
                                        setUnitDetails((prevData) => ({
                                            ...prevData,
                                            minPlotSize: e.target.value,
                                        }));
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" style={{ marginRight: '-8%' }}>
                                                <TextField
                                                    select
                                                    name="plotAreaMeasurementUnitEnteredByUser"
                                                    className="unitTextFieldInput"
                                                    onChange={(e) => {
                                                        setUnitDetails((prevData) => ({
                                                            ...prevData,
                                                            plotAreaMeasurementUnitEnteredByUser: e.target.value,
                                                        }));
                                                    }}
                                                    value={unitDetails.plotAreaMeasurementUnitEnteredByUser || ""}
                                                >
                                                    <MenuItem value="" disabled>
                                                        Select
                                                    </MenuItem>
                                                    <MenuItem key="Sq. Mt." value="Sq. Mt.">
                                                        Sq. Mt.
                                                    </MenuItem>
                                                    <MenuItem key="Sq. Ft." value="Sq. Ft.">
                                                        Sq. Ft.
                                                    </MenuItem>
                                                    <MenuItem key="Sq. Yd." value="Sq. Yd.">
                                                        Sq. Yd.
                                                    </MenuItem>
                                                </TextField>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Col>
                        </>
                        : null}
                    {unitFieldsList.includes('maxPlotSize') ?
                        <>
                            <Col xs={12} sm={6} md={3} style={{ paddingLeft: '20px', paddingRight: "20px" }} >
                                <Text text={'Plot Area (Max)'} style={{ fontSize: '14px', fontWeight: '700' }} ></Text>
                                <TextField
                                    className="unitTextFieldInput w-100"
                                    type="number"
                                    name="maxPlotSize"
                                    value={unitDetails.maxPlotSize || ""}
                                    onChange={(e) => {
                                        setUnitDetails((prevData) => ({
                                            ...prevData,
                                            maxPlotSize: e.target.value,
                                        }));
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" style={{ marginRight: '-8%' }}>
                                                <TextField
                                                    select
                                                    name="plotAreaMeasurementUnitEnteredByUser"
                                                    className="unitTextFieldInput"
                                                    onChange={(e) => {
                                                        setUnitDetails((prevData) => ({
                                                            ...prevData,
                                                            plotAreaMeasurementUnitEnteredByUser: e.target.value,
                                                        }));
                                                    }}
                                                    value={unitDetails.plotAreaMeasurementUnitEnteredByUser || ""}
                                                >
                                                    <MenuItem value="" disabled>
                                                        Select
                                                    </MenuItem>
                                                    <MenuItem key="Sq. Mt." value="Sq. Mt.">
                                                        Sq. Mt.
                                                    </MenuItem>
                                                    <MenuItem key="Sq. Ft." value="Sq. Ft.">
                                                        Sq. Ft.
                                                    </MenuItem>
                                                    <MenuItem key="Sq. Yd." value="Sq. Yd.">
                                                        Sq. Yd.
                                                    </MenuItem>
                                                </TextField>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Col>
                        </>
                        : null}
                    {unitFieldsList.includes('minSize') ?
                        <>
                            <Col xs={12} sm={6} md={3} style={{ paddingLeft: '20px', paddingRight: "20px" }} >
                                <Text text={'Size From'} style={{ fontSize: '14px', fontWeight: '700' }} ></Text>
                                <TextField
                                    className="unitTextFieldInput w-100"
                                    type="number"
                                    name="minCarpetArea"
                                    value={unitDetails.minCarpetArea || ""}
                                    onChange={(e) => {
                                        setUnitDetails((prevData) => ({
                                            ...prevData,
                                            minCarpetArea: e.target.value,
                                        }));
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" style={{ marginRight: '-8%' }}>
                                                <TextField
                                                    select
                                                    name="carpetAreaMeasurementUnitEnteredByUser"
                                                    className="unitTextFieldInput"
                                                    onChange={(e) => {
                                                        setUnitDetails((prevData) => ({
                                                            ...prevData,
                                                            carpetAreaMeasurementUnitEnteredByUser: e.target.value,
                                                        }));
                                                    }}
                                                    value={unitDetails.carpetAreaMeasurementUnitEnteredByUser || ""}
                                                >
                                                    <MenuItem value="" disabled>
                                                        Select
                                                    </MenuItem>
                                                    <MenuItem key="Sq. Mt." value="Sq. Mt.">
                                                        Sq. Mt.
                                                    </MenuItem>
                                                    <MenuItem key="Sq. Ft." value="Sq. Ft.">
                                                        Sq. Ft.
                                                    </MenuItem>
                                                    <MenuItem key="Sq. Yd." value="Sq. Yd.">
                                                        Sq. Yd.
                                                    </MenuItem>
                                                </TextField>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Col>
                        </>
                        : null}
                    {unitFieldsList.includes('maxSize') ?
                        <>
                            <Col xs={12} sm={6} md={3} style={{ paddingLeft: '20px', paddingRight: "20px" }}  >
                                <Text text={'Size To'} style={{ fontSize: '14px', fontWeight: '700' }} ></Text>
                                <TextField
                                    className="unitTextFieldInput w-100"
                                    type="number"
                                    name="maxCarpetArea"
                                    value={unitDetails.maxCarpetArea || ""}
                                    onChange={(e) => {
                                        setUnitDetails((prevData) => ({
                                            ...prevData,
                                            maxCarpetArea: e.target.value,
                                        }));
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" style={{ marginRight: '-8%' }}>
                                                <TextField
                                                    select
                                                    name="carpetAreaMeasurementUnitEnteredByUser"
                                                    className="unitTextFieldInput"
                                                    onChange={(e) => {
                                                        setUnitDetails((prevData) => ({
                                                            ...prevData,
                                                            carpetAreaMeasurementUnitEnteredByUser: e.target.value,
                                                        }));
                                                    }}
                                                    value={unitDetails.carpetAreaMeasurementUnitEnteredByUser || ""}
                                                >
                                                    <MenuItem value="" disabled>
                                                        Select
                                                    </MenuItem>
                                                    <MenuItem key="Sq. Mt." value="Sq. Mt.">
                                                        Sq. Mt.
                                                    </MenuItem>
                                                    <MenuItem key="Sq. Ft." value="Sq. Ft.">
                                                        Sq. Ft.
                                                    </MenuItem>
                                                    <MenuItem key="Sq. Yd." value="Sq. Yd.">
                                                        Sq. Yd.
                                                    </MenuItem>
                                                </TextField>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Col>
                        </>
                        : null}
                    {unitFieldsList.includes('minPrice') && unitFieldsList.includes('maxPrice') ?
                        <>
                            <Col xs={12} sm={6} md={3} style={{ paddingLeft: '20px', paddingRight: "20px" }} >
                                <Text text={'Price Range'} style={{ fontSize: '14px', fontWeight: '700' }} ></Text>
                                <Text text={'₹' + unitDetails.minPrice + ' - ' + unitDetails.maxPrice} style={{ fontSize: '13px', fontWeight: '500' }} ></Text>
                                <Slider
                                    name="priceRange"
                                    value={[unitDetails.minPrice || 1000000, unitDetails.maxPrice || 100000000]} // Default values
                                    onChange={(e, newValue) => {
                                        setUnitDetails({
                                            ...unitDetails,
                                            minPrice: newValue[0],
                                            maxPrice: newValue[1],
                                        });
                                    }}
                                    valueLabelDisplay="auto"
                                    disableSwap
                                    min={1000000}
                                    max={100000000}
                                    step={100000} // Adjust step size as needed
                                    style={{ color: "#BE1452" }}
                                />

                            </Col>
                        </>
                        : null}
                    {unitFieldsList.includes('floorPlan') ?
                        <>
                            {imageFields.map((field, index) => (

                                <Col xs={12} sm={6} md={3} style={{ paddingLeft: '20px', paddingRight: "20px" }} key={index} >
                                    <Form.Group controlId={field.docName}>
                                        <Text text={field.docName} style={{ fontSize: '14px', fontWeight: '700' }} />

                                        {/* Hidden File Input */}
                                        <Form.Control
                                            type="file"
                                            name={field.docName}
                                            onChange={(e) => handleFileChange(e, field.docName)}
                                            style={{ display: "none" }}
                                            id={`file-input-${field.docName}`}
                                        />

                                        {/* Custom File Input Label */}
                                        <label
                                            htmlFor={`file-input-${field.docName}`}
                                            style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer", marginRight: '20%', width:'100%' }}
                                        >
                                            <div className='d-flex px-2 w-100 py-1' style={{border: '2px solid #9BA5AD', borderRadius: '4px', backgroundColor: 'white'}}>
                                                <TiCameraOutline className='mt-1' />&nbsp;&nbsp;
                                                <Text text={'Browse'} style={{ fontSize: '14px', fontWeight: '500', color:'#949494' }} />
                                                
                                            </div>
                                        </label>

                                        {/* Image List Display */}
                                        {unitDetails.propertyImageList && unitDetails.propertyImageList.length > 0 ? (
                                            unitDetails.propertyImageList
                                                .filter(image => image.docDescription === field.docName)
                                                .map((image, imgIndex) => (
                                                    <div key={imgIndex} className="d-flex align-items-center">
                                                        <RxCross2
                                                            className="delete-icon ml-2 text-danger"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => handleDeletePropertyImage(image.docDescription)}
                                                        />
                                                        <span
                                                            style={{
                                                                fontSize: "12px",
                                                                fontWeight: 400,
                                                                lineHeight: "16.39px",
                                                                letterSpacing: "-0.02em",
                                                                textAlign: "left",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() => {
                                                                setSelectedImageSrc(image.builderProjectImageAsBase64 || image.docURL);
                                                                setImageShowModal(true);
                                                            }}
                                                        >
                                                            {image.docName}
                                                        </span>
                                                    </div>
                                                ))
                                        ) : (
                                            <span className="mt-2 text-muted" style={{ fontSize: "12px", fontWeight: 400 }}>
                                                No image available
                                            </span>
                                        )}
                                    </Form.Group>


                                </Col>
                            ))}
                        </>
                        : null}
                    {unitFieldsList.includes('comments') ?
                        <>
                            <Col lg={12} className="flex-item mb-3" style={{ paddingLeft: '20px', paddingRight: '20px' }}>

                                <TextField
                                    className='unitTextFieldInput w-100'
                                    type="text"
                                    name={`comments`}
                                    placeholder={`comments`}
                                    value={unitDetails.comments || ""}
                                    onChange={(e) => {
                                        console.log(e);
                                        setUnitDetails({ comments: e.target.value })
                                    }}
                                />
                            </Col>
                        </>
                        : null}
                </Row>
                <div className="close-col align-items-center justify-content-center" >
                    <img src={closeBtn}
                        style={{
                            color: "#FF1919",
                            cursor: "pointer",
                        }}
                        onClick={() => { console.log(unitIndex); handleRemoveUnit(props.unitIndex) }} // Call the remove function
                    />
                </div>
            </div>
            <Modal
                show={showImageModal}
                onHide={() => setImageShowModal(false)}
                centered
            >
                <Modal.Body
                    style={{ position: "relative" }}
                >
                    <h4
                        style={{
                            fontSize: "24px",
                            fontWeight: 700,
                            lineHeight: "21.86px",
                            letterSpacing: "-0.02em",
                            textAlign: "left",
                            marginBottom: "20px",
                        }}
                    >
                        Project Images
                    </h4>

                    <RxCross2
                        className="delete-icon"
                        onClick={() =>
                            setImageShowModal(false)
                        }
                        style={{
                            position: "absolute",
                            top: "-11px",
                            right: "-11px",
                            cursor: "pointer",
                            color: "#fff",
                            background: "#ff1919",
                            fontSize: "24px",
                            borderRadius: "50%",
                            zIndex: 1,
                        }}
                    />

                    {selectedImageSrc && (
                        <img
                            src={selectedImageSrc}
                            alt={
                                selectedImageSrc
                                    ? "Image"
                                    : ""
                            }
                            className="img-fluid"
                        />
                    )}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Units