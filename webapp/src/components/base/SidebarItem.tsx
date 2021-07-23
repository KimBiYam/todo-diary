import { css } from '@emotion/react';
import { match, NavLink } from 'react-router-dom';
import { COLORS } from '../../constants';
import Icon, { IconType } from '../common/Icon';
import History from 'history';

export type SidebarItemProps = {
  label: string;
  icon: IconType;
  to: string;
  isActive?<Params extends { [K in keyof Params]?: string }>(
    match: match<Params>,
    location: History.Location,
  ): boolean;
};

const SidebarItem = ({ label, icon, to, isActive }: SidebarItemProps) => {
  return (
    <li>
      <NavLink css={block} to={to} isActive={isActive}>
        <Icon css={iconStyle} icon={icon} />
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
    svg {
      fill: ${COLORS.black};
    }
  }
`;

const iconStyle = () => css`
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
  fill: ${COLORS.tertiary};
`;

export default SidebarItem;
