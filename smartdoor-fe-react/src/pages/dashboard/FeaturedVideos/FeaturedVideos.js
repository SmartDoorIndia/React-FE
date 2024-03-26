import { connect, useSelector } from "react-redux"
import { compose } from "redux";
import { Divider, TextField } from "@mui/material";
import Buttons from "../../../shared/Buttons/Buttons";
import { Col, Row } from "react-bootstrap";
import checkIcon from "../../../../src/assets/svg/tick.svg"
import deleteIcon from "../../../../src/assets/images/delete-icon.svg"
import closeIcon from "../../../../src/assets/svg/crossIcon.svg"
import equalIcon from "../../../../src/assets/svg/equalIcon.svg"
import { useEffect, useRef, useState } from "react";
import addIcons from "../../../assets/svg/add.svg";
import undoIcon from "../../../assets/svg/undoIcon.svg";
import { showErrorToast, showSuccessToast } from "../../../common/helpers/Utils";
import { getFeaturedVideoList, addFeaturedVideoList } from '../../../common/redux/actions'
import CONSTANTS from "../../../common/helpers/Constants";

const FeaturedVideos = (props) => {

    const { getFeaturedVideoList,  addFeaturedVideoList } = props;
    const featuredVideos = useSelector(state => state.featuredVideos)
    const [featuredVideosList, setFeaturedVideosList] = useState([]);
    const [addVideoFlag, setAddVideoFlag] = useState(false);
    const [newVideoUrl, setNewVideoUrl] = useState('');
    const vidoeRef = useRef(null);
    const [saveFlag, setSaveFlag] = useState(false);

    useEffect(async () => {
        await getFeaturedVideoList({ parameterId: CONSTANTS.FEATURED_VIDEO_KEY });
        setVideosList();
    }, [getFeaturedVideoList, featuredVideos?.data?.length]);

    const setVideosList = () => {
        let objList = []
        for (let i = 0; i < featuredVideos?.data?.length; i++) {
            let obj = { id: i + 1, text: featuredVideos?.data[i] }
            objList.push(obj)
        }
        setFeaturedVideosList([...objList]);
    }

    useEffect(() => {
        if (vidoeRef.current) {
            vidoeRef.current.scrollTop = vidoeRef.current.scrollHeight;
        }
    }, [featuredVideosList?.length]);

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData('id', id);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, id) => {
        const draggedId = e.dataTransfer.getData('id');
        const draggedItem = featuredVideosList.find(item => item.id === Number(draggedId));
        const newItems = featuredVideosList.filter(item => item.id !== Number(draggedId));
        const index = featuredVideosList.findIndex(item => item.id === Number(id));
        newItems.splice(index, 0, draggedItem);
        setFeaturedVideosList(newItems);
        console.log(newItems)
        setSaveFlag(true)
    };

    const addNewVideo = () => {
        setNewVideoUrl(newVideoUrl.trim())
        if ((newVideoUrl.trim())?.length !== 0) {
            let item = { id: featuredVideosList[featuredVideosList.length - 1]?.id + 1, text: newVideoUrl.trim() }
            featuredVideosList.push(item)
            setAddVideoFlag(false)
            setNewVideoUrl('')
            setSaveFlag(true)
            showSuccessToast("Link added successfully...")
        } else {
            setNewVideoUrl('')
            showErrorToast("Enter valid link...");
        }
    }

    const deleteVideo = (id) => {
        // setFeaturedVideosList(prevItems => prevItems.filter(item => item.id !== id))
        setFeaturedVideosList(prevList => prevList.map(obj => {
            if (obj.id === id) {
                return { ...obj, deleted: true };
            }
            return obj;
        }));
        setSaveFlag(true)
    }

    const restoreVideo = (id) => {
        // setFeaturedVideosList(prevItems => prevItems.filter(item => item.id !== id))
        setFeaturedVideosList(prevList => prevList.map(obj => {
            if (obj.id === id) {
                return { ...obj, deleted: false };
            }
            return obj;
        }));
        setSaveFlag(true)
    }

    const saveChanges = async () => {
        let validList = true;
        setFeaturedVideosList(prevItems => prevItems.filter(item => item.deleted !== true))
        let finalList = featuredVideosList.filter(item => item.deleted !== true)
        console.log(finalList)
        featuredVideosList.forEach(element => {
            if (element.text === '' || element.text === null) {
                showErrorToast("Empty link not allowed...")
                validList = false;
                return null;
            }
        })
        if (validList) {
            try {
                let paramType = finalList.length > 1 ? 'MULTIPLE' : 'SINGLE'
                const textValues = finalList.map(item => item.text);
                const obj = { values: textValues };
                const jsonString = JSON.stringify(obj);
    
                // Assuming addFeaturedVideoList returns a promise
                await addFeaturedVideoList({
                    parameterId: CONSTANTS.FEATURED_VIDEO_KEY,
                    parameterType: paramType,
                    value: jsonString,
                    parameterDescription: 'home screen videos.'
                });
                
                setSaveFlag(false);
            } catch (error) {
                // Handle error if addFeaturedVideoList fails
                console.error("Error occurred while adding featured video list:", error);
            }
        }
    }

    return (
        <>
            <div className="whiteBg">
                <div ref={vidoeRef} style={{ maxHeight: '25rem', height: 'fit-content', overflowY: 'auto', overflowX: 'hidden' }} >
                    {featuredVideosList.map(item => (
                        <>
                            <Row
                                key={item.id}
                                className="d-flex mt-3 mb-3"
                                draggable
                                onDragStart={(e) => handleDragStart(e, item.id)}
                                onDragOver={(e) => handleDragOver(e)}
                                onDrop={(e) => handleDrop(e, item.id)}
                            >
                                <Col lg='1'>
                                    <img className="mt-2" src={equalIcon} alt="close" style={{ height: '40px', width: '40px', cursor: 'move' }} />
                                </Col>
                                <Col lg='6'>
                                    <TextField
                                        className='w-100'
                                        id={`outlined-required-${item.id}`}
                                        label='Url'
                                        type="text"
                                        disabled={item.deleted ? true : false}
                                        style={{ textDecoration: item.deleted ? 'line-through' : 'none' }}
                                        defaultValue={item.text}
                                        onInput={(e) => {
                                            const newTextValue = e.target.value;
                                            setFeaturedVideosList(prevList => prevList.map(obj => {
                                                if (obj.id === item.id) {
                                                    return { ...obj, text: newTextValue, edited: true };
                                                }
                                                return obj;
                                            }));
                                            setSaveFlag(true)
                                        }}
                                    />
                                </Col>
                                {item.deleted === false || item.deleted === undefined ?
                                    <Col lg='1'>
                                        <img className="mt-3" src={deleteIcon} alt="close" style={{ height: '20px', width: '20px', cursor: 'pointer' }}
                                            onClick={() => { deleteVideo(item.id) }} />
                                    </Col>
                                    : null}
                                {item.deleted === true ?
                                    <Col lg='1'>
                                        <img className="mt-3" src={undoIcon} alt="close" style={{ height: '25px', width: '25px', cursor: 'pointer' }}
                                            onClick={() => { restoreVideo(item.id) }} />
                                    </Col>
                                    : null}
                            </Row>
                            <Divider />
                        </>
                    ))}
                </div>
                {saveFlag === true ?
                    <div className="d-flex mt-2" style={{ justifyContent: 'end' }}>
                        <Buttons name='Save Changes' size='Small' onClick={() => { saveChanges() }}></Buttons>
                    </div>
                    : null}
                <img className="mt-2" src={addIcons} alt="check" style={{ height: '35px', width: '35px', borderStyle: 'solid', borderColor: 'white', borderWidth: 'thin', borderRadius: '50%', cursor: 'pointer' }}
                    onClick={() => { setAddVideoFlag(true) }} />

                {addVideoFlag ?
                    <Row
                        className="d-flex mt-2"
                    >
                        <Col lg='4'>
                            <TextField
                                className='w-100'
                                label='Url'
                                type="text"
                                defaultValue={newVideoUrl}
                                onInput={(e) => setNewVideoUrl(e.target.value)}
                            />
                        </Col>
                        <Col lg='1'>
                            <img className="mt-2" src={checkIcon} alt="check" style={{ height: '30px', width: '30px', borderColor: 'white', borderStyle: 'solid', borderWidth: 'thin', borderRadius: '50%', cursor: 'pointer' }}
                                onClick={() => { addNewVideo() }} />
                        </Col>
                        <Col lg='1'>
                            <img className="mt-2" src={closeIcon} alt="close" style={{ height: '27px', width: '27px', cursor: 'pointer' }}
                                onClick={() => { setAddVideoFlag(false); setNewVideoUrl('') }} />
                        </Col>
                    </Row> : null}
            </div>
        </>
    );
}

const mapStateToProps = ({ featuredVideos }) => ({
    featuredVideos
});

const actions = {
    getFeaturedVideoList,
    addFeaturedVideoList
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect)(FeaturedVideos);