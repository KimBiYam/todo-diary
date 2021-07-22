import { css } from '@emotion/react';
import { memo, useEffect, useState } from 'react';
import { setTimeout } from 'timers';
import { COLORS } from '../../constants';
import useDialog from '../../hooks/useDialog';
import { fadeIn, fadeOut } from '../../styles/transitions';
import { Z_INDEXES } from '../../styles/zIndexes';

export type AppDialogProps = {};

const AppDialog = memo(() => {
  const [visible, setVisible] = useState(false);
  const {
    dialog: { isOpen, text },
  } = useDialog();

  useEffect(() => {
    const transitionDuration = 1 * 1000;
    let timeoutId: NodeJS.Timeout;

    if (isOpen) {
      setVisible(true);
      timeoutId = setTimeout(() => setVisible(false), transitionDuration);
    }

    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [isOpen]);

  if (!isOpen || text === undefined) {
    return null;
  }

  return (
    <div css={wrapper(visible)}>
      <div css={box()}>{text}</div>
    </div>
  );
});

const wrapper = (visible: boolean) => css`
  visibility: ${visible ? 'visible' : 'hidden'};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${Z_INDEXES.dialog};
  transition: visibility 1s ease-in-out;
  animation: ${visible ? fadeIn : fadeOut} 1s ease-in-out;
`;

const box = (color?: string | undefined) => css`
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

export default AppDialog;
