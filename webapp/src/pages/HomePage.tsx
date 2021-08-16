import { Route, Switch } from 'react-router-dom';
import Sidebar from '../components/base/Sidebar';
import HomeLayout from '../components/base/HomeLayout';
import CalendarPage from './CalendarPage';
import RecentPage from './RecentPage';
import WritePage from './WritePage';
import ChartPage from './ChartPage';

export type HomePageProps = {};

const HomePage = () => {
  return (
    <>
      <Sidebar />
      <HomeLayout>
        <Switch>
          <Route exact path={['/', '/recent']} component={RecentPage} />
          <Route exact path="/calendar" component={CalendarPage} />
          <Route exact path="/write" component={WritePage} />
          <Route exact path="/chart" component={ChartPage} />
        </Switch>
      </HomeLayout>
    </>
  );
};

export default HomePage;
