import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { compose } from "redux"
import PostingFields from "../../../common/helpers/PostingFields";
import { Button, Col, Row } from "react-bootstrap";
import { Checkbox, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Slider, TextField } from "@mui/material";
import Text from '../../../shared/Text/Text';
import POSTING_CONSTANTS from "../../../common/helpers/POSTING_CONSTANTS";
import * as Actions from '../../../common/redux/types';
import Buttons from "../../../shared/Buttons/Buttons";
import { validateSpecs } from "../../../common/validations";
import { getChatGptDescription } from "../../../common/redux/actions";

const Specs = (props) => {

    const { basicDetailFields, addressDetailFields, specDetailFields } = props;
    const [specList, setSpecList] = useState([]);
    const dispatch = useDispatch();
    const [specDetails, setSpecDetails] = useState(Object.keys(specDetailFields.data).length !== 0 ?
        specDetailFields.data : {
            numberOfRooms: 0.0,
            propertyRoomCompositionType: '',
            hasExtraKitchen: false,
            hasServantRoom: false,
            builtUpArea: null,
            builtUpAreaMeasurementUnit: '',
            carpetArea: null,
            carpetAreaMeasurementUnit: '',
            openArea: null,
            openAreaMeasurementUnit: '',
            plotArea: null,
            plotAreaMeasurementUnit: '',
            loadingFactorInPercent: Number(30),
            flatType: '',
            isUnusedProperty: null,
            furnishingDescription: '',
            furnishing: '',
            entranceFacing: '',
            numberOfBaths: null,
            numberOfCarParking: null,
            numberOfTwoWheelerParking: null,
            numberOfBalconies: null,
            unitFurnishing: '',
            structure: '',
            commercialPropertyType: '',
            propertyDescription: '',
            commercialPropertyPurposes: [],
            purposes: [],
            propertyOverlookings: [],
            internalAmenities: [],
            generalAmenities: [],
            commercialGeneralAmenities: [],
            pgGuestHouseFacilities: [],
            pgGuestHouseAttachedTo: [],

        });
    const [internalAmenitiesList, setInternalAmenitiesList] = useState([]);
    const [saveSpecsFlag, setSaveSpecsFlag] = useState(false);
    const [error, setError] = useState({});

    useEffect(() => {
        if (Object.keys(basicDetailFields.data).length !== 0) {
            let speclist = [];
            let fields = basicDetailFields.data;
            console.log(fields)
            let category = '';
            if(fields.propertyCategory === 'Lease') {
                category = 'Renting'
            } else if( fields.propertyCategory === 'Sale') {
                category = 'Selling'
            } else {
                category = fields.propertyCategory
            }
            if (fields.propertyType === 'Residential') {
                if (fields.propertySubType === 'PG/Co-Living') {
                    speclist = PostingFields.postingFieldsObject[category][fields.stageOfProperty === null ? 'Ready' : fields.stageOfProperty][fields.propertyType]["Pg"][fields.guestHouseOrPgPropertyType].Specs
                    console.log(PostingFields.postingFieldsObject[category][fields.stageOfProperty === null ? 'Ready' : fields.stageOfProperty][fields.propertyType]["Pg"][fields.guestHouseOrPgPropertyType].Specs)
                } else {
                    speclist = PostingFields.postingFieldsObject[category][fields.stageOfProperty === null ? 'Ready' : fields.stageOfProperty][fields.propertyType][fields.propertySubType].Specs
                }
            } else if (fields.propertyType === 'Commercial') {
                speclist = PostingFields.postingFieldsObject[category][fields.stageOfProperty === null ? 'Ready' : fields.stageOfProperty][fields.propertyType].Specs
            }
            if (fields.propertySubType === 'Independent house' || fields.propertySubType === 'Builder Floor') {
                setInternalAmenitiesList(POSTING_CONSTANTS.InternalAmeniteis)
            }
            if (fields.propertySubType === 'Apartment') {
                setInternalAmenitiesList(['Personal lift', 'Gym', 'Bar'])
            }
            if (fields.propertyType === 'Commercial') {
                setInternalAmenitiesList(POSTING_CONSTANTS.CommercialAmeniteis)
            }
            console.log(specDetails)
            setSpecList(speclist);
            // console.log(PostingFields.postingFieldsObject[fields.propertyCategory][fields.stageOfProperty][fields.propertyType][fields.propertySubType]?.Specs)
        }
    }, []);

    const setAddRoom = (e) => {
        if (e.target.checked) {
            setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, numberOfRooms: specDetails.numberOfRooms + 0.5 }))
            console.log(specDetails.numberOfRooms)
        }
        else {
            setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, numberOfRooms: specDetails.numberOfRooms - 0.5 }))
        }
    }

    const generatePropertyDescription = async () => {
        const valid = validateSpecs(specDetails, specList, false);
        if(valid.isValid) {

            const requestBody = {
                "Type": basicDetailFields?.data?.propertyType,
                "Purpose": basicDetailFields?.data?.propertyCategory,
                "Stage of property": basicDetailFields?.data?.stageOfProperty,
                "Sub type": basicDetailFields?.data?.propertySubType,
                "Location": addressDetailFields.data.city,
                "BHK": specDetails.numberOfRooms,
                "Attached": JSON.stringify(specDetails.pgGuestHouseAttachedTo) || '',
                "Flat type": specDetails.flatType,
                "Commercial purpose": JSON.stringify(specDetails.commercialPropertyPurposes),
                "Structure": specDetails.structure, 
                "Entrance facing": specDetails.entranceFacing,
                "Overlooking": JSON.stringify(specDetails.propertyOverlookings),
                "Unit furnishing": specDetails.unitFurnishing,
                "Furnished": specDetails.furnishing,
                "Furnishing details": specDetails.furnishingDescription, 
                "Internal amenities": JSON.stringify(specDetails.internalAmenities),
                "General amenities": JSON.stringify(specDetails.generalAmenities) 
            }

            const response = await getChatGptDescription(requestBody);
            console.log(response);
            setSpecDetails(prevSpecDetails => ({...prevSpecDetails, propertyDescription: response?.data?.resourceData}))
        }
}

