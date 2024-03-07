import React, { useState, useEffect, useCallback, memo } from 'react';
import Form from 'react-bootstrap/Form'
import Buttons from '../../../../shared/Buttons/Buttons';
import Image from '../../../../shared/Image/Image';
import Text from '../../../../shared/Text/Text';
import { Col, Row, Accordion, Card } from 'react-bootstrap';
import { getLeadsDetail, getTransactionMeetingDetailById, getTransactionLeadDetailById,changeUserAssignee, getAllTransactionPreviousVisitRequest, reOpenTransactionLeadRequest } from '../../../../common/redux/actions';
import './TransactionDetails.scss';
import userImageAvatar from '../../../../assets/svg/avatar_sml.svg';
import downArrowIcon from '../../../../assets/images/downArrow-icon.svg'
import upArrowIcon from '../../../../assets/images/upArrow-icon.svg'
import { formateDate, formateDateTime, handleStatusElement, ToolTip } from '../../../../common/helpers/Utils';
import { useParams, Link } from 'react-router-dom';
import DataTableComponent from '../../../../shared/DataTable/DataTable';
import { useUserContext } from '../../../../common/helpers/Auth';
import { TableLoader } from '../../../../common/helpers/Loader';
import Pagination from '../../../../shared/DataTable/Pagination';
import FeedbackModal from '../../../../shared/Modal/FeedbackModal/FeedbackModal';
import phIcon from '../../../../assets/images/ph-icon.png';

const ProgressComponent = <TableLoader />

