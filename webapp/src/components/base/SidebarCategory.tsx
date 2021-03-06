import { css } from '@emotion/react';
import { COLORS } from '../../styles';

export type SidebarCategoryProps = {
  category: string;
};

const SidebarCategory = ({ category }: SidebarCategoryProps) => {
  return <div css={block}>{category}</div>;
};

const block = css`
  height: 3rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${COLORS.tertiary};
  user-select: none;
`;

export default SidebarCategory;
