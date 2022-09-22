import bcrypt from 'bcrypt';

export const bcryptHash = async (string: string, rounds: number) => {
  return bcrypt.hash(string, rounds);
};

export const bcryptCompare = async (string: string, encryptedString: string) => {
  return bcrypt.compare(string, encryptedString);
};
