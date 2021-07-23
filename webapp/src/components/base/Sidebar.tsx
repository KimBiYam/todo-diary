import { css } from '@emotion/react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '../../constants';
import { SIZES } from '../../styles/sizes';
import { Z_INDEXES } from '../../styles/zIndexes';
import SidebarCategory from './SidebarCategory';
import SidebarItem from './SidebarItem';
import SidebarProfile from './SidebarProfile';

export type SidebarProps = {};

const Sidebar = memo(() => {
  return (
    <aside css={block}>
      <div css={logoSection}>
        <Link to="/" css={logo}>
          TODO DIARY
        </Link>
      </div>
      <nav css={headerNavSection}>
        <SidebarCategory category="Diary" />
        <ul>
          <SidebarItem to="/" icon="recent" label="최근" />
          <SidebarItem to="/calendar" icon="calendar" label="일자별" />
          <SidebarItem to="/write" icon="write" label="쓰기" />
        </ul>
      </nav>
      <SidebarProfile />
    </aside>
  );
});

const block = css`
  width: ${SIZES.sidebarWidth};
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 0.5rem;
  background: ${COLORS.white};
  z-index: ${Z_INDEXES.sidebar};
`;

const logoSection = css`
  height: 6rem;
  padding: 0 2rem;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
  margin-top: 4rem;
`;

export default Sidebar;
