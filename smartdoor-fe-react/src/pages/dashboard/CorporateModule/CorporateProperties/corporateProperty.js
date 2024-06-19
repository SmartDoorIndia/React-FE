import { compose } from "redux"
import SearchInput from "../../../../shared/Inputs/SearchInput/SearchInput";
import React, { useEffect, useState } from "react";
import contentIcon from '../../../../assets/images/content-ico.svg';
import DataTableComponent from '../../../../shared/DataTable/DataTable';
import { Link } from "react-router-dom/cjs/react-router-dom";
import Image from "../../../../shared/Image";
import { ToolTip, formateDate, handleStatusElement, showErrorToast } from "../../../../common/helpers/Utils";
import Text from "../../../../shared/Text/Text";
import './corporateProperty.scss';
import { getAllCorporateProperties } from "../../../../common/redux/actions";
import { connect, useSelector } from "react-redux";
import CONSTANTS_STATUS from "../../../../common/helpers/ConstantsStatus";
import { Form } from "react-bootstrap";
import Pagination from "../../../../shared/DataTable/Pagination";
import { TableLoader } from "../../../../common/helpers/Loader";
import Buttons from "../../../../shared/Buttons/Buttons";

const CorporateProperty = (props) => {

    const { corporateId, getAllCorporateProperties, corporateProperty } = props;
    const data = useSelector(state => state.corporateProperty.data);
    const statusArr = ["UNDER REVIEW", "PUBLISHED", "DELISTED"];
    const propertyType = CONSTANTS_STATUS.propertyType;
    const [statusSelected, setStatusSelected] = useState(() => {
        if (corporateProperty?.data?.status === 'PUBLISHED') {
            return 'PUBLISHED';
        } else if (corporateProperty?.data?.status === 'UNDER REVIEW') {
            return 'UNDER REVIEW';
        } else if (corporateProperty?.data?.status === 'DELISTED') {
            return 'DELISTED';
        } else {
            return '';
        }
    });
    const [typeSelected, setTypeSelected] = useState(() => {
        if (corporateProperty?.data?.sdType === true) {
            return 'SMARTDOOR';
        } else if (corporateProperty?.data?.sdType === false) {
            return 'NON SMARTDOOR';
        } else {
            return '';
        }
    });
    const [fromDate, setFromDate] = useState(data.length !== 0 ? corporateProperty?.data?.fromDate : null);
    const [toDate, setToDate] = useState(data.length !== 0 ? corporateProperty?.data?.toDate : null);
    const [currentPage, setCurrentPage] = useState(data.length !== 0 ? corporateProperty?.data?.currentPage : 1);
    const [rowsPerPage, setRowsPerPage] = useState(data.length !== 0 ? corporateProperty?.data?.rowsPerPage : 8);
    const recordSize = corporateProperty?.data?.records || 0;
    const ProgressComponent = <TableLoader />;

    const propertyColumns = [
        {
            name: "ID",
            selector: ((row) => row.propertyId),
            sortable: false,
            center: false,
            maxWidth: "150px",
            id: 1
        },
        {
            name: "Added On",
            selector: ((row) => row.postedDate),
            sortable: true,
            center: true,
            maxWidth: "150px",
            cell: ({ postedDate }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={postedDate}>
                    <Text size="Small" color="secondryColor elipsis-text" text={formateDate(postedDate)} />
                </ToolTip>
            ),
            id: 2
        },
        {
            name: "Delisted On",
            selector: ((row) => row.deletionDate),
            sortable: false,
            center: true,
            maxWidth: "150px",
            cell: ({ deletionDate }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={deletionDate}>
                    <Text size="Small" color="secondryColor elipsis-text" text={formateDate(deletionDate)} />
                </ToolTip>
            ),
            id: 3
        },
        {
            name: "User",
            selector: ((row) => row.userName),
            sortable: true,
            center: true,
            maxWidth: "150px",
            cell: ({ userName }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={userName}>
                    <Text size="Small" color="secondryColor elipsis-text" text={userName} />
                </ToolTip>
            ),
            id: 4
        },
        {
            name: "Property",
            selector: ((row) => row.isSmartLock),
            sortable: true,
            center: true,
            maxWidth: "150px",
            cell: ({ isSmartLock }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={isSmartLock ? 'SD' : 'NON SD'}>
                    <Text size="Small" color="secondryColor elipsis-text" text={isSmartLock ? 'SD' : 'NON SD'} />
                </ToolTip>
            ),
            id: 5
        },
        {
            name: "City",
            selector: ((row) => row.city),
            sortable: true,
            center: false,
            minWidth: "250px",
            cell: ({ city }) => (
                <ToolTip position="top" style={{ width: '50%' }} name={city}>
                    <Text size="Small" color="secondryColor elipsis-text" text={city} />
                </ToolTip>
            ),
            id: 6
        },
        {
            name: "Property Type",
            selector: ((row) => row.propertyType),
            sortable: true,
            center: true,
            maxWidth: "150px",
            cell: ({ propertyType }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={propertyType}>
                    <Text size="Small" color="secondryColor elipsis-text" text={propertyType} />
                </ToolTip>
            ),
            id: 6
        },
        {
            name: "Status",
            selector: ((row) => row.status),
            sortable: true,
            center: true,
            maxWidth: "150px",
            cell: ({ status }) => <span>{status !== null ? <>
                {handleStatusElement(status)}
            </> : '-'}
            </span>,
            id: 6
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
                                    state: {propertyId: propertyId, userId: postedById, menuName: '', isDeleted: false},
                                }}
                            >
                                <Image name="editIcon" src={contentIcon} />
                            </Link>
                        </span>
                    </ToolTip>
                </div>
            ),
        }
    ]

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

    useEffect(() => {
        console.log(data)
        if(data?.length === 0 || data === undefined) {
            getAllCorporateProperties({
                corporateId: corporateId,
                pageNo: currentPage,
                pageSize: rowsPerPage,
                status: statusSelected,
                sdType: typeSelected,
                searchString: filterText,
                fromDate: fromDate,
                toDate: toDate
            });
        }
    }, []);

    const _filterStatus = (status_value) => {
        setStatusSelected(status_value);
    };
    const _filterPropertyType = (status_value) => {
        setTypeSelected(status_value);
    };

    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

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
                placeholder="Search user/ id"
            />
        );
    }, [filterText, resetPaginationToggle]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        let type = null
        if (typeSelected === 'SMARTDOOR') {
            type = true
        } else if (typeSelected === 'NON SMARTDOOR') {
            type = false
        }
        if (!validateDates()) {
            return null;
        }
        getAllCorporateProperties({
            corporateId: corporateId,
            pageNo: currentPage,
            rowsPerPage: newPage,
            status: statusSelected,
            sdType: type,
            searchString: filterText,
            fromDate: fromDate,
            toDate: toDate
        })
    }

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        let type = null
        if (typeSelected === 'SMARTDOOR') {
            type = true
        } else if (typeSelected === 'NON SMARTDOOR') {
            type = false
        }
        if (!validateDates()) {
            return null;
        }
        getAllCorporateProperties({
            corporateId: corporateId,
            pageNo: currentPage,
            pageSize: newRowsPerPage,
            status: statusSelected,
            sdType: type,
            searchString: filterText,
            fromDate: fromDate,
            toDate: toDate
        })
    }
    let PaginationComponent = ({ onChangePage, onChangeRowsPerPage, ...props }) => (
        <Pagination {...props}
            rowCount={recordSize}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleRowsPerPageChange}
            currentPage={currentPage}
            onChangePage={handlePageChange}
            paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
        />
    );

    const showData = () => {
        let filteredItems = [];
        filteredItems = corporateProperty?.data?.corpPropertyList;
        return corporateProperty?.data?.corpPropertyList;
    }

    return (
        <>
            <div className="tableBox">
                <div className="tableHeading">
                    <div className="locationSelect d-flex justify-content-between align-items-end text-start">
                        <Text text={'Properties Posted'} style={{ fontSize: '20px', fontWeight: '700', padding: '0px' }} />
                        {subHeaderComponentMemo}
                        <Form.Group controlId="exampleForm.SelectCustom">
                            {/* <Form.Label>From Date</Form.Label> */}
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
                            {/* <Form.Label>To Date</Form.Label> */}
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
                        )}
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

                        <div className="ml-3" style={{ float: 'right' }}>
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
                                    await getAllCorporateProperties({
                                        corporateId: corporateId,
                                        pageNo: currentPage,
                                        pageSize: rowsPerPage,
                                        status: statusSelected,
                                        sdType: type,
                                        searchString: filterText,
                                        fromDate: fromDate,
                                        toDate: toDate
                                    })
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="corporateTableWrapper">
                    <DataTableComponent
                        data={showData()}
                        columns={propertyColumns}
                        progressPending={corporateProperty.isLoading}
                        progressComponent={ProgressComponent}
                        paginationComponent={PaginationComponent}
                        paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                        paginationPerPage={rowsPerPage}
                        currentPage={currentPage}
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handleRowsPerPageChange}
                        perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                        filterText={filterText}
                        paginationServer={true}
                        subHeaderComponent={subHeaderComponentMemo}
                        persistTableHead
                        filterComponent={subHeaderComponentMemo}
                    // onRowClicked={onRowClicked}
                    // onSort={handleSortedData}
                    // defaultSort={defaultSort}
                    // defaultSortId={defaultSortId}
                    // defaultSortFieldId={defaultSortFieldId}
                    />
                </div>
            </div>
        </>
    )
}

const mapStateToProps = ({ corporateProperty }) => ({
    corporateProperty
})

const actions = {
    getAllCorporateProperties
}

export default compose(connect(mapStateToProps, actions))(CorporateProperty);