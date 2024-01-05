import { compose } from "redux"
import Text from "../../../../shared/Text/Text";
import { memo, useEffect, useState, useCallback } from "react";
import { Card } from "react-bootstrap";
import docImg from "../../../../assets/images/docImg.png"
import { useRef } from "react";
import S3 from "react-aws-s3";
import { addImage } from "../../../../common/redux/actions"
import Constants from "../../../../common/helpers/Constants";
import { connect } from "react-redux";
import { addNewPostReducer } from "../../../../common/redux/reducers/views/addNewPost.reducer";
import Buttons from "../../../../shared/Buttons/Buttons";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getPropertyDetails, deletePropertyImage } from "../../../../common/redux/actions";
import { provideAuth } from "../../../../common/helpers/Auth";
import closeBtn from "../../../../assets/images/closeBtn.png"

const EditPost3 = (props) => {
	const fileInputRef = useRef(null);
	const location = useLocation();
	const [imageArr, setImageArray] = useState([])
	const [imageLoader, setImageLoader] = useState(false)
	const [loading, setLoading] = useState(true);
	const ReactS3Client = new S3(Constants.CONFIG_PROPERTY);
	const history = useHistory();
	const { userData } = provideAuth();
	const [propertyData, setpropertyData] = useState(location?.state?.propertyData)
	const [basicDetails, setBasicDetails] = useState(location?.state?.basicDetails)
	const [addressDetails, setAddressDetails] = useState(location?.state?.addressDetails)
	const propertyId = propertyData.smartdoorPropertyId

	const _getPropertyDetails = useCallback(() => {
		getPropertyDetails({ propertyId: propertyId, userId: userData.userid })
			.then((response) => {
				setLoading(false);
				if (response.data) {
					if (response.data.resourceData !== null && response.data.status === 200) {
						setpropertyData(response.data.resourceData);
						console.log(propertyData)
						setImageArray(response.data.resourceData?.propertyImageResp)
						console.log(imageArr)
						// if (!response.data.resourceData.basicPlan) {}
					}
				}
				console.log("responseSocietyDetails", response);
				//   console.log("owner id", ownerId);
			})
			.catch((error) => {
				setLoading(false);
				console.log("error", error);
			});
	}, [propertyId, getPropertyDetails]);

	const deleteImageHandler = useCallback(
		(docId) => {
		   console.log(docId, "doc id");
		   deletePropertyImage({ docId: docId })
			  .then((response) => {
				 if (response.data) {
					if (response.data.resourceData) {
					   _getPropertyDetails();
					}
				 }
				 console.log("responseDeleteImage", response);
			  })
			  .catch((error) => {
				 // setLoading(false);
				 console.log("error", error);
			  });
		},
		[getPropertyDetails]
	 );

	useEffect(() => {
		console.log(propertyData)
		_getPropertyDetails();
	}, [addNewPostReducer, _getPropertyDetails]);

	const handleFileChange = (e) => {
		const selectedFile = e.target.files;
		// Handle the selected file here, e.g., upload or process it
		console.log('Selected file:', selectedFile[0]);
		if (selectedFile) {
			const imageArray = Array.from(selectedFile)?.map((file) => URL.createObjectURL(file));
			setImageArray(imageArray);
		}
	};

	const fileUpload = (event) => {
		if (event.target.files && event.target.files[0]) {
			let reader = new FileReader();
			reader.onload = (e) => {
				console.log(e.target.result, "target.result");
				// this.setState({ builderPropertyImg: e.target.result });
			};
			reader.readAsDataURL(event.target.files[0]);
		}
		console.log(event.target.files[0], "after upload files");
		const imageData = {
			propertyId: 554,
			propertyDocs: [],
			propertyImage: [
				{
					docId: null,
					docName: "",
					docURL: "",
				},
			],
		};
		console.log(event.target.files, "before s3 files");
		if (event.target.files.length > 0) {
			setImageLoader(true);
			ReactS3Client.uploadFile(event.target.files[0], event.target.files[0].name)
				.then((data) => {
					console.log("data", data);
					const property_image = [];
					property_image.push({
						docId: null,
						docName: "",
						docURL: data.location,
					});
					const image_data = {
						...imageData,
						propertyDocs: [],
						propertyImage: property_image,
					};
					addImage(
						image_data
					)
						.then((response) => {
							setLoading(false);
							if (response.data) {
								if (response.data.resourceData) {
									setImageLoader(false);
									_getPropertyDetails();
									const imageArray = Array.from(event.target.files[0])?.map((file) => URL.createObjectURL(file));
									setImageArray(imageArray);
									console.log(imageArray)
								}
							}
						})
						.catch((error) => {
							setImageLoader(false);
							setLoading(false);
							console.log("error", error);
						});

				})
				.catch((err) => {
				});
			console.log(event.target.files[0], "end file");
		}
	};



	return (
		<>
			<div className="whiteBg">
				<Text
					size="medium"
					fontWeight="mediumbold"
					color="secondryColor"
					text="Doc/Pics">
				</Text>
				<Card className="mt-2" style={{ maxWidth: 'fit-content', borderRadius: 8, border: '1px #9BA5AD solid' }}
					onClick={() => { fileInputRef.current?.click() }}>
					<div className="d-flex">
						<img className="mt-2" src={docImg} style={{ height: '25px', width: '25px', marginInlineStart: '10px' }}></img>
						<Text
							className="p-2 h6"
							size="medium"
							fontWeight="mediumbold"
							color="secondryColor"
							text="Upload Property Images">
						</Text>
					</div>
				</Card>
				<input
					hidden
					type="file"
					multiple={false}
					ref={fileInputRef}
					onChange={(e) => {
						fileUpload(e);
					}}
				/>
				<div className="d-flex mt-3 no-wrap">
					{imageArr.map((image) => (
						<>
							<div>
								{/* <img src={image?.docURL} style={{ border: '1px #DEDEDE solid', borderRadius: 8, height: '100px', width: '200px',
									marginInlineEnd: '10px' }} onClick={() => {deleteImageHandler(image.docId)}} /> */}
								<img className="me-3" src={image.docURL} style={{width: '150px', height: '100px', borderRadius: 8, border: '1px #9BA5AD solid'}}></img> 
								<img src={closeBtn} style={{float: 'right', width:'15px' , height:'15px', marginInlineStart:'0px'}} onClick={() => {deleteImageHandler(image.docId); console.log(image.docId)}}/>
							</div> &nbsp; &nbsp; &nbsp; &nbsp;
						</>
					))}
				</div>
			</div>
			<div className="d-flex">
				<button color="gray">Cancel</button> &nbsp;
				{/* <Link to="/admin/posts/add-new-post/basic-details">
					</Link> */}
				<Buttons name="Back" onClick={() => { history.push('/admin/property/edit-address-details',{propertyData: propertyData, basicDetails: basicDetails, addressDetails: addressDetails}) }}></Buttons> &nbsp;
				<Buttons name="Next" onClick={() => { history.push('/admin/property/edit-more-info',{propertyData: propertyData, basicDetails: basicDetails, addressDetails: addressDetails}) }} />
			</div>
		</>
	)
}

const mapStateToProps = ({ addNewPostReducer }) => ({
	addNewPostReducer
})
const actions = {

}
const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(EditPost3);