/** @format */

import './DashboardLayout.scss';

import AgoraRTC from 'agora-rtc-sdk';
import Container from 'react-bootstrap/Container';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { Col, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from 'react';

import Nav from '../../shared/Navigation/Navigation';
import Header from '../../shared/Header/Header';
import DashboardRoute from './DashboardRoute';

import { setAuthData, generateAgoraToken } from '../../common/redux/actions'
import { useSocket, AudioCallContext } from '../../common/helpers/SocketProvider'
import { showErrorToast, generateRandomString } from '../../common/helpers/Utils'

import pickCallIcon from '../../assets/svg/pickCall.svg';
import dropCallIcon from '../../assets/svg/dropCall.svg';
import endCallIcon from '../../assets/svg/endCall.svg';
import holdCallIcon from '../../assets/svg/holdCall.svg';
import playCallIcon from '../../assets/svg/playCall.svg';
import ringTone from '../../assets/SmartdoorApp-CallerTune.wav';

// Initialize Agora Client.
const AGORA_CLIENT = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
});

// Initialize Agora Local Stream.
const localStream = AgoraRTC.createStream({
  audio: true,
  video: false,
});

// Handle errors.
const handleError = function(err) {
  console.log('Error: ', err);
};

function joinAudioCall(channelData) {
  // Query the container to which the remote stream belong.
  const remoteContainer = document.getElementById('remote-container');

  // Add video streams to the container.
  function addVideoStream(elementId) {
    // Creates a new div for every stream
    const streamDiv = document.createElement('div');
    // Assigns the elementId to the div.
    streamDiv.id = elementId;
    // Takes care of the lateral inversion
    streamDiv.style.transform = 'rotateY(180deg)';
    // Adds the div to the container.
    remoteContainer.appendChild(streamDiv);
  }

  // Remove the video stream from the container.
  function removeVideoStream(elementId) {
    const remoteDiv = document.getElementById(elementId);
    if (remoteDiv) remoteDiv.parentNode.removeChild(remoteDiv);
  }

  // Init Call Setup
  AGORA_CLIENT.init(
    'dc5450ffc03c4879bd5ee22a68ec8e93',//'355539b5e0b448829c574b14c75e3e6e'-//appid
      function() {
        console.log('client initialized');
      },
      function(err) {
        console.log('client init failed ', err);
      },
  );

  // Join a channel
  AGORA_CLIENT.join(
      channelData.tempToken,
      channelData.roomName,
      null,
      (uid) => {
        // Initialize the local stream
        console.log("test client" + uid + "joined channel"); 
        localStream.init(() => {
          // Play the local stream
          localStream.play('me');
          // Publish the local stream
          AGORA_CLIENT.publish(localStream, handleError);
        }, handleError);
      },
      handleError,
  );

  function _subscribeAudioCallEvents() {
    // Subscribe to the remote stream when it is published
    AGORA_CLIENT.on('stream-added', function(evt) {
      AGORA_CLIENT.subscribe(evt.stream, handleError);
    });
    // Play the remote stream when it is subsribed
    AGORA_CLIENT.on('stream-subscribed', function(evt) {
      const stream = evt.stream;
      const streamId = String(stream.getId());
      addVideoStream(streamId);
      stream.play(streamId);
    });

    // Remove the corresponding view when a remote user unpublishes.
    AGORA_CLIENT.on('stream-removed', function(evt) {
      const stream = evt.stream;
      const streamId = String(stream.getId());
      stream.close();
      removeVideoStream(streamId);
    });

    // Remove the corresponding view when a remote user leaves the channel.
    AGORA_CLIENT.on('peer-leave', function(evt) {
      const stream = evt.stream;
      const streamId = String(stream.getId());
      stream.close();
      removeVideoStream(streamId);
    });
  }

  _subscribeAudioCallEvents();
}

// Handle Event Remove/ Leave audio calls.
function _onLeaveAudioCall(){
  console.log(AgoraRTC.VERSION);
  AGORA_CLIENT.leave(
    function () {
      console.log('client leaves channel');
    },
    function (err) {
      console.log('client leave failed', err);
      // error handling
    }
  );

  AGORA_CLIENT.off('stream-added');
  AGORA_CLIENT.off('stream-subscribed');
  AGORA_CLIENT.off('stream-removed');
  AGORA_CLIENT.off('peer-leave');
  localStream.close();
}

