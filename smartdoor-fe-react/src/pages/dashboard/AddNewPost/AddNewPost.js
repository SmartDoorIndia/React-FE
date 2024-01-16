import { compose } from "redux";
import Text from "../../../shared/Text/Text";
import { Col, Button, Row, Card, Modal } from "react-bootstrap";
import sellActive from "../../../assets/svg/sellActive.svg"
import sellInactive from "../../../assets/svg/sellInactive.svg"
import mortgageActive from "../../../assets/svg/mortgageAactive.svg"
import mortgageInactive from "../../../assets/svg/mortgageInactive.svg"
import residentialActive from "../../../assets/svg/residentialActive.svg"
import residentialInactive from "../../../assets/svg/residentialInactive.svg"
import commercialACtive from "../../../assets/svg/commercialActive.svg"
import commercialInaCtive from "../../../assets/svg/commercialInactive.svg"
import semiCommercialActive from "../../../assets/svg/SemiCommercialActive.svg"
import semiCommercialInactive from "../../../assets/svg/SemiCommercialInactive.svg"
import Buttons from "../../../shared/Buttons/Buttons";
import { memo, useCallback, useEffect, useState } from "react";
import { validateNewPost1 } from "../../../common/validations";
import { useHistory } from "react-router-dom";
import { addNewPost, getPropertyDetails } from "../../../common/redux/actions";
import { provideAuth } from "../../../common/helpers/Auth";
import { connect, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { InputAdornment, TextField } from "@mui/material";

const AddNewPost = (props) => {
    const location = useLocation();
    const { userData } = provideAuth();
    const {addNewPostReducer} = props
    const [propertyData, setpropertyData] = useState(location?.state?.propertyData)
    const [data, setData] = useState({
        postedById: userData.userid,
        propertyCategory: propertyData?.propertyCategory === "Rent" ? 'Lease': propertyData?.propertyCategory,
        propertyType: propertyData?.propertyType,
        propertySubType: propertyData?.propertySubType,
        furnishedText: propertyData?.propertyInfoResponse?.furnishedText === null ? '' : propertyData?.propertyInfoResponse?.furnishedText, 
        bedRooms: propertyData?.bedRooms === null ? (0) : (propertyData?.bedRooms),
        numberOfHalls: propertyData?.hall === null ? 0 : Number(propertyData?.hall),
        kitchens: propertyData?.kitchen === null ? 0 : Number(propertyData?.kitchen),
        numberOfBaths: propertyData?.numberOfBath === null ? 0 : Number(propertyData?.numberOfBath),
        restRoom: propertyData?.propertyInfoResponse?.restRoom === null ? 0 : Number(propertyData?.propertyInfoResponse?.restRoom),
        balcony: propertyData?.propertyInfoResponse?.balcony === null ? 0 : Number(propertyData?.propertyInfoResponse?.balcony),
        coveredParking: propertyData?.propertyInfoResponse?.coveredParking === null ? 0 : Number(propertyData?.propertyInfoResponse?.coveredParking),
        openParking: propertyData?.propertyInfoResponse?.openParking === null ? 0 : Number(propertyData?.propertyInfoResponse?.openParking),
        type: propertyData?.propertyInfoResponse?.type === null ? "" : (propertyData?.propertyInfoResponse?.type),
        isNegotiable: propertyData?.negotiable === true ? true : false,
        commercialProjectType: propertyData?.propertyInfoResponse?.commercialProjectType === null ? "" : (propertyData?.propertyInfoResponse?.commercialProjectType),
        commercialArea: propertyData?.propertyInfoResponse?.commercialArea === null ? "" : (propertyData?.propertyInfoResponse?.commercialArea),
        commercialType: propertyData?.propertyInfoResponse?.commercialType === null ? "" : (propertyData?.propertyInfoResponse?.commercialType),
        commonReception: propertyData?.propertyInfoResponse?.commonReception === null ? "" : (propertyData?.propertyInfoResponse?.commonReception),
        leaseType: propertyData?.leaseType === null ? "" : (propertyData?.leaseType),
        preferredFor: propertyData?.preferredFor,
        purpose: propertyData?.purpose === null ? "" : (propertyData?.purpose),
        kitchenPantry: propertyData?.propertyInfoResponse?.kitchenPantry === null ? "" : (propertyData?.propertyInfoResponse?.kitchenPantry),
        plotArea: propertyData?.propertyInfoResponse?.plotArea === null ? 0 : Number(propertyData?.propertyInfoResponse?.plotArea),
        carpetArea: propertyData?.carpetArea === null ? 0 : Number(propertyData?.carpetArea),
        attachedOpenTerraceArea: propertyData?.propertyInfoResponse?.attachedOpenTerraceArea === null ? 0 : Number(propertyData?.propertyInfoResponse?.attachedOpenTerraceArea),
        attachedOpenAreaOrGarden: propertyData?.propertyInfoResponse?.attachedOpenAreaOrGarden === null ? 0 : Number(propertyData?.propertyInfoResponse?.attachedOpenAreaOrGarden),
        maintenanceCost: propertyData?.propertyInfoResponse?.maintenceCost === null ? 0 : Number(propertyData?.propertyInfoResponse?.maintenceCost),
        propertyRate: propertyData?.propertyRate === null ? 0 : (propertyData?.propertyRate),
        propertyAge: propertyData?.propertyInfoResponse?.propertyAge === null ? 0 : Number(propertyData?.propertyInfoResponse?.propertyAge),
        smartdoorPropertyId: propertyData?.smartdoorPropertyId,
        draft: false,
        partial : true
    });
    
    const dispatch = useDispatch();
    const [showAllBedrooms, setShowAllBedrooms] = useState(false)
    const [showAllHalls, setShowAllHalls] = useState(false)
    const [showAllBathrooms, setShowAllBathrooms] = useState(false)
    const [showAllBalcony, setShowAllBalcony] = useState(false)
    const [showAllCoveredParkings, setShowAllCoveredParkings] = useState(false)
    const [showAllOpenParkings, setShowAllOpenParkings] = useState(false)
    const [showAllRestrooms, setShowAllRestrooms] = useState(false)
    const [halfRoomFlag, setHalfRoomFlag] = useState(false)

    // const _getPropertyDetails = useCallback(() => {
    //     getPropertyDetails({ propertyId: basicDetails?.smartdoorPropertyId, userId: userData.userid })
    //        .then((response) => {
    //           if (response.data) {
    //              if (response.data.resourceData && response.data.status === 200) {
    //                 setpropertyData(response.data.resourceData);
    //                 setData(basicDetails)
    //              }
    //           }
    //           console.log("responseSocietyDetails", data);
    //           console.log("owner id", response.data.resourceData?.postedById);
    //        })
    //        .catch((error) => {
    //           console.log("error", error);
    //        });
    //  }, [basicDetails?.smartdoorPropertyId, getPropertyDetails]);

    useEffect(() => {
        console.log(propertyData)
        if(propertyData !== undefined) {
            const bedrooms = (data?.bedRooms?.toString())?.split('.')
            if(bedrooms?.length === 2) {
                if(bedrooms[1] === '5') {
                    setHalfRoomFlag(true)
                    setData({...data, bedRooms : Number(bedrooms[0])})
                }
            }
        }
    }, [addNewPostReducer]);

    const assignPropertyCategory = (type) => {
        setData({ ...data, propertyCategory: type });
    };
    const assignPropertyType = (type) => {
        setData({
            ...data, propertyType: type, propertySubType: '', kitchenPantry: null, commercialProjectType: null,
            plotArea: 0})
        if((data.propertyType === 'Residential' || data.propertyType === 'SemiCommercial') && (type === 'Commercial')) {
            setData({ ...data, propertyType: type, propertySubType: '', bedRooms: null, numberOfHalls: null, numberOfBaths: null,
            kitchens: null, kitchenPantry: null, balcony: null, leaseType: null, preferredFor: null, purpose: null, commercialProjectType: null,
            plotArea: 0})
        }
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

    const assignHalfRoom = () => {
        if(!halfRoomFlag) {
            setHalfRoomFlag(true)
        }
        if(halfRoomFlag) {
            const bedrooms = (data?.bedRooms.toString())?.split('.')
           if(bedrooms?.length === 2) {
            if(bedrooms[1] === '5') {
                setData({...data, bedRooms : Number(bedrooms[0])})
            }
           }
            setHalfRoomFlag(false)
        }
    };

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
            if(draftModal){
                history.push('/admin/advisors')
            }else {
                history.push('/admin/posts/add-new-post/address',{basicDetails : data, propertyId : data?.smartdoorPropertyId})
            }
        } catch (error) {
            console.error('Error:', error.message);   
        }
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
                </div>
                <div className="d-flex">
                    <Col className="cursor-pointer" lg="1" style={{ background: 'white', borderRadius: 8, border: data?.propertyCategory === 'Lease' ? '2px #BE1452 solid' : '2px #DEDEDE solid', cursor:'pointer' }}
                        onClick={() => assignPropertyCategory('Lease')} >
                        <img className="p-2" src={data?.propertyCategory === 'Lease' ? mortgageActive : mortgageInactive} alt="" style={{ alignItems: 'center', width: 'fit-content', height: '50px' }}></img>
                        <Text className="text-center mb-2 cursor-pointer" size="" text="Rent" style={{cursor:'pointer'}} />
                    </Col> &nbsp; &nbsp;
                    <Col className="cursor-pointer" lg="1" style={{ background: 'white', borderRadius: 8, border: data?.propertyCategory === 'Sale' ? '2px #BE1452 solid' : '2px #DEDEDE solid', cursor:'pointer' }}
                        value="Sell" onClick={() => assignPropertyCategory('Sale')}>
                        <img className="p-2" src={data?.propertyCategory === 'Sale' ? sellActive : sellInactive} alt="" style={{ alignItems: 'center', width: 'fit-content', height: '50px' }}></img>
                        <Text className="text-center mb-2 cursor-pointer" size="" text="Sale" style={{cursor:'pointer'}} />
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
                </div>
                <div className="d-flex">
                    <Card style={{ background: 'white', borderRadius: 8, alignItems: 'center', width: 'auto', border: data?.propertyType === 'Residential' ? '2px #BE1452 solid' : '2px #DEDEDE solid', cursor:'pointer' }}
                        onClick={() => assignPropertyType('Residential')}>
                        <img className="p-2" src={data?.propertyType === 'Residential' ? residentialActive : residentialInactive} alt="" style={{ alignItems: 'center', height: '50px', color: '#BE1452' }}></img>
                        <Text  className="p-2" size="" text="Residential" style={{cursor:'pointer'}}/>
                    </Card> &nbsp; &nbsp;
                    <Card style={{ background: 'white', borderRadius: 8, alignItems: 'center', width: 'auto', border: data?.propertyType === 'Commercial' ? '2px #BE1452 solid' : '2px #DEDEDE solid', cursor:'pointer' }}
                        onClick={async () => assignPropertyType('Commercial')} >
                        <img className="p-2" src={data?.propertyType === 'Commercial' ? commercialACtive : commercialInaCtive} alt="" style={{  height: '50px' }}></img>
                        <Text  className="p-2" size="" text="Commercial" style={{cursor:'pointer'}}/>
                    </Card> &nbsp; &nbsp;
                    <Card style={{ background: 'white', borderRadius: 8, alignItems: 'center', width: 'auto', border: data?.propertyType === 'Semi Commercial' ? '2px #BE1452 solid' : '2px #DEDEDE solid', cursor:'pointer' }}
                        onClick={async () => assignPropertyType('Semi Commercial')} >
                        <img className="p-2" src={data?.propertyType === 'Semi Commercial' ? semiCommercialActive : semiCommercialInactive} alt="" style={{ alignItems: 'center', height: '50px' }}></img>
                        <Text  className="" size="" text="Semi" style={{cursor:'pointer'}}/>
                        <Text  className="px-2" size="" text="Commercial" style={{cursor:'pointer'}}/>
                    </Card>
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
                                    <Card style={{ background: 'white', borderRadius: 8, border: data.propertySubType === 'Apartments' ? '2px #BE1452 solid' : '2px #DEDEDE solid', cursor:'pointer' }}
                                        onClick={() => assignPropertySubType('Apartments')} >
                                        <Text className="text-center p-2" fontWeight="mediumbold" color="secondryColor" text="Apartment" style={{cursor:'pointer'}}/>
                                    </Card> &nbsp; &nbsp;
                                    <Card style={{ background: 'white', borderRadius: 8, border: data.propertySubType === 'Builder Floor' ? '2px #BE1452 solid' : '2px #DEDEDE solid', cursor:'pointer' }}
                                        onClick={() => assignPropertySubType('Builder Floor')} >
                                        <Text className="text-center p-2" fontWeight="mediumbold" color="secondryColor" text="Builder Floor" style={{cursor:'pointer'}}/>
                                    </Card> &nbsp; &nbsp;
                                    <Card style={{ background: 'white', borderRadius: 8, border: data.propertySubType === 'Independent House/Villa' ? '2px #BE1452 solid' : '2px #DEDEDE solid', cursor:'pointer' }}
                                        onClick={() => assignPropertySubType('Independent House/Villa')}>
                                        <Text className="text-center p-2" fontWeight="mediumbold" color="secondryColor" text="Independent House Villa" style={{cursor:'pointer'}}/>
                                    </Card>
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
                                    <Card style={{ background: 'white', borderRadius: 8, border: data.propertySubType === 'Apartment' ? '2px #BE1452 solid' : '2px #DEDEDE solid', cursor:'pointer' }}
                                        onClick={() => { setData({ ...data, propertySubType: 'Apartment' }) }} >
                                        <Text className="text-center p-2" fontWeight="mediumbold" color="secondryColor" text="Apartment" style={{cursor:'pointer'}}/>
                                    </Card> &nbsp; &nbsp;
                                    <Card style={{ background: 'white', borderRadius: 8, border: data.propertySubType === 'Independent House/Villa' ? '2px #BE1452 solid' : '2px #DEDEDE solid', cursor:'pointer' }}
                                        onClick={() => { setData({ ...data, propertySubType: 'Independent House/Villa' }) }}>
                                        <Text className="text-center p-2" fontWeight="mediumbold" color="secondryColor" text="Independent House Villa" style={{cursor:'pointer'}}/>
                                    </Card>
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
                                    {!showAllBedrooms ? (
                                        <Button className="py-2" style={{ background: 'none', borderColor: '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => {setShowAllBedrooms(true)}}>4+</Button>
                                    ) : (
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.bedRooms === 5 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => assignBedroomCount(5)}>5</Button>
                                    )}
                                </div>
                                {showAllBedrooms ? (
                                    <div className="d-flex mt-2">
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.bedRooms === 6 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => assignBedroomCount(6)}>6</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.bedRooms === 7 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => assignBedroomCount(7)}>7</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.bedRooms === 8 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => assignBedroomCount(8)}>8</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.bedRooms === 9 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => assignBedroomCount(9)}>9</Button>
                                    </div>
                                ) : (null)}
                                <Text
                                    className="pt-2"
                                    size="15px"
                                    color="#949494"
                                    style={{color:'#949494'}}
                                    text={"You can add Additional .5 room"}>
                                </Text>
                                <Button className="py-2" style={{ background: 'none', borderColor: halfRoomFlag ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => {assignHalfRoom()}}>.5</Button>
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
                                    {!showAllHalls ? (
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfHalls === '3+' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => setShowAllHalls(true)}>3+</Button>
                                    ) : (
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfHalls === 4 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignHallCount(4)}>4</Button>
                                    )} 
                                </div>
                                {showAllHalls ? (
                                    <div className="d-flex mt-2">
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfHalls === 5 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignHallCount(5)}>5</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfHalls === 6 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignHallCount(6)}>6</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfHalls === 7 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignHallCount(7)}>7</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfHalls === 8 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignHallCount(8)}>8</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfHalls === 9 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignHallCount(9)}>9</Button> &nbsp;
                                    </div>
                                ) : (null)}
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
                                    {!showAllBathrooms ? (
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfBaths === '4+' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => setShowAllBathrooms(true)}>4+</Button>
                                    ) : (
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfHalls === 5 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignHallCount(5)}>5</Button>
                                    )}
                                </div>
                                {showAllBathrooms ? (
                                    <div className="d-flex mt-2">
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfBaths === 6 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignBathroomCount(6)}>6</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfBaths === 7 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignBathroomCount(7)}>7</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfBaths === 8 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignBathroomCount(8)}>8</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.numberOfBaths === 9 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignBathroomCount(9)}>9</Button>
                                    </div>
                                ) : (null)}
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.numberOfBaths}
                                />
                            </div>
                            <div className="px-4"></div>
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
                                </div>
                                {showAllBalcony ? (
                                    <div className="d-flex mt-2">
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.balcony === 5 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignBalconyCount(5)}>5</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.balcony === 6 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignBalconyCount(6)}>6</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.balcony === 7 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignBalconyCount(7)}>7</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.balcony === 8 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignBalconyCount(8)}>8</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.balcony === 9 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignBalconyCount(9)}>9</Button>
                                    </div>
                                ) : (
                                    <Button className="py-2 mt-2" style={{ background: 'none', borderColor: data.balcony === '4+' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => setShowAllBalcony(true)}>4+</Button>
                                )}
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.balcony}
                                />
                            </div>
                            <div className="px-5"></div>
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
                                        onClick={() => assignCoveredParking(0)}>0</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 1 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignCoveredParking(1)}>1</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 2 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignCoveredParking(2)}>2</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 3 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignCoveredParking(3)}>3</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 4 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignCoveredParking(4)}>4</Button>
                                </div>
                                {showAllCoveredParkings ? (
                                    <div className="d-flex mt-2">
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.balcony === 5 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignCoveredParking(5)}>5</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 6 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => assignCoveredParking(6)}>6</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 7 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => assignCoveredParking(7)}>7</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 8 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => assignCoveredParking(8)}>8</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 9 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => assignCoveredParking(9)}>9</Button>
                                    </div>
                                ) : (
                                    <Button className="py-2 mt-2" style={{ background: 'none', borderColor: '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                                onClick={() => setShowAllCoveredParkings(true)}>4+</Button>
                                )}
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
                                    {!showAllOpenParkings ? (
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === '4+' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => setShowAllOpenParkings(true)}>4+</Button>
                                    ) : (
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 5 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignOpenParking(5)}>5</Button>
                                    )}
                                </div>
                                {showAllOpenParkings ? (
                                    <div className="d-flex mt-2"> 
                                    
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 6 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignOpenParking(6)}>6</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 7 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => assignOpenParking(7)}>7</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 8 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => assignOpenParking(8)}>8</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 9 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => assignOpenParking(9)}>9</Button>
                                    </div>
                                ) : (null)}
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
                            <Card style={{ background: 'white', borderRadius: 8, border: data.commercialProjectType === 'Shop' ? '2px #BE1452 solid' : '2px #DEDEDE solid', cursor:'pointer' }}
                                onClick={() => { setData({ ...data, commercialProjectType: 'Shop' }) }} >
                                <Text className="text-center p-2" fontWeight="mediumbold" color="secondryColor" text="Shop" style={{cursor:'pointer'}} />
                            </Card> &nbsp; &nbsp;
                            <Card style={{ background: 'white', borderRadius: 8, border: data.commercialProjectType === 'Restaurant' ? '2px #BE1452 solid' : '2px #DEDEDE solid', cursor:'pointer' }}
                                onClick={() => { setData({ ...data, commercialProjectType: 'Restaurant' }) }} >
                                <Text className="text-center p-2" fontWeight="mediumbold" color="secondryColor" text="Restaurant" style={{cursor:'pointer'}} />
                            </Card> &nbsp; &nbsp;
                            <Card style={{ background: 'white', borderRadius: 8, border: data.commercialProjectType === 'Office' ? '2px #BE1452 solid' : '2px #DEDEDE solid', cursor:'pointer' }}
                                onClick={() => { setData({ ...data, commercialProjectType: 'Office' }) }}>
                                <Text className="text-center p-2" fontWeight="mediumbold" color="secondryColor" text="Office" style={{cursor:'pointer'}} />
                            </Card>
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
                            <Card style={{ background: 'white', borderRadius: 8, border: data.commercialArea === 'HighStreet' ? '2px #BE1452 solid' : '2px #DEDEDE solid', cursor:'pointer' }}
                                onClick={() => assignCommercialArea('HighStreet')} >
                                <Text className="text-center p-2" fontWeight="mediumbold" color="secondryColor" text="HighStreet" style={{cursor:'pointer'}} />
                            </Card> &nbsp; &nbsp;
                            <Card style={{ background: 'white', borderRadius: 8, border: data.commercialArea === 'Mall' ? '2px #BE1452 solid' : '2px #DEDEDE solid', cursor:'pointer' }}
                                onClick={() => assignCommercialArea('Mall')} >
                                <Text className="text-center p-2" fontWeight="mediumbold" color="secondryColor" text="Mall" style={{cursor:'pointer'}} />
                            </Card> &nbsp; &nbsp;
                            <Card style={{ background: 'white', borderRadius: 8, border: data.commercialArea === 'Complex' ? '2px #BE1452 solid' : '2px #DEDEDE solid', cursor:'pointer' }}
                                onClick={() => assignCommercialArea('Complex')}>
                                <Text className="text-center p-2" fontWeight="mediumbold" color="secondryColor" text="Complex" style={{cursor:'pointer'}} />
                            </Card> &nbsp; &nbsp;
                            <Card style={{ background: 'white', borderRadius: 8, border: data.commercialArea === 'Standalone' ? '2px #BE1452 solid' : '2px #DEDEDE solid', cursor:'pointer' }}
                                onClick={() => assignCommercialArea('Standalone')}>
                                <Text className="text-center p-2" fontWeight="mediumbold" color="secondryColor" text="Standalone" style={{cursor:'pointer'}} />
                            </Card>
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
                            <Card style={{ background: 'white', borderRadius: 8, border: data.commercialType === 'Warm shell' ? '2px #BE1452 solid' : '2px #DEDEDE solid', cursor:'pointer' }}
                                onClick={() => assignCommercialType('Warm shell')} >
                                <Text className="text-center p-2" fontWeight="mediumbold" color="secondryColor" text="Warm shell" style={{cursor:'pointer'}} />
                            </Card> &nbsp; &nbsp;
                            <Card style={{ background: 'white', borderRadius: 8, border: data.commercialType === 'Bare shell' ? '2px #BE1452 solid' : '2px #DEDEDE solid', cursor:'pointer' }}
                                onClick={() => assignCommercialType('Bare shell')} >
                                <Text className="text-center p-2" fontWeight="mediumbold" color="secondryColor" text="Bare shell" style={{cursor:'pointer'}} />
                            </Card> &nbsp; &nbsp;
                            <Card style={{ background: 'white', borderRadius: 8, border: data.commercialType === 'Furnished' ? '2px #BE1452 solid' : '2px #DEDEDE solid', cursor:'pointer' }}
                                onClick={() => assignCommercialType('Furnished')}>
                                <Text className="text-center p-2" fontWeight="mediumbold" color="secondryColor" text="Furnished" style={{cursor:'pointer'}} />
                            </Card>
                        </div>
                        <Text
                            color="dangerText"
                            size="xSmall"
                            className="pt-2"
                            text={error.commercialType}
                        />
                        {data.commercialType === 'Furnished' ? 
                        <>
                            <div className="mt-2 col-4">
                                <TextField
                                    className="w-100"
                                    type="text"
                                    multiline
                                    maxRows={2}
                                    id="outlined-required"
                                    // label="Enter Property Price"
                                    value={data?.furnishedText}
                                    onInput={(e) => { setData({ ...data, furnishedText: (e.target.value) }) }}
                                    />
                            </div>
                        </> : null}
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
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.restRoom === 0 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, restRoom: 0 }) }}>0</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.restRoom === 1 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, restRoom: 1 }) }}>1</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.restRoom === 2 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, restRoom: 2 }) }}>2</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.restRoom === 3 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, restRoom: 3 }) }}>3</Button> &nbsp;
                                    {!showAllBathrooms ? (
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.restRoom === '3+' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setShowAllBathrooms(true)}}>3+</Button>
                                        ) : (
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.restRoom === 4 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => { setData({ ...data, restRoom: 4 }) }}>4</Button>
                                    )}
                                </div>
                                {showAllBathrooms ? (
                                    <div className="d-flex mt-2">
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.restRoom === 5 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => { setData({ ...data, restRoom: 5 }) }}>5</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.restRoom === 6 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => { setData({ ...data, restRoom: 6 }) }}>6</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.restRoom === 7 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => { setData({ ...data, restRoom: 7 }) }}>7</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.restRoom === 8 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => { setData({ ...data, restRoom: 8 }) }}>8</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.restRoom === 9 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => { setData({ ...data, restRoom: 9 }) }}>9</Button> &nbsp;
                                    </div>
                                ) : (null)}
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.numberOfBaths}
                                />
                            </div>
                            <Col lg="1" className="ms-3"></Col>
                            <div >
                                <Text
                                    className="text-capitalize mt-4 h6"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="Common reception">
                                </Text>
                                <div className="d-flex">
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.commonReception === "Yes" ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, commonReception: "Yes" }) }}>Yes</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.commonReception === "No" ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, commonReception: "No" }) }}>No</Button> &nbsp;
                                </div>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.commonReception}
                                />
                            </div>
                            <Col lg="1"></Col>
                            <div>
                                <Text
                                    className="text-capitalize mt-4 h6"
                                    size="medium"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text="Kitchen/Pantry">
                                </Text>
                                <div className="d-flex">
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.kitchenPantry === 'Yes' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, kitchenPantry: 'Yes' }) }}>Yes</Button> &nbsp; &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.kitchenPantry === 'No' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => { setData({ ...data, kitchenPantry: 'No' }) }}>No</Button> &nbsp; &nbsp;
                                </div>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.kitchenPantry}
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
                                        onClick={() => assignCoveredParking(0)}>0</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 1 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignCoveredParking(1)}>1</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 2 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignCoveredParking(2)}>2</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 3 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignCoveredParking(3)}>3</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 4 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignCoveredParking(4)}>4</Button> &nbsp;
                                </div>
                                {showAllCoveredParkings ? (
                                    <div className="d-flex mt-2">
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.balcony === 5 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }} onClick={() => assignCoveredParking(5)}>5</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 6 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => assignCoveredParking(6)}>6</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 7 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => assignCoveredParking(7)}>7</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 8 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => assignCoveredParking(8)}>8</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.coveredParking === 9 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => assignCoveredParking(9)}>9</Button>
                                    </div>
                                ) : (
                                    <Button className="py-2 mt-2" style={{ background: 'none', borderColor: '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                                onClick={() => setShowAllCoveredParkings(true)}>4+</Button>
                                )}
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
                                        onClick={() => assignOpenParking(0)}>0</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 1 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignOpenParking(1)}>1</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 2 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignOpenParking(2)}>2</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 3 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignOpenParking(3)}>3</Button> &nbsp;
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 4 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignOpenParking(4)}>4</Button> &nbsp;
                                </div>
                                {showAllOpenParkings ? (
                                    <div className="d-flex mt-2"> 
                                    <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 5 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignOpenParking(5)}>5</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 6 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                        onClick={() => assignOpenParking(6)}>6</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 7 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => assignOpenParking(7)}>7</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 8 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => assignOpenParking(8)}>8</Button> &nbsp;
                                        <Button className="py-2" style={{ background: 'none', borderColor: data.openParking === 9 ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => assignOpenParking(9)}>9</Button>
                                    </div>
                                ) : (
                                    <Button className="py-2 mt-2" style={{ background: 'none', borderColor: data.openParking === '4+' ? '#BE1452' : '#DEDEDE', color: 'GrayText', borderRadius: '10' }}
                                            onClick={() => setShowAllOpenParkings(true)}>4+</Button>
                                )}
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text={error.openParking}
                                />
                            </div>&nbsp; &nbsp;
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
                {((data?.propertyType === 'Semi Commercial' || data?.propertyType === 'Residential') && (data.propertyCategory === 'Rent' || data.propertyCategory === 'Lease')) && (
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
                            <TextField
                                className="w-100"
                                required 
                                borderRadius={10}
                                type="number"
                                inputProps={{ min: 0 }}
                                id="outlined-required"
                                label="Enter Property Age"
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">sqft</InputAdornment>,
                                }}
                                value={data?.propertyAge}
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
                            <TextField
                                className="w-100"
                                required
                                type="number"
                                inputProps={{ min: 0 }}
                                id="outlined-required"
                                label={data.propertyCategory === "Sale" ? "Enter Property Price" : "Rent/Lease(Incl. Maintenance charges)"}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                                }}
                                value={data?.propertyRate}
                                onInput={(e) => { setData({ ...data, propertyRate: (e.target.value) }) }}
                                />
                            <Text
                                color="dangerText"
                                size="xSmall"
                                className="pt-2"
                                text={error.propertyRate}
                            />
                        </Col>
                        <Col lg="4">
                            <TextField
                                className="w-100"
                                type="number"
                                inputProps={{ min: 0 }}
                                id="outlined-required"
                                label="Enter Maintenance charges"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                                }}
                                value={data?.maintenanceCost}
                                onInput={(e) => { setData({ ...data, maintenanceCost: (e.target.value) }) }}
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
                    {data?.propertySubType === 'Independent House/Villa' ? <>
                        <Col lg="4">
                            <TextField
                                className="w-100 mt-4"
                                required style={{borderRadius:10}}
                                type="number"
                                inputProps={{ min: 0 }}
                                id="outlined-required"
                                label="Plot Area"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Sq.Ft.</InputAdornment>,
                                }}
                                value={data?.plotArea}
                                onInput={(e) => { setData({ ...data, plotArea: (e.target.value) }) }}
                                />
                            <Text
                                color="dangerText"
                                size="xSmall"
                                className="pt-2"
                                text={error.plotArea}
                            />
                        </Col>
                        </> : null }
                        <Col lg="4">
                            <TextField
                                className="w-100 mt-4"
                                required 
                                style={{borderRadius:10}}
                                type="number"
                                inputProps={{ min: 0 }}
                                id="outlined-required"
                                label="Build Up Area (Including Balcony)"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Sq.Ft.</InputAdornment>,
                                }}
                                value={data?.carpetArea}
                                onInput={(e) => { setData({ ...data, carpetArea: (e.target.value) }) }}
                                />
                            <Text
                                color="dangerText"
                                size="xSmall"
                                className="pt-2"
                                text={error.carpetArea}
                            />
                        </Col>
                        <Col lg="4">
                            <TextField
                                className="w-100 mt-4"
                                type="number"
                                inputProps={{ min: 0 }}
                                id="outlined-required"
                                label="Attached Open Terrace Area"
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">Sq.Ft.</InputAdornment>,
                                }}
                                value={data?.attachedOpenTerraceArea}
                                onInput={(e) => { setData({ ...data, attachedOpenTerraceArea: (e.target.value) }) }}
                                />
                            <Text
                                color="dangerText"
                                size="xSmall"
                                className="pt-2"
                                text={error.attachedOpenTerraceArea}
                            />
                        </Col>
                        <Col lg="4">
                            <TextField
                                className="w-100 mt-4"
                                type="number"
                                inputProps={{ min: 0 }}
                                id="outlined-required"
                                label="Attached Open Area/Garden"
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">Sq.Ft.</InputAdornment>,
                                }}
                                value={data?.attachedOpenAreaOrGarden}
                                onInput={(e) => { setData({ ...data, attachedOpenAreaOrGarden: (e.target.value) }) }}
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
                    <Buttons type="button" size={"medium"} color={"secondary"} onClick={() => { showDraftModal() }} name="Cancel" /> &nbsp;
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
                                onClick={() => { history.push('/admin/advisors') }} />
                            <Buttons
                                name="Save"
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

const mapStateToProps = ({addNewPostReducer}) => ({
    addNewPostReducer
})

const actions = {
    addNewPost
}

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(AddNewPost)