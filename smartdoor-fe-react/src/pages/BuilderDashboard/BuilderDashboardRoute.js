/** @format */

import { Suspense } from "react";
import { Switch, Redirect } from "react-router-dom";

import routeData from "./routeData";
import PrivateRoute from "../../route/PrivateRoute";

import { FallBackLoader } from "../../common/helpers/Loader";

const BuilderDashboardRoute = () => {
   return (
      <Suspense fallback={FallBackLoader}>
         <Switch>
            {routeData.map((data, index) => (
               <PrivateRoute {...data} key={index} />
            ))}

            <Redirect from="/builder" to="/builder/detail" />
         </Switch>
      </Suspense>
   );
};

export default BuilderDashboardRoute;
