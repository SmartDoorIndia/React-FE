import React, { useEffect, useState } from 'react'
import SearchInput from '../../../../shared/Inputs/SearchInput/SearchInput';
import { Checkbox, ListItemText, MenuItem, TextField } from '@mui/material';
import { getAllCityWithId, getCorporateById } from '../../../../common/redux/actions';
import './VisitMISDashboard.scss';
import { DateRangePicker } from 'rsuite';
import CONSTANTS from '../../../../common/helpers/Constants';
import CONSTANTS_STATUS from '../../../../common/helpers/ConstantsStatus';
import { ToolTip } from '../../../../common/helpers/Utils';
import DataTableComponent from '../../../../shared/DataTable/DataTable';
import Text from '../../../../shared/Text/Text';
import Pagination from '../../../../shared/DataTable/Pagination';
import Buttons from '../../../../shared/Buttons/Buttons';

const VisitMISDashboard = () => {

    const [propertyIdText, setPropertyIdText] = useState("");
    const [corporateList, setCorporateList] = useState([]);
    const [selectedCorporate, setSelectedCorporate] = useState([]);
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const recordSize = (0);
    const visitStatus = CONSTANTS_STATUS.visitStatus;
    const [selectedVisitStatus, setSelectedVisitStatus] = useState([]);

    const visitDataColumns = [
        {
            name: "PropertyId",
            selector: (row) => row.id,
            sortable: true,
            center: false,
            maxWidth: "250px",
            cell: ({ propertyId }) => (
                <ToolTip position="top" style={{ width: "100%" }} name={propertyId}>
                    <Text size="Small" color="secondryColor elipsis-text" text={propertyId} />
                </ToolTip>
            ),
            id: 1,
        },
        {
            name: "Corporate",
            selector: (row) => row.companyName,
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ companyName }) => (
                <ToolTip position="top" style={{ width: "100%" }} name={companyName}>
                    <Text size="Small" color="secondryColor elipsis-text" text={companyName} />
                </ToolTip>
            ),
            id: 2,
        },
        {
            name: "Loan Acc No.",
            selector: (row) => row.loanAccountNumber,
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ loanAccountNumber }) => (
                <ToolTip position="top" style={{ width: "100%" }} name={loanAccountNumber}>
                    <Text size="Small" color="secondryColor elipsis-text" text={loanAccountNumber} />
                </ToolTip>
            ),
            id: 3,
        },
        {
            name: "Property Address",
            selector: (row) => row.propertyAddress,
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ propertyAddress }) => (
                <ToolTip position="top" style={{ width: "100%" }} name={propertyAddress}>
                    <Text size="Small" color="secondryColor elipsis-text" text={propertyAddress} />
                </ToolTip>
            ),
            id: 4,
        },
        {
            name: "Date Time Of Visit",
            selector: (row) => row.visitDate,
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ visitDate }) => (
                <ToolTip position="top" style={{ width: "100%" }} name={visitDate}>
                    <Text size="Small" color="secondryColor elipsis-text" text={visitDate} />
                </ToolTip>
            ),
            id: 5,
        },
        {
            name: "Visit Type",
            selector: (row) => row.visitType,
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ visitType }) => (
                <ToolTip position="top" style={{ width: "100%" }} name={visitType}>
                    <Text size="Small" color="secondryColor elipsis-text" text={visitType} />
                </ToolTip>
            ),
            id: 6,
        },
        {
            name: "Visitor Name",
            selector: (row) => row.visitorName,
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ visitorName }) => (
                <ToolTip position="top" style={{ width: "100%" }} name={visitorName}>
                    <Text size="Small" color="secondryColor elipsis-text" text={visitorName} />
                </ToolTip>
            ),
            id: 7,
        },
        {
            name: "Visitor Mobile",
            selector: (row) => row.visitorMobile,
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ visitorMobile }) => (
                <ToolTip position="top" style={{ width: "100%" }} name={visitorMobile}>
                    <Text size="Small" color="secondryColor elipsis-text" text={visitorMobile} />
                </ToolTip>
            ),
            id: 8,
        },
        {
            name: "Visitor Address",
            selector: (row) => row.visitorAddress,
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ visitorAddress }) => (
                <ToolTip position="top" style={{ width: "100%" }} name={visitorAddress}>
                    <Text size="Small" color="secondryColor elipsis-text" text={visitorAddress} />
                </ToolTip>
            ),
            id: 9,
        },
        {
            name: "Intrusion Video Count",
            selector: (row) => row.intrusionVideoCount,
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ intrusionVideoCount }) => (
                <ToolTip position="top" style={{ width: "100%" }} name={intrusionVideoCount}>
                    <Text size="Small" color="secondryColor elipsis-text" text={intrusionVideoCount} />
                </ToolTip>
            ),
            id: 10,
        },
        {
            name: "Visit Video Count",
            selector: (row) => row.visitVideoCount,
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ visitVideoCount }) => (
                <ToolTip position="top" style={{ width: "100%" }} name={visitVideoCount}>
                    <Text size="Small" color="secondryColor elipsis-text" text={visitVideoCount} />
                </ToolTip>
            ),
            id: 11,
        },
        {
            name: "Intrusion Image Count",
            selector: (row) => row.intrusionImageCount,
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ intrusionImageCount }) => (
                <ToolTip position="top" style={{ width: "100%" }} name={intrusionImageCount}>
                    <Text size="Small" color="secondryColor elipsis-text" text={intrusionImageCount} />
                </ToolTip>
            ),
            id: 12,
        },
        {
            name: "Visit Image Count",
            selector: (row) => row.visitImageCount,
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ visitImageCount }) => (
                <ToolTip position="top" style={{ width: "100%" }} name={visitImageCount}>
                    <Text size="Small" color="secondryColor elipsis-text" text={visitImageCount} />
                </ToolTip>
            ),
            id: 13,
        },
        {
            name: "Visit Request Creation Date",
            selector: (row) => row.visitcreateDate,
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ visitcreateDate }) => (
                <ToolTip position="top" style={{ width: "100%" }} name={visitcreateDate}>
                    <Text size="Small" color="secondryColor elipsis-text" text={visitcreateDate} />
                </ToolTip>
            ),
            id: 14,
        },
        {
            name: "Visit Request Status",
            selector: (row) => row.visitRequestStatus,
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ visitRequestStatus }) => (
                <ToolTip position="top" style={{ width: "100%" }} name={visitRequestStatus}>
                    <Text size="Small" color="secondryColor elipsis-text" text={visitRequestStatus} />
                </ToolTip>
            ),
            id: 15,
        },
        {
            name: "Property Owner",
            selector: (row) => row.propertyOwner,
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ propertyOwner }) => (
                <ToolTip position="top" style={{ width: "100%" }} name={propertyOwner}>
                    <Text size="Small" color="secondryColor elipsis-text" text={propertyOwner} />
                </ToolTip>
            ),
            id: 16,
        },
        {
            name: "Visit Rating",
            selector: (row) => row.ratings,
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ ratings }) => (
                <ToolTip position="top" style={{ width: "100%" }} name={ratings}>
                    <Text size="Small" color="secondryColor elipsis-text" text={ratings} />
                </ToolTip>
            ),
            id: 17,
        },
        {
            name: "Visit Feedback",
            selector: (row) => row.visitFeedback,
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ visitFeedback }) => (
                <ToolTip position="top" style={{ width: "100%" }} name={visitFeedback}>
                    <Text size="Small" color="secondryColor elipsis-text" text={visitFeedback} />
                </ToolTip>
            ),
            id: 18,
        }
    ]
    const getCorprateList = async () => {
        try {
            const response = await getCorporateById({
                corporateId: 0,
                pageNo: 1,
                pageSize: 8,
            });
            if (response?.status === 200) {
                const trimmedData = response?.data?.resourceData?.map(
                    ({ corporateId, companyName }) => ({
                        corporateId,
                        companyName,
                    })
                );

                setCorporateList(trimmedData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllCityWithId({ smartdoorServiceStatus: true, stateId: null });
        getCorprateList();
    }, []);

    const handleDateRangeChange = (date) => {
        if (date && date[0] && date[1]) {
            const startDt = date[0];
            const endDt = date[1];
            setStartDate(startDt);
            setEndDate(endDt);
        }
    }

    const propertyIdBox = React.useMemo(() => {
        const handleClear = () => {
            if (propertyIdText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setPropertyIdText(null);
            }
        };

        return (
            <SearchInput
                id={"propertyId"}
                placeholder={"Search Property id"}
                textType={"number"}
                value={propertyIdText}
                onFilter={(e) => setPropertyIdText(e.target.value)}
                onClear={() => {
                    handleClear();
                }}
                filterText={propertyIdText}
            />
        );
    }, [propertyIdText, resetPaginationToggle]);

    const handlePageChange = (newPage) => {

    }

    const handleRowsPerPageChange = (newRowsPerPage) => {

    }

    let PaginationComponent = ({ onChangePage, onChangeRowsPerPage, ...props }) => (
        <Pagination
            {...props}
            rowCount={recordSize}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleRowsPerPageChange}
            currentPage={currentPage}
            onChangePage={handlePageChange}
            paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
        />
    );

    return (
        <>
            <div className='tableBox'>
                <div className="align-items-center tableHeading">
                    <div className="locationSelect d-flex" style={{ justifyContent: 'end' }}>
                        {propertyIdBox}
                        <TextField
                            hiddenLabel
                            size="small"
                            className="form-control1"
                            select
                            placeholder="Select Corporate(s)"
                            SelectProps={{
                                multiple: true,
                                displayEmpty: true,
                                renderValue: (selected) => {
                                    const text = selected.length
                                        ? corporateList
                                            .filter((c) => selected.includes(c.corporateId))
                                            .map((c) => c.companyName)
                                            .join(", ")
                                        : "Select Corporate(s)";

                                    return React.createElement(
                                        "span",
                                        { className: "select-ellipsis" },
                                        text
                                    );
                                },
                            }}
                            value={selectedCorporate}
                            onChange={(e) => setSelectedCorporate(e.target.value)}
                            variant="outlined"
                            sx={{
                                width: "40%",

                                "&.MuiFormControl-root": {
                                    margin: 0,
                                    height: "fit-content",
                                },

                                "& .MuiFormHelperText-root": {
                                    display: "none",
                                },
                                "& .MuiOutlinedInput-root": {
                                    height: "30px",
                                    padding: "0 8px",
                                    borderRadius: "4px",
                                    backgroundColor: "#F8F3F5",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    display: "flex",
                                    alignItems: "center",
                                    fontFamily: "inherit",
                                    color: "#495057",
                                    boxSizing: "border-box",
                                    "& fieldset": {
                                        border: "1px solid #ced4da",
                                    },
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid #ced4da",
                                },
                                "& .MuiSelect-select": {
                                    padding: "0 !important",
                                    height: "30px",
                                    display: "flex",
                                    alignItems: "center",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                },

                                "& .MuiSelect-icon": {
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                },

                                "& .select-ellipsis": {
                                    display: "block",
                                    maxWidth: "calc(100% - 24px)", // 👈 icon width
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                },
                            }}
                        >
                            {corporateList.map((corporate, index) => (
                                <MenuItem key={index} value={corporate.corporateId} sx={{ height: 32 }}>
                                    <Checkbox
                                        size="small"
                                        checked={selectedCorporate.includes(corporate.corporateId)}
                                    />
                                    <ListItemText
                                        primary={corporate.companyName}
                                        primaryTypographyProps={{ fontSize: "12px" }}
                                    />
                                </MenuItem>
                            ))}
                        </TextField> &nbsp;&nbsp;
                        <TextField
                            hiddenLabel
                            size="small"
                            className="form-control1"
                            select
                            placeholder="Select Status(s)"
                            SelectProps={{
                                multiple: true,
                                displayEmpty: true,
                                renderValue: (selected) => {
                                    const text = selected.length
                                        ? visitStatus
                                            .filter((s) => selected.includes(s))
                                            .map((s) => s)
                                            .join(", ")
                                        : "Select Status(s)";

                                    return React.createElement(
                                        "span",
                                        { className: "select-ellipsis" },
                                        text
                                    );
                                },
                            }}
                            value={selectedVisitStatus}
                            onChange={(e) => setSelectedVisitStatus(e.target.value)}
                            variant="outlined"
                            sx={{
                                width: "30%",

                                "&.MuiFormControl-root": {
                                    margin: 0,
                                    height: "fit-content",
                                },

                                "& .MuiFormHelperText-root": {
                                    display: "none",
                                },
                                "& .MuiOutlinedInput-root": {
                                    height: "30px",
                                    padding: "0 8px",
                                    borderRadius: "4px",
                                    backgroundColor: "#F8F3F5",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    display: "flex",
                                    alignItems: "center",
                                    fontFamily: "inherit",
                                    color: "#495057",
                                    boxSizing: "border-box",
                                    "& fieldset": {
                                        border: "1px solid #ced4da",
                                    },
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid #ced4da",
                                },
                                "& .MuiSelect-select": {
                                    padding: "0 !important",
                                    height: "30px",
                                    display: "flex",
                                    alignItems: "center",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                },

                                "& .MuiSelect-icon": {
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                },
                                "& .select-ellipsis": {
                                    display: "block",
                                    maxWidth: "calc(100% - 24px)", // 👈 icon width
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                },
                            }}
                        >
                            {visitStatus.map((status, index) => (
                                <MenuItem key={index} value={status} sx={{ height: 32 }}>
                                    <Checkbox size="small" checked={selectedVisitStatus.includes(status)} />
                                    <ListItemText
                                        primary={status}
                                        primaryTypographyProps={{ fontSize: "12px" }}
                                    />
                                </MenuItem>
                            ))}
                        </TextField> &nbsp;&nbsp;
                        <DateRangePicker
                            className='datepicker'
                            style={{
                                width: "249px",
                                height: "20px",
                                color: "darkgray"
                            }}
                            defaultCalendarValue={[startDate, endDate]}
                            onChange={handleDateRangeChange}
                        />
                        <Buttons name="Search" />
                    </div>
                </div>
                <div className='visitTableWrapper'>
                    <DataTableComponent
                        data={[]}
                        columns={visitDataColumns}
                        persistTableHead
                        paginationServer={true}
                        paginationPerPage={rowsPerPage}
                        currentPage={currentPage}
                        paginationComponent={PaginationComponent}
                        paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handleRowsPerPageChange}
                        perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                    />
                </div>
            </div>
        </>
    )
}

export default VisitMISDashboard