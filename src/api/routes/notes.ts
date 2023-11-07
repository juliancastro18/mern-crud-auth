import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { celebrate, Joi } from "celebrate";
import { authRequired } from "../middlewares/validateToken.js";
import NoteService from "../../services/notes.js";
import { INoteInputDTO } from "@/interfaces/INote.js";

const route = Router();

export default (app: Router) => {
  app.use("/notes", authRequired, route);

  route.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const noteServiceInstance = Container.get(NoteService);
      const notes = await noteServiceInstance.GetNotes(req.currentUser._id);
      res.json(notes);
    } catch (e) {
      return next(e);
    }
  });

  route.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const noteServiceInstance = Container.get(NoteService);
      const note = await noteServiceInstance.GetNote(req.params.id);
      if (!note) {
        const err = new Error("Note not found");
        err["status"] = 404;
        throw err;
      }
      res.json(note);
    } catch (e) {
      return next(e);
    }
  });

  route.post(
    "/",
    celebrate({
      body: Joi.object({
        title: Joi.string().allow('').required(),
        description: Joi.string().allow('').required()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.body.title && !req.body.description) {
          const err = new Error("Can't create an empty note!");
          err["status"] = 400;
          throw err;
        }
        const noteServiceInstance = Container.get(NoteService);
        const newNote = await noteServiceInstance.PostNote(
          req.body as INoteInputDTO,
          req.currentUser._id
        );
        res.json(newNote);
      } catch (e) {
        return next(e);
      }
    }
  );

  route.patch(
    "/:id",
    celebrate({
      body: Joi.object({
        title: Joi.string().allow('').optional(),
        description: Joi.string().allow('').optional()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const noteServiceInstance = Container.get(NoteService);
        const updatedNote = await noteServiceInstance.UpdateNote(
          req.params.id,
          req.body as INoteInputDTO
        );
        if (!updatedNote) {
          const err = new Error("Note not found");
          err["status"] = 404;
          throw err;
        }
        res.json(updatedNote);
      } catch (e) {
        return next(e);
      }
    }
  );

  route.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const noteServiceInstance = Container.get(NoteService);
      const deletedNote = await noteServiceInstance.DeleteNote(req.params.id);
      if (!deletedNote) {
        const err = new Error("Note not found");
        err["status"] = 404;
        throw err;
      }
      res.sendStatus(204);
    } catch (e) {
      return next(e);
    }
  });
};
