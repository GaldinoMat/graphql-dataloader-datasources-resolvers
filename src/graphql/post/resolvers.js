const post = async (_, { id }, { getPosts }) => {
  const response = await getPosts(id);

  const post = await response.json();

  if (Math.random() < 0.3)
    return {
      statusCode: 500,
      message: 'Timeout error',
      timeout: 123,
    };

  return typeof post.id === 'undefined'
    ? { statusCode: 404, message: 'Post not found', postId: id }
    : post;
};

const posts = async (_, { inputFilters }, { getPosts }) => {
  const apiSearchFiltersInput = new URLSearchParams(inputFilters);
  const posts = await getPosts(`/?${apiSearchFiltersInput}`);

  return posts.json();
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },
  PostResult: {
    __resolveType: (obj) => {
      if (typeof obj.postId !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.timeout !== 'undefined') return 'PostTimeoutError';
      if (typeof obj.id !== 'undefined') return 'Post';

      return null;
    },
  },
  PostError: {
    __resolveType: (obj) => {
      if (typeof obj.postId !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.timeout !== 'undefined') return 'PostTimeoutError';

      return null;
    },
  },
};
