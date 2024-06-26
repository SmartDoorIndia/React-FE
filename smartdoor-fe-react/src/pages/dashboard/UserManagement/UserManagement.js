/** @format */

import React, { useState, useEffect, memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Text from "../../../shared/Text/Text";
import Form from "react-bootstrap/Form";
import Image from "../../../shared/Image/Image";
import Buttons from "../../../shared/Buttons/Buttons";
import actionIcon from "../../../assets/images/action-icon.svg";
import ModalModule from "../../../shared/Modal/ModalModule";
import "./UserManagement.scss";
import {
   getAllUsers,
   getCityAndDept,
   getUserByCityAndDept,
   blockTeamMember,
   getLocationByCity,
} from "../../../common/redux/actions";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../../shared/Modal/ConfirmationModal/ConfirmationModal";
import DataTableComponent from "../../../shared/DataTable/DataTable";
import Pagination from "../../../shared/DataTable/Pagination";
import blockIcon from "../../../assets/images/dismiss-icon.svg";
import {
   formateDate,
   dateWithFormate,
   ToolTip,
} from "../../../common/helpers/Utils";
import { TableLoader } from "../../../common/helpers/Loader";
import blockIconActive from "../../../assets/svg/dismiss-icon-active.svg";
import { provideAuth } from "../../../common/helpers/Auth";
import SearchInput from "../../../shared/Inputs/SearchInput/SearchInput";

const PaginationActionButton = () => (
   <div className="d-flex justify-content-between tableBottom">
      <span></span>
      <Link to="/admin/user-management/add-new-member">
         <Buttons name="Add New Entry" varient="success" type="submit" size="Small" color="white" />
      </Link>
   </div>
);
const PaginationComponent = (props) => (
   <Pagination {...props} PaginationActionButton={PaginationActionButton} />
);
const ProgressComponent = <TableLoader />;
const POSITION_MODULE_VAL = {
   "Sales Admin": "SALES",
   "Sales Executive": "SALES",
   "Transaction Admin": "TRANSACTION",
   "Transaction Executive": "TRANSACTION",
   "Help Desk Executive": "HELPDESK",
   "Help Desk Admin": "HELPDESK",
   "Installation Executive": "EXECUTION",
   "Installation Admin": "EXECUTION",
};
const getModalActionData = (row) => {
   const { position } = row;
   const module = POSITION_MODULE_VAL?.[position] || "USER";
   return { userData: row, module };
};

const UserManagement = (props) => {
   const { userData } = provideAuth();
   const moduleName = props.location?.state?.moduleName ? props.location?.state?.moduleName : ''

   console.log("user mgmnt:userData:", userData);
   console.log(moduleName,"moduleName");
   console.log(props,"generalCityDepData");

   const { getAllUsers, allUsersData, getCityAndDept, generalCityDepData, getLocationByCity } =
      props;
   const [city, setCity] = useState("");
   const [location, setLocation] = useState("");
   const [departments, setDepartment] = useState(props.location?.state?.moduleName ? props.location?.state?.moduleName : "");

   const [show, setShow] = useState(false);
   const [blockData, setBlockData] = useState({});
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const [datePickerblockvalue, setDatePickerblockvalue] = useState([]);

   const [locationsData, setLocationsData] = useState([]);

   // MODAL DATA STATE
   const [modalData, setModalData] = useState();

   // state to manage the search filter component
   const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

   // const [dates, setDates] = useState([
   //    {
   //       startDate: new Date(),
   //       endDate: null,
   //       key: "selection",
   //    },
   // ]);

   const handleBlockUser = () => {
      console.log("blockData.isBlocked:", blockData.isBlocked);
      let startDt = dateWithFormate(
         datePickerblockvalue.length ? datePickerblockvalue[0] : "",
         "YYYY-MM-DD"
      );
      let endDt = dateWithFormate(
         datePickerblockvalue.length ? datePickerblockvalue[1] : "",
         "YYYY-MM-DD"
      );
      blockTeamMember({ userId: blockData.id, startDate: startDt, endDate: endDt })
         .then((data) => {
            getAllUsers({pageNumber:"", records:"",searchByCity:city, searchByzipCode:location, departmentName: departments});
            setDatePickerblockvalue([]);
         })
         .catch((error) => {
            console.log("");
         });
      handleClose();
   };

   useEffect(() => {
      getCityAndDept();
   }, [getCityAndDept]);

   useEffect(() => {
      // if (city === "" && departments === "") {
         getAllUsers({pageNumber:"", records:"",searchByCity:"", searchByzipCode:"", departmentName: departments});
      } 
      // else {
      //    getUserByCityAndDept({ city, departments });
      // }
   // }
   , [ getAllUsers]);

   const columns = [
      {
         name: "Id",
         selector: "id",
         center: true,
         sortable: true,
      },

      {
         name: "Joined On",
         selector: "joiningDate",
         maxWidth: "120px",
         sortable: true,
         center: true,
         cell: ({ joiningDate }) => <span>{formateDate(joiningDate)}</span>,
      },
      {
         name: "Name ",
         selector: "name",
         center: true,
         // maxWidth: '120px',
         cell: ({ name, contactNumber, imageUrl }) => (
            <div className="userName">
               {/* <div className="userImage">
          <Image name="userImage" src={ imageUrl || userImage } />
        </div> */}
        <ToolTip
            position="top"
            name={
               <div>
                  {" "}
                  <span>{name || "-"} </span>
                  <span> {`(${contactNumber})`} </span>
               </div>
            }
         >
               <Text size="Small" color="secondryColor" text={name ? name.capitalizeWord() : "-"} />
               </ToolTip>
            </div>
         ),
      },
      {
         name: "Location",
         // selector: 'workLocation',
         selector: (row) => row.workLocation,
         center: true,
         maxWidth: "150px",
         cell: (row) => (
            // <ToolTip
            //    position="left"
            //    style={{ width: "100%" }}
            //    name={getLocationStr(row.workLocation)}
            // >
               <span className="cursor-pointer elipsis-text" title={row?.workLocation?.map(obj => obj.location)}>
                  {row?.workLocation?.length && row?.workLocation !== null
                     ? `${row?.workLocation[0]?.location.toString()}...`
                     : "-"}
               </span>
            // </ToolTip>
         ),
      },
      {
         name: "City",
         selector: "city",
         center: true,
         maxWidth: "170px",
         cell: ({ city }) => 
         // <ToolTip
         //       position="top"
         //       style={{ width: "100%" }}
         //       name={city}
         //    >
         
         <span className="cursor-pointer elipsis-text" title={city}>{city || "-"}</span>
         // </ToolTip>
         ,
      },
      {
         name: "Position",
         selector: "position",
         center: true,
         minWidth: '200px',
         cell: ({ position }) => <span>{position}</span>,
      },

      {
         name: "Action",
         center: true,
         cell: (row) => (
            <div className="action">
               <ToolTip position="left" name="View Details">
                  <span
                     onClick={() => {
                        const makeData = getModalActionData(row);
                        setModalData(makeData);
                     }}
                  >
                     <Image name="editIcon" src={actionIcon} />
                     {/* {showModalDataWrtPosition(row.position, row)} */}
                     {/* <Link to={ { pathname: '/admin/user-management/user-details',
              state: { userData: row, module: 'USER' },
            } }>
              <Image name="editIcon" src={ actionIcon } />
            </Link> */}
                  </span>
               </ToolTip>
               <ToolTip position="right" name={row.blocked ? "Unblock" : "Block"}>
                  {/* <span onClick={()=>handleBlockUser(row.id)}>
                                <Image name="contentIcon" className="p-1" src={row.blocked ? blockIconActive : blockIcon} />
                            </span> */}
                  <span
                     onClick={() => {
                        handleShow();
                        // userBlock_id = row.id}
                        // setBlock_id(row.id)}
                        setBlockData({ id: row.id, isBlocked: row.blocked });
                     }}
                  >
                     <Image
                        name="contentIcon"
                        className="p-1"
                        src={row.blocked ? blockIconActive : blockIcon}
                     />
                  </span>
               </ToolTip>
            </div>
         ),
      },
   ];

   const closeModal = (data={isReload : false}) => {
      if(data?.isReload) {
         getAllUsers({pageNumber:"", records:"",searchByCity:city, searchByzipCode:location, departmentName: departments});
      }
      // getAllUsers({pageNumber:"", records:"",searchByCity:"", searchByzipCode:""});
      setModalData();
   };

   const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<SearchInput onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} 
      placeholder="Search here"
      />
		);
	}, [filterText, resetPaginationToggle]);

   function searchingLocation(element, index, array) {
      return element.location.toLowerCase().includes(filterText.toLowerCase());
    }

   const filteredItems = allUsersData.data.length ? 
   allUsersData.data.filter(item => { 
   return  item?.id === filterText || 
   item?.name?.toLowerCase().includes(filterText.toLowerCase()) ||
   // item?.city?.toLowerCase().includes(filterText.toLowerCase()) ||
   item?.position?.toLowerCase().includes(filterText.toLowerCase()) ||
     
   item?.workLocation?.some(searchingLocation)
      // item.workLocation.filter(place => 
      //     place?.location.toLowerCase().includes(filterText.toLowerCase())
      

 }):[];

 const _filterData = (city,zipCode,department_name ) => { 
   // setInstallationCity(city);
   getAllUsers({pageNumber:"", records:"",searchByCity:city, searchByzipCode:zipCode, departmentName: department_name});
 }
 console.log(allUsersData,"aaaaaaaaaaaaaaaaaaaaaaaaaa")

   return (
      <>
         <div className="tableBox mb-5">
            <ConfirmationModal
               title={
                  blockData.isBlocked
                     ? "Are you sure you want to unblock this user?"
                     : "Are you sure you want to block this user?"
               }
               cancelButtonName="Cancel"
               primaryButtonName={blockData.isBlocked ? "Unblock" : "Block"}
               show={show}
               handleClose={handleClose}
               handleShow={handleShow}
               handlePerformAction={handleBlockUser}
               showDateRange={blockData.isBlocked ? false : true}
               datePickerblockvalue={datePickerblockvalue}
               setDatePickerblockvalue={setDatePickerblockvalue}
               submodule={"block"}
            />

            {!!modalData && (
               <ModalModule
                  modalData={modalData}
                  dataFrom="user_manage"
                  closeModal={closeModal}
                  history={{ goBack: closeModal }}
                  getAllUsers={getAllUsers}
                  city = {city}
                  location = {location}
                  departments = {departments}
               />
            )}  
            {/* <Route
          path="/admin/user-management/user-details"
          excat
          render={ (props) => <ModalModule
            { ...props }
          /> }
        /> */}
            {/* <Route path='/admin/user-management/user-details'  render={props=> <ModalModule {...props} allUsersData={allUsersData}/> }  />*/}
            <div className="d-flex flex-md-column flex-xl-row justify-content-xl-between align-items-xl-center align-items-left tableHeading"> 
               <div className="text-nowrap mb-2">
                  <Text
                     size="regular"
                     fontWeight="mediumbold"
                     color="secondryColor"
                     text="Team Members"
                  />
               </div>
               <div className="locationSelect d-flex align-items-xl-center align-items-left">
               {subHeaderComponentMemo} 
               {/* <div className="m-2"></div> */}
                  <Form.Group controlId="exampleForm.SelectCustom" className="w-40 userGrp ml-0">
                     {/* <Form.Label>City:</Form.Label> */}
                     <Form.Control as="select" 
                     onChange={(e) => {
                        setLocationsData([]);
                        setCity(e.target.value)
                        setLocation('');
                        _filterData(e.target.value, "", departments);
                        if(e.target.value.length){
                        getLocationByCity({ city: e.target.value })
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
                              // this.setState({
                              //    // allLocationsByCity: res.data.resourceData.locations,
                              //    allLocationsByCity: locationsByCity,
                              // });
                           }
                        })
                        .catch((err) => console.log("err:", err));
                     }
                     }}>
                        <option value="">Select City</option>
                        {generalCityDepData.city
                           ? generalCityDepData.city.length
                              ? generalCityDepData.city.map((_value, index) => (
                                   <option key={index} value={_value}>
                                      {_value}
                                   </option>
                                ))
                              : null
                           : null}
                     </Form.Control>
                     {/* <div className="m-2"></div> */}
                     {/* <Form.Label>Location:</Form.Label> */}  
                     <Form.Control as="select" 
                      value={location}
                      className="locationWidth" 
                     onChange={(e)=> {
                        _filterData(city ,e.target.value, departments)
                        setLocation(e.target.value)
                      }}
                     >
                     <option value="">Select Location</option>
                        {locationsData && locationsData.length
                           ? locationsData.map((_value, index) => (
                                <option key={_value.pinCode} value={_value.pinCode}>
                                   {_value.location}
                                </option>
                             ))
                           : null}
                     </Form.Control>
                     {/* <div className="m-2"></div> */}
                     {/* <Form.Label>Department:</Form.Label> */}
                        <Form.Control as="select" 
                     value={departments}
                     onChange={(e) => {
                        _filterData(city ,location, e.target.value)
                        setDepartment(e.target.value)
                     }}
                     >
                        <option value="">Department</option>
                        {generalCityDepData.departments
                           ? generalCityDepData.departments.length
                              ? generalCityDepData.departments.map((_value, index) => (
                                   <option key={index} value={_value}>
                                      {_value}
                                   </option>
                                ))
                              : null
                           : null}
                     </Form.Control>
                  </Form.Group>
               </div>
            </div>
            {/* <div className="d-flex justify-content-center tableBottom">
          <Link  to="/admin/sales/add/newmember"><Buttons name="Manage Team" varient="primary" type="submit" size="Small" color="white" /></Link>
      </div>*/}

            <DataTableComponent
               data={filteredItems}
               columns={columns}
               progressPending={allUsersData.isLoading}
               paginationComponent={PaginationComponent}
               perPageOptions={ [ 8,  16, 24, 32, 40, 48, 56, 64, 72, 80 ] }
               paginationPerPage={ 8 }
               paginationRowsPerPageOptions={ [ 8,  16, 24, 32, 40, 48, 56, 64, 72, 80 ] }
               progressComponent={ProgressComponent}
            />

            {allUsersData.data.length ? null : (
               <div className="d-flex justify-content-center">
                  <PaginationActionButton />
               </div>
            )}
         </div>
      </>
   );
};

const mapStateToProps = ({ allUsersData, generalCityDepData }) => ({
   allUsersData,
   generalCityDepData,
});

const actions = {
   getAllUsers,
   getCityAndDept,
   getUserByCityAndDept,
   getLocationByCity,
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(UserManagement);
