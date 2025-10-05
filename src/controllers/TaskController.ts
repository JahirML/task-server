import { request, type Request, type Response } from "express";
import Task from "../models/Task";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      task.project = req.project.id;
      req.project.tasks.push(task.id);
      // await task.save();
      // await req.project.save();
      await Promise.allSettled([task.save(), req.project.save()]);
      res.send("Tarea creada Correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
      // console.log(error);
    }
  };

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project.id }).populate(
        "project"
      );
      res.json(tasks);
      // res.send("Tarea creada Correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
      // console.log(error);
    }
  };

  static getTaskbyId = async (req: Request, res: Response) => {
    try {
      res.json(req.task);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
  static updateTask = async (req: Request, res: Response) => {
    try {
      req.task.name = req.body.name;
      req.task.description = req.body.description;
      await req.task.save();
      res.send("Tarea Actualizada correctamente");
      // res.send("Tarea creada Correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
      // console.log(error);
    }
  };
  static updateTaskStatus = async (req: Request, res: Response) => {
    try {
      const { status } = req.body;

      req.task.status = status;
      await req.task.save();
      res.send("Tarea Actualizada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
      // console.log(error);
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    try {
      // await task.deleteOne();
      req.project.tasks = req.project.tasks.filter(
        (task) => task.toString() !== req.task.id.toString()
      );
      res.send("Tarea eliminada correctamente");

      // await req.project.save();

      await Promise.allSettled([req.task.deleteOne(), req.project.save()]);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
      // console.log(error);
    }
  };
}
