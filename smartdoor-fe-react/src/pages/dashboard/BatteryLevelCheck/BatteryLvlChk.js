import { Card } from "react-bootstrap";
import { compose } from "redux"
import Text from "../../../shared/Text/Text";
import Buttons from "../../../shared/Buttons/Buttons";
import DataTableComponent from '../../../../src/shared/DataTable/DataTable';
import './BatteryLvlChk.scss';
import { TableLoader } from "../../../common/helpers/Loader";
import { useCallback, useEffect, useState } from "react";
import Pagination from "../../../shared/DataTable/Pagination";
import { connect } from "react-redux";
import { getBatteryLevel } from "../../../common/redux/actions";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { formateDate } from "../../../common/helpers/Utils";

const BatteryLvlChk = (props) => {
    const { batteryLevel, getBatteryLevel } = props;
    const ProgressComponent = <TableLoader />;
    const [currentPage, setCurrentPage] = useState(batteryLevel?.data?.currentPage || 1);
    const [rowsPerPage, setRowsPerPage] = useState(batteryLevel?.data?.rowsPerPage || 100);
    const recordSize = batteryLevel?.data?.records;

    const batteryColumns = [
        {
            name: 'Camera Id',
            selector: ((row) => row.uuId),
            center: true,
            sortable: false,
            minWidth: '180px',
            cell: (({ uuId }) => (<><span>{uuId}</span></>))
        },
        {
            name: 'Battery %',
            selector: ((row) => row.battryPercentage),
            center: true,
            sortable: false,
            cell: (({ battryPercentage }) => (<><span>{battryPercentage !== null ? <>{battryPercentage}%</> : <>{'-'}</>}</span></>))
        },
        {
            name: 'Battery Check Date',
            selector: ((row) => row.lastBatteryCheckDate),
            center: true,
            sortable: false,
            cell: (({ lastBatteryCheckDate }) => (<><span>{formateDate(lastBatteryCheckDate, 'DD-MM-yyyy hh:mm:ss A')}</span></>))
        },
        {
            name: 'View Property',
            selector: ((row) => row.propertyId),
            center: true,
            sortable: false,
            cell: (({ propertyId, postedById }) => (<><div className="">
                <span>
                    <Link
                        to={{
                            pathname:
                                `/admin/batteryLevelCheck/viewProperty`,
                            state: { propertyId: propertyId, userId: postedById, menuName: '' }
                        }}
                    >
                        View
                    </Link>
                </span>
            </div></>))
        },
    ]

    const _getBatteryLvlChk = useCallback(async () => {
        await getBatteryLevel();
    }, [getBatteryLevel]);

    useEffect(async () => {
        await _getBatteryLvlChk();
    }, [getBatteryLevel]);

    const handlePageChange = (newPage) => {

    }

    const handleRowsPerPageChange = (newRowsPerPage) => {

    }

    let PaginationComponent = ({ onChangePage, onChangeRowsPerPage, ...props }) => (
        <Pagination {...props}
            rowCount={recordSize}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleRowsPerPageChange}
            currentPage={currentPage}
            onChangePage={handlePageChange}
            paginationRowsPerPageOptions={[100, 200, 300]}
        />
    );

    const showData = () => {
        return batteryLevel?.data?.batteryLevelList;
    }
    return (
        <>
            <div className="tableBox">
                <Text text={'This data will be updated everyday at 7:30 AM'} fontWeight={'700'} style={{ fontSize: '16px' }} />
                <div className="batteryTableWrapper">
                    <DataTableComponent
                        progressPending={batteryLevel.isLoading}
                        data={showData()}
                        columns={batteryColumns}
                        persistTableHead
                        progressComponent={ProgressComponent}
                        paginationRowsPerPageOptions={[100, 200, 300]}
                        perPageOptions={[100, 200, 300]}
                        paginationPerPage={100}
                        currentPage={currentPage}
                        rowsPerPage={rowsPerPage}
                        paginationServer={true}
                        paginationComponent={PaginationComponent}
                    >
                    </DataTableComponent>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = ({ batteryLevel }) => ({ batteryLevel });

const actions = {
    getBatteryLevel
};

export default compose(connect(mapStateToProps, actions))(BatteryLvlChk);