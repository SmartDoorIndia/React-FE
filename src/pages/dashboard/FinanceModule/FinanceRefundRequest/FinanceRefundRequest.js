// // /** @format */
/** @format */

import React, { useCallback, useEffect, useState, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Image from '../../../../shared/Image/Image';
import Text from '../../../../shared/Text/Text';
import { Col, Row } from 'react-bootstrap';
import './FinanceRefundRequest.scss';
// import {
//   getConsumerPropertyByUserId,
//   getConsumerTransactionsByUserId,
//   blockConsumerUser,
//   getAllServiceRequest,
//   getConsumerDetails,
// } from '../../../../common/redux/actions';
import {getConsumerDetails, 
    getConsumerDetailsFinance, 
    getConsumerPropertyByUserId, 
    getConsumerTransactionsByUserId} 
    from '../../../../common/redux/actions'
import {
  formateDate,
  ToolTip,
  handleStatusElement,
  getLocalStorage,
  setPrice,
} from '../../../../common/helpers/Utils';
import {
    getRefundRequestDetails
} from '../../../../common/redux/actions';
import contentIco from '../../../../assets/images/content-ico.svg';
// import './ConsumerDetails.scss';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ListingDataTable from '../../../../shared/DataTable/ListingDataTable';
import Loader from '../../../../common/helpers/Loader';

const FinanceRefundRequest = (props) => {
  const { consumerId } = useParams();  
  const { userid } = useParams();
  const transactionId = props?.location?.state?.transactionId ? props?.location?.state?.transactionId : null;
  const { 
    getRefundRequestDetails,
    financeRefundRequestDetails
  } = props;

  //State: to manage data from api call
  const [ Consumer_data, setconsumerData ] = useState([]);
  const [ consumerPropertyData, setconsumerPropertyData ] = useState([]);
  const [consumerTransactionsData, setConsumerTransactionsData] = useState([]);

  const userData = getLocalStorage("authData");

  //State : to manage data loading
  const [ loading, setLoading ] = useState(true);
  const [ transactionLoading, setTransactionLoading ] = useState(true);
  const [ propertyLoading, setPropertyLoading ] = useState(true);


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
      cell: ({ addedOn }) => <span>{`${ formateDate(addedOn) }` || ''}</span>,
    },
    {
      name: 'Location',
      selector: (row) => row.location,
      sortable: false,
      center: true,
      // cell: ({ address, city }) => <span>{`${ address || '' },${ city || '' }`}</span>,
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
      selector: (row) => row.type,
      sortable: false,
      center: true,
      maxWidth: '150px',
      style: { 'text-align': 'center' },
      cell: ({ propertySubType }) => <span>{propertySubType || '-'}</span>,
    },
    {
      name: 'Information',
      selector: (row) => row.information,
      sortable: false,
      center: true,
      style: { 'justify-content': 'felx-start' },
      cell: (row) => (
        <span>{`${row.carpetArea + ' Sq. Ft.| ' || ''}${(row.bedRooms ? row.bedRooms : "0") + ' Bed | ' || ''} ${(row.numberOfBath ? row.numberOfBath : "0") + ' Bath' || '-'
          }`}</span>
      ),
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
                to={ {
                  pathname: '/admin/finance/consumer-transaction-details/property-details',
                  state: { propertyId: smartdoorPropertyId, userId: userData.userid },
                } }>
                <Image name="contentIco" src={ contentIco } />
              </Link>
            </span>
          </ToolTip>
        </div>
      ),
    },
  ];

  const transactionColumns = [
    {
      name: 'Id',
      selector: (row) => row.sno,
      center: true,
      sortable: true,
      maxWidth: '150px !important',
    },
    {
      name: 'Invoice',
      center: true,
      // sortable: true,
      cell: ({ invoiceId }) => (
        <span>{invoiceId || '-'}</span>
      ),
    },
    {
      name: 'Date',
      selector: (row) => row.date,
      center: true,
      sortable: true,
      cell: ({ date }) => <span>{`${formateDate(date)}` || ''}</span>,
    },
    {
      name: 'For',
      selector: (row) => row.requestFor,
      sortable: false,
      center: true,
      cell: ({ requestFor }) => <span>{requestFor || ''}</span>,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: false,
      center: true,
      cell: ({ status }) => handleStatusElement(status),
    },
    // {
    //   name: 'Location',
    //   selector: (row) => row.location,
    //   center: true,
    //   cell: ({ location }) => <span> {location || '-'} </span>,
    // },
    {
      name: 'Amount',
      selector: (row) => row.amount,
      center: true,
      cell: ({ amount }) => <span>{`${setPrice(amount)}`}</span>,
    },
    {
      name: 'Action',
      center: true,
      maxWidth: '60px',
      cell: ({ id, transactionId }) => (
        <div className="action">
          <ToolTip position="left" name="View Details">
            <span>
              <Link to={ { 
                pathname: `/admin/finance/transactions/invoice/${ transactionId }`,
                state: { transactionId: transactionId, userId:userid }
             } } >
                <Image name="useraddIcon" src={ contentIco } />
              </Link>
            </span>
          </ToolTip>
        </div>
      ),
    },
  ];

