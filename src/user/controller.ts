
import { inject } from "inversify";
import { controller, httpGet as GetMapping, httpPost as PostMapping } from "inversify-express-utils";
import { UserService } from "./services";
import type { Request, Response } from "express";

@controller('/user')
export class UserController {
   
    constructor(@inject(UserService) private readonly userService: UserService) {
        
    }

    @GetMapping('/list')
    public getList(req: Request, res: Response) {
        const result =  this.userService.getList();
        res.send(result);
    }

    @PostMapping('/create')
    public createUser(req: Request, res: Response) {
        const result = this.userService.createUser();
        res.send(result);
    }
}