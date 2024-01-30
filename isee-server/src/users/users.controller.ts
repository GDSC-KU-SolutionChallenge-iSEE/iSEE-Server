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
import { ResponseUserDto, UserDto } from './dto/users.dto';
import { CurrentUser } from 'src/auth-guard/auth.decorator';
import { DefaultDto } from 'src/common/dto/deafult.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('users')
@ApiTags('users API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '모든 사용자를 조회합니다.' })
  @ApiCreatedResponse({ type: ResponseUserDto })
  async getAllUsers(): Promise<DefaultDto<UserDto[]>> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '사용자를 Id로 조회합니다.' })
  @ApiCreatedResponse({ type: ResponseUserDto })
  async getUserById(@Param('id') id: string): Promise<DefaultDto<UserDto[]>> {
    return await this.usersService.getUserById(id);
  }

  @Post('')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '사용자를 생성합니다.' })
  @ApiCreatedResponse({ type: ResponseUserDto })
  async createUser(
    @CurrentUser() user_id: string,
  ): Promise<DefaultDto<UserDto[]>> {
    return await this.usersService.createUser(user_id);
  }

  @Delete('')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '사용자를 삭제합니다.' })
  @ApiCreatedResponse({ type: ResponseUserDto })
  async deleteUserById(
    @CurrentUser() user_id: string,
  ): Promise<DefaultDto<UserDto[]>> {
    return await this.usersService.deleteUserById(user_id);
  }
}
