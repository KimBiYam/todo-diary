import React from 'react';
import AppLayout from '../components/base/AppLayout';
import DiaryList from '../components/diary/DiaryList';

export type HomePageProps = {};

const HomePage = () => {
  return (
    <AppLayout title="Todo Diary | Home">
      <DiaryList />
    </AppLayout>
  );
};

export default HomePage;
