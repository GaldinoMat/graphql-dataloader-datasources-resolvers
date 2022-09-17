const login = async (_, { data }, { dataSources }) => {
  const { userName, password } = data;

  const { loginApi } = dataSources;

  return loginApi.login(userName, password);
};

export const loginResolvers = {
  Mutation: {
    login,
  },
};
