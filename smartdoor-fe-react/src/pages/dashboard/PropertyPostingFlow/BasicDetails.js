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
import { getLocalStorage, showErrorToast, showSuccessToast } from "../../../common/helpers/Utils";
import Loader from '../../../common/helpers/Loader';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BasicDetails = (props) => {
    const { basicDetailFields, saveBasicDetailsFields, customerDetails, editPropertyFlag } = props;
    const propertyPostTypeList = POSTING_CONSTANTS.propertyPostType;
    const propertyStageList = POSTING_CONSTANTS.propertyStage;
    const propertyTypeList = POSTING_CONSTANTS.propertyType;
    let propertySubTypeList = POSTING_CONSTANTS.propertySubType;
    const PGInList = ["Apartment", "Independent House / Bungalow", "Builder Floor"];
    const PGSharingList = ['Single', 'Double', 'Triple'];
    const [yearList, setYearList] = useState([]);
    const monthList = CONSTANTS_STATUS.monthList;
    const propertyId = props?.propertyId;
    const [miscellaneousDetails, setmiscellaneousDetails] = useState(props.miscellaneousDetails);
    const [basicDetails, setBasicDetails] = useState(Object.keys(basicDetailFields.data).length !== 0 ? basicDetailFields.data : {
        propertyCategory: "",
        propertyType: "",
        stageOfProperty: "",
        propertySubType: "",
        ageOfProperty: 0,
        guestHouseOrPgPropertyType: "",
        expectedPossessionDate: "",
        occupancySharing: 0,
        loanAccountNumber: ''
    });
    const [selectedYear, setSelectedYear] = useState(basicDetails.expectedPossessionDate?.split('-')[1] || '');
    const [selectedMonth, setSelectedMonth] = useState(Number(basicDetails.expectedPossessionDate?.split('-')[0]) || '');
    const [saveBasicDetailsFlag, setSaveBasicDetailsFlag] = useState(false);
    const [error, setError] = useState({});
    const [imageLoader, setImageLoader] = useState(false)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        console.log(editPropertyFlag)
        let currentYear = new Date().getFullYear();
        let yearlist = []
        yearlist.push((currentYear.toString()));
        for (let i = 1; i <= 9; i++) {
            yearlist.push((currentYear + i).toString());
        }
        setYearList(yearlist);
    }, []);

    const setPropertyCategory = async (e) => {
        setBasicDetails((prevBasicDetails) => ({
            ...prevBasicDetails,
            propertyCategory: e.target.value
        }));

        if (e.target.value === 'Renting') {
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
            // expectedPossessionDate : e.target.value === 'Ready' ? '' : basicDetails.expectedPossessionDate
        }));
    }

    const setPropertyType = (e) => {
        setBasicDetails((prevBasicDetails) => ({
            ...prevBasicDetails,
            propertyType: e.target.value,
        }));

    }

    const saveBasicDetails = async () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        if (selectedYear === currentYear.toString()) {
            if (selectedMonth < currentMonth.toString()) {
                showErrorToast('Please select appropriate possession date...');
                setError({})
                return null;
            }
        }

        const valid = await validateBasicDetails(basicDetails);
        setError(valid.errors);
        if (valid.isValid) {
            let userId = getLocalStorage('authData');
            const data = {
                ...(propertyId && { smartdoorPropertyId: propertyId }),
                miscellaneousDetails: editPropertyFlag === true ? miscellaneousDetails : {
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
                    status: "",
                    postedByName: userId.name,
                    postedByMobile: userId.mobile,
                    postedByProfileImageUrl: '',
                    ownerName: '',
                    ownerMobileNumber: '',
                    isPostingForOthers: true
                },
                basicDetails: basicDetails
            }
            setLoading(true)
            const response = await addBasicDetails(data);
            if (response.status === 200) {
                setLoading(false)
                dispatch({ type: Actions.BASIC_DETAILS_SUCCESS, data: basicDetails })
                setSaveBasicDetailsFlag(true)
                saveBasicDetailsFields({ propertyId: response?.data?.resourceData?.propertyId, saveFlag: true })
            }
            setLoading(false)
            // if (!editPropertyFlag) {
            // }
        }
    }

    const notifyBasicDetails = async () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        if (selectedYear === currentYear.toString()) {
            if (selectedMonth < currentMonth.toString()) {
                showErrorToast('Please select appropriate possession date...');
                setError({})
                return null;
            }
        }

        const valid = await validateBasicDetails(basicDetails);
        setError(valid.errors);
        if (valid.isValid) {
            let userId = getLocalStorage('authData');
            const data = {
                miscellaneousDetails: {
                    postedById: userId.userid,
                    lastPageOfInfoFilled: 0,
                    draft: true,
                    partial: true,
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
                    status: "",
                    postedByName: userId.name,
                    postedByMobile: userId.mobile,
                    postedByProfileImageUrl: '',
                    ownerName: customerDetails.ownerName,
                    ownerMobileNumber: customerDetails.ownerMobileNumber,
                    isPostingForOthers: true,
                    notifyCustomer: true
                },
                basicDetails: basicDetails
            }
            setLoading(true)
            const response = await addBasicDetails(data);
            if (response.status === 200) {
                setLoading(false)
                dispatch({ type: Actions.BASIC_DETAILS_SUCCESS, data: basicDetails })
                setSaveBasicDetailsFlag(true)
                showSuccessToast('Property Posted successfully');
                saveBasicDetailsFields({ propertyId: response?.data?.resourceData?.propertyId, saveFlag: true })
                history.goBack();
            }
            setLoading(false)
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
                            disabled={saveBasicDetailsFlag === true || editPropertyFlag ? true : false}
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
                            disabled={basicDetails.propertyCategory === 'Renting' || saveBasicDetailsFlag === true || editPropertyFlag === true}
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
                            disabled={saveBasicDetailsFlag === true || editPropertyFlag ? true : false}
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
                                disabled={saveBasicDetailsFlag === true || editPropertyFlag ? true : false}
                                label='Type of your Residential Property'
                                className=" w-100 mt-3"
                                onChange={(e) => {
                                    setBasicDetails((prevBasicDetails) => ({
                                        ...prevBasicDetails,
                                        propertySubType: e.target.value,
                                    }));
                                    if (e.target.value !== 'PG/Co-living' || e.target.value !== 'PG/Co-Living') {
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
                                    ? propertySubTypeList?.filter(subType => {
                                        if (basicDetails.propertyCategory === 'Renting') {
                                            return subType !== 'Plot'; // Exclude 'PG/Co-living' for Renting category
                                        } else if (basicDetails.propertyCategory === 'Selling') {
                                            if (basicDetails.stageOfProperty === 'Ready') {
                                                return subType !== 'PG/Co-living' || subType !== 'PG/Co-lLiving'; // Exclude 'Plot' and 'PG/Co-living' for Selling category with stage 'Ready'
                                            } else if (basicDetails.stageOfProperty === 'Under Construction') {
                                                return subType !== 'PG/Co-living' || subType !== 'PG/Co-lLiving'; // Exclude 'Plot' for Selling category with stage 'Under Construction'
                                            }
                                        }
                                        return true; // Include all other property subtypes
                                    }).map((subType) => (
                                        <MenuItem key={subType} value={subType}>
                                            {subType}
                                        </MenuItem>
                                    ))
                                    : null}
                            </TextField>
                        </Col>
                        : null}
                    {basicDetails.propertySubType === 'PG/Co-living' || basicDetails.propertySubType === 'PG/Co-Living' ?
                        <>

                            <Col lg='4'>
                                <TextField
                                    select
                                    error={error.guestHouseOrPgPropertyType}
                                    label='PG In'
                                    disabled={saveBasicDetailsFlag === true ? true : false}
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
                                    disabled={saveBasicDetailsFlag === true ? true : false}
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
                                        ? PGSharingList?.map((subType, index) => (
                                            <MenuItem key={subType} value={Number(index + 1)}>
                                                {subType}
                                            </MenuItem>
                                        ))
                                        : null}
                                </TextField>
                            </Col>
                        </>
                        : null}
                    {basicDetails.stageOfProperty === 'Under Construction' && basicDetails.propertySubType !== 'Plot' ?
                        <>
                            <Col lg='1'>
                                <Text className='mt-3' fontWeight={'700'} text={'Expected Possession'} style={{ fontSize: '14px' }} />
                            </Col>
                            <Col lg='2'>
                                <TextField
                                    select
                                    error={error.expectedPossessionDate && selectedYear === ''}
                                    disabled={saveBasicDetailsFlag === true ? true : false}
                                    label='Year'
                                    className="w-100 mt-3"
                                    onChange={(e) => {
                                        setSelectedYear(e.target.value)
                                        setBasicDetails((prevBasicDetails) => ({
                                            ...prevBasicDetails, expectedPossessionDate: selectedMonth + '-' + e.target.value
                                        }))
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
                                    disabled={saveBasicDetailsFlag === true ? true : false}
                                    label='Month'
                                    className="w-100 mt-3"
                                    onChange={(e) => {
                                        setSelectedMonth(e.target.value)
                                        setBasicDetails((prevBasicDetails) => ({
                                            ...prevBasicDetails, expectedPossessionDate: e.target.value + '-' + selectedYear
                                        }))
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
                    {basicDetails.stageOfProperty === 'Ready' && basicDetails.propertySubType !== 'Plot' ?
                        <Col lg='4'>
                            <TextField
                                error={error.ageOfProperty}
                                disabled={saveBasicDetailsFlag === true ? true : false}
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
                    <Col lg='4'>
                        <TextField
                            // error={error.ageOfProperty}
                            label='Loan Acc. Number'
                            disabled={saveBasicDetailsFlag === true? true : false}
                            className=" w-100 mt-3"
                            type="text"
                            onInput={(e) => {
                                setBasicDetails((prevBasicDetails) => ({
                                    ...basicDetails,
                                    loanAccountNumber: e.target.value,
                                }));
                            }}
                            defaultValue={basicDetails.loanAccountNumber}
                        >
                        </TextField>
                    </Col>
                </Row>
            </div>
            {saveBasicDetailsFlag === false ?
                <>
                    {loading ? <Loader />
                        :
                        <div className="d-flex">
                            {!editPropertyFlag ?
                                <>
                                    <Buttons className='p-2 px-4' name={editPropertyFlag ? 'Save' : 'Notify Customer'} onClick={() => { notifyBasicDetails(); }}></Buttons> &nbsp; &nbsp;
                                </>
                                : null}
                            <Buttons className='p-2 px-4' name='Next' onClick={() => { saveBasicDetails(); }}></Buttons> &nbsp; &nbsp;
                            {/* <Buttons className='p-2 px-4' name='Cancel' ></Buttons> */}
                        </div>
                    }
                </>
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