import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BusNodeService } from './bus-node.service';
import {
  BusNodeDto,
  QueryBusNodeDto,
  ResponseBusNodeDto,
} from './dto/bus-node.dto';
import { DefaultDto } from 'src/common/dto/deafult.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/auth-guard/firebase-auth.guard';
import {
  ResponseBusRouteArriveDto,
  ResponseBusRouteInfoDto,
  RouteArrivalDto,
  RouteInfoDto,
} from './dto/bus-node.api.dto';

@Controller('nodes')
@ApiTags('Bus-Node API')
export class BusNodeController {
  constructor(private readonly busNodeService: BusNodeService) {}

  @Get('route/:node_id')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '버스정류소의 노선 목록를 조회합니다.' })
  @ApiCreatedResponse({ type: ResponseBusRouteInfoDto })
  async getRouteListByNodeId(
    @Param('node_id') node_id: string,
  ): Promise<DefaultDto<RouteInfoDto[]>> {
    const result = await this.busNodeService.getRouteListByNodeId(node_id);
    return DefaultDto.of<RouteInfoDto[]>(
      true,
      `Found routes in node: ${node_id}`,
      result,
    );
  }

  @Get('route/arrive/:node_id')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '버스정류소의 실시간 노선 도착정보를 조회합니다.' })
  @ApiCreatedResponse({ type: ResponseBusRouteArriveDto })
  async getRouteArriveListByNodeId(
    @Param('node_id') node_id: string,
  ): Promise<DefaultDto<RouteArrivalDto[]>> {
    const result =
      await this.busNodeService.getRouteArriveListByNodeId(node_id);
    return DefaultDto.of<RouteArrivalDto[]>(
      true,
      `Found route arrival info in node: ${node_id}`,
      result,
    );
  }

  @Get('search')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '버스정류소를 이름및 좌표로 조회합니다.' })
  @ApiCreatedResponse({ type: ResponseBusNodeDto })
  searchBusNodeByName(
    @Query(new ValidationPipe({ transform: true }))
    queryBusNode: QueryBusNodeDto,
  ): DefaultDto<BusNodeDto[]> {
    if (queryBusNode.keyword) {
      return DefaultDto.of<BusNodeDto[]>(
        true,
        'Found bus node by name',
        this.busNodeService.searchBusNodeByName(queryBusNode.keyword),
      );
    } else if (queryBusNode.x && queryBusNode.y && queryBusNode.num) {
      return DefaultDto.of<BusNodeDto[]>(
        true,
        `Found ${queryBusNode.num} bus node by nearest location : (${queryBusNode.x}, ${queryBusNode.y})`,
        this.busNodeService.searchBusNodeByLocation(
          queryBusNode.x,
          queryBusNode.y,
          queryBusNode.num,
        ),
      );
    } else {
      throw new BadRequestException(
        'keyword or location x, y, num is required',
      );
    }
  }

  @Get('/')
  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '모든 정류소를 조회합니다.' })
  @ApiCreatedResponse({ type: ResponseBusNodeDto })
  getAllBusNode() {
    return this.busNodeService.getAllBusNode();
  }
}
