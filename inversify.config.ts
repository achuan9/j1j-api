import { Container } from "inversify";
import { UserController } from "./src/user/controller";
import { UserService } from "./src/user/services";

const container = new Container();
/**
 * user模块
 */
container.bind(UserService).to(UserService)
container.bind(UserController).to(UserController)

export default container