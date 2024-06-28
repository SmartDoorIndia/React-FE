import React, { useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Text from '../../../shared/Text/Text';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Image from '../../../shared/Image/Image';
import Buttons from '../../../shared/Buttons/Buttons'
import ModalModule from '../../../shared/Modal/ModalModule'
import './SalesDashboard.scss';
import {
  getSocietyLeadsData,
  getSalesTeamData,
  getLeadsCount,
  assignLeadToUser,
  getSocietyLeadsCity,
  getSalesTeamCity,
  getAllCity
} from '../../../common/redux/actions';
import { Link, Route } from 'react-router-dom';
import { TableLoader } from '../../../common/helpers/Loader';
import DataTableComponent from '../../../shared/DataTable/DataTable';
import Pagination from '../../../shared/DataTable/Pagination';
import contentIcon from '../../../assets/images/content-ico.svg';
import { formateDate, handleStatusElement, ToolTip } from '../../../common/helpers/Utils';
import ListingDataTable from '../../../shared/DataTable/ListingDataTable';

const ProgressComponent = <TableLoader />

const SalesDashboard = (props) => {
  const { getLeadsCount,
    getAllCity,
    getSocietyLeadsData,
    getSalesTeamData,
    salesLeadsCount,
    salesLeadsDataTable,
    salesTeamData,
    // getSocietyLeadsCity,
    // getSocietyLeadsCityData,
    allCities,
    getSalesTeamCity,
    // getSalesTeamCityData 
  } = props;
  // const [sliceFrom, setSliceFrom] = useState(4)
  const [societyLeads_city, setsocietyLeads_city] = useState('');
  const [salesTeam_city, setsalesTeam_city] = useState('');

  // const PaginationComponent = (props) => (<Pagination {...props} PaginationActionButton={PaginationActionButton} />);
  const TeamTablePaginationComponent = (props) => (<Pagination {...props} PaginationActionButton={TeamTablePaginationActionButton} />);

  function handleUserAssignmet(leadId, userId) {
    if (leadId && userId) {
      assignLeadToUser({ leadId, userId })
        .then((res) => {
          if (res.data.status === 200) {
            getSocietyLeadsData({
              'city': societyLeads_city,
              'endDate': '',
              'id': '',
              'societyName': '',
              'startDate': '',
              'status': [],
              'records': '',
              'pageNumber': '',
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const salesTeamcolumns = [
    {
      name: 'Id',
      selector: row => row.id,
      center: true,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.name,
      center: true,
      cell: ({ name, imageUrl }) => (
        <div className="userName">
          <ToolTip position="top" style={{ width: '100%' }} name={name || ''}>
            <Text size="Small" color="secondryColor" text={name ? name.capitalizeWord() : '-'} />
          </ToolTip>
        </div>),
      maxWidth: '300px',
    },
    {
      name: 'Role',
      selector: row => row.position,
      center: true,
      cell: ({ userType }) => (
        <div className="userName">
          <ToolTip position="top" style={{ width: '100%' }} name={userType || ''}>
            <Text size="Small" color="secondryColor" text={userType ? userType.capitalizeWord() : '-'} />
          </ToolTip>
        </div>),
      maxWidth: '200px',
    },
    {
      name: 'City',
      selector: row => row.city,
      center: true,
      wrap:true,
    },
    {
      name: 'Lead Assigned',
      selector: row => row.leadAssigned,
      center: true,
      maxWidth: '150px',
    },
    {
      name: 'Lead Completed',
      selector: row => row.leadCompleted,
      sortable: true,
      center: true,
      maxWidth: '150px'
    },
    {
      name: 'Action',
      center: true,
      style: { 'max-width': '60px' },
      maxWidth: '60px',
      cell: (row) => (<div className="action">
        <ToolTip position="left" name="View Details">
          <span>
            <Link to={{
              pathname: '/admin/sales/user-details/',
              state: { userData: row, module: 'SALES' },
            }}>
              <Image name="editIcon" src={contentIcon} />
            </Link>
          </span>
        </ToolTip>
      </div>),
    },
  ];

  const columns = [
    {
      name: 'Id',
      selector: row => row.leadId,
      center: true,
      sortable: true,
    },
    {
      name: 'Date',
      selector: row => row.leadDate,
      sortable: true,
      center: true,
      maxWidth: '130px',
      cell: ({ leadDate }) => (<span>{formateDate(leadDate)}</span>),
    },
    {
      name: 'Source',
      selector: row => row.source,
      center: true,
      maxWidth: '60px',
    },
    {
      name: 'Society',
      selector: row => row.societyName,
      center: true,
      cell: ({ societyName }) => (<ToolTip position="top" style={{ width: '100%' }} name={societyName || ''}>
        <span className="elipsis-text"> {societyName || '-'}</span>
      </ToolTip>),
    },
    {
      name: 'City',
      selector: row => row.city,
      center: true,
    },
    {
      name: 'Assigned To',
      selector: row => row.assignTo,
      center: true,
      cell: ({ assignTo, assignToList, leadId, status }) => (
        status === 'PENDING' ?
          !assignTo ?
            <div className="w-100">
              <div className="assignTo">
                <Form.Group controlId="exampleForm.SelectCustom" className="w-100 display-flex">
                  <Form.Control as="select" className="w-100" onChange={(e) => handleUserAssignmet(leadId, e.target.value)}>
                    <option >Assign</option>
                    {
                      assignToList.map((data, index) =>
                        <option key={index} value={data.id}>{data.name}</option>,
                      )
                    }
                  </Form.Control>
                </Form.Group>
              </div>
            </div> :
            <Text size="Small" color="secondryColor" className="text-center" text={assignTo ? assignTo.capitalizeWord() : '-'} /> :
          <Text size="Small" color="secondryColor" className="text-center" text={assignTo ? assignTo.capitalizeWord() : '-'} />
      ),
    },
    {
      name: 'Status',
      selector: row => row.status,
      center: true,
      maxWidth: '200px',
      cell: ({ status }) => (handleStatusElement(status === 'COMPLETED' ? 'CONVERTED' : status)),
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
      </div>),
    },
  ];

  const PaginationActionButton = () => (
    <>
      <div className="d-flex justify-content-between tableBottom ml-auto">
        <Link to="/admin/sales/new-entry">
          <Buttons name="Add New Entry" varient="success" type="submit" size="Small" color="white" className="add-new-entry-btn" />
        </Link>
      </div>

      <div className="table-bottom ml-auto">
        <Link to="/admin/sales/society-leads" className="viewAll-btn">
          {salesLeadsDataTable?.data?.length ?
            <Text size="Small" fontWeight="mediumbold" color="primaryColor" text="View All" className="ml-2 d-flex" />
            : null}
        </Link>
      </div>

    </>
  );

  const TeamTablePaginationActionButton = () => (
    <div className="d-flex justify-content-center tableBottom">
      <Link to={{
        pathname: "/admin/user-management",
        state: { moduleName: 'Sales' }
      }}>
        <Buttons name="Manage Team" varient="primary" type="submit" size="Small" color="white" />
      </Link>
    </div>
  );

  useEffect(() => {
    getAllCity();
    getLeadsCount()
    getSocietyLeadsData({
      'city': societyLeads_city,
      'endDate': '',
      'id': '',
      'societyName': '',
      'startDate': '',
      'status': [],
      'records': 4,
      'pageNumber': 1,
    });
    getSalesTeamData({
      city: salesTeam_city,
      records: '',
      pageNumber: '',
    });
    // getSocietyLeadsCity()
    // getSalesTeamCity()
  }, [getLeadsCount,
    getSocietyLeadsData,
    getSalesTeamData,
    // getSocietyLeadsCity,
    getSalesTeamCity]);

  useEffect(() => {
    getSocietyLeadsData({
      'city': '',
      'endDate': '',
      'id': '',
      'societyName': '',
      'startDate': '',
      'status': [],
      'records': 4,
      'pageNumber': 1,
    });
  }, [societyLeads_city]);

  useEffect(() => {
    getSalesTeamData({
      city: salesTeam_city,
      records: '',
      pageNumber: '',
    });
  }, [salesTeam_city]);

  function onChangePage(e) { }

  const _filterReq = (value) => {
    getSocietyLeadsData({
      'endDate': '',
      'id': '',
      'societyName': '',
      'startDate': '',
      'status': [],
      'city': value, 'records': 4, 'pageNumber': 1,
    })
  }

  return (
    <>
      <Route
        path="/admin/sales/user-details"
        excat
        name="User Details"
        render={(props) => <ModalModule {...props} />}
      />
      <Route path="/admin/sales/user-details" name="User Details" component={ModalModule} />
      <div style={{height : '85vh', overflow:'auto'}}>

      <div className="cardBox cardTractions">
        <Card className="cardWidth">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Text size="medium" fontWeight="mediumbold" color="primaryColor" text={salesLeadsCount.data.totalLeadsCountFromApp} />
              <Text
                size="Small"
                fontWeight="smbold"
                color={salesLeadsCount.data.currentWeekLeadsCountFromApp.toString().includes('-') ? 'dangerColor' : 'successColor'}
                text={salesLeadsCount.data.currentWeekLeadsCountFromApp.toString().includes('-') ? salesLeadsCount.data.currentWeekLeadsCountFromApp : '+' + salesLeadsCount.data.currentWeekLeadsCountFromApp}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Leads From App" />
              <Text size="xSmall" fontWeight="smbold" color="secondryColor" text="Change This Week" />
            </div>
          </Card.Body>
        </Card>

        {/* <Card className="cardWidth">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Text size="medium" fontWeight="mediumbold" color="primaryColor" text={ salesLeadsCount.data.totalLeadsCountFromQRScan } />
              <Text
                size="Small"
                fontWeight="smbold"
                color={ salesLeadsCount.data.currentWeekleadsCountFromQRScan.toString().includes('-')?'dangerColor':'successColor' }
                text={ salesLeadsCount.data.currentWeekleadsCountFromQRScan.toString().includes('-')?salesLeadsCount.data.currentWeekleadsCountFromQRScan:'+'+salesLeadsCount.data.currentWeekleadsCountFromQRScan }
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Leads From Barcode Scan" />
              <Text size="xSmall" fontWeight="smbold" color="secondryColor" text="Change This Week" />
            </div>
          </Card.Body>
        </Card> */}

        <Card className="cardWidth">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Text size="medium" fontWeight="mediumbold" color="primaryColor" text={salesLeadsCount.data.totalLeadsCountFromManualEntry} />
              <Text
                size="Small"
                fontWeight="smbold"
                color={salesLeadsCount.data.currentWeekleadsCountFromManualEntry.toString().includes('-') ? 'dangerColor' : 'successColor'}
                text={salesLeadsCount.data.currentWeekleadsCountFromManualEntry.toString().includes('-') ? salesLeadsCount.data.currentWeekleadsCountFromManualEntry : '+' + salesLeadsCount.data.currentWeekleadsCountFromManualEntry}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Leads From Manual Entry" />
              <Text size="xSmall" fontWeight="smbold" color="secondryColor" text="Change This Week" />
            </div>
          </Card.Body>
        </Card>

        <Card className="cardWidth">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Text size="medium" fontWeight="mediumbold" color="primaryColor" text={salesLeadsCount.data.totalLeadsCountConverted} />
              <Text
                size="Small"
                fontWeight="smbold"
                color={salesLeadsCount.data.currentWeekleadsCountConverted.toString().includes('-') ? 'dangerColor' : 'successColor'}
                text={salesLeadsCount.data.currentWeekleadsCountConverted.toString().includes('-') ? salesLeadsCount.data.currentWeekleadsCountConverted : '+' + salesLeadsCount.data.currentWeekleadsCountConverted}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Leads Converted" />
              <Text size="xSmall" fontWeight="smbold" color="secondryColor" text="Change This Week" />
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* <div className = "mt-4">
        <Link to={ { pathname: '/builder/projects' } }>
          <Buttons name="Builder Property"
            varient="link"
            type="submit"
            size="Small"
            color="primaryColor"
            // onClick={()=>setSliceFrom(10)}
          />
        </Link>
      </div> */}

      <div className='salesSocietyLeadsTableWrapper'>
        <ListingDataTable
          title='Society Leads'
          data={salesLeadsDataTable.data.length ? salesLeadsDataTable.data.slice(0, 4) : []}
          columns={columns}
          isPaginationButton={true}
          // isLoading = { salesLeadsDataTable.data.length ? false : true }
          progressPending={salesLeadsDataTable.isLoading}
          PaginationButton={<PaginationActionButton />}
          filter
          filterCity={allCities.data.cities}
          handleFilterChange={_filterReq}
          pagination={false}
        />
      </div>

      <div className='salesSocietySalessteamTableWrapper'>
        <div className="tableBox">
          <div className="d-flex justify-content-between align-items-center tableHeading">
            <div>
              <Text size="regular" fontWeight="mediumbold" color="secondryColor" text="Society Sales Team" />
            </div>
            <div className="locationSelect">
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Control as="select" onChange={(e) => setsalesTeam_city(e.target.value)} value={salesTeam_city} >
                  <option value="">Select City</option>
                  {allCities?.data?.cities?.length > 0 ?
                    allCities?.data?.cities.map((c_value, indx) =>
                      <option key={indx} value={c_value}>{c_value}</option>) : null}
                </Form.Control>
              </Form.Group>
            </div>
          </div>
        </div>
        <div className='societysalesteamTableWrapper'>
          <DataTableComponent
            onChangePage={onChangePage}
            data={salesTeamData.data}
            columns={salesTeamcolumns}
            progressPending={salesTeamData.isLoading}
            paginationComponent={TeamTablePaginationComponent}
            paginationRowsPerPageOptions={[4, 8, 12, 16, 20, 24, 28, 32, 36, 40]}
            paginationPerPage={4}
            progressComponent={ProgressComponent}
          />
        </div>

        {salesTeamData.data.length ? null :
          <div className="d-flex justify-content-center">
            <TeamTablePaginationActionButton />
          </div>
        }
      </div>
      </div>
    </>
  )
}

const mapStateToProps = ({ salesLeadsDataTable,
  salesTeamData,
  salesLeadsCount,
  getSocietyLeadsCityData,
  allCities
  , getSalesTeamCityData }) => ({
    salesLeadsDataTable,
    salesTeamData,
    salesLeadsCount,
    getSocietyLeadsCityData,
    allCities,
    getSalesTeamCityData,
  });

const actions = {
  getAllCity,
  getSocietyLeadsData,
  getSalesTeamData,
  getLeadsCount,
  getSocietyLeadsCity,
  getSalesTeamCity,
};

const withConnect = connect(
  mapStateToProps,
  actions,
);

export default compose(
  withConnect,
  memo,
)(SalesDashboard);
