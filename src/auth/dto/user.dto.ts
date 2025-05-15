import { IsEmail, IsNotEmpty } from 'class-validator';

export class createUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  bio: string;
}

export class loginUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
