import { UserDocument } from "../../models/UserModel";

declare global {
  namespace Express {
    export interface Request {
      user?: UserDocument;
    }
  }
}
