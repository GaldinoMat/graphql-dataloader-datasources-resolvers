export const getUsers =
  (fetch) =>
  (path = '') =>
    fetch(`${process.env.API_URL}/users/${path}`);
