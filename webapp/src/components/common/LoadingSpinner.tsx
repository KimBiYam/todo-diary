import { css } from '@emotion/react';
import { memo } from 'react';
import { COLORS } from '../../constants';
import { spin } from '../../styles/transitions';

export type LoadingSpinnerProps = {};

const LoadingSpinner = memo(() => <div css={spinner} />);

const spinner = css`
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid ${COLORS.quaternary};
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;

  ${spin}
`;

export default LoadingSpinner;
