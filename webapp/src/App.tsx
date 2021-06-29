import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { Global } from '@emotion/react';
import globalStyle from './globalStyle';
import SignInPage from './pages/SignInPage';
import LoggedOutRoute from './routes/LoggedOutRoute';
import LoggedInRoute from './routes/LoggedInRoute';
import useCheckUserEffect from './hooks/useCheckUserEffect';

const App = () => {
  useCheckUserEffect();

  return (
    <>
      <Global styles={globalStyle} />
      <Router>
        <Switch>
          <LoggedInRoute exact path="/" component={HomePage} />
          <LoggedOutRoute exact path="/sign-in" component={SignInPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
