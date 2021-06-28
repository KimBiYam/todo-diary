const ACCESS_TOKEN = 'ACCESS_TOKEN';

const tokenStorage = () => {
  const getToken = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (accessToken === null) {
      return null;
    }

    return accessToken;
  };

  const setToken = (accessToken: string) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
  };

  const clearToken = () => {
    localStorage.removeItem(ACCESS_TOKEN);
  };
};

export default tokenStorage;
