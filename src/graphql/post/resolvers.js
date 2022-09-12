const post = async (_, { id }, { dataSources }) => {
  const post = await dataSources.postApi.getPost(id);
  return post;
};

const posts = async (_, { inputFilters }, { dataSources }) => {
  const posts = await dataSources.postApi.getPosts(inputFilters);
  return posts;
};

const user = async ({ userId }, _, { dataSources }) => {
  const { userApi } = dataSources;
  return userApi.batchLoadById(userId);
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
