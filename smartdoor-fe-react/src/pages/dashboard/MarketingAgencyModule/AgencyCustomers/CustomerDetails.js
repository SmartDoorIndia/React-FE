import { Button, Col, Modal, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { compose } from "redux"
import Text from "../../../../shared/Text/Text";
import AgencyProperty from '../AgencyProperties/AgencyProperty';
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { awardCoupons } from "../../../../common/redux/actions";
import Buttons from "../../../../shared/Buttons/Buttons";
import { getLocalStorage, showErrorToast, showSuccessToast } from "../../../../common/helpers/Utils";
import { connect, useDispatch } from "react-redux";
import * as Actions from '../../../../common/redux/types';

const CustomerDetails = (props) => {
    const {agencyCustomers} = props;
    const userData = getLocalStorage('authData');
    const [showAwardCouponsModal, setShowAwardCouponsModal] = useState(false);
    const [coupons, setCoupons] = useState(0);
    const [customerDetails, setCustomerDetails] = useState(props?.location?.state?.customerDetails);
    const agencyId = props?.location?.state?.agencyId;
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(props)
    }, []);

    const awardCoupon = async () => {
        if (coupons < 0) {
            showErrorToast("Enter valid coupon amount");
            return null;
        }
        if (coupons > (1000 - customerDetails.giftedCoupens)) {
            showErrorToast('Upto ' + (1000 - customerDetails.giftedCoupens) + ' coupons can be gifted')
            return null;
        }
        const response = await awardCoupons({ consumerId: customerDetails.userId, coins: coupons });
        if (response.status === 200) {
            setShowAwardCouponsModal(false);
            showSuccessToast("Coupons awarded")
            setCustomerDetails(prevCustomerDetails => ({...prevCustomerDetails, giftedCoupens: Number(customerDetails.giftedCoupens) + Number(coupons) }))
            let customerList = [];
            customerList = [...agencyCustomers?.data.customerData ?? []]
            customerList.forEach((element, index) => {
                if (element.userId === Number(customerDetails.userId)) {
                    console.log(element)
                    const updatedElement = { ...element, giftedCoupens: Number(element.giftedCoupens) + Number(coupons) };
                    customerList[index] = updatedElement; // Replace the old element with the updated one
                }
            });
            dispatch({ type: Actions.AGENCY_CUSTOMER_LIST_SUCCESS, data: {customerData: customerList, records: agencyCustomers?.data?.records, currentPage: agencyCustomers?.data?.currentPage, rowsPerPage: agencyCustomers?.data?.rowsPerPage, searchStr: agencyCustomers?.data?.searchStr, kycStatus: agencyCustomers?.data?.kycStatus} });
            setCoupons(null)
        }

    }
    return (
        <>
            <div className="whiteBg" style={{ marginBottom: '0%' }}>
                <div className="d-flex">
                    <div className="col-10">
                        <Row className="d-flex">
                            <Col lg='4'>
                                <Text text={'Customer Name'} fontWeight={'500'} style={{ color: '#949494', fontSize: '12px' }} />
                                <Text text={customerDetails.name} fontWeight={'500'} style={{ fontSize: '14px' }} />
                            </Col>
                            <Col lg='3'>
                                <Text text={'Gifted Coupons'} fontWeight={'500'} style={{ color: '#949494', fontSize: '12px' }} />
                                <Text text={customerDetails.giftedCoupens} fontWieight={'500'} style={{ fontSize: '14px' }} />
                            </Col>
                            <Col lg='3'>
                                <Text text={'Coupon Balance'} fontWeight={'500'} style={{ color: '#949494', fontSize: '12px' }} />
                                <Text text={customerDetails.totalCoinBalance} fontWieight={'500'} style={{ fontSize: '14px' }} />
                            </Col>
                        </Row>
                        <Row className="d-flex mt-3">
                            <Col lg='4'>
                                <Text text={'KYC Status'} fontWeight={'500'} style={{ color: '#949494', fontSize: '12px' }} />
                                <Text text={customerDetails.kycStatus === true ? 'Verified' : 'UnVerified'} fontWeight={'500'} style={{ fontSize: '14px' }} />
                            </Col>
                            <Col lg='3'>
                                <Text text={'Phone'} fontWeight={'500'} style={{ color: '#949494', fontSize: '12px' }} />
                                <Text text={customerDetails.mobile} fontWeight={'500'} style={{ fontSize: '14px' }} />
                            </Col>
                            <Col lg='3'>
                                <Text text={'Email'} fontWeight={'500'} style={{ color: '#949494', fontSize: '12px' }} />
                                <Text text={customerDetails.email} fontWeight={'500'} style={{ fontSize: '14px' }} />
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Button size="sm" variant='outlined' className='mb-2 w-90 text-capitalize' style={{ color: '#BE1452', borderColor: '#BE1452' }} onClick={() => {
                            history.push('/admin/chat-history', {
                                userId: userData?.userid,
                                ownerId: customerDetails.userId,
                                ownerName: customerDetails.name,
                                roleId: 1
                              })
                         }}>Chat</Button>
                        <Button size="sm" variant='primary' className='mb-2 w-90 text-capitalize' style={{ color: 'white', backgroundColor: '#BE1452' }} onClick={() => { setShowAwardCouponsModal(true) }}>Award Coupons</Button>
                    </div>
                </div>
            </div>
            <div className="whiteBg mt-2">
                <Text
                    text="Properties Posted"
                    fontWeight='bold'
                    style={{ fontSize: '20px' }} />
                <AgencyProperty className='mt-0' customerId={customerDetails.userId} agencyId={agencyId}></AgencyProperty>
            </div>
            <Modal dialogClassName="w-50" show={showAwardCouponsModal} onHide={() => { setShowAwardCouponsModal(false) }} centered={true}>
                <Modal.Body className="p-4">
                    <Text size="medium" fontWeight="smbold" color="black" text="Award Coupons" />
                    <span className="d-flex">
                        <Text fontWeight="500" text="Coupons will deduct from your account"
                            style={{ fontSize: '16px', color: '#8E878A' }} />
                    </span>
                    <span className="d-flex">
                        <Text fontWeight="500" text="Your balance: "
                            style={{ fontSize: '16px', color: '#8E878A' }} /> &nbsp;&nbsp;
                        <Text fontWeight="bold" text=" 22000 coupons"
                            style={{ fontSize: '16px', color: '#252525' }} />
                    </span>
                    <div className="mt-3 w-100 p-0">
                        <Text fontWeight="bold" text=" Customer Name"
                            style={{ fontSize: '16px', color: '#252525' }} />
                        <div className="col-6 mt-2" style={{ padding: '0%' }}>
                            <TextField
                                className="w-100 px-0"
                                type='number'
                                inputProps={{ min: 0 }}
                                label={'Coupons'}
                                onInput={(e) => setCoupons(Number(e.target.value))}
                                defaultValue={coupons}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-start mt-3">
                        <Buttons className='p-2 px-4' name='Cancel' varient='secondary' size='large' onClick={() => { setShowAwardCouponsModal(false) }}></Buttons> &nbsp;&nbsp;
                        <Buttons className='p-2 px-4' name='Award' varient='primary' size='large' onClick={() => { awardCoupon(); }}></Buttons>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

const mapStateToProps = ({ agencyCustomers }) => ({
    agencyCustomers
});

const actions = {
    
};

export default compose(connect(mapStateToProps, actions))(CustomerDetails);