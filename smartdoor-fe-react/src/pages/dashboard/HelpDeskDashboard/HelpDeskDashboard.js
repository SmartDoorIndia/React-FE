/** @format */

import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Card from 'react-bootstrap/Card';
import Image from '../../../shared/Image/Image';
import Buttons from '../../../shared/Buttons/Buttons';
import ModalModule from '../../../shared/Modal/ModalModule';
import {
  getHelpDeskDashboardCount,
  getHelpDeskTeam,
  getHelpDeskPropertyLeads,
  getHelpDeskServiceRequest,
  getHelpDeskDashboardCity,
  getAllCity,
  // changeDepartmentAssignee
} from '../../../common/redux/actions';
import { Link, Route } from 'react-router-dom';
import Text from '../../../shared/Text/Text';
import ListingDataTable from '../../../shared/DataTable/ListingDataTable';
import {
  handleStatusElement,
  ToolTip,
  formateDate,
  dateWithFormate,
} from '../../../common/helpers/Utils';
import contentIcon from '../../../assets/images/content-ico.svg';
import locationIco from '../../../assets/svg/locationIcon.svg';
import './HelpDeskDashboard.scss';

const HelpDeskDashboard = (props) => {
  const {
    getHelpDeskDashboardCount,
    getHelpDeskTeam,
    getHelpDeskPropertyLeads,
    getHelpDeskServiceRequest,
    // getHelpDeskDashboardCity,
    getAllCity,
    // userAuthData,

    helpdeskDashboardCount,
    // helpdeskTeams,
    helpdeskPropertyLeads,
    helpdeskServiceReq,
    // helpdeskDashboardCity,
    allCities,
  } = props;

  useEffect(() => {
    getHelpDeskDashboardCount();
    // getHelpDeskDashboardCity();
    getAllCity();
    getHelpDeskPropertyLeads({ city: '', records: '', pageNumber: '',zipCode: ''});
    getHelpDeskServiceRequest({
      'status': [],
      'endDate': '',
      'city': '',
      'contactNumber': '',
      'ticketNumber': '',
      'startDate': '', 'records': '5', 'pageNumber': '1' });
    getHelpDeskTeam({ city: '', records: '', pageNumber: '' });
  }, []);

  const _filterPropertyLeads = (value) => {
    getHelpDeskPropertyLeads({ city: value, records: '', pageNumber: '' });
  };

  // const _filterHelpDeskTeam = (value) => {
  //   getHelpDeskTeam({ city: value, records: '', pageNumber: '' });
  // };

  const _filterServiceReq = (value) => {
    getHelpDeskServiceRequest({ city: value, records: '5', pageNumber: '1' });
  };

  // const handleChangeDepartmentAssignee = (requestId , team) =>{
  //   changeDepartmentAssignee({ serviceRequestId: requestId,
  //     teamName: team,
  //   }).then((res)=> {
  //     if(res.data.status === 200){
  //       getHelpDeskServiceRequest({ city: '', records: '5', pageNumber: '1' });
  //     }
  //   })
  //   .catch(err=> console.log(err))
  // }

  const ServiceRequestColumns = [
    {
      name: 'Id',
      selector: row => row.ticketNo,
      center: true,
      sortable: true,
      maxWidth: '100px !important',
    },
    {
      name: 'Date',
      selector: row => row.createdDate,
      center: true,
      sortable: true,
      cell: ({ createdDate, time })=>(<span>{`${ formateDate(createdDate) } | ${ dateWithFormate(createdDate, 'hh:mm a') || '-' }`}</span>),
    },
    {
      name: 'Request',
      selector: row => row.ticketName,
      center: true,
      cell: ({ ticketName }) => ( <ToolTip position="top" name={ ticketName|| '' }>
        <span className="cursor-pointer elipsis-text"> {ticketName || '-'} </span>
      </ToolTip> ),
    },
    {
      name: 'From',
      selector: row => row.requestedBy,
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
      selector: row => row.assignTo,
      center: true,
      maxWidth: '130px',
      cell: ({ id,teamName, teamNameList }) => (
        <Text size="Small" color="secondryColor" className="text-center" text={ teamName ? teamName : 'UNASSIGNED' } />   
    ),
    },
    {
      name: 'Status',
      selector: row => row.status,
      center: true,
      maxWidth: '120px',
      style: { 'white-space': 'nowrap', 'padding': '0 !important', 'max-width': '120px' },
      cell: ({ status })=>(handleStatusElement(status)),
    },
    {
      name: 'Action',
      center: true,
      maxWidth: '50px',
      cell: ({ id }) =>(
        <div className="action">
          <ToolTip position="left" name="View Details">
            <span>
              <Link to={ { pathname: `/admin/helpdesk/serviceRequest-details/${ id }` } } >
                <Image name="useraddIcon" src={ contentIcon } />
              </Link>
            </span>
          </ToolTip>
        </div>
      ),
    },
  ];

  return (
    <>
      <Route
        path="/admin/helpdesk/user-detail"
        excat
        render={ (props) => (
          <ModalModule
            { ...props }
            module={ 'HELPDESK' }
            tabName={ [ 'Leads', 'Service Requests' ] }
          />
        ) }
      />
      <div>

      <div className="cardBox">
        {/* <Card className="cardWidth">
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div className="align-items-center">
                <Text
                  size="medium"
                  fontWeight="mediumbold"
                  color="primaryColor"
                  text={ helpdeskDashboardCount.data.teamMembersCount }
                />
                <Text
                  size="xSmall"
                  fontWeight="smbold"
                  color="TaupeGrey"
                  text="Team Members"
                  className="mt-1"
                />
              </div>
              <div className="align-items-center d-flex card-group-align">
                <Image name="sort_icon" src={ personGroupIco } className="m-0" />
              </div>
            </div>
          </Card.Body>
        </Card> */}

        <Card className="cardWidth">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div className="align-items-center">
                <Text
                  size="medium"
                  fontWeight="mediumbold"
                  color="primaryColor"
                  text={ helpdeskDashboardCount.data.location }
                />
                <Text
                  size="xSmall"
                  fontWeight="smbold"
                  color="TaupeGrey"
                  text="Top Location"
                  className="mt-1"
                />
              </div>
              <div className="align-items-center d-flex card-group-align">
                <Image name="sort_icon" src={ locationIco } className="m-0" />
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card className="cardWidth">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Text size="medium" fontWeight="mediumbold" color="primaryColor" text={ helpdeskDashboardCount.data.customerQueries } />
              <Text
                size="Small"
                fontWeight="smbold"
                color={
                           helpdeskDashboardCount.data.customerQueriesThisWeek
                               .toString()
                               .includes('-') ?
                              'dangerColor' :
                              'successColor'
                }
                text={
                           helpdeskDashboardCount.data.customerQueriesThisWeek
                               .toString()
                               .includes('-') ?
                              helpdeskDashboardCount.data.customerQueriesThisWeek :
                              '+' + helpdeskDashboardCount.data.customerQueriesThisWeek
                }
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Customer Queries" />
              <Text size="xSmall" fontWeight="smbold" color="secondryColor" text="Change This Week" />
            </div>
          </Card.Body>
        </Card>

        <Card className="cardWidth">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Text size="medium" fontWeight="mediumbold" color="primaryColor" text={ helpdeskDashboardCount.data.customerResolvedQueries } />
              <Text
                size="Small"
                fontWeight="smbold"
                color={
                           helpdeskDashboardCount.data.customerResolvedQueriesThisWeek
                               .toString()
                               .includes('-') ?
                              'dangerColor' :
                              'successColor'
                }
                text={
                           helpdeskDashboardCount.data.customerResolvedQueriesThisWeek
                               .toString()
                               .includes('-') ?
                              helpdeskDashboardCount.data.customerResolvedQueriesThisWeek :
                              '+' + helpdeskDashboardCount.data.customerResolvedQueriesThisWeek
                }
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Queries Resolved" />
              <Text size="xSmall" fontWeight="smbold" color="secondryColor" text="Change This Week" />
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className='helpdeskPropertyleadsTableWrapper'>
        <ListingDataTable
          title="Property Leads"
          data={ helpdeskPropertyLeads.data }
          columns={ PropertyLeadsColumns }
          isLoading={ false }
          progressPending={helpdeskPropertyLeads.isLoading}
          PaginationComponent={ helpdeskPropertyLeads?.data?.length ? PaginationComponent : null }
          perPageOptions={ [ 4, 10, 20, 50 ] }
          paginationPerPage={ 4 }
          filter
          filterCity={ allCities.data.cities }
          handleFilterChange={ _filterPropertyLeads }
        />
      </div>
      <div className='helpdeskServicereqTableWrapper'>
        <ListingDataTable
          title="Service Requests"
          data={ helpdeskServiceReq.data.length ? helpdeskServiceReq.data.slice(0, 4) : [] }
          columns={ ServiceRequestColumns }
          isPaginationButton={ true }
          isLoading={ false }
          progressPending={helpdeskServiceReq.isLoading}
          PaginationButton={  helpdeskServiceReq?.data?.length ?  <ServiceReqPaginationActionButton /> : null }
          // filter
          filterCity={ allCities.data.cities }
          handleFilterChange={ _filterServiceReq }
          pagination={ false }
        />
      </div>
      </div>

      {/* <div className='helpdeskHelpdeskteamTableWrapper'>
        <ListingDataTable
          title="Helpdesk Team"
          data={ helpdeskTeams.data }
          columns={ TeamsColumns }
          isLoading={ false }
          progressPending={helpdeskTeams.isLoading}
          perPageOptions={ [  4, 8, 12, 16,20, 24,28, 32, 36, 40 ] }
          paginationPerPage={ 4 }
          PaginationComponent={ TeamTablePaginationComponent }
          PaginationButton={ <TeamTablePaginationActionButton /> }
          filter
          filterCity={ helpdeskDashboardCity.helpdeskTeamCity }
          handleFilterChange={ _filterHelpDeskTeam }
        />
      </div> */}
    </>
  );
};

