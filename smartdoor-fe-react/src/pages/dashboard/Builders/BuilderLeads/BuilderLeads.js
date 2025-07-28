/** @format */

import React, { useEffect, useState } from "react";
import { getLeadForBuilder } from "../../../../common/redux/actions";
import { Col, Modal, Row } from "react-bootstrap";
import { TextField } from "@mui/material";
import { getLocalStorage, showErrorToast } from "../../../../common/helpers/Utils";
import Buttons from "../../../../shared/Buttons/Buttons";
import { saveAs } from "file-saver";
import Text from "../../../../shared/Text/Text";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BuilderLeads = () => {
   const [fromDate, setFromDate] = useState(new Date().toISOString().split("T")[0]);
   const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
   const builderData = getLocalStorage("builderData");
   const [guideFlag, setGuideFlag] = useState(false);
   const [loading, setLoading] = useState(false);
   const history = useHistory();

   useEffect(() => {
      const currentUrl = window.location.href;
      if (
         (builderData === null || builderData === undefined) &&
         currentUrl?.endsWith("/admin/builder-project-leads")
      ) {
         setGuideFlag(true);
      }
   }, []);

   const downloadCSV = async () => {
      setLoading(true);
      const response = await getLeadForBuilder({
         builderId: builderData?.builderId,
         fromDate: fromDate,
         toDate: toDate,
      });
      console.log(response);
      setLoading(false);
      let data = response?.data?.resourceData;
      if (!data || data.length === 0) {
         console.warn("No data available to download");
         showErrorToast("No data available to download");
         return;
      }

      // Extract headers from the first object
      const headers = Object.keys(data[0]).join(",") + "\n";

      // Convert each object to a CSV row
      const rows = data
         .map((row) =>
            Object.values(row)
               .map((value) => `"${value}"`)
               .join(",")
         )
         .join("\n");

      // Combine headers and rows
      const csvContent = headers + rows;

      // Create a Blob with CSV content
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      // Trigger file download
      saveAs(blob, "LeadGeneration.csv");
   };
   return (
      <>
         <div className="bg-white mt-3 mb-3">
            <div className="mt-3">
               <Text className="p-2"
                  text="- Leads refer to users who viewed your project listings within the selected date range."
                  style={{ fontSize: "16px", fontWeight: "600" }}
               />
            </div>

            <Row className="bg-white py-3">
               <Col lg={4}>
                  <TextField
                     className="w-100 mt-3 px-1"
                     type="date"
                     label="From Date"
                     name="fromDate"
                     value={fromDate}
                     onChange={(e) => {
                        setFromDate(e.target.value);
                     }}
                  />
               </Col>
               <Col lg={4}>
                  <TextField
                     className="w-100 mt-3 px-1"
                     type="date"
                     label="To Date"
                     name="toDate"
                     value={toDate}
                     onChange={(e) => {
                        setToDate(e.target.value);
                     }}
                  />
               </Col>
               <Col lg={3}>
                  <Buttons
                     className="mt-4"
                     name="Download Leads"
                     onClick={() => {
                        if (fromDate <= toDate) {
                           downloadCSV();
                        } else {
                           showErrorToast("Enter valid date range...");
                           return null;
                        }
                     }}
                     style={{ justifySelf: "center" }}
                  />
               </Col>
            </Row>
         </div>
         <Modal show={guideFlag} onHide={() => setGuideFlag(false)} centered backdrop="static">
            <Modal.Header style={{ justifyContent: "end" }}>
               <Buttons
                  varient="secondary"
                  name="X"
                  onClick={() => {
                     setGuideFlag(false);
                  }}
               />
            </Modal.Header>
            <Modal.Body className="text-center">
               <Text
                  text="Please complete builder profile details from Builder Profile section to add new Project"
                  style={{ fontSize: "16px", fontWeight: "500" }}
               />
               <Buttons
                  name="Complete your Builder Profile"
                  onClick={() => {
                     history.push("/admin/builder-profile");
                  }}
               />
            </Modal.Body>
         </Modal>
      </>
   );
};

export default BuilderLeads;
