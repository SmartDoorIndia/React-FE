/** @format */

import { React, useEffect, useMemo , memo } from 'react'
import SearchInput from '../../../shared/Inputs/SearchInput/SearchInput'
import Pagination from "../../../shared/DataTable/Pagination";
import { compose } from "redux";
import { connect } from 'react-redux';
import { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Text from '../../../shared/Text/Text';
import Image from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import actionIcon from "../../../assets/images/action-icon.svg";
import DataTableComponent from '../../../shared/DataTable/DataTable';
import Buttons from '../../../shared/Buttons/Buttons';
import { ToolTip } from '../../../common/helpers/Utils';
import { getBrokerListing, getBrokerDetails} from '../../../common/redux/actions';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import "./Broker.scss";

const getModalActionData = (row) => {
    return { userData: row};
 };
const Broker = (props) => {

    const {allPlanDataBroker, getBrokerListing }  =  props;
    const [planData, setPlanData] = useState();

    useEffect(()=>{
        getBrokerListing();
    
    },[getBrokerListing])

    
   const filteredItems = allPlanDataBroker.data?.length ? allPlanDataBroker.data.filter((item) => {
        return item.name || item.brokerId;
     })
   : [];
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const PaginationComponent = (props) => (
        <Pagination {...props} PaginationActionButton={PaginationActionButton} />
    );
    const PaginationActionButton = () => (
        <div className="d-flex justify-content-center tableBottom">

        </div>
    );

    const subHeaderComponentMemo = useMemo(() => {
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

    const columns = [
        {
            name: "ID",
            selector:(row) => row.brokerId,
            center: true,
        },
        {
            name: "Name",
            selector: "name",
            center: false,
            minWidth: '120px',
        },
        {
            name: "Location",
            selector: "null",
            sortable: false,
            center: false,
            minWidth: '140px',
        },
        {
            name: "mobile",
            selector: "mobile",
            sortable: true,
            center: false,
            minWidth: '150px',
        },
        {
            name: "Email",
            selector: "email",
            sortable: false,
            center: true,
            minWidth: '120px',
        },
        {
            name: "Plan",
            selector: "plan",
            sortable: false,
            center: true,
            minWidth: '120px',
        },
        {
            name: "Posted Properties",
            selector: "postedProperties",
            sortable: false,
            center: true,
            minWidth: '120px',
        },
        // {
        //     name: "Payment",
        //     selector: "Payment",
        //     sortable: false,
        //     center: true
        // },
        {
            name: "Profile Status",
            selector: "status",
            sortable: false,
            center: true,
            minWidth: '120px',
        },
         {
            name: "Action",
            center: true,
            minWidth: '150px',
            cell: (row) =>( <div className= "action">
                <ToolTip name="View Details">
                    <span>
                        <Link to={{ pathname: `/admin/broker/BrokerDetail/${ row.brokerId }`}}>
                            Details
                        </Link>
                    </span>
                </ToolTip>
            </div> ),
        },
    ]

    return (
        <>
            <div className="tableBox mb-5">
                <div className="d-flex flex-md-column flex-xl-row justify-content-xl-between align-items-xl-center align-items-left tableHeading"> 
                <div className="text-nowrap mb-2">
                    <Text
                        size="regular"
                        fontWeight="mediumbold"
                        color="secondryColor"
                        text="Brokers"
                    />
                </div>
                <div className="locationSelect d-flex align-items-xl-center align-items-left">
                    {subHeaderComponentMemo} 
                    <Buttons type='submit' name = "Filters" className='ml-2 me-3' size="Small"  />
                    <Form.Group controlId='example' className='w-40 userGrp ml-0'>

                    </Form.Group>
                    
                </div>
                </div>
            
                <Card>
                    <DataTableComponent
                        data={ filteredItems }
                        columns={columns}
                        progressPending={allPlanDataBroker.isLoading}
                        paginationComponent={PaginationComponent}
                        paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                        paginationPerPage={8}
                        perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                        filterText={filterText}
                        subHeaderComponent={subHeaderComponentMemo}
                        persistTableHead="true"
                        filterComponent={subHeaderComponentMemo}
                    >

                    </DataTableComponent>
                </Card>
            </div>

        </>
    )
};
const mapStateToProps = ({ allPlanDataBroker }) => ({
    allPlanDataBroker,
    getBrokerDetails
});
const actions ={
    getBrokerListing,
    getBrokerDetails
};
const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, memo)(Broker);