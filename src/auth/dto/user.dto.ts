import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiResponse } from './response.dto';

export class createUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  bio: string;
}

export class loginUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(10)
  password: string;
}

export class signUpResponseDto extends ApiResponse<createUserDto> {
  @ApiProperty({ type: () => createUserDto })
  declare data: createUserDto;
}
