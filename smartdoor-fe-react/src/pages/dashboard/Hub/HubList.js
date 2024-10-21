import { useEffect, useState } from 'react';
import contentIco from '../../../assets/images/content-ico.svg';
import Image from '../../../shared/Image';
import { showErrorToast, showSuccessToast, ToolTip } from '../../../common/helpers/Utils';
import Text from '../../../shared/Text/Text';
import Pagination from '../../../shared/DataTable/Pagination';
import Loader, { TableLoader } from '../../../common/helpers/Loader';
import Buttons from '../../../shared/Buttons/Buttons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import DataTableComponent from '../../../shared/DataTable/DataTable';
import './HuBList.scss';
import { createNewHub, getHubList } from '../../../common/redux/actions';
import { Modal } from 'react-bootstrap';
import { TextField } from '@mui/material';

const HubList = (props) => {
    const { allHubList, getHubList } = props;

    const [newHub, setNewHub] = useState({
        hubId: null,
        hubName: ''
    });
    const [showAddNewHubModal, setShowAddNewHubModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    let recordSize = 0;

    const columns = [
        {
            name: "Id",
            selector: ((row) => row.hubId),
            sortable: true,
            center: true,
            minWidth: "150px",
            cell: ({ hubId }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={hubId}>
                    <Text size="Small" color="secondryColor elipsis-text" text={hubId} />
                </ToolTip>
            ),
            id: 1
        },
        {
            name: "Name",
            selector: ((row) => row.hubName),
            sortable: false,
            center: true,
            minWidth: "200px",
            style: { padding: "0 !important" },
            cell: ({ hubName }) => (
                <ToolTip position="top" style={{ width: '100%' }} name={hubName}>
                    <Text size="Small" color="secondryColor elipsis-text" text={hubName} />
                </ToolTip>
            ),
            id: 2
        },
        {
            name: "Action",
            sortable: false,
            center: true,
            maxWidth: "150px",
            cell: ({ hubId, hubName }) => (
                <div className="action" style={{ cursor: 'pointer' }} >
                    <ToolTip position="left" name="Edit Details">
                        <span>
                            <Image name="editIcon" src={contentIco} onClick={() => {
                                setShowAddNewHubModal(true);
                                setNewHub(prevHub => ({
                                    ...prevHub,
                                    hubId: hubId,
                                    hubName: hubName
                                }));

                                console.log(hubId)
                            }} />
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

    const handlePageChange = async (e) => {

    }

    const handleRowsPerPageChange = async (e) => {

    }

    let PaginationComponent = ({ onChangePage, onChangeRowsPerPage, ...props }) => (
        <Pagination {...props}
            rowCount={allHubList?.data?.hubList?.length}
            rowsPerPage={rowsPerPage}
            // onChangeRowsPerPage={handleRowsPerPageChange}
            currentPage={currentPage}
            // onChangePage={handlePageChange}
            paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
            PaginationActionButton={PaginationActionButton} />
    );
    const ProgressComponent = <TableLoader />;

    useEffect(() => {
        getHubList();
    }, []);

    const showData = () => {
        return allHubList.data.hubList;
    }

    return (
        <>
            <div className="tableBox ">
                <div className="align-items-center tableHeading">
                    <div className="d-flex justify-content-between">
                        {/* <div>
                            <Text
                                size="regular"
                                fontWeight="mediumbold"
                                color="secondryColor"
                                text="Properties on Smartdoor"
                            />
                        </div> */}
                    </div>
                    <div className="locationSelect justify-content-end d-flex mt-2">
                        <div className="ml-3">
                            <Buttons
                                name="Add New Hub"
                                varient="primary"
                                size="Small"
                                color="white"
                                style={{ height: "40px !important" }}
                                onClick={async () => {
                                    setShowAddNewHubModal(true);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="hubListTableWrapper" >
                    <DataTableComponent
                        data={showData()}
                        columns={columns}
                        progressPending={allHubList?.isLoading}
                        progressComponent={ProgressComponent}
                        // paginationComponent={PaginationComponent}
                        // paginationRowsPerPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                        // paginationPerPage={rowsPerPage}
                        // currentPage={currentPage}
                        // onChangePage={handlePageChange}
                        // onChangeRowsPerPage={handleRowsPerPageChange}
                        // perPageOptions={[8, 16, 24, 32, 40, 48, 56, 64, 72, 80]}
                        // paginationServer={true}
                        persistTableHead
                    />
                </div>
            </div>
            <Modal show={showAddNewHubModal} onHide={() => { setShowAddNewHubModal(false); }} centered >
                <Modal.Header className='text-center'>
                    <Text text={newHub.hubId !== null ? 'Edit Hub' : 'Add New Hub'} style={{ fontSize: '20px', fontWeight: '700' }} />
                </Modal.Header>
                <Modal.Body>
                    <div className='text-center'>
                        <TextField
                            label='Enter hub name'
                            type='text'
                            onChange={(e) => {
                                setNewHub(prevHub => ({
                                    ...prevHub,
                                    hubName: e.target.value
                                }));
                            }}
                            value={newHub.hubName}
                        />
                    </div>
                    <div className='text-center mt-3'>
                        {loading ?
                            <Loader />
                            :
                            <Buttons name={newHub.hubId !== null ? 'Save' : 'Add New Hub'} variant='primary'
                                onClick={async () => {
                                    setLoading(true);
                                    console.log(newHub)
                                    const response = await createNewHub(newHub);
                                    setLoading(false);
                                    if (response.status === 200) {
                                        showSuccessToast('Hub saved successfully');
                                        getHubList();
                                        setShowAddNewHubModal(false);
                                    } else {
                                        showErrorToast('Please try again later...');
                                        return null;
                                    }
                                }}></Buttons>
                        }
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

const mapStateToProps = ({ allHubList }) => ({ allHubList });
const actions = {
    getHubList
};

export default compose(connect(mapStateToProps, actions))(HubList);