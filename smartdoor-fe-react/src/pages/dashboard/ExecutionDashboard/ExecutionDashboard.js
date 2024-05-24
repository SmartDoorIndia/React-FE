import React, { useState, useEffect, memo } from 'react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';  
import Text from '../../../shared/Text/Text';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Image from '../../../shared/Image/Image';
import Buttons from '../../../shared/Buttons/Buttons' 
import ModalModule from '../../../shared/Modal/ModalModule';
import {  getInstallationRequest,
          getServiceRequest,
          getAllPublishedProperty,
          getAllExecutiveTeams, 
          getExecutionDashboardCount, 
          getExcutionDashboardCity,
          getAllCity,
          getLocationByCity,
          changeInstallationAssignee,
          getAllCityWithId
      }  from '../../../common/redux/actions';
import { Link, Route } from 'react-router-dom';  
import { TableLoader } from '../../../common/helpers/Loader';
import DataTableComponent from '../../../shared/DataTable/DataTable'; 
import Pagination from '../../../shared/DataTable/Pagination';
import contentIcon from '../../../assets/images/content-ico.svg';
import calendarIcon from '../../../assets/svg/calendar.svg';
import personGroupIco from '../../../assets/svg/person_group.svg';
import ListingDataTable from '../../../shared/DataTable/ListingDataTable';
import { handleStatusElement, ToolTip, formateDate, dateWithFormate }  from '../../../common/helpers/Utils';
import * as Actions from '../../../common/redux/types';
import './ExecutionDashboard.scss'

const TeamTablePaginationActionButton = () => (
    <div className="d-flex justify-content-center tableBottom">
        <Link  to = {{
          pathname : "/admin/user-management",
          state : {moduleName : 'Installation'}
        }}>
          <Buttons name="Manage Team" varient="primary" type="submit" size="Small" color="white" />
        </Link>
    </div>
  );

