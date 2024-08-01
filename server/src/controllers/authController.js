import { createUser, getUser } from "../serveces/dbSevices.js";
import { comparePass, getJWTToken, hashPass } from "../utils/authUtils.js";

export const authControll = {
  registerNewUser: (req, res) => {
    const { username, pass } = req.body;
    const hashedPassword = hashPass(pass);
    createUser(username, hashedPassword),
      (error) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.sensStatus(200);
        }
      };
  },
  login: (req, res) => {
    const { username, pass } = req.body;
    getUser(username, (error, user) => {
      if (error) {
        res.status(500).send(error);
      } else if (user) {
        const hashedPass = user.hashedPassword;
        const correctPass = comparePass(pass, hashedPass);
        if (correctPass) {
          const jwtToken = getJWTToken(user);
          res.send(jwtToken);
        } else {
          res.sendStatus(404);
        }
      } else {
        res.sendStatus(404);
      }
    });
  },
};
