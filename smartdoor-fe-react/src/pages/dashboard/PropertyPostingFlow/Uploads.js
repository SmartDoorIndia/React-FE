import { compose } from "redux";
import Text from "../../../shared/Text/Text";
import Buttons from "../../../shared/Buttons/Buttons";
import { Col, Button } from 'react-bootstrap';
import Image from "../../../shared/Image";
import cameraIcon from '../../../assets/images/camra-icon.svg';
import closeBtn from '../../../assets/images/closeBtn.png';
import { useCallback, useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";
import { showErrorToast, showSuccessToast } from "../../../common/helpers/Utils";
import { addImage, deletePropertyImage, uploadImage } from "../../../common/redux/actions";
import { connect, useDispatch } from "react-redux";
import * as Actions from '../../../common/redux/types';

const Uploads = (props) => {

    const fileInputRef = useRef(null);
    const propertyId = props?.propertyId;
    const [imageArr, setImageArray] = useState([]);
    const [addNewVideoFlag, setAddNewVideoFlag] = useState(false);
    const [videoUrl1, setVideoUrl1] = useState('');
    const [videoUrl2, setVideoUrl2] = useState('');
    const [saveUploadFlag, setSaveUploadFlag] = useState(false);
    const [imageLoader, setImageLoader] = useState(false)
	const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(props)
    },[])

    const deleteImageHandler = useCallback(
        (docId) => {
            console.log(docId, "doc id");
            deletePropertyImage({ docId: docId })
            	.then((response) => {
            		if (response.data) {
            			if (response.data.resourceData) {
                            const newList = imageArr.filter(item => item.docId !== docId);
                            setImageArray(newList);
            			}
            		}
            		console.log("responseDeleteImage", response);
            	})
            	.catch((error) => {
            		// setLoading(false);
            		console.log("error", error);
            	});
        },
        []
    );

    const fileUpload = (event) => {
        if (event.target.files.length > 15) {
            alert("Please select up to 15 files only.");
            return;
        }

        const imageData = {
        	propertyId: propertyId,
        	propertyDocs: [],
        	draft: false,
        	partial: false,
        	propertyImage: [
        		{
        			docId: null,
        			docName: "",
        			docURL: "",
        		},
        	],
        };
        if (event.target.files.length > 0) {
        	setImageLoader(true);
        	let formData = new FormData();
        	const maxSizeInBytes = 15 * 1024 * 1024; // 10MB
        	Array.from(event.target.files).map((file) => {
        		if(file.size > maxSizeInBytes) {
        			showErrorToast('File must be less than 15MB...')
        			return;
        		}
        	})
        	console.log(event.target.files)
        	let fileList = []
        	for (let i = 0; i < event.target.files.length; i++) {
        		fileList.push(event.target.files[i])
        		formData.append('file', event.target.files[i]);
        	}
        	console.log(fileList)
        	formData.append('id', propertyId);
        	formData.append('enumType', 'PROPERTY_IMAGES');
        	uploadImage(formData)
                .then((response) => {
        			console.log(response)
        			if(response.data.status === 200) {
        				const property_image = [];
        				for(let i = 0; i < response.data.resourceData.length; i++) {
        					property_image.push({
        						docId: null,
        						docName: "",
        						docURL: response.data.resourceData[i],
        					});
        				}
        				const image_data = {
        					...imageData,
        					propertyDocs: [],
        					propertyImage: property_image,
        				};
                        setImageArray(property_image)
        				addImage(
        					image_data
        				)
        				.then((response) => {
        					setLoading(false);
        					if (response.data) {
        						if (response.data.resourceData) {
        							setImageLoader(false);
        						}
        					}
        				})
        				.catch((error) => {
        					setImageLoader(false);
        					setLoading(false);
        					console.log("error", error);
        				});
        				showSuccessToast(response.data.customMessage)
        			}
        		})
        		.catch((error) => {
        			setImageLoader(false);
        			setLoading(false);
        			console.log("error", error);
        		});
        }
    };
    const [error, setError] = useState({});

    const saveUploads = () => {
        let isValid = true;
        if((videoUrl1.trim()).length === 0 && (videoUrl2.trim()).length === 0 && addNewVideoFlag === true) {
            setError({videoUrl1: true, videoUrl2: true})
            isValid = false;
            showErrorToast("Please upload atleast one video url");
        }
        if((videoUrl1.trim()).length === 0 && addNewVideoFlag === false) {
            setError({videoUrl1: true})
            isValid = false;
        }
        if((videoUrl2.trim()).length === 0 && addNewVideoFlag === true) {
            setError({videoUrl2: true})
            isValid = false;
        }
        if(imageArr.length === 0) {
            showErrorToast("Please upload images");
            isValid = false;
        }
        let videoUrlObj = []
        if((videoUrl1.trim()).length !== 0 && addNewVideoFlag === false) {
            videoUrlObj = [{
                docId: null,
                docName: '',
                docDescription:'',
                docURL: videoUrl1
            }];
        }
        if(addNewVideoFlag === true && isValid) {
            videoUrlObj = [{
                docId: null,
                docName: '',
                docDescription:'',
                docURL: videoUrl1
            }, 
            {
                docId: null,
                docName: '',
                docDescription:'',
                docURL: videoUrl2
            }];
        }
        if(isValid) {
            saveUploadFlag(true);

            dispatch({type: Actions.UPLOAD_IMAGES_SUCCESS, data: {imapropertyImages: imageArr, propertyVideos: videoUrlObj}});
        }

    }

    return (
        <>
            <div className="whiteBg mb-1">
                <div className="d-flex">
                    <Col lg='6'>
                        <Text text={'Upload property images'} fontWeight={'bold'} style={{ fontSize: '16px' }} />
                        <span>
                            <Text text={'Capture or choose from gallery. File should be in png, jpg, etc.'} fontWeight={'500'} style={{ fontSize: '12px', color: '#949494' }} />
                            <Text text={'Please upload at-least 2 exterior image'} fontWeight={'500'} style={{ fontSize: '12px', color: '#A11447' }} />
                        </span>
                        <Button className="w-50" style={{ color: '#949494', borderStyle: 'dotted', borderColor: 'GrayText', borderWidth: '2px', backgroundColor: 'unset' }}
                            onClick={() => { fileInputRef.current?.click() }}>
                            <div className="d-flex justify-content-center mt-1 mb-0  ">
                                <Image src={cameraIcon}></Image>Upload Image</div></Button>
                        <input
                            hidden
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            multiple={true}
                            ref={fileInputRef}
                            onChange={(e) => {
                                fileUpload(e);
                            }}
                        />
                        <div className="d-flex mt-3" style={{ overflowX: 'scroll', flexWrap: 'wrap' }}>
                            {imageArr.map((image) => (
                                <>
                                    <div className="d-flex">
                                        <img src={image?.docURL} style={{
                                            border: '1px #DEDEDE solid', borderRadius: 8, height: '100px', width: '200px',
                                            marginInlineEnd: '10px'
                                        }} onClick={() => { deleteImageHandler(image.docId) }} />
                                        {/* <img className="me-3 mt-3" src={image.docURL} style={{ width: '150px', height: '100px', borderRadius: 8, border: '1px #9BA5AD solid' }}></img> */}
                                        <img className="mt-2" src={closeBtn} style={{ float: 'right', width: '15px', height: '15px', marginInlineStart: '0px' }} onClick={() => { deleteImageHandler(image.docId); console.log(image.docId) }} />
                                    </div> &nbsp; &nbsp; &nbsp; &nbsp;
                                </>
                            ))}
                        </div>
                    </Col>
                    <Col lg='6'>
                        <Text text={'Add property video'} fontWeight={'bold'} style={{ fontSize: '16px' }} />
                        <Text text={'Paste the link of the video \(\Youtube, Vemio, etc.\)\
                            Max 2 videos can be shared.'} fontWeight={'500'} style={{ fontSize: '12px', color: '#949494' }} />
                        <div className="d-flex mt-2">
                            <TextField
                                className="col-10"
                                type="text"
                                InputProps={{
                                    endAdornment: <>
                                        <Image src={closeBtn} className='mt-3' style={{ scale: '1.5' }} />
                                    </>
                                }}
                                onChange={(e) => { setVideoUrl1(e.target.value) }}
                                value={videoUrl1}
                            ></TextField>
                            {addNewVideoFlag === false ?
                                <Buttons className='ml-3' name={'+'} style={{ fontSize: '12px' }} onClick={() => { setAddNewVideoFlag(true) }} />
                                : null}
                        </div>
                        {addNewVideoFlag ?
                            <>
                                <TextField
                                    className="w-100 mt-2 col-10"
                                    type="text"
                                    InputProps={{
                                        endAdornment: <>
                                            <Image src={closeBtn} className='mt-3' style={{ scale: '1.5' }} />
                                        </>
                                    }}
                                    onChange={(e) => { setVideoUrl2(e.target.value) }}
                                    value={videoUrl2}
                                ></TextField>
                                <Buttons className='ml-3 mt-2 py-3' name={'X'} style={{ fontSize: '12px' }} onClick={() => { setAddNewVideoFlag(false); setVideoUrl2('') }} />
                            </>
                            : null}
                    </Col>
                </div>
            </div>
            {saveUploadFlag === false ?
                <div className="d-flex">
                    <Buttons className='p-2 px-4' name='Confirm' onClick={() => { saveUploads(); }}></Buttons> &nbsp; &nbsp;
                    <Buttons className='p-2 px-4' name='Cancel' ></Buttons>
                </div>
                : null}
        </>
    );
}
const mapStateToProps = ({ uploadImages }) => ({
    uploadImages
});

const actions = {

}

export default compose(connect(mapStateToProps, actions))(Uploads);