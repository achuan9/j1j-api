import { NextFunction } from "express";
import { BaseController } from "./BaseController";
import type { Request, Response } from "express";

export interface IUserController extends BaseController {
  login: (req: Request, res: Response, next: NextFunction) => void;
  register: (req: Request, res: Response, next: NextFunction) => void;
  info: (req: Request, res: Response, next: NextFunction) => void;
}
