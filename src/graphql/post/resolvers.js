const post = async (_, { id }, { getPosts }) => {
  const response = await getPosts(id);
  const post = await response.json();

  return post;
};

const posts = async (_, { inputFilters }, { getPosts }) => {
  const apiSearchFiltersInput = new URLSearchParams(inputFilters);
  const posts = await getPosts(`/?${apiSearchFiltersInput}`);

  return posts.json();
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },
};
