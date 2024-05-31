/** @format */

import React from "react";
import Text from "../../../shared/Text/Text";
import Buttons from "../../../shared/Buttons/Buttons";
import { useHistory } from 'react-router-dom';
import { ToolTip } from "../../../common/helpers/Utils";
import Image from "../../../shared/Image/Image";
import { Link } from "react-router-dom/cjs/react-router-dom";
import contentIcon from "../../../assets/images/content-ico.svg";

const CorporateHome = () => {
   const history = useHistory();

   const corporateColumns = [
      {
         name: "Corporate",
         selector: ((row) => row.propertyId),
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ corporate }) => (
            <ToolTip position="top" style={{ width: '100%' }} name={corporate}>
               <Text size="Small" color="secondryColor elipsis-text" text={corporate} />
            </ToolTip>
         ),
         id: 1
      },
      {
         name: "Admin",
         selector: ((row) => row.admin),
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ admin }) => (
            <ToolTip position="top" style={{ width: '100%' }} name={admin}>
               <Text size="Small" color="secondryColor elipsis-text" text={admin} />
            </ToolTip>
         ),
         id: 2
      },
      {
         name: "Mobile Number",
         selector: ((row) => row.mobile),
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ mobile }) => (
            <ToolTip position="top" style={{ width: '100%' }} name={mobile}>
               <Text size="Small" color="secondryColor elipsis-text" text={mobile} />
            </ToolTip>
         ),
         id: 3
      },
      {
         name: "Postings Cap (Rs)",
         selector: ((row) => row.postingsCap),
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ postingsCap }) => (
            <ToolTip position="top" style={{ width: '100%' }} name={postingsCap}>
               <Text size="Small" color="secondryColor elipsis-text" text={postingsCap} />
            </ToolTip>
         ),
         id: 4
      },
      {
         name: "Active Posting(s)",
         selector: ((row) => row.postings),
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ postings }) => (
            <ToolTip position="top" style={{ width: '100%' }} name={postings}>
               <Text size="Small" color="secondryColor elipsis-text" text={postings} />
            </ToolTip>
         ),
         id: 5
      },
      {
         name: "Users",
         selector: ((row) => row.users),
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ userCpunt }) => (
            <ToolTip position="top" style={{ width: '100%' }} name={userCpunt}>
               <Text size="Small" color="secondryColor elipsis-text" text={userCpunt} />
            </ToolTip>
         ),
         id: 6
      },
      {
         name: "Status",
         selector: ((row) => row.status),
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ status }) => (
            <ToolTip position="top" style={{ width: '100%' }} name={status}>
               <Text size="Small" color="secondryColor elipsis-text" text={status} />
            </ToolTip>
         ),
         id: 7
      },
      {
         name: "Action",
         sortable: false,
         center: true,
         maxWidth: "40px",
         cell: ({ row, postedById }) => (
            <div className="action">
               <ToolTip position="left" name="View Details">
                  <span>
                     <Link
                        to={{
                           pathname: "/admin/property/property-details",
                           state: {},
                        }}
                     >
                        <Image name="editIcon" src={contentIcon} />
                     </Link>
                  </span>
               </ToolTip>
            </div>
         ),
      }
   ]



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
                     varient="secondary"
                     size="xSmall"
                     color="#BE1452"
                     onClick={handleAddNewCorporateClick}
                  />
               </div>
            </div>
         </div>
      </>
   );
};

export default CorporateHome;
