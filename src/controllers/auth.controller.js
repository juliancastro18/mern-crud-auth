import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {createAccessToken} from '../libs/jwt.js'

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    const token = await createAccessToken({id: savedUser._id});
    res.cookie("token", token);

    res.json({
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt
    });

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

export const login = (req, res) => {
  res.send("login");
};
