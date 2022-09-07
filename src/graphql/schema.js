import { gql } from 'apollo-server';
import { postResolvers } from './post/resolvers';
import { postTypesDefs } from './post/typedefs';
import { userResolvers } from './user/resolvers';
import { userTypeDefs } from './user/typedefs';

const rootTypeDefs = gql`
  type Query {
    _root: Boolean
  }
`;

const rootResolvers = {
  Query: {
    _root: () => true,
  },
};

export const typeDefs = [rootTypeDefs, userTypeDefs, postTypesDefs];
export const resolvers = [rootResolvers, userResolvers, postResolvers];
