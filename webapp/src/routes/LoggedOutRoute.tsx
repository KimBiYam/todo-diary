import React from 'react';
import useUser from '../hooks/useUser';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export type LoggedOutRouteProps = {};

const LoggedOutRoute = (props: RouteProps) => {
  const { isLoggedIn } = useUser();

  return isLoggedIn ? <Redirect to="/" /> : <Route {...props} />;
};

export default LoggedOutRoute;
