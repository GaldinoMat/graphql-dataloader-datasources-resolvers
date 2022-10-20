import { CommentSQLDataSource } from "../graphql/schema/comment/datasources";
import LoginApi from "../graphql/schema/login/datasources";
import PostsApi from "../graphql/schema/post/datasources";
import UsersApi from "../graphql/schema/user/datasources";

export type IDataSources = {
  dataSources: IDataSourcesApis
}

export type IDataSourcesApis = {
  postApi: PostsApi,
  userApi: UsersApi,
  loginApi: LoginApi,
  commentDb: CommentSQLDataSource,
}

export type ILoggedUser = {
  dataSources: IDataSourcesApis
  loggedUserId: string
}
