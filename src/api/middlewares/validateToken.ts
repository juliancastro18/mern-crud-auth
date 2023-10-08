import express from "express";
import jwt from "jsonwebtoken";

export const authRequired = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied!" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.currentUser = user;
    next();
  });
};
