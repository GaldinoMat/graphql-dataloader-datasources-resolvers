import { IDataSources, IDataSourcesApis, ILoggedUser } from '../../../../types/typings';
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

export type ICreateCommentDataSource = ILoggedUser & {}
