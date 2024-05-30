import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/interfaces/jwt-payload.interface';
import { envs } from 'src/config';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('AuthService');

  constructor(private readonly jwtService: JwtService) {
    super();
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('MongoDB connected');
  }

  async signJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
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

      const newUser = await this.user.create({
        data: {
          email: email,
          name: name,
          password: bcrypt.hashSync(password, 10),
        },
      });

      const { password: __, ...userCreated } = newUser;

      return {
        user: userCreated,
        token: await this.signJwt(userCreated),
      };
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: error.message,
      });
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    try {
      const user = await this.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new RpcException({
          statis: 400,
          message: 'User does not exist',
        });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        throw new RpcException({
          status: 400,
          message: 'Incorrect e-mail/password',
        });
      }

      const { password: __, ...validUser } = user;

      return {
        user: validUser,
        token: await this.signJwt(validUser),
      };
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: error.message,
      });
    }
  }

  async verifyToken(token: string) {
    try {
      const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
        secret: envs.jwtSecret,
      });

      return {
        user,
        token: await this.signJwt(user),
      };
    } catch (error) {
      throw new RpcException({
        status: 401,
        message: 'Invalid Token',
      });
    }
  }
}
