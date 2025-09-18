/** @format */

import React, { useEffect } from "react";
import VisitImages from "../VisitRecordings/VisitImgVideos/VisitImages";
import VisitVideos from "../VisitRecordings/VisitImgVideos/VisitVideos";

const IntrusionMedia = (props) => {
   // Today's date
   const toDate = new Date();

   // 30 days before today
   const fromDate = new Date();
   fromDate.setDate(toDate.getDate() - 30);

   // Helper to format as "yyyy-MM-dd HH:mm:ss"
   function formatDateTime(d) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");

      const hh = String(d.getHours()).padStart(2, "0");
      const min = String(d.getMinutes()).padStart(2, "0");
      const sec = String(d.getSeconds()).padStart(2, "0");

      return `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec}`;
   }

   useEffect(() => {}, []);

   return (
      <>
         <VisitImages
            cameraId={props?.cameraId}
            startTime={formatDateTime(fromDate)}
            endTime={formatDateTime(toDate)}
            dataRequiredType={"INRUSION_DATA"}
         />
         <VisitVideos
            cameraId={props?.cameraId}
            startTime={formatDateTime(fromDate)}
            endTime={formatDateTime(toDate)}
            dataRequiredType={"INRUSION_DATA"}
         />
      </>
   );
};

export default IntrusionMedia;
