/** @format */

import React from 'react';
import { Modal } from 'react-bootstrap';

import Buttons from '../../../../shared/Buttons/Buttons';
import { plural, userLabel } from './transferUtils';

// Final confirmation before API 3 (transferProperty).
const TransferConfirmModal = ({
   show,
   submitting,
   count,
   fromUser,
   toUser,
   coOwnerCount,
   contactLeadCount,
   onCancel,
   onConfirm,
}) => (
   <Modal
      show={show}
      onHide={submitting ? undefined : onCancel}
      backdrop={submitting ? 'static' : true}
      keyboard={!submitting}
      centered
   >
      <Modal.Header closeButton={!submitting}>
         <Modal.Title as="h5">Confirm property transfer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
         <p className="mb-3">
            Transfer <strong>{plural(count, 'property', 'properties')}</strong> from{' '}
            <strong>{userLabel(fromUser)}</strong> to <strong>{userLabel(toUser)}</strong>?
         </p>
         <ul className="transfer-confirm__list">
            <li>The current owner will lose access to {count === 1 ? 'this property' : 'these properties'}.</li>
            {coOwnerCount > 0 && (
               <li className="transfer-confirm__warn">
                  ⚠ {plural(coOwnerCount, 'property', 'properties')}: the new owner is currently a co-owner. Their
                  co-owner access will be removed.
               </li>
            )}
            {contactLeadCount > 0 && (
               <li className="transfer-confirm__warn">
                  ⚠ {plural(contactLeadCount, 'property', 'properties')}: the new owner is the contact lead. The
                  contact lead will be cleared.
               </li>
            )}
         </ul>
      </Modal.Body>
      <Modal.Footer>
         <Buttons
            name="Cancel"
            varient="secondary"
            size="Small"
            color="secondryBtn"
            type="button"
            disabled={submitting}
            onClick={onCancel}
         />
         <Buttons
            name={submitting ? 'Transferring...' : 'Confirm transfer'}
            varient="primary"
            size="Small"
            color="white"
            type="button"
            disabled={submitting}
            onClick={onConfirm}
         />
      </Modal.Footer>
   </Modal>
);

export default TransferConfirmModal;
