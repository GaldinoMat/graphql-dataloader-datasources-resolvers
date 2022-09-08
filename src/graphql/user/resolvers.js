const user = async (_, { id }, { getUsers }) => {
  const user = await getUsers(id);

  return user.json();
};

const users = async (_, { inputFilters }, { getUsers }) => {
  const apiSearchFiltersInput = new URLSearchParams(inputFilters);
  const users = await getUsers(`/?${apiSearchFiltersInput}`);

  return users.json();
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};
