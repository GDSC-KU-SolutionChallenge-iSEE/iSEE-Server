import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UtilService } from './utils/util.service';
import { configModule } from 'src/app/modules/config.module';

@Global()
@Module({
  imports: [configModule],
  providers: [PrismaService, UtilService],
  exports: [PrismaService, UtilService],
})
export class CommonModule {}
