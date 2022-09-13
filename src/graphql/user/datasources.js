import { RESTDataSource } from 'apollo-datasource-rest';
import { makeUserDataloader } from './dataloaders';
import {
  createUserFn,
  deleteUserFn,
  updateUserFn,
} from './utils/userRepository';

export default class UsersApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.API_URL}/users/`;
    this.dataLoader = makeUserDataloader(this.getUsers.bind(this));
  }

  async getUsers(urlParams = {}) {
    return this.get('', urlParams, {
      cacheOptions: { ttl: 60 },
    });
  }

  async getUser(id) {
    return this.get(id, undefined, {
      cacheOptions: { ttl: 60 },
    });
  }

  async createUser(userData) {
    return await createUserFn(userData, this);
  }

  async updateUser(postId, postData) {
    return await updateUserFn(postId, postData, this);
  }

  async deleteUser(postId) {
    return await deleteUserFn(postId, this);
  }

  batchLoadById(id) {
    return this.dataLoader.load(id);
  }
}
