import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getDb } from "../db/db";
import { StatusCodes } from "http-status-codes";

const router = Router();

const createToken = () => {
  return jwt.sign({}, "secret", { expiresIn: "1h" });
};

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const pw = req.body.password;
  getDb()
    .db()
    .collection("users")
    .findOne({ email: email })
    .then((userDoc) => {
      return bcrypt.compare(pw, userDoc?.password);
    })
    .then((result) => {
      if (!result) {
        throw Error();
      }
      const token = createToken();
      res.status(StatusCodes.OK).json({
        message: "Authentication succeeded.",
        token: token,
      });
    })
    .catch((err) => {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Authentication failed, invalid username or password.",
      });
    });
});

router.post("/signup", (req, res, next) => {
  const email = req.body.email;
  const pw = req.body.password;
  bcrypt
    .hash(pw, 12)
    .then((hashedPW) => {
      getDb()
        .db()
        .collection("users")
        .insertOne({
          email: email,
          password: hashedPW,
        })
        .then((result) => {
          console.log(result);
          const token = createToken();
          res
            .status(StatusCodes.CREATED)
            .json({ token: token, user: { email: email } });
        })
        .catch((err) => {
          console.error(err);
          res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Creating the user failed." });
        });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Creating the user failed." });
    });
});

export default router;
