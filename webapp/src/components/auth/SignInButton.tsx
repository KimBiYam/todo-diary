import { css } from '@emotion/react';
import { COLORS } from '../../constants';
import Icon, { IconType } from '../common/Icon';

export type SigninButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick: () => void;
    icon: IconType;
    label: string;
  };

const SigninButton = ({ onClick, icon, label, ...rest }: SigninButtonProps) => {
  return (
    <button css={box} onClick={onClick} {...rest}>
      <Icon icon={icon} css={iconStyle} />
      <p>{label}</p>
    </button>
  );
};

const box = css`
  width: 25rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${COLORS.secondary};
  padding: 1rem;
  border-radius: 1px;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.1);
  transition: transform 200ms ease-in-out;

  :hover {
    transform: scale(1.05);
  }
`;

const iconStyle = css`
  width: 2rem;
  height: 2rem;
  margin-right: 1.6rem;
`;

export default SigninButton;
