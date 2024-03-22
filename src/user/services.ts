import { inject, injectable } from "inversify";
import { PrismaDB } from "../db";


@injectable()
export class UserService {
    constructor(@inject(PrismaDB) private readonly prismaDB: PrismaDB) {
        
    }
    public getList() {
        return this.prismaDB.prisma.user.findMany();
    }
    public async createUser(user: any) {
        return await this.prismaDB.prisma.user.create({
            data: user
        })
    }  
}