import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { celebrate, Joi } from "celebrate";
import { authRequired } from "../middlewares/validateToken.js";
import TaskService from "../../services/tasks.js";
import { ITaskInputDTO } from "@/interfaces/ITask.js";

const route = Router();

export default (app: Router) => {
  app.use("/tasks", authRequired, route);

  route.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskServiceInstance = Container.get(TaskService);
      const tasks = await taskServiceInstance.GetTasks(req.currentUser._id);
      res.json(tasks);
    } catch (e) {
      return next(e);
    }
  });

  route.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskServiceInstance = Container.get(TaskService);
      const task = await taskServiceInstance.GetTask(req.params.id);
      if (!task) {
        const err = new Error("Task not found");
        err["status"] = 404;
        throw err;
      }
      res.json(task);
    } catch (e) {
      return next(e);
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
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const taskServiceInstance = Container.get(TaskService);
        const newTask = await taskServiceInstance.PostTask(
          req.body as ITaskInputDTO,
          req.currentUser._id
        );
        res.json(newTask);
      } catch (e) {
        return next(e);
      }
    }
  );

  route.patch(
    "/:id",
    celebrate({
      body: Joi.object({
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        date: Joi.date().optional(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const taskServiceInstance = Container.get(TaskService);
        const updatedTask = await taskServiceInstance.UpdateTask(
          req.params.id,
          req.body as ITaskInputDTO
        );
        if (!updatedTask) {
          const err = new Error("Task not found");
          err["status"] = 404;
          throw err;
        }
        res.json(updatedTask);
      } catch (e) {
        return next(e);
      }
    }
  );

  route.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskServiceInstance = Container.get(TaskService);
      const deletedTask = await taskServiceInstance.DeleteTask(req.params.id);
      if (!deletedTask) {
        const err = new Error("Task not found");
        err["status"] = 404;
        throw err;
      }
      res.sendStatus(204);
    } catch (e) {
      return next(e);
    }
  });
};
