import { compose } from "redux"
import { Form, Col, Row, Modal } from "react-bootstrap";
import Text from "../../../shared/Text/Text";
import MapComponent from "../../../shared/Map/MapComponent";
import Buttons from "../../../shared/Buttons/Buttons";
import { memo, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { validateNewPost2 } from "../../../common/validations";
import { addNewPost2 } from '../../../../src/common/redux/actions'
import { useDispatch } from "react-redux";
import { connect, useSelector } from "react-redux";
import { addNewPostReducer } from "../../../common/redux/reducers/views/addNewPost.reducer";
import { addNewPost2Reducer } from "../../../common/redux/reducers/views/addNewPost2.reducer";
import { provideAuth } from "../../../common/helpers/Auth";
import AutoCompleteInput from "../../../shared/Inputs/AutoComplete";
import { getSocietyByCity } from "../../../common/redux/actions/addNewPost.action";
import { Autocomplete } from "devextreme-react/autocomplete";

const AddNewPost2 = (props) => {
    const location = useLocation();
    const basicdetails = location?.state?.basicDetails
    const { userData } = provideAuth();
    const basicDetails = useSelector(state => state.addNewPostReducer);
    const [data, setData] = useState({
        postedById: userData.userid,
        smartdoorPropertyId: basicDetails.data.smartdoorPropertyId,
        houseNumber: null,
        address: null,
        towerName: null,
        latitude: null,
        longitude: null,
        zipCode: null,
        country: null,
        state: null,
        city: null,
        isDraft: null,
        isPartial: null,
        floorNumber: null,
        societyId: null,
        otherSociety: null,
        buildingProjectSociety: null,
        totalFloor: null,
        locality: null,
        cityLat: null,
        cityLong: null
    });
    const [societyArray, setSocietyArray] = useState([])
    const [error, setError] = useState({});
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(basicdetails)
        let addressDetails = addNewPost2Reducer.data;
        if (addressDetails !== undefined) {
            setData(addressDetails)
        }
    }, [addNewPostReducer, addNewPost2Reducer, basicDetails]);

    const handleValidate = () => {
        console.log(data)
        setData({ ...data, smartdoorPropertyId: basicDetails.data.smartdoorPropertyId })
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
        if(draftModal) {
            setData({...data, isDraft : true, isPartial : false})
        }
        if(!draftModal) {
            setData({...data, isDraft : false, isPartial : true})
        }
        console.log(data)
        await dispatch(addNewPost2(data));
        if(!draftModal) {
            history.push('/admin/posts/add-new-post/pics', {basicDetails: basicdetails, addressDetails: data})
        }
        if(draftModal) {
            setDraftModal(false)
            history.push('/admin/advisors')
        }
    }

    const selectSocietyName = async (e) => {
        setData({ ...data, buildingProjectSociety: e?.value })
        const response = await getSocietyByCity({ city: (data.city).split(', ')[0], society: e?.value })
        setSocietyArray(response)
    }

    const setSelectedSociety = async (value) => {
        console.log(value)
        societyArray.forEach(element => {
            if (element.societyName === value?.societyName) {
                setData({
                    ...data, societyId: element.societyId,
                    latitude: element.latitude, longitude: element.longitute,
                    locality: element.locality, zipCode: element.zipCode,
                })
            }
        });
        console.log(data)
    }

    const handleSelectCityOption = (e) => {
        setData({
            ...data, city: e.location, cityLat: e.latlng?.lat, cityLong: e.latlng?.lng,
            state: e.location.split(', ')[1], country: e.location.split(', ')[2]
        })
    }

    const handleSelectLocalityOption = (e) => {
        setData({
            ...data, latitude: e?.latlng?.lat, longitude: e?.latlng?.lng, locality: e.location,
            zipCode: e?.data?.address_components[e.data.address_components?.length - 1]?.long_name
        })
    }

    const [draftModal, setDraftModal] = useState(false)
    const showDraftModal = () => {
        setDraftModal(true)
    }

    const hideDraftModal = () => {
        setDraftModal(false)
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
                {/* <form noValidate > */}
                <Row className="mt-3">

                    <Col lg="4">
                        {/* <Form.Group>
                            </Form.Group> */}
                        <AutoCompleteInput
                            label="City"
                            placeholder="Enter City"
                            id="PropertyCityAutoComplete"
                            onSelectOption={(e) => { handleSelectCityOption(e) }}
                            onInputChange={(value) =>
                                setData({ ...data, city: value })
                            }
                            predictionType="city"
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
                            <Form.Label>Building/Project/Society<span style={{ color: 'red' }}>*</span></Form.Label>
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
                                value={data?.buildingProjectSociety}
                                defaultValue={data?.buildingProjectSociety}
                                onValueChanged={(e) => { selectSocietyName(e) }}
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
                                onInput={(e) => { setData({ ...data, address: e.target.value }) }}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col lg="4">
                        <AutoCompleteInput
                            label="Locality"
                            customValue={data?.locality}
                            placeholder="Enter Locality"
                            id="PropertyLocalityAutoComplete"
                            onSelectOption={(e) => { handleSelectLocalityOption(e); console.log(e) }}
                            onInputChange={(value) =>
                                setData({ ...data, locality: value })
                            }
                            predictionType="address"
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
                            <Form.Label>Tower/Building<span style={{ color: 'red' }}>*</span></Form.Label>
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
                            {/* <div className="d-flex">
                                </div> */}
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
                                />&nbsp;&nbsp;
                            </Form.Group>&nbsp;&nbsp;
                            {/* <div className="d-flex">
                                </div> */}
                            <Form.Group>
                                <Form.Label>Plot No<span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength="35"
                                    placeholder="Enter Plot No."
                                    value={data?.plotNo}
                                    onInput={(e) => { setData({ ...data, plotNo: e.target.value }) }}
                                />
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error?.plotNo}
                                />&nbsp;&nbsp;
                            </Form.Group>&nbsp;&nbsp;
                            {/* <div className="d-flex">
                                </div> */}
                            <Form.Group>
                                <Form.Label>Total Floors<span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="number"
                                    maxLength="35"
                                    min="1"
                                    placeholder="Enter Floors"
                                    value={data?.totalFloor}
                                    onInput={(e) => { setData({ ...data, totalFloor: e.target.value }) }}
                                />
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error?.totalFloor}
                                />
                            </Form.Group>&nbsp;&nbsp;
                        </div>
                    </Col>
                </Row>

                <div className={"mapLocation my-3"}>
                    <div style={{ height: "120px", overflow: "hidden" }}>
                        <MapComponent
                            p_lat={data?.latitude} p_lng={data?.longitude} />
                    </div>
                </div>


                {/* </form> */}
                <div className="d-flex">
                    <button color="gray">Cancel</button> &nbsp;
                    {/* <Link to="/admin/posts/add-new-post/basic-details">
                        </Link> */}
                    <Buttons name="Back" onClick={() => { showDraftModal() }}></Buttons> &nbsp;
                    <Buttons name="Next" onClick={() => handleValidate()} />
                </div>
            </div>
            <Modal show={ draftModal } onHide={() => { hideDraftModal() }} centered style={{ backgroundImage: 'unset' }}>
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
                                onClick={() => { history.push('/admin/posts/add-new-post/basic-details', {basicDetails : basicdetails}) }} />
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