import bcrypt from "bcrypt";

export const hashPassword = (password: string): Promise<string> => {
  const saltRounds = 10;

  return new Promise(async (resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err: any, hash: any) {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

export const comparePassword = (
  password: string,
  dataPassword: string
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    bcrypt.compare(password, dataPassword, function (err: any, hash: any) {
      if (err) reject(err);

      resolve(hash);
    });
  });
};
