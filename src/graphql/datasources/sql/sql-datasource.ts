import  DataLoader  from 'dataloader';
import { DataSource } from "apollo-datasource"
import { InMemoryLRUCache } from "apollo-server-caching"
import { Knex } from 'knex';

export class SQLDatasource extends DataSource {
  db: Knex;
  _loader: DataLoader<unknown, any, unknown>;
  context: any;
  cache: String | undefined;

  constructor(dbConnection: Knex) {
    super()
    this.db = dbConnection;
    this._loader = new DataLoader(async (ids: any) => this.batchLoaderCallback(ids))
  }

  initialize({context, cache}: any) {
    this.context = context;
    this.cache = cache || new InMemoryLRUCache();
  }

  async batchLoadByID(id: String) {
    return this._loader.load(id);
  }

  async batchLoaderCallback(_ids: any) {
    return _ids;
  }
}
