import { UserEntity } from "./UserEntity";
import { UserModel } from "@prisma/client";

export interface IUserRepository {
  createUser(user: UserEntity): Promise<UserModel>;
  findUser(email: string): Promise<UserModel | null>;
}
