const ACCESS_TOKEN = 'ACCESS_TOKEN';

const tokenStorage = {
  getToken() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (accessToken === null) {
      return null;
    }

    return accessToken;
  },

  setToken(accessToken: string) {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
  },

  clearToken() {
    localStorage.removeItem(ACCESS_TOKEN);
  },
};

export default tokenStorage;
