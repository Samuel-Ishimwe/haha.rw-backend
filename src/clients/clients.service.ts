import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ClientsService {
  @InjectRepository(Client)
  private readonly clientRepository: Repository<Client>;
  @InjectRepository(User)
  private readonly userRepository : Repository<User>;

  async create(createClientDto: CreateClientDto) {
    const clientObj = {
      name: createClientDto.name,
      email: createClientDto.email,
      phone: createClientDto.phone,
    }

    const userObj = {
      name: createClientDto.name,
      email: createClientDto.email,
      phone: createClientDto.phone,
      password: createClientDto.password,
      login : createClientDto.phone
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createClientDto.password, saltOrRounds);
    const user = {
      login: createClientDto.phone,
      password: hash,
      email: createClientDto.email,
      name: createClientDto.name,
      phone: createClientDto.phone,
      role: 'Client',
    }
    const createdClient = await this.clientRepository.create(clientObj);
    const createdUser = await this.userRepository.create(user);
    await this.userRepository.save(createdUser);
    //TO-DO: Send an email notification to the created user
    return this.clientRepository.save(createdClient);
  }

  findAll() {
    return `This action returns all clients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
