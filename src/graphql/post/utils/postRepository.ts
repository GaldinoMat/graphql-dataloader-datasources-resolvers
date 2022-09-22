import {
  AuthenticationError,
  UserInputError,
  ValidationError,
} from 'apollo-server';

export const createPostFn = async (postData: any, dataSource: any) => {
  const newPost = await createPostInfo(postData, dataSource);

  const { title, body, userId } = newPost;

  if (!title || !body || !userId)
    throw new ValidationError('You have to send title, body and userId');

  return await dataSource.post('', { ...newPost });
};

export const updatePostFn = async (postId: string, postData: any, dataSource: any) => {
  if (!postId) throw new Error('Missing postId');

  const { userId } = await findOwner(dataSource, postId);

  const { title } = postData;

  await userExists(userId, dataSource);

  if (typeof title !== 'undefined') {
    if (!title) throw new ValidationError('Post must have a title');
  }

  return await dataSource.patch(
    postId,
    { ...postData },
    { cacheOptions: { ttl: 0 } },
  );
};

export const deletePostFn = async (postId: string, dataSource: any) => {
  if (!postId) throw new ValidationError('Missing postId');

  await findOwner(dataSource, postId);

  try {
    const deletedPost = await dataSource.delete(postId);
    return !!deletedPost;
  } catch (error) {
    throw new ValidationError('Post does not exist');
  }
};

const createPostInfo = async (postData: any, dataSource: any) => {
  const { title, body, userId } = postData;

  await userExists(userId, dataSource);

  const indexRefRaw = await dataSource.get('', {
    _limit: 1,
    _sort: 'indexRef',
    _order: 'desc',
  });

  const indexRef = indexRefRaw.pop().indexRef + 1;

  return {
    title,
    body,
    userId,
    indexRef,
    createdAt: new Date().toISOString(),
  };
};

const userExists = async (userId: string, dataSource: any) => {
  try {
    await dataSource.context.dataSources.userApi.get(userId);
  } catch (error) {
    throw new ValidationError(`User not found`);
  }
};

const findOwner = async (dataSource: any, postId: string) => {
  const foundPost = await dataSource.get(postId, undefined, {
    cacheOptions: { ttl: 0 },
  });

  if (!postId) throw new UserInputError('Could not find specified post');

  if (foundPost.userId !== dataSource.context.loggedUserId)
    throw new AuthenticationError('You can not modify this post');

  return foundPost;
};
