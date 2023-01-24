import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(authRegisterDto: AuthRegisterDto): Promise<User> {
    const user = await this.usersService.create(authRegisterDto);
    return user;
  }
}
