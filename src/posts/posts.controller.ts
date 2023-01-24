import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@UseGuards(AuthGuard('jwt'))
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  postTest() {
    return this.postsService.postTest();
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postsService.createPost(createPostDto, user);
  }
}
