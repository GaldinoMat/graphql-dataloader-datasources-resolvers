const post = () => {
  return {
    id: 1,
    title: 'Post title',
  };
};

const posts = async () => {
  return [
    {
      id: 1,
      title: 'Post title',
    },
    {
      id: 2,
      title: 'Post title',
    },
    {
      id: 3,
      title: 'Post title',
    },
  ];
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },
};
