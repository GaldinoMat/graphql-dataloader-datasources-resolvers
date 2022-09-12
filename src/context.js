import fetch from 'node-fetch';
import { getPosts } from './graphql/post/utils';
import { makeUserDataloader } from './graphql/user/dataloaders';
import { getUsers } from './graphql/user/utils';

export const context = () => {
  return {
    userDataLoader: makeUserDataloader(getUsers(fetch)),
    getUsers: getUsers(fetch),
    getPosts: getPosts(fetch),
  };
};
