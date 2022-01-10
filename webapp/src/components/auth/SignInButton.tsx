import { css } from '@emotion/react';
import { forwardRef, memo, Ref } from 'react';
import { COLORS } from '../../styles';
import Icon, { IconType } from '../common/Icon';

export type SignInButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick?: () => void;
    icon: IconType;
    label: string;
  };

const SignInButton = (
  { onClick, icon, label, ...rest }: SignInButtonProps,
  ref: Ref<HTMLButtonElement>,
) => {
  return (
    <button css={box} onClick={onClick} ref={ref} {...rest}>
      <Icon icon={icon} css={iconStyle} />
      <p>{label}</p>
    </button>
  );
};

const box = css`
  width: 25rem;
  height: 100%;
  display: flex;
  align-items: center;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 1.4rem;
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
  margin: 0 1.6rem;
`;

export default memo(forwardRef(SignInButton));
