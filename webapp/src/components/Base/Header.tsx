import React from 'react';
import { css } from '@emotion/react';
import { HEADER_HEIGHT } from '../../constants';
import HeaderItem from './HeaderItem';
import HeaderProfile from './HeaderProfile';

export type HeaderProps = {};

const Header = () => {
  return (
    <header css={block}>
      <nav css={headerNavSection}>
        <HeaderItem to="/" label="홈으로" />
      </nav>
      <HeaderProfile />
    </header>
  );
};

const block = css`
  width: 100%;
  height: ${HEADER_HEIGHT};
  padding: 0 32px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const headerNavSection = css`
  flex: 1;
`;

export default Header;
