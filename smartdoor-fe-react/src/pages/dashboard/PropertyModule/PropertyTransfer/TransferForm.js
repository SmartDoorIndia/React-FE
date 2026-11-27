/** @format */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Buttons from '../../../../shared/Buttons/Buttons';
import Text from '../../../../shared/Text/Text';
import DataTableComponent from '../../../../shared/DataTable/DataTable';
import { ToolTip, handleStatusElement } from '../../../../common/helpers/Utils';
import { getPropertiesForTransfer, transferProperty } from '../../../../common/redux/actions';
import OwnerSearch from './OwnerSearch';
import OwnerCard from './OwnerCard';
import TransferConfirmModal from './TransferConfirmModal';
import {
   MESSAGES,
   REMARKS_MAX_LENGTH,
   TRANSFER_LIMIT,
   formatDateIST,
   formatTransferRef,
   getErrorMessage,
   historyUrl,
   isUnavailableUser,
   plural,
   propertyAddress,
   propertyDetailsUrl,
} from './transferUtils';

const TransferSuccessToast = ({ count, transferRef, onView }) => (
   <div>
      <div>{plural(count, 'property', 'properties')} transferred successfully</div>
      {transferRef ? (
         <button type="button" className="btn btn-link p-0 transfer-toast__link" onClick={onView}>
            View transfer {formatTransferRef(transferRef)} in history
         </button>
      ) : null}
   </div>
);

const coOwnerTooltip = (row) =>
   [
      row.newOwnerIsCoOwner ? 'New owner is a co-owner of this property. Their co-owner access will be removed.' : null,
      row.newOwnerIsContactLead ? 'New owner is the contact lead of this property. The contact lead will be cleared.' : null,
   ]
      .filter(Boolean)
      .join(' ');

const isSuccess = (response) =>
   response?.status === 200 && (response?.data?.status === undefined || Number(response?.data?.status) === 200);

