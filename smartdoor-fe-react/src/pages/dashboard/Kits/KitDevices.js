import { useCallback, useEffect, useState } from "react";
import { editKitDevices, getCameraTypes, getCorporatePlanList, getHubList, getKitDevices } from "../../../common/redux/actions";
import './KitList.scss';
import Buttons from "../../../shared/Buttons/Buttons";
import Loader from "../../../common/helpers/Loader";
import Text from "../../../shared/Text/Text";
import ListingDataTable from "../../../shared/DataTable/ListingDataTable";
import { showErrorToast, showSuccessToast } from "../../../common/helpers/Utils";
import { Card, Modal } from "react-bootstrap";
import { Checkbox, MenuItem, TextField } from "@mui/material";
import { connect } from "react-redux";
import { compose } from "redux";
import TextArea from "../../../shared/Inputs/TextArea/TextArea";

const KitDevices = (props) => {
    const { allHubList, getHubList } = props;
    const [cameraDeviceList, setCameraDeviceList] = useState([]);
    const [smartLockList, setSmartLockList] = useState([]);
    const [loading, setLoading] = useState(false);
    const endPointList = ['prod', 'uat'];
    const [error, setError] = useState({});
    const [showEditCameraData, setShowEditCameraData] = useState(false);
    const [selectedCameraData, setselectedCameraData] = useState({})
    const [showEditSmartLockData, setShowEditSmartLockData] = useState(false);
    const [selectedSmartLockData, setselectedSmartLockData] = useState({})
    const [addCameraFlag, setAddCameraFlag] = useState(false);
    const [cameraTypeList, setCameraTypeList] = useState([]);
    const [assignedHub, setAssignedHub] = useState('');
    const [corporatePlanList, setCorporatePlanList] = useState([]);
    const [selectedPlanIdList, setSelectedPlanIdList] = useState([]);
    const [assignedCorporatePlans, setAssignedCorporatePlans] = useState([]);

    const showSmartLockData = (id) => {
        console.log(id)
        setShowEditSmartLockData(true)
        smartLockList.forEach(element => {
            if (element.id === id) {
                setselectedSmartLockData(element)
                console.log(element)
            }
        });
    }

    const smartLockColumns = [
        {
            name: 'id',
            selector: ((row) => row.id),
            center: true,
            maxWidth: '60px',
        },
        {
            name: 'PropertyId',
            selector: ((row) => row.propertyId),
            maxWidth: '120px',
            center: true,
        },
        {
            name: 'Access Token',
            selector: ((row) => row.accessToken),
            maxWidth: '300px',
            center: true,
        },
        {
            name: 'Refresh Token',
            selector: ((row) => row.refreshToken),
            maxWidth: '300px',
            center: true,
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
                        // disable={deleted ? true : false}
                        size="xSmall"
                        color="white"
                        className="mt-2 mb-2"
                        onClick={() => { showSmartLockData(id) }} />
                </div>
            ),
        },
    ];

    const cameraDeviceColumns = [
        {
            name: 'Property Id',
            selector: ((row) => row.propertyId),
            maxWidth: '150px !important',
            center: true,
        },
        {
            name: 'UUId',
            selector: ((row) => row.uuId),
            minWidth: '120px',
            center: true,
        },
        {
            name: 'Camera DeviceId',
            selector: ((row) => row.cameraDeviceId),
            maxWidth: '150px',
            center: true,
        },
        {
            name: 'Is Deleted',
            selector: ((row) => row.deleted),
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
            minWidth: '140px',
            cell: ({ uuId }) => (
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

    const _getKitDevice = useCallback(
        async () => {
            setLoading(true);
            const response = await getKitDevices({ kitid: props.location.state.kitId });
            setLoading(false);
            if (response.status === 200) {
                setCameraDeviceList([...response.data.resourceData.cameraDeviceResponseList]);
                let smartlock = []
                smartlock.push(response.data.resourceData.smartLockResp);
                setSmartLockList([...smartlock]);
                setAssignedHub(response?.data?.resourceData?.assignedHub)
                // let corpPlans = [];
                // corpPlans.push(response.data.resourceData.assignedCorporatePlans);
                setAssignedCorporatePlans([...response.data.resourceData.assignedCorporatePlans])
            } else {
                showErrorToast("Please try again...");
            }
        }, []);

    const _getCorporatePlanList = useCallback(async () => {
        const response = await getCorporatePlanList();
        console.log(response)
        if (response.status === 200) {
            setCorporatePlanList([...response.data.resourceData]);
        } else {
            showErrorToast('Unable to fetch corporate plan list...');
        }
        console.log(corporatePlanList)
    }, []);

    useEffect(() => {
        getHubList();
        _getCorporatePlanList();
        _getKitDevice();
        getCameraTypes({})
            .then((response) => {
                setCameraTypeList(response.data.resourceData);
            })
            .catch(error => {
                console.log(error);
            });
    }, [_getCorporatePlanList, _getKitDevice, getHubList]);


    const showCameraData = (uuId) => {
        console.log(uuId)
        setShowEditCameraData(true)
        setAddCameraFlag(true)
        cameraDeviceList.forEach(element => {
            if (element.uuId === uuId) {
                setselectedCameraData({ ...element, cameraId: element.cameraDeviceId, cameraType: element.type, endpointType: 'prod' })
                console.log(element)
            }
        });
    }

    const handleCheckboxChange = (corporateId, corporateName, plan) => {
        setAssignedCorporatePlans((prevAssignedPlans) => {
            const corporateIndex = prevAssignedPlans.findIndex(
                (assigned) => assigned.corporateId === corporateId
            );

            if (corporateIndex !== -1) {
                const planExists = prevAssignedPlans[corporateIndex].plansList.some(
                    (assignedPlan) => assignedPlan.planId === plan.planId
                );

                if (planExists) {
                    // Remove the plan if it is already assigned
                    const updatedPlansList = prevAssignedPlans[corporateIndex].plansList.filter(
                        (assignedPlan) => assignedPlan.planId !== plan.planId
                    );

                    return updatedPlansList.length > 0
                        ? [
                            ...prevAssignedPlans.slice(0, corporateIndex),
                            { ...prevAssignedPlans[corporateIndex], plansList: updatedPlansList },
                            ...prevAssignedPlans.slice(corporateIndex + 1),
                        ]
                        : [...prevAssignedPlans.slice(0, corporateIndex), ...prevAssignedPlans.slice(corporateIndex + 1)];
                } else {
                    // Add the plan if it is not already assigned
                    const updatedCorporate = {
                        ...prevAssignedPlans[corporateIndex],
                        plansList: [...prevAssignedPlans[corporateIndex].plansList, plan],
                    };
                    return [
                        ...prevAssignedPlans.slice(0, corporateIndex),
                        updatedCorporate,
                        ...prevAssignedPlans.slice(corporateIndex + 1),
                    ];
                }
            } else {
                // If corporate plan is not in assignedCorporatePlans, add it with the new plan
                return [
                    ...prevAssignedPlans,
                    { corporateId, corporateName, plansList: [plan] },
                ];
            }
        });
    };


    return (
        <>
            <div className="whiteBg" >
                <div className="col-4" style={{ paddingLeft: '0px' }}>
                    <TextField
                        className="w-100"
                        label='Change hub'
                        select
                        SelectProps={{ multiple: false }}
                        value={assignedHub}
                        onChange={(e) => {
                            setAssignedHub(e.target.value);
                        }}
                    >
                        {allHubList?.data?.hubList?.map((element) => (
                            <MenuItem key={element.hubId} value={element.hubId} >
                                {element.hubName}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>

                <Text
                    className="mt-3 mb-0 h5"
                    size="medium"
                    text={"SmartLock List"}
                />
                <ListingDataTable
                    isLoading={loading}
                    className='mt-0'
                    columns={smartLockColumns}
                    data={smartLockList}
                    paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                    paginationPerPage={8}
                    perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                    persistTableHead="true"
                >
                </ListingDataTable>

                <Text
                    className="mt-3 mb-0 h5"
                    size="medium"
                    text={"Camera Device List"}
                />
                <ListingDataTable
                    isLoading={loading}
                    className='mt-0'
                    columns={cameraDeviceColumns}
                    data={cameraDeviceList}
                    paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                    paginationPerPage={8}
                    perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                    persistTableHead="true"
                >
                </ListingDataTable>

                <div className="mt-3">
                    <Text text={'Create kit for: '} size="medium" style={{ fontSize: '20px', fontWeight: '500' }} />
                    {corporatePlanList.map((corporatePlan) => {
                        const assignedCorporate = assignedCorporatePlans.find(
                            (assigned) => assigned.corporateId === corporatePlan.corporateId
                        );

                        return (
                            <Card className="mt-3" key={corporatePlan.corporateId}>
                                <Text
                                    className="ml-2"
                                    text={corporatePlan.corporateName}
                                    size="medium"
                                    style={{ fontSize: '20px', fontWeight: '500' }}
                                />
                                {corporatePlan?.plansList?.map((plan) => {
                                    const isAssigned = assignedCorporate?.plansList?.some(
                                        (assignedPlan) => assignedPlan.planId === plan.planId
                                    );

                                    return (
                                        <div className="d-flex" key={plan.planId}>
                                            <Checkbox
                                                value={plan.planName}
                                                style={{ color: '#BE1452' }}
                                                checked={isAssigned || false}
                                                onChange={() => handleCheckboxChange(corporatePlan.corporateId, corporatePlan.corporateName, plan)}
                                            />
                                            <Text
                                                text={plan.planName}
                                                size="medium"
                                                style={{ fontSize: '20px', fontWeight: '500', marginBlock: 'auto' }}
                                            />
                                        </div>
                                    );
                                })}
                            </Card>
                        );
                    })}
                    <div className="text-end" style={{textAlign:'end'}}>
                        <Buttons className='mt-3' name='Submit' onClick={async () => {
                            console.log(assignedCorporatePlans);
                            const assignedHubId = allHubList.data.hubList.find((hub) => hub.hubId === assignedHub);
                            console.log(assignedHubId)
                            const requestBody = {
                                kitId: props.location.state.kitId,
                                hubId: assignedHubId.hubId,
                                planListdetails: assignedCorporatePlans
                            }
                            const response = await editKitDevices(requestBody);
                            if (response.status === 200) {
                                showSuccessToast('Kit details updated successfully');
                            } else {
                                console.log(response)
                            }
                        }} />
                    </div>
                </div>

            </div>

            <Modal size="lg" show={showEditSmartLockData} onHide={() => { setShowEditSmartLockData(false); }} centered={true} >
                <Modal.Body>
                    <Text
                        className="m-2 h5"
                        size="medium"
                        text="View SmartLock Data"
                    />
                    <div className="d-flex mt-3 row col-12">
                        <TextField
                            disabled={true}
                            className='col-4 px-1 mt-3'
                            id="id"
                            contentEditable='false'
                            label="id"
                            value={selectedSmartLockData?.id}
                        />
                        <TextField
                            disabled={true}
                            className='col-4 px-1 mt-3'
                            id="propertyId"
                            contentEditable='false'
                            label="propertyId"
                            value={selectedSmartLockData?.propertyId}
                        />
                        <TextField
                            disabled={true}
                            className='col-4 px-1 mt-3'
                            id="uid"
                            contentEditable='false'
                            label="uid"
                            value={selectedSmartLockData?.uid}
                        />
                        <TextField
                            disabled={true}
                            className='col-4 px-1 mt-3'
                            id="lockmac"
                            multiline
                            contentEditable='false'
                            label="lockmac"
                            value={selectedSmartLockData?.lockmac}
                        />
                        <TextField
                            disabled={true}
                            className='col-4 px-1 mt-3'
                            id="lockPowerPercentage"
                            contentEditable='false'
                            label="lockPowerPercentage"
                            value={selectedSmartLockData?.lockPowerPercentage}
                        />
                        <TextField
                            disabled={true}
                            className='col-4 px-1 mt-3'
                            id="expiresIn"
                            contentEditable='false'
                            label="expiresIn"
                            value={selectedSmartLockData?.expiresIn}
                        />
                        <TextField
                            disabled={true}
                            className='col-4 px-1 mt-3'
                            id="tokenType"
                            contentEditable='false'
                            label="tokenType"
                            value={selectedSmartLockData?.tokenType}
                        />
                        <TextField
                            disabled={true}
                            className='col-4 px-1 mt-3'
                            id="scope"
                            contentEditable='false'
                            label="scope"
                            value={selectedSmartLockData?.scope}
                        />
                        <TextField
                            disabled={true}
                            className='col-4 px-1 mt-3'
                            id="smartlockAdminPasscode"
                            contentEditable='false'
                            label="smartlockAdminPasscode"
                            value={selectedSmartLockData?.smartlockAdminPasscode}
                        />
                        <TextField
                            disabled={true}
                            className='col-4 px-1 mt-3'
                            id="smartlockInstalled"
                            contentEditable='false'
                            label="smartlockInstalled"
                            value={selectedSmartLockData?.smartlockInstalled ? 'Yes' : 'No'}
                        />
                        <TextField
                            disabled={true}
                            className='col-4 px-1 mt-3'
                            id="gatewayInstalled"
                            contentEditable='false'
                            label="gatewayInstalled"
                            value={selectedSmartLockData?.gatewayInstalled ? 'Yes' : 'No'}
                        />
                        <TextField
                            disabled={true}
                            className='col-4 px-1 mt-3'
                            id="doorOpen"
                            contentEditable='false'
                            label="doorOpen"
                            value={selectedSmartLockData?.doorOpen ? 'Yes' : 'No'}
                        />
                        <TextField
                            disabled={true}
                            className='col-4 px-1 mt-3'
                            id="accessToken"
                            multiline
                            contentEditable='false'
                            label="accessToken"
                            value={selectedSmartLockData?.accessToken}
                        />
                        <TextField
                            disabled={true}
                            className='col-4 px-1 mt-3'
                            id="refreshToken"
                            multiline
                            contentEditable='false'
                            label="refreshToken"
                            value={selectedSmartLockData?.refreshToken}
                        />
                        <TextField
                            disabled={true}
                            className='col-4 px-1 mt-3'
                            id="username"
                            multiline
                            contentEditable='false'
                            label="username"
                            value={selectedSmartLockData?.username}
                        />
                        <TextField
                            disabled={true}
                            className='col-4 px-1 mt-3'
                            id="password"
                            multiline
                            contentEditable='false'
                            label="password"
                            value={selectedSmartLockData?.password}
                        />
                        <div className='col-12 px-1'>
                            <TextArea
                                disabled={true}
                                id="lockData"
                                contentEditable='false'
                                label="lockData"
                                value={selectedSmartLockData?.lockData}
                            />
                        </div>
                    </div>
                    {/* <div className="mb-5">
                        <Buttons
                            name="Hide Data"
                            varient="primary"
                            style={{ float: 'right', marginInlineEnd: '4%' }}
                            size="xSmall"
                            color="white"
                            className="mt-2 mb-2"
                            onClick={() => { setShowEditSmartLockData(false) }} />
                    </div> */}
                </Modal.Body>
            </Modal>

            <Modal size="lg" show={addCameraFlag} onHide={() => { setAddCameraFlag(false); setShowEditCameraData(false) }} centered={true} >
                <Modal.Body>
                    <Text
                        className="m-2 h5"
                        size="medium"
                        text={showEditCameraData ? "Edit Camera Device Data" : "Add New Camera Device Data"}
                    />
                    <div className="d-flex mt-3 row col-12">
                        <TextField
                            className='col-4 px-1 mt-3'
                            id="uuId"
                            disabled={true}
                            error={error.uuId}
                            contentEditable={true}
                            label="UUID"
                            onChange={(e) => { setselectedCameraData(prevCameraData => ({ ...prevCameraData, uuId: e.target.value })) }}
                            value={selectedCameraData?.uuId}
                        />
                        <TextField
                            className='col-4 px-1 mt-3'
                            id="propertyId"
                            disabled={true}
                            contentEditable={false}
                            label="Property Id"
                            value={selectedCameraData?.propertyId}
                        />
                        <TextField
                            className='col-4 px-1 mt-3'
                            id="userName"
                            disabled={true}
                            contentEditable={true}
                            error={error.userName}
                            type="text"
                            label="userName"
                            onChange={(e) => { setselectedCameraData(prevCameraData => ({ ...prevCameraData, userName: e.target.value })) }}
                            value={selectedCameraData?.userName}
                        />
                        <TextField
                            className='col-4 px-1 mt-3'
                            id="password"
                            disabled={true}
                            contentEditable={true}
                            error={error.password}
                            type="text"
                            label="Password"
                            onChange={(e) => { setselectedCameraData(prevCameraData => ({ ...prevCameraData, password: e.target.value })) }}
                            value={selectedCameraData?.password}
                        />
                        <TextField
                            className='col-4 px-1 mt-3'
                            id="cameraType"
                            disabled={true}
                            select
                            error={error.cameraType}
                            label="Camera Type"
                            onChange={(e) => { setselectedCameraData(prevCameraData => ({ ...prevCameraData, cameraType: e.target.value })) }}
                            value={selectedCameraData?.cameraType}
                        >
                            {cameraTypeList.map(item => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            className='col-4 px-1 mt-3'
                            id="nickName"
                            disabled={true}
                            contentEditable={true}
                            error={error.nickName}
                            type="text"
                            label="Nick Name"
                            onChange={(e) => { setselectedCameraData(prevCameraData => ({ ...prevCameraData, nickName: e.target.value })) }}
                            value={selectedCameraData?.nickName}
                        />
                        <TextField
                            className='col-4 px-1 mt-3'
                            id="endPointType"
                            disabled={true}
                            select
                            error={error.endpointType}
                            label="EndPoint Type"
                            onChange={(e) => { setselectedCameraData(prevCameraData => ({ ...prevCameraData, endpointType: e.target.value })) }}
                            value={selectedCameraData?.endpointType}
                        >
                            {endPointList.map(item => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            className='col-4 px-1 mt-3'
                            id="deleted"
                            disabled={true}
                            contentEditable={false}
                            label="Is deleted"
                            value={selectedCameraData?.deleted ? 'Yes' : 'No'}
                        />
                    </div>
                    {/* <div className="d-flex justify-content-center">
                        {loading ? <Loader />
                            :
                            <Buttons
                                name={showEditCameraData ? "Save" : "Add Camera Data"}
                                varient="primary"
                                size="xSmall"
                                color="white"
                                className="mt-2 mb-2 p-3"
                                onClick={() => { }} />
                        }
                    </div> */}
                </Modal.Body>
            </Modal>
        </>
    );
}

const mapStateToProps = ({ allHubList }) => ({ allHubList });
const actions = {
    getHubList,
    getCorporatePlanList
}

export default compose(connect(mapStateToProps, actions))(KitDevices);