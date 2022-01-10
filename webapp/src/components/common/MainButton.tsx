import { css } from '@emotion/react';
import { memo } from 'react';
import { COLORS } from '../../styles/colors';

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
  width: 8rem;
  height: 4rem;
  border-radius: 4px;
  background-color: ${COLORS[color]};
  font-size: 1.6rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export default MainButton;
