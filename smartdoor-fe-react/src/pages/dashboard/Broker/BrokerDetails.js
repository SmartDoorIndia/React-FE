/** @format */
// @ts-ignore
import { React, useMemo, useEffect, useState, useCallback, memo } from "react";
import { compose } from "redux";
import { connect, useSelector } from "react-redux";
import { Col, Row, Table, Card } from "react-bootstrap";
import SearchInput from "../../../shared/Inputs/SearchInput/SearchInput";
import Image from "../../../shared/Image/Image";
import userImage from "../../../assets/svg/avatar_sml.svg";
import Text from "../../../shared/Text/Text";
import StarRating from "../../../shared/StarRating/StarRating";
import Pagination from "../../../shared/DataTable/Pagination";
import Form from "react-bootstrap/Form";
import DataTable from "../../../shared/DataTable/DataTable";
import Buttons from "../../../shared/Buttons/Buttons";
import { useParams } from "react-router-dom";
import { DateRangePicker, Stack } from "rsuite";
import { ToolTip, getLocalStorage } from "../../../common/helpers/Utils";
import { handleStatusElement, formateDate } from "../../../common/helpers/Utils";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Hold from "../../../shared/Modal/BrokerDetailModal/BrokerDetailModal";
import "./Broker.scss";
import {
   getBrokerDetails,
   getBrokerPostedProperty,
   getPropertyDetails,
   addHoldRequestComments,
   getAllProperties,
   getBrokerDeclineStatusDetail,
   getBrokerStatusDetail,
} from "../../../common/redux/actions";
import moment from "moment";
import CONSTANTS_STATUS from "../../../common/helpers/ConstantsStatus";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BrokerDetails = (props) => {
   // MODAL DATA STATE
   const { getBrokerPostedProperty, brokerProperty } = props;
   const data = useSelector(state => state?.brokerProperty?.data)
   const [show, setShow] = useState(false);
   const handleShow = () => setShow(true);
   const [modalData, setModalData] = useState();
   const [count, setCount] = useState(0);
   const statusArr = CONSTANTS_STATUS.brokerPostedProperty;
   const { brokerdetailId } = useParams();
   const [blockData, setBlockData] = useState(null);

   const [Broker_data, setBrokerData] = useState([]);
   const [loading, setLoading] = useState(true);
   const handleClose = () => setShow(false);
   const [startDate, setStartDate] = useState(data !== undefined ? brokerProperty?.data?.fromDate : null);
   const [endDate, setEndDate] = useState(data !== undefined ? brokerProperty?.data?.toDate : null);
   const [statusSelected, setStatusSelected] = useState(data !== undefined ? brokerProperty?.data?.status : "");
   const [filterText, setFilterText] = useState(data !== undefined ? brokerProperty?.data?.searchString : "");
   const [currentPage, setCurrentPage] = useState(data !== undefined && data.length !== 0 ? brokerProperty?.data?.currentPage : 1);
   const [rowsPerPage, setRowsPerPage] = useState(data !== undefined && data.length !== 0 ? brokerProperty?.data?.rowsPerPage : 8);
   const recordSize = (brokerProperty?.data?.records || 0)
   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
   const [holdStatus, setHoldStatus] = useState(false);
   const [postedProperty, setPostedProperty] = useState([]);
   const userData = getLocalStorage("authData");
   const history = useHistory();

   console.log(userData, "userdata")

   console.log(postedProperty, "ffjgfhjg")
   const toggleHoldStatus = () => {
      setHoldStatus(!holdStatus);
   };

   useEffect(() => {
      console.log("Broker_data?.resourceData?.status", Broker_data?.status);
      if (Broker_data?.status === "ON_HOLD") {
         setHoldStatus(true);
      } else if (Broker_data?.status === "APPROVED") {
         setHoldStatus(false);
      }
   }, [Broker_data?.status])

   const handleBlockConsumser = () => {
      if (blockData !== null) {
         ({ userId: blockData })
            .then((data) => {
               _getBrokerDetails();
            })
            .finally(() => {
               handleClose();
            });
      }
   };
   const _getBrokerDetails = useCallback(() => {
      getBrokerDetails({ userId: brokerdetailId })
         .then((response) => {
            setLoading(false);
            if (response.data.status) {
               setBrokerData(response.data.resourceData);
            }
         })
         .catch((error) => {
            setLoading(false);
         });
   }, [getBrokerDetails, brokerdetailId]);

   const _getPostedDetailProperty = useCallback((data) => {
      getBrokerPostedProperty(data)
         .then((response) => {
            setLoading(false);
            if (response.data.status === 200) {
               if (response) setPostedProperty(response.data);
            }
         })
         .catch((error) => {
            setLoading(false);
         })
   }, [getBrokerPostedProperty, brokerdetailId])
   useEffect(async () => {
      await _getBrokerDetails();
      let brokerId = brokerdetailId
      if ((data === undefined || data.length === 0) && Broker_data?.status !== 'PENDING_APPROVAL' && Broker_data?.status !== 'PAYMENT_PENDING') {
         await _getPostedDetailProperty({ brokerId: brokerId, pageNo: currentPage, records: rowsPerPage });
      }
      setTimeout(async () => {
         if (Broker_data?.status === "ON_HOLD") {
            setHoldStatus(false);
         } else if (Broker_data?.status === "APPROVED") {
            setHoldStatus(true);
         }
      }, 1000);
   }, [_getBrokerDetails, _getPostedDetailProperty]);

   const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
      _getPostedDetailProperty({
         brokerId: brokerdetailId,
         pageNo: newPage,
         records: rowsPerPage,
         status: statusSelected,
         fromDate: startDate,
         endDate: endDate,
         searchString: filterText
      })
   }

   const handleRowsPerPageChange = (newRowsPerPage) => {
      setRowsPerPage(newRowsPerPage);
      _getPostedDetailProperty({
         brokerId: brokerdetailId,
         pageNo: currentPage,
         records: newRowsPerPage,
         status: statusSelected,
         fromDate: startDate,
         endDate: endDate,
         searchString: filterText
      })
   }

   const PaginationComponent = ({ onChangePage, onChangeRowsPerPage, ...props }) => (
      <Pagination {...props}
         currentPage={currentPage}
         rowsPerPage={rowsPerPage}
         rowCount={recordSize}
         handlePageChange={handlePageChange}
         handleRowsPerPageChange={handleRowsPerPageChange}
         PaginationActionButton={PaginationActionButton} />
   );
   const PaginationActionButton = () => (
      <div className="d-flex justify-content-center tableBottom"></div>
   );

   const subHeaderComponentMemo = useMemo(() => {
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
               _getPostedDetailProperty({
                  brokerId: brokerdetailId,
                  pageNo: currentPage,
                  records: rowsPerPage,
                  status: statusSelected,
                  fromDate: startDate,
                  endDate: endDate,
                  searchString: e.target.value
               })
            }}
            onClear={handleClear}
            filterText={filterText}
            placeholder="Search"
         />
      );
   }, [filterText, resetPaginationToggle]);

   const _filterStatus = (status_value) => {
      setStatusSelected(status_value);
      // showValue(status_value);
      _getPostedDetailProperty({
         brokerId: brokerdetailId,
         pageNo: currentPage,
         records: rowsPerPage,
         status: status_value,
         fromDate: startDate,
         endDate: endDate,
         searchString: filterText
      })
   };

   const showValue = (status_value, startDate_, endDate_) => {
      let status = status_value || statusSelected;
      let filteredItems = [];
      startDate_ = startDate_ || startDate;
      endDate_ = endDate_ || endDate;

      filteredItems = brokerProperty?.data?.brokerProperty?.length
         ? brokerProperty?.data?.brokerProperty
         // ?.filter((item) => {
         //    return (
         //       item?.propertyId == filterText ||
         //       item?.postedFor?.toLowerCase().includes(filterText.toLowerCase())
         //    );
         // })
         : [];
      // if (status && filteredItems?.length) {
      //    filteredItems = filteredItems.filter((item) => {
      //       return item?.status == status;
      //    });
      // }
      // if (startDate_) {
      //    filteredItems = filteredItems.filter((item) => {
      //       let postedOn = moment(item.postedOn);
      //       let mst = moment(startDate_).startOf("day");
      //       let met = moment(endDate_).endOf("day");

      //       return postedOn >= mst && postedOn <= met;
      //       return item?.status == status;
      //    });
      // }
      if (count != filteredItems.length) setCount(filteredItems.length);
      return filteredItems;
   };
   const handleDateRangeChange = (date) => {
      if (date && date[0] && date[1]) {
         const startDt = date[0];
         const endDt = date[1];
         setStartDate(startDt);
         setEndDate(endDt);
         // showValue(statusSelected, startDate, endDate);
         _getPostedDetailProperty({
            brokerId: brokerdetailId,
            pageNo: currentPage,
            records: rowsPerPage,
            status: statusSelected,
            fromDate: startDt,
            endDate: endDt,
            searchString: filterText
         })
      }
      if (date.length === 0) {
         _getPostedDetailProperty({
            brokerId: brokerdetailId,
            pageNo: currentPage,
            records: rowsPerPage,
            status: statusSelected,
            fromDate: '',
            endDate: '',
            searchString: filterText
         })
      }
   };

   const columns = [
      {
         name: "Posted On",
         selector: 'postedOn',
         sortable: true,
         center: true,
         cell: ({ postedOn }) => (<span>{formateDate(postedOn)}</span>),
      },
      {
         name: "Posted for",
         selector: "postedFor",
         sortable: true,
         maxWidth: "150px",
         center: true,
      },
      {
         name: "Location",
         selector: (row) => row.location?.localityName,
         sortable: false,
         maxWidth: "150px",
         minWidth: "150px",
         center: true,
      },
      {
         name: "Plan",
         selector: "plan",
         sortable: true,
         maxWidth: "120px",
         center: false,
      },
      {
         name: "Config.",
         selector: "config",
         sortable: false,
         maxWidth: "120px",
         minWidth: "120px",
         center: true,
      },
      {
         name: "Status",
         selector: "status",
         sortable: false,
         maxWidth: "150px",
         center: true,
         cell: ({ status }) => handleStatusElement(status),
      },
      {
         name: "Action",
         sortable: false,
         center: false,
         maxWidth: "120px",
         minWidth: "120px",
         cell: ({ row, propertyId, userId }) => (
            <div className="action">
               <ToolTip position="right" name="View Details">
                  <span>
                     <Link
                        to={{
                           pathname: "/admin/property/property-details",
                           state: { propertyId: propertyId, userId: brokerdetailId, menuName: '', isDeleted: false },
                        }}
                     >
                        Details
                     </Link>
                  </span>
               </ToolTip>
            </div>
         ),
      },
   ];

   const HandleSubmit = () => {
      addHoldRequestComments({
         brokerId: Number(brokerdetailId),
         brokerStatus: "APPROVED",
         holdReason: null
      });
      setTimeout(() => {
         // history.goBack();
         // window.location.reload();
      }, 1000);
   };

   const HandleRejected = () => {
      addHoldRequestComments({
         brokerId: Number(brokerdetailId),
         brokerStatus: "REJECTED",
         holdReason: null
      });
      setTimeout(() => {
         // history.goBack();
         // window.location.reload();
      }, 1000);
   };

   const closeModal = (data = { isReload: false }) => {
      // if(data?.isReload) getAllUsers({pageNumber:"", records:"",searchByCity:"", searchByzipCode:""});
      setModalData(brokerdetailId);
   };
   const lengthOfResourceData = Broker_data ? Broker_data?.length : 0;
   return (
      <>
         <Hold
            show={show}
            handleShow={handleShow}
            handleClose={handleClose}
            modalData={modalData}
            // dataFrom="user_manage"
            closeModal={closeModal}
            history={{ goBack: closeModal }}
            toggleHoldStatus={toggleHoldStatus}
            holdStatus={holdStatus}
         // getAllUsers={getAllUsers}
         />
         <div className="dashboard container-fluid12">
            <Row>
               <Col lg={12}>
                  <div className="authorContact">
                     <div className="d-flex">
                        <div className="author-detail">
                           <Image name="author" className="object-cover" src={Broker_data?.profileImageURL || userImage} />
                        </div>
                        <div className="ml-3 mt-2">
                           <div className="broker-name" size="large" fontWeight="mediumbold">
                              <p>
                                 {Broker_data?.name}
                                 {/* <span>(4 Yrs)</span> */}
                              </p>
                           </div>
                           <div className="d-flex justify-content-between align-items-center">
                              {Broker_data?.status !== 'PENDING_APPROVAL' && Broker_data?.status !== 'PAYMENT_PENDING' ?
                                 <>
                                    <div className="d-flex align-items-start ">
                                       <div>
                                          <StarRating rating={Broker_data?.rating} />
                                          {/* <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="(112 customers)" className="ml-1" /> */}
                                       </div>
                                    </div>
                                    <div className="customer_ratedby">
                                       ( {Broker_data?.ratedBy !== null ? Broker_data?.ratedBy : '0'} customers)
                                    </div>
                                 </>
                                 : null}

                              {/* <Text
                                 size="xSmall"
                                 fontWeight="smbold"
                                 color="TaupeGrey"
                                 text="(0) customers"
                                 className="ml-3"
                              /> */}
                           </div>

                           <p size="xSmall" fontWeight="smbold">
                              Joined On: {formateDate(Broker_data?.joinedDate) ?? ""}
                           </p>
                        </div>
                     </div>
                     <div className="sell-rent-status">
                        <div className="sell-rent-box d-flex">
                           {Broker_data?.status === 'APPROVED' || Broker_data?.status === 'ON_HOLD' ?
                              <>
                                 <Table className="table_sell-rent">
                                    <tr>
                                       <th>
                                          <p>
                                             Sell
                                             <span>
                                                {" "}
                                                Last {Broker_data?.sellLastDays} days
                                             </span>
                                          </p>
                                       </th>
                                       <th>
                                          <p>
                                             rent
                                             <span>
                                                {" "}
                                                Last {Broker_data?.rentLastDays} days
                                             </span>
                                          </p>
                                       </th>
                                    </tr>
                                    <tr>
                                       <td>
                                          <div className="d-flex">
                                             <div>
                                                <p>Active Cust.</p>
                                                <span>
                                                   {Broker_data?.activeCustomersSale}
                                                </span>
                                             </div>
                                             <div>
                                                <p>Visits</p>
                                                <span>{Broker_data?.saleVisits}</span>
                                             </div>
                                          </div>
                                       </td>
                                       <td>
                                          <div className="d-flex">
                                             <div>
                                                <p>Active Cust.</p>
                                                <span>
                                                   {Broker_data?.activeCustomersRent}
                                                </span>
                                             </div>
                                             <div>
                                                <p>Visits</p>
                                                <span>{Broker_data?.rentVisits}</span>
                                             </div>
                                          </div>
                                       </td>
                                    </tr>
                                 </Table>
                                 <Table className="chat_date">
                                    <tr>
                                       <th>
                                          <p>
                                             CHAT
                                             <span>
                                                {" "}
                                                Last {Broker_data?.chatLastDays} days{" "}
                                             </span>
                                          </p>
                                       </th>
                                    </tr>
                                    <tr>
                                       <td>
                                          <div className="d-flex">
                                             <div>
                                                <p>Active Cust.</p>
                                                <span>
                                                   {Broker_data?.chatCustomerCount}
                                                </span>
                                             </div>
                                          </div>
                                       </td>
                                    </tr>
                                 </Table>
                              </>
                              : null}
                           <div className="brokerdetail-hold">
                              {Broker_data?.status === 'APPROVED' || Broker_data?.status === 'ON_HOLD' ?
                                 <Buttons
                                    className="hold-btn"
                                    name={!holdStatus ? "Hold" : "UnHold"}
                                    onClick={() => {
                                       if (!holdStatus) {

                                          handleShow();
                                          setModalData(brokerdetailId);

                                       } else {
                                          addHoldRequestComments({
                                             brokerId: Number(brokerdetailId),
                                             brokerStatus: "UN_HOLD",
                                             holdReason: null
                                             // comments: comment
                                          });
                                          setHoldStatus(false)
                                       }
                                       // handleShow();
                                    }}
                                 />
                                 : null}
                           </div>
                        </div>
                     </div>
                  </div>
               </Col>

               <Col lg={12}>
                  <div className="profession_details">
                     <div className="profession-name">
                        <div className="personal_name">
                           <p>Profession Details</p>
                        </div>
                     </div>
                     <div className="mt-1 row">
                        <Col lg='3' className="">
                           <div>
                              <p className="detail-heading">Locations Assigned</p>
                              <div className="details-heading location-assigned d-flex flex-wrap">
                                 {Broker_data?.locationsAssigned &&
                                    Broker_data?.locationsAssigned.map(
                                       (data, index) =>
                                       (
                                          <span key={index} className="details-value">
                                             {data}
                                          </span>
                                       )
                                    )}
                              </div>
                           </div>
                        </Col>
                        <Col lg='3' className="detail-col">
                           <div>
                              <p className="detail-heading">Specialized In</p>
                              <div className="details-heading d-flex">
                                 {Broker_data?.specializedIn && (
                                    <span className="details-value">
                                       {Broker_data?.specializedIn}
                                    </span>
                                 )}
                              </div>
                           </div>
                        </Col>
                        <Col lg='3' className="detail-col">
                           <div>
                              <p className="detail-heading">Services Offered</p>
                              <div className="details-heading d-flex flex-wrap">
                                 {Broker_data?.servicesOffered?.map((element, index) => (
                                    <span key={index} className="details-value">
                                       {element}
                                    </span>
                                 ))
                                 }
                              </div>
                           </div>
                        </Col>
                        <Col lg='3' className="detail-col">
                           <p className="detail-heading">Language Preferences</p>
                           <div className="details-heading d-flex flex-wrap">
                              {Broker_data?.languagePreferenceList &&
                                 Broker_data?.languagePreferenceList.map(
                                    (data, index) => (
                                       <span key={index} className="language-data details-value">
                                          {data}
                                       </span>
                                    )
                                 )}
                           </div>
                        </Col>

                        <Col lg='3' className="mt-1">
                           <div>
                              <p className="detail-heading">Rera Number</p>
                              <div className="details-heading">
                                 {Broker_data && (
                                    <>
                                       {Broker_data?.reraNumber && (
                                          <p className="details-value">
                                             {Broker_data?.reraNumber}
                                          </p>
                                       )}
                                    </>
                                 )}
                              </div>
                           </div>
                        </Col>
                        <Col lg='3' className="detail-col mt-1">
                           <div>
                              <p className="detail-heading">Deals In</p>
                              <div className="details-heading deals-in d-flex flex-wrap">
                                 {Broker_data?.dealsInList && (
                                    Broker_data?.dealsInList?.map(element => (
                                       <span className="details-value">{element}</span>
                                    )))}
                              </div>
                           </div>
                        </Col>
                        <Col lg='3' className="detail-col mt-1">
                           <div>
                              <p className="detail-heading">Builder Projects</p>
                              <div className="details-heading deals-in d-flex flex-wrap">
                                 {Broker_data?.builderProjects && (
                                    Broker_data?.builderProjects?.map(element => (
                                       <span className="details-value">{element}</span>
                                    )))}
                              </div>
                           </div>
                        </Col>
                     </div>
                  </div>
                  <div className="separator mt-4"></div>
                  <div className="personal_details">
                     <div className="personal_name">
                        <p>Personal Details</p>
                     </div>
                     <div className="mt-1 row">
                        <Col className="" lg='2'>
                           <div>
                              <p className="detail-heading">Phone Number</p>
                              <p className="details">{Broker_data?.mobileForCustomers}</p>
                           </div>
                        </Col>
                        <Col className="" lg='2'>
                           <div>
                              <p className="detail-heading">Date of Birth</p>
                              <p className="details">{Broker_data?.dob}</p>
                           </div>
                        </Col>
                        <Col className="" lg='3'>
                           <div>
                              <p className="detail-heading">Email</p>
                              <p className="details">{Broker_data?.email}</p>
                           </div>
                        </Col>
                        <Col className="" lg='5'>
                           <div>
                              <p className="detail-heading">Company Details </p>

                              <p className="details">
                                 {Broker_data?.companyName
                                    ? Broker_data?.companyName + ","
                                    : ""}
                                 {Broker_data?.companyAddress
                                    ? Broker_data?.companyAddress
                                    : ""}
                              </p>
                           </div>
                        </Col>
                     </div>
                  </div>
               </Col>

               {Broker_data.status === 'PENDING_APPROVAL' ?
                  <div className=" mt-4  d-flex ">
                     <div className="mr-2">
                        <Buttons
                           name="Decline"
                           varient="lightBtn"
                           size="Small"
                           color="secondryColor"
                           style={{ height: "40px !important" }}
                           onClick={HandleRejected}
                        >
                           Decline
                        </Buttons>
                     </div>
                     <div className="mr-2">
                        <Buttons class="btn Small white  primary" name="Approve" onClick={HandleSubmit}>
                           Approve
                        </Buttons>
                     </div>
                  </div>
                  : null}

               {Broker_data.status === 'APPROVED' || Broker_data.status === 'ON_HOLD' ?
                  <>
                     <Col lg={12}>
                        <Buttons
                           color={'#BCBCBC'}
                           name='Properties'
                           style={{ color: '#252525', backgroundColor: 'unset', borderBottomColor: '#BE1452', borderBottomWidth: 'thick', fontWeight: 'bolder' }}
                        ></Buttons>
                     </Col>
                     <Col lg={12}>
                        <div className="tableBox mb-5" style={{ marginTop: '5px' }}>
                           <div className="d-flex flex-md-column flex-xl-row justify-content-xl-between align-items-xl-center align-items-left tableHeading">
                              <div className="text-nowrap mb-2">
                                 <Text
                                    size="regular"
                                    fontWeight="mediumbold"
                                    color="secondryColor"
                                    text=""
                                 />
                                 <p className="bold"> Properties Posted - {count}</p>
                              </div>
                              <div className="locationSelect d-flex align-items-xl-center align-items-left">
                                 {subHeaderComponentMemo}
                                 <DateRangePicker
                                    style={{
                                       width: "249px",
                                       // height: "10px",
                                       // color: "darkgray",
                                       padding: "0px",
                                       // marginLeft: "15px",
                                    }}
                                    onChange={handleDateRangeChange}
                                    value={[startDate, endDate]}
                                 />
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
                              </div>
                           </div>

                           <div className="brokerTableWrapper">
                              <DataTable
                                 data={showValue()}
                                 columns={columns}
                                 progressPending={brokerProperty.isLoading}
                                 paginationComponent={PaginationComponent}
                                 paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                                 paginationPerPage={8}
                                 perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                                 filterText={filterText}
                                 subHeaderComponent={subHeaderComponentMemo}
                                 handlePageChange={handlePageChange}
                                 handleRowsPerPageChange={handleRowsPerPageChange}
                                 currentPage={currentPage}
                                 rowsPerPage={rowsPerPage}
                                 persistTableHead="true"
                                 filterComponent={subHeaderComponentMemo}
                              ></DataTable>
                           </div>
                        </div>
                     </Col>
                  </>
                  : null}
            </Row>
         </div>
      </>
   );
};

const mapStateToProps = ({ brokerProperty }) => ({
   brokerProperty,
   getBrokerPostedProperty,
   getPropertyDetails,
   getAllProperties,
});
const actions = {
   getBrokerPostedProperty,
   getPropertyDetails,
   getAllProperties,
};
const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(BrokerDetails);
