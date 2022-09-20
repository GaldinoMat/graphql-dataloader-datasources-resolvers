import { isLoggedIn } from '../login/utils/authFunctions';

//#region Query resolvers
const post = async (_, { id }, { dataSources }) => {
  const post = await dataSources.postApi.getPost(id);
  return post;
};

const posts = async (_, { inputFilters }, { dataSources, loggedUserId }) => {
  isLoggedIn(loggedUserId);

  const posts = await dataSources.postApi.getPosts(inputFilters);
  return posts;
};
//#endregion

//#region Mutation resolvers
const createPost = async (_, { data }, { dataSources, loggedUserId }) => {
  isLoggedIn(loggedUserId);
  data.userId = loggedUserId;
  const { postApi } = dataSources;
  return postApi.createPost(data);
};

const updatePost = async (
  _,
  { postId, data },
  { dataSources, loggedUserId },
) => {
  isLoggedIn(loggedUserId);
  data.userId = loggedUserId;
  const { postApi } = dataSources;
  return postApi.updatePost(postId, data);
};

const deletePost = async (_, { postId }, { dataSources, loggedUserId }) => {
  isLoggedIn(loggedUserId);
  const { postApi } = dataSources;
  return postApi.deletePost(postId);
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
    deletePost,
  },
  Post: {
    user,
  },
};
