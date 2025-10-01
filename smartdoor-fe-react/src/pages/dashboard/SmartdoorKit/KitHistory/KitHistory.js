/** @format */

import React, { useEffect, useState } from "react";
import { viewKitHistory } from "../../../../common/redux/actions";
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import { formateDate, ToolTip } from "../../../../common/helpers/Utils";
import Text from "../../../../shared/Text/Text";
import "./KitHistoryList.scss";

const KitHistory = (props) => {
   const [kitHistoryList, setKitHistoryList] = useState([]);

   const kitHistoryColumns = [
      {
         name: "Kit Id",
         selector: (row) => row.kitId,
         sortable: true,
         center: false,
         maxWidth: "90px",
         cell: ({ kitId }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={kitId}>
               <Text size="Small" color="secondryColor elipsis-text" text={kitId} />
            </ToolTip>
         ),
         id: 1,
      },
      {
         name: "Updated Date",
         selector: (row) => row.updatedDate,
         sortable: true,
         center: true,
         maxWidth: "150px",
         cell: ({ updatedDate }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={formateDate(updatedDate)}>
               <Text size="Small" color="secondryColor elipsis-text" text={formateDate(updatedDate)} />
            </ToolTip>
         ),
         id: 2,
      },
      {
         name: "Inventory Type",
         selector: (row) => row.inventoryType,
         sortable: false,
         center: true,
         maxWidth: "150px",
         cell: ({ inventoryType }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={inventoryType || "-"}>
               <Text size="Small" color="secondryColor elipsis-text" text={inventoryType || "-"} />
            </ToolTip>
         ),
         id: 3,
      },
      {
         name: "Property Id",
         selector: (row) => row.propertyId,
         sortable: false,
         center: true,
         maxWidth: "110px",
         cell: ({ propertyId }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={propertyId || "-"}>
               <Text size="Small" color="secondryColor elipsis-text" text={propertyId || "-"} />
            </ToolTip>
         ),
         id: 4,
      },
      {
         name: "Created By",
         selector: (row) => row.createdByName,
         sortable: false,
         center: true,
         minWidth: "100px",
         cell: ({ createdByName }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={createdByName || "-"}>
               <Text size="Small" color="secondryColor elipsis-text" text={createdByName || "-"} />
            </ToolTip>
         ),
         id: 5,
      },
      {
         name: "Corporate",
         selector: (row) => row.corporateName,
         sortable: false,
         center: false,
         minWidth: "150px",
         cell: ({ corporateName }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={corporateName || "-"}>
               <Text size="Small" color="secondryColor elipsis-text" text={corporateName || "-"} />
            </ToolTip>
         ),
         id: 6,
      },
   ];
   useEffect(() => {
      viewKitHistory({ kitId: props?.kitId }).then((response) => {
         if (response?.status === 200) {
            setKitHistoryList([...response.data.resourceData]);
         }
      });
   }, []);

   return (
      <>
         <div className="tableBox">
            <div className="kitHistoryTableWrapper">
               <DataTableComponent
                  columns={kitHistoryColumns}
                  data={kitHistoryList}
                  paginationServer={false}
                  persistTableHead
               ></DataTableComponent>
            </div>
         </div>
      </>
   );
};

export default KitHistory;
