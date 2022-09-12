const user = async (_, { id }, { getUsers }) => {
  const user = await getUsers(id).then((resp) => resp.json());

  return user;
};

const users = async (_, { inputFilters }, { getUsers }) => {
  const apiSearchFiltersInput = new URLSearchParams(inputFilters);
  const users = await getUsers(`/?${apiSearchFiltersInput}`).then((resp) =>
    resp.json(),
  );

  return users;
};

const posts = ({ id }, _, { dataSources }) => {
  const { postApi } = dataSources;
  return postApi.batchLoadUserId(id);
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
