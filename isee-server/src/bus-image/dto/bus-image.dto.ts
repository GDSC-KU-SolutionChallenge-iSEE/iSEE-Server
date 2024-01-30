import { ApiProperty } from '@nestjs/swagger';

export class BusImageDto {
  @ApiProperty({
    type: String,
    description: 'List of Bus ID string',
  })
  bus_image: string;

  static of(data: string): BusImageDto {
    return {
      bus_image: data,
    };
  }
}
