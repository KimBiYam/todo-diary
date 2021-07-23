import { css } from '@emotion/react';
import { NavLink } from 'react-router-dom';
import { COLORS } from '../../constants';
import Icon, { IconType } from '../common/Icon';

export type SidebarItemProps = {
  label: string;
  icon: IconType;
  to: string;
};

const SidebarItem = ({ label, icon, to }: SidebarItemProps) => {
  return (
    <li>
      <NavLink
        css={block}
        to={to}
        isActive={(match, location) => {
          if (match === null) {
            return false;
          }
          return location.pathname === to;
        }}
      >
        <div css={iconBlock}>
          <Icon icon={icon} />
        </div>
        {label}
      </NavLink>
    </li>
  );
};

const block = css`
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  color: ${COLORS.tertiary};
  font-weight: 600;
  text-decoration: none;

  &:hover {
    background: ${COLORS.pageBase};
  }

  &.active {
    color: black;
    background: ${COLORS.pageBase};
  }
`;

const iconBlock = css`
  svg {
    width: 1rem;
    height: 1rem;
    margin-right: 1rem;
    fill: ${COLORS.tertiary};
  }
`;

export default SidebarItem;
