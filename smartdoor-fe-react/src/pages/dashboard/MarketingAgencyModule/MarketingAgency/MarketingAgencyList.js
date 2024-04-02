import React, { useEffect, useState } from "react";
import { Card, Col, Form, Modal, Row } from "react-bootstrap";
import { compose } from "redux"
import { getAllCityWithId } from "../../../../common/redux/actions";
import { connect } from "react-redux";
import './MarketingAgencyList.scss';
import Buttons from "../../../../shared/Buttons/Buttons";
import SearchInput from "../../../../shared/Inputs/SearchInput/SearchInput";
import Text from "../../../../shared/Text/Text";
import { ToolTip, handleStatusElement, showErrorToast } from "../../../../common/helpers/Utils";
import Pagination from "../../../../shared/DataTable/Pagination";
import { TableLoader } from "../../../../common/helpers/Loader";
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import rightArrow from "../../../../assets/images/arrow-right.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const MarketingAgency = (props) => {
    const { getAllCityWithId, allCitiesWithId } = props;
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
    const history = useHistory();

    const agencyColumns = [
        {
            name: 'Agency Name',
            selector: ((row) => row.agencyName),
            sortable: true,
            center: false,
            minWidth: '200px',
            cell: ({ agencyName }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={agencyName}>
                    <Text size="Small" color="secondryColor elipsis-text" text={agencyName} />
                </ToolTip>
            ),
            id: 1
        },
        {
            name: 'Location',
            selector: ((row) => row.location),
            sortable: false,
            center: false,
            cell: ({ location }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={location}>
                    <Text size="Small" color="secondryColor elipsis-text" text={location} />
                </ToolTip>
            ),
            id: 2
        },
        {
            name: 'Contact Name',
            selector: ((row) => row.contactName),
            sortable: true,
            center: false,
            cell: ({ contactName }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={contactName}>
                    <Text size="Small" color="secondryColor elipsis-text" text={contactName} />
                </ToolTip>
            ),
            id: 3
        },
        {
            name: 'Number',
            selector: ((row) => row.number),
            sortable: false,
            center: false,
            cell: ({ number }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={number}>
                    <Text size="Small" color="secondryColor elipsis-text" text={number} />
                </ToolTip>
            ),
            id: 4
        },
        {
            name: 'Spent',
            selector: ((row) => row.spent),
            sortable: false,
            center: false,
            cell: ({ spent }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={spent}>
                    <Text size="Small" color="secondryColor elipsis-text" text={spent} />
                </ToolTip>
            ),
            id: 5
        },
        {
            name: 'Status',
            selector: ((row) => row.status),
            sortable: false,
            center: false,
            cell: ({ status }) => <span>{status !== null ? <>
                {handleStatusElement(status)}
            </> : '-'}
            </span>,
            id: 6
        },
        {
            name: 'Actions',
            sortable: false,
            center: false,
            cell: ({ row }) => (
                <div className="action">
                    {/* <ToolTip position="left" name="View Details">
                      <span>
                         <Link
                            to={{
                               pathname: "/admin/property/property-details",
                               state: { propertyId: propertyId, userId: postedById, menuName: 'Properties', isDeleted: false, defaultSort: defaultSort, defaultSortId: defaultSortId},
                            }}
                         >
                            <Image name="editIcon" src={contentIco} />
                         </Link>
                      </span>
                   </ToolTip> */}
                </div>
            ),
        },
    ];

    const [transferCustModalShow, setTransferCustModalShow] = useState(false);

    useEffect(() => {
        getAllCityWithId({ smartdoorServiceStatus: null, stateId: null })
    }, [getAllCityWithId]);

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
    const recordSize = (0);
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
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={() => handleClear}
                filterText={filterText}
                placeholder="Search"
            />
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <>
            <div className="">
                <div className="d-flex">
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                setp_City(e.target.value);
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
                    <Link
                        to={{
                            pathname: "/admin/marketing-Agency/addAgency",
                            state: { module: 'MARKETING' }
                        }}>
                        <Buttons
                            name='Add New Agency'
                            varient="primary"
                            size="xSmall"
                            color="white" ></Buttons>
                    </Link> &nbsp;&nbsp;
                    <Buttons name='Transfer Customers' size='xSmall' varient='secondary' color='black' onClick={() => { setTransferCustModalShow(true) }}></Buttons> &nbsp;&nbsp;
                    {subHeaderComponentMemo} &nbsp;&nbsp;
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                            type="date"
                            max={new Date().toISOString().split("T")[0]}
                            placeholder="From Date"
                            value={fromDate}
                            onChange={(e) => {
                                console.log(e.target.value);
                                const selectedDate = new Date(e.target.value);
                                setFromDate(e.target.value)
                            }}
                        />
                    </Form.Group> &nbsp;&nbsp;&nbsp;&nbsp;
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                            type="date"
                            max={new Date().toISOString().split("T")[0]}
                            placeholder="To Date"
                            value={toDate}
                            onChange={(e) => {
                                console.log(e.target.value);
                                const selectedDate = new Date(e.target.value);
                                setToDate(e.target.value)
                            }}
                        />
                    </Form.Group>
                </div>
                {/* <Link
                        to={{
                            pathname: "/admin/marketing-agency/agency-details",
                            state: { agencyId:'0' }
                        }}>
                    </Link> &nbsp;&nbsp; */}
                        <Buttons
                            name='Agency'
                            varient="primary"
                            size="xSmall"
                            color="white" onClick={()=>{history.push('/admin/marketing-Agency/agencyDetails')}}></Buttons>
                <div className='d-flex mt-2'>
                    <Card className="p-3 px-4">
                        <Row>
                            <Col lg='6' className="mt-2">
                                <Text size="xSmall" fontWeight="smbold" color="black" text="Total Spent" />
                            </Col>
                            <Col lg='6' className="p-0">
                                <Text fontWeight="300" color="#BE1452" text={'101K'} style={{ fontSize: '35px', color: '#BE1452' }} />
                            </Col>
                        </Row>
                    </Card> &nbsp;&nbsp;&nbsp;
                    <Card className="p-3 px-2">
                        <Row>
                            <Col lg='6' className="mt-2">
                                <Text size="xSmall" fontWeight="smbold" color="black" text="Active Agencies" />
                            </Col>
                            <Col lg='6' className="p-0">
                                <Text fontWeight="300" color="#BE1452" text={'101K'} style={{ fontSize: '35px', color: '#BE1452' }} />
                            </Col>
                        </Row>
                    </Card> &nbsp;&nbsp;&nbsp;
                    <Card className="p-3 px-4">
                        <Row>
                            <Col lg='6' className="mt-2">
                                <Text size="xSmall" fontWeight="smbold" color="black" text="Inactive Agencies" />
                            </Col>
                            <Col lg='6' className="p-0">
                                <Text fontWeight="300" color="#BE1452" text={'101K'} style={{ fontSize: '35px', color: '#BE1452' }} />
                            </Col>
                        </Row>
                    </Card> &nbsp;&nbsp;&nbsp;
                    <Card className="p-3 px-4">
                        <Row>
                            <Col lg='6' className="mt-2">
                                <Text size="xSmall" fontWeight="smbold" color="black" text="Free Coupons" />
                            </Col>
                            <Col lg='6' className="p-0">
                                <Text fontWeight="300" color="#BE1452" text={'101K'} style={{ fontSize: '35px', color: '#BE1452' }} />
                            </Col>
                        </Row>
                    </Card> &nbsp;&nbsp;&nbsp;
                    <Card className="p-3 px-2">
                        <Row>
                            <Col lg='6' className="mt-2">
                                <Text size="xSmall" fontWeight="smbold" color="black" text="New Agency Request" />
                            </Col>
                            <Col lg='6' className="p-0">
                                <Text fontWeight="300" color="#BE1452" text={'101K'} style={{ fontSize: '35px', color: '#BE1452' }} />
                            </Col>
                        </Row>
                    </Card>
                </div>
                <div className="mt-3 agencyTable">
                    <DataTableComponent
                        data={[]}
                        columns={agencyColumns}
                        progressComponent={ProgressComponent}
                        paginationComponent={PaginationComponent}
                        paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                        paginationPerPage={recordsPerPage}
                        currentPage={currentPage}
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handleRowsPerPageChange}
                        perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                        filterText={filterText}
                        paginationServer={true}
                        subHeaderComponent={subHeaderComponentMemo}
                        persistTableHead
                        filterComponent={subHeaderComponentMemo}
                        // onSort={handleSortedData}
                        defaultSort={defaultSort}
                        defaultSortId={defaultSortId}
                        defaultSortFieldId={defaultSortFieldId}
                    />
                </div>
                <Modal size="lg" show={transferCustModalShow} onHide={() => { setTransferCustModalShow(false) }} centered>
                    <Modal.Body className="p-4">
                        <Text size="medium" fontWeight="smbold" color="black" text="Transfer Customers" />
                        <Text fontWeight="500" text="Select agencies you want to transfer in between"
                            style={{ fontSize: '16px', color: '#8E878A' }} />
                        <div className="d-flex mt-3 w-100">
                            <div className="col-6">
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
                            <img className="mb-4" src={rightArrow}></img>
                            <div className="col-6">
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
                            <div className="col-5"></div>
                            <div className="col-6" style={{ marginInlineStart: '11.5%' }}>
                                <TextField
                                    className="w-100"
                                    type="select"
                                    label={'Executive Name'}
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-3 px-5">
                            <Buttons className='p-2 px-4' name='Cancel' varient='secondary' size='large'></Buttons> &nbsp;&nbsp;
                            <Buttons className='p-2 px-4' name='Transfer' varient='primary' size='large'></Buttons>
                        </div>
                    </Modal.Body>
                </Modal>

            </div>
        </>
    )
}

const mapStateToProps = ({ allCitiesWithId }) => ({
    allCitiesWithId
});

const actions = {
    getAllCityWithId
}

const withConnect = connect(mapStateToProps, actions);

export default connect(mapStateToProps, actions)(MarketingAgency);