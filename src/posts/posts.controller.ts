import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller({
  path: 'posts',
  version: '1',
})
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  postTest() {
    return this.postsService.postTest();
  }
}
