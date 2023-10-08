import { Router, Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../../libs/jwt.js";
import { authRequired } from "../middlewares/validateToken.js";

const route = Router();

export default (app: Router) => {
  app.use("/", route);

  route.post(
    "/register",
    celebrate({
      body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
      }),
    }),
    async (req: Request, res: Response) => {
      const { email, password, username } = req.body;

      try {
        const foundUser = await User.findOne({ email });
        if (foundUser) {
          return res.status(400).json(["The email is already in use"]);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
          username,
          email,
          password: passwordHash,
        });

        const savedUser = await newUser.save();
        const token = await createAccessToken({ id: savedUser._id });
        res.cookie("token", token);

        res.json({
          id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
          createdAt: savedUser.createdAt,
          updatedAt: savedUser.updatedAt,
        });
      } catch (error) {
        res.status(500).json([error.message]);
      }
    }
  );

  route.post(
    "/login",
    celebrate({
      body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      }),
    }),
    async (req: Request, res: Response) => {
      const { email, password } = req.body;

      try {
        const foundUser = await User.findOne({ email });

        if (!foundUser) return res.status(401).json(["User not found"]);

        const isMatch = await bcrypt.compare(password, foundUser.password);

        if (!isMatch) {
          return res.status(401).json(["Incorrect password"]);
        }

        const token = await createAccessToken({ id: foundUser._id });
        res.cookie("token", token);

        res.json({
          id: foundUser._id,
          username: foundUser.username,
          email: foundUser.email,
          createdAt: foundUser.createdAt,
          updatedAt: foundUser.updatedAt,
        });
      } catch (error) {
        res.status(500).json([error.message]);
      }
    }
  );

  route.post("/logout", async (req: Request, res: Response) => {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    return res.sendStatus(200);
  });

  route.get("/profile", authRequired, async (req: Request, res: Response) => {
    const foundUser = await User.findById(req.currentUser.id);

    if (!foundUser) {
      return res.status(401).json(["User not found!"]);
    }
    return res.json({
      id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
      createdAt: foundUser.createdAt,
      updatedAt: foundUser.updatedAt,
    });
  });
};