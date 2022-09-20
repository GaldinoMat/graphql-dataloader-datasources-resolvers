import UsersApi from './graphql/user/datasources';
import { verifyJWTToken } from './graphql/utils/jwtUtils';

export const context = async ({ req }) => {
  const loggedUserId = await authorizeUser(req);
  return {
    loggedUserId,
  };
};

const authorizeUser = async (req) => {
  const { headers } = req;
  const { authorization } = headers;

  try {
    const [_bearer, token] = authorization.split(' ');
    const { userId } = verifyJWTToken(token);

    const userAPI = new UsersApi();
    userAPI.initialize({});
    const { token: foundToken } = await userAPI.getUser(userId);

    if (foundToken !== token) return '';

    return userId;
  } catch (error) {
    console.log(error);
    return '';
  }
};
