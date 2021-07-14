import { css } from '@emotion/react';
import { useEffect } from 'react';
import { setTimeout } from 'timers';
import useDialog from '../../hooks/useDialog';
import Dialog from '../common/Dialog';

export type AppDialogProps = {};

const AppDialog = () => {
  const {
    closeDialog,
    dialog: { isOpen, text },
  } = useDialog();

  useEffect(() => {
    const openTime = 1 * 1000;
    let timeoutId: NodeJS.Timeout;

    if (isOpen) {
      timeoutId = setTimeout(() => closeDialog(), openTime);
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
    <div css={dialogWrapper}>
      <Dialog text={text} />
    </div>
  );
};

const dialogWrapper = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default AppDialog;
