import express from "express";
import { authControll } from "./../controllers/authController.js";

export const authRouter = express.Router();
authRouter.get("/", (req, res) => {
  res.send(req.user);
});
authRouter.post("/register", (req, res, next) => {
  authControll.registerNewUser(req, res);
});
authRouter.post("/login", (req, res, next) => {
  authControll.login(req, res);
});
