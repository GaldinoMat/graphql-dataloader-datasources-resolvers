import DataLoader from 'dataloader';

export const makeUserDataloader = (getUsers: (url: string) => Promise<any>) => {
  return new DataLoader(async (ids) => {
    const urlQuery = ids.join('&id=');
    const users = await getUsers(`?id=${urlQuery}`);
    return ids.map((id) => users.find((user: any) => user.id === id));
  });
};