const DashboardLayout = (props) => {
  const { socket , socketLoggedInUserData , connectSocket, subscribeSocketEvents, callInProgress, setCallInProgress  } =
      useSocket();
  // const socketRef = useRef(socket);
  const { setAuthData, userAuthData } = props;
  const [ showCallingCard, setShowCallingCard ] = useState(false);
  const [ callingData, setCallingData ] = useState(null);
  const [ callStarted, setCallStarted ] = useState(false);
  // const [ counter, setCounter ] = useState(0);
  const [ muteCall, setMuteCall ] = useState(false);
  const [isIncomingCall, setIsIncomingCall ] = useState(false);
  const callingDataRef = useRef();

  const [ outgoingCallingData, setOutgoingCallingData ] = useState(null);
  const [ outgoingCallStarted, setOutgoingCallStarted ] = useState(false);
  const outgoingCallingDataRef = useRef();

  const [callReceived, setCallReceived] = useState(false);
  const callTimeoutRef = useRef(null);

  async function startRingTone() {
    const ringtone = document.getElementById('ringtone');
    try {
      await ringtone.play();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  } 
  
  const _handleCallEvents = useCallback(() => {
    // socket.removeAllListeners();

    subscribeSocketEvents(socket);

    // socket.on('disconnect', (reason) => {
    //   console.log('DISCONNECTED REASON:', reason);

    //   _resetStateData();
    //   // _onLeaveAudioCall();
    // });

     socket.on('audioIncomingCall', (data) => {
        if (!callingData && data?.tempToken && !callInProgress && !isIncomingCall) {
          startRingTone();
          setShowCallingCard(true)
          setCallInProgress(true)
          setCallingData(data);
          callingDataRef.current = data ;
          setIsIncomingCall(true);
        }
    });

    socket.on('endAudioCall', (data) => {
      // _resetStateData();
      _onLeaveAudioCall();
      setShowCallingCard(false);
      setCallInProgress(false);
      setCallingData(null);
      setOutgoingCallingData(null);
      setOutgoingCallStarted(false);
      setCallStarted(false);
      setMuteCall(false);
      callingDataRef.current = null;
      outgoingCallingDataRef.current = null;
    });

    socket.on('acceptedByOther', (data) => {
      if (data.sender_id !== userAuthData.authData.userid && !callingData) {
        _resetStateData();
      }
    });

    socket.on('rejectAudioCall', (data) => {
      console.log('CALL REJECTED: ', data);
      _resetStateData();
      _onLeaveAudioCall();
    });

    socket.on('audioCallAccepted', (data) => {
      console.log('CALL ACCEPTED BY CONSUMER: ', data);
      const callData = outgoingCallingDataRef.current;
      setOutgoingCallStarted(true);
      joinAudioCall({ tempToken: callData?.tempToken, roomName: callData?.roomName });
    });
  }, [callingData, socket]);

  useEffect(()=>{
    console.log('CONNECT SOCKET SERVER', socket.id , socket , socketLoggedInUserData);
    if (!socketLoggedInUserData) {
      connectSocket(socket);
    }
  }, [socket,socketLoggedInUserData])

  function _resetStateData() {
    const ringtone = document.getElementById('ringtone');
    ringtone.pause();
    ringtone.currentTime = 0;
    setShowCallingCard(false);
    setCallInProgress(false);
    setCallingData(null);
    setOutgoingCallingData(null);
    setOutgoingCallStarted(false);
    setCallStarted(false)
    setIsIncomingCall(false);
    callingDataRef.current = null;
    outgoingCallingDataRef.current = null;
  }

  function _handleCallAccept() {
    const ringtone = document.getElementById('ringtone');
    ringtone.pause();
    ringtone.currentTime = 0;
    setCallReceived(true);
    clearTimeout(callTimeoutRef.current);
    if (callingData && userAuthData.authData.access_token) {
      console.log('CALL_ACCEPT');
      socket.emit(
          'acceptAudioCall',
          {
            helpdesk: true,
            receiver_id: Number(callingData.sender_id),
            receiver_role_id: Number(callingData.sender_role_id),
            sender_id: Number(userAuthData.authData.userid),
            sender_role_id: Number(userAuthData.authData.roleId),
            callId: callingData.callId,
          },
          (response) => {
            console.log('AcceptAudioCall Res:', response);
            if (response.success === 1) {
              joinAudioCall(callingData);
              setCallStarted(true);
              setCallInProgress(true);
              props.history.push({pathname:`/admin/helpdesk/consumer-details/${ callingData.sender_id }`,state: { showCallingCard: showCallingCard } });//showCallingCard
            } else {
              showErrorToast(response.msg);
            }
          },
      );
    }
  }

  function _handleCallReject() {
    const data = callingDataRef.current;
    console.log("data: dashboardlayout.js,handleCallReject:", data);
    if (data && userAuthData.authData.access_token) {
      socket.emit(
          'rejectAudioCall',
          {
            receiver_id: data.sender_id,
            receiver_role_id: data.sender_role_id,
            sender_id: userAuthData.authData.userid,
            sender_role_id: Number(userAuthData.authData.roleId),
            callId: data.callId,
          },
          (response) => {
            if (response.success === 0) {
              showErrorToast(response.msg);
            }
            console.log('RejectAudioCall Res:', response);
            _resetStateData();
          },
      );
    }

  }

  

  const _handleCallMute = useCallback(() => {
    console.log('AUDIO_MUTE: ', localStream.hasAudio());

    if (muteCall) {
      localStream.unmuteAudio();
      setMuteCall(false);
    } else {
      localStream.muteAudio();
      setMuteCall(true);
    }
  }, [muteCall]);

 

  function _handleCallEnd() {
    console.log(callReceived,callInProgress,"end call funcion fired");
    const data = callingDataRef.current;
    console.log(data,"data in end call");
    if (data && userAuthData.authData.access_token) {
      socket.emit(
          'endAudioCall',
          {
            receiver_id: data.sender_id,
            call_duration: 0,
            receiver_role_id: data.sender_role_id,
            sender_id: userAuthData.authData.userid,
            callId: data.callId,
          },
          (response) => {
            console.log('EndAudioCall Res:', response);
            console.log("print::", callStarted, callingData, outgoingCallingData, outgoingCallStarted)
            _resetStateData();
          },
      );
      _onLeaveAudioCall();
    }
  }

  useEffect(()=>{
    if (!userAuthData.authData.access_token) {
      setAuthData();
    }
  }, [userAuthData])

  useEffect(() => {
    console.log("4th useeffect");
    _handleCallEvents();
    // if (callInProgress && !callReceived) {
    //   console.log("calling time start");
    //   // Start the timeout of 40 seconds
    //   callTimeoutRef.current = setTimeout(() => {
    //     console.log("inside timeout");
    //     if (!callReceived) {
    //       console.log("call is not received");
    //       _handleCallEnd();
    //     }
    //   }, 5000);
    // }

    // return () => {
    //   // Clear the timeout on component cleanup
    //   clearTimeout(callTimeoutRef.current);
    // };

    // return () => {
    //   // _handleCallEnd();
    //   // _handleCallReject();
    //   // _handleOutgoingCallReject();
    //   // _handleOutgoingCallEnd();
    // };
  }, [_handleCallEvents, callInProgress, callReceived]);
  const makeAudioCall = async (userData) => {
    console.log(userData);
    const tokenData = await generateAgoraToken({ channelName: generateRandomString(8) });
    if (tokenData?.data?.resourceData?.token) {
      const { token, channelName } = tokenData.data.resourceData;
      const data = {
        helpdesk: false,
        receiver_id: userData.id,
        receiver_role_id: userData.roleId,
        sender_id: userAuthData.authData.userid,
        sender_role_id: userAuthData.authData.roleId,
        tempToken: token,
        roomName: channelName,
        userName: userData.name,
      };

      socket.emit('makeAudioCall', data, (response) => {
        console.log('makeAudioCall Res:', response, data);
        if (response.success === 1) {
          // joinAudioCall({tempToken:token, roomName:channelName});

          setShowCallingCard(true);
          setCallInProgress(true);
          setOutgoingCallingData(response.data);
          outgoingCallingDataRef.current = response.data;
        } else {
          showErrorToast(response.msg);
        }
      });
    }
  };

  function _handleOutgoingCallReject() {
    const data = outgoingCallingDataRef.current;

    if (data && userAuthData.authData.access_token) {
      socket.emit(
          'rejectAudioCall',
          {
            receiver_id: data.receiver_id,
            receiver_role_id: data.receiver_role_id,
            sender_id: userAuthData.authData.userid,
            sender_role_id: Number(userAuthData.authData.roleId),
            call_sent_to:  data.call_sent_to,
            callId: data.callId,
          },
          (response) => {
            if (response.success === 0) {
              showErrorToast(response.msg);
            }
            _resetStateData();
            console.log('RejectAudioCall Res:', response);
          },
      );
    }
  }

  function _handleOutgoingCallEnd() {
    const data = outgoingCallingDataRef.current;

    if (data && userAuthData.authData.access_token) {
      socket.emit(
          'endAudioCall',
          {
            receiver_id: data.receiver_id,
            call_duration: 0,
            receiver_role_id: data.receiver_role_id,
            sender_id: userAuthData.authData.userid,
            callId: data.callId,
          },
          (response) => {
            console.log('EndAudioCall Res:', response);
            _resetStateData();
          },
      );
      // _onLeaveAudioCall();
    }

  }

  

  // console.log("outgoingCallStarted:karishma", outgoingCallStarted)

  return (
    <Container fluid>
     <audio id="ringtone" controls loop style={{ display: 'none' }}>
      <source src={ringTone} type="audio/wav" />
      </audio>
      <div id="me" 
      // onLoad={()=>{loginUser(socket)}}
      />
      <div id="remote-container"> </div>

      <div className="dashboard">
        <Row>
          <Col lg={ 3 } className="pt_15">
            <Nav />
          </Col>
          <Col lg={ 9 } className="pt_15">
            <div className="rightBox">
              <div className="headerTop">
                <Header
                  _handleCallReject={ _handleCallReject }
                  _handleCallEnd={ _handleCallEnd }
                />
              </div>
            </div>

            <AudioCallContext.Provider value={ { makeAudioCall: makeAudioCall } } >
              <DashboardRoute />
            </AudioCallContext.Provider>

            {/* <div className="m-5"></div> */}
            {
                        showCallingCard ?
                          <div className="callingCard">
                            <div className="cardWidth">
                              {callingData || outgoingCallingData ? (
                                <div className="callingData_card cursor-pointer">
                                  {callingData ? (
                                    callStarted ? (
                                      <div
                                        onClick={ () => {
                                          props.history.push(
                                              `/admin/helpdesk/consumer-details/${ callingData.sender_id }`,
                                          );
                                        } }
                                        className="profileName">
                                        <span>{`${ 'Connected to:  ' }  ${
                                             callingData.userName && callingData.userName !== 'null' ?
                                                callingData.userName.capitalizeWord() :
                                                'Unknown'
                                        }`}</span>
                                      </div>
                                    ) : (
                                      <div className="profileName">
                                        <span>{`${ 'Incoming call from:  ' }  ${
                                             callingData.userName && callingData.userName !== 'null' ?
                                                callingData.userName.capitalizeWord() :
                                                'Unknown'
                                        }`}</span>
                                      </div>
                                    )
                                 ) : null}

                                  {outgoingCallingData ? (
                                    outgoingCallStarted ? (
                                      <div
                                        onClick={ () => {
                                          props.history.push(
                                              `/admin/helpdesk/consumer-details/${ callingData.sender_id }`,
                                          );
                                        } }
                                        className="profileName">
                                        <span>{`${ 'Connected to:  ' }  ${
                                             outgoingCallingData.userName &&
                                             outgoingCallingData.userName != 'null' ?
                                                outgoingCallingData.userName.capitalizeWord() :
                                                'Unknown'
                                        }`}</span>
                                      </div>
                                    ) : (
                                      <div className="profileName">
                                        <span>{`${ 'Outgoing call to:  ' }  ${
                                             outgoingCallingData.userName &&
                                             outgoingCallingData.userName !== 'null' ?
                                                outgoingCallingData.userName.capitalizeWord() :
                                                'Unknown'
                                        }`}</span>
                                      </div>
                                    )
                                 ) : null}

                                  {callStarted || outgoingCallStarted ? (
                                    <div className="buttonBox">
                                      {/* <Timer />*/}
                                      <button
                                        className="btn_Reject callButton endCall"
                                        onClick={ () => {
                                             outgoingCallStarted ?
                                                _handleOutgoingCallEnd() :
                                                _handleCallEnd();
                                                // disconnectSocket(socket)
                                        } }>
                                        <img src={ endCallIcon } alt="icon" />
                                        <br />
                                        <span>End Call</span>
                                      </button>

                                      <button
                                        className="btn_Hold callButton"
                                        onClick={ () => {
                                          _handleCallMute();
                                        } }>
                                        <img
                                          src={ muteCall ? playCallIcon : holdCallIcon }
                                          alt="icon"
                                        />
                                        <br />
                                        <span>{muteCall ? 'Unmute' : 'Mute'}</span>
                                      </button>
                                    </div>
                                 ) : (
                                   <div className="buttonBox">
                                     {outgoingCallingData ? (
                                       <button
                                         className="btn_Reject callButton"
                                         onClick={ () => {
                                           _handleOutgoingCallReject();
                                          //  disconnectSocket(socket)
                                         } }>
                                         <img src={ dropCallIcon } alt="icon" />
                                         <br />
                                         <span>Decline</span>
                                       </button>
                                       ) : (
                                         <>
                                           <button
                                             className="btn_Reject callButton"
                                             onClick={ () => {
                                               _handleCallReject();
                                              //  disconnectSocket(socket) 
                                             } }>
                                             <img src={ dropCallIcon } alt="icon" />
                                             <br />
                                             <span>Decline</span>
                                           </button>

                                           <button
                                             className="btn_accept callButton"
                                             onClick={ () => {
                                               _handleCallAccept();
                                             } }>
                                             <img src={ pickCallIcon } alt="icon" />
                                             <br />
                                             <span>
                                               Open
                                               <br />
                                               Contact
                                             </span>
                                           </button>
                                         </>
                                       )}
                                   </div>
                                 )}
                                </div>
                           ) : null}
                            </div>
                          </div> :
                   null}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

const mapStateToProps = ({ userAuthData }) => ({
  userAuthData,
});

const actions = {
  setAuthData,
};

const withConnect = connect(mapStateToProps, actions);

export default compose(withConnect, withRouter)(DashboardLayout);
