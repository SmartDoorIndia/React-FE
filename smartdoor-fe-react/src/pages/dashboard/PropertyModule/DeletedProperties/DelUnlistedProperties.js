import React, { useState } from "react";
import {
   formateDate,
   getLocalStorage,
   ToolTip,
   handleStatusElement,
   showErrorToast,
} from "../../../../common/helpers/Utils";
import CONSTANTS_STATUS from "../../../../common/helpers/ConstantsStatus";
import {
   getAllDeletedProperties,
   getPropertyCity,
   getLocationByCity,
   getAllCity,
   getAllCityWithId,
   getAllStateWithId
} from "../../../../common/redux/actions";
import Pagination from "../../../../shared/DataTable/Pagination";
import SearchInput from "../../../../shared/Inputs/SearchInput/SearchInput";
import Image from "../../../../shared/Image/Image";
import docIcon from "../../../../assets/images/doc-icon.png"
import contentIco from "../../../../assets/images/content-ico.svg"
import { useEffect } from "react";
import { Link, Route } from "react-router-dom/cjs/react-router-dom";
import ModalModule from "../../../../shared/Modal/ModalModule";
import Text from "../../../../shared/Text/Text";
import { Form } from "react-bootstrap";
import Buttons from "../../../../shared/Buttons/Buttons";
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import { connect, useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import * as Actions from '../../../../common/redux/types';
import "./property.scss";
import Input from "../../../../shared/Inputs/Input/Input";

const DeletedProperties = (props) => {
   const {
      getAllDeletedProperties,
      deletedPropertyData,
      getPropertyCity,
      getAllCity,
      getAllCityWithId,
      allCities,
      allCitiesWithId,
      getLocationByCity,
      getAllStateWithId,
      allStatesWithId
   } = props;
   const dispatch = useDispatch();
   const userData = getLocalStorage("authData");
   const data = useSelector(state => state.deletedPropertyData.data);
   const [p_state, setp_state] = useState(data.length !== 0 ? deletedPropertyData?.data?.pState : "");
   const [p_city, setp_City] = useState(data.length !== 0 ? deletedPropertyData?.data?.city : "");
   const [p_location, setp_Location] = useState(data.length !== 0 ? deletedPropertyData?.data?.location : "");
   const [locationsData, setLocationsData] = useState([]);
   const [zipCode, setzipCode] = useState("");

   //state: for managing the status filter.
   const statusArr = CONSTANTS_STATUS.propertyStatusArr;
   const [statusSelected, setStatusSelected] = useState(data.length !== 0 ? deletedPropertyData?.data?.propertyStatus : "");

   const propertyType = CONSTANTS_STATUS.propertyType;
   const [typeSelected, setTypeSelected] = useState(() => {
      if (deletedPropertyData?.data?.smartLockProperty === true) {
         return 'SMARTDOOR';
      } else if (deletedPropertyData?.data?.smartLockProperty === false) {
         return 'NON SMARTDOOR';
      } else {
         return null;
      }
   });

   const [fromDate, setFromDate] = useState(data.length !== 0 ? deletedPropertyData?.data?.fromDate : null);
   const [toDate, setToDate] = useState(data.length !== 0 ? deletedPropertyData?.data?.toDate : null);
   const [filterText, setFilterText] = React.useState(data.length !== 0 ? deletedPropertyData?.data?.searchStr : "");
   const [propertyIdText, setPropertyIdText] = React.useState(data.length !== 0 ? deletedPropertyData?.data?.propertyId : "");
   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
   const [defaultSort, setDefaultSort] = useState(data.length !== 0 ? deletedPropertyData?.data?.defaultSort : false);
   const [defaultSortId, setDefaultSortId] = useState(data.length !== 0 ? deletedPropertyData?.data?.defaultSortId : 'propertyId');
   const [defaultSortFieldId, setDefaultSortFieldId] = useState(() => {
      if(deletedPropertyData?.data?.defaultSortId === 'propertyId') {
         return 1
      }
      else {
         return 2
      }
      });

   const columns = [
      {
         name: "Id",
         selector: "propertyId",
         sortable: true,
         center: true,
         cell: ({ propertyId }) => (
            <ToolTip position="top" style={{ width: '100%' }} name={propertyId}>
              <Text size="Small" color="secondryColor elipsis-text" text={propertyId} />
            </ToolTip>
          ),
          id:1
      },
      {
         name: "Added On",
         selector: ((row) => row.postedDate),
         sortable: true,
         center: true,
         maxWidth: "120px",
         style: { padding: "0 !important" },
         cell: ({ postedDate }) => <span>{`${formateDate(postedDate)}` || ""}</span>,
         id:2
      },
      {
         name: "Owner",
         // selector: "ownerName",
         sortable: false,
         sortable: false,
         center: true,
         minWidth: "150px",
         style: { padding: "0 !important" },
         cell: ({ ownerName, postedByName }) =>
            <span>{ownerName !== null ? <>{ownerName}</> : <>{postedByName}</>}</span>
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
         name: "Location",
         sortable: false,
         wrap: true,
         style: { padding: "0 !important" },
         center: true,
         minWidth: "180px",
         cell: ({ houseNumber, societyName, societyAddress, city, state }) => (
            <span>
               {houseNumber} {" , "}
               {societyName}
               {" , "}
               {societyAddress}
               {city !== null ? <>{societyAddress.includes(city) ? null : <>{" , "}{city}</>}</> : null}
               {state !== null ? <>{societyAddress.includes(state) ? null : <>{" , "}{state}</>}</> : null}
            </span>
         ),
      },
      {
         name: "Type",
         selector: "propertyType",
         sortable: false,
         center: true,
         maxWidth: "130px",
         style: { padding: "0 !important" },
      },
      {
         name: "Status",
         sortable: false,
         center: true,
         maxWidth: "120px",
         style: { padding: "0 !important" },
         cell: ({ status }) => <span>{handleStatusElement(status)}</span>,
      },
      {
         name: "Assets",
         selector: (row) => row.propertyId,
         sortable: false,
         center: true,
         maxWidth: "30px",
         cell: ({ row, propertyId, propertyDocsResp }) => (
            <Link
               className="dociconSpace"
               to={{
                  pathname: "/admin/property/property-documents",
                  state: {
                     propertyId: propertyId,
                     propertyDocsResp: propertyDocsResp,
                     userId: userData.userid,
                  },
               }}
            >
               <Image name="docIcon" alt="doc icon" src={docIcon} />
            </Link>
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
                           pathname: "/admin/deleted-unlisted-property/view-property",
                           state: { propertyId: propertyId, userId: userData.userid, menuName: 'DeletedProperties', isDeleted: true, defaultSort: defaultSort, defaultSortId: defaultSortId },
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
   const [currentPage, setCurrentPage] = useState(data.length !== 0 ? deletedPropertyData?.data?.currentPage : 1);
   const [rowsPerPage, setRowsPerPage] = useState(data.length !== 0 ? deletedPropertyData?.data?.rowsPerPage : 8);
   let recordsPerPage = (data.length !== 0 ? deletedPropertyData?.data?.rowsPerPage : 8);
   const recordSize = (deletedPropertyData?.data?.records);

   const handlePageChange = (newPage) => {
      // Handle the page change in the parent component
      setCurrentPage(Number(newPage));
      console.log(currentPage)
      if (!validateDates()) {
         return null;
      }
      let type = null
      if (typeSelected === 'SMARTDOOR') {
         type = true
      } else if (typeSelected === 'NON SMARTDOOR') {
         type = false
      }
      const regex = /([^,]+),\s*(\d{6})/;
      const matches = p_location.match(regex);
      if (matches) {
         let zipcode = matches[2]
         getAllDeletedProperties({
            p_city,
            zipcode,
            p_location,
            pageSize: rowsPerPage,
            pageNo: newPage,
            userId: userData.userid,
            searchString: filterText,
            propertyId: propertyIdText,
            fromDate: fromDate,
            smartLockProperty: type,
            propertyStatus: statusSelected,
            toDate: toDate,
            pState: p_state,
            defaultSort: defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
         });
      } else {
         let zipcode = ""
         let location = ""
         getAllDeletedProperties({
            p_city,
            zipcode,
            location,
            pageSize: rowsPerPage,
            pageNo: newPage,
            userId: userData.userid,
            searchString: filterText,
            propertyId: propertyIdText,
            fromDate: fromDate,
            smartLockProperty: type,
            propertyStatus: statusSelected,
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
      let type = null
      if (typeSelected === 'SMARTDOOR') {
         type = true
      } else if (typeSelected === 'NON SMARTDOOR') {
         type = false
      }
      const regex = /([^,]+),\s*(\d{6})/;
      const matches = p_location.match(regex);
      setRowsPerPage(Number(newRowsPerPage))
      recordsPerPage = Number(newRowsPerPage)
      if (matches) {
         let zipcode = matches[2]
         getAllDeletedProperties({
            p_city,
            zipcode,
            p_location,
            pageSize: Number(newRowsPerPage),
            pageNo: currentPage,
            userId: userData.userid,
            searchString: filterText,
            propertyId: propertyIdText,
            fromDate: fromDate,
            smartLockProperty: type,
            propertyStatus: statusSelected,
            toDate: toDate,
            pState: p_state,
            defaultSort: !defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
         });
      } else {
         let zipcode = ""
         let location = ""
         getAllDeletedProperties({
            p_city,
            zipcode,
            location,
            pageSize: newRowsPerPage,
            pageNo: currentPage,
            userId: userData.userid,
            searchString: filterText,
            propertyId: propertyIdText,
            fromDate: fromDate,
            smartLockProperty: type,
            propertyStatus: statusSelected,
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

   const PaginationComponent = (props) => (
      <Pagination {...props}
         rowCount={recordSize}
         rowsPerPage={recordsPerPage}
         onChangeRowsPerPage={handleRowsPerPageChange}
         currentPage={currentPage}
         onChangePage={handlePageChange}
         PaginationActionButton={PaginationActionButton} />
   );

   useEffect(() => {
      // getPropertyCity();
      //   getAllCity();
      if (data.length === 0 || props?.location?.state?.autoRefresh === true) {
         getAllStateWithId();
         // getAllCityWithId({smartdoorServiceStatus: null, stateId: null})
         getAllDeletedProperties({
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
            pState: p_state,
            defaultSort: defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
         });
      }
   }, [getPropertyCity, getAllStateWithId]);

   const _filterData = (city, locationData) => {
      console.log(city, locationData, "location filter data");
      let data = locationData;
      const regex = /([^,]+),\s*(\d{6})/;
      const matches = data.match(regex);
      if (matches) {
         console.log("inside match");
         const location = matches[1].trim();
         setp_Location(location);
         const zipcode = matches[2];
         setzipCode(zipcode);
         console.log(location, zipcode, "data for filter");
         // getAllDeletedProperties({
         //     city,
         //     zipcode,
         //     location,
         //     pageSize: "",
         //     pageNo: "",
         //     userId: userData.userid,
         // });
      }
      if (locationData == "") {
         let location = "";
         let zipcode = "";
         console.log("outside match");
         // getAllDeletedProperties({
         //     city,
         //     zipcode,
         //     location,
         //     pageSize: "",
         //     pageNo: "",
         //     userId: userData.userid,
         // });
      }
   };

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
            onClear={handleClear}
            filterText={filterText}
            placeholder="Search owner name/mobile No."
         />
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
            onInput={(e) => {setPropertyIdText((e.target.value)); console.log(e)}}
            onClear={() => handleClear}
            filterText={propertyIdText}
            showSearch={true}
         />
      );
   }, [propertyIdText, resetPaginationToggle]);

   let filteredItems = [];

   filteredItems = deletedPropertyData?.data?.propertyData?.length
      ? deletedPropertyData?.data?.propertyData
      // .filter((item) => {
      //     return (
      //         item?.propertyId == filterText ||
      //         item?.postedDate?.toLowerCase().includes(filterText.toLowerCase()) ||
      //         item?.propertyType?.toLowerCase().includes(filterText.toLowerCase()) ||
      //         item.societyName.toLowerCase().includes(filterText.toLowerCase()) ||
      //         item.societyAddress.toLowerCase().includes(filterText.toLowerCase())
      //     );
      // })
      : [];

   const showData = (status_value) => {
      let status = status_value || statusSelected;
      let filterItems = [];
      filterItems = deletedPropertyData?.data?.propertyData
      // if (status && filteredItems.length) {
      //     filteredItems = filteredItems.filter((item) => {
      //         return item?.status.toUpperCase() == status.toUpperCase();
      //     });
      // }
      return filterItems;
   };

   const showProperty = (status_value) => {
      let status = status_value || typeSelected;
      let property = typeSelected === "SMARTDOOR" ? true : false;

      // if (status && filteredItems.length) {
      //     filteredItems = filteredItems.filter((item) => {
      //         return item?.smartDoorProperty === property;
      //     });
      // }
      return filteredItems;
   };

   const _filterStatus = (status_value) => {
      setStatusSelected(status_value);
      showData(status_value);
   };

   const _filterPropertyType = (status_value) => {
      setTypeSelected(status_value);
      showProperty(status_value);
   };

   // const handleSortedData = (newSortedData) => {
   //    // Store sorted data
   //    const { selector, direction } = newSortedData;
   //    let selectorVal = newSortedData?.selector?.toString().split('.');
   //    selectorVal = selectorVal?.length > 1 ? selectorVal[1] : selectorVal[0]
   //    console.log(selectorVal)
   //    // Perform sorting based on selector and direction
   //    const sorted = [...filteredItems].sort((a, b) => {
   //       if (selectorVal === 'propertyId') {
   //          setDefaultSortFieldId(1)
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
   //       type: Actions.DELETED_PROPERTY_DATA_SUCCESS,
   //       data: { propertyData: [...sorted], records: recordSize, currentPage: currentPage, rowsPerPage: rowsPerPage, searchStr: filterText, propertyId: propertyIdText, city: p_city, location: p_location, smartLockProperty: typeSelected, propertyStatus: statusSelected, fromDate: fromDate, toDate: toDate }
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
         type: Actions.DELETED_PROPERTY_DATA_SUCCESS,
         data: { propertyData: [...sorted], records: recordSize, currentPage: currentPage, rowsPerPage: rowsPerPage, searchStr: filterText, propertyId: propertyIdText, city: p_city, location: p_location, smartLockProperty: typeSelected, propertyStatus: statusSelected, fromDate: fromDate, toDate: toDate,  defaultSort: defaultSortFlag, defaultSortId: defaultSortId }
      });
      // showData();
   };

   return (
      <>
         <div className="tableBox">
            <Route
               path="/admin/user-management/user-details"
               name="Admin Dashboard"
               component={ModalModule}
            />
            {/* <TableTitle /> */}
            <div className=" align-items-center tableHeading">
               <div className="d-flex justify-content-between ">
                  <div>
                     <Text
                        size="regular"
                        fontWeight="mediumbold"
                        color="secondryColor"
                        text="Deleted/Unlisted Properties"
                     />
                  </div>
                  <div className="locationSelect d-flex">
                     <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                           as="select"
                           onChange={(e) => {
                              setp_state(e.target.value);
                              setp_City("");
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
                     <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                           as="select"
                           onChange={(e) => {
                              setLocationsData([]);
                              setp_City(e.target.value);
                              setp_Location("");
                              _filterData(e.target.value, "");
                              //   if (e.target.value.length) {
                              //      getLocationByCity({ city: e.target.value })
                              //         .then((res) => {
                              //            if (res.data && res.data.status === 200) {
                              //               const locationsByCity = res.data.resourceData.locations.map(
                              //                  (loc) => {
                              //                     return {
                              //                        ...loc,
                              //                        location: `${loc.location} ,${loc.pinCode}`,
                              //                     };
                              //                  }
                              //               );
                              //               setLocationsData(locationsByCity);
                              //            }
                              //         })
                              //         .catch((err) => console.log("err:", err));
                              //   }
                           }}
                           value={p_city}
                        >
                           <option value="">Select City</option>
                           {allCitiesWithId?.data?.length > 0
                              ? allCitiesWithId?.data?.map((city) => (
                                 <option key={city.cityId} value={city.cityName}>
                                    {city.cityName}
                                 </option>
                              ))
                              : null}
                        </Form.Control>
                     </Form.Group>
                     {/* <Form.Group controlId="exampleForm.SelectCustom" className="loc-input">
                           <Form.Control
                              as="select"
                              value={p_location}
                              onChange={(e) => {
                                 _filterData(p_city, e.target.value);
                                 setp_Location(e.target.value);
                              }}
                              className="locationWidth"
                           >
                              <option value="">Select Location</option>
                              {locationsData && locationsData.length
                                 ? locationsData.map((_value, index) => (
                                       <option key={_value.pinCode} value={_value.location}>
                                          {_value.location}
                                       </option>
                                    ))
                                 : null}
                           </Form.Control>
                        </Form.Group> */}
                     {propertyType.length ? (
                        <Form.Group controlId="exampleForm.SelectCustom">
                           <Form.Control
                              as="select"
                              value={typeSelected}
                              onChange={(e) => {
                                 _filterPropertyType(e.target.value);
                              }}
                           >
                              <option value="">Select Property Type</option>
                              {propertyType.length
                                 ? propertyType.map((_value, index) => (
                                    <option key={index} value={_value}>
                                       {_value}
                                    </option>
                                 ))
                                 : null}
                           </Form.Control>
                        </Form.Group>
                     ) : (
                        ""
                     )}
                     {statusArr.length ? (
                        <Form.Group controlId="exampleForm.SelectCustom">
                           <Form.Control
                              as="select"
                              value={statusSelected}
                              onChange={(e) => {
                                 _filterStatus(e.target.value);
                              }}
                           >
                              <option value="">Select Status</option>
                              {statusArr.length
                                 ? statusArr.map((_value, index) => (
                                    <option key={index} value={_value}>
                                       {_value}
                                    </option>
                                 ))
                                 : null}
                           </Form.Control>
                        </Form.Group>
                     ) : (
                        ""
                     )}
                  </div>
               </div>
               <div className="locationSelect justify-content-end d-flex mt-2">
                  {propertyIdBox} &nbsp;&nbsp;&nbsp;&nbsp;
                  {subHeaderComponentMemo} &nbsp;&nbsp;&nbsp;&nbsp;
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
                  <div className="ml-3">
                     <Buttons
                        name="Search"
                        varient="primary"
                        size="Small"
                        color="white"
                        style={{ height: "40px !important" }}
                        onClick={() => {
                           setCurrentPage(1)
                           let type = null
                           if (typeSelected === 'SMARTDOOR') {
                              type = true
                           } else if (typeSelected === 'NON SMARTDOOR') {
                              type = false
                           }
                           if (!validateDates()) {
                              return null;
                           }
                           const regex = /([^,]+),\s*(\d{6})/;
                           const matches = p_location.match(regex);
                           getAllDeletedProperties({
                              userId: userData.userid,
                              city: p_city ? p_city : "",
                              pageSize: rowsPerPage,
                              pageNo: currentPage,
                              zipcode: zipCode ? zipCode : "",
                              location: matches ? matches[1].trim() : "",
                              searchString: filterText,
                              propertyId: propertyIdText,
                              smartLockProperty: type,
                              propertyStatus: statusSelected,
                              fromDate: fromDate,
                              toDate: toDate,
                              pState: p_state,
                              defaultSort: defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
                           });
                        }}
                     />
                  </div>
               </div>
            </div>
            <div className="propertiesTableWrapper">
               <DataTableComponent
                  // onChangePage={ onChangePage }
                  data={showData()}
                  columns={columns}
                  progressPending={deletedPropertyData.isLoading}
                  paginationComponent={PaginationComponent}
                  paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                  paginationPerPage={recordsPerPage}
                  currentPage={currentPage}
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handleRowsPerPageChange}
                  perPageOptions={[4, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                  filterText={filterText}
                  paginationServer={true}
                  subHeaderComponent={subHeaderComponentMemo}
                  persistTableHead
                  filterComponent={subHeaderComponentMemo}
                  onSort={handleSortedData}
                  defaultSort={defaultSort}
                  defaultSortId={defaultSortId}
                  defaultSortFieldId={defaultSortFieldId}
               />
            </div>
            {deletedPropertyData.isLoading ? (
               <PaginationActionButton />
            ) : deletedPropertyData?.data?.propertyData?.length ? null : (
               <PaginationActionButton />
            )}
         </div>
      </>
   );
}

const mapStateToProps = ({ deletedPropertyData, getPropertyCityData, allCities, allCitiesWithId, allStatesWithId }) => ({
   deletedPropertyData,
   getPropertyCityData,
   allCities,
   allCitiesWithId,
   allStatesWithId
});

// mapDispatchToProps
const actions = {
   getAllDeletedProperties,
   getPropertyCity,
   getAllCity,
   getAllCityWithId,
   getAllStateWithId,
   getLocationByCity,
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect)(DeletedProperties);