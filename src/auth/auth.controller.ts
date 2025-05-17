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
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  GetMeResponse,
  LoginResponseDto,
  SignUpResponseDto,
} from './dto/response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger();
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({ type: SignUpResponseDto })
  @Post('signup')
  async signup(@Body() userdto: createUserDto) {
    const user = await this.authService.register(userdto);

    return { success: true, user: user };
  }

  @Post('login')
  @ApiCreatedResponse({ type: LoginResponseDto })
  async login(@Body() userDto: loginUserDto) {
    const user = await this.authService.loginUser(userDto);

    return user;
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: GetMeResponse })
  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@Request() req) {
    const user = await this.authService.getMe(req.userId);

    return user;
  }
}
