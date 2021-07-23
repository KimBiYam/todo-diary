import { css } from '@emotion/react';
import { COLORS } from '../../constants';

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
  font-size: 0.8rem;
  font-weight: 800;
  color: ${COLORS.tertiary};
`;

export default SidebarCategory;
