import { createUser, getUser, getUserById } from "../serveces/dbSevices.js";
import {
  comparePass,
  getJWTToken,
  hashPass,
  verifyJWT,
} from "../utils/authUtils.js";
export const authControll = {
  registerNewUser: (req, res) => {
    const { username, password } = req.body;
    if (!username) {
      res.status(500).json({
        success: false,
        error: true,
        message: "Missing username!",
        data: req.body,
      });
      return;
    }
    if (!password) {
      res.status(500).json({
        success: false,
        error: true,
        message: "Missing password!",
        data: req.body,
      });
      return;
    }
    const hashedPassword = hashPass(password);
    createUser(username, hashedPassword, (error, status, userId) => {
      if (error) {
        res.status(500).json({
          success: false,
          error: true,
          message: status,
          data: req.body,
        });
      } else {
        res.status(200).json({
          success: true,
          errror: false,
          message: "User has been successfully created",
          userId: userId,
        });
      }
    });
  },
  login: (req, res) => {
    const { username, password } = req.body;
    if (!username) {
      res.status(500).json({
        success: false,
        error: true,
        message: "Missing username!",
        data: req.body,
      });
      return;
    }
    if (!password) {
      res.status(500).json({
        success: false,
        error: true,
        message: "Missing password!",
        data: req.body,
      });
      return;
    }
    getUser(username, (error, user) => {
      if (error) {
        res.status(500).json({
          success: false,
          error: true,
          message: "User not found",
          data: req.data,
        });
      } else if (user) {
        const hashedPass = user.hashedPassword;
        comparePass(password, hashedPass).then((result) => {
          if (result) {
            const jwtToken = getJWTToken(user);
            res.cookie("token", jwtToken, {
              httpOnly: true,
              maxAge: 24 * 60 * 60 * 1000,
            });
            res.send({
              success: true,
              error: false,
              message: "Login Successful",
              data: null,
            });
          } else {
            res.status(400).json({
              success: false,
              error: true,
              message: "Invalid credentials",
              data: req.body,
            });
          }
        });
      } else {
        res.sendStatus(404);
      }
    });
  },
  user: (req, res) => {
    const cookie = req.cookies["token"];
    try {
      const claims = verifyJWT(cookie, "secret key");
      if (!claims)
        res.status(401).json({
          success: false,
          error: true,
          message: "No Auth",
          data: null,
        });
      const id = claims.userId; // Should be checked when it is time
      getUserById(id, (error, user) => {
        res.json({
          success: true,
          error: false,
          message: "Authorized Please Proceed",
          data: { username: user.username, ...claims },
        });
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: true,
        message: "jwt Error",
        data: error.message,
      });
    }
  },
  logout: (req, res) => {
    res.cookie("token", { httpOnly: true, maxAge: 0 });
    res.send({
      success: true,
      error: false,
      message: "Logout successful",
      data: null,
    });
  },
};
