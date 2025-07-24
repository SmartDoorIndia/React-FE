import React, { useEffect, useRef, useState } from 'react'
import { formateDate, getLocalStorage, handleStatusElement, ToolTip } from '../../../../common/helpers/Utils'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import contentIcon from '../../../../assets/images/content-ico.png';
import Image from '../../../../shared/Image/Image';
import { TableLoader } from '../../../../common/helpers/Loader';
import Pagination from '../../../../shared/DataTable/Pagination';
import DataTableComponent from '../../../../shared/DataTable/DataTable';
import SearchInput from '../../../../shared/Inputs/SearchInput/SearchInput';
import './builderList.scss';
import { Button } from 'react-bootstrap';
import Text from '../../../../shared/Text/Text';
import { getBuilderList } from '../../../../common/redux/actions';

const BuilderList = () => {

    const tableRef = useRef();
    const history = useHistory();

    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const [filterText, setFilterText] = React.useState("");
    const [builderList, setBuilderList] = useState([]);
    const [loading, setLoading] = useState(false);
    const userData = getLocalStorage("authData");

    const builderColumns = [
        {
            name: "Builders",
            selector: ((row) => row.brandName),
            sortable: true,
            center: false,
            minWidth: "150px",
            style: { paddingLeft: "2% !important" },
            cell: ({ brandName }) => <span>{brandName || "N/A"}</span>,
            id: 1
        },
        {
            name: "Contact Person",
            selector: ((row) => row.contactPersonName),
            sortable: false,
            center: false,
            maxWidth: "150px",
            style: { paddingLeft: "2% !important" },
            cell: ({ contactPersonName }) => <span>{contactPersonName || "N/A"}</span>,
            id: 2
        },
        {
            name: "Mobile Number",
            selector: ((row) => row.mobileNumber),
            sortable: false,
            center: true,
            maxWidth: "150px",
            style: { padding: "0 !important" },
            cell: ({ mobileNumber }) => <span>{mobileNumber || "N/A"}</span>,
            id: 3
        },
        {
            name: "Projects",
            selector: ((row) => row.totalProjectCount),
            sortable: true,
            center: true,
            maxWidth: "150px",
            style: { padding: "0 !important" },
            cell: ({ totalProjectCount }) => <span>{totalProjectCount || "0"}</span>,
            id: 4
        },
        {
            name: "last Updated On",
            selector: ((row) => row.last_updated),
            sortable: false,
            center: true,
            maxWidth: "150px",
            style: { padding: "0 !important" },
            cell: ({ last_updated }) => <span>{`${formateDate(last_updated, "MMM DD, YYYY")}` || "N/A"}</span>,
            id: 5
        },
        {
            name: "Leads",
            selector: ((row) => row.leads),
            sortable: true,
            center: true,
            maxWidth: "150px",
            style: { padding: "0 !important" },
            cell: ({ leads }) => <span>{leads || "0"}</span>,
            id: 6
        },
        {
            name: "Status",
            selector: ((row) => row.status),
            sortable: true,
            center: true,
            maxWidth: "150px",
            style: { padding: "0 !important" },
            cell: ({ status }) => <span>{handleStatusElement(status)}</span>,
            id: 7
        },
        {
            name: "Action",
            selector: ((row) => row.action),
            sortable: false,
            center: true,
            maxWidth: "150px",
            style: { padding: "0 !important" },
            cell: ({ row, builderId, userId }) => (
                <>
                    <div className="action">
                        <ToolTip position="left" name="View Details">
                            <span>
                                <Link
                                    to={{
                                        pathname: "/admin/builders/builder-details",
                                        state: { builderId: builderId, userId: userId, builderDetails: row },
                                    }}
                                >
                                    <Image name="editIcon" src={contentIcon} />
                                </Link>
                            </span>
                        </ToolTip>
                    </div>
                </>
            ),
            id: 8
        },
    ];

    const ProgressComponent = <TableLoader />;
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const recordSize = (0);
    console.log(recordSize)
    let recordsPerPage = 0

    const handlePageChange = () => { }
    const handleRowsPerPageChange = () => { }

    let PaginationComponent = ({ onChangePage, onChangeRowsPerPage, ...props }) => (
        <Pagination {...props}
            rowCount={recordSize}
            rowsPerPage={recordsPerPage}
            onChangeRowsPerPage={handleRowsPerPageChange}
            currentPage={currentPage}
            onChangePage={handlePageChange}
            paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
        />
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
                onFilter={(e) => {
                    setFilterText(e.target.value);
                    getBuilderList({ searchStr: e.target.value })
                        .then((response) => {
                            setLoading(false)
                            console.log(response)
                            setBuilderList([...response.data.resourceData]);
                        })
                }}
                onClear={() => handleClear}
                filterText={filterText}
                placeholder="Search owner name/mobile No."
            />
        );
    }, [filterText, resetPaginationToggle]);

    useEffect(() => {
        if(!userData?.roleName === 'SUPER ADMIN') {
            history.push("/builder/login");
        }
        setLoading(true)
        getBuilderList({ searchStr: filterText })
            .then((response) => {
                setLoading(false)
                console.log(response)
                setBuilderList([...response.data.resourceData]);
            })
    }, []);

    return (
        <>
            <div className="tableBox ">
                {/* <div className="align-items-center tableHeading">
                    <div className="d-flex justify-content-end">
                        <div className="locationSelect d-flex">
                            {subHeaderComponentMemo}
                            <Button className="d-flex py-1" style={{ color: '#BE1452', backgroundColor: '#F8F3F5', borderColor: '#DED6D9' }}
                                onClick={() => { history.push('/admin/builders/builder-profile'); }} >
                                <Text text={' + Add New Builder'} fontWeight='bold' style={{ fontSize: '12px', color: '#BE1452' }} />
                            </Button>
                        </div>
                    </div>
                </div> */}
                <div className="builderListTableWrapper">
                    <DataTableComponent ref={tableRef}
                        data={builderList}
                        columns={builderColumns}
                        progressPending={loading}
                        progressComponent={ProgressComponent}
                        // paginationComponent={PaginationComponent}
                        // paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                        // paginationPerPage={recordsPerPage}
                        // currentPage={currentPage}
                        // onChangePage={handlePageChange}
                        // onChangeRowsPerPage={handleRowsPerPageChange}
                        // perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                        filterText={filterText}
                        paginationServer={false}
                        pagination={false}
                        subHeaderComponent={subHeaderComponentMemo}
                        persistTableHead
                        filterComponent={subHeaderComponentMemo}
                    // onSort={handleSortedData}
                    //   defaultSort={defaultSort}
                    //   defaultSortId={defaultSortId}
                    //   defaultSortFieldId={defaultSortFieldId}
                    />
                </div>
            </div>
        </>
    )
}

export default BuilderList