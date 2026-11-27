/** @format */

import React from 'react';

import { ToolTip } from '../../../../common/helpers/Utils';
import { formatDateIST, formatTimeIST, formatTransferRef, propertyDetailsUrl, userLabel } from './transferUtils';

const UserCell = ({ user }) =>
   user ? (
      <div className="transfer-history__user">
         <div>{userLabel(user)}</div>
         {user.mobile ? <div className="transfer-history__sub">{user.mobile}</div> : null}
      </div>
   ) : (
      '-'
   );

export const TransferBadges = ({ row }) => (
   <>
      {row.coOwnerRemoved ? <span className="tagAlert defaultTag mr-1">Co-owner removed</span> : null}
      {row.contactLeadCleared ? <span className="tagInfo defaultTag mr-1">Contact lead cleared</span> : null}
   </>
);

/**
 * Columns for transfer-history rows (API 4 and API 5 share the row shape).
 * showProperty: add the Property column (the per-property view doesn't need it).
 * onRefClick: called with the transferRef when the ref is clicked.
 */
export const buildHistoryColumns = ({ showProperty, onRefClick }) => {
   const columns = [
      {
         name: 'Date (IST)',
         selector: (row) => row.createdDate,
         center: true,
         // The shared DataTable pins the first column to 65px; PropertyTransfer.scss widens it for
         // these tables so the date fits.
         minWidth: '130px',
         maxWidth: '150px',
         cell: ({ createdDate }) => (
            <div className="transfer-history__date">
               <div>{formatDateIST(createdDate)}</div>
               <div className="transfer-history__sub">{formatTimeIST(createdDate)}</div>
            </div>
         ),
      },
   ];

   if (showProperty) {
      columns.push({
         name: 'Property ID',
         selector: (row) => row.propertyId,
         center: true,
         minWidth: '100px',
         maxWidth: '130px',
         // ID only (opens the property in a new tab); no address in the history list.
         cell: ({ propertyId, toUser }) => (
            <a
               href={propertyDetailsUrl(propertyId, toUser?.userId)}
               target="_blank"
               rel="noopener noreferrer"
               className="transfer-link"
            >
               {propertyId}
            </a>
         ),
      });
   }

   columns.push(
      {
         name: 'From',
         selector: (row) => row.fromUser?.name,
         center: true,
         minWidth: '160px',
         cell: ({ fromUser }) => <UserCell user={fromUser} />,
      },
      {
         name: 'To',
         selector: (row) => row.toUser?.name,
         center: true,
         minWidth: '160px',
         cell: ({ toUser }) => <UserCell user={toUser} />,
      },
      {
         name: 'Done by',
         selector: (row) => row.performedBy?.name,
         center: true,
         minWidth: '140px',
         cell: ({ performedBy }) => <UserCell user={performedBy} />,
      },
      {
         name: 'Remarks',
         selector: (row) => row.remarks,
         center: true,
         minWidth: '220px',
         cell: (row) => (
            <div className="transfer-history__remarks">
               {row.remarks ? (
                  <ToolTip position="top" name={row.remarks}>
                     <div className="elipsis-text">{row.remarks}</div>
                  </ToolTip>
               ) : (
                  <div>-</div>
               )}
               <div className="mt-1">
                  <TransferBadges row={row} />
               </div>
            </div>
         ),
      },
      {
         name: (
            <ToolTip
               position="top"
               name="Each transfer gets one number, shared by every property moved in it. Click a number to see all properties in that transfer."
            >
               <span>Transfer no. ⓘ</span>
            </ToolTip>
         ),
         selector: (row) => row.transferRef,
         center: true,
         minWidth: '130px',
         cell: ({ transferRef }) =>
            transferRef ? (
               <ToolTip position="top" name="See all properties moved in this transfer">
                  <button
                     type="button"
                     className="btn btn-link p-0 transfer-link transfer-no"
                     onClick={() => onRefClick(transferRef)}
                  >
                     {formatTransferRef(transferRef)}
                  </button>
               </ToolTip>
            ) : (
               '-'
            ),
      }
   );

   return columns;
};
