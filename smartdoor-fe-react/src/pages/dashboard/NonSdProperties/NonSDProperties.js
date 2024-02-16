/** @format */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import Text from "../../../shared/Text/Text";
import Form from "react-bootstrap/Form";
import Buttons from "../../../shared/Buttons/Buttons";
import "./NonSDProperties.scss";
import { getNonSDProperties, getAllCity, getLocationByCity } from "../../../common/redux/actions";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import Pagination from "../../../shared/DataTable/Pagination";
import { formateDate, getLocalStorage, ToolTip } from "../../../common/helpers/Utils";
import { approveProperty } from "../../../common/redux/actions";
import { Link } from "react-router-dom";
import contentIco from "../../../assets/images/content-ico.svg";
import Image from "../../../shared/Image/Image";
import SearchInput from "../../../shared/Inputs/SearchInput/SearchInput";
import ListingDataTable from "../../../shared/DataTable/ListingDataTable";


const NonSDProperties = (props) => {
   const userData = getLocalStorage("authData");
   const { getNonSDProperties, allNonSDProperties, getAllCity, allCities, getLocationByCity } = props;
   useEffect(() => {
      getAllCity();

      getNonSDProperties({
         city : '',
         zipcode : '',
         location : '',
         pageSize: rowsPerPage,
         pageNo: currentPage,
         userId: userData.userid,
         searchString:'',
      });
   }, [getNonSDProperties, getAllCity]);
   const data = useSelector(state => state.allNonSDProperties.data);
   const [filterText, setFilterText] = React.useState(data.length !== 0 ? allNonSDProperties?.data?.searchStr :'');
   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
   const [p_city, setPCity] = useState(data.length !== 0 ? allNonSDProperties?.data?.city : '');
   const [p_location, setp_Location] = useState(data.length !== 0 ? allNonSDProperties?.data?.location : "");
   const [locationsData, setLocationsData] = useState([]);
   const [zipCode, setzipCode] = useState("");
   const [currentPage, setCurrentPage] = useState(data.length !== 0 ? allNonSDProperties?.data?.currentPage : 1);
   const [rowsPerPage, setRowsPerPage] = useState(data.length !== 0 ? allNonSDProperties?.data?.rowsPerPage : 8);
   let recordsPerPage = (data.length !== 0 ? allNonSDProperties?.data?.rowsPerPage : 8);
   const recordSize = (allNonSDProperties?.data?.records);

   const handlePageChange = (newPage) => {
      // Handle the page change in the parent component
      setCurrentPage(Number(newPage));
      console.log(currentPage)

      const regex = /([^,]+),\s*(\d{6})/;
      const matches = p_location.match(regex);
      if(matches) {
         let zipcode = matches[2]
         getNonSDProperties({
            p_city,
            zipcode,
            p_location,
            pageSize: rowsPerPage,
            pageNo: newPage,
            userId: userData.userid,
            searchString: filterText
         });
      } else {
         let zipcode = ""
         let location = ""
         getNonSDProperties({
            p_city,
            zipcode,
            location,
            pageSize: rowsPerPage,
            pageNo: newPage,
            userId: userData.userid,
            searchString: filterText
         });
      }
   };

   const handleRowsPerPageChange = async (newRowsPerPage) => {
      // console.log(`Rows per page changed to: ${rowsPerPage}`);
      
      const regex = /([^,]+),\s*(\d{6})/;
      const matches = p_location.match(regex);
      setRowsPerPage(Number(newRowsPerPage))
      recordsPerPage = Number(newRowsPerPage)
      if(matches) {
         let zipcode = matches[2]
         getNonSDProperties({
            p_city,
            zipcode,
            p_location,
            pageSize: Number(newRowsPerPage),
            pageNo: currentPage,
            userId: userData.userid,
            searchString: filterText,
         });
      } else {
         let zipcode = ""
         let location = ""
         getNonSDProperties({
            p_city,
            zipcode,
            location,
            pageSize: newRowsPerPage,
            pageNo: currentPage,
            userId: userData.userid,
            searchString: filterText,
         });
      }
    };

   const PaginationActionButton = () => (
      <div className="d-flex justify-content-center tableBottom">
         {/* <Link to="/admin/property/new-property"><Buttons name="Add New Property" varient="primary" type="submit" size="Small" color="white" /></Link> */}
      </div>
   );
   const PaginationComponent = (props) => 
   (
      <Pagination {...props}
      rowCount={recordSize} 
      rowsPerPage={recordsPerPage}
      onChangeRowsPerPage={handleRowsPerPageChange} 
      currentPage={currentPage} 
      onChangePage={handlePageChange}
      PaginationActionButton={PaginationActionButton} />
   );
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
                  getNonSDProperties({
                     p_city: '',
                     zipcode: '',
                     location:'',
                     pageSize: rowsPerPage,
                     pageNo: 1,
                     userId: userData.userid,
                     searchString: "",});
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
      // {
      //    name: "Mobile",
      //    // selector: "ownerName",
      //    center: true,
      //    minWidth: "180px",
      //    cell: ({ ownerMobile, posetdByMobile }) => (
      //       <span>{ownerMobile === null ? <>{ownerMobile}</> : <>{posetdByMobile}</>}</span>
      //    )
      // },
      {
         name: "Location",
         // selector: "planName",
         center: true,
         minWidth: "250px",
         wrap: true,
         style: { minHeight: 'fit-content' },
         cell: ({ houseNumber, societyName, societyAddress }) => (
            <span className="d-flex">
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
         cell: ({ row, propertyId, postedById }) => (
            <div className="action">
               <ToolTip position="left" name="View Details">
                  <span>
                     <Link
                        to={{
                           pathname: "/admin/property/property-details",
                           state: { propertyId: propertyId, userId: postedById, menuName: 'NonSDProperties', isDeleted : false },
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

   let filteredItems = (allNonSDProperties?.data?.propertyData?.length
      ? allNonSDProperties?.data?.propertyData.filter((item) => {
         return item.propertyId || item.propertyType;
      })
      : []);

   const showData = (city) => {
      let filterItems = [];
      filterItems = allNonSDProperties?.data?.propertyData
      // filterItems = allNonSDProperties?.data?.propertyData?.length ?
      // allNonSDProperties?.data?.propertyData.filter(item => {
      //       return item?.propertyId === filterText ||
      //          item?.ownerMobile?.includes(filterText) ||
      //          item?.posetdByMobile?.includes(filterText) ||
      //          item?.ownerName?.toLowerCase().includes(filterText.toLowerCase()) ||
      //          item?.postedByName?.toLowerCase().includes(filterText.toLowerCase())
      //    }) : [];
      // if (p_city && filterItems.length) {
      //    let filterCities = []
      //    filterItems.forEach(element => {
      //       if (element?.societyAddress?.toLowerCase()?.includes(p_city?.toLowerCase())) {
      //          filterCities.push(element)
      //       }
      //    })
      //    filterItems = filterCities;
      //    if (p_location && filterItems.length) {
      //       let data = p_location;
      //       const regex = /([^,]+),\s*(\d{6})/;
      //       const matches = data.match(regex);
      //       let filterLocation = []
      //       filterItems.forEach(element => {
      //          if (element?.societyAddress?.toLowerCase()?.includes((matches[1]?.trim())?.toLowerCase())) {
      //             console.log(matches[1])
      //             filterLocation.push(element)
      //          }
      //       })
      //       filterItems = filterLocation;
      //    }
      // }
      return filterItems;
   }

   const selectedCity = (city) => {
      setPCity(city)
      showData(city);
      getLocationByCity({ city: city })
         .then((res) => {
            if (res.data && res.data.status === 200) {
               const locationsByCity = res?.data?.resourceData?.locations?.map(
                  (loc) => {
                     return {
                        ...loc,
                        location: `${loc.id} ,${loc.location} ,${loc.pinCode}`,
                     };
                  }
               );
               setLocationsData(locationsByCity);
            }
         })
         .catch((err) => console.log("err:", err));
   }

   const setSelectedLocation = (location) => {
      setp_Location(location);
      showData()
   }

   return (
      <>
         <div className="tableBox ">
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
                  <Form.Group controlId="exampleForm.SelectCustom1">
                     <Form.Control
                        as="select"
                        value={p_city}
                        onChange={(e) => {
                           setLocationsData([]);
                           selectedCity(e.target.value);

                        }}

                     >
                        <option value="">Select City</option>
                        {allCities?.data?.cities?.length > 0
                           ? allCities?.data?.cities.map((c_value) => (
                              <option value={c_value}>
                                 {c_value}
                              </option>
                           ))
                           : null}
                     </Form.Control>
                  </Form.Group>
                  {/* <Form.Group controlId="exampleForm.SelectCustom2" className="loc-input">
                     <Form.Control
                        as="select"
                        value={p_location}
                        onChange={(e) => {
                           setSelectedLocation(e.target.value);
                        }}
                        className="locationWidth"
                     >
                        <option value="">Select Location</option>
                        {locationsData && locationsData.length
                           ? locationsData.map((_value, index) => (
                              <option key={_value.id} value={_value.location}>
                                 {_value.location}
                              </option>
                           ))
                           : null}
                     </Form.Control>
                  </Form.Group> */}
                  <div className="ml-3">
                     <Buttons
                        name="Search"
                        varient="primary"
                        size="Small"
                        color="white"
                        style={{height: "40px !important" }}
                        onClick={async() => {
                           setCurrentPage(1)
                           const regex = /([^,]+),\s*(\d{6})/;
                           const matches = p_location.match(regex);
                           await getNonSDProperties({
                              userId: userData.userid,
                              city: p_city ? p_city : "",
                              pageSize: rowsPerPage,
                              pageNo: 1,
                              zipcode: zipCode ? zipCode : "",
                              location: matches ? matches[1].trim() : "",
                              searchString: filterText,
                           });
                           // setRecordSize(allPropertyData?.data?.propertyData?.length)
                        }}
                     />
                  </div>
               </div>
            </div>

            <div className="NonSDPropertiesTable">
               <DataTableComponent
                  data={showData()}
                  columns={columns}
                  progressPending={allNonSDProperties.isLoading}
                  paginationComponent={PaginationComponent}
                  perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                  paginationPerPage={recordsPerPage}
                  currentPage={currentPage}
                  onChangePage={ handlePageChange }
                  onChangeRowsPerPage={ handleRowsPerPageChange }
                  paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                  // progressComponent={ProgressComponent}
                  style={{ height: '20rem' }}
               />
            </div>
         </div>
      </>
   );
};

const mapStateToProps = ({ allNonSDProperties, allCities }) => ({
   allNonSDProperties, allCities
});

const actions = {
   getNonSDProperties,
   getAllCity,
   getLocationByCity
};

const withConnect = connect(mapStateToProps, actions);

export default connect(mapStateToProps, actions)(NonSDProperties);
