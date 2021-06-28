import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { Global } from '@emotion/react';
import globalStyle from './globalStyle';

const App = () => {
  return (
    <>
      <Global styles={globalStyle} />
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
