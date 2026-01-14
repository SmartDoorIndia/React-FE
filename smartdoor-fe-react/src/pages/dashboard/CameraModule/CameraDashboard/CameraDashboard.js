/** @format */

import { useEffect, useRef, useState } from "react";
import CONSTANTS_STATUS from "../../../../common/helpers/ConstantsStatus";
import { ToolTip } from "../../../../common/helpers/Utils";
import Text from "../../../../shared/Text/Text";
import "./CameraDashboard.scss";
import { Form } from "react-bootstrap";
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Image from "../../../../shared/Image";
import contentIcon from "../../../../assets/images/content-ico.png";
import Buttons from "../../../../shared/Buttons/Buttons";
import { getCameraTypes, getCorporateById } from "../../../../common/redux/actions";

const CameraDashboard = (props) => {
   const cameraStatus = CONSTANTS_STATUS.cameraStatus;
   const [statusSelected, setStatusSelected] = useState("");
   const [fromDate, setFromDate] = useState(null);
   const [toDate, setToDate] = useState(null);
   const [propertyIdText, setPropertyIdText] = useState("");
   const [cameraIdText, setCameraIdText] = useState("");
   const [uuIdText, setUUIdText] = useState("");
   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
   const [corporateList, setCorporateList] = useState([]);
   const [selectedCorporate, setSelectedCorporate] = useState([]);
   const [cameraStats, setCameraStats] = useState({});
   const [cameraTypeList, setCameraTypeList] = useState([]);
   const [typeSelected, setTypeSelected] = useState("");
   const [cameraSubTypeList, setCameraSubTypeList] = useState([]);
   const [subTypeSelected, setSubTypeSelected] = useState("");

   const tableRef = useRef();

   const cameraColumns = [
      {
         name: "Id",
         selector: (row) => row.cameraId,
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ cameraId }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={cameraId}>
               <Text size="Small" color="secondryColor elipsis-text" text={cameraId} />
            </ToolTip>
         ),
         id: 1,
      },
      {
         name: "UUId",
         selector: (row) => row.uuId,
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ uuId }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={uuId}>
               <Text size="Small" color="secondryColor elipsis-text" text={uuId} />
            </ToolTip>
         ),
         id: 2,
      },
      {
         name: "Type",
         selector: (row) => row.type,
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ type }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={type}>
               <Text size="Small" color="secondryColor elipsis-text" text={type} />
            </ToolTip>
         ),
         id: 3,
      },
      {
         name: "SubType",
         selector: (row) => row.subType,
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ subType }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={subType}>
               <Text size="Small" color="secondryColor elipsis-text" text={subType} />
            </ToolTip>
         ),
         id: 4,
      },
      {
         name: "Battery",
         selector: (row) => row.battery,
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ battery }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={battery}>
               <Text size="Small" color="secondryColor elipsis-text" text={battery} />
            </ToolTip>
         ),
         id: 5,
      },
      {
         name: "Status",
         selector: (row) => row.status,
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ status }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={status}>
               <Text size="Small" color="secondryColor elipsis-text" text={status} />
            </ToolTip>
         ),
         id: 6,
      },
      {
         name: "PropertyId",
         selector: (row) => row.propertyId,
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ propertyId }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={propertyId}>
               <Text size="Small" color="secondryColor elipsis-text" text={propertyId} />
            </ToolTip>
         ),
         id: 7,
      },
      {
         name: "Action",
         sortable: false,
         center: true,
         maxWidth: "40px",
         cell: ({ row, propertyId, postedById }) => (
            <div className="action">
               <ToolTip position="left" name="View Details">
                  <span>
                     <Link
                        to={{
                           pathname: "/admin/",
                           state: {},
                        }}
                     >
                        <Image name="editIcon" src={contentIcon} />
                     </Link>
                  </span>
               </ToolTip>
            </div>
         ),
      },
   ];

   const getCorprateList = async () => {
      try {
         const response = await getCorporateById({
            corporateId: 0,
            pageNo: 1,
            pageSize: 8,
         });
         if(response?.status === 200) {
            const trimmedData = response?.data?.resourceData?.map(({ corporateId, companyName }) => ({
               corporateId,
               companyName,
            }));
   
            setCorporateList(trimmedData);
         }
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      getCameraTypes({})
         .then((response) => {
            setCameraTypeList(response.data.resourceData?.cameraTypes);
            setCameraSubTypeList(response.data.resourceData?.cameraSubTypes);
         })
         .catch((error) => {
            console.log(error);
         });
      getCorprateList();
   }, []);

   return (
      <>
         <div className="tableBox ">
            <div className="align-items-center tableHeading">
               <div className="justify-content-between">
                  <div className="locationSelect d-flex">
                     <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                           as="select"
                           value={statusSelected}
                           onChange={(e) => {
                              setStatusSelected(e.target.value);
                           }}
                        >
                           <option value="">Select Status</option>
                           {cameraStatus?.length
                              ? cameraStatus.map((status) => (
                                   <option key={status} value={status}>
                                      {status}
                                   </option>
                                ))
                              : null}
                        </Form.Control>
                     </Form.Group>
                     <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                           as="select"
                           value={selectedCorporate}
                           onChange={(e) => {
                              setSelectedCorporate(e.target.value);
                           }}
                        >
                           <option value="">Select Corporate</option>
                           {corporateList.map((corporate, index) => (
                              <option key={index} value={corporate?.corporateId}>
                                 {corporate?.companyName}
                              </option>
                           ))}
                        </Form.Control>
                     </Form.Group>
                     <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                           as="select"
                           value={typeSelected}
                           onChange={(e) => {
                              setTypeSelected(e.target.value);
                           }}
                        >
                           <option value="">Select Type</option>
                           {cameraTypeList?.length
                              ? cameraTypeList.map((type) => (
                                   <option key={type} value={type}>
                                      {type}
                                   </option>
                                ))
                              : null}
                        </Form.Control>
                     </Form.Group>
                     <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                           as="select"
                           value={subTypeSelected}
                           onChange={(e) => {
                              setSubTypeSelected(e.target.value);
                           }}
                        >
                           <option value="">Select SubType</option>
                           {cameraSubTypeList[typeSelected]?.length
                              ? cameraSubTypeList[typeSelected]?.map((subType) => (
                                   <option key={subType} value={subType}>
                                      {subType}
                                   </option>
                                ))
                              : null}
                        </Form.Control>
                     </Form.Group>{" "}
                     &nbsp;&nbsp;
                     <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                           type="date"
                           max={new Date().toISOString().split("T")[0]}
                           placeholder="From Date"
                           value={fromDate}
                           onChange={(e) => {
                              setFromDate(e.target.value);
                           }}
                        />
                     </Form.Group>{" "}
                     &nbsp;&nbsp;
                     <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                           type="date"
                           max={new Date().toISOString().split("T")[0]}
                           placeholder="To Date"
                           value={toDate}
                           onChange={(e) => {
                              setToDate(e.target.value);
                           }}
                        />
                     </Form.Group>
                     <div className="ml-3">
                        <Buttons
                           name="Search"
                           varient="primary"
                           size="Small"
                           color="white"
                           style={{ height: "40px !important" }}
                           onClick={async () => {}}
                        />
                     </div>
                  </div>
               </div>
            </div>
            <div className="cameraTableWrapper">
               <DataTableComponent
                  ref={tableRef}
                  data={[]}
                  columns={cameraColumns}
                  persistTableHead
                  paginationServer={false}
               ></DataTableComponent>
            </div>
         </div>
      </>
   );
};

export default CameraDashboard;
