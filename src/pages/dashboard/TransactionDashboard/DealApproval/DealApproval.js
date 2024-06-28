import React, { useState, useEffect, useCallback } from 'react';
import Form from 'react-bootstrap/Form'
import Buttons from '../../../../shared/Buttons/Buttons';
import Text from '../../../../shared/Text/Text';
import { Col, Row } from 'react-bootstrap';
import { getDealApprovalDetail} from '../../../../common/redux/actions';
// import './LeadDetails.scss';

import { formateDate, formateDateTime, handleStatusElement } from '../../../../common/helpers/Utils';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../../../common/helpers/Auth';
import Image from '../../../../shared/Image/Image';
import userImageAvatar from '../../../../assets/svg/avatar_sml.svg'
import phIcon from '../../../../assets/images/ph-icon.png'


const DealApproval = (props) => {
  console.log(props,"ppppppppppppppppppppppppppp");
  const { auth: { userData } } = useUserContext();
  console.log('LeaddetailsPage', props)
  // const leadId = props.location.state ? props.location.state.leadId : ''
  const dealApprovalId = props?.location?.state?.dealApprovalData ? props?.location?.state?.dealApprovalData.id : ''

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  // const [selectedSelection, setSelect] = useState('');
  // const [assignToListToggle, setAssignToListToggle] = useState(false);
  // const [allComments, setAllComments] = useState([])
  // const [commentValue, setCommentValue] = useState('')


  const _getDealApprovalData = useCallback(() => {
    getDealApprovalDetail({ dealId: dealApprovalId })
      .then((response) => {
        if (response.data) {
          if (response.data.resourceData) setData(response.data.resourceData);
          if (response.data.error) setError(response.data.error)
        }
        setLoading(false);
        console.log('response', response)
      })
      .catch((error) => {
        setLoading(false);
        console.log('error', error)
      })
  }, [getDealApprovalDetail])

  useEffect(() => {
    _getDealApprovalData();
  }, [_getDealApprovalData])

//   function handleStatus(data, status, name) {
//     if (name === 'next') {
//       if (status === 'IN_PROGRESS') {
//         if (data[0]) {
//           if (data[0].clientInterest === 'Will decide later') return true;
//           else if (data[0].clientInterest === 'No, does not look interested') return true;
//           else if (data[0].clientInterest === 'Yes, interested') return false;
//           else return false;
//         } else return false;
//       }
//     } else {
//       if (status === 'IN_PROGRESS') {
//         if (data[0]) {
//           if (data[0].clientInterest === 'Will decide later') return false;
//           else if (data[0].clientInterest === 'No, does not look interested') return false;
//           else if (data[0].clientInterest === 'Yes, interested') return true;
//           else return false;
//         } else return false;
//       }
//     }
//   }

//   function handleUserAssignmet(leadId, userId) {
//     if (leadId && userId) {
//       assignLeadToUser({ leadId, userId })
//         .then((data) => {
//           console.log('Success')
//           _getLeadData();
//         })
//         .catch((err) => {
//           console.log(err)
//         })
//     }
//   }

//   const handleAssignLead = () => {
//     handleUserAssignmet(leadId, selectedSelection);
//   }

//   const handleCloseSalesLead = () =>{
//     closeSalesLead({ leadId}).then((res)=> {
//       console.log(res, "close sales lead!!")
//       if(res.data.status === 200){
//         _getLeadData();
//       }
//     })
//     .catch(err=> console.log(err))
//   }

  return (
    <>
      <div style={{ height: '2%' }}>
      </div>
      <div className="whiteBg">
        {
          error ? <h1>{error}</h1> :

            loading ? <div>Loading...</div> :
              <>
                <div className="d-flex justify-content-between">
                  <div className="leadTitle">
                    <div className="d-flex align-items-center">
                      <Link className='removeUnderline'
                      to={{
                          pathname: props.location.state.module === 'LEAD_DETAILS'?'/admin/transaction-leads/property-details': '/admin/meeting-requests/property-details',
                          state: { propertyId: data?.propertyId, userId: Number(userData.userid) },
                        }}
                        >
                        <Text size="medium" fontWeight="mediumbold" color="secondryColor" text={`${data?.houseNumber}, ${data?.towerName !== null ? `${data?.towerName},` : ''} ${data?.societyName}`} className=" linkFor mr-2" />
                      </Link>
                      {data?.status ? handleStatusElement(data?.status) : ''}
                    </div>

                    <Text size="Small" fontWeight="smbold" color="secondryColor" text={data.location || '-'} />
                  </div>
                  <div className="locationSelect">
                    {props.location.state.module === 'LEAD_DETAILS' && data?.canBeReopened ?
                      <Buttons
                        name="Re-open"
                        varient="primary"
                        type="submit"
                        size="xSmall"
                        color="white"
                        // onClick={handleReopen}
                      />
                      : null}

                  </div>
                </div>
                <Row className="mt-3">
                  {props.location.state.module === 'LEAD_DETAILS' ? null :
                    <Col>
                      <div className="smallImagesize">
                        <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Owner Information" />
                        <div className='d-flex mt-2'>
                          <Image
                            name="consumerIcon"
                            src={data?.ownerProfileImage !== null ? data?.ownerProfileImage : userImageAvatar}
                            className="img-fluid"
                          />
                          <div>
                            <Text size="Small" className='ml-2' fontWeight="mediumbold" color="secondryColor" text={data?.ownerName} />
                            <div className="d-flex ml-2">
                              <img src={phIcon} alt="" className="ph-icon"/>
                              <Text className="ml-1" size="Small" fontWeight="mediumbold" color="secondryColor" text={data?.ownerMobileNumber} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  }

                  {/* <Col>
                      <div>
                        <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Date" />
                        <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={ formateDate(data.leadDate) }/>
                      </div>
                    </Col> */}
                  <Col>
                    <div className='smallImagesize'>
                      <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Buyer Information" />
                      <div className='d-flex mt-2'>
                        <Image
                          name="consumerIcon"
                          src={data?.buyerProfileImage !== null ? data?.buyerProfileImage : userImageAvatar}
                          className="img-fluid"
                        />
                        <div>
                          <Text size="Small" className='ml-2' fontWeight="mediumbold" color="secondryColor" text={data?.buyerName} />
                          <div className="d-flex ml-2">
                            <img src={phIcon} alt="" className="ph-icon"/>
                            <Text className="ml-1" size="Small" fontWeight="mediumbold" color="secondryColor" text={data?.buyerMobileNumber} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className='smallImagesize'>
                      <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Assigned To" />
                      {data?.assignedTo ?
                      <div className='d-flex mt-2'>
                        <Image
                          name="consumerIcon" alt=""
                          src={data?.assignedToProfileImageUrl !== null ? data?.assignedToProfileImageUrl : userImageAvatar}
                          className="img-fluid"
                        />
                        <div >
                        <Text size="Small" className='ml-2' fontWeight="mediumbold" color="secondryColor" text={data?.assignedTo} />
                          <div className="d-flex ml-2">
                          <img src={phIcon} alt="" className="ph-icon"/>
                          <Text className="ml-1" size="Small" fontWeight="mediumbold" color="secondryColor" text={data?.assignedToMobileNumber} />
                          </div>
                        </div>
                      </div>
                      :
                      <div className="w-75 e_select">
                        <Form.Group controlId="exampleForm.SelectCustom" className="">
                          <Form.Control as="select" 
                          // onChange={ (e)=>  handleUserAssignmet(id, e.target.value) }
                          >
                            <option value="" disabled selected>Assign</option>
                            {/* <option value="" >None</option>*/}
                            {
                                    data?.assignToList ? data?.assignToList.map((data, index)=>
                                      <option key={ index } value={ data.id }>{data.name}</option>,
                                    ) :
                                    null
                            }
                          </Form.Control>
                        </Form.Group>
                      </div>
                    //   <div className="w-100">
                    //   <div className="assignTo">
                    //       <Form.Group controlId="exampleForm.SelectCustom" className="w-100 display-flex">
                    //         <Form.Control
                    //             as="select"
                    //             className="w-100"
                    //             // onChange={(e) => handleUserAssignmet(id, e.target.value)}
                    //         >
                    //             <option>Assign</option>
                    //             {data?.assignToList?.length ? data?.assignToList?.map((data, index) => (
                    //               <option key={index} value={data.id}>
                    //                   {data.name}
                    //               </option>
                    //             )):''}
                    //         </Form.Control>
                    //       </Form.Group>
                    //   </div>
                    // </div>
                    }
                      {/* <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data?.assignedToMobileNumber} /> */}
                      {/* {
                                assignToListToggle ?
                                  <div className="w-75 e_select">
                                    <Form.Group controlId="exampleForm.SelectCustom" className="">
                                      <Form.Control as="select" onChange={ (e)=>setSelect(e.target.value) }>
                                        <option value="" disabled selected>Assign</option>
                                        <option value="" >None</option>
                                        {
                                                data.assignToList ? data.assignToList.map((data, index)=>
                                                  <option key={ index } value={ data.id }>{data.name}</option>,
                                                ) :
                                                null
                                        }
                                      </Form.Control>
                                    </Form.Group>
                                  </div> :
                                  <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={ data.assignTo || '-' } />
                        } */}
                    </div>
                  </Col>
                  <Col>
                    <div >
                      <div className='d-flex align-items-center'>
                        <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Event Date" />
                      </div>
                      <div className='d-flex align-items-center mt-2'>
                      <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data?.date ? `${formateDate(data?.date)} ${data?.startTime===null ? "" : `at ${data?.startTime} - ${data?.endTime}`}` :'-'} />
                      {/* <span className={`badge-two ml-2 ${data?.visitStatus === "NOT VISITED"?'not-visited' : ''}`}>
                          <img src={data?.visitStatus === "NOT VISITED"? crossIcon: checkIcon} className='mr-2'/>
                          {/* {data?.visitStatus === "NOT VISITED" ? "Not Visited": "Visited"} */}
                          <span>
                          {data?.visitStatus ? handleStatusElement(data?.visitStatus) : ''}
                        </span> 

                      </div>
                      {data?.feedbackAvailable ?
                      <Buttons
                        name={data?.feedbackAvailable ? `View Feedback >`: '' }
                        // varient="primary"
                        // type="submit"
                        size="xSmall"
                        color="primary"
                        className="feedback-btn"
                        onClick={() => {
                          // handleShow();
                          // setModalData(data.visitId);
                          // handleShow();
                       }}
                      />
                      :null}
                    </div>
                    {/* <Buttons text="view feed" onClick={() => {
                        console.log('click hua !!!')
                        setModalData(data.id);
                        handleShow();
                     }}> */}
                    {/* <Text size="xSmall" fontWeight="mediumbold" color="primaryColor" text="view feed" /> */}
                     {/* </Buttons> */}
                    {/* {data?.feedbackAvailable ? `View Feedback >`: '' } />                     */}
                  </Col>

                  {/* <Col>
                      <div>
                        <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="No. of properties" />
                        <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={ data.numberOfProperties } />
                      </div>
                    </Col> */}
                  {/* <Col>
                      <div>
                        <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Constructed In" />
                        <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={ data.constructed } />
                      </div>
                    </Col> */}
                </Row>

               { data.actualPrice  ? 
               <Row>
                  <Col xs={4}>
                    <div className='mt-2'>
                      <div className='d-flex align-items-center'>
                        <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Deal Price" />
                      </div>
                      <div className='d-flex align-items-center mt-2'>
                      <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={`₹${data.actualPrice}`} />
                      </div>
                    </div>       
                  </Col>
                </Row>
                : null }

                {/* {props.location.state.module==='LEAD_DETAILS'? 
                      <Buttons
                        // disabled={
                        //         data.status === 'COMPLETED' ||
                        //         data.status === 'PENDING' ||
                        //         data.status === 'NOT_INTERESTED' ||
                        //         data.status === 'CANCELLED' ||
                        //         data.status === 'PROBLEM'|| handleStatus(data.reviews, data.status, 'next') ? true : false }
                        name="Previous visits"
                        varient="primary"
                        type="submit"
                        size="xSmall"
                        color="white"
                        onClick={ handleApprove }
                        className = "mt-2 prev-req-btn"
                      />
                      :<div className="separator mt-4"></div>} */}
                {/* {props.location.state.module === 'LEAD_DETAILS' ?
                  <Accordion defaultActiveKey="0" className='accordian-style mt-3'>
                    <Card className='transactionlLeaddetailTableWrapper'>
                      <Accordion.Toggle onClick={handleArrow} as={Card.Header} eventKey="0" className="d-flex justify-content-between align-items-center">
                        <span className='h6 font-weight-bold mb-0'>Previous Visits</span>
                        {previousVisitsArrow ? <img src={downArrowIcon}/> :
                        <img src={upArrowIcon} />}
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <DataTableComponent
                            onChangePage={onChangePage}
                            data={previousVisitdata}
                            columns={previousVisitColumns}
                            progressPending={ispreviousVisitdataloading}
                            paginationComponent={PaginationComponent}
                            paginationRowsPerPageOptions={[4, 8, 12, 16,20, 24,28, 32, 36, 40]}
                            paginationPerPage={4}
                            progressComponent={ProgressComponent}
                          // sortIcon={<Image name="sort_icon" src={sortIocn} /> }
                          /></Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                  : null} */}


                <div className="feedBack mt-4">
                  {
                    data?.clientFeedback?.length ?
                      <>
                        <Text size="medium" fontWeight="mediumbold" color="secondryColor" text="Lead Follow up" />
                        {data.clientFeedback.map((_value, index) => {
                          return <div key={index}>
                            <div className="d-flex align-items-center mt-2">
                              <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={`From: ${_value.feedBackByName || ' - '}`} />
                              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text={formateDateTime(_value?.date)} className="ml-2" />
                            </div>
                            {_value.clientStatus != null ?
                            <Text size="Small" fontWeight="mediumbold" color="primaryColor" text={((_value.clientStatus)?.charAt(0)?.toUpperCase() + ((_value.clientStatus)?.slice(1))?.toLowerCase())} />:''}
                            <Text size="Small" fontWeight="smbold" color="secondryColor" text={_value.review} className="mt-2" />

                          </div>
                        })}
                      </>
                      :
                      null
                  }

                </div>
              </>
        }
      </div>

    </>
  )
}

export default DealApproval;
