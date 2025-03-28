import React, { useEffect, useRef, useState } from 'react'
import UnitPostingFields from '../../../../../common/helpers/UnitPostingFields';
import { Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { InputAdornment, MenuItem, Slider, TextField } from '@mui/material';
import Text from '../../../../../shared/Text/Text';
import { TiCameraOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { FaTimesCircle } from "react-icons/fa";
import closeBtn from "../../../../../assets/images/closeBtn.png";
import './AddNewUnit.scss';
import { saveBuilderSubProjectUnits, uploadImage } from '../../../../../common/redux/actions';
import { showErrorToast, showSuccessToast } from '../../../../../common/helpers/Utils';
import Buttons from '../../../../../shared/Buttons/Buttons';

const Units = (props) => {
    const { handleRemoveUnit, unitIndex, builderId, projectId, fetchUnitDetails, editUnit, closeUnitTab } = props;
    const [subProjectDetails, setSubProjectDetails] = useState(props?.subProjectDetails || {
        unitDetails: {
            configuration: 'BHK',
            propertyImagesList: []
        }
    });
    const [unitFieldsList, setUnitFieldsList] = useState([]);
    const [unitDetails, setUnitDetails] = useState(props?.property || {
        builderId: builderId,
        builderProjectId: projectId,
        propertyId: null,
        propertyType: '',
        propertySubType: '',
        numberOfRooms: '',
        compositionType: '',
        totalUnits: '',
        minBuiltUpArea: '',
        maxBuiltUpArea: '',
        minPlotSize: '',
        maxPlotSize: '',
        minArea: '',
        maxArea: '',
        minPrice: 1000000,
        maxPrice: 10000000,
        floorPlan: [],
        propertyImagesList: []
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
    const fileInputRef = useRef();
    const fileInputRef1 = useRef();

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
        // const file = e.target.files[0];
        // if (file) {
        //     const reader = new FileReader();
        //     reader.onloadend = () => {
        //         const newImage = {
        //             builderProjectImageAsBase64: reader.result,
        //             docDescription,
        //             docId: null,
        //             docName: file.name,
        //             docOrderInFrontendView: null,
        //             docURL: "",
        //         };

        //         let propertyImages = [];
        //         propertyImages = [...unitDetails?.propertyImagesList];
        //         propertyImages?.push(newImage);
        //         console.log(propertyImages)
        //         setUnitDetails((prevData) =>
        //         ({
        //             ...prevData,
        //             propertyImagesList: propertyImages,
        //         })
        //         );
        //     };
        //     reader.readAsDataURL(file);
        // }
        const files = Array.from(e.target.files);
        if (docDescription === 'floorPlan') {
            // fileInputRef.current.value = "";
        } else {
            // fileInputRef1.current.value = "";
        }
        if (files.length > 0) {
            let formData = new FormData();
            const maxSizeInBytes = 15 * 1024 * 1024; // 10MB
            Array.from(files).map((file) => {
                if (file.size > maxSizeInBytes) {
                    showErrorToast('File must be less than 15MB...')
                    return;
                }
            })
            let fileList = []
            for (let i = 0; i < files.length; i++) {
                fileList.push(files[i])
                formData.append('file', files[i]);
            }
            formData.append('id', '0')
            formData.append('enumType', 'PROJECT_IMAGES');
            uploadImage(formData)
                .then((response) => {
                    if (response.data.status === 200) {
                        console.log(response.data.resourceData)
                        if (docDescription === 'images') {
                            let projectImage = [...unitDetails?.propertyImagesList];
                            for (let i = 0; i < response.data.resourceData.length; i++) {
                                projectImage.push(response.data.resourceData[i])
                            }
                            console.log(projectImage)
                            setUnitDetails((prevData) => ({
                                ...prevData,
                                propertyImagesList: [...projectImage],
                            }));
                        } else {
                            let floorPlanList = [...unitDetails?.floorPlan];
                            for (let i = 0; i < response.data.resourceData.length; i++) {
                                floorPlanList.push(response.data.resourceData[i])
                            }
                            console.log(floorPlanList)
                            setUnitDetails((prevData) => ({
                                ...prevData,
                                floorPlan: [...floorPlanList],
                            }));
                        }
                        showSuccessToast(response.data.customMessage)
                    }
                })
                .catch((error) => {
                    // setLoading(false);
                });
        }
    };

    const handleDeleteImage = (index, description) => {
        setUnitDetails((prevData) => ({
            ...prevData,
            propertyImagesList: prevData.propertyImagesList.filter((_, i) => i !== index)
        }));
    };

    useEffect(() => {
        console.log(props)
        let unitFields = UnitPostingFields.unitPostingFieldsObj[subProjectDetails?.propertyType][props?.property?.propertySubType ? props?.property?.propertySubType : "Apartment"]?.fields;
        console.log(unitFields);
        setUnitFieldsList([...unitFields]);
        if (props?.builderId !== null && props?.projectId !== null) {
            setUnitDetails((prevData) => ({ ...prevData, builderId: props?.builderId, builderProjectId: props?.projectId }))
        }
        if (editUnit) {
            setUnitDetails((prevData) => ({ ...prevData, propertyImagesList: props?.property?.propertyImagesList }))
        }
    }, []);

    const saveBuilderSubProjectUnit = async () => {
        const response = await saveBuilderSubProjectUnits(unitDetails);
        console.log(response)
        let unitInfo = {...unitDetails};
        unitInfo.propertyId = response?.data?.resourceData;
        setUnitDetails((prevData) => ({ ...prevData, propertyId: response?.data?.resourceData }));
        fetchUnitDetails(unitInfo);
    }

    return (
        <>
            <div className='d-flex mt-3 ' style={{ backgroundColor: '#E5E7E9', border: '1px solid #DED6D9', borderRadius: '5px', width: '100%' }}>
                <Row className='UnitformContainer row mt-3' style={{ width: '100%' }} >
                    <Col xs={12} sm={6} md={3} style={{ paddingLeft: '20px', paddingRight: "20px" }} >
                        <Text text={'Property Type'} style={{ fontSize: '14px', fontWeight: '700' }} ></Text>
                        <TextField
                            select
                            name="propertyType"
                            className="unitTextFieldInput w-100"
                            onChange={(e) => setUnitDetails((prevData) => ({ ...prevData, propertyType: e.target.value }))}
                            value={unitDetails.propertyType || ""} // Ensure value is valid
                        >
                            <MenuItem value="" disabled>
                                Select
                            </MenuItem>
                            <MenuItem key="Residential" value="Residential">
                                Residential
                            </MenuItem>,
                            <MenuItem key="Commercial" value="Commercial">
                                Commercial
                            </MenuItem>
                        </TextField>
                    </Col>
                    <Col xs={12} sm={6} md={3} style={{ paddingLeft: '20px', paddingRight: "20px" }} >
                        <Text text={'Property SubType'} style={{ fontSize: '14px', fontWeight: '700' }} ></Text>
                        <TextField
                            select
                            name="propertySubType"
                            className="unitTextFieldInput w-100"
                            onChange={(e) => {
                                setUnitDetails((prevData) => ({ ...prevData, propertySubType: e.target.value }));
                                let unitFields = UnitPostingFields.unitPostingFieldsObj[subProjectDetails?.propertyType][e.target.value]?.fields;
                                console.log(unitFields);
                                setUnitFieldsList([...unitFields]);
                            }
                            }
                            value={unitDetails.propertySubType || ""} // Ensure value is valid
                        >
                            <MenuItem value="" disabled>
                                Select
                            </MenuItem>
                            {subProjectDetails.subPostType === "Tower"
                                ? [
                                    <MenuItem key="Apartment" value="Apartment">
                                        Apartment
                                    </MenuItem>,
                                    <MenuItem key="Independent House / Bungalow" value="Independent House / Bungalow">
                                        Independent House / Bungalow
                                    </MenuItem>,
                                    <MenuItem key="Office" value="Office">
                                        Office
                                    </MenuItem>,
                                    <MenuItem key="Shop" value="Shop">
                                        Shop
                                    </MenuItem>,
                                    <MenuItem key="Restaurant" value="Restaurant">
                                        Restaurant
                                    </MenuItem>,
                                    <MenuItem key="Plot" value="Plot">
                                        Plot
                                    </MenuItem>,
                                ]
                                : [
                                    <MenuItem key="Apartment" value="Apartment">
                                        Apartment
                                    </MenuItem>,
                                    <MenuItem key="Independent House / Bungalow" value="Independent House / Bungalow">
                                        Independent House / Bungalow
                                    </MenuItem>,
                                    <MenuItem key="Plot" value="Plot">
                                        Plot
                                    </MenuItem>,
                                    <MenuItem key="Office" value="Office">
                                        Office
                                    </MenuItem>,
                                    <MenuItem key="Shop" value="Shop">
                                        Shop
                                    </MenuItem>,
                                    <MenuItem key="Restaurant" value="Restaurant">
                                        Restaurant
                                    </MenuItem>,
                                ]}
                        </TextField>
                    </Col>
                    {unitFieldsList.includes('numberOfRooms') ?
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
                                            numberOfRooms: e.target.value?.split(' ')[0],
                                            compositionType: e.target.value?.split(' ')[1],
                                        }));
                                    }}
                                    value={
                                        unitDetails.numberOfRooms 
                                            ? `${unitDetails.numberOfRooms} ${unitDetails.compositionType || ''}`.trim() 
                                            : ""
                                    } 
                                >
                                    <MenuItem value="" disabled>
                                        Select
                                    </MenuItem>
                                    <MenuItem key="1" value="1 R">
                                        1 R
                                    </MenuItem>
                                    <MenuItem key="1" value="1 RK">
                                        1 RK
                                    </MenuItem>
                                    <MenuItem key="1" value="1 BHK">
                                        1 BHK
                                    </MenuItem>
                                    <MenuItem key="2" value="2 BHK">
                                        2 BHK
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
                                    type='number'
                                    className="unitTextFieldInput w-100"
                                    name='totalUnits'
                                    inputProps={{ min: 0 }}
                                    onChange={(e) => {
                                        setUnitDetails((prevData) => ({
                                            ...prevData, // Preserve existing values
                                            totalUnits: e.target.value,
                                        }));
                                    }}
                                    value={unitDetails.totalUnits || ""}
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
                                    inputProps={{ min: 0 }}
                                    value={unitDetails.minArea || ""}
                                    onChange={(e) => {
                                        setUnitDetails((prevData) => ({
                                            ...prevData,
                                            minArea: e.target.value,
                                        }));
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" style={{ marginRight: '-8%' }}>
                                                <TextField
                                                    select
                                                    name="builtUpAreaMeasurementUnitEnteredByUser"
                                                    className="unitTextFieldInput"
                                                    disabled
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
                                    inputProps={{ min: 0 }}
                                    value={unitDetails.maxArea || ""}
                                    onChange={(e) => {
                                        setUnitDetails((prevData) => ({
                                            ...prevData,
                                            maxArea: e.target.value,
                                        }));
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" style={{ marginRight: '-8%' }}>
                                                <TextField
                                                    select
                                                    name="builtUpAreaMeasurementUnitEnteredByUser"
                                                    className="unitTextFieldInput"
                                                    disabled
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
                                    inputProps={{ min: 0 }}
                                    name="minPlotSize"
                                    value={unitDetails.minArea || ""}
                                    onChange={(e) => {
                                        setUnitDetails((prevData) => ({
                                            ...prevData,
                                            minArea: e.target.value,
                                        }));
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" style={{ marginRight: '-8%' }}>
                                                <TextField
                                                    select
                                                    name="plotAreaMeasurementUnitEnteredByUser"
                                                    className="unitTextFieldInput"
                                                    disabled
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
                                    inputProps={{ min: 0 }}
                                    value={unitDetails.maxArea || ""}
                                    onChange={(e) => {
                                        setUnitDetails((prevData) => ({
                                            ...prevData,
                                            maxArea: e.target.value,
                                        }));
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" style={{ marginRight: '-8%' }}>
                                                <TextField
                                                    select
                                                    name="plotAreaMeasurementUnitEnteredByUser"
                                                    className="unitTextFieldInput"
                                                    disabled
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
                                    name="minArea"
                                    inputProps={{ min: 0 }}
                                    value={unitDetails.minArea || ""}
                                    onChange={(e) => {
                                        setUnitDetails((prevData) => ({
                                            ...prevData,
                                            minArea: e.target.value,
                                        }));
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" style={{ marginRight: '-8%' }}>
                                                <TextField
                                                    select
                                                    name="carpetAreaMeasurementUnitEnteredByUser"
                                                    className="unitTextFieldInput"
                                                    disabled
                                                    onChange={(e) => {
                                                        setUnitDetails((prevData) => ({
                                                            ...prevData,
                                                            carpetAreaMeasurementUnitEnteredByUser: e.target.value,
                                                        }));
                                                    }}
                                                    value={unitDetails.carpetAreaMeasurementUnitEnteredByUser || "Sq. Ft."}
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
                                    name="maxArea"
                                    inputProps={{ min: 0 }}
                                    value={unitDetails.maxArea || ""}
                                    onChange={(e) => {
                                        setUnitDetails((prevData) => ({
                                            ...prevData,
                                            maxArea: e.target.value,
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
                                                    value={unitDetails.carpetAreaMeasurementUnitEnteredByUser || "Sq. Ft."}
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
                            {/* {imageFields.map((field, index) => (

                                <Col xs={12} sm={6} md={3} style={{ paddingLeft: '20px', paddingRight: "20px" }} key={index} >
                                    <Form.Group controlId={field.docName}>
                                        <Text text={field.docName} style={{ fontSize: '14px', fontWeight: '700' }} />

                                            type="file"
                                            name={field.docName}
                                            onChange={(e) => handleFileChange(e, field.docName)}
                                            style={{ display: "none" }}
                                            id={`file-input-${field.docName}`}
                                        />

                                        <label
                                            htmlFor={`file-input-${field.docName}`}
                                            style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer", marginRight: '20%', width: '100%' }}
                                        >
                                            <div className='d-flex px-2 w-100 py-1' style={{ border: '2px solid #9BA5AD', borderRadius: '4px', backgroundColor: 'white' }}>
                                                <TiCameraOutline className='mt-1' />&nbsp;&nbsp;
                                                <Text text={'Browse'} style={{ fontSize: '14px', fontWeight: '500', color: '#949494' }} />

                                            </div>
                                        </label>

                                        {unitDetails.propertyImagesList && unitDetails.propertyImagesList.length > 0 ? (
                                            unitDetails.propertyImagesList
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
                            ))} */}
                            <Col xs={12} sm={6} md={3} style={{ paddingLeft: '20px', paddingRight: "20px" }} >
                                <Form.Group
                                    controlId="formProjectLayout"
                                    className="formProjectLayout"
                                >
                                    {/* <span>Floor Plan Images</span> */}
                                    <div className="image-upload mt-2">
                                        <label htmlFor="upload-project-layout" className="upload-label">
                                            <TiCameraOutline className="camera-icon" />
                                            <input
                                                id="upload-project-layout"
                                                type="file"
                                                className="upload-input"
                                                accept="image/*"
                                                multiple
                                                onChange={(e) => handleFileChange(e, "floorPlan")}
                                                ref={fileInputRef}
                                            />
                                            <span>Upload Floor Plan</span>
                                        </label>
                                        <div className="d-flex flex-wrap mt-2 justify-content-center">
                                            {unitDetails?.floorPlan
                                                ?.map((image, index) => (
                                                    <div
                                                        key={index}
                                                        className="project-images mt-3"
                                                        style={{
                                                            position: "relative",
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        <img
                                                            src={
                                                                image
                                                            }
                                                            alt={""} // Ensure alt text is appropriate for accessibility
                                                            className="img-fluid"
                                                            style={{ maxWidth: "70px", maxHeight: '70px' }}
                                                        />
                                                        <RxCross2
                                                            className="delete-icon"
                                                            onClick={() =>
                                                                handleDeleteImage(index, "upload image")
                                                            }
                                                            style={{
                                                                position: "absolute",
                                                                top: "-5px",
                                                                right: "-4px",
                                                                cursor: "pointer",
                                                                color: "#fff",
                                                                background: "#ff0000",
                                                                borderRadius: "50%",
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                        <Form.Text className="text-muted">
                                            File should be 5MB(max) in png, jpg, etc.
                                        </Form.Text>
                                    </div>
                                </Form.Group>
                            </Col>
                        </>
                        : null}
                    {unitFieldsList.includes('images') ?
                        <>
                            <Col xs={12} sm={6} md={4} style={{ paddingLeft: '20px', paddingRight: "20px" }} >
                                <Form.Group
                                    controlId="formProjectLayout"
                                    className="formProjectLayout"
                                >
                                    {/* <span>Unit Images</span> */}
                                    <div className="image-upload mt-2">
                                        <label htmlFor="upload-property-image" className="upload-label">
                                            <TiCameraOutline className="camera-icon" />
                                            <input
                                                id="upload-property-image"
                                                type="file"
                                                className="upload-input"
                                                accept="image/*"
                                                multiple
                                                onChange={(e) => handleFileChange(e, 'images')}
                                                ref={fileInputRef}
                                            />
                                            <span>Upload Property Images</span>
                                        </label>
                                        <div className="d-flex flex-wrap mt-2 justify-content-center">
                                            {unitDetails?.propertyImagesList
                                                ?.map((image, index) => (
                                                    <div
                                                        key={index}
                                                        className="project-images mt-3"
                                                        style={{
                                                            position: "relative",
                                                            marginRight: "10px",
                                                        }}
                                                    >
                                                        <img
                                                            src={
                                                                image
                                                            }
                                                            alt={""} // Ensure alt text is appropriate for accessibility
                                                            className="img-fluid"
                                                            style={{ maxWidth: "70px", maxHeight: '70px' }}
                                                        />
                                                        <RxCross2
                                                            className="delete-icon"
                                                            onClick={() =>
                                                                handleDeleteImage(index, "upload image")
                                                            }
                                                            style={{
                                                                position: "absolute",
                                                                top: "-5px",
                                                                right: "-4px",
                                                                cursor: "pointer",
                                                                color: "#fff",
                                                                background: "#ff0000",
                                                                borderRadius: "50%",
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                        <Form.Text className="text-muted">
                                            File should be 5MB(max) in png, jpg, etc.
                                        </Form.Text>
                                    </div>
                                </Form.Group>
                            </Col>
                        </>
                        : null}
                    {/* {unitFieldsList.includes('comments') ?
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
                        : null} */}
                    <div style={{ alignItems: 'end' }}>
                        <Buttons className="mt-2" name={editUnit ? "Save" : "Add Unit"} varient="primary" onClick={() => { saveBuilderSubProjectUnit(); }} />
                    </div>
                </Row>
                <div className="close-col align-items-center justify-content-center" >
                    <img src={closeBtn}
                        style={{
                            color: "#FF1919",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            handleRemoveUnit(props.unitIndex);
                        }} // Call the remove function
                    />
                </div>
            </div >
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