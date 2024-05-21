import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { compose } from "redux"
import PostingFields from "../../../common/helpers/PostingFields";
import { connect, useDispatch } from "react-redux";
import { Checkbox, MenuItem, Slider, TextField } from "@mui/material";
import POSTING_CONSTANTS from "../../../common/helpers/POSTING_CONSTANTS";
import Text from "../../../shared/Text/Text";
import { dateWithFormate, formateDate, formateDateTime, getLocalStorage, showErrorToast } from '../../../common/helpers/Utils';
import Buttons from "../../../shared/Buttons/Buttons";
import { validatePricing } from "../../../common/validations";
import * as Actions from '../../../common/redux/types';
import { addBasicDetails } from "../../../common/redux/actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Pricing = (props) => {

    const { basicDetailFields, addressDetailFields, pricingDetailFields, specDetailFields, savePricingDetailsFields, editPropertyFlag, customerDetails } = props;
    const [pricingList, setPricingList] = useState([]);
    const [pricingObject, setPricingObject] = useState({});
    const [preferredForList, setPreferredForList] = useState([]);
    const currentDate = new Date().toISOString().split('T')[0];
    const [miscellaneousDetails, setmiscellaneousDetails] = useState(props.miscellaneousDetails);
    const [pricingDetails, setPricingDetails] = useState(Object.keys(pricingDetailFields.data).length !== 0 ?
        pricingDetailFields.data : {
            propertyRate: null,
            maintenanceCharge: null,
            securityAmount: null,
            expectedDiscountInPercent: 30,
            expectedTimeToSellThePropertyWithin: '',
            isQuickSale: false,
            isOpenToBuyersOnFractionalOwnershipBasis: false,
            additionalFieldsForChargesDue: [],
            preferredFor: [],
            leaseType: ''
        });
    const [additionalFieldsList, setAdditionalFieldsList] = useState(pricingDetails.additionalFieldsForChargesDue || []);
    const [error, setError] = useState({});
    const [savePricingFlag, setSavePricingFlag] = useState(false);
    const propertyId = props?.propertyId;
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (Object.keys(basicDetailFields.data).length !== 0) {
            let pricingObj = {};
            let fields = basicDetailFields.data;
            let category = '';
            if (fields.propertyCategory === 'Lease') {
                category = 'Renting'
            } else if (fields.propertyCategory === 'Sale') {
                category = 'Selling'
            } else {
                category = fields.propertyCategory
            }
            if (fields.propertyType === 'Residential') {
                if (fields.propertySubType === 'PG/Co-Living') {
                    pricingObj = PostingFields.postingFieldsObject[category][fields.stageOfProperty === null ? 'Ready' : fields.stageOfProperty][fields.propertyType]["Pg"][fields.guestHouseOrPgPropertyType]?.Pricing
                } else {
                    pricingObj = PostingFields.postingFieldsObject[category][fields.stageOfProperty === null ? 'Ready' : fields.stageOfProperty][fields.propertyType][fields.propertySubType]?.Pricing
                    console.log(PostingFields.postingFieldsObject[category][fields.stageOfProperty === null ? 'Ready' : fields.stageOfProperty][fields.propertyType][fields.propertySubType]?.Pricing)
                }
            } else if (fields.propertyType === 'Commercial') {
                pricingObj = PostingFields.postingFieldsObject[category][fields.stageOfProperty === null ? 'Ready' : fields.stageOfProperty][fields.propertyType]?.Pricing
            }
            console.log(fields)
            console.log(pricingObj)
            console.log(pricingDetails)
            setPricingList(Object?.keys(pricingObj));
            setPricingObject(pricingObj);
            if ((Object.keys(pricingObj)).includes('Preferred for')) {
                setPreferredForList(Object.values(pricingObj['Preferred for']));
            }
            if ((Object.keys(pricingObj)).includes('Expected time')) {
                if(pricingDetails?.expectedTimeToSellThePropertyWithin !== null) {
                    if (pricingDetails?.expectedTimeToSellThePropertyWithin?.toString()?.length !== 0) {
                        // pricingDetails.expectedTimeToSellThePropertyWithin
                        const dateString = pricingDetails.expectedTimeToSellThePropertyWithin;
    
                        // Split the date string by '-'
                        const parts = dateString?.split('-');
    
                        // Create a new Date object using the parts (year, month, day)
                        const dateObject = new Date(parts[2], parts[1] - 1, parts[0]);
    
                        // Extract year, month, and day from the Date object
                        const year = dateObject.getFullYear();
                        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so we add 1
                        const day = String(dateObject.getDate()).padStart(2, '0');
    
                        // Format the date to 'YYYY-MM-DD' format
                        const formattedDate = `${year}-${month}-${day}`;
                        setPricingDetails(prevPricingDetails => ({ ...prevPricingDetails, expectedTimeToSellThePropertyWithin: formattedDate }));
                    }
                }
            }
        }
    }, []);

    const addNewFields = () => {
        if (pricingDetails.additionalFieldsForChargesDue.length < 3) {
            let additionalList = [...pricingDetails.additionalFieldsForChargesDue];
            additionalList.push({ label: '', charge: 0.0 });
            setAdditionalFieldsList([...additionalList]);
            setPricingDetails(prevPricingDetials => ({ ...prevPricingDetials, additionalFieldsForChargesDue: additionalList }))
        }
        else {
            showErrorToast('Only upto 3 additional fields should be added...')
            return null;
        }
    }

    const removeDues = (index) => {
        console.log(index)
        console.log(pricingDetails.additionalFieldsForChargesDue[index])
        let additionalList = [...pricingDetails.additionalFieldsForChargesDue];
        additionalList.splice(index, 1);
        setAdditionalFieldsList([...additionalList]);
        // setPricingDetails(prevPricingDetials => ({ ...prevPricingDetials, additionalFieldsForChargesDue: [...additionalList] }))
        setPricingDetails(prevPricingDetials => {
            const updatedPricingDetails = { ...prevPricingDetials, additionalFieldsForChargesDue: additionalList };
            console.log(updatedPricingDetails); // Log the updated state
            return updatedPricingDetails;
        });
    }

    const savePricingDetails = async () => {
        let valid = {}
        valid = validatePricing(pricingDetails, pricingList);
        setError(valid.errors);
        console.log(valid)
        let pricingDetail = pricingDetails;
        if (valid.isValid) {
            if (pricingList.includes('Expected time')) {

                // const dateString = pricingDetails.expectedTimeToSellThePropertyWithin ;

                // // Create a new Date object using the date string
                // const dateObject = new Date(dateString);

                // // Extract day, month, and year from the Date object
                // const day = String(dateObject.getDate()).padStart(2, '0');
                // const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so we add 1
                // const year = dateObject.getFullYear();

                // // Format the date to 'dd-mm-yyyy' format
                // const formattedDate = `${day}-${month}-${year}`;
                // pricingDetail.expectedTimeToSellThePropertyWithin = formattedDate;
                // setPricingDetails(prevPricingDetails => ({ ...prevPricingDetails, expectedTimeToSellThePropertyWithin: formattedDate }));
            }
            dispatch({ type: Actions.PRICING_DETAILS_SUCCESS, data: pricingDetail })
            setSavePricingFlag(true);
            savePricingDetailsFields({ saveFlag: true })
            if(editPropertyFlag) {
                notifyPricingDetails(true)
            }
        }
    }

    const notifyPricingDetails = async (loadNext) => {
        let valid = {}
        valid = validatePricing(pricingDetails, pricingList);
        setError(valid.errors);
        console.log(valid)
        if (valid.isValid) {
            let pricingDetail = pricingDetails;
            if (pricingList.includes('Expected time') && pricingDetail.isQuickSale === true) {
                const dateString = pricingDetails.expectedTimeToSellThePropertyWithin;

                // Create a new Date object using the date string
                const dateObject = new Date(dateString);

                // Extract day, month, and year from the Date object
                const day = String(dateObject.getDate()).padStart(2, '0');
                const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so we add 1
                const year = dateObject.getFullYear();

                // Format the date to 'dd-mm-yyyy' format
                const formattedDate = `${day}-${month}-${year}`;
                pricingDetail.expectedTimeToSellThePropertyWithin = formattedDate;
                setPricingDetails(prevPricingDetails => ({ ...prevPricingDetails, expectedTimeToSellThePropertyWithin: formattedDate }));
            }
            let userId = getLocalStorage('authData');
            const data = {
                ...(propertyId && { smartdoorPropertyId: propertyId }),
                miscellaneousDetails: editPropertyFlag === true ? miscellaneousDetails :{
                    postedById: userId.userid,
                    lastPageOfInfoFilled: 3,
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
                    ownerName: customerDetails?.name,
                    ownerMobileNumber: customerDetails?.mobile,
                    isPostingForOthers: true,
                    notifyCustomer: true
                },
                basicDetails: basicDetailFields?.data,
                address: addressDetailFields?.data,
                specs: specDetailFields?.data,
                pricing: pricingDetail
            }
            console.log(userId)
            // setLoading(true)
            const response = await addBasicDetails(data);
            console.log(response?.data?.resourceData?.propertyId)
            if (response.status === 200) {
                // setLoading(false)
                dispatch({ type: Actions.PRICING_DETAILS_SUCCESS, data: pricingDetails })
                setSavePricingFlag(true)
                savePricingDetailsFields({ propertyId: response?.data?.resourceData?.propertyId, saveFlag: true })
                if(!loadNext) {
                    history.goBack();
                }
            }
        }
    }

    return (
        <>
            <div className="whiteBg mb-1">
                <Row>
                    {pricingList.includes('Rent') ?
                        <Col lg='4'>
                            <TextField
                                error={error.propertyRate}
                                className="w-100 mb-2"
                                type="number"
                                label={'Rent (Monthly)'}
                                inputProps={{ min: 5000 }}
                                onChange={(e) => { setPricingDetails(prevPricingDetials => ({ ...prevPricingDetials, propertyRate: Number(e.target.value) })) }}
                                value={pricingDetails.propertyRate}
                            />
                        </Col>
                        : null}
                    {pricingList.includes('Maintenance') ?
                        <Col lg='4'>
                            <TextField
                                className="w-100 mb-2"
                                type="number"
                                label={'Maintenance Charges (Monthly)'}
                                inputProps={{ min: 0 }}
                                onChange={(e) => { setPricingDetails(prevPricingDetials => ({ ...prevPricingDetials, maintenanceCharge: Number(e.target.value) })) }}
                                value={pricingDetails.maintenanceCharge}
                            />
                        </Col>
                        : null}
                    {pricingList.includes('Security deposit') ?
                        <Col lg='4'>
                            <TextField
                                error={error.securityAmount}
                                className="w-100 mb-2"
                                type="number"
                                label={'Security Deposit'}
                                inputProps={{ min: 0 }}
                                onChange={(e) => { setPricingDetails(prevPricingDetials => ({ ...prevPricingDetials, securityAmount: Number(e.target.value) })) }}
                                value={pricingDetails.securityAmount}
                            />
                        </Col>
                        : null}
                    {pricingList.includes('Preferred for') ?
                        <Col lg='4'>
                            <TextField
                                className="w-100 mb-2"
                                select
                                multiple
                                SelectProps={{
                                    multiple: true
                                }}
                                error={error.preferredFor}
                                label={'Preferred For'}
                                inputProps={{ min: 0 }}
                                onChange={(e) => { setPricingDetails(prevPricingDetials => ({ ...prevPricingDetials, preferredFor: (e.target.value) })) }}
                                value={pricingDetails.preferredFor}
                            >
                                {preferredForList.map((item) => (
                                    <MenuItem key={item} value={item}>{item}</MenuItem>
                                ))}
                            </TextField>
                        </Col>
                        : null}
                    {pricingList.includes('Type of lease') ?
                        <Col lg='4'>
                            <TextField
                                className="w-100 mb-2"
                                select
                                label={'Type of lease'}
                                inputProps={{ min: 0 }}
                                onChange={(e) => { setPricingDetails(prevPricingDetials => ({ ...prevPricingDetials, leaseType: (e.target.value) })) }}
                                value={pricingDetails.leaseType}
                            >
                                {POSTING_CONSTANTS.leaseType.map((item) => (
                                    <MenuItem key={item} value={item}>{item}</MenuItem>
                                ))}
                            </TextField>
                        </Col>
                        : null}
                    {pricingList.includes('Selling price') ?
                        <Col lg='4'>
                            <TextField
                                className="w-100 mb-2"
                                type="number"
                                error={error.propertyRate}
                                label={'Selling Price'}
                                inputProps={{ min: 1000000 }}
                                onChange={(e) => { setPricingDetails(prevPricingDetials => ({ ...prevPricingDetials, propertyRate: Number(e.target.value) })) }}
                                value={pricingDetails.propertyRate}
                            />
                        </Col>
                        : null}

                    {pricingList.includes('Distress CheckBox') ?
                        <>
                            <Col lg='4' className="d-flex">
                                <Checkbox onChange={(e) => { console.log(e); setPricingDetails(prevPricingDetials => ({ ...prevPricingDetials, isQuickSale: (e.target.checked) })) }}
                                    checked={pricingDetails.isQuickSale} className="p-1 mt-0" style={{ scale: '1', color: '#BE1452' }}></Checkbox>
                                <Text text={'Do you want to additionally  publish in Distress property section '}
                                    fontWeight={'500'} style={{ fontSize: '13px' }} />
                            </Col>
                            {pricingList.includes('discount %') && pricingDetails.isQuickSale === true ?
                                <Col className="p-0" lg='4'>
                                    <span className="d-flex">
                                        <Text className='ml-3' text={'Expected Discount : ' + pricingDetails.expectedDiscountInPercent + '%'} fontWeight='bold' style={{ fontSize: '16px' }} />
                                    </span>
                                    <Slider defaultValue={pricingDetails.expectedDiscountInPercent}
                                        className="ml-0 mr-4"
                                        valueLabelDisplay="auto"
                                        min={10}
                                        max={70}
                                        onChange={(e) => { setPricingDetails(prevPricingDetials => ({ ...prevPricingDetials, expectedDiscountInPercent: Number(e.target.value) })) }}
                                        style={{ color: "#BE142" }}
                                    />
                                </Col>
                                : null}
                            {pricingList.includes('Expected time') && pricingDetails.isQuickSale === true ?
                                <Col lg='4'>
                                    <TextField
                                        className="w-100"
                                        type="date"
                                        error={error.expectedTimeToSellThePropertyWithin}
                                        inputProps={{ min: currentDate }}
                                        // label={'Expected time within which you want to sell the property '}
                                        onChange={(e) => {
                                            setPricingDetails(prevPricingDetails => ({ ...prevPricingDetails, expectedTimeToSellThePropertyWithin: e.target.value }));
                                        }}
                                        value={pricingDetails.expectedTimeToSellThePropertyWithin}
                                    />
                                    <Text text={'Expected time within which you want to sell the property'} />
                                </Col>
                                : null}
                        </>
                        : null}
                    {pricingList.includes('Fractional Ownership checkbox') ?
                        <Col lg='4' className="d-flex">
                            <Checkbox onChange={(e) => { console.log(e); setPricingDetails(prevPricingDetials => ({ ...prevPricingDetials, isOpenToBuyersOnFractionalOwnershipBasis: (e.target.checked) })) }}
                                checked={pricingDetails.isOpenToBuyersOnFractionalOwnershipBasis} className="p-1 mt-0" style={{ scale: '1', color: '#BE1452' }}></Checkbox>
                            <Text text={'Open to Buyers on Fractional Ownership basis? '}
                                fontWeight={'500'} style={{ fontSize: '13px' }} />
                        </Col>
                        : null}
                </Row>
                {pricingList.includes('Add additional fields') ?
                    <>
                        <Col lg='4'>
                            <Buttons disabled={savePricingFlag} name={'>>Add Additional Field to mention other Dues '} fontWeight={'700'}
                                style={{ fontSize: '14px', color: '#BE1452' }} onClick={() => { addNewFields() }} />
                        </Col>

                        {pricingDetails.additionalFieldsForChargesDue.length > 0 ?
                            pricingDetails.additionalFieldsForChargesDue.map((fields, index) => (
                                <>
                                    <div key={index} className="d-flex mt-3">

                                        <Col lg='3' className="d-flex">
                                            <TextField
                                                className="w-100 mb-2"
                                                type="text"
                                                error={error.additionalFieldsForChargesDue && error.additionalFieldsForChargesDue[index]?.label}
                                                label={'Label'}
                                                onChange={async(e) => {
                                                    await setAdditionalFieldsList((prevAdditionalFieldsList) => {

                                                        let newList = [...prevAdditionalFieldsList];
                                                        newList[index] = { ...newList[index], label: e.target.value };
                                                        setPricingDetails(prevPricingDetials => ({ ...prevPricingDetials, additionalFieldsForChargesDue: [...newList] }));
                                                        return [...newList];
                                                    });
                                                    console.log(pricingDetails.additionalFieldsForChargesDue)
                                                }}
                                                value={fields.label}
                                            />
                                        </Col>
                                        <Col lg='3' className="d-flex">
                                            <TextField
                                                className="w-100 mb-2"
                                                type="number"
                                                label={'Dues'}
                                                error={error.additionalFieldsForChargesDue && error.additionalFieldsForChargesDue[index]?.charge}
                                                onChange={(e) => {
                                                    setAdditionalFieldsList(prevAdditionalFieldsList => {
                                                        let newList = [...prevAdditionalFieldsList];
                                                        newList[index] = { ...newList[index], charge: e.target.value };
                                                        setPricingDetails(prevPricingDetials => ({ ...prevPricingDetials, additionalFieldsForChargesDue: [...newList] }));
                                                        return [...newList];
                                                    })
                                                }}
                                                value={fields.charge}
                                                inputProps={{ min: 0 }}
                                            />
                                        </Col>
                                        <Col lg='3' className="mt-2">
                                            <Buttons disabled={savePricingFlag} name='Remove' className='p-2' onClick={() => { removeDues(index) }}></Buttons>
                                        </Col>
                                    </div>
                                </>
                            ))
                            : null}
                    </>
                    : null}
            </div>
            {savePricingFlag === false ?
                <div className="d-flex">
                    {!editPropertyFlag ?
                    <>
                        <Buttons className='p-2 px-4' name={editPropertyFlag ? 'Save' : 'Notify Customer'} onClick={() => { notifyPricingDetails(false); }}></Buttons> &nbsp; &nbsp;
                    </>
                    :null}
                    <Buttons className='p-2 px-4' name='Next' onClick={() => { savePricingDetails(); }}></Buttons> &nbsp; &nbsp;
                    {/* <Buttons className='p-2 px-4' name='Cancel' ></Buttons> */}
                </div>
                : null}
        </>
    );
}

const mapStateToProps = ({ basicDetailFields, pricingDetailFields, specDetailFields, addressDetailFields }) => ({
    basicDetailFields, pricingDetailFields, specDetailFields, addressDetailFields
})

const actions = {

}

export default compose(connect(mapStateToProps, actions))(Pricing);