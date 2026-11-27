/** @format */

import React from 'react';

import { plural } from './transferUtils';

// Owner detail card shown under the current-owner and new-owner pickers.
const OwnerCard = ({ user, propertyCount }) => {
   if (!user) return null;
   return (
      <div className="owner-card">
         <div className="owner-card__title">
            {[user.name || '-', user.mobile || '-', `ID ${user.userId}`].join(' · ')}
            {user.isBlocked === true && <span className="tagDangerous defaultTag ml-2">Blocked</span>}
            {user.isActive === false && <span className="tagAlert defaultTag ml-2">Inactive</span>}
         </div>
         <div className="owner-card__meta">
            Role: {user.role || '-'} · Corporate: {user.corporateName || '—'}
            {propertyCount !== undefined && propertyCount !== null
               ? ` · ${plural(propertyCount, 'property', 'properties')}`
               : ''}
         </div>
         {user.email ? <div className="owner-card__meta">{user.email}</div> : null}
      </div>
   );
};

export default OwnerCard;