const TransactionDetails = (props) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  console.log(data,'dataid');
  const [previousVisitdata, setPreviousVisitData] = useState([]);
  const [error, setError] = useState(null);
  // const [selectedSelection, setSelect] = useState('');
  // const [assignToListToggle, setAssignToListToggle] = useState(false);
  const [buyerId, setBuyerId] = useState(0);
  const { auth: { userData } } = useUserContext();
  const [ispreviousVisitdataloading, setisPreviousVisitdataloading] = useState(false)
  const [previousVisitsArrow, setPreviousVisitsArrow] = useState(false)

  // MODAL DATA STATE
  const [show, setShow] = useState(false);
  console.log(show,"sjowd")
   const handleClose = () => setShow(false);
   console.log(handleClose,"close")

   const handleShow = () => setShow(true);
   console.log(handleShow,"show")
  const [modalData, setModalData] = useState();
  console.log(modalData,'modal data')

  const PaginationComponent = (props) => (<Pagination {...props} />);
  // const TeamTablePaginationComponent = (props) => (<Pagination {...props} PaginationActionButton={TeamTablePaginationActionButton} />);


  // const handleAssignLead = () => {
  //   handleUserAssignmet(leadId, selectedSelection);
  // }

  const closeModal = (data={isReload : false}) => {
    // if(data?.isReload) getAllUsers({pageNumber:"", records:"",searchByCity:"", searchByzipCode:""});
    setModalData();
 };

  const _getTransactionMeetingDetailById = useCallback(() => {
    getTransactionMeetingDetailById({ MeetingRequestId: id })
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
  }, [getLeadsDetail])

  const _getTransactionLeadDetailById = useCallback(() => {
     getTransactionLeadDetailById({ TransactionLeadId: id })
      .then((response) => {
        if (response.data) {
          if (response.data.resourceData) {
            console.log("response.data.resourceData:", response.data.resourceData);
            setBuyerId(response.data.resourceData.buyerId)
            setData(response.data.resourceData);
            
            _getAllTransactionPreviousVisitRequest(response?.data?.resourceData?.buyerId)
            
            
            
            // .then(_getAllTransactionPreviousVisitRequest())
            
          }
          if (response.data.error) setError(response.data.error)
        }
        setLoading(false);
        console.log('response', response)
        // alert(buyerId)
        console.log("1st then",buyerId)
      })
      .then(()=>{
        console.log("2nd then")
        // alert("2nd then called")
        // alert(buyerId)
        _getAllTransactionPreviousVisitRequest();
      })
      .catch((error) => {
        setLoading(false);
        console.log('error', error)
      })
  }, [getTransactionLeadDetailById])

  const _getAllTransactionPreviousVisitRequest = useCallback( (buyerIdData) => {
    setisPreviousVisitdataloading(true)
    if(buyerIdData!==undefined){
     getAllTransactionPreviousVisitRequest({ userId: buyerIdData, page: "", size: "" })//buyerId
      .then((response) => {
        if (response.data) {
          if (response.data.resourceData) setPreviousVisitData(response.data.resourceData);
          if (response.data.error) setError(response.data.error)
        }
        setisPreviousVisitdataloading(false)
        // setLoading(false);
        console.log('response', response)
      })
      .catch((error) => {
        // setLoading(false);
        setisPreviousVisitdataloading(false)
        console.log('error', error)
      })}
  }, [getTransactionLeadDetailById, buyerId])

  useEffect(() => {
    if (props.location.state.module === 'LEAD_DETAILS') {
      _getTransactionLeadDetailById();
      // _getAllTransactionPreviousVisitRequest();
    } else {
      _getTransactionMeetingDetailById();
    }
  }, [_getTransactionMeetingDetailById, ])

  const handleArrow = () => {
    setPreviousVisitsArrow(!previousVisitsArrow)
  }

  const handleReopen = () => {
    reOpenTransactionLeadRequest({ transactionLeadId: id, userId: Number(userData.userid) })
    .then((res) => {
      _getTransactionLeadDetailById();
    })
    .catch((error) => {
      console.log('')
    })
  }

  // function handleUserAssignmet(leadId, userId) {
  //   console.log(leadId, userId)
  //   if (leadId && userId) {
  //     assignLeadToUser({ leadId, userId })
  //         .then((data)=>{
  //           console.log('daaata', data)
  //           _getLeadData()
  //         })
  //         .catch((err)=>{
  //           console.log('errrrr', err)
  //         })
  //   }
  // }

  console.log("data is: transaction deatils page:", data);
  console.log(buyerId,"buyerId")

  function onChangePage(e) { }

  const previousVisitColumns = [
    {
      name: 'Id',
      selector: 'id',
      center: true,
      sortable: true,
      maxWidth: "50px !important",
    },
    {
      name: 'Visit Date',
      selector: 'visitDate',
      center: true,
      sortable: true,
      minWidth: "200px !important",
      cell: (row) => (<span>{`${formateDate(row.visitDate)} | ${row.startTime}-${row.endTime}`}</span>),
    },
    {
      name: 'For',
      selector: 'propertyCategory',
      center: true,
      maxWidth: "80px !important",
      cell: ({ propertyCategory }) => (<span>{propertyCategory === "Lease" ? "Rent" : propertyCategory || "-"}</span>),
    },
    {
      name: 'Society',
      selector: 'visitSociety',
      // minWidth: "200px !important",
      center: true,
    },
    {
        name: 'Location',
        selector: 'visitAddress',
        center: true,
        // minWidth: "100px !important",
        cell: ({ visitAddress}) => (
            <ToolTip position="top" style={{ width: "100%" }} name={visitAddress || ""}>
               <span className="">
                  {" "}
                  {visitAddress.substring(
                     0,
                     visitAddress.indexOf(",") !== -1 ? visitAddress.indexOf(",") : visitAddress.length
                  )}
               </span>
            </ToolTip>
         ),
      },
    {
      name: 'Status',
      selector: 'status',
      center: true,
      // minWidth: "100px",
      // style: { 'white-space': 'nowrap', "padding": "0 !important", "max-width": "120px" },
      cell: ({ status }) => (status !== null ? handleStatusElement(status) : '-')
    },
    {
        name: "Action",
        center: true,
        // maxWidth: "50px",
        cell: (row) => (
           <div> 
             {/* className="action" */}
              {row.feedbackAvailable ?
                  <span className="feedback-txt"
                     disabled
                     onClick={() => {
                        setModalData(row.id);
                        handleShow();
                     }}
                  >
                    {`View Feedback >`}
                     {/* <Image name="editIcon" src={actionIcon} /> */}
                     {/* {showModalDataWrtPosition(row.position, row)} */}
                     {/* <Link to={ { pathname: '/admin/user-management/user-details',
              state: { userData: row, module: 'USER' },
            } }>
              <Image name="editIcon" src={ actionIcon } />
            </Link> */}
                  </span>
                  :<Text size="xSmall" fontWeight="smbold" color="gray" text={`View Feedback >`}  />}
           </div>
        ),
     },
  ];

  // function handleStatus(data, status, name) {
  //   if (name === 'next') {
  //     if (status === 'IN_PROGRESS') {
  //       if (data[0]) {
  //         if (data[0].clientInterest === 'Will decide later') return true;
  //         else if (data[0].clientInterest === 'No, does not look interested') return true;
  //         else if (data[0].clientInterest === 'Yes, interested') return false;
  //         else return false;
  //       } else return false;
  //     }
  //   } else {
  //     if (status === 'IN_PROGRESS') {
  //       if (data[0]) {
  //         if (data[0].clientInterest === 'Will decide later') return false;
  //         else if (data[0].clientInterest === 'No, does not look interested') return false;
  //         else if (data[0].clientInterest === 'Yes, interested') return true;
  //         else return false;
  //       } else return false;
  //     }
  //   }
  // }

  console.log("modalData:", modalData);


  const handleUserAssignmet = (lead_Id, assigned_To, lead_For) => {
    const data = {
       leadId: Number(id),
       assignedTo: Number(assigned_To),
       leadFor: "TRANSACTION_LEAD",
    };
    changeUserAssignee(data)
       .then((res) => {
          if (res.data.status === 200) {
            _getTransactionLeadDetailById();
          }
       })
       .catch((err) =>
          console.log('err:', err)
       )
 
 };

  return (
    <>


      <div style={{ height: '2%' }}>
      </div>
      {/* <FeedbackModal visitFeedbackId =/> */}

      
      {/* {modalData && ( */}
      {/* {modalData ? */}
          <FeedbackModal
            show = {show}
            handleShow ={handleShow}
            handleClose ={handleClose}
            modalData={modalData}
            // dataFrom="user_manage"
            closeModal={closeModal}
            history={{ goBack: closeModal }}
            // getAllUsers={getAllUsers}
          />
      {/* :''} */}
        {/* )} */}

      {/* <Route
        path="/admin/visit-feedback/:id"
        children={({ match }) => {
          return (
            <Modal onClose={onClose} isOpened={Boolean(match)}>
              <ImageModalContent id={match && match.params.id} />
            </Modal>
          );
        }}
    /> */}
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
                        onClick={handleReopen}
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
                            src={data?.ownerProfileImageUrl !== null ? data?.ownerProfileImageUrl : userImageAvatar}
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
                          name="consumerIcon" alt=""
                          src={data?.buyerProfileImageUrl !== null ? data?.buyerProfileImageUrl : userImageAvatar}
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
                          <Form.Control as="select" onChange={ (e)=>  handleUserAssignmet(id, e.target.value) }>
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
                        <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Visit Date" />
                      </div>
                      <div className='d-flex align-items-center mt-2'>
                      <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data?.date ? `${formateDate(data?.date)} ${data?.startTime===null ? "" : `at ${data?.startTime}`}` :'-'} />
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
                          handleShow();
                          setModalData(data.visitId);
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

               { data.meetingDate  ? 
               <Row>
                  <Col xs={4}>
                    <div >
                      <div className='d-flex align-items-center'>
                        <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Meeting Date and Time" />
                      </div>
                      <div className='d-flex align-items-center mt-2'>
                      <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={ `${formateDate(data?.meetingDate)} at ${data?.meetingStartTime} - ${data?.meetingEndTime}`} />
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
                {props.location.state.module === 'LEAD_DETAILS' ?
                  <Accordion defaultActiveKey="0" className='accordian-style mt-3'>
                    <Card className='transactionlLeaddetailTableWrapper'>
                      <Accordion.Toggle onClick={handleArrow} as={Card.Header} eventKey="0" className="d-flex justify-content-between align-items-center">
                        <span className='h6 font-weight-bold mb-0'>Previous Visits</span>
                        {previousVisitsArrow ? <img src={downArrowIcon} alt=""/> :
                        <img src={upArrowIcon} alt="" />}
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
                  : null}


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

export default memo(TransactionDetails);
