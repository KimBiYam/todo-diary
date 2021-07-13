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
  width: 6rem;
  height: 2rem;
  background-color: ${COLORS.quaternary};
  border-radius: 8px;
`;

export default MainButtonButton;
