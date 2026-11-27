/** @format */

import React, { useEffect, useRef, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';

import { searchTransferUser } from '../../../../common/redux/actions';
import { getErrorMessage, isUnavailableUser, plural } from './transferUtils';

const MIN_CHARS = 3;
const DEBOUNCE_MS = 300;

const selectedLabel = (user) =>
   user ? [user.name, user.mobile, `ID ${user.userId}`].filter(Boolean).join(' · ') : '';

/**
 * Autocomplete over API 1 (searchTransferUser).
 * - Searches after MIN_CHARS characters, debounced by DEBOUNCE_MS.
 * - With `disableInactive`, blocked / inactive users are listed but can't be picked.
 * - Typing over a selected user clears the selection (onClear), so the parent can reset what depends on it.
 */
const OwnerSearch = ({
   id,
   placeholder = 'Search by name / mobile / user id ...',
   selected,
   onSelect,
   onClear,
   disableInactive = false,
   disabled = false,
   size,
}) => {
   const [text, setText] = useState(selectedLabel(selected));
   const [isTyping, setIsTyping] = useState(false);
   const [results, setResults] = useState([]);
   const [loading, setLoading] = useState(false);
   const [searchError, setSearchError] = useState('');
   const [open, setOpen] = useState(false);

   const requestSeq = useRef(0);
   const clearedByTyping = useRef(false);
   const wrapperRef = useRef(null);

   // Keep the input in sync with the selection. A selection cleared because the admin started
   // typing must not wipe what they typed.
   useEffect(() => {
      if (selected) {
         setText(selectedLabel(selected));
         setIsTyping(false);
      } else if (!clearedByTyping.current) {
         setText('');
         setIsTyping(false);
      }
      clearedByTyping.current = false;
   }, [selected]);

   // Debounced search. requestSeq drops responses that arrive after a newer request (or unmount).
   useEffect(() => {
      if (!isTyping) return undefined;
      const term = text.trim();
      if (term.length < MIN_CHARS) {
         requestSeq.current += 1;
         setResults([]);
         setLoading(false);
         setSearchError('');
         return undefined;
      }
      const seq = ++requestSeq.current;
      setLoading(true);
      const timer = setTimeout(async () => {
         const response = await searchTransferUser({ search: term });
         if (seq !== requestSeq.current) return;
         setLoading(false);
         if (response?.status === 200) {
            setResults(response?.data?.resourceData || []);
            setSearchError('');
         } else {
            setResults([]);
            setSearchError(getErrorMessage(response, 'Could not search users. Please try again.'));
         }
      }, DEBOUNCE_MS);
      return () => clearTimeout(timer);
   }, [text, isTyping]);

   useEffect(() => () => {
      requestSeq.current += 1;
   }, []);

   // Close the dropdown on an outside click.
   useEffect(() => {
      const handleOutside = (event) => {
         if (wrapperRef.current && !wrapperRef.current.contains(event.target)) setOpen(false);
      };
      document.addEventListener('mousedown', handleOutside);
      return () => document.removeEventListener('mousedown', handleOutside);
   }, []);

   const handleChange = (event) => {
      setText(event.target.value);
      setIsTyping(true);
      setOpen(true);
      if (selected && onClear) {
         clearedByTyping.current = true;
         onClear();
      }
   };

   const handlePick = (user) => {
      if (disableInactive && isUnavailableUser(user)) return;
      setOpen(false);
      setResults([]);
      setIsTyping(false);
      onSelect(user);
   };

   const handleClear = () => {
      requestSeq.current += 1;
      setText('');
      setResults([]);
      setIsTyping(false);
      setOpen(false);
      setSearchError('');
      if (selected && onClear) onClear();
   };

   const term = text.trim();
   const showDropdown = open && isTyping && term.length > 0;

   const renderDropdownBody = () => {
      if (term.length < MIN_CHARS) {
         return <div className="owner-search__hint">Type at least {MIN_CHARS} characters</div>;
      }
      if (loading) {
         return (
            <div className="owner-search__hint">
               <Spinner animation="border" size="sm" className="mr-2" /> Searching...
            </div>
         );
      }
      if (searchError) return <div className="owner-search__hint text-danger">{searchError}</div>;
      if (!results.length) return <div className="owner-search__hint">No users found</div>;
      return results.map((user) => {
         const unavailable = isUnavailableUser(user);
         const notSelectable = disableInactive && unavailable;
         return (
            <div
               key={user.userId}
               role="option"
               aria-selected={false}
               aria-disabled={notSelectable}
               className={`owner-search__item ${notSelectable ? 'owner-search__item--disabled' : ''}`}
               onMouseDown={(event) => event.preventDefault()}
               onClick={() => handlePick(user)}
            >
               <div className="owner-search__item-title">
                  <span>{selectedLabel(user)}</span>
                  {user.isBlocked === true && <span className="tagDangerous defaultTag ml-2">Blocked</span>}
                  {user.isActive === false && <span className="tagAlert defaultTag ml-2">Inactive</span>}
               </div>
               <div className="owner-search__item-meta">
                  {user.role || '-'} · {user.corporateName || 'No corporate'} ·{' '}
                  {plural(user.propertyCount ?? 0, 'property', 'properties')}
               </div>
            </div>
         );
      });
   };

   return (
      <div className="owner-search" ref={wrapperRef}>
         <div className="owner-search__input">
            <Form.Control
               id={id}
               type="text"
               size={size}
               autoComplete="off"
               placeholder={placeholder}
               value={text}
               disabled={disabled}
               onChange={handleChange}
               onFocus={() => isTyping && setOpen(true)}
            />
            {(text || selected) && !disabled ? (
               <button type="button" className="owner-search__clear" aria-label="Clear" onClick={handleClear}>
                  ×
               </button>
            ) : null}
         </div>
         {showDropdown ? (
            <div className="owner-search__dropdown" role="listbox">
               {renderDropdownBody()}
            </div>
         ) : null}
      </div>
   );
};

export default OwnerSearch;
