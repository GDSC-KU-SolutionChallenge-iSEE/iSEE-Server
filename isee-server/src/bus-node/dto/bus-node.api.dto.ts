import { ApiProperty } from '@nestjs/swagger';
import { withBaseResponse } from 'src/common/dto/deafult.dto';

export class ApiResponseDto<T> {
  comMsgHeader: ComMsgHeader;
  msgHeader: MsgHeader;
  msgBody: MsgBody<T>;
}

export class ComMsgHeader {
  responseTime: null;
  requestMsgID: null;
  responseMsgID: null;
  returnCode: null;
  successYN: null;
  errMsg: null;
}

export class MsgHeader {
  headerMsg: string;
  headerCd: string;
  itemCount: number;
}

export class MsgBody<T> {
  itemList: T[];
}

export class RouteArrivalDto {
  @ApiProperty({
    type: String,
    description: '버스 노선 id',
  })
  route_id: string;

  @ApiProperty({
    type: String,
    description: '버스 노선 이름',
  })
  route_name: string;

  @ApiProperty({
    type: Number,
    description: '버스 노선 배차 간격(분)',
  })
  route_arrive_term: number;

  @ApiProperty({
    type: Number,
    description: '가장 빠른 버스 노선 위치 경도',
  })
  x: number;

  @ApiProperty({
    type: Number,
    description: '가장 빠른 버스 노선 위치 위도',
  })
  y: number;

  @ApiProperty({
    type: String,
    description: '첫 번째 버스 도착 정보',
  })
  first_arrive_msg: string;

  @ApiProperty({
    type: String,
    description: '두 번째 버스 도착 정보',
  })
  sec_arrive_msg: string;
}

export class getStationByUidItem {
  stId: string;
  stNm: string;
  arsId: string;
  busRouteId: string;
  rtNm: string;
  busRouteAbrv: string;
  sectNm: string;
  gpsX: string;
  gpsY: string;
  posX: string;
  posY: string;
  stationTp: string;
  firstTm: string;
  lastTm: string;
  term: string;
  routeType: string;
  nextBus: string;
  staOrd: string;
  vehId1: string;
  plainNo1: null;
  sectOrd1: string;
  stationNm1: string;
  traTime1: string;
  traSpd1: string;
  isArrive1: string;
  repTm1: null;
  isLast1: string;
  busType1: string;
  vehId2: string;
  plainNo2: null;
  sectOrd2: string;
  stationNm2: string;
  traTime2: string;
  traSpd2: string;
  isArrive2: string;
  repTm2: null;
  isLast2: string;
  busType2: string;
  adirection: string;
  arrmsg1: string;
  arrmsg2: string;
  arrmsgSec1: string;
  arrmsgSec2: string;
  nxtStn: string;
  rerdieDiv1: string;
  rerdieDiv2: string;
  rerideNum1: string;
  rerideNum2: string;
  isFullFlag1: string;
  isFullFlag2: string;
  deTourAt: string;
  congestion1: string;
  congestion2: string;

  static of(item: getStationByUidItem): RouteArrivalDto {
    return {
      route_id: item.busRouteId,
      route_name: item.rtNm,
      route_arrive_term: Number(item.term),
      x: Number(item.gpsX),
      y: Number(item.gpsY),
      first_arrive_msg: item.arrmsg1,
      sec_arrive_msg: item.arrmsg2,
    };
  }
}

export class ResponseBusRouteArriveDto extends withBaseResponse(
  RouteArrivalDto,
  {},
) {}
