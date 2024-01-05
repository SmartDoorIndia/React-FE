import React, { useState, useEffect, useCallback, memo } from 'react';
import Form from 'react-bootstrap/Form'
import Buttons from '../../../../shared/Buttons/Buttons';
import Text from '../../../../shared/Text/Text';
import { Col, Row } from 'react-bootstrap';
import { getLeadsDetail, assignLeadToUser, postComment, closeSalesLead} from '../../../../common/redux/actions';
import './LeadDetails.scss';

import { formateDate, formateDateTime, handleStatusElement } from '../../../../common/helpers/Utils';
import { Link } from 'react-router-dom';
import TextArea from '../../../../shared/Inputs/TextArea/TextArea';
import { useUserContext } from '../../../../common/helpers/Auth';


const LeaddetailsPage = (props) => {
  const { auth: { userData } } = useUserContext();
  console.log('LeaddetailsPage', props)
  const leadId = props.location.state ? props.location.state.leadId : ''

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [selectedSelection, setSelect] = useState('');
  const [assignToListToggle, setAssignToListToggle] = useState(false);
  const [allComments, setAllComments] = useState([])
  const [commentValue, setCommentValue] = useState('')



  const commentPosted = (comment) => {
    setAllComments([...allComments, comment])
    setCommentValue('')

    postComment({ leadId, loginId: userData.userid, review: commentValue })
      .then((response) => {
        if (response.data) {
          if (response.data.resourceData)
          if (response.data.error) setError(response.data.error)
          _getLeadData();
        }
        setLoading(false);
        console.log('response', response)
      })
      .catch((error) => {
        setLoading(false);
        console.log('error', error)
      })

  }

  const _getLeadData = useCallback(() => {
    getLeadsDetail({ leadId: leadId })
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
  }, [getLeadsDetail,leadId])

  useEffect(() => {
    _getLeadData();
  }, [_getLeadData])

  const handleApprove = () => {
    console.log("passdata:", data);
    props.history.push('/admin/sales/lead-details/enroll-new-society', { data })
  }

  function handleStatus(data, status, name) {
    if (name === 'next') {
      if (status === 'IN_PROGRESS') {
        if (data[0]) {
          if (data[0].clientInterest === 'Will decide later') return true;
          else if (data[0].clientInterest === 'No, does not look interested') return true;
          else if (data[0].clientInterest === 'Yes, interested') return false;
          else return false;
        } else return false;
      }
    } else {
      if (status === 'IN_PROGRESS') {
        if (data[0]) {
          if (data[0].clientInterest === 'Will decide later') return false;
          else if (data[0].clientInterest === 'No, does not look interested') return false;
          else if (data[0].clientInterest === 'Yes, interested') return true;
          else return false;
        } else return false;
      }
    }
  }

  function handleUserAssignmet(leadId, userId) {
    if (leadId && userId) {
      assignLeadToUser({ leadId, userId })
        .then((data) => {
          console.log('Success')
          _getLeadData();
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const handleAssignLead = () => {
    handleUserAssignmet(leadId, selectedSelection);
  }

  const handleCloseSalesLead = () =>{
    closeSalesLead({ leadId}).then((res)=> {
      console.log(res, "close sales lead!!")
      if(res.data.status === 200){
        _getLeadData();
      }
    })
    .catch(err=> console.log(err))
  }

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
                      <Text size="medium" fontWeight="mediumbold" color="secondryColor" text={data.societyName} className="mr-2" />
                      {handleStatusElement(data.status === 'COMPLETED' ? 'CONVERTED' : data.status)}
                      {data.directAccessed ? <Text className="ml-2" size="Small" fontWeight="smbold" color="TaupeGrey" text={"DIRECT ACCESSED"} /> : ''}
                    </div>

                    <Text size="Small" fontWeight="smbold" color="secondryColor" text={data.address} />
                  </div>
                  <div className="locationSelect">

                    {/* <Buttons name="Next" varient="primary" type="submit" size="xSmall" color="white" onClick={handleApprove} />*/}
                  {
                    props.location.state.module === "HELPDESK"?
                    data.leadFor !== "SOCIETY"? 
                  //   <Buttons
                  //   name="Create Ticket"
                  //   varient="primary"
                  //   type="submit"
                  //   size="xSmall"
                  //   color="white"
                  //   onClick={()=>props.history.push({pathname: '/admin/helpdesk/property-leads/create-ticket', state:{callerId: data?.contactId}})}
                  // />
                  ''
                  :''
                    : data.status === "ASSIGNED" || data.status === "COMPLETED" || data.directAccessed ? '' :
                    <Buttons
                      disabled={
                        data.directAccessed === true ||
                        data.status === 'COMPLETED' ||
                          data.status === 'PENDING' ||
                          data.status === 'NOT INTERESTED' ||
                          data.status === 'CANCELLED' ||
                          data.status === 'PROBLEM' || handleStatus(data.reviews, data.status, 'next') ? true : false}
                      name="Next"
                      varient="primary"
                      type="submit"
                      size="xSmall"
                      color="white"
                      onClick={handleApprove}
                    />
                  }
                    

                    <span className="ml-2"></span>
                    {/* disabled={data.status === 'COMPLETED' ? true : false}*/}
                    { props.location.state.module === "HELPDESK"?
                      data?.status === "CLOSED"?''
                      :<Buttons
                      name={'Close' }
                      varient="primary"
                      type="submit"
                      size="xSmall"
                      color="white"
                      onClick = {()=> handleCloseSalesLead()}
                      />
                    : data.status === "IN PROGRESS" || data.status === "COMPLETED"?"" :
                    <Buttons
                      disabled={
                        data.status === 'COMPLETED' ||
                          data.status === 'CANCELLED' || handleStatus(data.reviews, data.status, 'edit') ? true : false}
                      name={assignToListToggle ? 'Save' : 'Edit'}
                      varient="primary"
                      type="submit"
                      size="xSmall"
                      color="white"
                      onClick={() => {
                        setAssignToListToggle(!assignToListToggle);
                        assignToListToggle ? handleAssignLead() : console.log('yyyy')
                      }} />
                    }
                  </div>
                </div>
                <Row className="mt-3">
                  <Col>
                    <div>
                      <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Date" />
                      <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={formateDate(data.leadDate)} />
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Source" />
                      <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data.source} />
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Lead For" />
                      <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={((data?.leadFor)?.charAt(0)?.toUpperCase() + ((data?.leadFor)?.slice(1))?.toLowerCase())} />
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Assigned To" />
                      {
                        assignToListToggle ?
                          <div className="w-75 e_select">
                            <Form.Group controlId="exampleForm.SelectCustom" className="">
                              <Form.Control as="select"
                                onChange={(e) => {
                                  setSelect(e.target.value)
                                  // handleAssignLead(e.target.value)
                                }}
                              // onChange={ (e)=>handleUserAssignmet(leadId, e.target.value) }
                              >
                                <option value="" disabled selected>Assign</option>
                                {/* <option value="">Assign</option> */}
                                {/* <option value="" >None</option>*/}
                                {
                                  data.assignToList ? data.assignToList.map((data, index) =>
                                    <option key={index} value={data.id}>{data.name}</option>,
                                  ) :
                                    null
                                }
                              </Form.Control>
                            </Form.Group>
                          </div> :
                          <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={(data.assignTo)?.capitalizeWord() || '-'} />
                      }
                    </div>
                  </Col>
                  {/* <Col>
                    <div>
                      <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="No. of Properties" />
                      <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data.numberOfProperties} />
                    </div>
                  </Col>
                  <Col>
                    <div >
                      <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Constructed In" />
                      <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data.constructed} />
                    </div>
                  </Col> */}
                  {props.module === "HELPDESK" ? 
                  <Col>
                    <div>
                      <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Recommended By" />
                      <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data.recommendedBy} />
                    </div>
                  </Col>
                  : null }
                  {props.module === "HELPDESK" ?
                    <>
                      {data.contactPerson ?
                        <>
                          <Col className='col-2'>
                            <div >
                              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Contact Person" />
                              {data.contactId !== null ? 
                              <Link  to={`/admin/helpdesk/property-leads/consumer-details/${data.contactId}`} >
                              <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data.contactPerson} />
                              </Link>
                              :<Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data.contactPerson} />}
                            </div>
                          </Col>
                          <Col>
                            <div>
                              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Phone Number" />
                              <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data.contactNumber} />
                            </div>
                          </Col>
                        </>
                        : null}
                    </>
                    :

                    <>
                      {data.customerName ?
                        <><Col xs={2}>
                          <div >
                            <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Contact Person" />
                            <Link className='removeUnderline' to={`/admin/sales/sales-lead/consumer-details/${data.customerId}`} >
                              <Text className='forLink' size="Small" fontWeight="mediumbold" color="secondryColor" text={data.customerName} />
                            </Link>
                          </div>
                        </Col>
                          <Col xs={2}>
                            <div>
                              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Phone Number" />
                              <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data.customerContactNumber} />
                            </div>
                          </Col>
                        </>
                        : null}
                    </>
                  }
                </Row>
                
                <div className="separator mt-4"></div>

                <div className="feedBack mt-4">
                  <Text size="medium" fontWeight="mediumbold" color="secondryColor" text="Client Feedback" />
                  {
                    data && data.reviews ? data.reviews.map((_value, index) => (
                      <div className='mt-2 mb-3' key={index}>
                        <div className="d-flex align-items-center mt-2">
                          <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={`From: ${_value.name || ' - '}`} />
                          <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text={formateDateTime(_value.feedbackDate)} className="ml-2" />
                        </div>
                        {/* <Text size="Small" fontWeight="mediumbold" color="primaryColor" text={_value.clientInterest + `. ${_value.proposedCutOff ? `Proposed Percentage:  ${_value.proposedCutOff}%` : ''}`} className="mt-2" /> */}
                        <div className='d-flex align-items-center mt-0'>
                          <Text size="Small" fontWeight="mediumbold" color="primaryColor" text={_value.clientInterest} />
                          {
                            // _value.clientInterest === `Will decide later` || _value.clientInterest === 'No, does not look interested' ?
                            _value.followUpDate !== null ? <Text size="xSmall" fontWeight="smbold" color="TaupeGrey"  text={`Follow up date: ${formateDate(_value.followUpDate) || ' '}`} /> :
                                // null :
                              null
                          }
                        </div>
                        <Text size="Small" fontWeight="smbold" color="primaryColor" text={_value.feedback} className="mt-1" />

                      </div>
                    )) :
                      <span>-</span>
                  }
                  {props.module==="HELPDESK" && data.status!=="CLOSED" ? 
                  <>
                    <div className='commentInput'>
                    <TextArea
                      id="description"
                      label="Enter Message"
                      rows="6"
                      placeholder="Enter Here..."
                      style={{ "maxHeight": "132px" }}
                      value={commentValue}
                      className="messagesModalWidth commentbox"
                      onChange={(e) => setCommentValue(e.target.value)}
                    />
                    {/* <div className='commentInput'>
                    <Input
                      label="Text"
                      type="text"
                      placeholder="Comments"
                      maxLength="75"
                      value={commentValue}
                      onChange={(e)=>setCommentValue(e.target.value)}
                    //  error={ errors?.projectGroup?.message }
                    //  defaultValue= { projectData?.projectGroup }
                    //  { ...register("projectGroup") }
                    /> */}
                    
                  </div>
                  <Buttons
                  name="Submit"
                  varient="primary"
                  type="submit"
                  size="Small"
                  color="white"
                  className="mt-3"
                  disabled={commentValue.trim()==="" ? true : false}
                  onClick={() => commentPosted(commentValue.trim())}
                />
                </>
                  : null }
                </div>
              </>
        }
      </div>

    </>
  )
}

export default memo(LeaddetailsPage);
