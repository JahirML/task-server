import colors from "colors";
import server from "./server";

const port = process.env.PORT || 4000;

console.log("ENV SMTP:", {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS ? "***" : "NO PASS",
});

server.listen(port, () => {
  console.log(
    colors.bgWhite.cyan.bold(`REST api funcionando en puerto${port}`)
  );
});
