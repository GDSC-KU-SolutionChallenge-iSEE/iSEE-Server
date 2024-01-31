import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { withBaseResponse } from 'src/common/dto/deafult.dto';

export type UserData = {
  id: number;
  user_id: string;
};

export class UserDto {
  @ApiProperty({
    type: String,
    description: 'Firebase User Id',
  })
  @IsString()
  user_id: string;

  static of(data?: UserData): UserDto {
    return {
      user_id: data?.user_id,
    };
  }
}

export class ResponseUserDto extends withBaseResponse(UserDto, {}) {}
