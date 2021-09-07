import { css } from '@emotion/react';
import { memo } from 'react';
import { COLORS } from '../../constants';

export type MainButtonButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    onClick?: () => void;
  };

const MainButtonButton = memo(
  ({ label, onClick, ...rest }: MainButtonButtonProps) => {
    return (
      <button css={mainButton} onClick={onClick} {...rest}>
        {label}
      </button>
    );
  },
);

const mainButton = css`
  border: none;
  width: 14rem;
  height: 2.4rem;
  border-radius: 8px;
  background-color: ${COLORS.quaternary};
  font-size: 1.4rem;
  cursor: pointer;
`;

export default MainButtonButton;
