import { css } from '@emotion/react';
import React from 'react';
import { COLORS } from '../../constants';
import useUser from '../../hooks/useUser';

export type HeaderProfileProps = {};

function HeaderProfile() {
  const { user, userLogOut } = useUser();

  return user ? (
    <div css={block}>
      <img css={profileImage} alt="profile" src={user?.photoUrl} />
      <span>{user?.displayName}</span>
      <span css={signOutButton} onClick={userLogOut}>
        Sign Out
      </span>
    </div>
  ) : (
    <></>
  );
}

const block = css`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const profileImage = css`
  margin-right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2rem;
`;

const signOutButton = css`
  margin-left: 0.875rem;
  color: ${COLORS.secondary};
  border: none;
  background: none;
  text-decoration: underline;
  cursor: pointer;
`;

export default HeaderProfile;
