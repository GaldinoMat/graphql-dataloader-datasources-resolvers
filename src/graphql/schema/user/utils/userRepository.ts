import { UserInputError, ValidationError } from 'apollo-server';
import { bcryptHash } from '../../../utils/bcryptUtils';

export const createUserFn = async (userData: any, dataSource: any) => {
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

export const updateUserFn = async (userId: string, userData: any, dataSource: any) => {
  await checkUserFields(userData);

  if (!userId) throw new ValidationError('Missing userId');

  if (userData.userName) {
    const foundUser = await userExists(userData.userName, dataSource);

    if (typeof foundUser !== 'undefined' && foundUser.id !== userId)
      throw new ValidationError('User already exists');
  }

  return dataSource.patch(userId, { ...userData });
};

export const deleteUserFn = async (userId: string, dataSource: any) => {
  if (!userId) throw new ValidationError('Missing userId');

  try {
    const deletedUser = await dataSource.delete(userId);
    return !!deletedUser;
  } catch (error) {
    throw new ValidationError('User does not exist');
  }
};

const checkUserFields = async (userData: any, isAllFieldsRequired = false) => {
  const userFields = ['firstName', 'lastName', 'userName', 'password'];

  for (const field of userFields) {
    if (!isAllFieldsRequired) {
      if (typeof userData[field] === 'undefined') continue;
    }

    if (field === 'userName') validateUsername(userData[field]);

    if (field === 'password') validateUserPassword(userData[field]);

    if (!userData[field]) throw new ValidationError(`Missing ${field}`);
  }

  if (userData.password && !userData.passwordHash) {
    const { password } = userData;

    const passwordHash = await bcryptHash(password, 12);
    userData.passwordHash = passwordHash;
    delete userData['password'];
  }
};

const validateUsername = (userName: string) => {
  const userRegex = /^[a-z]([a-z0-9_.-]+)+$/gi;

  if (!userName.match(userRegex))
    throw new ValidationError('Username not accepted');
};

const validateUserPassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,30}$/;

  if (!password.match(passwordRegex))
    throw new UserInputError(
      'Password must contain at least one lowercase letter, one uppercase letter and one number',
    );
};

const userExists = async (userName: string, dataSource: any) => {
  try {
    const found = await dataSource.get('', {
      userName,
    });
    return found[0];
  } catch (error) {
    throw new ValidationError('Something went wrong');
  }
};
