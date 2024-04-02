import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import Form from 'react-bootstrap/Form'
import Buttons from '../../../../shared/Buttons/Buttons';
import Text from '../../../../shared/Text/Text';
import { Col, Row, Modal } from 'react-bootstrap';
import { changeInstallationAssignee, assignLeadToUser, getExecutionTaskDetail, approveProperty, getInstallationExecutiveList,getExecutiveList, getSmartLockData } from '../../../../common/redux/actions';

import './PropertyDetail.scss';
import Header from '../../../../shared/Header/Header';
import { formateDate, handleStatusElement, formateDateTime, formateDateTimeIST } from '../../../../common/helpers/Utils';
import CheckBoxComponent from '../../../../shared/CheckBox/CheckBoxComponent';
import { Link } from 'react-router-dom';
import Dialer from '../../../../assets/svg/Dialer.svg'
import { useUserContext } from '../../../../common/helpers/Auth';
import QRCode from 'react-qr-code';

const PropertyDetail = (props) => {
  const taskId = props.location.state ? props.location.state.taskId : '';

  // STATES..
  const [ loading, setLoading ] = useState(true);
  const [ data, setData ] = useState({});
  const [ error, setError ] = useState(null);
  const [ selectedSelection, setSelect ]= useState('');
  const [ assignToListToggle, setAssignToListToggle ] = useState(false);
  const [ executiveList, setExecutiveList ] = useState([]);
  const [ show, setShow ] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { auth: { userData } } = useUserContext();
  const [smartLockData, setSmartLockData] = useState('')
  const [showPrintBtn, setShowPrintBtn] = useState(false)
  const [qrData, setQrData] = useState({
    accessToken: '',
    lockId: '',
    lockmac: '',
    propertyId:''
 })

 const handlePrintClick = () => {
  console.log("print entered");
  const printContents = '<div style="display:flex;justify-content:center;align-items:center;height:100%;"><div id="qrcode">' + document.getElementById("qrcode").innerHTML + '</div></div>';
  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write('<html><head><title>QR Code</title>');
  printWindow.document.write('<style>@media print{body {margin: 0;}}</style>');
  printWindow.document.write('</head><body>');
  printWindow.document.write(printContents);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

  const _getSmartLockData = useCallback(async (propertyId) => {
    try {
       const result_data = await getSmartLockData({ id: propertyId });
       if (result_data.data.status === 200 && result_data.data.resourceData) {
        setShowPrintBtn(true)
          console.log("result_data.data.resourceData:", result_data.data.resourceData);
          // setSmartdoorBattery(result_data?.data?.resourceData?.lockPowerPercentage);
          setSmartLockData(result_data?.data?.resourceData);
          const data={
            accessToken: result_data?.data?.resourceData.accessToken,
            lockId: result_data?.data?.resourceData.lockId,
            lockmac: result_data?.data?.resourceData.lockmac,
            propertyId: result_data?.data?.resourceData.propertyId
          }
          setQrData(data)
          // setShowQr(true)
          // setTimeout(() => {
          //    console.log("smart lock data after update", smartLockData);
          // }, 3000);

          //   setCensorData(result_data.data.resourceData)
          //   const censor_login_result = await cameraServicesApi("POST", {
          //     "email":"sd176@smartdoor.com",
          //     "password":"smartdoor@176"
          // }
          // , `https://77dfrqoarc.execute-api.us-east-2.amazonaws.com/dev/user/login`);

          // console.log( "censor_login_result" , censor_login_result )
          // }
       }
    } catch (err) {
      //  showErrorToast("Unexpected Error.");
    }
 }, []);

  const _getPropertyDetail = useCallback(() => {
    getExecutionTaskDetail({ taskId: taskId })
        .then((response)=>{
          console.log('getExecutionTaskDetail', response)
          if (response.data) {
            if (response.data.resourceData) setData(response.data.resourceData)
              _getSmartLockData( response.data.resourceData.propertyId );
            
            // if (response.data.error) setError(response.data.error)
          }
          setLoading(false);
          console.log('response', response)
        })
        .catch((error)=>{
          setLoading(false);
          console.log('error', error)
        })
  }, [ taskId ])

  function handleApproveProperty() {
    if (data.propertyId) {
      approveProperty( { propertyId: data.propertyId } )
          .then(( response )=>{
            if ( response.data && response.data.status === 200 ) _getPropertyDetail(); handleClose();
          })
          .catch(( err ) =>{
            console.log( err )
          })
    }
  }
  

  useEffect(()=>{
    _getPropertyDetail();
  }, [ _getPropertyDetail ])

  

  // const _getExecutiveList = useCallback(() => {
  //   getExecutiveList({
  //     city: '',
  //     // date:,
  //     // timeSlot:""
  //   })
  //       .then((response)=>{
  //         if (response) {
  //           if (response) setExecutiveList(response);
  //           if (response.error) setError(response.error)
  //         }
  //         setLoading(false);
  //         console.log('response', response)
  //       })
  //       .catch((error)=>{
  //         setLoading(false);
  //         console.log('error', error)
  //       })
  // }, [ getExecutiveList ])

  // useEffect(()=>{
  //   _getExecutiveList();
  // }, [ _getExecutiveList ])

  const _getInstallationExecutiveList = useCallback(() => {
    getInstallationExecutiveList({
      requestId: taskId,
      // date:,
      // timeSlot:""
    })
        .then((response)=>{
          if (response) {
            if (response) setExecutiveList(response);
            if (response.error) setError(response.error)
          }
          setLoading(false);
          console.log('response', response)
        })
        .catch((error)=>{
          setLoading(false);
          console.log('error', error)
        })
  }, [ getInstallationExecutiveList ])

  useEffect(()=>{
    _getInstallationExecutiveList();
  }, [ _getInstallationExecutiveList ])


  const handleChangeAssignee = () =>{
    changeInstallationAssignee({ userRequestId: taskId,
      executivePersonId: selectedSelection,
      // timeSlot: data.timeSlot,
      // userRequestDate: data.taskDate,
      city: executiveList.location,
    }).then((res)=> {
      if(res.data.status === 200){
        _getPropertyDetail();
      }})
    .catch(err => console.log(err));
    }

  return (
    <>
    
      <Modal show={ show } onHide={ handleClose } className="confirmation-modal" centered>

        <Modal.Body>
          <div className="confirm-modal">
            <Text
              size="regular"
              fontWeight="bold"
              color="secondryColor"
              className="text-center"
              text="Do you wish to approve this property to list on Smartdoor?" />

            <div className="text-center mt-5 mb-3">
              <Buttons
                name="Cancel"
                varient="disable"
                type="button"
                size="xSmall"
                color="black"
                className="mr-3"
                onClick={ handleClose } />

              <Buttons
                name="Approve"
                varient="primary"
                type="submit"
                size="xSmall"
                color="white"
                onClick={ handleApproveProperty }
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div style={ { height: '2%' } }>
      </div>
      <div className="whiteBg">
        {
                error ? <h5 className="p-2">Data Not Found</h5> :

                loading && (!Object.keys(data).length > 0) ? <div>Loading...</div> :
                <>
                  <div className="d-flex justify-content-between">
                    <div>
                      {/* <div className="d-flex align-items-center"> */}
                      
                        
                        {/* <Text size="medium" fontWeight="mediumbold" color="secondryColor" text={`${data?.houseNumber}, ${data?.towerName !== null ? `${data?.towerName},` : ''} ${data?.societyName}`} className="mr-2" /> */}
                      <div className="d-flex align-items-center">
                      <Link className='removeUnderline'
                      to={{
                          pathname: '/admin/execution/installation-detail/property-details',
                          state: { propertyId: data?.propertyId, userId: Number(userData.userid) },
                        }}>
                        <Text size="medium" fontWeight="mediumbold" color="secondryColor" text={ data.societyName } className=" linkFor mr-2"/>
                        </Link>
                        {handleStatusElement(data.status)}
                      </div>
                      

                      <Text size="Small" fontWeight="smbold" color="secondryColor" text={ data.locality || '' } />
                    </div>
                    <div className="locationSelect">
                      {
                            data.status && data.status === 'COMPLETED' && data?.requestType !=="UN INSTALLATION" ?
                              <Buttons
                                name={ data.approved ? 'Approved' : 'Approve' }
                                varient="primary"
                                disabled={ data.approved }
                                type="submit"
                                size="xSmall"
                                color="white"
                                onClick={ handleShow }
                              /> :
                            null
                      }

                      <span className="ml-2"></span>
                      {/* disabled={data.status === 'COMPLETED' ? true : false}*/}
                      {data.status && (data.status === 'COMPLETED' || data.status === 'IN PROGRESS' || data.status === 'ASSIGNED' || data.status === 'ACCEPTED') ? null :
                      <Buttons
                        // disabled={
                        //     data.status === 'ASSIGNED' || handleStatus(data.reviews, data.status,"edit") ? true : false}
                        name={ assignToListToggle ? 'Save' : 'Edit' }
                        varient="primary"
                        type="submit"
                        size="xSmall"
                        color="white"
                        onClick={ ()=>{
                          setAssignToListToggle(!assignToListToggle);
                                assignToListToggle ? handleChangeAssignee() : console.log('')
                        } }
                      />
                      }
                      {showPrintBtn ? 
                        <Buttons
                        // disabled={
                        //     data.status === 'ASSIGNED' || handleStatus(data.reviews, data.status,"edit") ? true : false}
                        name={ 'Print QR' }
                        varient="primary"
                        size="xSmall"
                        color="white"
                        onClick={ handlePrintClick }
                      /> 
                    : null }

                    </div>
                  </div>
                  <Row className="mt-3">
                    <Col>
                      <div>
                        <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Date & Time" />
                        <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={ `${ data.taskDate? formateDate(data.taskDate): '' } | ${ data.timeSlot||'-' }` }/>
                      </div>
                    </Col>
                    <Col>
                      <div>
                        <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="For" />
                        <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={ data.requestType ? data.requestType.replace(/\s+/g, '-').capitalize(): '-' } />
                      </div>
                    </Col>
                    <Col>
                      <div>
                      {/* "/admin/consumer-management/consumer-details/305" */}
                        <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Customer Name" />
                        <Link className='removeUnderline' to={`/admin/execution/installation-detail/consumer-details/${data.customerId}`} >
                          <Text className='linkFor' size="Small" fontWeight="mediumbold" color="secondryColor" text={ data.requestType ? data.customerName : '-' } />
                        </Link>
                      </div>
                    </Col>
                    <Col>
                      <div>
                      {/* "/admin/consumer-management/consumer-details/305" */}
                        <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Customer Phone No" />
                        {/* <Link className='removeUnderline'  to={`/admin/consumer-management/consumer-details/${data.id}`} className="viewAll-btn"> */}
                          <img className='dialer' src={Dialer} />
                        <Text className="phnumber" size="Small" fontWeight="mediumbold" color="secondryColor" text={ data.requestType ? data.customerContactNumber : '-' } />
                        {/* </Link> */}
                      </div>
                    </Col>
                    <Col>
                      <div>
                        <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Assigned To" />
                        {
                                assignToListToggle ?
                                  <div className="w-75 e_select">
                                    <Form.Group controlId="exampleForm.SelectCustom" className="">
                                      <Form.Control as="select" onChange={ (e)=>setSelect(e.target.value) }>
                                        <option value="" disabled selected>Assign</option>
                                        {/* <option value="" >None</option>*/}
                                        {
                                                executiveList ? executiveList.map((data, index)=>
                                                  <option key={ index } value={ data.id }>{data.name}</option>,
                                                ) :
                                                null
                                        }
                                      </Form.Control>
                                    </Form.Group>
                                  </div> :
                                  <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={ data.assignTo || '-' } />
                        }
                        {/* <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data.assignTo || "-"} />                         */}
                      </div>
                    </Col>
                    <Col>
                      <div>
                        <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Property Type" />
                        <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={ data.propertyType || '-' } />
                      </div>
                    </Col>
                  </Row>
                  <div className="separator mt-4"></div>
                  <div id='qrcode' style={{display: 'none'}} className='qrcode'>
                            <QRCode
                                id="printable"
                                title="Property QR"
                                value={JSON.stringify(qrData)}
                                // bgColor="background-color"
                                // fgcolor="foreground-color"
                                size={400}
                            />
                  </div>

                  <div className="feedBack mt-4">
                    <Text size="medium" fontWeight="mediumbold" color="secondryColor" text={data?.requestType==="INSTALLATION"?"Installation Process":"Un-installation Process"}/>
                    
                    {
                        data && data.comments && data.comments.length ?
                          <div className="mt-3">
                            <Text size="Small" fontWeight="mediumbold" color="secondryColor" text="Problems Reported" />
                            {
                                        data && data.comments ? data.comments.map((_value, index)=>(
                                          <div key={ index }>
                                            <div className="d-flex align-items-center mt-2">
                                              <Text size="Small" fontWeight="mediumbold" color="" text={ `From: ${ _value.assignTo }` } className="mt-0 mr-1"/>
                                              <Text size="Small" fontWeight="mediumbold" color="primaryColor" text={ _value.status } className="mt-0"/>
                                              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text={ _value.commentDate ? formateDateTime(_value.commentDate) : '-' } className="ml-2" />
                                            </div>
                                            <Text size="Small" fontWeight="smbold" color="secondryColor" text={ _value.comment } className="mt-1"/>

                                          </div>
                                        )) :
                                        <span>-</span>
                            }
                          </div> :
                        null
                    }

                    {
                        data && data.successMessage ?

                          <div className="mt-3">
                            <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data?.requestType==="INSTALLATION"?"Installation Feedback":"Un-installation Feedback"} />
                            <div className="d-flex align-items-center mt-2">
                              <Text size="Small" fontWeight="mediumbold" color="" text={ `From: ${ data.assignTo || '-' }` } className="mt-0 mr-1"/>
                              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text={ data.successMessageDate ? formateDateTime(data.successMessageDate):'-' } className="ml-2" />
                            </div>
                            <Text size="Small" fontWeight="mediumbold" color="primaryColor" text={ data.successMessage || '-' } className="mt-0"/>

                          </div> :

                         null

                    }

                    {
                        data && data.requestCodeDetails && data.requestCodeDetails.length ?
                          <div className="mt-4">
                            <div className="d-flex align-items-center mt-2">
                              <Text size="Small" fontWeight="mediumbold" color="secondryColor" text="Check List " />
                            </div>
                            <div>
                              <div className='cursor-remove'>
                                {
                                    data && data.requestCodeDetails ? data.requestCodeDetails.map((_value, index)=>(
                                      <div className="mt-2">
                                        <CheckBoxComponent id={ index } value={ index } label={ _value.description } checked={ _value.checked }/>
                                      </div>
                                    ),
                                    ):null
                                }
                              </div>
                            </div>
                          </div> :
                        null
                    }

                  </div>
                  

                </>

        }
      </div>

    </>
  )
}

export default memo(PropertyDetail);
