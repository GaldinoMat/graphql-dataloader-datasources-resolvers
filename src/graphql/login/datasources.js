import { RESTDataSource } from 'apollo-datasource-rest';
import { AuthenticationError } from 'apollo-server';
import { bcryptCompare } from '../utils/bcryptUtils';
import { createJWTToken } from '../utils/jwtUtils';

export default class LoginApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.API_URL}/users/`;
  }

  checkUser(user) {
    const isUserFound = !!user.length;

    if (!isUserFound) throw new AuthenticationError('Username error');

    return isUserFound;
  }

  async getUser(userName) {
    const user = await this.get(
      '',
      {
        userName,
      },
      {
        cacheOptions: { ttl: 0 },
      },
    );

    this.checkUser(user);

    return user;
  }

  async login(userName, password) {
    const user = await this.getUser(userName);

    const { passwordHash, id: userId } = user.pop();

    if (!(await bcryptCompare(password, passwordHash)))
      throw new AuthenticationError('Password error');

    const token = createJWTToken({ userId });

    await this.patch(
      userId,
      { token },
      {
        cacheOptions: { ttl: 0 },
      },
    );

    // Response cookie header
    this.context.res.cookie('jwtToken', token, {
      secure: true, // Rede segura - Https
      httpOnly: true, // Não deve ser acessado via código
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      path: '/',
      sameSite: 'strict', // strict lax none
    });

    return {
      userId,
      token,
    };
  }

  async logout(userName) {
    const user = await this.getUser(userName);

    const { id } = user.pop();

    if (id !== this.context.loggedUserId)
      throw new AuthenticationError('Authentication error');

    await this.patch(
      id,
      { token: '' },
      {
        cacheOptions: { ttl: 0 },
      },
    );
    // Response cookie header
    this.context.res.clearCookie('jwtToken');

    return true;
  }
}
