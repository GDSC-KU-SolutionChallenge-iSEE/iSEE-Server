import { Injectable } from '@nestjs/common';
import { BusNodeDto } from './dto/bus.dto';

@Injectable()
export class BusApiService {
  async getAllNodes(): Promise<BusNodeDto[]> {
    return [
      {
        node_id: '1234',
        node_name: '고대안암병원',
        x: 127.12,
        y: 36.12,
      },
      {
        node_id: '4321',
        node_name: '여의도환승센터',
        x: 127.1234,
        y: 36.121234,
      },
    ].map((data) => BusNodeDto.of(data));
  }
}
