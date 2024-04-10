import "reflect-metadata";
import { Container } from "inversify";
import { EntitiesBindings, UtilsBindings } from "./inversify.config";
import { InversifyExpressServer } from "inversify-express-utils";
import express from "express";
import { ILoggerService } from "./logger/ILoggerService";
import { TYPES } from "./types";

bootstrap(8000);

async function bootstrap(port: number = 8000) {
  const container = new Container();
  container.load(EntitiesBindings, UtilsBindings);
  const server = new InversifyExpressServer(container);
  const app = server.build();
  server.setConfig(app => {
    app.use(express.json());
  });
  const _logger = container.get<ILoggerService>(TYPES.LoggerService);
  app.listen(port, () => {
    _logger.log(`Server listening on port ${port}`);
  });
}
