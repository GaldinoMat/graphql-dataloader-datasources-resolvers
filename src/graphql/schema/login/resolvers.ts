const login = async (_: any, { data }: any, { dataSources }: any) => {
  const { userName, password } = data;

  const { loginApi } = dataSources;

  return loginApi.login(userName, password);
};

const logout = async (_: any, { userName }: any, { dataSources }: any) => {
  const { loginApi } = dataSources;

  return loginApi.logout(userName);
};

export const loginResolvers = {
  Mutation: {
    login,
    logout,
  },
};
