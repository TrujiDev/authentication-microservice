import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('AuthService');

  onModuleInit() {
    this.$connect();
    this.logger.log('MongoDB connected');
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const { email, name, password } = registerUserDto;

    try {
      const user = await this.user.findUnique({
        where: { email },
      });

      if (user) {
        throw new RpcException({
          statis: 400,
          message: 'User already exist',
        });
      }

      const userCreated = await this.user.create({
        data: {
          email: email,
          name: name,
          password: password,
        },
      });

      return {
        user: userCreated,
        token: 'ABC',
      };
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: error.message,
      });
    }
  }

  loginUser(loginUserDto: LoginUserDto) {
    return { loginUserDto };
  }

  verifyUser() {
    return 'verifyUser as a service';
  }
}
