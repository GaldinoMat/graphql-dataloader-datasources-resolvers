import { cookieParser } from '../schema/login/utils/cookieParser';
import UsersApi from '../schema/user/datasources';
import { verifyJWTToken } from '../utils/jwtUtils';

const authorizeUserBearer = async (req: any) => {
  const { headers } = req;
  const { authorization } = headers;

  try {
    const [_bearer, token] = authorization.split(' ');

    return verifyUserJWT(token);
  } catch (error) {
    return '';
  }
};

const verifyUserJWT = async (token: string) => {
  try {
    const {userId} = verifyJWTToken(token);

    const userAPI = new UsersApi();
    userAPI.initialize({} as any);
    const { token: foundToken } = await userAPI.getUser(userId);

    if (foundToken !== token) return '';

    return userId;
  } catch (error) {
    return '';
  }
};

export const context = async ({ req, res }: any) => {
  let loggedUserId = await authorizeUserBearer(req);

  if (!loggedUserId) {
    if (req.headers.cookie) {
      const { jwtToken } = cookieParser(req.headers.cookie);
      loggedUserId = await verifyUserJWT(jwtToken);
    }
  }

  return {
    loggedUserId,
    res,
  };
};
