import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @Post('/register')
  async register(@Body(ValidationPipe) authRegisterDto: AuthRegisterDto) {
    return this.authService.register(authRegisterDto);
  }
}
