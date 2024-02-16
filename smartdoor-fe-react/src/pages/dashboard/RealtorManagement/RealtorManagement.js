/** @format */

import React, { useEffect, useState } from 'react';
import Image from '../../../shared/Image/Image';
import Text from '../../../shared/Text/Text';
import { Link, useParams } from 'react-router-dom';
import { getAllRealtors, toggleRealtorAdvisorStatus, getLocationByCity, getAllCity } from '../../../common/redux/actions';
import { connect } from 'react-redux';
import { formateDate, ToolTip, handleStatusElement, getLocationStr } from '../../../common/helpers/Utils';
import actionIcon from '../../../assets/images/action-icon.svg';
import blockIconActive from '../../../assets/svg/dismiss-icon-active.svg';
import blockIcon from '../../../assets/images/dismiss-icon.svg';
import ConfirmationModal from '../../../shared/Modal/ConfirmationModal/ConfirmationModal';
import Form from 'react-bootstrap/Form';
import DataTableComponent from "../../../shared/DataTable/DataTable";
import { TableLoader } from "../../../common/helpers/Loader";
import SearchInput from '../../../shared/Inputs/SearchInput/SearchInput';
import { useUserContext } from '../../../common/helpers/Auth';
import CONSTANTS_STATUS from '../../../common/helpers/ConstantsStatus';
import './RealtorRatings/RealtorRatings.scss';

const RealtorManagement = (props) => {
  const { advisorId } = useParams();
  const {  getAllRealtors, getAllRealtorsData, getAllCity, allRealtorCities, allCities, getLocationByCity} = props;
  
  const [ show, setShow ] = useState(false);
  const [ blockData, setBlockData ] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //state: for managing the status filter.
  const statusArr  =  CONSTANTS_STATUS.realtorStatusArr ;
  const [ statusSelected , setStatusSelected ] = useState('');

  //state to handle City and Location filter
  const [ city, setCity ] = useState('');
  const [location, setLocation] = useState('')
  const [locationsData, setLocationsData ] = useState([]);
  const [zipCode, setzipCode] = useState('');

  //state to handle search filter component
  const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  const { auth: { userData } } = useUserContext();

  const handleRealtorStatus = (advisorId, status)=> {
    toggleRealtorAdvisorStatus({ advisorId , status, userId:Number(userData.userid) })
        .then((data)=>{
          getAllRealtors({ page: '', size: '', city:'',zipCode: ''  });
        })
        .catch((error)=>{
          console.log('')
        })
    handleClose();
  }

 

  useEffect(() => {
    getAllCity();
    getAllRealtors({ page: '', size: '', city:'',zipCode: ''  });
  }, [ getAllRealtors , getAllCity]);

  console.log("getAllRealtors:", getAllRealtorsData);


  const realtorColumns = [
    {
      name: 'Id',
      selector: 'id',
      center: true,
      sortable: true,
    },

    {
      name: 'Joined On',
      selector: 'dateOfRegistration',
      sortable: true,
      center: true,
      maxWidth: '140px',
      cell: ({ dateOfRegistration })=>(
        <span>{formateDate(dateOfRegistration)}</span>
      ),
    },
    {
      name: 'Name ',
      selector: 'name',
      center: true,
      minWidth: '200px',
      cell: ({ name }) => (
        <ToolTip position="top" style={{ width: '100%' }} name={name || ''}>
          <Text size="Small" color="secondryColor" className="elipsis-text" text={ name ? name.capitalizeWord() : '-' } />
        </ToolTip>
      ),

    },
    {
      name: 'Location',
      selector: 'dealInArea',
      center: true,
      wrap:true,
      minWidth: '170px',
      cell: (row) => ( <ToolTip
        position="top"
        style={{ width: "100%" }}
        name={ row.dealInArea.length ? `${getLocationStr(row.dealInArea)}` : '-'}>
        <span className="cursor-pointer elipsis-text">{row.dealInArea.length ? row.dealInArea.length > 1 ? `${row.dealInArea[0].location}...`: `${row.dealInArea[0].location}` : '-'}</span>
      </ToolTip>)
    },
    {
      name: 'City',
      selector: 'dealInCity',
      center: true,
      maxWidth: '80px',
      cell: ({ dealInCity }) => (<span>{dealInCity||'-'}</span>),
    },
    {
      name: 'Properties Posted',
      selector: 'propertyPostedCount',
      sortable: true,
      center: true,
      minWidth: '170px',
      cell: ({ propertyPostedCount }) => (<span>{propertyPostedCount||'-'}</span>),
    },
    {
      name: 'Ratings',
      selector: 'avgRatings',
      sortable: true,
      center: true,
      // maxWidth: '80px',
      cell: ({ avgRatings }) => (<span>{avgRatings||'-'}</span>),
    },
    {
      name: 'Status',
      selector: 'status',
      center: true,
      cell: ({ status }) =>  handleStatusElement(status),
    },

    {
      name: 'Action',
      center: true,
      cell: (row) =>( <div className="action">
        {/* <ToolTip position="left" name={ row.status === "ACCEPTED" ? 'Approved': 'Approve' }>
          <span onClick={()=>{
            if(row.status === "REJECTED"){
              return false;
            }else{
              handleRealtorStatus(row.userId,"ACCEPTED" )
            }
        }}>
              <Image name="contentIcon" className="p-1" src={row.status === "ACCEPTED" ? approveActiveIcon : approveIcon } />
          </span>

        </ToolTip> */}
        <ToolTip position="left" name="View Details">
          <span>
            <Link to={ { pathname: `/admin/realtor-advisor-management/advisor-details/${ row.id }`,
              state: { status: row.status, isBlocked: row.isBlocked},
            } }>
              <Image name="editIcon" src={ actionIcon } />
            </Link>
          </span>
        </ToolTip>
        {row.status==="SUBMITTED" || row.status==="REJECTED" ? null :
          <ToolTip position="top"
         name={ row.status==="ACCEPTED" ? row.isBlocked ? 'Blocked': 'Block' : "Approve/Decline" }>
           {/* name={ row.blocked ? 'Unblock': 'Block' }> */}
          {/* <span onClick={()=>handleBlockUser(row.id)}>
                                <Image name="contentIcon" className="p-1" src={row.blocked ? blockIconActive : blockIcon} />
                            </span> */}

          <span 
            onClick={ ()=>{
            if(row.status === "SUBMITTED"){
              return false;
            }
            if(row.status === "REJECTED"){
              return false;
            }
            else{
              handleShow()
              // userBlock_id = row.id}
              // setBlock_id(row.id)}
              setBlockData({ id: row.id, status: row.isBlocked })
            // }
            // handleShow()
            // // userBlock_id = row.id}
            // // setBlock_id(row.id)}
            // setBlockData({ id: row.userId, status: row.status })
            // console.log(row.userIdid,status,"bbbbbbbbbbbbbbbbbbb")
          }
          }
          }
          >
            <Image name="contentIcon" className="p-1" src={ row.isBlocked ? blockIconActive : blockIcon }/>
          </span>
        </ToolTip>}
        
      </div>
      ),
    },
  ];

  // const FilterComponent = () => {
  //   return (
  //     <div>
  //       <ToolTip position="left" name="Under development">
  //         <span>
  //           <Buttons
  //             name="Filter"
  //             varient="secondary"
  //             type="submit"
  //             size="Small"
  //             color="black"
  //             iconSrc={ filterIcon }
  //             className="mr-2 font-weight-bold filterButton"
  //             // onClick={()=>handleOpen()}
  //           />
  //         </span>
  //       </ToolTip>
  //     </div>
  //   );
  // };

  // const PaginationComponent = (props) => (<Pagination { ...props } />);

  const _filterData = (city,zipCode) => { 
    // setInstallationCity(city);
    getAllRealtors({city, zipCode, page: '',
    size: ''});
  }

  console.log("allRealtorCities:", allRealtorCities);

  const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<SearchInput onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} 
      placeholder="Search here"
      />
		);
	}, [filterText, resetPaginationToggle]);

  function searchingLocation(element, index, array) {
    return element.location.toLowerCase().includes(filterText.toLowerCase());
  }

