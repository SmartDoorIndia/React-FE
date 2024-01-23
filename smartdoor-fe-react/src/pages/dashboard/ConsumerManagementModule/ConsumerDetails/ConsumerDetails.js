/** @format */

import React, { useCallback, useEffect, useState } from 'react';
import Image from '../../../../shared/Image/Image';
import Button from '../../../../shared/Buttons/Buttons';
import Text from '../../../../shared/Text/Text';
import { Col, Row } from 'react-bootstrap';
import dismissIcon from '../../../../assets/images/dismiss-icon.svg';
import consumerIcon from '../../../../assets/svg/avatar_sml.svg';
import Verified from '../../../../assets/images/Verified.png'
import Unverified from '../../../../assets/images/Unverified.png'
import {
  formateDate,
  ToolTip,
  handleStatusElement,
  dateWithFormate,
  setPrice,
} from '../../../../common/helpers/Utils';
import {
  getConsumerPropertyByUserId,
  getConsumerTransactionsByUserId,
  blockConsumerUser,
  getAllServiceRequest,
  getConsumerDetails,
  getCoinTransactions,
  getUpcomingVisits,
  getVisitRequests,
} from '../../../../common/redux/actions';
import contentIco from '../../../../assets/images/content-ico.svg';
import './ConsumerDetails.scss';
import { Link, useHistory } from 'react-router-dom';
import Buttons from '../../../../shared/Buttons/Buttons';
import ConfirmationModal from '../../../../shared/Modal/ConfirmationModal/ConfirmationModal';
import { useParams } from 'react-router-dom';
import ListingDataTable from '../../../../shared/DataTable/ListingDataTable';
import { useAudioCall, useSocket } from '../../../../common/helpers/SocketProvider';
import Loader from '../../../../common/helpers/Loader';
import reviewIcon from '../../../../assets/svg/reviewIcon.svg'

