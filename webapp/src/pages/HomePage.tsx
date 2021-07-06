import { Route, Switch } from 'react-router-dom';
import Header from '../components/base/Header';
import HomeLayout from '../components/base/HomeLayout';
import CalendarPage from './CalendarPage';
import RecentPage from './RecentPage';
import WritePage from './WritePage';

export type HomePageProps = {};

const HomePage = () => {
  return (
    <>
      <Header />
      <HomeLayout>
        <Switch>
          <Route exact path={['/', '/recent']} component={RecentPage} />
          <Route exact path="/calendar" component={CalendarPage} />
          <Route exact path="/write" component={WritePage} />
        </Switch>
      </HomeLayout>
    </>
  );
};

export default HomePage;
