import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

if (!process.env.NODE_ENV) {
  // eslint-disable-next-line no-console
  console.error("Please set NODE_ENV");
}

export default {
  node_env: process.env.NODE_ENV as string,
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS),
  jwt_access_secret: process.env.JWT_ACCESS_SECRET as string,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN as string,
  jwt_forgot_pass_expires_in: process.env.JWT_FORGOT_PASS_EXPIRES_IN as string,
  client_url: process.env.CLIENT_URL,
  reset_pass_url: process.env.RESET_PASS_URL,
  email_host_user: process.env.EMAIL_HOST_USER,
  email_host_pass: process.env.EMAIL_HOST_PASS,
};
