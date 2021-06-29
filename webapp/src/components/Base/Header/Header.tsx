import { css } from '@emotion/react';
import React from 'react';
import { HEADER_HEIGHT } from '../../../constants';
import useUser from '../../../hooks/useUser';
import HeaderItem from '../HeaderItem';

export type HeaderProps = {};

const Header = () => {
  const { userLogout } = useUser();

  return (
    <header css={headerStyle}>
      <div css={headerSectionStyle}>
        <HeaderItem to="/" label="홈으로" />
      </div>
      <div css={headerSectionStyle}>
        <button type="button" onClick={userLogout}>
          로그아웃
        </button>
      </div>
    </header>
  );
};

const headerStyle = css`
  width: 100%;
  height: ${HEADER_HEIGHT};
  position: fixed;
  display: flex;
  justify-content: space-between;
`;

const headerSectionStyle = css`
  flex: 1;
`;

export default Header;
