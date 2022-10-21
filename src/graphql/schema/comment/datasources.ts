import { Knex } from 'knex';
import { ValidationError } from "apollo-server";
import { SQLDatasource } from "../../datasources/sql/sql-datasource";
import { IComment, ICreateComment } from "./types/typings";

const commentReducer = ({ id, comment, created_at, user_id }: IComment) => {
  return {
    id: id,
    comment: comment,
    user_id: user_id,
    createdAt: new Date(created_at).toISOString()
  }
}

export class CommentSQLDataSource extends SQLDatasource {
  tableName: string

  constructor(dbConnection: Knex) {
    super(dbConnection)
    this.tableName = "comments"
  }

  async getById(id: String) {
    return this.db(this.tableName).where({ id })
  }

  async getByPostId(post_Id: String) {
    return (await this.db(this.tableName).where({ post_Id })).map((comment: IComment) => commentReducer(comment))
  }

  async create({ userId, postId, comment }: ICreateComment) {
    const partialComment = {
      user_id: userId,
      post_id: postId,
      comment,
    };

    const exists = await this.db(this.tableName).where(partialComment);

    if (exists.length) throw new ValidationError("Comment already created");

    const created = await this.db(this.tableName).insert(partialComment);

    return {
      id: created[0],
      createdAt: new Date().toISOString(),
      ...partialComment,
    }
  }

  async batchLoaderCallback(post_ids: any) {
    const comments = await this.db(this.tableName).whereIn("post_Id", post_ids)
    return post_ids.map((post_id: any) => {
      return comments.filter((comment: IComment) => {
        return String(comment.post_id) === String(post_id)
      }).map((comment: IComment) => commentReducer(comment))
    })
  }
}
