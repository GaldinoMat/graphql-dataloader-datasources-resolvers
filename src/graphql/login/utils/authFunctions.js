import { AuthenticationError } from 'apollo-server';

export const isLoggedIn = (loggedUserId) => {
  if (!loggedUserId) throw new AuthenticationError('User not logged in');
};

export const checkOwner = (userId, loggedUserId) => {
  isLoggedIn(loggedUserId);

  if (loggedUserId !== userId)
    throw new AuthenticationError('Authorization error');
};
