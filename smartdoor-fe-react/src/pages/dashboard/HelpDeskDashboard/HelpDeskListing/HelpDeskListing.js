import React, { useRef, useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Image from '../../../../shared/Image/Image';
import Buttons from '../../../../shared/Buttons/Buttons'
import { getInstallationRequest,
    getServiceRequest,
    getAllPublishedProperty,
    getAllExecutiveTeams, 
    getExecutionDashboardCount, 
    getExcutionDashboardCity,
    approveProperty ,
    getLocationByCity,
    changeInstallationAssignee,
    //transaction module
   getAllCity,
//    getLocationByCity,
   getHelpDeskPropertyLeads,
} from '../../../../common/redux/actions';
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import { Link, Route } from 'react-router-dom';
import Text from '../../../../shared/Text/Text';
import ListingDataTable from '../../../../shared/DataTable/ListingDataTable';
import Pagination from '../../../../shared/DataTable/Pagination';
import { handleStatusElement, ToolTip, formateDate, showErrorToast, dateWithFormate } from '../../../../common/helpers/Utils';
import contentIcon from '../../../../assets/images/content-ico.svg';
import Form from 'react-bootstrap/Form';
import filterIcon from '../../../../assets/images/filter-icon.svg';
import userImage from "../../../../assets/svg/avatar_sml.svg";
import SearchInput from '../../../../shared/Inputs/SearchInput/SearchInput';
import './HelpDeskListing.scss';

const HelpDeskListing = (props) => {
  const { 
    getInstallationRequest,      
      getAllPublishedProperty,      
      getLocationByCity,
      publishedProperyData, 
      installationReqData,
    //transcation module
    // getLocationByCity,
    getAllCity,
    allTransactionCities,
    allCities,
    getHelpDeskPropertyLeads,
    helpdeskPropertyLeads
  } = props;

 
  const [city, setCity] = useState("");
 

  const [locationsData, setLocationsData] = useState([]);


  //state: for managing the search filters 
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  function onChangePage(e) {}

  const [selectedCity, setSelectedCity] = useState('')

  useEffect(() => {
    console.log(props,"propssssssssssssssssssssssssssssssssssss");
    getAllCity();
    //transaction module
    if(props?.tabName === "Property Leads" ){        
        getHelpDeskPropertyLeads({ city: '', records: '', pageNumber: '' , zipCode:''});
    }
  }, [
    //transaction module
    getInstallationRequest,
    getAllPublishedProperty,
    getAllCity,
    getHelpDeskPropertyLeads
  ]);

  const PaginationComponent = (props) => (<Pagination { ...props } />);

//  const handleUserAssignmet = (lead_Id, assigned_To, lead_For) => {
//    const data = {
//       leadId: Number(lead_Id),
//       assignedTo: Number(assigned_To),
//       leadFor: "TRANSACTION_LEAD",
//    };
//    changeUserAssignee(data)
//    .then((res)=> {
//       if(res.data.status === 200){
//          getAllTransactionLead({
//             city: "",
//             location: "",
//             pageNumber: "",
//             records: "",
//             zipcode: 0,
//          });
//       }
//    })
//    .catch((err)=> 
//       console.log('err:', err)
//    )
      
// };

const PropertyLeadsColumns = [
    {
      name: 'Id',
      selector: 'leadId',
      sortable: true,
      center: true,
    }, 
    {
      name: 'Date',
      selector: 'leadDate',
      sortable: true,
      center: true,
      cell: ({ leadDate }) => <span>{formateDate(leadDate)}</span>,
    },
    {
      name: 'Lead For',
      selector: 'leadFor',
      center: true,
      // maxWidth: '150px',
      minWidth: '80px',
      // style: { 'text-align': 'center' },
      // cell: ({ contactPerson }) => <span> {contactPerson || '-'} </span>,
    },
    // {
    //   name: 'Source',
    //   center: true,
    //   maxWidth: '100px',
    //   cell: ({ source }) => <span> {source || '-'} </span>,
    // },
    {
      name: 'Contact Person',
      selector: 'contactPerson',
      center: true,
      minWidth: '140px',
      maxWidth: '150px',
      style: { 'text-align': 'center' },
      cell: ({ contactPerson }) => <span> {contactPerson || '-'} </span>,
    },
    {
      name: 'Phone No',
      selector: 'contactNumber',
      center: true,
      minWidth: '140px',
      cell: ({ contactNumber }) => <span> {contactNumber || '-'} </span>,
    },
    {
      name: 'Society',
      selector: 'societyName',
      center: true,
      // maxWidth: '150px',
      minWidth: '150px',
      cell: ({ societyName }) => <span>{societyName || '-'}</span>,
    },
    {
      name: 'Location',
      selector: 'address',
      center: true,
      maxWidth: '150px',
      // cell: ({ address }) => (
      //   <ToolTip position="top" style={ { width: '100%' } } name={ address || '' }>
      //     <span className="cursor-pointer elipsis-text"> {address||'-'}</span>
      //   </ToolTip>
      // ),
      cell: ({ address }) => (
        <ToolTip position="top" style={{ width: "100%" }} name={address || ""}>
           <span className="cursor-pointer elipsis-text">
              {address.substring(
                 0,
                 address.indexOf(",") !== -1 ? address.indexOf(",") : address.length
              )}
           </span>
        </ToolTip>
     ),
    },
    // {
    //   name: 'Assign To',
    //   selector: 'assignTo',
    //   center: true,
    //   cell: ({ assignTo }) => (
    //     <Text
    //       size="Small"
    //       className="text-align-center"
    //       // fontWeight="smbold"
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
    // {
    //   name: 'Last Call',
    //   selector: 'lastCall',
    //   center: true,
    //   cell: ({ lastCall }) => <span>{lastCall || '-'}</span>,
    // },
    {
      name: 'Action',
      center: true,
      maxWidth: '60px',
      cell: ({ leadId }) => (
        <div className="action">
          <ToolTip position="left" name="View Details">
            <span>
              <Link to={ { pathname: '/admin/helpdesk/lead-details',
                state: { leadId: leadId, module: "HELPDESK" },
              } }>
                <Image name="useraddIcon" src={ contentIcon } />
              </Link>
            </span>
          </ToolTip>
        </div>
      ),
    },
  ];
 
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
      cell: ({dateTime, slotTime})=>(<span>{`${formateDate(dateTime)} | ${slotTime || '-'}`}</span>),
  
    },
    // {
    //   name: 'For'  ,
    //   selector: 'requestFor',
    //   center:true,
  
    // },
    {
      name: 'Location'  ,
      selector: 'location',
      center:true,
      maxWidth:"150px",
      // cell: ({location}) => ( <span> {location !== null ? location : "-" || "-"} </span> )
      //{row.dealInArea.substring(0, row.dealInArea.indexOf(',')!==-1 ? row.dealInArea.indexOf(',') : row.dealInArea.length)}
      // cell: ({location}) => ( <span> {location.substring(0, location.indexOf(',')!==-1 ? location.indexOf(',') : location.length)} </span> )
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
      cell: ({city}) => ( <span> {city || "-"} </span> )
    },
    {
      name: 'Property Type',
      selector: 'propertySubType',
      center:true,
      maxWidth:"150px",
      style:{"text-align": "center"},
      cell: ({propertySubType}) => ( <span> {propertySubType || "-"} </span> )
  
    }, 
    {
      name: 'Assigned to',
      selector: 'assignedTo',
      center:true,
      // cell: ({assignedTo}) => ( <Text size="Small"  className="text-align-center" fontWeight="smbold" color="secondryColor" text={assignedTo ? assignedTo.capitalizeWord() : "-"} /> )
      cell: ({ id, assignedTo, userList }) => (
        // status === 'PENDING' ?
           !assignedTo ?
             <div className="w-100">
               <div className="assignTo">
                 <Form.Group controlId="exampleForm.SelectCustom" className="w-100 display-flex">
                   <Form.Control as="select" className="w-100" 
                   //onChange={ (e)=>handleChangeAssignee(id ,e.target.value) }
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
  
             <Text size="Small" color="secondryColor" className="text-center" text={ assignedTo ? assignedTo.capitalizeWord() : '-' } /> 
            // : <Text size="Small" fontWeight="smbold" color="secondryColor" className="text-center" text={ assignTo ? assignTo.capitalizeWord() : '-' } />
  
  ),
    }, 
    {
      name: 'Status',
      selector: 'status',
      center:true,
      maxWidth:"150px",
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
    cell: ({propertyPostedBy, imageUrl}) => (  <div className="userName">
                      {/* <div className="userImage">
                        <Image name="userImage" src={imageUrl || userImage} /> 
                          </div> */}
                        <Text size="Small" color="secondryColor" text={propertyPostedBy || "-"} />
                        </div>
                    )
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
                      <Link  to={{ pathname: "/admin/property/property-details",
                                  state: {propertyId : smartdoorPropertyId, userId : postedById} }}> 
                          <Image name="useraddIcon" src={contentIcon} />
                      </Link>
                    </span>
              </ToolTip> 
                  </div>
                )
    }, 
    
    ];

 const _filterPropertyLeads = (city, zipcode) => {
    setCity(city);
    getHelpDeskPropertyLeads({ city, records: '', pageNumber: '' , zipCode:zipcode});
 };


