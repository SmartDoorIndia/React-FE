/** @format */

import { useContext, createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getLocalStorage, clearLocalStorage } from './Utils';
import { disconnectSocket } from './SocketProvider';
import { USER_LOGOUT } from '../redux/types';

// User Context Provider - Use to manage Auth user data.
export const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const AuthProvider = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [auth, setIsAuth] = useState(null);

  const logoutUser = () => {
    disconnectSocket();
    const userData = getLocalStorage('authData');
    setIsAuth({ isAuth: false, userData: null });
    dispatch({ type: USER_LOGOUT });
    // if(userData?.roleId === 22 || userData?.roleId === 19 || userData?.roleId === 1) {
    //   clearLocalStorage();
    //   history?.push('/builder/login');
    // } else {
    //   clearLocalStorage();
    //   history?.push('/login');
    // }
    clearLocalStorage();
      history?.push('/builder/login');
  };

  const loginUser = () => {
    setIsAuth(provideAuth());
    history.push('/admin');
  };

  const storeUserInfo = async () => {
    await setIsAuth(provideAuth());
    history.push('/sign-up');
  };

  useEffect(() => {
    const authenticatedUser = provideAuth();
    setIsAuth(authenticatedUser);
    if (!authenticatedUser.isAuth) {
      history.push('/builder/login'); // Redirect before rendering anything
    }
  }, []);

  if (auth === null) {
    return <div>Loading...</div>; // Prevents flashing the wrong page
  }

  return (
    <UserContext.Provider
      value={{ isAuth: auth.isAuth, logoutUser, auth, loginUser, storeUserInfo, userData: auth.userData }}>
      {props.children}
    </UserContext.Provider>
  );
};

// Used to logout user.
// export const logoutUser = () => {
//   disconnectSocket();
//   clearLocalStorage();
// };

// Used to Auth the user.
export const provideAuth = () => {
  const userData = getLocalStorage('authData');

  if (userData && userData.access_token) {
    return { isAuth: true, userData };
  }

  return { isAuth: false, userData: null };
};

// Use if Token expired.
export const tokenExpired = () => {
  disconnectSocket();
  clearLocalStorage();
  window.open(window.location.origin, '_self');
};

// Use to check the user role
export const userRole = () => {
  // const userData = getLocalStorage('authData');
};
