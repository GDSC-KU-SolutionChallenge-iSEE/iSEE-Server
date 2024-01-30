import { ApiProperty } from '@nestjs/swagger';

export class BusImageResultDto {
  @ApiProperty({
    type: [String],
    description: 'List of Bus ID string',
  })
  bus_ids: string[];

  static of(data: string[]): BusImageResultDto {
    return {
      bus_ids: data,
    };
  }
}
