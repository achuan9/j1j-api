import { NextFunction } from "express";
import { BaseController } from "../common/BaseController";
import { IUserController } from "./IUserController";
import { inject } from "inversify";
import { ILoggerService } from "../common/ILoggerService";
import { TYPES } from "../types";
import { controller, httpPost as PostMapping } from "inversify-express-utils";
import { IUserService } from "../services/IUserService";
import { UserLoginDto } from "../dto/UserLoginDto";
import type { Request, Response } from "express";

@controller("/user")
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.UserService) private readonly userService: IUserService,
    @inject(TYPES.Logger) private readonly logger: ILoggerService
  ) {
    super();
  }

  @PostMapping("/login")
  public async login(
    req: Request<unknown, unknown, UserLoginDto>,
    res: Response
  ) {
    const result = await this.userService.login(req.body);
    this.ok(res, result);
  }

  // public async login(req: Request, res: Response) {
  //   const result = await this.userService.login(req.body);
  //   res.send(result);
  // }

  register: (req: Request, res: Response, next: NextFunction) => void;
  info: (req: Request, res: Response, next: NextFunction) => void;
  getUser(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
