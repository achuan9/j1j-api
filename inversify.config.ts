import { Container } from "inversify";
import { PrismaClient } from "@prisma/client";
import { UserController } from "./src/user/controller";
import { UserService } from "./src/user/services";
import { PrismaDB } from "./src/db";

const container = new Container();

/**
 * 封装prismaClient
 */
container.bind<PrismaClient>("PrismaClient").toFactory(() => {
    return () => new PrismaClient();
})
container.bind(PrismaDB).to(PrismaDB)
/**
 * user模块
 */
container.bind(UserService).to(UserService)
container.bind(UserController).to(UserController)

export default container