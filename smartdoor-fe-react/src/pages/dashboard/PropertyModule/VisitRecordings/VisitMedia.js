/** @format */

import React, { useEffect, useState } from "react";
import { getMediaByCameraId, getVisitMediaByCameraId } from "../../../../common/redux/actions";
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import Buttons from "../../../../shared/Buttons/Buttons";
import { TableLoader } from "../../../../common/helpers/Loader";
import Pagination from "../../../../shared/DataTable/Pagination";
import VisitImages from "./VisitImgVideos/VisitImages";
import VisitVideos from "./VisitImgVideos/VisitVideos";
import './VisitMedia.scss';
import ListingDataTable from "../../../../shared/DataTable/ListingDataTable";

const VisitMedia = (props) => {
   const [visitRecordings, setVisitRecordings] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [rowsPerPage, setRowsPerPage] = useState(8);
   const [expandLoading, setExpandLoading] = useState(false);
   const [expandedRowId, setExpandedRowId] = useState(null);
   const [expandedRowData, setExpandedRowData] = useState(null);
   const [loading, setLoading] = useState(false);

   const mediaColumns = [
      {
         name: "property Visit StartTime",
         selector: "propertyVisitStartTime",
         minWidth: "200px",
         center: true,
      },
      {
         name: "property Visit EndTime",
         selector: "propertyVisitEndTime",
         minWidth: "200px",
         center: true,
      },
      {
         name: "visit Date",
         selector: "visitDate",
         maxWidth: "300px",
         center: true,
      },
      {
         name: "visitor Name",
         selector: "visitorName",
         maxWidth: "300px",
         center: true,
      },
   ];

   const handlePageChange = (newPage) => {
      setCurrentPage(Number(newPage));
   };

   const handleRowsPerPageChange = (newRowsPerPage) => {
      setRowsPerPage(newRowsPerPage);
      setCurrentPage(1);
   };

   const ProgressComponent = <TableLoader />;
   const PaginationComponent = ({ onChangePage, onChangeRowsPerPage, ...props }) => (
      <Pagination
         {...props}
         PaginationActionButton={PaginationActionButton}
         currentPage={currentPage}
         rowsPerPage={rowsPerPage}
         rowCount={visitRecordings?.length}
         onChangePage={handlePageChange}
         onChangeRowsPerPage={handleRowsPerPageChange}
      />
   );

   const PaginationActionButton = () => (
      <div className="d-flex justify-content-center tableBottom"></div>
   );

   // Today's date
   const toDate = new Date();

   // 30 days before today
   const fromDate = new Date();
   fromDate.setDate(toDate.getDate() - 30);

   // Helper to format as "yyyy-MM-dd HH:mm:ss"
   function formatDateTime(d) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");

      const hh = String(d.getHours()).padStart(2, "0");
      const min = String(d.getMinutes()).padStart(2, "0");
      const sec = String(d.getSeconds()).padStart(2, "0");

      return `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec}`;
   }

   useEffect(() => {
      setLoading(true);
      getVisitMediaByCameraId({
         cameraId: props?.cameraId,
         startDate: formatDateTime(fromDate),
         endDate: formatDateTime(toDate),
         pageNumber: currentPage,
         pageSize: rowsPerPage,
      }).then((response) => {
         setLoading(false);
         setVisitRecordings(response);
      });
   }, []);

   const ExpandedRowComponent = ({ data }) => {
      return (
         <div className="px-4 mt-4">
            {expandLoading ? (
               <>
                  <TableLoader className="justify-content-center" />
               </>
            ) : (
               <>
                  <VisitImages cameraId={props?.cameraId} startTime={expandedRowData?.propertyVisitStartTime} endTime={expandedRowData?.propertyVisitEndTime} dataRequiredType={"VISIT_DATA"} />
                  <VisitVideos cameraId={props?.cameraId} startTime={expandedRowData?.propertyVisitStartTime} endTime={expandedRowData?.propertyVisitEndTime} dataRequiredType={"VISIT_DATA"} />
               </>
            )}
         </div>
      );
   };

   const handleExpandRow = async (isExpanded, row) => {
    if (isExpanded) {
      setExpandLoading(true);
      await setExpandedRowData(row);
      await setExpandedRowId(row.id);        // ✅ keep only this row expanded
      setExpandLoading(false);
    } else {
      setExpandedRowId(null);          // ✅ collapse when clicked again
      setExpandedRowData(null);
    }
  };

   return (
      <>
         <ListingDataTable
            className="visitMediaTable"
            columns={mediaColumns}
            data={visitRecordings}
            isLoading={loading}
            progressComponent={ProgressComponent}
            paginationComponent={PaginationComponent}
            paginationServer={true}
            paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
            paginationPerPage={rowsPerPage}
            perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            expandableRows
            expandableRowsComponent={({ data }) => <ExpandedRowComponent expandedRowId={data.id} />}
            expandableRowExpanded={(row) => row.id === expandedRowId}
            onRowExpandToggled={handleExpandRow}
            persistTableHead={true}
         ></ListingDataTable>
      </>
   );
};

export default VisitMedia;
