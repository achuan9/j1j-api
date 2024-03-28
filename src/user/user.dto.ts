import { Transform } from "class-transformer";
import { IsEmail } from "class-validator";
import { IsNotEmpty } from "class-validator";
export class UserDTO {
  @IsNotEmpty({ message: "用户名不能为空" })
  @Transform(({ value }) => value.trim())
  name: string;

  @IsNotEmpty({ message: "邮箱不能为空" })
  @IsEmail({}, { message: "邮箱格式不正确" })
  email: string;
}
