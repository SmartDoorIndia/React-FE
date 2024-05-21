/** @format */

import React from "react";
import Text from "../../../shared/Text/Text";
import Buttons from "../../../shared/Buttons/Buttons";
import { useHistory } from 'react-router-dom';

const CorporateHome = () => {
    const history = useHistory();

    const handleAddNewCorporateClick = () => {
        history.push('/admin/corporate/addNewCorporate');
    };

   return (
      <>
         <div className="d-flex justify-content">
            <Text text={"Total Corporate : 0"} fontWeight="bold" style={{ fontSize: "14px" }} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Text text={"Total Postings : 0"} fontWeight="bold" style={{ fontSize: "14px" }} />
         </div>
         <div className="bg-white h-75">
            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "75vh",
                  flexDirection: "column",
               }}
            >
               <Text
                  text={"You don’t have any Corporate in list."}
                  fontWeight="bold"
                  style={{ fontSize: "16px", textAlign: "center" }}
               />
               <div style={{ marginTop: "10px" }}>
                  <Buttons
                     name="Add new Corporate"
                     varient="primary"
                     size="xSmall"
                     color="white"
                     onClick={handleAddNewCorporateClick}
                  />
               </div>
            </div>
         </div>
      </>
   );
};

export default CorporateHome;
