/** @format */

import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import Text from '../../../../shared/Text/Text';
import { getLocalStorage } from '../../../../common/helpers/Utils';
import TransferForm from './TransferForm';
import TransferHistory from './TransferHistory';
import { isTransferAdmin } from './transferUtils';
import './PropertyTransfer.scss';

const readTab = (search) => (new URLSearchParams(search).get('tab') === 'history' ? 'history' : 'transfer');

/**
 * Property → Property Transfer page: "Property Transfer" and "Transfer History" tabs.
 * URL: /admin/transfer-property[?tab=history&transferRef=<ref>]
 */
const PropertyTransfer = () => {
   const location = useLocation();
   const userData = getLocalStorage('authData');
   const [activeTab, setActiveTab] = useState(readTab(location.search));

   const transferRef = new URLSearchParams(location.search).get('transferRef') || '';

   // Follow the URL when a link (e.g. the success toast) navigates here.
   useEffect(() => {
      setActiveTab(readTab(location.search));
   }, [location.search, location.key]);

   if (!isTransferAdmin(userData)) {
      return (
         <div className="tableBox property-transfer-page">
            <Text size="regular" color="secondryColor" text="Only Admin and Super Admin users can transfer properties." />
         </div>
      );
   }

   return (
      <div className="tableBox property-transfer-page">
         {/* No page heading here: the layout header already shows "Property Transfer" (route name). */}
         <Tabs
            id="property-transfer-tabs"
            activeKey={activeTab}
            onSelect={(key) => setActiveTab(key)}
            mountOnEnter
            className="mb-3"
         >
            <Tab eventKey="transfer" title="Property Transfer">
               <TransferForm />
            </Tab>
            <Tab eventKey="history" title="Transfer History">
               <TransferHistory initialTransferRef={transferRef} refreshKey={location.key} />
            </Tab>
         </Tabs>
      </div>
   );
};

export default PropertyTransfer;