const _getConsumerDetails = useCallback(() => {
  getConsumerDetailsFinance({ userId: userid, transactionId: transactionId })
    .then((response) => {
      setLoading(false);
      if (response.data) {
        if (response.data.resourceData) setconsumerData(response.data.resourceData);
      }
      // console.log('consumerDetails',response.data.resourceData);
    })
    .catch((error) => {
      setLoading(false);
      console.log('error', error);
    });
}, [getConsumerDetails, consumerId]);

const _getConsumerPropertyByUserId = useCallback(() => {
  getConsumerPropertyByUserId({
    userId: userid,
    records: '',
    pageNumber: '',
  })
    .then((response) => {
      setPropertyLoading(false);
      if (response.data) {
        if (response.data.resourceData) setconsumerPropertyData(response.data.resourceData);
      }
    })
    .catch((error) => {
      setPropertyLoading(false);
    });
}, [getConsumerPropertyByUserId, consumerId]);

const _getConsumerTransactionsByUserId = useCallback(() => {
  getConsumerTransactionsByUserId({
    userId: userid,
    // records: '',
    // pageNumber: '',
  })
    .then((response) => {
      setTransactionLoading(false);
      if (response.data) {
        if (response.data.resourceData) setConsumerTransactionsData(response.data.resourceData);
      }
    })
    .catch((error) => {
      setTransactionLoading(false);
    });
}, [getConsumerPropertyByUserId, consumerId]);

  useEffect(()=> {
    _getConsumerDetails();
    _getConsumerPropertyByUserId();
    _getConsumerTransactionsByUserId();
  }, [getRefundRequestDetails,userid])

  console.log("finance dashboard:refund request details:financeRefundRequestDetails", financeRefundRequestDetails);

  return (
    <>
      {loading ? <Loader/>:
      <>
      <div className="whiteBg mb-0">
        <Row>
          <Col lg="6">
            <div className="d-grid">
                <Text size="large" fontWeight="mediumbold" color="secondryColor" text={Consumer_data?.name||'-'} />
                <Text size="Small" fontWeight="regularbold" color="secondryColor" text={Consumer_data?.propertyAddress||'-'} />
            </div>
            <table className="w-100">
                <tr>
                  <td className="p-2">
                    <Text size="xSmall" fontWeight="regularbold" color="TaupeGrey" text={'Phone Number'} />
                    <Text size="Small" fontWeight="mediumbold" color="secondryColor" text={Consumer_data?.contactNumber||'-'} />
                  </td>
                </tr>
            </table>

          </Col>
        </Row>
    </div>    

      <ListingDataTable 
        title="Properties Listed"
        data={consumerPropertyData}
        columns={ columns }
        isLoading={ false }
        progressPending={propertyLoading}
        perPageOptions={ [ 4, 8, 12, 16, 20, 24, 28, 32, 36, 40 ] }
        paginationPerPage={ 4 }
        paginationRowsPerPageOptions={[4, 8, 12, 16,20, 24,28, 32, 36, 40]}
        className='finance-table'
      />

      <ListingDataTable
        title="Transactions"
        data={ consumerTransactionsData }
        columns={ transactionColumns }
        isLoading={ false }
        progressPending={transactionLoading}
        perPageOptions={ [ 4, 8, 12, 16, 20, 24, 28, 32, 36, 40 ] }
        paginationPerPage={ 4 }
        paginationRowsPerPageOptions={[4, 8, 12, 16,20, 24,28, 32, 36, 40]}
        className='finance-table'
      />
    </>
    }     
    </>
  );
};

const mapStateToProps = ({ 
    financeRefundRequestDetails }) => ({
    financeRefundRequestDetails
  });
  
  const actions = {
    getRefundRequestDetails
  };
  
  const withConnect = connect(
      mapStateToProps,
      actions,
  );
  
  export default compose(
      withConnect,
      memo,
  )(FinanceRefundRequest);
  