const ConsumerManagement = (props) => {
  console.log("props:", props);

  const { consumerId } = useParams();
  const { makeAudioCall } = useAudioCall();
  const { callInProgress } = useSocket();
  const [Consumer_data, setconsumerData] = useState([]);
  const [consumerPropertyData, setconsumerPropertyData] = useState([]);
  const [consumerTransactionsData, setConsumerTransactionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskloading, settaskLoading] = useState(true);
  const [ServiceRequestData, setServiceRequestData] = useState([]);
  const [coinTransactionData, setCoinTransactionData] = useState({})
  const [show, setShow] = useState(false);
  const [blockData, setBlockData] = useState(null);
  const history = useHistory();
  const [upcomingVisitsForYou, setUpcomingVisitsForYou] = useState([])
  const [upcomingVisitsFromYou, setUpcomingVisitsFromYou] = useState([])
  const [visitHistoryFor, setVisitHistoryFor] = useState([])
  const [visitHistoryFrom, setVisitHistoryFrom] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleBlockConsumser = () => {
    if (blockData !== null) {
      blockConsumerUser({ userId: blockData })
        .then((data) => {
          _getConsumerDetails();
        })
        .finally(() => {
          handleClose();
        });
    }
  };

  const displayPathname = () =>{
    if(props.module === "EXECUTION INSTALLATION REQUESTS") return '/admin/execution/installation-detail/consumer/property-details';
    if(props.module === "EXECUTION SERVICE REQUESTS") return '/admin/execution/serviceRequest/consumer/property-details';
    if(props.module === "HELPDESK INSTALLATION REQUESTS") return '/admin/helpdesk/serviceRequest/consumer/property-details';
    if(props.module === "EXECUTION SALES LEAD") return '/admin/sales/sales-lead/consumer/property-details';
    if(props.module === "EXECUTION") return '/admin/sales/sales-lead/consumer/property-details';
    if(props.module === 'CONSUMER') return '/admin/consumer-management/consumer-details/property-details';
    else return '/admin/property/property-details';
  }

  const visitStatus = (visitVal) => {
    const status = visitVal ? 'APPROVED' : 'PENDING';
    return handleStatusElement(status);
  };

  const columns = [
    {
      name: 'Id',
      selector: (row) => row.smartdoorPropertyId,
      sortable: false,
      center: true,
    },

    {
      name: 'Added On',
      selector: (row) => row.addedOn,
      sortable: false,
      center: true,
      maxWidth: '150px',
      cell: ({ addedOn }) => <span>{`${formateDate(addedOn)}` || ''}</span>,
    },
    {
      name: 'Location',
      selector: (row) => row.city,
      sortable: false,
      center: true,
      cell: ({ propertyAddress }) => (
        <ToolTip position="top" style={{ width: "100%" }} name={propertyAddress || ""}>
           <span className="cursor-pointer elipsis-text">
              {" "}
              {propertyAddress?.substring(
                 0,
                 propertyAddress?.indexOf(",") !== -1 ? propertyAddress?.indexOf(",") : propertyAddress?.length
              )}
           </span>
        </ToolTip>
    ),
    },
    {
      name: 'Type',
      selector: (row) => row.propertySubType,
      sortable: false,
      center: true,
      maxWidth: '150px',
      style: { 'text-align': 'center' },
      cell: ({ propertySubType }) => <span>{propertySubType || '-'}</span>,
    },
    {
      name: 'Information',
      selector: (row) => row.propertyInfoResponse,
      sortable: false,
      center: true,
      style: { 'justify-content': 'felx-start' },
      cell: (row) => (
        <span>{`${row.carpetArea + ' Sq. Ft.| ' || ''}${(row.bedRooms ? row.bedRooms : "0") + ' Bed | ' || ''} ${(row.numberOfBath ? row.numberOfBath : "0") + ' Bath' || '-'
          }`}</span>
      ),
    },
    {
      name: 'For',
      selector: (row) => row.propertyCategory,
      sortable: false,
      center: true,
      maxWidth: '150px',
      style: { 'text-align': 'center' },
      cell: ({ propertyCategory }) => <span>{propertyCategory==="Lease" ? 'Rent' : 'Sale'}</span>,
    },
    {
      name: 'Action',
      selector: (row) => row.year,
      sortable: false,
      center: true,
      maxWidth: '60px',
      cell: ({ row, smartdoorPropertyId }) => (
        <div className="action">
          <ToolTip position="left" name="View Details">
            <span>
              <Link
                to={{
                  pathname: displayPathname(),
                  state: { propertyId: smartdoorPropertyId, userId: consumerId },
                }}>
                <Image name="contentIco" src={contentIco} />
              </Link>
            </span>
          </ToolTip>
        </div>
      ),
    },
  ];

  const transactionsColumns = [
    {
      name: 'Id',
      selector: (row) => row.transactionId,
      sortable: false,
      center: true,
      maxWidth: '150px',
      cell: ({ transactionId }) => <span>{`${transactionId}` || ''}</span>,
    },

    {
      name: 'Invoice',
      selector: (row) => row.invoiceId,
      sortable: false,
      center: true,
      maxWidth: '80px',
      cell: ({ invoiceId }) => <span>{`${invoiceId}` || ''}</span>,
    },
    {
      name: 'Date',
      selector: (row) => row.date,
      sortable: false,
      center: true,
      cell: ({ date }) => <span>{`${formateDate(date)}` || ''}</span>,
    },
    {
      name: 'For',
      selector: (row) => row.requestFor,
      sortable: false,
      center: true,
      style: { 'text-align': 'center' },
      cell: ({ requestFor }) => <span>{requestFor || '-'}</span>,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: false,
      center: true,
      style: { 'justify-content': 'felx-start' },
      cell: ({ status }) =>  handleStatusElement(status),
    },
    {
      name: 'Amount',
      selector: (row) => row.amount,
      sortable: false,
      center: true,
      maxWidth: '60px',
      cell: ({ amount }) => <span>{`${setPrice(amount)}`}</span>,
    },
  ];

  const serviceReqColumns = [
    {
      name: 'Id',
      selector: 'ticketNo',
      center: true,
      sortable: true,
      maxWidth: '100px !important',
    },
    {
      name: 'Date',
      selector: 'createdDate',
      center: true,
      sortable: true,
      cell: ({ createdDate, time })=>(<span>{`${ formateDate(createdDate) } | ${ dateWithFormate(createdDate, 'hh:mm a') || '-' }`}</span>),
    },
    {
      name: 'Request',
      selector: 'ticketName',
      center: true,
      cell: ({ ticketName }) => ( <ToolTip position="top" name={ ticketName|| '' }>
        <span className="cursor-pointer elipsis-text"> {ticketName || '-'} </span>
      </ToolTip> ),
    },
    {
      name: 'From',
      selector: 'requestedBy',
      maxWidth: '100px',
      center: true,
    },
    {
      name: 'Phone No',
      center: true,
      maxWidth: '130px',
      cell: ({ contactNumber }) => ( <span> {contactNumber || '-'} </span> ),
    },
    {
      name: 'Assigned To',
      selector: 'assignTo',
      center: true,
      maxWidth: '130px',
      cell: ({ id,teamName, teamNameList }) => (
        <Text size="Small" color="secondryColor" className="text-center" text={ teamName ? teamName : 'UNASSIGNED' } />   
    ),
    },
    {
      name: 'Status',
      selector: 'status',
      center: true,
      maxWidth: '120px',
      style: { 'white-space': 'nowrap', 'padding': '0 !important', 'max-width': '120px' },
      cell: ({ status })=>(handleStatusElement(status)),
    },
  ];

  const CoinTransactionColumns = [
    {
      name: 'Header',
      selector: 'header',
      center: true,
      sortable: false,
      maxWidth: '500px !important',
    },
    {
      name: 'TimeStamp',
      selector: 'timeStamp',
      center: true,
      sortable: false,
      maxWidth: '200px !important',
    },
    {
      name: 'Coins',
      selector: 'coin',
      center: true,
      sortable: false,
      maxWidth: '100px !important',
      style:{fontWeight:'bold'},
      cell: ({ coin }) => (
        <Text size="45px" fontWeight={"bold"} color={coin > 0 ? '#44D22D' : '#FF1919'} className="text-center" text={ coin > 0 ? "+"+coin : "-"+coin }
        style={{color: coin > 0 ? '#44D22D' : '#FF1919', fontSize: 'medium'}} />) 
    },

  ]

  const upcomingRequestForCols = [
    {
      name: 'Visit Date',
      selector: 'visitDate',
      center: true,
      sortable: false,
      maxWidth: '200px !important',
      cell: ({ visitDate })=>(<span>{`${ formateDate(visitDate) }`}</span>),
    },
    {
      name: 'Visit Time',
      // selector: 'visitStartTime',
      center: true,
      sortable: false,
      maxWidth: '200px !important',
      cell: ({ visitStartTime, visitEndTime })=>(<span>{visitStartTime} - {visitEndTime}</span>),
    },
    // {
    //   name: 'Visit End Time',
    //   selector: 'visitEndTime',
    //   center: true,
    //   sortable: false,
    //   maxWidth: '200px !important',
    //   // cell: ({ visitEndTime })=>(<span>{`${ formateDate(visitEndTime, 'hh:mm a') }`}</span>),
    // },
    {
      name: 'Visitor Name',
      selector: 'visitorName',
      wrap: true,
      center: true,
      sortable: false,
      maxWidth: '200px !important',
    },
    {
      name: 'Visitor Address',
      selector: 'visitAddress',
      wrap: true,
      center: true,
      sortable: false,
      maxWidth: '200px !important',
    },
    {
      name: 'Property Id',
      selector: 'propertyId',
      center: true,
      sortable: false,
      maxWidth: '200px !important',
    },
    {
      name: 'Visit Status',
      selector: 'visitStatus',
      center: true,
      sortable: false,
      maxWidth: '200px !important',
    }
  ]

  const upcomingRequestsFromCols = [
    {
      name: 'Visit Date',
      selector: 'visitDate',
      center: true,
      sortable: false,
      maxWidth: '200px !important',
      cell: ({ visitDate })=>(<span>{`${ formateDate(visitDate) }`}</span>),
    },
    {
      name: 'Visit Time',
      // selector: 'visitStartTime',
      center: true,
      sortable: false,
      maxWidth: '200px !important',
      cell: ({ visitStartTime, visitEndTime })=>(<span>{visitStartTime} - {visitEndTime}</span>),
    },
    // {
    //   name: 'Visit End Time',
    //   selector: 'visitEndTime',
    //   center: true,
    //   sortable: false,
    //   maxWidth: '200px !important',
    //   // cell: ({ visitEndTime })=>(<span>{`${ formateDate(visitEndTime) }`}</span>),
    // },
    {
      name: 'Visitor Address',
      selector: 'visitAddress',
      wrap: true,
      center: true,
      sortable: false,
      maxWidth: '200px !important',
    },
    {
      name: 'Property Id',
      selector: 'propertyId',
      center: true,
      sortable: false,
      maxWidth: '200px !important',
    },
    {
      name: 'Visit Status',
      selector: 'visitStatus',
      center: true,
      sortable: false,
      maxWidth: '200px !important',
    },
  ]

  const visitRequestForCols = [
    {
      name: 'Visit Date',
      selector: 'visitDate',
      center: true,
      sortable: false,
      maxWidth: '200px !important',
      cell: ({ visitDate })=>(<span>{`${ formateDate(visitDate) }`}</span>),
    },
    {
      name: 'Visitor Name',
      selector: 'visitorName',
      wrap: true,
      center: true,
      sortable: false,
      maxWidth: '200px !important',
    },
    {
      name: 'Visitor Address',
      selector: 'visitAddress',
      wrap: true,
      center: true,
      sortable: false,
      maxWidth: '300px !important',
    },
    {
      name: 'Property Id',
      selector: 'propertyId',
      center: true,
      sortable: false,
      maxWidth: '150px !important',
    },
    {
      name: 'Visit Status',
      selector: 'visitStatus',
      center: true,
      sortable: false,
      maxWidth: '200px !important',
    },
    {
      name: 'Visit Ratings',
      // selector: 'visitRating'+'visitReviews',
      center: true,
      sortable: false,
      maxWidth: '250px !important',
      cell:({visitRating}) => (
        <>
          {Array.from({ length: Number(visitRating) }, (_, index) => (
          <img src={reviewIcon} alt=""  style={{ alignItems: 'center', width: 'fit-content', height: '20px' }}></img>
          ))}
        </>
        )
    },
    {
      name: 'Visit Reviews',
      selector: 'visitReview',
      center: true,
      wrap:true,
      sortable: false,
      maxWidth: '200px !important',
    },
  ]

  const visitRequestFromCols = [
    {
      name: 'Visit Date',
      selector: 'visitDate',
      center: true,
      sortable: false,
      maxWidth: '200px !important',
      cell: ({ visitDate })=>(<span>{`${ formateDate(visitDate) }`}</span>),
    },
    {
      name: 'Visitor Address',
      selector: 'visitAddress',
      wrap: true,
      center: true,
      sortable: false,
      maxWidth: '200px !important',
    },
    {
      name: 'Property Id',
      selector: 'propertyId',
      center: true,
      sortable: false,
      maxWidth: '200px !important',
    },
    {
      name: 'Visit Status',
      selector: 'visitStatus',
      center: true,
      sortable: false,
      maxWidth: '200px !important',
    },
    {
      name: 'Visit Ratings',
      center: true,
      sortable: false,
      maxWidth: '200px !important',
      cell:({visitRating}) => (
        <>
          {Array.from({ length: Number(visitRating) }, (_, index) => (
          <img src={reviewIcon} alt=""  style={{ alignItems: 'center', width: 'fit-content', height: '20px' }}></img>
          ))}
        </>
        )
    },
    {
      name: 'Visit Reviews',
      selector: 'visitReview',
      center: true,
      wrap:true,
      sortable: false,
      maxWidth: '200px !important',
    },
  ]

  // GET_CONSUMER_DETAILS_API
  const _getConsumerDetails = useCallback(() => {
    getConsumerDetails({ userId: consumerId })
      .then((response) => {
        setLoading(false);
        if (response.data) {
          if (response.data.resourceData) setconsumerData(response.data.resourceData);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log('error', error);
      });
  }, [getConsumerDetails, consumerId]);

  const _getConsumerPropertyByUserId = useCallback(() => {
    getConsumerPropertyByUserId({
      userId: consumerId,
      records: '',
      pageNumber: '',
    })
      .then((response) => {
        setLoading(false);
        if (response.data) {
          if (response.data.resourceData) setconsumerPropertyData(response.data.resourceData);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [getConsumerPropertyByUserId, consumerId]);

  const _getConsumerTransactionsByUserId = useCallback(() => {
    getConsumerTransactionsByUserId({
      userId: consumerId,
      // records: '',
      // pageNumber: '',
    })
      .then((response) => {
        setLoading(false);
        if (response.data) {
          if (response.data.resourceData) setConsumerTransactionsData(response.data.resourceData);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [getConsumerPropertyByUserId, consumerId]);

  const _getAllServiceRequest = useCallback(() => {
    getAllServiceRequest({ userId: consumerId })
      .then((response) => {
        settaskLoading(false);
        if (response.data) {
          if (response.data.resourceData) {
            const filterData = response.data.resourceData ?
              response.data.resourceData.filter((value) => {
                return value !== null;
              }) :
              [];
            setServiceRequestData(filterData);
          }
        }
      })
      .catch((error) => {
        setLoading(false);
      });
    console.log('serviceRequestData:', ServiceRequestData);
  }, [getAllServiceRequest, consumerId]);

  const _getAllCoinTransactions = useCallback(() => {
    getCoinTransactions({userId : consumerId, pageNumber: 1, records: 1000})
    .then((response) => {
      if(response.data) {
        console.log(response)
        setCoinTransactionData(response?.data?.resourceData)
      }
    }).catch((error) => {
      setLoading(false);
    });
  });

  const _getUpcomingVisits = useCallback(() => {
    getUpcomingVisits({userId : consumerId})
    .then((response) => {
      if(response.data) {
        console.log(response)
        setUpcomingVisitsForYou(response.data.resourceData.upcomingvisitsForYou)
        setUpcomingVisitsFromYou(response.data.resourceData.upcomingvisitsFromYou)
      }
    }).catch((error) => {
      setLoading(false);
    })
  },[consumerId])

  const _visitHistory = useCallback(() => {
    getVisitRequests({userId : consumerId})
    .then((response) => {
      if(response.data) {
        // console.log(response)
        let data = response.data.resourceData
        let visitForYou = []
        let visitFromYou = []
        data.forEach(element => {
          if(element.forYou) {
            visitForYou.push(element)
            console.log(upcomingVisitsForYou)
          }
        });
        setVisitHistoryFor(visitForYou)
        data.forEach(element => {
          if(element.fromYou) {
            visitFromYou.push(element)
          }
        });
        setVisitHistoryFrom(visitFromYou)
      }
    }).catch((error) => {
      setLoading(false);
    })
  },[consumerId])
  // USE_EFFECT
  useEffect(() => {
    _getConsumerDetails();
    _getConsumerPropertyByUserId();
    _getConsumerTransactionsByUserId();
    _getAllServiceRequest();
    _getAllCoinTransactions();
    _getUpcomingVisits();
    _visitHistory();
  }, [_getConsumerDetails, _getConsumerPropertyByUserId,_getConsumerTransactionsByUserId, _getAllServiceRequest, _getUpcomingVisits, _visitHistory]);

  return (
    <>
      {loading ? <Loader /> : 
      <>
      <div className="whiteBg mb-0">
        <Row>
          <Col lg="6">
            <div className="d-flex">
              <Image
                name="consumerIcon"
                src={Consumer_data.imageUrl || consumerIcon}
                className="mr-4 profileImg"
              />
              <div>
                <Text size="regular" fontWeight="smbold" color="secondryColor" text={Consumer_data.name} className="mt-1" />
                <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text={Consumer_data.position} className="mt-1" />
                <Text size="xSmall" fontWeight="smbold" color="secondryColor" text={`Joined on: ${formateDate(Consumer_data.joiningDate)}`} className="mt-2" />
              </div>
            </div>
            <div className="d-flex align-items-center  justify-content-between pt-2 personalDetail">
              <Text
                size="Small"
                fontWeight="smbold"
                color="secondryColor"
                text="Phone Number"
                className="mt-1"
              />
              <Text
                size="Small"
                fontWeight="mediumbold"
                color="secondryColor"
                text={Consumer_data.contactNumber || '-'}
                className="mt-1"
              />
            </div>
            <div className="d-flex align-items-center  justify-content-between pt-2 personalDetail">
              <Text
                size="Small"
                fontWeight="smbold"
                color="secondryColor"
                text="Email"
                className="mt-1"
              />
              <Text
                size="Small"
                fontWeight="mediumbold"
                color="secondryColor"
                text={Consumer_data.email || '-'}
                className="mt-1"
              />
            </div>
            <div className="d-flex align-items-center  justify-content-between pt-2 personalDetail">
              <Text
                size="Small"
                fontWeight="smbold"
                color="secondryColor"
                text="FreeCoins"
                className="mt-1"
              />
              <Text
                size="Small"
                fontWeight="mediumbold"
                color="secondryColor"
                text={coinTransactionData?.freeCoins}
                className="mt-1"
              />
            </div>
            <div className="d-flex align-items-center  justify-content-between pt-2 personalDetail">
              <Text
                size="Small"
                fontWeight="smbold"
                color="secondryColor"
                text="FreeCoins Expiry Date"
                className="mt-1"
              />
              <Text
                size="Small"
                fontWeight="mediumbold"
                color="secondryColor"
                text={coinTransactionData?.freeCoinsExpiryDate === null ? '-' : coinTransactionData?.freeCoinsExpiryDate}
                className="mt-1"
              />
            </div>
            <div className="d-flex align-items-center  justify-content-between pt-2 personalDetail">
              <Text
                size="Small"
                fontWeight="smbold"
                color="secondryColor"
                text="User Balance"
                className="mt-1"
              />
              <Text
                size="Small"
                fontWeight="mediumbold"
                color="secondryColor"
                text={coinTransactionData?.userBalance}
                className="mt-1"
              />
            </div>
          </Col>

          <Col lg="6">
            <div className="text-right">
              {(props.module === 'HELPDESK') ?
                <Link to={{
                  pathname: '/admin/helpdesk/create-ticket',
                  state: {
                    consumer_name: Consumer_data.name,
                    consumer_contactNumber: Consumer_data.contactNumber,
                    consumerId: Consumer_data.id,
                    callerId: consumerId
                  },
                }}>
                  <Button
                    name="Create Ticket"
                    varient="lightBtn"
                    type="submit"
                    size="Small"
                    color="secondryColor"
                    className="mr-3"
                  />
                </Link> :
                null}

              {props.module === 'CONSUMER' ? (
                <ToolTip position="top" name="Under Development">
                  <span>
                  </span>
                </ToolTip>
              ) : null}
              {(props.module === 'CONSUMER') ?
                <Button
                  name={Consumer_data.blocked ? 'Unblock' : 'Block'}
                  varient="lightBtn"
                  type="submit"
                  size="Small"
                  color="secondryColor"
                  iconSrc={dismissIcon}
                  className="mr-3"
                  onClick={() => {
                    handleShow();
                    setBlockData(consumerId);
                  }}
                /> :
                null}
              <span className="ml-2"></span>
              {props.module === 'HELPDESK INSTALLATION REQUESTS' ?
              <Buttons
                name="Create Ticket"
                varient="primary"
                type="submit"
                size="xSmall"
                color="white"
                className='mr-2'
                onClick={() => history.push('/admin/helpdesk/serviceRequest/consumer/create-ticket', {
                  // state: {
                    consumer_name: Consumer_data.name,
                    consumer_contactNumber: Consumer_data.contactNumber,
                    consumerId: Consumer_data.id,
                    callerId: consumerId
                  // },
                })}
              />
              :''}
              <Buttons
                name="Call"
                varient="primary"
                type="submit"
                size="xSmall"
                color="white"
                disabled={callInProgress ? true : false}
                onClick={() => makeAudioCall(Consumer_data)}
              />
              {(props.module === 'CONSUMER') ?
                <div className="mt-5 mb-5">
                  <div className="d-flex justify-content-end align-items-center kycTag">
                    {Consumer_data.kycverified ? 
                    <Image name="consumerIcon" src={Verified} />
                    :
                    <Image name="consumerIcon" src={Unverified} />
                    }
                  </div>
                </div> :
                null}
            </div>

            {Consumer_data.visitSocietyName ?
              <div className="onVisit mb-3 mt-2">
                <Text
                  size="Small"
                  fontWeight="mediumbold"
                  color="primaryColor"
                  text={`On visit: ${Consumer_data.visitHouseNumber || ''} ${Consumer_data.visitSocietyName ? Consumer_data.visitSocietyName + ',' : ''} ${Consumer_data.visitCity || ''}`}
                  className={(props.module === 'CONSUMER') ? 'mt-1' : 'mb-0'}
                />
              </div> :
              null}
          </Col>
        </Row>
      </div>

      <ListingDataTable
        title="Properties Listed"
        data={consumerPropertyData}
        columns={columns}
        isLoading={consumerPropertyData.isLoading}
        perPageOptions={ [  4, 8, 12, 16,20, 24,28, 32, 36, 40 ] }
        paginationPerPage={ 4 }
        paginationRowsPerPageOptions={[4, 8, 12, 16,20, 24,28, 32, 36, 40]}
      />

      <div className='consumer-detailsTransactionsTableWrapper'>
        <ListingDataTable
          title="Transactions"
          data={consumerTransactionsData}
          columns={transactionsColumns}
          isLoading={consumerTransactionsData.isLoading}
          perPageOptions={ [  4, 8, 12, 16,20, 24,28, 32, 36, 40 ] }
          paginationPerPage={ 4 }
          paginationRowsPerPageOptions={[4, 8, 12, 16,20, 24,28, 32, 36, 40]}
        />
      </div>

      <ListingDataTable
        title="Previous Service Requests"
        data={ServiceRequestData}
        columns={serviceReqColumns}
        isLoading={ServiceRequestData.isLoading}
        perPageOptions={ [  4, 8, 12, 16,20, 24,28, 32, 36, 40 ] }
            paginationPerPage={ 4 }
            paginationRowsPerPageOptions={[4, 8, 12, 16,20, 24,28, 32, 36, 40]}
      />

      <ListingDataTable
        title="Coin Transactions"
        data={coinTransactionData.transactionDetailList === null ? [] : coinTransactionData.transactionDetailList}
        columns={CoinTransactionColumns}
        // isLoading={ServiceRequestData.isLoading}
        perPageOptions={ [  4, 8, 12, 16,20, 24,28, 32, 36, 40 ] }
            paginationPerPage={ 4 }
            paginationRowsPerPageOptions={[4, 8, 12, 16,20, 24,28, 32, 36, 40]}
      />

      <ListingDataTable
        title="Upcoming Visits For Owner"
        data={upcomingVisitsForYou === null ? [] : upcomingVisitsForYou}
        columns={upcomingRequestForCols}
        // isLoading={ServiceRequestData.isLoading}
        perPageOptions={ [  4, 8, 12, 16,20, 24,28, 32, 36, 40 ] }
            paginationPerPage={ 4 }
            paginationRowsPerPageOptions={[4, 8, 12, 16,20, 24,28, 32, 36, 40]}
      />

      <ListingDataTable
        title=" Upcoming Visits From Owner"
        data={upcomingVisitsFromYou === null ? [] : upcomingVisitsFromYou}
        columns={upcomingRequestsFromCols}
        // isLoading={ServiceRequestData.isLoading}
        perPageOptions={ [  4, 8, 12, 16,20, 24,28, 32, 36, 40 ] }
            paginationPerPage={ 4 }
            paginationRowsPerPageOptions={[4, 8, 12, 16,20, 24,28, 32, 36, 40]}
      />

      <ListingDataTable
        title="Visit Requests For Owner (History)"
        data={visitHistoryFor === null ? [] : visitHistoryFor}
        columns={visitRequestForCols}
        // isLoading={ServiceRequestData.isLoading}
        perPageOptions={ [  4, 8, 12, 16,20, 24,28, 32, 36, 40 ] }
            paginationPerPage={ 4 }
            paginationRowsPerPageOptions={[4, 8, 12, 16,20, 24,28, 32, 36, 40]}
      />

      <ListingDataTable
        title="Visit Requests From Owner (History)"
        data={visitHistoryFrom === null ? [] : visitHistoryFrom}
        columns={visitRequestFromCols}
        // isLoading={ServiceRequestData.isLoading}
        perPageOptions={ [  4, 8, 12, 16,20, 24,28, 32, 36, 40 ] }
            paginationPerPage={ 4 }
            paginationRowsPerPageOptions={[4, 8, 12, 16,20, 24,28, 32, 36, 40]}
      />

      <ConfirmationModal
        title={
          Consumer_data.blocked ?
            'Are you sure you want to unblock this consumer?' :
            'Are you sure you want to block this consumer?'
        }
        cancelButtonName="Cancel"
        primaryButtonName={Consumer_data.blocked ? 'Unblock' : 'Block'}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        handlePerformAction={handleBlockConsumser}
      />
      <div className="mt-5">
      </div>
      </>
      }
    </>
  );
};

export default ConsumerManagement;
