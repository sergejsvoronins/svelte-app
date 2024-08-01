import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
const secretKey = "secret key";
export const hashPass = (password) => {
  const hashValue = bcrypt.hashSync(password, 8);
  return hashValue;
};
export const comparePass = (pass, hash) => {
  const correct = bcrypt.compare(pass, hash);
  return correct;
};
export const getJWTToken = (user) => {
  const userData = { userId: user.id, username: user.name };
  const accessToken = jsonwebtoken.sign(userData, secretKey);
  return accessToken;
};

export const verifyJWT = (token) => {
  return jsonwebtoken.verify(token, secretKey);
};
export const decodeJWT = (token) => {
  return jsonwebtoken.decode(token, secretKey);
};
