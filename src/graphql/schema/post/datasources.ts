import { RESTDataSource } from 'apollo-datasource-rest';
import DataLoader from 'dataloader';
import { makePostDataloader } from './dataloaders';
import {
  createPostFn,
  deletePostFn,
  updatePostFn,
} from './utils/postRepository';

export default class PostsApi extends RESTDataSource {
  private dataLoader: DataLoader<unknown, any, unknown>

  constructor() {
    super();
    this.baseURL = `${process.env.API_URL}/posts/`;
    this.dataLoader = makePostDataloader(this.getPosts.bind(this));
  }

  async getPosts(urlParams = {}) {
    return this.get('', urlParams, {
      cacheOptions: { ttl: 0 },
    });
  }

  async getPost(id: string) {
    return this.get(id, undefined, {
      cacheOptions: { ttl: 0 },
    });
  }

  async createPost(postData: any) {
    return await createPostFn(postData, this);
  }

  async updatePost(postId: string, postData: any) {
    return await updatePostFn(postId, postData, this);
  }

  async deletePost(postId: string) {
    return await deletePostFn(postId, this);
  }

  batchLoadById(id: string) {
    return this.dataLoader.load(id);
  }
}
