import express from "express";
import { todoRouter } from "../src/routes/todoRouter.js";
import bodyParser from "body-parser";
import cors from "cors";
import { authRouter } from "./routes/authRouter.js";
import { decodeJWT, verifyJWT } from "./utils/authUtils.js";
import { forceAuth } from "./middleware/forceAuth.js";
import { setLoginStatus } from "./middleware/setLoginStatus.js";
import cookeaParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookeaParser());
// app.use((req, res, next) => {
//   const cookie = req.cookies["authToken"];
//   if (cookie && verifyJWT(cookie)) {
//     const tokenData = decodeJWT(cookie);
//     req.user = tokenData;
//     req.user.isLoggedIn = true;
//   } else {
//     req.user = { isLoggedIn: false };
//   }
//   next();
// });
app.use("/", authRouter);
app.use("/user", forceAuth, todoRouter);
app.get("/", (req, res) => {
  res.send(req.user);
});
app.listen(8001, () => {
  console.log("Listening on localhost, port: 8001");
});
