import { ApiProperty } from '@nestjs/swagger';

export class DefaultDto<T> {
  @ApiProperty({
    type: Boolean,
    description: 'Operation success or not',
  })
  success: boolean;

  @ApiProperty({
    type: String,
    description: 'Message',
  })
  message: string;
  result: T;

  static of<T>(
    success: boolean,
    message: string = '',
    result: T,
  ): DefaultDto<T> {
    return {
      success,
      message,
      result,
    };
  }
}
