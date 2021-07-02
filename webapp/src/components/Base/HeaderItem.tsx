import React from 'react';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { COLORS } from '../../constants';
import Icon, { IconType } from '../common/Icon/Icon';

export type HeaderItemProps = {
  label: string;
  icon: IconType;
  to: string;
};

const HeaderItem = ({ label, icon, to }: HeaderItemProps) => (
  <Link css={block} to={to}>
    <div css={iconBlock}>
      <Icon icon={icon} />
    </div>
    {label}
  </Link>
);

const block = css`
  width: 48px;
  height: 32px;
  margin-right: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${COLORS.tertiary};
  text-decoration: none;
`;

const iconBlock = css`
  svg {
    width: 16px;
    height: 16px;
    fill: ${COLORS.tertiary};
  }
`;

export default HeaderItem;
