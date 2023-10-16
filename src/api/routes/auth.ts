import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi } from "celebrate";
import { Container } from "typedi";
import AuthService from "../../services/auth.js";
import { authRequired } from "../middlewares/validateToken.js";
import { IUserInputDTO } from "../../interfaces/IUser.js";

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
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const authServiceInstance = Container.get(AuthService);
        const { user, token } = await authServiceInstance.SignUp(
          req.body as IUserInputDTO
        );
        res.cookie("token", token);
        return res.status(201).json(user);
      } catch (e) {
        return next(e);
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
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const { user, token } = await authServiceInstance.SignIn(email, password);
        res.cookie("token", token);
        return res.json(user).status(200);
      } catch (e) {
        console.log(e);
        return next(e);
      }
    }
  );

  route.post("/logout", async (req: Request, res: Response) => {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    return res.sendStatus(200);
  });

  route.get("/profile", authRequired, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authServiceInstance = Container.get(AuthService);
      const user = await authServiceInstance.GetProfile(req.currentUser._id);
      return res.json(user).status(200);
    } catch (e) {
      return next(e);
    }
  });
};
