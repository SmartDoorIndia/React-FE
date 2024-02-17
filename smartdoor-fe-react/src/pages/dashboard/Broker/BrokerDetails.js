/** @format */

import {React, useMemo,useEffect, useState, useCallback} from "react";
import { compose } from "redux";
import { Col, Row, Table, Card } from "react-bootstrap";
import SearchInput from '../../../shared/Inputs/SearchInput/SearchInput'
import Image from "../../../shared/Image/Image";
import userImage from "../../../assets/svg/avatar_sml.svg";
import Text from "../../../shared/Text/Text";
import StarRating from "../../../shared/StarRating/StarRating";
import Pagination from "../../../shared/DataTable/Pagination";
import Form from 'react-bootstrap/Form';
import DataTable from '../../../shared/DataTable/DataTable';
import Buttons from "../../../shared/Buttons/Buttons";
import { useParams } from "react-router-dom";
import "./Broker.scss";
import { getBrokerDetails,blockConsumerUser } from "../../../common/redux/actions";

const BrokerDetails = () => {
   const { brokerdetailId } = useParams();
   const [blockData,setBlockData] = useState(null);
   const [Broker_data, setBrokerData] = useState([]);
   const [show, setShow] = useState(false);
   console.log(Broker_data,"broker_data");
   const [loading, setLoading] = useState(true);
   const handleClose = () => setShow(false);
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
          console.log(response,"brokerresponse")
          if (response.data) {
            if (response.data.resourceData) setBrokerData(response.data.resourceData);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log('error', error);
        });
    }, [getBrokerDetails, brokerdetailId]);
    useEffect(() => {
      _getBrokerDetails();
    },[_getBrokerDetails])
  
   const [filterText, setFilterText] = useState("");
   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
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
            placeholder="Search here"
         />
      );
   }, [filterText, resetPaginationToggle]);

   const columns = [
      {
         name: "Posted On",
         selector: "Posted On",
         maxWidth: "550px",
         sortable: true,
         center: true,
      },
      {
         name: "Posted for",
         selector: "Posted for",
         sortable: true,
         maxWidth: "200px",
         center: false,
      },
      {
         name: "Location",
         selector: "Location",
         sortable: false,
         maxWidth: "200px",
         center: false,
      },
      {
         name: "Plan",
         selector: "Plan",
         sortable: true,
         maxWidth: "100px",
         center: false,
      },
      {
         name: "Config.",
         selector: "Config.",
         sortable: false,
         maxWidth: "100px",
         center: true,
      },
      {
         name: "Status",
         selector: "Status",
         sortable: false,
         maxWidth: "150px",
         center: true,
      },
      {
         name: "Action",
         selector: "Action",
         sortable: false,
         maxWidth: "150px",
         center: true,
      },

   ];
   return (
      <>
         <div className="dashboard container-fluid12">
            <Row>
               <Col lg={12}>
                  <div className="authorContact mt-4">
                     <div className="d-flex">
                        <div className="author-detail">
                           <Image name="author" className="object-cover" src={userImage} />
                        </div>
                        <div className="ml-3 mt-2">
                           <div className="broker-name" size="large" fontWeight="mediumbold">
                              <p>
                                 {" "}
                                 Mohit Suryavanshi<span>(4 Yrs)</span>
                              </p>
                           </div>
                           <div className="d-flex justify-content-between align-items-center">
                              <StarRating rating="" />{" "}
                              <Text
                                 size="xSmall"
                                 fontWeight="smbold"
                                 color="TaupeGrey"
                                 text="(0) customers"
                                 className="ml-3"
                              />
                           </div>

                           <Text size="xSmall" fontWeight="smbold" text="Joined on: Aug 20, 2017" />
                        </div>
                     </div>
                     <div className="sell-rent-status">
                        <div className="sell-rent-box d-flex">
                           <Table className="table_sell-rent">
                              <tr>
                                 <th>
                                    <p>
                                       Sell<span> Last 90 days</span>
                                    </p>
                                 </th>
                                 <th>
                                    <p>
                                       rent<span> Last 90 days</span>
                                    </p>
                                 </th>
                              </tr>
                              <tr>
                                 <td>
                                    <div className="d-flex">
                                       <div>
                                          <p>Active Cust.</p>
                                          <span>10</span>
                                       </div>
                                       <div>
                                          <p>Visits</p>
                                          <span>100</span>
                                       </div>
                                    </div>
                                 </td>
                                 <td>
                                    <div className="d-flex">
                                       <div>
                                          <p>Active Cust.</p>
                                          <span>10</span>
                                       </div>
                                       <div>
                                          <p>Visits</p>
                                          <span>100</span>
                                       </div>
                                    </div>
                                 </td>
                              </tr>
                           </Table>
                           <Table className="chat_date">
                              <tr>
                                 <th>
                                    <p>
                                       cHAT<span> Last 90 days </span>
                                    </p>
                                 </th>
                              </tr>
                              <tr>
                                 <td>
                                    <div className="d-flex">
                                       <div>
                                          <p>Active Cust.</p>
                                          <span>10</span>
                                       </div>
                                    </div>
                                 </td>
                              </tr>
                           </Table>
                        </div>
                        <div></div>
                     </div>
                  </div>
               </Col>

               <Col lg={12}>
                  <div className="profession_details">
                     <div className="profession-name">
                        <div>
                           <p className="personal_name">Profession Details</p>
                        </div>
                     </div>
                     <div className="mt-1 row">
                        <Col className="">
                           <div>
                              <p className="detail-heading">Locations Assigned</p>
                              <p className="details">yiuyti</p>
                           </div>
                        </Col>
                        <Col className="">
                           <div>
                              <p className="detail-heading">Specialized In</p>
                              <p className="details">yiuyti</p>
                           </div>
                        </Col>
                        <Col className="">
                           <div>
                              <p className="detail-heading">Services Offered</p>
                              <p className="details">yiuyti</p>
                           </div>
                        </Col>
                        <Col className="">
                           <div>
                              <p className="detail-heading">Language Preferences</p>
                              <p className="details">yiuyti</p>
                           </div>
                        </Col>
                       
                        <Col className="">
                           <div>
                              <p className="detail-heading">Rera Number</p>
                              <p className="details">yiuyti</p>
                           </div>
                        </Col>
                        <Col className="">
                           <div>
                              <p className="detail-heading">Deals In</p>
                              <p className="details">yiuyti</p>
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
                              <p className="details">7894561000, 7894561000</p>
                           </div>
                        </Col>
                        <Col className="">
                           <div>
                              <p className="detail-heading">Date of Birth</p>
                              <p className="details">Sep 16, 1989</p>
                           </div>
                        </Col>
                        <Col className="">
                           <div>
                              <p className="detail-heading">Email</p>
                              <p className="details">manish.tiwari@gmail.com</p>
                           </div>
                        </Col>
                        <Col className="">
                           <div>
                              <p className="detail-heading">Company Details </p>
                              <p className="details">ABC Firm, 6391 Elgin St. Celina, Pune 411001, MH</p>
                           </div>
                        </Col>
                       
                     </div>
                  </div>
               </Col>

               <Col lg={12}>
                  <div className="heading">
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
                              text="Properties Posted - 20"
                           />
                        </div>
                        <div className="locationSelect d-flex align-items-xl-center align-items-left">
                           {subHeaderComponentMemo}
                           <Buttons
                              type="submit"
                              name="Filters"
                              className="ml-2 me-3"
                              size="Small"
                           />
                           <Form.Group
                              controlId="example"
                              className="w-40 userGrp ml-0"
                           ></Form.Group>
                        </div>
                     </div>

                     <Card>
                        <DataTable
                           columns={columns}
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

export default compose()(BrokerDetails);
