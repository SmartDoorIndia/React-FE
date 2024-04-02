/** @format */

import { Suspense } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import PrivateRoute from '../../route/PrivateRoute';
import routeData from './routeData';
import { FallBackLoader } from '../../common/helpers/Loader';

const DashboardRoute = () => {
  return (
    <Suspense fallback={ <FallBackLoader /> }>
      <Switch>
        {routeData.map((data, index) => (
          <PrivateRoute { ...data } key={ index } />
        ))}
        <Redirect from="/admin" to="/admin/execution" /> 
      </Switch>
    </Suspense>
  );
};

export default DashboardRoute;
