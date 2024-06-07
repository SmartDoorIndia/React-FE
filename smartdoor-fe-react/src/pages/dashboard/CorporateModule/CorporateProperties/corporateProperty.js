import { compose } from "redux"
import SearchInput from "../../../../shared/Inputs/SearchInput/SearchInput";
import React, { useState } from "react";
import contentIcon from '../../../../assets/images/content-ico.svg';
import DataTableComponent from '../../../../shared/DataTable/DataTable';
import { Link } from "react-router-dom/cjs/react-router-dom";
import Image from "../../../../shared/Image";
import { ToolTip } from "../../../../common/helpers/Utils";
import Text from "../../../../shared/Text/Text";
import './corporateProperty.scss';

const CorporateProperty = () => {

    const propertyColumns = [
        {
            name: "ID",
            selector: ((row) => row.id),
            sortable: false,
            center: false,
            maxWidth: "150px",
            cell: ({ logo }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={logo}>

                </ToolTip>
            ),
            id: 1
        },
        {
            name: "Added On",
            selector: ((row) => row.addedOn),
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ addedOn }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={addedOn}>
                    <Text size="Small" color="secondryColor elipsis-text" text={addedOn} />
                </ToolTip>
            ),
            id: 2
        },
        {
            name: "Delisted On",
            selector: ((row) => row.delistedOn),
            sortable: false,
            center: false,
            maxWidth: "150px",
            cell: ({ delistedOn }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={delistedOn}>
                    <Text size="Small" color="secondryColor elipsis-text" text={delistedOn} />
                </ToolTip>
            ),
            id: 3
        },
        {
            name: "User",
            selector: ((row) => row.user),
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ user }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={user}>
                    <Text size="Small" color="secondryColor elipsis-text" text={user} />
                </ToolTip>
            ),
            id: 4
        },
        {
            name: "Property",
            selector: ((row) => row.property),
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ property }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={property}>
                    <Text size="Small" color="secondryColor elipsis-text" text={property} />
                </ToolTip>
            ),
            id: 5
        },
        {
            name: "City",
            selector: ((row) => row.city),
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ city }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={city}>
                    <Text size="Small" color="secondryColor elipsis-text" text={city} />
                </ToolTip>
            ),
            id: 6
        },
        {
            name: "Property Type",
            selector: ((row) => row.city),
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ city }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={city}>
                    <Text size="Small" color="secondryColor elipsis-text" text={city} />
                </ToolTip>
            ),
            id: 6
        },
        {
            name: "Status",
            selector: ((row) => row.city),
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ city }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={city}>
                    <Text size="Small" color="secondryColor elipsis-text" text={city} />
                </ToolTip>
            ),
            id: 6
        },
        {
            name: "Action",
            sortable: false,
            center: true,
            maxWidth: "40px",
            cell: ({ row, postedById }) => (
                <div className="action">
                    <ToolTip position="left" name="View Details">
                        <span>
                            <Link
                                to={{
                                    pathname: "/admin/property/property-details",
                                    state: {},
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
                placeholder="Search name/mobile No."
            />
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <>
            <div className="tableBox">
                <div className="tableHeading">
                    <div className="locationSelect d-flex justify-content-between align-items-end text-start">
                        <Text text={'Properties Posted'} style={{ fontSize: '20px', fontWeight:'700' }} />
                        {subHeaderComponentMemo}
                    </div>
                </div>
                <div className="corporateTableWrapper">
                    <DataTableComponent
                        data={[]}
                        columns={propertyColumns}
                        // progressPending={allPropertyData.isLoading}
                        // progressComponent={ProgressComponent}
                        // paginationComponent={PaginationComponent}
                        paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                        // paginationPerPage={recordsPerPage}
                        // currentPage={currentPage}
                        // onChangePage={handlePageChange}
                        // onChangeRowsPerPage={handleRowsPerPageChange}
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

export default compose(CorporateProperty);