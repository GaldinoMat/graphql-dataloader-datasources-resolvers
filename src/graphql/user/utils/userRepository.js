import { ValidationError } from 'apollo-server';

export const createUserFn = async (userData, dataSource) => {
  await checkUserFields(userData, true);

  const indexRefUser = await dataSource.get('', {
    _limit: 1,
    _sort: 'indexRef',
    _order: 'desc',
  });

  const indexRef = indexRefUser.pop().indexRef + 1;

  const foundUser = await userExists(userData.userName, dataSource);

  if (typeof foundUser !== 'undefined') {
    throw new ValidationError('User already exists');
  }

  return dataSource.post('', {
    ...userData,
    indexRef,
    createdAt: new Date().toISOString(),
  });
};

export const updateUserFn = async (userId, userData, dataSource) => {
  if (!userId) throw new ValidationError('Missing userId');

  if (userData.userName) {
    const foundUser = await userExists(userData.userName, dataSource);

    if (typeof foundUser !== 'undefined' && foundUser.id !== userId)
      throw new ValidationError('User already exists');
  }

  return dataSource.patch(userId, { ...userData });
};

export const deleteUserFn = async (userId, dataSource) => {
  if (!userId) throw new ValidationError('Missing userId');

  try {
    const deletedUser = await dataSource.delete(userId);
    return !!deletedUser;
  } catch (error) {
    throw new ValidationError('User does not exist');
  }
};

const checkUserFields = async (userData, isAllFieldsRequired = false) => {
  const userFields = ['firstName', 'lastName', 'userName'];

  for (const field of userFields) {
    if (!isAllFieldsRequired) {
      if (typeof userData[field] === 'undefined') continue;
    }

    if (field === 'userName') validateUsername(userData[field]);

    if (!userData[field]) {
      throw new ValidationError(`Missing ${field}`);
    }
  }
};

const validateUsername = async (userName) => {
  const userRegex = /^[a-z]([a-z0-9_.-]+)+$/gi;

  if (!userName.match(userRegex))
    throw new ValidationError('Username not accepted');
};

const userExists = async (userName, dataSource) => {
  try {
    const found = await dataSource.get('', {
      userName,
    });
    return found[0];
  } catch (error) {
    throw new ValidationError('Something went wrong');
  }
};
