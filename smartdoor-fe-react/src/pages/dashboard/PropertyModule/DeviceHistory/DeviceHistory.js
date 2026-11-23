/** @format */
import React, { useEffect, useState } from 'react'
import {
    ToolTip,
    formateDate,
    formateDateTime,
    handleStatusElement,
} from "../../../../common/helpers/Utils";
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import Text from '../../../../shared/Text/Text';
import { getDeviceHistory } from '../../../../common/redux/actions';

const DeviceHistory = (props) => {

    const { propertyId } = props;
    const [cameraHistoryList, setCameraHistoryList] = useState([]);
    const [smartlockHistoryList, setSmartlockHistoryList] = useState([]);
    const [cameraLoading, setCameraLoading] = useState(true);
    const [smartlockLoading, setSmartlockLoading] = useState(true);

    const smartlockColumns = [
        {
            name: "Id",
            selector: ((row) => row.id),
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ id }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={id}>
                    <Text size="Small" color="secondryColor elipsis-text" text={id} />
                </ToolTip>
            ),
            id: 1
        },
        {
            name: "LockId",
            selector: ((row) => row.lockId),
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ lockId }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={lockId}>
                    <Text size="Small" color="secondryColor elipsis-text" text={lockId} />
                </ToolTip>
            ),
            id: 2
        },
        {
            name: "Lock Type",
            selector: ((row) => row.smartlockType),
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ smartlockType }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={smartlockType}>
                    <Text size="Small" color="secondryColor elipsis-text" text={smartlockType} />
                </ToolTip>
            ),
            id: 3
        },
        {
            name: "Status",
            selector: ((row) => row.status),
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ status }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={status}>
                    <span>{handleStatusElement(status)}</span>
                </ToolTip>
            ),
            id: 3
        },
        {
            name: "Lock Type",
            selector: ((row) => row.smartlockType),
            sortable: true,
            center: false,
            maxWidth: "150px",
            cell: ({ smartlockType }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={smartlockType}>
                    <Text size="Small" color="secondryColor elipsis-text" text={smartlockType} />
                </ToolTip>
            ),
            id: 4
        },
    ]

    const cameraColumns = [
        {
            name: "ID",
            selector: ((row) => row.cameraDeviceId),
            sortable: true,
            center: false,
            minWidth: "150px",
            cell: ({ cameraDeviceId }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={cameraDeviceId}>
                    <Text size="Small" color="secondryColor elipsis-text" text={cameraDeviceId} />
                </ToolTip>
            ),
            id: 1
        },
        {
            name: "UUID",
            selector: ((row) => row.uuId),
            sortable: true,
            center: false,
            minWidth: "200px",
            cell: ({ uuId }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={uuId}>
                    <Text size="Small" color="secondryColor elipsis-text" text={uuId} />
                </ToolTip>
            ),
            id: 2
        },
        {
            name: "Camera Type",
            selector: ((row) => row.cameraType),
            sortable: true,
            center: false,
            minWidth: "150px",
            cell: ({ cameraType }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={cameraType || "-"}>
                    <Text size="Small" color="secondryColor elipsis-text" text={cameraType || "-"} />
                </ToolTip>
            ),
            id: 3
        },
        {
            name: "Sub Type",
            selector: ((row) => row.cameraSubType),
            sortable: false,
            center: false,
            minWidth: "160px",
            cell: ({ cameraSubType }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={cameraSubType || "-"}>
                    <Text size="Small" color="secondryColor elipsis-text" text={cameraSubType || "-"} />
                </ToolTip>
            ),
            id: 4
        },
        {
            name: "Username",
            selector: ((row) => row.username),
            sortable: false,
            center: false,
            maxWidth: "150px",
            cell: ({ username }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={username || "-"}>
                    <Text size="Small" color="secondryColor elipsis-text" text={username || "-"} />
                </ToolTip>
            ),
            id: 5
        },
        // {
        //     name: "Battery",
        //     selector: ((row) => row.battery),
        //     sortable: true,
        //     center: false,
        //     maxWidth: "150px",
        //     cell: ({ battery }) => (
        //         <ToolTip position="top" style={{ width: '100%' }} name={battery}>
        //             <Text size="Small" color="secondryColor elipsis-text" text={battery} />
        //         </ToolTip>
        //     ),
        //     id: 6
        // },
        // {
        //     name: "Last Battery Chk. Date",
        //     selector: (row) => row.lastBatteryCheckDate,
        //     sortable: true,
        //     minWidth: "200px",
        //     cell: ({ lastBatteryCheckDate }) => (
        //         <ToolTip position="top" style={{ width: '100%' }} name={lastBatteryCheckDate}>
        //             <Text
        //                 size="Small"
        //                 color="secondryColor elipsis-text"
        //                 text={formateDateTime(lastBatteryCheckDate)}
        //             />
        //         </ToolTip>
        //     ),
        //     id: 7
        // },
        // {
        //     name: "Status",
        //     selector: ((row) => row.status),
        //     sortable: false,
        //     center: false,
        //     minWidth: "150px",
        //     cell: ({ status }) => (
        //         <ToolTip position="top" style={{ width: '100%' }} name={status}>
        //             <span>{handleStatusElement(status)}</span>
        //         </ToolTip>
        //     ),
        //     id: 8
        // },
    ]

    useEffect(() => {
        const fetchHistory = async (deviceType, setList, setLoading) => {
            setLoading(true);
            try {
                const response = await getDeviceHistory({ propertyId: propertyId, deviceType });
                if (response?.status === 200) {
                    setList(response?.data?.resourceData || []);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchHistory('SMARTLOCK', setSmartlockHistoryList, setSmartlockLoading);
        fetchHistory('CAMERA', setCameraHistoryList, setCameraLoading);
    }, [propertyId]);

    return (
        <>
            <div className="whiteBg" >
                <h6 className="fw-bold mb-2 px-2 pt-2">Smartlock History</h6>
                <DataTableComponent
                    columns={smartlockColumns}
                    data={smartlockHistoryList}
                    progressPending={smartlockLoading}
                    paginationServer={true}
                />

                <h6 className="fw-bold mt-4 mb-2 px-2">Camera History</h6>
                <DataTableComponent
                    columns={cameraColumns}
                    data={cameraHistoryList}
                    progressPending={cameraLoading}
                    paginationServer={true}
                />
            </div>
        </>
    )
}

export default DeviceHistory;