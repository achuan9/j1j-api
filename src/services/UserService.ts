import { inject, injectable } from "inversify";
import { IUserService } from "./IUserService";
import { UserLoginDto } from "../dto/UserLoginDto";
import { UserRegisterDto } from "../dto/UserRegisterDto";
import { IUserRepository } from "../repositories/IUserRepository";
import { TYPES } from "../types";
import { compareSync } from "bcryptjs";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly _userRepository: IUserRepository
  ) {}
  validatePassword(password: string, hashedPassword: string): boolean {
    return compareSync(password, hashedPassword);
  }

  createUser(
    user: UserRegisterDto
  ): Promise<{ id: number; email: string; name: string; password: string }> {
    return this._userRepository.create(user);
  }
  async login({ email, password }: UserLoginDto): Promise<boolean> {
    const existedUser = await this._userRepository.find(email);
    if (!existedUser) return false;
    return this.validatePassword(password, existedUser.password);
  }
  getUserInfo(
    email: string
  ): Promise<{ id: number; email: string; name: string; password: string }> {
    return this._userRepository.find(email);
  }
}
