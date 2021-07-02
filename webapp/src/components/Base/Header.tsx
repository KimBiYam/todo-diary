import React from 'react';
import { css } from '@emotion/react';
import { COLORS, HEADER_HEIGHT } from '../../constants';
import HeaderItem from './HeaderItem';
import HeaderProfile from './HeaderProfile';

export type HeaderProps = {};

const Header = () => {
  return (
    <header css={block}>
      <nav css={headerNavSection}>
        <HeaderItem to="/" icon="recent" label="최근" />
        <HeaderItem to="/" icon="calendar" label="일자별" />
      </nav>
      <HeaderProfile />
    </header>
  );
};

const block = css`
  width: 100%;
  height: ${HEADER_HEIGHT};
  padding: 0 2rem;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${COLORS.primary};
`;

const headerNavSection = css`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

export default Header;
