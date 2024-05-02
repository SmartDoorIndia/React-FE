import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import AutoCompleteTextField from '../../../shared/Inputs/AutoComplete/textField'
import { TextField } from '@mui/material';
import { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import MapComponent from '../../../shared/Map/MapComponent';
import Text from '../../../shared/Text/Text';
import { compose } from 'redux';
import Image from '../../../shared/Image';
import sdIcon from '../../../assets/svg/sdIcon.svg';
import Buttons from '../../../shared/Buttons/Buttons';
import * as Actions from '../../../common/redux/types';
import { geocodeByAddress } from 'react-google-places-autocomplete';
import { getLocalStorage, showErrorToast } from '../../../common/helpers/Utils';
import { addBasicDetails, getAllCityWithId, getSocietyByCity } from '../../../common/redux/actions';
import { Autocomplete } from 'devextreme-react';
import './property.scss'
import { validateAddressDetails } from '../../../common/validations';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AddressSection = (props) => {
	const { getAllCityWithId, allCitiesWithId, basicDetailFields, addressDetailFields, saveAddressDetailsFields, customerDetails, editPropertyFlag } = props;
	const [error, setError] = useState({});
	const [sdIconFlag, setSDIconFlag] = useState(false);
	const [societyArray, setSocietyArray] = useState([])
	const [saveAddressFlag, setSaveAddressFlag] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

	const [addressDetails, setAddressDetails] = useState(Object.keys(addressDetailFields.data).length !== 0 ?
		addressDetailFields.data : {
			latitude: '',
			longitude: '',
			zipCode: '',
			country: '',
			state: '',
			city: '',
			societyId: '',
			societyName: '',
			locality: '',
			address: '',
			cityLat: '',
			cityLong: '',
			landmark: '',
			builder: '',
			buildingProjectSociety: '',
			floorNumber: '',
			totalFloors: '',
			houseNumber: ''
		});

	useEffect(() => {
		getAllCityWithId({ smartdoorServiceStatus: true, stateId: null });
		console.log(addressDetailFields)
	}, [getAllCityWithId]);

	const handleSelectLocalityOption = async (e) => {
		// let matchFound = false;
		// let localityArr = e.location?.split(', ')
		console.log(e)
		error.locality = ""
		let newData = { ...addressDetails }; // Make a copy of the current state
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
			if (element.types.includes('country')) {
				newData.country = element.long_name;
				console.log(newData.country);
			}
		});
		if (allCitiesWithId.data.find(city => city.cityName === newData.city)) {
			setSDIconFlag(true)
		}
		if (localityFlag === false || sublocality_level_1Flag === false || stateFlag === false) {
			showErrorToast("Please select pin point location")
		}
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

		setAddressDetails(newData);
	}

	const handleMarkerChanged = async (e) => {
		console.log(e?.location?.address_components)
		let newData = { ...addressDetails }; // Make a copy of the current state
		let sublocality_level_1Flag = false;
		let localityFlag = false;
		let administrative_area_level_3Flag = false
		let stateFlag = false

		e?.location?.address_components?.forEach(element => {
			if (element.types.includes('locality')) {
				newData.city = element.long_name;
				localityFlag = true
			}
			if (element.types.includes('sublocality_level_1')) {
				newData.locality = element.long_name;
				sublocality_level_1Flag = true
			}
			if (element.types.includes('postal_code')) {
				newData.zipCode = element.long_name;
			}
			if (element.types.includes('administrative_area_level_1')) {
				newData.state = element.long_name;
				stateFlag = true
			}
			if (element.types.includes('country')) {
				newData.country = element.long_name;
				console.log(newData.country);
			}
		});
		if (localityFlag === false || sublocality_level_1Flag === false || stateFlag === false) {
			showErrorToast("Please select pin point location")
		}
		console.log(allCitiesWithId.data)
		if (allCitiesWithId.data.find(city => city.cityName === addressDetails.city)) {
			setSDIconFlag(true)
		}
		const response = await geocodeByAddress(newData.city);
		const latFunction = response[0].geometry.location.lat;
		const eLat = latFunction();
		const lngFunction = response[0].geometry.location.lng;
		const eLng = lngFunction();
		newData.cityLat = eLat;
		newData.cityLong = eLng;
		// Update latitude and longitude outside the loop
		newData.latitude = e?.latlng?.lat;
		newData.longitude = e?.latlng?.lng;
		// Update latitude and longitude outside the loop
		newData.latitude = e?.lat;
		newData.longitude = e?.lng;

		// Update the state once
		setAddressDetails(newData);
	}

	const selectSocietyName = async (e) => {
		let value = e?.event?.target?.value
		setAddressDetails({ ...addressDetails, buildingProjectSociety: value, otherSociety: value })
		const response = await getSocietyByCity({ city: (addressDetails.city).split(', ')[0], society: value })
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
				setAddressDetails({
					...addressDetails, societyId: value.societyId,
					latitude: value.latitude, longitude: value.longitute,
					locality: value.locality, zipCode: value.zipCode,
				})
				matchFound = true
			}
		});
	}

	const saveAddressDetails = () => {
		let valid = {}
		if (basicDetailFields.data.propertySubType !== 'Independent House / Bungalow' && basicDetailFields.data.propertySubType !== 'Plot') {
			if (addressDetails.floorNumber > addressDetails.totalFloors) {
				showErrorToast("In valid floor number...");
				return null;
			}
			valid = validateAddressDetails(addressDetails, true);
		} else {
			valid = validateAddressDetails(addressDetails, false);
		}
		setError(valid.errors);
		console.log(valid)
		if (valid.isValid) {
			dispatch({ type: Actions.ADDRESS_DETAILS_SUCCESS, data: addressDetails })
			setSaveAddressFlag(true);
			saveAddressDetailsFields({ saveFlag: true })
		}
	}

	const notifyAddressDetails = async () => {
		let valid = {}
		if (basicDetailFields.data.propertySubType !== 'Independent House / Bungalow' && basicDetailFields.data.propertySubType !== 'Plot') {
			if (addressDetails.floorNumber > addressDetails.totalFloors) {
				showErrorToast("In valid floor number...");
				return null;
			}
			valid = validateAddressDetails(addressDetails, true);
		} else {
			valid = validateAddressDetails(addressDetails, false);
		}
		setError(valid.errors);
		let userId = getLocalStorage('authData');
		if (valid.isValid) {
			const data = {
				miscellaneousDetails: {
					postedById: userId.userid,
					lastPageOfInfoFilled: 1,
					draft: true,
					partial: false,
					requestAlerts: false,
					favourite: false,
					smartLockProperty: false,
					autoRenew: null,
					autoApproval: null,
					cityProvidesSmartdoorSevice: null,
					planId: null,
					currentPlanName: null,
					expiryDate: null,
					numberOfDaysLeft: null,
					status: "",
					postedByName: userId.name,
					postedByMobile: userId.mobile,
					postedByProfileImageUrl: '',
					ownerName: customerDetails?.name,
					ownerMobileNumber: customerDetails?.mobile,
					isPostingForOthers: true,
                    notifyCustomer: true
				},
				basicDetails: basicDetailFields?.data,
				address: addressDetails
			}
			console.log(userId)
			// setLoading(true)
			const response = await addBasicDetails(data);
			console.log(response?.data?.resourceData?.propertyId)
			if (response.status === 200) {
				// setLoading(false)
				dispatch({ type: Actions.ADDRESS_DETAILS_SUCCESS, data: addressDetails })
				saveAddressFlag(true)
				saveAddressDetailsFields({ propertyId: response?.data?.resourceData?.propertyId, saveFlag: true })
				history.goBack();
			}
		}
		// setLoading(false)
	}

	return (
		<>
			<div className="whiteBg mb-1">
				<Row>
					<Col lg={4}>
						<AutoCompleteTextField
							error={error.locality}
							className='w-100'
							sdIconFlag={false}
							currentLocFlag={true}
							label="Select  location of property"
							cityLatLng={null}
							placeholder="Enter location"
							id="PropertyCityAutoComplete"
							onSelectOption={(e) => { handleSelectLocalityOption(e) }}
							onInputChange={(value) =>
								setAddressDetails({ ...addressDetails, locality: value })
							}
							predictionType="business"
							customValue={addressDetails.locality}
						/>
					</Col>
					<Col lg={4}>
						<TextField
							error={error.city}
							className=" w-100"
							disabled
							label="Selected city"
							type='text'
							InputProps={{
								endAdornment: <>
									{sdIconFlag ?
										<div className='d-flex mt-3'>
											<Image style={{ height: '22px', width: '22px' }} src={sdIcon}></Image>
											<Text text={'SD'} fontWeight='600' style={{ fontSize: '12px', color: '#BE1452' }} />
										</div>
										: null}
								</>
							}}
							value={addressDetails.city}
						>
						</TextField>
					</Col>
					<Col>
						<div className="mapLocation my-3">
							<div style={{ height: "10", overflow: "hidden" }}>
								<MapComponent
									p_lat={addressDetails?.latitude !== 0 ? addressDetails.latitude : addressDetails.cityLat}
									p_lng={addressDetails?.longitude !== 0 ? addressDetails.longitude : addressDetails.cityLong}
									draggable={true}
									onMarkerDragEnd={handleMarkerChanged} />
							</div>
						</div>
					</Col>
				</Row>
				<Row>
					<Col lg={4}>
						<TextField
							error={error.houseNumber}
							className=" w-100 mt-4"
							label="Block No./Flat No./Plot No."
							type='text'
							onChange={(e) => { setAddressDetails({ ...addressDetails, houseNumber: e.target.value }) }}
							value={addressDetails.houseNumber}
						>
						</TextField>
					</Col>
					<Col lg='4'>
						<TextField
							error={error.landmark}
							className=" w-100 mt-4"
							label="Landmark"
							type='text'
							onChange={(e) => { setAddressDetails({ ...addressDetails, landmark: e.target.value }) }}
							value={addressDetails.landmark}
						>
						</TextField>
					</Col>

				</Row>
				<Row>
					<Col lg='4'>
						<Autocomplete
							v={error.buildingProjectSociety}
							className='mt-4'
							dataSource={societyArray}
							// value={data?.buildingProjectSociety}
							defaultValue={addressDetails.buildingProjectSociety}
							onInput={(e) => { selectSocietyName(e) }}
							onSelectionChanged={(value) => { setSelectedSociety(value?.selectedItem); console.log(value) }}
							placeholder="Select Building/Project/Society"
							valueExpr="societyName"
							searchExpr="societyName"
							style={{ height: "55px", borderColor: error.buildingProjectSociety ? 'red' : 'gray', '&:hover': { borderColor: 'blue' } }}
						/>
					</Col>
					<Col lg='4'>
						<TextField
							error={error.builder}
							className=" w-100  mt-4"
							label="Builder"
							type='text'
							onChange={(e) => { setAddressDetails({ ...addressDetails, builder: e.target.value }) }}
							value={addressDetails.builder}
						>
						</TextField>
					</Col>
					{basicDetailFields.data.propertySubType !== 'Independent House / Bungalow' && basicDetailFields.data.propertySubType !== 'Plot' ?
						<Col lg='4' >
							<div className="d-flex">
								<TextField
									error={error.floorNumber}
									className="mt-4 w-50"
									required
									label='Floor No.'
									type='number'
									inputProps={{ min: 0 }}
									onChange={(e) => setAddressDetails({ ...addressDetails, floorNumber: e.target.value })}
									value={addressDetails.floorNumber}
								/>
								<div className="ml-2"></div>
								<TextField
									error={error.totalFloors}
									type='number'
									inputProps={{ min: 0 }}
									required
									className="mt-4 w-50"
									label='Total No. of Floors'
									onChange={(e) => setAddressDetails({ ...addressDetails, totalFloors: e.target.value })}
									value={addressDetails.totalFloors}
								/>
							</div>
						</Col>
						: null}
				</Row>
			</div>
			{saveAddressFlag === false ?
				<div className="d-flex">
					<Buttons className='p-2 px-4' name='Confirm' onClick={() => { saveAddressDetails(); }}></Buttons> &nbsp; &nbsp;
					{/* <Buttons className='p-2 px-4' name='Cancel' ></Buttons> */}
					<Buttons className='p-2 px-4' name={editPropertyFlag ? 'Save' : 'Notify Customer'} onClick={() => { notifyAddressDetails(); }}></Buttons> &nbsp; &nbsp;
				</div>
				: null}
		</>
	)

}
const mapStateToProps = ({ allCitiesWithId, basicDetailFields, addressDetailFields }) => ({
	allCitiesWithId, basicDetailFields, addressDetailFields
});

const actions = {
	getAllCityWithId
}

export default compose(connect(mapStateToProps, actions))(AddressSection);
