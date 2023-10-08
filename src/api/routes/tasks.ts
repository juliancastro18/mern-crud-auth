import { Router, Request, Response } from "express";
import { celebrate, Joi } from "celebrate";
import Task from "../../models/task.model.js";
import { authRequired } from "../middlewares/validateToken.js";

const route = Router();

export default (app: Router) => {
  app.use("/tasks", authRequired, route);

  route.get("/", async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ user: req.currentUser.id });
      res.json(tasks);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  route.get("/:id", async (req: Request, res: Response) => {
    try {
      const foundTask = await Task.findById(req.params.id);
      if (!foundTask) {
        return res.status(404).json({ message: "Task not found!" });
      }
      res.json(foundTask);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  route.post(
    "/",
    celebrate({
      body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        date: Joi.date().optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      try {
        const { title, description, date } = req.body;
        const newTask = new Task({
          title,
          description,
          date,
          user: req.currentUser.id,
        }); //.populate(user) << to show user document instead of objectId
        const savedTask = await newTask.save();
        res.json(savedTask);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }
  );

  route.patch("/:id", async (req: Request, res: Response) => {
    try {
      const foundTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!foundTask) {
        return res.status(404).json({ message: "Task not found!" });
      }
      res.json(foundTask);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  route.delete("/:id", async (req: Request, res: Response) => {
    try {
      const foundTask = await Task.findByIdAndDelete(req.params.id);
      if (!foundTask) {
        return res.status(404).json({ message: "Task not found!" });
      }
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
};
