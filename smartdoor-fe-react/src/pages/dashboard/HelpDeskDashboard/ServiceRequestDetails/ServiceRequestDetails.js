import React, { useState, useEffect, useCallback, memo } from 'react';
import {
  useParams,
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Form from 'react-bootstrap/Form'
import Buttons from '../../../../shared/Buttons/Buttons';
import Text from '../../../../shared/Text/Text';
import { Row, Col, Modal } from 'react-bootstrap';
import { closeRequestInstallation, republish } from '../../../../common/redux/actions';
import './ServiceRequestDetails.scss';
import { formateDate, formateDateTime, handleStatusElement, showErrorToast } from '../../../../common/helpers/Utils';
import crossIcon from '../../../../assets/images/Vector.png';
import {
  reOpenAndCloseRequest,
  getHelpDeskServiceRequest,
  getServiceRequestDetailById,
  addComments,
  addServiceRequestComments,
  changeInstallationAssignee
} from '../../../../common/redux/actions';
import TextArea from '../../../../shared/Inputs/TextArea/TextArea';
import { useUserContext } from '../../../../common/helpers/Auth';

const ServiceRequestDetails = (props) => {
  const { auth: { userData } } = useUserContext();
  const { serviceRequestId } = useParams();

  const [loading, setLoading] = useState(true);
  // const [data, setData] = useState({});
  // const [error, setError] = useState(null);
  const [validateError, setvalidateError] = useState('')

  const [detailData, setdetailData] = useState({});
  const [detailerror, setdetailError] = useState(null);
  const [detailloading, setdetailLoading] = useState(true);

  const [show, setShow] = useState(false);
  const [comments, setComments] = useState('');
  const [allComments, setAllComments] = useState([])
  const [commentValue, setCommentValue] = useState("");

  const {

    getHelpDeskServiceRequest,

    // helpdeskServiceReq,

  } = props;

  const _getServiceRequestDetailById = useCallback(() => {
    getServiceRequestDetailById({ serviceRequestId: serviceRequestId })
      .then((response) => {
        if (response.data) {
          if (response.data.resourceData) setdetailData(response.data.resourceData);
          if (response.data.error) setdetailError(response.data.error)
        }
        setdetailLoading(false);

        console.log('response', response)
      })
      .catch((error) => {
        setdetailLoading(false);
        console.log('error', error)
      })
  }, [getServiceRequestDetailById,serviceRequestId])

  useEffect(() => {
    getHelpDeskServiceRequest({ city: '', records: '', pageNumber: '' });
    // {serviceRequestId:1}
    _getServiceRequestDetailById()
  }, [_getServiceRequestDetailById]);

  // const _filterServiceReq = (value) => {
  //   getHelpDeskServiceRequest({ city: value, records: '', pageNumber: '' });
  // }

  function handleReqOpenClose(req, id) {
    let reqData = { 'requestID': id, 'reOpen': false, 'close': false };

    switch (req) {
      case 'REOPEN':
        reqData = { ...reqData, reOpen: true };
        break;

      case 'CLOSE':
        reqData = { ...reqData, close: true };
        break;
    }

    {detailData.teamName=='Installation Team' ? 
    closeRequestInstallation(reqData)
      .then((response) => {
        if (response) {
          if (response.data.resourceData) setdetailData(response.data.resourceData);
          if (response.data.error) setdetailError(response.data.error)
          _getServiceRequestDetailById()
          // getHelpDeskServiceRequest({city: "", records:"", pageNumber:""});
          console.log('response', response)
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
      :
      reOpenAndCloseRequest(reqData)
      .then((response) => {
        if (response) {
          if (response.data.resourceData) setdetailData(response.data.resourceData);
          if (response.data.error) setdetailError(response.data.error)
          // getHelpDeskServiceRequest({city: "", records:"", pageNumber:""});
          console.log('response', response)
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
    }
  }

  const handleValidate = () => {
    //   evnt.preventDefault();

    console.log('handle validate!!')
    if (comments) {
      addComments({ serviceRequestId: serviceRequestId, comments: comments })
      _getServiceRequestDetailById()
      console.log('detaisls data:', detailData)
      setShow(false)
    } else {
      setvalidateError('This field is required')
    }
  }

  const commentPosted = (comment) => {
    setAllComments([...allComments, comment])
    setCommentValue('')

    addServiceRequestComments({ id: serviceRequestId, loginId: userData.userid, comments: commentValue })
      .then((response) => {
        if (response.data) {
          if (response.data.status === 200) _getServiceRequestDetailById();
          if (response.data.error) showErrorToast(response.data.error)
        }
        setLoading(false);
        console.log('response', response)
      })
      .catch((error) => {
        setLoading(false);
        console.log('error', error)
      })
    }

    const handleChangeAssignee = (requestId , userId) =>{
      changeInstallationAssignee({ userRequestId: requestId,
        executivePersonId: userId,
      }).then((res)=> {
        if(res.data.status === 200) _getServiceRequestDetailById();
      })
      .catch(err=> console.log(err))
    }

    const rePublish = (id) => {
      republish({id}).then((res)=> {
        if(res.data.status === 200) _getServiceRequestDetailById();
      })
    }


  return (
    <>
      <div style={{ height: '2%' }}>
      </div>
      <div className="whiteBg">
        <div className="d-flex justify-content-between">
          <div className="leadTitle">
            <div className="d-flex align-items-center">
              <Text size="medium" fontWeight="mediumbold" color="secondryColor" text={`${detailData.societyName || ''}`} className="mr-2" />
              {detailData ? detailData.status ? handleStatusElement(detailData.status) : null : null}
            </div>

            <Text size="Small" fontWeight="smbold" color="secondryColor" text={`${detailData.houseNumber || ''} ${detailData.societyName? `,${detailData.societyName}`:'' || ''} ${detailData.city ? `,${detailData.city}` : '' || ''}`} />
          </div>
          <div className="locationSelect">

            <span className="ml-2"></span>
            {/*
                    <Buttons
                        disabled={detailData.status === "CLOSE" ? true: false}
                        name="Add Comment"
                        varient="primary"
                        type="submit"
                        size="xSmall"
                        color="white"
                        onClick={()=>{
                            setShow(true);
                        }}
                    />

*/}                   
          <span className="ml-2"></span>
          {props.module==="HELPDESK"?
          //   <Buttons
          //   name="Create Ticket"
          //   varient="primary"
          //   type="submit"
          //   size="xSmall"
          //   color="white"
          //   onClick={()=>props.history.push({pathname:'/admin/helpdesk/serviceRequest/create-ticket',state: {callerId:detailData?.requestedById}})}
          // />
          ''
          : detailData.status=="Closed" ?
            <Buttons
              disabled={detailData.status === 'COMPLETED' || detailData.status === 'Closed' ? false : true}
              name="ReOpen"
              varient="primary"
              type="submit"
              size="xSmall"
              color="white"
              onClick={() => handleReqOpenClose('REOPEN', serviceRequestId)}
            /> : ''
          }

            <span className="ml-2"></span>

            {detailData.ticketName === "Republish Property" ?
              <Buttons
                // disabled={detailData.status === 'COMPLETED' ? false : true}
                disabled={detailData.republishDone ? true : false}
                name="Republish"
                varient="primary"
                className="mr-2"
                type="submit"
                size="xSmall"
                color="white"
                onClick={() => rePublish(detailData.id)}
              />   
              : ''        
            }
            
            {detailData.status === "Closed" ||detailData.status === "CLOSED" || detailData.status==="COMPLETED" ?'':
              <Buttons
                // disabled={detailData.status === 'COMPLETED' ? false : true}
                disabled={detailData.assignTo === null && detailData.teamName==='Installation Team' ? true : false}
                name="Close"
                varient="primary"
                type="submit"
                size="xSmall"
                color="white"
                onClick={() => handleReqOpenClose('CLOSE', serviceRequestId)}
              />           
            }


          </div>
        </div>
        <Row className="mt-3">
          <Col>
            <div>
              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Date" />
              <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={detailData.createdDate ? formateDate(detailData.createdDate) : null} />
            </div>
          </Col>
          <Col>
            <div>
              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Contact Person" />
              {/* <Link style={{ textDecoration: 'none' }} to={`/admin/consumer-management/consumer-details/${detailData.requestedById}`} > */}
              <Link className='removeUnderline' to={(props.module==='HELPDESK') ?`/admin/helpdesk/serviceRequest/consumer-details/${detailData.requestedById}`:`/admin/execution/serviceRequest/consumer-details/${detailData.requestedById}`} >
                <Text className='linkFor' size="Small" fontWeight="mediumbold" color="secondryColor" text={detailData.requestedBy || '-'} />
              </Link>
            </div>
          </Col>
          <Col lg="3">
            <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Ticket Name" />
            <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={detailData.ticketName ? detailData.ticketName : '-'} />
          </Col>

          <Col lg="3">
            <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Assign To" />
            {props.module==='HELPDESK' ?
            <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={ detailData.teamName!==null ? detailData.teamName: 'UNASSIGNED' || 'UNASSIGNED'  } />
            :
            !detailData.assignTo ?
            <div className="w-75 e_select">
                  <Form.Group controlId="exampleForm.SelectCustom" className="">
                    <Form.Control as="select"
                      // onChange={(e) => {
                      //   setSelect(e.target.value)
                      //   // handleAssignLead(e.target.value)
                      // }}
                    // onChange={ (e)=>handleUserAssignmet(leadId, e.target.value) }
                    onChange={ (e)=>handleChangeAssignee(serviceRequestId ,e.target.value) }
                    >
                      <option value="" disabled selected>Assign</option>
                      {/* <option value="">Assign</option> */}
                      {/* <option value="" >None</option>*/}
                      {
                        detailData.userList ? detailData.userList.map((data, index) =>
                          <option key={index} value={data.id}>{data.name}</option>,
                        ) :
                          null
                      }
                    </Form.Control>
                  </Form.Group>
                  </div>
                  :
                  <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={detailData.assignTo || '-'} />
            }
          </Col>
          
        </Row>

        <Row className="mt-3">
          {detailData.severity!==null?
          <Col lg="3">
            <div>
              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Severity" />
              <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={detailData.severity || '-'} />
            </div>
          </Col>
          :''}
          <Col xs={3}>
            <div>
              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Phone Number" />
              <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={detailData.contactNumber || '-'} />
            </div>
          </Col>
          {detailData.email !==null?
          <Col >
            <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Email" />
            <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={detailData.email ? detailData.email : '-'} />
          </Col>
          :''}

          
        </Row>
        {detailData.problem !==null?
        <Row className="mt-4">
          <Col>
            <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Problem To Solve" />
            <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={detailData.problem ? detailData.problem : '-'} />
          </Col>
        </Row>
        :''}
        {detailData.actionToSolve !==null?
        <Row className="mt-3">
          <Col>
            <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Action To Solve" />
            <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={detailData.actionToSolve ? detailData.actionToSolve : '-'} />
          </Col>
        </Row>
        :''}
        <div className="separator mt-4"></div>

        <div className="feedBack mt-4">
          <Text size="medium" fontWeight="mediumbold" color="secondryColor" text="Activities" />
          {detailData.comments ?
            detailData.comments.map((cVal, cIndx) =>

              <div className="mt-3">
                <div className="d-flex align-items-center mt-2">
                <Text size="Small" fontWeight="smbold" color="secondryColor" text={`From: ${cVal.assignTo || ''}`} className="mt-0 mr-1" />
                  <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text={cVal.commentDate ? formateDateTime(cVal.commentDate) : null} className="ml-2" />
                </div>
                <Text size="Small" fontWeight="mediumbold" color="primaryColor" text={cVal.comment || ''} className="mt-2" />

              </div>,
            ) : null
          }
        </div>
      
         
                  {
                    detailData.status=="Closed" ? null :
                    <div className='commentInput'>
                    <TextArea
                      id="description"
                      label="Enter Message"
                      rows="6"
                      placeholder="Enter Here..."
                      style={{ "maxHeight": "132px" }}
                      value={commentValue}
                      className="messagesModalWidth"
                      onChange={(e) => setCommentValue(e.target.value)}
                    />
                   
                    <Buttons
                      name="Submit"
                      varient="primary"
                      type="submit"
                      size="Small"
                      color="white"
                      className="mt-3"
                      disabled={commentValue.trim()=="" ? true : false}
                      onClick={() => commentPosted(commentValue.trim())}
                    />
                  </div>}
      </div>


      <Modal show={show} onHide={() => setShow(false)} centered className="h-100 vid_modal">
        <Modal.Header>
          <Text size="regular" fontWeight="smbold" color="secondryColor" text="Add Comments" className="m-1" />
          <button className='modalcross-btn'
            onClick={() => setShow(false)}>
            <img src={crossIcon} />
          </button>
        </Modal.Header>
        <Modal.Body className="m-2 p-2">
          <div className="helpdesk_addComments mt-0">
            <div className="mb-0">
              <Form.Group controlId="formBasic">
                <Form.Label>Comments</Form.Label>
                <Form.Control type="text" maxLength={80} placeholder="Enter Comment" rows="3"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
                <Text color="dangerText" size="xSmall" text={validateError} />
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ margin: '5px' }}>
          <span className="ml-2"></span>
          <Buttons
            disabled={false}
            name="Submit"
            varient="primary"
            type="submit"
            size="xSmall"
            color="white"
            onClick={() => handleValidate()}
          />
        </Modal.Footer>
      </Modal>
    </>
  )
}

// export default LeadDetails;
const mapStateToProps = ({

  helpdeskServiceReq,

}) => ({

  helpdeskServiceReq,

});

const actions = {

  getHelpDeskServiceRequest,

};

const withConnect = connect(
  mapStateToProps,
  actions,
);

export default compose(
  withConnect,
  memo,
)(ServiceRequestDetails);
