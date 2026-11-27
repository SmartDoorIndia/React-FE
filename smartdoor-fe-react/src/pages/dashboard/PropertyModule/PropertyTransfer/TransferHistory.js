/** @format */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Col, Form, Row } from 'react-bootstrap';

import Buttons from '../../../../shared/Buttons/Buttons';
import DataTableComponent from '../../../../shared/DataTable/DataTable';
import Pagination from '../../../../shared/DataTable/Pagination';
import { getPropertyTransfers } from '../../../../common/redux/actions';
import OwnerSearch from './OwnerSearch';
import { buildHistoryColumns } from './historyColumns';
import {
   formatDateIST,
   formatTimeIST,
   formatTransferRef,
   getErrorMessage,
   normalizeTransferRef,
   userLabel,
} from './transferUtils';

const PER_PAGE_OPTIONS = [10, 25, 50];
const EMPTY_FILTERS = { user: null, propertyId: '', transferRef: '', fromDate: '', toDate: '' };

// API 5 body; empty filters are sent as null.
const toRequestBody = (filters) => ({
   userId: filters.user ? filters.user.userId : null,
   propertyId: filters.propertyId ? Number(filters.propertyId) : null,
   transferRef: normalizeTransferRef(filters.transferRef) || null,
   fromDate: filters.fromDate || null,
   toDate: filters.toDate || null,
});

/**
 * Transfer history list (API 5) with filters and server-side pagination.
 * initialTransferRef / refreshKey come from the URL (?tab=history&transferRef=...), so the
 * success toast link opens the history filtered by that batch.
 */
