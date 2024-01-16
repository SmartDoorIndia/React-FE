/** @format */

import { compose } from "redux";
import Text from "../../../shared/Text/Text";
import { Form, Col, Row } from "react-bootstrap";
import { memo, useCallback, useEffect, useState } from "react";
import RadioButton from "../../../shared/RadioButton/RadioButton";
import Buttons from "../../../shared/Buttons/Buttons";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getAllFiltersForNewPost } from "../../../common/redux/actions/addNewPost.action";
import { addNewPostReducer } from "../../../common/redux/reducers/views/addNewPost.reducer";
import { addNewPost4Reducer } from "../../../common/redux/reducers/views/addNewPost4.reducer";
import { connect } from "react-redux";
import { showErrorToast } from "../../../common/helpers/Utils";
import { Chip, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { addNewPost4, getPropertyDetails } from "../../../common/redux/actions";
import { provideAuth } from "../../../common/helpers/Auth";

const AddNewPost4 = (props) => {
	const [filters, setFilters] = useState([]);
	// const [error, setError] = useState({});
	const location = useLocation();
	const { userData } = provideAuth();
	const history = useHistory();
	const dispatch = useDispatch();
	const propertyId = location?.state?.propertyId
	const [propertyData, setpropertyData] = useState({})
	const [data, setData] = useState({
		postedById: userData?.userid,
		smartdoorPropertyId: propertyId,
		draft: false,
		propertyFurnishing: propertyData.propertyFurnishing === null ? "" : propertyData.propertyFurnishing,
		isLoanAvailable: propertyData.propertyInfoResponse?.loanAvailable,
		loanFromBank: propertyData.propertyInfoResponse?.loanFromBank === null ? "" : propertyData.propertyInfoResponse?.loanFromBank,
		enteranceFacing: propertyData.propertyInfoResponse?.enteranceFacing === null ? "" : propertyData.propertyInfoResponse?.enteranceFacing,
		security: propertyData.propertyInfoResponse?.security === null ? "" : propertyData.propertyInfoResponse?.security,
		constructionSize: propertyData.propertyInfoResponse?.contructionSize === null ? "" : propertyData.propertyInfoResponse?.contructionSize,
		majorityComposition: propertyData.propertyInfoResponse?.majorityComposition === null ? "" : propertyData.propertyInfoResponse?.majorityComposition,
		religiousPlace: propertyData.propertyInfoResponse?.religiousPlace === null ? "" : propertyData.propertyInfoResponse?.religiousPlace,
		storeDistance: propertyData.propertyInfoResponse?.storeDistance === null ? "" : propertyData.propertyInfoResponse?.storeDistance,
		propertyDescription: propertyData?.propertyInfoResponse?.propertyDescription === null ? "" : propertyData?.propertyInfoResponse?.propertyDescription,
		investmentOpportunity: propertyData.propertyInfoResponse?.invetmentOppertunity,
		oldRate: propertyData.propertyInfoResponse?.oldRate === null ? 0 : Number(propertyData.propertyInfoResponse?.oldRate),
		partial: true,
		amenities: propertyData.propertyInfoResponse?.amenities === null ? [] : propertyData.propertyInfoResponse?.amenities,
		hallAndDining: propertyData.propertyInfoResponse?.hallAndDining === null ? [] : propertyData.propertyInfoResponse?.hallAndDining,
		furnishKitchen: propertyData.propertyInfoResponse?.furnishKitchen === null ? [] : propertyData.propertyInfoResponse?.furnishKitchen,
		furnishBedrooms: propertyData.propertyInfoResponse?.furnishBedrooms === null ? [] : propertyData.propertyInfoResponse?.furnishBedrooms,
		extras: propertyData.propertyInfoResponse?.extras === null ? [] : propertyData.propertyInfoResponse?.extras,
		landlordPossible: propertyData.propertyInfoResponse?.landlordPossible === null ? "" : propertyData.propertyInfoResponse?.landlordPossible,
	});
	
	const _getPropertyDetails = useCallback(() => {
		getPropertyDetails({ propertyId: propertyId, userId: userData.userid })
		   .then((response) => {
			  if (response.data) {
				 if (response.data.resourceData && response.data.status === 200) {
					setpropertyData(response.data.resourceData);
				 }
			  }
		   })
		   .catch((error) => {
			  console.log("error", error);
		   });
	 }, [data.smartdoorPropertyId, getPropertyDetails]);

	useEffect(async () => {
		await _getPropertyDetails();
		getAllFilterData();
	}, [_getPropertyDetails ,addNewPostReducer, addNewPost4Reducer]);

	const getAllFilterData = async () => {
		try {
			const filterData = await getAllFiltersForNewPost();
			await setFilters(filterData);
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
		await dispatch(addNewPost4(requestBody))
		history.push('/admin/posts/add-new-post/select_plan')
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
					value={data?.propertyDescription}
					onChange={(e) => {
						setData({ ...data, propertyDescription: e.target.value });
						console.log(data.propertyDescription);
					}}
					onInput={(e) => { setData({ ...data, propertyDescription: e.target.value }) }}
				/>
				<Text
					className="mt-3 h6"
					size="medium"
					fontWeight="mediumbold"
					color="secondryColor"
					text="Furnishing"
				></Text>
				<Row className="mt-3">
				<Col lg="4">
						<FormControl className="w-100 mt-3">
							<InputLabel id="demo-simple-select-helper-label">Kitchen</InputLabel>
							<Select
								labelId="demo-simple-select-helper-label"
								id="demo-simple-select-helper"
								multiple
								value={data.furnishKitchen === undefined ? [] : data.furnishKitchen}
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
								value={data.hallAndDining === undefined ? [] : data.hallAndDining}
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
								value={data.furnishBedrooms === undefined ? [] : data.furnishBedrooms}
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
								value={data.extras === undefined ? [] : data.extras}
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
					<Col lg="4">
						<TextField
							className="w-100 mt-3"
							id="outlined-select-currency"
							select
							label="Entrance Facing"
							defaultValue={data.enteranceFacing === undefined ? "" : data.enteranceFacing}
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
							defaultValue={data.security === undefined ? '' : data.security}
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
				{/* <Row>
					<Col lg="4">
						<Form.Label>Loan against property?</Form.Label>
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
							<Form.Group>
								<Form.Label>Loan from Bank:</Form.Label>
								<Form.Control type="text"
									maxLength={100}
									onInput={(e) => { setData({ ...data, loanFromBank: e.target.value }) }}>
								</Form.Control>
							</Form.Group>
						</Col>
					</Row>
				)} */}

				<Text
					size="medium"
					fontWeight="mediumbold"
					color="secondryColor"
					text="Social Construct"
				></Text>

				<Row className="mt-1">
					<Col lg="4">
						<TextField
							className="w-100 mt-3"
							id="outlined-select-currency"
							select
							label="Majority Composition"
							defaultValue={data.majorityComposition === undefined ? '' : data.majorityComposition}
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
							defaultValue={data.storeDistance === undefined ? '' : data.storeDistance}
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
							defaultValue={data.religiousPlace === undefined ? '' : data.religiousPlace}
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
								value={data.amenities === undefined ? [] : data.amenities}
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
				{/* <Row className="mt-3">
					<Col lg="4">
						<Form.Group controlId="exampleForm.SelectCustom">
							<Form.Label>Religious places within 2km:</Form.Label>
							<Form.Control as="select" value={data.religiousPlace}
								onChange={(e) => {
									setData({ ...data, religiousPlace: e.target.value });
								}}>
								<option value="" disabled> Select </option>
								{filters.religiousPlace?.map((Val) => {
									return <option value={Val}>{Val}</option>;
								})}
							</Form.Control>
						</Form.Group>
					</Col>
					<Col lg="4">
						<Form.Group controlId="exampleForm.SelectCustom">
							<Form.Label>Distance to convinience store:</Form.Label>
							<Form.Control as="select" value={data.storeDistance}
								onChange={(e) => {
									setData({ ...data, storeDistance: e.target.value });
								}}>
								<option value="" disabled>select</option>
								{filters.convenienceStore?.map((Val) => {
									return <option value={Val}>{Val}</option>;
								})}
							</Form.Control>
						</Form.Group>
					</Col>
					<Col lg="4">
						<Form.Group>
							<Form.Label>
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
						<Form.Label>Price before 1 year</Form.Label>
						<Form.Control type="number"
							maxLength="100"
							onInput={(e) => { setData({ ...data, oldRate: e.target.value }) }} />
					</Col>
				</Row> */}
				<br />
				<br />
				<div className="d-flex">
					<Buttons type="button" size={"medium"} color={"secondary"} onClick={() => { history.push('/admin/advisors') }} name="Cancel" /> &nbsp;
					<Buttons
						name="Back"
						onClick={() => {
							history.push("/admin/posts/add-new-post/pics");
						}}
					></Buttons>{" "}
					&nbsp;
					<Buttons name="Next" onClick={() => { submitInfo() }} />
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

export default compose(withConnect, memo)(AddNewPost4);
