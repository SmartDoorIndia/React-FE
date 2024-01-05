import React, { useRef, useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Image from '../../../../shared/Image/Image';
import Buttons from '../../../../shared/Buttons/Buttons'
import { useUserContext } from '../../../../common/helpers/Auth';
import { 
  getConsumerTransactionsData, 
  getBuybackRequests,
} from '../../../../common/redux/actions';
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import { Link, Route } from 'react-router-dom';
import Text from '../../../../shared/Text/Text';
import ListingDataTable from '../../../../shared/DataTable/ListingDataTable';
import Pagination from '../../../../shared/DataTable/Pagination';
import { handleStatusElement, ToolTip,setPrice, formateDate, showErrorToast, dateWithFormate } from '../../../../common/helpers/Utils';
import contentIcon from '../../../../assets/images/content-ico.svg';
import SearchInput from '../../../../shared/Inputs/SearchInput/SearchInput';
import './FinanceListingPage.scss';
import Form from 'react-bootstrap/Form';
import CONSTANTS_STATUS from '../../../../common/helpers/ConstantsStatus';

const FinanceListingPage = (props) => {
  const { 
    getConsumerTransactionsData,
    consumerTransactionsDataTable,
    getBuybackRequests,
    getBuybackRequestsData,
  } = props;

  const { auth: { userData } } = useUserContext();

  //state: for managing the status filter.
  const statusArr  = (props.tabName === "Consumer Transactions") ? CONSTANTS_STATUS.financeConsumerTransactionsStatusArr : CONSTANTS_STATUS.financeRefundRequestStatusArr;
  const [ statusSelected , setStatusSelected ] = useState('');

  //state: for managing the search filters 
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  useEffect(() => {
    if(props?.tabName === "Consumer Transactions" ){        
      getConsumerTransactionsData({ "pageNo": "",
      "pageSize": "",
      "userId": Number(userData.userid)
      });
    }
    if(props?.tabName === "Buyback Request" ){        
      getBuybackRequests({ "pageNo": "",
      "pageSize": "",
      });
    }
  }, [
    // getConsumerTransactionsData,
    // getBuybackRequests
  ]);

  const PaginationComponent = (props) => (<Pagination { ...props } />);
 
  const consumerTransactionsColumns = [
    {
      name: 'Id',
      selector: 'sno',
      center: true,
      sortable: true,
    },
    {
      name: 'Invoice ID',
      selector: 'invoiceId',
      center: true,
      sortable: true,
      maxWidth: '150px',
      // style: { 'text-overflow':'none !important' },
      cell: ({ invoiceId })=>(<span>{invoiceId||'-'}</span>)
    },
    {
      name: 'Date',
      selector: 'date',
      sortable: true,
      center: true,
      maxWidth: '120px',
      cell: ({ date })=>(<span>{formateDate(date)}</span>),
    },
    {
      name: 'Customer',
      selector: 'customer',
      center: true,
      maxWidth: '300px',
      cell: ({ customer })=>(<div>{customer||'-'}</div>),
      style: { 'text-overflow':'none' },
    },
    // {
    //   name: 'Source',
    //   selector: 'source',
    //   center: true,
    //   maxWidth: '30px',
    //   cell: ({ source })=>(<span>{source||'-'}</span>)
    // },
    // {
    //   name: 'Plan Purchased',
    //   selector: 'planPurchased',
    //   center: true,
    //   maxWidth: '30px',
    //   cell: ({ planPurchased })=>(<span>{planPurchased||'-'}</span>)
    // },
    {
      name: 'Type',
      selector: 'type',
      center: true,
      maxWidth: '50px',
      cell: ({ type })=>( <ToolTip position="left" name={type}>
          <span className="cursor-pointer elipsis-text">{type}</span>
        </ToolTip>),
    },
    {
      name: 'Status',
      selector: 'status',
      center: true,
      maxWidth: '200px',
      cell: ({ status })=>(handleStatusElement(status.toUpperCase() )),
    },
    {
      name: 'Amount', 
      selector: 'amount',
      center: true,
      maxWidth: '30px',
      cell: ({ amount })=>(<span>{setPrice(amount)}</span>),
    },
    {
      name: 'Action',
      center: true,
      maxWidth: '60px',
      cell: ({ customerId, tranctionId }) =>( <div className="action">
        <ToolTip position="left" name="View Details">
          <span>
            <Link to={ {
              pathname: `/admin/finance/refundRequest/${customerId}`,
              state: { transactionId: tranctionId },} }
              >
              <Image name="editIcon" src={ contentIcon } />
            </Link>
          </span>
        </ToolTip>
        {
          /* status === "COMPLETED" ?
                                  (   <span>
                                          <Image name="useraddIcon" src={useraddIcon} />
                                      </span>)
                                  : null*/
        }
      </div>
      ),
    },
  
  ];

  const refundRequestListColumns = [
    {
      name: 'Id',
      selector: 'buybackRequestId',
      center: true,
      sortable: true,
      cell: ({ buybackRequestId })=>(<span>{buybackRequestId}</span>),
    },
    {
      name: 'Date',
      selector: 'date',
      sortable: true,
      center: true,
      cell: ({ date })=>(<span>{formateDate(date)}</span>),
      maxWidth: '150px'
    },
    // {
    //   name: 'Source',
    //   selector: 'source',
    //   center: true,
    //   sortable: false,
    //   // maxWidth: '100px',
    //   cell: ({ source })=>(<div>{source||'-'}</div>),
    //   style: { 'text-overflow':'none' },
      
    // },
    {
      name: 'From',
      selector: 'from',
      center: true,
      cell: ({ from })=>(<span>{from||'-'}</span>),
      // maxWidth: '300px',
    },
    {
      name: 'Property ID',
      selector: 'propertyId',
      center: true,
      cell: ({ propertyId })=>(<span>{propertyId||'-'}</span>),
      // maxWidth: '300px',
    },
    {
      name: 'Phone No',
      selector: 'phoneNo',
      center: true,
    },
    {
      name: 'Status',
      center: true,
      selector: (row) => handleStatusElement(row['status']),
    },
    {
      name: 'Action',
      center: true,
      maxWidth: '60px',
      cell: ({ userId, buybackRequestId }) =>( <div className="action">
        <ToolTip position="left" name="View Details">
  
          <span>
          <Link to={ { pathname: `/admin/finance/refundRequest-details/${buybackRequestId}`,
            } }>
              <Image name="editIcon" src={ contentIcon } />
            </Link>
          </span>
        </ToolTip>
      </div>
      ),
    },
  
  ];

  const showData = (status_value) => {
      let status = status_value || statusSelected;
      let filteredItems = [];
      if(props.tabName === "Consumer Transactions" ){          filteredItems =  consumerTransactionsDataTable?.data?.consumerResp?.length ?
        consumerTransactionsDataTable?.data?.consumerResp?.filter(item => { 
            return  item?.sno == filterText 
            || item?.invoiceId === filterText 
            || item?.customer?.toLowerCase().includes(filterText.toLowerCase())
            || item?.type?.toLowerCase().includes(filterText.toLowerCase())
            || item?.status?.toLowerCase().includes(filterText.toLowerCase())
            }):[]
          if(status && filteredItems.length){
            filteredItems = filteredItems.filter(item => { 
              return  item?.status.toUpperCase() == status.toUpperCase();
            })
          } 
         return filteredItems;
        // return consumerTransactionsDataTable?.data?.consumerResp; 
      }
      if(props?.tabName === "Buyback Request" ){ 
      filteredItems =  getBuybackRequestsData.data.length ?
      getBuybackRequestsData.data.filter(item => { 
            return  item?.buybackRequestId == filterText ||
              item?.propertyId == filterText 
             || item?.from?.toLowerCase().includes(filterText.toLowerCase())
             || item?.phoneNo?.includes(filterText)
            // || item?.city?.toLowerCase().includes(filterText.toLowerCase())
            // || item?.propertySubType?.toLowerCase().includes(filterText.toLowerCase())
            }):[]
        if(status && filteredItems.length){
          filteredItems = filteredItems.filter(item => { 
            return  item?.status.toUpperCase() == status.toUpperCase();
          })
        } 
         return filteredItems;
      // return getBuybackRequestsData?.data;
      }
      
  }

  const showColumns = () => {
      if(props?.tabName === "Consumer Transactions" ){
          return consumerTransactionsColumns;
      }
      if(props?.tabName === "Buyback Request" ){ 
          return refundRequestListColumns;
      }
  }

  const subHeaderComponentMemo = React.useMemo(() => {
  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText('');
    }
  };
  return (
    <SearchInput onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} placeholder={"Search here"}/>
  );
  }, [filterText, resetPaginationToggle]);

  const _filterStatus = (status_value) => {
    setStatusSelected(status_value);
    showData(status_value)
  }
   
  return (  
    <div className="tableBox bg-white">
    <div className="d-flex justify-content-between align-items-center tableHeading">
       <div>
          <Text
             size="regular"
             fontWeight="mediumbold"
             color="secondryColor"
             text={props?.tabName==="Consumer Transactions" ?props?.tabName:"Refund Request"}
          />
       </div>
       <div className="locationSelect d-flex">
       {subHeaderComponentMemo}
       {statusArr.length?
        <Form.Group controlId="exampleForm.SelectCustom">
              {/* <Form.Label>City:</Form.Label> */}
              <Form.Control
                  as="select"
                  value={statusSelected}
                  onChange={(e) => {
                      _filterStatus(e.target.value);                   
                  }}
              >
                  <option value="">Select Status</option>
                  {
                  statusArr.length
                    ? statusArr.map((_value, index) => (
                          <option key={index} value={_value}>
                            {_value}
                          </option>
                      ))
                    : null}
              </Form.Control>
            </Form.Group>
            :''}
       </div>
    </div>
       <DataTableComponent       
         data={showData()}
         columns={showColumns()}
         progressPending={props.tabName === "Consumer Transactions"?consumerTransactionsDataTable.isLoading :getBuybackRequestsData.isLoading}
         isLoading={ props.tabName === "Consumer Transactions"?consumerTransactionsDataTable?.data?.consumerResp?.length ? false : true :getBuybackRequestsData?.data.length? false : true }
         paginationRowsPerPageOptions={ [8, 16, 24, 32, 40, 48, 56, 64, 72, 80 ] }
         paginationPerPage={ 8 }
         perPageOptions={ [  8,  16, 24, 32, 40, 48, 56, 64, 72, 80 ] }
       />
 </div>

  );
}

// export default ServiceRequest;
const mapStateToProps = ({ 
    consumerTransactionsDataTable,
    getBuybackRequestsData,
}) => ({
  consumerTransactionsDataTable,
  getBuybackRequestsData,
});

const actions = {
  getConsumerTransactionsData,
  getBuybackRequests,
};

const withConnect = connect(
    mapStateToProps,
    actions,
);

export default compose(
    withConnect,
    memo,
)(FinanceListingPage);
