import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { compose } from "redux"
import { getAllCityWithId } from "../../../../common/redux/actions";
import { connect } from "react-redux";
import './MarketingAgencyList.scss';
import Buttons from "../../../../shared/Buttons/Buttons";
import SearchInput from "../../../../shared/Inputs/SearchInput/SearchInput";

const MarketingAgency = (props) => {
    const { getAllCityWithId, allCitiesWithId } = props;
    const [p_city, setp_City] = useState('');
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    useEffect(() => {
        getAllCityWithId({ smartdoorServiceStatus: null, stateId: null })
    }, [getAllCityWithId]);

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
                placeholder="Search"
                style={{backgroundColor: 'white'}}
            />
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <>
            <div className="tableBox ">
                <div className="locationSelect d-flex">
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                setp_City(e.target.value);
                            }}
                            value={p_city}
                        >
                            <option value="">All Cities</option>
                            {allCitiesWithId?.data?.length > 0
                                ? allCitiesWithId?.data?.map((city) => (
                                    <option key={city.cityId} value={city.cityName}>
                                        {city.cityName}
                                    </option>
                                ))
                                : null}
                        </Form.Control>
                    </Form.Group> &nbsp;&nbsp;
                    <Buttons name='Add New Agency' size='small' variant='primary'></Buttons> &nbsp;&nbsp;
                    <Buttons name='Transfer Customers' size='small' varient='secondary' color='black'></Buttons> &nbsp;&nbsp;
                    {subHeaderComponentMemo} &nbsp;&nbsp;
                    <Form.Group controlId="exampleForm.SelectCustom">
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
        </>
    )
}

const mapStateToProps = ({ allCitiesWithId }) => ({
    allCitiesWithId
});

const actions = {
    getAllCityWithId
}

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect)(MarketingAgency);