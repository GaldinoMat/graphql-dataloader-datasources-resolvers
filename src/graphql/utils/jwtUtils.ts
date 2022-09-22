import jwt from 'jsonwebtoken';

type verifiedToken = {
  userId: string,
  iat: number,
  exp: number
}

type payload = {
  userId: string
}

export const createJWTToken = (payload: payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: '7d',
  });
};

export const verifyJWTToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as verifiedToken
};
