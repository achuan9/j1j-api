import type { Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ILoggerService } from "../logger/ILoggerService";

@injectable()
export abstract class BaseController {
  @inject(TYPES.LoggerService)
  protected readonly loggerService: ILoggerService;

  protected send<T>(res: Response, code: number, message: T): Response {
    return res.status(code).json(message);
  }

  protected ok<T>(res: Response, message: T): Response {
    return this.send(res, 200, message);
  }

  protected created(res: Response): Response {
    return res.sendStatus(201);
  }

  protected clientError(res: Response, message?: string): Response {
    return this.send(res, 400, message || "Unauthorized");
  }

  protected unauthorized(res: Response, message?: string): Response {
    return this.send(res, 401, message || "Unauthorized");
  }

  protected notFound(res: Response, message?: string): Response {
    return this.send(res, 404, message || "Not found");
  }

  protected fail(res: Response, error: Error | string): Response {
    this.loggerService.error(error);
    return res.status(500).json({ message: error.toString() });
  }
}
