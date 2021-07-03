import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { COLORS } from '../../constants';
import Icon, { IconType } from '../common/Icon';

export type HeaderItemProps = {
  label: string;
  icon: IconType;
  to: string;
};

const HeaderItem = ({ label, icon, to }: HeaderItemProps) => {
  return (
    <Link css={block} to={to}>
      <div css={iconBlock}>
        <Icon icon={icon} />
      </div>
      {label}
    </Link>
  );
};

const block = css`
  width: 3rem;
  height: 2rem;
  margin-right: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${COLORS.tertiary};
  text-decoration: none;
`;

const iconBlock = css`
  svg {
    width: 1rem;
    height: 1rem;
    fill: ${COLORS.tertiary};
  }
`;

export default HeaderItem;
