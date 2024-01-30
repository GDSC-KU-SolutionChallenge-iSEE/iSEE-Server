import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FirebaseAuthGuard } from 'src/auth-guard/firebase-auth.guard';
import { UserDto } from './dto/users.dto';
import { CurrentUser } from 'src/auth-guard/auth.decorator';
import { DefaultDto } from 'src/common/dto/deafult.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @UseGuards(FirebaseAuthGuard)
  async getAllUsers(): Promise<DefaultDto<UserDto[]>> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(FirebaseAuthGuard)
  async getUserById(@Param('id') id: string): Promise<DefaultDto<UserDto>> {
    return await this.usersService.getUserById(id);
  }

  @Post('')
  @UseGuards(FirebaseAuthGuard)
  async createUser(
    @CurrentUser() user_id: string,
  ): Promise<DefaultDto<UserDto>> {
    return await this.usersService.createUser(user_id);
  }

  @Delete('')
  @UseGuards(FirebaseAuthGuard)
  async deleteUserById(
    @CurrentUser() user_id: string,
  ): Promise<DefaultDto<UserDto>> {
    return await this.usersService.deleteUserById(user_id);
  }
}
