import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { createUserDto, loginUserDto, signUpResponseDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger();
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({ type: signUpResponseDto })
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
