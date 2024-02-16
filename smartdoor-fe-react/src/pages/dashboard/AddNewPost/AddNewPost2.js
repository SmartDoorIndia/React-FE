import { compose } from "redux"
import { Form, Col, Row, Modal } from "react-bootstrap";
import Text from "../../../shared/Text/Text";
import MapComponent from "../../../shared/Map/MapComponent";
import Buttons from "../../../shared/Buttons/Buttons";
import { memo, useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { validateNewPost2 } from "../../../common/validations";
import { addNewPost2, getInstallationCity, getPropertyDetails } from '../../../../src/common/redux/actions'
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { provideAuth } from "../../../common/helpers/Auth";
import AutoCompleteInput from "../../../shared/Inputs/AutoComplete";
import { getSocietyByCity } from "../../../common/redux/actions/addNewPost.action";
import { Autocomplete } from "devextreme-react/autocomplete";
import "./post.scss"

const AddNewPost2 = (props) => {
    const location = useLocation();
    const { userData } = provideAuth();
    const {addNewPostReducer} = props
    const [propertyId , setPropertyId] = useState(location?.state?.propertyId);
    const [propertyData, setPropertyData] = useState(location?.state?.propertyData)
    const [data, setData] = useState({
        postedById: userData.userid,
        smartdoorPropertyId: propertyId,
        houseNumber: propertyData?.houseNumber,
        address: propertyData?.address,
        towerName: propertyData?.towerName,
        latitude: propertyData?.societyDetailResponse?.latitude === undefined ? 0 : propertyData?.societyDetailResponse?.latitude,
        longitude: propertyData?.societyDetailResponse?.longitude === undefined ? 0 : propertyData?.societyDetailResponse?.longitude,
        zipCode: propertyData?.zipCode,
        country: propertyData?.societyDetailResponse?.country,
        state: propertyData?.societyDetailResponse?.state,
        city: propertyData?.societyDetailResponse?.city === null ? '' : propertyData?.societyDetailResponse?.city,
        floorNumber: propertyData?.propertyInfoResponse?.floor === null ? 0 : Number(propertyData?.propertyInfoResponse?.floor),
        societyId: propertyData?.societyDetailResponse?.societyId,
        otherSociety: "",
        buildingProjectSociety: propertyData?.societyDetailResponse?.societyName,
        totalFloor: propertyData?.propertyInfoResponse?.totalFloor === null ? 0 : Number(propertyData?.propertyInfoResponse?.totalFloor),
        locality: propertyData?.societyDetailResponse?.locality,
        cityLat: propertyData?.cityLat,
        cityLong: propertyData?.cityLong,
        draft: false,
        partial: true
    });

    const [societyArray, setSocietyArray] = useState([])
    const [cityArray, setCityArray] = useState([])
    const [error, setError] = useState({});
    const history = useHistory();
    const dispatch = useDispatch();

    const mapStyles = {
        width: "100%",
        height: "120px",
        display: "inline",
        borderRadius: "5px",
     };

    const _getPropertyDetails = useCallback(async() => {
        try {
            const response = await getPropertyDetails({ propertyId, userId: userData.userid });
            if (response.data && response.data.status === 200) {
                const newData = response.data.resourceData;
                setPropertyData(newData)
                if (newData && Object.keys(newData).length > 0) {
                    // setPropertyData(prevData => ({
                    //     ...prevData,
                    //     ...newData
                    // }));
                    console.log(propertyData)
                }
                getAllInstallationCity(); 
                return true;
            }
          } catch (error) {
                console.error("Error fetching property details:", error);
          }
    }, [propertyId, userData.userid]);

    const getAllInstallationCity = async () => {
        try {
            const response = await getInstallationCity();
            const cities = response?.data?.resourceData
            setCityArray(cities);
        } catch (error) {
            console.error("Error fetching installation cities:", error);
        }
    }

    useEffect(() => {
        console.log(propertyId)
        _getPropertyDetails();
        console.log(data.latitude)
    }, [_getPropertyDetails, propertyId]);

    
    const handleValidate = () => {
        let validate = validateNewPost2(data);
        setError(validate.errors);
        console.log("isvalid = " + validate.isValid)
        console.log("isvalid = " + validate.errors)
        if (validate.isValid) {
            // submit function call
            submitAddress();
        }
    }

    const submitAddress = async () => {
        if (draftModal) {
            setData({ ...data, draft: true, partial: false })
        }
        if (!draftModal) {
            setData({ ...data, draft: false, partial: true })
        }
        let requestBody = data
        requestBody.smartdoorPropertyId = propertyId
        await dispatch(addNewPost2(data));
        if (!draftModal) {
            history.push('/admin/posts/add-new-post/pics', { propertyId: propertyId })
        }
        if (draftModal) {
            setDraftModal(false)
            history.push('/admin/advisors')
        }
    }

    const selectSocietyName = async (e) => {
        console.log(e?.event?.target?.value)
        setData(prevData => ({ ...prevData, buildingProjectSociety: e?.event?.target?.value, otherSociety: e?.event?.target?.value }))
        console.log(data.otherSociety)
        const response = await getSocietyByCity({ city: (data.city)?.split(', ')[0], society: e?.event?.target?.value })
        setSocietyArray(response)
        let matchFound = false
        societyArray.forEach(element => {
            if (element.societyName === e?.event?.target?.value) {
                matchFound = true
            }
        });
        if(matchFound === false) {
            setData({
                ...data, societyId: null })
        }
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
        console.log(data)
    }

    const handleInputChange = async (event, newInputValue) => {
        // Get the text entered by the user
        let value = newInputValue
        setData(prevData => ({...prevData, buildingProjectSociety: value, otherSociety: value}));
        setData(updatedData => {
            console.log(updatedData?.buildingProjectSociety);
          });
        console.log(data?.buildingProjectSociety)
        console.log(newInputValue)
        console.log(event?.target?.value)
        const response = await getSocietyByCity({ city: (data?.city)?.split(', ')[0], society: newInputValue })
        setSocietyArray(response)
        
        societyArray.forEach(element => {
            if(element.societyName === newInputValue) {
              setData(prevData => ({
                ...prevData,
                societyId: element?.societyId,
                buildingProjectSociety: element?.societyName,
                latitude: element?.latitude,
                longitude: element?.longitude,
                locality: element?.locality,
                zipCode: element?.zipCode,
              }));
            }
          });
      };

    const [matchFound, setMatchFound] = useState(false)
    const handleSelectCityOption = async (e) => {
        let city = e?.location.split(', ')[0]
        if (cityArray.includes(city)) {
            error.city = "";
            console.log(city)
            await setData(prevData => ({
                ...prevData,
                city: city,
                cityLat: e.latlng?.lat,
                cityLong: e.latlng?.lng,
                state: e.location.split(', ')[1],
                country: e.location.split(', ')[2],
                locality: "",
            }));
        } else {
            error.city = "Currently We are not providing service in " + e?.location
            setData({
                ...data, city: "", state: "", country: ""
            })
        }

    }

    const handleSelectLocalityOption = (e) => {
        let localityArr = e.location?.split(', ')
        console.log(localityArr)
        console.log(data?.city)
        if(localityArr.includes(data.city)) {
            console.log("We are inside if...")
            console.log(localityArr.includes(data.city));
            setData({
                ...data, latitude: e?.latlng?.lat, longitude: e?.latlng?.lng, locality: e.location,
                zipCode: e?.data?.address_components[e.data.address_components?.length - 1]?.long_name
            });
            error.locality = "";
        }
        else {
            error.locality = "Locality exist out of " + data?.city;
            setData({
                ...data,  locality: ""})
        }
    }

    const [draftModal, setDraftModal] = useState(false)
    const showDraftModal = () => {
        setDraftModal(true)
    }

    const hideDraftModal = () => {
        setDraftModal(false)
    }

    // const handleSelect = async (value) => {
    //     try {
    //       const results = await geocodeByAddress(value);
    //       setData({...data, city : value})
    //       const latLng = await getLatLng(results[0]);
    //       console.log('Latitude and Longitude:', data.city);
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   }

    return (
        <>
            <div className="whiteBg">
                <Text
                    size="medium"
                    fontWeight="mediumbold"
                    color="secondryColor"
                    text="Address">
                </Text>
                <Row className="mt-3">

                    <Col lg="4">
                        <AutoCompleteInput
                            label="City"
                            cityLatLng={null}
                            placeholder="Enter City"
                            id="PropertyCityAutoComplete"
                            onSelectOption={(e) => { handleSelectCityOption(e) }}
                            onInputChange={(value) =>
                                {setData({ ...data, city: value })}
                            }
                            predictionType="city"
                            customValue={data?.city}
                        />
                        <Text
                            color="dangerText"
                            size="xSmall"
                            className=""
                            text={error?.city}
                        />
                    </Col>
                    <Col lg="4">
                        <Form.Group>
                        <Form.Label style={{ top: '13px' }}>Building/Project/Society<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Autocomplete
                                dataSource={societyArray}
                                // value={data?.buildingProjectSociety}
                                defaultValue={data?.buildingProjectSociety}
                                disabled={propertyData?.status === 'PUBLISHED' && propertyData.smartLockProperty === true  ? true : false}
                                onInput={(e) => { selectSocietyName(e) }}
                                onSelectionChanged={(value) => { setSelectedSociety(value?.selectedItem); console.log(value) }}
                                placeholder="Select Building/Project/Society"
                                valueExpr="societyName"
                                searchExpr="societyName"
                                style={{ height: "48px" }}
                            />
                            {/* <Autocomplete
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                options={societyArray?.length > 0 ? societyArray?.map((society) => society?.societyName) : []}
                                filterOptions={(options, { inputValue }) =>
                                    options.filter((option) =>
                                    option.toLowerCase().includes(inputValue.toLowerCase())
                                    )
                                }
                                renderInput={(params) => (
                                <TextField
                                    className="py-0"
                                    {...params}
                                    label="Building/Project/Society"
                                    InputProps={{
                                    ...params.InputProps,
                                    type: societyArray?.length > 0 ? 'search' : 'text',
                                    }}
                                    style={{borderRadius:20, height:'1rem'}}
                                />
                                )}
                                style={{ marginTop:'10%'}}
                                inputValue={data?.buildingProjectSociety === undefined || data.buildingProjectSociety === NaN ||
                                    data.buildingProjectSociety === null ? '' : data.buildingProjectSociety}
                                onInputChange={handleInputChange}
                            /> */}
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
                                onInput={(e) => { setData({ ...data, address: e.target.value }) }}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col lg="4">
                    <AutoCompleteInput
                        label="Locality"
                        options={{radius : 150000}}
                        // city={data?.city}
                        cityLatLng={{lat : data.cityLat, lng: data.cityLong}}
                        customValue={data?.locality}
                        placeholder="Enter Locality"
                        disabled={propertyData?.status === 'PUBLISHED' && propertyData.smartLockProperty === true ? true : false}
                        id="PropertyLocalityAutoComplete"
                        onSelectOption={(e) => { handleSelectLocalityOption(e); console.log(e) }}
                        onInputChange={(value) =>
                            {setData({ ...data, locality: value })}
                        }
                        predictionType="business"
                    />
                        <Text
                            color="dangerText"
                            size="xSmall"
                            className="pt-2"
                            text={error?.locality}
                        />
                    </Col>
                    <Col lg="4">
                        <Form.Group>
                            <Form.Label>Tower/Building</Form.Label>
                            <Form.Control
                                type="text"
                                maxLength="100"
                                placeholder="Enter Building"
                                value={data?.towerName}
                                onInput={(e) => { setData({ ...data, towerName: e.target.value }) }}
                            />
                            <Text
                                color="dangerText"
                                size="xSmall"
                                className="pt-2"
                                text={error?.towerName}
                            />
                        </Form.Group>
                    </Col>
                    <Col lg="4">
                        <div className="d-flex">
                            <Form.Group>
                                <Form.Label>House No<span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength="35"
                                    placeholder="Enter House No"
                                    value={data?.houseNumber}
                                    onInput={(e) => { setData({ ...data, houseNumber: e.target.value }) }}
                                />
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error?.houseNumber}
                                />&nbsp;
                            </Form.Group>&nbsp;
                            <Form.Group>
                                <Form.Label>Floor No<span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Floor No."
                                    min={1}
                                    value={data?.floorNumber?.toString()}
                                    onInput={(e) => { setData({ ...data, floorNumber: Number(e.target.value) }) }}
                                />
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error?.plotNo}
                                />&nbsp;
                            </Form.Group>&nbsp;
                            <Form.Group>
                                <Form.Label>Total Floors<span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="number"
                                    min={1}
                                    placeholder="Enter Floors"
                                    value={data?.totalFloor}
                                    onInput={(e) => { setData({ ...data, totalFloor: Number(e.target.value) }) }}
                                />
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error?.totalFloor}
                                />
                            </Form.Group>&nbsp;
                        </div>
                    </Col>
                </Row>

                <div className="mapLocation my-3">
                    <div style={{ height: "120px", overflow: "hidden" }}>
                        <MapComponent
                            p_lat={data.latitude} p_lng={data.longitude} />
                    </div>
                </div>

                <div className="d-flex">
                    <Buttons type="button" size={"medium"} color={"secondary"} onClick={() => { history.push('/admin/advisors') }} name="Cancel" /> &nbsp;
                    <Buttons name="Back" onClick={() => { showDraftModal() }}></Buttons> &nbsp;
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
                            text={"Do you want to save as draft ?"} />

                        <div className="text-center mt-5 mb-3">
                            <Buttons
                                name="Cancel"
                                varient="disable"
                                type="button"
                                size="xSmall"
                                color="black"
                                className="mr-3"
                                onClick={() => { history.push('/admin/posts/add-new-post/basic-details', {propertyData: propertyData}) }} />
                            <Buttons
                                name="Save"
                                varient="disable"
                                type="button"
                                size="xSmall"
                                color="black"
                                className="mr-3"
                                onClick={() => { submitAddress() }} />
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
export default compose(withConnect, memo)(AddNewPost2)