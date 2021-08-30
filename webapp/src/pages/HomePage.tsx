import { Route, Switch } from 'react-router-dom';
import Sidebar from '../components/base/Sidebar';
import HomeLayout from '../components/base/HomeLayout';
import RecentPage from './RecentPage';
import WritePage from './WritePage';
import ChartPage from './ChartPage';
import { useMediaQuery } from 'react-responsive';
import MobileHeader from '../components/base/MobileHeader';

export type HomePageProps = {};

const HomePage = () => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: '1024px' });

  return (
    <>
      {isTabletOrMobile ? <MobileHeader /> : <Sidebar />}
      <HomeLayout>
        <Switch>
          <Route exact path={['/', '/recent']} component={RecentPage} />
          <Route exact path="/write" component={WritePage} />
          <Route exact path="/chart" component={ChartPage} />
        </Switch>
      </HomeLayout>
    </>
  );
};

export default HomePage;
