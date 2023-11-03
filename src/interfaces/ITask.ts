import mongoose from "mongoose";

export interface ITask {
  _id: string;
  title: string;
  description: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITaskInputDTO {
  title?: string;
  description?: string;
  user?: mongoose.Types.ObjectId;
}