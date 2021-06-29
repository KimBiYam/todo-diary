import React from 'react';
import useUser from '../hooks/useUser';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export type LoggedInRouteProps = {};

const LoggedInRoute = (props: RouteProps) => {
  const { isLoggedIn } = useUser();

  return isLoggedIn ? <Route {...props} /> : <Redirect to="/sign-in" />;
};

export default LoggedInRoute;