const TransferForm = () => {
   const history = useHistory();

   const [currentOwner, setCurrentOwner] = useState(null);
   const [newOwner, setNewOwner] = useState(null);
   const [newOwnerError, setNewOwnerError] = useState('');

   const [properties, setProperties] = useState([]);
   const [propertiesLoading, setPropertiesLoading] = useState(false);
   const [propertiesError, setPropertiesError] = useState('');

   const [selectedIds, setSelectedIds] = useState([]);
   const [selectionWarning, setSelectionWarning] = useState('');
   const [remarks, setRemarks] = useState('');

   const [showConfirm, setShowConfirm] = useState(false);
   const [submitting, setSubmitting] = useState(false);
   const [transferError, setTransferError] = useState('');

   const loadSeq = useRef(0);
   const mounted = useRef(true);

   useEffect(
      () => () => {
         mounted.current = false;
         loadSeq.current += 1;
      },
      []
   );

   // API 2. A newer call (or unmount) makes an older response stale; stale responses are dropped.
   const loadProperties = useCallback(async (ownerId, newOwnerId) => {
      const seq = ++loadSeq.current;
      setPropertiesLoading(true);
      setPropertiesError('');
      const response = await getPropertiesForTransfer({ userId: ownerId, newOwnerId });
      if (seq !== loadSeq.current) return;
      setPropertiesLoading(false);
      if (isSuccess(response)) {
         const rows = response?.data?.resourceData || [];
         setProperties(rows);
         // Keep only the selections that are still transferable.
         const available = new Set(rows.map((row) => row.propertyId));
         setSelectedIds((prev) => prev.filter((id) => available.has(id)));
      } else {
         setProperties([]);
         setSelectedIds([]);
         setPropertiesError(getErrorMessage(response, 'Could not load properties. Please try again.'));
      }
   }, []);

   // ---------- Step 1: current owner ----------
   const resetDependentState = () => {
      loadSeq.current += 1;
      setPropertiesLoading(false);
      setProperties([]);
      setPropertiesError('');
      setSelectedIds([]);
      setSelectionWarning('');
      setNewOwner(null);
      setNewOwnerError('');
      setRemarks('');
      setTransferError('');
   };

   const handleCurrentOwnerSelect = (user) => {
      if (currentOwner && currentOwner.userId === user.userId) return;
      resetDependentState();
      setCurrentOwner(user);
      loadProperties(user.userId);
   };

   const handleCurrentOwnerClear = () => {
      resetDependentState();
      setCurrentOwner(null);
   };

   // ---------- Step 3: new owner ----------
   const handleNewOwnerSelect = (user) => {
      if (currentOwner && user.userId === currentOwner.userId) {
         setNewOwnerError(MESSAGES.sameOwner);
         return;
      }
      if (isUnavailableUser(user)) {
         setNewOwnerError('New owner account is blocked or inactive.');
         return;
      }
      setNewOwnerError('');
      setNewOwner(user);
      // Reload so each row gets newOwnerIsCoOwner / newOwnerIsContactLead.
      if (currentOwner) loadProperties(currentOwner.userId, user.userId);
   };

   const handleNewOwnerClear = () => {
      setNewOwner(null);
      setNewOwnerError('');
      if (currentOwner) loadProperties(currentOwner.userId);
   };

   // ---------- Step 2: selection ----------
   const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
   const allSelected = properties.length > 0 && selectedIds.length === properties.length;

   const toggleRow = (propertyId) => {
      if (selectedSet.has(propertyId)) {
         setSelectedIds((prev) => prev.filter((id) => id !== propertyId));
         setSelectionWarning('');
         return;
      }
      if (selectedIds.length >= TRANSFER_LIMIT) {
         setSelectionWarning(MESSAGES.limit);
         return;
      }
      setSelectionWarning('');
      setSelectedIds((prev) => [...prev, propertyId]);
   };

   const toggleAll = () => {
      if (allSelected) {
         setSelectedIds([]);
         setSelectionWarning('');
         return;
      }
      if (properties.length > TRANSFER_LIMIT) {
         setSelectionWarning(MESSAGES.limit);
         return;
      }
      setSelectionWarning('');
      setSelectedIds(properties.map((row) => row.propertyId));
   };

   const selectedRows = useMemo(
      () => properties.filter((row) => selectedSet.has(row.propertyId)),
      [properties, selectedSet]
   );
   const coOwnerCount = newOwner ? selectedRows.filter((row) => row.newOwnerIsCoOwner).length : 0;
   const contactLeadCount = newOwner ? selectedRows.filter((row) => row.newOwnerIsContactLead).length : 0;
   const anyFlagged = !!newOwner && properties.some((row) => row.newOwnerIsCoOwner || row.newOwnerIsContactLead);

   const differentCorporate =
      !!currentOwner && !!newOwner && (currentOwner.corporateId ?? null) !== (newOwner.corporateId ?? null);

   const canTransfer =
      !!currentOwner &&
      !!newOwner &&
      selectedIds.length > 0 &&
      selectedIds.length <= TRANSFER_LIMIT &&
      remarks.length <= REMARKS_MAX_LENGTH &&
      !propertiesLoading &&
      !submitting;

   // ---------- Step 4: transfer ----------
   const handleConfirm = async () => {
      if (!canTransfer) return;
      const fromUserId = currentOwner.userId;
      const toUserId = newOwner.userId;
      const count = selectedIds.length;

      setSubmitting(true);
      setTransferError('');
      const response = await transferProperty({
         fromUserId,
         toUserId,
         propertyIds: selectedIds,
         remarks: remarks.trim() || null,
      });
      if (!mounted.current) return;
      setSubmitting(false);
      setShowConfirm(false);

      if (isSuccess(response)) {
         const transferRef = response?.data?.resourceData;
         toast.success(
            <TransferSuccessToast
               count={count}
               transferRef={transferRef}
               onView={() => history.push(historyUrl(transferRef))}
            />,
            { position: toast.POSITION.TOP_RIGHT, hideProgressBar: true, autoClose: 8000 }
         );
         setSelectedIds([]);
         setSelectionWarning('');
         // The moved properties disappear from the current owner's list.
         loadProperties(fromUserId, toUserId);
      } else {
         // Nothing was transferred. Keep the selection so the admin can fix the listed properties.
         setTransferError(getErrorMessage(response, 'Transfer failed. Nothing was transferred. Please try again.'));
      }
   };

   // The shared DataTable centers every header, so every column centers its cells too (center: true),
   // same as the other admin property lists.
   const columns = [
      {
         name: '',
         width: '56px',
         center: true,
         cell: ({ propertyId }) => (
            <input
               type="checkbox"
               className="transfer-table__check"
               aria-label={`Select property ${propertyId}`}
               checked={selectedSet.has(propertyId)}
               onChange={() => toggleRow(propertyId)}
            />
         ),
      },
      {
         name: 'ID',
         selector: (row) => row.propertyId,
         sortable: true,
         center: true,
         minWidth: '80px',
         maxWidth: '90px',
         cell: ({ propertyId }) => (
            <a
               href={propertyDetailsUrl(propertyId, currentOwner?.userId)}
               target="_blank"
               rel="noopener noreferrer"
               className="transfer-link"
            >
               {propertyId}
            </a>
         ),
      },
      {
         name: 'Property',
         selector: (row) => propertyAddress(row),
         grow: 2,
         center: true,
         minWidth: '240px',
         wrap: true,
         // Full address, wrapped over several lines so admins can check they picked the right property.
         cell: (row) => <div className="transfer-address">{propertyAddress(row)}</div>,
      },
      {
         name: 'City',
         selector: (row) => row.city || '-',
         sortable: true,
         center: true,
         wrap: true,
         minWidth: '100px',
         maxWidth: '140px',
      },
      {
         name: 'Property type',
         selector: (row) => row.propertyType || '-',
         sortable: true,
         center: true,
         wrap: true,
         minWidth: '110px',
         maxWidth: '150px',
      },
      {
         name: 'Status',
         selector: (row) => row.status,
         sortable: true,
         center: true,
         minWidth: '150px',
         // handleStatusElement draws an empty yellow badge for a blank status, so show DRAFT / '-' instead.
         cell: ({ status, isDraft }) => {
            const label = (status && String(status).trim()) || (isDraft ? 'DRAFT' : '');
            return label ? <span className="transfer-status">{handleStatusElement(label)}</span> : <span>-</span>;
         },
      },
      {
         name: 'Smart lock',
         selector: (row) => (row.isSmartLockProperty ? 'Yes' : 'No'),
         center: true,
         maxWidth: '110px',
      },
      {
         name: 'Co-owners',
         selector: (row) => row.coOwnerCount,
         sortable: true,
         center: true,
         maxWidth: '120px',
         cell: (row) => (
            <span>
               {row.coOwnerCount ?? 0}
               {newOwner && (row.newOwnerIsCoOwner || row.newOwnerIsContactLead) ? (
                  <ToolTip position="top" name={coOwnerTooltip(row)}>
                     <span className="transfer-warn ml-2" role="img" aria-label="warning">
                        ⚠
                     </span>
                  </ToolTip>
               ) : null}
            </span>
         ),
      },
      {
         name: 'Created',
         selector: (row) => row.createdDate,
         sortable: true,
         center: true,
         minWidth: '120px',
         cell: ({ createdDate }) => formatDateIST(createdDate),
      },
   ];

   return (
      <div className="property-transfer">
         {/* Step 1 */}
         <section className="transfer-step">
            <div className="transfer-step__title">① Current owner</div>
            <OwnerSearch
               id="transfer-current-owner"
               selected={currentOwner}
               onSelect={handleCurrentOwnerSelect}
               onClear={handleCurrentOwnerClear}
               disabled={submitting}
            />
            <OwnerCard
               user={currentOwner}
               propertyCount={
                  currentOwner
                     ? propertiesLoading || propertiesError
                        ? currentOwner.propertyCount
                        : properties.length
                     : null
               }
            />
         </section>

         {/* Step 2 */}
         <section className="transfer-step">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
               <div className="transfer-step__title mb-0">② Properties of current owner</div>
               {currentOwner ? (
                  <div className="d-flex align-items-center">
                     <span className="mr-3">
                        Selected: <strong>{selectedIds.length}</strong> / {properties.length}
                     </span>
                     <Buttons
                        name={allSelected ? 'Clear selection' : 'Select all'}
                        size="Small"
                        // Light brand style: the grey secondryBtn looked disabled.
                        color="buttonGray"
                        type="button"
                        disabled={!properties.length || propertiesLoading || submitting}
                        onClick={toggleAll}
                     />
                  </div>
               ) : null}
            </div>

            {!currentOwner ? (
               <Text size="Small" color="secondryColor" text="Select the current owner to see their properties." />
            ) : (
               <>
                  {selectionWarning ? (
                     <Alert variant="warning" className="mt-2 mb-2 py-2">
                        {selectionWarning}
                     </Alert>
                  ) : null}
                  {propertiesError ? (
                     <Alert variant="danger" className="mt-2 mb-2 py-2">
                        {propertiesError}
                     </Alert>
                  ) : null}
                  <div className="transfer-table mt-2">
                     <DataTableComponent
                        columns={columns}
                        data={properties}
                        keyField="propertyId"
                        progressPending={propertiesLoading}
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[10, 25, 50, 100]}
                        noDataComponent={
                           <div className="p-4">{propertiesError ? '' : MESSAGES.noProperties}</div>
                        }
                     />
                  </div>
                  {anyFlagged ? (
                     <div className="transfer-note mt-2">
                        ⚠ = the new owner is a co-owner (their co-owner access will be removed) or the contact lead
                        (it will be cleared) of this property.
                     </div>
                  ) : null}
               </>
            )}
         </section>

         {/* Step 3 */}
         <section className="transfer-step">
            <div className="transfer-step__title">③ New owner</div>
            <OwnerSearch
               id="transfer-new-owner"
               selected={newOwner}
               onSelect={handleNewOwnerSelect}
               onClear={handleNewOwnerClear}
               disableInactive
               disabled={!currentOwner || submitting}
               placeholder={
                  currentOwner ? 'Search by name / mobile / user id ...' : 'Select the current owner first'
               }
            />
            {newOwnerError ? <div className="transfer-error mt-1">{newOwnerError}</div> : null}
            <OwnerCard user={newOwner} />
            {differentCorporate ? (
               <Alert variant="info" className="mt-2 mb-0 py-2">
                  {MESSAGES.differentCorporate}
               </Alert>
            ) : null}
         </section>

         {/* Step 4 */}
         <section className="transfer-step">
            <div className="transfer-step__title">④ Remarks</div>
            <Form.Control
               as="textarea"
               rows={2}
               maxLength={REMARKS_MAX_LENGTH}
               placeholder="e.g. Ticket #123 – owner sold flat to new owner"
               value={remarks}
               disabled={!currentOwner || submitting}
               onChange={(event) => setRemarks(event.target.value)}
            />
            <div className="d-flex justify-content-between align-items-center mt-1">
               <span className="transfer-note">Optional</span>
               <span className="transfer-note">
                  {remarks.length} / {REMARKS_MAX_LENGTH}
               </span>
            </div>

            {transferError ? (
               <Alert variant="danger" className="mt-3 mb-0" dismissible onClose={() => setTransferError('')}>
                  {transferError}
               </Alert>
            ) : null}

            <div className="d-flex justify-content-end mt-3">
               <Buttons
                  name="Transfer properties"
                  varient="primary"
                  size="Small"
                  color="white"
                  type="button"
                  disabled={!canTransfer}
                  onClick={() => setShowConfirm(true)}
               />
            </div>
         </section>

         <TransferConfirmModal
            show={showConfirm}
            submitting={submitting}
            count={selectedIds.length}
            fromUser={currentOwner}
            toUser={newOwner}
            coOwnerCount={coOwnerCount}
            contactLeadCount={contactLeadCount}
            onCancel={() => setShowConfirm(false)}
            onConfirm={handleConfirm}
         />
      </div>
   );
};

export default TransferForm;
