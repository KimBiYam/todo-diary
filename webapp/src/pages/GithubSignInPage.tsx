import { useEffect } from 'react';
import { useHistory } from 'react-router';

export type GithubSignInPageProps = {};

const GithubSignInPage = () => {
  const history = useHistory();

  useEffect(() => {
    const code = history.location.search.split('code=')[1];

    if (!code) {
      history.push('/');
    }
  }, [history]);

  return <div></div>;
};

export default GithubSignInPage;
