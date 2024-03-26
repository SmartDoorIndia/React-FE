import React, { useRef, useState, useEffect, memo, useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import Image from '../../../../shared/Image/Image';
import Buttons from '../../../../shared/Buttons/Buttons'
import { getInstallationRequest,
    getServiceRequest,
    getAllPublishedProperty,
    getAllExecutiveTeams, 
    getExecutionDashboardCount, 
    getExcutionDashboardCity,
    getLocationByCity,
    getAllCity,
    changeInstallationAssignee
} from '../../../../common/redux/actions';
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import { Link, Route, useLocation } from 'react-router-dom';
import Text from '../../../../shared/Text/Text';
import Pagination from '../../../../shared/DataTable/Pagination';
import { handleStatusElement, ToolTip, formateDate, showErrorToast, dateWithFormate } from '../../../../common/helpers/Utils';
import contentIcon from '../../../../assets/images/content-ico.svg';
import Form from 'react-bootstrap/Form';
import filterIcon from '../../../../assets/images/filter-icon.svg';
import SearchInput from '../../../../shared/Inputs/SearchInput/SearchInput';
import './ExecutionListingPage.scss';
import CONSTANTS_STATUS from '../../../../common/helpers/ConstantsStatus';
import * as Actions from '../../../../common/redux/types';

const ExecutionListing = (props) => {
  const { 
      getInstallationRequest,      
      getAllPublishedProperty,      
      getLocationByCity,
      publishedProperyData, 
      installationReqData,
      getAllCity,
      allTransactionCities,
      allCities
  } = props;
  const location = useLocation()
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [locationsData, setLocationsData] = useState([]);
  
  const statusArr  = props?.tabName === "Installation/Un-installation Requests" ? CONSTANTS_STATUS.installationRequestsStatusArr : [];
  const [ statusSelected , setStatusSelected ] = useState('');

  //state: for managing the search filters 
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  const [selectedCity, setSelectedCity] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  const showData = (status_value) => {
    let status = status_value || statusSelected;
    let filteredItems = [];
    if(props?.tabName === "Installation/Un-installation Requests" ){   
        filteredItems =  installationReqData.data.length ?
        installationReqData.data.filter(item => { 
        return  item?.id == filterText 
        // || (item?.assignedTo !== null ? item?.assignedTo?.toLowerCase().includes(filterText.toLowerCase()): [])
        || ( item?.location?.toLowerCase().includes(filterText.toLowerCase())) 
        || (item?.city !== null ? item?.city?.toLowerCase().includes(filterText.toLowerCase()): [])
        || (item?.propertySubType?.toLowerCase().includes(filterText.toLowerCase())) 
        || (item?.status?.includes(filterText.toUpperCase()))
        || (item?.assignedTo?.toLowerCase().includes(filterText.toLowerCase()))
      }):[]
       if(status && filteredItems.length){
          filteredItems = filteredItems.filter(item => { 
            return  item?.status == status;
          })
       } 
      return filteredItems;
    }
    if(props?.tabName === "Published Property" ){ 
    filteredItems =  publishedProperyData.data.length ?
      publishedProperyData.data.filter(item => { 
          return  item?.smartdoorPropertyId == filterText || 
          item?.propertyPostedBy?.toLowerCase().includes(filterText.toLowerCase())
          || item?.phoneNumber?.includes(filterText)
          || item?.city?.toLowerCase().includes(filterText.toLowerCase())
          || item?.propertySubType?.toLowerCase().includes(filterText.toLowerCase())
          }):[]
       return filteredItems;
    }
}

  useEffect(() => {
    console.log(props,"module name");
    getAllCity();
    if(props?.tabName === "Installation/Un-installation Requests" ){  
      if(installationReqData?.data?.length === 0 || installationReqData?.data?.length === 4) {
        getInstallationRequest({city: "", location: "", records:"", pageNumber:""});
      }     
    }
    if(props?.tabName === "Published Property" ){        
        getAllPublishedProperty({city: "", records:"", pageNumber:""});
    }
  }, [
    getInstallationRequest,
    getAllPublishedProperty,
    getAllCity,
  ]);

  const PaginationComponent = (props) => (<Pagination { ...props } />);
 
  const handleChangeAssignee = (requestId , userId) =>{
    changeInstallationAssignee({ userRequestId: requestId,
      executivePersonId: userId,
    }).then((res)=> {
      if(res.data.status === 200){    
          getInstallationRequest({city: "", location: "", records:"", pageNumber:"" })    
    }})
    .catch(err=> console.log(err))
  }

  const InstallationRequestsColumns = [
    {
      name: 'Id',
      selector: 'id', 
      sortable: true,
      center:true,
    }, 
    {
      name: 'Installation Time',
      selector: 'dateTime',
      sortable: true,
      center:true,
      minWidth: '160px',
      cell: ({dateTime, slotTime})=>(<span>{`${formateDate(dateTime)} | ${slotTime || '-'}`}</span>),  
    },
    {
      name: 'Location'  ,
      selector: 'location',
      center:true,
      maxWidth:"150px",
      cell: ({ location }) => (
        <ToolTip position="top" style={{ width: "100%" }} name={location || ""}>
           <span className="cursor-pointer elipsis-text">
              {" "}
              {location.substring(
                 0,
                 location.indexOf(",") !== -1 ? location.indexOf(",") : location.length
              )}
           </span>
        </ToolTip>
     ),
    },
    {
      name: 'City'  ,
      selector: 'city',
      center:true,
      maxWidth:"150px",
      cell: ({city}) => ( 
        // <span> {city || "-"} </span> 
        <ToolTip position="top" style={{ width: "100%" }} name={city || ""}>
           <span className="cursor-pointer elipsis-text">
              {" "}
              {city.substring(
                 0,
                 city.indexOf(",") !== -1 ? city.indexOf(",") : city.length
              )}
           </span>
        </ToolTip>
      ),
    },
    {
      name: 'Request Type',
      selector: 'requestFor',
      center:true,
      maxWidth:"150px",
      minWidth: '140px',
      style:{"text-align": "center"},
      cell: ({requestFor}) => ( 
        // <span> {propertySubType || "-"} </span>
        // <ToolTip position="top" style={{ width: "100%" }} name={propertySubType || ""}>
           <span className="cursor-pointer elipsis-text">
              {" "}
              {requestFor}
           </span>
        // </ToolTip> 
      ),  
    }, 
    {
      name: 'Property Type',
      selector: 'propertySubType',
      center:true,
      maxWidth:"150px",
      minWidth: '140px',
      style:{"text-align": "center"},
      cell: ({propertySubType}) => ( 
        // <span> {propertySubType || "-"} </span>
        <ToolTip position="top" style={{ width: "100%" }} name={propertySubType || ""}>
           <span className="cursor-pointer elipsis-text">
              {" "}
              {propertySubType.substring(
                 0,
                 propertySubType.indexOf(",") !== -1 ? propertySubType.indexOf(",") : propertySubType.length
              )}
           </span>
        </ToolTip> 
      ),  
    }, 
    {
      name: 'Assigned To',
      selector: 'assignedTo',
      center:true,
      minWidth:"120px",
      cell: ({ id, assignedTo, userList }) => (
           !assignedTo ?
             <div className="w-100">
               <div className="assignTo">
                 <Form.Group controlId="exampleForm.SelectCustom" className="w-100 display-flex">
                   <Form.Control as="select" className="w-100" 
                   onChange={ (e)=>handleChangeAssignee(id ,e.target.value) }
                   >
                     <option >Assign</option>
                     {
                       userList.map((data, index)=>
                         <option key={ index } value={ data.id }>{data.name}</option>,
                       )
                     }
                   </Form.Control>
                 </Form.Group>
               </div>
             </div> :  
             <Text size="Small" color="secondryColor" className="text-center elipsis-text" text={ assignedTo ? assignedTo.capitalizeWord() : '-' } /> 
      ),
    }, 
    {
      name: 'Status',
      selector: 'status',
      center:true,
      maxWidth:"150px",
      minWidth: '140px',
      cell: ({status})=>(handleStatusElement(status))
    }, 
    {
      name: 'Action',
      center:true,
      maxWidth:"60px",
      cell: ({id}) =>( 
          <div className="action">
            <ToolTip position="left" name="View Details">
              <span>
                  <Link  to={{ pathname: "/admin/execution/installation-detail",
                              state: {taskId : id} }}> 
                      <Image name="useraddIcon" src={contentIcon} />
                  </Link>
                </span>
            </ToolTip> 
          </div>
        )
    },   
  ];

  const PublishedPropertyColumns = [
    {
    name: 'Id',
    selector: 'smartdoorPropertyId',
    center:true,
    sortable: true,
    },
    {
    name: 'Name',
    selector: 'name',
    center:true,
    cell: ({propertyPostedBy, imageUrl}) => (  
      <ToolTip position="top" style={ { width: '100%' } } name={ propertyPostedBy || '' }>
        <span className="elipsis-text"> {propertyPostedBy||'-'}</span>
      </ToolTip>
      // <div className="userName">
      //   <Text size="Small" color="secondryColor" text={propertyPostedBy || "-"} />
      // </div>
      ),
    },
    {
    name: 'Phone No'  ,
    selector: 'phoneNumber',
    center:true,
    },
    {
    name: 'City'  ,
    selector: 'city',
    center:true,
    cell: ({city}) => ( <span> {city || "-"} </span> )
    },
    {
    name: 'Property Type',
    selector: 'leadCompleted',    
    center:true,
    style:{"text-align": "center"},
    cell: ({propertySubType}) => ( <Text size="Small" color="secondryColor" text={propertySubType||"-"} />)
    }, 
    {
    name: 'Action',
    center:true,
    cell: ({smartdoorPropertyId,postedById}) =>( <div className="action">
              <ToolTip position="left" name="View Details">
                  <span>
                      <Link  to={{ pathname: "/admin/execution/published-property/property-details",
                                  state: {propertyId : smartdoorPropertyId, userId : postedById} }}> 
                          <Image name="useraddIcon" src={contentIcon} />
                      </Link>
                    </span>
              </ToolTip> 
                  </div>
                )
    }, 
  ];

 const _filterInstallationRequests = (city, locationData) => {
  console.log(locationData,"in the api for city and location");
  let data = locationData
      const regex = /([^,]+),\s*(\d{6})/;
      const matches = data.match(regex);
      if (matches) {
        console.log("inside match");
        const location = matches[1].trim();
        const zipcode = matches[2];
        console.log(city,location,zipcode,"data for filter");
        getInstallationRequest({city, zipcode, location, pageSize:"", pageNo:"1" });

      }
    if(locationData==""){
      console.log("outside match");
        setCity(city);
      getInstallationRequest({city , location: locationData, records:"", pageNumber:""});
    }
    
 };

 const _filterPublishPropertyCity = (city, zipcode) => { 
  setCity(city);
  getAllPublishedProperty({city, location: zipcode, records:"", pageNumber:""});
}

  const showColumns = () => {
      if(props?.tabName === "Installation/Un-installation Requests" ){
          return InstallationRequestsColumns;
      }
      if(props?.tabName === "Published Property" ){ 
          return PublishedPropertyColumns;
      }
  }

  const _filterStatus = (status_value) => {
    setStatusSelected(status_value);
    showData(status_value)
  }

  const _filterCityData = (city, zipcode) => {
      setLocationsData([]);
      if(props.location.state.module === "Installation Requests" ){
          _filterInstallationRequests(city, '');              
      }
      if(props.location.state.module === "Published Property" ){
        _filterPublishPropertyCity(city, '');           
    }
      setSelectedCity(city);
      setSelectedLocation('')
      if(city.length){
        getLocationByCity({ city })
            .then((res) => {
                if (res.data && res.data.status === 200) {
                const locationsByCity = res.data.resourceData.locations.map(
                    (loc) => {
                        return {
                            ...loc,
                            location: `${loc.location} ,${loc.pinCode}`,
                        };
                    }
                );
                setLocationsData(locationsByCity);
                }
            })
            .catch((err) => console.log("err:", err));
      }else{
        setLocationsData([]);
      }
  }

  const  _filterLocationData = (city, zipcode) => {
    console.log(zipcode,"location filter zipcode");
      if(props.location.state.module === "Installation Requests" ){
          _filterInstallationRequests(city, zipcode);              
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

  const [defaultSort, setDefaultSort] = useState(true);
   const [defaultSortId, setDefaultSortId] = useState('id');
   const handleSortedData = (newSortedData) => {
      // Store sorted data
      // const { selector, direction } = newSortedData;
      let selectorVal = newSortedData?.selector
      console.log(newSortedData?.selector)
      // Perform sorting based on selector and direction
      let filteredItems = showData()
      const sorted = [...filteredItems].sort((a, b) => {
         if (selectorVal === 'id') {
            if (defaultSort === true) {
               return a[selectorVal] - b[selectorVal]; // Example sorting logic
            } else {
               return b[selectorVal] - a[selectorVal]; // Example sorting logic for descending order
            }
         }
         else if (selectorVal === 'dateTime') {
            const dateA = new Date(a[selectorVal]);
            const dateB = new Date(b[selectorVal]);

            if (defaultSort === true) {
               return dateA - dateB;
            } else {
               return dateB - dateA;
            }
         }
      });
      setDefaultSort(!defaultSort)
      // Update sorted data state
      console.log(sorted);
      // filteredItems = [...sorted]
      dispatch({
        type: Actions.EXCUTIVE_INSTALLATION_SUCCESS,
        data: [...sorted],
      });
   };
  return (  
    <div className="tableBox bg-white">
      <div className="d-flex justify-content-between align-items-center tableHeading">
        <div>
            <Text
              size="regular"
              fontWeight="mediumbold"
              color="secondryColor"
              text={props?.tabName}
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
            <Form.Group controlId="exampleForm.SelectCustom">
              {/* <Form.Label>City:</Form.Label> */}
              <Form.Control
                  as="select"
                  value={selectedCity}
                  onChange={(e) => {
                      _filterCityData(e.target.value, 0);                   
                  }}
              >
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
            {props?.tabName === "Published Property" ? null :
            <Form.Group controlId="exampleForm.SelectCustom">
              {/* <Form.Label>Location:</Form.Label> */}
              <Form.Control
                  as="select"
                  className="locationWidth"
                  onChange={(e) =>
                      _filterLocationData(selectedCity, e.target.value)
                  }
              >
                  <option value="">Select Location</option>
                  {locationsData && locationsData.length
                    ? locationsData.map((_value, index) => (
                          <option key={_value.pinCode} value={_value.location}>
                            {_value.location}
                          </option>
                      ))
                    : null}
              </Form.Control>
            </Form.Group> 
              }
        </div>
      </div>
      {/* <div className='executionInstallationrequestsTableWrapper'> */}
      <div className='executionInstallationreqTableWrapper'>
        <DataTableComponent       
          data={showData()}
          // data = {filtered_items}
          columns={showColumns()}
          progressPending={props?.tabName === "Published Property"?publishedProperyData.isLoading :installationReqData.isLoading}
          paginationRowsPerPageOptions={ [8, 16, 24, 32, 40, 48, 56, 64, 72, 80 ] }
          paginationPerPage={ 8 }
          PaginationComponent={ PaginationComponent }
          onSort={(e) => {if(props.location.state.module === 'Installation Requests') {handleSortedData(e) }}}
          defaultSort={props.location.state.module === 'Installation Requests' ? defaultSort : false}
          defaultSortId={props.location.state.module === 'Installation Requests' ? defaultSortId : 'smartdoorPropertyId'}
        />
      </div>
 </div>

  );
}

const mapStateToProps = ({ salesLeadsDataTable,
    excutiveTeamsData,  
    publishedProperyData,  
    serviceRequestData,  
    installationReqData, 
    executionDashboardCount, 
    excutiveDashboardCity,
    allLocationsByCity ,
    allTransactionCities,
    allCities
}) => ({
    excutiveTeamsData, 
    publishedProperyData, 
    serviceRequestData, 
    installationReqData,
    executionDashboardCount,
    excutiveDashboardCity,
    allLocationsByCity, 
    allTransactionCities,
    allCities,
    allLocationsByCity,  
});

const actions = {
    getInstallationRequest,
    getServiceRequest,
    getAllPublishedProperty,
    getAllExecutiveTeams,
    getExecutionDashboardCount,
    getExcutionDashboardCity,
    getLocationByCity,
    getAllCity,
};

const withConnect = connect(
    mapStateToProps,
    actions,
);

export default compose(
    withConnect,
    memo,
)(ExecutionListing);
