import { ApiProperty } from '@nestjs/swagger';
import { MeDto } from './user.dto';

export class ApiResponse<T = any> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  data: T;
}

export class signUpResponse {
  @ApiProperty({ example: '665123abc9821341bc123456' })
  _id: string;
}

export class loginResponse {
  @ApiProperty({ example: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9' })
  token: string;
}

export class getMeResponse {
  @ApiProperty()
  me: MeDto;
}
export class SignUpResponseDto extends ApiResponse<signUpResponse> {
  @ApiProperty({ type: () => signUpResponse })
  declare data: signUpResponse;
}

export class LoginResponseDto extends ApiResponse<loginResponse> {
  @ApiProperty({ type: () => loginResponse })
  declare data: loginResponse;
}

export class GetMeResponse extends ApiResponse<getMeResponse> {
  @ApiProperty({ type: () => getMeResponse })
  declare data: getMeResponse;
}
