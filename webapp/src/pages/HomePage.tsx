import React from 'react';
import AppLayout from '../components/Base/AppLayout';
import DiaryList from '../components/Diary/DiaryList';

export type HomePageProps = {};

const HomePage = () => {
  return (
    <AppLayout title="Todo Diary | Home">
      <DiaryList />
    </AppLayout>
  );
};

export default HomePage;
