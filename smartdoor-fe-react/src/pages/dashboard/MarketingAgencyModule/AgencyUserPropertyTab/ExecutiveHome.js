import { compose } from "redux"
import Text from "../../../../shared/Text/Text";
import { TextField } from "@mui/material";
import Image from "../../../../shared/Image";
import searchIcon from '../../../../assets/images/search-icon.svg'
import Buttons from "../../../../shared/Buttons/Buttons";
import { useState } from "react";
import AgencyCustomers from "../AgencyCustomers/AgencyCustomers";
import AgencyProperty from "../AgencyProperties/AgencyProperty";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getLocalStorage, showErrorToast } from "../../../../common/helpers/Utils";
import { checkExistingCustomers } from "../../../../common/redux/actions";

const ExecutiveHome = (props) => {

    const [showPropertyFlag, setShowPropertyFlag] = useState(true);
    const [showCustomersFlag, setShowCustomersFlag] = useState(false);
    const [customerDetails, setCustomerDetails] = useState({
        useId: null,
        mobile: '',
        name: '',
        email: '',
        propertyCount: null
    });
    const history = useHistory();
    const userData = getLocalStorage('authData');

    const handlePhoneChange = (e) => {
        const inputValue = e.target.value;
        const result = inputValue.replace(/\D/g, '');
        const mobileNum = (result.slice(0, 10));
        if (mobileNum.length === 10) {
            console.log("mob->", result);
            setCustomerDetails({ ...customerDetails, mobile: mobileNum });
            checkExistingCustomer({ mobile: result });
        }else {
            setCustomerDetails({ ...customerDetails, mobile: null });
        }
    }

    const checkExistingCustomer = async (e) => {
        // console.log(e);
        // setCustomerDetails(prevCustomerDetails => ({ ...prevCustomerDetails, name: e.target.value }));
        console.log("cust deatails->",e)
        const response = await checkExistingCustomers(e);
        console.log(response)
        setCustomerDetails(prevCustomerDetails => ({
            ...prevCustomerDetails, userId: response.data.resourceData.userId,
            propertyCount: response.data.resourceData.propertyCount
        }));
    }

    const redirectToPosting = () => {
        if (customerDetails.mobile === null && customerDetails.name === null) {
            showErrorToast("Mobile number and name is mandatory...");
            return null;
        }
        else {
            history.push('/admin/executive/properties/NewPost', { customerDetails: customerDetails })
        }
    }
    return (
        <>
            <div className="locationSelect whiteBg">
                <Text
                    text={'Add new Builder, Broker or Customer for search and Post'}
                    fontWeight={'bold'}
                    style={{ fontSize: '18px' }} />
                <div className="row mt-2">
                    <div className="col-4 justify-content-start">
                        <TextField
                            className="w-90"
                            label={'Search Mobile Number'}
                            type="number"
                            inputProps={{ min: 0, max: 9999999999 }}
                            InputProps={{
                                startAdornment: (
                                    <>
                                        <Image src={searchIcon} className='mt-3' />
                                        <Text className='ml-2 mr-2' text={'+91'} style={{ fontSize: '16px', color: '#949494' }} fontWeight={'500'} />
                                    </>
                                )
                            }}
                            onChange={(e) => {console.log("e->",e.target.value); handlePhoneChange(e); }}
                            value={customerDetails.mobile}
                        />
                    </div>
                    <div className="col-4 justify-content-start">
                        <TextField
                            className="w-90"
                            label={'Full Name'}
                            type="text"
                            onChange={(e) => {setCustomerDetails(prevCustomerDetails => ({ ...prevCustomerDetails, name: e.target.value }))}}
                            value={customerDetails.name}
                        />
                    </div>
                    <div className="col-4 justify-content-start">
                        <TextField
                            className="w-90"
                            label={'Email'}
                            type="text"
                            onChange={(e) => { setCustomerDetails(prevCustomerDetails => ({ ...prevCustomerDetails, email: e.target.value })) }}
                            value={customerDetails.email}
                        />
                    </div>
                </div>
                <div className="d-flex mt-3">
                    <Buttons className='p-2' name='Add New Post' onClick={() => { redirectToPosting(); }} /> &nbsp;&nbsp;
                    {customerDetails.useId !== null ?
                        <>
                            <span className="d-flex">
                                <Text
                                    text={customerDetails.name}
                                    fontweight='bold'
                                    style={{ fontSize: '14px' }}
                                    className='mt-2 ml-2' /> &nbsp;
                                <Text
                                    text={' is an existing customer with'}
                                    fontweight={'600'}
                                    style={{ fontSize: '14px' }}
                                    className='mt-2 ml-2' /> &nbsp;
                                <Text
                                    text={customerDetails.propertyCount}
                                    fontweight='bold'
                                    style={{ fontSize: '14px' }}
                                    className='mt-2 ml-2' />
                                <Text
                                    text={' Postings   '}
                                    fontweight={'600'}
                                    style={{ fontSize: '14px' }}
                                    className='mt-2 ml-2' />
                            </span>
                        </>
                        : null}
                </div>
            </div>
            <div className="d-flex">
                <Buttons
                    color={showPropertyFlag ? '#252525' : '#BCBCBC'}
                    name='Properties'
                    style={{ color: showPropertyFlag ? '#252525' : '#BCBCBC', backgroundColor: 'unset', borderBottomColor: '#BE1452', borderBottomWidth: showPropertyFlag ? 'thick' : '0', fontWeight: 'bolder' }}
                    onClick={() => { setShowPropertyFlag(true); setShowCustomersFlag(false) }} ></Buttons>
                <Buttons
                    color={showCustomersFlag ? '#252525' : '#BCBCBC'}
                    name='Customers'
                    style={{ color: showCustomersFlag ? '#252525' : '#BCBCBC', backgroundColor: 'unset', borderBottomColor: '#BE1452', borderBottomWidth: showCustomersFlag ? 'thick' : '0', fontWeight: 'bolder' }}
                    onClick={() => { setShowCustomersFlag(true); setShowPropertyFlag(false) }}></Buttons>
            </div>
            <div className="whiteBg">
                {showPropertyFlag ?
                    <>
                        <Text
                            text='Properties Posted By You'
                            fontWeight='bold'
                            style={{ fontSize: '16px' }}
                        ></Text>
                        <AgencyProperty agencyId={userData.agencyId} executiveId = {userData.userid} customerId={0} ></AgencyProperty>
                    </>
                    : null}
                {showCustomersFlag ?
                    <>
                        <Text
                            text='Customers List'
                            fontWeight='bold'
                            style={{ fontSize: '16px' }}
                        ></Text>
                        <AgencyCustomers></AgencyCustomers>
                    </>
                    : null}
            </div>
        </>
    );
}

export default compose(ExecutiveHome);
