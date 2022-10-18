import { checkOwner } from '../login/utils/authFunctions';

//#region Query resolvers
const user = async (_: any, { id }: any, { dataSources }: any) => {
  const user = await dataSources.userApi.getUser(id);
  return user;
};

const users = async (_: any, { inputFilters }: any, { dataSources }: any) => {
  const users = await dataSources.userApi.getUsers(inputFilters);
  return users;
};
//#endregion

//#region Mutation Resolvers
const createUser = async (_: any, { data }: any, { dataSources }: any) => {
  const { userApi } = dataSources;
  return userApi.createUser(data);
};

const updateUser = async (
  _: any,
  { userId, data }: any,
  { dataSources, loggedUserId }: any,
) => {
  checkOwner(userId, loggedUserId);

  const { userApi } = dataSources;
  return userApi.updateUser(userId, data);
};

const deleteUser = async (_: any, { userId }: any, { dataSources, loggedUserId }: any) => {
  checkOwner(userId, loggedUserId);
  const { userApi } = dataSources;
  return userApi.deleteUser(userId);
};
//#endregion

//#region Field Resolvers
const posts = async ({ id }: any, _: any, { dataSources }: any) => {
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
