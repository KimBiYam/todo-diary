import { css } from '@emotion/react';
import { memo } from 'react';
import { COLORS } from '../../constants';

export type MainButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  onClick?: () => void;
  color?: keyof typeof COLORS;
};

const MainButton = memo(
  ({ label, onClick, color = 'quaternary', ...rest }: MainButtonProps) => {
    return (
      <button css={mainButton(color)} onClick={onClick} {...rest}>
        {label}
      </button>
    );
  },
);

const mainButton = (color: keyof typeof COLORS) => css`
  border: none;
  width: 14rem;
  height: 2.4rem;
  border-radius: 8px;
  background-color: ${COLORS[color]};
  font-size: 1.4rem;
  cursor: pointer;
`;

export default MainButton;
