import jwt from "jsonwebtoken";

export const encode = (value: any) => {
  if (!process.env.JWT_ENCODE) throw new Error("Missing environment variable");

  const hash = jwt.sign({ value }, process.env.JWT_ENCODE, {
    expiresIn: "6h",
  });

  return hash;
};

export const decode = (bearer: string) => {
  if (!process.env.JWT_ENCODE) throw new Error("Missing environment variable");

  const decoded = jwt.verify(bearer, process.env.JWT_ENCODE);

  return decoded;
};
