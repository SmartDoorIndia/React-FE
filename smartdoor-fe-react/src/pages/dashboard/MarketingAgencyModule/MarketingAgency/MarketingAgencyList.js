import React, { useEffect, useState } from "react";
import { Card, Col, Form, Modal, Row } from "react-bootstrap";
import { compose } from "redux"
import { getAllAgencies, getAllCityWithId } from "../../../../common/redux/actions";
import { connect, useDispatch, useSelector } from "react-redux";
import './MarketingAgencyList.scss';
import Buttons from "../../../../shared/Buttons/Buttons";
import SearchInput from "../../../../shared/Inputs/SearchInput/SearchInput";
import Text from "../../../../shared/Text/Text";
import { ToolTip, handleStatusElement, showErrorToast } from "../../../../common/helpers/Utils";
import Pagination from "../../../../shared/DataTable/Pagination";
import { TableLoader } from "../../../../common/helpers/Loader";
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import { Link } from "react-router-dom";
import { TextField, Tooltip } from "@mui/material";
import rightArrow from "../../../../assets/images/arrow-right.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Image from "../../../../shared/Image/Image";
import contentIcon from '../../../../assets/images/content-ico.svg';
import * as Actions from '../../../../common/redux/types';

const MarketingAgency = (props) => {
    const { getAllCityWithId, allCitiesWithId, getAllAgencies, agencyList } = props;
    const agencylist = useSelector(state => state?.agencyList?.data?.agencylist);
    const [p_city, setp_City] = useState('');
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [defaultSort, setDefaultSort] = useState(false);
    const [defaultSortId, setDefaultSortId] = useState('agencyName');
    const [defaultSortFieldId, setDefaultSortFieldId] = useState(() => {
        if (defaultSortId === 'agencyName') {
            return 1
        }
        else if (defaultSortId === 'contactName') {
            return 3
        }
        else {
            return 4
        }
    });
    const [totalMonthSpent, setTotalMonthSpend] = useState(0);
    const [totalProperies, setTotalProperies] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalFreeCoupons, setTotalFreeCoupons] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);
    const history = useHistory();
    const dispatch = useDispatch();

    const agencyColumns = [
        {
            name: 'Agency Name',
            selector: ((row) => row.agencyName),
            sortable: false,
            center: false,
            minWidth: '250px',
            cell: ({ agencyName }) => (
                <span>
                    <Text size="Small" color="secondryColor elipsis-text" text={agencyName} />
                </span>
            ),
            // style:{padding:'0px'},
            id: 1
        },
        {
            name: 'Location',
            selector: ((row) => row.agencyLocation),
            sortable: false,
            center: true,
            minWidth: '350px',
            cell: ({ agencyLocation }) => (
                <span>
                    <Text size="Small" color="secondryColor elipsis-text" text={agencyLocation} />
                </span>
            ),
            id: 2
        },
        {
            name: 'Contact Name',
            selector: ((row) => row.contactName),
            sortable: false,
            center: true,
            cell: ({ contactName }) => (
                <span>
                    <Text size="Small" color="secondryColor elipsis-text" text={contactName === null ? '-' : contactName} />
                </span>
            ),
            id: 3
        },
        {
            name: 'Number',
            selector: ((row) => row.contactNumber),
            sortable: false,
            center: true,
            cell: ({ contactNumber }) => (
                <span>
                    <Text size="Small" color="secondryColor elipsis-text" text={contactNumber} />
                </span>
            ),
            id: 4
        },
        {
            name: 'Spent (Current | Previous)',
            selector: ((row) => row.totalCustomerSpendCurrentMonth),
            sortable: true,
            center: true,
            cell: ({ totalCustomerSpendCurrentMonth, totalMonthlySpentPreviousMonth }) => (
                totalCustomerSpendCurrentMonth !== null || totalMonthlySpentPreviousMonth !== null ? (
                    <span className="d-flex mt-3">
                        <ToolTip position="top" style={{ width: '100%' }} name={totalCustomerSpendCurrentMonth}>
                            <Text size="Small" color="secondryColor elipsis-text" text={totalCustomerSpendCurrentMonth} />
                        </ToolTip> &nbsp;&nbsp;&nbsp;
                        <Text text={' | '} style={{ fontSize: '14px', color: '#B4B4B4' }} /> &nbsp;&nbsp;&nbsp;
                        <ToolTip position="top" style={{ width: '100%' }} name={totalMonthlySpentPreviousMonth}>
                            <Text size="Small" color="secondryColor elipsis-text" text={totalMonthlySpentPreviousMonth} />
                        </ToolTip>
                    </span>
                ) : (
                    <Text text={' - '} style={{ fontSize: '14px', color: '#B4B4B4' }} />
                )
            ),
            id: 5
        },
        {
            name: 'Status',
            selector: ((row) => row.status),
            sortable: false,
            center: true,
            cell: ({ status }) => <span>{status !== null ? <>
                {handleStatusElement(status === false ? 'ACTIVE' : 'INACTIVE')}
            </> : '-'}
            </span>,
            id: 6
        },
        {
            name: 'Actions',
            sortable: false,
            center: true,
            cell: ({ row, agencyId }) => (
                <div className="action">
                    <Tooltip position="left" name="View Details">
                        <span>
                            <Link
                                to={{
                                    pathname: "/admin/marketingAgency/agencyDetails",
                                    state: { agencyId: agencyId },
                                }}
                            >
                                <Image name="editIcon" src={contentIcon} />
                            </Link>
                        </span>
                    </Tooltip>
                </div>
            ),
        },
    ];

    const [transferCustModalShow, setTransferCustModalShow] = useState(false);

    const setDashBoardValues = () => {
        let monthSpend = 0;
        let totalSpend = 0;
        let customerSpent = 0;
        let propertyCount = 0;
        agencylist?.forEach(item => {
            if (item.totalCustomerSpendCurrentMonth !== null) {
                monthSpend = monthSpend + item.totalCustomerSpendCurrentMonth
            }
            if (item.postingCount !== null) {
                propertyCount = propertyCount + item.postingCount
            }
            if (item.customerCount !== null) {
                customerSpent = customerSpent + item.customerCount;
            }
            if (item.totalCustomerSpendTillNow !== null) {
                totalSpend = totalSpend + item.totalCustomerSpendTillNow;
            }
        });
        setTotalMonthSpend(prevState => monthSpend.toFixed(1));
        setTotalSpent(prevState => totalSpend.toFixed(1));
        setTotalCustomers(prevState => customerSpent);
        setTotalProperies(prevState => propertyCount);
    }

    useEffect(async () => {
        getAllCityWithId({ smartdoorServiceStatus: null, stateId: null });
        await getAllAgencies({ agencyId: 0 });
        await setDashBoardValues();
        dispatch({ type: Actions.AGENCY_PROPERTY_LIST_SUCCESS, data: {} })
        dispatch({ type: Actions.AGENCY_CUSTOMER_LIST_SUCCESS, data: {} })
    }, [getAllAgencies, agencylist?.length]);

    const PaginationActionButton = () => (
        <div className="d-flex justify-content-center tableBottom">
        </div>
    );

    const validateDates = () => {
        if ((fromDate === null && toDate === null) || (fromDate === '' && toDate === '')) {
            return true;
        } else if (fromDate !== null && toDate !== null && fromDate !== '' && toDate !== '') {
            if (new Date(fromDate) > new Date(toDate)) {
                showErrorToast("Start date should be less than end date");
                return false;
            } else {
                return true;
            }
        } else {
            showErrorToast("Please enter start date and end date or set both empty");
            return false;
        }
    }
    const ProgressComponent = <TableLoader />;
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const recordSize = (agencyList?.data?.agencylist?.length);
    let recordsPerPage = 0
    recordsPerPage = rowsPerPage;

    const handlePageChange = (newPage) => {
        setCurrentPage(Number(newPage));
        if (!validateDates()) {
            return null;
        }

    };

    const handleRowsPerPageChange = async (newRowsPerPage) => {
        if (!validateDates()) {
            return null;
        }
        recordsPerPage = Number(newRowsPerPage)
        setRowsPerPage(Number(newRowsPerPage))

    };

    let PaginationComponent = ({ onChangePage, onChangeRowsPerPage, ...props }) => (
        <Pagination {...props}
            rowCount={recordSize}
            rowsPerPage={recordsPerPage}
            onChangeRowsPerPage={handleRowsPerPageChange}
            currentPage={currentPage}
            onChangePage={handlePageChange}
            paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
            PaginationActionButton={PaginationActionButton} />
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <SearchInput
                onFilter={(e) => {setFilterText(e.target.value); console.log(e)}}
                onChange={(e) => setFilterText(e.target.value)}
                onClear={() => handleClear}
                filterText={filterText}
                placeholder="Search agency name"
            />
        );
    }, [filterText, resetPaginationToggle]);

    let filteredItems = [];
    const showData = () => {
        console.log(filterText)
        filteredItems = [];
        filteredItems = agencyList?.data?.agencylist;
        filteredItems = agencyList?.data?.agencylist?.filter((item) => {
            return item?.agencyLocation?.toString().includes(p_city) &&
                item?.agencyName?.toLowerCase().includes(filterText.toLowerCase());
        });
        return filteredItems;
        // return agencyList?.data?.agencylist;
    };

    return (
        <>
            <div className='d-flex mt-2'>
                <Card className="p-3 px-4">
                    <Row>
                        <Col lg='6' className="mt-2">
                            <Text size="xSmall" fontWeight="smbold" color="black" text="Total Spent (month)" />
                        </Col>
                        <Col lg='6' className="p-0">
                            <Text fontWeight="300" color="#BE1452" text={totalMonthSpent} style={{ fontSize: '25px', color: '#BE1452' }} />
                        </Col>
                    </Row>
                </Card> &nbsp;&nbsp;&nbsp;
                <Card className="p-3 px-4">
                    <div className="d-flex ">
                        <Text className='mt-2 w-60' size="xSmall" fontWeight="smbold" color="black" text="Total properties posted" style={{ wordBreak: 'break-word' }} />
                        <Text className='w-50 text-center' fontWeight="300" color="#BE1452" text={agencyList?.data?.propertyCurrentMonth} style={{ fontSize: '25px', color: '#BE1452' }} />
                    </div>
                </Card> &nbsp;&nbsp;&nbsp;
                <Card className="p-3 px-4">
                    <div className="d-flex">
                        <Text className='w-50 mt-2' size="xSmall" fontWeight="smbold" color="black" text="Total customers" />
                        <Text className='w-50 text-center' fontWeight="300" color="#BE1452" text={agencyList?.data?.customerCurrentMonth} style={{ fontSize: '25px', color: '#BE1452' }} />
                    </div>
                </Card> &nbsp;&nbsp;&nbsp;
                <Card className="p-3 px-4">
                    <Row>
                        <Col lg='6' className="mt-2">
                            <Text size="xSmall" fontWeight="smbold" color="black" text="Free Coupons" />
                        </Col>
                        <Col lg='6' className="p-0">
                            <Text fontWeight="300" color="#BE1452" text={agencyList?.data?.freeCoins} style={{ fontSize: '25px', color: '#BE1452' }} />
                        </Col>
                    </Row>
                </Card> &nbsp;&nbsp;&nbsp;
                <Card className="p-3 px-4">
                    <Row>
                        <Col lg='6' className="mt-2">
                            <Text size="xSmall" fontWeight="smbold" color="black" text="Total Spend" />
                        </Col>
                        <Col lg='6' className="p-0">
                            <Text fontWeight="300" color="#BE1452" text={totalSpent} style={{ fontSize: '25px', color: '#BE1452' }} />
                        </Col>
                    </Row>
                </Card>
            </div>
            <div className="tableBox">
                <div className="align-items-center tableHeading">
                    <div className="locationSelect d-flex">
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Control
                                as="select"
                                onChange={(e) => {
                                    setp_City(e.target.value);
                                    //call here to filtered list 
                                }}
                                value={p_city}
                            >
                                <option value="">All Cities</option>
                                {allCitiesWithId?.data?.length > 0
                                    ? allCitiesWithId?.data?.map((city) => (
                                        <option key={city.cityId} value={city.cityName}>
                                            {city.cityName}
                                        </option>
                                    ))
                                    : null}
                            </Form.Control>
                        </Form.Group> &nbsp;&nbsp;
                        <div className="d-flex col-8 justify-content-end">
                            <Buttons
                                name='Add New Agency'
                                varient="primary"
                                size="xSmall"
                                color="white"
                                onClick={() => { history.push('/admin/marketingAgency/addAgency', { addNew: true }) }} ></Buttons>
                            {subHeaderComponentMemo} &nbsp;&nbsp;
                            {/* <Buttons
                                name='Search'
                                varient="primary"
                                size="xSmall"
                                color="white"
                                onClick={() => { showData(); }} ></Buttons> */}
                        </div>
                    </div>

                </div>

                <div className="agencyTable">
                    <DataTableComponent
                        data={showData()}
                        columns={agencyColumns}
                        progressComponent={ProgressComponent}
                        // paginationComponent={PaginationComponent}
                        // paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                        // paginationPerPage={recordsPerPage}
                        // currentPage={currentPage}
                        // onChangePage={handlePageChange}
                        // onChangeRowsPerPage={handleRowsPerPageChange}
                        // perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                        filterText={filterText}
                        // paginationServer={true}
                        subHeaderComponent={subHeaderComponentMemo}
                        persistTableHead
                        filterComponent={subHeaderComponentMemo}
                        // onSort={handleSortedData}
                        defaultSort={defaultSort}
                        defaultSortId={defaultSortId}
                        defaultSortFieldId={defaultSortFieldId}
                    />
                </div>
            </div>
            <Modal size="lg" show={transferCustModalShow} onHide={() => { setTransferCustModalShow(false) }} centered>
                <Modal.Body className="p-4">
                    <Text size="medium" fontWeight="smbold" color="black" text="Transfer Customers" />
                    <Text fontWeight="500" text="Select agencies you want to transfer in between"
                        style={{ fontSize: '16px', color: '#8E878A' }} />
                    <div className="d-flex mt-3 w-100">
                        <div className="col-5" style={{ padding: '0%' }}>
                            <TextField
                                className="w-100"
                                type="select"
                                label={'From Agency'}
                            />
                            <Text
                                text={'Customers'}
                                fontWeight='bold'
                                style={{ fontSize: '16px' }}
                            />
                        </div>
                        <img className="mb-4 col-1" src={rightArrow}></img>
                        <div className="col-5" style={{ padding: '0%' }}>
                            <TextField
                                className="w-100"
                                type="select"
                                label={'To Agency'}
                            />
                            <Text
                                text={'Customers'}
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
                                type="select"
                                label={'Executive Name'}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3 px-5">
                        <Buttons className='p-2 px-4' name='Cancel' varient='secondary' size='large' onClick={() => { setTransferCustModalShow(false) }}></Buttons> &nbsp;&nbsp;
                        <Buttons className='p-2 px-4' name='Transfer' varient='primary' size='large'></Buttons>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

const mapStateToProps = ({ allCitiesWithId, agencyList }) => ({
    allCitiesWithId, agencyList
});

const actions = {
    getAllCityWithId,
    getAllAgencies
}

const withConnect = connect(mapStateToProps, actions);

export default connect(mapStateToProps, actions)(MarketingAgency);