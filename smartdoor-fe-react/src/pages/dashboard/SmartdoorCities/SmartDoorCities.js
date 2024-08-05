import { memo, useCallback, useEffect, useState } from "react"
import { compose } from "redux"
import { getAllCityWithId, setCityServiceStatus, getAllStateWithId, addCity } from "../../../common/redux/actions";
import { connect } from "react-redux";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import "./SmartdoorCities.scss"
import { MenuItem, Switch, TextField } from "@mui/material";
import Text from "../../../shared/Text/Text";
import { Form, Modal } from "react-bootstrap";
import { showErrorToast, showSuccessToast } from "../../../common/helpers/Utils";
import { TableLoader } from "../../../common/helpers/Loader";
import Buttons from '../../../shared/Buttons/Buttons';
import AutoCompleteTextField from "../../../shared/Inputs/AutoComplete/textField";
import MapComponent from "../../../shared/Map/MapComponent";
import zIndex from "@mui/material/styles/zIndex";
import { validateNewCity } from "../../../common/validations";

const ProgressComponent = <TableLoader />;
const SmartDoorCities = (props) => {
    const { getAllStateWithId, allStatesWithId, getAllCityWithId, allCitiesWithId } = props;
    const [p_state, setp_state] = useState('')
    const [citiesWithTrue, setCitiesWithTrue] = useState([])
    const [citiesWithFalse, setCitiesWithFalse] = useState([])
    const [loading, setLoading] = useState(true);
    const [showAddCityModal, setShowAddCityModal] = useState(false);
    const [newCity, setNewCity] = useState({
        cityId: null,
        cityName: '',
        stateId: null,
        serviceStatus: null,
        alternateCityName: '',
        cityLat: 0.00,
        cityLong: 0.00,
        radius: 10.00
    });
    const [error, setError] = useState({});

    const getAllCitiesWithTrue = useCallback(async (stateId) => {
        await getAllCityWithId({ stateId: stateId, smartdoorServiceStatus: null })
            .then((response) => {
                setLoading(false)
                let statusTrueArr = []
                let statusFalseArr = []
                if (response.status === 200) {
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
        // {
        //     name: "Id",
        //     selector: "cityId",
        //     sortable: true,
        //     center: true,
        //     minWidth: "120px",
        // },
        {
            name: "Name",
            selector: "cityName",
            sortable: true,
            center: true,
            minWidth: "200px",
            wrap: true
        },
        {
            name: "Alternate Name",
            selector: "cityName",
            sortable: false,
            center: true,
            minWidth: "200px",
            wrap: true
        },
        {
            name: "City Radius",
            selector: "radius",
            sortable: false,
            center: true,
            minWidth: "100px",
            wrap: true
        },
        // {
        //     name: "Status",
        //     selector: "status",
        //     sortable: false,
        //     center: true,
        //     minWidth: "120px",
        //     cell: ({ cityId, serviceStatus }) => (<><Switch checked={serviceStatus ? true : false} color="warning" onChange={(e) => handleCheck(e, cityId, serviceStatus)} /></>)
        // },
        {
            name: "Edit",
            selector: ((row) => row.action),
            sortable: false,
            center: true,
            minWidth: "120px",
            cell: (row) => (<>
                <Buttons name='Edit' size='xSmall' onClick={() => { setNewCity(row); setShowAddCityModal(true) }} />
            </>)
        },
    ]

    return (
        <>
            <div style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                <div className="d-flex">
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
                    <div className="ml-3">
                        <Buttons className='mt-2' name="Add New City" varient='primary' size='medium' onClick={() => { setShowAddCityModal(true); }} />
                    </div>
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
                {/* <div className="whiteBg mt-0">
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
                </div> */}
                <Modal size="lg" show={showAddCityModal} onHide={() => {
                    setShowAddCityModal(false); setNewCity({
                        cityId: null,
                        cityName: '',
                        stateId: null,
                        serviceStatus: null,
                        alternateCityName: '',
                        cityLat: 0.00,
                        cityLong: 0.00,
                        radius: 0.00
                    })
                }} centered style={{ zIndex: '1000' }}>
                    <Modal.Body className="" >
                        <div className="row col-12">
                            <div className="col-6">
                                <AutoCompleteTextField
                                    className='w-100 mt-3'
                                    // style={{ zIndex: '1060' }} 
                                    error={error.cityName}
                                    currentLocFlag={false}
                                    label="Select City * "
                                    cityLatLng={null}
                                    placeholder="Enter location"
                                    id="PropertyCityAutoComplete"
                                    onSelectOption={(e) => {
                                        console.log(e);
                                        e.data.address_components.forEach(element => {
                                            if (element.types.includes('locality')) {
                                                let city = e.data.address_components[0].long_name;
                                                setNewCity({ ...newCity, cityName: city, cityLat: e.latlng.lat, cityLong: e.latlng.lng })
                                            }
                                        })
                                    }}
                                    onInputChange={(value) =>
                                        setNewCity({ ...newCity, cityName: value })
                                    }
                                    predictionType="city"
                                    customValue={newCity.cityName}
                                />
                                <TextField
                                    className="mt-3 w-100"
                                    type="text"
                                    label={'Alternate Name'}
                                    value={newCity.alternateCityName}
                                    onChange={(e) => { setNewCity({ ...newCity, alternateCityName: e.target.value }) }}
                                />
                                <TextField
                                    required
                                    error={error.cityLat}
                                    className="mt-3 w-100"
                                    type="number"
                                    label={'Latitude'}
                                    onInput={(e) => { setNewCity({ ...newCity, cityLat: e.target.value }) }}
                                    value={newCity.cityLat}
                                />
                                <TextField
                                    required
                                    error={error.cityLong}
                                    className="mt-3 w-100"
                                    type="number"
                                    label={'Longitude'}
                                    onInput={(e) => { setNewCity({ ...newCity, cityLong: e.target.value }) }}
                                    value={newCity.cityLong}
                                />
                                <TextField
                                    required
                                    error={error.radius}
                                    className="mt-3 w-100"
                                    type="number"
                                    label={'City Radius in km'}
                                    onInput={(e) => { setNewCity({ ...newCity, radius: e.target.value }) }}
                                    value={newCity.radius}
                                />
                                <TextField
                                    required
                                    error={error.stateId}
                                    className="mt-3 w-100"
                                    select
                                    label={'State'}
                                    onChange={(e) => { setNewCity({ ...newCity, stateId: e.target.value }) }}
                                    value={newCity.stateId}
                                >
                                    <MenuItem value={null}>Select State</MenuItem>
                                    {allStatesWithId?.data?.length > 0
                                        ? allStatesWithId?.data?.map((state) => (
                                            <MenuItem key={state.id} value={state.id}>
                                                {state.stateName}
                                            </MenuItem>
                                        ))
                                        : null}
                                </TextField>
                            </div>
                            <div className="mapLocation my-3 col-6">
                                <div style={{ height: "200px", overflow: "hidden" }}>
                                    <MapComponent
                                        zoom={8}
                                        p_lat={newCity.cityLat}
                                        p_lng={newCity.cityLong}
                                        draggable={false}
                                    // onMarkerDragEnd={handleMarkerChanged} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-3">
                            <Buttons name={newCity.cityId !== null ? "Save" : "Add New City"} size='medium' onClick={async () => {
                                let valid = await validateNewCity(newCity);
                                setError(valid.errors);
                                if (valid.isValid) {
                                    const response = await addCity(newCity);
                                    if (response.status === 200) {
                                        if (newCity.cityId !== null) {
                                            showSuccessToast("City updated successfully");
                                        } else {
                                            showSuccessToast("City addded successfully");
                                        }
                                        getAllCitiesWithTrue();
                                        setNewCity({
                                            cityId: null,
                                            cityName: '',
                                            stateId: null,
                                            serviceStatus: null,
                                            alternateCityName: '',
                                            cityLat: 0.00,
                                            cityLong: 0.00,
                                            radius: 0.00
                                        })
                                        setShowAddCityModal(false);
                                    }
                                    else {
                                        showErrorToast(response.data.customMessage)
                                        setShowAddCityModal(false);
                                    }
                                }
                            }} />
                        </div>
                    </Modal.Body>
                </Modal>
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