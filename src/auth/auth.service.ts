import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import mongoose, { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { createUserDto, loginUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';

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

    this.logger.log('user dto password', userDto.password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userDto.password, salt);
    this.logger.log('hashed password', hashedPassword);
    const newUser = await this.userModel.create({
      bio: userDto.bio,
      username: userDto.username,
      email: userDto.email,
      password: hashedPassword,
    });

    return {
      success: true,
      data: {
        id: newUser._id,
      },
    };
  }

  async loginUser(userDto: loginUserDto) {
    this.logger.log('login function hit');
    const { email, password } = userDto;

    const user = await this.getUser(email);
    if (!user) {
      throw new NotFoundException('User doesnt exist');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    const { _id: userId } = user;

    const token = this.jwtService.sign(
      { userId },
      {
        secret: process.env.JWT_SECRET,
      },
    );

    return token;
  }

  async getMe(userId: mongoose.Types.ObjectId) {
    const user = await this.userModel
      .findById(userId)
      .select('-password')
      .lean();

    this.logger.log('User', user);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  private async getUser(email: string) {
    const user = await this.userModel.findOne({ email: email });

    return user;
  }
}
