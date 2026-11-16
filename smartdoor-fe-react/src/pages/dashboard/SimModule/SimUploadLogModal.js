/** @format */

import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { formateDateTime, showErrorToast, ToolTip } from "../../../common/helpers/Utils";
import Loader from "../../../common/helpers/Loader";
import { getSimUploadLog } from "../../../common/redux/actions";
import Text from "../../../shared/Text/Text";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import Pagination from "../../../shared/DataTable/Pagination";

// smartlockservice rejects pageSize above 100
const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

const uploadLogColumns = [
   { name: "Upload Id", center: true, selector: (row) => row.uploadBatchId, maxWidth: "65px" },
   { name: "Provider", center: true, selector: (row) => row.provider, minWidth: "90px" },
   {
      name: "File Name",
      center: true,
      selector: (row) => row.fileName,
      minWidth: "200px",
      cell: ({ fileName }) => (
         <ToolTip position="top" name={fileName}>
            <Text size="Small" color="secondryColor elipsis-text" text={fileName} />
         </ToolTip>
      ),
   },
   { name: "Uploaded By", center: true, selector: (row) => row.uploadedByName || "-", minWidth: "140px" },
   {
      name: "Uploaded On",
      center: true,
      selector: (row) => row.uploadedDate,
      minWidth: "170px",
      cell: ({ uploadedDate }) => formateDateTime(uploadedDate) || "-",
   },
   { name: "Rows", center: true, selector: (row) => row.totalRows },
   { name: "Added", center: true, selector: (row) => row.inserted },
   { name: "Updated", center: true, selector: (row) => row.updated },
   { name: "Unchanged", center: true, selector: (row) => row.unchanged, minWidth: "100px" },
];

const SimUploadLogModal = ({ show, onHide }) => {
   const [page, setPage] = useState({ pageNumber: 1, pageSize: 10 });
   const [uploads, setUploads] = useState([]);
   const [records, setRecords] = useState(0);
   const [loading, setLoading] = useState(false);

   // refetched on every open so uploads made since the last open are listed
   useEffect(() => {
      if (!show) return;
      let ignore = false;
      setLoading(true);
      getSimUploadLog(page).then((response) => {
         if (ignore) return;
         setLoading(false);
         if (response?.status === 200) {
            setUploads(response.data?.resourceData || []);
            setRecords(response.data?.records || 0);
         } else {
            showErrorToast(response?.data?.message || "Could not load the upload log, please try again.");
         }
      });
      return () => {
         ignore = true;
      };
   }, [show, page]);

   const handlePageChange = (pageNumber) => {
      if (pageNumber < 1 || pageNumber > Math.ceil(records / page.pageSize)) return;
      setPage((current) => ({ ...current, pageNumber }));
   };

   const PaginationComponent = (props) => (
      <Pagination
         {...props}
         rowCount={records}
         rowsPerPage={page.pageSize}
         currentPage={page.pageNumber}
         onChangePage={handlePageChange}
         onChangeRowsPerPage={(pageSize) => setPage({ pageNumber: 1, pageSize })}
         paginationRowsPerPageOptions={PAGE_SIZE_OPTIONS}
      />
   );

   return (
      <Modal show={show} onHide={onHide} centered size="xl">
         <Modal.Header closeButton>
            <Modal.Title style={{ fontSize: "18px", fontWeight: 600 }}>SIM Upload Log</Modal.Title>
         </Modal.Header>
         <Modal.Body className="simTableWrapper">
            {loading ? (
               <div className="simTableOverlay">
                  <Loader />
               </div>
            ) : null}
            <DataTableComponent
               data={uploads}
               columns={uploadLogColumns}
               noDataComponent={<div className="simTableNoData">{loading ? "" : "No uploads yet"}</div>}
               persistTableHead
               paginationServer
               paginationComponent={PaginationComponent}
               paginationRowsPerPageOptions={PAGE_SIZE_OPTIONS}
               paginationPerPage={page.pageSize}
            />
         </Modal.Body>
      </Modal>
   );
};

export default SimUploadLogModal;
