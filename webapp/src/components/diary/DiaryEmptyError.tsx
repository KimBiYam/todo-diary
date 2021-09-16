import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { COLORS } from '../../constants';

export type DiaryEmptyErrorProps = {};

const DiaryEmptyError = () => {
  return (
    <div css={box}>
      <p>글이 하나도 없어요 :(</p>
      <Link to="/write" css={link}>
        첫 글 쓰러 가기!
      </Link>
    </div>
  );
};

const box = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
  font-size: 1.6rem;
`;

const link = css`
  color: ${COLORS.quaternary};
  text-decoration: none;
`;

export default DiaryEmptyError;
