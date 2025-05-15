import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from './dto/user.dto';
import bcryptjs from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger();
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(userDto: createUserDto) {
    this.logger.log('register function hit');
    const user = await this.getUser(userDto.email);

    if (user) {
      throw new UnauthorizedException('User already exist');
    }
    const hashedPassword = await bcryptjs.hash(userDto.password, 10);
    await this.userModel.create({
      bio: userDto.bio,
      username: userDto.username,
      email: userDto.email,
      password: hashedPassword,
    });
  }

  async loginUser(userDto: createUserDto) {
    try {
      this.logger.log('login function hit');
      const { email, password } = userDto;

      const user = await this.getUser(email);
      if (!user) {
        throw new NotFoundException('User doesnt exist');
      }

      const passwordMatch = await bcryptjs.compare(password, user.password);
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid login credentials');
      }

      const { _id: userId } = user;

      const token = this.jwtService.sign(userId);

      return token;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException("internal server error")
    }
  }

  private async getUser(email: string) {
    const user = await this.userModel.findOne({ email: email });

    return user;
  }
}
