import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post(
  "/create-account",

  body("name").notEmpty().withMessage("El nombre no puede ir vacio"),
  body("email").isEmail().withMessage("El correo no es valido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener minimo 8 caracteres"),
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Los password no son iguales");
    }
    return true;
  }),
  handleInputErrors,
  AuthController.createAccount
);

export default router;
