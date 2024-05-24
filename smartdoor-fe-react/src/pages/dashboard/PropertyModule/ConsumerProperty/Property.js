/** @format */

import React, { useEffect, useRef, useState } from "react";
import { Route } from "react-router-dom";
import Image from "../../../../shared/Image/Image";
import Text from "../../../../shared/Text/Text";
import { Link } from "react-router-dom";
import contentIco from "../../../../assets/images/content-ico.svg";
import Form from "react-bootstrap/Form";
import {
   getAllProperties,
   getPropertyCity,
   getLocationByCity,
   getAllCity,
   getAllCityWithId,
   getAllStateWithId
} from "../../../../common/redux/actions";
import { connect, useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import Pagination from "../../../../shared/DataTable/Pagination";
import Buttons from "../../../../shared/Buttons/Buttons";
import docIcon from "../../../../assets/svg/doc.svg";
import * as Actions from '../../../../common/redux/types';
import "./property.scss";

import {
   formateDate,
   getLocalStorage,
   ToolTip,
   handleStatusElement,
   showErrorToast,
} from "../../../../common/helpers/Utils";
import ModalModule from "../../../../shared/Modal/ModalModule";
import Input from "../../../../shared/Inputs/Input/Input";
import SearchInput from "../../../../shared/Inputs/SearchInput/SearchInput";
import CONSTANTS_STATUS from "../../../../common/helpers/ConstantsStatus";
import { useCallback } from "react";
import { TableLoader } from "../../../../common/helpers/Loader";

const PropertyModule = (props) => {
   const {
      getAllProperties,
      allPropertyData,
      getPropertyCity,
      // getAllCity,
      getAllCityWithId,
      getAllStateWithId,
      // getPropertyCityData,
      // allCities,
      allCitiesWithId,
      allStatesWithId,
      getLocationByCity,
   } = props;
   const dispatch = useDispatch();
   const data = useSelector(state => state.allPropertyData.data);
   const userData = getLocalStorage("authData");
   const [p_state, setp_state] = useState(data.length !== 0 ? allPropertyData?.data?.pState : "");
   const [p_city, setp_City] = useState(data.length !== 0 ? allPropertyData?.data?.city : "");
   const [p_location, setp_Location] = useState(data.length !== 0 ? allPropertyData?.data?.location : "");
   const [locationsData, setLocationsData] = useState([]);
   const [zipCode, setzipCode] = useState("");
   // const history = useHistory();
   const statusArr = CONSTANTS_STATUS.propertyStatusArr;
   const [statusSelected, setStatusSelected] = useState(() => {
      if (allPropertyData?.data?.propertyStatus === 'PUBLISHED') {
         return 'PUBLISHED';
      } else if (allPropertyData?.data?.propertyStatus === 'UNDER REVIEW') {
         return 'UNDER REVIEW';
      } else {
         return '';
      }
   });

   const propertyType = CONSTANTS_STATUS.propertyType;
   const [typeSelected, setTypeSelected] = useState(() => {
      if (allPropertyData?.data?.smartLockProperty === true) {
         return 'SMARTDOOR';
      } else if (allPropertyData?.data?.smartLockProperty === false) {
         return 'NON SMARTDOOR';
      } else {
         return '';
      }
   });
   const [fromDate, setFromDate] = useState(data.length !== 0 ? allPropertyData?.data?.fromDate : null);
   const [toDate, setToDate] = useState(data.length !== 0 ? allPropertyData?.data?.toDate : null);
   const [filterText, setFilterText] = React.useState(data.length !== 0 ? allPropertyData?.data?.searchStr : "");
   const [propertyIdText, setPropertyIdText] = React.useState(data.length !== 0 ? allPropertyData?.data?.propertyId : "");
   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
   const [defaultSort, setDefaultSort] = useState(data.length !== 0 ? allPropertyData?.data?.defaultSort : false);
   const [defaultSortId, setDefaultSortId] = useState(data.length !== 0 ? allPropertyData?.data?.defaultSortId : 'propertyId');
   const [defaultSortFieldId, setDefaultSortFieldId] = useState(() => {
      if(allPropertyData?.data?.defaultSortId === 'propertyId') {
         return 1
      }
      else {
         return 2
      }
      });
      console.log(allPropertyData.data.defaultSort)
   const cityPresent = useCallback(
      () => {
         getLocationByCity({ city: p_city })
            .then((res) => {
               if (res.data && res.data.status === 200) {
                  const locationsByCity = res.data.resourceData.locations.map(
                     (loc) => {
                        return {
                           ...loc,
                           location: `${loc.location} ,${loc.pinCode}`,
                        };
                     }
                  );
                  setLocationsData(locationsByCity);
               }
            })
            .catch((err) => console.log("err:", err));
      }
   )
   // function formateAddress(address, city) {
   //    try {
   //       if (address) {
   //          const splitData = address.split(", ");
   //          if (splitData.length) {
   //             try {
   //                let addr;
   //                let sliceData = splitData.slice(0, 2);
   //                sliceData = sliceData.map((item) => item.toLowerCase());
   //                sliceData = sliceData.filter((item) => item !== city.toLowerCase());
   //                sliceData = sliceData.map((item) => item.capitalize());
   //                addr = sliceData.join(",");
   //                return addr + ", " + city || "";
   //             } catch (e) {
   //                return address + ", " + city || "";
   //             }
   //          } else {
   //             return address + ", " + city || "";
   //          }
   //       } else {
   //          return city || "-";
   //       }
   //    } catch (e) {
   //       return "-";
   //    }
   // }

   const columns = [
      {
         name: "Id",
         selector:((row) => row.propertyId),
         sortable: true,
         center: false,
         maxWidth: "150px",
         cell: ({ propertyId }) => (
            <ToolTip position="top" style={{ width: '100%' }} name={propertyId}>
              <Text size="Small" color="secondryColor elipsis-text" text={propertyId} />
            </ToolTip>
          ),
          id: 1
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
         name: "Published On",
         selector: ((row) => row.publishDate),
         sortable: false,
         center: true,
         maxWidth: "120px",
         style: { padding: "0 !important" },
         cell: ({ publishDate }) => <span>{`${formateDate(publishDate)}` || ""}</span>,
      },
      {
         name: "Owner",
         // selector: "ownerName",
         sortable: false,
         sortable: false,
         center: true,
         wrap: true,
         minWidth: "150px",
         style: { padding: "0 !important" },
         cell: ({ ownerName, postedByName }) => (
            <span>{ownerName !== null && ownerName !== undefined && ownerName !== '' ? <>{ownerName}</> : <>{postedByName}</>}</span>
         )
      },
      {
         name: "Mobile",
         // selector: "ownerName",
         center: true,
         maxWidth: "120px",
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
         minWidth: "300px",
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
         selector: ((row) => row.propertyType),
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
         cell: ({ status }) => <span>{status !== null ? <>
            {handleStatusElement(status)}
         </> : '-'}
         </span>,
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
         maxWidth: "40px",
         cell: ({ row, propertyId, postedById }) => (
            <div className="action">
               <ToolTip position="left" name="View Details">
                  <span>
                     <Link
                        to={{
                           pathname: "/admin/property/property-details",
                           state: { propertyId: propertyId, userId: postedById, menuName: 'Properties', isDeleted: false, defaultSort: defaultSort, defaultSortId: defaultSortId},
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

   const PaginationActionButton = () => (
      <div className="d-flex justify-content-center tableBottom">
      </div>
   );

   const validateDates = () => {
      if ((fromDate === null && toDate === null) || (fromDate === '' && toDate === '')) {
         return true;
     } else if (fromDate !== null && toDate !== null && fromDate !== '' && toDate !== '') {
         if (new Date(fromDate) > new Date(toDate)) {
             showErrorToast("Start date should be less than end date");
             return false;
         } else {
             return true;
         }
     } else {
         showErrorToast("Please enter start date and end date or set both empty");
         return false;
     }
   }
   const ProgressComponent = <TableLoader />;
   const [currentPage, setCurrentPage] = useState(allPropertyData?.data?.length !== 0 ? allPropertyData?.data?.currentPage : 1);
   const [rowsPerPage, setRowsPerPage] = useState(allPropertyData?.data?.length !== 0 ? allPropertyData?.data?.rowsPerPage : 8);
   const recordSize = (allPropertyData?.data?.records || 0);
   console.log(recordSize)
   let recordsPerPage = 0
   recordsPerPage = allPropertyData?.data?.rowsPerPage;

   const handlePageChange = (newPage) => {
      setCurrentPage(Number(newPage));
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
      if (matches) {
         let zipcode = matches[2]
         getAllProperties({
            city: p_city,
            zipcode,
            p_location,
            pageSize: rowsPerPage,
            pageNo: newPage,
            userId: userData.userid,
            searchString: filterText,
            propertyId: propertyIdText,
            smartLockProperty: type,
            propertyStatus: statusSelected,
            fromDate: (fromDate),
            toDate: (toDate),
            pState: p_state,
            defaultSort: defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
         });
      } else {
         let zipcode = ""
         let location = ""
         getAllProperties({
            city: p_city,
            zipcode,
            location,
            pageSize: rowsPerPage,
            pageNo: newPage,
            userId: userData.userid,
            searchString: filterText,
            propertyId: propertyIdText,
            smartLockProperty: type,
            propertyStatus: statusSelected,
            fromDate: (fromDate),
            toDate: (toDate),
            pState: p_state,
            defaultSort: defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
         });
      }
   };

   const handleRowsPerPageChange = async (newRowsPerPage) => {
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
      recordsPerPage = Number(newRowsPerPage)
      setRowsPerPage(Number(newRowsPerPage))
      if (matches) {
         let zipcode = matches[2]
         getAllProperties({
            city: p_city,
            zipcode,
            p_location,
            pageSize: Number(newRowsPerPage),
            pageNo: currentPage,
            userId: userData.userid,
            searchString: filterText,
            propertyId: propertyIdText,
            smartLockProperty: type,
            propertyStatus: statusSelected,
            fromDate: (fromDate),
            toDate: (toDate),
            pState: p_state,
            defaultSort: !defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
         });
      } else {
         let zipcode = ""
         let location = ""
         getAllProperties({
            city: p_city,
            zipcode,
            location,
            pageSize: Number(newRowsPerPage),
            pageNo: currentPage,
            userId: userData.userid,
            searchString: filterText,
            propertyId: propertyIdText,
            smartLockProperty: type,
            propertyStatus: statusSelected,
            fromDate: (fromDate),
            toDate: (toDate),
            pState: p_state,
            defaultSort: !defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
         });
      }
   };

   let PaginationComponent = ({ onChangePage, onChangeRowsPerPage, ...props }) => (
      <Pagination {...props}
         rowCount={recordSize}
         rowsPerPage={recordsPerPage}
         onChangeRowsPerPage={handleRowsPerPageChange}
         currentPage={currentPage}
         onChangePage={handlePageChange}
         paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
         PaginationActionButton={PaginationActionButton} />
   );

   const onRowClicked = (rowdata) => {
      console.log()
   }

   const [scrollPosition, setScrollPosition] = useState(0);
   const tableRef = useRef(0);

   // Function to handle scroll position change
   const handleScroll = () => {
      if (tableRef.current) {
         setScrollPosition(tableRef.current.scrollTop);
      }
      console.log("test")
   };

   useEffect(() => {
      if (data?.length === 0 || localStorage.getItem('autoRefresh') === 'Yes') {
         getAllStateWithId();
         getAllProperties({
            city: p_city,
            zipcode: '',
            location: p_location,
            pageSize: rowsPerPage,
            pageNo: currentPage,
            userId: userData.userid,
            searchString: filterText,
            propertyId: propertyIdText,
            smartLockProperty: typeSelected,
            propertyStatus: statusSelected,
            fromDate: fromDate,
            toDate: toDate,
            pState: p_state,
            defaultSort: defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
         });
         if (tableRef.current) {
            tableRef.current.scrollTop = tableRef.current.scrollHeight;
         }
         localStorage.setItem('autoRefresh', 'No')
      }
   }, [getPropertyCity, getAllStateWithId, scrollPosition]);

   const _filterData = (city, locationData) => {
      let data = locationData;
      const regex = /([^,]+),\s*(\d{6})/;
      const matches = data.match(regex);
      if (matches) {
         const location = matches[1].trim();
         setp_Location(location);
         const zipcode = matches[2];
         setzipCode(zipcode);
      }
      if (locationData == "") {
         let location = "";
         let zipcode = "";
         setzipCode(zipcode);
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
            onClear={() => handleClear}
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
            onClear={() => {handleClear()}}
            filterText={propertyIdText}
            showSearch={true}
         />
      );
   }, [propertyIdText, resetPaginationToggle]);

   let filteredItems = [];
   const showData = (status_value) => {
      let status = status_value || statusSelected;
      filteredItems = [];
      filteredItems = allPropertyData?.data?.propertyData
      console.log(allPropertyData?.data?.propertyData)
      // console.log("filteredItems : ", filteredItems)
      // if (status && filteredItems.length) {
      //    filteredItems = filteredItems.filter((item) => {
      //       return item?.status?.toUpperCase() == status?.toUpperCase();
      //    });
      // }
      return allPropertyData?.data?.propertyData;
   };

   const showProperty = (status_value) => {
      let status = status_value || typeSelected;
      let property = typeSelected === "SMARTDOOR" ? true : false;
      return filteredItems;
   };

   const _filterStatus = (status_value) => {
      setStatusSelected(status_value);   };

   const _filterPropertyType = (status_value) => {
      setTypeSelected(status_value);
   };

  
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
         type: Actions.PROPERTY_MODULE_SUCCESS,
         data: { propertyData: [...sorted], records: recordSize, currentPage: currentPage, rowsPerPage: rowsPerPage, searchStr: filterText, propertyId: propertyIdText, city: p_city, location: p_location, smartLockProperty: typeSelected, propertyStatus: statusSelected, fromDate: fromDate, toDate: toDate,  defaultSort: defaultSortFlag, defaultSortId: defaultSortId }
      });
      // showData();
   };

   console.log(allPropertyData.data.propertyData)

   return (
      <>
         <div className="tableBox ">
            <Route
               path="/admin/user-management/user-details"
               name="Admin Dashboard"
               component={ModalModule}
            />
            {/* <TableTitle /> */}
            <div className="align-items-center tableHeading">
               <div className="d-flex justify-content-between">

                  <div>
                     <Text
                        size="regular"
                        fontWeight="mediumbold"
                        color="secondryColor"
                        text="Properties on Smartdoor"
                     />
                  </div>
                  <div className="locationSelect d-flex">
                     
                     <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                           as="select"
                           onChange={(e) => {
                              setp_state(e.target.value);
                              setp_City("");
                              _filterData(e.target.value, "");
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
                              // if (e.target.value.length) {
                              //    getLocationByCity({ city: e.target.value })
                              //       .then((res) => {
                              //          if (res.data && res.data.status === 200) {
                              //             const locationsByCity = res.data.resourceData.locations.map(
                              //                (loc) => {
                              //                   return {
                              //                      ...loc,
                              //                      location: `${loc.location} ,${loc.pinCode}`,
                              //                   };
                              //                }
                              //             );
                              //             setLocationsData(locationsByCity);
                              //          }
                              //       })
                              //       .catch((err) => console.log("err:", err));
                              // }
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
                     {/* <Form.Label>Location:</Form.Label> */}
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
                        onClick={async () => {
                           setCurrentPage(1)
                           let type = null
                           if (typeSelected === 'SMARTDOOR') {
                              type = true
                           } else if (typeSelected === 'NON SMARTDOOR') {
                              type = false
                           }
                           const regex = /([^,]+),\s*(\d{6})/;
                           const matches = p_location.match(regex);
                           if (!validateDates()) {
                              return null;
                           }
                           await getAllProperties({
                              userId: userData.userid,
                              city: p_city ? p_city : "",
                              pageSize: rowsPerPage,
                              pageNo: 1,
                              zipcode: zipCode ? zipCode : "",
                              location: matches ? matches[1].trim() : "",
                              searchString: filterText,
                              propertyId: propertyIdText,
                              smartLockProperty: type,
                              propertyStatus: statusSelected,
                              fromDate: (fromDate),
                              toDate: (toDate),
                              pState: p_state,
                              defaultSort: defaultSort, defaultSortId: defaultSortId, defaultSortFieldId: defaultSortFieldId
                           });
                           // setRecordSize(allPropertyData?.data?.propertyData?.length)
                        }}
                     />
                  </div>
               </div>
            </div>
            <div className="propertiesTableWrapper" onScroll={handleScroll}>
               <DataTableComponent ref={tableRef} 
                  data={showData()}
                  columns={columns}
                  progressPending={allPropertyData.isLoading}
                  progressComponent={ProgressComponent}
                  paginationComponent={PaginationComponent}
                  paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                  paginationPerPage={recordsPerPage}
                  currentPage={currentPage}
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handleRowsPerPageChange}
                  perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                  filterText={filterText}
                  paginationServer={true}
                  subHeaderComponent={subHeaderComponentMemo}
                  persistTableHead
                  filterComponent={subHeaderComponentMemo}
                  onRowClicked={onRowClicked}
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

// mapStateToProps
const mapStateToProps = ({ allPropertyData, getPropertyCityData, allCities, allCitiesWithId, allStatesWithId }) => ({
   allPropertyData,
   getPropertyCityData,
   allCities,
   allCitiesWithId, 
   allStatesWithId
});

// mapDispatchToProps
const actions = {
   getAllProperties,
   getPropertyCity,
   getAllCity,
   getAllCityWithId,
   getAllStateWithId,
   getLocationByCity,
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect)(PropertyModule);
