import { compose } from "redux"
import Text from "../../../shared/Text/Text";
// import { connect } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "../../../common/helpers/SocketProvider";
import { Card, Divider, InputAdornment, TextField } from "@mui/material";
import Buttons from "../../../shared/Buttons/Buttons";
import { formateDate, getLocalStorage, showErrorToast } from "../../../common/helpers/Utils";
import { Col, Row } from "react-bootstrap";


const ChatWithOwner = (props) => {

    const [chatHistory, setChatHistory] = useState([]);
    const { roleId, userId, ownerId, ownerName } = props.location.state
    const { socket, socketLoggedInUserData, connectSocket, subscribeSocketEvents } = useSocket();
    const [message, setMessage] = useState('');
    const [disableSend, setDisableSend] = useState(true);
    const userData = getLocalStorage('authData');
    
    const handleUpdateChatEvent = (response) => {
        if(response.sender_id !== userId) {
            let chatData = [...chatHistory];
            chatData.push(response)
            setChatHistory(chatHistory => [...chatHistory, ...chatData])
        } 
    };

    const _handleCallEvents = useCallback(async () => {

        await socket.emit(
            'chat-history',
            {
                sender_id: userId,
                receiver_id: ownerId,
                pagination: 100,
                page: 1,
                visit_id: 3,
                is_visit: true
            },
            (response) => {
                let chatData = response.data;
                let newChatHistory = [...chatData].reverse(); // Create a new array based on response data
                //  console.log(newChatHistory); // Log newChatHistory to verify the data
                setChatHistory(chatHistory => [...newChatHistory]);
            })
    }, [socket, userId, ownerId, setChatHistory]);
    const chatHistoryContainerRef = useRef(null);

    useEffect(() => {
        console.log('CONNECT SOCKET SERVER', socket.id, socket, socketLoggedInUserData);
        console.log(ownerId)
        if (!socketLoggedInUserData) {
            connectSocket(socket);
        }
    }, [socket, socketLoggedInUserData])

    useEffect(() => {
        subscribeSocketEvents(socket);
        if(chatHistory.length === 0) {
            _handleCallEvents();
        }
        socket.on('updatechat', handleUpdateChatEvent);
        return () => {
            socket.off('updatechat', handleUpdateChatEvent);
        };
    }, [socket])

    useEffect(() => {
        if (chatHistoryContainerRef.current) {
            chatHistoryContainerRef.current.scrollTop = chatHistoryContainerRef.current.scrollHeight;
        }
    }, [chatHistory?.length]);

    const sendMessageEvent = async () => {
        console.log(message)
        setMessage(message.trim())
        if ((message.trim()).length !== 0) {
            if (message !== null || message !== '') {
                await socket.emit(
                    'sendMessage',
                    {
                        sender_id: userId,
                        sender_role_id: userData?.roleId,
                        receiver_id: ownerId,
                        receiver_role_id: roleId,
                        pagination: 100,
                        page: 1,
                        visit_id: 3,
                        is_visit: true,
                        message_type: 0,
                        message: message,
                    },
                    async (response) => {
                        console.log(response)
                        let chatData = [...chatHistory];
                        chatData.push(response.data)
                        setChatHistory(chatHistory => [...chatData])
                        setMessage('');
                        setDisableSend(true)
                    })
            }
        } else {
            setDisableSend(true)
            showErrorToast("Invalid message");
        }
    }

    return (
        <div className="whiteBg">
            <div className="d-flex">
                <Text
                    fontSize="medium"
                    fontWeight="medium"
                    color="secondryColor"
                    text={ownerName}
                />
            </div>
            <Divider />
            {chatHistory.length === 0 ?
                <>
                    <div className="text-center">
                        <Text
                            fontSize="medium"
                            fontWeight="medium"
                            color="secondryColor"
                            text={'No chats to display'}
                        />
                    </div>
                </> : null}
            <div style={{ height: '21rem', overflowY: 'auto' }} className='chatHistoryContainerRef' ref={chatHistoryContainerRef} >
                {chatHistory.map((chat) => (
                    <>
                        <Row className="row col-12">
                            <Col lg='1' className=""></Col>

                            <Col lg='5' className="mt-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                {chat.sender_id === ownerId ?
                                    <>
                                        {/* <Chip label={chat.message} /> */}
                                        <div style={{ marginRight: 'auto', marginBottom: '0px' }}>
                                            <Card className="p-1" style={{ width: 'fit-content', backgroundColor: '#E5CBD5', borderBottomLeftRadius: '0%' }}>
                                                {chat.message}
                                            </Card>
                                        </div>
                                        <div>
                                            <Text
                                                fontSize="40px"
                                                fontWeight="400"
                                                color="secondryColor"
                                                text={formateDate(chat.date_time, 'DD/MM/yyyy hh:mm:ss')}
                                            />
                                        </div>
                                    </>
                                    : null}
                            </Col>
                            <Col lg='5' className="mt-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                {chat.sender_id === userId ?
                                    <>
                                        <div style={{ marginLeft: 'auto', marginBottom: '0px' }}>
                                            <Card className="p-1" style={{ width: 'fit-content', backgroundColor: '#BE1452', borderBottomRightRadius: '0%', color:'white' }}>
                                                {chat.message}
                                            </Card>
                                        </div>

                                        <div>
                                            <Text
                                                fontSize="40px"
                                                fontWeight="400"
                                                color="secondryColor"
                                                text={formateDate(chat.date_time, 'DD/MM/yyyy hh:mm:ss')}
                                            />
                                        </div>
                                    </>
                                    : null}
                            </Col>
                            <Col lg='1'></Col>
                        </Row>
                    </>
                ))}
            </div>

            <div className="d-flex mt-3">
                <TextField
                    className="w-100"
                    style={{ borderRadius: '30px' }}
                    borderRadius={'30px'}
                    value={message}
                    autoFocus
                    // multiline
                    onChange={(e) => {
                        setMessage(e.target.value);
                        if (e.target.value === '') {
                            setDisableSend(true);
                        } else {
                            setDisableSend(false);
                        }
                    }}
                    onKeyDown={(e) => { if (e.key === 'Enter') { sendMessageEvent() } }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <Buttons
                                    style={{ float: 'left' }}
                                    name="Send"
                                    type='submit'
                                    varient="primary"
                                    disabled={disableSend}
                                    size="xSmall"
                                    color="white"
                                    className=" mb-1"
                                    onClick={() => { sendMessageEvent() }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>

        </div>
    )
}

// const mapStateToProps = ({ }) => ({
// });

// const actions = {
// };

// const withConnect = connect(mapStateToProps, actions);
export default compose(ChatWithOwner);