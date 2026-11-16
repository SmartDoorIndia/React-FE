/** @format */

import React, { useState } from "react";
import { Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import CONSTANTS_STATUS from "../../../common/helpers/ConstantsStatus";
import { showErrorToast, showSuccessToast } from "../../../common/helpers/Utils";
import { uploadSimFile } from "../../../common/redux/actions";
import Text from "../../../shared/Text/Text";
import Buttons from "../../../shared/Buttons/Buttons";

// spring.servlet.multipart.max-file-size on smartlockservice
const MAX_FILE_SIZE_MB = 25;

// a file with bad rows is rejected as a whole with one message:
// "SIM file not uploaded - 2 rows have errors. Correct them and upload the file again. Row 5: ICCID is empty; Row 9 (...): ..."
const ROW_LIST_MARKER = "upload the file again. ";

const parseRejection = (message) => {
   const index = message.indexOf(ROW_LIST_MARKER);
   if (index === -1) return { summary: message, rows: [] };
   return {
      summary: message.slice(0, index + ROW_LIST_MARKER.length).trim(),
      rows: message.slice(index + ROW_LIST_MARKER.length).split("; ").filter(Boolean),
   };
};

const ResultCount = ({ label, value, color = "#252525" }) => (
   <Col className="text-center">
      <Text text={value} style={{ color, fontSize: "22px", fontWeight: "700", display: "block" }} />
      <Text text={label} style={{ color: "#6c757d", fontSize: "12px" }} />
   </Col>
);

const SimUploadModal = ({ show, onHide, onUploaded }) => {
   const [provider, setProvider] = useState("");
   const [file, setFile] = useState(null);
   // bumped to clear the file input, which can't be controlled
   const [fileInputKey, setFileInputKey] = useState(0);
   const [uploading, setUploading] = useState(false);
   const [result, setResult] = useState(null);
   // why the backend refused the last upload; nothing from that file was saved
   const [rejection, setRejection] = useState(null);

   const reset = () => {
      setProvider("");
      setFile(null);
      setFileInputKey((key) => key + 1);
      setResult(null);
      setRejection(null);
   };

   const handleClose = () => {
      if (uploading) return;
      reset();
      onHide();
   };

   const handleUpload = async () => {
      if (!provider) {
         showErrorToast("Select the provider the file was downloaded from.");
         return;
      }
      if (!file) {
         showErrorToast("Choose the SIM file to upload.");
         return;
      }
      if (!file.name.toLowerCase().endsWith(".csv")) {
         showErrorToast("Only .csv files are accepted. Upload the .csv file downloaded from the vendor portal.");
         return;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
         showErrorToast(`The file is larger than ${MAX_FILE_SIZE_MB} MB.`);
         return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("provider", provider);
      setUploading(true);
      setRejection(null);
      const response = await uploadSimFile(formData);
      setUploading(false);
      if (response?.status === 200) {
         setResult(response.data?.resourceData);
         showSuccessToast(response.data?.customMessage || "SIM file uploaded successfully");
         onUploaded();
      } else {
         setRejection(parseRejection(response?.data?.message || "Upload failed, please try again."));
      }
   };

   return (
      <Modal show={show} onHide={handleClose} centered size="lg" backdrop="static">
         <Modal.Header closeButton={!uploading}>
            <Modal.Title style={{ fontSize: "18px", fontWeight: 600 }}>Upload SIM File</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {!result ? (
               <>
                  <Form.Group>
                     <Form.Label className="simUploadLabel">Provider</Form.Label>
                     <Form.Control
                        as="select"
                        value={provider}
                        disabled={uploading}
                        onChange={(e) => {
                           setProvider(e.target.value);
                           setRejection(null);
                        }}
                     >
                        <option value="">Select provider</option>
                        {CONSTANTS_STATUS.simProvider.map((simProvider) => (
                           <option key={simProvider} value={simProvider}>
                              {simProvider}
                           </option>
                        ))}
                     </Form.Control>
                  </Form.Group>
                  <Form.Group>
                     <Form.Label className="simUploadLabel">File</Form.Label>
                     <Form.Control
                        key={fileInputKey}
                        type="file"
                        accept=".csv"
                        disabled={uploading}
                        onChange={(e) => {
                           setFile(e.target.files[0] || null);
                           setRejection(null);
                        }}
                     />
                  </Form.Group>
                  <Text
                     size="xSmall"
                     color="secondryColor"
                     text="Only .csv files are accepted. Upload the file exactly as downloaded from the vendor portal; opening and saving it in Excel can shorten ICCIDs. SIMs are matched by ICCID: new ones are added and known ones get their status updated. Nothing is deleted and camera links are not changed. If any row has an error, nothing from the file is saved."
                  />
                  {rejection ? (
                     <div className="simUploadRejection">
                        <div className="simUploadRejectionSummary">{rejection.summary}</div>
                        {rejection.rows.length ? (
                           <ul>
                              {rejection.rows.map((row) => (
                                 <li key={row}>{row}</li>
                              ))}
                           </ul>
                        ) : null}
                     </div>
                  ) : null}
                  <div className="d-flex justify-content-end mt-4">
                     <Buttons
                        name="Cancel"
                        varient="secondary"
                        size="Small"
                        color="black"
                        type="button"
                        className="mr-2"
                        disabled={uploading}
                        onClick={handleClose}
                     />
                     <Buttons
                        name={
                           uploading ? (
                              <>
                                 <Spinner animation="border" size="sm" className="mr-2" />
                                 Uploading...
                              </>
                           ) : (
                              "Upload"
                           )
                        }
                        varient="primary"
                        size="Small"
                        color="white"
                        type="button"
                        disabled={uploading}
                        onClick={handleUpload}
                     />
                  </div>
               </>
            ) : (
               <>
                  <Text
                     size="Small"
                     color="secondryColor"
                     text={`${result.fileName} (${result.provider}) - upload #${result.uploadBatchId}`}
                  />
                  <Row className="my-3">
                     <ResultCount label="Rows" value={result.totalRows} />
                     <ResultCount label="Added" value={result.inserted} color="#40C52B" />
                     <ResultCount label="Updated" value={result.updated} color="#1AC8FF" />
                     <ResultCount label="Unchanged" value={result.unchanged} />
                  </Row>
                  <div className="d-flex justify-content-end mt-4">
                     <Buttons
                        name="Upload another file"
                        varient="secondary"
                        size="Small"
                        color="black"
                        type="button"
                        className="mr-2"
                        onClick={reset}
                     />
                     <Buttons name="Close" varient="primary" size="Small" color="white" type="button" onClick={handleClose} />
                  </div>
               </>
            )}
         </Modal.Body>
      </Modal>
   );
};

export default SimUploadModal;
