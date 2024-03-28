import { inject, injectable } from "inversify";
import { PrismaDB } from "../db";
import { UserDTO } from "./user.dto";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { JWT } from "../jwt";

@injectable()
export class UserService {
  constructor(
    @inject(PrismaDB) private readonly prismaDB: PrismaDB,
    @inject(JWT) private readonly jwt: JWT
  ) {}
  public getList() {
    return this.prismaDB.prisma.user.findMany();
  }
  public async createUser(user: UserDTO) {
    const userDTO = plainToClass(UserDTO, user);
    const errors = await validate(userDTO);
    if (errors.length) {
      return errors;
    }

    return await this.prismaDB.prisma.user.create({
      data: userDTO,
    });
  }
  public login(loginInfo: any) {
    return {
      token: this.jwt.createToken(loginInfo),
    };
  }
}
