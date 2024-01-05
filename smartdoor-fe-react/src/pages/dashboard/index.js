/** @format */

import React from 'react';
import { Redirect } from 'react-router-dom';

import { SocketProvider } from '../../common/helpers/SocketProvider'
import { useUserContext } from '../../common/helpers/Auth'

const DashboardLayout = React.lazy(() => import('./DashboardLayout'));

const Dashboard = () => {
  const { isAuth } = useUserContext();

  return (
    <>

      {
          isAuth ?
            <SocketProvider>
              <DashboardLayout />
            </SocketProvider> :
            <Redirect to="/login" />
      }

    </>
  );
};

export default Dashboard;
