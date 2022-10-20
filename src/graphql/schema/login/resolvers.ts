import { IDataSources } from "../../../types/typings";

const login = async (_: any, { data }: any, { dataSources }: IDataSources) => {
  const { userName, password } = data;
  const { loginApi } = dataSources;

  return loginApi?.login(userName, password);
};

const logout = async (_: any, { userName }: any, { dataSources }: IDataSources) => {
  const { loginApi } = dataSources;

  return loginApi.logout(userName);
};

export const loginResolvers = {
  Mutation: {
    login,
    logout,
  },
};
