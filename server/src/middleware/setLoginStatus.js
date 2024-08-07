import { decodeJWT, verifyJWT } from "../utils/authUtils.js";

export const setLoginStatus = (req, res, next) => {
  const cookie = req.cookies["authToken"];
  if (cookie && verifyJWT(token)) {
    const tokenData = decodeJWT(token);
    req.user = tokenData;
    req.user.isLoggedIn = true;
  } else {
    req.user = { isLoggedIn: false };
  }
  console.log(req.user);
  next();
};
