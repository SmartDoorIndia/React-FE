import React, { useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Image from '../../../../shared/Image/Image';
import { getSocietyLeadsData,
  getLeadsCount,
  getSocietyLeadsCity,
  assignLeadToUser, 
  getAllCity} from '../../../../common/redux/actions';
import { Link } from 'react-router-dom';
import Text from '../../../../shared/Text/Text';
import Pagination from '../../../../shared/DataTable/Pagination';
import { handleStatusElement, ToolTip, formateDate } from '../../../../common/helpers/Utils';
import contentIcon from '../../../../assets/images/content-ico.svg';
import Form from 'react-bootstrap/Form';
import './SocietyLeads.scss'
import SearchInput from '../../../../shared/Inputs/SearchInput/SearchInput';
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import CONSTANTS_STATUS from '../../../../common/helpers/ConstantsStatus';

const SocietyLeads = (props) => {
  const { 
    getSocietyLeadsData,
    salesLeadsDataTable,
    getSocietyLeadsCity,
    getAllCity,
    // getSocietyLeadsCityData,
    allCities
  } = props;
  const [ showModal, setShowModal ] = useState(false);
  // const [ datePickervalue, setDatePickervalue ] = useState('');

  // const handleClose = () => {
  //   setShowModal(false);
  // }
  // const handleOpen = () => {
  //   setShowModal(true);
  // }

   //state: for managing the status filter.
   const statusArr  = CONSTANTS_STATUS.societyLeadsStatusArr ;
   const [ statusSelected , setStatusSelected ] = useState('');

  //state to manange search component
  const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  const [selectedCity, setSelectedCity] = useState('');

  const [ filterData, setfilterData ] = useState({
    'city': '',
    'endDate': '',
    'id': '',
    'societyName': '',
    'startDate': '',
    'status': [],
  })

  const _filterCityData = (city, zipcode) => {   
    setSelectedCity(city);
      getSocietyLeadsData({ ...filterData, city, records: '', pageNumber: '' });
      // getSocietyLeadsCity();
}

  useEffect(() => {
    getSocietyLeadsData({ ...filterData, records: '', pageNumber: '' });
    // getSocietyLeadsCity();
    getAllCity();
  }, [ getSocietyLeadsData,
    getSocietyLeadsCity,
    getAllCity
  ]);

  // const _filterReq = (value) => {
  //   getSocietyLeadsData({
  //     ...filterData, city: value, records: '', pageNumber: '',
  //   })
  // }

  const PaginationComponent = (props) => (<Pagination { ...props } />);

  function handleUserAssignmet(leadId, userId) {
    if (leadId && userId) {
      assignLeadToUser({ leadId, userId })
          .then( (res) => {
            if(res.data.status ===200) {
              getSocietyLeadsData({ ...filterData, records: '', pageNumber: '' });
            }
          })
          .catch( (err) => {
            console.log(err)
          })
    }
  }

  const columns = [
    {
      name: 'Id',
      selector: 'leadId',
      center: true,
      sortable: true,
    },
    {
      name: 'Date',
      selector: 'leadDate',
      sortable: true,
      center: true,
      maxWidth: '130px',
      cell: ({ leadDate })=>(<span>{formateDate(leadDate)}</span>),
    },
    {
      name: 'Source',
      selector: 'source',
      center: true,
      maxWidth: '60px',
    },
    {
      name: 'Society',
      selector: 'societyName',
      center: true,
      cell: ({ societyName })=>(<ToolTip position="top" style={ { width: '100%' } } name={ societyName || '' }>
        <span className="cursor-pointer elipsis-text"> {societyName||'-'}</span>
      </ToolTip>),
    },
    {
      name: 'City',
      selector: 'city',
      center: true,
    },
    {
      name: 'Assigned To',
      selector: 'assignTo',
      center: true,
      cell: ({ assignTo, assignToList, leadId, status }) => (
                  status === 'PENDING' ?
                     !assignTo ?
                       <div className="w-100">
                         <div className="assignTo">
                           <Form.Group controlId="exampleForm.SelectCustom" className="w-100 display-flex">
                             <Form.Control as="select" className="w-100" onChange={ (e)=>handleUserAssignmet(leadId, e.target.value) }>
                               <option >Assign</option>
                               {
                                 assignToList.map((data, index)=>
                                   <option key={ index } value={ data.id }>{data.name}</option>,
                                 )
                               }
                             </Form.Control>
                           </Form.Group>
                         </div>
                       </div> :
                       <Text size="Small"  color="secondryColor" className="text-center" text={ assignTo ? assignTo.capitalizeWord() : '-' } /> :
                       <Text size="Small"  color="secondryColor" className="text-center" text={ assignTo ? assignTo.capitalizeWord() : '-' } />
      ),
    },
    {
      name: 'Status',
      selector: 'status',
      center: true,
      cell: ({ status })=>(handleStatusElement(status === 'COMPLETED' ? 'CONVERTED' : status)),
    },
    {
      name: 'Action',
      center: true,
      maxWidth: '60px',
      cell: ({ leadId, status }) =>( <div className="action">
        <ToolTip position="left" name="View Details">
          <span>
            <Link to={ { pathname: '/admin/sales/lead-details',
              state: { leadId: leadId },
            } }>
              <Image name="editIcon" src={ contentIcon } />
            </Link>
          </span>
        </ToolTip>
      </div>
      ),
    },

  ];

  // const handleApplyFilter = (e) =>{
  //   _filterReq();
  //   handleClose();
  // }

  // const handleStatusChange = (e, status_val)=>{
  //   if (filterData.status.includes(status_val)) {
  //     console.log('status already present in the array', e.target.checked)
  //     if (e.target.checked ===false) {
  //       setfilterData((prevState)=>{
  //         return { ...prevState, status: prevState.status.filter((cVal)=>cVal !== status_val) }
  //       })
  //     }
  //   } else {
  //     setfilterData((prevState)=>{
  //       return { ...prevState, status: [ ...prevState.status, status_val ] }
  //     })
  //   }
  // }

  // const clearFilter = () =>{
  //   setfilterData({
  //     'city': '',
  //     'endDate': '',
  //     'id': '',
  //     'societyName': '',
  //     'startDate': '',
  //     'status': [],
  //   });
  //   setDatePickervalue('')
  // }

  // const FilterComponent = () => {
  //   return (<div>
  //     <Buttons
  //       name="Filter"
  //       varient="secondary"
  //       type="submit"
  //       size="Small"
  //       color="black"
  //       iconSrc={ filterIcon }
  //       className= "mr-2 font-weight-bold filterButton"
  //       onClick={ ()=>handleOpen() }
  //     />
  //   </div>)
  // }

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

//   const filteredItems = salesLeadsDataTable.data.length ? 
//   salesLeadsDataTable.data.filter(item => { //contactNumber
//   return  item?.leadId == filterText || 
//   item?.societyName?.toLowerCase().includes(filterText.toLowerCase())
//   || item?.source?.toLowerCase().includes(filterText.toLowerCase())
//   || item?.city?.toLowerCase().includes(filterText.toLowerCase())
//   || item?.status?.toLowerCase().includes(filterText.toLowerCase())
//   || (item?.assignTo?.toLowerCase().includes(filterText.toLowerCase()))

// }):[];

const showData = (status_value) => {
  let status = status_value || statusSelected;
  let filteredItems = [];
  filteredItems = salesLeadsDataTable.data.length ? 
  salesLeadsDataTable.data.filter(item => { //contactNumber
  return  item?.leadId === filterText || 
  item?.societyName?.toLowerCase().includes(filterText.toLowerCase())
  || item?.source?.toLowerCase().includes(filterText.toLowerCase())
  || item?.city?.toLowerCase().includes(filterText.toLowerCase())
  || item?.status?.toLowerCase().includes(filterText.toLowerCase())
  || (item?.assignTo?.toLowerCase().includes(filterText.toLowerCase()))
  }):[];
  if(status && filteredItems.length){
    filteredItems = filteredItems.filter(item => { 
      return  item?.status.toUpperCase() === status.toUpperCase();
    })
 } 
  return filteredItems;
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
            text={'Society Leads'}
          />
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
                {allCities?.data &&
                allCities?.data?.cities?.length
                  ? allCities?.data?.cities.map((_value, index) => (
                        <option key={index} value={_value}>
                          {_value}
                        </option>
                    ))
                  : null}
            </Form.Control>
          </Form.Group>
      </div>
    </div>
    <div className='SocietyLeadsTableWrapper'>
      <DataTableComponent       
        data = {showData()}
        columns={columns}
        progressPending={salesLeadsDataTable.isLoading}
        paginationRowsPerPageOptions={ [8, 16, 24, 32, 40, 48, 56, 64, 72, 80 ] }
        paginationPerPage={ 8 }
        perPageOptions={ [ 8,  16, 24, 32, 40, 48, 56, 64, 72, 80 ] }
        PaginationComponent={ PaginationComponent }
      />
    </div>
</div>
    // <div>
    //   <div className='SocietyLeadsTableWrapper'>
    //     <ListingDataTable
    //       title='Society Leads'
    //       data={ filteredItems }
    //       columns={ columns }
    //       isPaginationButton={ false }
    //       progressPending={salesLeadsDataTable.isLoading}
    //       isLoading={ false }
    //       perPageOptions={ [ 8,  16, 24, 32, 40, 48, 56, 64, 72, 80 ] }
    //       paginationPerPage={ 8 }
    //       paginationRowsPerPageOptions={ [8, 16, 24, 32, 40, 48, 56, 64, 72, 80 ] }
    //       PaginationComponent={ PaginationComponent }
    //       filter
    //       filterCity={ getSocietyLeadsCityData.data }
    //       handleFilterChange={ _filterReq }
    //       filterText = {filterText}
    //       subHeaderComponent={subHeaderComponentMemo} 
    //       persistTableHead
    //       filterComponent={ subHeaderComponentMemo }
    //     />
    //      <DataTableComponent       
    //      data={filteredItems}
    //      columns={columns}
    //      isPaginationButton={ false }
    //      progressPending={salesLeadsDataTable.isLoading}
    //      isLoading={ false }
    //      perPageOptions={ [ 8,  16, 24, 32, 40, 48, 56, 64, 72, 80 ] }
    //      paginationPerPage={ 8 }
    //      paginationRowsPerPageOptions={ [8, 16, 24, 32, 40, 48, 56, 64, 72, 80 ] }
    //      PaginationComponent={ PaginationComponent }
    //    />
    //   </div>

    //   <SideModal show={ showModal } handleClose={handleClose} >
    //     <div className="sideModal">
    //       <Buttons name="Back" varient="link" type="submit" size="Small" color="black" iconSrc={ backIcon }
    //         onClick = { ()=>handleClose() }
    //       />
    //       <div className="d-flex justify-content-between align-items-center p-2">
    //         <Text size="regular" fontWeight="mediumbold" color="secondryColor" text="Edit Filters" />
    //         <Text
    //           size="Small"
    //           fontWeight="smbold"
    //           color="dangerText"
    //           text="Clear Filters"
    //           className="cursor-pointer"
    //           onClick={ ()=>clearFilter() }
    //         />
    //       </div>
    //       <div className="newEntry pr-2 pl-2">
    //         <div className="formField">
    //           <Form.Group controlId="formBasicContact">
    //             <Form.Label>Type Request ID</Form.Label>
    //             <Form.Control type="text" maxlength="35" placeholder="Type Request ID" value = { filterData.id } onChange={ (e) => setfilterData((prevState)=>{
    //               return { ...prevState, id: e.target.value }
    //             }) }/>
    //           </Form.Group>
    //         </div>
    //         <div className="formField">
    //           <Form.Group controlId="formBasicContact">
    //             <Form.Label style ={ { zIndex: '9999' } }>Date Range</Form.Label>
    //             {/* <Form.Control type="text" maxlength="35" placeholder="Date Range" /> */}
    //             <DateRangePicker
    //               placement="leftStart"
    //               appearance="default"
    //               placeholder="Date Range"
    //               style={ { width: '100%',
    //                 height: '48px',
    //                 color: 'darkgray',
    //               } }
    //               value={ datePickervalue }
    //               onChange={ (value) => {
    //                 setDatePickervalue(value);
    //                 setfilterData((prevState)=>{
    //                   return { ...prevState, startDate: dateWithFormate(value[ 0 ]), endDate: dateWithFormate(value[ 1 ]) }
    //                 })
    //               } }
    //             />
    //           </Form.Group>
    //         </div>
    //         <div className="formField">
    //           <Form.Group controlId="formBasicContact">
    //             <Form.Label>Society Name</Form.Label>
    //             <Form.Control type="text" maxlength="35" placeholder="Type society name" value = { filterData.societyName } onChange={ (e) => setfilterData((prevState)=>{
    //               return { ...prevState, societyName: e.target.value }
    //             }) } />
    //           </Form.Group>
    //         </div>
    //       </div>

    //       <div className="statusSection mt-4 pr-2 pl-2">
    //         <Text size="Small" fontWeight="mediumbold" color="secondryColor" text="Status" />

    //         <div className="formField pt-2">
    //           <div className="d-flex mr-2">
    //             <Form.Label htmlFor="formCompletedSwitch" className="mr-2 labelWidth"> Show completed status </Form.Label>
    //             <Form.Check
    //               className="mr-2"
    //               label=""
    //               id="formCompletedSwitch"
    //               type="switch"
    //               checked={ filterData.status.includes('COMPLETED') }
    //               // checked={}
    //               onChange ={ (e)=>handleStatusChange(e, 'COMPLETED') }
    //             />
    //           </div>
    //         </div>

    //         <div className="formField pt-1">
    //           <div className="d-flex mr-2">
    //             <Form.Label htmlFor="formProblemSwitch" className="mr-2 labelWidth"> Show problem status</Form.Label>
    //             <Form.Check
    //               className="mr-2"
    //               label=""
    //               id="formProblemSwitch"
    //               type="switch"
    //               checked={ filterData.status.includes('PROBLEM') }
    //               onChange ={ (e)=>handleStatusChange(e, 'PROBLEM') }
    //             />
    //           </div>
    //         </div>

    //         <div className="formField  pt-1">
    //           <div className="d-flex mr-2">
    //             <Form.Label htmlFor="formCancelledSwitch" className="mr-2 labelWidth"> Show cancelled status</Form.Label>
    //             <Form.Check
    //               className="mr-2"
    //               label=""
    //               id="formCancelledSwitch"
    //               type="switch"
    //               checked={ filterData.status.includes('CANCELLED') }
    //               onChange ={ (e)=>handleStatusChange(e, 'CANCELLED') }
    //             />
    //           </div>
    //         </div>

    //         <div className="formField  pt-1">
    //           <div className="d-flex mr-2">
    //             <Form.Label htmlFor="formPendingSwitch" className="mr-2 labelWidth"> Show pending status</Form.Label>
    //             <Form.Check
    //               className="mr-2"
    //               label=""
    //               id="formPendingSwitch"
    //               type="switch"
    //               checked={ filterData.status.includes('PENDING') }
    //               onChange ={ (e)=>handleStatusChange(e, 'PENDING') }
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       <div className="btnCenter">
    //         <Buttons name="Cancel" varient="secondary" type="submit" size="Small" color="secondryBtn" onClick = { ()=>handleClose() } />
    //         <Buttons name="Apply" varient="primary" type="submit" size="Small" color="white"
    //           onClick = { (e)=>handleApplyFilter() }
    //         />
    //       </div>

    //     </div>
    //   </SideModal>

    // </div>
    
  );
}

const mapStateToProps = ({ salesLeadsDataTable,
  salesLeadsCount,
  getSocietyLeadsCityData,
  allCities }) => ({
  salesLeadsDataTable,
  salesLeadsCount,
  getSocietyLeadsCityData,
  allCities
});

const actions = {
  getSocietyLeadsData,
  getLeadsCount,
  getSocietyLeadsCity,
  getAllCity
};

const withConnect = connect(
    mapStateToProps,
    actions,
);

export default compose(
    withConnect,
    memo,
)(SocietyLeads);
