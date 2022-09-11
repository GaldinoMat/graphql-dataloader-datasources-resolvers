import DataLoader from 'dataloader';

export const makePostDataloader = (getPosts) => {
  return new DataLoader(async (ids) => {
    console.log();
    const urlQuery = ids.join('&userId=');
    const posts = await getPosts(`?userId=${urlQuery}`).then((resp) =>
      resp.json(),
    );
    return ids.map((id) => posts.filter((post) => post.userId === id));
  });
};
