import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import ExpandIcon from '../../../../assets/images/expandIcon.png';
import AddNewProjectPost from '../AddNewProjectPost/AddNewProjectPost';
import Text from '../../../../shared/Text/Text';
import './ProjectPosting.scss';
import AddNewSubProject from '../AddNewSubProject/AddNewSubProject';
import { Button, Col, Row } from 'react-bootstrap';
import Image from '../../../../shared/Image';
import addIcon from '../../../../assets/svg/add.svg';
import closeBtn from '../../../../assets/images/closeBtn.png';
import { fetchBuilderProjectById } from '../../../../common/redux/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ProjectPosting = (props) => {
    const [projectDetails, setProjectDetails] = useState({
        builderProjectSearchDto: []
    });
    const [subProjectList, setSubProjectList] = useState([]);
    const [projectId, setBuilderProjectId] = useState(props?.location?.state?.projectId || null);
    const builderId = props?.location?.state?.builderId;
    const history = useHistory();

    useEffect(() => {
        // console.log(props?.location?.state?.projectId)

    }, [projectId, builderId]);

    const addMoreTower = () => {
        const subProject1 = {};
        let subProjectlist = subProjectList;
        subProjectlist.push(subProject1);
        setSubProjectList([...subProjectlist]);
    }

    const deleteTower = (index) => {
        let subProjectlist = subProjectList;
        subProjectlist.pop(index);
        setSubProjectList([...subProjectlist]);
    }

    const getProjectId = (projectId) => {
        console.log(projectId)
        setBuilderProjectId(projectId)
    }

    return (
        <>
            <div style={{ overflowX: 'hidden' }} >
                <Accordion defaultExpanded={false} className='mb-3' style={{ boxShadow: 'none' }} >
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
                    <AccordionDetails>
                        <AddNewProjectPost fetchProjectId={getProjectId} projectId={projectId} builderId={builderId} />
                    </AccordionDetails>
                </Accordion>

                {subProjectList.map((subProject, index) => (
                    <>
                        <Accordion defaultExpanded={index === subProjectList.length - 1 ? true : false} style={{ boxShadow: 'none' }} >
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
                                    <div className='col-8' style={{ textAlign: 'end', paddingRight: '0%' }} >
                                        <img src={closeBtn} alt='' onClick={() => { deleteTower(index) }} />
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <AddNewSubProject projectId={projectId} builderId={builderId} />
                            </AccordionDetails>
                        </Accordion>
                    </>
                ))}
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
                                disabled={projectId !== null ? false : true}
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

                <div className="projectDetailFormActions pb-4 justify-content-start">
                    <button
                        type="submit"
                        // disabled={this.state.disableSubmit}
                        id="submit-team-member-button"
                        className=" btn-small cancel-btn w-25"
                        onClick={() => { history.push(-1) }}
                    >
                        Cancel
                    </button>
                    {/* <button
                        type=""
                        // disabled={this.state.disableSubmit}
                        id="cancel-team-member-button"
                        className=" btn-small submit-btn"
                        onClick={() => { }}
                    >
                        Save as Draft
                    </button>
                    <button
                        type="submit"
                        // disabled={this.state.disableSubmit}
                        id="cancel-team-member-button"
                        className=" btn-small submit-btn"
                    >
                        Save & Publish
                    </button> */}
                </div>
            </div>
        </>
    )
}

const mapStateToProps = ({ }) => ({

});
const actions = {
    fetchBuilderProjectById,
};
const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(ProjectPosting)