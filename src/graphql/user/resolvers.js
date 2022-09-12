const user = async (_, { id }, { dataSources }) => {
  const user = await dataSources.userApi.getUser(id);
  return user;
};

const users = async (_, { inputFilters }, { dataSources }) => {
  const users = await dataSources.userApi.getUsers(inputFilters);
  return users;
};

const posts = async ({ id }, _, { dataSources }) => {
  const { postApi } = dataSources;
  return postApi.batchLoadById(id);
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
  User: {
    posts,
  },
};
