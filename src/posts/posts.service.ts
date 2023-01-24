import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  postTest() {
    return 'post test2';
  }
}
