/** @format */

import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import DataTableComponent from '../../../../shared/DataTable/DataTable';
import { getPropertyTransferHistory } from '../../../../common/redux/actions';
import { buildHistoryColumns } from './historyColumns';
import { MESSAGES, getErrorMessage, historyUrl } from './transferUtils';
import './PropertyTransfer.scss';

// "Ownership history" section on the property detail page (API 4), newest first.
// Render it only for Admin / Super Admin (see isTransferAdmin).
const OwnershipHistory = ({ propertyId }) => {
   const history = useHistory();
   const [rows, setRows] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState('');
   const requestSeq = useRef(0);

   useEffect(() => {
      const seq = ++requestSeq.current;
      if (!propertyId) {
         setRows([]);
         setLoading(false);
         return undefined;
      }
      const load = async () => {
         setLoading(true);
         setError('');
         const response = await getPropertyTransferHistory({ propertyId });
         if (seq !== requestSeq.current) return;
         setLoading(false);
         if (response?.status === 200) {
            setRows(response?.data?.resourceData || []);
         } else {
            setRows([]);
            setError(getErrorMessage(response, 'Could not load ownership history.'));
         }
      };
      load();
      return () => {
         requestSeq.current += 1;
      };
   }, [propertyId]);

   const columns = buildHistoryColumns({
      showProperty: false,
      onRefClick: (transferRef) => history.push(historyUrl(transferRef)),
   });

   return (
      <div className="whiteBg ownership-history">
         <h6 className="font-weight-bold mb-2 px-2 pt-2">Ownership history</h6>
         {error ? <div className="transfer-error px-2 pb-2">{error}</div> : null}
         <DataTableComponent
            columns={columns}
            data={rows}
            keyField="propertyTransferHistoryId"
            progressPending={loading}
            pagination={rows.length > 10}
            paginationPerPage={10}
            noDataComponent={<div className="p-4">{error ? '' : MESSAGES.noOwnershipHistory}</div>}
         />
      </div>
   );
};

export default OwnershipHistory;
