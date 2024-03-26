/** @format */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import Text from "../../../shared/Text/Text";
import Form from "react-bootstrap/Form";
import Buttons from "../../../shared/Buttons/Buttons";
import "./NonSDProperties.scss";
import { getNonSDProperties, getAllCity, getLocationByCity, getAllCityWithId, getAllStateWithId } from "../../../common/redux/actions";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import Pagination from "../../../shared/DataTable/Pagination";
import { formateDate, getLocalStorage, showErrorToast, ToolTip } from "../../../common/helpers/Utils";
import { approveProperty } from "../../../common/redux/actions";
import { Link } from "react-router-dom";
import contentIco from "../../../assets/images/content-ico.svg";
import Image from "../../../shared/Image/Image";
import SearchInput from "../../../shared/Inputs/SearchInput/SearchInput";
import * as Actions from '../../../common/redux/types';
import ListingDataTable from "../../../shared/DataTable/ListingDataTable";
import Input from "../../../shared/Inputs/Input/Input";

const NonSDProperties = (props) => {
   const userData = getLocalStorage("authData");
   const { getNonSDProperties, allNonSDProperties, getAllCity, allCities, getAllCityWithId, getAllStateWithId, allCitiesWithId, getLocationByCity, allStatesWithId } = props;
   const data = useSelector(state => state.allNonSDProperties.data);

   const dispatch = useDispatch();
   const [fromDate, setFromDate] = useState(data.length !== 0 ? allNonSDProperties?.data?.fromDate : null);
   const [toDate, setToDate] = useState(data.length !== 0 ? allNonSDProperties?.data?.toDate : null);
   const [filterText, setFilterText] = React.useState(data.length !== 0 ? allNonSDProperties?.data?.searchStr : '');
   const [propertyIdText, setPropertyIdText] = React.useState(data.length !== 0 ? allNonSDProperties?.data?.propertyId : "");
   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
   const [p_state, setp_state] = useState(data.length !== 0 ? allNonSDProperties?.data?.pState : "");
   const [p_city, setPCity] = useState(data.length !== 0 ? allNonSDProperties?.data?.city : '');
   const [p_location, setp_Location] = useState(data.length !== 0 ? allNonSDProperties?.data?.location : "");
   const [locationsData, setLocationsData] = useState([]);
   const [zipCode, setzipCode] = useState("");
   const [currentPage, setCurrentPage] = useState(data.length !== 0 ? allNonSDProperties?.data?.currentPage : 1);
   const [rowsPerPage, setRowsPerPage] = useState(data.length !== 0 ? allNonSDProperties?.data?.rowsPerPage : 8);
   let recordsPerPage = (data.length !== 0 ? allNonSDProperties?.data?.rowsPerPage : 8);
   const recordSize = (allNonSDProperties?.data?.records);
   const [defaultSort, setDefaultSort] = useState(data.length !== 0 ? allNonSDProperties?.data?.defaultSort : false);
   const [defaultSortId, setDefaultSortId] = useState(data.length !== 0 ? allNonSDProperties?.data?.defaultSortId : 'propertyId');
   const [defaultSortFieldId, setDefaultSortFieldId] = useState(() => {
      if (allNonSDProperties?.data?.defaultSortId === 'propertyId') {
         return 1
      }
      else {
         return 2
      }
   });

   useEffect(() => {
      // getAllCity();

      if (data.length === 0 || localStorage.getItem('autoRefresh') === 'Yes') {
         getAllStateWithId();
         // getAllCityWithId({smartdoorServiceStatus: null, stateId: null});
         getNonSDProperties({
            city: '',
            zipcode: '',
            location: '',
            pageSize: rowsPerPage,
            pageNo: currentPage,
            userId: userData.userid,
            searchString: '',
            propertyId: null,
            fromDate: fromDate,
            toDate: toDate,
            defaultSort: defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
         });
         localStorage.setItem('autoRefresh', 'No')
      }
   }, [getNonSDProperties, getAllStateWithId]);

   const validateDates = () => {
      if ((fromDate === null && toDate === null) || (fromDate === '' && toDate === '')) {
         // Both dates are null or empty, so it's considered valid
         return true;
      } else if (fromDate !== null && toDate !== null && fromDate !== '' && toDate !== '') {
         // Both dates are set and not empty, check if start date is less than end date
         if (new Date(fromDate) > new Date(toDate)) {
            showErrorToast("Start date should be less than end date");
            return false;
         } else {
            // Start date is less than end date, valid
            return true;
         }
      } else {
         // Either one of the dates is empty
         showErrorToast("Please enter start date and end date or set both empty");
         return false;
      }
   }

   const handlePageChange = (newPage) => {
      // Handle the page change in the parent component
      setCurrentPage(Number(newPage));
      console.log(currentPage)
      if (!validateDates()) {
         return null;
      }
      const regex = /([^,]+),\s*(\d{6})/;
      const matches = p_location.match(regex);
      if (matches) {
         let zipcode = matches[2]
         getNonSDProperties({
            p_city,
            zipcode,
            p_location,
            pageSize: rowsPerPage,
            pageNo: newPage,
            userId: userData.userid,
            searchString: filterText,
            propertyId: propertyIdText,
            fromDate: fromDate,
            toDate: toDate,
            pState: p_state,
            defaultSort: defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
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
            searchString: filterText,
            propertyId: propertyIdText,
            fromDate: fromDate,
            toDate: toDate,
            pState: p_state,
            defaultSort: defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
         });
      }
   };

   const handleRowsPerPageChange = async (newRowsPerPage) => {
      // console.log(`Rows per page changed to: ${rowsPerPage}`);
      if (!validateDates()) {
         return null;
      }
      const regex = /([^,]+),\s*(\d{6})/;
      const matches = p_location.match(regex);
      setRowsPerPage(Number(newRowsPerPage))
      recordsPerPage = Number(newRowsPerPage)
      if (matches) {
         let zipcode = matches[2]
         getNonSDProperties({
            p_city,
            zipcode,
            p_location,
            pageSize: Number(newRowsPerPage),
            pageNo: currentPage,
            userId: userData.userid,
            searchString: filterText,
            propertyId: propertyIdText,
            fromDate: fromDate,
            toDate: toDate,
            pState: p_state,
            defaultSort: !defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
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
            propertyId: propertyIdText,
            fromDate: fromDate,
            toDate: toDate,
            pState: p_state,
            defaultSort: !defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
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
         <SearchInput onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} placeholder='Search owner name/mobile No.' />
      );
   }, [filterText, resetPaginationToggle]);

   const propertyIdBox = React.useMemo(() => {
      const handleClear = () => {
         if (propertyIdText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setPropertyIdText(null);
         }
      };

      return (
         <Input
            id={'propertyId'}
            placeholder={'Search by Property id'}
            type={'number'}
            value={propertyIdText}
            onInput={(e) => { setPropertyIdText((e.target.value)); console.log(e) }}
            onClear={() => handleClear}
            filterText={propertyIdText}
            showSearch={true}
         />
      );
   }, [propertyIdText, resetPaginationToggle]);

   function handleApproveProperty(propertyId) {
      if (propertyId) {
         approveProperty({ propertyId: propertyId })
            .then((response) => {
               if (response.data && response.data.status === 200) {
                  if (!validateDates()) {
                     return null;
                  }
                  getNonSDProperties({
                     p_city: '',
                     zipcode: '',
                     location: '',
                     pageSize: rowsPerPage,
                     pageNo: 1,
                     userId: userData.userid,
                     searchString: "",
                     propertyId: null,
                     fromDate: fromDate,
                     toDate: toDate,
                     pState: p_state,
                     defaultSort: !defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
                  });
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
         cell: ({ propertyId }) => (
            <ToolTip position="top" style={{ width: '100%' }} name={propertyId}>
               <Text size="Small" color="secondryColor elipsis-text" text={propertyId} />
            </ToolTip>
         ),
         id: 1
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
         ),
         id: 2
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
         cell: ({ houseNumber, societyName, societyAddress, city, state }) => (
            <span className="d-flex">
               {houseNumber} {" , "}
               {societyName} {" , "} {societyAddress}
               {city !== null ? <>{societyAddress.includes(city) ? null : <>{" , "}{city}</>}</> : null}
               {state !== null ? <>{societyAddress.includes(state) ? null : <>{" , "}{state}</>}</> : null}
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

      // {
      //    name: "Approve",
      //    center: true,
      //    cell: (row) => (
      //       <div className="mt-1">
      //          <Buttons
      //             name="Approve"
      //             varient="primary"
      //             size="Small"
      //             style={{ width: "100px", height: "30px", textAlign: "center" }}
      //             color="white"
      //             onClick={() => {
      //                handleApproveProperty(row.propertyId);
      //             }}
      //          />
      //       </div>
      //    ),
      // },
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
                           state: { propertyId: propertyId, userId: postedById, menuName: 'NonSDProperties', isDeleted: false, defaultSort: defaultSort, defaultSortId: defaultSortId },
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

   // const handleSortedData = (newSortedData) => {
   //    // Store sorted data
   //    const { selector, direction } = newSortedData;
   //    let selectorVal = newSortedData?.selector?.toString().split('.');
   //    selectorVal = selectorVal?.length > 1 ? selectorVal[1] : selectorVal[0]
   //    console.log(selectorVal)
   //    // Perform sorting based on selector and direction
   //    const sorted = [...filteredItems].sort((a, b) => {
   //       setDefaultSortFieldId(1)
   //       if (selectorVal === 'propertyId') {
   //          if (defaultSort === true) {
   //             return a[selectorVal] - b[selectorVal]; // Example sorting logic
   //          } else {
   //             return b[selectorVal] - a[selectorVal]; // Example sorting logic for descending order
   //          }
   //       }
   //       else if (selectorVal === 'postedDate') {
   //          setDefaultSortFieldId(2)
   //          const dateA = new Date(a[selectorVal]);
   //          const dateB = new Date(b[selectorVal]);

   //          if (defaultSort === true) {
   //             return dateA - dateB;
   //          } else {
   //             return dateB - dateA;
   //          }
   //       }
   //    });
   //    setDefaultSort(!defaultSort)
   //    // Update sorted data state
   //    console.log(sorted);
   //    filteredItems = [...sorted]
   //    dispatch({
   //       type: Actions.NON_SD_PROPERTIES_SUCCESS,
   //       data: { propertyData: [...sorted], records: recordSize, currentPage: currentPage, rowsPerPage: rowsPerPage, searchStr: filterText, propertyId: propertyIdText, city: p_city, location: p_location, fromDate: fromDate, toDate: toDate, defaultSort: defaultSort, defaultSortId: defaultSortId }
   //    });
   // };
   const handleSortedData = (newSortedData) => {
      let selectorVal = newSortedData?.selector?.toString().split('.');
      selectorVal = selectorVal?.length > 1 ? selectorVal[1] : selectorVal[0]
      setDefaultSort(!defaultSort)
      let defaultSortFlag = !defaultSort
      const sorted = [...filteredItems].sort((a, b) => {
         if (selectorVal === 'propertyId') {
             setDefaultSortFieldId(1);
             return (defaultSortFlag ? 1 : -1) * (a[selectorVal] - b[selectorVal]);
         } else if (selectorVal === 'postedDate') {
             setDefaultSortFieldId(2);
             const dateA = new Date(a[selectorVal]);
             const dateB = new Date(b[selectorVal]);
             return (defaultSortFlag ? 1 : -1) * (dateA - dateB);
         }
     });
      
      dispatch({
         type: Actions.NON_SD_PROPERTIES_SUCCESS,
         data: { propertyData: [...sorted], records: recordSize, currentPage: currentPage, rowsPerPage: rowsPerPage, searchStr: filterText, propertyId: propertyIdText, city: p_city, location: p_location, fromDate: fromDate, toDate: toDate,  defaultSort: defaultSortFlag, defaultSortId: defaultSortId }
      });
      // showData();
   };

   return (
      <>
         <div className="tableBox ">
            <div className="align-items-center tableHeading">
               <div className="d-flex justify-content-between">
                  <div className="text-nowrap mb-2">
                     <Text
                        size="regular"
                        fontWeight="mediumbold"
                        color="secondryColor"
                        text="Approval"
                     />
                  </div>
                  <div className="locationSelect d-flex">
                     <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                           as="select"
                           onChange={(e) => {
                              setp_state(e.target.value);
                              setPCity("");
                              getAllCityWithId({ smartdoorServiceStatus: null, stateId: e.target.value })
                           }}
                           value={p_state}
                        >
                           <option value="">Select State</option>
                           {allStatesWithId?.data?.length > 0
                              ? allStatesWithId?.data?.map((state) => (
                                 <option key={state.id} value={state.id}>
                                    {state.stateName}
                                 </option>
                              ))
                              : null}
                        </Form.Control>
                     </Form.Group>
                     <Form.Group controlId="exampleForm.SelectCustom1">
                        <Form.Control
                           as="select"
                           value={p_city}
                           onChange={(e) => {
                              setLocationsData([]);
                              setPCity(e.target.value);
                              // selectedCity(e.target.value);

                           }}

                        >
                           <option value="">Select City</option>
                           {allCitiesWithId?.data?.length > 0
                              ? allCitiesWithId?.data?.map((city) => (
                                 <option value={city.cityName}>
                                    {city.cityName}
                                 </option>
                              ))
                              : null}
                        </Form.Control>
                     </Form.Group> &nbsp;&nbsp;&nbsp;&nbsp;
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
                     <Form.Group controlId="exampleForm.SelectCustom">
                        {/* <Form.Label>From Date</Form.Label> */}
                        <Form.Control
                           type="date"
                           max={new Date().toISOString().split("T")[0]}
                           placeholder="From Date"
                           value={fromDate}
                           onChange={(e) => {
                              console.log(e.target.value);
                              const selectedDate = new Date(e.target.value);
                              setFromDate(e.target.value)
                           }}
                        />
                     </Form.Group> &nbsp;&nbsp;&nbsp;&nbsp;
                     <Form.Group controlId="exampleForm.SelectCustom">
                        {/* <Form.Label>To Date</Form.Label> */}
                        <Form.Control
                           type="date"
                           max={new Date().toISOString().split("T")[0]}
                           placeholder="To Date"
                           value={toDate}
                           onChange={(e) => {
                              console.log(e.target.value);
                              const selectedDate = new Date(e.target.value);
                              setToDate(e.target.value)
                           }}
                        />
                     </Form.Group>

                  </div>
               </div>
               <div className="locationSelect justify-content-end d-flex mt-2">
                  {propertyIdBox}
                  {subHeaderComponentMemo}
                  <div className="ml-3">
                     <Buttons
                        name="Search"
                        varient="primary"
                        size="Small"
                        color="white"
                        style={{ height: "40px !important" }}
                        onClick={async () => {
                           setCurrentPage(1)
                           const regex = /([^,]+),\s*(\d{6})/;
                           const matches = p_location.match(regex);
                           if (!validateDates()) {
                              return null;
                           }
                           await getNonSDProperties({
                              userId: userData.userid,
                              city: p_city ? p_city : "",
                              pageSize: rowsPerPage,
                              pageNo: 1,
                              zipcode: zipCode ? zipCode : "",
                              location: matches ? matches[1].trim() : "",
                              searchString: filterText,
                              propertyId: propertyIdText,
                              fromDate: fromDate,
                              toDate: toDate,
                              pState: p_state,
                              defaultSort: !defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
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
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handleRowsPerPageChange}
                  paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                  paginationServer={true}
                  filterText={filterText}
                  subHeaderComponent={subHeaderComponentMemo}
                  persistTableHead
                  filterComponent={subHeaderComponentMemo}
                  style={{ height: '20rem' }}
                  onSort={handleSortedData}
                  defaultSort={defaultSort}
                  defaultSortId={defaultSortId}
                  defaultSortFieldId={defaultSortFieldId}
               />
            </div>
         </div>
      </>
   );
};

const mapStateToProps = ({ allNonSDProperties, allCities, allCitiesWithId, allStatesWithId }) => ({
   allNonSDProperties, allCities, allCitiesWithId, allStatesWithId
});

const actions = {
   getNonSDProperties,
   getAllCity,
   getAllCityWithId,
   getAllStateWithId,
   getLocationByCity
};

const withConnect = connect(mapStateToProps, actions);

export default connect(mapStateToProps, actions)(NonSDProperties);
