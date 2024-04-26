import React, { useEffect, useState } from "react";
import { compose } from "redux"
import SearchInput from "../../../../shared/Inputs/SearchInput/SearchInput";
import './AgencyProperty.scss';
import Text from "../../../../shared/Text/Text";
import { ToolTip, formateDate, getLocalStorage, handleStatusElement, showErrorToast } from "../../../../common/helpers/Utils";
import Image from "../../../../shared/Image";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import contentIcon from '../../../../assets/images/content-ico.svg'
import CONSTANTS_STATUS from "../../../../common/helpers/ConstantsStatus";
import { TableLoader } from "../../../../common/helpers/Loader";
import Pagination from "../../../../shared/DataTable/Pagination";
import Buttons from "../../../../shared/Buttons/Buttons";
import { Form } from "react-bootstrap";
import DataTableComponent from '../../../../shared/DataTable/DataTable';
import { connect, useDispatch, useSelector } from "react-redux";
import { getAgencyProperties } from "../../../../common/redux/actions";
import * as Actions from '../../../../common/redux/types';

const AgencyProperty = (props) => {
    const { getAgencyProperties } = props;
    const userData = getLocalStorage('authData');
    const userRole = props?.userRole;
    const agencyId = props?.agencyId || userData.agencyId || 0;
    const executiveId = props?.executiveId || 0;
    const customerId = props?.customerId || 0;
    const agencyProperty = useSelector(state => state.agencyProperties);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const [defaultSort, setDefaultSort] = useState(agencyProperty.data.defaultSort || false);
    const [defaultSortId, setDefaultSortId] = useState(agencyProperty.data.defaultSortId || 'postedDate');
    const [defaultSortFieldId, setDefaultSortFieldId] = useState(agencyProperty.data.defaultSortFieldId || 1);
    const statusArr = CONSTANTS_STATUS.propertyStatusArr;
    const [statusSelected, setStatusSelected] = useState(() => {
        // if (allPropertyData?.data?.propertyStatus === 'PUBLISHED') {
        //    return 'PUBLISHED';
        // } else if (allPropertyData?.data?.propertyStatus === 'UNDER REVIEW') {
        //    return 'UNDER REVIEW';
        // } else {
        //    return '';
        // }
    });

    const propertyType = CONSTANTS_STATUS.propertyType;
    const [typeSelected, setTypeSelected] = useState(() => {
        if (agencyProperty?.data?.propertyType === true) {
            return 'SMARTDOOR';
        } else if (agencyProperty?.data?.propertyType === false) {
            return 'NON SMARTDOOR';
        } else {
            return '';
        }
    });
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const columns = [
        {
            name: "Added On",
            selector: ((row) => row.postedDate),
            sortable: true,
            center: true,
            minWidth: "120px",
            style: { padding: "0 !important" },
            cell: ({ postedDate }) => <span>{`${formateDate(postedDate)}` || ""}</span>,
            id: 2
        },
        {
            name: "Owner",
            // selector: "ownerName",
            sortable: false,
            sortable: false,
            center: true,
            wrap: true,
            minWidth: "250px",
            style: { padding: "0 !important" },
            cell: ({ customerName }) => (
                <span>{customerName}</span>
            )
        },
        {
            name: "Mobile",
            // selector: "ownerName",
            center: true,
            maxWidth: "120px",
            cell: ({ mobile }) => (
                <span>{mobile}</span>
            )
        },
        {
            name: "City",
            sortable: false,
            wrap: true,
            style: { padding: "0 !important" },
            center: true,
            minWidth: "100px",
            cell: ({ city }) => (
                <span>
                    {city}
                </span>
            ),
        },
        {
            name: "Plan",
            selector: ((row) => row.planName),
            sortable: false,
            center: true,
            maxWidth: "130px",
            style: { padding: "0 !important" },
        },
        {
            name: "Type",
            selector: ((row) => row.propertyType),
            sortable: false,
            center: true,
            maxWidth: "130px",
            style: { padding: "0 !important" },
        },
        {
            name: "Status",
            sortable: false,
            center: true,
            maxWidth: "120px",
            style: { padding: "0 !important" },
            cell: ({ status }) => <span>{status !== null ? <>
                {handleStatusElement(status)}
            </> : '-'}
            </span>,
        },
        {
            name: "Action",
            sortable: false,
            center: true,
            maxWidth: "40px",
            cell: ({ row, propertyId, postedById }) => (
                <div className="action">
                    <ToolTip position="left" name="View Details">
                        <span>
                            <Link
                                to={{
                                    pathname: "/admin/property/property-details",
                                    state: { propertyId: propertyId, userId: postedById, menuName: 'Properties', isDeleted: false, defaultSort: defaultSort, defaultSortId: defaultSortId },
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
    const [currentPage, setCurrentPage] = useState(agencyProperty.data.currentPage || 1);
    const [rowsPerPage, setRowsPerPage] = useState(agencyProperty.data.rowsPerPage || 8);
    const recordSize = Number(agencyProperty?.data?.records);
    let recordsPerPage = 0
    recordsPerPage = rowsPerPage;

    const handlePageChange = async (newPage) => {
        setCurrentPage(Number(newPage));
        let type = null
        if (typeSelected === 'SMARTDOOR') {
            type = true
        } else if (typeSelected === 'NON SMARTDOOR') {
            type = false
        }
        if (!validateDates()) {
            return null;
        }
        await getAgencyProperties({
            agencyId: agencyId,
            executiveId: executiveId,
            customerId: customerId,
            searchString: filterText,
            pageNo: newPage,
            pageSize: rowsPerPage,
            fromDate: fromDate,
            toDate: toDate,
            propertyStatus: statusSelected,
            propertyType: type,
            defaultSort: !defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
        });
    };

    const handleRowsPerPageChange = async (newRowsPerPage) => {
        let type = null
        if (typeSelected === 'SMARTDOOR') {
            type = true
        } else if (typeSelected === 'NON SMARTDOOR') {
            type = false
        }
        if (!validateDates()) {
            return null;
        }
        await getAgencyProperties({
            agencyId: agencyId,
            executiveId: executiveId,
            customerId: customerId,
            searchString: filterText,
            pageNo: currentPage,
            pageSize: newRowsPerPage,
            fromDate: fromDate,
            toDate: toDate,
            propertyStatus: statusSelected,
            propertyType: type,
            defaultSort: !defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
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

    const _filterStatus = (status_value) => {
        setStatusSelected(status_value);
    };

    const _filterPropertyType = (status_value) => {
        setTypeSelected(status_value);
    };

    useEffect(async () => {
        if (agencyProperty.data.propertyData === undefined) {
            await getAgencyProperties({
                agencyId: agencyId,
                executiveId: executiveId,
                customerId: customerId,
                searchString: "",
                pageNo: currentPage,
                pageSize: rowsPerPage,
                fromDate: "",
                toDate: "",
                propertyStatus: "",
                propertyType: null,
                defaultSort: defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
            });
        }
    }, []);

    let filteredItems = [];
    const showData = () => {
        filteredItems = agencyProperty.data.propertyData;
        return filteredItems;
    };

    const handleSortedData = async (newSortedData) => {
        let selectorVal = newSortedData?.selector?.toString().split('.');
        selectorVal = selectorVal?.length > 1 ? selectorVal[1] : selectorVal[0]
        setDefaultSort(!defaultSort)
        let defaultSortFlag = !defaultSort
        const sorted = await [...filteredItems].sort((a, b) => {
            if (selectorVal === 'postedDate') {
                setDefaultSortFieldId(1);
                const dateA = new Date(a[selectorVal]);
                const dateB = new Date(b[selectorVal]);
                if (dateA - dateB === 0) {
                    return a.id - b.id; // Compare by 'id' field
                }
                return (defaultSortFlag ? 1 : -1) * (dateA - dateB);
            }
        });

        await dispatch({
            type: Actions.AGENCY_PROPERTY_LIST_SUCCESS,
            data: { propertyData: [...sorted], records: recordSize, currentPage: currentPage, rowsPerPage: rowsPerPage, searchStr: filterText, propertyType: typeSelected, propertyStatus: statusSelected, fromDate: fromDate, toDate: toDate, defaultSort: defaultSortFlag, defaultSortId: defaultSortId }
        });
        // showData();
    };

    return (
        <>
            <div className="tableBox ">

                <div className="align-items-center tableHeading mb-0">
                    <div className="d-flex justify-content-end">
                        {/* <div>
                            <Text
                                size="regular"
                                fontWeight="mediumbold"
                                color="secondryColor"
                                text="Properties Posted"
                            />
                        </div> */}
                        <div className="locationSelect justify-content-end d-flex">
                            {propertyType.length ? (
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Control
                                        as="select"
                                        value={typeSelected}
                                        onChange={(e) => {
                                            _filterPropertyType(e.target.value);
                                        }}
                                    >
                                        <option value="">Select Property Type</option>
                                        {propertyType.length
                                            ? propertyType.map((_value, index) => (
                                                <option key={index} value={_value}>
                                                    {_value}
                                                </option>
                                            ))
                                            : null}
                                    </Form.Control>
                                </Form.Group>
                            ) : (
                                ""
                            )} &nbsp;
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
                                        if (typeSelected === 'SMARTDOOR') {
                                            type = true
                                        } else if (typeSelected === 'NON SMARTDOOR') {
                                            type = false
                                        }
                                        if (!validateDates()) {
                                            return null;
                                        }
                                        await getAgencyProperties({
                                            agencyId: agencyId,
                                            executiveId: executiveId,
                                            customerId: customerId,
                                            searchString: filterText,
                                            pageNo: currentPage,
                                            pageSize: rowsPerPage,
                                            fromDate: fromDate,
                                            toDate: toDate,
                                            propertyStatus: statusSelected,
                                            propertyType: type
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="propertiesTableWrapper">
                    <DataTableComponent
                        data={showData()}
                        columns={columns}
                        //   progressPending={allPropertyData.isLoading}
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

const mapStateToProps = ({ agencyProperties }) => ({
    agencyProperties
});

const actions = {
    getAgencyProperties
};

export default compose(connect(mapStateToProps, actions))(AgencyProperty);