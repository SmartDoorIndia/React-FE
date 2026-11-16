/** @format */

import React, { useEffect, useState } from "react";
import { Form, Modal, Spinner } from "react-bootstrap";
import { showErrorToast, showSuccessToast } from "../../../common/helpers/Utils";
import { replaceSim } from "../../../common/redux/actions";
import Text from "../../../shared/Text/Text";
import Buttons from "../../../shared/Buttons/Buttons";
import SimPicker from "./SimPicker";
import "./SimModals.scss";

// ReplaceSimRequest.remarks limit in smartlockservice
const MAX_REMARKS_LENGTH = 400;

/**
 * Puts a free SIM into a 4G / PIR camera; the camera's current SIM, if any, goes back to Ready to use.
 * camera: { cameraDeviceId, uuId, cameraType, simCardId, iccid, simProvider } - null keeps the modal closed.
 */
const ReplaceSimModal = ({ camera, onHide, onReplaced }) => {
   const [provider, setProvider] = useState("");
   const [sim, setSim] = useState(null);
   const [remarks, setRemarks] = useState("");
   const [saving, setSaving] = useState(false);

   const hasSim = Boolean(camera?.simCardId);

   // start from the current SIM's provider: a replacement usually comes from the same vendor
   useEffect(() => {
      setProvider(camera?.simProvider || "");
      setSim(null);
      setRemarks("");
   }, [camera]);

   const handleClose = () => {
      if (!saving) onHide();
   };

   const handleSave = async () => {
      if (!sim) {
         showErrorToast("Select the SIM to put in this camera.");
         return;
      }
      setSaving(true);
      const response = await replaceSim({
         cameraDeviceId: camera.cameraDeviceId,
         // the SIM this screen showed; the backend refuses if it changed in the meantime
         oldSimCardId: camera.simCardId || null,
         newSimCardId: sim.simCardId,
         remarks: remarks.trim() || null,
      });
      setSaving(false);
      if (response?.status === 200) {
         showSuccessToast(hasSim ? "SIM replaced successfully" : "SIM attached successfully");
         onReplaced();
      } else {
         showErrorToast(response?.data?.message || "Could not save the SIM, please try again.");
      }
   };

   return (
      <Modal show={Boolean(camera)} onHide={handleClose} centered backdrop="static">
         <Modal.Header closeButton={!saving}>
            <Modal.Title style={{ fontSize: "18px", fontWeight: 600 }}>
               {hasSim ? "Replace SIM" : "Attach SIM"}
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {camera ? (
               <>
                  <div className="simCameraInfo">
                     <div>
                        <span className="simInfoLabel">Camera</span>
                        {`#${camera.cameraDeviceId} (${camera.uuId || "-"}) - ${camera.cameraType || "-"}`}
                     </div>
                     <div>
                        <span className="simInfoLabel">Current SIM</span>
                        {hasSim ? `${camera.iccid} (${camera.simProvider})` : "No SIM"}
                     </div>
                  </div>

                  <Form.Label className="simModalLabel">New SIM</Form.Label>
                  <SimPicker
                     provider={provider}
                     onProviderChange={setProvider}
                     sim={sim}
                     onSimChange={setSim}
                     disabled={saving}
                  />

                  <Form.Label className="simModalLabel mt-3">Remarks (optional)</Form.Label>
                  <Form.Control
                     as="textarea"
                     rows={2}
                     maxLength={MAX_REMARKS_LENGTH}
                     value={remarks}
                     disabled={saving}
                     placeholder={hasSim ? "e.g. Old SIM damaged" : ""}
                     onChange={(e) => setRemarks(e.target.value)}
                  />
                  {hasSim ? (
                     <Text
                        size="xSmall"
                        color="secondryColor"
                        className="d-block mt-2"
                        text={`SIM ${camera.iccid} will be taken out of this camera and become Ready to use.`}
                     />
                  ) : null}

                  <div className="d-flex justify-content-end mt-4">
                     <Buttons
                        name="Cancel"
                        varient="secondary"
                        size="Small"
                        color="black"
                        type="button"
                        className="mr-2"
                        disabled={saving}
                        onClick={handleClose}
                     />
                     <Buttons
                        name={
                           saving ? (
                              <>
                                 <Spinner animation="border" size="sm" className="mr-2" />
                                 Saving...
                              </>
                           ) : hasSim ? (
                              "Replace SIM"
                           ) : (
                              "Attach SIM"
                           )
                        }
                        varient="primary"
                        size="Small"
                        color="white"
                        type="button"
                        disabled={saving || !sim}
                        onClick={handleSave}
                     />
                  </div>
               </>
            ) : null}
         </Modal.Body>
      </Modal>
   );
};

export default ReplaceSimModal;
