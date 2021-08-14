import { Redirect, Route, RouteProps } from 'react-router-dom';
import useUserSelector from '../hooks/useUserSelector';

export type LoggedInRouteProps = {};

const LoggedInRoute = (props: RouteProps) => {
  const { isLoggedIn } = useUserSelector();

  return isLoggedIn ? <Route {...props} /> : <Redirect to="/sign-in" />;
};

export default LoggedInRoute;
