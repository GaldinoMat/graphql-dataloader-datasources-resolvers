import { ILoggedUser } from '../../../../types/typings';
export type IUserID = {
  user_id: string
}

export type ICreateCommentData = {
  data: ICreateCommentDataInfo
}

type ICreateCommentDataInfo = {
  comment: string
  postId: string
}

export type ICreateComment = {
  userId: string
  postId: string
  comment: string
}

export type IComment = {
  id: string
  user_id: string
  comment: string
  created_at: string
  post_id?: string
}

export type ICreateCommentDataSource = ILoggedUser & {}
