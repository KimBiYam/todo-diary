import React from 'react';
import * as svg from '../../assets/icons';

export type IconType = keyof typeof svg;
export type IconProps = {
  icon: IconType;
  className?: string;
  style?: React.CSSProperties;
};

const Icon = ({ icon, className, style }: IconProps) =>
  React.createElement(svg[icon], { className, style });

export default Icon;
