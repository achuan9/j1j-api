import express, { Application } from "express";
import { Server } from "http";
import { Container, inject, injectable } from "inversify";
import { TYPES } from "./types";
import { ILoggerService } from "./logger/ILoggerService";
import { InversifyExpressServer } from "inversify-express-utils";

@injectable()
export class App {
  app: Application;
  server: Server;
  port: number = 8000;

  constructor(
    @inject(TYPES.LoggerService) private readonly logger: ILoggerService
  ) {}

  initialize(container: Container) {
    const server = new InversifyExpressServer(container);
    server.setConfig(app => {
      app.use(express.json());
      // app.use(container.get(JWT).init());
    });
    this.app = server.build();
    this.server = this.app.listen(this.port, () => {
      this.logger.log(`Server listening on port ${this.port}`);
    });
  }
}
