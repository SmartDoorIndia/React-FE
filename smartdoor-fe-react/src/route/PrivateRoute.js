/** @format */

import { Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import { CURRENT_DASHBOARD_NAME } from "../common/redux/types";
import { useUserContext } from "../common/helpers/Auth";

const PrivateRoute = ({
   component: Component,
   name,
   bradcrumb,
   path,
   title,
   module,
   tabName,
   headerButton,
   stepper,
   ...rest
}) => {
   const dispatch = useDispatch();
   const { isAuth } = useUserContext();
   // const { disconnectSocket, socket} = useSocket();

   return (
      <Route
         {...rest}
         render={(props) => {
            if (isAuth) {
               dispatch({
                  type: CURRENT_DASHBOARD_NAME,
                  data: { name, bradcrumb, headerButton, path, stepper },
               });

               return (
                  <div style={{ minHeight: "90vh", height: "90vh", overflow: "auto" }}>
                     <Component {...props} title={title} module={module} tabName={tabName} />
                  </div>
               );
            } else {
               // disconnectSocket(socket);

               return (
                  <>
                     <Redirect to="/login" /> <Redirect from="*" to="/builder/login" />
                  </>
               );
            }
         }}
      />
   );
};

export default PrivateRoute;
