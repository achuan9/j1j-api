import { Router } from "express";
import type { Response } from "express";
import { injectable } from "inversify";
import { ILoggerService } from "./ILoggerService";

@injectable()
export abstract class BaseController {
  protected readonly router: Router;

  constructor(private readonly loggerService: ILoggerService) {
    this.router = Router();
  }

  public created(res: Response) {
    return res.sendStatus(201);
  }

  public send<T>(res: Response, code: number, body: T) {
    res.type("application/json");
    return res.status(code).json(body);
  }

  public ok<T>(res: Response, body: T) {
    return this.send(res, 200, body);
  }

  public badRequest<T>(res: Response, body: T) {
    return this.send(res, 400, body);
  }

  public notFound<T>(res: Response, body: T) {
    return this.send(res, 404, body);
  }

  public unauthorized<T>(res: Response, body: T) {
    return this.send(res, 401, body);
  }

  public forbidden<T>(res: Response, body: T) {
    return this.send(res, 403, body);
  }

  public internalServerError<T>(res: Response, body: T) {
    return this.send(res, 500, body);
  }

  public notImplemented<T>(res: Response, body: T) {
    return this.send(res, 501, body);
  }
}
