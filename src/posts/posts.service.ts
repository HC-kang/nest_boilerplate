import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async getPosts(): Promise<PostEntity[]> {
    return await this.postRepository.find();
  }

  async getPostById(id: number): Promise<PostEntity> {
    return await this.postRepository.findOneBy({
      id,
    });
  }

  async createPost(
    createPostDto: CreatePostDto,
    user: UserEntity,
  ): Promise<PostEntity> {
    const { title, content } = createPostDto;
    const newPost = await this.postRepository.create({
      title,
      content,
      user,
    });
    await this.postRepository.save(newPost);
    return newPost;
  }

  async updatePost(
    id: number,
    updatePostDto: UpdatePostDto,
    user: UserEntity,
  ): Promise<PostEntity> {
    const queryBuilder = this.postRepository
      .createQueryBuilder('posts')
      .where('posts.id = :id', { id })
      .leftJoin('posts.user', 'user')
      .addSelect('user');

    const aPost = await queryBuilder.getOne();

    if (!aPost) {
      throw new NotFoundException('Post not found');
    }

    if (aPost.user.id !== user.id) {
      throw new UnauthorizedException('Unauthorized');
    }

    this.postRepository.merge(aPost, updatePostDto);
    return await this.postRepository.save(aPost);
  }

  async deletePost(id: number, user: UserEntity): Promise<PostEntity> {
    const queryBuilder = this.postRepository
      .createQueryBuilder('posts')
      .where('posts.id = :id', { id })
      .leftJoin('posts.user', 'user')
      .addSelect('user.id');

    const aPost = await queryBuilder.getOne();

    if (!aPost) {
      throw new NotFoundException('Post not found');
    }

    if (aPost.user.id !== user.id) {
      throw new UnauthorizedException('Unauthorized');
    }
    await this.postRepository.remove(aPost);
    return aPost;
  }
}
