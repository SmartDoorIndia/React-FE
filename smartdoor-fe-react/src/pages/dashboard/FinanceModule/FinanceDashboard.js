import React, { useRef, useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Text from '../../../shared/Text/Text';
import Card from 'react-bootstrap/Card'
import Image from '../../../shared/Image/Image';
import Buttons from '../../../shared/Buttons/Buttons'
import userImage from '../../../assets/svg/avatar_sml.svg';
import useraddIcon from '../../../assets/images/useradd-icon.svg';
import editIcon from '../../../assets/images/edit-icon.svg';
import ModalModule from '../../../shared/Modal/ModalModule'
import './FinanceDashboard.scss';
import {
  getSocietyLeadsData,
  getSalesTeamData,
  getLeadsCount,
  assignLeadToUser,
  getSocietyLeadsCity,
  getSalesTeamCity,
  getConsumerTransactionsData,
  getRefundRequestListData,
  getPayablePartnerCommisionsListData,
  getAllFinanceTeamsData,
  getFinanceDashboardCount,
  getAllFinanceTeamsCity,
  getBuybackRequests
} from '../../../common/redux/actions';
import { Link, Route } from 'react-router-dom';
import Header from '../../../shared/Header/Header';
import Loader, { TableLoader } from '../../../common/helpers/Loader';
import DataTableComponent from '../../../shared/DataTable/DataTable';
import Pagination from '../../../shared/DataTable/Pagination';
import contentIcon from '../../../assets/images/content-ico.svg';
import sortIocn from '../../../assets/svg/sort-icon.svg';
import { formateDate, handleStatusElement, setPrice, ToolTip } from '../../../common/helpers/Utils';
import ListingDataTable from '../../../shared/DataTable/ListingDataTable';
import { useUserContext } from '../../../common/helpers/Auth';

const consumerTransactionsColumns = [
  {
    name: 'Id',
    selector: row => row.sno,
    center: true,
    sortable: true,
  },
  {
    name: 'Invoice ID',
    selector: row => row.invoiceId,
    center: true,
    sortable: true,
    maxWidth: '150px',
    // style: { 'text-overflow':'none !important' },
    cell: ({ invoiceId }) => (<span>{invoiceId || '-'}</span>)
  },
  {
    name: 'Date',
    selector: row => row.date,
    sortable: true,
    center: true,
    maxWidth: '120px',
    cell: ({ date }) => (<span>{formateDate(date)}</span>),
  },
  {
    name: 'Customer',
    selector: row => row.customer,
    center: true,
    maxWidth: '300px',
    cell: ({ customer }) => (
      <ToolTip position="top" style={{ width: '100%' }} name={customer || ''}>
        <Text size="Small" color="secondryColor elipsis-text" text={customer ? customer.capitalizeWord() : "-"} />
      </ToolTip>

    ),
    style: { 'text-overflow': 'none' },
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
    selector: row => row.type,
    center: true,
    maxWidth: '50px'
  },
  {
    name: 'Status',
    selector: row => row.status,
    center: true,
    maxWidth: '200px',
    cell: ({ status }) => (handleStatusElement(status.toUpperCase())),
  },
  {
    name: 'Amount',
    selector: row => row.amount,
    center: true,
    maxWidth: '30px',
    cell: ({ amount }) => (<span>{setPrice(amount)}</span>),
  },
  {
    name: 'Action',
    center: true,
    maxWidth: '60px',
    cell: ({ customerId, tranctionId }) => (<div className="action">
      <ToolTip position="left" name="View Details">
        <span>
          <Link to={{
            pathname: `/admin/finance/refundRequest/${customerId}`,
            state: { transactionId: tranctionId },
          }}
          >
            <Image name="editIcon" src={contentIcon} />
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
    selector: row => row.buybackRequestId,
    center: true,
    sortable: true,
    cell: ({ buybackRequestId }) => (<span>{buybackRequestId}</span>),
  },
  {
    name: 'Date',
    selector: row => row.date,
    sortable: true,
    center: true,
    cell: ({ date }) => (<span>{formateDate(date)}</span>),
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
    selector: row => row.from,
    center: true,
    cell: ({ from }) => (
      // <span>{from||'-'}</span>
      <ToolTip position="top" style={{ width: '100%' }} name={from || ''}>
        <Text size="Small" color="secondryColor elipsis-text" text={from ? from.capitalizeWord() : "-"} />
      </ToolTip>
    ),
    // maxWidth: '300px',
  },
  {
    name: 'Property ID',
    selector: row => row.propertyId,
    center: true,
    cell: ({ propertyId }) => (<span>{propertyId || '-'}</span>),
    // maxWidth: '300px',
  },
  {
    name: 'Phone No',
    selector: row => row.phoneNo,
    center: true,
  },
  {
    name: 'Status',
    selector: row => row.status,
    center: true,
    cell: ({ status }) => (<span>{handleStatusElement(status)}</span>),
  },

  {
    name: 'Action',
    center: true,
    maxWidth: '60px',
    cell: ({ userId, buybackRequestId }) => (<div className="action">
      <ToolTip position="left" name="View Details">

        <span>
          <Link to={{
            pathname: `/admin/finance/refundRequest-details/${buybackRequestId}`,
            state: { buybackRequestId: buybackRequestId }
          }}>
            <Image name="editIcon" src={contentIcon} />
          </Link>
        </span>
      </ToolTip>
    </div>
    ),
  },

];

const payablePartnerCommisionsColumns = [
  {
    name: 'Id',
    selector: row => row.id,
    center: true,
    sortable: true,
  },
  {
    name: 'Date',
    selector: row => row.date,
    sortable: true,
    center: true,
    cell: ({ date }) => (<span>{formateDate(date)}</span>),
    maxWidth: '150px'
  },
  {
    name: 'Society/Realtor',
    selector: row => row.societyOrRealtor,
    center: true,
    sortable: false,
    // maxWidth: '100px'
  },

  {
    name: 'Name',
    selector: row => row.name,
    center: true,
    // maxWidth: '300px',
  },
  {
    name: 'Amount',
    selector: row => row.amount,
    center: true,
    maxWidth: '100px',
    cell: ({ amount }) => (<span>{setPrice(amount)}</span>),
  },
  {
    name: 'Action',
    center: true,
    maxWidth: '200px',
    cell: ({ leadId, status }) => (<div className="action">
      <Buttons name="Mark Done" varient="primary" type="submit" size="Small" color="white" />
    </div>
    ),
  },

];

const financeTeamColumns = [
  {
    name: 'Id',
    selector: row => row.id,
    center: true,
    sortable: true,
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
    center: true,
  },
  {
    name: 'Role',
    selector: row => row.position,
    center: true,
    sortable: false,
    // maxWidth: '100px'
  },

  {
    name: 'Tasks',
    selector: row => row.userTask,
    center: true,
    // maxWidth: '300px',
  },
  {
    name: 'Action',
    center: true,
    maxWidth: '60px',
    cell: ({ leadId, status }) => (<div className="action">
      <ToolTip position="left" name="View Details">

        <span>
          <Link to={{
            pathname: '/admin/sales/lead-details',
            state: { leadId: leadId },
          }}>
            <Image name="editIcon" src={contentIcon} />
          </Link>
        </span>
      </ToolTip>
    </div>
    ),
  },

];

const PaginationActionButton = () => (
  <>
    <div className="tableBottom ml-auto">
      <Link to={{
        pathname: "/admin/finance/transactions",
        state: { module: "Consumer Transactions" },
      }}
        className="viewAll removeUnderline">

        <Text size="Small" fontWeight="mediumbold" color="primaryColor" text="View All" className="ml-2 d-flex" />

      </Link>
    </div>
  </>
);

const FinanceTeamPaginationActionButton = () => (
  <>
    <div className="d-flex justify-content-center tableBottom align-items-center finance-action-btn">
      <Link to={{
        pathname: "/admin/sales/new-entry",
        state: { moduleName: 'Finance' }
      }}>
        <Buttons name="Manage Team" varient="primary" type="submit" size="Small" color="white" />
      </Link>
      { /* <Buttons name="View All" varient="link" type="submit" size="Small" color="primaryColor" /> */}
    </div>
    <div className="tableBottom ml-auto">
      <Link to="/admin/finance/refundRequest" className="viewAll removeUnderline">
        <ToolTip position="left" name="Under development">
          <Text size="Small" fontWeight="mediumbold" color="primaryColor" text="View All" className="ml-2 d-flex" />
        </ToolTip>
      </Link>
    </div>
  </>
);

//PaginationRefundRequestActionButton
const PaginationRefundRequestActionButton = () => (
  <>
    <div className="tableBottom ml-auto">
      <Link to={{
        pathname: "/admin/finance/buyback-request",
        state: { module: "Buyback Request" },
      }} className="viewAll removeUnderline">

        <Text size="Small" fontWeight="mediumbold" color="primaryColor" text="View All" className="ml-2 d-flex" />
      </Link>
    </div>
  </>
);

const TeamTablePaginationActionButton = () => (
  <div className="d-flex justify-content-center tableBottom">
    <Link to="/admin/user-management/add-new-member"><Buttons name="Add New Entry" varient="primary" type="submit" size="Small" color="white" /></Link>
  </div>
);

const PaginationComponent = (props) => (<Pagination {...props} PaginationActionButton={PaginationActionButton} />);
const FinanceTeamPaginationComponent = (props) => (<Pagination {...props} PaginationActionButton={FinanceTeamPaginationActionButton} />);

const ProgressComponent = <TableLoader />

const FinanceDashboard = (props) => {
  const {
    getSocietyLeadsCityData,
    getFinanceDashboardCount,
    financeCount,
    getConsumerTransactionsData,
    consumerTransactionsDataTable,
    getBuybackRequests,
    getBuybackRequestsData,
    getRefundRequestListData,
    getPayablePartnerCommisionsListData,
    getAllFinanceTeamsData,
    getAllFinanceTeamsCity,
  } = props;
  const [sliceFrom, setSliceFrom] = useState(4)
  const [societyLeads_city, setsocietyLeads_city] = useState('');
  const [salesTeam_city, setsalesTeam_city] = useState('');
  const [financeTeam_city, setfinanceTeam_city] = useState('');
  const [loaderConstumerTransaction, setLoaderConstumerTransaction] = useState(true)

  const { auth: { userData } } = useUserContext();
  function onChangePage(e) { }

  useEffect(() => {
    getFinanceDashboardCount();
    getConsumerTransactionsData({
      "pageNo": 1,
      "pageSize": 5,
      "userId": Number(userData.userid)
    })
      .then((response) => {
        if (response.data) {
          if (response.data.resourceData) setLoaderConstumerTransaction(false);
        }
      })
      .catch((error) => {
        setLoaderConstumerTransaction(false);
        console.log('error', error);
      });
    getBuybackRequests({
      "pageNo": 1,
      "pageSize": 5,
      // "userId": Number(userData.userid)
    });
    getRefundRequestListData({
      "pageNo": '',
      "pageSize": '',
      "userId": Number(userData.userid)
    });
    getPayablePartnerCommisionsListData({
      city: 'Pune',
      records: '',
      pageNumber: '',
    })
    getAllFinanceTeamsData({
      city: financeTeam_city,
      records: '',
      pageNumber: '',
    })
    getAllFinanceTeamsCity()
  }, [
    getFinanceDashboardCount,
    getConsumerTransactionsData,
    getRefundRequestListData,
    getPayablePartnerCommisionsListData,
    getAllFinanceTeamsData,
    getAllFinanceTeamsCity,
    getBuybackRequests
  ]);

  useEffect(() => {
    getAllFinanceTeamsData({
      city: financeTeam_city,
      records: '',
      pageNumber: '',
    })
  }, [financeTeam_city]);

  const _filterReq = (value) => {
    getAllFinanceTeamsData({
      city: value,
      records: '',
      pageNumber: '',
    })
  }

  return (
    <>
      {/* <ModalModule />*/}
      <Route
        path="/admin/sales/user-details"
        excat
        name="User Details"
        render={(props) => <ModalModule {...props} />}
      />
      <Route path="/admin/sales/user-details" name="User Details" component={ModalModule} />

      <div style={{height : '35rem', overflow:'auto'}}>

      <div className="cardBox cardTractions">
        {/* <Card className="cardWidth">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Text size="medium" fontWeight="mediumbold" color="primaryColor" text={ financeCount.data.totalRevenueCount } />
              <Text
                size="Small"
                fontWeight="smbold"
                color={ financeCount?.data?.currentWeekRevenueCount.toString().includes('-') ? 'dangerColor' : 'successColor' }
                text={ financeCount?.data?.currentWeekRevenueCount.toString().includes('-') ? financeCount.data.currentWeekRevenueCount : '+'+financeCount.data.currentWeekRevenueCount }
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Total Revenue" />
              <Text size="xSmall" fontWeight="smbold" color="secondryColor" text="Change This Week" />
            </div>
          </Card.Body>
        </Card> */}

        <Card className="cardWidth">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Text size="medium" fontWeight="mediumbold" color="primaryColor" text={setPrice(financeCount?.data?.totalCostCount)} />
              <Text
                size="Small"
                fontWeight="smbold"
                color={financeCount.data.currentWeekCostCount.toString().includes('-') ? 'dangerColor' : 'successColor'}
                text={financeCount.data.currentWeekCostCount.toString().includes('-') ? financeCount.data.currentWeekCostCount : '+' + financeCount.data.currentWeekCostCount}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Total Cost" />
              <Text size="xSmall" fontWeight="smbold" color="secondryColor" text="Change This Week" />
            </div>
          </Card.Body>
        </Card>

        <Card className="cardWidth">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Text size="medium" fontWeight="mediumbold" color="primaryColor" text={financeCount?.data?.totalTransactionCount} />
              <Text
                size="Small"
                fontWeight="smbold"
                color={financeCount?.data?.currentWeekTransactionCount?.toString().includes('-') ? 'dangerColor' : 'successColor'}
                text={financeCount?.data?.currentWeekTransactionCount?.toString().includes('-') ? financeCount?.data?.currentWeekTransactionCount : '+' + financeCount?.data?.currentWeekTransactionCount}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Total Transactions" />
              <Text size="xSmall" fontWeight="smbold" color="secondryColor" text="Change This Week" />
            </div>
          </Card.Body>
        </Card>

        <Card className="cardWidth">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Text size="medium" fontWeight="mediumbold" color="primaryColor" text={financeCount?.data?.buybackCount
              } />
              <Text
                size="Small"
                fontWeight="smbold"
                color={financeCount?.data?.currentWeekBuybackCount?.toString().includes('-') ? 'dangerColor' : 'successColor'}
                text={financeCount?.data?.currentWeekBuybackCount?.toString().includes('-') ? financeCount?.data?.currentWeekBuybackCount : '+' + financeCount?.data?.currentWeekBuybackCount}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Refund Requests" />
              <Text size="xSmall" fontWeight="smbold" color="secondryColor" text="Change This Week" />
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className='financeConsumertransactionsTableWrap'>
        <ListingDataTable
          title='Consumer Transactions'
          data={consumerTransactionsDataTable?.data?.consumerResp?.length ? consumerTransactionsDataTable?.data?.consumerResp?.slice(0, 5) : []}
          columns={consumerTransactionsColumns}
          isPaginationButton={true}
          progressPending={loaderConstumerTransaction}
          PaginationButton={consumerTransactionsDataTable?.data?.consumerResp?.length ? <PaginationActionButton /> : null}
          // filter
          // filterCity={ getSocietyLeadsCityData.data }
          // handleFilterChange={ _filterReq }
          pagination={false}
        />
      </div>

      <div className='financeBuybackrequestTableWrap'>
        <ListingDataTable
          title='Refund Requests'
          data={getBuybackRequestsData?.data?.length ? getBuybackRequestsData?.data?.slice(0, 5) : []}
          columns={refundRequestListColumns}
          isPaginationButton={true}
          isLoading={false}
          PaginationButton={getBuybackRequestsData?.data?.length ? <PaginationRefundRequestActionButton /> : null}
          // filter
          filterCity={getSocietyLeadsCityData.data}
          handleFilterChange={_filterReq}
          pagination={false}
        />
      </div>
      </div>

      {/* <ListingDataTable
        title = 'Refund Request'
        data = { refundRequestsDataTable?.data?.refundRequestResp?.length ? refundRequestsDataTable?.data?.refundRequestResp?.slice(0, 5) : [] }
        columns = { refundRequestListColumns }
        isPaginationButton = { true }
        isLoading = { false }
        PaginationButton = { <PaginationRefundRequestActionButton /> }
        filter
        filterCity={ getSocietyLeadsCityData.data }
        handleFilterChange={ _filterReq }
        pagination={ false }
      /> */}

      {/* <ListingDataTable
        title = 'Payable Partner Commisions'
        data = { payablePartnerCommisionDataTable?.data?.length ? payablePartnerCommisionDataTable?.data?.slice(0, 5) : [] }
        columns = {payablePartnerCommisionsColumns  }
        isPaginationButton = { true }
        isLoading = { false }
        PaginationButton = { <PaginationActionButton /> }
        filter
        filterCity={ getSocietyLeadsCityData.data }
        handleFilterChange={ _filterReq }
        pagination={ false }
      /> */}

      {/* <ListingDataTable
        title = 'Finance Team'
        data = { financeTeamDataTable?.data?.length ? financeTeamDataTable?.data?.slice(0, 5) : [] }
        columns = {financeTeamColumns  }
        isPaginationButton = { true }
        isLoading = { false }
        PaginationButton = { <FinanceTeamPaginationActionButton /> }
        filter
        filterCity={ getAllFinanceTeamsCityData?.data}
        handleFilterChange={ _filterReq }
        pagination={ false }
      /> */}
    </>
  )
}

const mapStateToProps = ({
  consumerTransactionsDataTable,
  refundRequestsDataTable,
  payablePartnerCommisionDataTable,
  financeTeamDataTable,
  financeCount,
  getAllFinanceTeamsCityData,
  salesLeadsDataTable,
  salesTeamData,
  salesLeadsCount,
  getBuybackRequestsData,
  getSocietyLeadsCityData
  , getSalesTeamCityData }) => ({
    consumerTransactionsDataTable,
    refundRequestsDataTable,
    financeCount,
    getAllFinanceTeamsCityData,
    salesLeadsDataTable,
    payablePartnerCommisionDataTable,
    financeTeamDataTable,
    salesTeamData,
    salesLeadsCount,
    getSocietyLeadsCityData,
    getSalesTeamCityData,
    getBuybackRequestsData,
  });

const actions = {
  getConsumerTransactionsData,
  getRefundRequestListData,
  getPayablePartnerCommisionsListData,
  getAllFinanceTeamsData,
  getFinanceDashboardCount,
  getAllFinanceTeamsCity,
  getSocietyLeadsData,
  getSalesTeamData,
  getLeadsCount,
  getSocietyLeadsCity,
  getSalesTeamCity,
  getBuybackRequests,
};

const withConnect = connect(
  mapStateToProps,
  actions,
);

export default compose(
  withConnect,
  memo,
)(FinanceDashboard);
