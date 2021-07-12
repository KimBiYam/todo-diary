import { css } from '@emotion/react';
import { HEADER_HEIGHT } from '../../constants';

export type HomeLayoutProps = {
  children?: React.ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return <div css={block}>{children}</div>;
};

const block = css`
  padding-top: ${HEADER_HEIGHT};
  padding: calc(${HEADER_HEIGHT} + 2rem) 2rem 0;
  width: 100%;
  height: 100%;
`;

export default HomeLayout;
