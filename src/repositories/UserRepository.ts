import { injectable } from "inversify";
import { IUserRepository } from "./IUserRepository";
import { BaseRepository } from "./BaseRepository";
import { Prisma, User } from "@prisma/client";

@injectable()
export class UserRepository
  extends BaseRepository<User, Prisma.UserCreateInput, Prisma.UserUpdateInput>
  implements IUserRepository
{
  constructor() {
    super(Prisma.ModelName.User);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const result = await this.prismaService.client.user.findFirst({
      where: { email },
    });
    return result;
  }
}
