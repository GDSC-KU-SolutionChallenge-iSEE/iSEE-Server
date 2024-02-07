import { Module } from '@nestjs/common';
import { BusNodeService } from './bus-node.service';
import { BusNodeController } from './bus-node.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [BusNodeController],
  providers: [BusNodeService],
})
export class BusNodeModule {}
