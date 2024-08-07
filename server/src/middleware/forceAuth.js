import { verifyJWT } from "../utils/authUtils.js";

export const forceAuth = (req, res, next) => {
  const cookie = req.cookies["token"];
  try {
    const claims = verifyJWT(cookie, "secret key");
    console.log(claims);
    if (!claims) {
      res.status(401).json({
        success: false,
        error: true,
        message: "No Auth",
        data: null,
      });
    } else next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: "jwt Error",
      data: null,
    });
  }
};
