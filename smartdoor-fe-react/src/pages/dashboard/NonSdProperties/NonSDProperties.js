/** @format */

import React, { useEffect, memo, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import Text from "../../../shared/Text/Text";
import Form from "react-bootstrap/Form";
import Buttons from "../../../shared/Buttons/Buttons";
import "./NonSDProperties.scss";
import { getNonSDProperties, getAllCity } from "../../../common/redux/actions";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import Pagination from "../../../shared/DataTable/Pagination";
import { TableLoader } from "../../../common/helpers/Loader";
import { formateDate, ToolTip } from "../../../common/helpers/Utils";
import { approveProperty } from "../../../common/redux/actions";
import { Link } from "react-router-dom";
import contentIco from "../../../assets/images/content-ico.svg";
import Image from "../../../shared/Image/Image";
import SearchInput from "../../../shared/Inputs/SearchInput/SearchInput";
import ListingDataTable from "../../../shared/DataTable/ListingDataTable";

const PaginationComponent = (props) => <Pagination {...props} />;
const ProgressComponent = <TableLoader />;
const getModalActionData = (row) => {
   return { userData: row };
};

const NonSDProperties = (props) => {
   const history = useHistory();

   const { getNonSDProperties, allNonSDProperties, getAllCity, allCities } = props;
   useEffect(() => {
      getAllCity();
      getNonSDProperties();
   }, [getNonSDProperties, getAllCity]);

   const [filterText, setFilterText] = React.useState('');
   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
   const PaginationComponent = (props) => (<Pagination {...props} />);
   const [p_city, setPCity] = useState('');

   const subHeaderComponentMemo = React.useMemo(() => {
      const handleClear = () => {
         if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText('');
         }
      };

      return (
         <SearchInput onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} placeholder='Search here' />
      );
   }, [filterText, resetPaginationToggle]);

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
         // selector: "ownerName",
         center: true,
         minWidth: "180px",
         cell: ({ ownerName, postedByName }) => (
            <span>{ownerName === null ? <>{postedByName}</> : <>{ownerName}</>}</span>
         )
      },
      {
         name: "Location",
         selector: "planName",
         center: true,
         minWidth: "200px",
         cell: ({ houseNumber, societyName, societyAddress }) => (
            <span>
               {houseNumber} {" , "}
               {societyName} {" , "} {societyAddress}
            </span>
         ),
      },
      {
         name: "Mobile",
         // selector: "ownerName",
         center: true,
         minWidth: "120px",
         cell: ({ ownerMobile, posetdByMobile }) => (
            <span>{ownerMobile === null ? <>{posetdByMobile}</> : <>{ownerMobile}</>}</span>
         )
      },
      {
         name: "Type",
         selector: "propertyType",
         center: true,
         minWidth: "150px",
      },

      {
         name: "Status",
         selector: "status",
         center: true,
         minWidth: "170px",
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

   const showData = (city) => {
      let filteredItems = [];
      filteredItems = allNonSDProperties.data.length ?
         allNonSDProperties.data.filter(item => {
            return item?.propertyId === filterText ||
               item?.ownerMobile?.includes(filterText) ||
               item?.posetdByMobile?.includes(filterText) ||
               item?.ownerName?.toLowerCase().includes(filterText.toLowerCase()) ||
               item?.postedByName?.toLowerCase().includes(filterText.toLowerCase())
         }) : [];
         // if (city && filteredItems.length) {
         //    filteredItems = filteredItems.filter(item => item?.societyAddress?.toLowerCase().includes(city.toLowerCase()));
         //    console.log(filteredItems)
         //  }
      return filteredItems;
   }

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
               <div className="locationSelect d-flex">
                  {subHeaderComponentMemo}
                  {/* <Form.Group controlId="exampleForm.SelectCustom">
                     <Form.Control
                        as="select"
                        onChange={(e) => {
                           setPCity(e.target.value)
                           showData(e.target.value);
                        }}
                        value={p_city}
                     >
                        <option value="">Select City</option>
                        {allCities?.data?.cities?.length > 0
                           ? allCities?.data?.cities.map((c_value, indx) => (
                              <option key={indx} value={c_value}>
                                 {c_value}
                              </option>
                           ))
                           : null}
                     </Form.Control>
                  </Form.Group> */}
               </div>
            </div>

            <ListingDataTable
               data={showData()}
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

const mapStateToProps = ({ allNonSDProperties, allCities }) => ({
   allNonSDProperties, allCities
});

const actions = {
   getNonSDProperties,
   getAllCity
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(NonSDProperties);
