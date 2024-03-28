import { NextFunction } from "express";
import { BaseController } from "../../common/BaseController";

export interface IUserController extends BaseController {
  login: (req: Request, res: Response, next: NextFunction) => void;
  register: (req: Request, res: Response, next: NextFunction) => void;
  info: (req: Request, res: Response, next: NextFunction) => void;
  getUser(): Promise<void>;
}
