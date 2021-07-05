import { css } from '@emotion/react';
import { Helmet } from 'react-helmet-async';
import { HEADER_HEIGHT } from '../../constants';
import Header from './Header';

export type AppLayoutProps = {
  title: string;
  children?: React.ReactNode;
};

const AppLayout = ({ title, children }: AppLayoutProps) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      <div css={block}>{children}</div>
    </>
  );
};

const block = css`
  padding-top: ${HEADER_HEIGHT};
  padding: calc(${HEADER_HEIGHT} + 2rem) 2rem 0;
  width: 100%;
  height: 100%;
`;

export default AppLayout;
