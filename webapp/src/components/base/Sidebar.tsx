import { css } from '@emotion/react';
import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '../../constants';
import useUserAction from '../../hooks/useUserAction';
import useUserSelector from '../../hooks/useUserSelector';
import { SIZES } from '../../styles/sizes';
import { Z_INDEXES } from '../../styles/zIndexes';
import SidebarCategory from './SidebarCategory';
import SidebarItem from './SidebarItem';
import SidebarProfile from './SidebarProfile';

export type SidebarProps = {};

// TODO : 로고 아이콘 적용
const Sidebar = () => {
  const { user } = useUserSelector();
  const { userLogOut } = useUserAction();

  const isActiveRootItem = useCallback((match, location) => {
    if (!match) {
      return false;
    }

    return ['/', 'recent'].includes(location.pathname);
  }, []);

  return (
    <aside css={block}>
      <div css={logoSection}>
        <Link to="/" css={logo}>
          할일 다이어리
        </Link>
      </div>

      <nav css={headerNavSection}>
        <SidebarCategory category="할일 다이어리" />
        <ul>
          <SidebarItem
            to="/"
            icon="recent"
            label="최근 추가한 할 일들"
            isActive={isActiveRootItem}
          />
          <SidebarItem to="/calendar" icon="calendar" label="날짜별 할 일들" />
          <SidebarItem to="/write" icon="write" label="할 일 추가하기" />
          <SidebarItem to="/chart" icon="chart" label="통계" />
        </ul>
      </nav>
      {user && <SidebarProfile user={user} onClickLogout={userLogOut} />}
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

const logoSection = css`
  height: 12rem;
  padding: 0 2rem;
  display: flex;
  align-items: center;
`;

const logo = css`
  font-size: 2rem;
  font-weight: 600;
  text-decoration: none;
  color: ${COLORS.secondary};
`;

const headerNavSection = css`
  flex: 1;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export default memo(Sidebar);
