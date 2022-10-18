import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './graphql/schema';
import { context } from './graphql/context';
import PostsApi from './graphql/schema/post/datasources';
import UsersApi from './graphql/schema/user/datasources';
import LoginApi from './graphql/schema/login/datasources';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => {
    return {
      postApi: new PostsApi(),
      userApi: new UsersApi(),
      loginApi: new LoginApi(),
    };
  },
  uploads: false,
  cors: {
    origin: ['http://localhost:4003'],
    credentials: true,
  },
});

server.listen(4003).then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
