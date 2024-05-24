/** @format */

import React, { useEffect, useState } from 'react';
import Image from '../../../shared/Image/Image';
import Text from '../../../shared/Text/Text';
import { Link } from 'react-router-dom';
import contentIco from '../../../assets/images/content-ico.svg';
import { getAllConsumers } from '../../../common/redux/actions';
import { connect, useDispatch, useSelector } from 'react-redux';
import { ToolTip, handleStatusElement, getLocalStorage } from '../../../common/helpers/Utils';
import SearchInput from '../../../shared/Inputs/SearchInput/SearchInput';
import Form from 'react-bootstrap/Form';
import Pagination from '../../../shared/DataTable/Pagination';
import CONSTANTS_STATUS from '../../../common/helpers/ConstantsStatus';
import { Col, Modal } from 'react-bootstrap';
import ListingDataTable from '../../../shared/DataTable/ListingDataTable';
import Buttons from '../../../shared/Buttons/Buttons';
import * as Actions from '../../../common/redux/types';

const ConsumerManagement = (props) => {
  const { getAllConsumers, getAllConsumerUsersData } = props;
  const dispatch = useDispatch();
  const data = useSelector(state => state.getAllConsumerUsersData.data);
  const [filterText, setFilterText] = React.useState(data.length !== 0 ? getAllConsumerUsersData?.data?.searchStr : '');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  //state: for managing the status filter.
  const statusArr = CONSTANTS_STATUS.ConsumerStatusArr;
  //["PENDING" , "COMPLETED"];
  const [statusSelected, setStatusSelected] = useState(() => {
    if (getAllConsumerUsersData?.data?.kycStatus === true) {
      return 'COMPLETED'
    } else if (getAllConsumerUsersData?.data?.kycStatus === false) {
      return 'PENDING'
    } else {
      return null
    }
  });

  // const [selectedCity, setSelectedCity] = useState('');
  const userData = getLocalStorage('authData')
  const kycstatus = (Kyc_value) => {
    const status = Kyc_value ? 'COMPLETED' : 'PENDING';
    return handleStatusElement(status);
  };

  const PaginationActionButton = () => (
    <div className="d-flex justify-content-center tableBottom">
      {/* <Link to="/admin/property/new-property"><Buttons name="Add New Property" varient="primary" type="submit" size="Small" color="white" /></Link> */}
    </div>
  );
  const [currentPage, setCurrentPage] = useState(data.length !== 0 ? getAllConsumerUsersData?.data?.currentPage : 1);
  const [rowsPerPage, setRowsPerPage] = useState(data.length !== 0 ? getAllConsumerUsersData?.data?.rowsPerPage : 8);
  const recordSize = (getAllConsumerUsersData?.data?.records);
  // let recordsPerPage = 0
  // recordsPerPage = getAllConsumerUsersData?.data?.rowsPerPage;

  const handlePageChange = (newPage) => {
    // Handle the page change in the parent component
    setCurrentPage(Number(newPage));
    let type = null
                  if (statusSelected === 'COMPLETED') {
                    type = true
                  } else if (statusSelected === 'PENDING') {
                    type = false
                  } else {
                    type = null
                  }
    getAllConsumers({
      pageSize: rowsPerPage,
      pageNo: newPage,
      userId: userData.userid,
      searchString: filterText,
      kycStatus: type,
      defaultSort: defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
    });
  };

  const handleRowsPerPageChange = async (newRowsPerPage) => {
    // console.log(`Rows per page changed to: ${rowsPerPage}`);
    let type = null
                  if (statusSelected === 'COMPLETED') {
                    type = true
                  } else if (statusSelected === 'PENDING') {
                    type = false
                  } else {
                    type = null
                  }
    setRowsPerPage(Number(newRowsPerPage))
    getAllConsumers({
      pageSize: Number(newRowsPerPage),
      pageNo: currentPage,
      userId: userData.userid,
      searchString: filterText,
      kycStatus: type,
      defaultSort: defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
    });
  };

  const PaginationComponent = ({ onChangePage, onChangeRowsPerPage, ...props }) => (
    <Pagination {...props}
      rowCount={recordSize}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleRowsPerPageChange}
      currentPage={currentPage}
      onChangePage={handlePageChange}
      PaginationActionButton={PaginationActionButton} />
  );

  const columns = [
    {
      name: 'Id',
      selector: (row) => row.id,
      sortable: true,
      center: true,
      id:1
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: false,
      center: true,
      minWidth: '140px',
      cell: ({ imageUrl, name, nameMatch }) => (
        <ToolTip position="top" style={{ width: '100%' }} name={name || ''}>
          <Text size="Small" style={{color: nameMatch ? '#252525' : '#be1452'}} color="secondryColor elipsis-text" text={name ? name.capitalizeWord() : "-"} />
        </ToolTip>
      ),
    },
    {
      name: 'Phone No',
      selector: (row) => row.mobile,
      sortable: false,
      center: true,
      minWidth: '120px',
      cell: ({ mobile }) => <span>{`${mobile}` || '-'}</span>,
    },
    // {
    //   name: 'Address',
    //   selector: (row) => row.address,
    //   sortable: false,
    //   center: true,
    //   minWidth: '120px',
    //   cell: ({ address }) => <span>{`${address === null ? '-' : address}` || '-'}</span>,
    // },
    // {
    //   name: 'Registered On',
    //   selector: (row) => row.joiningDate,
    //   sortable: true,
    //   center: true,
    //   minWidth: '150px',
    //   cell: ({ joiningDate }) => <span>{`${ formateDate(joiningDate) }` || '-'}</span>,
    // },
    // {
    //   name: 'Properties',
    //   selector: (row) => row.propertyCount,
    //   sortable: false,
    //   center: true,
    //   cell: ({ propertyCount }) => <span>{`${ propertyCount }` || '-'}</span>,
    // },
    {
      name: 'Coin Balance',
      selector: (row) => row.coinBalance,
      sortable: true,
      center: true,
      minWidth: '160px',
      cell: ({ coinBalance }) => <span>{`${coinBalance}` || '-'}</span>,
      id:4
    },
    {
      name: 'User Type',
      selector: (row) => row.userType,
      center: true,
      cell: ({ userType }) => <span>{`${userType}` || '-'}</span>,
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
                to={{
                  pathname: `/admin/consumer-management/consumer-details/${row.id}`,
                  state: { selectedConsumer: row }
                }}>
                <Image name="contentIco" src={contentIco} />
              </Link>
            </span>
          </ToolTip>
        </div>
      ),
    },
    {
      name: 'KYC Details',
      selector: (row) => row.action,
      sortable: false,
      center: true,
      cell: (row) => (
        <div className="action" onClick={() => { setConsumerInfoModal(true); setSelectedConsumer(row) }}>
          <ToolTip position="left" name="View KYC Details">
            <span >
              <Image name="contentIco" src={contentIco} alt={"No image available"} />
            </span>
          </ToolTip>
        </div>
      ),
    },
  ];

  const [consumerInfoModal, setConsumerInfoModal] = useState(false)
  const [selectedConsumer, setSelectedConsumer] = useState({})

  useEffect(() => {

    if(data?.length === 0) {
      getAllConsumers({ userId: userData.userid,
        pageSize: rowsPerPage,
        pageNo: 1,
        searchString: '',
        kycStatus: null,
        defaultSort: true, defaultSortId: 'id', defaultSortFieldId: 1 });
    }
  }, [getAllConsumers]);

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <SearchInput onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} placeholder='Search here' />
    );
  }, [filterText, resetPaginationToggle]);

  const showData = (status_value) => {
    let status = status_value || statusSelected;
    let filteredItems = [];
    filteredItems = getAllConsumerUsersData?.data?.consumersData?.length ?
      getAllConsumerUsersData.data.consumersData
      // .filter(item => {
      //   return item?.id == filterText ||
      //     item?.contactNumber?.includes(filterText) ||
      //     item?.name?.toLowerCase().includes(filterText.toLowerCase()) ||
      //     item?.propertyCount == filterText ||
      //     item?.userType?.toLowerCase().includes(filterText.toLowerCase());
      // })
      : [];
    console.log(status_value)
    // if (status && filteredItems.length) {
    //   filteredItems = filteredItems.filter(item => {
    //     if (status === 'COMPLETED') {
    //       return item.kycverified === true
    //     }
    //     if (status === 'PENDING') {
    //       return item.kycverified === false
    //     }
    //   })
    // }
    return filteredItems;
  }


  const _filterStatus = (status_value) => {
    setStatusSelected(status_value);
    showData(status_value)
  }

  const [defaultSort, setDefaultSort] = useState(data.length !== 0 ? getAllConsumerUsersData?.data?.defaultSort : true);
   const [defaultSortId, setDefaultSortId] = useState(data.length !== 0 ? getAllConsumerUsersData?.data?.defaultSortId : 'id');
   const [defaultSortFieldId, setDefaultSortFieldId] = useState(data.length !== 0 ? getAllConsumerUsersData?.data?.defaultSortFieldId : 1);
   const handleSortedData = (newSortedData) => {
      // Store sorted data
      const { selector, direction } = newSortedData;
      let selectorVal = newSortedData?.selector?.toString().split('.');
      selectorVal = selectorVal?.length > 1 ? selectorVal[1] : selectorVal[0]
      console.log(selectorVal)
      // Perform sorting based on selector and direction
      let filteredItems = showData();
      const sorted = [...filteredItems].sort((a, b) => {
         if (selectorVal === 'id') {
           setDefaultSortFieldId(1)
           if (defaultSort === true) {
             return a[selectorVal] - b[selectorVal]; // Example sorting logic
            } else {
              return b[selectorVal] - a[selectorVal]; // Example sorting logic for descending order
            }
          }
          else if (selectorVal === 'coinBalance') {
           setDefaultSortFieldId(4)
            if (defaultSort === true) {
               return a[selectorVal] - b[selectorVal]; // Example sorting logic
            } else {
               return b[selectorVal] - a[selectorVal]; // Example sorting logic for descending order
            }
         }
        //  else if (selectorVal === 'postedDate') {
        //     const dateA = new Date(a[selectorVal]);
        //     const dateB = new Date(b[selectorVal]);

        //     if (defaultSort === true) {
        //        return dateA - dateB;
        //     } else {
        //        return dateB - dateA;
        //     }
        //  }
      });
      setDefaultSort(!defaultSort)
      // Update sorted data state
      console.log(sorted);
      filteredItems = [...sorted]
      dispatch({ 
        type: Actions.CONSUMSER_MANAGEMENT_SUCCESS, 
        data: {consumersData: [...sorted], records: recordSize, currentPage: currentPage, rowsPerPage: rowsPerPage, searchStr: filterText, kycStatus: getAllConsumerUsersData?.data?.kycStatus, defaultSort: !defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId} });
   };

  return (
    <>
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
            {statusArr.length ?
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
              : ''}
            <div className="ml-3">
              <Buttons
                name="Search"
                varient="primary"
                size="Small"
                color="white"
                style={{ height: "40px !important" }}
                onClick={async () => {
                  setCurrentPage(1)
                  let type = null
                  if (statusSelected === 'COMPLETED') {
                    type = true
                  } else if (statusSelected === 'PENDING') {
                    type = false
                  } else {
                    type = null
                  }
                  await getAllConsumers({
                    userId: userData.userid,
                    pageSize: rowsPerPage,
                    pageNo: 1,
                    searchString: filterText,
                    kycStatus: type,
                    defaultSort: defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
                  });
                  // setRecordSize(allPropertyData?.data?.propertyData?.length)
                }}
              />
            </div>
          </div>
        </div>
        <div className='consumersTableWrapper'>
          <ListingDataTable
            data={showData()}
            columns={columns}
            progressPending={getAllConsumerUsersData.isLoading}
            paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
            paginationPerPage={8}
            perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
            PaginationComponent={PaginationComponent}
            paginationServer={true}
            onSort={handleSortedData}
            defaultSort={defaultSort}
            defaultSortId={defaultSortId}
            defaultSortFieldId={defaultSortFieldId}
          />
        </div>
      </div>

      <Modal show={consumerInfoModal} onHide={() => { setConsumerInfoModal(false) }} centered style={{ backgroundImage: 'unset' }}>
        <Modal.Header style={{ justifyContent: 'center' }}>
          <Text
            size="regular"
            fontWeight="bold"
            color="secondryColor"
            className="text-center"
            text="Consumer Details" />
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex'>
            <Col lg="4">
              <Text
                size="regular"
                fontWeight=""
                color="secondryColor"
                className="text-start"
                text="Karza name :" />
            </Col>
            <Col lg="8">
              <Text
                size="regular"
                fontWeight=""
                color="secondryColor"
                className="text-start"
                text={selectedConsumer.karzaName === null ? "-" : selectedConsumer.karzaName} />
            </Col>
          </div>
          <div className='d-flex'>
            <Col lg="4">
              <Text
                size="regular"
                fontWeight=""
                color="secondryColor"
                className="text-start"
                text="Gender :" />
            </Col>
            <Col lg="4">
              <Text
                size="regular"
                fontWeight=""
                color="secondryColor"
                className="text-start"
                text={selectedConsumer.gender === null ? '-' : selectedConsumer.gender} />
            </Col>

          </div>
          <div className='d-flex'>
            <Col lg="4">
              <Text
                size="regular"
                fontWeight=""
                color="secondryColor"
                className="text-start"
                text="Date Of Birth :" />
            </Col>
            <Col lg="4">
              <Text
                size="regular"
                fontWeight=""
                color="secondryColor"
                className="text-start"
                text={selectedConsumer.dob === null ? "-" : selectedConsumer.dob} />
            </Col>

          </div>
          <div className='d-flex'>
            <Col lg="4">
              <Text
                size="regular"
                fontWeight=""
                color="secondryColor"
                className="text-start"
                text="Email :" />
            </Col>
            <Col lg="8">
              <Text
                size="regular"
                fontWeight=""
                color="secondryColor"
                className="text-start"
                text={selectedConsumer.email === null ? "-" : selectedConsumer.email} />
            </Col>

          </div>
          <div className='d-flex'>
            <Col lg="4">
              <Text
                size="regular"
                fontWeight=""
                color="secondryColor"
                className="text-start"
                text="Address :" />
            </Col>
            <Col lg="8">
              <Text
                size="regular"
                fontWeight=""
                color="secondryColor"
                className="text-start"
                text={selectedConsumer.address === null ? "-" : selectedConsumer.address} />
            </Col>

          </div>
          <div>
            <Text
              size="regular"
              fontWeight=""
              color="secondryColor"
              className="text-center mt-3"
              text="Aadhar Image" />
            {selectedConsumer.kycDetail !== null ?
              <>
              <div className='d-flex justify-content-center'>
                <img src={selectedConsumer.kycDetail} alt='' ></img>
              </div>
              </> :
              <Text
                size="20px"
                fontWeight=""
                color="secondryColor"
                className="text-center mt-3"
                text="KYC Details not available!" />
            }
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

// mapStateToProps
const mapStateToProps = ({ getAllConsumerUsersData }) => ({
  getAllConsumerUsersData,
});

// mapDispatchToProps
const actions = {
  getAllConsumers,
};

export default connect(mapStateToProps, actions)(ConsumerManagement);
