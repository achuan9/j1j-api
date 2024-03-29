import { inject, injectable } from "inversify";
import { IUserRepository } from "./IUserRepository";
import { TYPES } from "../types";
import { User } from "@prisma/client";
import { UserRegisterDto } from "../dto/UserRegisterDto";
import { IDatabase } from "../common/IDatabase";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(TYPES.Database) private database: IDatabase) {}

  find(
    email: string
  ): Promise<{ id: number; email: string; name: string; password: string }> {
    return this.database.client.user.findUnique({
      where: { email },
    });
  }
  create(user: UserRegisterDto): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
