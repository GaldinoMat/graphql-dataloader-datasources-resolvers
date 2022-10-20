import { IDataSources } from '../../../types/typings';
import { checkOwner } from '../login/utils/authFunctions';
import { IUser } from './types/typings';

//#region Query resolvers
const user = async (_: any, { id }: any, { dataSources }: IDataSources) => {
  const { userApi } = dataSources;
  const user = await userApi?.getUser(id);
  return user;
};

const users = async (_: any, { inputFilters }: any, { dataSources }: IDataSources) => {
  const { userApi } = dataSources;
  const users = await userApi?.getUsers(inputFilters);
  return users;
};
//#endregion

//#region Mutation Resolvers
const createUser = async (_: any, { data }: any, { dataSources }: IDataSources) => {
  const { userApi } = dataSources;
  return userApi?.createUser(data);
};

const updateUser = async (
  _: any,
  { userId, data }: any,
  { dataSources, loggedUserId }: IUser,
) => {
  checkOwner(userId, loggedUserId);

  const { userApi } = dataSources;
  return userApi.updateUser(userId, data);
};

const deleteUser = async (_: any, { userId }: any, { dataSources, loggedUserId }: IUser) => {
  checkOwner(userId, loggedUserId);
  const { userApi } = dataSources;
  return userApi.deleteUser(userId);
};
//#endregion

//#region Field Resolvers
const posts = async ({ id }: any, _: any, { dataSources }: IDataSources) => {
  const { postApi } = dataSources;
  return postApi.batchLoadById(id);
};
//#endregion

export const userResolvers = {
  Query: {
    user,
    users,
  },
  Mutation: {
    createUser,
    updateUser,
    deleteUser,
  },
  User: {
    posts,
  },
};
