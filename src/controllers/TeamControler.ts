import type { Request, Response } from "express";
import User from "../models/User";
import Project from "../models/Project";
export class TeamMermberControler {
  static findMemberByEmail = async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({ email }).select("id name email");

    if (!user) {
      const error = new Error("Usuario no encontrados");
      return res.status(404).json({ error: error.message });
    }
    res.json(user);
  };

  static addMember = async (req: Request, res: Response) => {
    const { id } = req.body;
    const user = await User.findById(id).select("id");

    if (!user) {
      const error = new Error("Usuario no encontrados");
      res.status(404).json({ error: error.message });
    }
    if (
      req.project.team.some((team) => team.toString() === user.id.toString())
    ) {
      const error = new Error("Este usuario ya esta agregrado al proyecto");
      return res.status(409).json({ error: error.message });
    }

    req.project.team.push(user.id);
    await req.project.save();
    res.send("Usuario agregado correctamente");
  };

  static deleteMember = async (req: Request, res: Response) => {
    const { id } = req.body;

    if (!req.project.team.some((team) => team.toString() === id)) {
      const error = new Error("El usuario no existe en el proyecto");
      return res.status(409).json({ error: error.message });
    }
    req.project.team = req.project.team.filter(
      (team) => team.toString() !== id
    );
    await req.project.save();
    res.send("Usuario eliminado correctamente");
  };

  static getAllMembers = async (req: Request, res: Response) => {
    const { team } = await req.project.populate("team", "id name email");
    res.status(200).json({ ok: true, team });
  };
}
