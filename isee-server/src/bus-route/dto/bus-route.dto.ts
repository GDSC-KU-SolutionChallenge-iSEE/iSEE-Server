import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { withBaseResponse } from 'src/common/dto/deafult.dto';

export type BusRouteType = {
  route_name: string;
  route_id: number;
};

export class BusRouteDto {
  @ApiProperty({
    type: String,
    description: '노선 Id',
  })
  route_id: number;

  @ApiProperty({
    type: String,
    description: '노선 이름',
  })
  route_name: string;

  static of(route_input: BusRouteType): BusRouteDto {
    const it = new BusRouteDto();
    it.route_name = route_input.route_name;
    it.route_id = route_input.route_id;
    return it;
  }
}

export class QueryBusRouteDto {
  @ApiProperty({
    type: String,
    description: '노선 이름 검색어',
    required: true,
  })
  @IsString()
  keyword: string;
}

export class ResponseBusRouteDto extends withBaseResponse(BusRouteDto, {}) {}
