import { css } from '@emotion/react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '../../constants';
import useDiariesAchievementRateQuery from '../../hooks/query/useDiariesAchievementRateQuery';
import useUser from '../../hooks/useUser';
import { SIZES } from '../../styles/sizes';
import { Z_INDEXES } from '../../styles/zIndexes';
import SidebarCategory from './SidebarCategory';
import SidebarItem from './SidebarItem';
import SidebarProfile from './SidebarProfile';

export type SidebarProps = {};

// TODO : 로고 아이콘 적용
const Sidebar = memo(() => {
  const { user, userLogOut } = useUser();
  const { data: achievementRate } = useDiariesAchievementRateQuery(user);

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
            isActive={(match, location) => {
              if (!match) {
                return false;
              }

              return ['/', 'recent'].includes(location.pathname);
            }}
          />
          <SidebarItem to="/calendar" icon="calendar" label="날짜별 할 일들" />
          <SidebarItem to="/write" icon="write" label="할 일 추가하기" />
        </ul>
      </nav>
      {user && achievementRate && (
        <SidebarProfile
          user={user}
          onClickLogout={userLogOut}
          achievementRate={achievementRate}
        />
      )}
    </aside>
  );
});

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
  height: 6rem;
  padding: 0 2rem;
  display: flex;
  align-items: center;
`;

const logo = css`
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: none;
  color: ${COLORS.secondary};
`;

const headerNavSection = css`
  flex: 1;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export default Sidebar;
