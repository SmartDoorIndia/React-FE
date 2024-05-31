/** @format */

import React, { useState } from "react";
import Text from "../../../shared/Text/Text";
import Buttons from "../../../shared/Buttons/Buttons";
import { useHistory } from 'react-router-dom';
import { ToolTip } from "../../../common/helpers/Utils";
import Image from "../../../shared/Image/Image";
import { Link } from "react-router-dom/cjs/react-router-dom";
import contentIcon from "../../../assets/images/content-ico.svg";
import './corporateHome.scss';
import SearchInput from "../../../shared/Inputs/SearchInput/SearchInput";
import { Button } from "react-bootstrap";
import addIcon from '../../../assets/svg/add.svg';

const CorporateHome = () => {
   const history = useHistory();

   const corporateColumns = [
      {
         name: "Logo",
         selector: ((row) => row.logo),
         sortable: false,
         center: false,
         maxWidth: "150px",
         cell: ({ logo }) => (
            <ToolTip position="top" style={{ width: '100%' }} name={logo}>
               <Text size="Small" color="secondryColor elipsis-text" text={logo} />
            </ToolTip>
         ),
         id: 1
      },
      {
         name: "Company",
         selector: ((row) => row.propertyId),
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ company }) => (
            <ToolTip position="top" style={{ width: '100%' }} name={company}>
               <Text size="Small" color="secondryColor elipsis-text" text={company} />
            </ToolTip>
         ),
         id: 2
      },
      {
         name: "Address",
         selector: ((row) => row.address),
         sortable: false,
         center: false,
         maxWidth: "150px",
         cell: ({ address }) => (
            <ToolTip position="top" style={{ width: '100%' }} name={address}>
               <Text size="Small" color="secondryColor elipsis-text" text={address} />
            </ToolTip>
         ),
         id: 3
      },
      {
         name: "Total Postings",
         selector: ((row) => row.totalPostings),
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ totalPostings }) => (
            <ToolTip position="top" style={{ width: '100%' }} name={totalPostings}>
               <Text size="Small" color="secondryColor elipsis-text" text={totalPostings} />
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

   const [filterText, setFilterText] = React.useState('');
   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
   const [corporateList, setCorporateList] = useState([]);

   const subHeaderComponentMemo = React.useMemo(() => {
      const handleClear = () => {
         if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");
         }
      };

      return (
         <SearchInput
            onFilter={(e) => setFilterText(e.target.value)}
            onClear={() => handleClear}
            filterText={filterText}
            placeholder="Search name/mobile No."
         />
      );
   }, [filterText, resetPaginationToggle]);

   const handleAddNewCorporateClick = () => {
      history.push('/admin/corporate/addNewCorporate');
   };

   return (
      <>
         <div className="tableBox">
            <div className="tableHeading">
               <div className="locationSelect align-items-end">
                  {subHeaderComponentMemo}
                  <Button className="d-flex" style={{color:'#BE1452', backgroundColor:'#F8F3F5', borderColor:'#DED6D9'}} >
                  <Image src={addIcon} style={{height:'20px', width:'20px'}} /> Add New Company
                     </Button>
               </div>
               <div className="corporateTableWrapper">

               </div>
            </div>
         </div>
      </>
   );
};

export default CorporateHome;
