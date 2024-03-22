import "reflect-metadata"
import { InversifyExpressServer } from "inversify-express-utils"
import container from "./inversify.config";

const server = new InversifyExpressServer(container)
const app = server.build();
app.listen(3000, () => console.log('Listening on port 3000'))