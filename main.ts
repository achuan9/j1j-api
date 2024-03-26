import "reflect-metadata"
import { InversifyExpressServer } from "inversify-express-utils"
import container from "./inversify.config";
import express from "express";
import { JWT } from "./src/jwt";

const server = new InversifyExpressServer(container)
server.setConfig((app) => {
    app.use(express.json())
    app.use(container.get(JWT).init())
})
const app = server.build();
app.listen(3000, () => console.log('Listening on port 3000'))

// TODO: 待移到类型定义文件中
declare global {
    namespace Express {
         interface User {
            name: string;
            email: string;
        }
    }
}