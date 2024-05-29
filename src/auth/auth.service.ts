import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('AuthService');

  onModuleInit() {
    this.$connect();
    this.logger.log('MongoDB connected');
  }

  registerUser(registerUserDto: RegisterUserDto) {
    return { registerUserDto };
  }

  loginUser(loginUserDto: LoginUserDto) {
    return { loginUserDto };
  }

  verifyUser() {
    return 'verifyUser as a service';
  }
}
