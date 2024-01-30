import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { UserDto } from './dto/users.dto';
import { DefaultDto } from 'src/common/dto/deafult.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<DefaultDto<UserDto[]>> {
    const users = await this.prisma.users.findMany({
      where: {
        deletedAt: null,
      },
    });
    return DefaultDto.of<UserDto[]>(true, 'Found Users', users.map(UserDto.of));
  }

  async getUserById(user_id: string): Promise<DefaultDto<UserDto>> {
    const users = await this.prisma.users.findMany({
      where: {
        user_id,
        deletedAt: null,
      },
    });
    if (users.length === 0) {
      return DefaultDto.of<UserDto>(false, 'Found No User', null);
    }
    return DefaultDto.of<UserDto>(true, 'Found User', users.map(UserDto.of)[0]);
  }

  async createUser(user_id: string): Promise<DefaultDto<UserDto>> {
    const duplicate_users = await this.prisma.users.findMany({
      where: {
        user_id: user_id,
        deletedAt: null,
      },
    });
    if (duplicate_users.length !== 0) {
      throw new ConflictException('User already exists');
    }
    const user = await this.prisma.users.create({
      data: {
        user_id: user_id,
      },
    });
    return DefaultDto.of<UserDto>(true, 'Created User', UserDto.of(user));
  }

  async deleteUserById(user_id: string): Promise<DefaultDto<UserDto>> {
    const duplicate_users = await this.prisma.users.findMany({
      where: {
        user_id: user_id,
        deletedAt: null,
      },
    });
    if (duplicate_users.length === 0) {
      throw new NotFoundException('User not found');
    }
    const users = await this.prisma.users.updateMany({
      where: {
        user_id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return DefaultDto.of<UserDto>(true, 'Deleted User', UserDto.of(users[0]));
  }
}
