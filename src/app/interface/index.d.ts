import { JwtPayload } from "jsonwebtoken";
import { TUserRole } from "../modules/User/user.interface";

interface ExtendedJwtPayload extends JwtPayload {
  id: string;
  role: TUserRole;
}

declare global {
  namespace Express {
    interface Request {
      user: ExtendedJwtPayload;
    }
  }
}
