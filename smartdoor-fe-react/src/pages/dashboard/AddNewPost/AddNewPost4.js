/** @format */

import { compose } from "redux";
import Text from "../../../shared/Text/Text";
import { Form, Col, Row } from "react-bootstrap";
import { memo, useEffect, useState } from "react";
import RadioButton from "../../../shared/RadioButton/RadioButton";
import Buttons from "../../../shared/Buttons/Buttons";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getAllFiltersForNewPost } from "../../../common/redux/actions/addNewPost.action";
import { addNewPostReducer } from "../../../common/redux/reducers/views/addNewPost.reducer";
import { addNewPost4Reducer } from "../../../common/redux/reducers/views/addNewPost4.reducer";
import { connect } from "react-redux";
import { showErrorToast } from "../../../common/helpers/Utils";
import { Chip } from "@mui/material";
import { addNewPost4 } from "../../../common/redux/actions";

const AddNewPost4 = (props) => {
	const [filters, setFilters] = useState([]);
	// const [error, setError] = useState({});
	const location = useLocation();

	const history = useHistory();
	const dispatch = useDispatch();
	const [data, setData] = useState({
		smartdoorPropertyId: "",
		isDraft: "",
		propertyFurnishing: "",
		isLoanAvailable: "",
		loanFromBank: "",
		enteranceFacing: "",
		security: "",
		constructionSize: "",
		majorityComposition: "",
		religiousPlace: "",
		storeDistance: "",
		propertyDescription: "",
		investmentOpportunity: "",
		oldRate: "",
		amenities: [],
		isPartial: "",

		hallAndDining: "",
		furnishKitchen: "",
		furnishBedrooms: "",
		extras: "",
		landlordPossible: "",
	});
	const [basicDetails, setBasicDetails] = useState(location?.state?.basicDetails);
	const [info, setInfo] = useState({});

	useEffect(() => {
		// let basicdetails = addNewPostReducer.data
		// setBasicDetails(basicdetails)
		let information = addNewPost4Reducer.data
		setInfo(information)
		console.log(info)
		if(info === null || info === undefined){
			setData({ ...data, smartdoorPropertyId: basicDetails.smartdoorPropertyId })
		} else {
			setData(info)
		}
		getAllFilterData();
	}, [addNewPostReducer, addNewPost4Reducer]);

	const getAllFilterData = async () => {
		try {
			const filterData = await getAllFiltersForNewPost();
			setFilters(filterData);
		} catch (error) {
			console.error("Error fetching filters:", error);
		}
	};

	const setAmenities = (value) => {
		if(!data.amenities.includes(value)) {
			let newAmenities = [];
					newAmenities = (data.amenities);
					newAmenities.push(value)
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

				<Form.Group>
					<Form.Label>Description</Form.Label>
					<Form.Control
						as="textarea"
						type="text"
						maxLength="2000"
						placeholder="Enter Description"
					/>
				</Form.Group>
				<Row className="mt-3">
					<Col lg="4">
						<Form.Group controlId="exampleForm.SelectCustom">
							<Form.Label>Furnishing:</Form.Label>
							<Form.Control
								as="select"
								value={data.propertyFurnishing}
								onChange={(e) => {
									setData({ ...data, propertyFurnishing: e.target.value });
									console.log(data.propertyFurnishing);
								}}>
								<option value="" disabled> Select </option>
								{filters.propertyFurnishing?.map((Val) => {
									return <option value={Val}>{Val}</option>;
								})}
							</Form.Control>
						</Form.Group>
					</Col>
					<Col lg="4">
						<Form.Group controlId="exampleForm.SelectCustom">
							<Form.Label>Entrance Facing:</Form.Label>
							<Form.Control
								as="select"
								value={data.enteranceFacing}
								onChange={(e) => {
									setData({ ...data, enteranceFacing: e.target.value });
									console.log(data.enteranceFacing);
								}}
								defaultValue={""} >
								<option value="" disabled> Select </option>
								{filters.enteranceFacing?.map((Val) => {
									return <option value={Val}>{Val}</option>;
								})}
							</Form.Control>
						</Form.Group>
					</Col>
					<Col lg="4">
						<Form.Group controlId="exampleForm.SelectCustom">
							<Form.Label>Security:</Form.Label>
							<Form.Control
								as="select"
								value={data.security}
								onChange={(e) => {
									setData({ ...data, security: e.target.value });
									console.log(data.security);
								}} >
								<option value="" disabled> Select </option>
								{filters.security?.map((Val) => {
									return <option value={Val}>{Val}</option>;
								})}
							</Form.Control>
						</Form.Group>
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
							<Form.Group>
								<Form.Label>Loan from Bank:</Form.Label>
								<Form.Control type="text"
									maxLength={100}
									onInput={(e) => { setData({ ...data, loanFromBank: e.target.value }) }}>
								</Form.Control>
							</Form.Group>
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
						<Form.Group controlId="exampleForm.SelectCustom">
							<Form.Label>Society size:</Form.Label>
							<Form.Control as="select"
								onChange={(e) => {
									setData({ ...data, constructionSize: e.target.value });
								}}>
								<option value="" disabled> Select </option>
								{filters.socialConstructSize?.map((Val) => {
									return <option value={Val}>{Val}</option>;
								})}
							</Form.Control>
						</Form.Group>
					</Col>
					<Col lg="4">
						<Form.Group controlId="exampleForm.SelectCustom">
							<Form.Label>Amenities:</Form.Label>
							<Form.Control as="select"
								onChange={(e) => {
									setAmenities(e.target.value)
								}}>
								<option value="" disabled> Select </option>
								{filters.socialConstructSpecificAmenity?.map((Val) => {
									return <option value={Val}>{Val}</option>;
								})}
							</Form.Control>
						</Form.Group>
					</Col>
					<Col lg="4">
						<Form.Group controlId="exampleForm.SelectCustom">
							<Form.Label>Majority Composition:</Form.Label>
							<Form.Control
								as="select" value={data.majorityComposition}
								onChange={(e) => {
									setData({ ...data, majorityComposition: e.target.value });
								}}>
								<option value="" disabled> Select </option>
								{filters.majorityComposition?.map((Val) => {
									return <option value={Val}>{Val}</option>;
								})}
							</Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col lg="4"></Col>
					<Col lg="4">
						{data.amenities?.map((amenity) => {
							return (
								<>
									<Chip className="mt-1" label={amenity} variant="outlined" color="error" onDelete={() => {handleDelete(amenity)}} >								
									</Chip>	&nbsp;
								</>
							)
						})}
					</Col>
					<Col lg="4"></Col>
				</Row>
				<Row className="mt-3">
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
				</Row>
				<br />
				<br />
				<div className="d-flex">
					<button color="gray">Cancel</button> &nbsp;
					{/* <Link to="/admin/posts/add-new-post/basic-details">
                        </Link> */}
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
