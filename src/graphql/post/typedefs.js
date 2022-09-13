import { gql } from 'apollo-server';

export const postTypesDefs = gql`
  extend type Query {
    post(id: ID!): Post!
    posts(inputFilters: ApiFiltersInput): [Post!]!
  }

  extend type Mutation {
    createPost(data: CreatePostInput!): Post!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    user: User!
    indexRef: Int!
    createdAt: String!
  }

  input CreatePostInput {
    title: String!
    body: String!
    userId: String!
  }
`;
