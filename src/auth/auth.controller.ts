import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto, loginUserDto } from './dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signup(@Body() userdto: createUserDto) {
    const user = await this.authService.register(userdto);

    return { success: true, user: user };
  }

  @Post('login')
  async login(@Body() userDto: loginUserDto) {
    const user = await this.authService.loginUser(userDto);

    return user;
  }
}
