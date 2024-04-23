import { compose } from "redux";
import Buttons from "../../../../shared/Buttons/Buttons";
import Form from "react-bootstrap/Form";
import Text from "../../../../shared/Text/Text";
import SearchInput from "../../../../shared/Inputs/SearchInput/SearchInput";
import React, { useEffect, useState } from "react";
import Pagination from "../../../../shared/DataTable/Pagination";
import { TableLoader } from "../../../../common/helpers/Loader";
import { ToolTip, formateDate, getLocalStorage, handleStatusElement, showErrorToast } from "../../../../common/helpers/Utils";
import contentIcon from '../../../../assets/images/content-ico.svg';
import Image from "../../../../shared/Image";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CONSTANTS_STATUS from "../../../../common/helpers/ConstantsStatus";
import DataTableComponent from '../../../../shared/DataTable/DataTable';
import "./AgencyCustomers.scss";
import { getAgencyCustomers } from "../../../../common/redux/actions";
import { connect, useDispatch, useSelector } from "react-redux";
import * as Actions from '../../../../common/redux/types';

const AgencyCustomers = (props) => {
    const { getAgencyCustomers } = props;
    const agencyCustomers = useSelector(state => state.agencyCustomers);
    const userData = getLocalStorage('authData');
    const userRole = props?.userRole || userData.roleName;
    const agencyId = props?.agencyId || userData.agencyId;
    const executiveId = props?.executiveId || userData.userid;
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const [defaultSort, setDefaultSort] = useState(agencyCustomers.data.defaultSort ||false);
    const [defaultSortId, setDefaultSortId] = useState(agencyCustomers.data.defaultSortId ||'postedDate');
    const [defaultSortFieldId, setDefaultSortFieldId] = useState(() => {
        if (defaultSortId === 'addedDate') {
            return 1
        }
        else if (defaultSortId === 'propertyCount') {
            return 5
        }
        else if (defaultSortId === 'monthlySpent') {
            return 6
        }
        else if (defaultSortId === 'totalSpent') {
            return 7
        }
        else {
            return 1
        }
    });
    const statusArr = CONSTANTS_STATUS.ConsumerStatusArr;
    const [statusSelected, setStatusSelected] = useState(() => {
        if (agencyCustomers?.data?.kycStatus === 'COMPLETED') {
            return true;
        } else if (agencyCustomers?.data?.kycStatus === 'PENDING') {
            return false;
        } else {
            return null;
        }
    });

    const propertyType = CONSTANTS_STATUS.propertyType;
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const columns = [
        {
            name: "Date Added",
            selector: ((row) => row.addedDate),
            sortable: true,
            center: true,
            minWidth: "200px",
            style: { padding: "0 !important" },
            cell: ({ addedDate }) => <span>{`${formateDate(addedDate)}` || "DD-MM-YYYY"}</span>,
            id: 1
        },
        {
            name: "Customer Name",
            // selector: "ownerName",
            sortable: false,
            sortable: false,
            center: true,
            wrap: true,
            minWidth: "250px",
            style: { padding: "0 !important" },
            cell: ({ name }) => (
                <span>{name !== '' ? <>{name}</> : <>{'-'}</>}</span>
            ),
            id: 2
        },
        {
            name: "Mobile",
            // selector: "ownerName",
            center: true,
            maxWidth: "120px",
            cell: ({ mobile }) => (
                <span>{mobile}</span>
            ),
            id: 3
        },
        {
            name: "Gifted Coupons",
            selector: ((row) => row.giftedCoupens),
            sortable: false,
            wrap: true,
            style: { padding: "0 !important" },
            center: true,
            minWidth: "120px",
            id: 4
        },
        {
            name: "Properties",
            selector: ((row) => row.propertyCount),
            sortable: true,
            center: true,
            maxWidth: "130px",
            style: { padding: "0 !important" },
            id: 5
        },
        {
            name: "Spend(month)",
            selector: ((row) => row.monthlySpent),
            sortable: true,
            center: true,
            maxWidth: "130px",
            style: { padding: "0 !important" },
            id: 6
        },
        {
            name: "Spend(Total)",
            selector: ((row) => row.totalSpent),
            sortable: true,
            center: true,
            maxWidth: "120px",
            style: { padding: "0 !important" },
            id: 7
        },
        {
            name: "Action",
            sortable: false,
            center: true,
            maxWidth: "40px",
            cell: ({ row, addedDate, userId, name, mobile, giftedCoupens, propertyCount, monthlySpent, totalSpent, kycStatus, email, totalCoinBalance }) => (
                <div className="action">
                    <ToolTip position="left" name="View Details">
                        <span>
                            <Link
                                to={{
                                    pathname: "/admin/agencyCustomers/customer-details",
                                    state: {
                                        customerDetails: {
                                            userId: userId, addedDate: addedDate, name: name, mobile: mobile,
                                            giftedCoupens: giftedCoupens, propertyCount, propertyCount, monthlySpent: monthlySpent, 
                                            totalSpent: totalSpent, kycStatus: kycStatus, email: email, totalCoinBalance: totalCoinBalance
                                        }, agencyId: agencyId
                                    },
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
    const history = useHistory();
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
    const [currentPage, setCurrentPage] = useState(agencyCustomers.data.currentPage || 1);
    const [rowsPerPage, setRowsPerPage] = useState(agencyCustomers.data.rowsPerPage || 8);
    const recordSize = Number(agencyCustomers?.data?.records);
    let recordsPerPage = 0
    recordsPerPage = rowsPerPage;

    const handlePageChange = async (newPage) => {
        setCurrentPage(Number(newPage));
        let type = null
        if (statusSelected === 'COMPLETED') {
            type = true
        } else if (statusSelected === 'PENDING') {
            type = false
        } else {
            type = null
        }
        await getAgencyCustomers({
            agencyId: agencyId,
            executiveId: 0,
            searchString: filterText,
            pageNo: newPage,
            pageSize: rowsPerPage,
            fromDate: fromDate,
            toDate: toDate,
            kycStatus: type,
            defaultSort: !defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
        })
    };

    const handleRowsPerPageChange = async (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        let type = null
        if (statusSelected === 'COMPLETED') {
            type = true
        } else if (statusSelected === 'PENDING') {
            type = false
        } else {
            type = null
        }
        await getAgencyCustomers({
            agencyId: agencyId,
            executiveId: 0,
            searchString: filterText,
            pageNo: currentPage,
            pageSize: newRowsPerPage,
            fromDate: fromDate,
            toDate: toDate,
            kycStatus: type,
            defaultSort: !defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
        })
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

    const _filterStatus = (status_value) => {
        setStatusSelected(status_value);
    };

    useEffect(async () => {
        if (userRole === 'SUPER ADMIN') {
            await getAgencyCustomers({
                agencyId: agencyId,
                executiveId: 0,
                searchString: "",
                pageNo: currentPage,
                pageSize: rowsPerPage,
                fromDate: "",
                toDate: "",
                kycStatus: null,
                defaultSort: defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
            })
            console.log(agencyCustomers)
        };
        if ((userRole === 'MARKETING ADMIN' || userRole === 'MARKETING EXECUTIVE') && agencyCustomers?.data?.customerData?.length === 0) {
            await getAgencyCustomers({
                agencyId: agencyId,
                executiveId: executiveId,
                searchString: "",
                pageNo: currentPage,
                pageSize: rowsPerPage,
                fromDate: "",
                toDate: "",
                kycStatus: null,
                defaultSort: defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
            })
        };
    }, [userRole]);

    let filteredItems = [];
    const showData = () => {
        filteredItems = [];
        filteredItems = agencyCustomers?.data.customerData
        console.log(agencyCustomers.data)
        return agencyCustomers?.data.customerData;
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
            if (selectorVal === 'propertyCount') {
                setDefaultSortFieldId(5);
                return (defaultSortFlag ? 1 : -1) * (a[selectorVal] - b[selectorVal]);
            }
            if (selectorVal === 'monthlySpent') {
                setDefaultSortFieldId(6);
                return (defaultSortFlag ? 1 : -1) * (a[selectorVal] - b[selectorVal]);
            }
            if (selectorVal === 'totalSpent') {
                setDefaultSortFieldId(7);
                return (defaultSortFlag ? 1 : -1) * (a[selectorVal] - b[selectorVal]);
            }
        });

        await dispatch({
            type: Actions.AGENCY_CUSTOMER_LIST_SUCCESS,
            data: { customerData: [...sorted], records: recordSize, currentPage: currentPage, rowsPerPage: rowsPerPage, searchStr: filterText, kycStatus: statusSelected, fromDate: fromDate, toDate: toDate, defaultSort: defaultSortFlag, defaultSortId: defaultSortId }
        });
        // showData();
    };

    return (
        <>
            <div className="tableBox ">
                <div className="align-items-center tableHeading">
                    <div className="d-flex  justify-content-end">
                        {/* <div>
                            <Text
                                size="regular"
                                fontWeight="mediumbold"
                                color="secondryColor"
                                text="Customers"
                            />
                        </div> */}
                        <div className="locationSelect d-flex ">
                            {/* <Buttons
                                name='View Details'
                                varient="primary"
                                size="xSmall"
                                color="white"
                                onClick={() => { history.push('/admin/agencyCustomers/customer-details') }} ></Buttons> &nbsp;&nbsp; */}
                            {statusArr.length ? (
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Control
                                        as="select"
                                        value={statusSelected}
                                        onChange={(e) => {
                                            _filterStatus(e.target.value);
                                        }}
                                    >
                                        <option value="">Select Status</option>
                                        {statusArr.length
                                            ? statusArr.map((_value, index) => (
                                                <option key={index} value={_value}>
                                                    {_value}
                                                </option>
                                            ))
                                            : null}
                                    </Form.Control>
                                </Form.Group>
                            ) : (
                                ""
                            )}

                            {subHeaderComponentMemo} &nbsp;
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
                            </Form.Group> &nbsp;
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
                            <div className="ml-3">
                                <Buttons
                                    name="Search"
                                    varient="primary"
                                    size="Small"
                                    color="white"
                                    style={{ height: "40px !important" }}
                                    onClick={async () => {
                                        setCurrentPage(1)
                                        let type = null
                                        if (statusSelected === 'COMPLETED') {
                                            type = true
                                        } else if (statusSelected === 'PENDING') {
                                            type = false
                                        } else {
                                            type = null
                                        }
                                        if (!validateDates()) {
                                            return null;
                                        }
                                        await getAgencyCustomers({
                                            agencyId: agencyId,
                                            executiveId: 0,
                                            searchString: filterText,
                                            pageNo: currentPage,
                                            pageSize: rowsPerPage,
                                            fromDate: fromDate,
                                            toDate: toDate,
                                            kycStatus: type
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="propertiesTableWrapper" >
                    <DataTableComponent
                        data={showData()}
                        columns={columns}
                        // progressPending={allPropertyData.isLoading}
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
        </>
    );
}

const mapStateToProps = ({ agencyCustomers }) => ({
    agencyCustomers
});

const actions = {
    getAgencyCustomers
};

export default compose(connect(mapStateToProps, actions))(AgencyCustomers);