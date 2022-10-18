import { RESTDataSource } from 'apollo-datasource-rest';
import DataLoader from 'dataloader';
import { makeUserDataloader } from './dataloaders';
import {
  createUserFn,
  deleteUserFn,
  updateUserFn,
} from './utils/userRepository';

export default class UsersApi extends RESTDataSource {
  private dataLoader: DataLoader<unknown, any, unknown>

  constructor() {
    super();
    this.baseURL = `${process.env.API_URL}/users/`;
    this.dataLoader = makeUserDataloader(this.getUsers.bind(this));
  }

  async getUsers(urlParams = {}) {
    return this.get('', urlParams, {
      cacheOptions: { ttl: 0 },
    });
  }

  async getUser(id: string) {
    return this.get(id, undefined, {
      cacheOptions: { ttl: 0 },
    });
  }

  async createUser(userData: any) {
    return await createUserFn(userData, this);
  }

  async updateUser(postId: string, postData: any) {
    return await updateUserFn(postId, postData, this);
  }

  async deleteUser(postId: string) {
    return await deleteUserFn(postId, this);
  }

  batchLoadById(id: string) {
    return this.dataLoader.load(id);
  }
}
