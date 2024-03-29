import { UserLoginDto } from "../dto/UserLoginDto";
import { UserRegisterDto } from "../dto/UserRegisterDto";
import { User } from "@prisma/client";
export interface IUserService {
  createUser(user: UserRegisterDto): Promise<User>;
  login(loginInfo: UserLoginDto): Promise<boolean>;
  getUserInfo(email: string): Promise<User>;
  validatePassword(password: string, hashedPassword: string): boolean;
}
