/** @format */

import React, { useEffect, useRef, useState } from "react";
import { formateDate, ToolTip } from "../../../../common/helpers/Utils";
import Text from "../../../../shared/Text/Text";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Image from "../../../../shared/Image/Image";
import contentIcon from "../../../../assets/images/content-ico.png";
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import { TableLoader } from "../../../../common/helpers/Loader";
import Pagination from "../../../../shared/DataTable/Pagination";
import Input from "../../../../shared/Inputs/Input/Input";
import "./KitList.scss";
import { connect } from "react-redux";
import { compose } from "redux";
import { fetchKitList } from "../../../../common/redux/actions";

const KitList = (props) => {
   const { allKitList, fetchKitList } = props;
   const [kitId, setKitId] = useState(null);
   const [status, setStatus] = useState("");
   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
   const tableRef = useRef();

   const kitListColumns = [
      {
         name: "Id",
         selector: (row) => row.kitId,
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ kitId }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={kitId}>
               <Text size="Small" color="secondryColor elipsis-text" text={kitId} />
            </ToolTip>
         ),
         id: 1,
      },
      {
         name: "Created Date",
         selector: (row) => row.createdDate,
         sortable: true,
         center: false,
         minWidth: "150px",
         cell: ({ createdDate }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={createdDate}>
               <Text size="Small" color="secondryColor elipsis-text" text={formateDate(createdDate)} />
            </ToolTip>
         ),
         id: 2,
      },
      {
         name: "Last Modified Date",
         selector: (row) => row.lastModifiedDate,
         sortable: true,
         center: false,
         minWidth: "150px",
         cell: ({ lastModifiedDate }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={lastModifiedDate}>
               <Text size="Small" color="secondryColor elipsis-text" text={formateDate(lastModifiedDate)} />
            </ToolTip>
         ),
         id: 3,
      },
      {
         name: "Corporate",
         selector: (row) => row.corporateName,
         sortable: true,
         center: false,
         minWidth: "150px",
         cell: ({ corporateName }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={corporateName}>
               <Text size="Small" color="secondryColor elipsis-text" text={corporateName} />
            </ToolTip>
         ),
         id: 4,
      },
      {
         name: "Status",
         selector: (row) => row.status,
         sortable: true,
         center: false,
         minWidth: "150px",
         cell: ({ status }) => (
            <ToolTip position="top" style={{ width: "100%" }} name={status}>
               <Text size="Small" color="secondryColor elipsis-text" text={status} />
            </ToolTip>
         ),
         id: 5,
      },
      {
         name: "Action",
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ kitId, corporateId }) => (
            <div className="action">
               <ToolTip position="left" name="View Details">
                  <span>
                     <Link
                        to={{
                           pathname: "/admin/all-kit-list/kit-details",
                              state: { kitId: kitId, corporateId: corporateId},
                        }}
                     >
                        <Image name="editIcon" src={contentIcon} />
                     </Link>
                  </span>
               </ToolTip>
            </div>
         ),
         id: 6,
      },
   ];

   const ProgressComponent = <TableLoader />;
   const [currentPage, setCurrentPage] = useState(1);
   const [rowsPerPage, setRowsPerPage] = useState(8);
   const recordSize = allKitList?.data?.records || 0;
   console.log(recordSize);
   let recordsPerPage = 0;
   recordsPerPage = allKitList?.data?.rowsPerPage;

   const handlePageChange = (newPage) => {
      setCurrentPage(Number(newPage));
      getAllKits(newPage, rowsPerPage);
   };

   const handleRowsPerPageChange = async (newRowsPerPage) => {
      recordsPerPage = Number(newRowsPerPage);
      setRowsPerPage(Number(newRowsPerPage));
      getAllKits(currentPage, newRowsPerPage);
   };

   const PaginationActionButton = () => (
      <div className="d-flex justify-content-center tableBottom"></div>
   );

   let PaginationComponent = ({ onChangePage, onChangeRowsPerPage, ...props }) => (
      <Pagination
         {...props}
         rowCount={recordSize}
         rowsPerPage={recordsPerPage}
         onChangeRowsPerPage={handleRowsPerPageChange}
         currentPage={currentPage}
         onChangePage={handlePageChange}
         paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
         PaginationActionButton={PaginationActionButton}
      />
   );

   const getAllKits = (pageNo, pageSize) => {
      if(pageNo !== 1) {
         fetchKitList({
         kitId: kitId,
         status: status,
         pageNumber: pageNo,
         pageSize: pageSize,
         records: allKitList?.data?.records
      });   
      } else {
         fetchKitList({
            kitId: kitId,
            status: status,
            pageNumber: pageNo,
            pageSize: pageSize
         });
      }
   }

   useEffect(() => {
      getAllKits(currentPage, rowsPerPage);
   }, []);

   const kitIdBox = React.useMemo(() => {
      const handleClear = () => {
         if (kitId) {
            setResetPaginationToggle(!resetPaginationToggle);
            setKitId(null);
         }
      };

      return (
         <Input
            id={"kitId"}
            placeholder={"Search by Kit id"}
            type={"number"}
            value={kitId}
            onInput={(e) => {
               setKitId(e.target.value);
               console.log(e);
            }}
            onClear={() => {
               handleClear();
            }}
            filterText={kitId}
            showSearch={true}
         />
      );
   }, [kitId, resetPaginationToggle]);

   return (
      <>
         <div className="tableBox">
            <div className="align-items-center tableHeading">
               <div className="d-flex justify-content-between">
                  <div>
                     <Text
                        size="regular"
                        fontWeight="mediumbold"
                        color="secondryColor"
                        text="Kits"
                     />
                  </div>
                  <div className="locationSelect d-flex">{kitIdBox}</div>
               </div>
               <div className="kitListTableWrapper">
                  <DataTableComponent
                     ref={tableRef}
                     data={allKitList?.data?.list || []}
                     columns={kitListColumns}
                     progressPending={allKitList?.isLoading}
                     progressComponent={ProgressComponent}
                     paginationComponent={PaginationComponent}
                     paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                     paginationPerPage={recordsPerPage}
                     currentPage={currentPage}
                     onChangePage={handlePageChange}
                     onChangeRowsPerPage={handleRowsPerPageChange}
                     perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                     paginationServer={true}
                     persistTableHead
                  />
               </div>
            </div>
         </div>
      </>
   );
};

const mapStateToProps = ({ allKitList }) => ({
   allKitList
});

const actions = {
   fetchKitList
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect)(KitList);
