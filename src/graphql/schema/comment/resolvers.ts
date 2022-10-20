import { IDataSources } from "../../../types/typings";
import { isLoggedIn } from "../login/utils/authFunctions";
import { ICreateCommentData, ICreateCommentDataSource, IUserID } from "./types/typings";

const createComment = async (_: any, { data }: ICreateCommentData, { dataSources, loggedUserId }: ICreateCommentDataSource) => {
  isLoggedIn(loggedUserId)
  const { postId, comment } = data

  await dataSources.postApi.getPost(postId)

  return dataSources.commentDb.create({
    postId,
    comment,
    userId: loggedUserId
  })
}

const user = async ({ user_id }: IUserID, _: any, { dataSources }: IDataSources) => {
  const user = await dataSources.userApi.batchLoadById(user_id)
  return user;
}

export const commentResolvers = {
  Mutation: { createComment },
  Comment: { user },
}