const saveSpecDetails = () => {
    const valid = validateSpecs(specDetails, specList, true);
    setError(valid.errors);
    if (valid.isValid) {
        dispatch({ type: Actions.SPEC_DETAILS_SUCCESS, data: specDetails })
        setSaveSpecsFlag(true);
    }
}

const handleCarpetAreaChange = (e) => {
    const carpetArea = parseFloat(e.target.value);
    const loadingFactor = parseFloat(specDetails.loadingFactorInPercent);
    const builtUpArea = carpetArea / (1 - (loadingFactor * 0.01));
    console.log(builtUpArea)
    setSpecDetails(prevSpecDetails => ({
        ...prevSpecDetails,
        carpetArea: carpetArea,
        builtUpArea: builtUpArea.toFixed(3) // Adjust decimal places as needed
    }));
};

const handleLoadingFactorChange = (e) => {
    if (specDetails.carpetArea !== null) {
        const carpetArea = parseFloat(specDetails.carpetArea)
        const loadingFactor = parseFloat(e.target.value);
        const builtUpArea = carpetArea / (1 - (loadingFactor * 0.01));
        setSpecDetails(prevSpecDetails => ({
            ...prevSpecDetails,
            loadingFactorInPercent: loadingFactor,
            carpetArea: carpetArea,
            builtUpArea: builtUpArea.toFixed(3) // Adjust decimal places as needed
        }));
    }
    if (specDetails.builtUpArea !== null) {
        const builtUpArea = parseFloat(specDetails.carpetArea)
        const loadingFactor = parseFloat(e.target.value);
        const carpetArea = parseFloat(builtUpArea * (1 - (loadingFactor * 0.01)));
        setSpecDetails(prevSpecDetails => ({
            ...prevSpecDetails,
            loadingFactorInPercent: loadingFactor,
            carpetArea: carpetArea.toFixed(3),
            builtUpArea: builtUpArea // Adjust decimal places as needed
        }));
    }
};

