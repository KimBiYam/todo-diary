import { css } from '@emotion/react';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import useUserAction from '../../hooks/useUserAction';
import useUserSelector from '../../hooks/useUserSelector';
import { BREAK_POINTS } from '../../styles/breakPoints';
import { SIZES } from '../../styles/sizes';
import { Z_INDEXES } from '../../styles/zIndexes';
import Icon from '../common/Icon';
import HeaderItem, { HeaderItemProps } from './HeaderItem';
import UserProfile from './UserProfile';

const MobileHeader = () => {
  const { user } = useUserSelector();
  const { userLogOut } = useUserAction();

  const isActiveRootItem = useCallback<
    Exclude<HeaderItemProps['isActive'], undefined>
  >((match, location) => {
    if (location.pathname === '/') {
      return true;
    }

    return !!match;
  }, []);

  return (
    <header css={box}>
      <Link to="/" css={logoLink}>
        <Icon icon="logo" css={logo} />
      </Link>
      <div css={buttonSection}>
        <nav>
          <ul css={navSection}>
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

const logoLink = css`
  width: 8rem;
  height: 100%;
  display: flex;
  align-items: center;

  ${BREAK_POINTS.medium} {
    width: 12rem;
  }
`;

const logo = css`
  width: 100%;
  height: 100%;
`;

const buttonSection = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const navSection = css`
  display: flex;
  gap: 1.6rem;
`;

export default MobileHeader;
