import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import userModel from "../models/userModel.js";

const router = express.Router();

// Route For Registering a User

router.post("/register", (req, res) => {
  // Request Body console log
  console.log(req.body);

  const reqEmail = req.body.email;
  const reqName = req.body.name;
  const reqPassword = req.body.password;

  userModel.findOne({ email: reqEmail }, (err, user) => {
    if (err) {
      res.send(err);
    }
    if (user) {
      res.send({ Msg: "User already exists" });
    } else {
      console.log("User : >>", user);

      // Encrypt users password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(reqPassword, salt, (err, hash) => {
          if (err) {
            res.send(err);
          } else {
            console.log("hash :>> ", hash);

            // Create a new User
            const newUser = new userModel({
              name: reqName,
              email: reqEmail,
              password: hash,
            });

            // Save the new User in our DB
            newUser
              .save()
              .then((user) => {
                res.send(user);
              })
              .catch((err) => {
                res.send(err);
              });
          }
        });
      });
    }
  });
});

// Route for Login the User

router.post("/signin", (req, res) => {
  const reqEmail = req.body.email;
  const reqPassword = req.body.password;

  console.log("Request Body : >>", req.body);

  userModel.findOne({ email: reqEmail }, (err, user) => {
    if (err) {
      res.send(err);
    }
    if (user) {
      // Compare password (DB enc. pw with user.pw) -> decrypt the password
      bcrypt.compare(reqPassword, user.password, (err, result) => {
        if (result) {
          console.log(user.id, user.email);

          // create JWT payload
          const payload = {
            id: user.id,
            email: user.email,
          };

          // Sign token

          // console.log(process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);

          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN },
            (err, token) => {
              if (err) {
                res.send(err);
              } else {
                // Send Login Response
                res.status(200).json({
                  success: true,
                  token,
                  user,
                });
              }
            }
          );
        } else {
          // Wrong password
          res.status(403).send({ message: "Wrong password", success: false });
        }
      });
    } else {
      // No user
      res.status(403).send({ message: "User not found", success: false });
    }
  });
});

// Get Route ->> POPULATE

router.get(
  "/favoriteArtists",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      console.log(req.user.user._id);

      const authenticatedUserId = req.user.user._id;

      const userFavorites = await userModel
        .findById(authenticatedUserId)
        .populate({ path: "favoriteArtists", select: "artistName location" });

      console.log(userFavorites);

      res.status(200).json(userFavorites);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
);

export default router;
