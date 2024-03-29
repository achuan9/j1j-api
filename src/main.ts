import "reflect-metadata";
import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { TYPES } from "./types";
import { ILoggerService } from "./common/ILoggerService";
import { LoggerService } from "./common/LoggerService";
import { IConfigService } from "./common/IConfigService";
import { ConfigService } from "./common/ConfigService";

import { InversifyExpressServer } from "inversify-express-utils";
import express from "express";
import { IUserController } from "./controller/IUserController";
import { UserController } from "./controller/UserController";
import { IUserService } from "./services/IUserService";
import { UserService } from "./services/UserService";
import { IUserRepository } from "./repositories/IUserRepository";
import { UserRepository } from "./repositories/UserRepository";
import { IDatabase } from "./common/IDatabase";
import { Database } from "./common/Database";

export interface IBootstrapReturn {
  app: App;
  container: Container;
}

/** App */
const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.Application).to(App);
  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<IUserService>(TYPES.UserService).to(UserService);
  bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
});

/** Utils */
const utilBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILoggerService>(TYPES.Logger).to(LoggerService);
  bind<IConfigService>(TYPES.ConfigServer).to(ConfigService);
  bind<IDatabase>(TYPES.Database).to(Database);
});

/** Entities */
// export const entityBindings = new ContainerModule(
//   (bind: interfaces.Bind) => {
//     bind<IUserController>(TYPES.UserController).to(UserController);
//   }
// );

async function bootstrap() {
  const container = new Container();
  container.load(appBindings);
  container.load(utilBindings);
  // const app = container.get<App>(TYPES.Application);
  // app.initialize(container);
  const server = new InversifyExpressServer(container);
  server.setConfig(app => {
    app.use(express.json());
    // app.use(container.get(JWT).init());
  });
  const app = server.build();
  app.listen(8000, () => {
    console.log(`Server listening on port ${8000}`);
  });

  // return { app, container };
}

bootstrap();
