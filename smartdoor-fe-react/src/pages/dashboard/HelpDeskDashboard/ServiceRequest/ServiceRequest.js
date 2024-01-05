import React, { useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Image from '../../../../shared/Image/Image';
import { getHelpDeskServiceRequest,
  getServiceRequest,
  getExcutionDashboardCity,
  changeInstallationAssignee
} from '../../../../common/redux/actions';
import { Link } from 'react-router-dom';
import Text from '../../../../shared/Text/Text';
import Pagination from '../../../../shared/DataTable/Pagination';
import { handleStatusElement, ToolTip, formateDate, dateWithFormate } from '../../../../common/helpers/Utils';
import contentIcon from '../../../../assets/images/content-ico.svg';
import Form from 'react-bootstrap/Form';
import './ServiceRequest.scss'
import SearchInput from '../../../../shared/Inputs/SearchInput/SearchInput';
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import './ServiceRequest.scss';
import CONSTANTS_STATUS from '../../../../common/helpers/ConstantsStatus';

const ServiceRequest = (props) => {
  const {
    // HELPDESK
    getHelpDeskServiceRequest,
    helpdeskServiceReq,

    // EXECUTION
    getServiceRequest,
    serviceRequestData,    

  } = props;

  const [ filterData, setfilterData ] = useState({
    'status': [],
    'endDate': '',
    'city': '',
    'contactNumber': '',
    'ticketNumber': '',
    'startDate': '',
  })

  //state: for managing the status filter.
  const statusArr  = props.module === "HELPDESK" ? CONSTANTS_STATUS.helpdeskServiceRequestsStatusArr : CONSTANTS_STATUS.installationServiceRequestsStatusArr ;
  const [ statusSelected , setStatusSelected ] = useState('');
  const [teamSelected, setTeamSelected] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [teamFilter, setTeamFilter] = useState('');

  //state: for managing the search filters 
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  useEffect(() => {
    // HELPDESK
    if (props.module==='HELPDESK') {
      getHelpDeskServiceRequest({ ...filterData, records: '', pageNumber: '',
      });
    } else {
    // EXECUTION
      getServiceRequest({ ...filterData, records: '', pageNumber: '' });
      getExcutionDashboardCity();
    }
  }, [ getHelpDeskServiceRequest,
    getServiceRequest,
  ]);


  const ServiceReqPaginationComponent = (props) => (<Pagination { ...props } />);

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

  const handleChangeAssignee = (requestId , userId) =>{
    changeInstallationAssignee({ userRequestId: requestId,
      executivePersonId: userId,
    }).then((res)=> {
      if(res.data.status === 200){
        getServiceRequest({ "status":[],
        "endDate":"",
        "city":"",
        "contactNumber":"",
        "ticketNumber":"",
        "startDate":"",records:"", pageNumber:""});
      }
    })
    .catch(err=> console.log(err))
  }

  const ServiceRequestColumns = [
    {
      name: 'Id',
      selector: 'ticketNo',
      center: true,
      sortable: true,
      maxWidth: '100px !important',
    },
    {
      name: 'Date',
      selector: 'createdDate',
      center: true,
      sortable: true,
      // style: { padding: "0 !important" },
      // sortFunction: (rowA, rowB) => rowA.createdDate - rowB.time,
      cell: ({ createdDate, time })=>(<span>{`${ formateDate(createdDate) } | ${ dateWithFormate(createdDate, 'hh:mm a') || '-' }`}</span>),
    },
    {
      name: 'Request',
      selector: 'ticketName',
      center: true,
      // maxWidth: '120px',
      // style: { 'max-width': '120px' ,'padding': "0 !important"},
      cell: ({ ticketName }) => ( <ToolTip position="top" name={ ticketName|| '' }>
        <span className="cursor-pointer elipsis-text"> {ticketName || '-'} </span>
      </ToolTip> ),
    },
    {
      name: 'From',
      selector: 'requestedBy',
      maxWidth: '100px',
      center: true,
      cell: ({ from }) => ( 
        <div>
          <ToolTip position="top" name={from}>
            <span className="cursor-pointer elipsis-text"> {from || '-'} </span>
          </ToolTip>
        </div>
      ),  
    },
    {
      name: 'Phone No',
      center: true,
      // maxWidth: '100px',
      maxWidth: '130px',
      cell: ({ contactNumber }) => ( <span> {contactNumber || '-'} </span> ),
    },
    {
      name: 'Assigned To',
      selector: 'assignTo',
      center: true,
      maxWidth: '130px',
      // cell: ({ assignTo }) => ( <Text size="Small" fontWeight="smbold" color="secondryColor" text={ assignTo ? assignTo.capitalizeWord() : 'UNASSIGNED' } /> ),
      cell: ({ id,teamName, teamNameList ,assignTo, userList,}) => (
        // status === 'PENDING' ?
          //  !teamName ?
          //    <div className="w-100">
          //      <div className="assignTo">
          //        <Form.Group controlId="exampleForm.SelectCustom" className="w-100 display-flex">
          //          <Form.Control as="select" className="w-100" 
          //          onChange={ (e)=>handleChangeDepartmentAssignee(id ,e.target.value) }
          //          >
          //            <option >Assign</option>
          //            {
          //              teamNameList && teamNameList!== null ?teamNameList.map((data, index)=>
          //                <option key={ index } value={ data }>{data}</option>
          //              ):'unassigned'}
          //          </Form.Control>
          //        </Form.Group>
          //      </div>
          //    </div> :
          props.module ==="HELPDESK" ?
          <Text size="Small" color="secondryColor" className="text-center" text={ teamName ? teamName : 'UNASSIGNED' }/>
          :
          !assignTo ?
          <div className="w-100">
            <div className="assignTo">
              <Form.Group controlId="exampleForm.SelectCustom" className="w-100 display-flex">
                <Form.Control as="select" className="w-100 mb-1" 
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

          <Text size="Small" color="secondryColor" className="text-center" text={ assignTo ? assignTo.capitalizeWord() : '-' } />
            // : <Text size="Small" fontWeight="smbold" color="secondryColor" className="text-center" text={ assignTo ? assignTo.capitalizeWord() : '-' } />
  
    ),
    },
    {
      name: 'Status',
      selector: 'status',
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
             { props.module==="HELPDESK" ?
             <Link to={ { pathname: `/admin/helpdesk/serviceRequest-details/${ id }` } } >
                <Image name="useraddIcon" src={ contentIcon } />
              </Link>
              :
              <Link to={ { pathname: `/admin/execution/serviceRequest-details/${ id }` } } >
              <Image name="useraddIcon" src={ contentIcon } />
              </Link>}
            </span>
          </ToolTip>
        </div>
      ),
    },
  ];

 const showData = (status_value, team_value) => {
  console.log(status_value,"show data status");
  console.log(team_value, "show data team");
  let statusVal = status_value || statusSelected;
  let teamVal= team_value || teamSelected 
  let filteredItems = [];
  if(props.module==='HELPDESK' ){   
      filteredItems =  helpdeskServiceReq.data.length ?
      helpdeskServiceReq.data.filter(item => { 
      return item?.id == filterText || 
      item?.ticketName?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.from?.toLowerCase().includes(filterText.toLowerCase()) ||
      (item?.contactNumber?.toLowerCase().includes(filterText.toLowerCase())) 
    }):[]
    if(statusVal && filteredItems.length){
      filteredItems = filteredItems.filter(item => { 
        return  item?.status.toUpperCase() == statusVal.toUpperCase();
      })
    }
    if(teamVal && filteredItems.length){
      filteredItems = filteredItems.filter(item => { 
        return  item?.teamName.toUpperCase() == teamVal.toUpperCase();
      })
    }
     return filteredItems;
  }else{ 
  filteredItems =  serviceRequestData.data.length ?
  serviceRequestData.data.filter(item => { 
    return item?.id == filterText || 
    item?.ticketName?.toLowerCase().includes(filterText.toLowerCase()) ||
    item?.from?.toLowerCase().includes(filterText.toLowerCase()) ||
    (item?.contactNumber?.toLowerCase().includes(filterText.toLowerCase())) 
        }):[]
    if(statusVal && filteredItems.length){
      filteredItems = filteredItems.filter(item => { 
        return  item?.status.toUpperCase() == statusVal.toUpperCase();
      })
    } 
     return filteredItems;
  }  
}

 const _filterStatus = (status_value) => {
  setStatusSelected(status_value);
  setStatusFilter(status_value)
  showData(status_value, teamFilter)
}

const _filterTeam = (team_value) => {
  // console.log(team_value,"filter team value");
  setTeamSelected(team_value);
  setTeamFilter(team_value)
  showData(statusFilter, team_value)
}

  return (
    <div className="tableBox bg-white">
    <div className="d-flex justify-content-between align-items-center tableHeading">
       <div>
          <Text
             size="regular"
             fontWeight="mediumbold"
             color="secondryColor"
             text={'Service Requests'}
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

            {
        <Form.Group controlId="exampleForm.SelectCustom">
              {/* <Form.Label>City:</Form.Label> */}
              <Form.Control
                  as="select"
                  value={teamSelected}
                  onChange={(e) => { _filterTeam(e.target.value)}}
              >
                  <option value="">Select Team</option>
                  <option value="Sales Team">Sales Team</option>
                  <option value="Installation Team">Installation Team</option>
                  <option value="Helpdesk Team">Helpdesk Team</option>
                  <option value="Finance Team">Finance Team</option>
              </Form.Control>
            </Form.Group>
            }
       </div>
    </div>
      <div className='servicrequestServicerequestsTableWrapper'>
      
       <DataTableComponent
          data = {showData()}
          columns={ ServiceRequestColumns }
          isPaginationButton={ false }
          isLoading={ false }
          perPageOptions={ [  8,  16, 24, 32, 40, 48, 56, 64, 72, 80 ] }
          paginationPerPage={ 8 }
          paginationRowsPerPageOptions={[  8,  16, 24, 32, 40, 48, 56, 64, 72, 80 ]}
          PaginationComponent={ ServiceReqPaginationComponent }
          progressPending={props.module==='HELPDESK' ? helpdeskServiceReq.isLoading : serviceRequestData.isLoading }
        />
      </div>
 </div>

  );
}

const mapStateToProps = ({
  helpdeskServiceReq,  
  serviceRequestData,  
}) => ({
  helpdeskServiceReq,  
  serviceRequestData,  
});

const actions = {
  getHelpDeskServiceRequest,  
  getServiceRequest, 
};

const withConnect = connect(
    mapStateToProps,
    actions,
);

export default compose(
    withConnect,
    memo,
)(ServiceRequest);
