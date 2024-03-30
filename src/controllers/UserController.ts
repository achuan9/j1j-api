import { NextFunction } from "express";
import { BaseController } from "./BaseController";
import { IUserController } from "./IUserController";
import { inject } from "inversify";
import { ILoggerService } from "../logger/ILoggerService";
import { TYPES } from "../types";
import { controller, httpPost as PostMapping } from "inversify-express-utils";
import { IUserService } from "../services/IUserService";
import { UserLoginDto } from "../dto/UserLoginDto";
import type { Request, Response } from "express";
import { UserRegisterDto } from "../dto/UserRegisterDto";

@controller("/user")
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.UserService) private readonly userService: IUserService,
    @inject(TYPES.LoggerService) private readonly logger: ILoggerService
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
  @PostMapping("/register")
  public async register(
    req: Request<unknown, unknown, UserRegisterDto>,
    res: Response
  ) {
    const result = await this.userService.register(req.body);
    this.ok(res, result);
  }

  info: (req: Request, res: Response, next: NextFunction) => void;
  getUser(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
