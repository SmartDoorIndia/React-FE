import { useEffect, useState } from "react";
import { compose } from "redux"
import { connect, useDispatch } from "react-redux";
import { TextField, MenuItem } from '@mui/material';
import CONSTANTS_STATUS from "../../../common/helpers/ConstantsStatus";
import { Row, Col } from 'react-bootstrap';
import './property.scss';
import Buttons from "../../../shared/Buttons/Buttons";
import Text from "../../../shared/Text/Text";
import * as Actions from '../../../common/redux/types';
import { validateBasicDetails } from "../../../common/validations";
import POSTING_CONSTANTS from "../../../common/helpers/POSTING_CONSTANTS";
import { addBasicDetails } from "../../../common/redux/actions";
import { getLocalStorage } from "../../../common/helpers/Utils";

const BasicDetails = (props) => {
    const { basicDetailFields, saveBasicDetailsFields, customerDetails } = props;
    const propertyPostTypeList = POSTING_CONSTANTS.propertyPostType;
    const propertyStageList = POSTING_CONSTANTS.propertyStage;
    const propertyTypeList = POSTING_CONSTANTS.propertyType;
    let propertySubTypeList = POSTING_CONSTANTS.propertySubType;
    const PGInList = ["Apartment", "Independent house", "Builder Floor"];
    const PGSharingList = ['Single', 'Double', 'Triple'];
    const [yearList, setYearList] = useState([]);
    const monthList = CONSTANTS_STATUS.monthList;
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [saveBasicDetailsFlag, setSaveBasicDetailsFlag] = useState(false);
    const [error, setError]  = useState({});
    const [basicDetails, setBasicDetails] = useState(Object.keys(basicDetailFields.data).length !== 0 ? basicDetailFields.data : {
        propertyCategory: "",
        propertyType: "",
        stageOfProperty: "",
        propertySubType: "",
        ageOfProperty: 0,
        guestHouseOrPgPropertyType: "",
        expectedPossessionDate: "",
        occupancySharing: 0
    });
    const dispatch = useDispatch();

    useEffect(() => {
        let currentYear = new Date().getFullYear();
        let yearlist = []
        yearlist.push((currentYear.toString()));
        for (let i = 1; i <= 9; i++) {
            yearlist.push((currentYear + i).toString());
        }
        setYearList(yearlist);
        console.log(props)
    }, []);

    const setPropertyCategory = async (e) => {
        setBasicDetails((prevBasicDetails) => ({
            ...prevBasicDetails,
            propertyCategory: e.target.value
        }));

        if (e.target.value === 'Renting') {
            console.log(e.target.value)
            await setBasicDetails((prevBasicDetails) => ({
                ...prevBasicDetails,
                stageOfProperty: 'Ready',
            }));
        }
    };

    const setPropertyStage = (e) => {
        setBasicDetails((prevBasicDetails) => ({
            ...prevBasicDetails,
            stageOfProperty: e.target.value, ageOfProperty: e.target.value === 'Under Construction' ? 0 : basicDetails.ageOfProperty,
            expectedPossessionDate : e.target.value === 'Ready' ? '' : basicDetails.expectedPossessionDate
        }));
    }
    
    const setPropertyType = (e) => {
        setBasicDetails((prevBasicDetails) => ({
            ...prevBasicDetails,
            propertyType: e.target.value,
        }));
    }

    const saveBasicDetails = async () => {
        if (basicDetails.stageOfProperty === 'Under Construction') {
            setBasicDetails({ ...basicDetails, expectedPossessionDate: selectedMonth + '-' + selectedYear })
        }
        const valid = validateBasicDetails(basicDetails);
        console.log(valid)
        setError(valid.errors);
        if (valid.isValid) {
            let userId = getLocalStorage('authData');
            const data = {
                miscellaneousDetails: {
                    postedById: userId.userid,
                    lastPageOfInfoFilled: 0,
                    draft: true,
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
                    postedByName: userId.name,
                    postedByMobile: userId.mobile,
                    postedByProfileImageUrl: '',
                    ownerName: customerDetails.name,
                    ownerMobileNumber: customerDetails.mobile,
                    isPostingForOthers: true
                },
                basicDetails: basicDetails
            }
            console.log(userId)
            const response = await addBasicDetails(data);
            console.log(response?.data?.resourceData?.propertyId)
            dispatch({ type: Actions.BASIC_DETAILS_SUCCESS, data: basicDetails })
            setSaveBasicDetailsFlag(true)
            saveBasicDetailsFields({propertyId : response?.data?.resourceData?.propertyId, saveFlag: true})
        }
    }

    return (
        <>
            <div className="whiteBg mb-1">
                <Row>
                    <Col lg='4'>
                        <TextField
                            select
                            error={error.propertyCategory}
                            disabled={saveBasicDetailsFlag === true ? true : false}
                            label='I Want To Post My Property For'
                            className=" w-100"
                            onChange={(e) => { setPropertyCategory(e); }}
                            value={basicDetails.propertyCategory}
                        >
                            <MenuItem value="" disabled>Select</MenuItem>
                            {propertyPostTypeList?.length > 0
                                ? propertyPostTypeList?.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))
                                : null}
                        </TextField>
                    </Col>
                    <Col lg='4'>
                        <TextField
                            select
                            error={error.stageOfProperty}
                            disabled={basicDetails.propertyCategory === 'Renting' || saveBasicDetailsFlag === true}
                            label='Stage Of Property'
                            className=" w-100"
                            onChange={(e) => { setPropertyStage(e); }}
                            value={basicDetails.stageOfProperty}
                        >
                            <MenuItem value="" disabled>Select</MenuItem>
                            {propertyStageList?.length > 0
                                ? propertyStageList?.map((stage) => (
                                    <MenuItem key={stage} value={stage}>
                                        {stage}
                                    </MenuItem>
                                ))
                                : null}
                        </TextField>
                    </Col>
                    <Col lg='4'>
                        <TextField
                            select
                            error={error.propertyType}
                            disabled={saveBasicDetailsFlag === true ? true : false}
                            label='Property Type'
                            className=" w-100"
                            onChange={(e) => setPropertyType(e)}
                            value={basicDetails.propertyType}
                        >
                            <MenuItem value="" disabled>Select</MenuItem>
                            {propertyTypeList?.length > 0
                                ? propertyTypeList?.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))
                                : null}
                        </TextField>
                    </Col>
                    {basicDetails.propertyType === 'Residential' ?
                        <Col lg='4'>
                            <TextField
                                select
                                error={error.propertySubType}
                                disabled={saveBasicDetailsFlag === true ? true : false}
                                label='Type of your Residential Property'
                                className=" w-100 mt-3"
                                onChange={(e) => {
                                    setBasicDetails((prevBasicDetails) => ({
                                        ...prevBasicDetails,
                                        propertySubType: e.target.value,
                                    }));
                                    if(e.target.value !== 'PG/Co-Living') {
                                        setBasicDetails((prevBasicDetails) => ({
                                            ...prevBasicDetails,
                                            guestHouseOrPgPropertyType: '', occupancySharing: ''
                                        }));
                                    }
                                }}
                                value={basicDetails.propertySubType}
                            >
                                <MenuItem value="" disabled>Select</MenuItem>
                                {propertySubTypeList?.length > 0
                                    ? propertySubTypeList?.map((subType) => (
                                        <MenuItem key={subType} value={subType}>
                                            {subType}
                                        </MenuItem>
                                    ))
                                    : null}
                            </TextField>
                        </Col>
                        : null}
                    {basicDetails.propertySubType === 'PG/Co-Living' ?
                        <>

                            <Col lg='4'>
                                <TextField
                                    select
                                    error={error.guestHouseOrPgPropertyType}
                                    label='PG In'
                                    className=" w-100 mt-3"
                                    inputProps={{ min: 0 }}
                                    onChange={(e) => {
                                        setBasicDetails((prevBasicDetails) => ({
                                            ...prevBasicDetails,
                                            guestHouseOrPgPropertyType: e.target.value,
                                        }));
                                    }}
                                    value={basicDetails.guestHouseOrPgPropertyType}
                                >
                                    <MenuItem value="" disabled>Select</MenuItem>
                                    {PGInList?.length > 0
                                        ? PGInList?.map((subType) => (
                                            <MenuItem key={subType} value={subType}>
                                                {subType}
                                            </MenuItem>
                                        ))
                                        : null}
                                </TextField>
                            </Col>
                            <Col lg='4'>
                                <TextField
                                    select
                                    error={error.occupancySharing}
                                    label='Occupancy Sharing'
                                    className=" w-100 mt-3"
                                    inputProps={{ min: 0 }}
                                    onChange={(e) => {
                                        setBasicDetails((prevBasicDetails) => ({
                                            ...prevBasicDetails,
                                            occupancySharing: e.target.value,
                                        }));
                                    }}
                                    value={basicDetails.occupancySharing}
                                >
                                    <MenuItem value="" disabled>Select</MenuItem>
                                    {PGSharingList?.length > 0
                                        ? PGSharingList?.map((subType) => (
                                            <MenuItem key={subType} value={subType}>
                                                {subType}
                                            </MenuItem>
                                        ))
                                        : null}
                                </TextField>
                            </Col>
                        </>
                        : null}
                    {basicDetails.stageOfProperty === 'Under Construction' ?
                        <>
                            <Col lg='1'>
                                <Text className='mt-3' fontWeight={'700'} text={'Expected Possession'} style={{ fontSize: '14px' }} />
                            </Col>
                            <Col lg='2'>
                                <TextField
                                    select
                                    error={error.expectedPossessionDate && selectedYear === ''}
                                    label='Year'
                                    className="w-100 mt-3"
                                    onChange={(e) => {
                                        console.log(e)
                                        setSelectedYear(e.target.value)
                                    }}
                                    value={selectedYear}
                                >
                                    {yearList?.map((subType) => (
                                        <MenuItem key={subType} value={subType}>
                                            {subType}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Col>
                            <Col lg='2'>
                                <TextField
                                    select
                                    error={error.expectedPossessionDate && selectedMonth === ''}
                                    label='Month'
                                    className="w-100 mt-3"
                                    onChange={(e) => {
                                        console.log(e)
                                        setSelectedMonth(e.target.value)
                                    }}
                                    value={selectedMonth}
                                >
                                    <MenuItem value="" disabled>Select</MenuItem>
                                    {monthList?.length > 0
                                        ? monthList?.map((subType, index) => (
                                            <MenuItem key={subType} value={(index + 1).toString()}>
                                                {subType}
                                            </MenuItem>
                                        ))
                                        : null}
                                </TextField>
                            </Col>
                        </>
                        : null}
                    {basicDetails.stageOfProperty === 'Ready' ?
                        <Col lg='4'>
                            <TextField
                                error={error.ageOfProperty}
                                label='Age of Property'
                                className=" w-100 mt-3"
                                type="number"
                                inputProps={{ min: 0 }}
                                onInput={(e) => {
                                    setBasicDetails((prevBasicDetails) => ({
                                        ...basicDetails,
                                        ageOfProperty: Number(e.target.value),
                                    }));
                                }}
                                defaultValue={basicDetails.ageOfProperty}
                            >
                            </TextField>
                        </Col>
                        : null}
                </Row>
            </div>
            {saveBasicDetailsFlag === false ?
                <div className="d-flex">
                    <Buttons className='p-2 px-4' name='Confirm' onClick={() => { saveBasicDetails(); }}></Buttons> &nbsp; &nbsp;
                    <Buttons className='p-2 px-4' name='Cancel' ></Buttons>
                </div>
                :
                null}
        </>
    )
}

const mapStateToProps = ({ basicDetailFields }) => ({
    basicDetailFields
});

const actions = {

}

export default compose(connect(mapStateToProps, actions))(BasicDetails);