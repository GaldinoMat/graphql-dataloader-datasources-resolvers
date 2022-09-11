const post = async (_, { id }, { dataSources }) => {
  const post = dataSources.postApi.getPost(id);
  return post;
};

const posts = async (_, { inputFilters }, { dataSources }) => {
  const posts = dataSources.postApi.getPosts(inputFilters);
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
