import { AuthenticationError } from 'apollo-server';

export const isLoggedIn = (loggedUserId: string) => {
  if (!loggedUserId) throw new AuthenticationError('User not logged in');
};

export const checkOwner = (userId: string, loggedUserId: string) => {
  isLoggedIn(loggedUserId);

  if (loggedUserId !== userId)
    throw new AuthenticationError('Authorization error');
};
