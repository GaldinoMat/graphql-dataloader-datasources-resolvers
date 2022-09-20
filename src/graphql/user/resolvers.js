import { checkOwner } from '../login/utils/authFunctions';

//#region Query resolvers
const user = async (_, { id }, { dataSources }) => {
  const user = await dataSources.userApi.getUser(id);
  return user;
};

const users = async (_, { inputFilters }, { dataSources }) => {
  const users = await dataSources.userApi.getUsers(inputFilters);
  return users;
};
//#endregion

//#region Mutation Resolvers
const createUser = async (_, { data }, { dataSources }) => {
  const { userApi } = dataSources;
  return userApi.createUser(data);
};

const updateUser = async (
  _,
  { userId, data },
  { dataSources, loggedUserId },
) => {
  checkOwner(userId, loggedUserId);

  const { userApi } = dataSources;
  return userApi.updateUser(userId, data);
};

const deleteUser = async (_, { userId }, { dataSources, loggedUserId }) => {
  checkOwner(userId, loggedUserId);
  const { userApi } = dataSources;
  return userApi.deleteUser(userId);
};
//#endregion

//#region Field Resolvers
const posts = async ({ id }, _, { dataSources }) => {
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
