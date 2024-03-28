import { compare } from "bcryptjs";

export class UserEntity {
  private readonly password: string;

  constructor(
    private readonly username: string,
    private readonly email: string
  ) {}

  public comparePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
