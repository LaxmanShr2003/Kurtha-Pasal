import { jwt } from "jsonwebtoken";

type Token = {
  payload: object | string;
  secretKey: string;
  exp?: string;
};

export const generateToken = ({ payload, secretKey, exp }: Token) => {
  try {
    const expire = exp ? { expirein: exp } : undefined;
    const Token: string = jwt.sign(payload, secretKey, expire);
    return Token;
  } catch (err) {
    throw err;
  }
};

export const verifyToken = ({
  data,
  secretKey,
}: {
  data: string;
  secretKey: string;
}) => {
  try {
    const payload = jwt.verify(data, secretKey);
    return payload;
  } catch (err) {
    throw err;
  }
};
