/** @format */

import React, { useState } from "react";
import VisitImages from "../VisitRecordings/VisitImgVideos/VisitImages";
import VisitVideos from "../VisitRecordings/VisitImgVideos/VisitVideos";
import { TextField } from "@mui/material";
import Buttons from "../../../../shared/Buttons/Buttons";

const IntrusionMedia = (props) => {

   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");

   // Today's date
   const toDate = new Date();

   // 30 days before today
   const fromDate = new Date();
   fromDate.setDate(toDate.getDate() - 30);

   // Helper to format as "yyyy-MM-dd HH:mm:ss"
   const formatDateTime = (d) => {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");

      const hh = String(d.getHours()).padStart(2, "0");
      const min = String(d.getMinutes()).padStart(2, "0");
      const sec = String(d.getSeconds()).padStart(2, "0");

      return `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec}`;
   };

   // Default dates: last 30 days to today
   const defaultStartDate = formatDateTime(fromDate);
   const defaultEndDate = formatDateTime(toDate);

   // Dates actually passed to child components
   const [searchedStartDate, setSearchedStartDate] = useState(defaultStartDate);
   const [searchedEndDate, setSearchedEndDate] = useState(defaultEndDate);

   const search = () => {
      if (!startDate || !endDate) {
         return;
      }

      // Convert yyyy-MM-dd to yyyy-MM-dd HH:mm:ss
      setSearchedStartDate(`${startDate} 00:00:00`);
      setSearchedEndDate(`${endDate} 23:59:59`);
   };

   return (
      <>
         <div
            className="w-100 mt-3 d-flex"
            style={{ justifyContent: "space-between" }}
         >
            <TextField
               className="textFieldInput mt-1"
               style={{ width: "40%" }}
               placeholder=""
               InputLabelProps={{ shrink: true }}
               type="date"
               value={startDate}
               label="Start Date"
               onChange={(e) => {
                  setStartDate(e.target.value);
               }}
            />

            <TextField
               className="textFieldInput mt-1"
               style={{ width: "40%" }}
               placeholder=""
               InputLabelProps={{ shrink: true }}
               type="date"
               value={endDate}
               label="End Date"
               onChange={(e) => {
                  setEndDate(e.target.value);
               }}
            />

            <Buttons
               className="py-0"
               name="Search"
               onClick={search}
            />
         </div>

         <VisitImages
            cameraId={props?.cameraId}
            startTime={searchedStartDate}
            endTime={searchedEndDate}
            dataRequiredType={"INRUSION_DATA"}
         />

         <VisitVideos
            cameraId={props?.cameraId}
            startTime={searchedStartDate}
            endTime={searchedEndDate}
            dataRequiredType={"INRUSION_DATA"}
         />
      </>
   );
};

export default IntrusionMedia