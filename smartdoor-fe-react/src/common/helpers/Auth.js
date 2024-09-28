/** @format */

import { useContext, createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getLocalStorage, clearLocalStorage } from "./Utils";
import { disconnectSocket } from "./SocketProvider";
import { USER_LOGOUT } from "../redux/types";

// User Context Provider - Use to manage Auth user data.
export const UserContext = createContext();

export const useUserContext = () => {
   return useContext(UserContext);
};

export const AuthProvider = (props) => {
   const history = useHistory();
   const dispatch = useDispatch();

   const [auth, setIsAuth] = useState(provideAuth());

   const logoutUser = () => {
      disconnectSocket();
      clearLocalStorage();
      setIsAuth({ isAuth: false, userData: null });
      history.push("/login");
      dispatch({ type: USER_LOGOUT });
   };

   const loginUser = () => {
      setIsAuth(provideAuth());
      history.push("/admin");
   };

   return (
      <UserContext.Provider
         value={{ isAuth: auth.isAuth, logoutUser, auth, loginUser, userData: auth.userData }}
      >
         {props.children}
      </UserContext.Provider>
   );
};

// Used to logout user.
export const logoutUser = () => {
   disconnectSocket();
   clearLocalStorage();
};

// Used to Auth the user.
export const provideAuth = () => {
   const userData = getLocalStorage("authData");

   if (userData && userData.access_token) {
      return { isAuth: true, userData };
   }

   return { isAuth: false, userData: null };
};

// Use if Token expired.
export const tokenExpired = () => {
   disconnectSocket();
   clearLocalStorage();
   window.open(window.location.origin, "_self");
};

// Use to check the user role
export const userRole = () => {
   // const userData = getLocalStorage('authData');
};
