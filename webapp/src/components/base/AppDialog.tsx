import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { setTimeout } from 'timers';
import useDialog from '../../hooks/useDialog';
import { fadeIn, fadeOut } from '../../styles/transitions';
import { Z_INDEXES } from '../../styles/zIndexes';
import Dialog from '../common/Dialog';

export type AppDialogProps = {};

const AppDialog = () => {
  const [visible, setVisible] = useState(false);
  const {
    closeDialog,
    dialog: { isOpen, text },
  } = useDialog();

  useEffect(() => {
    const transitionTime = 1 * 1000;
    let openTimeoutId: NodeJS.Timeout;

    if (isOpen) {
      setVisible(true);
      openTimeoutId = setTimeout(() => setVisible(false), transitionTime);
    }

    return () => {
      if (openTimeoutId !== undefined) {
        clearTimeout(openTimeoutId);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const openTime = 1 * 1000;
    let visibleTimeoutId: NodeJS.Timeout;

    if (isOpen && !visible) {
      visibleTimeoutId = setTimeout(() => closeDialog(), openTime);
    }

    return () => {
      if (visibleTimeoutId !== undefined) {
        clearTimeout(visibleTimeoutId);
      }
    };
  }, [visible]);

  if (!isOpen || text === undefined) {
    return null;
  }

  return (
    <div css={dialogWrapper(visible)}>
      <Dialog text={text} />
    </div>
  );
};

const dialogWrapper = (visible: boolean) => css`
  visibility: ${visible ? 'visible' : 'hidden'};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${Z_INDEXES.dialog};
  transition: visibility 1s ease-in-out;
  animation: ${visible ? fadeIn : fadeOut} 1s ease-in-out;
`;

export default AppDialog;
