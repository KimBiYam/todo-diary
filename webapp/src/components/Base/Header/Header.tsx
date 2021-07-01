import { css } from '@emotion/react';
import React from 'react';
import { HEADER_HEIGHT } from '../../../constants';
import useUser from '../../../hooks/useUser';
import HeaderItem from '../HeaderItem';

export type HeaderProps = {};

const Header = () => {
  const { userLogout } = useUser();

  return (
    <header css={block}>
      <div css={headerSection}>
        <HeaderItem to="/" label="홈으로" />
      </div>
      <div css={headerSection}>
        <button type="button" onClick={userLogout}>
          로그아웃
        </button>
      </div>
    </header>
  );
};

const block = css`
  width: 100%;
  height: ${HEADER_HEIGHT};
  position: fixed;
  display: flex;
  justify-content: space-between;
`;

const headerSection = css`
  flex: 1;
`;

export default Header;
