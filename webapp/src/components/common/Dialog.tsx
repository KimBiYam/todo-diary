import { css } from '@emotion/react';
import { memo } from 'react';
import { COLORS } from '../../constants';

export type DialogProps = {
  text: string;
  color?: string;
};

const Dialog = memo(({ text, color }: DialogProps) => {
  return <div css={box(color)}>{text}</div>;
});

const box = (color: string | undefined) => css`
  background-color: ${color ?? COLORS.quaternary};
  opacity: 0.7;
  font-weight: 600;
  width: 12rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

export default Dialog;
