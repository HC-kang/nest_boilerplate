import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  getUserTest() {
    return 'User Test2';
  }

  create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({
      email,
    });
  }

  findOneById(id: number) {
    return this.usersRepository.findOneBy({
      id,
    });
  }
}
