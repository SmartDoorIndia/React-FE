/** @format */

import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import DataTableComponent from "../../../../shared/DataTable/DataTable";
import Text from "../../../../shared/Text/Text";
import Buttons from "../../../../shared/Buttons/Buttons";
import { showErrorToast, showSuccessToast } from "../../../../common/helpers/Utils";
import {
   getCameraMediaDayWiseQueue,
   getCameraMediaList,
   getCameraVisitData,
   correctCameraMediaTimestamp,
} from "../../../../common/redux/actions";
import "./CameraMediaDashboard.scss";

const DAY_MS = 24 * 60 * 60 * 1000;

const toDateTimeLocalValue = (ms) => {
   if (!ms) return "";
   const d = new Date(ms);
   const tzOffset = d.getTimezoneOffset() * 60000;
   return new Date(d.getTime() - tzOffset).toISOString().slice(0, 19);
};

const startOfTodayMs = () => {
   const d = new Date();
   d.setHours(0, 0, 0, 0);
   return d.getTime();
};

const CameraMediaDetail = () => {
   const { cameraId } = useParams();
   // Draft filter values - bound to the inputs, do NOT trigger a fetch on their own.
   const [fromTimestamp, setFromTimestamp] = useState(toDateTimeLocalValue(startOfTodayMs()));
   const [toTimestamp, setToTimestamp] = useState(toDateTimeLocalValue(Date.now()));
   const [mediaTypeFilter, setMediaTypeFilter] = useState(""); // "" = All (unsegregated sorts first by default)
   // Applied filter values - only updated by "Apply Filters"; these drive the actual API calls.
   const [appliedFrom, setAppliedFrom] = useState(fromTimestamp);
   const [appliedTo, setAppliedTo] = useState(toTimestamp);
   const [appliedMediaType, setAppliedMediaType] = useState("");
   const [dayWiseQueue, setDayWiseQueue] = useState([]);
   const [mediaList, setMediaList] = useState([]);
   const [mediaTotalCount, setMediaTotalCount] = useState(0);
   const [mediaLoading, setMediaLoading] = useState(false);
   const [pageNumber, setPageNumber] = useState(1);
   const [pageSize, setPageSize] = useState(10);
   const [visitList, setVisitList] = useState([]);
   const [visitLoading, setVisitLoading] = useState(false);
   const [showEditModal, setShowEditModal] = useState(false);
   const [selectedMediaRow, setSelectedMediaRow] = useState(null);
   const [newCapturedTime, setNewCapturedTime] = useState("");
   const [saving, setSaving] = useState(false);
   const [previewImageUrl, setPreviewImageUrl] = useState(null);

   const fetchDayWiseQueue = async () => {
      const endDate = new Date().getTime();
      const startDate = endDate - 30 * DAY_MS;
      const response = await getCameraMediaDayWiseQueue({ cameraId, startDate, endDate });
      if (response?.status === 200) {
         setDayWiseQueue(response?.data?.resourceData || []);
      }
   };

   const fetchMediaList = async (from, to, page, size, mediaType) => {
      const startDate = new Date(from).getTime();
      const endDate = new Date(to).getTime();
      if (startDate > endDate) {
         showErrorToast("'From' timestamp must be before 'To' timestamp");
         return;
      }
      setMediaLoading(true);
      const response = await getCameraMediaList({
         cameraId,
         startDate,
         endDate,
         mediaType: mediaType || undefined,
         pageNumber: page,
         pageSize: size,
      });
      if (response?.status === 200) {
         setMediaList(response?.data?.resourceData || []);
         setMediaTotalCount(response?.data?.records || 0);
      }
      setMediaLoading(false);
   };

   const fetchVisitData = async (from, to) => {
      const startDate = new Date(from).getTime();
      const endDate = new Date(to).getTime();
      if (startDate > endDate) {
         return;
      }
      setVisitLoading(true);
      const response = await getCameraVisitData({ cameraId, startDate, endDate });
      if (response?.status === 200) {
         setVisitList(response?.data?.resourceData || []);
      }
      setVisitLoading(false);
   };

   useEffect(() => {
      fetchDayWiseQueue();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [cameraId]);

   useEffect(() => {
      fetchMediaList(appliedFrom, appliedTo, pageNumber, pageSize, appliedMediaType);
      fetchVisitData(appliedFrom, appliedTo);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [cameraId, appliedFrom, appliedTo, pageNumber, pageSize, appliedMediaType]);

   const applyFilters = () => {
      if (new Date(fromTimestamp).getTime() > new Date(toTimestamp).getTime()) {
         showErrorToast("'From' timestamp must be before 'To' timestamp");
         return;
      }
      setAppliedFrom(fromTimestamp);
      setAppliedTo(toTimestamp);
      setAppliedMediaType(mediaTypeFilter);
      setPageNumber(1);
   };

   const openEditModal = (row) => {
      setSelectedMediaRow(row);
      setNewCapturedTime(toDateTimeLocalValue(row.capturedDate));
      setShowEditModal(true);
   };

   const handleSaveTimestamp = async () => {
      if (!newCapturedTime) {
         showErrorToast("Please select a corrected time");
         return;
      }
      setSaving(true);
      const response = await correctCameraMediaTimestamp({
         cameraDeviceId: Number(cameraId),
         capturedDate: selectedMediaRow.capturedDate,
         newCapturedTime: new Date(newCapturedTime).getTime(),
      });
      setSaving(false);
      if (response?.status === 200) {
         showSuccessToast(response?.data?.customMessage || "Captured time corrected successfully");
         setShowEditModal(false);
         setSelectedMediaRow(null);
         fetchDayWiseQueue();
         fetchMediaList(appliedFrom, appliedTo, pageNumber, pageSize, appliedMediaType);
      } else {
         showErrorToast(response?.data?.responseMessage || "Failed to correct captured time");
      }
   };

   const mediaColumns = [
      {
         name: "Image",
         selector: (row) => row.awsUrl,
         center: true,
         cell: ({ awsUrl }) =>
            awsUrl ? (
               <img
                  src={awsUrl}
                  alt="captured"
                  className="camera-media-thumb"
                  style={{ cursor: "pointer" }}
                  onClick={() => setPreviewImageUrl(awsUrl)}
               />
            ) : (
               "-"
            ),
         id: 1,
      },
      {
         name: "Captured Time",
         selector: (row) => row.capturedDate,
         sortable: true,
         center: true,
         cell: ({ capturedDate }) => <Text size="Small" text={capturedDate ? new Date(capturedDate).toLocaleString() : "-"} />,
         id: 2,
      },
      {
         name: "Media Type",
         selector: (row) => row.mediaType,
         center: true,
         cell: ({ mediaType }) => (
            <span className={`media-type-badge ${mediaType === "BACKUP_IMAGE_FILE" ? "pending" : "segregated"}`}>
               {mediaType === "BACKUP_IMAGE_FILE" ? "Pending" : "Segregated"}
            </span>
         ),
         id: 3,
      },
      {
         name: "Original Time",
         selector: (row) => row.originalCapturedTime,
         center: true,
         cell: ({ originalCapturedTime }) => <Text size="Small" text={originalCapturedTime || "-"} />,
         id: 4,
      },
      {
         name: "Corrections",
         selector: (row) => row.timestampCorrections?.length,
         center: true,
         cell: ({ timestampCorrections }) => <Text size="Small" text={timestampCorrections?.length || 0} />,
         id: 5,
      },
      {
         name: "Action",
         center: true,
         cell: (row) => <Buttons name="Edit time" size="xSmall" onClick={() => openEditModal(row)} />,
         id: 6,
      },
   ];

   const visitColumns = [
      {
         name: "Visitor",
         selector: (row) => row.visitorName,
         center: true,
         cell: ({ visitorName }) => <Text size="Small" text={visitorName || "-"} />,
         id: 1,
      },
      {
         name: "Status",
         selector: (row) => row.status,
         center: true,
         cell: ({ status, ongoing }) => (
            <span className={`visit-status-badge ${status === "IN_PROGRESS" ? "in-progress" : "visited"}`}>
               {status}{ongoing ? " (ongoing)" : ""}
            </span>
         ),
         id: 2,
      },
      {
         name: "Visit Start",
         selector: (row) => row.propertyVisitStartTime,
         center: true,
         cell: ({ propertyVisitStartTime }) => <Text size="Small" text={propertyVisitStartTime || "-"} />,
         id: 3,
      },
      {
         name: "Visit End",
         selector: (row) => row.propertyVisitEndTime,
         center: true,
         cell: ({ propertyVisitEndTime }) => <Text size="Small" text={propertyVisitEndTime || "Ongoing"} />,
         id: 4,
      },
      {
         name: "Duration (min)",
         selector: (row) => row.durationMinutes,
         center: true,
         cell: ({ durationMinutes }) => <Text size="Small" text={durationMinutes ?? "-"} />,
         id: 5,
      },
   ];

   return (
      <div className="dashboard">
         <div className="tableBox cameraMediaTableWrapper" style={{ overflowX: "hidden", padding: "16px" }}>
            <Text size="regular" fontWeight="bold" color="secondryColor" text={`Camera #${cameraId} - Media Segregation`} />

            <div className="mt-4">
               <Text size="regular" fontWeight="bold" color="secondryColor" text="Day-wise Pending Queue (last 30 days)" />
               <table className="day-wise-queue-table mt-2">
                  <thead>
                     <tr>
                        <th>Day</th>
                        <th>Pending (Backup) Images</th>
                     </tr>
                  </thead>
                  <tbody>
                     {dayWiseQueue?.length ? (
                        dayWiseQueue.map((row) => (
                           <tr key={row.day}>
                              <td>{new Date(row.day).toLocaleDateString()}</td>
                              <td>{row.pendingCount}</td>
                           </tr>
                        ))
                     ) : (
                        <tr>
                           <td colSpan={2}>No pending queue in this range</td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>

            <div className="mt-4 d-flex align-items-center flex-wrap" style={{ gap: "12px", rowGap: "10px" }}>
               <Text size="regular" fontWeight="bold" color="secondryColor" text="From" />
               <input
                  type="datetime-local"
                  className="form-control"
                  step="1"
                  style={{ width: "230px" }}
                  max={toTimestamp}
                  value={fromTimestamp}
                  onChange={(e) => setFromTimestamp(e.target.value)}
               />
               <Text size="regular" fontWeight="bold" color="secondryColor" text="To" />
               <input
                  type="datetime-local"
                  className="form-control"
                  step="1"
                  style={{ width: "230px" }}
                  min={fromTimestamp}
                  max={toDateTimeLocalValue(Date.now())}
                  value={toTimestamp}
                  onChange={(e) => setToTimestamp(e.target.value)}
               />
               <Text size="regular" fontWeight="bold" color="secondryColor" text="Media Type" className="ml-3" />
               <select
                  className="form-control"
                  style={{ width: "220px" }}
                  value={mediaTypeFilter}
                  onChange={(e) => setMediaTypeFilter(e.target.value)}
               >
                  <option value="">All (Unsegregated first)</option>
                  <option value="BACKUP_IMAGE_FILE">Unsegregated (Pending)</option>
                  <option value="IMAGE_FILE">Segregated</option>
               </select>
               <Buttons name="Apply Filters" varient="primary" type="button" onClick={applyFilters} />
            </div>

            <div className="cameraMediaDetailTableWrapper mt-2">
               <DataTableComponent
                  data={mediaList}
                  columns={mediaColumns}
                  progressPending={mediaLoading}
                  pagination
                  paginationServer
                  paginationTotalRows={mediaTotalCount}
                  paginationPerPage={pageSize}
                  paginationRowsPerPageOptions={[10, 20, 30, 50]}
                  onChangePage={(page) => setPageNumber(page)}
                  onChangeRowsPerPage={(size) => {
                     setPageSize(size);
                     setPageNumber(1);
                  }}
               />
            </div>

            <div className="mt-4">
               <Text size="regular" fontWeight="bold" color="secondryColor" text="Visits on this property (VISITED / IN_PROGRESS)" />
               <div className="cameraMediaDetailTableWrapper mt-2">
                  <DataTableComponent data={visitList} columns={visitColumns} progressPending={visitLoading} pagination />
               </div>
            </div>
         </div>

         <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
            <Modal.Body>
               <Text
                  size="regular"
                  fontWeight="bold"
                  color="secondryColor"
                  className="mb-3"
                  text="Correct captured time"
               />
               <Text
                  size="Small"
                  color="secondryColor"
                  className="mb-2"
                  text={
                     selectedMediaRow?.mediaType === "BACKUP_IMAGE_FILE"
                        ? "This image is still pending (backup). Correcting its time will also mark it segregated and visible to customers."
                        : "This image is already segregated. Correcting its time will not change its visibility."
                  }
               />
               <input
                  type="datetime-local"
                  className="form-control"
                  step="1"
                  value={newCapturedTime}
                  onChange={(e) => setNewCapturedTime(e.target.value)}
               />
               <div className="d-flex justify-content-end mt-4" style={{ gap: "10px" }}>
                  <Buttons
                     name="Cancel"
                     varient="disable"
                     type="button"
                     onClick={() => setShowEditModal(false)}
                  />
                  <Buttons
                     name={saving ? "Saving..." : "Save"}
                     varient="primary"
                     type="button"
                     disabled={saving}
                     onClick={handleSaveTimestamp}
                  />
               </div>
            </Modal.Body>
         </Modal>

         <Modal show={!!previewImageUrl} onHide={() => setPreviewImageUrl(null)} centered size="lg">
            <Modal.Body className="text-center">
               {previewImageUrl && (
                  <img src={previewImageUrl} alt="preview" style={{ maxWidth: "100%", maxHeight: "75vh" }} />
               )}
               <div className="d-flex justify-content-end mt-3">
                  <Buttons name="Close" varient="disable" type="button" onClick={() => setPreviewImageUrl(null)} />
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
};

export default CameraMediaDetail;
