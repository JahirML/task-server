import { sendEmail } from "../config/nodemailer";

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static confirmationEmail = async (user: IEmail) => {
    const info = await sendEmail({
      // from: "TaskFlow <taskflow.devs@gmail.com>",
      to: user.email,
      subject: "TaskFlow - Confirma tu cuenta",
      // text: "TaskFlow - Confirma tu cuenta",
      htmlContent: `<p>Hola: ${user.name}, has creado tu cuenta en TaskFlow, ya casi esta todo listo, solo debes confirmar tu cuenta </p>
      <p>Visita el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/auth/confirm">Confirmar cuenta </a>
      <p>E ingresa el código: <b>${user.token}</b><p>
      <p>Este token expira en 10 minutos</p>
      `,
    });

    console.log("Mensaje enviado", info);
  };

  static sendPasswordResetToken = async (user: IEmail) => {
    const info = await sendEmail({
      // from: "TaskFlow <taskflow.devs@gmail.com>",
      to: user.email,
      subject: "TaskFlow - Reestablece tu contraseña",
      // text: "TaskFlow - Reestablece tu contraseña",
      htmlContent: `<p>Hola: ${user.name}, has solicitado reestablecer tu contraseña</p>
      <p>Visita el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer contraseña</a>
      <p>E ingresa el código: <b>${user.token}</b><p>
      <p>Este token expira en 10 minutos</p>
      `,
    });

    console.log("Mensaje enviado", info);
  };
}
