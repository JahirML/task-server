import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";
import {
  hasAuthorization,
  taskBelongsToProject,
  taskExists,
} from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMermberControler } from "../controllers/TeamControler";
import { NoteControler } from "../controllers/NoteController";

const router = Router();
router.use(authenticate);

router.get("/", ProjectController.getAllProjects);
router.get(
  "/:id",
  param("id").isMongoId().withMessage("Id no valido"),
  handleInputErrors,
  ProjectController.getProjectbyId
);
router.post(
  "/",
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La descripcion del proyecto es obligatoria"),
  handleInputErrors,
  ProjectController.createProject
);
router.put(
  "/:id",
  param("id").isMongoId().withMessage("Id no valido"),
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La descripcion del proyecto es obligatoria"),
  handleInputErrors,
  ProjectController.updateProject
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("Id no valido"),
  handleInputErrors,
  ProjectController.deleteProject
);

// ! Routes for task

router.param("projectId", validateProjectExists);
router.param("taskId", taskExists);
router.param("taskId", taskBelongsToProject);

router.post(
  "/:projectId/tasks",
  body("name").notEmpty().withMessage("El nombre de la tarea es obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La descripcion de la tarea es obligatoria"),
  hasAuthorization,
  handleInputErrors,
  TaskController.createTask
);

router.get("/:projectId/tasks", TaskController.getProjectTasks);

router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("Id de tarea no valido"),
  handleInputErrors,
  TaskController.getTaskbyId
);

router.put(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("Id de tarea no valido"),
  body("name").notEmpty().withMessage("El nombre de la tarea es obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La descripcion de la tarea es obligatoria"),
  hasAuthorization,
  handleInputErrors,
  TaskController.updateTask
);

router.delete(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("Id de tarea no valido"),
  hasAuthorization,
  handleInputErrors,
  TaskController.deleteTask
);

router.post(
  "/:projectId/tasks/:taskId/status",
  param("taskId").isMongoId().withMessage("Id de tarea no valido"),
  body("status").notEmpty().withMessage("El estatus es obligatorio"),
  handleInputErrors,
  TaskController.updateTaskStatus
);
// team endpoints

router.get("/:projectId/team", TeamMermberControler.getAllMembers);

router.post(
  "/:projectId/team/find",
  body("email").isEmail().withMessage("correo no válido"),
  handleInputErrors,
  TeamMermberControler.findMemberByEmail
);

router.post(
  "/:projectId/team",
  body("id").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  TeamMermberControler.addMember
);

router.delete(
  "/:projectId/team/:userId",
  param("userId").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  TeamMermberControler.deleteMember
);

// Rotes for notes

router.post(
  "/:projectId/tasks/:taskId/notes",
  body("content")
    .notEmpty()
    .withMessage("El contenido de la nota es necesario"),
  handleInputErrors,
  NoteControler.createNote
);
router.get(
  "/:projectId/tasks/:taskId/notes",
  handleInputErrors,
  NoteControler.getNotes
);

router.delete(
  "/:projectId/tasks/:taskId/notes/:noteId",
  param("noteId").isMongoId().withMessage("Id nmo valido"),
  handleInputErrors,
  NoteControler.deleteNote
);
export default router;
