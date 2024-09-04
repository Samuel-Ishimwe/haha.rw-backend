import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private usersRepository: Repository<User>


  async findOneByPhone(phone: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({phone});
  }
  async findOne(login: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({login});
  }
  async create(createUserDto: CreateUserDto){
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    const user = {
      login: createUserDto.phone,
      password: hash,
      email: createUserDto.email,
      name: createUserDto.name,
      phone: createUserDto.phone,
      role: createUserDto.role,
    }
    const createdUser = this.usersRepository.create(user);
    return this.usersRepository.save(createdUser);
  }

  findAll() {
    return this.usersRepository.find();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id,updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
