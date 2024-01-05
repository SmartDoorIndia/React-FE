import react, { useCallback, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../../../common/helpers/Loader';
import { formateDate, formateDateTime, getLocalStorage, handleStatusElement } from '../../../../common/helpers/Utils';
import { refundRequestDetail, refundRequestDetailComment, togglefinanceRefundStatus } from '../../../../common/redux/actions';
import Buttons from '../../../../shared/Buttons/Buttons';
import TextArea from '../../../../shared/Inputs/TextArea/TextArea';
import Text from '../../../../shared/Text/Text';
import './FinanceRefundRequestDetails.scss'

const FinanceRefundRequestDetails = props => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [allComments, setAllComments] = useState([])
    const [commentValue, setCommentValue] = useState('')
    // const buybackRequestId = props?.location?.state?.buybackRequestId ? props?.location?.state?.buybackRequestId : null
    const { buybackRequestId } = useParams();
    const userData = getLocalStorage("authData");

    


    const _refundRequestDetail = useCallback(() => {
        refundRequestDetail({ buybackRequestId: buybackRequestId })
          .then((response) => {
            if (response.data) {
              if (response.data.resourceData) setData(response.data.resourceData);
            //   if (response.data.error) setError(response.data.error)
            }
            setLoading(false);
            console.log('response', response)
          })
          .catch((error) => {
            setLoading(false);
            // console.log('error', error)
          })
      }, [refundRequestDetail])

      const commentPosted = (comment) => {
        setAllComments([...allComments, comment])
        setCommentValue('')
    
        refundRequestDetailComment({ comments: comment, id: buybackRequestId, loginId: userData.userid })
          .then((response) => {
            if (response.data) {
            //   if (response.data.resourceData)
            //   if (response.data.error) setError(response.data.error)
                _refundRequestDetail();
            }
            setLoading(false);
            console.log('response', response)
          })
          .catch((error) => {
            setLoading(false);
            console.log('error', error)
          })
    
      }

    const handlefinanceStatus = (requestId, status)=> {
        togglefinanceRefundStatus({ requestId , status })
            .then((data)=>{
                _refundRequestDetail();
            })
            .catch((error)=>{
                console.log('')
            })
        // handleClose();
    }

    useEffect(() => {
        _refundRequestDetail();
    }, [])


    return (
        <>
            <div style={{ height: '2%' }}>
            </div>
            { loading ? <Loader /> : 
            <>
            <div className="whiteBg px-0">
                {
                    //   error ? <h1>{error}</h1> :

                    loading ? <div>Loading...</div> :
                        <>
                            <div className="d-flex justify-content-between px-3">
                                <div className="leadTitle">
                                    <div className="d-flex align-items-center">
                                        <div>
                                        <Text size="medium" fontWeight="mediumbold" color="secondryColor" text={data.name} className="mr-2" />
                                        <Text size="Small" fontWeight="regularbold" color="secondryColor" text={data.propertyAddress} className="mr-2" />
                                        </div>
                                        <Text size="Small" fontWeight="regularbold" color="secondryColor" text={handleStatusElement(data.status)} />

                                    </div>

                                    <Text size="Small" fontWeight="smbold" color="secondryColor" text={data.address} />
                                </div>
                                <div className="locationSelect">

                                    {/* <Buttons name="Next" varient="primary" type="submit" size="xSmall" color="white" onClick={handleApprove} />*/}
                        
                                            {data?.status === "CLOSED"?  
                                            <Buttons
                                                //   disabled={
                                                //     data.status === 'COMPLETED' ||
                                                //       data.status === 'PENDING' ||
                                                //       data.status === 'NOT_INTERESTED' ||
                                                //       data.status === 'CANCELLED' ||
                                                //       data.status === 'PROBLEM' || handleStatus(data.reviews, data.status, 'next') ? true : false}
                                                name="Re-open"
                                                varient="primary"
                                                className="fw700"
                                                type="submit"
                                                size="xSmall"
                                                color="white"
                                                onClick={()=> handlefinanceStatus(buybackRequestId,"REOPEN")}
                                            />:''}
                                    


                                    <span className="ml-2"></span>
                                            { data?.status === "PENDING" || data?.status === "IN_PROGRESS" ?
                                            <Buttons
                                                name={'Close'}
                                                varient="primary"
                                                type="submit"
                                                className="fw700"
                                                size="xSmall"
                                                color="white"
                                                onClick={()=> handlefinanceStatus(buybackRequestId,"CLOSED")}
                                            />:''}
                                </div>
                            </div>
                            <Row className="mt-3 px-3">
                                {/* <Col>
                                    <div>
                                        <Text size="xSmall" fontWeight="regularbold" color="TaupeGrey" text="Id" />
                                        <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data.buybackRequestId} />
                                    </div>
                                </Col> */}
                                <Col>
                                    <div>
                                        <Text size="xSmall" fontWeight="regularbold" color="TaupeGrey" text="Date" />
                                        <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={formateDate(data.date)} />
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <Text size="xSmall" fontWeight="regularbold" color="TaupeGrey" text="From" />
                                        <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data.from} />
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <Text size="xSmall" fontWeight="regularbold" color="TaupeGrey" text="Property Id" />
                                        <Link className='removeUnderline'
                                            to={ {
                                            pathname: '/admin/finance/refundRequest-details/property-details',
                                            state: { propertyId: data.propertyId, userId: userData.userid },
                                        } }>
                                        <Text className="linkFor" size="Small" fontWeight="mediumbold" color="secondryColor" text={data.propertyId} />
                                        </Link>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <Text size="xSmall" fontWeight="regularbold" color="TaupeGrey" text="Phone Number" />
                                        <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data.phoneNo} />
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <Text size="xSmall" fontWeight="regularbold" color="TaupeGrey" text="Amount" />
                                        <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data.amount} />
                                    </div>
                                </Col>
                            </Row>
                            <hr/>
                            <div className="px-3">
                                <Text className="fs16" fontWeight="mediumbold" color="secondryColor" text="Account Holder Details" />
                            </div>
                            {data.upiId ? 
                                <Row className="mt-3 px-3">
                                <Col>
                                <div>
                                        <Text size="xSmall" fontWeight="regularbold" color="TaupeGrey" text="UPI" />
                                        <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data?.upiId ? data?.upiId : '-'} />
                                </div>
                                </Col>
                            </Row>
                            :
                            <Row className="mt-3 px-3">
                                <Col>
                                <div>
                                        <Text size="xSmall" fontWeight="regularbold" color="TaupeGrey" text="Account Number" />
                                        <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data?.accountNumber ? data?.accountNumber : '-'} />
                                </div>
                                </Col>
                                <Col>
                                    <div>
                                        <Text size="xSmall" fontWeight="regularbold" color="TaupeGrey" text="IFSC Code" />
                                        <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data?.ifscCode ? data?.ifscCode : '-'} />
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <Text size="xSmall" fontWeight="regularbold" color="TaupeGrey" text="Bank Name" />
                                        <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data?.bankName ? data?.bankName : '-'} />
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <Text size="xSmall" fontWeight="regularbold" color="TaupeGrey" text="Account Holder Name" />
                                        <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data?.accountHolderName ? data?.accountHolderName : '-'} />
                                    </div>
                                </Col>
                            </Row>
                            }
                            
                            {/* {data.manualEntry === false ? */}
                            <Row className='mt-2 px-3'>
                                {props.module === "HELPDESK" ?
                                    <>
                                        {data.contactPerson ?
                                            <>
                                                <Col className='col-2'>
                                                    <div >
                                                        <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Contact Person" />
                                                        {data.contactId !== null ?
                                                            <Link to={`/admin/helpdesk/property-leads/consumer-details/${data.contactId}`} >
                                                                <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data.contactPerson} />
                                                            </Link>
                                                            : <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={data.contactPerson} />}
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
                                                    <Link className='removeUnderline' to={`/admin/consumer-management/consumer-details/${data.customerId}`} >
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
                            {/* : ''} */}
                            <div className="separator mt-4 px-3"></div>

                            <div className="feedBack mt-4 px-3">
                                <Text size="medium" fontWeight="mediumbold" color="secondryColor" text="Comments" />
                                {
                                    data && data.comments ? data.comments.map((_value, index) => (
                                        <div className='mt-2 mb-3' key={index}>
                                            <div className="d-flex align-items-center mt-2">
                                                <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={`From: ${_value.feedBackByName || ' - '}`} />
                                                <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text={formateDateTime(_value.date)} className="ml-2" />
                                            </div>
                                            {/* <Text size="Small" fontWeight="mediumbold" color="primaryColor" text={_value.clientInterest + `. ${_value.proposedCutOff ? `Proposed Percentage:  ${_value.proposedCutOff}%` : ''}`} className="mt-2" /> */}
                                            <div className='d-flex align-items-center mt-0'>
                                                <Text size="Small" fontWeight="mediumbold" color="primaryColor" text={_value.clientInterest} />
                                                {
                                                    _value.clientInterest === `Will decide later` || _value.clientInterest === 'No, does not look interested' ?
                                                        data.followUpDate !== null ? <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" className='ml-2' text={`Follow up date: ${formateDate(data.followUpDate) || ' '}`} /> :
                                                            null :
                                                        null
                                                }
                                            </div>
                                            <Text size="Small" fontWeight="smbold" color="primaryColor" text={_value.review} className="mt-1" />

                                        </div>
                                    )) :
                                        <span>-</span>
                                }
                                
                                    <>
                                        <div className='commentInput'>
                                        {/* <Text size="xxSmall" fontWeight="mediumbold" color="secondryColor" text={'Comments'} className="fs16 mt-1" /> */}
                                            <TextArea
                                                id="description"
                                                label="Enter Message"
                                                rows="6"
                                                placeholder="Enter Here..."
                                                style={{ "maxHeight": "132px" }}
                                                value={commentValue}
                                                className="messagesModalWidth commentbox textareaWidth100"
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
                                            disabled={commentValue.trim() === "" ? true : false}
                                          onClick={() => commentPosted(commentValue.trim())}
                                        />
                                    </>
                                   
                            </div>
                        </>
                }
            </div>
            </>
}

        </>
    );
}

export default FinanceRefundRequestDetails;