const mapStateToProps = ({
  helpdeskDashboardCount,
  helpdeskTeams,
  helpdeskPropertyLeads,
  helpdeskServiceReq,
  helpdeskDashboardCity,
  allCities,
  userAuthData,
}) => ({
  helpdeskDashboardCount,
  helpdeskTeams,
  helpdeskPropertyLeads,
  helpdeskServiceReq,
  helpdeskDashboardCity,
  allCities,
  userAuthData,
});

const actions = {
  getHelpDeskDashboardCount,
  getHelpDeskTeam,
  getHelpDeskPropertyLeads,
  getHelpDeskServiceRequest,
  getHelpDeskDashboardCity,
  getAllCity
};

const withConnect = connect(mapStateToProps, actions);

const PaginationComponent = (props) => (<div className="table-bottom ml-auto">
<Link
   to={{
      pathname: "/admin/helpdesk/property-leads",
      state: { module: "Property Leads" },
   }}
   className="viewAll-btn"
>
   <Text
      size="Small"
      fontWeight="mediumbold"
      color="primaryColor"
      text="View All"
      className="ml-2 d-flex"
   />
</Link>
</div>);

const TeamTablePaginationActionButton = () => (
  <div className="d-flex justify-content-center tableBottom">
    <Link to={{
      pathname: "/admin/user-management",
      state : {moduleName: 'Help Desk'}
    }}>
      <Buttons name="Manage Team" varient="primary" type="submit" size="Small" color="white" />
    </Link>
  </div>
);

