import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { BusNodeDto } from './dto/bus-node.dto';

@Injectable()
export class BusNodeService implements OnModuleInit {
  BusNodes: BusNodeDto[] = [];
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const node_json_path = this.configService.get('SEOUL_NODE');
    const buffer = fs.readFileSync(node_json_path);
    const jsonString = buffer.toString();
    this.BusNodes = JSON.parse(jsonString).map(BusNodeDto.of);
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
