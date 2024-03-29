import { IsEmail, IsNotEmpty } from "class-validator";

export class UserLoginDto {
  @IsNotEmpty({ message: "邮箱不能为空" })
  @IsEmail({}, { message: "邮箱格式不正确" })
  email: string;

  @IsNotEmpty({ message: "密码不能为空" })
  password: string;
}
