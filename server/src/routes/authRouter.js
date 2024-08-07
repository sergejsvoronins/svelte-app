import express from "express";
import { authControll } from "./../controllers/authController.js";

export const authRouter = express.Router();
authRouter.get("/", (req, res) => {
  res.send(req.user);
});
authRouter.post("/api/register", (req, res, next) => {
  authControll.registerNewUser(req, res);
});
authRouter.post("/api/login", (req, res, next) => {
  authControll.login(req, res);
});
authRouter.get("/api/user", (req, res, next) => {
  authControll.user(req, res);
});
authRouter.post("/api/logout", (req, res, next) => {
  authControll.logout(req, res);
});