const ServiceReqPaginationActionButton = () => (
  <>
    <div className="table-bottom ml-auto">
      <Link to="/admin/helpdesk/serviceRequest" className="viewAll-btn">
        <Text
          size="Small"
          fontWeight="mediumbold"
          color="primaryColor"
          text="View All"
          className="ml-2 d-flex"
        />
      </Link>
    </div>
  </>
);

// const TeamTablePaginationComponent = (props) => (
//   <Pagination { ...props } PaginationActionButton={ TeamTablePaginationActionButton } />
// );
// const ServiceReqPaginationComponent = (props) => (
//   <Pagination { ...props } PaginationActionButton={ ServiceReqPaginationActionButton } />
// );



const PropertyLeadsColumns = [
  {
    name: 'Id',
    selector: row => row.leadId,
    sortable: true,
    center: true,
  },
  {
    name: 'Date',
    selector: row => row.leadDate,
    sortable: true,
    center: true,
    cell: ({ leadDate }) => <span>{formateDate(leadDate)}</span>,
  },
  {
    name: 'Lead For',
    selector: row => row.leadFor,
    center: true,
    minWidth: '80px',
  },
  {
    name: 'Contact Person',
    selector: row => row.contactPerson,
    center: true,
    minWidth: '140px',
    style: { 'text-align': 'center' },
    cell: ({ contactPerson }) => <span> {contactPerson || '-'} </span>,
  },
  {
    name: 'Phone No',
    selector: row => row.contactNumber,
    center: true,
    minWidth: '140px',
    cell: ({ contactNumber }) => <span> {contactNumber || '-'} </span>,
  },
  {
    name: 'Society',
    selector: row => row.societyName,
    center: true,
    maxWidth: '150px',
    minWidth: '140px',
    cell: ({ societyName }) => <span>{societyName || '-'}</span>,
  },
  {
    name: 'Location',
    selector: row => row.address,
    center: true,
    maxWidth: '150px',
    cell: ({ address }) => (
      <ToolTip position="top" style={{ width: "100%" }} name={address || ""}>
         <span className="cursor-pointer elipsis-text">
            {address?.substring(
               0,
               address.indexOf(",") !== -1 ? address.indexOf(",") : address.length
            )}
         </span>
      </ToolTip>
   ),
  },
  // {
  //   name: 'Assign To',
  //   selector: row => row.assignTo,
  //   center: true,
  //   cell: ({ assignTo }) => (
  //     <Text
  //       size="Small"
  //       className="text-align-center"
  //       color="secondryColor"
  //       text={ assignTo ? assignTo.capitalizeWord() : '-' }
  //     />
  //   ),
  // },
  {
    name: 'Recommended By ',
    selector: row => row.recommendedBy,
    center: true,
    minWidth: '160px',
    cell: ({ recommendedBy }) => (
      <Text
        size="Small"
        className="text-align-center"
        color="secondryColor"
        text={ recommendedBy ? recommendedBy.capitalizeWord() : '-' }
      />
    ),
  },
  {
    name: 'Action',
    center: true,
    maxWidth: '60px',
    cell: ({ leadId }) => (
      <div className="action">
        <ToolTip position="left" name="View Details">
          <span>
            <Link to={ { pathname: '/admin/helpdesk/lead-details',
              state: { leadId: leadId, module: "HELPDESK", },
            } }>
              <Image name="useraddIcon" src={ contentIcon } />
            </Link>
          </span>
        </ToolTip>
      </div>
    ),
  },
];

