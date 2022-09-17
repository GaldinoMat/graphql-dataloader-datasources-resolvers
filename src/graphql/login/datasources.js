import { RESTDataSource } from 'apollo-datasource-rest';
import { AuthenticationError } from 'apollo-server';
import { bcryptCompare } from '../utils/bcryptUtils';
import { createJWToken } from '../utils/jwtUtils';

export default class LoginApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.API_URL}/users/`;
  }

  async login(userName, password) {
    const user = await this.get(
      '',
      {
        userName,
      },
      {
        cacheOptions: { ttl: 0 },
      },
    );

    const isUserFound = !!user.length;

    if (!isUserFound) throw new AuthenticationError('Username error');

    const { passwordHash, id: userId } = user.pop();

    if (!(await bcryptCompare(password, passwordHash)))
      throw new AuthenticationError('Password error');

    const jwtToken = createJWToken({ userId });

    return {
      userId,
      token: jwtToken,
    };
  }
}
