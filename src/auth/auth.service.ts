import { Injectable } from '@nestjs/common';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  async register(authRegisterDto: AuthRegisterDto) {
    return JSON.stringify(authRegisterDto);
  }
}
