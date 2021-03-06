import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { Global } from '@emotion/react';
import globalStyle from './styles/globalStyle';
import SignInPage from './pages/SignInPage';
import LoggedInRoute from './routes/LoggedInRoute';
import useCheckUserEffect from './hooks/useCheckUserEffect';
import { Helmet } from 'react-helmet-async';
import LoggedOutRoute from './routes/LoggedOutRoute';
import AppDialog from './components/base/AppDialog';
import GithubSignInPage from './pages/GithubSignInPage';
import LoadingPage from './pages/LoadingPage';
import './styles/fonts.css';

const App = () => {
  const { isLoading } = useCheckUserEffect();

  return (
    <>
      <Helmet>
        <title>Todo Diary</title>
        <meta charSet="utf-8" />
      </Helmet>
      <Global styles={globalStyle} />
      <Router>
        <Switch>
          {isLoading && <LoadingPage />}
          <LoggedInRoute
            exact
            path={['/', '/:path(calendar|write|recent|chart|diary)']}
            component={HomePage}
          />
          <LoggedInRoute exact path="/diary/:id" component={HomePage} />
          <LoggedOutRoute exact path="/sign-in" component={SignInPage} />
          <LoggedOutRoute
            exact
            path="/sign-in/github"
            component={GithubSignInPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
      <AppDialog />
    </>
  );
};

export default App;
