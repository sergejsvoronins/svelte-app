import express from "express";
import { todoRouter } from "../src/routes/todoRouter.js";
import bodyParser from "body-parser";
import cors from "cors";
import { authRouter } from "./routes/authRouter.js";
import { decodeJWT, verifyJWT } from "./utils/authUtils.js";
import { forceAuth } from "./middleware/forceAuth.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (token && verifyJWT(token)) {
    const tokenData = decodeJWT(token);
    req.user = tokenData;
    req.user.isLoggedIn = true;
  } else {
    req.user = { isLoggedIn: false };
  }
  next();
});
app.use("/", authRouter);
app.use("/todos", todoRouter);
app.listen(8001, () => {
  console.log("Listening on localhost, port: 8001");
});
