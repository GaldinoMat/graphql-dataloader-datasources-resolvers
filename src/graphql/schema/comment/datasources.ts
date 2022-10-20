import { ValidationError } from "apollo-server";
import { SQLDatasource } from "../../datasources/sql/sql-datasource";
import { ICreateComment } from "./types/typings";

export class CommentSQLDataSource extends SQLDatasource {
  async getById(id: String) {
    console.log(this.db)
    return this.db("comments").where("id", "=", id)
  }

  async create({ userId, postId, comment }: ICreateComment) {
    const partialComment = {
      user_id: userId,
      post_id: postId,
      comment,
    };

    const exists = await this.db("comments").where(partialComment);

    if (exists.length) throw new ValidationError("Comment already created");

    const created = await this.db("comments").insert(partialComment);

    return {
      id: created[0],
      createdAt: new Date().toISOString(),
      ...partialComment,
    }
  }
}
