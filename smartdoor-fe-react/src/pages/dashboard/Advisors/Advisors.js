import { React, useMemo } from 'react'
import SearchInput from '../../../shared/Inputs/SearchInput/SearchInput'
import Pagination from "../../../shared/DataTable/Pagination";
import { compose } from "redux";
import { useState } from 'react';
import { Form, Card, Row, Col, Button } from 'react-bootstrap';
import Text from '../../../shared/Text/Text';
import DataTable from '../../../shared/DataTable/DataTable';
import Buttons from '../../../shared/Buttons/Buttons';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Advisors = (props) => {

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
            <SearchInput
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
                placeholder="Search here"
            />
        );
    }, [filterText, resetPaginationToggle]);

    const columns = [
        {
            name: "Posted On",
            selector: "Posted On",
            maxWidth: "350px",
            sortable: true,
            center: true,
        },
        {
            name: "Customer Name",
            selector: "Customer Name",
            sortable: true,
            maxWidth: "200px",
            center: false
        },
        {
            name: "Location",
            selector: "",
            sortable: false,
            maxWidth: "200px",
            center: false
        },
        {
            name: "Plan",
            selector: "Plan",
            sortable: true,
            maxWidth: "100px",
            center: false
        },
        {
            name: "Config",
            selector: "Configuration",
            sortable: false,
            maxWidth: "100px",
            center: true
        },
        {
            name: "Status",
            selector: "Status",
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

    let style = {
        width : "fit-content"
    }
    return (
        <>
            <div className="whiteBg">
                <Text
                    size="medium"
                    fontWeight="mediumbold"
                    color="secondryColor"
                    text="Add New Posting for new/existing User"
                />
                <div className="newPost mb-0">
                    <form noValidate autoComplete="off" className='py-0'>
                        <Row>
                            <Col lg="4">
                                <Form.Group>
                                    <Form.Label>Mobile No.</Form.Label>
                                    <Form.Control
                                        type="text"
                                        maxLength="35"
                                        placeholder="Enter Mobile No." />
                                </Form.Group>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text=""
                                />
                            </Col>
                            <Col lg="4">
                                <Form.Group>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        maxlength="35"
                                        placeholder="Enter Full Name"

                                    />
                                </Form.Group>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text=""
                                />
                            </Col>
                            <Col lg="4">
                                <Form.Group>
                                    <Form.Label>Society Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        maxLength="35"
                                        placeholder="Enter Society Name"
                                    />
                                </Form.Group>
                                <Text
                                    color="dangerText"
                                    size="xSmall"
                                    className="pt-2"
                                    text=""
                                />
                            </Col>
                        </Row>
                    </form>
                    <Link to="/admin/posts/add-new-post/basic-details">
                        <Buttons type='submit' className='py-2' name='Add New Post' />
                    </Link>
                </div>
            </div>

            <div className="whiteBg">

                <div className="">
                    <Text
                        size="medium"
                        fontWeight="mediumbold"
                        color="secondryColor"
                        text="Properties Posted by You"
                        className="ms-3"
                    />
                </div>

                <Card>
                    <Row>
                        <Col lg="7"></Col>
                        <Col lg="3">
                            <div  className="locationSelect d-flex" style={style}>
                                {subHeaderComponentMemo}
                            </div>
                        </Col>
                        <Col className='align-items-center' lg="1">
                            <Buttons type='submit' name = "Date" className='mt-3 me-3' size="Small" style={ style} />
                        </Col>
                        <Col className='text-center' lg="1">
                            <Buttons type='submit' name = "Filters" className='mt-3 me-3' size="Small" style={style} />
                        </Col>
                    </Row>
                </Card>

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

export default compose()(Advisors);