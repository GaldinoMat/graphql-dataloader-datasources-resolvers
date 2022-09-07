const post = async (_, { id }, { getPosts }) => {
  const posts = await getPosts(id);

  return posts.json();
};

const posts = async (_, __, { getPosts }) => {
  const posts = await getPosts();

  return posts.json();
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },
};
