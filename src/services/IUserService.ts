import { UserLoginDto } from "../dto/UserLoginDto";
import { UserRegisterDto } from "../dto/UserRegisterDto";
import { User } from "@prisma/client";
export interface IUserService {
  register(user: UserRegisterDto): Promise<User>;
  login(loginInfo: UserLoginDto): Promise<boolean>;
  getUserInfo(userId: User["id"]): Promise<User>;
  validatePassword(password: string, hashedPassword: string): boolean;
}
