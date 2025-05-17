import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T = any> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  data: T;
}
