import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { Global } from '@emotion/react';
import GlobalStyle from './GlobalStyle';

const App = () => {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
