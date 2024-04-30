import { Button, Col, Modal, Row } from "react-bootstrap";
import { compose } from "redux"
import Text from "../../../../shared/Text/Text";
import Buttons from "../../../../shared/Buttons/Buttons";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AgencyProperty from '../AgencyProperties/AgencyProperty';
import AgencyCustomers from "../AgencyCustomers/AgencyCustomers";
import { TextField, MenuItem } from "@mui/material";
import { getAgencyExecutiveById, getAllAgencyExecutives, transferCustomers } from "../../../../common/redux/actions";
import { connect } from "react-redux";
import { getLocalStorage, showSuccessToast } from "../../../../common/helpers/Utils";

const ExecutiveDetails = (props) => {
    const { getAllAgencyExecutives, AgencyExecutiveList } = props;
    const agencyId = props.location.state ? props.location.state.agencyId : 5;
    const executiveId = props.location.state ? props.location.state.executiveId : 0;
    const [showPropertyFlag, setShowPropertyFlag] = useState(true);
    const [showCustomersFlag, setShowCustomersFlag] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [executiveDetails, setExecutiveDetails] = useState({});
    const [destAgencyExecutive, setDestAgencyExecutive] = useState(null);
    const history = useHistory();
    const userData = getLocalStorage('authData');

    const _getAgencyById = useCallback(async () => {
        await getAgencyExecutiveById({ agencyId: agencyId, executiveId: executiveId, pageNo: null, pageSize: null, searchStr: '' })
            .then((response) => {
                if (response.data.resourceData?.length > 0) {
                    setExecutiveDetails(response.data.resourceData[0])
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    useEffect(() => {
        _getAgencyById();
        console.log(executiveId)
        // getAllAgencyExecutives({
        //     agencyId: agencyId, executiveId: 0, pageNo: 1, pageSize: 1000, searchStr: ""
        // });
    }, [_getAgencyById]);

    const deleteExecutive = async () => {
        let data = {
            existingAgencyId: agencyId,
            newAgencyId: null,
            existingExecutiveId: executiveId,
            newExecutiveId: executiveDetails.customerCount !== null ? destAgencyExecutive : 0,
            deactivateAgency: false,
            deleteExecutive: true,
            propTransfer: executiveDetails.customerCount !== null ? true : false,
            customerTransfer: true,
            reactivateAgency: false
        }
        const response = await transferCustomers(data);
        if (response.status === 200) {
            console.log(response);
            showSuccessToast("Executive deleted successfully");
            history.goBack();
            setShowCustomersFlag(true);
            setShowPropertyFlag(false);
            setShowDeleteModal(false);
        }
    }

    return (
        <>
            <div className="whiteBg" style={{ marginBottom: '0%' }}>
                <div className="d-flex">
                    <div className="col-10">
                        <Row>
                            <Col lg='2'>
                                <Text text={'Contact Name'} fontWeight={'500'} style={{ color: '#949494', fontSize: '12px' }} />
                                <Text text={executiveDetails.name} fontWeight={'500'} style={{ fontSize: '14px' }} />
                            </Col>
                            <Col lg='2'>
                                <Text text={'Location'} fontWeight={'500'} style={{ color: '#949494', fontSize: '12px' }} />
                                <Text text={executiveDetails.location} fontWieight={'500'} style={{ fontSize: '14px' }} />
                            </Col>
                            <Col lg='2'>
                                <Text text={'Phone'} fontWeight={'500'} style={{ color: '#949494', fontSize: '12px' }} />
                                <Text text={executiveDetails.mobile} fontWeight={'500'} style={{ fontSize: '14px' }} />
                            </Col>
                            <Col lg='3'>
                                <Text text={'Email'} fontWeight={'500'} style={{ color: '#949494', fontSize: '12px' }} />
                                <Text text={executiveDetails.email} fontWeight={'500'} style={{ fontSize: '14px' }} />
                            </Col>
                            <Col lg='3'>
                                <Text text={'Customer Spent(month)'} fontWeight={'500'} style={{ color: '#949494', fontSize: '12px' }} />
                                <Text text={executiveDetails.totalCustomerSpendCurrentMonth} fontWieight={'500'} style={{ fontSize: '14px' }} />
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <div className="d-flex justify-content-start mt-2">
                            <Button variant='outlined' className='py-0 text-capitalize' style={{ color: '#BE1452', borderColor: '#BE1452' }} onClick={() => { history.push('/admin/executives/executive-details/edit-executive', { executiveDetails: executiveDetails, agencyId: agencyId, addNew: false }) }}>Edit</Button>&nbsp;&nbsp;
                            <Button variant='primary' className='text-capitalize' style={{ color: 'white', backgroundColor: '#BE1452' }} onClick={() => { setShowDeleteModal(true) }}>Delete</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex mt-2 ">
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
                        <AgencyProperty agencyId={agencyId} executiveId={executiveId} userRole={'MARKETING_ADMIN'} customerId={0} ></AgencyProperty>
                    </>
                    : null}
                {showCustomersFlag ?
                    <>
                        <Text
                            text='Customers List'
                            fontWeight='bold'
                            style={{ fontSize: '16px' }}
                        ></Text>
                        <AgencyCustomers agencyId={agencyId} executiveId={executiveId} userRole={'MARKETING_ADMIN'} ></AgencyCustomers>
                    </>
                    : null}
            </div>
            <Modal size="lg" show={showDeleteModal} onHide={() => { setShowDeleteModal(false) }} centered={true}>
                <Modal.Body className="p-4">
                    <Text size="medium" fontWeight="smbold" color="black" text="Delete Executive" />
                    {executiveDetails.customerCount !== null ?
                        <>
                            <span className="d-flex">
                                <Text fontWeight="500" text="Are you sure you want to delete ? "
                                    style={{ fontSize: '16px', color: '#8E878A' }} /> &nbsp;&nbsp;
                            </span>
                            <span className="d-flex mt-3">
                                <Text fontWeight="500" text="Please select another executive to assign  "
                                    style={{ fontSize: '16px', color: '#8E878A' }} /> &nbsp;&nbsp;
                                <Text fontWeight="bold" text={executiveDetails.customerCount + " Customers "}
                                    style={{ fontSize: '16px', color: '#252525' }} /> &nbsp;
                                <Text fontWeight="500" text={" and "}
                                    style={{ fontSize: '16px', color: '#252525' }} /> &nbsp;
                                <Text fontWeight="bold" text={executiveDetails.propertyCount + " Properties "}
                                    style={{ fontSize: '16px', color: '#252525' }} />
                            </span>
                            <div className="d-flex mt-3 w-100 p-0">
                                <div className="col-5" style={{ padding: '0%' }}>
                                    <TextField
                                        className="w-100 px-0"
                                        select
                                        label={'Executive Name'}
                                        defaultValue={destAgencyExecutive}
                                        onChange={(e) => { setDestAgencyExecutive(e.target.value) }}
                                    >
                                        <option value="" disabled> Select </option>
                                        {AgencyExecutiveList.data.executives?.map((option) => (
                                            (executiveDetails.executiveId !== option.executiveId &&
                                                <MenuItem key={option.executiveId} value={option.executiveId}>
                                                    {option.name}
                                                </MenuItem>
                                            )
                                        ))}
                                    </TextField>
                                </div>
                            </div>
                        </>
                        : null}
                    <div className="d-flex justify-content-start mt-3">
                        <Buttons className='p-2 px-4' name='Cancel' varient='secondary' size='large' onClick={() => { setShowDeleteModal(false) }}></Buttons> &nbsp;&nbsp;
                        {executiveDetails.customerCount !== null ?
                            <>
                                <Buttons className='p-2 px-4' name='Transfer and Delete' varient='primary' size='large' onClick={() => { deleteExecutive() }}></Buttons>
                            </> :
                            <>
                                <Buttons className='p-2 px-4' name='Delete' varient='primary' size='large' onClick={() => { deleteExecutive() }}></Buttons>
                            </>}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

const mapStateToProps = ({ AgencyExecutiveList }) => ({
    AgencyExecutiveList
});

const actions = {
    getAllAgencyExecutives
};

export default compose(connect(mapStateToProps, actions))(ExecutiveDetails);