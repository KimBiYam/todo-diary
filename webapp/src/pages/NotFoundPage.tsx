import { css } from '@emotion/react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router';
import MainButton from '../components/common/MainButton';

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
  font-size: 22rem;
  user-select: none;
  font-smooth: antialiased;
`;

const notFoundMessageWrapper = css`
  font-size: 4rem;
  margin-bottom: 2.4rem;
`;

export default NotFoundPage;
