import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ToolTip, getLocalStorage, showErrorToast } from "../../../../common/helpers/Utils";
import Text from "../../../../shared/Text/Text";
import SearchInput from "../../../../shared/Inputs/SearchInput/SearchInput";
import { TableLoader } from "../../../../common/helpers/Loader";
import Pagination from "../../../../shared/DataTable/Pagination";
import Buttons from "../../../../shared/Buttons/Buttons";
import './AgencyUsers.scss';
import { Form, Tooltip } from "react-bootstrap";
import DataTableComponent from '../../../../shared/DataTable/DataTable';
import { getAllAgencyExecutives } from "../../../../common/redux/actions";
import { connect, useDispatch } from "react-redux";
import Image from "../../../../shared/Image/Image";
import contentIcon from '../../../../assets/images/content-ico.svg';
import * as Actions from '../../../../common/redux/types';

const ExecutiveList = (props) => {
    const { getAllAgencyExecutives, AgencyExecutiveList } = props;
    const [filterText, setFilterText] = useState(AgencyExecutiveList.data.searchStr || '');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [defaultSort, setDefaultSort] = useState(AgencyExecutiveList.data.defaultSort || false);
    const [defaultSortId, setDefaultSortId] = useState(AgencyExecutiveList.data.defaultSortId || 'name');
    const [defaultSortFieldId, setDefaultSortFieldId] = useState(() => {
        if (defaultSortId === 'name') {
            return 1
        }
        else if (defaultSortId === 'customerCount') {
            return 4
        }
        else if (defaultSortId === 'postingCount') {
            return 5
        }
        else if (defaultSortId === 'totalCustomerSpendCurrentMonth') {
            return 6
        }
        else {
            return 1
        }
    });
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalPostings, setTotalPostings] = useState(0);
    const [totalCustomerSpent, setTotalCustomerSpent] = useState(0);

    const history = useHistory();
    const userData = getLocalStorage('authData');

    const executiveColumns = [
        {
            name: 'Name',
            selector: ((row) => row.name),
            sortable: true,
            center: true,
            minWidth: '250px',
            cell: ({ name }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={name}>
                    <Text size="Small" color="secondryColor elipsis-text" text={name} />
                </ToolTip>
            ),
            id: 1
        },
        {
            name: 'Location',
            selector: ((row) => row.location),
            sortable: false,
            center: true,
            minWidth: '300px',
            cell: ({ location }) => (
                <span style={{ width: '100%' }}>
                    <Text size="Small" color="secondryColor elipsis-text" text={location === null ? '-' : location} />
                </span>
            ),
            id: 2
        },
        {
            name: 'Number',
            selector: ((row) => row.mobile),
            sortable: false,
            center: true,
            maxWidth: '150px',
            cell: ({ mobile }) => (
                <span position="top" style={{ width: '100%' }} name={mobile}>
                    <Text size="Small" color="secondryColor elipsis-text" text={mobile} />
                </span>
            ),
            id: 3
        },
        {
            name: 'Email',
            selector: ((row) => row.email),
            sortable: false,
            center: true,
            maxWidth: '250px',
            cell: ({ email }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={email}>
                    <Text size="Small" color="secondryColor elipsis-text" text={email} />
                </ToolTip>
            ),
            id: 3
        },
        {
            name: 'Customers',
            selector: ((row) => row.customerCount),
            sortable: true,
            center: true,
            maxWidth: '150px',
            cell: ({ customerCount }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={customerCount}>
                    <Text size="Small" color="secondryColor elipsis-text" text={customerCount} />
                </ToolTip>
            ),
            id: 4
        },
        {
            name: 'No of Postings',
            selector: ((row) => row.postingCount),
            sortable: true,
            center: true,
            maxWidth: '120px',
            cell: ({ postingCount }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={postingCount}>
                    <Text size="Small" color="secondryColor elipsis-text" text={postingCount} />
                </ToolTip>
            ),
            id: 5
        },
        {
            name: 'Customer Spend(month)',
            selector: ((row) => row.totalCustomerSpendCurrentMonth),
            sortable: true,
            center: true,
            maxWidth: '150px',
            cell: ({ totalCustomerSpendCurrentMonth }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={totalCustomerSpendCurrentMonth}>
                    <Text size="Small" color="secondryColor elipsis-text" text={totalCustomerSpendCurrentMonth} />
                </ToolTip>
            ),
            id: 6
        },
        {
            name: 'Actions',
            sortable: false,
            center: true,
            maxWidth: "40px",
            cell: ({ executiveId }) => (
                <div className="action">
                    <ToolTip position="left" name="View Details">
                        <span>
                            <Link
                                to={{
                                    pathname: "/admin/executives/executive-details",
                                    state: { agencyId: userData.agencyId, executiveId: executiveId },
                                }}
                            >
                                <Image name="editIcon" src={contentIcon} />
                            </Link>
                        </span>
                    </ToolTip>
                </div>
            ),
        },
    ];

    const dispatch = useDispatch();

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
    const [currentPage, setCurrentPage] = useState(AgencyExecutiveList.data.currentPage || 1);
    const [rowsPerPage, setRowsPerPage] = useState(AgencyExecutiveList.data.rowsPerPage || 8);
    const recordSize = (AgencyExecutiveList?.data?.records);
    let recordsPerPage = 0
    recordsPerPage = rowsPerPage;

    const handlePageChange = async (newPage) => {
        setCurrentPage(Number(newPage));
        await getAllAgencyExecutives({
            agencyId: userData.agencyId,
            executiveId: null,
            pageNo: newPage,
            pageSize: 8,
            searchStr: filterText
        });
    };

    const handleRowsPerPageChange = async (newRowsPerPage) => {
        recordsPerPage = Number(newRowsPerPage)
        setRowsPerPage(Number(newRowsPerPage))
        await getAllAgencyExecutives({
            agencyId: userData.agencyId,
            executiveId: null,
            pageNo: 1,
            pageSize: newRowsPerPage,
            searchStr: filterText
        });
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

    useEffect(async () => {
        // if(AgencyExecutiveList.data.executives === undefined || AgencyExecutiveList.data.executives === null) {
        // }
        await getAllAgencyExecutives({
            agencyId: userData.agencyId,
            executiveId: null,
            pageNo: 1,
            pageSize: 8,
            searchStr: ''
        });
        let totalCust = 0;
        let totalPost = 0;
        let totalCustSpent = 0;
        AgencyExecutiveList?.data.executives?.forEach(element => {
            if(element.totalCustomerSpendCurrentMonth !== null) {
                totalCustomerSpent = totalCustomerSpent + element.totalCustomerSpendCurrentMonth;
            }
            if(element.postingCount !== null) {
                totalPost = totalPost + element.postingCount
            }
            if(element.customerCount !== null) {
                totalCust = totalCust + element.customerCount
            }
        });
        setTotalCustomers(totalCust);
        setTotalPostings(totalPost);
        setTotalCustomerSpent(totalCustSpent);
        dispatch({ type: Actions.AGENCY_PROPERTY_LIST_SUCCESS, data: {} })
        dispatch({ type: Actions.AGENCY_CUSTOMER_LIST_SUCCESS, data: {} })
    }, []);

    let filteredItems = [];
    const showData = () => {
        filteredItems = [];
        filteredItems = AgencyExecutiveList?.data.executives
        console.log(AgencyExecutiveList.data.executives)
        return AgencyExecutiveList?.data.executives;
    }

    const handleSortedData = async (newSortedData) => {
        let selectorVal = newSortedData?.selector?.toString().split('.');
        selectorVal = selectorVal?.length > 1 ? selectorVal[1] : selectorVal[0]
        setDefaultSort(!defaultSort)
        let defaultSortFlag = !defaultSort
        const sorted = await [...filteredItems].sort((a, b) => {
            if (selectorVal === 'addedDate') {
                setDefaultSortFieldId(1);
                const dateA = new Date(a[selectorVal]);
                const dateB = new Date(b[selectorVal]);
                if (dateA - dateB === 0) {
                    return a.id - b.id; // Compare by 'id' field
                }
                return (defaultSortFlag ? 1 : -1) * (dateA - dateB);
            }
            if (selectorVal === 'customerCount') {
                setDefaultSortFieldId(4);
                return (defaultSortFlag ? 1 : -1) * (a[selectorVal] - b[selectorVal]);
            }
            if (selectorVal === 'propertyCount') {
                setDefaultSortFieldId(5);
                return (defaultSortFlag ? 1 : -1) * (a[selectorVal] - b[selectorVal]);
            }
            if (selectorVal === 'totalCustomerSpendCurrentMonth') {
                setDefaultSortFieldId(6);
                return (defaultSortFlag ? 1 : -1) * (a[selectorVal] - b[selectorVal]);
            }
        });

        await dispatch({
            type: Actions.AGENCY_EXECUTIVE_LIST_SUCCESS,
            data: { executives: [...sorted], records: recordSize, currentPage: currentPage, rowsPerPage: rowsPerPage, searchStr: filterText, defaultSort: defaultSortFlag, defaultSortId: defaultSortId }
        });
        // showData();
    };

    return (
        <>
            <div className="tableBox">
                <div className="tableHeading">

                    <div className="locationSelect d-flex justify-content-end">
                        <Buttons
                            name='Add New Executive'
                            disabled={userData.isActive ? false : true}
                            varient="primary"
                            size="xSmall"
                            color="white"
                            onClick={() => { history.push('/admin/executives/add-new-executive', { agencyId: userData.agencyId, addNew: true }) }} ></Buttons> &nbsp;&nbsp;
                        {subHeaderComponentMemo} &nbsp;&nbsp;
                        {/* <Form.Group controlId="exampleForm.SelectCustom">
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
                        </Form.Group> &nbsp;&nbsp;&nbsp;&nbsp; */}
                        <div className="ml-3">
                            <Buttons
                                name="Search"
                                varient="primary"
                                size="Small"
                                color="white"
                                style={{ height: "40px !important" }}
                                onClick={async () => {
                                    setCurrentPage(1)
                                    await getAllAgencyExecutives({
                                        agencyId: userData.agencyId,
                                        executiveId: null,
                                        searchString: filterText,
                                        pageNo: currentPage,
                                        pageSize: rowsPerPage
                                    })
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="agencyTable">
                    <DataTableComponent
                        data={showData()}
                        columns={executiveColumns}
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
                        onSort={handleSortedData}
                        defaultSort={defaultSort}
                        defaultSortId={defaultSortId}
                        defaultSortFieldId={defaultSortFieldId}
                    />
                </div>
            </div>
            <div className="d-flex justify-content-end p-0" >
                <Text text={'Total Customers: '} fontWeight='bold' style={{ fontSize: '14px' }} />
                <Text text={totalCustomers} fontWeight={'bold'} style={{ fontSize: '14px' }} />
                <div className="col-1"></div>
                <Text text={'Total Postings: '} fontWeight={'bold'} style={{ fontSize: '14px' }} />
                <Text text={totalPostings} fontWeight={'bold'} style={{ fontSize: '14px' }} />
                <div className="col-1"></div>
                <Text text={'Total Customer Spend(Month): '} fontWeight={'bold'} style={{ fontSize: '14px' }} />
                <Text text={'Rs' + totalCustomerSpent} fontWeight={'bold'} style={{ fontSize: '14px' }} />
            </div>
        </>
    );
}

const mapStateToProps = ({ AgencyExecutiveList }) => ({
    AgencyExecutiveList
});

const actions = {
    getAllAgencyExecutives
};

const withConnect = connect(mapStateToProps, actions);

export default connect(mapStateToProps, actions)(ExecutiveList);