//#region Query resolvers
const post = async (_, { id }, { dataSources }) => {
  const post = await dataSources.postApi.getPost(id);
  return post;
};

const posts = async (_, { inputFilters }, { dataSources }) => {
  const posts = await dataSources.postApi.getPosts(inputFilters);
  return posts;
};
//#endregion

//#region Mutation resolvers
const createPost = async (_, { data }, { dataSources }) => {
  const { postApi } = dataSources;
  return postApi.createPost(data);
};

const updatePost = async (_, { postId, data }, { dataSources }) => {
  const { postApi } = dataSources;
  return postApi.updatePost(postId, data);
};
//#endregion

//#region Field resolvers
const user = async ({ userId }, _, { dataSources }) => {
  const { userApi } = dataSources;
  return userApi.batchLoadById(userId);
};
//#endregion

export const postResolvers = {
  Query: {
    post,
    posts,
  },
  Mutation: {
    createPost,
    updatePost,
  },
  Post: {
    user,
  },
};
