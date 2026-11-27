/** @format */

// Shared helpers for the Property Transfer screens.

// Backend role ids (EnumUtils.RoleMaster): ADMIN = 3, SUPER_ADMIN = 16.
const TRANSFER_ROLE_IDS = [3, 16];

// Only Admin / Super Admin may use the transfer APIs. Anyone else gets a 401, and mainApiService
// logs the user out on any 401, so screens must not call these APIs for other roles.
export const isTransferAdmin = (userData) =>
   TRANSFER_ROLE_IDS.includes(Number(userData?.roleId)) || userData?.roleName === 'SUPER ADMIN';

export const TRANSFER_LIMIT = 100;
export const REMARKS_MAX_LENGTH = 500;
export const TRANSFER_ROUTE = '/admin/transfer-property';

export const MESSAGES = {
   limit: `You can transfer up to ${TRANSFER_LIMIT} properties at a time.`,
   sameOwner: 'New owner must be different from current owner.',
   noProperties: 'This user has no properties to transfer.',
   noOwnershipHistory: 'No ownership transfers for this property.',
   differentCorporate:
      "Owners belong to different corporates. Billing and plans of these properties will follow the new owner's corporate.",
};

// Dates come back as ISO strings in UTC; the admin panel always shows them in IST.
const IST_DATE = new Intl.DateTimeFormat('en-GB', {
   timeZone: 'Asia/Kolkata',
   day: '2-digit',
   month: 'short',
   year: 'numeric',
});
const IST_TIME = new Intl.DateTimeFormat('en-US', {
   timeZone: 'Asia/Kolkata',
   hour: 'numeric',
   minute: '2-digit',
   hour12: true,
});

const toDate = (value) => {
   if (!value) return null;
   const date = new Date(value);
   return Number.isNaN(date.getTime()) ? null : date;
};

// "24 Nov 2026"
export const formatDateIST = (value) => {
   const date = toDate(value);
   return date ? IST_DATE.format(date) : '-';
};

// "10:42 AM"
export const formatTimeIST = (value) => {
   const date = toDate(value);
   return date ? IST_TIME.format(date) : '';
};

// Transfer numbers come from the backend as PT-000012. Transfers made before that existed have a
// UUID reference; show a short upper-case form of it instead of the whole UUID.
const TRANSFER_NO_PATTERN = /^PT-\d+$/;
export const formatTransferRef = (ref) => {
   if (!ref) return '-';
   return TRANSFER_NO_PATTERN.test(ref) ? ref : ref.slice(0, 8).toUpperCase();
};

// Lets admins type "12", "pt12" or "PT-12" in the filter and still find PT-000012. Anything else
// (e.g. an older UUID reference) is sent as typed.
export const normalizeTransferRef = (value) => {
   const text = String(value || '').trim();
   const match = text.match(/^(?:pt[-\s]?)?0*(\d{1,9})$/i);
   return match ? `PT-${match[1].padStart(6, '0')}` : text;
};

export const plural = (count, singular, pluralWord) =>
   `${count} ${count === 1 ? singular : pluralWord || `${singular}s`}`;

// Backend errors are the Spring error body ({ message }); successes are BaseResponse.
export const getErrorMessage = (response, fallback) =>
   response?.data?.message || response?.data?.customMessage || fallback;

export const isUnavailableUser = (user) => !!user && (user.isBlocked === true || user.isActive === false);

export const userLabel = (user) => (user ? `${user.name || '-'} (${user.userId})` : '-');

const addressSegments = (part) =>
   String(part)
      .toLowerCase()
      .split(',')
      .map((segment) => segment.replace(/\s+/g, ' ').trim())
      .filter(Boolean);

// The free-text address often already repeats the tower / society name, so a part is skipped when
// a later part already has all of its comma-separated segments (whole segments, so a house number
// like "1" is not dropped just because "411045" contains it).
export const propertyAddress = (row) => {
   const parts = [row?.houseNumber, row?.towerName, row?.buildingProjectSociety, row?.address]
      .map((part) => (part == null ? '' : String(part).trim()))
      .filter(Boolean);
   const kept = parts.filter((part, i) => {
      const own = addressSegments(part);
      return !parts.some((later, j) => {
         if (j <= i) return false;
         const laterSegments = addressSegments(later);
         return own.every((segment) => laterSegments.includes(segment));
      });
   });
   return kept.join(', ') || '-';
};

// The detail page normally receives propertyId/userId through router state, which a new tab
// does not carry, so it also reads them from the query string.
export const propertyDetailsUrl = (propertyId, userId) =>
   `/admin/property/property-details?propertyId=${propertyId}${userId ? `&userId=${userId}` : ''}`;

export const historyUrl = (transferRef) =>
   `${TRANSFER_ROUTE}?tab=history${transferRef ? `&transferRef=${encodeURIComponent(transferRef)}` : ''}`;
