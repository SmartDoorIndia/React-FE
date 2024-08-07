/** @format */
// @ts-ignore
import React, { useEffect, memo } from "react";
import SearchInput from "../../../shared/Inputs/SearchInput/SearchInput";
import Pagination from "../../../shared/DataTable/Pagination";
import { compose } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import { handleStatusElement, formateDate, getLocalStorage, showErrorToast, showSuccessToast } from "../../../common/helpers/Utils";
import { ToolTip } from "../../../common/helpers/Utils";
import { getBrokerListing, getBrokerDetails, giftCoinsToConsumer } from "../../../common/redux/actions";
import { Link } from "react-router-dom/cjs/react-router-dom";
import "./Broker.scss";
import { DateRangePicker } from "rsuite";
import CONSTANTS_STATUS from "../../../common/helpers/ConstantsStatus";
import moment from "moment";
import { TableLoader } from "../../../common/helpers/Loader";
import Text from "../../../shared/Text/Text";
import * as Actions from '../../../common/redux/types';
import Buttons from "../../../shared/Buttons/Buttons";
import { TextField } from "@mui/material";

const getModalActionData = (row) => {
   return { userData: row };
};
const Broker = (props) => {
   const { getBrokerListing, allPlanDataBroker } = props;
   const statusArr = CONSTANTS_STATUS.brokerStatus;
   const data = useSelector(state => state.allPlanDataBroker.data)
   const [filterText, setFilterText] = useState(data !== undefined ? allPlanDataBroker?.data?.searchString : "");
   const [statusSelected, setStatusSelected] = useState(data !== undefined ? allPlanDataBroker?.data?.status : "");
   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
   const [startDate, setStartDate] = useState(data !== undefined ? allPlanDataBroker?.data?.fromDate : null);
   const [endDate, setEndDate] = useState(data !== undefined ? allPlanDataBroker?.data?.toDate : null);
   const [currentPage, setCurrentPage] = useState(data !== undefined ? allPlanDataBroker?.data?.currentPage : 1);
   const [rowsPerPage, setRowsPerPage] = useState(data !== undefined ? allPlanDataBroker?.data?.rowsPerPage : 8);
   const recordSize = (allPlanDataBroker?.data?.records || 0);
   const userData = getLocalStorage('authData');
   const dispatch = useDispatch();

   const [showModal, setShowModal] = useState(false);
   const [newCoinValue, setNewCoinValue] = useState(null);
   const [currentBrokerId, setCurrentBrokerId] = useState(null);

   useEffect(() => {
      console.log(data)
      dispatch({ type: Actions.BROKERS_PROPERTY_SUCCESS, data: [] });
      if (data === undefined) {
         getBrokerListing(
            {
               userId: userData.userid,
               currentLat: null,
               currentLong: null,
               pageNo: currentPage,
               records: rowsPerPage,
               adminLogin: true,
               searchString: ''
            });
      }

   }, [getBrokerListing]);

   const showValue = (status_value, startDate_, endDate_) => {
      let status = status_value || statusSelected;
      let filteredItems = [];
      startDate_ = startDate_ || startDate;
      endDate_ = endDate_ || endDate;
      filteredItems = allPlanDataBroker.data?.brokerList?.length
         ? allPlanDataBroker?.data?.brokerList
         // ?.filter((item) => {
         //    return (
         //       item?.id == filterText ||
         //       item?.mobile?.includes(filterText) ||
         //       item?.name?.toLowerCase().includes(filterText.toLowerCase())
         //    );
         // })
         : [];
      // if (status && filteredItems.length) {
      //    filteredItems = filteredItems.filter((item) => {
      //       return item?.status == status;
      //    });
      // }
      // if (startDate_) {
      //    filteredItems = filteredItems.filter((item) => {
      //       let joinedDate = moment(item.joinedDate);
      //       let mst = moment(startDate_).startOf('day')
      //       let met = moment(endDate_).endOf('day')

      //       return joinedDate >= mst && joinedDate <= met;
      //       return item?.status == status;
      //    });
      // }
      return filteredItems;
   };

   const handlePageChange = (newPage) => {
      setCurrentPage(Number(newPage));
      getBrokerListing(
         {
            userId: userData.userid,
            currentLat: null,
            currentLong: null,
            pageNo: newPage,
            records: rowsPerPage,
            adminLogin: true,
            status: statusSelected?.toUpperCase(),
            searchString: filterText,
            fromDate: startDate,
            toDate: endDate
         });
   }

   const handleRowsPerPageChange = (newRowsPerPage) => {
      setRowsPerPage(newRowsPerPage)
      getBrokerListing(
         {
            userId: userData.userid,
            currentLat: null,
            currentLong: null,
            pageNo: currentPage,
            records: newRowsPerPage,
            adminLogin: true,
            status: statusSelected?.toUpperCase(),
            searchString: filterText,
            fromDate: startDate,
            toDate: endDate
         });
   }

   const ProgressComponent = <TableLoader />;
   const PaginationComponent = ({ onChangePage, onChangeRowsPerPage, ...props }) => (
      <Pagination {...props}
         PaginationActionButton={PaginationActionButton}
         currentPage={currentPage}
         rowsPerPage={rowsPerPage}
         rowCount={recordSize}
         onChangePage={handlePageChange}
         onChangeRowsPerPage={handleRowsPerPageChange}
      />
   );
   const PaginationActionButton = () => (
      <div className="d-flex justify-content-center tableBottom"></div>
   );

   const handleDateRangeChange = (date) => {
      if (date && date[0] && date[1]) {
         const startDt = date[0];
         const endDt = date[1];
         setStartDate(startDt);
         setEndDate(endDt);
         // showValue(statusSelected, startDate, endDate);
         // setDatata(filteredItems);
         getBrokerListing({
            userId: userData.userid,
            currentLat: null,
            currentLong: null,
            pageNo: 1,
            records: rowsPerPage,
            adminLogin: true,
            status: statusSelected?.toUpperCase(),
            searchString: filterText,
            fromDate: startDt,
            toDate: endDt
         });
      }
      if (date.length === 0) {
         getBrokerListing({
            userId: userData.userid,
            currentLat: null,
            currentLong: null,
            pageNo: 1,
            records: rowsPerPage,
            adminLogin: true,
            status: statusSelected?.toUpperCase(),
            searchString: filterText,
            fromDate: '',
            toDate: ''
         });

      }
   };

   const subHeaderComponentMemo = React.useMemo(() => {
      const handleClear = () => {
         if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");
         }
      };

      return (
         <SearchInput
            onFilter={(e) => {
               setFilterText(e.target.value);
               getBrokerListing({
                  userId: userData.userid,
                  currentLat: null,
                  currentLong: null,
                  pageNo: 1,
                  records: rowsPerPage,
                  adminLogin: true,
                  status: statusSelected?.toUpperCase(),
                  searchString: e.target.value,
                  fromDate: startDate,
                  toDate: endDate
               });
            }}
            onClear={handleClear}
            filterText={filterText}
            placeholder="Search"

         />
      );
   }, [filterText, resetPaginationToggle]);

   const _filterStatus = (status_value) => {
      setStatusSelected(status_value);
      getBrokerListing(
         {
            userId: userData.userid,
            currentLat: null,
            currentLong: null,
            pageNo: 1,
            records: rowsPerPage,
            adminLogin: true,
            status: status_value?.toUpperCase(),
            searchString: filterText,
            fromDate: startDate,
            toDate: endDate
         });
      // showValue(status_value);
   };

   const columns = [
      {
         name: "Reg On",
         selector: ((row) => row.joinDate),
         center: false,
         sortable: true,
         maxWidth: "80px",
         cell: ({ joinDate }) => (<span>{formateDate(joinDate)}</span>),
      },

      {
         name: "Name",
         selector: ((row) => row.name),
         center: true,
         minWidth: "150px",
         maxWidth: "150px",
      },
      {
         name: "Location",
         selector: (row) => row.locationName,
         sortable: false,
         center: true,
         minWidth: "120px",
      },
      {
         name: "mobile",
         selector: ((row) => row.mobileforCustomer),
         sortable: true,
         center: true,
         minWidth: "145px",
         maxWidth: "150px",
      },
      {
         name: "Email",
         selector: ((row) => row.email),
         sortable: false,
         center: true,
         minWidth: "245px",
         cell: ({ email }) => (
            <ToolTip position="top" style={{ width: '100%' }} name={email}>
               <Text size="Small" color="secondryColor elipsis-text" text={email} />
            </ToolTip>
         )
      },
      {
         name: "Plan",
         selector: ((row) => row.plan),
         sortable: false,
         center: true,
         minWidth: "120px",
      },
      {
         name: "Posted Properties",
         selector: ((row) => row.postingcount),
         sortable: false,
         center: true,
         maxWidth: "160px",
      },
      {
         name: "Chats",
         selector: ((row) => row.chat),
         sortable: false,
         center: true,
         maxWidth: "100px",
      },
      {
         name: "Profile Status",
         selector: ((row) => row.status),
         sortable: false,
         center: true,
         minWidth: "120px",
         cell: ({ status }) => handleStatusElement(status),
      },
      {
         name: "Action",
         selector: ((row) => row.action),
         sortable: false,
         center: false,
         minWidth: "150px",
         maxWidth: "150px",
         cell: (row) => (
            <div className="action">
               <ToolTip name="View Details">
                  <span>
                     {row.status === "Expired" ? (
                        <span>Details</span>
                     ) : (
                        <Link
                           to={{
                              pathname:
                                 `/admin/BrokerDetails/${row.brokerId}`,
                              state: { loginMobile: row.loginMobile }
                           }}
                        >
                           Details
                        </Link>
                     )}
                  </span>
               </ToolTip>
            </div>
         ),
      },
      {
         name: 'Gift Coins',
         selector: "broker",
         center: true,
         cell: ((broker) =>
            <div className="py-1">
               <Buttons
                  name="Add Coins"
                  varient="primary"
                  type="submit"
                  size="xSmall"
                  color="white"
                  onClick={() => { setCurrentBrokerId(broker.brokerId); setShowModal(true) }}
               />
            </div>
         )
      }
   ];

   const addCoins = () => {
      if (newCoinValue < 0) {
         showErrorToast('Enter positive value...')
         setNewCoinValue(0)
      }
      else if (!newCoinValue) {
         showErrorToast('Enter SD coins...')
      }
      else {
         setShowModal(false)
         giftCoinsToConsumer({ consumerId: currentBrokerId, coins: newCoinValue })
            .then((response) => {
               if (response.status === 200) {
                  showSuccessToast(newCoinValue + " Coins gifted successfully")
                  setNewCoinValue(null)
               }
            }).catch(error => {
               console.log(error)
               showErrorToast("Please try again...")
            })
      }
   }

   return (
      <>
         <div className="tableBox">
            <div className="d-flex flex-md-column flex-xl-row justify-content-xl-between align-items-xl-center align-items-left tableHeading">
               <div className="text-nowrap mb-2">
                  <DateRangePicker
                     style={{
                        width: "249px",
                        height: "39px",
                        color: "darkgray",
                        marginTop: "10px",
                     }}
                     defaultCalendarValue={[startDate, endDate]}
                     onChange={handleDateRangeChange}
                  />
               </div>
               <div className="locationSelect d-flex align-items-xl-center align-items-left">
                  {subHeaderComponentMemo}
                  {statusArr.length ? (
                     <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                           as="select"
                           value={statusSelected}
                           onChange={(e) => {
                              _filterStatus(e.target.value);
                           }}
                        >
                           <option value="">Filter</option>
                           {statusArr.length
                              ? statusArr.map((_value, index) => (
                                 <option key={index} value={_value}>
                                    {_value}
                                 </option>
                              ))
                              : null}
                        </Form.Control>
                     </Form.Group>
                  ) : (
                     ""
                  )}
                  <Form.Group controlId="example" className="w-40 userGrp ml-0"></Form.Group>
               </div>
            </div>

            <div className="brokerTableWrapper">
               <DataTableComponent
                  data={showValue()}
                  columns={columns}
                  progressPending={allPlanDataBroker.isLoading}
                  progressComponent={ProgressComponent}
                  paginationComponent={PaginationComponent}
                  paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                  paginationPerPage={8}
                  perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                  filterText={filterText}
                  currentPage={currentPage}
                  rowsPerPage={rowsPerPage}
                  onChangePage={handlePageChange}
                  paginationServer={true}
                  onChangeRowsPerPage={handleRowsPerPageChange}
                  subHeaderComponent={subHeaderComponentMemo}
                  persistTableHead="true"
                  filterComponent={subHeaderComponentMemo}
                  keyField="id"
               ></DataTableComponent>
            </div>
         </div>
         <Modal show={showModal} onHide={() => { setShowModal(false) }} centered style={{ backgroundImage: 'unset' }}>
            <Modal.Header className='justify-content-center'>
               <Text
                  size="medium"
                  fontWeight="mediumbold"
                  color="primaryColor"
                  text={'Add coins to ' + ''}
               />
            </Modal.Header>
            <Modal.Body className='text-align-center'>
               <TextField
                  label={'Enter SD coins'}
                  type='number'
                  inputProps={{ min: 0 }}
                  value={newCoinValue}
                  onChange={(e) => { setNewCoinValue(e.target.value); }}
               />
               <div className='mt-3'>
                  <Buttons
                     name="Gift Coins"
                     varient="primary"
                     type="submit"
                     size="Small"
                     color="white"
                     onClick={() => { addCoins() }}
                  /> &nbsp;&nbsp;
                  <Buttons
                     name="Cancel"
                     varient="primary"
                     size="Small"
                     color="white"
                     onClick={() => { setShowModal(false) }}
                  />
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
};
const mapStateToProps = ({ allPlanDataBroker }) => ({
   allPlanDataBroker
});
const actions = {
   getBrokerListing,
   getBrokerDetails,
};
const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(Broker);
