import { gql } from 'apollo-server';
import { apiFiltersResolvers } from './api-filters/resolvers';
import { apiFiltersTypeDefs } from './api-filters/typedefs';
import { commentResolvers } from './comment/resolvers';
import { commentTypedefs } from './comment/typedefs';
import { loginResolvers } from './login/resolvers';
import { loginTypeDefs } from './login/typedefs';
import { postResolvers } from './post/resolvers';
import { postTypesDefs } from './post/typedefs';
import { userResolvers } from './user/resolvers';
import { userTypeDefs } from './user/typedefs';

const rootTypeDefs = gql`
  type Query {
    _root: Boolean
  }
  type Mutation {
    _root: Boolean
  }
`;

const rootResolvers = {
  Query: {
    _root: () => true,
  },
};

export const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  postTypesDefs,
  apiFiltersTypeDefs,
  loginTypeDefs,
  commentTypedefs
];
export const resolvers = [
  rootResolvers,
  userResolvers,
  postResolvers,
  apiFiltersResolvers,
  loginResolvers,
  commentResolvers
];
