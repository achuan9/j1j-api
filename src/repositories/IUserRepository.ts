import { Prisma, User } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";

export interface IUserRepository
  extends BaseRepository<User, Prisma.UserCreateInput, Prisma.UserUpdateInput> {
  findByEmail(email: string): Promise<User>;
}
