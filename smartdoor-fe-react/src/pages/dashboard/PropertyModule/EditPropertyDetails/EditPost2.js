import { compose } from "redux"
import { Form, Col, Row, Modal } from "react-bootstrap";
import Text from "../../../../shared/Text/Text";
import MapComponent from "../../../../shared/Map/MapComponent";
import Buttons from "../../../../shared/Buttons/Buttons";
import { memo, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { validateNewPost2 } from "../../../../common/validations";
import { addNewPost2, getInstallationCity } from '../../../../common/redux/actions'
import { useDispatch } from "react-redux";
import { connect, useSelector } from "react-redux";
import { addNewPostReducer } from "../../../../common/redux/reducers/views/addNewPost.reducer";
import { addNewPost2Reducer } from "../../../../common/redux/reducers/views/addNewPost2.reducer";
import { provideAuth } from "../../../../common/helpers/Auth";
import AutoCompleteInput from "../../../../shared/Inputs/AutoComplete";
import { getSocietyByCity } from "../../../../common/redux/actions/addNewPost.action";
import { Autocomplete } from "devextreme-react/autocomplete";
import "./property.scss";
import { showErrorToast } from "../../../../common/helpers/Utils";
import { geocodeByAddress } from "react-google-places-autocomplete";
import { da } from "date-fns/locale";

const EditPost2 = (props) => {
    const location = useLocation();
    const propertyData = (location?.state?.propertyData)
    const { userData } = provideAuth();
    const basicDetails = (location?.state?.basicDetails);
    const [data, setData] = useState({
        postedById: propertyData?.postedById,
        smartdoorPropertyId: propertyData?.smartdoorPropertyId,
        houseNumber: propertyData?.houseNumber,
        address: propertyData?.address,
        towerName: propertyData?.towerName,
        latitude: propertyData?.latitude,
        longitude: propertyData?.longitude,
        zipCode: propertyData?.zipCode,
        country: propertyData?.country,
        state: propertyData?.state,
        city: propertyData?.city,
        draft: false,
        partial: false,
        floorNumber: propertyData?.propertyInfoResponse?.floor === null ? 0 : Number(propertyData?.propertyInfoResponse?.floor),
        societyId: propertyData?.societyDetailResponse === null ? 0 : propertyData?.societyDetailResponse.societyId,
        otherSociety: propertyData?.societyDetailResponse?.societyName,
        buildingProjectSociety: propertyData?.societyDetailResponse?.societyName,
        totalFloor: propertyData?.propertyInfoResponse?.totalFloor === null ? 0 : Number(propertyData?.propertyInfoResponse?.totalFloor),
        locality: propertyData?.societyDetailResponse?.locality,
        cityLat: propertyData?.cityLat,
        cityLong: propertyData?.cityLong
    });
    const [localityString, setLocalityString] = useState({ locality: propertyData?.societyDetailResponse?.locality})
    const [societyArray, setSocietyArray] = useState([])
    const [cityArray, setCityArray] = useState([])
    const [error, setError] = useState({});
    const history = useHistory();
    const dispatch = useDispatch();
    const [addressDetails, setAddressDetails] = useState(location?.state?.addressDetails)
    useEffect(async () => {
        if (propertyData.societyDetailResponse !== null) {
            let selectedSociety = []
            selectedSociety.push(propertyData.societyDetailResponse)
            await setSocietyArray(selectedSociety)
            setData({ ...data, buildingProjectSociety: propertyData.societyDetailResponse.societyName })
            console.log(data.societyId)
        }
        if (addressDetails !== undefined) {
            setData(addressDetails)
        }

        getAllInstallationCity();
    }, [addNewPostReducer, addNewPost2Reducer, basicDetails]);

    const getAllInstallationCity = async () => {
        const response = await getInstallationCity();
        setCityArray(response?.data?.resourceData)
        let cities = response?.data?.resourceData
        setCityArray(cities)
        console.log(cityArray)
    }
    const handleValidate = () => {
        console.log(data)
        setData({ ...data, smartdoorPropertyId: propertyData.smartdoorPropertyId })
        let validate = validateNewPost2(data);
        setError(validate.errors);
        console.log("isvalid = " + validate.isValid)
        console.log("isvalid = " + validate.errors)
        if (validate.isValid) {
            // submit function call
            submitAddress();
        }
    };

    const submitAddress = async () => {
        setData({ ...data, isDraft: false, isPartial: true })
        await dispatch(addNewPost2(data));
        history.push('/admin/property/upload-property-image', { propertyData: propertyData, basicDetails: basicDetails, addressDetails: data })
    }

    const selectSocietyName = async (e) => {
        console.log(e?.event?.target?.value)
        let value = e?.event?.target?.value
        setData({ ...data, buildingProjectSociety: value, otherSociety: value })
        console.log(value + "  test  " + data.buildingProjectSociety)
        const response = await getSocietyByCity({ city: (data.city).split(', ')[0], society: value })
        setSocietyArray(response)
        // let matchFound = false
        // societyArray.forEach(element => {
        //     if (element.societyName === value) {
        //         matchFound = true
        //     }
        // });
        // if(matchFound === false) {
        //     setData({
        //         ...data, societyId: null })
        // }
    }

    const setSelectedSociety = async (value) => {
        console.log(value)
        let matchFound = false
        societyArray.forEach(element => {
            if (element.societyName === value?.societyName) {
                setData({
                    ...data, societyId: value.societyId,
                    latitude: value.latitude, longitude: value.longitute,
                    locality: value.locality, zipCode: value.zipCode,
                })
                matchFound = true
            }
        });
        // if(matchFound === false) {
        //     setData({
        //         ...data, societyId: null })
        // }
        console.log(data)
    }

    const handleSelectCityOption = (e) => {
        let matchFound = false
        // cityArray.forEach(element => {
            //     let city = e?.location.split(', ')[0]
            //     if (element.trim() === city.trim()) {
                //         setData({
                    //             ...data, city: e.location, cityLat: e.latlng?.lat, cityLong: e.latlng?.lng,
                    //             state: e.location.split(', ')[1], country: e.location.split(', ')[2]
                    //         })
                    //         matchFound = true
                    //         console.log(cityArray.includes(e?.location.split(', ')[0].trim().toLowerCase()))
                    //         error.city = ""
                    //         return
                    //     }
                    // });
        let cityName = e?.location.split(', ')[0];
        console.log(cityName)
        let formattedCityName = cityName;
        let formattedCityArray = cityArray.map(city => city.trim().toLowerCase());
        if(cityArray.includes(formattedCityName)) {
            setData({
                ...data, city: cityName, cityLat: e.latlng?.lat, cityLong: e.latlng?.lng,
                state: e.location.split(', ')[1], country: e.location.split(', ')[2],
                locality: '', zipCode: '', latitude: 0, longitude: 0
            })
            matchFound = true
            console.log(cityArray.includes(e?.location.split(', ')[0]))
            error.city = ""
            return
        }
        if (!matchFound) {
            error.city = "Currently We are not providing service in " + e?.location
            setData({
                ...data, city: "", state: "", country: ""
            })
        }

    }

    const handleSelectLocalityOption = async (e) => {
        // let matchFound = false;
        // let localityArr = e.location?.split(', ')
        console.log(e)
        error.locality = ""
        let newData = { ...data }; // Make a copy of the current state
        let newStr = {...localityString}
        let sublocality_level_1Flag = false;
        let localityFlag = false;
        let administrative_area_level_3Flag = false
        let stateFlag = false

        e?.data?.address_components?.forEach(element => {
            if (element.types.includes('locality')) {
                newData.city = element.long_name;
                console.log(newData.city);
                localityFlag = true
            }
            if (element.types.includes('sublocality_level_1')) {
                newData.locality = element.long_name;
                console.log(newData.locality);
                sublocality_level_1Flag = true
            }
            if (element.types.includes('postal_code')) {
                newData.zipCode = element.long_name;
                console.log(newData.zipCode);
            }
            if (element.types.includes('administrative_area_level_1')) {
                newData.state = element.long_name;
                console.log(newData.state);
                stateFlag = true
            }
        });
        if(localityFlag === false || sublocality_level_1Flag === false || stateFlag === false) {
            showErrorToast("Please select pin point location")
        }
        newStr.locality = newData.locality + ', ' + newData.city + ', ' + newData.state
        console.log(newStr)
        setLocalityString(newStr)
        const response = await geocodeByAddress(newData.city);
        const latFunction = response[0].geometry.location.lat;
        const eLat = latFunction();
        const lngFunction = response[0].geometry.location.lng;
        const eLng = lngFunction();
        console.log(eLat);
        console.log(eLng);
        newData.cityLat = eLat;
        newData.cityLong = eLng;
        // Update latitude and longitude outside the loop
        newData.latitude = e?.latlng?.lat;
        newData.longitude = e?.latlng?.lng;

        // Update the state once
        setData(newData);

        // matchFound = true
        // localityArr.forEach(element => {
        //     // return null;
        //     // if(element === data?.city) {
        //     // }
        // })
        // if(!matchFound) {
        //     error.locality = ("Locality exist out of city")
        //     setData({
        //         ...data,  locality: ""})
        // }
    }

    const [draftModal, setDraftModal] = useState(false)
    const showDraftModal = () => {
        setDraftModal(true)
    }

    const hideDraftModal = () => {
        setDraftModal(false)
    }

    const handleMarkerChanged = async (e) => {
        console.log(e?.location?.address_components)
        let newData = { ...data }; // Make a copy of the current state
        let newStr = {...localityString}
        let sublocality_level_1Flag = false;
        let localityFlag = false;
        let administrative_area_level_3Flag = false
        let stateFlag = false

        e?.location?.address_components?.forEach(element => {
            if (element.types.includes('locality')) {
                newData.city = element.long_name;
                console.log(newData.city);
                localityFlag = true
            }
            if (element.types.includes('sublocality_level_1')) {
                newData.locality = element.long_name;
                console.log(newData.locality);
                sublocality_level_1Flag = true
            }
            if (element.types.includes('postal_code')) {
                newData.zipCode = element.long_name;
                console.log(newData.zipCode);
            }
            if (element.types.includes('administrative_area_level_1')) {
                newData.state = element.long_name;
                console.log(newData.state);
                stateFlag = true
            }
        });
        if(localityFlag === false || sublocality_level_1Flag === false || stateFlag === false) {
            showErrorToast("Please select pin point location")
        }
        newStr.locality = newData.locality + ', ' + newData.city + ', ' + newData.state
        setLocalityString(newStr)
        const response = await geocodeByAddress(newData.city);
        const latFunction = response[0].geometry.location.lat;
        const eLat = latFunction();
        const lngFunction = response[0].geometry.location.lng;
        const eLng = lngFunction();
        console.log(eLat);
        console.log(eLng);
        newData.cityLat = eLat;
        newData.cityLong = eLng;
        // Update latitude and longitude outside the loop
        newData.latitude = e?.latlng?.lat;
        newData.longitude = e?.latlng?.lng;
        // Update latitude and longitude outside the loop
        newData.latitude = e?.lat;
        newData.longitude = e?.lng;

        // Update the state once
        setData(newData);
    }

    return (
        <>
            <div className="whiteBg">
                <Text
                    size="medium"
                    fontWeight="mediumbold"
                    color="secondryColor"
                    text="Address">
                </Text>
                {propertyData?.status === 'PUBLISHED' && propertyData.smartLockProperty === true ?
                    <>
                        <Text
                            size="10px"
                            fontWeight="medium"
                            style={{ fontSize: '16px', color: 'gray' }}
                            text="Note : Address details are non-editable for published proprties">
                        </Text>
                    </> : null}
                {/* <form noValidate > */}
                <Row className="mt-3">

                    <Col lg="4">
                        {/* <Form.Group>
                            </Form.Group> */}
                        <AutoCompleteInput
                            label="City"
                            disabled={propertyData.smartLockProperty === true ? true : false}
                            cityLatLng={null}
                            placeholder="Enter City"
                            id="PropertyCityAutoComplete"
                            onSelectOption={(e) => { handleSelectCityOption(e) }}
                            onInputChange={(value) =>
                                setData({ ...data, city: value })
                            }
                            predictionType="city"
                            customValue={data.city}
                        />
                        <Text
                            color="dangerText"
                            size="xSmall"
                            className="pt-2"
                            text={error?.city}
                        />
                    </Col>
                    <Col lg="4">
                        <Form.Group>
                            <Form.Label style={{ top: '13px' }}>Building/Project/Society<span style={{ color: 'red' }}>*</span></Form.Label>
                            {/* <Form.Control
                                    type="text"
                                    maxLength="100"
                                    placeholder="Enter Society"
                                    onInput={(e) => {
                                        selectSocietyName(e)
                                    }}
                                >								
                                </Form.Control> */}
                            <Autocomplete
                                dataSource={societyArray}
                                // value={data?.buildingProjectSociety}
                                defaultValue={data?.buildingProjectSociety}
                                disabled={propertyData?.status === 'PUBLISHED' && propertyData.smartLockProperty === true ? true : false}
                                onInput={(e) => { selectSocietyName(e) }}
                                onSelectionChanged={(value) => { setSelectedSociety(value?.selectedItem); console.log(value) }}
                                placeholder="Select Building/Project/Society"
                                valueExpr="societyName"
                                searchExpr="societyName"
                                style={{ height: "48px" }}
                            />
                            <Text
                                color="dangerText"
                                size="xSmall"
                                className="pt-2"
                                text={error?.buildingProjectSociety}
                            />
                        </Form.Group>
                    </Col>
                    <Col lg="4">
                        <Form.Group>
                            <Form.Label>Street/Landmark</Form.Label>
                            <Form.Control
                                type="text"
                                maxLength="100"
                                placeholder="Enter Landmark"
                                value={data?.address}
                                disabled={propertyData?.status === 'PUBLISHED' && propertyData.smartLockProperty === true ? true : false}
                                onInput={(e) => { setData({ ...data, address: e.target.value }) }}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col lg="4">
                        <AutoCompleteInput
                            label="Locality"
                            // radius={150000}
                            // options={{radius : 150000}}
                            cityLatLng={null}
                            customValue={data.locality}
                            placeholder="Enter Locality"
                            cityName={data.city}
                            disabled={propertyData?.status === 'PUBLISHED' && propertyData.smartLockProperty === true ? true : false}
                            id="PropertyLocalityAutoComplete"
                            onSelectOption={(e) => { handleSelectLocalityOption(e); console.log(e) }}
                            onInputChange={(value) => { setData({ ...data, locality: value }) }
                            }
                            predictionType="business"
                        />
                        {/* <Autocomplete
                            onPlaceChanged={(e) => {console.log(e)}}
                            options={{
                                types: ['geocode'],
                                fields: ['formatted_address', 'geometry', 'name'],
                                radius: 150000, // Specify the radius in meters (150km = 150,000m)
                                location: new window.google.maps.LatLng(),
                            }}
                            >
                            <input
                                type="text"
                                placeholder="Enter Location"
                                style={{ width: '100%' }}
                            />
                            </Autocomplete> */}
                        <Text
                            color="dangerText"
                            size="xSmall"
                            className="pt-2"
                            text={error?.locality}
                        />
                    </Col>
                    {/* <Col lg="4">
                        <Form.Group>
                            <Form.Label>Tower/Building</Form.Label>
                            <Form.Control
                                type="text"
                                maxLength="100"
                                placeholder="Enter Building"
                                value={data?.towerName}
                                disabled={propertyData?.status === 'PUBLISHED' && propertyData.smartLockProperty === true ? true : false}
                                onInput={(e) => { setData({ ...data, towerName: e.target.value }) }}
                            />
                            <Text
                                color="dangerText"
                                size="xSmall"
                                className="pt-2"
                                text={error?.towerName}
                            />
                        </Form.Group>
                    </Col> */}
                    <Col lg="4">
                        <div className="d-flex">
                            {/* <div className="d-flex">
                                </div> */}
                            <Form.Group>
                                <Form.Label>House No<span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength="35"
                                    placeholder="Enter House No"
                                    value={data?.houseNumber}
                                    disabled={propertyData?.status === 'PUBLISHED' && propertyData.smartLockProperty === true ? true : false}
                                    onInput={(e) => { setData({ ...data, houseNumber: e.target.value }) }}
                                />
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error?.houseNumber}
                                />
                            </Form.Group>&nbsp;
                            <Form.Group>
                                <Form.Label>Floor No</Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength="35"
                                    placeholder="Enter Floor No."
                                    value={data?.floorNumber}
                                    disabled={propertyData?.status === 'PUBLISHED' && propertyData.smartLockProperty === true ? true : false}
                                    onInput={(e) => { setData({ ...data, floorNumber: e.target.value }) }}
                                />
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error?.plotNo}
                                />
                            </Form.Group>&nbsp;
                            <Form.Group>
                                <Form.Label>Total Floors</Form.Label>
                                <Form.Control
                                    type="number"
                                    maxLength="35"
                                    min={1}
                                    placeholder="Enter Floors"
                                    value={data?.totalFloor}
                                    disabled={propertyData?.status === 'PUBLISHED' && propertyData.smartLockProperty === true ? true : false}
                                    onInput={(e) => { setData({ ...data, totalFloor: e.target.value }) }}
                                />
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error?.totalFloor}
                                />
                            </Form.Group>
                        </div>
                    </Col>
                </Row>

                <div className={"mapLocation my-3"}>
                    <div style={{ height: "120px", overflow: "hidden" }}>
                        <MapComponent
                            p_lat={data?.latitude !== 0 ? data.latitude : data.cityLat}
                            p_lng={data?.longitude !== 0 ? data.longitude : data.cityLong}
                            draggable={true}
                            onMarkerDragEnd={handleMarkerChanged} />
                    </div>
                </div>


                {/* </form> */}
                <div className="d-flex">
                    <Buttons type="button" size={"medium"} color={"secondary"} onClick={() => {
                        history.replace('/admin/property/property-details', { propertyId: propertyData.smartdoorPropertyId, userId: userData.userid}); window.history.go(-2); 
                    }} name="Cancel" /> &nbsp;
                    <Buttons name="Back" onClick={() => { history.replace('/admin/property/edit-basic-details', { propertyData: propertyData, basicDetails: basicDetails }); window.history.go(-1); }}></Buttons> &nbsp;
                    <Buttons name="Next" onClick={() => handleValidate()} />
                </div>
            </div>
            <Modal show={draftModal} onHide={() => { hideDraftModal() }} centered style={{ backgroundImage: 'unset' }}>
                <Modal.Body>
                    <div>
                        <Text
                            size="regular"
                            fontWeight="bold"
                            color="secondryColor"
                            className="text-center"
                            text="Confirmation" />

                        <Text
                            size="regular"
                            fontWeight="bold"
                            color="secondryColor"
                            className="text-center"
                            text={"Do you want to save ?"} />

                        <div className="text-center mt-5 mb-3">
                            <Buttons
                                name="No"
                                varient="disable"
                                type="button"
                                size="xSmall"
                                color="black"
                                className="mr-3"
                                onClick={() => { history.push('/admin/property/edit-basic-details', { propertyData: propertyData, basicDetails: basicDetails }) }} />
                            <Buttons
                                name="Yes"
                                varient="disable"
                                type="button"
                                size="xSmall"
                                color="black"
                                className="mr-3"
                                onClick={() => { handleValidate() }} />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

const mapStateToProps = ({ addNewPostReducer }) => ({
    addNewPostReducer
})

const actions = {
    addNewPost2
}

const withConnect = connect(mapStateToProps, actions);
export default compose(withConnect, memo)(EditPost2)