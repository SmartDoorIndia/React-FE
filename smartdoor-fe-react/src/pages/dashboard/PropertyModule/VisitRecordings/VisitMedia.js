/** @format */

import React, { useEffect, useState } from "react";
import { getMediaByCameraId, getVisitMediaByCameraId } from "../../../../common/redux/actions";
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import Buttons from "../../../../shared/Buttons/Buttons";
import { TableLoader } from "../../../../common/helpers/Loader";
import Pagination from "../../../../shared/DataTable/Pagination";
import VisitImages from "./VisitImgVideos/VisitImages";
import VisitVideos from "./VisitImgVideos/VisitVideos";
import "./VisitMedia.scss";
import ListingDataTable from "../../../../shared/DataTable/ListingDataTable";
import { Modal } from "react-bootstrap";

const VisitMedia = (props) => {
   const [visitRecordings, setVisitRecordings] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [rowsPerPage, setRowsPerPage] = useState(8);
   const [expandLoading, setExpandLoading] = useState(false);
   const [expandedRowId, setExpandedRowId] = useState(null);
   const [expandedRowData, setExpandedRowData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [selectedVisitorImg, setSelectedVisitorImg] = useState("");
   const [showVisitorImg, setShowVisitorImg] = useState(false);

   const mediaColumns = [
      {
         name: "Property Visit StartTime",
         selector: "propertyVisitStartTime",
         minWidth: "200px",
         center: true,
      },
      {
         name: "Property Visit EndTime",
         selector: "propertyVisitEndTime",
         minWidth: "200px",
         center: true,
      },
      {
         name: "Visit Date",
         selector: "visitDate",
         maxWidth: "200px",
         center: true,
      },
      {
         name: "Visitor Name",
         selector: "visitorName",
         maxWidth: "300px",
         center: true,
      },
      {
         name: "Visitor Profile",
         selector: "visitorImage",
         maxWidth: "150px",
         center: true,
         cell: ({ visitorImage }) => (
            <>
               <img
                  className="p-1"
                  src={visitorImage}
                  alt=""
                  style={{ height: "50px", width: "50px", cursor: 'pointer' }}
                  onClick={() => {
                     setSelectedVisitorImg(visitorImage);
                     setShowVisitorImg(true);
                  }}
               />
            </>
         ),
      },
   ];

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

   const getVisitMedia = (newPage, newRowsPerPage) => {
      setLoading(true);
      getVisitMediaByCameraId({
         cameraId: props?.cameraId,
         startDate: formatDateTime(fromDate),
         endDate: formatDateTime(toDate),
         pageNumber: newPage,
         pageSize: newRowsPerPage,
      }).then((response) => {
         setLoading(false);
         setVisitRecordings(response);
      });
   };

   useEffect(() => {
      setLoading(true);
      getVisitMedia(1, 10);
   }, []);

   const handlePageChange = (newPage) => {
      setCurrentPage(Number(newPage));
      getVisitMedia(newPage, rowsPerPage);
   };

   const handleRowsPerPageChange = (newRowsPerPage) => {
      setRowsPerPage(newRowsPerPage);
      setCurrentPage(1);
      getVisitMedia(1, newRowsPerPage);
   };

   const ProgressComponent = <TableLoader />;
   const PaginationComponent = ({ onChangeRowsPerPage, ...props }) => (
      <Pagination
         {...props}
         showPageChange={false}
         PaginationActionButton={PaginationActionButton}
         // currentPage={currentPage}
         rowsPerPage={rowsPerPage}
         paginationRowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150]}
         // rowCount={visitRecordings?.length}
         // onChangePage={handlePageChange}
         onChangeRowsPerPage={handleRowsPerPageChange}
      />
   );

   const PaginationActionButton = () => (
      <div className="d-flex justify-content-center tableBottom"></div>
   );

   const ExpandedRowComponent = ({ data }) => {
      return (
         <div className="px-4 mt-4">
            {expandLoading ? (
               <>
                  <TableLoader className="justify-content-center" />
               </>
            ) : (
               <>
                  <VisitImages
                     cameraId={props?.cameraId}
                     startTime={expandedRowData?.propertyVisitStartTime}
                     endTime={expandedRowData?.propertyVisitEndTime}
                     dataRequiredType={"VISIT_DATA"}
                  />
                  <VisitVideos
                     cameraId={props?.cameraId}
                     startTime={expandedRowData?.propertyVisitStartTime}
                     endTime={expandedRowData?.propertyVisitEndTime}
                     dataRequiredType={"VISIT_DATA"}
                  />
               </>
            )}
         </div>
      );
   };

   const handleExpandRow = async (isExpanded, row) => {
      if (isExpanded) {
         setExpandLoading(true);
         await setExpandedRowData(row);
         await setExpandedRowId(row.id); // ✅ keep only this row expanded
         setExpandLoading(false);
      } else {
         setExpandedRowId(null); // ✅ collapse when clicked again
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
            paginationRowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150]}
            paginationPerPage={rowsPerPage}
            perPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150]}
            // onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            expandableRows
            expandableRowsComponent={({ data }) => <ExpandedRowComponent expandedRowId={data.id} />}
            expandableRowExpanded={(row) => row.id === expandedRowId}
            onRowExpandToggled={handleExpandRow}
            persistTableHead={true}
         ></ListingDataTable>

         <Modal
            show={showVisitorImg}
            onHide={() => {
               setShowVisitorImg(false);
            }}
            centered
         >
            <Modal.Header style={{ justifyContent: "end" }}>
               <Buttons
                  style={{ float: "right" }}
                  name="X"
                  varient="secondary"
                  onClick={() => {
                     setShowVisitorImg(false);
                  }}
               ></Buttons>
            </Modal.Header>
            <Modal.Body>
               <div style={{ justifySelf: "center" }}>
                  <img src={selectedVisitorImg} style={{ height: "250px", width: "250px" }} />
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
};

export default VisitMedia;
