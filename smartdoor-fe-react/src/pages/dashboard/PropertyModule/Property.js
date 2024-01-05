/** @format */

import React, { useEffect, useState } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import Table from "react-bootstrap/Table";
import Image from "../../../shared/Image/Image";
import userImage from "../../../assets/svg/avatar_sml.svg";
import Text from "../../../shared/Text/Text";
import style from "./property.scss";
import { Link } from "react-router-dom";
import contentIco from "../../../assets/images/content-ico.svg";
import Form from "react-bootstrap/Form";
import { getAllProperties, getPropertyCity } from "../../../common/redux/actions";
import { connect } from "react-redux";
import { compose } from "redux";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import Buttons from "../../../shared/Buttons/Buttons";
import {
   showSuccessToast,
   showErrorToast,
   formateDate,
   getLocalStorage,
   ToolTip,
   handleStatusElement,
} from "../../../common/helpers/Utils";
import ModalModule from "../../../shared/Modal/ModalModule";
import PaginationComponent from "../../../shared/DataTable/PaginationComponent/PaginationComponent";

const PropertyModule = (props) => {
   const { getAllProperties, allPropertyData, getPropertyCity, getPropertyCityData } = props;
   const [ sliceFrom, setSliceFrom ] = useState(4);
   const userData = getLocalStorage("authData");
   const [ p_city, setp_City ] = useState('');

   function formateAddress(address, city) {
      try {
         if (address) {
            const splitData = address.split(", ");
            if (splitData.length) {
               try {
                  let addr;
                  let sliceData = splitData.slice(0, 2);
                  sliceData = sliceData.map((item) => item.toLowerCase());
                  sliceData = sliceData.filter((item) => item !== city.toLowerCase());
                  sliceData = sliceData.map((item) => item.capitalize());
                  addr = sliceData.join(',');
                  return addr + ", " + city || "";
               } catch (e) {
                  return address + ", " + city || "";
               }
            } else {
               return address + ", " + city || "";
            }
         } else {
            return city || "-";
         }
      } catch (e) {
         return "-";
      }
   }

   const columns = [
      {
         name: "Id",
         selector: "smartdoorPropertyId",
         sortable: true,
         center: true,
      },
      {
         name: "Location",
         sortable: false,
         wrap: true,
         style: { padding: "0 !important" },
         cell: ({ societyDetailResponse, city }) => (
            <ToolTip
               position="top"
               style={{ width: "100%" }}
               name={ (societyDetailResponse.locality || '') + ', ' + (city || '') }>
          <span className="cursor-pointer elipsis-text"> {formateAddress(societyDetailResponse.locality, city)}</span>
        </ToolTip>
         ),
      },
      {
         name: "Type",
         selector: "propertySubType",
         sortable: false,
         center: true,
         maxWidth: '130px',
         style: { padding: "0 !important" },
         // ${propertyInfoResponse.propertySubType}||"-"
         cell: ({ propertySubType }) => (
            <span className="text-align-center">{propertySubType || "-"}</span>
         ),
      },
      {
         name: "Information",
         selector: "propertyInfoResponse",
         sortable: false,
         center: true,
         maxWidth: '200px',
         style: { padding: "0 !important" },
         // ${propertyInfoResponse.propertyRate} | ${propertyInfoResponse.numberOfBed||""} Bed | ${propertyInfoResponse.numberOfBath||""} Bath
         cell: (row) => (
            <span>{`${row.carpetArea + " Sq. Ft. | " || ""}${row.bedRooms + " Bed | " || ""} ${
               row.numberOfBath + " Bath" || "-"
            }`}</span>
         ),
      },
      {
         name: "Posted On",
         selector: "addedOn",
         sortable: true,
         center: true,
         maxWidth: '120px',
         style: { padding: "0 !important" },
         cell: ({ addedOn }) => <span>{`${formateDate(addedOn)}` || ""}</span>,
         // cell:({addedOn})=>(<span>{`${propertyInfoResponse.propertySubType}`}</span>)
         // {`${new Date(Date.parse(addedOn)).toDateString()}`||""}
      },
      {
         name: "Status",
         selector: "city",
         sortable: false,
         center: true,
         maxWidth: '120px',
         style: { padding: "0 !important" },
         cell: ({ status }) => <span>{handleStatusElement(status)}</span>,
      },
      {
         name: "Action",
         selector: "year",
         sortable: false,
         center: true,
         maxWidth: '60px',
         cell: ({ row, smartdoorPropertyId }) => (
            <div className="action">
               <ToolTip position="left" name="View Details">
                         <span> 
                     <Link
                        to={{
                           pathname: '/admin/property/property-details',
                           state: { propertyId: smartdoorPropertyId, userId: userData.userid },
                        } }>
                        <Image name="editIcon" src={ contentIco } />
                     </Link>
                  </span>
               </ToolTip>
               {/* <span>
                        <Link  > 
                          <Image name="useraddIcon" src={cancleIco} />
                        </Link>  
                        </span> */}
        </div>
         ),
      },
   ];

   const PaginationActionButton = () => (
      <div className="d-flex justify-content-center tableBottom">
        <Link  to="/admin/property/new-property"><Buttons name="Add New Property" varient="primary" type="submit" size="Small" color="white" /></Link>
      </div>
   );

   useEffect(() => {
      getAllProperties({ userId: userData.userid, city: p_city, records: "", pageNumber: "" });

      getPropertyCity();
      //  console.log("useEffect : allPropertyData :",allPropertyData);
      //  console.log("useEffect : getPropertyCityData :",getPropertyCityData);
   }, [getAllProperties, getPropertyCity]);

   useEffect(() => {
      getAllProperties({ userId: userData.userid, city: p_city, records: "", pageNumber: "" });
   }, [p_city]);

   function onChangePage(e) {}

  const TableTitle = () =>{
      return (
         <div className="d-flex justify-content-between align-items-center tableHeading">
        <div>
      <Text size="regular" fontWeight="mediumbold" color="secondryColor" text="Properties on Smartdoor" />
            </div>
        <div className="locationSelect">
               <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Location:</Form.Label>
          <Form.Control as="select" className="locationWidth" onChange={ (e)=>setp_City(e.target.value) } value = { p_city } >
                     <option value="">Select Location</option>
              {getPropertyCityData.data.length>0?
                         getPropertyCityData.data.map((c_value, indx) => (
                  <option key={ indx } value={ c_value }>{c_value}</option>)):null}
                  </Form.Control>
               </Form.Group>
            </div>
         </div>
      );
   };

   return (
      <>
         <div className="tableBox mb-5">
            {/* <Route path="/admin/user-management/user-details" name="Admin Dashboard" component={ModalModule} /> */}
            <TableTitle /> 
            <DataTableComponent 
               onChangePage={ onChangePage }
               data={allPropertyData.data}
               columns={columns}
               progressPending={ allPropertyData.isLoading }
               paginationComponent={ PaginationComponent }
               paginationRowsPerPageOptions={[5, 10, 20, 50 ] }
               paginationPerPage={ 10 }
            />
            {
                allPropertyData.isLoading 
                  ? 
               <PaginationActionButton />
             : allPropertyData.data.length ? null : (
               <PaginationActionButton />
            )}
         </div>
      </>
   );
};

// mapStateToProps
const mapStateToProps = ({ allPropertyData,getPropertyCityData }) => ({
   allPropertyData,
   getPropertyCityData,
});

// mapDispatchToProps
const actions = {
   getAllProperties,
   getPropertyCity,
};

export default connect(mapStateToProps, actions)(PropertyModule);
