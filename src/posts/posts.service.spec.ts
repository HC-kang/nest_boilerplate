import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let fakePostsService: Partial<PostsService>;

  beforeEach(async () => {
    fakePostsService = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PostsService,
          useValue: fakePostsService,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
