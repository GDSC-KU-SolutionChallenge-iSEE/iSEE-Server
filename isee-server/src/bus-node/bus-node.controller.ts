import {
  BadRequestException,
  Controller,
  Get,
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

@Controller('nodes')
@ApiTags('Bus-Node API')
export class BusNodeController {
  constructor(private readonly busNodeService: BusNodeService) {}

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
