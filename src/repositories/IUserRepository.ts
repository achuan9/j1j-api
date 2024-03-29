import { User } from "@prisma/client";

export interface IUserRepository {
  create(user: Omit<User, "id">): Promise<User>;
  find(email: string): Promise<User | null>;
}
