import { Redirect, Route, RouteProps } from 'react-router-dom';
import useUserSelector from '../hooks/useUserSelector';

export type LoggedOutRouteProps = {};

const LoggedOutRoute = (props: RouteProps) => {
  const { isLoggedIn } = useUserSelector();

  return isLoggedIn ? <Redirect to="/" /> : <Route {...props} />;
};

export default LoggedOutRoute;
