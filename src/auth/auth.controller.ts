import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { createUserDto, loginUserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger();
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
  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@Request() req) {
    const user = await this.authService.getMe(req.userId);

    return user;
  }
}
