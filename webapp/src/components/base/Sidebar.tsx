import { css } from '@emotion/react';
import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import useUserAction from '../../hooks/useUserAction';
import useUserSelector from '../../hooks/useUserSelector';
import { COLORS } from '../../styles/colors';
import { SIZES } from '../../styles/sizes';
import { Z_INDEXES } from '../../styles/zIndexes';
import Icon from '../common/Icon';
import SidebarCategory from './SidebarCategory';
import SidebarItem from './SidebarItem';
import UserProfile from './UserProfile';

export type SidebarProps = {};

const Sidebar = () => {
  const { user } = useUserSelector();
  const { userLogOut } = useUserAction();

  const isActiveRootItem = useCallback((match, location) => {
    if (location.pathname === '/') {
      return true;
    }

    return match;
  }, []);

  return (
    <aside css={block}>
      <Link to="/diary" css={logoLink}>
        <Icon icon="logo" css={logo} />
      </Link>
      <nav css={navSection}>
        <SidebarCategory category="할일 다이어리" />
        <ul>
          <SidebarItem
            to="/diary"
            icon="recent"
            label="최근"
            isActive={isActiveRootItem}
          />
          <SidebarItem to="/write" icon="write" label="할 일 추가" />
          <SidebarItem to="/chart" icon="chart" label="통계" />
        </ul>
      </nav>
      {user && <UserProfile user={user} onClickLogout={userLogOut} />}
    </aside>
  );
};

const block = css`
  width: ${SIZES.sidebarWidth};
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 0px 8px 1px;
  background: ${COLORS.white};
  z-index: ${Z_INDEXES.sidebar};
`;

const logoLink = css`
  height: 12rem;
`;

const logo = css`
  width: 100%;
  height: 100%;
`;

const navSection = css`
  flex: 1;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export default memo(Sidebar);
