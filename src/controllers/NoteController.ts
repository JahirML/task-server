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

  static getNotes = async (req: Request, res: Response) => {
    const notes = await Note.find({ task: req.task.id });
    try {
      res.status(200).json(notes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un errors" });
    }
  };
  static deleteNote = async (req: Request, res: Response) => {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);
    if (!note) {
      const err = new Error("Nota no encontrada");
      return res.status(404).json({ error: err.message });
    }
    if (note.createdBy.toString() !== req.user.id.toString()) {
      const err = new Error("Accion no valida");
      return res.status(401).json({ error: err.message });
    }
    try {
      await note.deleteOne(res.send("Nota eliminada"));
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un errors" });
    }
  };
}