const TransferHistory = ({ initialTransferRef = '', refreshKey }) => {
   const [form, setForm] = useState({ ...EMPTY_FILTERS, transferRef: initialTransferRef });
   const [applied, setApplied] = useState({ ...EMPTY_FILTERS, transferRef: initialTransferRef });
   const [page, setPage] = useState(1);
   const [perPage, setPerPage] = useState(10);
   const [reloadToken, setReloadToken] = useState(0);

   const [rows, setRows] = useState([]);
   const [total, setTotal] = useState(0);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const [filterError, setFilterError] = useState('');

   const requestSeq = useRef(0);
   const firstRun = useRef(true);

   // A new link (toast "View in transfer history") replaces the filters with that batch.
   useEffect(() => {
      if (firstRun.current) {
         firstRun.current = false;
         return;
      }
      const next = { ...EMPTY_FILTERS, transferRef: initialTransferRef || '' };
      setForm(next);
      setApplied(next);
      setPage(1);
      setFilterError('');
      setReloadToken((token) => token + 1);
   }, [initialTransferRef, refreshKey]);

   const requestKey = useMemo(() => JSON.stringify(toRequestBody(applied)), [applied]);

   useEffect(() => {
      const seq = ++requestSeq.current;
      const load = async () => {
         setLoading(true);
         setError('');
         const response = await getPropertyTransfers({
            records: perPage,
            pageNumber: page,
            ...JSON.parse(requestKey),
         });
         if (seq !== requestSeq.current) return;
         setLoading(false);
         if (response?.status === 200) {
            setRows(response?.data?.resourceData || []);
            setTotal(Number(response?.data?.records) || 0);
         } else {
            setRows([]);
            setTotal(0);
            setError(getErrorMessage(response, 'Could not load transfer history. Please try again.'));
         }
      };
      load();
   }, [requestKey, page, perPage, reloadToken]);

   useEffect(
      () => () => {
         requestSeq.current += 1;
      },
      []
   );

   const updateForm = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

   const handleSearch = () => {
      if (form.propertyId && !/^\d+$/.test(String(form.propertyId).trim())) {
         setFilterError('Property ID must be a number.');
         return;
      }
      if (form.fromDate && form.toDate && form.fromDate > form.toDate) {
         setFilterError('From date must be on or before To date.');
         return;
      }
      setFilterError('');
      // Show the number as it will be searched (e.g. "12" -> "PT-000012").
      const normalized = { ...form, propertyId: String(form.propertyId).trim(), transferRef: normalizeTransferRef(form.transferRef) };
      setForm(normalized);
      setApplied(normalized);
      setPage(1);
      setReloadToken((token) => token + 1);
   };

   const handleReset = () => {
      setForm(EMPTY_FILTERS);
      setApplied(EMPTY_FILTERS);
      setFilterError('');
      setPage(1);
      setReloadToken((token) => token + 1);
   };

   // Clicking a ref shows the whole batch, so the other filters are dropped.
   const filterByRef = (transferRef) => {
      const next = { ...EMPTY_FILTERS, transferRef };
      setForm(next);
      setApplied(next);
      setFilterError('');
      setPage(1);
   };

   const columns = buildHistoryColumns({ showProperty: true, onRefClick: filterByRef });

   // When the list is filtered to one transfer batch, say so above the table. Without this, clicking
   // a ref while every visible row is already from that batch looks like nothing happened.
   const batchRef = (applied.transferRef || '').trim();
   const batchRow = batchRef && rows.length ? rows[0] : null;
   const batchSummary = () => {
      if (loading) return 'Loading…';
      if (!total) return 'No transfers found with this reference.';
      const count = `${total} ${total === 1 ? 'property' : 'properties'} moved together`;
      if (!batchRow) return `${count}.`;
      return `${count} on ${formatDateIST(batchRow.createdDate)}, ${formatTimeIST(batchRow.createdDate)}, from ${userLabel(
         batchRow.fromUser
      )} to ${userLabel(batchRow.toUser)}.`;
   };

   const PaginationComponent = (props) => (
      <Pagination
         {...props}
         rowCount={total}
         rowsPerPage={perPage}
         currentPage={page}
         onChangePage={(nextPage) => setPage(nextPage)}
         onChangeRowsPerPage={(nextPerPage) => {
            setPerPage(nextPerPage);
            setPage(1);
         }}
         paginationRowsPerPageOptions={PER_PAGE_OPTIONS}
      />
   );

   return (
      <div className="transfer-history">
         <div className="transfer-step">
            <Row className="align-items-end">
               <Col lg={3} md={6} className="mb-2">
                  <Form.Label className="transfer-history__label">User (from or to)</Form.Label>
                  <OwnerSearch
                     id="transfer-history-user"
                     placeholder="Name / mobile / user id"
                     selected={form.user}
                     onSelect={(user) => updateForm('user', user)}
                     onClear={() => updateForm('user', null)}
                  />
               </Col>
               <Col lg={2} md={6} className="mb-2">
                  <Form.Label className="transfer-history__label">Property ID</Form.Label>
                  <Form.Control
                     type="text"
                     inputMode="numeric"
                     placeholder="e.g. 6250"
                     value={form.propertyId}
                     onChange={(event) => updateForm('propertyId', event.target.value)}
                  />
               </Col>
               <Col lg={3} md={6} className="mb-2">
                  <Form.Label className="transfer-history__label">Transfer no.</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="e.g. PT-000012 or 12"
                     value={form.transferRef}
                     onChange={(event) => updateForm('transferRef', event.target.value)}
                  />
               </Col>
               <Col lg={2} md={3} sm={6} className="mb-2">
                  <Form.Label className="transfer-history__label">From date</Form.Label>
                  <Form.Control
                     type="date"
                     value={form.fromDate}
                     max={form.toDate || undefined}
                     onChange={(event) => updateForm('fromDate', event.target.value)}
                  />
               </Col>
               <Col lg={2} md={3} sm={6} className="mb-2">
                  <Form.Label className="transfer-history__label">To date</Form.Label>
                  <Form.Control
                     type="date"
                     value={form.toDate}
                     min={form.fromDate || undefined}
                     onChange={(event) => updateForm('toDate', event.target.value)}
                  />
               </Col>
            </Row>
            <div className="d-flex justify-content-end">
               <Buttons
                  name="Reset"
                  varient="secondary"
                  size="Small"
                  color="secondryBtn"
                  type="button"
                  className="mr-2"
                  onClick={handleReset}
               />
               <Buttons name="Search" varient="primary" size="Small" color="white" type="button" onClick={handleSearch} />
            </div>
            {filterError ? <div className="transfer-error mt-2">{filterError}</div> : null}
         </div>

         {error ? (
            <Alert variant="danger" className="py-2">
               {error}
            </Alert>
         ) : null}

         {batchRef ? (
            <div className="transfer-batch">
               <div className="transfer-batch__text">
                  <div>
                     <strong>Transfer</strong> <span className="transfer-batch__ref">{formatTransferRef(batchRef)}</span>
                  </div>
                  <div className="transfer-history__sub">{batchSummary()}</div>
               </div>
               <Buttons name="Show all transfers" size="Small" color="buttonGray" type="button" onClick={handleReset} />
            </div>
         ) : null}

         <div className="transfer-table">
            <DataTableComponent
               columns={columns}
               data={rows}
               keyField="propertyTransferHistoryId"
               progressPending={loading}
               paginationServer={true}
               paginationPerPage={perPage}
               paginationRowsPerPageOptions={PER_PAGE_OPTIONS}
               paginationComponent={PaginationComponent}
               currentPage={page}
               noDataComponent={<div className="p-4">{error ? '' : 'No transfers found.'}</div>}
            />
         </div>
      </div>
   );
};

export default TransferHistory;
