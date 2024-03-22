import { injectable } from "inversify";


@injectable()
export class UserService {
    public getList() {
        return 'list';
    }
    public createUser() {
        return '创建成功'
    }  
}