import { memo, useCallback, useEffect, useState } from "react"
import { compose } from "redux"
import { getAllCityWithId, setCityServiceStatus, getAllStateWithId } from "../../../common/redux/actions";
import { connect } from "react-redux";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import "./SmartdoorCities.scss"
import { Switch } from "@mui/material";
import Text from "../../../shared/Text/Text";
import { Form } from "react-bootstrap";
import { showErrorToast } from "../../../common/helpers/Utils";
import { TableLoader } from "../../../common/helpers/Loader";

const ProgressComponent = <TableLoader />;
const SmartDoorCities = (props) => {
    const { getAllStateWithId, allStatesWithId, getAllCityWithId, allCitiesWithId } = props;
    const [p_state, setp_state] = useState('')
    const [citiesWithTrue, setCitiesWithTrue] = useState([])
    const [citiesWithFalse, setCitiesWithFalse] = useState([])
    const [loading, setLoading] = useState(true);
    const getAllCitiesWithTrue = useCallback(async (stateId) => {
        await getAllCityWithId({ stateId: stateId, smartdoorServiceStatus: null })
            .then((response) => {
                setLoading(false)
                let statusTrueArr = []
                let statusFalseArr = []
                if(response.status === 200) {
                    response?.data?.resourceData?.forEach(element => {
                        if (element?.serviceStatus === true) {
                            statusTrueArr.push(element)
                        }
                        if (element?.serviceStatus === false) {
                            statusFalseArr.push(element)
                        }
                    });
                    setCitiesWithTrue(statusTrueArr)
                    setCitiesWithFalse(statusFalseArr)
                    console.log(response)
                }
            })
            .catch(error => {
                console.log(error);
                showErrorToast("Please try again...")
            })

    });

    useEffect(() => {
        getAllStateWithId(null);
        getAllCitiesWithTrue();
    }, [getAllCityWithId, getAllStateWithId]);

    const handleCheck = (e, cityId, serviceStatus) => {
        console.log(e)
        console.log(cityId)
        console.log(serviceStatus)
        setCityServiceStatus({ cityId: cityId, status: !serviceStatus })
            .then((response) => {
                if (response.status === 200) {
                    getAllCitiesWithTrue();
                }
            })
            .catch(error => {
                console.log(error);
                showErrorToast("Please try again...")
            })
    }
    const columns = [
        {
            name: "Id",
            selector: "cityId",
            sortable: true,
            center: true,
            minWidth: "120px",
        },
        {
            name: "Name",
            selector: "cityName",
            sortable: true,
            center: true,
            minWidth: "120px",
        },
        {
            name: "Status",
            selector: "status",
            sortable: false,
            center: true,
            minWidth: "120px",
            cell: ({ cityId, serviceStatus }) => (<><Switch checked={serviceStatus ? true : false} color="warning" onChange={(e) => handleCheck(e, cityId, serviceStatus)} /></>)
        },
    ]

    return (
        <>
            <div style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                <div className="d-flex locationSelect">
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                            as="select"
                            onChange={async (e) => {
                                await setp_state(e.target.value);
                                getAllCitiesWithTrue(e.target.value);
                            }}
                            value={p_state}
                        >
                            <option value="">Select State</option>
                            {allStatesWithId?.data?.length > 0
                                ? allStatesWithId?.data?.map((state) => (
                                    <option key={state.id} value={state.id}>
                                        {state.stateName}
                                    </option>
                                ))
                                : null}
                        </Form.Control> 
                    </Form.Group>
                </div>
                <div className="whiteBg mt-0">
                    <div>
                        <Text size="regular" fontWeight="mediumbold" color="secondryColor" text="Smartdoor Active Cities" />
                    </div>
                    <div className="smartDoorCityTable">
                        <DataTableComponent
                            data={citiesWithTrue}
                            columns={columns}
                            progressPending={allCitiesWithId.isLoading}
                            progressComponent={ProgressComponent}
                        />
                    </div>
                </div>
                <div className="whiteBg mt-0">
                    <div>
                        <Text size="regular" fontWeight="mediumbold" color="secondryColor" text="Smartdoor Inactive Cities" />
                    </div>
                    <div className="smartDoorCityTable">
                        <DataTableComponent
                            data={citiesWithFalse}
                            columns={columns}
                            progressPending={allCitiesWithId.isLoading}
                            progressComponent={ProgressComponent}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = ({ allStatesWithId, allCitiesWithId }) => ({
    allStatesWithId, allCitiesWithId
});

const actions = {
    getAllStateWithId,
    getAllCityWithId
};

const withConnect = connect(mapStateToProps, actions);
export default compose(withConnect, memo)(SmartDoorCities)