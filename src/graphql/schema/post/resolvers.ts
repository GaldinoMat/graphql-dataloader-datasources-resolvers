import { IDataSources } from '../../../types/typings';
import { isLoggedIn } from '../login/utils/authFunctions';
import { IPost } from './types/typings';

//#region Query resolvers
const post = async (_: any, { id }: any, { dataSources }: IDataSources) => {
  const post = await dataSources.postApi.getPost(id);
  return post;
};

const posts = async (_: any, { inputFilters }: any, { dataSources, loggedUserId }: IPost) => {
  isLoggedIn(loggedUserId);
  const { postApi } = dataSources;
  const posts = await postApi.getPosts(inputFilters);
  return posts;
};
//#endregion

//#region Mutation resolvers
const createPost = async (_: any, { data }: any, { dataSources, loggedUserId }: IPost) => {
  isLoggedIn(loggedUserId);
  data.userId = loggedUserId;
  const { postApi } = dataSources;
  return postApi.createPost(data);
};

const updatePost = async (
  _: any,
  { postId, data }: any,
  { dataSources, loggedUserId }: IPost,
) => {
  isLoggedIn(loggedUserId);
  data.userId = loggedUserId;
  const { postApi } = dataSources;
  return postApi.updatePost(postId, data);
};

const deletePost = async (_: any, { postId }: any, { dataSources, loggedUserId }: IPost) => {
  isLoggedIn(loggedUserId);
  const { postApi } = dataSources;
  return postApi.deletePost(postId);
};
//#endregion

//#region Field resolvers
const user = async ({ userId }: any, _: any, { dataSources }: IPost) => {
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
