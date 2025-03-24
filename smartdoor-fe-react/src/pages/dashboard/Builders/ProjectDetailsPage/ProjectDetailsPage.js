import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fetchBuilderProjectById } from '../../../../common/redux/actions';
import Text from '../../../../shared/Text/Text';
import ExpandIcon from "../../../../assets/images/expandIcon.png"
import ProjectDetails from './ProjectDetails/ProjectDetails';
import SubProjectDetails from './SubProjectDetails/SubProjectDetails';
import Buttons from '../../../../shared/Buttons/Buttons';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ProjectDetailsPage = (props) => {
    
    const { projectId } = props;
    const [projectDetails, setProjectDetails] = useState(props?.location?.state?.projectDetails);
    const history = useHistory();

    useEffect(() => {
        console.log(props?.location?.state?.projectDetails)
        // fetchBuilderProjectById({ projectId: props?.location?.state?.projectId })
        //     .then((response) => {
        //         console.log(response);
        //         setProjectDetails(response?.data?.resourceData);
        //     });
    }, []);

    return (
        <>
            <div style={{ overflowX: 'hidden' }} >
                <Buttons name="Edit" varient="primary" onClick={() => { history.push('/admin/builders/builder-details/add-new-project', { projectId: projectDetails?.builderProjectSearchDto[0]?.projectId, builderId: props?.location?.state?.builderId, projectDetails: props?.location?.state?.projectDetails, editProject: true }) }} />
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
                        <ProjectDetails projectDetails={projectDetails?.builderProjectSearchDto[0]} />
                    </AccordionDetails>
                </Accordion>
                {projectDetails?.builderPropertyDetailList?.map((subProject, index) => (
                    <>
                        <Accordion defaultExpanded={index === projectDetails?.builderPropertyDetailList?.length - 1 ? true : false} style={{ boxShadow: 'none' }} >
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
                                <SubProjectDetails subProjectDetails={subProject} />
                            </AccordionDetails>
                        </Accordion>
                    </>
                ))}
            </div>
        </>
    )
}

export default (ProjectDetailsPage);