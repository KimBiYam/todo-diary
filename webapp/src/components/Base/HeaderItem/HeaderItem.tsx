import React from 'react';
import { Link } from 'react-router-dom';

export type HeaderItemProps = {
  label: string;
  to: string;
};

const HeaderItem = ({ label, to }: HeaderItemProps) => (
  <Link to={to}>{label}</Link>
);

export default HeaderItem;
