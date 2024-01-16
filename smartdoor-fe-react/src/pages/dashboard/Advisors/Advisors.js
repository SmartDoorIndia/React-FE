import { React, useCallback, useEffect, useMemo } from 'react'
import SearchInput from '../../../shared/Inputs/SearchInput/SearchInput'
import Pagination from "../../../shared/DataTable/Pagination";
import { compose } from "redux";
import { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Image from '../../../shared/Image/Image';
import contentIco from '../../../assets/images/content-ico.svg';
import Text from '../../../shared/Text/Text';
import Buttons from '../../../shared/Buttons/Buttons';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import ListingDataTable from '../../../shared/DataTable/ListingDataTable';
import "./Avisors.scss"
import { TextField } from '@mui/material';
import { getPropertyByUserId } from '../../../common/redux/actions';
import { provideAuth } from '../../../common/helpers/Auth';
import { ToolTip, formateDate, handleStatusElement } from '../../../common/helpers/Utils';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Advisors = (props) => {
    const history = useHistory();
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const { userData } = provideAuth();
    const [propertyData, setPropertyData] = useState([])

    const [loading, setLoading] = useState(true);
    const _getPropertyData = useCallback (() => {
        getPropertyByUserId({userId: userData.userid, recordes : 1000, pagenumber : 1})
        .then((response) => {
            setLoading(false);
            if(response?.data?.status === 200) {
                setPropertyData(response?.data?.resourceData)
            }
        })
         .catch((error) => {
            setLoading(false);
            console.log("error", error);
         });
    },[userData.userid])

    useEffect(async () => {
        await _getPropertyData();
    },[_getPropertyData]);

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
            selector: "addedOn",
            sortable: true,
            center: true,
            minWidth: '150px',
            style: { padding: "0 !important" },
            cell: ({ addedOn }) => <span>{`${ formateDate(addedOn) }` || '-'}</span>,
        },
        {
            name: "Customer Name",
            selector: (row) => row.propertyPostedBy,
            sortable: true,
            minWidth: "200px",
            style: { padding: "0 !important" },
            center: true
        },
        {
            name: "Location",
            selector: (row) => row.propertyAddress === null ? '-' : row.propertyAddress,
            sortable: false,
            wrap:true,
            minWidth: "180px",
            style: { padding: "0 !important" },
            center: true
        },
        {
            name: "Plan",
            selector: (row) => row.currentPlanName === null ? '-' : row.currentPlanName,
            sortable: true,
            minWidth: "50px",
            style: { padding: "0 !important" },
            center: true
        },
        {
            name: "Config",
            selector: (row) => row.flatType === null ? '-' : row.flatType,
            sortable: false,
            minWidth: "80px",
            center: true
        },
        {
            name: "Status",
            selector: "status",
            sortable: false,
            minWidth: "80px",
            center: true,
            cell: ({ status }) => <span>{status !== null ? handleStatusElement(status) : '-'}</span>,
        },
        {
            name: "Action",
            selector: (row) => row,
            sortable: false,
            minWidth: "30px",
            center: false,
            cell: ({ row, smartdoorPropertyId }) => (
                <div className="action">
                  <ToolTip position="left" name="View Details">
                    <span>
                        <Image name="contentIco" src={contentIco} onClick={() => {
                            selectedProperty(smartdoorPropertyId)
                            console.log(smartdoorPropertyId)
                            }} />
                    </span>
                  </ToolTip>
                </div>
              ),
        },
    ]
    
    const selectedProperty = (data) => {
        propertyData.forEach((element) => {
            if(element.smartdoorPropertyId === data) {
                history.push('/admin/posts/add-new-post/basic-details',{propertyData : element});
                return true;
            }
        })
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
                <div className="mt-3">
                    <Row>
                        <Col lg="4">
                            <TextField
                                className="w-100"
                                type="number"
                                id="outlined-required"
                                label="Enter Mobile No."
                                />
                            <Text
                                color="dangerText"
                                size="xSmall"
                                className="pt-2"
                                text=""
                            />
                        </Col>
                        <Col lg="4">
                            <TextField
                                className="w-100"
                                type="text"
                                id="outlined-required"
                                label="Enter Full Name."
                                />
                            <Text
                                color="dangerText"
                                size="xSmall"
                                className="pt-2"
                                text=""
                            />
                        </Col>
                        <Col lg="4">
                            <TextField
                                className="w-100"
                                type="text"
                                id="outlined-required"
                                label="Enter Society Name"
                                />
                            <Text
                                color="dangerText"
                                size="xSmall"
                                className="pt-2"
                                text=""
                            />
                        </Col>
                    </Row>
                    <Link to={"/admin/posts/add-new-post/basic-details"}>
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
                    <div  className="locationSelect d-flex mb-0" style={{justifyContent: 'right'}}>
                        <div className='mt-3'>
                            {subHeaderComponentMemo}
                        </div> &nbsp; &nbsp;
                        <Buttons name = "Date" className='mt-3' size="Small" /> &nbsp; &nbsp;
                        <Buttons name = "Filters" className='mt-3' size="Small"/> &nbsp; &nbsp;
                    </div>
                    <ListingDataTable
                        columns={columns}
                        data={propertyData}
                        paginationComponent={PaginationComponent}
                        paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                        paginationPerPage={8}
                        perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                        filterText={filterText}
                        persistTableHead="true"
                        style={{borderRadius:'0'}}
                    >

                    </ListingDataTable>
                </Card>
            </div>

        </>
    )
}

export default compose()(Advisors);