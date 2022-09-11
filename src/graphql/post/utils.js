export const getPosts =
  (fetch) =>
  (path = '') =>
    fetch(`${process.env.API_URL}/posts/${path}`);
