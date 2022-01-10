import { css } from '@emotion/react';
import { match, NavLink } from 'react-router-dom';
import { COLORS } from '../../styles';
import Icon, { IconType } from '../common/Icon';
import History from 'history';
import { memo } from 'react';

export type HeaderItemProps = {
  icon: IconType;
  to: string;
  isActive?<Params extends { [K in keyof Params]?: string }>(
    match: match<Params>,
    location: History.Location,
  ): boolean;
};

const HeaderItem = ({ icon, to, isActive }: HeaderItemProps) => {
  return (
    <li>
      <NavLink css={box} to={to} isActive={isActive}>
        <Icon css={iconStyle} icon={icon} />
      </NavLink>
    </li>
  );
};

const box = css`
  width: 1.6rem;
  height: 1.6rem;

  &:hover {
    svg {
      fill: ${COLORS.black};
    }
  }

  &.active {
    color: black;
    svg {
      fill: ${COLORS.black};
    }
  }
`;

const iconStyle = () => css`
  width: inherit;
  height: inherit;
  fill: ${COLORS.tertiary};
`;

export default memo(HeaderItem);
