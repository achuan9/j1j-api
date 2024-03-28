import { NextFunction } from "express";
import { BaseController } from "../../common/BaseController";
import { IUserController } from "./IUserController";
import { inject } from "inversify";
import { ILoggerService } from "../../common/ILoggerService";
import { TYPES } from "../../types";
import { controller, httpPost as PostMapping } from "inversify-express-utils";

@controller("/user")
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.UserRepository) private readonly userService: IUserController,
    @inject(TYPES.Logger) private readonly logger: ILoggerService
  ) {
    super(logger);
  }

  //   @PostMapping("/login")
  //   login: (req: Request, res: Response, next: NextFunction) => {

  //   };

  @PostMapping("/create")
  public async login(req: Request, res: Response, next: NextFunction) {
    const result = await this.userService.createUser(req.body);
    res.send(result);
  }

  register: (req: Request, res: Response, next: NextFunction) => void;
  info: (req: Request, res: Response, next: NextFunction) => void;
  getUser(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
