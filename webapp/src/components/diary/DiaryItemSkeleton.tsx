import { css } from '@emotion/react';
import { shining } from '../../styles/transitions';

export type DiaryItemSkeletonProps = {};

const DiaryItemSkeleton = () => (
  <div css={block}>
    <div css={titleSection} />
    <div css={contentSection} />
  </div>
);

const block = css`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 48rem;
  height: 16rem;
  margin: 1rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 8px 16px 0px;
`;

const shiningSection = css`
  background: rgba(0, 0, 0, 0.1);
  animation: ${shining} ease-in-out 2s infinite;
`;

const titleSection = css`
  height: 3rem;
  ${shiningSection}
`;

const contentSection = css`
  margin-top: 1rem;
  flex: 1;
  height: 2rem;
  ${shiningSection}
`;

export default DiaryItemSkeleton;
