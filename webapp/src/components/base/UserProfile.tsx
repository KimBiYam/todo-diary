import { css } from '@emotion/react';
import { memo } from 'react';
import { COLORS } from '../../constants';
import { BREAK_POINTS } from '../../styles/breakPoints';
import { User } from '../../types/auth.types';

export type UserProfileProps = {
  user: User;
  onClickLogout: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const UserProfile = ({ user, onClickLogout }: UserProfileProps) => {
  return (
    <div css={block}>
      <img css={profileImage} alt="profile" src={user?.photoUrl} />
      <div css={profileTextSection}>
        <span>{user?.displayName}</span>
        <button css={signOutButton} onClick={onClickLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

const block = css`
  padding: 1rem;
  display: flex;
  align-items: center;
`;

const profileImage = css`
  margin-right: 1rem;
  width: 3rem;
  height: 3rem;
  border-radius: 2rem;
`;

const profileTextSection = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${BREAK_POINTS.medium} {
    font-size: 1.2rem;
  }

  ${BREAK_POINTS.large} {
    font-size: 1.4rem;
  }
`;

const signOutButton = css`
  padding: 0;
  margin: 0;
  color: ${COLORS.secondary};
  border: none;
  background: none;
  text-decoration: underline;
  cursor: pointer;
`;

export default memo(UserProfile);
