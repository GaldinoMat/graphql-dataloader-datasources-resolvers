import { isLoggedIn } from '../login/utils/authFunctions';

//#region Query resolvers
const post = async (_: any, { id }: any, { dataSources }: any) => {
  const post = await dataSources.postApi.getPost(id);
  return post;
};

const posts = async (_: any, { inputFilters }: any, { dataSources, loggedUserId }: any) => {
  isLoggedIn(loggedUserId);

  const posts = await dataSources.postApi.getPosts(inputFilters);
  return posts;
};
//#endregion

//#region Mutation resolvers
const createPost = async (_: any, { data }: any, { dataSources, loggedUserId }: any) => {
  isLoggedIn(loggedUserId);
  data.userId = loggedUserId;
  const { postApi } = dataSources;
  return postApi.createPost(data);
};

const updatePost = async (
  _: any,
  { postId, data }: any,
  { dataSources, loggedUserId }: any,
) => {
  isLoggedIn(loggedUserId);
  data.userId = loggedUserId;
  const { postApi } = dataSources;
  return postApi.updatePost(postId, data);
};

const deletePost = async (_: any, { postId }: any, { dataSources, loggedUserId }: any) => {
  isLoggedIn(loggedUserId);
  const { postApi } = dataSources;
  return postApi.deletePost(postId);
};
//#endregion

//#region Field resolvers
const user = async ({ userId }: any, _: any, { dataSources }: any) => {
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
