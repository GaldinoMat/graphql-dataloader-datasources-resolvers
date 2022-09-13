import { RESTDataSource } from 'apollo-datasource-rest';
import { makePostDataloader } from './dataloaders';
import {
  createPostFn,
  deletePostFn,
  updatePostFn,
} from './utils/postRepository';

export default class PostsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.API_URL}/posts/`;
    this.dataLoader = makePostDataloader(this.getPosts.bind(this));
  }

  async getPosts(urlParams = {}) {
    return this.get('', urlParams, {
      cacheOptions: { ttl: 60 },
    });
  }

  async getPost(id) {
    return this.get(id, undefined, {
      cacheOptions: { ttl: 60 },
    });
  }

  async createPost(postData) {
    return await createPostFn(postData, this);
  }

  async updatePost(postId, postData) {
    return await updatePostFn(postId, postData, this);
  }

  async deletePost(postId) {
    return await deletePostFn(postId, this);
  }

  batchLoadById(id) {
    return this.dataLoader.load(id);
  }
}
