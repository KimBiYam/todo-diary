import { css } from '@emotion/react';
import { SIZES } from '../../styles/sizes';

export type HomeLayoutProps = {
  children?: React.ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return <div css={block}>{children}</div>;
};

const block = css`
  padding-left: ${SIZES.sidebarWidth};
  width: 100%;
  height: 100%;
`;

export default HomeLayout;
