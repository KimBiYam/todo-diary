import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { Global } from '@emotion/react';
import globalStyle from './globalStyle';
import SignInPage from './pages/SignInPage';
import LoggedOutRoute from './routes/LoggedOutRoute';
import LoggedInRoute from './routes/LoggedInRoute';
import useCheckUserEffect from './hooks/useCheckUserEffect';
import { Helmet } from 'react-helmet-async';

const App = () => {
  useCheckUserEffect();

  return (
    <>
      <Helmet>
        <title>Todo Diary</title>
        <meta charSet="utf-8" />
      </Helmet>
      <Global styles={globalStyle} />
      <Router>
        <Switch>
          <LoggedInRoute exact path={['/', '/diary']} component={HomePage} />
          <LoggedOutRoute exact path="/sign-in" component={SignInPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
