import User from "../models/user.js";
import isAdmin from "../utils/verifyAdmin.js";
import env from "../config/validateEnv.js";
import jwt from "jsonwebtoken";
import {
  comparePasswords,
  generateRandomString,
  hashPassword,
} from "../utils/hashPassword.js";
import bcrypt from "bcrypt";

export async function createUser(req, res) {
  if (req.body.role === "admin" && !isAdmin(req.user)) {
    return res.status(401).json({
      message: "You are not allowed to create admin accounts!",
    });
  } else {
    try {
      const salt = generateRandomString(5);

      const hashedPassword = await hashPassword(req.body.password, salt);

      const user = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
        salt: salt,
        role: req.body.role,
      });

      await user.save();

      return res.status(201).json({
        message: "User created!",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Failed to create user!",
      });
    }
  }
}
export async function loginUser(req, res) {
  const email = req.body.email;
  const withoutSalt = req.body.password;

  try {
    const user = await User.findOne({ email: email });

    const password = `${withoutSalt}${user.salt}`;

    if (user != null) {
      const isPasswordCorrect = await comparePasswords(password, user.password);

      if (!isPasswordCorrect) {
        res.status(401).json({
          message: "Invalid credentials!",
        });
      } else {
        const token = jwt.sign(
          {
            _id: user._id,
            fName: user.fName,
            lName: user.lName,
            email: user.email,
            phone: user.phone,
            role: user.role,
          },
          env.JWT_SECRET,
        );

        return res.status(200).json({
          message: "User logged in successful!",
          token: token,
        });
      }
    } else {
      return res.status(404).json({
        message: "User not found!",
      });
    }
  } catch (error) {
    console.error(error);
  }
}
export async function updateUser(req, res) {}
export async function deleteUser(req, res) {}