const handleBuiltupAreaChange = (e) => {
    const builtUpArea = parseFloat(e.target.value);
    const loadingFactor = parseFloat(specDetails.loadingFactorInPercent)
    const carpetArea = parseFloat(builtUpArea * (1 - (specDetails.loadingFactorInPercent * 0.01)));
    setSpecDetails(prevSpecDetails => ({
        ...prevSpecDetails,
        carpetArea: carpetArea.toFixed(3),
        builtUpArea: builtUpArea // Adjust decimal places as needed
    }));
};

return (
    <>
        <div className="whiteBg">
            <Row>
                {specList.includes('BHK') ?
                    <>
                        <Col lg='4' className='mb-2'>
                            <TextField
                                error={error.numberOfRooms}
                                type="number"
                                required
                                className="w-100"
                                label={'BHK'}
                                onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, numberOfRooms: e.target.value })) }}
                                value={specDetails.numberOfRooms}
                                InputProps={{
                                    endAdornment: <>
                                        <TextField
                                            error={error.propertyRoomCompositionType}
                                            style={{ borderStyle: 'unset' }}
                                            className="w-50 p-0"
                                            select
                                            InputProps={{ style: { border: 'unset' } }}
                                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, propertyRoomCompositionType: e.target.value })) }}
                                            value={specDetails.propertyRoomCompositionType}
                                        >
                                            {POSTING_CONSTANTS.roomCompositionList.map(item => (
                                                <MenuItem key={item} value={item}>{item}</MenuItem>
                                            ))}
                                        </TextField>
                                    </>
                                }}
                            ></TextField>
                        </Col>
                        <Col className="d-flex p-0" lg='4'>
                            <Checkbox onChange={(e) => { setAddRoom(e) }} className="p-1 mt-0" style={{ scale: '1', color: '#BE1452' }}></Checkbox>
                            <Text className='mt-3' text={'.5'} style={{ fontSize: '16px' }} ></Text> &nbsp;&nbsp;
                            <Checkbox onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, hasServantRoom: e.target.checked })) }} defaultChecked={specDetails.hasServantRoom} className="p-1 mt-0" style={{ scale: '1', color: '#BE1452' }}></Checkbox>
                            <Text className='mt-3' text={'Servant Room'} style={{ fontSize: '16px' }} ></Text> &nbsp;&nbsp;
                            <Checkbox onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, hasExtraKitchen: e.target.checked })) }} defaultChecked={specDetails.hasExtraKitchen} className="p-1 mt-0" style={{ scale: '1', color: '#BE1452' }}></Checkbox>
                            <Text className='mt-3' text={'Extra Kitchen'} style={{ fontSize: '16px' }} ></Text>
                        </Col>
                    </>
                    : null}
                {specList.includes('Structure') ?
                    <Col lg='4' className='mb-2'>
                        <TextField
                            select
                            className="w-100"
                            label={'Attached'}
                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, structure: e.target.value })) }}
                            value={specDetails.structure}
                        >
                            {POSTING_CONSTANTS.structureList.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>
                    </Col>
                    : null}
                {specList.includes('Attached') ?
                    <Col lg='4' className='mb-2'>
                        <TextField
                            select
                            multiple
                            SelectProps={{
                                multiple: true
                            }}
                            className="w-100"
                            label={'Attached'}
                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, pgGuestHouseAttachedTo: e.target.value })) }}
                            value={specDetails.pgGuestHouseAttachedTo}
                        >
                            {POSTING_CONSTANTS.attachedList.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>
                    </Col>
                    : null}
                {specList.includes('Flat type') ?
                    <Col lg='4' className='mb-2'>
                        <TextField
                            select
                            error={error.flatType}
                            required
                            className="w-100"
                            label={'Flat type'}
                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, flatType: e.target.value })) }}
                            value={specDetails.flatType}
                        >
                            {POSTING_CONSTANTS.flatTypeList.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>
                    </Col>
                    : null}
                {specList.includes('Carpet area/built-up area') ?
                    <>
                        <Col lg='4' className='mb-2'>
                            <TextField
                                type="number"
                                required
                                error={error.carpetArea}
                                className="w-100"
                                label={'Carpet area'}
                                onChange={(e) => { handleCarpetAreaChange(e) }}
                                value={specDetails.carpetArea}
                                InputProps={{
                                    endAdornment: <>
                                        <TextField
                                            style={{ borderStyle: 'unset' }}
                                            className="w-50 p-0"
                                            select
                                            error={error.carpetAreaMeasurementUnit}
                                            InputProps={{ style: { border: 'unset' } }}
                                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, carpetAreaMeasurementUnit: e.target.value, builtUpAreaMeasurementUnit: e.target.value })) }}
                                            value={specDetails.carpetAreaMeasurementUnit}
                                        >
                                            {POSTING_CONSTANTS.measurementUnits.map(item => (
                                                <MenuItem key={item} value={item}>{item}</MenuItem>
                                            ))}
                                        </TextField>
                                    </>
                                }}
                            >
                            </TextField>
                        </Col>
                        {specList.includes('Loading factor') ?
                            <Col className="p-0" lg='4'>
                                <span className="d-flex">
                                    <Text text='Loading Factor' fontWeight='bold' style={{ fontSize: '16px' }} />
                                    <Text className='mt-1' text='Add carpet area or Built up area only' fontWeight='500' style={{ fontSize: '12px' }} />
                                </span>
                                <Slider defaultValue={specDetails.loadingFactorInPercent}
                                    valueLabelDisplay="auto"
                                    min={10}
                                    max={100}
                                    onChange={(e) => { handleLoadingFactorChange(e) }}
                                    style={{ color: "#BE142" }}
                                />
                            </Col>
                            : null}
                        <Col lg='4' className='mb-2'>
                            <TextField
                                type="number"
                                required
                                error={error.builtUpArea}
                                className="w-100"
                                label={'Built-up area'}
                                onChange={(e) => { handleBuiltupAreaChange(e) }}
                                value={specDetails.builtUpArea}
                                InputProps={{
                                    endAdornment: <>
                                        <TextField
                                            style={{ borderStyle: 'unset' }}
                                            className="w-50 p-0"
                                            select
                                            error={error.builtUpAreaMeasurementUnit}
                                            InputProps={{ style: { border: 'unset' } }}
                                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, builtUpAreaMeasurementUnit: e.target.value, carpetAreaMeasurementUnit: e.target.value })) }}
                                            value={specDetails.builtUpAreaMeasurementUnit}
                                        >
                                            {POSTING_CONSTANTS.measurementUnits.map(item => (
                                                <MenuItem key={item} value={item}>{item}</MenuItem>
                                            ))}
                                        </TextField>
                                    </>
                                }}
                            >
                            </TextField>
                        </Col>
                    </>
                    : null}
                {specList.includes('Carpet area/built-up area of the room') ?
                    <>
                        <Col lg='4' className='mb-2'>
                            <TextField
                                type="number"
                                required
                                error={error.carpetArea}
                                className="w-100"
                                label={'Carpet area'}
                                onChange={(e) => { handleCarpetAreaChange(e) }}
                                value={specDetails.carpetArea}
                                InputProps={{
                                    endAdornment: <>
                                        <TextField
                                            style={{ borderStyle: 'unset' }}
                                            className="w-50 p-0"
                                            select
                                            error={error.carpetAreaMeasurementUnit}
                                            InputProps={{ style: { border: 'unset' } }}
                                            onChange={(e) => {
                                                setSpecDetails(prevSpecDetails => ({
                                                    ...prevSpecDetails, carpetAreaMeasurementUnit: e.target.value, builtUpAreaMeasurementUnit: e.target.value,
                                                    openAreaMeasurementUnit: e.target.value,
                                                }))
                                            }}
                                            value={specDetails.carpetAreaMeasurementUnit}
                                        >
                                            {POSTING_CONSTANTS.measurementUnits.map(item => (
                                                <MenuItem key={item} value={item}>{item}</MenuItem>
                                            ))}
                                        </TextField>
                                    </>
                                }}
                            >
                            </TextField>
                        </Col>
                        {specList.includes('Loading factor') ?
                            <Col className="p-0" lg='4'>
                                <span className="d-flex">
                                    <Text text='Loading Factor' fontWeight='bold' style={{ fontSize: '16px' }} />
                                    <Text className='mt-1' text='Add carpet area or Built up area only' fontWeight='500' style={{ fontSize: '12px' }} />
                                </span>
                                <Slider defaultValue={specDetails.loadingFactorInPercent}
                                    valueLabelDisplay="auto"
                                    min={10}
                                    max={100}
                                    onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, loadingFactorInPercent: e.target.value })) }}
                                    style={{ color: "#BE142" }}
                                />
                            </Col>
                            : null}
                        <Col lg='4' className='mb-2'>
                            <TextField
                                type="number"
                                required
                                error={error.builtUpArea}
                                className="w-100"
                                label={'Built-up area'}
                                onChange={(e) => { handleBuiltupAreaChange(e) }}
                                value={specDetails.builtUpArea}
                                InputProps={{
                                    endAdornment: <>
                                        <TextField
                                            style={{ borderStyle: 'unset' }}
                                            className="w-50 p-0"
                                            select
                                            error={error.builtUpAreaMeasurementUnit}
                                            InputProps={{ style: { border: 'unset' } }}
                                            onChange={(e) => {
                                                setSpecDetails(prevSpecDetails => ({
                                                    ...prevSpecDetails, builtUpAreaMeasurementUnit: e.target.value, carpetAreaMeasurementUnit: e.target.value,
                                                    openAreaMeasurementUnit: e.target.value,
                                                }))
                                            }}
                                            value={specDetails.builtUpAreaMeasurementUnit}
                                        >
                                            {POSTING_CONSTANTS.measurementUnits.map(item => (
                                                <MenuItem key={item} value={item}>{item}</MenuItem>
                                            ))}
                                        </TextField>
                                    </>
                                }}
                            >
                            </TextField>
                        </Col>
                    </>
                    : null}

                {specList.includes('Plot area') ?
                    <Col lg='4' className='mb-2'>
                        <TextField
                            type="number"
                            required
                            error={error.plotArea}
                            className="w-100"
                            label={'Plot area'}
                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, plotArea: e.target.value })) }}
                            value={specDetails.plotArea}
                            InputProps={{
                                endAdornment: <>
                                    <TextField
                                        style={{ borderStyle: 'unset' }}
                                        className="w-50 p-0"
                                        select
                                        error={error.plotAreaMeasurementUnit}
                                        InputProps={{ style: { border: 'unset' } }}
                                        onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, plotAreaMeasurementUnit: e.target.value })) }}
                                        value={specDetails.plotAreaMeasurementUnit}
                                    >
                                        {POSTING_CONSTANTS.measurementUnits.map(item => (
                                            <MenuItem key={item} value={item}>{item}</MenuItem>
                                        ))}
                                    </TextField>
                                </>
                            }}
                        >
                        </TextField>
                    </Col>
                    : null}
                {specList.includes('Open area') ?
                    <Col lg='4' className='mb-2'>
                        <TextField
                            type='number'
                            required
                            error={error.openArea}
                            className="w-100"
                            label={'Open, Garden or Terrace Area'}
                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, openArea: e.target.value })) }}
                            value={specDetails.openArea}
                            InputProps={{
                                endAdornment: <>
                                    <TextField
                                        style={{ borderStyle: 'unset' }}
                                        className="w-50 p-0"
                                        select
                                        error={error.openAreaMeasurementUnit}
                                        InputProps={{ style: { border: 'unset' } }}
                                        onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, openAreaMeasurementUnit: e.target.value, builtUpAreaMeasurementUnit: e.target.value, carpetAreaMeasurementUnit: e.target.value })) }}
                                        value={specDetails.openAreaMeasurementUnit}
                                    >
                                        {POSTING_CONSTANTS.measurementUnits.map(item => (
                                            <MenuItem key={item} value={item}>{item}</MenuItem>
                                        ))}
                                    </TextField>
                                </>
                            }}
                        >
                        </TextField>
                    </Col>
                    : null}
                {specList.includes('Property type') ?
                    <Col lg='4' className='mb-2'>
                        <TextField
                            required
                            error={error.commercialPropertyType}
                            select
                            className="w-100"
                            label={'Property Type'}
                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, commercialPropertyType: e.target.value })) }}
                            value={specDetails.commercialPropertyType}
                        >
                            {POSTING_CONSTANTS.commercialPropertyType.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>
                    </Col>
                    : null}
                {specList.includes('Purpose') ?
                    <Col lg='4' className='mb-2'>
                        <TextField
                            required
                            error={error.commercialPropertyPurposes}
                            select
                            multiple
                            SelectProps={{
                                multiple: true
                            }}
                            className="w-100"
                            label={'Purpose'}
                            onChange={(e) => { console.log(e); setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, commercialPropertyPurposes: e.target.value })) }}
                            value={specDetails.commercialPropertyPurposes}
                        >
                            {POSTING_CONSTANTS.commercialPurpose.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>
                    </Col>
                    : null}
                {specList.includes('Number of balconies') ?
                    <Col lg='4' className='mb-2'>
                        <TextField
                            type="number"
                            className="w-100"
                            label={'Number of Balconies Including in Carpet Area'}
                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, numberOfBalconies: e.target.value })) }}
                            value={specDetails.numberOfBalconies}
                        >
                        </TextField>
                    </Col>
                    : null}
                {specList.includes('Number of washrooms') ?
                    <Col lg='4' className='mb-2'>
                        <TextField
                            type="number"
                            required
                            error={error.numberOfBaths}
                            className="w-100"
                            label={'Number of Washrooms'}
                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, numberOfBaths: e.target.value })) }}
                            value={specDetails.numberOfBaths}
                        >
                        </TextField>
                    </Col>
                    : null}
                {specList.includes('Car parkings') ?
                    <Col lg='4' className='mb-2'>
                        <TextField
                            type="number"
                            required
                            error={error.numberOfCarParking}
                            className="w-100"
                            label={'Car Parkings'}
                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, numberOfCarParking: e.target.value })) }}
                            value={specDetails.numberOfCarParking}
                        >
                        </TextField>
                    </Col>
                    : null}
                {specList.includes('Reserved car parkings') ?
                    <Col lg='4' className='mb-2'>
                        <TextField
                            type="number"
                            className="w-100"
                            label={'Reserved Car Parkings'}
                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, numberOfCarParking: e.target.value })) }}
                            value={specDetails.numberOfCarParking}
                        >
                        </TextField>
                    </Col>
                    : null}
                {specList.includes('Reserved two wheeler parkings') ?
                    <Col lg='4' className='mb-2'>
                        <TextField
                            type="number"
                            className="w-100"
                            label={'Reserved Two Wheeler Parkings'}
                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, numberOfTwoWheelerParking: e.target.value })) }}
                            value={specDetails.numberOfTwoWheelerParking}
                        >
                        </TextField>
                    </Col>
                    : null}
                {specList.includes('Entrance facing') ?
                    <Col lg='4' className='mb-2'>
                        <TextField
                            select
                            className="w-100"
                            label={'Entrance Facing'}
                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, entranceFacing: e.target.value })) }}
                            value={specDetails.entranceFacing}
                        >
                            {POSTING_CONSTANTS.entranceFacingList.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>
                    </Col>
                    : null}
                {specList.includes('Overlooking') ?
                    <Col lg='4' className='mb-2'>
                        <TextField
                            select
                            multiple
                            SelectProps={{
                                multiple: true
                            }}
                            className="w-100"
                            label={'OverLooking'}
                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, propertyOverlookings: e.target.value })) }}
                            value={specDetails.propertyOverlookings}
                        >
                            {POSTING_CONSTANTS.overLookingList.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>
                    </Col>
                    : null}
                {specList.includes('UnUsed property') ?
                    <Col lg='4'>
                        <Text text={'Un Used Property ?'} fontWeight={'bold'} style={{ fontSize: '16px' }} />
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={specDetails.isUnusedProperty}
                            >
                                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </Col>
                    : null}
                {specList.includes('Unit Furnishing') ?
                    <Col lg='4' className='mb-2'>
                        <TextField
                            select
                            className="w-100"
                            label={'Unit Furnishing'}
                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, unitFurnishing: e.target.value })) }}
                            value={specDetails.unitFurnishing}
                        >
                            {POSTING_CONSTANTS.UnitFurnishingList.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>
                    </Col>
                    : null}
                {specList.includes('Furnishing type') ?
                    <Col lg='4' className='mb-2'>
                        <TextField
                            select
                            className="w-100"
                            label={'Furnishing Type'}
                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, furnishing: e.target.value })) }}
                            value={specDetails.furnishing}
                        >
                            {POSTING_CONSTANTS.FurnishingTypeList.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>
                    </Col>
                    : null}
                {specList.includes('Furnishing description') ?
                    <Col lg='8' className='mb-2'>
                        <TextField
                            type="text"
                            className="w-100"
                            label={'Furnishing Description'}
                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, furnishingDescription: e.target.value })) }}
                            value={specDetails.furnishingDescription}
                        >
                        </TextField>
                    </Col>
                    : null}
                {specList.includes('Facility included') ?
                    <Col lg='4' className='mb-2'>
                        <TextField
                            select
                            multiple
                            SelectProps={{
                                multiple: true
                            }}
                            className="w-100"
                            label={'Facility included'}
                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, pgGuestHouseFacilities: e.target.value })) }}
                            value={specDetails.pgGuestHouseFacilities}
                        >
                            {POSTING_CONSTANTS.FacilityIncluded.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>
                    </Col>
                    : null}
                {specList.includes('Internal amenities') ?
                    <Col lg='4' className='mb-2'>
                        <TextField
                            select
                            multiple
                            SelectProps={{
                                multiple: true
                            }}
                            className="w-100"
                            label={'Internal Amenities'}
                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, internalAmenities: e.target.value })) }}
                            value={specDetails.internalAmenities}
                        >
                            {internalAmenitiesList.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>
                    </Col>
                    : null}
                {specList.includes('General amenities') ?
                    <Col lg='4' className='mb-2'>
                        <TextField
                            select
                            multiple
                            SelectProps={{
                                multiple: true
                            }}
                            className="w-100"
                            label={'General Amenities'}
                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, generalAmenities: e.target.value })) }}
                            value={specDetails.generalAmenities}
                        >
                            {POSTING_CONSTANTS.GeneralAmenities.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>
                    </Col>
                    : null}
                {specList.includes('Property description') ?
                    <Col lg='12' className='mb-2'>
                        <Buttons className='mb-2' name={'Generate ChatGpt description'} onClick={() => {generatePropertyDescription()}} />
                        <TextField
                            required
                            multiline
                            error={error.propertyDescription}
                            type="text"
                            className="w-100"
                            label={'property Description'}
                            onChange={(e) => { setSpecDetails(prevSpecDetails => ({ ...prevSpecDetails, propertyDescription: e.target.value })) }}
                            value={specDetails.propertyDescription}
                        >
                        </TextField>
                    </Col>
                    : null}
            </Row>
        </div>
        {saveSpecsFlag === false ?
            <div className="d-flex">
                <Buttons className='p-2 px-4' name='Confirm' onClick={() => { saveSpecDetails(); }}></Buttons> &nbsp; &nbsp;
                <Buttons className='p-2 px-4' name='Cancel' ></Buttons>
            </div>
            : null}

    </>
);
}

const mapStateToProps = ({ basicDetailFields, addressDetailFields, specDetailFields }) => ({
    basicDetailFields, addressDetailFields, specDetailFields
})

const actions = {

}

export default compose(connect(mapStateToProps, actions))(Specs);