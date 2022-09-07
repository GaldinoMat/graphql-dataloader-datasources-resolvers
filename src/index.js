import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './graphql/schema';
import { context } from './context';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen(4003).then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
