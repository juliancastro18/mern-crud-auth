import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser.js";

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser & mongoose.Document>("User", User);
