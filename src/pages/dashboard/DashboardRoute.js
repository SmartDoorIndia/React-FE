/** @format */

import { Suspense, useEffect, useState } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import PrivateRoute from '../../route/PrivateRoute';
import routeData from './routeData';
import { FallBackLoader } from '../../common/helpers/Loader';
import { getLocalStorage } from '../../common/helpers/Utils';

const DashboardRoute = () => {

  const userData = getLocalStorage('authData');

  const [redirectUrl, setRedirectUrl] = useState(() => {
    if(userData.roleId === 17) {
      return ('/admin/agencyProperties')
    }
    else if(userData.roleId === 18) {
      return ('/admin/executive/properties')
    } else {
      return ('/admin/execution');
    }
  });

  useEffect(() => {
    
  },[]);

  return (
    <Suspense fallback={ <FallBackLoader /> }>
      <Switch>
        {routeData.map((data, index) => (
          <PrivateRoute { ...data } key={ index } />
        ))}
        <Redirect from="/admin" to={redirectUrl} /> 
      </Switch>
    </Suspense>
  );
};

export default DashboardRoute;
