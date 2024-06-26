/** @format */

import React, { useEffect, useState } from 'react';
import Image from '../../../shared/Image/Image';
import Text from '../../../shared/Text/Text';
import { Link } from 'react-router-dom';
import contentIco from '../../../assets/images/content-ico.svg';
import { getAllConsumerUsers } from '../../../common/redux/actions';
import { connect } from 'react-redux';
import { formateDate, ToolTip, handleStatusElement } from '../../../common/helpers/Utils';
import SearchInput from '../../../shared/Inputs/SearchInput/SearchInput';
import Form from 'react-bootstrap/Form';
import DataTableComponent from "../../../shared/DataTable/DataTable";
import Pagination from '../../../shared/DataTable/Pagination';
import CONSTANTS_STATUS from '../../../common/helpers/ConstantsStatus';

const ConsumerManagement = (props) => {
  const { getAllConsumerUsers, getAllConsumerUsersData } = props;

  const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  //state: for managing the status filter.
  const statusArr  =  CONSTANTS_STATUS.ConsumerStatusArr;
  //["PENDING" , "COMPLETED"];
  const [ statusSelected , setStatusSelected ] = useState('');

  const [selectedCity, setSelectedCity] = useState('');

  const kycstatus = (Kyc_value) => {
    const status = Kyc_value ? 'COMPLETED' : 'PENDING';
    return handleStatusElement(status);
  };

  const columns = [
    {
      name: 'Id',
      selector: (row) => row.id,
      sortable: true,
      center: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: false,
      center: true,
      minWidth: '140px',
      cell: ({ imageUrl, name }) => (
        <ToolTip position="top" style={{ width: '100%' }} name={name || ''}>
          <Text size="Small" color="secondryColor elipsis-text" text={name ? name.capitalizeWord() : "-"} />
        </ToolTip>
      ),
    },
    {
      name: 'Phone No',
      selector: (row) => row.contactNumber,
      sortable: false,
      center: true,
      minWidth: '120px',
      cell: ({ contactNumber }) => <span>{`${ contactNumber }` || '-'}</span>,
    },
    {
      name: 'Registered On',
      selector: (row) => row.joiningDate,
      sortable: true,
      center: true,
      minWidth: '150px',
      cell: ({ joiningDate }) => <span>{`${ formateDate(joiningDate) }` || '-'}</span>,
    },
    {
      name: 'Properties',
      selector: (row) => row.propertyCount,
      sortable: false,
      center: true,
      cell: ({ propertyCount }) => <span>{`${ propertyCount }` || '-'}</span>,
    },
    {
      name: 'Property Visited',
      selector: (row) => row.visitCount,
      sortable: true,
      center: true,
      minWidth: '160px',
      cell: ({ visitCount }) => <span>{`${ visitCount }` || '-'}</span>,
    },
    {
      name: 'User Type',
      selector: (row) => row.userType,
      center: true,
      cell: ({ userType }) => <span>{`${ userType }` || '-'}</span>,
    },
    {
      name: 'KYC Status',
      selector: (row) => row.kycverified,
      sortable: false,
      center: true,
      minWidth: '130px',
      cell: ({ kycverified }) => kycstatus(kycverified),
    },
    {
      name: 'Action',
      selector: (row) => row.action,
      sortable: false,
      center: true,
      cell: (row) => (
        <div className="action">
          <ToolTip position="left" name="View Details">
            <span>
              <Link
                to={ {
                  pathname: `/admin/consumer-management/consumer-details/${ row.id }`,
                } }>
                <Image name="contentIco" src={ contentIco } />
              </Link>
            </span>
          </ToolTip>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllConsumerUsers({ city: '', records: '', pageNumber: '' });
  }, [ getAllConsumerUsers ]);

  const PaginationComponent = (props) => (<Pagination { ...props } />);

  const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<SearchInput onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} placeholder='Search here'/>
		);
	}, [filterText, resetPaginationToggle]);

  const showData = (status_value) => {
    let status = status_value || statusSelected;
    let filteredItems = [];
    filteredItems = getAllConsumerUsersData.data.length ? 
    getAllConsumerUsersData.data.filter(item => { 
    return  item?.id == filterText || 
    item?.contactNumber?.includes(filterText) ||
    item?.name?.toLowerCase().includes(filterText.toLowerCase()) ||
    item?.propertyCount == filterText ||
    item?.userType?.toLowerCase().includes(filterText.toLowerCase()) ;
  }):[];
    if(status && filteredItems.length){
      filteredItems = filteredItems.filter(item => { 
        return  item?.kycStatus.toUpperCase() == status.toUpperCase();
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
            text={'Consumers'}
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
      </div>
    </div>
    <div className='consumersTableWrapper'>
      <DataTableComponent       
        data = {showData()}
        columns={columns}
        progressPending={getAllConsumerUsersData.isLoading}
        paginationRowsPerPageOptions={ [8, 16, 24, 32, 40, 48, 56, 64, 72, 80 ] }
        paginationPerPage={ 8 }
        perPageOptions={ [ 8,  16, 24, 32, 40, 48, 56, 64, 72, 80 ] }
        PaginationComponent={ PaginationComponent }
      />
    </div>
</div>
  );
};

// mapStateToProps
const mapStateToProps = ({ getAllConsumerUsersData }) => ({
  getAllConsumerUsersData,
});

// mapDispatchToProps
const actions = {
  getAllConsumerUsers,
};

export default connect(mapStateToProps, actions)(ConsumerManagement);
