import { css } from '@emotion/react';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import useUserAction from '../../hooks/useUserAction';
import useUserSelector from '../../hooks/useUserSelector';
import { BREAK_POINTS } from '../../styles/breakPoints';
import { SIZES } from '../../styles/sizes';
import { Z_INDEXES } from '../../styles/zIndexes';
import Icon from '../common/Icon';
import HeaderItem from './HeaderItem';
import UserProfile from './UserProfile';

export type MobileHeaderProps = {};

const MobileHeader = () => {
  const { user } = useUserSelector();
  const { userLogOut } = useUserAction();

  const isActiveRootItem = useCallback((match, location) => {
    if (location.pathname === '/') {
      return true;
    }

    return match;
  }, []);

  return (
    <header css={box}>
      <div css={logoSection}>
        <Link to="/" css={logo}>
          <Icon icon="logo" css={logo} />
        </Link>
      </div>
      <div css={buttonSection}>
        <nav>
          <ul css={navList}>
            <HeaderItem to="/diary" icon="recent" isActive={isActiveRootItem} />
            <HeaderItem to="/write" icon="write" />
            <HeaderItem to="/chart" icon="chart" />
          </ul>
        </nav>
        {user && <UserProfile user={user} onClickLogout={userLogOut} />}
      </div>
    </header>
  );
};

const box = css`
  width: 100%;
  height: ${SIZES.mobileHeaderHeight};
  display: flex;
  justify-content: space-between;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  z-index: ${Z_INDEXES.header};
  padding: 0 2rem;

  ${BREAK_POINTS.medium} {
    padding: 0 4rem;
  }
`;

const logoSection = css`
  display: flex;
  align-items: center;
`;

const logo = css`
  width: 8rem;
  height: 8rem;

  ${BREAK_POINTS.medium} {
    width: 12rem;
    height: 12rem;
  }
`;

const buttonSection = css`
  display: flex;
  align-items: center;
`;

const navList = css`
  display: flex;
`;

export default MobileHeader;
