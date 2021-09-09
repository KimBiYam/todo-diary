import { css } from '@emotion/react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router';
import MainButton from '../components/common/MainButton';
import { BREAK_POINTS } from '../styles/breakPoints';

export type NotFoundPageProps = {};

const NotFoundPage = () => {
  const history = useHistory();

  const handleClickHome = () => history.push('/');

  return (
    <>
      <Helmet>
        <title>Todo Diary | Not Found</title>
      </Helmet>
      <div css={box}>
        <div css={errorTextWrapper}>404</div>
        <div css={notFoundMessageWrapper}>페이지를 찾을 수 없어요! :(</div>
        <MainButton label="홈으로" color="tertiary" onClick={handleClickHome} />
      </div>
    </>
  );
};

const box = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const errorTextWrapper = css`
  font-size: 12rem;
  font-weight: 500;
  user-select: none;
  font-smooth: antialiased;

  ${BREAK_POINTS.medium} {
    font-size: 16rem;
  }

  ${BREAK_POINTS.large} {
    font-size: 22rem;
  }
`;

const notFoundMessageWrapper = css`
  font-size: 2.4rem;
  margin-bottom: 2.4rem;

  ${BREAK_POINTS.medium} {
    font-size: 3.2rem;
  }

  ${BREAK_POINTS.large} {
    font-size: 4.8rem;
  }
`;

export default NotFoundPage;
