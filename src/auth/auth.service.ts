import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(authRegisterDto: AuthRegisterDto): Promise<User> {
    const user = await this.usersService.create(authRegisterDto);
    return user;
  }

  async login(
    authLoginDto: AuthLoginDto,
  ): Promise<{ token: string; user: User }> {
    const user = await this.usersService.findOne(authLoginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(
      authLoginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.jwtService.sign({
      id: user.id,
    });

    return {
      token,
      user,
    };
  }
}
