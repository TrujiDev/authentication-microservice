import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async registerUser() {
    return 'registerUser as a service';
  }

  async loginUser() {
    return 'loginUser as a service';
  }

  async verifyUser() {
    return 'verifyTokenUser as a service';
  }
}
