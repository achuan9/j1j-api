
import { inject } from "inversify";
import { controller, httpGet as GetMapping, httpPost as PostMapping } from "inversify-express-utils";
import { UserService } from "./services";
import type { Request, Response } from "express";
import { JWT } from "../jwt";

@controller('/user')
export class UserController {

    constructor(@inject(UserService) private readonly userService: UserService) {

    }

    @GetMapping('/list', JWT.middleware())
    public async getList(req: Request, res: Response) {
        // 添加了JWT中间件后，可以在req.user中获取到用户信息
        console.log(req.user.email);
        
        const result = await this.userService.getList();
        res.send(result);
    }

    @PostMapping('/create')
    public async createUser(req: Request, res: Response) {
        const result = await this.userService.createUser(req.body);
        res.send(result);
    }

    @PostMapping('/login')
    public async login(req: Request, res: Response) {
        const result = await this.userService.login(req.body);
        res.send(result);
    }
}