/** @format */

import React, { useEffect, useRef, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import CONSTANTS_STATUS from "../../../common/helpers/ConstantsStatus";
import { showErrorToast, showSuccessToast } from "../../../common/helpers/Utils";
import { getCameraDevice, replaceSim } from "../../../common/redux/actions";
import Text from "../../../shared/Text/Text";
import Buttons from "../../../shared/Buttons/Buttons";
import SimPicker from "./SimPicker";
import "./SimModals.scss";

/**
 * Runs before a Smart Door property is approved: every 4G / PIR camera of the property needs a SIM.
 * When they all have one, onApprove is called straight away; otherwise the admin attaches the
 * missing SIMs here (provider, then SIM) and approves from this modal. propertyId null = closed.
 */
const SimApprovalCheckModal = ({ propertyId, onCancel, onApprove }) => {
   const [checking, setChecking] = useState(false);
   const [cameras, setCameras] = useState([]);
   // { [cameraDeviceId]: { provider, sim } } for cameras still without a SIM
   const [picks, setPicks] = useState({});
   const [attachingId, setAttachingId] = useState(null);
   // the parent passes new callbacks on every render; reading them through a ref keeps the
   // camera check from re-running each time
   const callbacks = useRef();
   callbacks.current = { onCancel, onApprove };

   useEffect(() => {
      if (!propertyId) return undefined;
      let ignore = false;
      setChecking(true);
      setCameras([]);
      setPicks({});
      getCameraDevice({ propertyid: propertyId }).then((response) => {
         if (ignore) return;
         setChecking(false);
         // 404 means the property has no cameras, so there is nothing to check
         if (response?.status !== 200 && response?.status !== 404) {
            showErrorToast(response?.data?.message || "Could not check the property's cameras, please try again.");
            callbacks.current.onCancel();
            return;
         }
         const simCameras = (response.status === 200 ? response.data?.resourceData || [] : []).filter(
            (camera) => CONSTANTS_STATUS.simCameraTypes.includes(camera.type) && !camera.deleted
         );
         if (simCameras.every((camera) => camera.simCardId)) {
            callbacks.current.onApprove();
            return;
         }
         setCameras(simCameras);
      });
      return () => {
         ignore = true;
      };
   }, [propertyId]);

   const setPick = (cameraDeviceId, pick) =>
      setPicks((current) => ({ ...current, [cameraDeviceId]: { ...current[cameraDeviceId], ...pick } }));

   const handleAttach = async (camera) => {
      const sim = picks[camera.cameraDeviceId]?.sim;
      setAttachingId(camera.cameraDeviceId);
      const response = await replaceSim({
         cameraDeviceId: camera.cameraDeviceId,
         oldSimCardId: null,
         newSimCardId: sim.simCardId,
         remarks: "Attached at property approval",
      });
      setAttachingId(null);
      if (response?.status === 200) {
         showSuccessToast(`SIM attached to camera #${camera.cameraDeviceId}`);
         setCameras((current) =>
            current.map((item) =>
               item.cameraDeviceId === camera.cameraDeviceId
                  ? { ...item, simCardId: sim.simCardId, iccid: sim.iccid, simProvider: sim.provider }
                  : item
            )
         );
      } else {
         showErrorToast(response?.data?.message || "Could not attach the SIM, please try again.");
      }
   };

   const handleClose = () => {
      if (!attachingId) onCancel();
   };

   const camerasWithSim = cameras.filter((camera) => camera.simCardId).length;
   // a SIM picked or attached for one camera must not be offered for another
   const usedSimCardIds = [
      ...cameras.map((camera) => camera.simCardId),
      ...Object.values(picks).map((pick) => pick.sim?.simCardId),
   ].filter(Boolean);

   return (
      <Modal show={Boolean(propertyId)} onHide={handleClose} centered size="lg" backdrop="static">
         <Modal.Header closeButton={!attachingId}>
            <Modal.Title style={{ fontSize: "18px", fontWeight: 600 }}>
               {checking ? "Checking camera SIMs" : "Attach SIMs before approval"}
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {checking ? (
               <div className="simApprovalChecking">
                  <Spinner animation="border" variant="danger" />
                  <Text size="Small" color="secondryColor" text="Checking the property's 4G / PIR cameras..." />
               </div>
            ) : (
               <>
                  <Text
                     size="Small"
                     color="secondryColor"
                     className="d-block mb-3"
                     text="Every 4G / PIR camera of a Smart Door property needs a SIM before the property can be approved. Pick a provider, then a SIM, for each camera below."
                  />
                  {cameras.map((camera) => {
                     const pick = picks[camera.cameraDeviceId] || {};
                     const isAttaching = attachingId === camera.cameraDeviceId;
                     return (
                        <div className="simApprovalRow" key={camera.cameraDeviceId}>
                           <div className="simApprovalCamera">
                              <span className="simApprovalCameraId">{`Camera #${camera.cameraDeviceId}`}</span>
                              <span>{`${camera.uuId || "-"} - ${camera.type}`}</span>
                           </div>
                           {camera.simCardId ? (
                              <div className="simApprovalAttached">{`SIM ${camera.iccid} (${camera.simProvider})`}</div>
                           ) : (
                              <div className="simApprovalPick">
                                 <SimPicker
                                    provider={pick.provider || ""}
                                    onProviderChange={(provider) => setPick(camera.cameraDeviceId, { provider })}
                                    sim={pick.sim || null}
                                    onSimChange={(sim) => setPick(camera.cameraDeviceId, { sim })}
                                    disabled={Boolean(attachingId)}
                                    excludeSimCardIds={usedSimCardIds.filter((id) => id !== pick.sim?.simCardId)}
                                 />
                                 <Buttons
                                    name={
                                       isAttaching ? (
                                          <>
                                             <Spinner animation="border" size="sm" className="mr-2" />
                                             Attaching...
                                          </>
                                       ) : (
                                          "Attach"
                                       )
                                    }
                                    varient="primary"
                                    size="Small"
                                    color="white"
                                    type="button"
                                    disabled={Boolean(attachingId) || !pick.sim}
                                    onClick={() => handleAttach(camera)}
                                 />
                              </div>
                           )}
                        </div>
                     );
                  })}
                  <div className="d-flex justify-content-between align-items-center mt-4">
                     <Text
                        size="Small"
                        fontWeight="bold"
                        color="secondryColor"
                        text={`${camerasWithSim} of ${cameras.length} cameras have a SIM`}
                     />
                     <div className="d-flex">
                        <Buttons
                           name="Cancel"
                           varient="secondary"
                           size="Small"
                           color="black"
                           type="button"
                           className="mr-2"
                           disabled={Boolean(attachingId)}
                           onClick={handleClose}
                        />
                        <Buttons
                           name="Approve"
                           varient="primary"
                           size="Small"
                           color="white"
                           type="button"
                           disabled={Boolean(attachingId) || camerasWithSim < cameras.length}
                           onClick={() => onApprove()}
                        />
                     </div>
                  </div>
               </>
            )}
         </Modal.Body>
      </Modal>
   );
};

export default SimApprovalCheckModal;
