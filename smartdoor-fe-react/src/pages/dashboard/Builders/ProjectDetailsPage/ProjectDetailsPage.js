import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { fetchBuilderProjectById } from '../../../../common/redux/actions';
import Text from '../../../../shared/Text/Text';
import ExpandIcon from "../../../../assets/images/expandIcon.png"
import ProjectDetails from './ProjectDetails/ProjectDetails';
import SubProjectDetails from './SubProjectDetails/SubProjectDetails';
import Image from '../../../../shared/Image';
import addIcon from "../../../../assets/svg/add.svg";
import { Button, Col, Row } from 'react-bootstrap';
import AddNewSubProject from '../AddNewSubProject/AddNewSubProject';
import { FallBackLoader } from '../../../../common/helpers/Loader';

const ProjectDetailsPage = (props) => {
    const [projectDetails, setProjectDetails] = useState({
        builderProjectSearchDto: []
    });
    const [subProjectList, setSubProjectList] = useState([]);
    const [addTowerFlag, setAddTowerFlag] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(props?.location?.state?.projectId)
        setLoading(true);
        fetchBuilderProjectById({ projectId: props?.location?.state?.projectId, builderId: props?.location?.state?.builderId })
        .then((response) => {
                setLoading(false);
                console.log(response);
                setProjectDetails(response?.data?.resourceData);
                if (response?.data?.resourceData?.subProjectList !== null) {
                    setSubProjectList([...response?.data?.resourceData?.subProjectList]);
                }
            });
    }, []);

    const handleShowProjectPost = useCallback(async () => {
        console.log("handleShowProjectPost called in ProjectDetailsPage");
        console.log(props)
        setLoading(true);
        const response = await fetchBuilderProjectById({
            projectId: props?.location?.state?.projectId,
            builderId: props?.location?.state?.builderId
        });
        setLoading(false);
        if(response?.status === 200) {
            setProjectDetails(response?.data?.resourceData);
            if (response?.data?.resourceData?.subProjectList !== null) {
                setSubProjectList([...response?.data?.resourceData?.subProjectList]);
            }
        }

    }, [projectDetails, props?.builderId]);

    const addMoreTower = () => {
        setAddTowerFlag(true);
    }

    return (
        <>
            {loading ?
                <>
                    <FallBackLoader />
                </>
                : null}
            <div style={{ overflowX: 'hidden' }} >
                {/* <Buttons name="Edit" varient="primary" onClick={() => { history.push('/admin/builders/builder-details/add-new-project', { projectId: props?.location?.state?.projectId, builderId: props?.location?.state?.builderId, projectDetails: props?.location?.state?.projectDetails, editProject: true }) }} /> */}
                <Accordion defaultExpanded={true} className='mb-3' style={{ boxShadow: 'none' }} >
                    <AccordionSummary
                        expandIcon={<img src={ExpandIcon} alt='' />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{
                            backgroundColor: '#BE1452',
                            borderRadius: '5px',
                            '&.Mui-expanded': {
                                minHeight: '42px',
                                height: '42px',
                            },
                            height: '42px !important',
                            boxShadow: 'none'
                        }}
                    >
                        <Text className="page-title ml-3" text={'PROJECT DETAIL'} style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}></Text>
                    </AccordionSummary>
                    <AccordionDetails sx={{ border: 'solid 1px #DED6D9', borderRadius: '6px' }}>
                        <ProjectDetails projectDetails={projectDetails?.builderProjectSearchDto[0]} builderId={props?.location?.state?.builderId}
                            handleProjectEdit={handleShowProjectPost} />
                    </AccordionDetails>
                </Accordion>
                {subProjectList?.map((subProject, index) => (
                    <>
                        <Accordion defaultExpanded={index === subProjectList?.length - 1 ? true : false} style={{ boxShadow: 'none' }} >
                            <AccordionSummary
                                expandIcon={<img src={ExpandIcon} alt='' />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                sx={{
                                    backgroundColor: '#E9E9E9',
                                    borderRadius: '5px',
                                    '&.Mui-expanded': {
                                        minHeight: '42px',
                                        height: '42px',
                                    },
                                    boxShadow: 'none',
                                    height: '42px !important'
                                }}
                            >
                                <div className='row col-12'>
                                    <div className='col-4 d-flex'>
                                        <Text className="page-title" text={'TOWER / PLOTTED'} style={{ fontSize: '18px', fontWeight: '700', color: 'black' }}></Text> &nbsp;&nbsp;&nbsp;
                                        <Text className="text-center" text={index + 1} style={{ fontSize: '18px', fontWeight: '700', color: 'white', backgroundColor: '#BE1452', borderRadius: '4px', width: '24px', height: '24px' }} />
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails sx={{ border: 'solid 1px #DED6D9', borderRadius: '6px' }}>
                                <SubProjectDetails subProjectDetails={subProject} builderId={props?.location?.state?.builderId}
                                    parentProjectId={props?.location?.state?.projectId} />
                            </AccordionDetails>
                        </Accordion>
                    </>
                ))}
                {addTowerFlag ?
                    <>
                        <Accordion defaultExpanded={true} style={{ boxShadow: 'none' }} >
                            <AccordionSummary
                                expandIcon={<img src={ExpandIcon} alt='' />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                sx={{
                                    backgroundColor: '#E9E9E9',
                                    borderRadius: '5px',
                                    '&.Mui-expanded': {
                                        minHeight: '42px',
                                        height: '42px',
                                    },
                                    boxShadow: 'none',
                                    height: '42px !important'
                                }}
                            >
                                <div className='row col-12'>
                                    <div className='col-4 d-flex'>
                                        <Text className="page-title" text={'TOWER / PLOTTED'} style={{ fontSize: '18px', fontWeight: '700', color: 'black' }}></Text> &nbsp;&nbsp;&nbsp;
                                        <Text className="text-center" text={"New"} style={{ fontSize: '18px', fontWeight: '700', color: 'white', backgroundColor: '#BE1452', borderRadius: '4px', width: '40px', height: '24px' }} />
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails sx={{ border: 'solid 1px #DED6D9', borderRadius: '6px' }}>
                                <AddNewSubProject projectId={props?.location?.state?.projectId} builderId={props?.location?.state?.builderId} />
                            </AccordionDetails>
                        </Accordion>
                    </>
                    : null}
                <div>
                    <Row className='mt-3' >
                        <Col lg="3">
                            <Button
                                className="d-flex py-0 mb-2"
                                style={{
                                    color: "#BE1452",
                                    backgroundColor: "#F8F3F5",
                                    borderColor: "#DED6D9",
                                }}
                                disabled={false}
                                onClick={() => { addMoreTower() }} // Bind this function to handle the click
                            >
                                <div
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginTop: "3vh"
                                    }}
                                >
                                    <Image src={addIcon} style={{ width: "15px", height: '15px', marginTop: "0%" }} />
                                </div>
                                <Text
                                    text={"Add More Tower / Plotted "}
                                    fontWeight="bold"
                                    style={{ fontSize: "12px", color: "#BE1452" }}
                                />
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default (ProjectDetailsPage);