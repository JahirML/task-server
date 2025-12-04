import dotenv from "dotenv";
import * as brevo from "@getbrevo/brevo";

dotenv.config();

const apiInstance = new brevo.TransactionalEmailsApi();

// SET API KEY
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY!
);

export const sendEmail = async ({
  to,
  subject,
  htmlContent,
  fromName = "TaskFlow",
  fromEmail = process.env.MAILER_MAIL,
}) => {
  const email = new brevo.SendSmtpEmail();

  email.sender = { name: fromName, email: fromEmail };
  email.to = [{ email: to }];
  email.subject = subject;
  email.htmlContent = htmlContent;

  try {
    const result = await apiInstance.sendTransacEmail(email);
    console.log("Correo enviado ✔️", result.response);
  } catch (error) {
    console.error("Error enviando correo ❌", error);
  }
};
