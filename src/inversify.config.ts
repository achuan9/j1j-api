import { ContainerModule, interfaces } from "inversify";
import { ILoggerService } from "./logger/ILoggerService";
import { LoggerService } from "./logger/LoggerService";
import { IConfigService } from "./config/IConfigService";
import { ConfigService } from "./config/ConfigService";

import { IUserController } from "./controllers/IUserController";
import { UserController } from "./controllers/UserController";
import { IUserService } from "./services/IUserService";
import { UserService } from "./services/UserService";
import { IUserRepository } from "./repositories/IUserRepository";
import { UserRepository } from "./repositories/UserRepository";
import { IPrismaService } from "./db/IPrismaService";
import { PrismaService } from "./db/PrismaService";
import { TYPES } from "./types";

/** Entities */
export const EntitiesBindings = new ContainerModule((bind: interfaces.Bind) => {
  /** Users */
  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<IUserService>(TYPES.UserService).to(UserService);
  bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);

  /** Posts */
});

/** Utils */
export const UtilsBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILoggerService>(TYPES.LoggerService).to(LoggerService);
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService);
  bind<IPrismaService>(TYPES.PrismaService).to(PrismaService);
});
