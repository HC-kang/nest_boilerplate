import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body(ValidationPipe) authRegisterDto: AuthRegisterDto) {
    return this.authService.register(authRegisterDto);
  }

  @Post('/login')
  async login(@Body(ValidationPipe) authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async me(@GetUser() user: UserEntity) {
    return this.authService.me(user);
  }

  @Post('/test')
  @UseGuards(AuthGuard('jwt'))
  test(@GetUser() user: UserEntity) {
    console.log(user);
    return user;
  }
}
