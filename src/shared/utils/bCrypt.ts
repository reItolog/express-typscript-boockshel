import bcrypt from 'bcrypt';

export const hash = async (password: string, saltRounds: number) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

export const compare = async (password: string, comparePassword: string) => {
  return await bcrypt.compare(password, comparePassword);
};