import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BusRouteDto } from './dto/bus-route.dto';
import * as fs from 'fs';

@Injectable()
export class BusRouteService implements OnModuleInit {
  BusRoutes: BusRouteDto[] = [];
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const node_json_path = this.configService.get('SEOUL_ROUTE');
    const buffer = fs.readFileSync(node_json_path);
    const jsonString = buffer.toString();
    this.BusRoutes = JSON.parse(jsonString).map(BusRouteDto.of);
  }

  getAllBusRoute(): BusRouteDto[] {
    return this.BusRoutes;
  }

  searchBusNodeByName(keyword: string): BusRouteDto[] {
    const searchResults: BusRouteDto[] = [];
    for (const busRoute of this.BusRoutes) {
      if (busRoute.route_name.includes(keyword)) {
        searchResults.push(busRoute);
      }
    }
    return searchResults;
  }
}
