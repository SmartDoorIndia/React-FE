/** @format */

import React, { useEffect, useState } from "react";
import { formateDate, ToolTip } from "../../../common/helpers/Utils";
import Text from "../../../shared/Text/Text";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import "./CityDigestSubscribers.scss";
import { getAllCityDigestSubscribers } from "../../../common/redux/actions";

const CityDigestSubscribers = () => {
   const [subscriberList, setSubscriberList] = useState([]);
   const [loading, setLoading] = useState(false);

   const getSubscriberList = async () => {
      setLoading(true);
      const response = await getAllCityDigestSubscribers();
      setLoading(false);
      if (response?.status === 200) {
         setSubscriberList([...(response?.data?.resourceData || [])]);
      }
   };

   useEffect(() => {
      getSubscriberList();
   }, []);

   const subscriberColumns = [
      {
         name: "User ID",
         selector: (row) => row.userId,
         sortable: false,
         center: true,
         maxWidth: "100px",
         cell: ({ userId }) => <Text size="Small" color="secondryColor" text={userId} />,
         id: 1,
      },
      {
         name: "Name",
         selector: (row) => row.userName,
         sortable: false,
         center: false,
         maxWidth: "180px",
         cell: ({ userName }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={userName}>
               <Text size="Small" color="secondryColor elipsis-text" text={userName} />
            </ToolTip>
         ),
         id: 2,
      },
      {
         name: "Mobile",
         selector: (row) => row.mobile,
         sortable: false,
         center: true,
         maxWidth: "150px",
         cell: ({ mobile }) => <Text size="Small" color="secondryColor" text={mobile} />,
         id: 3,
      },
      {
         name: "Subscribed Email",
         selector: (row) => row.email,
         sortable: false,
         center: false,
         minWidth: "200px",
         cell: ({ email }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={email}>
               <Text size="Small" color="secondryColor elipsis-text" text={email} />
            </ToolTip>
         ),
         id: 4,
      },
      {
         name: "Cities",
         selector: (row) => row.cityNames,
         sortable: false,
         center: false,
         minWidth: "220px",
         cell: ({ cityNames }) => {
            const cityText = cityNames?.length ? cityNames.join(", ") : "-";
            return (
               <ToolTip position="top" style={{ width: "100%" }} name={cityText}>
                  <Text size="Small" color="secondryColor elipsis-text" text={cityText} />
               </ToolTip>
            );
         },
         id: 5,
      },
      {
         name: "Plan Status",
         selector: (row) => row.isActive,
         sortable: false,
         center: true,
         maxWidth: "130px",
         cell: ({ isActive }) => (
            <span className={`defaultTag ${isActive ? "tagSuccess" : "tagDangerous"}`}>
               {isActive ? "Active" : "Inactive"}
            </span>
         ),
         id: 6,
      },
      {
         name: "Emails",
         selector: (row) => row.emailEnabled,
         sortable: false,
         center: true,
         maxWidth: "130px",
         cell: ({ emailEnabled }) => (
            <span className={`defaultTag ${emailEnabled ? "tagSuccess" : "tagAlert"}`}>
               {emailEnabled ? "Enabled" : "Paused"}
            </span>
         ),
         id: 7,
      },
      {
         name: "Start Date",
         selector: (row) => row.startDate,
         sortable: false,
         center: true,
         maxWidth: "140px",
         cell: ({ startDate }) => (
            <Text size="Small" color="secondryColor" text={startDate ? formateDate(startDate) : "-"} />
         ),
         id: 8,
      },
      {
         name: "Expiry Date",
         selector: (row) => row.expiryDate,
         sortable: false,
         center: true,
         maxWidth: "140px",
         cell: ({ expiryDate }) => (
            <Text size="Small" color="secondryColor" text={expiryDate ? formateDate(expiryDate) : "-"} />
         ),
         id: 9,
      },
   ];

   return (
      <div className="mt-3 tableBox">
         <div className="align-items-center tableHeading">
            <div className="d-flex justify-content-between">
               <Text
                  size="regular"
                  fontWeight="mediumbold"
                  color="secondryColor"
                  text="Weekly City Digest Subscribers"
               />
            </div>
         </div>
         <DataTableComponent
            className="cityDigestSubscribersTableWrapper"
            progressPending={loading}
            columns={subscriberColumns}
            data={subscriberList}
            persistTableHead={true}
            paginationServer={false}
            pagination={"off"}
         />
      </div>
   );
};

export default CityDigestSubscribers;
