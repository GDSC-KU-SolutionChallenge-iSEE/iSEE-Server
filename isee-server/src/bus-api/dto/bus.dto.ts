import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { withBaseResponse } from 'src/common/dto/deafult.dto';

export type BusNodeData = {
  node_id: string;
  node_name: string;
  x: number;
  y: number;
};

export class BusNodeDto {
  @ApiProperty({
    type: String,
    description: 'Bus Node Id',
  })
  @IsString()
  node_id: string;

  @ApiProperty({
    type: String,
    description: 'Bus Node Name',
  })
  @IsString()
  node_name: string;

  @ApiProperty({
    type: Number,
    description: 'Bus Node X',
  })
  @IsNumber()
  x: number;

  @ApiProperty({
    type: Number,
    description: 'Bus Node Y',
  })
  @IsNumber()
  y: number;

  static of(data?: BusNodeData): BusNodeDto {
    return {
      node_id: data?.node_id,
      node_name: data?.node_name,
      x: data?.x,
      y: data?.y,
    };
  }
}

export class BusRouteDto {
  @ApiProperty({
    type: String,
    description: 'Bus Route Id',
  })
  @IsString()
  route_id: string;

  @ApiProperty({
    type: String,
    description: 'Bus Route Name',
  })
  @IsString()
  route_name: string;
}

export class ResponseBusNodeDto extends withBaseResponse(BusNodeDto, {}) {}
export class ResponseBusRouteDto extends withBaseResponse(BusRouteDto, {}) {}
