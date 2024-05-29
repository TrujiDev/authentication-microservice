import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  registerUser() {
    return 'registerUser as a service';
  }

  loginUser() {
    return 'loginUser as a service';
  }

  verifyUser() {
    return 'verifyUser as a service';
  }
}
