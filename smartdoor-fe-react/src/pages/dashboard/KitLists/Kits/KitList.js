import React, { useEffect, useState } from "react";
import { getHubList, getKitList } from "../../../../common/redux/actions";
import { compose } from "redux";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import './KitList.scss';
import { ToolTip } from "../../../../common/helpers/Utils";
import Text from "../../../../shared/Text/Text";
import Image from "../../../../shared/Image";
import contentIco from '../../../../assets/images/content-ico.svg';
import DataTableComponent from '../../../../shared/DataTable/DataTable';
import { TableLoader } from "../../../../common/helpers/Loader";
import Pagination from "../../../../shared/DataTable/Pagination";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SearchInput from "../../../../shared/Inputs/SearchInput/SearchInput";

const KitList = (props) => {
    const { allHubList, getHubList, allKitList, getKitList } = props;
    const [hub, setHub] = useState('');
    const history = useHistory();

    const [filterText, setFilterText] = React.useState(null);
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(8);

    let recordSize = 0;

    const ProgressComponent = <TableLoader />;

    const kitColumns = [
        {
            name: "Kit Id",
            selector: ((row) => row.kitId),
            sortable: true,
            center: true,
            minWidth: "150px",
            cell: ({ kitId }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={kitId}>
                    <Text size="Small" color="secondryColor elipsis-text" text={kitId} />
                </ToolTip>
            ),
            id: 1
        },
        {
            name: "Hub",
            selector: ((row) => row.hubname),
            sortable: false,
            center: true,
            minWidth: "200px",
            style: { padding: "0 !important" },
            cell: ({ hubname }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={hubname}>
                    <Text size="Small" color="secondryColor elipsis-text" text={hubname || '-'} />
                </ToolTip>
            ),
            id: 2
        },
        {
            name: "Action",
            sortable: false,
            center: true,
            maxWidth: "150px",
            cell: ({ kitId }) => (
                <div className="action" style={{ cursor: 'pointer' }} >
                    <ToolTip position="left" name="View Details">
                        <span>
                            <Image name="editIcon" src={contentIco} onClick={() => {
                                history.push('/admin/kit-list/kit-devices', { kitId: kitId });
                            }} />
                        </span>
                    </ToolTip>
                </div>
            ),
        },
    ];

    let PaginationComponent = ({ onChangePage, onChangeRowsPerPage, ...props }) => (
        <Pagination {...props}
            rowCount={allHubList?.data?.hubList?.length}
            rowsPerPage={rowsPerPage}
            // onChangeRowsPerPage={handleRowsPerPageChange}
            currentPage={currentPage}
            // onChangePage={handlePageChange}
            paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]} />
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
                }}
                onClear={() => handleClear}
                filterText={filterText}
                placeholder="Search KitId"
            />
        );
    }, [filterText, resetPaginationToggle]);

    useEffect(() => {
        getHubList();
        getKitList({ propertyId: 0 });
    }, []);

    const showData = () => {
        if (!allKitList?.data?.kitList?.length) {
            return [];
        }
        const filteredItems = allKitList?.data?.kitList?.filter((element) => {
            const matchesHub = hub ? element.hubname?.trim().toLowerCase() === hub?.trim().toLowerCase() : true;
            const matchesKitId = filterText ? element.kitId === Number(filterText) : true;
            return matchesHub && matchesKitId;
        });
        return filteredItems;
    };
    

    return (
        <>
            <div className="tableBox ">
                <div className="align-items-center tableHeading">
                    <div className="locationSelect d-flex mt-2" style={{fontSize:'20px', fontWeight:'800' }} >
                        <Text text="Installed Kits" style={{fontSize:'20px', fontWeight:'800'}} ></Text>
                        <div className="d-flex">
                            {subHeaderComponentMemo}
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Control
                                    as="select"
                                    onChange={(e) => {
                                        setHub(e.target.value)
                                    }}
                                    value={hub}
                                >
                                    <option value="">Select Hub</option>
                                    {allHubList?.data?.hubList?.length > 0
                                        ? allHubList?.data?.hubList?.map((hub) => (
                                            <option key={hub.hubName} value={hub.hubName}>
                                                {hub.hubName}
                                            </option>
                                        ))
                                        : null}
                                </Form.Control>
                            </Form.Group>
                        </div>
                    </div>
                </div>
                <div className="kitListTableWrapper" >
                    <DataTableComponent
                        data={showData()}
                        columns={kitColumns}
                        progressPending={allKitList?.isLoading}
                        progressComponent={ProgressComponent}
                        // paginationComponent={PaginationComponent}
                        // paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                        // paginationPerPage={rowsPerPage}
                        // currentPage={currentPage}
                        // onChangePage={handlePageChange}
                        // onChangeRowsPerPage={handleRowsPerPageChange}
                        // perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                        // paginationServer={true}
                        persistTableHead
                    />
                </div>
            </div>
        </>
    );
}

const mapStateToProps = ({ allHubList, allKitList }) => ({ allHubList, allKitList });
const actions = {
    getHubList,
    getKitList
}

export default compose(connect(mapStateToProps, actions))(KitList);