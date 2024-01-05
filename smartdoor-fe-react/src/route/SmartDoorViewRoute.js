/** @format */

import { Suspense } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import BuilderDashboard from '../pages/BuilderDashboard';
import { FallBackLoader } from '../common/helpers/Loader';
import { useUserContext } from '../common/helpers/Auth';
import Otp from '../pages/otp';
// import Otp from '../pages/otp';

const SmartDoorViewRoute = () => {
  const { isAuth } = useUserContext();

  return (
    <Suspense fallback={ <FallBackLoader /> }>
      <Switch>
        {isAuth ? (
          <>
            <Route path="/admin" name="Admin Dashboard" component={ Dashboard } />
            <Route path="/builder" name="Builder Dashboard" component={ BuilderDashboard } />
            <Route exact path={ [ '/', '/login' ] }>
              {' '}
              <Redirect to="/admin" />{' '}
            </Route>
          </>
            ) : (
              <>
                <PublicRoute path="/otp" component={ Otp } />
                <PublicRoute path="/login" component={ Login } />
                <Redirect from="*" to="/login" />
              </>
            )}
      </Switch>
    </Suspense>
  );
};

export default SmartDoorViewRoute;
