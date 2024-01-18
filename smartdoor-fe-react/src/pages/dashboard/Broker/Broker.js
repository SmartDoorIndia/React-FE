import { React, useMemo } from 'react'
import SearchInput from '../../../shared/Inputs/SearchInput/SearchInput'
import Pagination from "../../../shared/DataTable/Pagination";
import { compose } from "redux";
import { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Text from '../../../shared/Text/Text';
import Form from 'react-bootstrap/Form';
import DataTable from '../../../shared/DataTable/DataTable';
import Buttons from '../../../shared/Buttons/Buttons';
// import { Link } from 'react-router-dom/cjs/react-router-dom';
import "./Broker.scss";

const Broker = () => {

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
            name: "Reg On",
            selector: "Reg On",
            maxWidth: "350px",
            sortable: true,
            center: true,
        },
        {
            name: "Name",
            selector: "Name",
            sortable: true,
            maxWidth: "200px",
            center: false
        },
        {
            name: "Location",
            selector: "Location",
            sortable: false,
            maxWidth: "200px",
            center: false
        },
        {
            name: "mobile",
            selector: "mobile",
            sortable: true,
            maxWidth: "100px",
            center: false
        },
        {
            name: "Email",
            selector: "Email",
            sortable: false,
            maxWidth: "100px",
            center: true
        },
        {
            name: "Plan",
            selector: "Plan",
            sortable: false,
            maxWidth: "150px",
            center: true
        },
        {
            name: "Posted Properties",
            selector: "Posted Properties",
            sortable: false,
            maxWidth: "150px",
            center: true
        },
        {
            name: "Payment",
            selector: "Payment",
            sortable: false,
            maxWidth: "150px",
            center: true
        },
        {
            name: "Profile Status",
            selector: "Profile Status",
            sortable: false,
            maxWidth: "150px",
            center: true
        },
        {
            name: "Action",
            selector: "Action",
            sortable: false,
            maxWidth: "200px",
            end: true
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
                    <DataTable
                        columns={columns}
                        paginationComponent={PaginationComponent}
                        paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                        paginationPerPage={8}
                        perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                        filterText={filterText}
                        subHeaderComponent={subHeaderComponentMemo}
                        persistTableHead="true"
                        filterComponent={subHeaderComponentMemo}
                    >

                    </DataTable>
                </Card>
            </div>

        </>
    )
}

export default compose()(Broker);