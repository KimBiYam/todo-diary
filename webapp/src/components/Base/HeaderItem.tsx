import { css } from '@emotion/react';
import React from 'react';
import { Link } from 'react-router-dom';

export type HeaderItemProps = {
  label: string;
  to: string;
};

const HeaderItem = ({ label, to }: HeaderItemProps) => (
  <Link css={block} to={to}>
    {label}
  </Link>
);

const block = css``;

export default HeaderItem;
