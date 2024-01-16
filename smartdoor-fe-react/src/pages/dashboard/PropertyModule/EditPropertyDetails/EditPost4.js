/** @format */

import { compose } from "redux";
import Text from "../../../../shared/Text/Text";
import { Form, Col, Row } from "react-bootstrap";
import { memo, useEffect, useState } from "react";
import RadioButton from "../../../../shared/RadioButton/RadioButton";
import Buttons from "../../../../shared/Buttons/Buttons";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getAllFiltersForNewPost } from "../../../../common/redux/actions/addNewPost.action";
import { addNewPostReducer } from "../../../../common/redux/reducers/views/addNewPost.reducer";
import { addNewPost4Reducer } from "../../../../common/redux/reducers/views/addNewPost4.reducer";
import { connect } from "react-redux";
import { showErrorToast } from "../../../../common/helpers/Utils";
import { Chip, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { addNewPost4 } from "../../../../common/redux/actions";
import { provideAuth } from "../../../../common/helpers/Auth";

const EditPost4 = (props) => {
	const [filters, setFilters] = useState([]);
	// const [error, setError] = useState({});
	const location = useLocation();
	const { userData } = provideAuth();
	const propertyData = (location?.state?.propertyData)
	const [basicDetails, setBasicDetails] = useState(location?.state?.basicDetails)
	const [addressDetails, setAddressDetails] = useState(location?.state?.addressDetails)
	const history = useHistory();
	const dispatch = useDispatch();
	const [data, setData] = useState({
		postedById: propertyData.postedById,
		smartdoorPropertyId: propertyData?.smartdoorPropertyId,
		draft: false,
        partial: false,
		propertyFurnishing: propertyData.propertyFurnishing === null ? "" : propertyData.propertyFurnishing,
		isLoanAvailable: propertyData.propertyInfoResponse.loanAvailable,
		loanFromBank: propertyData.propertyInfoResponse.loanFromBank === null ? "" : propertyData.propertyInfoResponse.loanFromBank,
		enteranceFacing: propertyData.propertyInfoResponse.enteranceFacing === null ? "" : propertyData.propertyInfoResponse.enteranceFacing,
		security: propertyData.propertyInfoResponse.security === null ? "" : propertyData.propertyInfoResponse.security,
		constructionSize: propertyData.propertyInfoResponse.contructionSize === null ? "" : propertyData.propertyInfoResponse.contructionSize,
		majorityComposition: propertyData.propertyInfoResponse.majorityComposition === null ? "" : propertyData.propertyInfoResponse.majorityComposition,
		religiousPlace: propertyData.propertyInfoResponse.religiousPlace === null ? "" : propertyData.propertyInfoResponse.religiousPlace,
		storeDistance: propertyData.propertyInfoResponse.storeDistance === null ? "" : propertyData.propertyInfoResponse.storeDistance,
		propertyDescription: propertyData?.propertyInfoResponse?.propertyDescription === null ? "" : propertyData?.propertyInfoResponse?.propertyDescription,
		investmentOpportunity: propertyData.propertyInfoResponse.invetmentOppertunity,
		oldRate: propertyData.propertyInfoResponse.oldRate === null ? 0 : Number(propertyData.propertyInfoResponse.oldRate),
		amenities: propertyData.propertyInfoResponse.amenities === null ? [] : propertyData.propertyInfoResponse.amenities,
		hallAndDining: propertyData.propertyInfoResponse.hallAndDining === null ? [] : propertyData.propertyInfoResponse.hallAndDining,
		furnishKitchen: propertyData.propertyInfoResponse.furnishKitchen === null ? [] : propertyData.propertyInfoResponse.furnishKitchen,
		furnishBedrooms: propertyData.propertyInfoResponse.furnishBedrooms === null ? [] : propertyData.propertyInfoResponse.furnishBedrooms,
		extras: propertyData.propertyInfoResponse.extras === null ? [] : propertyData.propertyInfoResponse.extras,
		landlordPossible: propertyData.propertyInfoResponse.landlordPossible === null ? "" : propertyData.propertyInfoResponse.landlordPossible,
	});

	useEffect(() => {
		console.log(propertyData)
		getAllFilterData();
	}, [addNewPostReducer, addNewPost4Reducer, propertyData]);

	const getAllFilterData = async () => {
		try {
			const filterData = await getAllFiltersForNewPost();
			setFilters(filterData);
		} catch (error) {
			console.error("Error fetching filters:", error);
		}
	};

	const setAmenities = (value) => {
		setData({ ...data, amenities: [...value] });
	}

	const handleDelete = (value) => {
		// console.log(amenity)
		let newAmenities = data.amenities.filter((amenity) => amenity !== value)
		setData({ ...data, amenities: [...newAmenities] });
	}

	const submitInfo = async () => {
		let requestBody = data;
		requestBody.amenities = data.amenities?.join(', ')
		requestBody.hallAndDining = data.hallAndDining?.join(', ')
		requestBody.furnishKitchen = data.furnishKitchen?.join(', ')
		requestBody.furnishBedrooms = data.furnishBedrooms?.join(', ')
		requestBody.extras = data.extras?.join(', ')
		console.log(requestBody)
		await dispatch(addNewPost4(requestBody))
		history.push('/admin/property/property-details', { propertyId: propertyData.smartdoorPropertyId, userId: userData.userid })
	}

	return (
		<>
			<div className="whiteBg">
				<Text
					size="medium"
					fontWeight="mediumbold"
					color="secondryColor"
					text="More Info"
				></Text>

				<TextField
					className="w-100 mt-4"
					type="text"
					multiline
					maxRows={3}
					id="outlined-required"
					label="Description"
					defaultValue={data?.propertyDescription}
					onChange={(e) => {
						setData({ ...data, propertyDescription: e.target.value });
						console.log(data.propertyDescription);
					}}
					onInput={(e) => { setData({ ...data, propertyDescription: e.target.value }) }}
				/>
				{basicDetails.propertyCategory !== 'Sale' ? <>
				<Text
					className="mt-3 h6"
					size="medium"
					fontWeight="mediumbold"
					color="secondryColor"
					text="Furnishing"
					></Text>
					</> : <></>}
				<Row className="mt-1">
					{basicDetails.propertyCategory === 'Sale' ? <>
						<Col lg="4">
							<FormControl className="w-100 mt-3">
								<InputLabel id="demo-simple-select-helper-label">Furnishing</InputLabel>
								<Select
									labelId="demo-simple-select-helper-label"
									id="demo-simple-select-helper"
									value={data.propertyFurnishing}
									label="Furnishing"
									onChange={(e) => {
										setData({ ...data, propertyFurnishing: e?.target?.value });
										console.log(e)
									}}
								>
									{filters.propertyFurnishing?.map((option) => (
										<MenuItem key={option} value={option}>
											{option}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Col>
					</> : <>
						<Col lg="4">
							<FormControl className="w-100 mt-3">
								<InputLabel id="demo-simple-select-helper-label">Kitchen</InputLabel>
								<Select
									labelId="demo-simple-select-helper-label"
									id="demo-simple-select-helper"
									multiple
									value={data.furnishKitchen}
									label="Kitchen"
									onChange={(e) => {
										setData({ ...data, furnishKitchen: [...e?.target?.value] });
									}}
								>
									{filters.kitchen?.map((option) => (
										<MenuItem key={option} value={option}>
											{option}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Col>
						<Col lg="4">
							<FormControl className="w-100 mt-3">
								<InputLabel id="demo-simple-select-helper-label">Hall</InputLabel>
								<Select
									labelId="demo-simple-select-helper-label"
									id="demo-simple-select-helper"
									multiple
									value={data.hallAndDining}
									label="Hall"
									onChange={(e) => {
										setData({ ...data, hallAndDining: [...e?.target?.value] });
									}}
								>
									{filters.hallAndDining?.map((option) => (
										<MenuItem key={option} value={option}>
											{option}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Col>
						<Col lg="4">
							<FormControl className="w-100 mt-3">
								<InputLabel id="demo-simple-select-helper-label">Bedrooms</InputLabel>
								<Select
									labelId="demo-simple-select-helper-label"
									id="demo-simple-select-helper"
									multiple
									value={data.furnishBedrooms}
									label="Bedrooms"
									onChange={(e) => {
										setData({ ...data, furnishBedrooms: [...e?.target?.value] });
									}}
								>
									{filters.bedRooms?.map((option) => (
										<MenuItem key={option} value={option}>
											{option}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Col>
						<Col lg="4">
							<FormControl className="w-100 mt-3">
								<InputLabel id="demo-simple-select-helper-label">Extras</InputLabel>
								<Select
									labelId="demo-simple-select-helper-label"
									id="demo-simple-select-helper"
									multiple
									value={data.extras}
									label="Extras"
									onChange={(e) => {
										setData({ ...data, extras: [...e?.target?.value] });
									}}
								>
									{filters.extras?.map((option) => (
										<MenuItem key={option} value={option}>
											{option}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Col>
					</>}
					<Col lg="4">
						<TextField
							className="w-100 mt-3"
							id="outlined-select-currency"
							select
							label="Entrance Facing"
							defaultValue={data.enteranceFacing}
							onChange={(e) => {
								setData({ ...data, enteranceFacing: e.target.value });
								console.log(data.enteranceFacing);
							}}>
							<option value="" disabled> Select </option>
							{filters.enteranceFacing?.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>
					</Col>
					<Col lg="4">
						<TextField
							className="w-100 mt-3"
							id="outlined-select-currency"
							select
							label="Security"
							defaultValue={data.security}
							onChange={(e) => {
								setData({ ...data, security: e.target.value });
								console.log(data.security);
							}}>
							<option value="" disabled> Select </option>
							{filters.security?.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>
					</Col>
				</Row>
				<br />
				{basicDetails.propertyCategory === 'Sale' ? <>
					<Row>
						<Col lg="4">
							<Form.Label style={{top:'0px', left: '0px'}}>Loan against property?</Form.Label>
							<RadioButton
								items={["Yes", "No"]}
								name={"isLoanAvailable"}
								layout={"horizontal"}
								value={data.isLoanAvailable ? "Yes" : "No"}
								onValueChanged={(e) => {
									if (e.value === "Yes") {
										setData({ ...data, isLoanAvailable: true })
									} else {
										setData({ ...data, isLoanAvailable: false })
									}
								}}
							/>
						</Col>
					</Row>
					<br />
					{data.isLoanAvailable === true && (
						<Row>
							<Col lg="4">
								<TextField
									className="w-100 mb-4"
									id="outlined-select-currency"
									type="text"
									label="Loan from Bank"
									defaultValue={data.loanFromBank}
									onInput={(e) => { setData({ ...data, loanFromBank: e.target.value }) }}>
								</TextField>
							</Col>
						</Row>
					)}
				</> : null}

				<Text
					size="medium"
					fontWeight="mediumbold"
					color="secondryColor"
					text="Social Construct"
				></Text>

				<Row className="mt-1">
					{basicDetails.propertyCategory === 'Sale' ?
					<>
						<Col lg="4">
							<TextField
								className="w-100 mt-3"
								id="outlined-select-currency"
								select
								label="Society size"
								defaultValue={data.constructionSize}
								onChange={(e) => {
									setData({ ...data, constructionSize: e.target.value });
								}}>
								<option value="" disabled> Select </option>
								{filters.socialConstructSize?.map((option) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								))}
							</TextField>
						</Col>
					</> : null }

					<Col lg="4">
						<TextField
							className="w-100 mt-3"
							id="outlined-select-currency"
							select
							label="Majority Composition"
							defaultValue={data.majorityComposition}
							onChange={(e) => {
								setData({ ...data, majorityComposition: e.target.value });
							}}>
							<option value="" disabled> Select </option>
							{filters.majorityComposition?.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>
					</Col>
					<Col lg="4">
						<TextField
							className="w-100 mt-3"
							id="outlined-select-currency"
							select
							label="Distance to convinience store"
							defaultValue={data.storeDistance}
							onChange={(e) => {
								setData({ ...data, storeDistance: e.target.value });
							}}>
							<option value="" disabled> Select </option>
							{filters.convenienceStore?.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>
					</Col>
					<Col lg="4">
						<TextField
							className="w-100 mt-3"
							id="outlined-select-currency"
							select
							label="Religious places within 2km"
							defaultValue={data.religiousPlace}
							onChange={(e) => {
								setData({ ...data, religiousPlace: e.target.value });
							}}>
							<option value="" disabled> Select </option>
							{filters.religiousPlace?.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>
					</Col>
				</Row>
				<Row>
					<Col lg="4">
						<FormControl className="w-100 mt-3">
							<InputLabel id="demo-simple-select-helper-label">Amenities</InputLabel>
							<Select
								labelId="demo-simple-select-helper-label"
								id="demo-simple-select-helper"
								multiple
								value={data.amenities}
								label="Amenities"
								onChange={(e) => {
									setAmenities(e.target.value)
								}}
							>
								{filters.socialConstructSpecificAmenity?.map((option) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Col>
					<Col lg="6" className="mt-3">
						{data.amenities?.map((amenity) => {
							return (
								<>
									<Chip className="mt-1" label={amenity} variant="outlined" color="error" onDelete={() => { handleDelete(amenity) }} >
									</Chip>	&nbsp;
								</>
							)
						})}
					</Col>
				</Row>
				<Row className="mt-3">
					{basicDetails.propertyCategory === 'Sale' ? 
					<>
						<Col lg="4">
							<Form.Group>
								<Form.Label className="mt-3" style={{top:'0px', left: '0px', padding:'0px'}}>
									Would you like to position as good investment opportunity?
								</Form.Label>
								<RadioButton
									items={["Yes", "No"]}
									name={"investmentOpportunity"}
									layout={"horizontal"}
									value={data.investmentOpportunity ? "Yes" : "No"}
									onValueChanged={(e) => {
										if (e.value === "Yes") {
											setData({ ...data, investmentOpportunity: true })
										} else {
											setData({ ...data, investmentOpportunity: false })
										}
									}}
								/>
							</Form.Group>
							{/* <TextField
								className="w-100 mt-3"
								id="outlined-select-currency"
								label="Price before 1 year"
								defaultValue={data.oldRate}
								onChange={(e) => {
									setData({ ...data, oldRate: e.target.value });
								}} /> */}
						</Col>
					</> : null
					}
				</Row>
				<br />
				<br />
				<div className="d-flex">
					<Buttons type="button" size={"medium"} color={"secondary"} onClick={() => {
                        history.push('/admin/property/property-details', {propertyId : propertyData.smartdoorPropertyId, userId: userData.userid}) }} name="Cancel" /> &nbsp;
					<Buttons name="Back" size="medium" onClick={() => {
							history.push("/admin/property/upload-property-image", { propertyData: propertyData, basicDetails: basicDetails, addressDetails: addressDetails }); }} ></Buttons> &nbsp;
					<Buttons size="medium" name="Next" onClick={() => { submitInfo() }} />
				</div>
			</div>
		</>
	);
};

const mapStateToProps = ({ addNewPostReducer, addNewPost4Reducer }) => ({
	addNewPostReducer, addNewPost4Reducer
})
const actions = {

}

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(EditPost4);
