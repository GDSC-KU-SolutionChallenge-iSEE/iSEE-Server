import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { withBaseResponse } from 'src/common/dto/deafult.dto';

export type BusNodeType = {
  node_id: number;
  node_name: string;
  ars_id: number;
  x: number;
  y: number;
  type: string;
};

export class BusNodeDto {
  @ApiProperty({
    type: String,
    description: '정류소 Id',
  })
  node_id: number;
  @ApiProperty({
    type: String,
    description: '정류소 이름',
  })
  node_name: string;
  @ApiProperty({
    type: String,
    description: '정류소 위치 경도',
  })
  x: number;
  @ApiProperty({
    type: String,
    description: '정류소 위치 위도',
  })
  y: number;

  static of(node_input: BusNodeType): BusNodeDto {
    const it = new BusNodeDto();
    it.node_id = node_input.node_id;
    it.node_name = node_input.node_name;
    it.x = node_input.x;
    it.y = node_input.y;
    return it;
  }
}

export class QueryBusNodeDto {
  @ApiProperty({
    type: String,
    description: '정류소 이름 검색어',
    required: false,
  })
  @IsString()
  @IsOptional()
  keyword?: string;

  @ApiProperty({ type: Number, description: '사용자 경도', required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  x?: number;

  @ApiProperty({ type: Number, description: '사용자 위도', required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  y?: number;

  @ApiProperty({ type: Number, description: '결과 개수', required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  num?: number;
}

export class ResponseBusNodeDto extends withBaseResponse(BusNodeDto, {}) {}
