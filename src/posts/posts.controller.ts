import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { PostEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
@UseGuards(AuthGuard('jwt'))
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getPosts(): Promise<PostEntity[]> {
    return await this.postsService.getPosts();
  }

  @Get('/:id')
  async getPostById(@Param('id') id: number): Promise<PostEntity> {
    return await this.postsService.getPostById(id);
  }

  @Post()
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: UserEntity,
  ): Promise<PostEntity> {
    return await this.postsService.createPost(createPostDto, user);
  }

  @Put('/:id')
  async updatePost(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() user: UserEntity,
  ): Promise<PostEntity> {
    return await this.postsService.updatePost(id, updatePostDto, user);
  }
}
