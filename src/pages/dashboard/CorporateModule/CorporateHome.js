/** @format */

import React, { useEffect, useState } from "react";
import Text from "../../../shared/Text/Text";
import { useHistory } from 'react-router-dom';
import { ToolTip } from "../../../common/helpers/Utils";
import Image from "../../../shared/Image/Image";
import { Link } from "react-router-dom/cjs/react-router-dom";
import contentIcon from "../../../assets/images/content-ico.svg";
import './corporateHome.scss';
import SearchInput from "../../../shared/Inputs/SearchInput/SearchInput";
import { Button } from "react-bootstrap";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import { compose } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import { getAllCorporates } from "../../../common/redux/actions";
import Pagination from "../../../shared/DataTable/Pagination";
import { TableLoader } from "../../../common/helpers/Loader";
import * as Actions from '../../../common/redux/types';

const CorporateHome = (props) => {

   const { getAllCorporates, allCorporates } = props;
   const data = useSelector(state => state.allCorporates.data);
   const history = useHistory();
   const dispatch = useDispatch();

   const corporateColumns = [
      {
         name: "Logo",
         selector: ((row) => row.logo),
         sortable: false,
         center: true,
         maxWidth: "150px",
         cell: ({ logo }) => (
            <img src={logo} alt="" style={{ height: '40px', width: '40px' }} ></img>
         ),
         id: 1
      },
      {
         name: "Company",
         selector: ((row) => row.companyName),
         sortable: true,
         center: true,
         wrap: true,
         maxWidth: "250px",
         cell: ({ companyName }) => (
            <ToolTip position="top" style={{ width: '100%' }} name={companyName}>
               {/* <Text size="Small" color="secondryColor elipsis-text" text={companyName} /> */}
               <span>{companyName}</span>
            </ToolTip>
         ),
         id: 2
      },
      {
         name: "Address",
         selector: ((row) => row.companyAddress),
         sortable: false,
         center: true,
         maxWidth: "150px",
         cell: ({ companyAddress }) => (
            <ToolTip position="top" style={{ width: '100%' }} name={companyAddress}>
               <Text size="Small" color="secondryColor elipsis-text" text={companyAddress} />
            </ToolTip>
         ),
         id: 3
      },
      {
         name: "Total Postings",
         selector: ((row) => row.totalPostingCount),
         sortable: true,
         center: true,
         maxWidth: "150px",
         cell: ({ totalPostingCount }) => (
            <ToolTip position="top" style={{ width: '100%' }} name={totalPostingCount}>
               <Text size="Small" color="secondryColor elipsis-text" text={totalPostingCount} />
            </ToolTip>
         ),
         id: 4
      },
      {
         name: "Active Posting(s)",
         selector: ((row) => row.totalPostingCount),
         sortable: true,
         center: true,
         maxWidth: "150px",
         cell: ({ totalPostingCount }) => (
            <ToolTip position="top" style={{ width: '100%' }} name={totalPostingCount}>
               <Text size="Small" color="secondryColor elipsis-text" text={totalPostingCount} />
            </ToolTip>
         ),
         id: 5
      },
      {
         name: "Users",
         selector: ((row) => row.countOfUsers),
         sortable: true,
         center: true,
         maxWidth: "150px",
         cell: ({ countOfUsers }) => (
            <ToolTip position="top" style={{ width: '100%' }} name={countOfUsers}>
               <Text size="Small" color="secondryColor elipsis-text" text={countOfUsers} />
            </ToolTip>
         ),
         id: 6
      },
      {
         name: "Action",
         selector: ((row) => row.corporateId),
         sortable: false,
         center: true,
         maxWidth: "40px",
         cell: ({ corporateId }) => (
            <div className="action">
               <ToolTip position="left" name="View Details">
                  <span>
                     <Link
                        to={{
                           pathname: "/admin/corporate/corporateDetails",
                           state: { corporateId: corporateId },
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

   const [filterText, setFilterText] = React.useState(data?.length !== 0 ? allCorporates.searchString : '');
   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
   const [currentPage, setCurrentPage] = useState(data?.length !== 0 ? allCorporates?.data?.currentPage : 1);
   const [rowsPerPage, setRowsPerPage] = useState(data?.length !== 0 ? allCorporates?.data?.rowsPerPage : 8);
   const recordSize = allCorporates?.data?.corporateList?.length || 0;
   // const image = allCorporates?.data?.corporateList[2]?.logo;
   const [corporateList, setCorporateList] = useState([]);

   const ProgressComponent = <TableLoader />;

   const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
      getAllCorporates({
         corporateId: 0,
         pageNo: newPage,
         pageSize: rowsPerPage,
         searchString: filterText
      });
   }

   const handleRowsPerPageChange = (newRowsPerPage) => {
      setRowsPerPage(newRowsPerPage);
      getAllCorporates({
         corporateId: 0,
         pageNo: currentPage,
         pageSize: newRowsPerPage,
         searchString: filterText
      });
   }

   let PaginationComponent = ({ onChangePage, onChangeRowsPerPage, ...props }) => (
      <Pagination {...props}
         rowCount={recordSize}
         rowsPerPage={rowsPerPage}
         onChangeRowsPerPage={handleRowsPerPageChange}
         currentPage={currentPage}
         onChangePage={handlePageChange}
         paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
      />
   );

   const subHeaderComponentMemo = React.useMemo(() => {
      const handleClear = () => {
         if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");
         }
      };

      return (
         <SearchInput
            onFilter={(e) => {
               setFilterText(e.target.value);
               getAllCorporates({
                  corporateId: 0,
                  pageNo: currentPage,
                  pageSize: rowsPerPage,
                  searchString: e.target.value
               });
            }}
            onClear={() => handleClear}
            filterText={filterText}
            placeholder="Search company name"
         />
      );
   }, [filterText, resetPaginationToggle]);

   useEffect(() => {
      dispatch({type: Actions.CORPORATE_PROPERTY_SUCCESS, data: []});
      console.log(data)
      getAllCorporates({
         corporateId: 0,
         pageNo: currentPage,
         pageSize: rowsPerPage,
         searchString: filterText
      });
   }, [getAllCorporates]);

   const showData = () => {
      let filteredItems = [];
      filteredItems = allCorporates?.data?.corporateList
      return allCorporates?.data?.corporateList;
   }

   return (
      <>
         <div className="tableBox">
            <div className="tableHeading">
               <div className="locationSelect align-items-end">
                  {subHeaderComponentMemo}
                  <Button className="d-flex py-1" style={{ color: '#BE1452', backgroundColor: '#F8F3F5', borderColor: '#DED6D9' }}
                     onClick={() => { history.push('/admin/corporate/addNewCorporate'); }} >
                     {/* <div style={{
                        position: 'relative',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '5%',
                        marginBottom: '-5%',
                     }}>
                        <Image src={addIcon} style={{ width: '20px' }} />
                     </div> */}
                     <Text text={' + Add New Company'} fontWeight='bold' style={{ fontSize: '12px', color: '#BE1452' }} />
                  </Button>
               </div>
            </div>
            <div className="corporateTableWrapper">
               <DataTableComponent
                  data={showData()}
                  columns={corporateColumns}
                  progressPending={allCorporates.isLoading}
                  progressComponent={ProgressComponent}
                  paginationComponent={PaginationComponent}
                  paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                  paginationPerPage={rowsPerPage}
                  currentPage={currentPage}
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handleRowsPerPageChange}
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

const mapStateToProps = ({ allCorporates }) => ({
   allCorporates
})

const actions = {
   getAllCorporates
}

export default compose(connect(mapStateToProps, actions))(CorporateHome);
