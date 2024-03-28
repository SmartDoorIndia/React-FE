/** @format */
// @ts-ignore
import { React, useMemo, useEffect, useState, useCallback, memo } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
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
import { ToolTip } from "../../../common/helpers/Utils";
import { handleStatusElement, formateDate } from "../../../common/helpers/Utils";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Hold from "../../../shared/Modal/BrokerDetailModal/BrokerDetailModal";
import "./Broker.scss";
import {
   getBrokerDetails,
   getBrokerPostedProperty,
   getPropertyDetails,getBrokerListing,
   addHoldRequestComments,
} from "../../../common/redux/actions";
import moment from "moment";
import CONSTANTS_STATUS from "../../../common/helpers/ConstantsStatus";

const BrokerDetails = (props) => {
   // MODAL DATA STATE
   const { allPlanDataBroker, getBrokerPostedProperty } = props;
   const [show, setShow] = useState(false);
   const handleShow = () => setShow(true);
   const [modalData, setModalData] = useState();
   const [count, setCount] = useState(0);
   const statusArr = CONSTANTS_STATUS.brokerStatus;
   const { brokerdetailId } = useParams();
   const { propertyId } = useParams();
   const { userId } = useParams();
   const [blockData, setBlockData] = useState(null);

   const [Broker_data, setBrokerData] = useState([]);
   const [loading, setLoading] = useState(true);
   const handleClose = () => setShow(false);
   const [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);
   const [statusSelected, setStatusSelected] = useState("");
   const [filterText, setFilterText] = useState("");
   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
   const [holdStatus, setHoldStatus] = useState(false);
   const [postedProperty, setPostedProperty] = useState([]);
   console.log(postedProperty,"ffjgfhjg")
   const toggleHoldStatus = () => {
      setHoldStatus(!holdStatus);
   };

useEffect(()=>{
   console.log("Broker_data?.resourceData?.status",Broker_data?.resourceData?.status);
   if (Broker_data?.resourceData?.status === "Hold") {
      setHoldStatus(true);
    } else if (Broker_data?.resourceData?.status === "Approved") {
      setHoldStatus(false);
    }
},[Broker_data?.resourceData?.status ])

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
      getBrokerDetails({ brokerId: brokerdetailId })
         .then((response) => {
            setLoading(false);
            if (response) {
               if (response) setBrokerData(response.data);
            }
         })
         .catch((error) => {
            setLoading(false);
         });
   }, [getBrokerDetails, brokerdetailId]);

   const _getPostedDetailProperty = useCallback(() => {
      getBrokerPostedProperty({brokerId: brokerdetailId})
      .then((response) => {
     
         setLoading(false);
         if(response){
            if( response) setPostedProperty(response.data);
         }
      })
      .catch((error) =>{
         setLoading(false);
      })
   },[getBrokerPostedProperty,brokerdetailId])
   useEffect(() => {
      _getBrokerDetails();
      _getPostedDetailProperty();
      setTimeout(() => {
         if (Broker_data?.resourceData?.status === "Hold") {
            setHoldStatus(false);
          } else if (Broker_data?.resourceData?.status === "Approved") {
            setHoldStatus(true);
          }
      }, 1000);
    }, [_getBrokerDetails, _getPostedDetailProperty]);

   const PaginationComponent = (props) => (
      <Pagination {...props} PaginationActionButton={PaginationActionButton} />
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
            onFilter={(e) => setFilterText(e.target.value)}
            onClear={handleClear}
            filterText={filterText}
            placeholder="Search"
         />
      );
   }, [filterText, resetPaginationToggle]);

   const _filterStatus = (status_value) => {
      setStatusSelected(status_value);
      showValue(status_value);
   };

   const showValue = (status_value, startDate_, endDate_) => {
      let status = status_value || statusSelected;
      let filteredItems = [];
      startDate_ = startDate_ || startDate;
      endDate_ = endDate_ || endDate;

      filteredItems = allPlanDataBroker.data?.length
         ? allPlanDataBroker.data.filter((item) => {
              return (
                 item?.propertyId == filterText ||
                 item?.postedFor?.toLowerCase().includes(filterText.toLowerCase())
              );
           })
         : [];
      if (status && filteredItems?.length) {
         filteredItems = filteredItems.filter((item) => {
            return item?.status == status;
         });
      }
      if (startDate_) {
         filteredItems = filteredItems.filter((item) => {
            let postedOn = moment(item.postedOn);
            let mst = moment(startDate_).startOf("day");
            let met = moment(endDate_).endOf("day");

            return postedOn >= mst && postedOn <= met;
            return item?.status == status;
         });
      }
      if (count != filteredItems.length) setCount(filteredItems.length);
      return filteredItems;
   };
   const handleDateRangeChange = (date) => {
      if (date && date[0] && date[1]) {
         const startDate = date[0];
         const endDate = date[1];
         setStartDate(startDate);
         setEndDate(endDate);
         showValue(statusSelected, startDate, endDate);
      }
   };
   // const selectionRange = {
   //    startDate: startDate,
   //    endDate: endDate,
   //    key: "selection",
   // };

   const columns = [
      {
         name: "Posted On",
         selector: 'postedOn',
         sortable: true,
         center: true,
         cell: ({ postedOn })=>(<span>{formateDate(postedOn)}</span>),
      },
      {
         name: "Posted for",
         selector: "postedFor",
         sortable: true,
         maxWidth: "120px",
         center: false,
      },
      {
         name: "Location",
         selector: (row) => row.location?.localityName,
         sortable: false,
         maxWidth: "100px",
         minWidth: "100px",
         center: false,
      },
      {
         name: "Plan",
         selector: "plan",
         sortable: true,
         maxWidth: "100px",
         center: false,
      },
      {
         name: "Config.",
         selector: "config",
         sortable: false,
         maxWidth: "100px",
         minWidth: "115px",
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
         selector: (row) => row.action,
         sortable: false,
         center: true,
         minWidth: "120px",
         maxWidth: "100px",
         cell: (row) => (
            <div className="action">
               <ToolTip name="View Details">
                  <span>
                     <Link
                        to={{
                           pathname: `/admin/property/getPropertyById/${propertyId}/${userId}`,
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
   const closeModal = (data = { isReload: false }) => {
      // if(data?.isReload) getAllUsers({pageNumber:"", records:"",searchByCity:"", searchByzipCode:""});
      setModalData(brokerdetailId);
   };
   const lengthOfResourceData = Broker_data?.resourceData ? Broker_data.resourceData.length : 0;
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
                           <Image name="author" className="object-cover" src={userImage} />
                        </div>
                        <div className="ml-3 mt-2">
                           <div className="broker-name" size="large" fontWeight="mediumbold">
                              <p>
                                 {Broker_data?.resourceData?.name}
                                 {/* <span>(4 Yrs)</span> */}
                              </p>
                           </div>
                           <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-start ">
                                 <div>
                                    <StarRating rating={Broker_data?.resourceData?.rating} />
                                    {/* <Text size="xSmall" fontWeight="smbold" color="TaupeGrey" text="(112 customers)" className="ml-1" /> */}
                                 </div>
                              </div>
                              <div className="customer_ratedby">
                                 ( {Broker_data?.resourceData?.ratedBy} customers)
                              </div>

                              {/* <Text
                                 size="xSmall"
                                 fontWeight="smbold"
                                 color="TaupeGrey"
                                 text="(0) customers"
                                 className="ml-3"
                              /> */}
                           </div>

                           <p size="xSmall" fontWeight="smbold">
                              {formateDate(Broker_data?.resourceData?.joinedDate) ?? ""}
                           </p>
                        </div>
                     </div>
                     <div className="sell-rent-status">
                        <div className="sell-rent-box d-flex">
                           <Table className="table_sell-rent">
                              <tr>
                                 <th>
                                    <p>
                                       Sell
                                       <span>
                                          {" "}
                                          Last {Broker_data?.resourceData?.sellLastDays} days
                                       </span>
                                    </p>
                                 </th>
                                 <th>
                                    <p>
                                       rent
                                       <span>
                                          {" "}
                                          Last {Broker_data?.resourceData?.rentLastDays} days
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
                                             {Broker_data?.resourceData?.sellActiveCustomers}
                                          </span>
                                       </div>
                                       <div>
                                          <p>Visits</p>
                                          <span>{Broker_data?.resourceData?.sellVisits}</span>
                                       </div>
                                    </div>
                                 </td>
                                 <td>
                                    <div className="d-flex">
                                       <div>
                                          <p>Active Cust.</p>
                                          <span>
                                             {Broker_data?.resourceData?.rentActiveCustomers}
                                          </span>
                                       </div>
                                       <div>
                                          <p>Visits</p>
                                          <span>{Broker_data?.resourceData?.rentVisits}</span>
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
                                          Last {Broker_data?.resourceData?.chatLastDays} days{" "}
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
                                             {Broker_data?.resourceData?.chatCustomerCount}
                                          </span>
                                       </div>
                                    </div>
                                 </td>
                              </tr>
                           </Table>
                           <div className="brokerdetail-hold">
                              <Buttons
                                 className="hold-btn"
                                 name={!holdStatus ? "Hold" : "UnHold"}
                                 onClick={() => {
                                    if(!holdStatus){

                                       handleShow();
                                       setModalData(brokerdetailId);

                                    }else{
                                       
                                    addHoldRequestComments({
                                       brokerId: brokerdetailId,
                                       status:"Approved",
                                       // comments: comment
                                    });
                                    setHoldStatus(false)
                                    }
                                       // handleShow();
                                 }}
                              />
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
                        <Col className="">
                           <div>
                              <p className="detail-heading">Locations Assigned</p>
                              <div className="details-heading location-assigned">
                                 { Broker_data?.resourceData?.brokerlocation &&
                                 Broker_data?.resourceData?.brokerlocation.map(
                                    (data, index) =>
                                       data?.city !== null && (
                                          <span key={index} className="details-value">
                                             {data?.city}
                                          </span>
                                       )
                                 )}
                              </div>
                           </div>
                        </Col>
                        <Col className="">
                           <div>
                              <p className="detail-heading">Specialized In</p>
                              <div className="details-heading">
                                 {Broker_data?.resourceData?.specializedIn &&
                                    Broker_data?.resourceData?.specializedIn.map(
                                       (data, index) =>
                                          index ===
                                             Broker_data.resourceData.specializedIn.length - 1 && (
                                             <span key={index} className="details-value">
                                                {data?.specializedIn}
                                             </span>
                                          )
                                    )}
                              </div>
                           </div>
                        </Col>
                        <Col className="">
                           <div>
                              <p className="detail-heading">Services Offered</p>
                              <div className="details-heading d-flex">
                                 {Broker_data && Broker_data.resourceData && (
                                    <>
                                       {Broker_data.resourceData?.rent && (
                                          <span className="details-value">Rent</span>
                                       )}
                                       {(Broker_data?.resourceData?.sell || Broker_data?.resourceData?.buy) && (
                                             <span className="details-value">Buy / Sell</span>
                                          )}
                                                                              
                                    </>
                                 )}
                              </div>
                           </div>
                        </Col>
                        <Col className="">
                           <div>
                              <p className="detail-heading">Language Preferences</p>
                              <div className="details-heading">
                                 {Broker_data?.resourceData?.languagePreference &&
                                    Broker_data?.resourceData?.languagePreference.map(
                                       (data, index) => (
                                          <span key={index} className="language-data details-value">
                                             {data.languagePreference}
                                          </span>
                                       )
                                    )}
                              </div>
                           </div>
                        </Col>

                        <Col className="">
                           <div>
                              <p className="detail-heading">Rera Number</p>
                              <div className="details-heading">
                                 {Broker_data && Broker_data.resourceData && (
                                    <>
                                       {Broker_data?.resourceData?.reraNumber && (
                                          <p className="details-value">
                                             {Broker_data?.resourceData?.reraNumber}
                                          </p>
                                       )}
                                    </>
                                 )}
                              </div>
                           </div>
                        </Col>
                        <Col className="">
                           <div>
                              <p className="detail-heading">Deals In</p>
                              <div className="details-heading deals-in">
                                 {Broker_data && Broker_data.resourceData && (
                                    <>
                                       {Broker_data.resourceData?.dealsInNewProject && (
                                          <span className="details-value">New Projects</span>
                                       )}
                                       {Broker_data.resourceData?.dealsInResaleProperties && (
                                          <span className="details-value">Resale Properties</span>
                                       )}
                                    </>
                                    // <span className="details-value">
                                    //    {Broker_data?.resourceData?.dealsInNewProject == true
                                    //       ? "New Projects"
                                    //       : ""}
                                    // </span>
                                    // <span className="details-value">
                                    //    {Broker_data?.resourceData?.dealsInResaleProperties == true
                                    //       ? "Resale Properties"
                                    //       : ""}
                                    // </span>
                                 )}
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
                        <Col className="">
                           <div>
                              <p className="detail-heading">Phone Number</p>
                              <p className="details">{Broker_data?.resourceData?.phoneNumber}</p>
                           </div>
                        </Col>
                        <Col className="">
                           <div>
                              <p className="detail-heading">Date of Birth</p>
                              <p className="details">{Broker_data?.resourceData?.dob}</p>
                           </div>
                        </Col>
                        <Col className="">
                           <div>
                              <p className="detail-heading">Email</p>
                              <p className="details">{Broker_data?.resourceData?.email}</p>
                           </div>
                        </Col>
                        <Col className="">
                           <div>
                              <p className="detail-heading">Company Details </p>

                              <p className="details">
                                 {Broker_data?.resourceData?.companyName
                                    ? Broker_data?.resourceData?.companyName + ","
                                    : ""}
                                 {Broker_data?.resourceData?.companyAddress
                                    ? Broker_data?.resourceData?.companyAddress
                                    : ""}
                              </p>
                           </div>
                        </Col>
                     </div>
                  </div>
               </Col>

               <Col lg={12}>
                  <div className="heading mt-4 text-decoration-underline">
                     <h6>PROPERTIES</h6>
                  </div>
               </Col>

               <Col lg={12}>
                  <div className="tableBox mb-5">
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
                                 height: "30px",
                                 color: "darkgray",
                                 marginTop: "0px",
                                 marginLeft: "15px",
                              }}
                              onChange={handleDateRangeChange}
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

                     <Card>
                        <DataTable
                           data={showValue()}
                           columns={columns}
                           progressPending={allPlanDataBroker.isLoading}
                           paginationComponent={PaginationComponent}
                           paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                           paginationPerPage={8}
                           perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                           filterText={filterText}
                           subHeaderComponent={subHeaderComponentMemo}
                           persistTableHead="true"
                           filterComponent={subHeaderComponentMemo}
                        ></DataTable>
                     </Card>
                  </div>
               </Col>
            </Row>
         </div>
      </>
   );
};

const mapStateToProps = ({ allPlanDataBroker }) => ({
   allPlanDataBroker,
   getBrokerPostedProperty,
   getPropertyDetails,
   getBrokerListing,
});
const actions = {
   getBrokerPostedProperty,
   getPropertyDetails,
   getBrokerListing,
};
const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(BrokerDetails);
