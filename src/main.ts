import "reflect-metadata";
import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { TYPES } from "./types";
import { ILoggerService } from "./common/ILoggerService";
import { LoggerService } from "./common/LoggerService";

export interface IBootstrapReturn {
  app: App;
  container: Container;
}

/** App */
const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.Application).to(App);
});

/** Utils */
const utilBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILoggerService>(TYPES.Logger).to(LoggerService);
});

/** Entities */
// export const entityBindings = new ContainerModule(
//   (bind: interfaces.Bind) => {
//     bind<IUserController>(TYPES.UserController).to(UserController);
//   }
// );

async function bootstrap(): Promise<IBootstrapReturn> {
  const container = new Container();
  container.load(appBindings);
  container.load(utilBindings);
  const app = container.get<App>(TYPES.Application);
  app.initialize();
  return { app, container };
}

bootstrap();
