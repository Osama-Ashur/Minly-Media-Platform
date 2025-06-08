import jwt from "jsonwebtoken";

export default async (payload: any): Promise<string> => {
  const token = jwt.sign(payload, payload.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  return token;
};
