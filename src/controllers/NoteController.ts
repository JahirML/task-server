import type { Request, Response } from "express";
import Note, { INote } from "../models/Note";

export class NoteControler {
  static createNote = async (req: Request<{}, {}, INote>, res: Response) => {
    const { content } = req.body;
    const note = new Note();
    // console.log(note);
    note.content = content;
    note.createdBy = req.user._id;
    note.task = req.task._id;

    req.task.notes.push(note._id);

    try {
      await Promise.allSettled([note.save(), req.task.save()]);
      res.send("Nota creada correctamente");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un errors" });
    }
  };

  static getNotes = async (req: Request, res: Response) => {
    const notes = await Note.find({ task: req.task._id });
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
    if (note.createdBy.toString() !== req.user._id.toString()) {
      const err = new Error("Accion no valida");
      return res.status(401).json({ error: err.message });
    }
    req.task.notes = req.task.notes.filter(
      (curr) => curr.toString() !== noteId.toString()
    );
    try {
      await Promise.allSettled([req.task.save(), note.deleteOne()]);
      res.send("Nota eliminada");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un errors" });
    }
  };
}
