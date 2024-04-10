import { inject, injectable } from "inversify";
import { IUserService } from "./IUserService";
import { UserLoginDto } from "../dto/UserLoginDto";
import { UserRegisterDto } from "../dto/UserRegisterDto";
import { IUserRepository } from "../repositories/IUserRepository";
import { TYPES } from "../types";
import { compareSync, hash } from "bcryptjs";
import { IConfigService } from "../config/IConfigService";
import { ILoggerService } from "../logger/ILoggerService";
import { User } from "@prisma/client";

@injectable()
export class UserService implements IUserService {
  @inject(TYPES.UserRepository)
  private readonly _userRepository: IUserRepository;

  @inject(TYPES.ConfigService) private readonly _config: IConfigService;

  @inject(TYPES.LoggerService) private readonly _logger: ILoggerService;
  constructor() {}

  validatePassword(password: string, hashedPassword: string): boolean {
    return compareSync(password, hashedPassword);
  }

  public async register(userData: UserRegisterDto): Promise<User> {
    const { email, password, name } = userData;
    const existingUser = await this._userRepository.findByEmail(email);

    if (existingUser) {
      this._logger.log(`邮箱为 ${email} 的用户已经存在了`);
      throw new Error("用户已经存在了");
    }
    this._logger.debug(password, this._config.getConfig("SALT_ROUNDS"));
    const hashedPassword = await hash(
      password,
      Number(this._config.getConfig("SALT_ROUNDS"))
    );

    const result = await this._userRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return result;
  }

  async login({ email, password }: UserLoginDto): Promise<boolean> {
    const existedUser = await this._userRepository.findByEmail(email);
    this._logger.log(`邮箱为 ${email} 的用户不存在`);
    if (!existedUser) {
      throw new Error("用户不存在");
    }
    return this.validatePassword(password, existedUser.password);
  }

  async getUserInfo(userId: User["id"]): Promise<User> {
    return await this._userRepository.findById(userId);
  }
}
