import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BusImageDto {
  @ApiProperty({
    type: String,
    description: 'List of Bus ID string',
  })
  @IsString()
  bus_image: string;

  static of(data: string): BusImageDto {
    return {
      bus_image: data,
    };
  }
}
