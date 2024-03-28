import express, { Express } from "express";
import { Server } from "http";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import { ILoggerService } from "./common/ILoggerService";

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number = 8000;

  constructor(@inject(TYPES.Logger) private readonly logger: ILoggerService) {
    this.app = express();
  }

  initialize() {
    this.app.use(express.json());
    this.server = this.app.listen(this.port, () => {
      this.logger.log(`Server listening on port ${this.port}`);
    });
  }
}
