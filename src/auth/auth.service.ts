import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(login: string, pass: string): Promise<{ access_token: string }> {
    const saltOrRounds = 10;
    const user = await this.usersService.findOneByPhone(login);
    if(!user){
      throw new NotFoundException();
    }
    const hash = await bcrypt.hash(pass, saltOrRounds);
    const isMatch = await bcrypt.compare(user.password, hash);

    if (isMatch) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    delete user.password;
    const payload = { sub: user.login, user: user };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };

  }
}