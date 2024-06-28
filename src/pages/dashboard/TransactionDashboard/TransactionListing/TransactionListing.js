import React, { useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Image from '../../../../shared/Image/Image';
import { //transaction module
   getAllCity,
   getLocationByCity,
   getAllTransactionTeams,
   getTransactionDashboardCount,
   getAllTransactionMeetingRequest,
   getAllTransactionLead,
   getAllTransactionTeamsCity,
   getAllPendingDealApproval,
   changeUserAssignee,
} from '../../../../common/redux/actions';
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import { Link } from 'react-router-dom';
import Text from '../../../../shared/Text/Text';
import Pagination from '../../../../shared/DataTable/Pagination';
import { handleStatusElement, ToolTip, formateDate } from '../../../../common/helpers/Utils';
import contentIcon from '../../../../assets/images/content-ico.svg';
import Form from 'react-bootstrap/Form';
import './TransactionListing.scss'
import SearchInput from '../../../../shared/Inputs/SearchInput/SearchInput';
import CONSTANTS_STATUS from '../../../../common/helpers/ConstantsStatus';

const TransactionListing = (props) => {
  const { 
   //  getSocietyLeadsData,
    //transcation module
    getLocationByCity,
    getAllTransactionMeetingRequest,
    getAllTransactionLead,
   //  getAllTransactionTeams,
   //  getAllTransactionTeamsCity,
   //  getTransactionDashboardCount,
    getAllPendingDealApproval,
    getAllCity,
    transactionLeadsData,
   //  transactionTeamsData,
    transactionMeetingRequestData,
   //  transactionDashboardCount,
   //  transactionTeamsCityData,
    allTransactionCities,
    dealApprovalData,
  } = props;

  const [transactionLeadCity, setTransactionLeadCity] = useState("");
  const [meetingReqCity, setMeetingReqCity] = useState("");
  const [locationsData, setLocationsData] = useState([]);
  const [dealCity, setDealCity] = useState("");
//   const [locationsMeetingReqData, setLocationsMeetingReqData] = useState([]);
//   const [locationsDealData, setLocationsDealData] = useState([]);

  //state: for managing the search filters 
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

//   function onChangePage(e) {}
  

  const getStatusArr = () => {
   if(props?.tabName === "Transaction Leads" ) return CONSTANTS_STATUS.transactionLeadsStatusArr;
   if(props?.tabName === "Meeting Requests" ) return CONSTANTS_STATUS.meetingRequestsStatusArr;
   if(props?.tabName === "Deal Approvals" ) return CONSTANTS_STATUS.dealApprovalsStatusArr;
  }

  const statusArr = getStatusArr();
  const [ statusSelected , setStatusSelected ] = useState('');

   //state: for managing the CITY/LOCATION filters 
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  useEffect(() => {
    getAllCity();
    if(props?.tabName === "Transaction Leads" ){        
        getAllTransactionLead({
            city: "",
            location: "",
            pageNumber: null,
            records: null,
            zipcode: 0,
        });
    }
    if(props?.tabName === "Meeting Requests" ){        
        getAllTransactionMeetingRequest({
            city: "",
            location: "",
            pageNumber: "",
            records: "",
            zipcode: 0,
         });
    }
    if(props?.tabName === "Deal Approvals" ){ 
        getAllPendingDealApproval({
            city: "",
            location: "",
            pageNumber: null,
            records: null,
            zipcode: 0,
         });
    }   
  }, [
    getAllTransactionLead,
    getAllTransactionMeetingRequest,
    getAllPendingDealApproval,
    getAllCity,
  ]);

  const PaginationComponent = (props) => (<Pagination { ...props } />);

 
const MeetingRequestColumns = [
    {
       name: "Id",
       selector: "id",
       center: true,
       sortable: true,
       maxWidth: "50px !important",
    },
 
    {
       name: "Date",
       selector: "meetingDate",
       center: true,
       sortable: true,
       cell: ({ meetingDate }) => <span>{`${formateDate(meetingDate)}`}</span>,
    },
    {
       name: "Owner",
       selector: "ownerName",
       center: true,
       maxWidth: "120px",
       style: { "max-width": "120px" },
       cell: ({ ownerName, ownerMobileNumber }) => ( <ToolTip position="top" name={<div>
         {" "}
         <span>{ownerName || "-"} </span>
         <span> {`(${ownerMobileNumber})` } </span>
      </div> }>
      <span className="cursor-pointer elipsis-text"> {ownerName || "-"} </span>
    </ToolTip> ),
    },
    {
       name: "Buyer",
       selector: "buyerName",
       center: true,
       maxWidth: "120px",
       style: { "max-width": "120px" },
       cell: ({ buyerName, buyerMobileNumber }) => ( <ToolTip position="top" name={<div>
         {" "}
         <span>{buyerName || "-"} </span>
         <span> {`(${buyerMobileNumber})` } </span>
      </div> }>
      <span className="cursor-pointer elipsis-text"> {buyerName || "-"} </span>
    </ToolTip> ),
    },
    {
       name: "Location",
       selector: "location",
       sortable: false,
       center: true,
       wrap: true,
       style: { padding: "0 !important" },
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
       name: "Assigned To",
       selector: "assignedTo",
       center: true,
       minWidth: '120px',
       cell: (
          { assignedTo } 
       ) =>
          !assignedTo ? (
             <div className="w-100">
                <div className="assignTo">
                   <Form.Group controlId="exampleForm.SelectCustom" className="w-100 display-flex">
                      <Form.Control
                         as="select"
                         className="w-100"
                      >
                         <option>Assign</option>
                      </Form.Control>
                   </Form.Group>
                </div>
             </div>
          ) : (
             <Text
                size="Small"
               //  fontWeight="smbold"
                color="secondryColor"
                className="text-center"
                text={assignedTo ? assignedTo.capitalizeWord() : "-"}
             />
          ),
    },
    {
       name: "For",
       selector: "propertyCategory",
       center: true,
       cell: ({ propertyCategory }) => (
          <span className="text-align-center">
             {propertyCategory === "Lease" ? "Rent" : propertyCategory || "-"}
          </span>
       ),
    },
    {
       name: "Status",
       selector: "status",
       center: true,
       maxWidth: "120px",
       style: { "white-space": "nowrap", padding: "0 !important", "max-width": "120px" },
       cell: ({ status }) => handleStatusElement(status),
    },
    {
       name: "Action",
       center: true,
       maxWidth: "50px",
       cell: (row) => (
          <div className="action">
             <ToolTip position="left" name="View Details">
                <span>
                   <Link
                      to={{
                         pathname: `/admin/transaction/meeting-details/${row.id}`,
                         state: {
                            module: "MEETING_REQUEST",
                         },
                      }}
                   >
                      <Image name="useraddIcon" src={contentIcon} />
                   </Link>
                </span>
             </ToolTip>
          </div>
       ),
    },
 ];
 
 const dealApprovalColumns = [
    {
       name: "Id",
       selector: "id",
       center: true,
       sortable: true,
    },
    {
       name: "Event Date",
       selector: "date",
       sortable: true,
       center: true,
       cell: ({ date }) => <span>{`${formateDate(date)} `}</span>,
    }, 
    {
       name: "Owner Name",
       selector: "ownerName",
       center: true,
       cell: ({ ownerName }) => <span>{ownerName}</span>,
    },
    {
       name: "Location",
       selector: "location",
       center: true,
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
       name: "Assigned To",
       selector: "assignedTo",
       center: true,
       cell: (
          { assignedTo } 
       ) =>
          !assignedTo ? (
             <div className="w-100">
                <div className="assignTo">
                   <Form.Group controlId="exampleForm.SelectCustom" className="w-100 display-flex">
                      <Form.Control
                         as="select"
                         className="w-100"
                      >
                         <option>Assign</option>
                      </Form.Control>
                   </Form.Group>
                </div>
             </div>
          ) : (
             <Text
                size="Small"
                color="secondryColor"
                className="text-center"
                text={assignedTo ? assignedTo.capitalizeWord() : "-"}
             />
          ),
    },
    {
       name: "Status",
       selector: "status",
       center: true,
       maxWidth: "120px",
       style: { "white-space": "nowrap", padding: "0 !important", "max-width": "120px" },
       cell: ({ status }) => handleStatusElement(status),
    },
 ];
 
//  const transactionTeamsColumns = [
//     {
//        name: "Id",
//        selector: "id",
//        center: true,
//        sortable: true,
//     }, 
//     {
//        name: "Name",
//        selector: "name",
//        center: true,
//        cell: ({ name, imageUrl }) => (
//           <div className="userName">
//              <div className="userImage">
//                 <Image name="userImage" src={imageUrl || userImage} />
//              </div>
//              <Text
//                 size="Small"
//                 color="secondryColor"
//                 text={name ? name.capitalizeWord() : "-"}
//              />
//           </div>
//        ),
//     },
//     {
//        name: "Role",
//        selector: "position",
//        center: true,
//        maxWidth: "280px",
//        style: { "white-space": "nowrap", padding: "0 !important", "max-width": "200px" },
//     },
//     {
//        name: "Tasks",
//        selector: "userTask",
//        sortable: true,
//        center: true,
//        maxWidth: "180px",
//        style: { "white-space": "nowrap", padding: "0 !important", "max-width": "180px" },
//     },
//     {
//        name: "Action",
//        center: true,
//        style: { "max-width": "60px" },
//        maxWidth: "60px",
//        cell: (row) => (
//           <div className="action">
//              <ToolTip position="left" name="View Details">
//                 <span>
//                    <Link
//                       to={{
//                          pathname: "/admin/execution/user-detail",
//                          state: { userData: row, module: "EXECUTION" },
//                       }}
//                    >
//                       <Image name="useraddIcon" src={contentIcon} />
//                    </Link>
//                 </span>
//              </ToolTip>
//           </div>
//        ),
//     },
//  ];

 const handleUserAssignmet = (lead_Id, assigned_To, lead_For) => {
   const data = {
      leadId: Number(lead_Id),
      assignedTo: Number(assigned_To),
      leadFor: "TRANSACTION_LEAD",
   };
   changeUserAssignee(data)
   .then((res)=> {
      if(res.data.status === 200){
         getAllTransactionLead({
            city: "",
            location: "",
            pageNumber: "",
            records: "",
            zipcode: 0,
         });
      }
   })
   .catch((err)=> 
      console.log('err:', err)
   )      
};
 
 const TransactionLeadsColumns = [
    {
       name: "Id",
       selector: "id",
       sortable: true,
       center: true,
    }, 
    {
       name: "Date",
       selector: "meetingDate",
       sortable: true,
       center: true,
       cell: ({ meetingDate }) => <span>{`${formateDate(meetingDate)} `}</span>,
    },
    {
       name: "Buyer",
       selector: "buyerName",
       center: true,
       maxWidth: "120px",
       style: { "max-width": "120px" },
       cell: ({ buyerName, buyerMobileNumber }) => ( <ToolTip position="top" name={<div>
         {" "}
         <span>{buyerName || "-"} </span>
         <span> {`(${buyerMobileNumber})` } </span>
      </div> }>
      <span className="cursor-pointer elipsis-text"> {buyerName || "-"} </span>
    </ToolTip> ),
    },
    {
       name: "Location",
       selector: "location",
       center: true,
       sortable: false,
       wrap: true,
       style: { padding: "0 !important" },
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
      name: "Assigned To",
      selector: "assignedTo",
      center: true,
      cell: (
         { id, assignedTo, userList } 
      ) =>
         !assignedTo ? (
            <div className="w-100">
               <div className="assignTo">
                  <Form.Group controlId="exampleForm.SelectCustom" className="w-100 display-flex">
                     <Form.Control
                        as="select"
                        className="w-100"
                        onChange={(e) => handleUserAssignmet(id, e.target.value)}
                     >
                        <option>Assign</option>
                        {userList?.length ? userList?.map((data, index) => (
                           <option key={index} value={data.id}>
                              {data.name}
                           </option>
                        )):""}
                     </Form.Control>
                  </Form.Group>
               </div>
            </div>
         ) : (
            <Text
               size="Small"
               color="secondryColor"
               className="text-center"
               text={assignedTo ? assignedTo.capitalizeWord() : "-"}
            />
         ),
   },
    {
       name: "For",
       selector: "propertyCategory",
       center: true,
       cell: ({ propertyCategory }) => (
          <span className="text-align-center">
             {propertyCategory === "Lease" ? "Rent" : propertyCategory || "-"}
          </span>
       ),
    },
    {
       name: "Status",
       selector: "status",
       center: true,
       maxWidth: "120px",
       style: { "white-space": "nowrap", padding: "0 !important", "max-width": "120px" },
       cell: ({ status }) => handleStatusElement(status),
    },
    {
       name: "Action",
       center: true,
       maxWidth: "50px",
       cell: ({ id }) => (
          <div className="action">
             <ToolTip position="left" name="View Details">
                <span>
                   <Link
                      to={{
                         pathname: `/admin/transaction/lead-details/${id}`,
                         state: {
                            module: "LEAD_DETAILS",
                         },
                      }}
                   >
                      <Image name="useraddIcon" src={contentIcon} />
                   </Link>
                </span>
             </ToolTip>
          </div>
       ),
    },
 ];

 const _filterTransactionLeads = (city, locationData) => {
      let zipcode = ''
      let data = locationData
      const regex = /([^,]+),\s*(\d{6})/;
      const matches = data.match(regex);

      if (matches) {
        const location = matches[1].trim();
        const zipcode = matches[2];
        console.log(city,location,zipcode,"data for filter");
        getAllTransactionLead({
         city,
         location: location,
         pageNumber: null,
         records: null,
         zipcode: Number(zipcode),
      });
      }
      if(locationData===""){
         setTransactionLeadCity(city);
    console.log("zipcode:", zipcode);
    getAllTransactionLead({
       city,
       location: "",
       pageNumber: null,
       records: null,
       zipcode: '',
    });
      }
    
 };

 const _filterMeetingRequestCity = (city, locationData) => {
   let zipcode = ''
      let data = locationData
      const regex = /([^,]+),\s*(\d{6})/;
      const matches = data.match(regex);

      if (matches) {
        const location = matches[1].trim();
        const zipcode = matches[2];
        console.log(city,location,zipcode,"data for filter");
        getAllTransactionMeetingRequest({
         city,
         location: "",
         pageNumber: "",
         records: "",
         zipcode: Number(zipcode),
      });
      }
      if(locationData===""){
         setMeetingReqCity(city);
    getAllTransactionMeetingRequest({
       city,
       location: "",
       pageNumber: "",
       records: "",
       zipcode: Number(zipcode),
    });
      }
    
 };

 const _filterDealRequests = (city, locationData) => {
   console.log(city, locationData,"deal approval");
   let zipcode = ''
      let data = locationData
      const regex = /([^,]+),\s*(\d{6})/;
      const matches = data.match(regex);

      if (matches) {
        const location = matches[1].trim();
        const zipcode = matches[2];
        console.log(city,location,zipcode,"data for filter");
        getAllPendingDealApproval({
         city,
         location: "",
         pageNumber: null,
         records: null,
         zipcode: Number(zipcode),
      });
      }
      if(locationData===""){
         setDealCity(city);
    getAllPendingDealApproval({
       city,
       location: "",
       pageNumber: null,
       records: null,
       zipcode: Number(zipcode),
    });
      }
    
 };

const [ showModal, setShowModal ] = useState(false);
//   const [ datePickervalue, setDatePickervalue ] = useState('');

//   const handleClose = () => {
//     setShowModal(false);
//   }
  const handleOpen = () => {
    setShowModal(true);
  }

//   const FilterComponent = () => {
//     return (<div>
//       <Buttons
//         name="Filter"
//         varient="secondary"
//         type="submit"
//         size="Small"
//         color="black"
//         iconSrc={ filterIcon }
//         className= "mr-2 font-weight-bold filterButton"
//         onClick={ ()=>handleOpen() }
//       />
//     </div>)
//   }

  const showData = (status_value) => {
      let status = status_value || statusSelected;
      let filteredItems = [];
      if(props?.tabName === "Transaction Leads" ){   
          filteredItems =  transactionLeadsData.data.length ?
          transactionLeadsData.data.filter(item => { 
          return  item?.id === filterText || 
          item?.buyerName?.toLowerCase().includes(filterText.toLowerCase())||
          item?.location?.toLowerCase().includes(filterText.toLowerCase()) 
        || item?.assignedTo?.toLowerCase().includes(filterText.toLowerCase())
          }):[]
         // return filteredItems;
      }
      if(props?.tabName === "Meeting Requests" ){ 
      filteredItems =  transactionMeetingRequestData.data.length ?
      transactionMeetingRequestData.data.filter(item => { 
          return  item?.id === filterText || 
         (item?.ownerName?.toLowerCase().includes(filterText.toLowerCase()))||
         item?.buyerName?.toLowerCase().includes(filterText.toLowerCase()) ||
         item?.location?.toLowerCase().includes(filterText.toLowerCase()) ||
         (item?.assignedTo !== null ? item?.assignedTo?.toLowerCase().includes(filterText.toLowerCase()): []);
          }):[]
         // return filteredItems;
      }
      if(props?.tabName === "Deal Approvals" ){ 
      //   return dealApprovalData.data;
      filteredItems =  dealApprovalData.data.length ?
      dealApprovalData.data.filter(item => { 
         return  item?.id === filterText || 
         (item?.ownerName?.toLowerCase().includes(filterText.toLowerCase()))||
         item?.location?.toLowerCase().includes(filterText.toLowerCase()) ||
         (item?.assignedTo !== null ? item?.assignedTo?.toLowerCase().includes(filterText.toLowerCase()): []);
         }):[]
         // return filteredItems; 
      }
      if(status && filteredItems.length){
         filteredItems = filteredItems.filter(item => { 
           return  item?.status === status;
         })
      } 
      return filteredItems;
  }

   const showColumns = () => {
      if(props?.tabName === "Transaction Leads" ){
         return TransactionLeadsColumns;
      }
      if(props?.tabName === "Meeting Requests" ){ 
         return MeetingRequestColumns;
      }
      if(props?.tabName === "Deal Approvals" ){ 
      return dealApprovalColumns;
      }
   }

   const _filterCityData = (city, zipcode) => {
      if(props?.tabName === "Transaction Leads" ){
            _filterTransactionLeads(city, zipcode);
               
      }
      if(props?.tabName === "Meeting Requests" ){ 
            _filterMeetingRequestCity(city, zipcode);
      }
      if(props?.tabName === "Deal Approvals" ){ 
            _filterDealRequests(city, zipcode);
      }
      setSelectedCity(city);
      setSelectedLocation('')
      if(city && city.length){
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
      
      if(props?.tabName === "Transaction Leads" ){
         _filterTransactionLeads(city, zipcode);
               
      }
      if(props?.tabName === "Meeting Requests" ){ 
         _filterMeetingRequestCity(city, zipcode);
      }
      if(props?.tabName === "Deal Approvals" ){ 
         _filterDealRequests(city, zipcode);
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

   const StatusFilterDD = () => {
      return (
         <>
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
         </>
      );
   }

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
             text={props?.tabName}
          />
       </div>
       <div className="locationSelect d-flex">
       {subHeaderComponentMemo}
       <StatusFilterDD/>
          <Form.Group controlId="exampleForm.SelectCustom">
             {/* <Form.Label>City:</Form.Label> */}
             <Form.Control
                as="select"
                value={selectedCity}
                onChange={(e) => {
                     setLocationsData([]);
                    _filterCityData(e.target.value, '');                   
                 }}
             >
                <option value="">Select City</option>
                {allTransactionCities?.data?.cities &&
                allTransactionCities?.data?.cities.length
                   ? allTransactionCities?.data?.cities.map((_value, index) => (
                        <option key={index} value={_value}>
                           {_value}
                        </option>
                     ))
                   : null}
             </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.SelectCustom">
             {/* <Form.Label>Location:</Form.Label> */}
             <Form.Control
                as="select"
                value ={selectedLocation} 
                onChange={(e) =>{
                //    _filterTransactionLeads(transactionLeadCity, e.target.value)
                   setSelectedLocation(e.target.value)
                    _filterLocationData(selectedCity, e.target.value)
                }}
                className="locationWidth"
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
       </div>
    </div>
      <div className='transactionLead1234'>
       <DataTableComponent
         data={showData()}
         columns={showColumns()}
         progressPending={transactionLeadsData.isLoading}
         paginationRowsPerPageOptions={ [ 8,  16, 24, 32, 40, 48, 56, 64, 72, 80 ] }
         paginationPerPage={ 8 }
         perPageOptions={ [  8,  16, 24, 32, 40, 48, 56, 64, 72, 80 ] }
         PaginationComponent={ PaginationComponent }
       />
      </div>
 </div>

  );
}

const mapStateToProps = ({ salesLeadsDataTable,
  salesLeadsCount,
  getSocietyLeadsCityData, 
    //transaction module
    transactionTeamsData,
   allTransactionCities,
   allLocationsByCity,
   transactionDashboardCount,
   transactionMeetingRequestData,
   transactionLeadsData,
   transactionTeamsCityData,
   dealApprovalData,
}) => ({
  salesLeadsDataTable,
  salesLeadsCount,
  getSocietyLeadsCityData,
  ////transaction module
  transactionTeamsData,
   allTransactionCities,
   allLocationsByCity,
   transactionDashboardCount,
   transactionMeetingRequestData,
   transactionLeadsData,
   transactionTeamsCityData,
   dealApprovalData,
});

const actions = {
  //transaction module
   getAllCity,
   getLocationByCity,
   getAllTransactionTeams,
   getTransactionDashboardCount,
   getAllTransactionMeetingRequest,
   getAllTransactionLead,
   getAllTransactionTeamsCity,
   getAllPendingDealApproval,
};

const withConnect = connect(
    mapStateToProps,
    actions,
);

export default compose(
    withConnect,
    memo,
)(TransactionListing);
