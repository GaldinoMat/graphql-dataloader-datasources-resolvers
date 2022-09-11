const post = async (_, { id }, { getPosts }) => {
  const post = await getPosts(id).then((resp) => resp.json());

  return post;
};

const posts = async (_, { inputFilters }, { getPosts }) => {
  const apiSearchFiltersInput = new URLSearchParams(inputFilters);
  const posts = await getPosts(`/?${apiSearchFiltersInput}`).then((resp) =>
    resp.json(),
  );

  return posts;
};

const user = async ({ userId }, _, { userDataLoader }) => {
  return userDataLoader.load(userId);
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },
  Post: {
    user,
  },
};
