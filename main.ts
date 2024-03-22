import "reflect-metadata"
import { InversifyExpressServer } from "inversify-express-utils"
import container from "./inversify.config";
import express from "express";

const server = new InversifyExpressServer(container)
server.setConfig((app) => {
    app.use(express.json())
})
const app = server.build();
app.listen(3000, () => console.log('Listening on port 3000'))