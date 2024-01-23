import { Autocomplete, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { getAllConsumers } from '../../../common/redux/actions';
import { connect } from "react-redux";
import Text from "../../../shared/Text/Text";
import Buttons from "../../../shared/Buttons/Buttons";

const AddCoins = (props) => {

    const { getAllConsumers, getAllConsumerUsersData } = props;

    const [userList, setUserList] = useState([])
    const [selectedUser, setSelectedUser] = useState({})
    const [coinData, setCoinData] = useState({
        coins: 0,
        expiryDate: new Date().toISOString().split('T')[0],
        header: '',
        description: '',
        user: {}
    })


    // const [filterText, setFilterText] = React.useState('');
    // const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

    useEffect(() => {
        getAllConsumers({ city: '', records: '', pageNumber: '' });
        setUserList((getAllConsumerUsersData?.data))
        console.log('userList ', getAllConsumerUsersData?.data)
    }, [])

    // const subHeaderComponentMemo = React.useMemo(() => {
    //     const handleClear = () => {
    //       if (filterText) {
    //         setResetPaginationToggle(!resetPaginationToggle);
    //         setFilterText('');
    //       }
    //     };

    //     return (
    //         <SearchInput onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} placeholder='Search here' />
    //     );
    // }, [filterText, resetPaginationToggle]);

    const showData = () => {
        let filteredItems = [];
        filteredItems = getAllConsumerUsersData?.data?.length > 0 ?
            getAllConsumerUsersData?.data : [];
        return filteredItems;
    }

    const handleAutocompleteChange = (event, newValue) => {
        console.log(newValue)
        setSelectedUser(newValue)
        setCoinData({ ...coinData, user: newValue })
    };
    return (
        <>
            <div className="whiteBg">
                <Row>
                    <Col lg='4'>
                        <TextField
                            className='w-100'
                            id="outlined-required"
                            label='Coins'
                            type="number"
                            inputProps={{ min: 0 }}
                            defaultValue={coinData.coins}
                            onInput={(e) => { setCoinData({ ...coinData, coins: e?.target?.value }) }}
                        >
                        </TextField>
                    </Col>
                    <Col lg='4'>
                        <TextField
                            className='w-100'
                            id="outlined-required"
                            label='Expiry Date'
                            type="date"
                            defaultValue={coinData.expiryDate}
                            onInput={(e) => { setCoinData({ ...coinData, expiryDate: e?.target?.value }) }}
                        >
                        </TextField>
                    </Col>
                    <Col lg='4'>
                        <TextField
                            className='w-100'
                            id="outlined-required"
                            label='Header'
                            type="text"
                            defaultValue={coinData.header}
                            onInput={(e) => { setCoinData({ ...coinData, header: e?.target?.value }) }}
                        >
                        </TextField>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col lg='4'>
                        <TextField
                            className='w-100'
                            id="outlined-required"
                            label='Description'
                            type="text"
                            defaultValue={coinData.description}
                            onInput={(e) => { setCoinData({ ...coinData, description: e?.target?.value }) }}
                        >
                        </TextField>
                    </Col>

                    <Col lg='4'>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={userList}
                            getOptionLabel={(option) => option.mobile + ' , ' + option.name}
                            onChange={handleAutocompleteChange}
                            renderInput={(params) => <TextField {...params} label="Users" />}
                        />
                    </Col>

                </Row>
                {selectedUser?.id !== undefined ?
                    <>
                        <Row>
                        </Row>
                            <div className='d-flex'>
                                <Col lg="4">
                                    <Text
                                        size="regular"
                                        fontWeight=""
                                        color="secondryColor"
                                        className="text-start"
                                        text="Id :" />
                                </Col>
                                <Col lg="4">
                                    <Text
                                        size="regular"
                                        fontWeight=""
                                        color="secondryColor"
                                        className="text-start"
                                        text={selectedUser.id === null ? "-" : selectedUser.id} />
                                </Col>
                            </div>
                            <div className='d-flex'>
                                <Col lg="4">
                                    <Text
                                        size="regular"
                                        fontWeight=""
                                        color="secondryColor"
                                        className="text-start"
                                        text="name :" />
                                </Col>
                                <Col lg="4">
                                    <Text
                                        size="regular"
                                        fontWeight=""
                                        color="secondryColor"
                                        className="text-start"
                                        text={selectedUser.name === null ? '-' : selectedUser.name} />
                                </Col>

                            </div>
                            <div className='d-flex'>
                                <Col lg="4">
                                    <Text
                                        size="regular"
                                        fontWeight=""
                                        color="secondryColor"
                                        className="text-start"
                                        text="Mobile No :" />
                                </Col>
                                <Col lg="4">
                                    <Text
                                        size="regular"
                                        fontWeight=""
                                        color="secondryColor"
                                        className="text-start"
                                        text={selectedUser.mobile === null ? "-" : selectedUser.mobile} />
                                </Col>

                            </div>
                            <div className='d-flex'>
                                <Col lg="4">
                                    <Text
                                        size="regular"
                                        fontWeight=""
                                        color="secondryColor"
                                        className="text-start"
                                        text="Coin Balance :" />
                                </Col>
                                <Col lg="4">
                                    <Text
                                        size="regular"
                                        fontWeight=""
                                        color="secondryColor"
                                        className="text-start"
                                        text={selectedUser.coinBalance === null ? "-" : selectedUser.coinBalance} />
                                </Col>

                            </div>
                            <div className='d-flex'>
                                <Col lg="4">
                                    <Text
                                        size="regular"
                                        fontWeight=""
                                        color="secondryColor"
                                        className="text-start"
                                        text="User Type :" />
                                </Col>
                                <Col lg="4">
                                    <Text
                                        size="regular"
                                        fontWeight=""
                                        color="secondryColor"
                                        className="text-start"
                                        text={selectedUser.userType === null ? "-" : selectedUser.userType} />
                                </Col>

                            </div>
                    </> : <></>}

                    <div className="d-flex mt-3">
                        <Buttons name='Submit' varient="primary"
                            size="Small"
                            color="white"
                            onClick={() => {}}
                        />
                    </div>
            </div>
        </>
    )
}

const mapStateToProps = ({ getAllConsumerUsersData }) => ({
    getAllConsumerUsersData,
});


const actions = {
    getAllConsumers,
};

export default connect(mapStateToProps, actions)(AddCoins)