import { compose } from "redux"
import SearchInput from "../../../../shared/Inputs/SearchInput/SearchInput";
import React, { useEffect, useState } from "react";
import contentIcon from '../../../../assets/images/content-ico.svg';
import DataTableComponent from '../../../../shared/DataTable/DataTable';
import { Link } from "react-router-dom/cjs/react-router-dom";
import Image from "../../../../shared/Image";
import { ToolTip, formateDate, handleStatusElement, showErrorToast, showSuccessToast } from "../../../../common/helpers/Utils";
import Text from "../../../../shared/Text/Text";
import './corporateProperty.scss';
import { approveAuctionDetails, deleteAuctionDetails, fetchAuctionData, getAllCorporateProperties } from "../../../../common/redux/actions";
import { connect, useSelector } from "react-redux";
import CONSTANTS_STATUS from "../../../../common/helpers/ConstantsStatus";
import { Col, Form, Modal, Row } from "react-bootstrap";
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
    const [auctionDetailsModalFlag, setAuctionDetailsModalFlag] = useState(false);
    const [auctionDetails, setAuctionDetails] = useState({});
    const [auctionPropertyId, setAuctionPropertyId] = useState(null);

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
            wrap: true,
            minWidth: "180px",
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
            wrap: true,
            minWidth: "250px",
            cell: ({ city }) => (
                // <ToolTip position="top" style={{ width: '50%' }} name={city}>
                //     <Text size="Small" color="secondryColor elipsis-text" text={city} />
                // </ToolTip>
                <span>{city}</span>
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
            cell: ({ status, isDeleted }) => <span>{status !== null && isDeleted !== true ? <>
                {handleStatusElement(status)}
            </> : <> {handleStatusElement('delisted')} </>}
            </span>,
            id: 6
        },
        {
            name: "Auction Details",
            sortable: true,
            center: true,
            maxWidth: "150px",
            cell: ({ row, propertyId, postedById }) => (
                <div className="action" onClick={async () => {
                                setAuctionPropertyId(propertyId);
                                const response = await fetchAuctionData({ propertyId: propertyId });
                                console.log(response);
                                if (response?.status === 200) {
                                    setAuctionDetails(response?.data?.resourceData);
                                }
                                setAuctionDetailsModalFlag(true)
                            }}>
                    <ToolTip position="left" name="View Details">
                        <Image name="editIcon" src={contentIcon}
                             />
                    </ToolTip>
                </div>
            ),
            id: 7
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
                                    pathname: "/admin/corporate/corporateProperties/propertyDetails",
                                    state: { propertyId: propertyId, userId: postedById, menuName: '', isDeleted: false },
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
        if (data?.length === 0 || data === undefined) {
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
            pageNo: newPage,
            pageSize: rowsPerPage,
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

    const rejectDetails = () => {

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
                                    // const selectedDate = new Date(e.target.value);
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
                                    // const selectedDate = new Date(e.target.value);
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
                <div className="corporatePropTableWrapper">
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
                    />
                </div>
            </div>
            <Modal
                show={auctionDetailsModalFlag}
                onHide={() => setAuctionDetailsModalFlag(false)}
                size="lg"
                centered
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Text
                        text="Auction Details"
                        style={{
                            fontSize: "20px",
                            fontWeight: "700"
                        }}
                    />
                </Modal.Header>

                <Modal.Body
                    style={{
                        maxHeight: "75vh",
                        overflowY: "auto",
                        overflowX: "hidden"
                    }}
                >
                    {/* ================= PENDING APPROVAL DETAILS ================= */}
                    <div className="mb-4">
                        <div
                            className="d-flex align-items-center mb-3"
                            style={{
                                padding: "10px 14px",
                                background: "#fff8e1",
                                borderRadius: "6px",
                                border: "1px solid #ffe082"
                            }}
                        >
                            <Text
                                text="Pending Approval Details"
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "700"
                                }}
                            />
                        </div>

                        {auctionDetails?.pendingApprovalDetails ? (
                            <>
                                {/* Property Details */}
                                <Text
                                    text="Property Details"
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        marginBottom: "12px"
                                    }}
                                />

                                <Row className="mb-2">
                                    <Col lg={4} md={5}>
                                        <Text text="Property Address:" />
                                    </Col>
                                    <Col lg={8} md={7}>
                                        <Text
                                            text={
                                                auctionDetails.pendingApprovalDetails
                                                    ?.propertyAddress || "-"
                                            }
                                        />
                                    </Col>
                                </Row>

                                <Row className="mb-2">
                                    <Col lg={4} md={5}>
                                        <Text text="Auction Status:" />
                                    </Col>
                                    <Col lg={8} md={7}>
                                        <span
                                            style={{
                                                display: "inline-block",
                                                padding: "4px 10px",
                                                borderRadius: "15px",
                                                background: auctionDetails
                                                    .pendingApprovalDetails?.isUnderAuction
                                                    ? "#e8f5e9"
                                                    : "#f5f5f5",
                                                color: auctionDetails
                                                    .pendingApprovalDetails?.isUnderAuction
                                                    ? "#2e7d32"
                                                    : "#666",
                                                fontSize: "13px",
                                                fontWeight: "600"
                                            }}
                                        >
                                            {auctionDetails.pendingApprovalDetails
                                                ?.isUnderAuction
                                                ? "Under Auction"
                                                : "Not Under Auction"}
                                        </span>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col lg={4} md={5}>
                                        <Text text="Description:" />
                                    </Col>
                                    <Col lg={8} md={7}>
                                        <Text
                                            text={
                                                auctionDetails.pendingApprovalDetails
                                                    ?.statusMessage || "-"
                                            }
                                        />
                                    </Col>
                                </Row>

                                <hr />

                                {/* Auction Source Details */}
                                <Text
                                    text="Auction Source Details"
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        marginBottom: "12px"
                                    }}
                                />

                                {auctionDetails.pendingApprovalDetails?.sources?.length > 0 ? (
                                    auctionDetails.pendingApprovalDetails.sources.map(
                                        (source, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    padding: "15px",
                                                    marginBottom: "15px",
                                                    border: "1px solid #e0e0e0",
                                                    borderRadius: "6px",
                                                    background: "#fafafa"
                                                }}
                                            >
                                                <Row className="mb-2">
                                                    <Col lg={4} md={5}>
                                                        <Text text="Source Name:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        <Text
                                                            text={source?.sourceName || "-"}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mb-2">
                                                    <Col lg={4} md={5}>
                                                        <Text text="Property Type:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        <Text
                                                            text={source?.propertyType || "-"}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mb-2">
                                                    <Col lg={4} md={5}>
                                                        <Text text="Borrower Name:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        <Text
                                                            text={source?.borrowerName || "-"}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mb-2">
                                                    <Col lg={4} md={5}>
                                                        <Text text="Bank Name:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        <Text
                                                            text={source?.bankName || "-"}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mb-2">
                                                    <Col lg={4} md={5}>
                                                        <Text text="Auction Date:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        <Text
                                                            text={source?.auctionDate || "-"}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mb-2">
                                                    <Col lg={4} md={5}>
                                                        <Text text="Bids Starting From:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        <Text
                                                            text={
                                                                source?.bidPriceStartingFrom ||
                                                                "-"
                                                            }
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mb-2">
                                                    <Col lg={4} md={5}>
                                                        <Text text="EMD Amount:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        <Text
                                                            text={source?.emdAmount || "-"}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mb-2">
                                                    <Col lg={4} md={5}>
                                                        <Text text="Application Deadline:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        <Text
                                                            text={
                                                                source?.applicationDeadline ||
                                                                "-"
                                                            }
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mb-2">
                                                    <Col lg={4} md={5}>
                                                        <Text text="Auction Address:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        <Text
                                                            text={source?.auctionAddress || "-"}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mb-2">
                                                    <Col lg={4} md={5}>
                                                        <Text text="Contact Details:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        <Text
                                                            text={
                                                                source?.contactDetails || "-"
                                                            }
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col lg={4} md={5}>
                                                        <Text text="Source Link:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        {source?.sourceLink ? (
                                                            <a
                                                                href={source.sourceLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    wordBreak: "break-all"
                                                                }}
                                                            >
                                                                {source.sourceLink}
                                                            </a>
                                                        ) : (
                                                            <Text text="-" />
                                                        )}
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <div
                                        className="text-center p-3"
                                        style={{
                                            background: "#f8f9fa",
                                            borderRadius: "6px"
                                        }}
                                    >
                                        <Text text="No source details available." />
                                    </div>
                                )}
                                <div className="d-flex justify-content-center">
                                    <Buttons
                                        name="Approve"
                                        onClick={async () => {
                                            const response = await approveAuctionDetails({ propertyId: auctionPropertyId });

                                            if (response?.status === 200) {
                                                setAuctionDetailsModalFlag(false);
                                                showSuccessToast("Auction details approved successfully");
                                            } else {
                                                showErrorToast("Please try again")
                                            }
                                        }}
                                    />

                                    &nbsp;&nbsp;

                                    <Buttons
                                        name="Delete"
                                        onClick={async () => {
                                            const response = await deleteAuctionDetails({ propertyId: auctionPropertyId });

                                            if (response?.status === 200) {
                                                setAuctionDetailsModalFlag(false);
                                                showSuccessToast("Auction details deleted successfully");
                                            } else {
                                                showErrorToast("Please try again")
                                            }
                                        }}
                                    />
                                </div>
                            </>
                        ) : (
                            <div
                                className="text-center p-4"
                                style={{
                                    background: "#f8f9fa",
                                    borderRadius: "6px"
                                }}
                            >
                                <Text text="No pending approval details available." />
                            </div>
                        )}
                    </div>

                    <hr />

                    {/* ================= CURRENT APPROVED DETAILS ================= */}
                    <div className="mb-3">
                        <div
                            className="d-flex align-items-center mb-3"
                            style={{
                                padding: "10px 14px",
                                background: "#e8f5e9",
                                borderRadius: "6px",
                                border: "1px solid #c8e6c9"
                            }}
                        >
                            <Text
                                text="Current Approved Details"
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "700"
                                }}
                            />
                        </div>

                        {auctionDetails?.currentApprovedDetails ? (
                            <>
                                <Row className="mb-2">
                                    <Col lg={4} md={5}>
                                        <Text text="Property Address:" />
                                    </Col>
                                    <Col lg={8} md={7}>
                                        <Text
                                            text={
                                                auctionDetails.currentApprovedDetails
                                                    ?.propertyAddress || "-"
                                            }
                                        />
                                    </Col>
                                </Row>

                                <Row className="mb-2">
                                    <Col lg={4} md={5}>
                                        <Text text="Auction Status:" />
                                    </Col>
                                    <Col lg={8} md={7}>
                                        <Text
                                            text={
                                                auctionDetails.currentApprovedDetails
                                                    ?.isUnderAuction
                                                    ? "Under Auction"
                                                    : "Not Under Auction"
                                            }
                                        />
                                    </Col>
                                </Row>

                                <Row className="mb-2">
                                    <Col lg={4} md={5}>
                                        <Text text="Description:" />
                                    </Col>
                                    <Col lg={8} md={7}>
                                        <Text
                                            text={
                                                auctionDetails.currentApprovedDetails
                                                    ?.statusMessage || "-"
                                            }
                                        />
                                    </Col>
                                </Row>

                                {auctionDetails.currentApprovedDetails?.sources?.map(
                                    (source, index) => (
                                        <div
                                            key={index}
                                            className="mt-3"
                                            style={{
                                                padding: "15px",
                                                border: "1px solid #e0e0e0",
                                                borderRadius: "6px"
                                            }}
                                        >
                                            <Row className="mb-2">
                                                    <Col lg={4} md={5}>
                                                        <Text text="Source Name:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        <Text
                                                            text={source?.sourceName || "-"}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mb-2">
                                                    <Col lg={4} md={5}>
                                                        <Text text="Property Type:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        <Text
                                                            text={source?.propertyType || "-"}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mb-2">
                                                    <Col lg={4} md={5}>
                                                        <Text text="Borrower Name:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        <Text
                                                            text={source?.borrowerName || "-"}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mb-2">
                                                    <Col lg={4} md={5}>
                                                        <Text text="Bank Name:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        <Text
                                                            text={source?.bankName || "-"}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mb-2">
                                                    <Col lg={4} md={5}>
                                                        <Text text="Auction Date:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        <Text
                                                            text={source?.auctionDate || "-"}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mb-2">
                                                    <Col lg={4} md={5}>
                                                        <Text text="Bids Starting From:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        <Text
                                                            text={
                                                                source?.bidPriceStartingFrom ||
                                                                "-"
                                                            }
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mb-2">
                                                    <Col lg={4} md={5}>
                                                        <Text text="EMD Amount:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        <Text
                                                            text={source?.emdAmount || "-"}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mb-2">
                                                    <Col lg={4} md={5}>
                                                        <Text text="Application Deadline:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        <Text
                                                            text={
                                                                source?.applicationDeadline ||
                                                                "-"
                                                            }
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mb-2">
                                                    <Col lg={4} md={5}>
                                                        <Text text="Auction Address:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        <Text
                                                            text={source?.auctionAddress || "-"}
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row className="mb-2">
                                                    <Col lg={4} md={5}>
                                                        <Text text="Contact Details:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        <Text
                                                            text={
                                                                source?.contactDetails || "-"
                                                            }
                                                        />
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col lg={4} md={5}>
                                                        <Text text="Source Link:" />
                                                    </Col>
                                                    <Col lg={8} md={7}>
                                                        {source?.sourceLink ? (
                                                            <a
                                                                href={source.sourceLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    wordBreak: "break-all"
                                                                }}
                                                            >
                                                                {source.sourceLink}
                                                            </a>
                                                        ) : (
                                                            <Text text="-" />
                                                        )}
                                                    </Col>
                                                </Row>
                                        </div>
                                    )
                                )}
                            </>
                        ) : (
                            <div
                                className="text-center p-4"
                                style={{
                                    background: "#f8f9fa",
                                    border: "1px dashed #bdbdbd",
                                    borderRadius: "6px"
                                }}
                            >
                                <Text
                                    text="No approved auction details available."
                                    style={{
                                        color: "#757575"
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </Modal.Body>

                <Modal.Footer style={{ justifyContent: "center" }}>

                </Modal.Footer>
            </Modal>

        </>
    )
}

const mapStateToProps = ({ corporateProperty }) => ({
    corporateProperty
})

const actions = {
    getAllCorporateProperties,
    fetchAuctionData,
    approveAuctionDetails,
    deleteAuctionDetails
}

export default compose(connect(mapStateToProps, actions))(CorporateProperty);