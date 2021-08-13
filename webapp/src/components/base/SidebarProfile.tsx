import { css } from '@emotion/react';
import { COLORS } from '../../constants';
import { User } from '../../types/auth.types';

export type SidebarProfileProps = {
  user: User;
  onClickLogout: (e: React.MouseEvent<HTMLButtonElement>) => void;
  achievementRate: string;
};

const SidebarProfile = ({
  user,
  onClickLogout,
  achievementRate,
}: SidebarProfileProps) => {
  return (
    <>
      {user && (
        <div css={block}>
          <img css={profileImage} alt="profile" src={user?.photoUrl} />
          <div css={profileTextSection}>
            <span>{user?.displayName}</span>
            <button css={signOutButton} onClick={onClickLogout}>
              로그아웃
            </button>
          </div>
          <div css={achievementRateSection}>
            <p>달성률</p>
            <p>{achievementRate}</p>
          </div>
        </div>
      )}
    </>
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
  font-size: 1.2rem;
  align-items: flex-start;
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

const achievementRateSection = css`
  font-size: 1.2rem;
`;

export default SidebarProfile;
