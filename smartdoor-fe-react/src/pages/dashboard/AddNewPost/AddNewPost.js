import { compose } from "redux";
import Text from "../../../shared/Text/Text";
import mortgage from "../../../assets/images/mortgage.png";
import sell from "../../../assets/images/sell.png";
import { Col, Button, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import residential from "../../../assets/images/Residential.png";
import commercial from "../../../assets/images/Commercial.png";
import nonCommercial from "../../../assets/images/NonCommercial.png";
import Buttons from "../../../shared/Buttons/Buttons";
import { memo, useEffect, useState } from "react";
import { validateNewPost1 } from "../../../common/validations";
import { useHistory } from "react-router-dom";
import { addNewPost } from "../../../common/redux/actions";
import { provideAuth } from "../../../common/helpers/Auth";
import { connect, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { dataURItoByteString } from "react-pdf/dist/umd/shared/utils";
import { InputAdornment, TextField } from "@mui/material";

const AddNewPost = (props) => {
    const location = useLocation();
    const basicdetails = location?.state?.basicDetails
    const { userData } = provideAuth();
    const {addNewPostReducer} = props
    const [data, setData] = useState({
        postedById: userData.userid,
        propertyCategory: '',
        propertyType: '',
        propertySubType: '',
        bedRooms: null,
        numberOfHalls: null,
        kitchens: null,
        numberOfBaths: null,
        balcony: null,
        coveredParking: null,
        openParking: null,
        type: '',
        isNegotiable: null,
        commercialProjectType: '',
        commercialArea: '',
        commercialType: '',
        leaseType: null,
        preferredFor: null,
        purpose: '',
        kitchenPatry: '',
        plotArea: null,
        attachedOpenTerraceArea: null,
        attachedOpenAreaOrGarden: null,
        maintenanceCost: null,
        propertyRate: null,
        propertyAge: null,
        smartdoorPropertyId: null,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        let basicDetails = addNewPostReducer.data
        console.log(basicdetails)
        if(basicdetails !== null || basicdetails !== undefined) {
            setData(basicdetails)
        }
        // setData(addNewPostReducer.data)
    }, [addNewPostReducer]);

    const assignPropertyCategory = (type) => {
        setData({ ...data, propertyCategory: type });
    };
    const assignPropertyType = (type) => {
        setData({
            ...data, postedById: userData.userid, propertyType: type, propertySubType: '', bedRooms: null, numberOfHalls: null, numberOfBaths: null,
            kitchens: null, kitchenPatry: null, balcony: null, type: '', isNegotiable: null, coveredParking: null,
            openParking: null, preferredFor: null, purpose: null, commercialProjectType: null,
            plotArea: null, attachedOpenTerraceArea: null, attachedOpenAreaOrGarden: null, maintenanceCost: null,
            propertyAge: null, propertyRate: null
        })
    };
    const assignPropertySubType = (type) => {
        setData({ ...data, propertySubType: type });
    };
    const assignBedroomCount = (count) => {
        setData({ ...data, bedRooms: count });
    };
    const assignHallCount = (count) => {
        setData({ ...data, numberOfHalls: count });
    };
    const assignKitchenCount = (count) => {
        setData({ ...data, kitchens: count });
    };
    const assignBathroomCount = (count) => {
        setData({ ...data, numberOfBaths: count });
    };
    const assignBalconyCount = (count) => {
        setData({ ...data, balcony: count });
    };
    const assignCoveredParking = (count) => {
        setData({ ...data, coveredParking: count });
    };
    const assignOpenParking = (count) => {
        setData({ ...data, openParking: count });
    };
    const assignType = (count) => {
        setData({ ...data, type: count });
    };
    const assignCommercialArea = (count) => {
        setData({ ...data, commercialArea: count });
    };
    const assignCommercialType = (count) => {
        setData({ ...data, commercialType: count });
    };

    const [error, setError] = useState({});
    const history = useHistory();

    const handleValidate = () => {
        let validate = validateNewPost1(data);
        setError(validate.errors);
        if (validate.isValid) {
            handleSubmit();
        }
    };
    
    const handleSubmit = async () => {
        try {
            let response = await dispatch(addNewPost(data))
            console.log(response)
            if(data.smartdoorPropertyId === undefined || data.smartdoorPropertyId === null) {
                data.smartdoorPropertyId = response?.data?.resourceData?.propertyId;
              }
            history.push('/admin/posts/add-new-post/address',{basicDetails : data})
        } catch (error) {
            console.error('Error:', error.message);   
        }
    }

    return (
        <>
            <div className="whiteBg">
                <Text
                    size="medium"
                    fontWeight="mediumbold"
                    color="secondryColor"
                    text="Basic Details">
                </Text>
                <div className="d-flex">
                    <Text
                        className="text-capitalize mt-2 h5"
                        size="medium"
                        fontWeight="mediumbold"
                        color="secondryColor"
                        text="I want to post my property for">
                    </Text>
                    {/* <span style={{ color: 'red', fontSize: '25px' }}>*</span>  */}
                </div>
                <div className="d-flex">
                    <Col lg="1" style={{ background: 'white', borderRadius: 8, border: data?.propertyCategory === 'Rent' ? '2px #BE1452 solid' : '2px #DEDEDE solid' }}
                        onClick={() => assignPropertyCategory('Rent')} >
                        <img className="p-2" src={mortgage} alt="" style={{ alignItems: 'center', width: '200px', height: '50px' }}></img>
                        <Text className="text-center mb-2" size="" text="Rent" />
                    </Col> &nbsp; &nbsp;
                    <Col lg="1" style={{ background: 'white', borderRadius: 8, border: data?.propertyCategory === 'Sell' ? '2px #BE1452 solid' : '2px #DEDEDE solid' }}
                        value="Sell" onClick={() => assignPropertyCategory('Sell')}>
                        <img className="p-2" src={sell} alt="" style={{ alignItems: 'center', width: '200px', height: '50px' }}></img>
                        <Text className="text-center mb-2" size="" text="Sell" />
                    </Col>
                </div>
                <Text
                    className="pt-2"
                    size="xsmall"
                    color="dangerText"
                    text={error?.propertyCategory}>
                </Text>
                <div className="d-flex">
                    <Text
                        className="text-capitalize mt-4 h5"
                        size="medium"
                        fontWeight="mediumbold"
                        color="secondryColor"
                        text="Property Type">
                    </Text>
                    {/* <span className="mt-3" style={{ color: 'red', fontSize: '25px' }}>*</span>  */}
                </div>
                <div className="d-flex">
                    <Col lg="1" style={{ background: 'white', borderRadius: 8, border: data?.propertyType === 'Residential' ? '2px #BE1452 solid' : '2px #DEDEDE solid' }}
                        onClick={() => assignPropertyType('Residential')}>
                        <img className="p-2" src={residential} alt="" style={{ alignItems: 'center', width: '200px', height: '50px', color: '#BE1452' }}></img>
                        <Text className="text-center mb-2" size="" text="Residential" />
                    </Col> &nbsp; &nbsp;
                    <Col lg="1" style={{ background: 'white', borderRadius: 8, border: data?.propertyType === 'Commercial' ? '2px #BE1452 solid' : '2px #DEDEDE solid' }}
                        onClick={async () => assignPropertyType('Commercial')} >
                        <img className="p-2" src={commercial} alt="" style={{ alignItems: 'center', width: '200px', height: '50px' }}></img>
                        <Text className="text-center mb-2" size="" text="Commercial" />
                    </Col> &nbsp; &nbsp;
                    <Col lg="1" style={{ background: 'white', borderRadius: 8, border: data?.propertyType === 'Semi Commercial' ? '2px #BE1452 solid' : '2px #DEDEDE solid' }}
                        onClick={async () => assignPropertyType('Semi Commercial')} >
                        <img className="p-2" src={nonCommercial} alt="" style={{ alignItems: 'center', width: '200px', height: '50px' }}></img>
                        <Text className="text-center mb-2" size="" text="Semi Commercial" />
                    </Col>
                </div>
                <Text
                    className="pt-2"
                    size="xsmall"
                    color="dangerText"
                    text={error.propertyType}>
                </Text>
                {(data?.propertyType === 'Residential' || data?.propertyType === 'Semi Commercial') && (
                    <>
                        {data.propertyType === 'Residential' && (
                            <>
                                <Text
                                    className="text-capitalize mt-4 h5"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="What type of residential property?">
                                </Text>

                                <div className="d-flex">
                                    <Col lg="1" style={{ background: 'white', borderRadius: 8, border: data.propertySubType === 'Apartment' ? '2px #BE1452 solid' : '2px #DEDEDE solid' }}
                                        onClick={() => assignPropertySubType('Apartment')} >
                                        <Text className="text-center mb-2 mt-2" fontWeight="mediumbold" color="secondryColor" text="Apartment" />
                                    </Col> &nbsp; &nbsp;
                                    <Col lg="2" style={{ background: 'white', borderRadius: 8, border: data.propertySubType === 'Builder Floor' ? '2px #BE1452 solid' : '2px #DEDEDE solid' }}
                                        onClick={() => assignPropertySubType('Builder Floor')} >
                                        <Text className="text-center mb-2 mt-2" fontWeight="mediumbold" color="secondryColor" text="Builder Floor" />
                                    </Col> &nbsp; &nbsp;
                                    <Col lg="2" style={{ background: 'white', borderRadius: 8, border: data.propertySubType === 'Independent House Villa' ? '2px #BE1452 solid' : '2px #DEDEDE solid' }}
                                        onClick={() => assignPropertySubType('Independent House Villa')}>
                                        <Text className="text-center mb-2 mt-2" fontWeight="mediumbold" color="secondryColor" text="Independent House Villa" />
                                    </Col>
                                </div>
                                <Text
                                    className="pt-2"
                                    size="xsmall"
                                    color="dangerText"
                                    text={error.propertySubType}>
                                </Text>
                            </>
                        )}
                        {data.propertyType === 'Semi Commercial' && (
                            <>
                                <Text
                                    className="text-capitalize mt-4 h5"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="What type of residential property?">
                                </Text>

                                <div className="d-flex">
                                    <Col lg="1" style={{ background: 'white', borderRadius: 8, border: data.propertySubType === 'Apartment' ? '2px #BE1452 solid' : '2px #DEDEDE solid' }}
                                        onClick={() => { setData({ ...data, propertySubType: 'Apartment' }) }} >
                                        <Text className="text-center mb-2 mt-2" fontWeight="mediumbold" color="secondryColor" text="Apartment" />
                                    </Col> &nbsp; &nbsp;
                                    <Col lg="2" style={{ background: 'white', borderRadius: 8, border: data.propertySubType === 'Independent House Villa' ? '2px #BE1452 solid' : '2px #DEDEDE solid' }}
                                        onClick={() => { setData({ ...data, propertySubType: 'Independent House Villa' }) }}>
                                        <Text className="text-center mb-2 mt-2" fontWeight="mediumbold" color="secondryColor" text="Independent House Villa" />
                                    </Col>
                                </div>
                                <Text
                                    className="pt-2"
                                    size="xsmall"
                                    color="dangerText"
                                    text={error.propertySubType}>
                                </Text>
                            </>
                        )}
                        <div className="d-flex">
                            <div>
                                <Text
                                    className="text-capitalize mt-4 h6"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="All Bedrooms">
                                </Text>
                                <div className="d-flex">
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.bedRooms === 1 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignBedroomCount(1)}>1</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.bedRooms === 2 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignBedroomCount(2)}>2</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.bedRooms === 3 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignBedroomCount(3)}>3</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.bedRooms === 4 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignBedroomCount(4)}>4</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.bedRooms === '4+' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignBedroomCount('4+')}>4+</Button>
                                </div>
                                <Text
                                    className="pt-2"
                                    size="xsmall"
                                    color="dangerText"
                                    text={error.bedRooms}>
                                </Text>
                            </div>
                            <Col lg="1"></Col>
                            <div>
                                <Text
                                    className="text-capitalize mt-4 h6"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="Hall">
                                </Text>
                                <div className="d-flex">
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfHalls === 0 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignHallCount(0)}>0</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfHalls === 1 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignHallCount(1)}>1</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfHalls === 2 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignHallCount(2)}>2</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfHalls === 3 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignHallCount(3)}>3</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfHalls === '3+' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignHallCount('3+')}>3+</Button>
                                </div>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.numberOfHalls}
                                />
                            </div>
                            <Col lg="1"></Col>
                            <div>
                                <Text
                                    className="text-capitalize mt-4 h6"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="Kitchen">
                                </Text>
                                <div className="d-flex">
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.kitchens === 1 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignKitchenCount(1)}>1</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.kitchens === 2 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignKitchenCount(2)}>2</Button> &nbsp;
                                </div>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.kitchens}
                                />
                            </div>
                        </div>
                        <div className="d-flex">
                            <div>
                                <Text
                                    className="text-capitalize mt-4 h6"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="Bathrooms">
                                </Text>
                                <div className="d-flex">
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfBaths === 1 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignBathroomCount(1)}>1</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfBaths === 2 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignBathroomCount(2)}>2</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfBaths === 3 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignBathroomCount(3)}>3</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfBaths === 4 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignBathroomCount(4)}>4</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfBaths === '4+' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignBathroomCount('4+')}>4+</Button>
                                </div>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.numberOfBaths}
                                />
                            </div>
                            <Col lg="1"></Col>
                            <div>
                                <Text
                                    className="text-capitalize mt-4 h6"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="Balcony">
                                </Text>
                                <div className="d-flex">
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.balcony === 0 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignBalconyCount(0)}>0</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.balcony === 1 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignBalconyCount(1)}>1</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.balcony === 2 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignBalconyCount(2)}>2</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.balcony === 3 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignBalconyCount(3)}>3</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.balcony === 4 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignBalconyCount(4)}>4</Button>&nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.balcony === '4+' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignBalconyCount('4+')}>4+</Button>
                                </div>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.balcony}
                                />
                            </div>
                            <div className="px-3"></div>
                            <div className="ms-5">
                                <Text
                                    className="text-capitalize mt-4 h6"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="Covered Parking">
                                </Text>
                                <div className="d-flex">
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 0 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignCoveredParking(0)}>0</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 1 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignCoveredParking(1)}>1</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 2 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignCoveredParking(2)}>2</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 3 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignCoveredParking(3)}>3</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 4 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignCoveredParking(4)}>4</Button>
                                </div>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.coveredParking}
                                />
                            </div>
                        </div>
                        <div className="d-flex">
                            <div>
                                <Text
                                    className="text-capitalize mt-4 h6"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="Open Parking">
                                </Text>
                                <div className="d-flex">
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 1 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignOpenParking(1)}>1</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 2 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignOpenParking(2)}>2</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 3 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignOpenParking(3)}>3</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 4 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignOpenParking(4)}>4</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === '4+' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignOpenParking('4+')}>4+</Button>
                                </div>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.openParking}
                                />
                            </div>
                            <Col lg="1"></Col>
                            <div>
                                <Text
                                    className="text-capitalize mt-4 h6"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="Type">
                                </Text>
                                <div className="d-flex">
                                    <Button className="py-2 px-1" style={{ background: 'none', borderColor: data.type === 'Gated Community' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignType('Gated Community')}>Gated Community</Button> &nbsp;
                                    <Button className="py-2 px-1" style={{ background: 'none', borderColor: data.type === 'Direct Road Access' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignType('Direct Road Access')}>Direct Road Access</Button> &nbsp;
                                </div>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.type}
                                />
                            </div>
                            <div className="px-2"></div>
                            <div className="px-5">
                                <Text
                                    className="text-capitalize mt-4 h6"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="Negotiable">
                                </Text>
                                <div className="d-flex">
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.isNegotiable === true ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, isNegotiable: true }) }}>Yes</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.isNegotiable === false ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, isNegotiable: false }) }}>No</Button> &nbsp; &nbsp;
                                </div>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.isNegotiable}
                                />
                            </div>
                        </div>
                    </>
                )}
                {data?.propertyType === 'Commercial' && (
                    <>
                        <Text
                            className="text-capitalize mt-4 h5"
                            size="medium"
                            fontWeight="mediumbold"
                            color="secondryColor"
                            text="Smart Lock Facility currently not applicable">
                        </Text>
                        <div className="d-flex">
                            <Col lg="1" style={{ background: 'white', borderRadius: 8, border: data.commercialProjectType === 'Shop' ? '2px #BE1452 solid' : '2px #DEDEDE solid' }}
                                onClick={() => { setData({ ...data, commercialProjectType: 'Shop' }) }} >
                                <Text className="text-center mb-2 mt-2" fontWeight="mediumbold" color="secondryColor" text="Shop" />
                            </Col> &nbsp; &nbsp;
                            <Col lg="2" style={{ background: 'white', borderRadius: 8, border: data.commercialProjectType === 'Restaurant' ? '2px #BE1452 solid' : '2px #DEDEDE solid' }}
                                onClick={() => { setData({ ...data, commercialProjectType: 'Restaurant' }) }} >
                                <Text className="text-center mb-2 mt-2" fontWeight="mediumbold" color="secondryColor" text="Restaurant" />
                            </Col> &nbsp; &nbsp;
                            <Col lg="2" style={{ background: 'white', borderRadius: 8, border: data.commercialProjectType === 'Office' ? '2px #BE1452 solid' : '2px #DEDEDE solid' }}
                                onClick={() => { setData({ ...data, commercialProjectType: 'Office' }) }}>
                                <Text className="text-center mb-2 mt-2" fontWeight="mediumbold" color="secondryColor" text="Office" />
                            </Col>
                        </div>
                        <Text
                            color="dangerText"
                            size="xSmall"
                            className="pt-2"
                            text={error.commercialProjectType}
                        />
                        <Text
                            className="text-capitalize mt-4 h6"
                            size="medium"
                            fontWeight="mediumbold"
                            color="secondryColor"
                            text="Area">
                        </Text>
                        <div className="d-flex">
                            <Col lg="1" style={{ background: 'white', borderRadius: 8, border: data.commercialArea === 'HighStreet' ? '2px #BE1452 solid' : '2px #DEDEDE solid' }}
                                onClick={() => assignCommercialArea('HighStreet')} >
                                <Text className="text-center mb-2 mt-2" fontWeight="mediumbold" color="secondryColor" text="HighStreet" />
                            </Col> &nbsp; &nbsp;
                            <Col lg="2" style={{ background: 'white', borderRadius: 8, border: data.commercialArea === 'Mall' ? '2px #BE1452 solid' : '2px #DEDEDE solid' }}
                                onClick={() => assignCommercialArea('Mall')} >
                                <Text className="text-center mb-2 mt-2" fontWeight="mediumbold" color="secondryColor" text="Mall" />
                            </Col> &nbsp; &nbsp;
                            <Col lg="2" style={{ background: 'white', borderRadius: 8, border: data.commercialArea === 'Complex' ? '2px #BE1452 solid' : '2px #DEDEDE solid' }}
                                onClick={() => assignCommercialArea('Complex')}>
                                <Text className="text-center mb-2 mt-2" fontWeight="mediumbold" color="secondryColor" text="Complex" />
                            </Col> &nbsp; &nbsp;
                            <Col lg="2" style={{ background: 'white', borderRadius: 8, border: data.commercialArea === 'Standalone' ? '2px #BE1452 solid' : '2px #DEDEDE solid' }}
                                onClick={() => assignCommercialArea('Standalone')}>
                                <Text className="text-center mb-2 mt-2" fontWeight="mediumbold" color="secondryColor" text="Standalone" />
                            </Col>
                        </div>
                        <Text
                            color="dangerText"
                            size="xSmall"
                            className="pt-2"
                            text={error.commercialArea}
                        />
                        <Text
                            className="text-capitalize mt-4 h6"
                            size="medium"
                            fontWeight="mediumbold"
                            color="secondryColor"
                            text="Type">
                        </Text>
                        <div className="d-flex">
                            <Col lg="2" style={{ background: 'white', borderRadius: 8, border: data.commercialType === 'Warm shell' ? '2px #BE1452 solid' : '2px #DEDEDE solid' }}
                                onClick={() => assignCommercialType('Warm shell')} >
                                <Text className="text-center mb-2 mt-2" fontWeight="mediumbold" color="secondryColor" text="Warm shell" />
                            </Col> &nbsp; &nbsp;
                            <Col lg="2" style={{ background: 'white', borderRadius: 8, border: data.commercialType === 'Bare shell' ? '2px #BE1452 solid' : '2px #DEDEDE solid' }}
                                onClick={() => assignCommercialType('Bare shell')} >
                                <Text className="text-center mb-2 mt-2" fontWeight="mediumbold" color="secondryColor" text="Bare shell" />
                            </Col> &nbsp; &nbsp;
                            <Col lg="2" style={{ background: 'white', borderRadius: 8, border: data.commercialType === 'Furnished' ? '2px #BE1452 solid' : '2px #DEDEDE solid' }}
                                onClick={() => assignCommercialType('Furnished')}>
                                <Text className="text-center mb-2 mt-2" fontWeight="mediumbold" color="secondryColor" text="Furnished" />
                            </Col>
                        </div>
                        <Text
                            color="dangerText"
                            size="xSmall"
                            className="pt-2"
                            text={error.commercialType}
                        />
                        <div className="d-flex">
                            <div>
                                <Text
                                    className="text-capitalize mt-4 h6"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="restrooms">
                                </Text>
                                <div className="d-flex">
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfBaths === 0 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, numberOfBaths: 0 }) }}>0</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfBaths === 1 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, numberOfBaths: 1 }) }}>1</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfBaths === 2 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, numberOfBaths: 2 }) }}>2</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfBaths === 3 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, numberOfBaths: 3 }) }}>3</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfBaths === '3+' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, numberOfBaths: '3+' }) }}>3+</Button>
                                </div>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.numberOfBaths}
                                />
                            </div>
                            <Col lg="2"></Col>
                            <div>
                                <Text
                                    className="text-capitalize mt-4 h6"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="Common reception">
                                </Text>
                                <div className="d-flex">
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.commonReception === 0 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, commonReception: 0 }) }}>0</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.commonReception === 1 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, commonReception: 1 }) }}>1</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.commonReception === 2 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, commonReception: 2 }) }}>2</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.commonReception === 3 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, commonReception: 3 }) }}>3</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.commonReception === '3+' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, commonReception: '3+' }) }}>3+</Button>
                                </div>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.commonReception}
                                />
                            </div>
                            <Col lg="2"></Col>
                            <div>
                                <Text
                                    className="text-capitalize mt-4 h6"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="Kitchen/Pantry">
                                </Text>
                                <div className="d-flex">
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.kitchenPatry === 'Yes' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, kitchenPatry: 'Yes' }) }}>Yes</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.kitchenPatry === 'No' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, kitchenPatry: 'No' }) }}>No</Button> &nbsp; &nbsp;
                                </div>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.kitchenPatry}
                                />
                            </div>
                        </div>
                        <div className="d-flex">
                            <div>
                                <Text
                                    className="text-capitalize mt-4 h6"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="Covered Parking">
                                </Text>
                                <div className="d-flex">
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 0 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignCoveredParking(0)}>0</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 1 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignCoveredParking(1)}>1</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 2 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignCoveredParking(2)}>2</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 3 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignCoveredParking(3)}>3</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 4 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignCoveredParking(4)}>4</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === '4+' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignCoveredParking('4+')}>4+</Button>
                                </div>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.coveredParking}
                                />
                            </div>
                            <div className="col-1"></div>
                            <div>
                                <Text
                                    className="text-capitalize mt-4 h6"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="Open Parking">
                                </Text>
                                <div className="d-flex">
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 0 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignOpenParking(0)}>0</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 1 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignOpenParking(1)}>1</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 2 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignOpenParking(2)}>2</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 3 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignOpenParking(3)}>3</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 4 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignOpenParking(4)}>4</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === '4+' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignOpenParking('4+')}>4+</Button>
                                </div>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.openParking}
                                />
                            </div>
                            <div className="col-1"></div>
                            <div>
                                <Text
                                    className="text-capitalize mt-4 h6"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="Negotiable">
                                </Text>
                                <div className="d-flex">
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.isNegotiable === true ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, isNegotiable: true }) }}>Yes</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.isNegotiable === false ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, isNegotiable: false }) }}>No</Button> &nbsp; &nbsp;
                                </div>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.isNegotiable}
                                />
                            </div>
                        </div>
                        <div className="d-flex">
                            <div>
                                <Text
                                    className="text-capitalize mt-4 h6"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="Type">
                                </Text>
                                <div className="d-flex">
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.type === 'Gated Community' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignType('Gated Community')}>Gated Community</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.type === 'Direct Road Access' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignType('Direct Road Access')}>Direct Road Access</Button> &nbsp; &nbsp;
                                </div>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.type}
                                />
                            </div>
                            <div className="col-1"></div>
                            <div>
                                <Text
                                    className="text-capitalize mt-4 h6"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="Type of Lease">
                                </Text>
                                <div className="d-flex">
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.leaseType === 'Any' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, leaseType: 'Any' }) }}>Any</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.leaseType === 'Individual Lease' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, leaseType: 'Individual Lease' }) }}>Individual Lease</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.leaseType === 'Company Lease' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, leaseType: 'Company Lease' }) }}>Company Lease</Button>
                                </div>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.leaseType}
                                />
                            </div>
                        </div>
                    </>
                )}
                {data?.propertyType === 'Semi Commercial' && (
                    <>
                        <div className="d-flex">
                            <div>
                                <Text
                                    className="text-capitalize mt-4 h6"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="Type of Lease">
                                </Text>
                                <div className="d-flex">
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.leaseType === 'Any' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, leaseType: 'Any' }) }}>Any</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.leaseType === 'Individual Lease' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, leaseType: 'Individual Lease' }) }}>Individual Lease</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.leaseType === 'Company Lease' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, leaseType: 'Company Lease' }) }}>Company Lease</Button>
                                </div>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.leaseType}
                                />
                            </div>
                            <div className="col-1"></div>
                            <div>
                                <Text
                                    className="text-capitalize mt-4 h6"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="Preferred For">
                                </Text>
                                <div className="d-flex">
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.preferredFor === 'Any' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, preferredFor: 'Any' }) }}>Any</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.preferredFor === 'Salaried' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, preferredFor: 'Salaried' }) }}>Salaried</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.preferredFor === 'Self Employed' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, preferredFor: 'Self Employed' }) }}>Self Employed</Button>
                                </div>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.preferredFor}
                                />
                            </div>
                        </div>
                        <div>
                            <Text
                                className="text-capitalize mt-4 h6"
                                size="medium"
                                fontWeight="mediumbold"
                                color="secondryColor"
                                text="Purpose">
                            </Text>
                            <div className="d-flex">
                                <Button className="py-2" style={{ background: 'none', borderColor: data.purpose === 'Any' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                    onClick={() => { setData({ ...data, purpose: 'Any' }) }}>Any</Button> &nbsp; &nbsp;
                                <Button className="py-2" style={{ background: 'none', borderColor: data.purpose === 'Guest House' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                    onClick={() => { setData({ ...data, purpose: 'Guest House' }) }}>Guest House</Button> &nbsp; &nbsp;
                                <Button className="py-2" style={{ background: 'none', borderColor: data.purpose === 'Bachelors' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                    onClick={() => { setData({ ...data, purpose: 'Bachelors' }) }}>Bachelors</Button> &nbsp; &nbsp;
                                <Button className="py-2" style={{ background: 'none', borderColor: data.purpose === 'Family' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                    onClick={() => { setData({ ...data, purpose: 'Family' }) }}>Family</Button>
                            </div>
                            <Text
                                color="dangerText"
                                size="xSmall"
                                className="pt-2"
                                text={error.purpose}
                            />
                        </div>
                    </>
                )}
                <form noValidate >
                    <Row className="mt-4">
                        <Col lg="4">
                            {/* <Form.Group>
                                <Form.Label>Age Of Property</Form.Label>
                                <Form.Control
                                    type="number"
                                    maxLength="35"
                                    min={1}
                                    value={data.propertyAge}
                                    placeholder="Enter Property Age"
                                    onInput={(e) => { setData({ ...data, propertyAge: e.target.value }) }}
                                />
                            </Form.Group> */}
                            <TextField
                                className="w-100"
                                required 
                                borderRadius={10}
                                type="number"
                                min={1}
                                id="outlined-required"
                                label="Enter Property Age"
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">sqft</InputAdornment>,
                                }}
                                defaultValue={data?.propertyAge}
                                onInput={(e) => { setData({ ...data, propertyAge: e.target.value }) }}
                                />
                            <Text
                                color="dangerText"
                                size="xSmall"
                                className="pt-2"
                                text={error.propertyAge}
                            />
                        </Col>
                        <Col lg="4">
                            {/* <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    maxLength="35"
                                    min={1}
                                    value={data.propertyRate}
                                    placeholder="Enter Property Price"
                                    onInput={(e) => { setData({ ...data, propertyRate: e.target.value }) }}
                                />
                            </Form.Group> */}
                            <TextField
                                className="w-100"
                                required
                                type="number"
                                min={1}
                                id="outlined-required"
                                label="Enter Property Price"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                                }}
                                defaultValue={data?.propertyRate}
                                onInput={(e) => { setData({ ...data, propertyRate: Number(e.target.value) }) }}
                                />
                            <Text
                                color="dangerText"
                                size="xSmall"
                                className="pt-2"
                                text={error.propertyRate}
                            />
                        </Col>
                        <Col lg="4">
                            {/* <Form.Group>
                                <Form.Label>Maintenance Charges (Monthly)</Form.Label>
                                <Form.Control
                                    type="number"
                                    maxLength="35"
                                    min={0}
                                    placeholder="Enter Maintenance charges"
                                    value={data.maintenanceCost}
                                    onInput={(e) => { setData({ ...data, maintenanceCost: e.target.value }) }}
                                />
                            </Form.Group> */}
                            <TextField
                                className="w-100"
                                required
                                type="number"
                                min={1}
                                id="outlined-required"
                                label="Enter Maintenance charges"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                                }}
                                defaultValue={data?.maintenanceCost}
                                onInput={(e) => { setData({ ...data, maintenanceCost: Number(e.target.value) }) }}
                                />
                            <Text
                                color="dangerText"
                                size="xSmall"
                                className="pt-2"
                                text={error.maintenanceCost}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4">
                            {/* <Form.Group>
                                <Form.Label>Buildup Area(Including Balcony)</Form.Label>
                                <Form.Control
                                    type="number"
                                    maxLength="35"
                                    min={1}
                                    placeholder="Enter Build Up"
                                    value={data.plotArea}
                                    onInput={(e) => { setData({ ...data, plotArea: e.target.value }) }}
                                />
                            </Form.Group> */}
                            <TextField
                                className="w-100 mt-4"
                                required style={{borderRadius:10}}
                                type="number"
                                min={1}
                                id="outlined-required"
                                label="Build Up Area (Including Balcony)"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Sq.Ft.</InputAdornment>,
                                }}
                                defaultValue={data?.plotArea}
                                onInput={(e) => { setData({ ...data, plotArea: Number(e.target.value) }) }}
                                />
                            <Text
                                color="dangerText"
                                size="xSmall"
                                className="pt-2"
                                text={error.plotArea}
                            />
                        </Col>
                        <Col lg="4">
                            {/* <Form.Group>
                                <Form.Label>Attached Open Terrace Area</Form.Label>
                                <Form.Control
                                    type="number"
                                    maxLength="35"
                                    placeholder="Enter Open Terrace Area"
                                    value={data.attachedOpenTerraceArea}
                                    onInput={(e) => { setData({ ...data, attachedOpenTerraceArea: e.target.value }) }}
                                />
                            </Form.Group> */}
                            <TextField
                                className="w-100 mt-4"
                                required
                                type="number"
                                min={1}
                                id="outlined-required"
                                label="Attached Open Terrace Area"
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">Sq.Ft.</InputAdornment>,
                                }}
                                defaultValue={data?.attachedOpenTerraceArea}
                                onInput={(e) => { setData({ ...data, attachedOpenTerraceArea: Number(e.target.value) }) }}
                                />
                            <Text
                                color="dangerText"
                                size="xSmall"
                                className="pt-2"
                                text={error.attachedOpenTerraceArea}
                            />
                        </Col>
                        <Col lg="4">
                            {/* <Form.Group>
                                <Form.Label>Attached Open Area/Garden</Form.Label>
                                <Form.Control
                                    type="number"
                                    maxLength="35"
                                    placeholder="Enter Open Area/Garden"
                                    value={data.attachedOpenAreaOrGarden}
                                    onInput={(e) => { setData({ ...data, attachedOpenAreaOrGarden: e.target.value }) }}
                                />
                            </Form.Group> */}
                            <TextField
                                className="w-100 mt-4"
                                required
                                type="number"
                                min={1}
                                id="outlined-required"
                                label="Attached Open Area/Garden"
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">Sq.Ft.</InputAdornment>,
                                }}
                                defaultValue={data?.attachedOpenAreaOrGarden}
                                onInput={(e) => { setData({ ...data, attachedOpenAreaOrGarden: Number(e.target.value) }) }}
                                />
                            <Text
                                color="dangerText"
                                size="xSmall"
                                className="pt-2"
                                text={error.attachedOpenAreaOrGarden}
                            />
                        </Col>
                    </Row>
                </form>
                <div className="d-flex mt-4">
                    <Buttons type="button" size={"medium"} color={"secondary"} onClick={() => {
                        history.push('/admin/advisors')
                    }} name="Cancel" /> &nbsp;
                    <Buttons name="Next" onClick={() => handleValidate()} />
                </div>
            </div>
        </>
    )
}

const mapStateToProps = ({addNewPostReducer}) => ({
    addNewPostReducer
})

const actions = {
    addNewPost
}

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(AddNewPost)