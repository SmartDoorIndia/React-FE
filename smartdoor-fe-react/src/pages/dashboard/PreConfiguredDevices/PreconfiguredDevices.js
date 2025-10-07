/** @format */

import React, { useEffect, useState } from "react";
import { getDeviceIdList } from "../../../common/redux/actions";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import { ToolTip } from "../../../common/helpers/Utils";
import Text from "../../../shared/Text/Text";
import "./PreconfigDevices.scss";

const PreconfiguredDevices = () => {
   const [cameraList, setCameraList] = useState([]);
   const [smartlockList, setSmartlockList] = useState([]);

   const cameraColumns = [
      {
         name: "Id",
         selector: (row) => row.uuId,
         sortable: true,
         center: false,
         maxWidth: "160px",
         cell: ({ uuId }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={uuId}>
               <Text size="Small" color="secondryColor elipsis-text" text={uuId} />
            </ToolTip>
         ),
         id: 1,
      },
      {
         name: "CameraDeviceId",
         selector: (row) => row.cameraDeviceId,
         sortable: true,
         center: true,
         maxWidth: "160px",
         cell: ({ cameraDeviceId }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={cameraDeviceId}>
               <Text size="Small" color="secondryColor elipsis-text" text={cameraDeviceId} />
            </ToolTip>
         ),
         id: 2,
      },
      {
         name: "Camera Type",
         selector: (row) => row.type,
         sortable: false,
         center: true,
         minWidth: "170px",
         cell: ({ type }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={type}>
               <Text size="Small" color="secondryColor elipsis-text" text={type} />
            </ToolTip>
         ),
         id: 3,
      },
      // {
      //    name: "Action",
      //    selector: (row) => row.action,
      //    sortable: true,
      //    center: false,
      //    maxWidth: "150px",
      //    cell: ({ uuId }) => (
      //       <ToolTip position="top" style={{ width: "100%" }} name={uuId}></ToolTip>
      //    ),
      //    id: 6,
      // },
   ];

   const smartlockColumns = [
      {
         name: "Id",
         selector: (row) => row.id,
         sortable: true,
         center: false,
         maxWidth: "90px",
         cell: ({ id }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={id}>
               <Text size="Small" color="secondryColor elipsis-text" text={id} />
            </ToolTip>
         ),
         id: 1,
      },
      {
         name: "Lock Id",
         selector: (row) => row.lockId,
         sortable: false,
         center: true,
         maxWidth: "150px",
         cell: ({ lockId }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={lockId}>
               <Text size="Small" color="secondryColor elipsis-text" text={lockId} />
            </ToolTip>
         ),
         id: 2,
      },
      {
         name: "Admin Passcode",
         selector: (row) => row.smartlockAdminPasscode,
         sortable: false,
         center: true,
         maxWidth: "150px",
         cell: ({ smartlockAdminPasscode }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={smartlockAdminPasscode}>
               <Text
                  size="Small"
                  color="secondryColor elipsis-text"
                  text={smartlockAdminPasscode}
               />
            </ToolTip>
         ),
         id: 3,
      },
      {
         name: "Lockmac",
         selector: (row) => row.lockmac,
         sortable: false,
         center: false,
         maxWidth: "250px",
         cell: ({ lockmac }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={lockmac}>
               <Text size="Small" color="secondryColor elipsis-text" text={lockmac} />
            </ToolTip>
         ),
         id: 4,
      },
   ];

   useEffect(() => {
      getDeviceIdList({ kitId: 0 }).then((response) => {
         if (response?.status === 200) {
            setSmartlockList([...response.data.resourceData?.smartlockList]);
            setCameraList([...response.data.resourceData.cameraList]);
         }
      });
   }, []);

   return (
      <>
         <div className="tableBox">
            <div className="align-items-center tableHeading">
               <div className="d-flex justify-content-between">
                  <Text size="regular" fontWeight="mediumbold" color="secondryColor" text="SmartLock List" />
                  <div className="locationSelect d-flex"></div>
               </div>
            </div>
            <div className="smartLockTableWrapper">
               <DataTableComponent
                  columns={smartlockColumns}
                  data={smartlockList}
                  paginationServer={false}
                  persistTableHead
               ></DataTableComponent>
            </div>
         </div>
         <hr />
         <div className="tableBox">
            <div className="align-items-center tableHeading">
               <div className="d-flex justify-content-between">
                  <Text size="regular" fontWeight="mediumbold" color="secondryColor" text="Camera List" />
                  <div className="locationSelect d-flex"></div>
               </div>
            </div>
            <div className="cameraListTableWrapper">
               <DataTableComponent
                  data={cameraList}
                  columns={cameraColumns}
                  paginationServer={false}
                  persistTableHead={true}
               />
            </div>
         </div>
      </>
   );
};

export default PreconfiguredDevices;