//   const filteredItems = getAllRealtorsData.data.length ? 
//   getAllRealtorsData.data.filter(item => { 
//     return  item?.id == filterText ||
//   item?.name?.toLowerCase().includes(filterText.toLowerCase())
//   || item?.dealInCity?.toLowerCase().includes(filterText.toLowerCase())
//   || item?.status?.toLowerCase().includes(filterText.toLowerCase())
//   || item.dealInArea.some(searchingLocation)
// }):[];

const showData = (status_value) => {
  let status = status_value || statusSelected;
  let filteredItems = getAllRealtorsData.data.length ? 
  getAllRealtorsData.data.filter(item => { 
    return  item?.id === filterText ||
  item?.name?.toLowerCase().includes(filterText.toLowerCase())
  || item?.dealInCity?.toLowerCase().includes(filterText.toLowerCase())
  || item?.status?.toLowerCase().includes(filterText.toLowerCase())
  || item.dealInArea.some(searchingLocation)
}):[];
  if(status && filteredItems.length){
    filteredItems = filteredItems.filter(item => { 
      return  item?.status.toUpperCase() === status.toUpperCase();
    })
 } 
  return filteredItems;
}

  function onChangePage(e) {}

  const ProgressComponent = <TableLoader />;

  const _filterStatus = (status_value) => {
    setStatusSelected(status_value);
    showData(status_value)
  }

  return (
    <>
      {/* <ConfirmationModal
        // title ={ blockData.isBlocked?'Are you sure you want to unblock this user?':'Are you sure you want to block this user?' }
        title = "Are you sure you want to decline the request ?"
        cancelButtonName = "Cancel"
        // primaryButtonName = { blockData.isBlocked?'Unblock':'Block' }
        primaryButtonName = 'Decline'
        show = { show }
        handleClose = { handleClose }
        handleShow = { handleShow }
        handlePerformAction = { ()=> handleRealtorStatus(blockData.id, "REJECTED") }
      /> */}

    <div className = "tableBox">  
      <ConfirmationModal
        title ={ blockData.status ? 'Are you sure you want to unblock this user?':'Are you sure you want to block this user?' }
        // title = "Are you sure you want to decline the request ?"
        cancelButtonName = "Cancel"
        // primaryButtonName = { blockData.isBlocked?'Unblock':'Block' }
        primaryButtonName = {blockData.status ? 'Unblock' : 'Block'}
        show = { show }
        handleClose = { handleClose }
        handleShow = { handleShow }
        handlePerformAction = { ()=> handleRealtorStatus(blockData.id, blockData.status ? "UNBLOCKED" : "BLOCKED" ) }
      />
      {/* <TableTitle/> */}
      <div className="d-flex justify-content-between align-items-center tableHeading">
        <div>
          <Text size="regular" fontWeight="mediumbold" color="secondryColor" text="Realtors" />
        </div>
        <div className="locationSelect d-flex">
         {subHeaderComponentMemo} 
         {statusArr.length?
        <Form.Group controlId="exampleForm.SelectCustom">
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
          <Form.Group controlId="exampleForm.SelectCustom" >
            {/* <Form.Label>City:</Form.Label> */}
            <Form.Control as="select" 
            onChange={ (e)=>{
              setLocationsData([]);
              setCity(e.target.value);
              setLocation('');
              _filterData(e.target.value, "");
              if(e.target.value.length){
                getLocationByCity({ city: e.target.value })
                .then((res) => {
                  if (res.data && res.data.status === 200) {
                      const locationsByCity = res.data.resourceData.locations.map(loc=>{
                        return {...loc, location: `${loc.location} ,${loc.pinCode}` }
                      })
                      setLocationsData(locationsByCity)
                      // this.setState({
                      //    // allLocationsByCity: res.data.resourceData.locations,
                      //    allLocationsByCity: locationsByCity,
                      // });
                  }
                })
                .catch((err) => console.log("err:", err));
              }
            }} 
            value = { city } >
              <option value="">Select City</option>
              {allCities?.data?.cities &&
                        allCities?.data?.cities.length
                           ? allCities?.data?.cities.map((_value, index) => (
                                <option key={index} value={_value}>
                                   {_value}
                                </option>
                             ))
                           : null}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.SelectCustom">
                          {/* <Form.Label>Location:</Form.Label> */}
                            <Form.Control as="select"
                            value={location}
                            onChange={(e)=> {
                              _filterData(city ,e.target.value)
                              setLocation(e.target.value)
                            }}
                            className="locationWidth"
                            >
                                <option value="">Select Location</option>
                                {
                                    locationsData && locationsData.length ? 
                                    locationsData.map((_value, index)=>
                                        <option key={_value.pinCode} value={_value.pinCode}>{_value.location}</option>
                                        ) 
                                    : null 
                                }
                            </Form.Control>
                      </Form.Group>
        </div>
      </div>
      <div className="realtorAdvisorManagementRealtorsTableWrapper">
        <DataTableComponent
          onChangePage={onChangePage}
          data={showData()}//getAllRealtorsData.data
          columns={realtorColumns}
          progressPending={getAllRealtorsData.isLoading}
          // paginationComponent={PaginationComponent}
          // paginationRowsPerPageOptions={[4,10,20,50]}
          // paginationPerPage={4}
          progressComponent={ProgressComponent}
          // pagination={false}

          //added
          //added
          perPageOptions={ [ 8,  16, 24, 32, 40, 48, 56, 64, 72, 80 ] }
          paginationPerPage={ 8 }
          paginationRowsPerPageOptions={ [ 8,  16, 24, 32, 40, 48, 56, 64, 72, 80 ] }
          filterText = {filterText}
          subHeaderComponent={subHeaderComponentMemo} 
          persistTableHead
          filterComponent={ subHeaderComponentMemo }
          // sortIcon={<Image name="sort_icon" src={sortIocn} /> }
        />
      </div>
      {/* <ListingDataTable
      title="Realtors"
      data={ getAllRealtorsData.data }
      columns={ realtorColumns }
      isLoading={ false }
      perPageOptions={ [ 4, 10, 20, 50 ] }
      paginationPerPage={ 10 }
      PaginationComponent={ PaginationComponent }
      // filterComponent={ <FilterComponent /> }
      // filterCity={helpdeskDashboardCity.propertyLeadsCity}
      // handleFilterChange={_filterPropertyLeads}
      /> */}
  </div>
  </>
  );
};

// mapStateToProps
const mapStateToProps = ({ getAllRealtorsData, allRealtorCities, allCities }) => ({
  getAllRealtorsData, 
  allRealtorCities,
  allCities
});

// mapDispatchToProps
const actions = {
  getAllRealtors,
  getAllCity,
  getLocationByCity
};

export default connect(mapStateToProps, actions)(RealtorManagement);
