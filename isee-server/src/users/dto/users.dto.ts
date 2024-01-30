import { ApiProperty } from '@nestjs/swagger';

export type UserData = {
  id: number;
  user_id: string;
};

export class UserDto {
  @ApiProperty({
    type: String,
    description: 'Firebase User Id',
  })
  user_id: string;

  static of(data?: UserData): UserDto {
    return {
      user_id: data?.user_id,
    };
  }
}
