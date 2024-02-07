import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { BusNodeDto, BusNodeType } from './dto/bus-node.dto';
import { HttpService } from '@nestjs/axios';
import { UtilService } from 'src/common/utils/util.service';
import { catchError, firstValueFrom } from 'rxjs';
import {
  ApiResponseDto,
  RouteArrivalDto,
  getStationByUidItem,
} from './dto/bus-node.api.dto';
import { AxiosError } from 'axios';

@Injectable()
export class BusNodeService implements OnModuleInit {
  BusNodes: BusNodeDto[] = [];
  BusNodesHashMap: Map<string, BusNodeType> = new Map();
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly utilService: UtilService,
  ) {}

  onModuleInit() {
    const node_json_path = this.configService.get('SEOUL_NODE');
    const buffer = fs.readFileSync(node_json_path);
    const jsonString = buffer.toString();
    const tmp = JSON.parse(jsonString);
    this.BusNodes = tmp.map(BusNodeDto.of);
    for (const busNode of tmp) {
      this.BusNodesHashMap.set(String(busNode.node_id), busNode);
    }
  }

  getAllBusNode(): BusNodeDto[] {
    return this.BusNodes;
  }

  searchBusNodeByName(name: string): BusNodeDto[] {
    const searchResults: BusNodeDto[] = [];
    for (const busNode of this.BusNodes) {
      if (busNode.node_name.includes(name)) {
        searchResults.push(busNode);
      }
    }
    return searchResults;
  }

  searchBusNodeByLocation(x: number, y: number, N: number): BusNodeDto[] {
    const distanceMap: Map<number, BusNodeDto> = new Map();

    for (const busNode of this.BusNodes) {
      const distance = this.getDistanceByLongLat(busNode.y, y, busNode.x, x);
      distanceMap.set(distance, busNode);
    }

    const sortedDistances = Array.from(distanceMap.keys()).sort(
      (a, b) => a - b,
    );
    const nearestNodes: BusNodeDto[] = [];

    for (let i = 0; i < N && i < sortedDistances.length; i++) {
      const distance = sortedDistances[i];
      const busNode = distanceMap.get(distance);
      if (busNode) {
        nearestNodes.push(busNode);
      }
    }

    return nearestNodes;
  }

  async getRouteListByNodeId(node_id: string): Promise<RouteArrivalDto[]> {
    const ars_id = this.BusNodesHashMap.get(node_id).ars_id;
    const api_params: Map<string, string> = new Map([
      ['arsId', String(ars_id)],
      ['resultType', 'json'],
    ]);
    const base_url = 'http://ws.bus.go.kr/api/rest/stationinfo/getStationByUid';
    const url = this.utilService.buildApiUrl(base_url, api_params);
    const { data } = await firstValueFrom(
      this.httpService.get<ApiResponseDto<getStationByUidItem>>(url).pipe(
        catchError((error: AxiosError) => {
          console.error(error.response.data);
          throw new InternalServerErrorException(
            'Failed to get route list by node ID from the server.',
          );
        }),
      ),
    );
    return data.msgBody.itemList.map(getStationByUidItem.of);
  }

  private getDistanceByLongLat(
    lat1: number,
    lat2: number,
    lon1: number,
    lon2: number,
  ): number {
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    // Haversine formula
    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;
    const a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    const c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers.
    const r = 6371;

    // calculate the result
    return c * r;
  }
}
