import { useCallback, useEffect, useState } from "react";
import { compose } from "redux";
import Text from "../../../../shared/Text/Text";
import { Col, Modal, Row } from "react-bootstrap";
import Buttons from "../../../../shared/Buttons/Buttons";
import { Button, TextField, MenuItem } from "@mui/material";
import rightArrow from "../../../../assets/images/arrow-right.svg";
import AgencyProperty from '../AgencyProperties/AgencyProperty';
import AgencyCustomers from "../AgencyCustomers/AgencyCustomers";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getAgencyById, getAllAgencies, getAllAgencyExecutives, transferCustomers } from "../../../../common/redux/actions";
import { connect } from "react-redux";

const AgencyDetail = (props) => {
    const { getAllAgencies, agencyList, getAllAgencyExecutives, AgencyExecutiveList } = props;
    const agencyId = props.location.state ? props.location.state.agencyId : 0;
    const [agencyDetails, setAgencyDetails] = useState({});
    const [transferCustModalShow, setTransferCustModalShow] = useState(false);
    const [deactivateAgencyModalShow, setdeactivateAgencyModalShow] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [showPropertyFlag, setShowPropertyFlag] = useState(true);
    const [showCustomersFlag, setShowCustomersFlag] = useState(false);
    const [destAgencyId, setDestAgencyId] = useState('');
    const [destAgencyName, setDestAgencyName] = useState('');
    const [destAgencyExecutive, setDestAgencyExecutive] = useState('');
    const [destAgencyCustomers, setDestAgencyCustomers] = useState(null);
    const history = useHistory();

    const _getAgencyById = useCallback(async () => {
        await getAgencyById({ agencyId: agencyId })
            .then((response) => {
                // console.log(response.data.resourceData?.agencyList[0])
                if (response.data.resourceData?.agencylist?.length > 0) {
                    setAgencyDetails(response.data.resourceData?.agencylist[0])
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    useEffect(() => {
        _getAgencyById();
        getAllAgencies({ agencyId: 0 });
    }, [_getAgencyById]);

    const onAgencyChange = async (e) => {
        // console.log(e);
        setDestAgencyId(e.target.value);
        let agency = agencyList?.data?.agencylist?.find(item => item.agencyId === e.target.value)
        setDestAgencyCustomers(agency.customerCount);
        setDestAgencyName(agency.agencyName)
        await getAllAgencyExecutives({ agencyId: e.target.value, executiveId: null });
    }

    const transferAgency = async () => {
        console.log(destAgencyName)
        console.log(destAgencyExecutive)
        let data = {
            existingAgencyId: agencyId,
            newAgencyId: destAgencyId,
            existingExecutiveId: null,
            newExecutiveId: destAgencyExecutive,
            deactivateAgency: false,
            deleteExecutive: false,
            propTransfer: false,
            customerTransfer: true
        }
        const response = await transferCustomers(data);
        if (response.status === 200) {
            console.log(response);
            _getAgencyById();
            setShowCustomersFlag(true);
            setShowPropertyFlag(false);
        }
    };

    const deactivateAgency = async () => {
        let data = {
            existingAgencyId: agencyId,
            newAgencyId: agencyDetails.customerCount !== null ? destAgencyId : 0,
            existingExecutiveId: null,
            newExecutiveId: agencyDetails.customerCount !== null ? destAgencyExecutive: 0,
            deactivateAgency: true,
            deleteExecutive: false,
            propTransfer: false,
            customerTransfer: true
        }
        const response = await transferCustomers(data);
        if (response.status === 200) {
            console.log(response);
            _getAgencyById();
            setShowCustomersFlag(true);
            setShowPropertyFlag(false);
            setdeactivateAgencyModalShow(false);
        }
    };

    return (
        <>
            <div className="whiteBg" style={{ marginBottom: '0%' }}>
                <div className="d-flex">
                    <div className="col-10">
                        <Row className="d-flex">
                            <Col lg='4'>
                                <Text text={'Agency Name'} fontWeight={'500'} style={{ color: '#949494', fontSize: '12px' }} />
                                <Text text={agencyDetails?.agencyName} fontWeight={'500'} style={{ fontSize: '14px' }} />
                            </Col>
                            <Col lg='3'>
                                <Text text={'Total Spent'} fontWeight={'500'} style={{ color: '#949494', fontSize: '12px' }} />
                                <Text text={agencyDetails?.totalCustomerSpendTillNow} fontWieight={'500'} style={{ fontSize: '14px' }} />
                            </Col>
                            <Col lg='3'>
                                <Text text={'Location'} fontWeight={'500'} style={{ color: '#949494', fontSize: '12px' }} />
                                <Text text={agencyDetails?.agencyLocation} fontWieight={'500'} style={{ fontSize: '14px' }} />
                            </Col>
                        </Row>
                        <Row className="d-flex mt-3">
                            <Col lg='4'>
                                <Text text={'Contact Name'} fontWeight={'500'} style={{ color: '#949494', fontSize: '12px' }} />
                                <Text text={agencyDetails?.contactName} fontWeight={'500'} style={{ fontSize: '14px' }} />
                            </Col>
                            <Col lg='3'>
                                <Text text={'Phone'} fontWeight={'500'} style={{ color: '#949494', fontSize: '12px' }} />
                                <Text text={agencyDetails?.contactNumber} fontWeight={'500'} style={{ fontSize: '14px' }} />
                            </Col>
                            <Col lg='3'>
                                <Text text={'Email'} fontWeight={'500'} style={{ color: '#949494', fontSize: '12px' }} />
                                <Text text={agencyDetails?.contactEmail} fontWeight={'500'} style={{ fontSize: '14px' }} />
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Button variant='outlined' className='mb-2 w-90 text-capitalize' style={{ color: '#BE1452', borderColor: '#BE1452' }} onClick={() => { history.push('/admin/marketingAgency/agencyDetails/edit-agency', { agencyDetails: agencyDetails, addNew: false }) }}>Edit</Button>
                        {agencyDetails.status === false ?
                        <>
                            <Button variant='primary' className='mb-2 w-90 text-capitalize' style={{ color: 'white', backgroundColor: '#BE1452' }} onClick={() => { setdeactivateAgencyModalShow(true) }}>Deactivate</Button>
                        </>
                            :
                            <>
                            <Button variant='primary' className='mb-2 w-90 text-capitalize' style={{ color: 'white', backgroundColor: '#BE1452' }} onClick={() => {  }}>Reactivate</Button>
                            </>
                        }
                        <Button variant='outlined' className='w-90 text-capitalize' style={{ color: '#BE1452', borderColor: '#BE1452', cursor: agencyDetails.customerCount === null || agencyDetails.customerCount === 0 ? 'not-allowed' : 'pointer' }} onClick={() => { if (agencyDetails.customerCount !== null) { setTransferCustModalShow(true) } }}>Transfer</Button>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end p-0" >
                <Text text={'Total Customers: '} fontWeight='bold' style={{ fontSize: '14px' }} />
                <Text text={(agencyDetails?.customerCount === null ? '0' : agencyDetails?.customerCount)} fontWeight={'bold'} style={{ fontSize: '14px' }} />
                <div className="col-1"></div>
                <Text text={'Total Postings: '} fontWeight={'bold'} style={{ fontSize: '14px' }} />
                <Text text={(agencyDetails?.postingCount === null ? '0' : agencyDetails?.postingCount)} fontWeight={'bold'} style={{ fontSize: '14px' }} />
                <div className="col-1"></div>
                <Text text={'Total Customer Spend(Month): '} fontWeight={'bold'} style={{ fontSize: '14px' }} />
                <Text text={'Rs' + (agencyDetails?.totalCustomerSpendCurrentMonth === null ? '0' : agencyDetails?.totalCustomerSpendCurrentMonth)} fontWeight={'bold'} style={{ fontSize: '14px' }} />
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
                        <AgencyProperty agencyId={agencyId} executiveId={0} customerId={0} ></AgencyProperty>
                    </>
                    : null}
                {showCustomersFlag ?
                    <>
                        <Text
                            text='Customers List'
                            fontWeight='bold'
                            style={{ fontSize: '16px' }}
                        ></Text>
                        <AgencyCustomers agencyId={agencyId} userRole={'SUPER ADMIN'} ></AgencyCustomers>
                    </>
                    : null}
            </div>
            <Modal size="lg" show={transferCustModalShow} onHide={() => { setTransferCustModalShow(false) }} centered={true}>
                <Modal.Body className="p-4">
                    <Text size="medium" fontWeight="smbold" color="black" text="Transfer Customers" />
                    <Text fontWeight="500" text="Select agencies you want to transfer in between"
                        style={{ fontSize: '16px', color: '#8E878A' }} />
                    <div className="d-flex mt-3 w-100">
                        <div className="col-5" style={{ padding: '0%' }}>
                            <TextField
                                className="w-100"
                                type="text"
                                disabled
                                defaultValue={agencyDetails.agencyName}
                                label={'From Agency'}
                            />
                            <Text
                                text={(agencyDetails.customerCount === null ? '0' : agencyDetails.customerCount) + ' Customers'}
                                fontWeight='bold'
                                style={{ fontSize: '16px' }}
                            />
                        </div>
                        <img className="mb-4 col-1" src={rightArrow}></img>
                        <div className="col-5" style={{ padding: '0%' }}>
                            <TextField
                                className="w-100"
                                select
                                label={'To Agency'}
                                defaultValue={destAgencyId}
                                onChange={(e) => { onAgencyChange(e); }}
                            >
                                <option value="" disabled> Select </option>
                                {agencyList?.data?.agencylist?.map((option) => (
                                    (agencyDetails.agencyId !== option.agencyId &&
                                        <MenuItem key={option.agencyId} value={option.agencyId}>
                                        {option.agencyName}
                                    </MenuItem>
                                    )
                                ))}
                            </TextField>
                            <Text
                                text={(destAgencyCustomers === null ? '0' : destAgencyCustomers) + 'Customers'}
                                fontWeight='bold'
                                style={{ fontSize: '16px' }}
                            />
                        </div>
                    </div>
                    <div className="d-flex mt-3">
                        <div className="col-6"></div>
                        <div className="col-5" style={{ padding: '0%' }}>
                            <TextField
                                className="w-100"
                                select
                                label={'Executive Name'}
                                defaultValue={destAgencyExecutive}
                                onChange={(e) => { setDestAgencyExecutive(e.target.value) }}
                            >
                                <option value="" disabled> Select </option>
                                {AgencyExecutiveList?.data?.executives?.map((option) => (
                                    <MenuItem key={option.executiveId} value={option.executiveId}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3 px-5">
                        <Buttons className='p-2 px-4' name='Cancel' varient='secondary' size='large' onClick={() => { setTransferCustModalShow(false) }}></Buttons> &nbsp;&nbsp;
                        <Buttons className='p-2 px-4' name='Transfer' varient='primary' size='large' onClick={() => { setTransferCustModalShow(false); setConfirmModal(true) }}></Buttons>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal size="lg" show={deactivateAgencyModalShow} onHide={() => { setdeactivateAgencyModalShow(false) }} centered={true}>
                <Modal.Body className="p-4">
                    <Text size="medium" fontWeight="smbold" color="black" text="Deactivate Marketing Agency" />
                    {agencyDetails.customerCount !== null ?
                        <>
                            <span className="d-flex">
                                <Text fontWeight="500" text="Please select another marketing agency to assign  "
                                    style={{ fontSize: '16px', color: '#8E878A' }} /> &nbsp;&nbsp;
                                <Text fontWeight="bold" text=" Customers"
                                    style={{ fontSize: '16px', color: '#252525' }} />
                            </span>
                            <div className="d-flex mt-3 w-100 p-0">
                                <div className="col-5" style={{ padding: '0%' }}>
                                    <TextField
                                        className="w-100"
                                        select
                                        label={'To Agency'}
                                        defaultValue={destAgencyId}
                                        onChange={(e) => { onAgencyChange(e); }}
                                    >
                                        <option value="" disabled> Select </option>
                                        {agencyList?.data?.agencylist?.map((option) => (
                                            (agencyDetails.agencyId !== option.agencyId &&
                                                <MenuItem key={option.agencyId} value={option.agencyId}>
                                                {option.agencyName}
                                            </MenuItem>
                                            )
                                        ))}
                                    </TextField>
                                    <Text
                                        text={(destAgencyCustomers === null ? '0' : destAgencyCustomers) + 'Customers'}
                                        fontWeight='bold'
                                        style={{ fontSize: '16px' }}
                                    />
                                </div>
                                <div className="col-1"></div>
                                <div className="col-5" style={{ padding: '0%' }}>
                                    <TextField
                                        className="w-100"
                                        select
                                        label={'Executive Name'}
                                        defaultValue={destAgencyExecutive}
                                        onChange={(e) => { setDestAgencyExecutive(e.target.value) }}
                                    >
                                        <option value="" disabled> Select </option>
                                        {AgencyExecutiveList?.data?.executives?.map((option) => (
                                            <MenuItem key={option.executiveId} value={option.executiveId}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>
                        </>
                        : null}
                    <div className="d-flex justify-content-start mt-3">
                        <Buttons className='p-2 px-4' name='Cancel' varient='secondary' size='large' onClick={() => { setdeactivateAgencyModalShow(false) }}></Buttons> &nbsp;&nbsp;
                        <Buttons className='p-2 px-4' name={agencyDetails.status ? 'Transfer and Deactivate' : 'Deactivate'} varient='primary' size='large' onClick={() => { deactivateAgency(); }}></Buttons>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={confirmModal} onHide={() => { setConfirmModal(false) }} centered={true}>
                <Modal.Body className="text-center">
                    <Text
                        text={'Are you sure you want to transfer ' + agencyDetails.agencyName + "  " + agencyDetails.customerCount + ' customers to ' + destAgencyName + ' ?'}
                        fontWeight='bold'
                        style={{ fontSize: '23px' }}
                    />
                    <div className="d-flex justify-content-center mt-3">
                        <Buttons className='p-2 px-4' name='Cancel' varient='secondary' size='large' onClick={() => { setConfirmModal(false) }}></Buttons> &nbsp;&nbsp;
                        <Buttons className='p-2 px-4' name='Yes' varient='primary' size='large' onClick={() => { transferAgency(); setConfirmModal(false) }}></Buttons>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

const mapStateToProps = ({ agencyList, AgencyExecutiveList }) => ({
    agencyList, AgencyExecutiveList
});

const actions = {
    getAllAgencies,
    getAllAgencyExecutives
}

export default compose(connect(mapStateToProps, actions))(AgencyDetail);