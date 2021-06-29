import React from 'react';
import { css } from '@emotion/react';
import { Helmet } from 'react-helmet-async';

export type AppLayoutProps = {
  title: string;
  children?: React.ReactNode;
};

const AppLayout = ({ title }: AppLayoutProps) => (
  <>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <div css={blockStyle}></div>
  </>
);

const blockStyle = css``;

export default AppLayout;
