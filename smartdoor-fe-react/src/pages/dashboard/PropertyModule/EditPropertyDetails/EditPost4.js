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
import { Chip, InputAdornment, MenuItem, TextField } from "@mui/material";
import { addNewPost4 } from "../../../../common/redux/actions";
import { provideAuth } from "../../../../common/helpers/Auth";

const EditPost4 = (props) => {
	const [filters, setFilters] = useState([]);
	// const [error, setError] = useState({});
	const location = useLocation();
	const { userData } = provideAuth();
	const propertyData = (location?.state?.propertyData)
	const history = useHistory();
	const dispatch = useDispatch();
	const [data, setData] = useState({
		postedById: userData.userid,
		smartdoorPropertyId: propertyData?.smartdoorPropertyId,
		isDraft: propertyData?.draft,
		propertyFurnishing: propertyData.propertyFurnishing === null ? "" : propertyData.propertyFurnishing,
		isLoanAvailable: propertyData.propertyInfoResponse.loanAvailable,
		loanFromBank: propertyData.propertyInfoResponse.loanFromBank === null ? "" : propertyData.propertyInfoResponse.loanFromBank,
		enteranceFacing: propertyData.propertyInfoResponse.enteranceFacing === null ? "" : propertyData.propertyInfoResponse.enteranceFacing,
		security: propertyData.propertyInfoResponse.security === null ? "" : propertyData.propertyInfoResponse.security,
		constructionSize: propertyData.propertyInfoResponse.contructionSize === null ? "" : propertyData.propertyInfoResponse.contructionSize,
		majorityComposition: propertyData.propertyInfoResponse.majorityComposition === null ? "" : propertyData.propertyInfoResponse.majorityComposition,
		religiousPlace: propertyData.propertyInfoResponse.religiousPlace === null ? "" : propertyData.propertyInfoResponsereligiousPlace,
		storeDistance: propertyData.propertyInfoResponse.storeDistance === null ? "" : propertyData.propertyInfoResponse.storeDistance,
		propertyDescription: propertyData.description === null ? "" : propertyData.description,
		investmentOpportunity: propertyData.propertyInfoResponse.invetmentOppertunity,
		oldRate: propertyData.propertyInfoResponse.oldRate === null ? 0 : Number(propertyData.propertyInfoResponse.oldRate),
		amenities: propertyData.propertyInfoResponse.amenities,
		isPartial: propertyData.partial,
		hallAndDining: propertyData.propertyInfoResponse.hallAndDining,
		furnishKitchen: propertyData.propertyInfoResponse.furnishKitchen,
		furnishBedrooms: propertyData.propertyInfoResponse.furnishBedrooms,
		extras: propertyData.propertyInfoResponse.extras,
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
		if (!data.amenities?.includes(value)) {
			let newAmenities = [];
			newAmenities = (data.amenities !== null ? data.amenities : []);
			newAmenities?.push(value)
			setData({ ...data, amenities: [...newAmenities] });
			console.log(data.amenities)
		} else {
			showErrorToast("Amenity exist")
		}
	}

	const handleDelete = (value) => {
		// console.log(amenity)
		let newAmenities = data.amenities.filter((amenity) => amenity !== value)
		setData({ ...data, amenities: [...newAmenities] });
	}

	const submitInfo = async () => {
		console.log(data);
		await dispatch(addNewPost4(data))
		// history.push('/admin/posts/add-new-post/select_plan')
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
						setData({ ...data, propertyFurnishing: e.target.value });
						console.log(data.propertyFurnishing);
					}}
					onInput={(e) => { setData({ ...data, propertyDescription: e.target.value }) }}
				/>
				<Row className="mt-3">
					<Col lg="4">
						<TextField
							className="w-100 mt-3"
							id="outlined-select-currency"
							select
							label="Furnishing"
							defaultValue={data.propertyFurnishing}
							onChange={(e) => {
								setData({ ...data, propertyFurnishing: e.target.value });
								console.log(data.propertyFurnishing);
							}}>
							<option value="" disabled> Select </option>
							{filters.propertyFurnishing?.map((option) => (
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
				<Row>
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

				<Text
					size="medium"
					fontWeight="mediumbold"
					color="secondryColor"
					text="Social Construct"
				></Text>

				<Row className="mt-3">
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
					<Col lg="4">
						<TextField
							className="w-100 mt-3"
							id="outlined-select-currency"
							select
							label="Amenities"
							defaultValue={data.amenities}
							onChange={(e) => {
								setAmenities(e.target.value)
							}}>
							<option value="" disabled> Select </option>
							{filters.socialConstructSpecificAmenity?.map((option) => (
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
				</Row>
				<Row>
					<Col lg="4"></Col>
					<Col lg="4">
						{data.amenities?.map((amenity) => {
							return (
								<>
									<Chip className="mt-1" label={amenity} variant="outlined" color="error" onDelete={() => { handleDelete(amenity) }} >
									</Chip>	&nbsp;
								</>
							)
						})}
					</Col>
					<Col lg="4"></Col>
				</Row>
				<Row className="mt-3">
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
						<Form.Group>
							<Form.Label className="mt-3">
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
						<TextField
							className="w-100 mt-3"
							id="outlined-select-currency"
							label="Price before 1 year"
							defaultValue={data.oldRate}
							onChange={(e) => {
								setData({ ...data, oldRate: e.target.value });
							}} />
					</Col>
				</Row>
				<br />
				<br />
				<div className="d-flex">
					<button color="gray" size="medium">Cancel</button> &nbsp;
					{/* <Link to="/admin/posts/add-new-post/basic-details">
                        </Link> */}
					<Buttons
						name="Back" size="medium"
						onClick={() => {
							history.push("/admin/property/upload-property-image",{propertyData: propertyData});
						}}
					></Buttons>{" "}
					&nbsp;
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
