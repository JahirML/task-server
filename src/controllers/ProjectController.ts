import type { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({
        $or: [{ manager: req.user._id }, { team: req.user._id }],
      });
      res.json(projects);
    } catch (err) {
      console.log(err);
    }
  };
  static getProjectbyId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id).populate("tasks");
      if (!project) {
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({ error: error.message });
      }
      const team = project.team.map((teamId) => teamId.toString());
      if (
        project.manager.toString() !== req.user._id.toString() &&
        !team.includes(req.user._id.toString())
      ) {
        const error = new Error("Acción no válida");
        return res.status(404).json({ error: error.message });
      }
      res.json(project);
    } catch (err) {
      console.log(err);
    }
  };

  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);

    project.manager = req.user._id;
    try {
      await project.save();
      res.send("Proyecto creado correctamene");
    } catch (err) {
      console.log(err);
    }
  };

  static updateProject = async (req: Request, res: Response) => {
    // const { id } = req.params;
    try {
      // const project = await Project.findByIdAndUpdate(id, req.body);

      req.project.projectName = req.body.projectName;
      req.project.clientName = req.body.clientName;
      req.project.description = req.body.description;
      await req.project.save();
      res.send("Proyecto actualizado");
    } catch (err) {
      console.log(err);
    }
  };

  static deleteProject = async (req: Request, res: Response) => {
    try {
      // const project = await Project.findByIdAndDelete(id);

      await req.project.deleteOne();
      res.send("Proyecto eliminado correctamente");
    } catch (err) {
      console.log(err);
    }
  };
}
