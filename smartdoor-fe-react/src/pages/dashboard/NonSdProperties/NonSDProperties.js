/** @format */

import React, { useEffect, memo } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import Text from "../../../shared/Text/Text";
import Form from "react-bootstrap/Form";
import Buttons from "../../../shared/Buttons/Buttons";
import "./NonSDProperties.scss";
import { getNonSDProperties } from "../../../common/redux/actions";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import Pagination from "../../../shared/DataTable/Pagination";
import { TableLoader } from "../../../common/helpers/Loader";
import { formateDate, ToolTip } from "../../../common/helpers/Utils";
import { approveProperty } from "../../../common/redux/actions";
import { Link } from "react-router-dom";
import contentIco from "../../../assets/images/content-ico.svg";
import Image from "../../../shared/Image/Image";

const PaginationComponent = (props) => <Pagination {...props} />;
const ProgressComponent = <TableLoader />;
const getModalActionData = (row) => {
   return { userData: row };
};

const NonSDProperties = (props) => {
   const history = useHistory();

   const { getNonSDProperties, allNonSDProperties } = props;
   useEffect(() => {
      getNonSDProperties();
   }, [getNonSDProperties]);

   function handleApproveProperty(propertyId) {
      if (propertyId) {
         approveProperty({ propertyId: propertyId })
            .then((response) => {
               if (response.data && response.data.status === 200) {
                  getNonSDProperties();
               }
            })
            .catch((err) => {
               console.log(err);
            });
      }
   }

   const columns = [
      {
         name: "Id",
         sortable: true,
         selector: "propertyId",
         center: true,
      },

      {
         name: "Added On",
         sortable: true,
         selector: "postedDate",
         maxWidth: "120px",
         center: true,
         cell: ({ postedDate }) => <span>{`${formateDate(postedDate)}` || ""}</span>,
      },
      {
         name: "Owner",
         selector: "ownerName",
         center: true,
      },
      {
         name: "Location",
         selector: "planName",
         center: true,
         maxWidth: "150px",
         cell: ({ houseNumber, societyName }) => (
            <span>
               {houseNumber} {" , "}
               {societyName}
            </span>
         ),
      },
      {
         name: "Type",
         selector: "propertyType",
         center: true,
         minWidth: "200px",
      },

      {
         name: "Status",
         selector: "status",
         center: true,
         minWidth: "200px",
      },

      {
         name: "Approve",
         center: true,
         cell: (row) => (
            <div className="mt-1">
               <Buttons
                  name="Approve"
                  varient="primary"
                  size="Small"
                  style={{ width: "100px", height: "30px", textAlign: "center" }}
                  color="white"
                  onClick={() => {
                     handleApproveProperty(row.propertyId);
                  }}
               />
            </div>
         ),
      },
      {
         name: "Action",
         sortable: false,
         center: true,
         maxWidth: "60px",
         cell: ({ row, propertyId }) => (
            <div className="action">
               <ToolTip position="left" name="View Details">
                  <span>
                     <Link
                        to={{
                           pathname: "/admin/property/property-details",
                           state: { propertyId: propertyId, userId: propertyId },
                        }}
                     >
                        <Image name="editIcon" src={contentIco} />
                     </Link>
                  </span>
               </ToolTip>
            </div>
         ),
      },
   ];

   const filteredItems = allNonSDProperties.data.length
      ? allNonSDProperties.data.filter((item) => {
           return item.propertyId || item.propertyType;
        })
      : [];

   return (
      <>
         <div className="tableBox mb-5">
            <div className="d-flex flex-md-column flex-xl-row justify-content-xl-between align-items-xl-center align-items-left tableHeading">
               <div className="text-nowrap mb-2">
                  <Text
                     size="regular"
                     fontWeight="mediumbold"
                     color="secondryColor"
                     text="Approval"
                  />
               </div>
            </div>

            <DataTableComponent
               data={filteredItems}
               columns={columns}
               progressPending={allNonSDProperties.isLoading}
               paginationComponent={PaginationComponent}
               perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
               paginationPerPage={8}
               paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
               progressComponent={ProgressComponent}
            />
         </div>
      </>
   );
};

const mapStateToProps = ({ allNonSDProperties }) => ({
   allNonSDProperties,
});

const actions = {
   getNonSDProperties,
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(NonSDProperties);