const [ showModal, setShowModal ] = useState(false);
  const [ datePickervalue, setDatePickervalue ] = useState('');

  const handleClose = () => {
    setShowModal(false);
  }
  const handleOpen = () => {
    setShowModal(true);
  }


  const FilterComponent = () => {
    return (<div>
      <Buttons
        name="Filter"
        varient="secondary"
        type="submit"
        size="Small"
        color="black"
        iconSrc={ filterIcon }
        className= "mr-2 font-weight-bold filterButton"
        onClick={ ()=>handleOpen() }
      />
    </div>)
  }

  const showData = () => {
      let filteredItems = [];
      if(props?.tabName === "Property Leads" ){   
          filteredItems =  helpdeskPropertyLeads.data.length ?
          helpdeskPropertyLeads.data.filter(item => { 
          return  item?.leadId == filterText || 
          (item?.assignTo?.toLowerCase().includes(filterText.toLowerCase())) ||
          (item?.contactPerson?.toLowerCase().includes(filterText.toLowerCase())) ||
          (item?.societyName?.toLowerCase().includes(filterText.toLowerCase())) ||
          (item?.contactNumber?.toLowerCase().includes(filterText.toLowerCase())) ||
          item?.address.toLowerCase().includes(filterText.toLowerCase())
          }):[]
         return filteredItems;
      }
  }

    const showColumns = () => {
        if(props?.tabName === "Property Leads" ){
            return PropertyLeadsColumns;
        }
    }

    const _filterCityData = (city, zipcode) => {
        if(props?.tabName === "Property Leads" ){
            _filterPropertyLeads(city, '');
        }
        setLocationsData([]);
        setSelectedCity(city);
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
          }
    }

    const  _filterLocationData = (city, zipcode) => {
        if(props?.tabName === "Property Leads" ){
            _filterPropertyLeads(city, zipcode);
                
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
			<SearchInput onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} placeholder={"Search here "}/>
		);
	}, [filterText, resetPaginationToggle]);


  return (
  
    <div className="tableBox bg-white">
    <div className="d-flex justify-content-between align-items-center tableHeading">
       <div>
          <Text
             size="regular"
             fontWeight="mediumbold"
             color="secondryColor"
             text={props?.tabName? props?.tabName : ''}
          />
       </div>
       <div className="locationSelect d-flex">
       {subHeaderComponentMemo}
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
          {/* <Form.Group controlId="exampleForm.SelectCustom">
             
             <Form.Control
                as="select"
                className="locationWidth"
                onChange={(e) =>
                //    _filterTransactionLeads(transactionLeadCity, e.target.value)
                    _filterLocationData(selectedCity, e.target.value)
                }
             >
                <option value="">Select location</option>
                {locationsData && locationsData.length
                   ? locationsData.map((_value, index) => (
                        <option key={_value.pinCode} value={_value.pinCode}>
                           {_value.location}
                        </option>
                     ))
                   : null}
             </Form.Control>
          </Form.Group> */}
       </div>
    </div>
      <div className='property-leadsTableWrapper'>
        <DataTableComponent       
          data={showData()}
          columns={showColumns()}
          //  progressPending={transactionLeadsData.isLoading}
          // isPaginationButton={ false }
          // isLoading={ false }
          paginationRowsPerPageOptions={ [ 8,  16, 24, 32, 40, 48, 56, 64, 72, 80 ] }
          paginationPerPage={ 8 }
          PaginationComponent={ PaginationComponent }
        />
      </div>
 </div>

  );
}

// export default ServiceRequest;
const mapStateToProps = ({ salesLeadsDataTable,
    excutiveTeamsData,  
    publishedProperyData,  
    serviceRequestData,  
    installationReqData, 
    executionDashboardCount, 
    excutiveDashboardCity,
    allLocationsByCity ,
    allTransactionCities,
    allCities,
    //transaction module
//    allLocationsByCity,
   helpdeskPropertyLeads
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
   
    helpdeskPropertyLeads
});

const actions = {

    getInstallationRequest,
    getServiceRequest,
    getAllPublishedProperty,
    getAllExecutiveTeams,
    getExecutionDashboardCount,
    getExcutionDashboardCity,
    getLocationByCity,

  //transaction module
   getAllCity,
//    getLocationByCity,
    getHelpDeskPropertyLeads,
};

const withConnect = connect(
    mapStateToProps,
    actions,
);

export default compose(
    withConnect,
    memo,
)(HelpDeskListing);
