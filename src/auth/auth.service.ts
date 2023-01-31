import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import * as strings from '../resources/strings.js';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(authRegisterDto: AuthRegisterDto): Promise<UserEntity> {
    const user = await this.usersService.create(authRegisterDto);
    return user;
  }

  async login(
    authLoginDto: AuthLoginDto,
  ): Promise<{ token: string; user: UserEntity }> {
    const user = await this.usersService.findOneByEmail(authLoginDto.email);

    if (!user) {
      throw new UnauthorizedException(strings.INVALID_CREDENTIAL_ERROR);
    }

    const isValidPassword = await bcrypt.compare(
      authLoginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException(strings.INVALID_CREDENTIAL_ERROR);
    }
    const token = await this.jwtService.sign({
      id: user.id,
    });

    return {
      token,
      user,
    };
  }

  async me(user: UserEntity): Promise<UserEntity> {
    return this.usersService.findOneById(user.id);
  }
}
