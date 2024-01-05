import { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { getSmartLockData, getContactSensor, getCameraDevice } from "../../../../common/redux/actions";
import { showErrorToast } from "../../../../common/helpers/Utils";
import Text from "../../../../shared/Text/Text";
import Buttons from "../../../../shared/Buttons/Buttons";
import ListingDataTable from "../../../../shared/DataTable/ListingDataTable";
import { Divider, TextField } from "@mui/material";
import TextArea from "../../../../shared/Inputs/TextArea/TextArea";

const PropertyDevice = (props) => {

    const propertyId =
        props.location.state.propertyId ?
            props.location.state.propertyId :
            null
    const userId = props.location.state.userId ?
        props.location.state.userId :
        null
    const [smartLockData, setSmartLockData] = useState([]);
    const [showEditSmartLockData, setShowEditSmartLockData] = useState(false);
    const [selectedSmartLockData, setselectedSmartLockData] = useState({})
    
    const [censorData, setCensorData] = useState([])
    const [showEditCensorData, setShowEditCensorData] = useState(false);
    const [selectedCensorData, setselectedCensorData] = useState({})
    
    const [cameraData, setCameraData] = useState([])
    const [showEditCameraData, setShowEditCameraData] = useState(false);
    const [selectedCameraData, setselectedCameraData] = useState({})

    const _getSmartLockData = useCallback(async () => {
        try {
            const result_data = await getSmartLockData({ id: propertyId });
            console.log(result_data)
            if (result_data.data.status === 200 && result_data.data.resourceData) {
                let data = []
                data.push(result_data.data.resourceData)
                setSmartLockData(data);
                console.log("result_data.data.resourceData:", data);
            }
        } catch (err) {
            showErrorToast("Unexpected Error.");
        }
    }, [propertyId]);

    const _getContactSensor = useCallback(
        async (propertyId) => {
            try {
                console.log(" not a basic plan");
                const result_data = await getContactSensor({ propertyId });
                if (result_data.data.status == 200 && result_data.data.resourceData) {
                    let data = []
                    data.push(result_data.data.resourceData)
                    setCensorData(data);
                    console.log("result_data.data.resourceData: CENSOR:", result_data.data.resourceData);
                }
            } catch (err) {
                showErrorToast("Unexpected Error.");
            }
        },
        [propertyId]
    );

    const _getCameraDevice = useCallback(
        async (propertyid) => {
            try {
                console.log(" not a basic plan");
                const result_data = await getCameraDevice({ propertyid });
                if (result_data.data.status == 200 && result_data.data.resourceData) {
                    let data = []
                    data.push(result_data.data.resourceData)
                    setCameraData(result_data.data.resourceData);
                    console.log("result_data.data.resourceData: Camera:", result_data.data.resourceData);
                }
            } catch (err) {
                showErrorToast("Unexpected Error.");
            }
        },
        [propertyId]
    );

    useEffect(() => {
        _getSmartLockData();
        _getContactSensor(propertyId);
        _getCameraDevice(propertyId)
    }, [propertyId, _getSmartLockData, _getContactSensor, _getCameraDevice])

    const columns = [
        {
            name: 'id',
            selector: 'id',
            center: false,
            maxWidth: '60px',
            center: true,
        },
        {
            name: 'PropertyId',
            selector: 'propertyId',
            maxWidth: '120px',
            center: true,
        },
        // {
        //     name: 'Created On',
        //     selector: 'createdDate',
        //     maxWidth: '180px',
        //     center: true,
        // },
        // {
        //     name: 'Last Modified On',
        //     selector: 'lastModifiedDate',
        //     maxWidth: '180px',
        //     center: true,
        // },
        // {
        //     name: 'is Deleted',
        //     selector: 'deleted',
        //     maxWidth: '60px',
        //     center: true,
        //     cell: ({ deleted }) => (
        //         deleted ?
        //             <Text
        //                 text='Yes' /> :
        //             <Text
        //                 text='No' />

        //     )
        // },
        // {
        //     name: 'Lock mac',
        //     selector: 'lockmac',
        //     maxWidth: '200px',
        //     center: true,
        // },
        // {
        //     name: 'Lock Data',
        //     selector: 'lockData',
        //     maxWidth: '800px',
        //     center: true,
        // },
        // {
        //     name: 'Lock Power %',
        //     selector: 'lockPowerPercentage',
        //     maxWidth: '100px',
        //     center: true,
        // },
        // {
        //     name: 'Is Door Open',
        //     selector: 'doorOpen',
        //     maxWidth: '60px',
        //     center: true,
        // },
        // {
        //     name: 'Username',
        //     selector: 'username',
        //     maxWidth: '120px',
        //     center: true,
        // },
        // {
        //     name: 'Password',
        //     selector: 'password',
        //     maxWidth: '120px',
        //     center: true,
        // },
        {
            name: 'Access Token',
            selector: 'accessToken',
            maxWidth: '300px',
            center: true,
        },
        {
            name: 'Refresh Token',
            selector: 'refreshToken',
            maxWidth: '300px',
            center: true,
        },
        // {
        //     name: 'UID',
        //     selector: 'uid',
        //     maxWidth: '60px',
        //     center: true,
        // },
        // {
        //     name: 'Open ID',
        //     selector: 'openId',
        //     maxWidth: '60px',
        //     center: true,
        // },
        // {
        //     name: 'Scope',
        //     selector: 'scope',
        //     maxWidth: '60px',
        //     center: true,
        // },
        // {
        //     name: 'Token Type',
        //     selector: 'tokenType',
        //     maxWidth: '60px',
        //     center: true,
        // },
        // {
        //     name: 'Expires On',
        //     selector: 'expiresIn',
        //     maxWidth: '60px',
        //     center: true,
        // },
        // {
        //     name: 'Lock Id',
        //     selector: 'lockId',
        //     maxWidth: '60px',
        //     center: true,
        // },
        // {
        //     name: 'Key Id',
        //     selector: 'keyId',
        //     maxWidth: '60px',
        //     center: true,
        // },
        // {
        //     name: 'SmartLock Admin Passcode',
        //     selector: 'smartlockAdminPasscode',
        //     maxWidth: '60px',
        //     center: true,
        // },
        // {
        //     name: 'Is SmartLock Installed',
        //     selector: 'isSmartlockInstalled',
        //     maxWidth: '60px',
        //     center: true,
        //     cell: ({ isSmartlockInstalled }) => (
        //         isSmartlockInstalled ?
        //             <Text
        //                 text='Yes' /> :
        //             <Text
        //                 text='No' />

        //     )
        // },
        // {
        //     name: 'Is Gateway Installed',
        //     selector: 'isGatewayInstalled',
        //     maxWidth: '60px',
        //     center: true,
        //     cell: ({ isGatewayInstalled }) => (
        //         isGatewayInstalled ?
        //             <Text
        //                 text='Yes' /> :
        //             <Text
        //                 text='No' />

        //     )
        // },
        {
            name: "Action",
            sortable: false,
            center: true,
            maxWidth: '180px',
            cell: ({ id, deleted }) => (
                <div className="action">
                    <Buttons
                        name="View Data"
                        varient="primary"
                        // disable={deleted ? true : false}
                        size="xSmall"
                        color="white"
                        className="mt-2 mb-2"
                        onClick={() => { showSmartLockData(id) }} />
                </div>
            ),
        },
    ]

    const contactSensorColumns = [
        {
            name: 'id',
            selector: 'id',
            maxWidth: '60px',
            center: true,
        },
        // {
        //     name: 'Created On',
        //     selector: 'createdDate',
        //     maxWidth: '200px',
        //     center: true,
        // },
        // {
        //     name: 'Last Modified On',
        //     selector: 'lastModifiedDate',
        //     maxWidth: '200px',
        //     center: true,
        // },
        {
            name: 'Serial No.',
            selector: 'serialNumber',
            maxWidth: '150px',
            center: true,
        },
        {
            name: 'Email Id.',
            selector: 'email',
            maxWidth: '200px',
            center: true,
        },
        {
            name: 'Password',
            selector: 'password',
            maxWidth: '150px',
            center: true,
        },
        {
            name: 'Is Deleted',
            selector: 'deleted',
            maxWidth: '60px',
            center: true,
            cell: ({ deleted }) => (
                deleted ?
                    <Text
                        text='Yes' /> :
                    <Text
                        text='No' />
            )
        },
        {
            name: "Action",
            sortable: false,
            center: true,
            maxWidth: '180px',
            cell: ({ id, deleted }) => (
                <div className="action">
                    <Buttons
                        name="View Data"
                        varient="primary"
                        size="xSmall"
                        color="white"
                        className="mt-2 mb-2"
                        onClick={() => { showCensorData(id) }} />
                </div>
            ),
        },
    ]

    const cameraDeviceColumns = [
        {
            name: 'Property Id',
            selector: 'propertyId',
            maxWidth: '150px !important',
            center: true,
        },
        {
            name: 'UUId',
            selector: 'uuId',
            minWidth: '120px',
            center: true,
        },
        {
            name: 'Camera DeviceId',
            selector: 'cameraDeviceId',
            maxWidth: '150px',
            center: true,
        },
        // {
        //     name: 'Created On',
        //     selector: 'createdDate',
        //     minWidth: '200px',
        //     center: true,
        // },
        // {
        //     name: 'Last Modified On',
        //     selector: 'lastModifiedDate',
        //     minWidth: '200px',
        //     center: true,
        // },
        // {
        //     name: 'Username',
        //     selector: 'userName',
        //     maxWidth: '120px',
        //     center: true,
        // },
        // {
        //     name: 'Password',
        //     selector: 'password',
        //     maxWidth: '120px',
        //     center: true,
        // },
        // {
        //     name: 'Nick Name',
        //     selector: 'nickName',
        //     maxWidth: '200px',
        //     center: true,
        // },
        {
            name: 'Is Deleted',
            selector: 'deleted',
            maxWidth: '60px',
            center: true,
            cell: ({ deleted }) => (
                deleted ?
                    <Text
                        text='Yes' /> :
                    <Text
                        text='No' />

            )
        },
        {
            name: "Action",
            sortable: false,
            center: true,
            maxWidth: '180px',
            cell: ({ uuId, deleted }) => (
                <div className="action">
                    <Buttons
                        name="View Data"
                        varient="primary"
                        size="xSmall"
                        color="white"
                        className="mt-2 mb-2"
                        onClick={() => { showCameraData(uuId) }} />
                </div>
            ),
        },
    ]

    const showSmartLockData = (id) => {
        console.log(id)
        setShowEditSmartLockData(true)
        smartLockData.forEach(element => {
            if (element.id === id) {
                setselectedSmartLockData(element)
                console.log(element)
            }
        });
    }

    const showCensorData = (id) => {
        console.log(id)
        setShowEditCensorData(true)
        censorData.forEach(element => {
            if (element.id === id) {
                setselectedCensorData(element)
                console.log(element)
            }
        });
    }
    const showCameraData = (uuId) => {
        console.log(uuId)
        setShowEditCameraData(true)
        cameraData.forEach(element => {
            if (element.uuId === uuId) {
                setselectedCameraData(element)
                console.log(element)
            }
        });
    }

    return (
        <>
            <div className="whiteBg">
                <Text
                    className="m-2 h5"
                    size="medium"
                    text={"Smart Lock Data"}
                />

                <ListingDataTable
                    columns={columns}
                    data={smartLockData}
                    paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                    paginationPerPage={8}
                    perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                    persistTableHead="true"
                >
                </ListingDataTable>

                <div>
                    {showEditSmartLockData ? (
                        <>
                            <Text
                                className="m-2 h5"
                                size="medium"
                                text="Edit SmartLock Data"
                            />
                            <div className="d-flex mt-3 row col-12">
                                <TextField
                                    className='col-4 px-1 mt-3'
                                    id="id"
                                    contentEditable='false'
                                    label="id"
                                    value={selectedSmartLockData?.id}
                                />
                                <TextField
                                    className='col-4 px-1 mt-3'
                                    id="propertyId"
                                    contentEditable='false'
                                    label="propertyId"
                                    value={selectedSmartLockData?.propertyId}
                                />
                                <TextField
                                    className='col-4 px-1 mt-3'
                                    id="uid"
                                    contentEditable='false'
                                    label="uid"
                                    value={selectedSmartLockData?.uid}
                                />
                                <TextField
                                    className='col-4 px-1 mt-3'
                                    id="lockmac"
                                    multiline
                                    contentEditable='false'
                                    label="lockmac"
                                    value={selectedSmartLockData?.lockmac}
                                />
                                <TextField
                                    className='col-4 px-1 mt-3'
                                    id="lockPowerPercentage"
                                    contentEditable='false'
                                    label="lockPowerPercentage"
                                    value={selectedSmartLockData?.lockPowerPercentage}
                                />
                                <TextField
                                    className='col-4 px-1 mt-3'
                                    id="expiresIn"
                                    contentEditable='false'
                                    label="expiresIn"
                                    value={selectedSmartLockData?.expiresIn}
                                />
                                <TextField
                                    className='col-4 px-1 mt-3'
                                    id="tokenType"
                                    contentEditable='false'
                                    label="tokenType"
                                    value={selectedSmartLockData?.tokenType}
                                />
                                <TextField
                                    className='col-4 px-1 mt-3'
                                    id="scope"
                                    contentEditable='false'
                                    label="scope"
                                    value={selectedSmartLockData?.scope}
                                />
                                <TextField
                                    className='col-4 px-1 mt-3'
                                    id="smartlockAdminPasscode"
                                    contentEditable='false'
                                    label="smartlockAdminPasscode"
                                    value={selectedSmartLockData?.smartlockAdminPasscode}
                                />
                                <TextField
                                    className='col-4 px-1 mt-3'
                                    id="smartlockInstalled"
                                    contentEditable='false'
                                    label="smartlockInstalled"
                                    value={selectedSmartLockData?.smartlockInstalled ? 'Yes' : 'No'}
                                />
                                <TextField
                                    className='col-4 px-1 mt-3'
                                    id="gatewayInstalled"
                                    contentEditable='false'
                                    label="gatewayInstalled"
                                    value={selectedSmartLockData?.gatewayInstalled ? 'Yes' : 'No'}
                                />
                                <TextField
                                    className='col-4 px-1 mt-3'
                                    id="doorOpen"
                                    contentEditable='false'
                                    label="doorOpen"
                                    value={selectedSmartLockData?.doorOpen ? 'Yes' : 'No'}
                                />
                                <TextField
                                    className='col-4 px-1 mt-3'
                                    id="accessToken"
                                    multiline
                                    contentEditable='false'
                                    label="accessToken"
                                    value={selectedSmartLockData?.accessToken}
                                />
                                <TextField
                                    className='col-4 px-1 mt-3'
                                    id="refreshToken"
                                    multiline
                                    contentEditable='false'
                                    label="refreshToken"
                                    value={selectedSmartLockData?.refreshToken}
                                />
                                <TextField
                                    className='col-4 px-1 mt-3'
                                    id="username"
                                    multiline
                                    contentEditable='false'
                                    label="username"
                                    value={selectedSmartLockData?.username}
                                />
                                <TextField
                                    className='col-4 px-1 mt-3'
                                    id="password"
                                    multiline
                                    contentEditable='false'
                                    label="password"
                                    value={selectedSmartLockData?.password}
                                />
                                <div className='col-12 px-1'>
                                    <TextArea
                                        id="lockData"
                                        contentEditable='false'
                                        label="lockData"
                                        value={selectedSmartLockData?.lockData}
                                    />
                                </div>
                            </div>
                            <div className="mb-5">
                                <Buttons
                                    name="Hide Data"
                                    varient="primary"
                                    style={{float:'right', marginInlineEnd: '4%'}}
                                    size="xSmall"
                                    color="white"
                                    className="mt-2 mb-2"
                                    onClick={() => { setShowEditSmartLockData(false) }} />
                            </div>
                            <Divider />
                        </>
                    ) : (<></>)}
                </div>
                <Text
                    className="px-2 mt-4 h5"
                    size="medium"
                    text={"Contact Sensor Data"}
                />
                <ListingDataTable
                    columns={contactSensorColumns}
                    data={censorData}
                    paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                    paginationPerPage={8}
                    perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                    persistTableHead="true"
                >
                </ListingDataTable>

                {showEditCensorData ? (
                    <>
                        <Text
                                className="m-2 h5"
                                size="medium"
                                text="View Contact Sensor Data"
                        />
                        <div className="d-flex mt-3 row col-12">
                            <TextField
                                className='col-4 px-1 mt-3'
                                id="id"
                                contentEditable='false'
                                label="id"
                                value={selectedCensorData?.id}
                            />
                            {/* <TextField
                                className='col-4 px-1 mt-3'
                                id="createdOn"
                                contentEditable='false'
                                label="createdOn"
                                value={selectedCensorData?.createdDate}
                            />
                            <TextField
                                className='col-4 px-1 mt-3'
                                id="lastModifiedDate"
                                contentEditable='false'
                                label="lastModified On"
                                value={selectedCensorData?.lastModifiedDate}
                            /> */}
                            <TextField
                                className='col-4 px-1 mt-3'
                                id="serialNumber"
                                contentEditable='false'
                                label="serial No."
                                value={selectedCensorData?.serialNumber}
                            />
                            <TextField
                                className='col-4 px-1 mt-3'
                                id="email"
                                contentEditable='false'
                                label="Email Id"
                                value={selectedCensorData?.email}
                            />
                            <TextField
                                className='col-4 px-1 mt-3'
                                id="id"
                                contentEditable='false'
                                label="Password"
                                value={selectedCensorData?.password}
                            />
                            <TextField
                                className='col-4 px-1 mt-3'
                                id="deleted"
                                contentEditable='false'
                                label="Is deleted"
                                value={selectedCensorData?.deleted ? 'Yes' : 'No'}
                            />
                        </div>
                        <div className="mb-5">
                                <Buttons
                                    name="Hide Data"
                                    varient="primary"
                                    style={{float:'right', marginInlineEnd: '4%'}}
                                    size="xSmall"
                                    color="white"
                                    className="mt-2 mb-2"
                                    onClick={() => { setShowEditCensorData(false) }} />
                        </div>
                        <Divider />
                    </>
                ):(null)}

                <Text
                    className="px-2 mt-4 h5"
                    size="medium"
                    text={"Camera Device Data"}
                />
                <ListingDataTable
                    columns={cameraDeviceColumns}
                    data={cameraData}
                    paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                    paginationPerPage={8}
                    perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                    persistTableHead="true"
                >
                </ListingDataTable>

                {showEditCameraData ? (
                    <>
                        <Text
                                className="m-2 h5"
                                size="medium"
                                text="View Camera Device Data"
                        />
                        <div className="d-flex mt-3 row col-12">
                            <TextField
                                className='col-4 px-1 mt-3'
                                id="uuId"
                                contentEditable='false'
                                label="UUID"
                                value={selectedCameraData?.uuId}
                            />
                            <TextField
                                className='col-4 px-1 mt-3'
                                id="propertyId"
                                contentEditable='false'
                                label="Property Id"
                                value={selectedCameraData?.propertyId}
                            />
                            <TextField
                                className='col-4 px-1 mt-3'
                                id="propertyId"
                                contentEditable='false'
                                label="Camera DeviceId"
                                value={selectedCameraData?.cameraDeviceId}
                            />
                            {/* <TextField
                                className='col-4 px-1 mt-3'
                                id="createdOn"
                                contentEditable='false'
                                label="createdOn"
                                value={selectedCameraData?.createdDate}
                            />
                            <TextField
                                className='col-4 px-1 mt-3'
                                id="lastModifiedDate"
                                contentEditable='false'
                                label="Last Modified On"
                                value={selectedCameraData?.lastModifiedDate}
                            /> */}
                            <TextField
                                className='col-4 px-1 mt-3'
                                id="userName"
                                contentEditable='false'
                                label="userName"
                                value={selectedCameraData?.userName}
                            />
                            <TextField
                                className='col-4 px-1 mt-3'
                                id="password"
                                contentEditable='false'
                                label="Password"
                                value={selectedCameraData?.password}
                            />
                            <TextField
                                className='col-4 px-1 mt-3'
                                id="nickName"
                                contentEditable='false'
                                label="Nick Name"
                                value={selectedCameraData?.nickName}
                            />
                            <TextField
                                className='col-4 px-1 mt-3'
                                id="deleted"
                                contentEditable='false'
                                label="Is deleted"
                                value={selectedCameraData?.deleted ? 'Yes' : 'No'}
                            />
                        </div>
                        <div className="mb-5">
                                <Buttons
                                    name="Hide Data"
                                    varient="primary"
                                    style={{float:'right', marginInlineEnd: '4%'}}
                                    size="xSmall"
                                    color="white"
                                    className="mt-2 mb-2"
                                    onClick={() => { setShowEditCameraData(false) }} />
                        </div>
                    </>
                ):(null)}
            </div>
        </>
    )
}

const mapStateToProps = ({ getSmartLockData, getCameraData, getContactSensorData }) => ({
    getSmartLockData,
    getCameraData,
    getContactSensorData
});

// mapDispatchToProps
const actions = {
    // getAllProperties,
    // getPropertyCity,
};

export default connect(mapStateToProps, actions)(PropertyDevice);