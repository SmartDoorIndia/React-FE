import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import ImageSliderComponent from "../../../../../shared/ImageSliderComp/ImageSliderComponent";
import Text from '../../../../../shared/Text/Text';
import MapComponent from "../../../../../shared/Map/MapComponent";
import Buttons from '../../../../../shared/Buttons/Buttons';
import AddNewProjectPost from '../../AddNewProjectPost/AddNewProjectPost';

const ProjectDetails = (props) => {
    const {handleProjectEdit} = props;
    const projectDetails = (props?.projectDetails);
    const [editProjectFlag, setEditProjectFlag] = useState(false);

    console.log(props)

    const handleShowProjectPost = () => {
        console.log("Calling parent function..."); // Debugging
        setEditProjectFlag(false);
        handleProjectEdit();  // This calls the function in the parent component
    };
      
    const toggleEditProject = () => {
        setEditProjectFlag(false);
    }

    return (
        <>
            <Row>
                <Col lg={7}>
                    <div className="d-none d-md-block">
                        {projectDetails?.projectImages?.length > 0 ? (
                            <ImageSliderComponent
                                imagesArr={projectDetails?.projectImages || []}
                                videosArr={[]}
                                imageLoader={false}
                                smartdoorProperty={false}
                            />
                        ) : (
                            <ImageSliderComponent />
                        )}
                    </div>
                </Col>
                <Col lg={5}>
                    <Row>
                        <Col lg={6}>
                            <div className='mt-3'>
                                <Text text={"Project Name"} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                                <Text text={projectDetails?.projectName} style={{ fontSize: '14px', fontWeight: '500' }} />
                            </div>
                            <div className='mt-2'>
                                <Text text={"Total Tower / Plotted Planned"} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                                <Text text={projectDetails?.totalTowers} style={{ fontSize: '14px', fontWeight: '500' }} />
                            </div>
                            <div className='mt-2'>
                                <Text text={"Total Area to Develop"} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                                <Text text={projectDetails?.totalAreaToDevelop + "Sq.Ft."} style={{ fontSize: '14px', fontWeight: '500' }} />
                            </div>
                            <div className='mt-2'>
                                <Text text={"Possession"} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                                <Text text={projectDetails?.possessionFrom + " - " + projectDetails?.possessionTo} style={{ fontSize: '14px', fontWeight: '500' }} />
                            </div>
                            <div className='mt-2'>
                                <Text text={"Location"} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                                <Text text={projectDetails?.projectAddress} style={{ fontSize: '14px', fontWeight: '500' }} />
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className='mt-3'>
                                <Text text={"General Amenities"} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                                <Text text={projectDetails?.projectAmenities} style={{ fontSize: '14px', fontWeight: '500' }} />
                            </div>
                            <div className='mt-2'>
                                <Text text={"Land Area"} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                                <Text text={projectDetails?.landArea + "Acre"} style={{ fontSize: '14px', fontWeight: '500' }} />
                            </div>
                            <div className='mt-2'>
                                <Text text={"Open Area "} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                                <Text text={projectDetails?.openAreaPercent + "%"} style={{ fontSize: '14px', fontWeight: '500' }} />
                            </div>
                        </Col>
                    </Row>
                    <div style={{ height: '120px', width: '90%', position: 'relative', borderRadius: '5px' }}>
                        <MapComponent
                            p_lat={projectDetails?.latitude}
                            p_lng={projectDetails?.longitude}
                            draggable={false}
                            height='120px'
                            style={{
                                height: "120px",
                                width: "90%",
                                borderRadius: "5px",
                            }}
                        />
                    </div>
                </Col>
            </Row>
            <hr />
            <div>
                <div className='mt-2 mb-3'>
                    <Text text={"Project & Property Description"} style={{ fontSize: '12px', fontWeight: '500', color: '#949494' }} />
                    <Text text={projectDetails?.propertyDescription} style={{ fontSize: '14px', fontWeight: '500' }} />
                </div>
            </div>
            <div className='justify-self-end mb-2' >
                <Buttons name="Edit" onClick={() => { setEditProjectFlag(true); }} />
            </div>
            {editProjectFlag &&
                <>
                    <AddNewProjectPost 
                    projectDetails={projectDetails} 
                    editProject={true} 
                    toggleEdit={toggleEditProject}
                    builderId={props?.builderId}
                    showEditProject={handleShowProjectPost} />
                </>
            }
        </>
    )
}

export default ProjectDetails