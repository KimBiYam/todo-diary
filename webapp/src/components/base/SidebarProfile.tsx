import { css } from '@emotion/react';
import { COLORS } from '../../constants';
import useUser from '../../hooks/useUser';

export type SidebarProfileProps = {};

const SidebarProfile = () => {
  const { user, userLogOut } = useUser();

  return user ? (
    <div css={block}>
      <img css={profileImage} alt="profile" src={user?.photoUrl} />
      <div css={aaa}>
        <span>{user?.displayName}</span>
        <button css={signOutButton} onClick={userLogOut}>
          Sign Out
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

const block = css`
  margin-top: 2rem;
  padding: 1rem;
  display: flex;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const profileImage = css`
  margin-right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2rem;
`;

const aaa = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 0.8rem;
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

export default SidebarProfile;
