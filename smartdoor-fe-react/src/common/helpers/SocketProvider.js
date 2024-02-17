/** @format */

import { useContext, createContext, useState } from 'react';
import openSocket from 'socket.io-client';

import Constants from './Constants';
import { provideAuth } from './Auth';


// Establish Socket Connection.
export const socket = new openSocket(Constants.SOCKET_URL, {
  transports: [ 'websocket' ],
  reconnection: true,
  autoConnect: true,
});

// Create Socket Provider.
export const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

// Create Audio Call Provider.
export const AudioCallContext = createContext();

export const useAudioCall = () => {
  return useContext(AudioCallContext);
};

// Use the Socket Provider
export function SocketProvider({ children }) {

  const socketProvider = useProvideSocket(socket);
  const [callInProgress, setCallInProgress ] = useState(false);

  return (
    <SocketContext.Provider value={ { ...socketProvider, socket: socket, callInProgress, setCallInProgress } }>
      {children}
    </SocketContext.Provider>
  );
}

// Use to Subscribe the socket events
function useProvideSocket(socket) {
  const { isAuth, userData } = provideAuth();
  const [ socketLoggedInUserData , setSocketLoggedInUserData ] = useState(null);

  const loginUser = (socket , callback) => {
      if (isAuth) {
        // if (userData.access_token) {
        socket.emit(
            'chat-login',
            {
              user_id: userData.userid,
              role_id: userData.roleId,
            },
            (response) => {
              setSocketLoggedInUserData(response)
              if(callback) callback(true)
            },
        );
        // }
      }
    
    if(callback) callback(false)
  };

  const subscribeHelpDeskEvents = (data) => {
    console.log('SubscribeHelpDeskEvents: ', data);
  };

  const subscribeSocketEvents = (socket) => {
    socket.on('connect', (data) => {     
      if(!socket.connected){        
          socket.connect();
          loginUser(socket);       
      }
    });

    socket.on('connect_error', (error) => {
      setTimeout(() => {
        socket.connect();
      }, 3000);
    });


    socket.on('disconnect', (reason) => {
     
      //manually disconnected ---> do disconnect
      if (reason === 'io client disconnect') {
       
        socket.disconnect();
        socket.removeAllListeners();
      } 
      else if(!socket.connected && reason === "ping timeout" ){
        socket.connect();
        loginUser(socket);
      }
      else {
        socket.connect();
        loginUser(socket);
      }
    });


    socket.on('reconnect', () => {
      if(socket.connected === false){
        socket.connect();
        loginUser(socket);
      }
    });

    socket.on('connecting', () => {
      console.log('SOCKET CONNECTING...: ', socket.connected, socket.id);
    });

    socket.on('reconnecting', (data) => {
      console.log('SOCKET RECONNECTING...: ', socket.connected, socket.id, data);
    });
  };

  const disconnectSocket = (socket) => {
    // socket.emit('disconnect');
    socket.close();
    socket.disconnect();
    socket.removeAllListeners();
  };

  const connectSocket = (socket) => {
    socket.connect();
    loginUser(socket);
  };

  return {
    subscribeHelpDeskEvents,
    subscribeSocketEvents,
    disconnectSocket,
    connectSocket,
    loginUser,
    socketLoggedInUserData
  };
}

// To Disconnect Socket.
export function disconnectSocket() {
 // socket.emit('disconnect');
  socket.close();
  socket.disconnect();
  socket.removeAllListeners();
}