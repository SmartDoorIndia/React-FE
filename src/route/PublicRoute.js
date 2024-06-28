/** @format */

import { Route, Redirect } from 'react-router-dom';

import { useUserContext } from '../common/helpers/Auth';

const PublicRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useUserContext();

  return (
    <Route
      { ...rest }
      render={ (props) => (isAuth ? <Redirect to="/admin" /> : <Component { ...props } />) }
    />
  );
};

export default PublicRoute;
