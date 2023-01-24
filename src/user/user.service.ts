import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserTest() {
    return 'User Test2';
  }
}
