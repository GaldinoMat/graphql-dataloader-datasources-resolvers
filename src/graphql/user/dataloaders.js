import DataLoader from 'dataloader';

export const makeUserDataloader = (getUsers) => {
  return new DataLoader(async (ids) => {
    const urlQuery = ids.join('&id=');
    const users = await getUsers(`?id=${urlQuery}`).then((resp) => resp.json());
    return ids.map((id) => users.find((user) => user.id === id));
  });
};
