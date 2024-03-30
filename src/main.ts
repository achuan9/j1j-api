import "reflect-metadata";
import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { TYPES } from "./types";
import { ILoggerService } from "./logger/ILoggerService";
import { LoggerService } from "./logger/LoggerService";
import { IConfigService } from "./config/IConfigService";
import { ConfigService } from "./config/ConfigService";

import { InversifyExpressServer } from "inversify-express-utils";
import express from "express";
import { IUserController } from "./controllers/IUserController";
import { UserController } from "./controllers/UserController";
import { IUserService } from "./services/IUserService";
import { UserService } from "./services/UserService";
import { IUserRepository } from "./repositories/IUserRepository";
import { UserRepository } from "./repositories/UserRepository";
import { IPrismaService } from "./db/IPrismaService";
import { PrismaService } from "./db/PrismaService";

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
  bind<ILoggerService>(TYPES.LoggerService).to(LoggerService);
  bind<IConfigService>(TYPES.ConfigServer).to(ConfigService);
  bind<IPrismaService>(TYPES.PrismaService).to(PrismaService);
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
  // await this._prismaService.connect();
  app.listen(8000, () => {
    console.log(`Server listening on port ${8000}`);
  });

  // return { app, container };
}

bootstrap();
