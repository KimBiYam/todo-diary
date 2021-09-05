import { css } from '@emotion/react';
import LoadingSpinner from '../components/common/LoadingSpinner';

export type LoadingPageProps = {};

const LoadingPage = () => {
  return (
    <div css={box}>
      <LoadingSpinner />
    </div>
  );
};

const box = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LoadingPage;
