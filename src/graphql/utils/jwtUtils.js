import jwt from 'jsonwebtoken';

export const createJWToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};
