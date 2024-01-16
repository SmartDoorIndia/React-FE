import React, { useState } from "react";
import {
    formateDate,
    getLocalStorage,
    ToolTip,
    handleStatusElement,
 } from "../../../../common/helpers/Utils";
import CONSTANTS_STATUS from "../../../../common/helpers/ConstantsStatus";
import {
    getAllDeletedProperties,
    getPropertyCity,
    getLocationByCity,
    getAllCity,
} from "../../../../common/redux/actions";
import Pagination  from "../../../../shared/DataTable/Pagination";
import SearchInput from "../../../../shared/Inputs/SearchInput/SearchInput";
import Image  from "../../../../shared/Image/Image";
import docIcon from "../../../../assets/images/doc-icon.png"
import contentIco from "../../../../assets/images/content-ico.svg"
import { useEffect } from "react";
import { Link, Route } from "react-router-dom/cjs/react-router-dom";
import ModalModule from "../../../../shared/Modal/ModalModule";
import Text from "../../../../shared/Text/Text";
import { Form } from "react-bootstrap";
import Buttons from "../../../../shared/Buttons/Buttons";
import DataTableComponent from "../../../../shared/DataTable/DataTable";
import { connect } from "react-redux";
import { compose } from "redux";
import "./property.scss";

const DeletedProperties = (props) => {
    const {
        getAllDeletedProperties,
        deletedPropertyData,
        getPropertyCity,
        getAllCity,
        allCities,
        getLocationByCity,
    } = props;
    const userData = getLocalStorage("authData");
    const [p_city, setp_City] = useState("");
    const [p_location, setp_Location] = useState("");
    const [locationsData, setLocationsData] = useState([]);
    const [zipCode, setzipCode] = useState("");

    //state: for managing the status filter.
    const statusArr = CONSTANTS_STATUS.propertyStatusArr;
    const [statusSelected, setStatusSelected] = useState("");

    const propertyType = CONSTANTS_STATUS.propertyType;
    const [typeSelected, setTypeSelected] = useState("");

    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

    const columns = [
        {
            name: "Id",
            selector: "propertyId",
            sortable: true,
            center: true,
        },
        {
            name: "Added On",
            // selector: ((row) => row.postedDate),
            sortable: true,
            center: true,
            maxWidth: "120px",
            style: { padding: "0 !important" },
            cell: ({ postedDate }) => <span>{`${formateDate(postedDate)}` || ""}</span>,
        },
        {
            name: "Owner",
            selector: "ownerName",
            sortable: false,
            sortable: false,
            center: true,
            maxWidth: "200px",
            style: { padding: "0 !important" },
        },
        {
            name: "Location",
            sortable: false,
            wrap: true,
            style: { padding: "0 !important" },
            center: true,
            cell: ({ houseNumber, societyName, societyAddress }) => (
                <span>
                    {houseNumber} {" , "}
                    {societyName}
                    {" , "}
                    {societyAddress}
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
                                    state: { propertyId: propertyId, userId: userData.userid },
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
            {/* <Link to="/admin/property/new-property"><Buttons name="Add New Property" varient="primary" type="submit" size="Small" color="white" /></Link> */}
        </div>
    );

    const PaginationComponent = (props) => (
        <Pagination {...props} PaginationActionButton={PaginationActionButton} />
    );

    useEffect(() => {
        // getPropertyCity();
        getAllCity();
    }, [getPropertyCity, getAllCity]);

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
            getAllDeletedProperties({
                city,
                zipcode,
                location,
                pageSize: "",
                pageNo: "",
                userId: userData.userid,
            });
        }
        if (locationData == "") {
            let location = "";
            let zipcode = "";
            console.log("outside match");
            getAllDeletedProperties({
                city,
                zipcode,
                location,
                pageSize: "",
                pageNo: "",
                userId: userData.userid,
            });
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
                placeholder="Search here"
            />
        );
    }, [filterText, resetPaginationToggle]);

    let filteredItems = [];

    filteredItems = deletedPropertyData.data.length
        ? deletedPropertyData.data.filter((item) => {
            return (
                item?.propertyId == filterText ||
                item?.postedDate?.toLowerCase().includes(filterText.toLowerCase()) ||
                item?.propertyType?.toLowerCase().includes(filterText.toLowerCase()) ||
                item.societyName.toLowerCase().includes(filterText.toLowerCase()) ||
                item.societyAddress.toLowerCase().includes(filterText.toLowerCase())
            );
        })
        : [];

    const showData = (status_value) => {
        let status = status_value || statusSelected;

        if (status && filteredItems.length) {
            filteredItems = filteredItems.filter((item) => {
                return item?.status.toUpperCase() == status.toUpperCase();
            });
        }
        return filteredItems;
    };

    const showProperty = (status_value) => {
        let status = status_value || typeSelected;
        let property = typeSelected === "SMARTDOOR" ? true : false;

        if (status && filteredItems.length) {
            filteredItems = filteredItems.filter((item) => {
                return item?.smartDoorProperty === property;
            });
        }
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

    return (
        <>
           <div className="tableBox mb-5">
              <Route
                 path="/admin/user-management/user-details"
                 name="Admin Dashboard"
                 component={ModalModule}
              />
              {/* <TableTitle /> */}
              <div className="d-flex justify-content-between align-items-center tableHeading">
                 <div>
                    <Text
                       size="regular"
                       fontWeight="mediumbold"
                       color="secondryColor"
                       text="Deleted/Unlisted Properties"
                    />
                 </div>
                 <div className="locationSelect d-flex">
                    {subHeaderComponentMemo}
                    <Form.Group controlId="exampleForm.SelectCustom">
                       <Form.Control
                          as="select"
                          onChange={(e) => {
                             setLocationsData([]);
                             setp_City(e.target.value);
                             setp_Location("");
                             _filterData(e.target.value, "");
                             if (e.target.value.length) {
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
                                      }
                                   })
                                   .catch((err) => console.log("err:", err));
                             }
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
                    </Form.Group>
                    <Form.Group controlId="exampleForm.SelectCustom" className="loc-input">
                       {/* <Form.Label>Location:</Form.Label> */}
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
                    </Form.Group>
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
                    <div className="ml-3">
                       <Buttons
                          name="Search"
                          varient="primary"
                          size="Small"
                          color="white"
                          style={{height: "40px !important" }}
                          onClick={() => {
                             const regex = /([^,]+),\s*(\d{6})/;
                             const matches = p_location.match(regex);
                             getAllDeletedProperties({
                                userId: userData.userid,
                                city: p_city ? p_city : "",
                                pageSize: "",
                                pageNo: "",
                                zipcode: zipCode ? zipCode : "",
                                location: matches ? matches[1].trim() : "",
                             });
                          }}
                       />
                    </div>
                 </div>
              </div>
              <div className="propertiesTableWrapper">
                 <DataTableComponent
                    // onChangePage={ onChangePage }
                    data={showProperty() && showData()}
                    columns={columns}
                    progressPending={deletedPropertyData.isLoading}
                    paginationComponent={PaginationComponent}
                    paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                    paginationPerPage={8}
                    perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                    filterText={filterText}
                    subHeaderComponent={subHeaderComponentMemo}
                    persistTableHead
                    filterComponent={subHeaderComponentMemo}
                 />
              </div>
              {deletedPropertyData.isLoading ? (
                 <PaginationActionButton />
              ) : deletedPropertyData.data.length ? null : (
                 <PaginationActionButton />
              )}
           </div> 
        </>
     );
}

const mapStateToProps = ({ deletedPropertyData, getPropertyCityData, allCities }) => ({
    deletedPropertyData,
    getPropertyCityData,
    allCities,
 });
 
 // mapDispatchToProps
 const actions = {
    getAllDeletedProperties,
    getPropertyCity,
    getAllCity,
    getLocationByCity,
 };
 
 const withConnect = connect(mapStateToProps, actions);
 
 export default compose(withConnect)(DeletedProperties);