const PaginationComponent = (props) => (<div className="table-bottom ml-auto">
<Link
   to={{
      pathname: "/admin/execution/installation-requests",
      state: { module: "Installation Requests" },
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

//PaginationPublishedPropertyComponent
const PaginationPublishedPropertyComponent = (props) => (<div className="table-bottom ml-auto">
<Link
   to={{
      pathname: "/admin/execution/published-property",
      state: { module: "Published Property" },
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

//<Pagination {...props} />
const TeamTablePaginationComponent = (props) => (<Pagination {...props} PaginationActionButton={TeamTablePaginationActionButton} />);
 
const ProgressComponent = <TableLoader />

const ExecutionDashboard = (props) => {
    const {
      getInstallationRequest,
      getServiceRequest,
      getAllPublishedProperty,
      getAllExecutiveTeams,
      getExecutionDashboardCount,
      // getExcutionDashboardCity,
      getAllCity,
      getAllCityWithId,
      // getLocationByCity,
      excutiveTeamsData, 
      publishedProperyData, 
      serviceRequestData, 
      installationReqData,
      executionDashboardCount,
      excutiveDashboardCity,
      allCities,
      allCitiesWithId,
      // allExecutiveLocationsByCity
      }= props;

    const dispatch = useDispatch();
    useEffect(()=>{
      getInstallationRequest({city: "", location: "",pageSize:"4", pageNo:"1" });
      getServiceRequest({ "status":[],
      "endDate":"",
      "city":"",
      "contactNumber":"",
      "ticketNumber":"",
      "startDate":"",records:"4", pageNumber:"1"});
      getAllPublishedProperty({city: "", records:"4", pageNumber:"1"});
      getAllExecutiveTeams({city: ""});
      getExecutionDashboardCount();
      // getExcutionDashboardCity();
      getAllCity();
      getAllCityWithId({smartdoorServiceStatus: true, stateId: null});
    },[ getInstallationRequest,
        getServiceRequest,
        getAllPublishedProperty,
        getAllExecutiveTeams,
        getExecutionDashboardCount,
        // getExcutionDashboardCity,
        getAllCity,
        getAllCityWithId
      ]);

    const [installationCity, setInstallationCity] = useState("");
    const [installationLocation, setInstallationLocation] = useState("");
    const [locationsData, setLocationsData ] = useState([]);
    // const [selectedCity , setSelectedCity] = useState("")

    const _filterInstallationCity = (city,location) => {
      console.log(location,"filter location"); 
      let zipcode= ''
      let data = location
      const regex = /([^,]+),\s*(\d{6})/;
      const matches = data.match(regex);

      if (matches) {
        const location = matches[1].trim();
        const zipcode = matches[2];
        console.log(city,location,zipcode,"data for filter");
        getInstallationRequest({city, zipcode, location, pageSize:"4", pageNo:"1" });

      }
      else 
      getInstallationRequest({city, zipcode, location, pageSize:"4", pageNo:"1" });
      
    }

    const _filterPublishPropertyCity = (value) => { 
      getAllPublishedProperty({city: value, records:"4", pageNumber:"1"});
    }

    // const _filterServiceReqCity = (value) => { 
    //   getServiceRequest({ "status":[],
    //   "endDate":"",
    //   "city":"",
    //   "contactNumber":"",
    //   "ticketNumber":"",
    //   "startDate":"",records:"4", pageNumber:"1"});
    // }

    const _filterExecutionTeamCity = (value) => { 
      getAllExecutiveTeams({city: value});
    }

    function onChangePage (e){}

    // const TableTitle = () =>{
    //     return  <div className="d-flex justify-content-between align-items-center tableHeading">
    //                 <div>
    //                     <Text size="regular" fontWeight="mediumbold" color="secondryColor" text="Societies on Smartdoor" />
    //                 </div>
    //                 <div className="locationSelect">
    //                     <Form.Group controlId="exampleForm.SelectCustom">
    //                         <Form.Label>Location:</Form.Label>
    //                         <Form.Control as="select" >
    //                           <option>Select</option>
    //                           <option>Under development</option>
    //                         </Form.Control>
    //                     </Form.Group>
    //                 </div>
    //             </div>
    // }

  const handleChangeAssignee = (requestId , userId, module_name) =>{
    changeInstallationAssignee({ userRequestId: requestId,
      executivePersonId: userId,
    }).then((res)=> {
      if(res.data.status === 200){
        if(module_name ==="InstallationRequests"){
          getInstallationRequest({city: "", location: "", records:"4", pageNumber:"1" });
        }else
          getServiceRequest({ "status":[],
          "endDate":"",
          "city":"",
          "contactNumber":"",
          "ticketNumber":"",
          "startDate":"",records:"4", pageNumber:"1"});
      }
    })
    .catch(err=> console.log(err))
  }

const ServiceRequestColumns = [
  {
    name: 'Id',
    selector: row => row.ticketNo,
    center:true,
    sortable: true,
    maxWidth: "100px !important" ,
  },

  {
    name: 'Date',
    selector: row => row.createdDate,
    center:true,
    sortable: true,
    // sortFunction: (rowA, rowB) => rowA.createdDate - rowB.time,
    cell: ({createdDate, time})=>(<span>{`${formateDate(createdDate)} | ${ dateWithFormate(createdDate,"hh:mm a") || '-'}`}</span>),
    
  },
  {
    name: 'Request'  ,
    selector: row => row.ticketName,
    center:true,
    // maxWidth:"120px",
    // style:{"max-width": "120px"},
    cell: ({ticketName}) => ( <ToolTip position="top" name={ticketName|| ""}>
                              <span className="cursor-pointer elipsis-text"> {ticketName || "-"} </span> 
                              </ToolTip>  )
  },
  {
    name: 'From'  ,
    selector: row => row.requestedBy,
    maxWidth: '100px',
    center:true,
    cell: ({requestedBy}) => ( 
      <div>
        <ToolTip position="top" name={requestedBy}>
        <span className="elipsis-text">        
            {requestedBy || "-"} 
        </span>
        </ToolTip>
      </div> )
  },    
  {
    name: 'Phone No',
    center:true,
    // maxWidth:"140px",
    minWidth: '130px',
    cell: ({contactNumber}) => ( <span> {contactNumber || "-"} </span> )
  },
  // {
  //   name: 'Assign To',
  //   selector: 'assignTo',
  //   center:true,
  //   cell: ({assignTo}) => ( <Text size="Small" fontWeight="smbold" color="secondryColor" text={assignTo ? assignTo.capitalizeWord() : "UNASSIGNED"} /> )
  // }, 
  {
    name: 'Assigned To',
    selector: row => row.assignTo,
    maxWidth: '130px',
    // center: true,
    cell: ({ id,assignTo, userList, leadId, status }) => (
                // status === 'PENDING' ?
                   !assignTo ?
                     <div className="w-100">
                       <div className="assignTo">
                         <Form.Group controlId="exampleForm.SelectCustom" className="w-100 display-flex">
                           <Form.Control as="select" className="w-100" 
                          onChange={ (e)=>handleChangeAssignee(id ,e.target.value, "ServiceRequest") }
                           >
                             <option >Assign</option>
                             {
                               userList?.map((data, index)=>
                                 <option key={ index } value={ data.id }>{data.name}</option>,
                               )
                             }
                           </Form.Control>
                         </Form.Group>
                       </div>
                     </div> :

                     <Text size="Small" color="secondryColor" className="text-center elipsis-text" text={ assignTo ? assignTo.capitalizeWord() : '-' } /> 
                    // : <Text size="Small" fontWeight="smbold" color="secondryColor" className="text-center" text={ assignTo ? assignTo.capitalizeWord() : '-' } />

    ),
  },
  {
    name: 'Status',
    selector: row => row.status,
    center:true,
    maxWidth:"120px",
    style:{'white-space':'nowrap', "padding":"0 !important","max-width": "120px"},
    cell: ({status})=>(handleStatusElement(status))
  },
  { 
    name: 'Action',
    center:true,
    maxWidth:"50px",
    cell: ({id}) =>( 
      <div className="action">
        <ToolTip position="left" name="View Details">
          <span>
              <Link to={{ pathname: `/admin/execution/serviceRequest-details/${id}`}} > 
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
selector: row => row.smartdoorPropertyId,
center:true,
sortable: true,

},

{
name: 'Name',
selector: row => row.name,
center:true,
cell: ({propertyPostedBy, imageUrl}) => (
  <>
  {/* <div className="userName">
    <Text size="Small" color="secondryColor elipsis-text" text={propertyPostedBy || "-"} />
  </div> */}
  <ToolTip position="top" style={{ width: '100%' }} name={propertyPostedBy || ''}>
    <span className="elipsis-text"> {propertyPostedBy || '-'}</span>
  </ToolTip></>
  ),
},
{
name: 'Phone No'  ,
selector: row => row.phoneNumber,
center:true,
},
{
name: 'City'  ,
selector: row => row.city,
center:true,
cell: ({city}) => ( <span> {city || "-"} </span> )

},
{
name: 'Property Type',
selector: row => row.leadCompleted,

center:true,
style:{"text-align": "center"},
cell: ({propertySubType}) => ( <Text size="Small" color="secondryColor" text={propertySubType||"-"} />)

}, 
{
name: 'Action',
center:true,
maxWidth:"50px",
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

const ExecutiveTeamColumns = [
{
name: 'Id',
selector: row => row.id, 
center:true,
sortable: true,
},

{
name: 'Name',
selector: row => row.name,
center:true,
cell: ({name, imageUrl}) => (
  <>
    <ToolTip position="top" style={{ width: '100%' }} name={name || ''}>
      <Text size="Small" color="secondryColor elipsis-text" text={name ? name.capitalizeWord() : "-"} />
    </ToolTip>
  </>
  ),
},
{
name: 'Role'  ,
selector: row => row.role,
center:true,
maxWidth:"200px",
style:{'white-space':'nowrap', "padding":"0 !important","max-width": "200px"}
},
{
name: 'City'  ,
selector: row => row.location,
center:true,
maxWidth:"150px",
style:{'white-space':'nowrap', "padding":"0 !important","max-width": "150px"},
// cell: ({address, city}) => ( <span className='elipsis-text'> {`${address && city ? address.capitalizeWord()+","+city.capitalizeWord() : city.capitalizeWord()||"-"}`} </span> )
cell: ({ address, city }) => (
  <ToolTip position="top" style={{ width: '100%' }} name={city ? city.map(city => city).join(', ') : '-'}>
    <span className='elipsis-text'> {`${city ? city.map(city => city).join(', ') : '-'}`} </span>
  </ToolTip>
)
},
{
name: 'Tasks Assigned',
selector: row => row.totalTask,
sortable: true,
center:true,
maxWidth:"180px",
style:{'white-space':'nowrap', "padding":"0 !important","max-width": "180px"}
}, 
{
name: 'Tasks Completed',
selector: row => row.taskCompleted,
sortable: true,
center:true,
// maxWidth:"180px",
minWidth: '170px',
style:{'white-space':'nowrap', "padding":"0 !important","max-width": "180px"}
}, 
{
name: 'Action',
center:true,
style:{"max-width": "60px"},
maxWidth:"60px",
cell: (row) =>( <div className="action">
              <Link  to={{ pathname: "/admin/execution/user-detail", 
                          state: {userData : row, module:"EXECUTION"}}} >
              <ToolTip position="left" name="View Details">
                  <span >
                      <Image name="useraddIcon" src={contentIcon} />
                  </span>
              </ToolTip>
              </Link>
            </div>
              )
}, 

];

const InstallationRequestsColumns = [
  {
    name: 'Id',
    selector: row => row.id, 
    sortable: true,
    center:true,
  },
  {
    name: 'Installation Time',
    selector: row => row.dateTime,
    sortable: true,
    center:true,
    minWidth: '180px',
    cell: ({dateTime, slotTime})=>(<span>{`${formateDate(dateTime)} | ${slotTime || '-'}`}</span>),
  },
  {
    name: 'Location'  ,
    selector: row => row.location,
    center:true,
    maxWidth:"150px",
    cell: ({ location }) => (
      <ToolTip position="top" style={{ width: "100%" }} name={location || ""}>
        <span className="cursor-pointer elipsis-text">
            {" "}
            {location?.substring(
              0,
              location.indexOf(",") !== -1 ? location.indexOf(",") : location.length
            )}
        </span>
      </ToolTip>
  ),
  },
  {
    name: 'City'  ,
    selector: row => row.city,
    center:true,
    maxWidth:"150px",
    cell: ({city}) => ( <span> {city || "-"} </span> )
  },
  {
    name: 'Request Type',
    selector: row => row.requestFor,
    center:true,
    maxWidth:"200px",
    minWidth: '130px',
    style:{"text-align": "center"},
    cell: ({requestFor}) => ( <span className="elipsis-text"> {requestFor || "-"} </span> )
  }, 
  {
    name: 'Property Type',
    selector: row => row.propertySubType,
    center:true,
    maxWidth:"200px",
    minWidth: '130px',
    style:{"text-align": "center"},
    cell: ({propertySubType}) => ( <span className="elipsis-text"> {propertySubType || "-"} </span> )
  }, 
  {
    name: 'Assigned To',
    selector: row => row.assignedTo,
    center:true,
    minWidth: '170px',
    cell: ({ id, assignedTo, userList }) => (
        !assignedTo ?
          <div className="w-100">
            <div className="assignTo">
              <Form.Group controlId="exampleForm.SelectCustom" className="w-100 display-flex">
                <Form.Control as="select" className="w-100" 
                onChange={ (e)=>handleChangeAssignee(id ,e.target.value, "InstallationRequests") }
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
    selector: row => row.status,
    center:true,
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

// const InstallationRequestsColumns = [
//   {
//     name: 'Id',
//     selector: 'id', 
//     sortable: true,
//     center:true,
//   },

//   {
//     name: 'Installation Time',
//     selector: 'dateTime',
//     sortable: true,
//     center:true,
//     minWidth: '180px',
//     cell: ({dateTime, slotTime})=>(<span>{`${formateDate(dateTime)} | ${slotTime || '-'}`}</span>),

//   },
//   // {
//   //   name: 'For'  ,
//   //   selector: 'requestFor',
//   //   center:true,

//   // },
//   {
//     name: 'Location'  ,
//     selector: 'location',
//     center:true,
//     maxWidth:"150px",
//     // cell: ({location}) => ( <span> {location !== null ? location : "-" || "-"} </span> )
//     //{row.dealInArea.substring(0, row.dealInArea.indexOf(',')!==-1 ? row.dealInArea.indexOf(',') : row.dealInArea.length)}
//     // cell: ({location}) => ( <span> {location.substring(0, location.indexOf(',')!==-1 ? location.indexOf(',') : location.length)} </span> )
//     cell: ({ location }) => (
//       <ToolTip position="top" style={{ width: "100%" }} name={location || ""}>
//          <span className="cursor-pointer elipsis-text">
//             {" "}
//             {location.substring(
//                0,
//                location.indexOf(",") !== -1 ? location.indexOf(",") : location.length
//             )}
//          </span>
//       </ToolTip>
//    ),
//   },
//   {
//     name: 'City'  ,
//     selector: 'city',
//     center:true,
//     maxWidth:"150px",
//     cell: ({city}) => ( <span> {city || "-"} </span> )
//   },
//   {
//     name: 'Property Type',
//     selector: 'propertySubType',
//     center:true,
//     maxWidth:"200px",
//     minWidth: '130px',
//     style:{"text-align": "center"},
//     cell: ({propertySubType}) => ( <span> {propertySubType || "-"} </span> )

//   }, 
//   {
//     name: 'Assigned To',
//     selector: 'assignedTo',
//     center:true,
//     minWidth: '170px',
//     // cell: ({assignedTo}) => ( <Text size="Small"  className="text-align-center" fontWeight="smbold" color="secondryColor" text={assignedTo ? assignedTo.capitalizeWord() : "-"} /> )
//     cell: ({ id, assignedTo, userList }) => (
//       // status === 'PENDING' ?
//          !assignedTo ?
//            <div className="w-100">
//              <div className="assignTo">
//                <Form.Group controlId="exampleForm.SelectCustom" className="w-100 display-flex">
//                  <Form.Control as="select" className="w-100" 
//                  onChange={ (e)=>handleChangeAssignee(id ,e.target.value, "InstallationRequests") }
//                  >
//                    <option >Assign</option>
//                    {
//                      userList.map((data, index)=>
//                        <option key={ index } value={ data.id }>{data.name}</option>,
//                      )
//                    }
//                  </Form.Control>
//                </Form.Group>
//              </div>
//            </div> :

//            <Text size="Small" color="secondryColor" className="text-center" text={ assignedTo ? assignedTo.capitalizeWord() : '-' } /> 
//           // : <Text size="Small" fontWeight="smbold" color="secondryColor" className="text-center" text={ assignTo ? assignTo.capitalizeWord() : '-' } />

// ),
//   }, 
//   {
//     name: 'Status',
//     selector: 'status',
//     center:true,
//     // maxWidth:"150px",
//     minWidth: '140px',
//     cell: ({status})=>(handleStatusElement(status))
//   }, 
//   {
//     name: 'Action',
//     center:true,
//     maxWidth:"60px",
//     cell: ({id}) =>( 
//         <div className="action">
//           <ToolTip position="left" name="View Details">
//             <span>
//                 <Link to={{ pathname: `/admin/execution/serviceRequest-details/${id}`}} > 
//                     <Image name="useraddIcon" src={contentIcon} />
//                 </Link>
//               </span>
//           </ToolTip> 
//         </div>
//         )
//   },
//   ];
  
  const _filterServiceReq = (value) => { 
    getServiceRequest({ "status":[],
    "endDate":"",
    "city":value,
    "contactNumber":"",
    "ticketNumber":"",
    "startDate":"", records:"4", pageNumber:"1"});
  }

  const ServiceReqPaginationActionButton = () => (
    <>
    <div className="d-flex justify-content-between tableBottom ml-auto">
      <ToolTip position="top" name="Under development">
        <span>
          {/* <Buttons name="Add New Entry" varient="success" type="submit" size="Small" color="white" className = "mr-2" /> */}
        </span>
      </ToolTip>
    </div>
    <div className="tableBottom ml-auto">
      <Link  to="/admin/execution/serviceRequest" className="viewAll-btn">
        <Text size="Small" fontWeight="mediumbold" color="primaryColor" text="View All" className = "ml-2 d-flex view-btn" />
      </Link>
    </div>
  </>
  );

  const [defaultSort, setDefaultSort] = useState(true);
   const [defaultSortId, setDefaultSortId] = useState('id');
   const handleSortedData = (newSortedData) => {
      // Store sorted data
      // const { selector, direction } = newSortedData;
      let selectorVal = newSortedData?.selector
      console.log(newSortedData?.selector)
      // Perform sorting based on selector and direction
      let filteredItems = installationReqData.data
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
        <>            
          <Route 
            path="/admin/execution/user-detail" 
            excat 
            render={props =><ModalModule 
              {...props} 
              module={"EXECUTION"} 
              tabName={["Tasks", "Completed"]} 
              /> } 
            />
          <div style={{height : '89vh', overflow:'auto'}}>

            <div className="cardBox"> 
                <Card className="cardWidth"> 
                    <Card.Body>
                      <div className="d-flex justify-content-between">
                          <div className="align-items-center">
                              <Text size="medium" fontWeight="mediumbold" color="primaryColor" text={executionDashboardCount.data.teamMembersCount} />
                              <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Active Team Members" className="mt-1" />
                          </div>
                          <div className="align-items-center d-flex card-group-align">
                              <Image name="sort_icon" src={personGroupIco} className="m-0" />
                          </div>
                        </div>
                    </Card.Body>
                </Card>

                <Card  className="cardWidth">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <Text size="medium" fontWeight="mediumbold" color="primaryColor" text={executionDashboardCount.data.openServiceRequestCount} />
                            <Text 
                                size="Small" 
                                fontWeight="smbold" 
                                color={executionDashboardCount.data.currentWeekOpenServiceRequestCount.toString().includes("-")?"dangerColor":"successColor"} 
                                text={executionDashboardCount.data.currentWeekOpenServiceRequestCount.toString().includes("-")?executionDashboardCount.data.currentWeekOpenServiceRequestCount:"+"+executionDashboardCount.data.currentWeekOpenServiceRequestCount  } 
                                />
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Open Service Requests" />
                            <Text size="xSmall" fontWeight="smbold" color="secondryColor" text="Change This Week" />
                        </div>
                    </Card.Body>
                </Card>

                <Card  className="cardWidth">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <Text size="medium" fontWeight="mediumbold" color="primaryColor" text={executionDashboardCount.data.installationRequestCount} />
                            <Text 
                                size="Small" 
                                fontWeight="smbold" 
                                color={executionDashboardCount.data.currentWeekInstallationRequestCount.toString().includes("-")?"dangerColor":"successColor"} 
                                text={executionDashboardCount.data.currentWeekInstallationRequestCount.toString().includes("-")?executionDashboardCount.data.currentWeekInstallationRequestCount:"+"+executionDashboardCount.data.currentWeekInstallationRequestCount } 
                                />
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Installation Requests" />
                            <Text size="xSmall" fontWeight="smbold" color="secondryColor" text="Change This Week" />
                        </div>
                    </Card.Body>
                </Card>
                
                <Card  className="cardWidth">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <Text size="medium" fontWeight="mediumbold" color="primaryColor" text={executionDashboardCount.data.installationCompletedCount} />
                            <Text 
                                size="Small" 
                                fontWeight="smbold" 
                                color={executionDashboardCount.data.currentWeekInstallationCompletedCount.toString().includes("-")?"dangerColor":"successColor"} 
                                text={executionDashboardCount.data.currentWeekInstallationCompletedCount.toString().includes("-")?executionDashboardCount.data.currentWeekInstallationCompletedCount:"+"+executionDashboardCount.data.currentWeekInstallationCompletedCount } 
                                />
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="Installation Completed" />
                            <Text size="xSmall" fontWeight="smbold" color="secondryColor" text="Change This Week" />
                        </div>
                    </Card.Body>
                </Card>
            </div>

            <div className="tableBox bg-white">
                <div className="d-flex justify-content-between align-items-center tableHeading">
                    <div>
                        <Text size="regular" fontWeight="mediumbold" color="secondryColor" text="Installation/Un-installation Requests" />
                    </div>
                  <div className="locationSelect">
                      <Form.Group controlId="exampleForm.SelectCustom" >
                            <Form.Control as="select" 
                            onChange={(e)=> {
                              setLocationsData([]);
                              setInstallationCity(e.target.value)
                              setInstallationLocation('')
                              _filterInstallationCity(e.target.value, "");
                              setInstallationCity(e.target.value)
                              if(e.target.value.length){
                                // getLocationByCity({ city: e.target.value })
                                // .then((res) => {
                                //   if (res.data && res.data.status === 200) {
                                //       const locationsByCity = res.data.resourceData.locations.map(loc=>{
                                //         return {...loc, location: `${loc.location} ,${loc.pinCode}` }
                                //       })
                                //       setLocationsData(locationsByCity)
                                //   }
                                // })
                                // .catch((err) => console.log("err:", err));
                              }
                            }}>
                                <option value="">Select City</option>
                                {
                                    allCitiesWithId?.data ? allCitiesWithId?.data?.length ? 
                                    allCitiesWithId?.data?.map((city)=>
                                        <option key={city.cityId} value={city.cityName}>{city.cityName}</option>
                                        ) 
                                    : null :null
                                }
                            </Form.Control>
                      </Form.Group>
                      {/* <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Control as="select" 
                            className="locationWidth"
                            onChange={(e)=> _filterInstallationCity(installationCity,e.target.value)
                            }
                            >
                                <option value="">Select Location</option>
                                {
                                    locationsData && locationsData.length ? 
                                    locationsData.map((_value, index)=>
                                        <option key={_value.pinCode} value={_value.location}>{_value.location}</option>
                                        ) 
                                    : null 
                                }
                            </Form.Control>
                      </Form.Group> */}
                      <Link to={{ pathname: "/admin/execution/installation-calender", 
                                state: {city : installationCity}}} >
                        <Image name="sort_icon" src={calendarIcon} className='ml-3' />
                      </Link>
                  </div>

                </div>  
                <div className='executionInstallationreqTableWrapper'>
                  <DataTableComponent 
                    onChangePage={onChangePage} 
                    data={installationReqData.data}  
                    columns={InstallationRequestsColumns} 
                    progressPending={installationReqData.isLoading}
                    paginationComponent={installationReqData?.data?.length ? PaginationComponent : null}
                    progressComponent={ProgressComponent}
                    onSort={(e) => {handleSortedData(e) }}
                    defaultSort={defaultSort}
                    defaultSortId={defaultSortId}
                  />
                </div>
              </div>
              
              <div className='servicereqTableWrapper'>
                <ListingDataTable 
                  title = 'Service Requests'
                  data = {serviceRequestData.data.length ? serviceRequestData.data.slice(0,4) : [] }
                  columns = {ServiceRequestColumns}
                  isPaginationButton = {true}
                  isLoading = {false}
                  progressPending={serviceRequestData.isLoading}
                  PaginationButton = {serviceRequestData?.data?.length ? <ServiceReqPaginationActionButton /> : null}
                  // filter
                  filterCity={excutiveDashboardCity.serviceReqCity}
                  handleFilterChange={_filterServiceReq}
                  pagination={false}
                /> 
              </div>
               
              <div className="tableBox mb-5">
                  <div className="d-flex justify-content-between align-items-center tableHeading">
                      <div>
                          <Text size="regular" fontWeight="mediumbold" color="secondryColor" text="Published Property" />
                      </div>
                        <div className="locationSelect">
                            <Form.Group controlId="exampleForm.SelectCustom">
                                {/* <Form.Label>City:</Form.Label> */}
                                <Form.Control as="select" onChange={(e)=>_filterPublishPropertyCity(e.target.value)}>
                                    <option value="">Select City</option>
                                    {
                                        allCities?.data ? allCities?.data?.cities?.length ? 
                                          allCities?.data?.cities.map((_value, index)=>
                                            <option key={index} value={_value}>{_value}</option>
                                            ) 
                                        : null :null
                                    }
                                </Form.Control>
                            </Form.Group>
                        </div>
                  </div>
                  <div className='executionPublishedpropertyTableWrapper'>
                    <DataTableComponent 
                      onChangePage={onChangePage} 
                      data={publishedProperyData.data}  
                      columns={PublishedPropertyColumns} 
                      progressPending={publishedProperyData.isLoading}
                      paginationComponent={publishedProperyData?.data?.length ? PaginationPublishedPropertyComponent : null }
                      paginationRowsPerPageOptions={[4,10,20,50]}
                      paginationPerPage={4}
                      progressComponent={ProgressComponent}
                    />                    
                  </div>
              </div>
                <div className="tableBox mb-5">
                  <div className="d-flex justify-content-between align-items-center tableHeading">
                      <div>
                          <Text size="regular" fontWeight="mediumbold" color="secondryColor" text="Installation Team" />
                      </div>
                        <div className="locationSelect">
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Control as="select" onChange={(e)=>_filterExecutionTeamCity(e.target.value)}>
                                    <option value="">Select City</option>
                                    {
                                        allCities?.data ? allCities?.data?.cities?.length ? 
                                          allCities?.data?.cities.map((_value, index)=>
                                            <option key={index} value={_value}>{_value}</option>
                                            ) 
                                        : null :null
                                    }
                                </Form.Control>
                            </Form.Group>
                        </div>
                  </div>
                  <div className='executionInstallationteamTableWrapper'>
                    <DataTableComponent 
                      onChangePage={onChangePage} 
                      data={excutiveTeamsData.data}  
                      columns={ExecutiveTeamColumns} 
                      progressPending={excutiveTeamsData.isLoading}
                      paginationComponent={excutiveTeamsData?.data?.length ? TeamTablePaginationComponent : null}
                      paginationRowsPerPageOptions={[4, 8, 12, 16,20, 24,28, 32, 36, 40]}
                      paginationPerPage={4}
                      progressComponent={ProgressComponent}
                    />
                  </div>

                    {
                      excutiveTeamsData.data.length ?  null
                      : 
                      <div className="d-flex justify-content-center">
                        <TeamTablePaginationActionButton />
                      </div>
                    }
              </div>
          </div>
        </>
    )
}
 
const mapStateToProps = ({ 
  excutiveTeamsData,  
  publishedProperyData,  
  serviceRequestData,  
  installationReqData, 
  executionDashboardCount, 
  excutiveDashboardCity,
  allCities,
  allCitiesWithId,
  allLocationsByCity 
}) => ({
    excutiveTeamsData, 
    publishedProperyData, 
    serviceRequestData, 
    installationReqData,
    executionDashboardCount,
    excutiveDashboardCity,
    allCities,
    allCitiesWithId,
    allLocationsByCity
  });

const actions = {
  getInstallationRequest,
  getServiceRequest,
  getAllPublishedProperty,
  getAllExecutiveTeams,
  getExecutionDashboardCount,
  getExcutionDashboardCity,
  getAllCity,
  getAllCityWithId,
  getLocationByCity
};

const withConnect = connect(
  mapStateToProps,
  actions,
);

export default compose(
  withConnect,
  memo,
)(ExecutionDashboard);
