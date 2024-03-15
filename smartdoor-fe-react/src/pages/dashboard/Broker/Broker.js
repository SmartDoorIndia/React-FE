/** @format */
// @ts-ignore
import { React, useEffect, useMemo, memo } from "react";
import SearchInput from "../../../shared/Inputs/SearchInput/SearchInput";
import Pagination from "../../../shared/DataTable/Pagination";
import { compose } from "redux";
import { connect } from "react-redux";
import { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import { handleStatusElement, formateDate } from "../../../common/helpers/Utils";
import { ToolTip } from "../../../common/helpers/Utils";
import { getBrokerListing, getBrokerDetails } from "../../../common/redux/actions";
import { Link } from "react-router-dom/cjs/react-router-dom";
import "./Broker.scss";
import { DateRangePicker, Stack } from "rsuite";
import CONSTANTS_STATUS from "../../../common/helpers/ConstantsStatus";
import { set } from "date-fns";
import moment  from "moment";
const getModalActionData = (row) => {
   return { userData: row };
};
const Broker = (props) => {
   const { allPlanDataBroker, getBrokerListing } = props;
   const [planData, setPlanData] = useState();
   const statusArr = CONSTANTS_STATUS.brokerStatus;
   const [filterText, setFilterText] = useState("");
   const [statusSelected, setStatusSelected] = useState("");
   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
   const [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);
   const [datata, setDatata] = useState([]);

   useEffect(() => {
      getBrokerListing();
   }, [getBrokerListing]);

   const showValue = (status_value, startDate_, endDate_) => {
      let status = status_value || statusSelected;
      let filteredItems = [];
      startDate_ = startDate_ || startDate;
      endDate_ = endDate_ || endDate;
      filteredItems = allPlanDataBroker.data?.length
         ? allPlanDataBroker.data.filter((item) => {
              return (
                 item?.id == filterText ||
                 item?.mobile?.includes(filterText) ||
                 item?.name?.toLowerCase().includes(filterText.toLowerCase())
              );
           })
         : [];
      if (status && filteredItems.length) {
         filteredItems = filteredItems.filter((item) => {
            return item?.status == status;
         });
      }
      if (startDate_) {
         filteredItems = filteredItems.filter((item) => {
            let joinedDate =moment(item.joinedDate);
            let mst = moment(startDate_).startOf('day')
            let met = moment(endDate_).endOf('day')

            return joinedDate >= mst && joinedDate <= met;
            return item?.status == status;
         });
      }
      return filteredItems;
   };

   const PaginationComponent = (props) => (
      <Pagination {...props} PaginationActionButton={PaginationActionButton} />
   );
   const PaginationActionButton = () => (
      <div className="d-flex justify-content-center tableBottom"></div>
   );

   const handleDateRangeChange = (date) => {
      if (date && date[0] && date[1]) {
         const startDate = date[0];
         const endDate = date[1];
         setStartDate(startDate);
         setEndDate(endDate);
         showValue(statusSelected, startDate, endDate);
         // setDatata(filteredItems);
      }
   };
   const selectionRange = {
      startDate: startDate,
      endDate: endDate,
      key: "selection",
   };

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

   const columns = [
      {
         name: "Reg On",
         // selector:(row) => row.brokerId,
         center: true,
         sortable: true,
         minWidth: "400px",
         cell: ({ joinedDate }) => <span>{`${formateDate(joinedDate)}` || ""}</span>,
      },
      {
         name: "Name",
         selector: "name",
         center: false,
         minWidth: "100px",
      },
      {
         name: "Location",
         selector: (row) => row.latestLcation.locationName,
         sortable: false,
         center: false,
         minWidth: "120px",
      },
      {
         name: "mobile",
         selector: "mobile",
         sortable: true,
         center: false,
         minWidth: "145px",
      },
      {
         name: "Email",
         selector: "email",
         sortable: false,
         center: true,
         minWidth: "245px",
      },
      {
         name: "Plan",
         selector: "plan",
         sortable: false,
         center: true,
         minWidth: "120px",
      },
      {
         name: "Posted Properties",
         selector: "postedProperties",
         sortable: false,
         center: true,
         minWidth: "165px",
      },
      {
         name: "Chats",
         selector: "chat",
         sortable: false,
         center: true,
      },
      {
         name: "Profile Status",
         selector: "status",
         sortable: false,
         center: true,
         minWidth: "120px",
         cell: ({ status }) => handleStatusElement(status),
      },
      {
         name: "Action",
         selector: (row) => row.action,
         sortable: false,
         center: true,
         minWidth: "150px",
         cell: (row) => (
            <div className="action">
               <ToolTip name="View Details">
                  <span>
                     {row.status === "Rejected" ? (
                        <span className="broker_details">Details</span>
                     ) : (
                        <Link
                           to={{
                              pathname:
                                 row.status === "Approved"
                                    ? `/admin/BrokerDetails/${row.brokerId}`
                                    : `/admin/getBrokerDetailsForApprove/${row.brokerId}`,
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
   ];

   return (
      <>
         <div className="tableBox mb-5">
            <div className="d-flex flex-md-column flex-xl-row justify-content-xl-between align-items-xl-center align-items-left tableHeading">
               <div className="text-nowrap mb-2">
                  {/* <Text
                        size="regular"
                        fontWeight="mediumbold"
                        color="secondryColor"
                        text="Brokers"
                    /> */}
                  <DateRangePicker
                     style={{
                        width: "249px",
                        height: "39px",
                        color: "darkgray",
                        marginTop: "10px",
                     }}
                     // ranges={[selectionRange]}
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

            <Card>
               <DataTableComponent
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
               ></DataTableComponent>
            </Card>
         </div>
      </>
   );
};
const mapStateToProps = ({ allPlanDataBroker }) => ({
   allPlanDataBroker,
   getBrokerDetails,
});
const actions = {
   getBrokerListing,
   getBrokerDetails,
};
const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(Broker);
