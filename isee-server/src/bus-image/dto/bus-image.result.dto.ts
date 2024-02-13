import { ApiProperty } from '@nestjs/swagger';
import { withBaseResponse } from 'src/common/dto/deafult.dto';

export class BusImageResultDto {
  @ApiProperty({
    type: [String],
    description: 'List of Bus ID string',
  })
  result: string[];

  static of(data: string[]): BusImageResultDto {
    return {
      result: data,
    };
  }
}

export class BusImageResultCliDto {
  @ApiProperty({
    type: [String],
    description: 'List of Bus ID string',
  })
  bus_ids: string[];

  static of(data: string[]): BusImageResultCliDto {
    return {
      bus_ids: data,
    };
  }
}
export class ResponseBusImgDto extends withBaseResponse(
  BusImageResultCliDto,
  {},
) {}