// const TeamsColumns = [
//   {
//     name: 'Id',
//     selector: row => row.id,
//     center: true,
//     sortable: true,
//   },
//   {
//     name: 'Name',
//     selector: row => row.name,
//     center: true,
//     cell: ({ name, imageUrl }) => (
//       <div className="userName">
//         <Text size="Small" color="secondryColor" text={ name ? name.capitalizeWord() : '-' } />
//       </div>
//     ),
//   },
//   {
//     name: 'Role',
//     selector: row => row.position,
//     center: true,
//   },
//   {
//     name: 'City',
//     selector: row => row.location,
//     center: true,
//     maxWidth: '150px',
//     style: { 'white-space': 'nowrap', 'padding': '0 !important', 'max-width': '150px' },
//     cell: ({ address, city }) => (
//       <span>
//         {' '}
//         {`${
//                address && city ?
//                   address.capitalizeWord() + ',' + city.capitalizeWord() :
//                   city ?
//                   city.capitalizeWord() :
//                   '-'
//         }`}{' '}
//       </span>
//     ),
//   },
//   {
//     name: 'Tasks',
//     selector: (row) =>  row.leadAssigned + row.leadCompleted,
//     sortable: true,
//     center: true,
//     maxWidth: '180px',
//     cell: ({ leadAssigned, leadCompleted }) => (<span> {leadAssigned + leadCompleted} </span>),
//   },
//   {
//     name: 'Action',
//     center: true,
//     style: { 'max-width': '60px' },
//     maxWidth: '60px',
//     cell: (row) => (
//       <div className="action">
//         <ToolTip position="left" name="View Details">
//           <span>
//             <Link to={ { pathname: '/admin/helpdesk/user-detail',
//               state: { userData: row, module: 'HELPDESK' },
//             } }>
//               <Image name="useraddIcon" src={ contentIcon } />
//             </Link>
//           </span>
//         </ToolTip>
//       </div>
//     ),
//   },
// ];

export default compose(withConnect, memo)(HelpDeskDashboard);
