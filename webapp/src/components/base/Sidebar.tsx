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
          <SidebarItem
            to="/"
            icon="recent"
            label="Recent"
            isActive={(match, location) => {
              if (!match) {
                return false;
              }

              return ['/', 'recent'].includes(location.pathname);
            }}
          />
          <SidebarItem to="/calendar" icon="calendar" label="Calendar" />
          <SidebarItem to="/write" icon="write" label="Write" />
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
