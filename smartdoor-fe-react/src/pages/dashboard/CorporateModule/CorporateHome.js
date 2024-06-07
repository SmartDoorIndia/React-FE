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
import addIcon from '../../../assets/svg/PlusCircle.svg';
import logoIcon from '../../../assets/svg/logoIcon.svg';
import DataTableComponent from "../../../shared/DataTable/DataTable";

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
                  <Button onClick={() => {history.push('/admin/corporate/corporateDetails');}} >Details</Button>
                  {subHeaderComponentMemo}
                  <Button className="d-flex py-1" style={{ color: '#BE1452', backgroundColor: '#F8F3F5', borderColor: '#DED6D9' }}
                     onClick={() => {history.push('/admin/corporate/addNewCorporate');}} >
                     <div style={{
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '5%',
                        marginBottom: '-5%',
                     }}>
                        <Image src={addIcon} style={{ width: '20px' }} />
                     </div>
                     <Text text={'Add New Company'} fontWeight='bold' style={{ fontSize: '12px', color: '#BE1452' }} />
                  </Button>
               </div>
            </div>
            <div className="corporateTableWrapper">
               <DataTableComponent
                  data={[]}
                  columns={corporateColumns}
                  // progressPending={allPropertyData.isLoading}
                  // progressComponent={ProgressComponent}
                  // paginationComponent={PaginationComponent}
                  paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                  // paginationPerPage={recordsPerPage}
                  // currentPage={currentPage}
                  // onChangePage={handlePageChange}
                  // onChangeRowsPerPage={handleRowsPerPageChange}
                  perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                  filterText={filterText}
                  paginationServer={true}
                  subHeaderComponent={subHeaderComponentMemo}
                  persistTableHead
                  filterComponent={subHeaderComponentMemo}
               // onRowClicked={onRowClicked}
               // onSort={handleSortedData}
               // defaultSort={defaultSort}
               // defaultSortId={defaultSortId}
               // defaultSortFieldId={defaultSortFieldId}
               />
            </div>
         </div>
      </>
   );
};

export default CorporateHome;
