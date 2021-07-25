import { createElement, CSSProperties } from 'react';
import * as svg from '../../assets/icons';

export type IconType = keyof typeof svg;

export type Test = typeof svg;

export type IconProps = {
  icon: IconType;
  className?: string;
  style?: CSSProperties;
};

function Icon({ icon, className, style }: IconProps) {
  return createElement(svg[icon], { className, style });
}

export default Icon;
