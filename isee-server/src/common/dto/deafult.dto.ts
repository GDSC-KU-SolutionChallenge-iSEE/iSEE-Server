import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { mixin } from '@nestjs/common';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

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

// eslint-disable-next-line @typescript-eslint/ban-types
type Constructor<T = {}> = new (...args: any[]) => T;

export function withBaseResponse<TBase extends Constructor>(
  Base: TBase,
  options?: ApiPropertyOptions | undefined,
) {
  class ResponseDTO {
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

    @ApiProperty({
      isArray: true,
      type: Base,
      ...options,
    })
    @Type(() => Base)
    @ValidateNested({ each: true })
    result!: Array<InstanceType<TBase>>;
  }
  return mixin(ResponseDTO); // This is important otherwise you will get always the same instance
}
