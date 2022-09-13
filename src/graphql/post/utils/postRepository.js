import { ValidationError } from 'apollo-server';

export const createPostFn = async (postData, dataSource) => {
  const newPost = await createPostInfo(postData, dataSource);

  const { title, body, userId } = newPost;

  if (!title || !body || !userId)
    throw new ValidationError('You have to send title, body and userId');

  return await dataSource.post('', { ...newPost });
};

export const updatePostFn = async (postId, postData, dataSource) => {
  if (!postId) throw new Error('Missing postId');

  const { title, userId } = postData;

  await userExists(userId, dataSource);

  if (typeof title !== 'undefined') {
    if (!title) throw new ValidationError('Post must have a title');
  }

  return dataSource.patch(postId, { ...postData });
};

const createPostInfo = async (postData, dataSource) => {
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

const userExists = async (userId, dataSource) => {
  try {
    await dataSource.context.dataSources.userApi.get(userId);
  } catch (error) {
    throw new ValidationError(`User not found`);
  }
};
