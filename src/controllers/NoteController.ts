// import { INote } from "./../models/Note";
import type { Request, Response } from "express";
import Note, { INote } from "../models/Note";

export class NoteControler {
  static createNote = async (req: Request<{}, {}, INote>, res: Response) => {
    const { content } = req.body;
    const note = new Note();
    // console.log(note);
    note.content = content;
    note.createdBy = req.user.id;
    note.task = req.task.id;

    req.task.notes.push(note.id);

    try {
      await Promise.allSettled([note.save(), req.task.save()]);
      res.send("Nota creada correctamente");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un errors" });
    }
  };
}
