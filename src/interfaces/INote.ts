import mongoose from "mongoose";

export interface INote {
  _id: string;
  title: string;
  description: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface INoteInputDTO {
  title?: string;
  description?: string;
  user?: mongoose.Types.ObjectId;
}