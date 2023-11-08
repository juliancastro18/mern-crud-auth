import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Container } from "typedi";
import { IUser } from "../../interfaces/IUser.js";

export const authRequired = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied!" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err: Error, payload: any) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    try {
      const UserModel = Container.get('userModel') as mongoose.Model<IUser & mongoose.Document>;
      const userRecord = await UserModel.findById(payload._id);
      if (!userRecord) {
        return res.sendStatus(401);
      }
      const currentUser = userRecord.toObject();
      Reflect.deleteProperty(currentUser, 'password');
      Reflect.deleteProperty(currentUser, 'salt');
      req.currentUser = currentUser;
      return next();
    } catch (e) {
      return next(e);
    }
  });
};
