const login = async (_, { data }, { dataSources }) => {
  const { userName, password } = data;

  const { loginApi } = dataSources;

  return loginApi.login(userName, password);
};

const logout = async (_, { userName }, { dataSources }) => {
  const { loginApi } = dataSources;

  return loginApi.logout(userName);
};

export const loginResolvers = {
  Mutation: {
    login,
    logout,
  },
};
