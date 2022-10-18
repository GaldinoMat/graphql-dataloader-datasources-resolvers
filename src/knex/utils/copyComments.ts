import { knex } from '../index';
import { comments } from "../../../db.json"
import { dateISOtoMySQL } from "./convertDateISO"

export const commentsForDb = comments.map(key => {
  return {
    comment: key.comment,
    user_id: key.userId,
    post_id: key.postId,
    created_at: dateISOtoMySQL(key.createdAt)
  }
})

//#region Inserts comments into DB

// knex("comments")
//   .insert(commentsForDb)
//   .then(resp => console.log(resp))
//   .catch(err => console.log(err))
//   .finally(() => knex.destroy())

//#endregion
