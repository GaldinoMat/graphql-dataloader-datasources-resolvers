import bcrypt from 'bcrypt';

export const bcryptHash = async (string, rounds) => {
  return bcrypt.hash(string, rounds);
};

export const bcryptCompare = async (string, encryptedString) => {
  return bcrypt.compare(string, encryptedString);
};
